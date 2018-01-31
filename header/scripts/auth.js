var mailboxSettingsAvailable = true;
var userPropertyExtensionsAvailable = true;
/*var endpoints = {
   'https://graph.windows.net/': '00000002-0000-0000-c000-000000000000',
   'https://graph.microsoft.com/': '00000003-0000-0000-c000-000000000000'
};*/
var ADAL = null;

// output ADAL logs to the console
Logging = {
   level: 3,
   log: function (message) {
      console.log(message);
   }
};

var currentUser = {
    name: "",
    uid: "",
    member: false,
    personal: false
};

(function () {
    // parsing the query string into JSON 
    var adal_tenant = null;
    var adal_clientId = null;
    var query = window.location.search.substring(1);
    var qs = '{}';
    var storageObj = isIEBrowser() ? localStorage : sessionStorage;
    if (query!=null && query!='') {
        qs = parse_query_string(query);
        adal_clientId = qs['client'];
        if (adal_clientId==null) {
           var token = qs['token'];
           if (token) {
               try {
               var parsedToken = parseJwt(token);
               adal_clientId = parsedToken.aud;
               adal_tenant = parsedToken.tid;
               } catch(e) {
                  console.log('Invalid token parameter: '+token);
               }
           }
        } else {
            adal_tenant = qs['tenant'];
        }
        storageObj.setItem('adal_clientId',adal_clientId);
        storageObj.setItem('adal_tenant',adal_tenant);        
    } else {
       adal_tenant = storageObj.getItem('adal_tenant');
       adal_clientId = storageObj.getItem('adal_clientId');
    }
    if (adal_tenant==null) {
       adal_tenant = 'common';
    }
    
    var isIfrm = isIframe();
    var isCallback = isADALCallback();
    console.log('isIframe: '+isIfrm+', isADALInitialized: '+isSignedInUser()+', isCallback='+isCallback+', query string: '+query);
    
    // check and use ADAL if we have signed in user or we need to initialize it
    // NOTE: ADAL should be used if this is running inside iFrame (it means it is refreshing the ID token), or if we already have signed-in user, 
    // or we are in process of initialization (callback), or if we have the query parameter 'client' or query parameter 'token'
    var shouldUseADAL = isIfrm || isSignedInUser() || isCallback || adal_clientId!=null;
    console.log('should use ADAL: '+shouldUseADAL);
    if (shouldUseADAL) {
         if (ADAL==null) {
            ADAL = new AuthenticationContext({
                instance: 'https://login.microsoftonline.com/',
                tenant: adal_tenant,//'b4a7cf6c-8876-456a-b97f-1e2bbeb7579a', //COMMON OR YOUR TENANT ID
                clientId: adal_clientId,//'0b2d8b43-929e-412c-b6d4-2d536ffc1e92', //REPLACE WITH YOUR CLIENT ID
                redirectUri: [window.location.protocol, '//', window.location.host, window.location.pathname].join(''), // THE CDN URI
                cacheLocation: isIEBrowser() ? 'localStorage' : 'sessionStorage', // enable this for IE, as sessionStorage does not work for localhost.
                //endpoints: endpoints,
                popUp: false
            });   
         }
          
       
        // doing ADAL logic
        console.log('iscallback='+isCallback);
        if (isCallback) {
            ADAL.handleWindowCallback();	
        }
        
        if (isCallback && !ADAL.getLoginError()) {
            console.log('Now redirecting to original URL');
            window.location = ADAL._getItem(ADAL.CONSTANTS.STORAGE.LOGIN_REQUEST);
            return;
        }	
        
        if (!ADAL.getCachedUser()) {
            console.log('handling signin...');
            ADAL.login();
            return;
        }
    }    
})();

function parseJwt (token) {
   var base64Url = token.split('.')[1];
   var base64 = base64Url.replace('-', '+').replace('_', '/');
   return JSON.parse(atob(base64));
}

function isADALCallback() {
   var hash = getHash(window.location.hash);
   var parameters = deserializeHash(hash);
   return (
      parameters.hasOwnProperty('error_description') ||
      parameters.hasOwnProperty('access_token') ||
      parameters.hasOwnProperty('id_token')
   );   
}

function deserializeHash(query) {
   var match,
      pl = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=([^&]*)/g,
      decode = function (s) {
          return decodeURIComponent(s.replace(pl, ' '));
      },
      obj = {};
   match = search.exec(query);
   while (match) {
      obj[decode(match[1])] = decode(match[2]);
      match = search.exec(query);
   }

   return obj;   
}

function getHash(hash) {
   if (hash.indexOf('#/') > -1) {
      hash = hash.substring(hash.indexOf('#/') + 2);
   } else if (hash.indexOf('#') > -1) {
      hash = hash.substring(1);
   }

   return hash;
}
   
function isIEBrowser() {
    var mybrowser = window.navigator.userAgent;
    if (mybrowser.indexOf('MSIE')>0 || mybrowser.indexOf('Trident/')>0){
        return true;
    }
                
    return false;
}
   
function isSignedInUser () {
    return ADAL!=null && ADAL.getCachedUser()!=null;
}

function isUseOutlookMailSettings() {
    return typeof headerObj !== 'undefined' && headerObj["use outlook settings"];
}

function isUseUserPropertyExtensions() {
    return typeof headerObj !== 'undefined' && headerObj["use user property extensions"];
}
   
function fillUserInfo() {
    var signeduser = ADAL!=null ? ADAL.getCachedUser() : null;
    if (signeduser && headerObj !== 'undefined' && headerObj.hasOwnProperty("account") && headerObj["account"]) {
        if (signeduser.profile.upn) {
            // For work or school accounts (tenant members)
            currentUser.member = true;
            currentUser.personal = false;
            currentUser.uid = signeduser.profile.upn;
            $('.useremail').html(signeduser.profile.upn);
            $('#usersettingslinklist').append('<div><div class="user-settings-link-wrapper"><a id="myProfileLink" class="user-settings-link" role="link" href="https://delve.office.com/"><span class="user-settings-link-label" lang-tran="My profile">My profile</span></a></div><div class="user-settings-link-wrapper"><a id="myAccountLink" class="user-settings-link" role="link" href="https://portal.office.com/account/"><span class="user-settings-link-label" lang-tran="My account">My account</span></a></div><div class="user-settings-link-wrapper"><a id="signOutLink" class="user-settings-link" role="link" href="https://login.microsoftonline.com/' + ADAL.config.tenant + '/oauth2/logout"><span class="user-settings-link-label" lang-tran="Sign out">Sign out</span></a></div></div>');
        } else if (signeduser.profile.idp === "live.com") {
            // For personal accounts
            currentUser.member = false;
            currentUser.personal = true;
            currentUser.uid = signeduser.profile.email;
            $('.useremail').html(signeduser.profile.email);
            $('#usersettingslinklist').append('<div><div class="user-settings-link-wrapper"><a id="myProfileLink" class="user-settings-link" role="link" href="https://account.microsoft.com/profile/"><span class="user-settings-link-label" lang-tran="My profile">My profile</span></a></div><div class="user-settings-link-wrapper"><a id="myAccountLink" class="user-settings-link" role="link" href="https://account.microsoft.com/"><span class="user-settings-link-label" lang-tran="My account">My account</span></a></div><div class="user-settings-link-wrapper"><a id="signOutLink" class="user-settings-link" role="link" href="https://login.microsoftonline.com/' + ADAL.config.tenant + '/oauth2/logout"><span class="user-settings-link-label" lang-tran="Sign out">Sign out</span></a></div></div>');
            $("#officeHomeLink").attr("href", "https://www.office.com/login?IdentityProvider=live.com&login_hint=" + signeduser.profile.email.replace("@", "%40"));
        } else {
            // For work or school accounts which are guests
            currentUser.member = false;
            currentUser.personal = false;
            currentUser.uid = signeduser.profile.email;
            $('.useremail').html(signeduser.profile.email);
            $('#usersettingslinklist').append('<div><div class="user-settings-link-wrapper"><a id="myProfileLink" class="user-settings-link" role="link" href="https://delve.office.com/"><span class="user-settings-link-label" lang-tran="My profile">My profile</span></a></div><div class="user-settings-link-wrapper"><a id="myAccountLink" class="user-settings-link" role="link" href="https://portal.office.com/account/"><span class="user-settings-link-label" lang-tran="My account">My account</span></a></div><div class="user-settings-link-wrapper"><a id="signOutLink" class="user-settings-link" role="link" href="https://login.microsoftonline.com/' + ADAL.config.tenant + '/oauth2/logout"><span class="user-settings-link-label" lang-tran="Sign out">Sign out</span></a></div></div>');
        }
        
        $("#allAppsLink").attr("href", "https://account.activedirectory.windowsazure.com/r?tenantId=" + ADAL.config.tenant + "#/applications");
        currentUser.name = signeduser.profile.name;
        $('.username').html(signeduser.profile.name);
        getuserphotometadata();
    }
}
   
function isIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {   
        console.log('error while checking iframe...');
            return true;
    }
}   
            
function parse_query_string(query) {
    return parse_string(query,"&");
} 
            
function parse_string(str,del) {
    var vars = str.split(del);
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    
    return query_string;
}

function executeAjaxRequestWithAdalLogic(resource,callbackfunc,ajaxurl,ajaxjsondata) {
    ADAL.acquireToken(resource, function (error, token, errcode) {
        // Handle ADAL Error
        if (error || errcode || !token) {
           var msg = '';
            if (error || errcode) {
               msg+='Error '+(errcode!=null ? '"'+errcode+'"' : '')+' occured when acquiring token for the resource "'+resource+'" for calling function "'+getFunctionName(callbackfunc)+'" with ajax url "'+ajaxurl+'"'+(ajaxjsondata!=null ? ' and JSON data '+JSON.stringify(ajaxjsondata) : '')+'.';
               msg+='\n\nError details:\n'+error;
            }
            var dologin = false;
            if (errcode=='login_required' || errcode=='interaction_required' || errcode=='account_selection_required' || errcode=='consent_required' || errcode=='access_denied') {
               dologin = true;
               msg='You will be redirected to the login page.\n\n'+msg;
            } else if (errcode=='Token Renewal Failed') {
               msg='Please try again latter.\n\n'+msg;
            } else {
               var msgpart = '';
               if (errcode=='resource is required') {
                  msgpart='The application is not providing resource to ADAL call';
               } else if (errcode=='invalid_resource') {
                  msgpart='The application is trying to use invalid resource';
               } else if (errcode=='unsupported_response_type') {
                  msgpart='The application authentication setting must be adjusted to support implicit flow';
               } else {
                  msgpart = 'Unknown error happened';
               }
               msgpart+=' - please contact the support and send the screenshot of this dialog.\n\n'
               msg=msgpart+msg;
            }
            if (!token) {
               msg = 'Token is not acquired!\n\n'+msg;
            }
            console.log(msg);
            alert(msg);
            if (dologin) {
               ADAL.login();
            } 
            //if (errcode=='interaction_required' && resource!=ADAL.config.clientId) {
            //   ADAL.acquireTokenRedirect(resource, null, null);               
            //}
            return;
        } else {
            console.log('Token for the resource "'+resource+'" is valid. Now executing function "'+getFunctionName(callbackfunc)+'" with ajax url "'+ajaxurl+'"'+(ajaxjsondata!=null ? ' and JSON data '+JSON.stringify(ajaxjsondata) : '')+'.');
        }
        if (ajaxurl==null) {
           var noaurlmsg = 'The function "'+getFunctionName(callbackfunc)+'" will not be called because URL is not provided!';
           console.log(noaurlmsg);
           alert(noaurlmsg);
        } else {
         callbackfunc(token,ajaxurl,ajaxjsondata);
        }
    });
}

function getFunctionName(funct) {
   if (isIEBrowser()) {
      var ret = funct.toString();
      ret = ret.substr('function '.length);
      ret = ret.substr(0, ret.indexOf('('));
      return ret;
   } else {
      return funct.name;
   }
}

function getmailboxsettingsdata(url) {
    executeAjaxRequestWithAdalLogic("https://graph.microsoft.com",getdatanoadalmailboxsettings,url);
}

function getdatanoadalmailboxsettings(token,url) {
    var settings = {
        "crossDomain": true,
        "url": url,
        "timeout":30000,
        "method": "GET",        
        "headers": {
            "Authorization": "Bearer " + token
        }
    }
    
    $.ajax(settings).done(function (data,textStatus,request) {
        console.log('getmailboxsettingsdata call successfully executed');
        if (data && data["language"] && data["language"]["locale"]) {
            languageSelector.selectedLanguage = convertGraphLanguage(data["language"]["locale"]);
        }
        
        console.log("Selected language="+languageSelector.selectedLanguage);
        
        if (data && data["timeZone"]) {
            setInitialTimeZone(data["timeZone"]);
            console.log("User's current time zone alias: " + data["timeZone"]);
        } else {
            console.log("User's current time zone hasn't been received.");
        }
        
        // Translate the page
        setupPredefinedLanguage();
        console.log('Data successfully retrieved! payload: ' + (data!=null ? JSON.stringify(data) : null));
    }).fail(function (err, textStatus, errorThrown) {
        mailboxSettingsAvailable = false;
        applyTranslation();
        console.log('getmailboxsettingsdata call failed');
        console.log("AJAX REQUEST FAILED:"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown);
    });
}

function getSupportedTimeZones() {
    executeAjaxRequestWithAdalLogic("https://graph.microsoft.com", getDataOnAdalSupportedTimeZones, 'https://graph.microsoft.com/beta/me/outlook/supportedTimeZones');
}

function getDataOnAdalSupportedTimeZones(token, url) {
    var settings = {
        "crossDomain": true,
        "url": url,
        "timeout":30000,
        "method": "GET",        
        "headers": {
            "Authorization": "Bearer " + token
        }
    }
    
    $.ajax(settings).done(function (data, textStatus, request) {
        console.log('getSupportedTimeZones call successfully executed');
        if (data && data["value"]) {
            setSupportedTimeZones(data["value"]);
            console.log('Supported time zones successfully retrieved! payload: ' + (data!=null ? JSON.stringify(data) : null));
        } else {
            console.log("Invalid response format!");
        }
    }).fail(function (err, textStatus, errorThrown) {
        mailboxSettingsAvailable = false;
        console.log('getSupportedTimeZones call failed');
        console.log("AJAX REQUEST FAILED:"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown);
    });
}

function patchmailboxsettingsdata(url, payload) {
    executeAjaxRequestWithAdalLogic("https://graph.microsoft.com",patchdatanoadal,url,payload);
}

function patchdatanoadal(token, url, payload) {
    var settings = {
        "crossDomain": true,
        "url": url,
        "timeout":30000,
        "method": "PATCH",        
        "headers": {
            "Authorization": "Bearer " + token
        },
        "data": JSON.stringify(payload),
        "contentType": "application/json"
    }
    
    $.ajax(settings).done(function (data,textStatus,request) {
        console.log('patchmailboxsettingsdata call successfully executed');
        console.log('Data successfully updated! DATA='+(data!=null ? JSON.stringify(data) : null));
    }).fail(function (err, textStatus, errorThrown) {
        console.log('patchmailboxsettingsdata call failed');
        console.log("AJAX REQUEST FAILED:"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown);
    });
}

function getuserphotometadata() {
    executeAjaxRequestWithAdalLogic("https://graph.microsoft.com",getdatanoadalphotometadata,"https://graph.microsoft.com/beta/me/photo");
}

function getdatanoadalphotometadata(token,url) {
    var settings = {
        "crossDomain": true,
        "url": url,
        "timeout":30000,
        "method": "GET",        
        "headers": {
            "Authorization": "Bearer " + token
        }
    }
    
    $.ajax(settings).done(function (data,textStatus,request) {
        console.log('getuserphotometadata call successfully executed');
        
        if (data && data["width"] && data["width"] > 1) {
            getuserphoto();
        } else {
            console.log("User hasn't set his photo.");
        }
        
        console.log('Data successfully retrieved! payload: ' + (data!=null ? JSON.stringify(data) : null));
    }).fail(function (err, textStatus, errorThrown) {
        console.log('getuserphotometadata call failed');
        console.log("AJAX REQUEST FAILED:"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown);
    });
}

function getuserphoto() {
    executeAjaxRequestWithAdalLogic("https://graph.microsoft.com",getdatanoadalphoto,"https://graph.microsoft.com/beta/me/photo/$value");
}

function getdatanoadalphoto(token,url) {
    var request = new XMLHttpRequest;
    request.open("GET", url);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.responseType = "blob";
    request.onload = function () {
        if (request.readyState === 4 && request.status === 200) {
            console.log('getuserphoto call successfully executed');
            
            var reader = new FileReader();
            reader.onload = function () {
                $('.userphoto').attr('src', reader.result).show();
            }
            
            reader.readAsDataURL(request.response);
        } else {
            console.log('getdatanoadalphoto call failed');
            console.log("AJAX REQUEST FAILED:"+request.statusText);
        }
    };
    request.send(null);
}

function createThemePropertyExtension(theme) {
    var payload = {
        "@odata.type": "microsoft.graph.openTypeExtension",
        "extensionName": themePropertyExtensionId,
        "theme": theme
    };
    executeAjaxRequestWithAdalLogic("https://graph.microsoft.com", postdataonadal, "https://graph.microsoft.com/beta/me/extensions", payload);
}

function postdataonadal(token, url, payload) {
    var settings = {
        "crossDomain": true,
        "url": url,
        "timeout":30000,
        "method": "POST",        
        "headers": {
            "Authorization": "Bearer " + token
        },
        "data": JSON.stringify(payload),
        "contentType": "application/json"
    };
    
    $.ajax(settings).done(function (data,textStatus,request) {
        console.log('postdataonadal call successfully executed');
        console.log('Data successfully updated! DATA='+(data!=null ? JSON.stringify(data) : null));
    }).fail(function (err, textStatus, errorThrown) {
        userPropertyExtensionsAvailable = false;
        console.log('postdataonadal call failed');
        console.log("AJAX REQUEST FAILED:"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown);
    });
}

function getUserPropertyExtensions() {
    executeAjaxRequestWithAdalLogic("https://graph.microsoft.com", getdatanoadaluserpropertyextensions, "https://graph.microsoft.com/beta/me/?$select=id,displayName&$expand=extensions");
}

function getdatanoadaluserpropertyextensions(token, url) {
    var settings = {
        "crossDomain": true,
        "url": url,
        "timeout":30000,
        "method": "GET",        
        "headers": {
            "Authorization": "Bearer " + token
        }
    }
    
    $.ajax(settings).done(function (data,textStatus,request) {
        console.log('getUserPropertyExtensions call successfully executed');
        
        // Parse the payload data and create or use existing property extension
        if (data && data.extensions && data.extensions.length > 0) {
            var themeFound = false;
            for (var i = 0; i < data.extensions.length; i++) {
                if (data.extensions[i].id === themePropertyExtensionId && data.extensions[i].theme) {
                    setupTheme(data.extensions[i].theme);
                    themeFound = true;
                    break;
                }
            }
            
            if (!themeFound) {
                createThemePropertyExtension(themeSelector.currentTheme);
                setupStyle();
            }
        } else {
            createThemePropertyExtension(themeSelector.currentTheme);
            setupStyle();
        }
        
        console.log('Data successfully retrieved! payload: ' + (data!=null ? JSON.stringify(data) : null));
    }).fail(function (err, textStatus, errorThrown) {
        userPropertyExtensionsAvailable = false;
        setupStyle();
        console.log('getUserPropertyExtensions call failed');
        console.log("AJAX REQUEST FAILED:"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown);
    });
}

function updateThemePropertyExtension(theme) {
    var payload = {
        "theme": theme
    };
    executeAjaxRequestWithAdalLogic("https://graph.microsoft.com", patchThemePropertyExtensionOnAdal, "https://graph.microsoft.com/v1.0/me/extensions/" + themePropertyExtensionId, payload);
}

function patchThemePropertyExtensionOnAdal(token, url, payload) {
    var settings = {
        "crossDomain": true,
        "url": url,
        "timeout":30000,
        "method": "PATCH",        
        "headers": {
            "Authorization": "Bearer " + token
        },
        "data": JSON.stringify(payload),
        "contentType": "application/json"
    }
    
    $.ajax(settings).done(function (data,textStatus,request) {
        console.log('patchThemePropertyExtensionOnAdal call successfully executed');
        console.log("User's theme property extension successfully updated! DATA="+(data!=null ? JSON.stringify(data) : null));
    }).fail(function (err, textStatus, errorThrown) {
        console.log('patchThemePropertyExtensionOnAdal call failed');
        console.log("AJAX REQUEST FAILED:"+err.toString()+',textStatus='+textStatus+', errorThrown='+errorThrown);
    });
}
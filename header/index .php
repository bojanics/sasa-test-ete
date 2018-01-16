<html>
    <head>
        <meta charset="utf-8">
        <title>Layout</title>
        <link href="./ress/jpeg/risktech/Risktech48.jpg" rel="shortcut icon" type="image/x-icon">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./ress/css/fabric.min.css">
        <link rel="stylesheet" href="./ress/css/fabric.components.min.css">
        <link id="layoutstyle" href="./ress/css/layout.css" rel="stylesheet">
        <link id="themelayoutstyle" href="./ress/css/cosmo/layout-override.css" rel="stylesheet">
		<link href="./ress/css/formio.full.min.css" rel="stylesheet">
		<script src="./scripts/vendor/formio.full.min.js"></script>
        <script src="./scripts/vendor/jquery-1.10.2.min.js"></script>
        <script src="./scripts/vendor/adal.min.js"></script>
        <script src="./scripts/lang.js"></script>
        <script src="./scripts/tz.js"></script>
        <script src="./scripts/theme.js"></script>
        <script src="./scripts/main.js"></script>
        <script src="./scripts/auth.js"></script>
        <script src="./defs/app.json.js"></script>
        <script id="definitionsImport" type="text/javascript">
        (function() {
            var formDef = "./defs/form.json.js";
            var brandDef;
            var customizationDef;
            var styleDef;
            var headerConfig;
            var regex = new RegExp("[?&]form(=([^&#]*)|&|#|$)")
            var formDefParam = regex.exec(window.location.href);
            var formSet = false;
            if (formDefParam && formDefParam[2])
            {
                formDef = "../forms/" + decodeURIComponent(formDefParam[2].replace(/\+/g, " ")) + "/form.json.js";
                formSet = true;
            }
            
            if (typeof appObj !== 'undefined')
            {
                // We have found app.json.js so we will use it to load other definitions
                // If we have form definition already defined in query parameter we will use it
                if (!formSet && appObj["formdefinition"])
                {
                    formDef = appObj["formdefinition"];
                }
                
                if (appObj["branddefinition"])
                {
                    brandDef = appObj["branddefinition"];
                }
                
                if (appObj["stylingdefinition"])
                {
                    styleDef = appObj["stylingdefinition"];
                }
                
                if (appObj["customizationdefinition"])
                {
                    customizationDef = appObj["customizationdefinition"];
                }
                
                if (appObj["headerconfiguration"])
                {
                    headerConfig = appObj["headerconfiguration"];
                }
            }
            
            var formDSE = document.createElement("script");
            formDSE.src = formDef;
            var currentNode = document.getElementById("definitionsImport");
            currentNode.parentNode.insertBefore(formDSE, currentNode.nextSibling);
            
            if (brandDef)
            {
                var brandDSE = document.createElement("script");
                brandDSE.src = brandDef;
                currentNode.parentNode.insertBefore(brandDSE, currentNode.nextSibling);
            }
            
            if (styleDef)
            {
                var styleDSE = document.createElement("script");
                styleDSE.src = styleDef;
                currentNode.parentNode.insertBefore(styleDSE, currentNode.nextSibling);
            }
            
            if (customizationDef)
            {
                var customizationDSE = document.createElement("script");
                customizationDSE.src = customizationDef;
                currentNode.parentNode.insertBefore(customizationDSE, currentNode.nextSibling);
            }
            
            if (headerConfig)
            {
                var headerCSE = document.createElement("script");
                headerCSE.src = headerConfig;
                currentNode.parentNode.insertBefore(headerCSE, currentNode.nextSibling);
            }
        })();
        </script>
        <script src="./scripts/lang-form.json.js"></script>
        <script src="./scripts/lang-layout.json.js"></script>
        <script type="text/javascript">
            window.onload = function() {                
                // if this code runs in iFrame it means it is used from ADAL in the background...in that case we don't want to execute our APP logic
                if (!isIframe()) {      
                    if (isSignedInUser()) {
                       document.getElementById('mymessage').innerHTML='ADAL logic finished...';
                    }
                    
                    // Initializing the form
                    setupLayout();
                    var hooksObj = {
                        input: function(input) {
                            this.addEventListener(input, 'focus', (function(comp) {
                                return function() {
                                    $('#divHelp').empty();
                                    if (comp && comp.hasOwnProperty("component") && comp.component.hasOwnProperty("properties")
                                            && comp.component.properties.hasOwnProperty("formhelp")) {
                                        var vhelpform = '<div id="formHelpCardWrapper"><div id="formHelpCard" class="header-common user-help-card"><div class="header-common user-settings-card-header-label"><span id="formHelp"></span></div></div></div>';
                                        $('#divHelp').append(vhelpform);
                                        $('#formHelp').html(comp.component.properties.formhelp).attr("lang-tran", comp.component.properties.formhelp).translate();
                                    }
                                    
                                    if (comp && comp.hasOwnProperty("component") && comp.component.hasOwnProperty("properties")
                                            && comp.component.properties.hasOwnProperty("fieldhelp")) {
                                        var vhelpfield = '<div id="fieldHelpCardWrapper"><div id="fieldHelpCard" class="header-common user-help-card"><div class="header-common user-settings-card-header-label"><span id="fieldHelp"></span></div></div></div>';
                                        $('#divHelp').append(vhelpfield);
                                        $('#fieldHelp').html(comp.component.properties.fieldhelp).attr("lang-tran", comp.component.properties.fieldhelp).translate();
                                    }
                                    
                                    if(comp && comp.hasOwnProperty("component")&& comp.component.hasOwnProperty("properties")
                                            && comp.component.properties.hasOwnProperty("processimagelink") 
                                            && comp.component.properties.hasOwnProperty("processlink")){
                                        var vprocess = '<div id="fieldHelpCardWrapper"><div id="fieldHelpCard" class="header-common user-help-card"><div class="header-common user-settings-card-header-label"><span id="bussinesplabel"></span></div></div></div><div id="fieldHelpCardWrapper"><div id="fieldHelpCard" class="header-common user-help-card"><div class="header-common user-settings-card-header-label"><a id="processlink"><img class="help-photo-container" id="processimagelink"></a></div></div></div>';
                                        $('#divHelp').append(vprocess);
                                        $('#processimagelink').attr('src',comp.component.properties.processimagelink);
                                        $('#processlink').attr('href',comp.component.properties.processlink);
                                        $('#bussinesplabel').html('Bussines process: ');
                                    }
                                    
                                    if(comp && comp.hasOwnProperty("component")&& comp.component.hasOwnProperty("properties")
                                            && comp.component.properties.hasOwnProperty("elearningimagelink")
                                            && comp.component.properties.hasOwnProperty("elearninglink")){
                                        var velearning = '<div id="fieldHelpCardWrapper"><div id="fieldHelpCard" class="header-common user-help-card"><div class="header-common user-settings-card-header-label"><span id="elearninglabel"></span></div></div></div><div id="formHelpCardWrapper"><div id="formHelpCard" class="header-common user-help-card"><div class="header-common user-settings-card-header-label"><a id="elearninglink"><img class="help-photo-container" id="elearningimagelink"></a></div></div></div>';
                                        $('#divHelp').append(velearning);
                                        $('#elearningimagelink').attr('src',comp.component.properties.elearningimagelink);
                                        $('#elearninglink').attr('href',comp.component.properties.elearninglink);
                                        $('#elearninglabel').html('E-Learning: ');
									}
                                };
                            })(this));
                            this.addEventListener(input, 'blur', (function(comp) {
                                return function() {
                                    console.log(comp.component.key + ' out of focus');
                                };
                            })(this));
                        }
                    };
                    langObj.hooks = hooksObj;
                    Formio.createForm(document.getElementById('formio'), formObj, langObj)
                    .then(function(form) {
                        form.header = {
                            user: currentUser
                        };
                        window.setLanguage = function (lang) {
                            form.language = lang;
                        };
                        
                        form.ready.then(function() {
                            // Find out user's mailbox settings
                            if (isUseOutlookMailSettings() && isSignedInUser()) {
                                getmailboxsettingsdata('https://graph.microsoft.com/beta/me/mailboxSettings');
                                getSupportedTimeZones();
                            } else {
                                // Just translate the page
                                applyTranslation();
                                setupStyle();
                            }
                        });
                        
                        form.on('submit', function(submission) {
                            console.log(submission);
                        });
                    });
                    fillUserInfo();
         
                    // Calling function APP if it is online form (we have signed-in user) and we have data URL
                    if (isSignedInUser()) {
                        // parsing the query string into JSON 
                        var query = window.location.search.substring(1);
                        var qs = '{}';
                        if (query!=null && query!='') {
                           var qs = parse_query_string(query);
                        }
                        var azureurl = qs['data_url']; 
                        if (azureurl) {
                           console.log('calling getdata with url='+azureurl);            
                           getdata(azureurl);
                        }
                    }
                } else {
                  console.log('The onload code wont be executed because we are running inside iFrame');
                }
            };    
		</script>
    </head>
    <body>
	    <div class="header-border">
            <div class="header-wrapper">
                <div class="header-common header-left">
                    <div class="header-common app-header app-menu rsp-lar-visible">
                        <button type="button" class="header-common app-menu-button appl-button" onclick="openAppLauncher(this)"/>
                    </div>
                    <div class="header-common app-header header-hidden-element hiddensmcommands">
                        <button type="button" class="header-common app-menu-button app-menu-button-right" onclick="hideCommands()">
                            <span class="header-common app-menu-button-label"><i class="ms-Icon ms-Icon--x" aria-hidden="true"></i></span>
                        </button>
                    </div>
                    <div id="mainLogo" class="header-common app-header main-logo visiblesmcommands" style="display: none" onmousedown="return false">
                        <img src="./ress/jpeg/risktech/Risktech48.jpg" />
                    </div>
                    <div id="partnerLogo" class="header-common app-header visiblesmcommands" style="display: none" onmousedown="return false">
                        <img />
                    </div>
                    <div id="appTitle" class="header-common app-header rsp-lar-visible" style="display: none">
                        <p class="app-menu-brand">Risktech APP</a>
                    </div>
                </div>
                <div class="header-common header-center"></div>
                <div class="header-common header-right">
                    <div id="clientLogo" class="header-common app-header visiblesmcommands" style="display: none" onmousedown="return false">
                        <img class="client-logo" src="./" />
                    </div>
                    <div id="environmentcontainerl" class="header-common app-header rsp-visible">
                        <button type="button" class="header-common app-menu-button app-menu-button-right environment-button" onclick="showEnvironmentDropdown(this)">
                            <div class="environment-wrapper">
                                <span lang-tran="Envirnoment" class="environment-text environment-head">Environment</span>
                                <span class="environment-text environment-current">Tenant 1 (default)</span>
                            </div>
                            <svg class="environment-glyph" viewBox="0 0 16 16">
                                <path d="M1.02,5.02L2.05,4L8,9.95L13.95,4l1.02,1.02L8,12L1.02,5.02z"></path>
                            </svg>
                        </button>
                        <div class="header-common environment-dropdown header-hidden-element">
                            <ul class="environment-dropdown-list">
                                <li>
                                    <button disabled class="environment-option active-option">
                                        <div class="header-common environment-option-item">
                                            <div class="header-common environment-option-label">Tenant 1 (default)</div>
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button class="environment-option">
                                        <div class="header-common environment-option-item">
                                            <div class="header-common environment-option-label">Tenant 2</div>
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button class="environment-option">
                                        <div class="header-common environment-option-item">
                                            <div class="header-common environment-option-label">Tenant 3</div>
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="header-common app-header rsp-hidden visiblesmcommands">
                        <button type="button" class="header-common app-menu-button app-menu-button-right" onclick="showCommands()">
                            <span class="header-common app-menu-button-label"><i class="ms-Icon ms-Icon--ellipsis" aria-hidden="true"></i></span>
                        </button>
                    </div>
                    <div class="header-common app-header rsp-med-visible hiddensmcommands">
                        <button type="button" class="header-common app-menu-button app-menu-button-right appl-button" onclick="openAppLauncher(this)"/>
                    </div>
                    <div id="notificationsCommandWrapper" class="header-common app-header rsp-visible hiddensmcommands">
                        <button id="notificationsCommand" type="button" class="header-common app-menu-button app-menu-button-right" onclick="openUserMenu(this)">
                            <span class="header-common app-menu-button-label"><i class="ms-Icon ms-Icon--bell" aria-hidden="true"></i></span>
                        </button>
                    </div>
                    <div id="settingsCommandWrapper" class="header-common app-header rsp-visible hiddensmcommands">
                        <button id="settingsCommand" type="button" class="header-common app-menu-button app-menu-button-right" onclick="openUserMenu(this)">
                            <span class="header-common app-menu-button-label"><i class="ms-Icon ms-Icon--gear" aria-hidden="true"></i></span>
                        </button>
                    </div>
                    <div id="helpCommandWrapper" class="header-common app-header rsp-visible hiddensmcommands">
                        <button id="helpCommand" type="button" class="header-common app-menu-button app-menu-button-right" onclick="openUserMenu(this)">
                            <span class="header-common app-menu-button-label"><i class="ms-Icon ms-Icon--question" aria-hidden="true"></i></span>
                        </button>
                    </div>
                    <div id="accountsCommandWrapperL" class="header-common app-header rsp-visible">
                        <button id="accountsCommand" type="button" class="header-common app-menu-button app-menu-button-right app-menu-button-right-menu" onclick="openUserMenu(this)">
                            <div class="app-menu-button-right-menu-wrapper">
                                <div class="app-menu-button-right-menu-left">
                                    <span class="username">James Smith - Risktech</span>
                                </div>
                                <div class="header-common app-header app-menu-button-right-menu-right">
                                    <div class="app-menu-button-right-menu-right-image-wrapper">
                                        <span class="app-menu-button-right-menu-right-image ms-Icon ms-Icon--person ms-icon-font-size-52"></span>
                                    </div>
                                    <div class="app-menu-button-right-menu-right-user-image-wrapper">
                                        <img class="app-menu-button-right-menu-right-user-image userphoto"/>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div id="accountsCommandWrapperS" class="header-common app-header rsp-hidden visiblesmcommands">
                        <button id="accountsCommandSmall" type="button" class="header-common app-menu-button app-menu-button-right" onclick="hideUserSettingsSmallMenuDropdown();openUserMenu(this)">
                            <span class="header-common app-menu-button-label app-menu-button-right-menu-right-image ms-Icon ms-Icon--person ms-icon-font-size-52 rsp"></span>
                            <div class="app-menu-button-right-menu-right-user-image-wrapper">
                                <img class="app-menu-button-right-menu-right-user-image userphoto"/>
                            </div>
                        </button>
                    </div>
                </div>
                <div id="userMenuOverlay" class="header-hidden-element">
                    <div class="user-settings-wrapper header-hidden-element">
                        <div class="user-settings-container">
                            <button type="button" class="header-common user-settings-close" onclick="closeUserMenu()">
                                <span><i class="ms-Icon ms-Icon--x ms-icon-font-size-16" aria-hidden="true"></i></span>
                            </button>
                            <div id="settingsWrapper" class="header-common user-settings-overlay header-hidden-element">
                                <div class="user-settings-section">
                                    <div class="header-common user-settings-header">
                                        <span lang-tran="Settings">Settings</span>
                                    </div>
                                </div>
                                <div class="header-common user-settings-body">
                                    <div class="user-settings-panel">
                                        <div>
                                            <div>
                                                <div>
                                                    <div id="themeCardWrapper" style="display: none">
                                                        <div id="themeCard" class="header-common user-settings-card collapsed-card">
                                                            <div class="header-common user-settings-card-header">
                                                                <div class="header-common user-settings-card-header-label">
                                                                    <span lang-tran="Theme">Theme</span>
                                                                </div>
                                                                <div class="header-common user-settings-card-header-sublabel">
                                                                    <div>
                                                                        <span lang-tran="Choose your favorite theme.">Choose your favorite theme.</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="header-common user-settings-card-value">
                                                                <div>
                                                                    <div id="themeValue" class="user-settings-card-value-content">
                                                                        <a tabindex="0" title="Selected theme: Cosmo">
                                                                            <div class="current-theme-image-wrapper" title="Selected theme: Cosmo" style="background-color: #005aa1">
                                                                                <img class="current-theme-image"/>
                                                                            </div>
                                                                        </a>
                                                                        <span class="current-theme-setting">Cosmo</span>
                                                                    </div>
                                                                    <div class="header-common user-settings-card-combo-wrapper">
                                                                        <div role="region">
                                                                            <div class="theme-list-wrapper">
                                                                                <div class="theme-list-container">
                                                                                    <div class="theme-list-scroller-wrappper">
                                                                                        <div id="themeList">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="header-common user-settings-card-footer">
                                                                <a id="saveTheme" class="header-common user-settings-button emphasized">
                                                                    <span lang-tran="Save">Save</span>
                                                                </a>
                                                                <a id="cancelTheme" class="header-common user-settings-button">
                                                                    <span lang-tran="Cancel">Cancel</span>
                                                                </a>
                                                            </div>
                                                            <div>
                                                                <div class="header-common user-settings-card-collapse-area">
                                                                    <a id="collapseTheme" class="user-settings-card-collapse-button">
                                                                        <span class="ms-Icon ms-Icon--chevronUp"></span>
                                                                    </a>
                                                                    <div class="user-settings-card-expand-button">
                                                                        <span class="ms-Icon ms-Icon--chevronDown"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div id="LTZCard" class="header-common user-settings-card collapsed-card">
                                                            <div class="header-common user-settings-card-header">
                                                                <div class="header-common user-settings-card-header-label">
                                                                    <span lang-tran="Language and time zone">Language and time zone</span>
                                                                </div>
                                                            </div>
                                                            <div class="header-common user-settings-card-value">
                                                                <div>
                                                                    <div id="languageValue" class="user-settings-card-value-content">
                                                                        <span id="languageName1">English (Internatioanl)&lrm;</span>
                                                                    </div>
                                                                    <div class="header-common user-settings-card-combo-wrapper">
                                                                        <div id="languageWrapper" class="user-settings-card-combo-item">
                                                                            <span id="Language" lang-tran="Language">Language</span>
                                                                            <div class="user-settings-card-picker-container">
                                                                                <button class="user-settings-card-picker-button" onclick="chooseLanguage()">
                                                                                    <div class="user-settings-card-picker-button-text-wrapper">
                                                                                        <span class="user-settings-card-picker-button-text"></span>
                                                                                        <div>
                                                                                            <span id="languageName2">English (Internatioanl)&lrm;</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="user-settings-card-picker-button-arrow-wrapper">
                                                                                        <span class="user-settings-card-picker-button-arrow ms-Icon ms-Icon--caretDown"></span>
                                                                                    </div>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div id="timeZoneWrapper" class="user-settings-card-combo-item" style="display: none">
                                                                            <span id="Time Zone" lang-tran="Time Zone">Time Zone</span>
                                                                            <div class="user-settings-card-picker-container">
                                                                                <button class="user-settings-card-picker-button" onclick="chooseTimeZone()">
                                                                                    <div class="user-settings-card-picker-button-text-wrapper">
                                                                                        <span class="user-settings-card-picker-button-text"></span>
                                                                                        <div>
                                                                                            <span id="timeZoneName">(UTC) Coordinated Universal Time</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="user-settings-card-picker-button-arrow-wrapper">
                                                                                        <span class="user-settings-card-picker-button-arrow ms-Icon ms-Icon--caretDown"></span>
                                                                                    </div>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="header-common user-settings-card-footer">
                                                                <a id="saveLTZ" class="header-common user-settings-button emphasized">
                                                                    <span lang-tran="Save">Save</span>
                                                                </a>
                                                                <a id="cancelLTZ" class="header-common user-settings-button">
                                                                    <span lang-tran="Cancel">Cancel</span>
                                                                </a>
                                                            </div>
                                                            <div>
                                                                <div class="header-common user-settings-card-collapse-area">
                                                                    <a id="collapseLTZ" class="user-settings-card-collapse-button">
                                                                        <span class="ms-Icon ms-Icon--chevronUp"></span>
                                                                    </a>
                                                                    <div class="user-settings-card-expand-button">
                                                                        <span class="ms-Icon ms-Icon--chevronDown"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="helpWrapper" class="header-common user-settings-overlay header-hidden-element">
                                <div class="user-settings-section">
                                    <div class="header-common user-settings-header">
                                        <span lang-tran="Help">Help</span>
                                    </div>
                                </div>
                                <div class="header-common user-settings-body">
                                    <div class="user-help-panel">
                                        <div>
                                            <div>
                                                <div id="divHelp">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="notificationsWrapper" class="header-common user-settings-overlay header-hidden-element">
                                <div class="notifications-section">
                                    <div class="header-common user-settings-header">
                                        <span lang-tran="Notifications">Notifications</span>
                                    </div>
                                </div>
                            </div>
                            <div id="accountsWrapper" class="header-common user-settings-overlay header-hidden-element">
                                <div class="user-settings-section">
                                    <div class="header-common user-settings-header">
                                        <span lang-tran="My Accounts">My Accounts</span>
                                    </div>
                                    <div>
                                        <div class="header-common user-settings-info">
                                            <div class="user-settings-photo-wrapper">
                                                <span class="user-settings-photo-placeholder ms-Icon ms-Icon--person ms-icon-font-size-52"></span>
                                                <div class="user-settings-photo-container">
                                                    <img class="user-settings-photo-image userphoto"/>
                                                </div>
                                            </div>
                                            <div class="user-settings-details">
                                                <span class="user-settings-name username">James Smith - Risktech</span>
                                                <span class="user-settings-email useremail">j.s@risktech.io</span>
                                            </div>
                                        </div>
                                        <div id="usersettingslinklist" class="header-common user-settings-linklist"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="accountsWrapperSmall" class="header-common user-settings-small-wrapper header-hidden-element">
                        <div id="environmentcontainers" class="header-common">
                            <div class="header-common">
                                <button class="header-common user-settings-small-menu-item" onclick="showUserSettingsSmallMenuDropdown(this)">
                                    <div class="user-settings-small-menu-item-wrapper">
                                        <div class="user-settings-small-menu-item-content" lang-tran="Environments">Environments</div>
                                        <div class="user user-settings-small-menu-item-glyphwrapper">
                                            <svg class="user user-settings-small-menu-item-glyph" focusable="false" viewBox="0 0 16 16">
                                                <path d="M1.02,5.02L2.05,4L8,9.95L13.95,4l1.02,1.02L8,12L1.02,5.02z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div class="header-common user-settings-small-menu-dropdown header-hidden-element">
                                <ul class="user-settings-small-menu-dropdown-list">
                                    <li>
                                        <button disabled class="user-settings-small-menu-dropdown-option active-option">
                                            <div class="user-settings-small-menu-dropdown-option-item">
                                                <div class="user-settings-small-menu-dropdown-option-label">Tenant 1 (default)</div>
                                            </div>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="user-settings-small-menu-dropdown-option">
                                            <div class="user-settings-small-menu-dropdown-option-item">
                                                <div class="user-settings-small-menu-dropdown-option-label">Tenant 2</div>
                                            </div>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="user-settings-small-menu-dropdown-option">
                                            <div class="user-settings-small-menu-dropdown-option-item">
                                                <div class="user-settings-small-menu-dropdown-option-label">Tenant 3</div>
                                            </div>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="header-common user-settings-small-menu-info">
                            <div class="user-settings-small-menu-user-details">
                                <div class="username">James Smith - Risktech</div>
                                <div class="useremail">j.s@risktech.io</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<div class="content-wrapper">
            <div id="dataurl">VERSION: 98</div>
            <div id="mymessage"></div>
            <div id="mailboxsettingsmessage"></div>
            <div id="supportedtimezonesmessage"></div>
            <div id="userphotomessage"></div>
            <div class="container body-content">
		        <div id='formio'></div>
            </div>
            <div id="renderIndicator" class="rendered btn" />
		</div>
        <div id="applauncher" class="app-launcher-wrapper">
            <div class="app-launcher-content">
                <div class="app-launcher-header">
                    <a href="http://www.office.com/" class="app-launcher-button office" target="_blank">
                        <svg class="app-launcher-button-glyph" focusable="false" viewBox="0 0 16 16">
                            <g>
                                <polygon points="10.066596 16.003531 1.5 12.8404802 10.066596 13.9889688 10.066596 2.48525422 4.39946326 3.85967512 4.39946326 11.6919915 1.5 12.8216525 1.5 3.21953388 10.066596 1.42108547e-14 14.8299999 1.35559321 14.8299999 14.6479378"></polygon>
                            </g>
                        </svg>
                        <span>Office.com</span>
                    </a>
                    <a href="https://account.activedirectory.windowsazure.com/r#/applications" class="app-launcher-button azure" target="_blank">
                        <svg class="app-launcher-button-glyph" focusable="false" viewBox="0 0 16 16">
                            <g>
                                <polygon points="3.65 14.2 16 14.2 9.35 2.67 7.32 8.24 11.21 12.86 3.65 14.2"></polygon>
                                <polygon points="8.82 1.8 4.07 5.78 0 12.83 3.67 12.83 3.67 12.84 8.82 1.8"></polygon>
                            </g>
                        </svg>
                        <span>Azure</span>
                    </a>
                </div>
                <div>
                    <h2>My apps</h2>
                </div>
            </div>
        </div>
        <div id="languages" class="languages-wrapper">
            <div class="ltz-container">
                <div class="ltz-content">
                    <div class="ltz-scroller-container">
                        <div class="ltz-scroller-content">
                            <div id="langarr">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="timeZones" class="time-zones-wrapper">
            <div class="ltz-container">
                <div class="ltz-content">
                    <div class="ltz-scroller-container">
                        <div class="ltz-scroller-content">
                            <div id="tzarr">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
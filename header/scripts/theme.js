/**
 * Maps theme key with an object containing
 * all important data about the theme
 */
var themesMap = {};

themesMap['bluemeanie'] =
{
    bootswatchtheme: 'bluemeanie',
    name: 'Bluemeanie',
    navbarInverseBackgroundColor: '#005aa1'
};

themesMap['cerulean'] =
{
    bootswatchtheme: 'cerulean',
    name: 'Cerulean',
    navbarInverseBackgroundColor: '#033c73'
};

themesMap['cosmo'] =
{
    bootswatchtheme: 'cosmo',
    name: 'Cosmo',
    navbarInverseBackgroundColor: '#2780e3'
};

themesMap['cyborg'] =
{
    bootswatchtheme: 'cyborg',
    name: 'Cyborg',
    navbarInverseBackgroundColor: '#222222'
};

themesMap['darkly'] =
{
    bootswatchtheme: 'darkly',
    name: 'Darkly',
    navbarInverseBackgroundColor: '#00bc8c'
};

themesMap['flatly'] =
{
    bootswatchtheme: 'flatly',
    name: 'Flatly',
    navbarInverseBackgroundColor: '#18bc9c'
};

themesMap['journal'] =
{
    bootswatchtheme: 'journal',
    name: 'Journal',
    navbarInverseBackgroundColor: '#eb6864'
};

themesMap['lumen'] =
{
    bootswatchtheme: 'lumen',
    name: 'Lumen',
    navbarInverseBackgroundColor: '#ffffff'
};

themesMap['paper'] =
{
    bootswatchtheme: 'paper',
    name: 'Paper',
    navbarInverseBackgroundColor: '#2196f3'
};

themesMap['readable'] =
{
    bootswatchtheme: 'readable',
    name: 'Readable',
    navbarInverseBackgroundColor: '#ffffff'
};

themesMap['sandstone'] =
{
    bootswatchtheme: 'sandstone',
    name: 'Sandstone',
    navbarInverseBackgroundColor: '#93c54b'
};

themesMap['simplex'] =
{
    bootswatchtheme: 'simplex',
    name: 'Simplex',
    navbarInverseBackgroundColor: '#d9230f'
};

themesMap['slate'] =
{
    bootswatchtheme: 'slate',
    name: 'Slate',
    navbarInverseBackgroundColor: '#7a8288'
};

themesMap['spacelab'] =
{
    bootswatchtheme: 'spacelab',
    name: 'Spacelab',
    navbarInverseBackgroundColor: '#446e9b'
};

themesMap['superhero'] =
{
    bootswatchtheme: 'superhero',
    name: 'Superhero',
    navbarInverseBackgroundColor: '#df691a'
};

themesMap['united'] =
{
    bootswatchtheme: 'united',
    name: 'United',
    navbarInverseBackgroundColor: '#772953'
};

themesMap['yeti'] =
{
    bootswatchtheme: 'yeti',
    name: 'Yeti',
    navbarInverseBackgroundColor: '#008cba'
};

/**
 * Theme selector model
 */
var themeSelector =
{
    currentTheme: 'cosmo',
    selectedTheme: 'cosmo'
};

var themePropertyExtensionId = "frm-hdr-user-properies";

function setupTheme(theme) {
    if (themesMap[theme]) {
        themeSelector.selectedTheme = theme;
        themeSelector.currentTheme = theme;
        setupStyle(true);
    }
}

/**
 * Reads style settings (bootswatch theme) from brand.json.js and applies it
 */
function setupStyle(overrideBrandTheme)
{
    var bootswatchStyleDE = document.createElement("link");
    bootswatchStyleDE.id = "bodystyle";
    bootswatchStyleDE.rel = "stylesheet";
    
    // We should show the form after new styles has been loaded to prevent FOUC
    bootswatchStyleDE.onload = sc1();//showContentOnStyleApply();
    if (!overrideBrandTheme && typeof brandObj !== 'undefined' && brandObj["bootswatchtheme"])
    {
        themeSelector.currentTheme = brandObj["bootswatchtheme"];
        themeSelector.selectedTheme = themeSelector.currentTheme;
    }
    
    setupThemeMenu();
    
    bootswatchStyleDE.href = "./ress/css/" + themesMap[themeSelector.currentTheme].bootswatchtheme + "/bootstrap.min.css";
    var layoutStyleNode = document.getElementById("layoutstyle");
    layoutStyleNode.parentNode.insertBefore(bootswatchStyleDE, layoutStyleNode.nextSibling);
    
    var headerStyleDE = document.createElement("link");
    headerStyleDE.id = "themelayoutstyle";
    headerStyleDE.rel = "stylesheet";
    headerStyleDE.onload = sc2();
    headerStyleDE.href = "./ress/css/" + themesMap[themeSelector.currentTheme].bootswatchtheme + "/layout-override.css";
    layoutStyleNode.parentNode.insertBefore(headerStyleDE, layoutStyleNode.nextSibling);
}

/**
 * Generates theme menu
 */
function setupThemeMenu()
{
    setThemeValue();
    $.each(themesMap, function(code, value)
    {
        var languageItem = '<a id="' +code + '" class="theme-card'
            + (code === themeSelector.currentTheme ? (' selected-theme" title="' + langLayoutObj[languageSelector.currentLanguage]["Selected theme"])
                : ('" title="' + langLayoutObj[languageSelector.currentLanguage]["Apply theme"])) + value.name + '" onclick="selectTheme(\'' + code + '\')">'
            + '<div class="theme-image-wrapper" title="'
            + (code === themeSelector.currentTheme ? (langLayoutObj[languageSelector.currentLanguage]["Selected theme"])
                : (langLayoutObj[languageSelector.currentLanguage]["Apply theme"])) + value.name + '" style="background-color: ' + value.navbarInverseBackgroundColor + '">'
            + '<img class="theme-image"/></div></a>';
        $('#themeList').append(languageItem);
    });
}

/**
 * Changes theme selection in theme menu to themeSelector.selectedTheme
 */
function setThemeSettings()
{
    var oldThemeTitle = $('.selected-theme').attr("title");
    $('.selected-theme').attr("title", langLayoutObj[languageSelector.currentLanguage]["Apply theme"] + oldThemeTitle.substring(langLayoutObj[languageSelector.currentLanguage]["Selected theme"].length));
    $('.selected-theme').find('div').attr("title", langLayoutObj[languageSelector.currentLanguage]["Apply theme"] + oldThemeTitle.substring(langLayoutObj[languageSelector.currentLanguage]["Selected theme"].length));
    $('.selected-theme').removeClass('selected-theme');
    var newThemeTitle = $('#' + themeSelector.selectedTheme).attr("title");
    $('#' + themeSelector.selectedTheme).attr("title", langLayoutObj[languageSelector.currentLanguage]["Selected theme"] + newThemeTitle.substring(langLayoutObj[languageSelector.currentLanguage]["Apply theme"].length));
    $('#' + themeSelector.selectedTheme).find('div').attr("title", langLayoutObj[languageSelector.currentLanguage]["Selected theme"] + newThemeTitle.substring(langLayoutObj[languageSelector.currentLanguage]["Apply theme"].length));
    $('#' + themeSelector.selectedTheme).addClass('selected-theme');
}

/**
 * Sets theme value in the theme manu to themeSelector.currentTheme
 */
function setThemeValue()
{
    $('#themeValue').html('<a tabindex="0" title="' + langLayoutObj[languageSelector.currentLanguage]["Selected theme"] + themesMap[themeSelector.currentTheme].name
        + '"><div class="current-theme-image-wrapper" title="' + langLayoutObj[languageSelector.currentLanguage]["Selected theme"] + themesMap[themeSelector.currentTheme].name
        + '" style="background-color: ' + themesMap[themeSelector.currentTheme].navbarInverseBackgroundColor + '"><img class="current-theme-image"/></div></a><span class="current-theme-setting">'
        + themesMap[themeSelector.currentTheme].name + '</span>');
}

/**
 * Selects chosen theme
 */
function selectTheme(theme)
{
    themeSelector.selectedTheme = theme;
    setThemeSettings();
}

/**
 * Applies currently selected theme
 */
function applyTheme()
{
    $('.content-wrapper').hide();
    themeSelector.currentTheme = themeSelector.selectedTheme;
    setThemeValue();
    document.getElementById('themelayoutstyle').href = "./ress/css/" + themesMap[themeSelector.currentTheme].bootswatchtheme + "/layout-override.css";
    document.getElementById('bodystyle').href = "./ress/css/" + themesMap[themeSelector.currentTheme].bootswatchtheme + "/bootstrap.min.css";
    
    // We should show the form after new styles has been loaded to prevent FOUC
    document.getElementById('bodystyle').onload = showContentOnStyleApply();
    
    // Update user's property extensions
    if (isUseUserPropertyExtensions() && userPropertyExtensionsAvailable  && isSignedInUser()) {
        updateThemePropertyExtension(themeSelector.currentTheme);
    }
}

/**
 * Clears theme selection
 */
function resetTheme()
{
    themeSelector.selectedTheme = themeSelector.currentTheme;
    setThemeSettings();
}

var scl1 = false;
function sc1() {
   scl1 = true;
   showContentOnStyleApply();
}

var scl2 = false;
function sc2() {
   scl2 = true;
   showContentOnStyleApply();
}

/**
 * Shows content when bootstrap or bootswatch style is loaded and applied to the content
 */
function showContentOnStyleApply()
{
   if (scl1 && scl2) {
    // We added btn class to this element and it will have text-align
    // set to center once bootswatch has been rendered
//    if ($("#renderIndicator").css("text-align") !== "right" && $("#headerRenderIndicator").css("text-align") === "right")
//    {
/*   
console.log($('.header-border')[0].style);
console.log($('.content-wrapper')[0].style);
       
        console.log("Style apply 1");
        $('.header-border').show();        
        console.log("Style apply 2");
        $('.content-wrapper').show();
        console.log("Style apply 3");
*/        
        /*
        var hbstr = $('.header-border').html();
        var cwstr = $('.content-wrapper').html();
        $('.header-border').html(hbstr);
        $('.content-wrapper').html(cwstr);
console.log('opa');     
     */
        /*
        $('.header-border').trigger('click');        
        console.log("Style apply 4c");
        $('.content-wrapper').trigger('click');
        console.log("Style apply 5c");
   */
        
        /*
        $('.header-border')[0].style.display='none';
        $('.header-border')[0].offsetHeight;
        $('.header-border')[0].style.display='block';
        console.log("Style apply 4");
        $('.content-wrapper')[0].style.display='none';
        $('.content-wrapper')[0].offsetHeight;
        $('.content-wrapper')[0].style.display='block';
        console.log("Style apply 5");
        */
        /*
        $('.header-border').hide();
        console.log("Style apply 4");
        $('.content-wrapper').hide();
        console.log("Style apply 5");
        $('.header-border').show();
        console.log("Style apply 6");
        $('.content-wrapper').show();
        console.log("Style apply 7");
        $('.header-border').hide();
        setTimeout(function() {
         $('.header-border').show();
         console.log("Style apply 6r");
        }, 0);
        console.log("Style apply 4");
        $('.content-wrapper').hide();
         setTimeout(function() {
         $('.content-wrapper').show();
         console.log("Style apply 7r");
        }, 0);
        console.log("Style apply 5");
                */

/*    }
    else
    {
        setTimeout(showContentOnStyleApply, 50);
        console.log('Not found.');
    }
*/    
//showdivs();
showdivswithtimeout();
console.log('sync.');
   } else {
      console.log('nije sync jos.');
   }
}

function showdivs () {
   console.log('hide spinner');
   $('#mainSpinner').hide();

   console.log($('.header-border')[0].style);
   console.log($('.content-wrapper')[0].style);       
   console.log("Style apply 1");
   $('.header-border').show();        
   console.log("Style apply 2");
   $('.content-wrapper').show();
   console.log("Style apply 3");
}

function showdivswithtimeout () {
   if ($("#renderIndicator").css("text-align") !== "right" && $("#headerRenderIndicator").css("text-align") === "right") {
      showdivs();
      console.log('divs shown');
   } else {
      setTimeout(showdivswithtimeout, 50);
      console.log('not fnd');
   }
}

//    {
/**
 * Translates titles in the theme settings menu
 */
function changeLanguageForThemeSettings(oldLanguage, newLanguage)
{
    setThemeValue();
    $.each(themesMap, function(code, value)
    {
        $('#' + code).attr('title', (code === themeSelector.currentTheme ? langLayoutObj[languageSelector.currentLanguage]["Selected theme"]
            : langLayoutObj[languageSelector.currentLanguage]["Apply theme"]) + value.name);
        $('#' + code).find('.theme-image-wrapper').attr('title', (code === themeSelector.currentTheme ? langLayoutObj[languageSelector.currentLanguage]["Selected theme"]
            : langLayoutObj[languageSelector.currentLanguage]["Apply theme"]) + value.name);
    });
}
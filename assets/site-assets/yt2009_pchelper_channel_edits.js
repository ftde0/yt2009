function channel_edit_tab(param) {
    var tabs = ["info", "colors", "layout", "playnav"]
    for(var t in tabs) {
        if(tabs[t] && document.getElementById("tab_contents_" + tabs[t])) {
            document.getElementById("tab_contents_" + tabs[t]).style.display = "none"
            document.getElementById("channel_tab_" + tabs[t]).className = "channel_settings_tab"
        }
    }
    if(document.getElementById("tab_contents_" + param)) {
        document.getElementById("tab_contents_" + param).style.display = "block"
        document.getElementById("channel_tab_" + param).className = "channel_settings_tab channel_settings_tab_active"
    }

    if(param == "close"
    && document.getElementById("pchelper-customization-preview")) {
        var previewStyling = document.getElementById(
            "pchelper-customization-preview"
        )
        document.body.removeChild(previewStyling)
        document.getElementById("channel_title").innerHTML = originalChannelTitle

        var previewBoxes = [
            "user_friends", "user_comments", "user_subscriptions",
            "user_recent_activity", "user_subscribers"
        ]
        for(var p in previewBoxes) {
            if(previewBoxes[p]
            && document.getElementById(previewBoxes[p])
            && document.getElementById(previewBoxes[p]).className
            && document.getElementById(previewBoxes[p]).className
                       .indexOf("yt2009-preview") !== -1) {
                var e = document.getElementById(previewBoxes[p])
                e.parentNode.removeChild(e)
            }
        }
    }
}
function open_theme_editor() {
    document.getElementById("theme_edit_link").style.display = "none"
    document.getElementById("theme_edit_link_hide").style.display = "block"
    document.getElementById("theme_advanced_editor").style.display = "block"
}
function hide_theme_editor() {
    document.getElementById("theme_edit_link").style.display = "block"
    document.getElementById("theme_edit_link_hide").style.display = "none"
    document.getElementById("theme_advanced_editor").style.display = "none"
}
var colorGridPopupTarget;
function popup_color_grid(target) {
    document.getElementById("popup_color_grid").style.display = "block"
    target = document.getElementById(target)
    colorGridPopupTarget = target;
    var x = target.getBoundingClientRect().left - 20
    var y = target.getBoundingClientRect().top + target.getBoundingClientRect().height
    document.getElementById("popup_color_grid").style.left = Math.floor(x) + "px"
    document.getElementById("popup_color_grid").style.top = Math.floor(y) + "px"
}
var currentTheme = "default"
var premadeProperties = {
    "default": {
        "background_color": "#CCCCCC",
        "wrapper_color": "#999999",
        "wrapper_text_color": "#000000",
        "wrapper_link_color": "#0000cc",
        "box_background_color": "#eeeeff",
        "title_text_color": "#000000",
        "link_color": "#0000cc",
        "body_text_color": "#333333"
    },
    "blue": {
        "background_color": "#003366",
        "wrapper_color": "#0066CC",
        "wrapper_text_color": "#ffffff",
        "wrapper_link_color": "#0000CC",
        "box_background_color": "#3D8BD8",
        "title_text_color": "#ffffff",
        "link_color": "#99C2EB",
        "body_text_color": "#ffffff"
    },
    "red": {
        "background_color": "#660000",
        "wrapper_color": "#990000",
        "wrapper_text_color": "#FFFFFF",
        "wrapper_link_color": "#FF0000",
        "box_background_color": "#660000",
        "title_text_color": "#FFFFFF",
        "link_color": "#FF0000",
        "body_text_color": "#FFFFFF"
    },
    "sunlight": {
        "background_color": "#FFE599",
        "wrapper_color": "#E69138",
        "wrapper_text_color": "#FFFFFF",
        "wrapper_link_color": "#FFD966",
        "box_background_color": "#FFD966",
        "title_text_color": "#E69138",
        "link_color": "#FFFFFF",
        "body_text_color": "#E69138"
    },
    "forest": {
        "background_color": "#274E13",
        "wrapper_color": "#38761D",
        "wrapper_text_color": "#ffffff",
        "wrapper_link_color": "#FFFFFF",
        "box_background_color": "#6AA84F",
        "title_text_color": "#274E13",
        "link_color": "#38761D",
        "body_text_color": "#274E13"
    },
    "8bit": {
        "font": 4,
        "background_color": "#666666",
        "wrapper_color": "#444444",
        "wrapper_text_color": "#FFFFFF",
        "wrapper_link_color": "#FF0000",
        "box_background_color": "#000000",
        "title_text_color": "#AAAAAA",
        "link_color": "#FF0000",
        "body_text_color": "#666666"
    },
    "princess": {
        "background_color": "#ff99cc",
        "wrapper_color": "#aa66cc",
        "wrapper_text_color": "#ffffff",
        "wrapper_link_color": "#351C75",
        "box_background_color": "#ffffff",
        "title_text_color": "#8a2c87",
        "link_color": "#351C75",
        "body_text_color": "#333366"
    },
    "fire": {
        "background_color": "#660000",
        "wrapper_color": "#FF0000",
        "wrapper_text_color": "#ffffff",
        "wrapper_link_color": "#FFFF00",
        "box_background_color": "#FF9900",
        "title_text_color": "#FFFF00",
        "link_color": "#FFDBA6",
        "body_text_color": "#ffffff"
    },
    "stealth": {
        "background_color": "#000000",
        "wrapper_color": "#444444",
        "wrapper_text_color": "#000000",
        "wrapper_link_color": "#CCCCCC",
        "box_background_color": "#666666",
        "title_text_color": "#000000",
        "link_color": "#FFFFFF",
        "body_text_color": "#444444"
    },
    "clean": {
        "background_color": "#FFFFFF",
        "wrapper_color": "#D6D6D6",
        "wrapper_text_color": "#666666",
        "wrapper_link_color": "#0033CC",
        "box_background_color": "#FFFFFF",
        "title_text_color": "#666666",
        "link_color": "#0033CC",
        "body_text_color": "#000000"
    }
}
var customThemeData = {}
function select_popup_color(c) {
    colorGridPopupTarget.value = c.toLowerCase();
    document.getElementById("popup_color_grid").style.display = "none"
    var i = colorGridPopupTarget.id
    document.getElementById(i + "-preview").style.backgroundColor = c.toLowerCase()
    edit_main_theme()
    applyPreviewStyle(serializeCurrent())
}
function applyColorPreview(id) {
    var c = document.getElementById(id).value
    document.getElementById(id + "-preview").style.backgroundColor = c.toLowerCase()
}
function blur_color_picker(e) {
    document.getElementById("popup_color_grid").style.display = "none"
    edit_main_theme()
}
function applyPremade(el, source) {
    var e = premadeProperties[el]
    var fontPickr = document.getElementById("font")
    var o = fontPickr.getElementsByTagName("option")
    for(var z in o) {
        if(o[z] && o[z].selected) {
            o[z].selected = false
        }
    }
    if(!e.font) {
        fontPickr.getElementsByTagName("option")[1].selected = true;
    } else {
        fontPickr.getElementsByTagName("option")[e.font].selected = true;
    }

    for(var p in e) {
        if(e[p] && p !== "font") {
            try {
                document.getElementById(p).value = e[p]
                document.getElementById(p + "-preview").style.backgroundColor = e[p]
            }
            catch(error) {}
        }
    }

    if(source && source !== "create_new") {
        applyPreviewStyle(e)
    }
}
function set_theme_obj(el) {
    if(currentTheme == "custom") {
        customThemeData = serializeCurrent()
    }


    var themeDivs = document.getElementById("theme_container").getElementsByTagName("div")
    for(var t in themeDivs) {
        if(themeDivs[t] && themeDivs[t].className
        && themeDivs[t].className.indexOf("theme_selected") !== -1) {
            themeDivs[t].className = themeDivs[t].className.replace(
                " theme_selected", ""
            )
            themeDivs[t].className = themeDivs[t].className.replace(
                "theme_selected", ""
            )
        }
    }

    document.getElementById(el).className += " theme_selected"

    var display = el.substring(0,1).toUpperCase() + el.substring(1)
    document.getElementById("theme_display_name").innerHTML = display;

    var premade = [
        "default", "blue", "red", "sunlight",
        "forest", "8bit", "princess", "fire",
        "stealth", "clean"
    ]

    if(premade.indexOf(el) !== -1) {
        applyPremade(el, "click")
    }

    if(el == "custom") {
        serializedToPickers(customThemeData)
        applyPreviewStyle(customThemeData)
    }

    currentTheme = el;
}
function serializeCurrent(fNames, cNames) {
    var fields = [
        "font", "wrapper_opacity", "box_opacity", "background_color",
        "wrapper_color", "wrapper_text_color", "wrapper_link_color",
        "box_background_color", "title_text_color", "link_color",
        "body_text_color", "background_image"
    ]
    var checkboxes = ["background_repeat_check", "hide_def_banner_check"]

    if(!fNames) {
        fNames = fields;
    }
    if(!cNames) {
        cNames = checkboxes;
    }
    
    var tr = {
        "fields": {},
        "checkboxes": {}
    }

    for(var f in fNames) {
        if(fNames[f] && document.getElementById(fNames[f])) {
            tr.fields[fNames[f]] = document.getElementById(fNames[f]).value;
        }
    }
    for(var c in cNames) {
        if(cNames[c] && document.getElementById(cNames[c])) {
            tr.checkboxes[cNames[c]] = document.getElementById(cNames[c]).checked;
        }
    }

    return tr;
}
function serializeAll() {
    var allFields = [
        "channel_title_input", "channel_type", "keywords", "font",
        "wrapper_opacity", "box_opacity", "background_color",
        "wrapper_color", "wrapper_text_color", "wrapper_link_color",
        "box_background_color", "title_text_color", "link_color",
        "body_text_color", "default_view", "default_set",
        "featured_video_id", "featured_video_url", "background_image"
    ]
    var allCheckboxes = [
        "background_repeat_check", "hide_def_banner_check",
        "box_status_user_comments", "box_status_user_hubber_links",
        "box_status_user_recent_activity", "box_status_user_subscribers",
        "box_status_user_subscriptions", "display_uploads", "display_favorites",
        "display_playlists", "display_all", "enable_autoplay"
    ]
    
    var serializi = serializeCurrent(allFields, allCheckboxes)
    serializi.themeName = currentTheme;

    return serializi
}
function serializedToPickers(serializedData) {
    var fields = serializedData.fields;
    for(var f in fields) {
        if(fields[f] && document.getElementById(f)) {
            document.getElementById(f).value = fields[f]
            if(document.getElementById(f + "-preview")) {
                document.getElementById(f + "-preview").style.backgroundColor = fields[f]
            }
        }
    }

    var checkboxes = serializedData.checkboxes;
    for(var c in checkboxes) {
        if(checkboxes[c] && document.getElementById(c)) {
            document.getElementById(c).value = checkboxes[c]
        }
    }
}
function create_new_theme() {
    if(document.getElementById("custom")) return;
    var c = document.getElementById("clean").cloneNode(true)
    c.id = "custom"
    c.getElementsByTagName("span")[3].innerHTML = "Custom"
    applyPremade("clean", "create_new")
    document.getElementById("theme_container").appendChild(c)
    document.getElementById("theme_new_link").style.display = "none"
    set_theme_obj("custom")
}
function edit_main_theme() {
    if(currentTheme !== "custom") {
        var a = serializeCurrent()
        create_new_theme()
        serializedToPickers(a)
    }
    applyPreviewStyle(serializeCurrent())
}
function _showdiv(id) {
    document.getElementById(id).className = document.getElementById(id).className.replace(" hid", "")
}
function _hidediv(id) {
    document.getElementById(id).className += " hid"
}
function save_all() {
    var pcks = document.getElementById("edit_controls").getElementsByTagName("div")
    for(var d in pcks) {
        if(pcks[d] && pcks[d].className == "save_overlay") {
            pcks[d].style.visibility = "visible"
        }
    }
    var data = ""
    if(window.JSON && window.JSON.stringify) {
        data = JSON.stringify(serializeAll())
    } else {
        var td = serializeAll()
        data = '{"checkboxes":{'
        for(var c in td.checkboxes) {
            data += '"' + c + '":' + (td.checkboxes[c] ? "1" : "0") + ","
        }
        data += '},"fields":{'
        for(var f in td.fields) {
            data += '"' + f + '":"' + td.fields[f].split('"').join("&quot;") + '",'
        }
        data += '}'
        if(td.themeName) {
            data += ',"themeName":"' + td.themeName + '"}'
        } else {
            data += "}"
        }
        data = data.split(",}").join("}")
    }

    document.getElementById("submiteto-data").value = data;
    document.getElementById("hidden_main_submiteto").submit()
}
function removeBgChoice() {
    document.getElementById("background_image").value = ""
    var notice = document.getElementById("uploaded-notice")
    notice.parentNode.removeChild(notice)
}
var originalChannelTitle = document.getElementById("channel_title").innerHTML
function length_check(event, input, target) {
    if(input.id && input.id == "channel_title_input") {
        var name = input.value || originalChannelTitle
        name = name.split("<").join("&lt;").split(">").join("&gt;");
        document.getElementById("channel_title").innerHTML = name;
    }
}
var allowPreviewApply = false;
setTimeout(function() {
    allowPreviewApply = true;
}, 500)
function applyPreviewStyle(styling) {
    if(!allowPreviewApply) return;
    if(!document.getElementById("pchelper-customization-preview")) {
        var style = document.createElement("style")
        style.id = "pchelper-customization-preview"
        document.body.appendChild(style)
    }
    var checkboxes = {}
    if(styling.checkboxes && styling.fields) {
        checkboxes = styling.checkboxes;
        styling = styling.fields;
    }
    var style = document.getElementById("pchelper-customization-preview")
    var wrapperOpacity = parseInt((styling.wrapper_opacity || 255))
    wrapperOpacity = wrapperOpacity.toString("16")
    if(wrapperOpacity == "0") {
        wrapperOpacity = "00"
    }
    var innerboxOpacity = parseInt((styling.box_opacity || 255))
    innerboxOpacity = innerboxOpacity.toString("16")
    if(innerboxOpacity == "0") {
        innerboxOpacity = "00"
    }
    var fontDisplayTable = {
        "Arial": "\"Arial\", sans-serif",
        "Times New Roman": "\"Times New Roman\", serif",
        "Verdana": "\"Verdana\", system-ui",
        "Georgia": "\"Georgia\", serif",
        "Courier New": "\"Courier New\", monospace"
    }
    var fontsTable = [
        "\"Times New Roman\", serif",
        "\"Arial\", sans-serif",
        "\"Verdana\", system-ui",
        "\"Georgia\", serif",
        "\"Courier New\", monospace"
    ]
    var font = fontDisplayTable[styling.font]
    if(typeof(styling.font) == "number") {
        font = fontsTable[styling.font]
    }

    var uploadsCheckbox = document.getElementById("display_uploads")
    var favsCheckbox = document.getElementById("display_favorites")
    var playlistsCheckbox = document.getElementById("display_playlists")
    var allCheckbox = document.getElementById("display_all")
    
    var commentsCheckbox = document.getElementById("box_status_user_comments")
    var friendsCheckbox = document.getElementById("box_status_user_hubber_links")
    var postsCheckbox = document.getElementById("box_status_user_recent_activity")
    var subsToCheckbox = document.getElementById("box_status_user_subscribers")
    var subsFromCheckbox = document.getElementById("box_status_user_subscriptions")

    var code = TEMPLATE_STYLING
               .split("yt2009_main_bg")
               .join(styling.background_color + wrapperOpacity)
               .split("yt2009_darker_bg")
               .join(styling.wrapper_color + innerboxOpacity)
               .split("yt2009_innerbox_main_bg")
               .join(styling.box_background_color + innerboxOpacity)
               .split("yt2009_text_color")
               .join(styling.body_text_color)
               .split("yt2009_wrapper_title_text_color")
               .join(styling.wrapper_text_color)
               .split("yt2009_link_color")
               .join(styling.link_color)
               .split("yt2009_title_text_color")
               .join(styling.title_text_color)
               .split("yt2009_font")
               .join(font)
               .split("yt2009_repeat_bg")
               .join(checkboxes.background_repeat_check ? "repeat" : "no-repeat")
    if(checkboxes.hide_def_banner_check) {
        code += TEMPLATE_HIDEBANNER
    }
    if(styling.background_image) {
        code += TEMPLATE_BG.replace(
            "BG_ID", styling.background_image
        )
    }

    // create friends box
    if(document.getElementById("user_friends")
    && document.getElementById("user_friends").className.indexOf("hid") !== -1) {
        var f = document.getElementById("user_friends")
        document.getElementById("main-channel-right").removeChild(f)
    }
    if(friendsCheckbox.checked
    && !document.getElementById("user_friends")) {
        console.log("adding friends")
        var friends = document.createElement("div")
        friends.id = "user_friends"
        friends.className = "inner-box yt2009-preview"
        friends.innerHTML = TEMPLATE_FRIENDS;
        document.getElementById("main-channel-right").appendChild(friends)
    } else if(!friendsCheckbox.checked
    && document.getElementById("user_friends")) {
        console.log("hiding friends")
        code += "#user_friends {display: none !important;}"
    }
    // create subscribers box
    if(subsToCheckbox.checked
    && !document.getElementById("user_subscribers")) {
        var subs = document.createElement("div")
        subs.id = "user_subscribers"
        subs.className = "inner-box yt2009-preview"
        subs.innerHTML = TEMPLATE_SUBSCRIBERS;
        document.getElementById("main-channel-right").appendChild(subs)
    } else if(!subsToCheckbox.checked
    && document.getElementById("user_subscribers")) {
        code += "#user_subscribers {display: none !important;}"
    }
    // create comments box
    if(commentsCheckbox.checked
    && !document.getElementById("user_comments")) {
        var comments = document.createElement("div")
        comments.id = "user_comments"
        comments.className = "inner-box yt2009-preview"
        comments.innerHTML = TEMPLATE_COMMENTS;
        document.getElementById("main-channel-right").appendChild(comments)
    } else if(!commentsCheckbox.checked
    && document.getElementById("user_comments")) {
        code += "#user_comments {display: none !important;}"
    }
    // create subscriptions box
    if(document.getElementById("user_subscriptions")
    && document.getElementById("user_subscriptions").className.indexOf("hid") !== -1) {
        var f = document.getElementById("user_subscriptions")
        document.getElementById("main-channel-left").removeChild(f)
    }
    if(subsFromCheckbox.checked
    && !document.getElementById("user_subscriptions")) {
        var subs = document.createElement("div")
        subs.id = "user_subscriptions"
        subs.className = "inner-box yt2009-preview"
        subs.innerHTML = TEMPLATE_SUBSCRIPTIONS;
        document.getElementById("main-channel-left").appendChild(subs)
    } else if(!subsFromCheckbox.checked
    && document.getElementById("user_subscriptions")) {
        code += "#user_subscriptions {display: none !important;}"
    }
    // create recent activity box
    if(postsCheckbox.checked
    && !document.getElementById("user_recent_activity")) {
        var posts = document.createElement("div")
        posts.id = "user_recent_activity"
        posts.className = "inner-box yt2009-preview"
        posts.innerHTML = TEMPLATE_ACTIVITY;
        document.getElementById("main-channel-left").appendChild(posts)
    } else if(!postsCheckbox.checked
    && document.getElementById("user_recent_activity")) {
        code += "#user_recent_activity {display: none !important;}"
    }

    // hide scrollbox buttons as needed
    if(!allCheckbox.checked) {
        code += "#playnav-navbar-tab-all {display: none;}"
    }
    if(!playlistsCheckbox.checked) {
        code += "#playnav-navbar-tab-playlists {display: none;}"
    }
    if(!uploadsCheckbox.checked) {
        code += "#playnav-navbar-tab-uploads {display: none;}"
    }
    if(!favsCheckbox.checked) {
        code += "#playnav-navbar-tab-favorites {display: none;}"
    }

    style.innerHTML = code;

    var view = document.getElementById("default_view").selectedIndex
    switch(view) {
        case 0: {
            playnav_view("play")
            break;
        }
        case 1: {
            playnav_view("grid")
            break;
        }
    }
}
function backgroundUploadedCallback() {
    applyPreviewStyle(serializeCurrent())
}


var TEMPLATE_STYLING = "#channel-body, .channel-bg-color {background-color: #c8c8c8;}#channel-body {background-repeat: no-repeat;}.outer-box, .outer-box-bg-color, .playnav-item .selector, .playnav-video.selected {background-color: #878787;}.outer-box-bg-as-border, .panel-tab-indicator-arrow, .inner-box-bg-as-border-color, .inner-box-bg-color-as-border-color {border-color: #878787;}#playnav-chevron {border-left-color: #878787;}.outer-box, .outer-box-color, .inner-box, .inner-box-color, .inner-box-colors, .inner-box-colors .playnav-show .show-facets .show-mini-description {color: black;}.panel-tab-selected a, .outer-box a, .outer-box-bg-color a, .outer-box-link-color, .outer-box .inner-box a, .outer-box .inner-box-colors a, .outer-box .inner-box-bg-color a, .outer-box .inner-box-link-color, a.inner-box-color-as-link {color: black;}.outer-box-link-as-border-color, .link-as-border-color, .box-outline-color {border-color: black;}#channel-body {font-family: arial;}.title-text-color, .title-text {color: black !important;}a.title-text-color,.title-text-color a {color: black !important;}.wrapper-title-text {color: black !important;}.view-button .a {background-color: black;}.inner-box, .inner-box-colors, .inner-box-bg-color {background-color: #c8c8c8;}.panel-tab-selected .panel-tab-indicator-arrow {border-bottom-color: #c8c8c8 !important;}.view-button .tri {border-left-color: #c8c8c8;}.poll-option .option-fill,.quiz-option .option-fill,.playnav_comments {border: 1px black solid;}\
\
#channel-body, .channel-bg-color {background-color: yt2009_main_bg;}#channel-body {background-repeat: yt2009_repeat_bg;}.outer-box, .outer-box-bg-color, .playnav-item .selector, .playnav-video.selected {background-color: yt2009_darker_bg;}.outer-box-bg-as-border, .panel-tab-indicator-arrow, .inner-box-bg-as-border-color, .inner-box-bg-color-as-border-color {border-color: yt2009_darker_bg;}#playnav-chevron {border-left-color: yt2009_darker_bg;}.outer-box, .outer-box-color, .inner-box, .inner-box-color, .inner-box-colors, .inner-box-colors .playnav-show .show-facets .show-mini-description {color: yt2009_text_color;}.panel-tab-selected a, .outer-box a, .outer-box-bg-color a, .outer-box-link-color, .outer-box .inner-box a, .outer-box .inner-box-colors a, .outer-box .inner-box-bg-color a, .outer-box .inner-box-link-color, a.inner-box-color-as-link {color: yt2009_link_color;}.outer-box-link-as-border-color, .link-as-border-color, .box-outline-color {border-color: yt2009_text_color;}#channel-body {font-family: yt2009_font;}.title-text-color, .title-text {color: yt2009_title_text_color !important;}a.title-text-color,.title-text-color a {color: yt2009_link_color !important;}.wrapper-title-text {color: yt2009_wrapper_title_text_color !important;}.view-button .a {background-color: yt2009_link_color;}.inner-box, .inner-box-colors, .inner-box-bg-color {background-color: yt2009_innerbox_main_bg;}.panel-tab-selected .panel-tab-indicator-arrow {border-bottom-color: yt2009_main_bg !important;}.view-button .tri {border-left-color: yt2009_main_bg;}.poll-option .option-fill,.quiz-option .option-fill,.playnav_comments {border: 1px yt2009_text_color solid;}"
var TEMPLATE_BG = "#channel-body {background-image: url(\"/cbg_proxie?id=BG_ID\")}"
var TEMPLATE_HIDEBANNER = "#user_banner {display: none;}"
var TEMPLATE_SUBSCRIPTIONS = '<div style="zoom:1"><div class="box-title title-text-color">Subscriptions</div><div style="float:right;zoom:1;_display:inline;white-space:nowrap"><div style="float:right"></div></div><div class="cb"></div></div><div id="user_subscriptions-body"><span>Your subscriptions will show up here</span></div><div class="clear"></div>'
var TEMPLATE_SUBSCRIBERS = '<div style="zoom:1"><div class="box-title title-text-color">Subscribers</div><div class="cb"></div></div><div id="user_subscribers-body"><span>Your subscribers will show up here</span></div><div class="clear"></div>'
var TEMPLATE_ACTIVITY = '<div style="zoom:1"><div class="box-title title-text-color">Recent Activity &nbsp;</div><div class="cb"></div></div><div id="user_recent_activity-body"><span>Your posts will show up here</span></div><div class="clear"></div>'
var TEMPLATE_FRIENDS = '<div style="zoom:1"><div class="box-title title-text-color">Friends</div><div class="cb"></div></div></div><div id="user_friends-body"><span>Your friends will show up here</span></div><div class="clear"></div>'
var TEMPLATE_COMMENTS = '<div id="user_comments-body"><div style="zoom:1"><div class="box-title title-text-color">Channel Comments</div><div class="cb"></div></div><div id="user_comments-body"><div class="commentsTableFull text-field outer-box-bg-as-border" style="_width:610px"><div class="alignC">Your comments will show up here</div></div></div><div class="clear"></div></div>'
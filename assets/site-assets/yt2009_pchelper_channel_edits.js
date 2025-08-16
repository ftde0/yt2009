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
        "background_color": "#FFF",
        "wrapper_color": "#D6D6D6",
        "wrapper_text_color": "#666",
        "wrapper_link_color": "#03C",
        "box_background_color": "#FFF",
        "title_text_color": "#666",
        "link_color": "#03C",
        "body_text_color": "#000"
    }
}
var customThemeData = {}
function select_popup_color(c) {
    colorGridPopupTarget.value = c.toLowerCase();
    document.getElementById("popup_color_grid").style.display = "none"
    var i = colorGridPopupTarget.id
    document.getElementById(i + "-preview").style.backgroundColor = c.toLowerCase()
    edit_main_theme()
}
function applyColorPreview(id) {
    var c = document.getElementById(id).value
    document.getElementById(id + "-preview").style.backgroundColor = c.toLowerCase()
}
function blur_color_picker(e) {
    document.getElementById("popup_color_grid").style.display = "none"
    edit_main_theme()
}
function applyPremade(el) {
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
        applyPremade(el)
    }

    if(el == "custom") {
        serializedToPickers(customThemeData)
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
    applyPremade("clean")
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
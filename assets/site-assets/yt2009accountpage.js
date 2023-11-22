// polyfill
if(!document.querySelector) {
    document.querySelector = function(name) {
        return polyfillSelectorAll(name, true)
    }
    document.querySelectorAll = function(name) {
        return polyfillSelectorAll(name, false)
    }
}

function trimLeft(input) {
    var temp = input;
    while(temp.indexOf(" ") == 0) {
        temp = temp.replace(" ", "")
    }

    return temp;
}

// document.querySelector
function polyfillSelectorAll(name, returnFirst) {
    var type = "id"
    var elementList = []
    if(name.indexOf(".") == 0) {
        name = name.replace(".", "")
        type = "className"
    } else {
        name = name.replace("#", "")
    }

    var s = document.getElementsByTagName("*")
    for(var sel in s) {
        try {
            if(s[sel][type].indexOf(name + " ") !== -1
            || s[sel][type].indexOf(" " + name) !== -1
            || s[sel][type] == name) {
                elementList.push(s[sel])
            }
        }
        catch(error) {}
    }

    if(returnFirst) {
        elementList = elementList[0]
    }
    return elementList
}

// getElementsByClassName
function getElementsByClassName(element, className) {
    var elementList = []
    var s = element.getElementsByTagName("*")
    for(var sel in s) {
        try {
            if(s[sel].className.indexOf(className + " ") !== -1
            || s[sel].className.indexOf(" " + className) !== -1
            || s[sel].className == className) {
                elementList.push(s[sel])
            }
        }
        catch(error) {}
    }
    return elementList
} 

function $(element) {
    if(document.querySelectorAll(element).length !== 1) {
        return document.querySelectorAll(element);
    } else {
        return document.querySelector(element)
    }
}

function nlToArray(nl) {
    var array = []
    var s = nl
    for(var e in s) {
        if(s[e].tagName) {
            array.push(s[e])
        }
    }
    return array;
}

// account funcs
function openTab(tabName) {
    var tabs = document.querySelectorAll(".section-page")
    for(var tab in tabs) {
        if(tabs[tab].className
        && tabs[tab].className.indexOf(tabName) !== -1) {
            tabs[tab].className = "section-page page-" + tabName
        } else if(tabs[tab].className
        && tabs[tab].className.indexOf(tabName) == -1) {
            tabs[tab].className += " hid"
        }
    }
    tabs = document.querySelectorAll(".tab")
    var href = "javascript:openTab('" + tabName + "');"
    for(var tab in tabs) {
        if(tabs[tab].className) {
            tabs[tab].className = "tab"
        }
        if(tabs[tab].className
        && tabs[tab].getElementsByTagName("a")[0].href == href) {
            tabs[tab].className += " current"
            var a = tabs[tab].getElementsByTagName("a")[0]
            document.getElementById("page-name").innerHTML = a.innerHTML
        }
    }

    // per-tab functionality
    switch(tabName) {
        case "homepage": {
            pullHomepageSettings()
            break;
        }
    }
}

// pre-switch on load with hash
switch(location.hash) {
    case "#customize/homepage": {
        openTab("homepage");
        break;
    }
}

// homepage
function saveHomepage() {
    var checks = document.querySelector(".page-homepage")
                .getElementsByTagName("input")
    var sections = ""
    for(var c in checks) {
        c = checks[c]
        if(c.tagName
        && c.getAttribute("type") == "checkbox"
        && c.checked) {
            sections += c.id + ","
        }
    }
    var cookie = [
        "homepage_picked=" + sections + "; ",
        "Path=/; ",
        "Expires=Fri, 31 Dec 2066 23:59:59 GMT"
    ]
    document.cookie = cookie.join("")
    var msg = $(".page-homepage-message")
    msg.style.display = "block"
    setTimeout(function() {
        msg.style.display = "none"
    }, 5000)
}

function pullHomepageSettings() {
    var cookies = document.cookie.split("; ")
    var settings = "rec,watched,featured,pop,inbox".split(",")
    for(var c in cookies) {
        c = cookies[c]
        if(c.indexOf("homepage_picked") == 0) {
            settings = c.split("homepage_picked=")[1].split(",")
        }
    }
    for(var s in settings) {
        s = settings[s]
        if(!s) return;
        document.getElementById(s).checked = true
    }
}
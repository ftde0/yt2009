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
        }
    }
}
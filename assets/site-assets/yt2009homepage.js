// yt2009homepage: use for rearranging modules
var moduleSetup = "rec,watched,featured,pop,inbox"
if(document.cookie.indexOf("homepage_picked=") !== -1) {
    moduleSetup = document.cookie.split("homepage_picked=")[1].split(";")[0]
}
var modlist = {
    "rec": "REC",
    "watched": "POP",
    "featured": "PRO",
    "mostpopular": "TOP",
    "activity": "FRI",
    "pop": "TOP",
    "nearyou": "GEO",
    "latest": "SUB"
}

function moveUp(m) {
    var tempModule = moduleSetup
    var moduleBefore = ""
    var modules = tempModule.split(",")
    var index = 0;
    for(var module1 in modules) {
        if(m == modules[module1]) {
            index = parseInt(module1)
        }
    }
    moduleBefore = modules[index - 1]
    if(moduleBefore == "index") return;
    tempModule = tempModule.replace(
        moduleBefore + "," + m,
        m + "," + moduleBefore
    )
    tempModule = tempModule.split(",,").join(",")

    var p = document.getElementById("feedmodule-" + modlist[moduleBefore])
    var prevModuleElemnt = {
        "id": p.id,
        "c": p.getAttribute("class"),
        "html": p.innerHTML
    }

    var n = document.getElementById("feedmodule-" + modlist[m])
    var newModuleElement = {
        "id": n.id,
        "c": n.getAttribute("class"),
        "html": n.innerHTML
    }

    p.id = newModuleElement.id
    p.setAttribute("class", newModuleElement.c)
    p.innerHTML = newModuleElement.html

    n.id = prevModuleElemnt.id
    n.setAttribute("class", prevModuleElemnt.c)
    n.innerHTML = prevModuleElemnt.html

    var cookie = [
        "homepage_picked=" + tempModule + "; ",
        "Path=/; ",
        "Expires=Fri, 31 Dec 2066 23:59:59 GMT"
    ]
    moduleSetup = tempModule
    document.cookie = cookie.join("")
}

function moveDown(m) {
    var tempModule = moduleSetup
    var moduleAfter = ""
    var modules = tempModule.split(",")
    var index = 0;
    for(var module1 in modules) {
        if(m == modules[module1]) {
            index = parseInt(module1)
        }
    }
    moduleAfter = modules[index + 1]
    tempModule = tempModule.replace(
        m + "," + moduleAfter,
        moduleAfter + "," + m
    )
    tempModule = tempModule.split(",,").join(",")

    var p = document.getElementById("feedmodule-" + modlist[moduleAfter])
    var prevModuleElemnt = {
        "id": p.id,
        "c": p.getAttribute("class"),
        "html": p.innerHTML
    }

    var n = document.getElementById("feedmodule-" + modlist[m])
    var newModuleElement = {
        "id": n.id,
        "c": n.getAttribute("class"),
        "html": n.innerHTML
    }

    p.id = newModuleElement.id
    p.setAttribute("class", newModuleElement.c)
    p.innerHTML = newModuleElement.html

    n.id = prevModuleElemnt.id
    n.setAttribute("class", prevModuleElemnt.c)
    n.innerHTML = prevModuleElemnt.html

    var cookie = [
        "homepage_picked=" + tempModule + "; ",
        "Path=/; ",
        "Expires=Fri, 31 Dec 2066 23:59:59 GMT"
    ]
    moduleSetup = tempModule
    document.cookie = cookie.join("")
}

function removeModule(m) {
    var tempModule = moduleSetup
    tempModule = tempModule.replace(m, "")
    tempModule = tempModule.split(",,").join(",")

    var module = document.getElementById("feedmodule-" + modlist[m])
    module.className += " hid"
    
    var cookie = [
        "homepage_picked=" + tempModule + "; ",
        "Path=/; ",
        "Expires=Fri, 31 Dec 2066 23:59:59 GMT"
    ]
    moduleSetup = tempModule
    document.cookie = cookie.join("")
}

// near you code
// make request
var geor;
if(moduleSetup.indexOf("nearyou") !== -1) {
    if (window.XMLHttpRequest) {
        geor = new XMLHttpRequest()
    } else {
        geor = new ActiveXObject("Microsoft.XMLHTTP");
    }
    geor.open("GET", "/nearyou")
}
try {
    geor.send(null)
    geor.onreadystatechange = function(e) {
        if(geor.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            document.getElementById("hometown-loading-sprite")
                    .style.display = "none"
            document.getElementById("yt2009-hometown-cells-container")
                    .innerHTML = geor.responseText
            if(geor.responseText.indexOf("YT2009_NO_DATA") !== -1) {
                document.getElementById("feedmodule-GEO").style.display = "none"
            }
        }
    }
}
catch(error) {}

// subscriptions code
var subr;
if(moduleSetup.indexOf("latest") !== -1) {
    if (window.XMLHttpRequest) {
        subr = new XMLHttpRequest()
    } else {
        subr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    subr.open("POST", "/homepage_subscriptions")
}
try {
    var toSend = null;
    if(localStorage
    && localStorage.subscriptions
    && JSON) {
        toSend = localStorage.subscriptions
    }
    subr.send(toSend)
    subr.onreadystatechange = function(e) {
        if(subr.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            document.getElementById("subscriptions-loading-sprite")
                    .style.display = "none"
            document.getElementById("yt2009-subscriptions-cells-container")
                    .innerHTML = subr.responseText
            if(subr.responseText.indexOf("YT2009_NO_DATA") !== -1) {
                document.getElementById("feedmodule-SUB").style.display = "none"
            }
        }
    }
}
catch(error) {}
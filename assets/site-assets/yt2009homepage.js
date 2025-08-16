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
    "latest": "SUB",
    "insmap": "IMN",
    "inschrt": "IMC"
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
    geor.open("GET", "/nearyou?r=" + Math.random().toString())
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
    subr.open("POST", "/homepage_subscriptions?r=" + Math.random().toString())
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

// insights (if used)
if(moduleSetup.indexOf("insmap") !== -1
|| moduleSetup.indexOf("inschrt") !== -1) {
    var insr;
    if (window.XMLHttpRequest) {
        insr = new XMLHttpRequest()
    } else {
        insr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    insr.open("GET", "/pchelper_insights?r=" + Math.random().toString())
    insr.send(null)
    insr.onreadystatechange = function(e) {
        if(insr.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            if(document.getElementById("feed_insight_map-body")) {
                var appr = insr.responseText
                               .split("///WORLDCHART///")[1]
                               .split("///VIEWCHART///")[0];
                document.getElementById("feed_insight_map-body").innerHTML = appr;
            }
            if(document.getElementById("feed_insight_chart-body")) {
                var appr = insr.responseText.split("///VIEWCHART///")[1]
                document.getElementById("feed_insight_chart-body").innerHTML = appr;
            }
        }
    }
}

// recommended edit tab
function recommended_edit_show() {
    document.getElementById("REC-options").className = "opt-pane"
    rec_renderPrefs()
}
function recommended_edit_hide() {
    document.getElementById("REC-options").className = "opt-pane hid"
}
function homepageRecSet(opt) {
    document.getElementById("REC-loading-msg").style.display = "block"
    switch(opt) {
        case "list": {
            var cookie = [
                "reco_homepage_style=list; ",
                "Path=/; ",
                "Expires=Fri, 31 Dec 2066 23:59:59 GMT"
            ]
            document.cookie = cookie.join("")
            var msg = "Number of videos to display:"
            document.getElementById("reco-opt-num-picker").innerHTML = msg
            rec_renderPrefs()
            break;
        }
        case "grid": {
            var cookie = [
                "reco_homepage_style=grid; ",
                "Path=/; ",
                "Expires=Fri, 31 Dec 2008 23:59:59 GMT"
            ]
            document.cookie = cookie.join("")
            var msg = "Number of rows to display:"
            document.getElementById("reco-opt-num-picker").innerHTML = msg
            rec_renderPrefs()
            break;
        }
        case "rows": {
            var numrows = 2;
            var options = document.getElementById("REC-options-num")
                                .getElementsByTagName("option");
            for(var o in options) {
                if(options[o] && options[o].tagName
                && options[o].getAttribute("value")
                && options[o].selected) {
                    numrows = options[o].getAttribute("value")
                }
            }

            var cookie = [
                "reco_homepage_count=" + numrows + "; ",
                "Path=/; ",
                "Expires=Fri, 31 Dec 2066 23:59:59 GMT"
            ]
            document.cookie = cookie.join("")
            break;
        }
    }

    setTimeout(function() {
        document.getElementById("REC-loading-msg").style.display = "none"
        if(window.hpReload) {
            window.hpReload()
        }
    }, 200)
}
function rec_renderPrefs() {
    if(document.cookie
    && document.cookie.indexOf("reco_homepage_style=list") !== -1) {
        document.getElementById("rec-style-list").className = "homepage-ajax-sprite btn-listview-on"
        document.getElementById("rec-style-grid").className = "homepage-ajax-sprite btn-gridview-off"
    } else {
        document.getElementById("rec-style-list").className = "homepage-ajax-sprite btn-listview-off"
        document.getElementById("rec-style-grid").className = "homepage-ajax-sprite btn-gridview-on"
    }

    if(document.cookie
    && document.cookie.indexOf("reco_homepage_count=") !== -1) {
        var hpCount = parseInt(
            document.cookie.split("reco_homepage_count=")[1].split(";")[0]
        )
        if(!isNaN(hpCount) && hpCount >= 1 && hpCount <= 5) {
            var options = document.getElementById("REC-options-num")
                                .getElementsByTagName("option");
            for(var o in options) {
                if(options[o] && options[o].tagName
                && options[o].getAttribute("value")
                && options[o].selected) {
                    options[o].selected = false;
                }
            }
            for(var o in options) {
                if(options[o] && options[o].tagName
                && options[o].getAttribute("value")
                && options[o].getAttribute("value") == hpCount) {
                    options[o].selected = true;
                }
            }
        }
    }
}
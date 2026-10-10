// create per-user preloads if turbocharge is used
// on html5 support browsers, save 20-50ms on navigations
// +20ms serverside saving as of 1.32.4
function turbochargeBind(a) {
    if(a.getAttribute
    && a.getAttribute("href")
    && a.getAttribute("href").indexOf("/watch") == 0) {
        var id = a.getAttribute("href").split("v=")[1].substring(0,11)
        a.addEventListener("mousedown", function() {
            var i = new Image;
            i.src = "/turbocharge_preload?video_id=" + id + "&s=" + Math.random();
        }, false)
    }
}
function initTurbochargePreloads(element) {
    if(!element) return;
    if(element.querySelectorAll
    && element.addEventListener) {
        element.querySelectorAll("a").forEach(function(a) {
            turbochargeBind(a)
        })
    }
}
function turbochargeEndscreenBind(a) { 
    if(a.getAttribute
    && a.getAttribute("onclick")
    && a.getAttribute("onclick").indexOf("videoNav") == 0) {
        var id = a.getAttribute("onclick").split("videoNav('")[1].substring(0,11)
        a.addEventListener("mousedown", function() {
            var i = new Image;
            i.src = "/turbocharge_preload?video_id=" + id + "&s=" + Math.random();
        }, false)
    }
}
function initEndscreenTurbochargePreloads(element) {
    if(!element) return;
    if(element.querySelectorAll
    && element.addEventListener) {
        element.querySelectorAll(".endscreen-video").forEach(function(a) {
            turbochargeEndscreenBind(a)
        })
    }
}
if((!document.cookie
|| !document.cookie.indexOf
|| document.cookie.indexOf("turbocharge_user_session") == -1)) {
    // generate turbocharge preload session
    var max = 51252509;
    var s = []
    for (let i = 0; i < 2; i++) {
        s.push(Math.floor(Math.random() * max).toString(16))
    }
    s = s.join("")
    document.cookie = "turbocharge_user_session=" 
                        + s + "; "
                        + "Path=/; "
                        + "expires=Fri, 31 Dec 2066 23:59:59 GMT; "
                        + "SameSite=Lax"
}

// pre-defined preloads
var preloads = [
    "results-main-content",
    "feedmodule-POP",
    "feedmodule-PRO",
    "feedmodule-TOP",
    "grid-view",
    "expand-view",
    "list-view",
    "watch-playlist-videos-panel",
    "viewPlaylistMain",
    "body-column"
]
if(preloads.forEach) {
    preloads.forEach(function(p) {
        if(document.getElementById(p)) {
            initTurbochargePreloads(document.getElementById(p))
        }
    })
}
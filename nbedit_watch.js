/*

yt2009 :D
2022 rewrite

*/

/*
======
smaller functions, fixes to site original code etc (not sure if needed)
======
*/
function $(element) {
    if(document.querySelectorAll(element).length !== 1) {
        return document.querySelectorAll(element);
    } else {
        return document.querySelector(element)
    }
}
function urchinTracker(e) {}
function recordServiceUsage(a1, a2, a3) {}
function openPopup(url, d) {
    window.open(url);
}
function non_css_anim_add(element, cssProperty, from, to) {
    element.style[cssProperty] = from + "px"
    var current = from;
    var x = setInterval(function() {
        current += 4;
        element.style[cssProperty] = current + "px"
        if(current >= to) {
            element.style[cssProperty] = to + "px"
            clearInterval(x);
        }
    }, 5)
}
function non_css_anim_remove(element, cssProperty, from, to) {
    element.style[cssProperty] = from + "px"
    var current = from;
    var x = setInterval(function() {
        current -= 4;
        element.style[cssProperty] = current + "px"
        if(current <= to) {
            clearInterval(x);
        }
    }, 5)
}
function yt2009_search() {
    var query = document.querySelector("#masthead-search-term").value

    window.location = "/results?search_query=" + query.split(" ").join("+")
}
function shareVideoFromFlash() {
    location.hash = "watch-main-area"
    expandShare()
}
function skipAhead(seconds) {
    $("video").currentTime = seconds;
    $("video").play()
}
function showSimpleTooltip(tip) {
    tip = tip.parentNode.getElementsByTagName("div")[0]
    tip.style.display = "block"
}
function hideSimpleTooltip(tip) {
    tip = tip.parentNode.getElementsByTagName("div")[0]
    tip.style.display = "none"
}

/*
======
ui elements
a lot of old function calls for compatibility with old browsers
target firefox 3.6 & chrome 6 for winxp - quite a vibe that way
======
*/
var useLocalStorage = window.localStorage ? true : false;
// description expand/collapse
var descriptionExpanded = false;
// more info
$("#watch-video-details-toggle-less").addEventListener("click", function() {
    $("#watch-video-details-inner-more").style.display = "block"
    $("#watch-video-details-toggle-more").style.display = "block"
    $("#watch-video-details-inner-less").style.display = "none"
    $("#watch-video-details-toggle-less").style.display = "none"
}, false)
// less info
$("#watch-video-details-toggle-more").addEventListener("click", function() {
    $("#watch-video-details-inner-more").style.display = "none"
    $("#watch-video-details-toggle-more").style.display = "none"
    $("#watch-video-details-inner-less").style.display = "block"
    $("#watch-video-details-toggle-less").style.display = "block"
}, false)

// more comments
function onWatchCommentsShowMore() {
    $("#watch-comments-show-more-td").style.display = "none"
    var nextPage = parseInt($(".comments-container").getAttribute("data-page")) + 1
    var continuationToken = $(".comments-container").getAttribute("data-continuation-token")
    // request
    var r = new XMLHttpRequest();
    r.open("GET", "/get_more_comments")
    if(continuationToken
    && continuationToken !== "yt2009_comments_continuation_token") {
        r.setRequestHeader(
            "continuation",
            continuationToken
        )
    } else {
        r.setRequestHeader(
            "page",
            parseInt($(".comments-container").getAttribute("data-page"))
        )
    }
    r.setRequestHeader("url_flags", location.href)
    r.setRequestHeader("source", location.href)
    r.send(null)
    r.addEventListener("load", function(e) {
        $("#watch-comments-show-more-td").style.display = "block"
        if(r.responseText.length == 0) {
            $("#watch-comments-show-more-td").style.display = "none"
        }
        // add html sent from server
        $(".comments-container").innerHTML += r.responseText
                                               .split(";yt_continuation=")[0]
        try {
            $(".comments-container").setAttribute(
                "data-continuation-token",
                r.responseText.split(";yt_continuation=")[1]
            )
        }
        catch(error) {}
        // calc comment count + add page indicator
        var commentCount = parseInt($("#watch-comment-count").innerHTML)
                         + r.responseText.split("watch-comment-entry").length - 1
        $("#watch-comment-count").innerHTML = commentCount
        $(".comments-container").setAttribute("data-page", nextPage)
    }, false)
}

// comment replies
function loadReplies(continuation, button, commentId) {
    button.innerHTML = "&raquo; ..."
    var r = new XMLHttpRequest();
    r.open("GET", "/comment_get_replies")
    r.setRequestHeader(
        "continuation",
        continuation
    )
    r.setRequestHeader(
        "original-comment",
        commentId
    )
    r.setRequestHeader("source", location.href)
    r.send(null)
    r.addEventListener("load", function(e) {
        var z = document.getElementById("yt2009-reply-holder-" + commentId)
        setTimeout(function() {
            button.parentNode.removeChild(button)
            z.innerHTML += r.responseText
        }, 50)
    }, false)
}

// expand/collapse "more from"/"related videos"
function toggleExpander(element) {
    if(element.className.indexOf("yt-uix-expander-collapsed") !== -1) {
        // expand
        element.className = "yt-uix-expander-head"
        var className = element.parentNode.querySelector(".watch-discoverbox-body").className
        element.parentNode.querySelector(".watch-discoverbox-body").className = className.replace(" hid", "")

        // fetch "more from" if indicated needed by server
        if(document.querySelector(".yt2009-mark-morefrom-fetch")) {
            morefrom_load();
        }
    } else {
        // collapse
        element.className = "yt-uix-expander-head yt-uix-expander-collapsed"
        element.parentNode.querySelector(".watch-discoverbox-body")
               .className += " hid"
    }
}

// expand/collapse comments
function toggleCommentsExpander(element) {
    var expander = element.parentNode.querySelector(".yt-uix-expander-body")
    if(element.className.indexOf("yt-uix-expander-collapsed") !== -1) {
        element.className = "yt-uix-expander-head"
        expander.className = "yt-uix-expander-body"
    } else {
        element.className = "yt-uix-expander-head yt-uix-expander-collapsed"
        expander.className = "yt-uix-expander-body hid"
    }
}

// expand/collapse quicklist
function toggleQuicklistExpander(element) {
    var ql = document.querySelector("#quicklist-panel")
    if(ql.className.indexOf("yt-uix-expander-collapsed") !== -1) {
        // expand
        document.querySelector("#playlistContainer_QL").style.display = "block"
        document.querySelector("#quicklist-panel #watch-playlist-actions")
                .style.display = "block"
        ql.className = ql.className
                        .split(" yt-uix-expander-collapsed")
                        .join("")
    } else {
        // collapse
        document.querySelector("#playlistContainer_QL").style.display = "none"
        document.querySelector("#quicklist-panel #watch-playlist-actions")
                .style.display = "none"
        ql.className += " yt-uix-expander-collapsed"
    }
}

// append to history
if(useLocalStorage) {
    // localstorage
    var currentId = $(".email-video-url").value.split("?v=")[1].split("&")[0].split("#")[0]
    var title = $(".watch-vid-ab-title").innerHTML
    var views = $("#watch-view-count").innerHTML
    var watch_history = []
    if(!localStorage.watch_history) {
        localStorage.watch_history = "[]"
    }
    watch_history = JSON.parse(localStorage.watch_history)
    if(JSON.stringify(watch_history).indexOf(currentId) == -1) {
        watch_history.unshift({
            "id": currentId,
            "title": title,
            "views": views
        })

        localStorage.watch_history = JSON.stringify(watch_history)
    }
} else {
    // cookie
    var watchHistory = ""
    document.cookie.split(";").forEach(function(cookie) {
        if(cookie.indexOf("watch_history=") !== -1) {
            watchHistory = cookie.trimLeft().replace("watch_history=", "")
        }
    })

    if(watchHistory.length > 4000) {
        // history backup if needed
        document.cookie = "watch_history_backup_" + Date.now() + "=" + watchHistory + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
        document.cookie = "watch_history= ; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
        watchHistory = ""
    }
    if(watchHistory.split(":").splice(0, 20).join(":")
                   .indexOf($(".email-video-url").value
                   .split("?v=")[1]) == -1) {
        watchHistory = encodeURIComponent($("#watch-vid-title h1").innerHTML)
                       + "&" + $("#watch-view-count").innerHTML
                       + "&" + $(".email-video-url").value.split("?v=")[1]
                       + ":" + watchHistory;
        document.cookie = "watch_history="
                        + watchHistory
                        + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }
}

// always_morefrom
function morefrom_load() {
    var site = location.protocol.replace(":", "") + '://' + location.host
    site = $(".yt2009-channel-link").href.replace(site, "")
    var name = $(".yt2009-channel-link").innerHTML
    // request
    var r = new XMLHttpRequest();
    r.open("POST", "/morefrom_load")
    r.setRequestHeader("channel", site)
    r.setRequestHeader("source", location.href)
    r.send(name)
    r.addEventListener("load", function(e) {
        // add html sent from server
        $("#watch-channel-discoverbox").innerHTML += r.responseText

        // remove indicator so it doesn't load all the time
        var mark = document.querySelector(".yt2009-mark-morefrom-fetch");
        mark.parentNode.removeChild(mark)
    }, false)
}

/*
======
sub
======
*/

if(window.localStorage && !localStorage.subscriptions) {
    localStorage.subscriptions = "[]"
}

// SUBSCRIBE
$("#subscribeDiv").addEventListener("click", function() {
    $("#subscribeDiv").style.display = "none"
    $("#unsubscribeDiv").style.display = "block"

    if(useLocalStorage) {
        // localstorage
        var url = $(".yt2009-channel-link").href.replace(
            location.protocol + "//" + location.hostname + ":" + location.port,
            ""
        )
        var creator = $(".yt2009-channel-link").innerHTML
        var subList = []
        subList = JSON.parse(localStorage.subscriptions)
        subList.unshift({
            "url": url,
            "creator": creator
        })
        localStorage.subscriptions = JSON.stringify(subList)
    } else {
        // cookie
        var sub = ""
        document.cookie.split(";").forEach(function(cookie) {
            if(cookie.indexOf("sublist=") !== -1) {
                sub = cookie.trimLeft().replace("sublist=", "")
            }
        })

        sub = encodeURIComponent(
            $(".yt2009-channel-link").href.replace(
                location.protocol + "//" + location.hostname + ":" + location.port,
                ""
            )
        ) + "&" + encodeURIComponent($(".yt2009-channel-link").innerHTML
        ) + ":" + sub;
        document.cookie = "sublist="
                        + sub
                        + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }


    if(document.cookie && document.cookie.indexOf("subscriptions_sync") !== -1) {
        var reqUser = $(".yt2009-channel-link").href.split("/")
        reqUser = reqUser[reqUser.length - 1]
        var r = new XMLHttpRequest();
        r.open("POST", "/pchelper_subs")
        r.send("user=" + reqUser)

        // autoshare
        if(document.cookie
        && document.cookie.indexOf("pchelper_user=") !== -1
        && document.cookie.indexOf("sharing-sub") !== -1
        && document.cookie.indexOf("sharing-enabled") !== -1) {
            var currentId = $(".email-video-url").value.split("?v=")[1]
            var reqParams = [
                "type=subscribe",
                "video=" + currentId,
                "channel_name=" + $(".yt2009-channel-link").innerHTML
                                  .trimLeft().trimRight(),
                "channel_id=" + $(".yt2009-channel-link").href
                                .split("channel/")[1]
            ].join("&")
            var mr = new XMLHttpRequest();
            mr.open("POST", "/autoshare_submit")
            mr.send(reqParams)
        }
    }
}, false)

// UNSUBSCRIBE
$("#unsubscribeDiv").addEventListener("click", function() {
    $("#unsubscribeDiv").style.display = "none"
    $("#subscribeDiv").style.display = "block"
    var subscribeMethod = "cookie"
    var url = $(".yt2009-channel-link").href.replace(
        location.protocol + "//" + location.hostname + ":" + location.port,
        ""
    )
    try {
        JSON.parse(localStorage.subscriptions).forEach(function(sub) {
            if(sub.url == url) {
                subscribeMethod = "localStorage"
            }
        })
    }
    catch(error) {}

    if(useLocalStorage && subscribeMethod == "localStorage") {
        // localstorage
        var subList = JSON.parse(localStorage.subscriptions)
        var index = 0;
        
        subList.forEach(function(sub) {
            if(sub.url == url) {
                subList[index] = {}
            }
            index++;
        })
        localStorage.subscriptions = JSON.stringify(subList)
    } else {
        // cookie
        var sub = ""
        document.cookie.split(";").forEach(function(cookie) {
            if(cookie.indexOf("sublist=") !== -1) {
                sub = cookie.trimLeft().replace("sublist=", "")
            }
        })

        sub = sub.replace(
            encodeURIComponent($(".yt2009-channel-link").href.replace(
                location.protocol + "//" + location.hostname + ":" + location.port,
                ""
            ))
            + "&" + encodeURIComponent($(".yt2009-channel-link").innerHTML)
            + ":",
            ""
        )
        document.cookie = "sublist="
                        + sub
                        + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }

    if(document.cookie && document.cookie.indexOf("subscriptions_sync") !== -1) {
        var reqUser = $(".yt2009-channel-link").href.split("/")
        reqUser = reqUser[reqUser.length - 1]
        var r = new XMLHttpRequest();
        r.open("POST", "/pchelper_subs")
        r.send("user=" + reqUser + "&state=unsubscribe")
    }
}, false)

// subscribed with localStor age? if so, show the Unsubscribe btn
if(window.localStorage) {
    JSON.parse(localStorage.subscriptions).forEach(function(sub) {
        if(!sub.url) return;
        var url = $(".yt2009-channel-link").href.replace(
            location.protocol + "//" + location.hostname + ":" + location.port,
            ""
        )
        if(sub.url.indexOf(url) !== -1
        || url.indexOf(sub.url) !== -1) {
            // susbribed!!!
            $("#subscribeDiv").style.display = "none"
            $("#unsubscribeDiv").style.display = "block"
        }
    })
}

/*
======
buttons above the video
======
*/

// widescreen
var widescreen = false;
var player_overlay = $("#watch-this-vid");
var player_element = $("#watch-this-vid #watch-player-div");
function switchWidescreen() {
    widescreen = !widescreen;

    if(widescreen) {
        player_overlay.className = "yt-rounded widescreen"
        player_element.className = "flash-player widescreen"
        $("#watch-vid-title").className = "title longform widescreen"
        $("#player-toggle-switch").className = "reverse-tooltip-wrapper watch-wide-mode"
        localStorage.widescreenEnabled = true
        fourthreechecked = false
        try {annotation43()}catch(error) {}
    } else {
        player_overlay.className = "yt-rounded"
        player_element.className = "flash-player"
        $("#watch-vid-title").className = "title longform"
        $("#player-toggle-switch").className = "reverse-tooltip-wrapper"
        localStorage.removeItem("widescreenEnabled")
        fourthreechecked = false
        try {annotation43()}catch(error) {}
    }

    try {adjustSeekbarWidth();}catch(error) {}
}
$("#watch-longform-player").addEventListener("click", switchWidescreen, false)
if(localStorage && localStorage.widescreenEnabled) {
    switchWidescreen()
}

// popout
$("#watch-longform-popup").addEventListener("click", function() {
    var id = window.location.href.split("v=")[1].split("&")[0]
    var url = "/embed/" + id;
    if(window.playingAsLive) {
        url += "?live=1"
    }
    window.open(url)
}, false)

/*
======
playlisty
======
*/

if(document.querySelector("#watch-playlist-videos-panel")) {
    // następny film
    function nextVideo() {
        var videoElements = []
        var currentVideoIndex = 0;
        var tempIndex = 0;

        var s = document.querySelectorAll("#watch-playlist-videos-panel .video-entry")
		for(var sel in s) {
			try {
                videoElements.push(s[sel])
				if(s[sel].className == "video-entry watch-ppv-vid") {
                    currentVideoIndex = tempIndex
                }
			}
			catch(error) {}

            tempIndex++;
		}

        var nextVideo = videoElements[currentVideoIndex + 1]
        if(!nextVideo || typeof(nextVideo) == "function") {
            nextVideo = videoElements[0]
        }
        nextVideo.className = "video-entry playlist-entry-video-next"


        window.location = $(".playlist-entry-video-next .video-thumb-link").href
    }
    try {$("video").addEventListener("ended", nextVideo, false)}
    catch(error) {}

    // sabr never fires "ended"
    setTimeout(function() {
        if(window.sabrData) {
            window.sabrData.fEndCallback = function() {
                nextVideo()
            }
        }
    }, 100)

    // refetch jak nie ma filmów zapisanych
    if(document.querySelector(".yt2009_marking_fetch_playlist_client")) {
        // request
        var vr = new XMLHttpRequest();
        vr.open("GET", "/refetch_playlist_watch?ac=" + Math.random())
        vr.setRequestHeader("source", location.href)
        vr.send(null)
        vr.addEventListener("load", function(e) {
            // dopełnianie htmla wysłanego z serwera
            $("#watch-playlist-discoverbox").innerHTML += vr.responseText
        }, false)
    }
}

/*
======
takie fajne
======
*/

if(location.href.indexOf("&flip=1") !== -1
|| (new Date().getMonth() == 3
&& new Date().getDate() == 1
&& document.cookie.indexOf("unflip=1") == -1)) {
    // css
    var css = document.createElement("style")
    css.innerHTML = ".flip {-webkit-transform: rotate(180deg);-moz-transform: rotate(180deg);transform: rotate(180deg);direction: rtl;}\
    .ltr_override {direction: ltr !important;}\
    .v90WrapperInner img {margin-bottom: -10px;margin-top: 0px;}\
    #masthead-nav-main {width: 840px !important;}\
    #masthead-utility.flip {margin-left: 700px !important;}\
    .new-layout {width: 300px;height: 60px;background: #c6d7f3;border: 1px #a0b1dc solid;margin-bottom: 10px;}\
    .new-layout h1 {width: 30px;font-size: 40px;margin: 10px 10px;float: left;}\
    .new-layout h2, .new-layout a {color: #03c;cursor: pointer;}\
    .new-layout h2 {margin-bottom: 15px;}\
    "
    document.body.appendChild(css);

    // classname flip
    var s = document.querySelectorAll("a, #logo, #masthead-nav-main, \
    #masthead-nav-user, .util-a1, \
    #watch-this-vid, #watch-vid-title, .video-mini-title,\
    .video-view-count, .video-username, #watch-channel-stats,\
    #ratingMessage, #watch-views-div, #watch-video-tags-div,\
    .watch-comment-info, .watch-comment-body,\
    .watch-comment-action, .yt-uix-expander-head, .yt-uix-expander-arrow,\
    .links, .region-and-language-pickers, .progress_container")
    for(var sel in s) {
        try {
            s[sel].className += " flip"
        }
        catch(error) {}
    }

    // classname ltr_override jako workaround dla niektórych
    s = document.querySelectorAll("#watch-vid-title, #watch-views-div")
    for(var sel in s) {
        try {
            s[sel].className += " ltr_override"
        }
        catch(error) {}
    }

    // usuwamy .flip dla elementów wziętych w jakimś
    // selectorze który jest niepotrzebny
    s = document.querySelectorAll("a[href=\"/my_videos_upload\"]")
    for(var sel in s) {
        try {
            s[sel].className = s[sel].className.replace("flip", "")
        }
        catch(error) {}
    }
    
    // div.new-layout (tipy tego "nowego layoutu")
    var tipWindowInner = "<h1 class='flip'>?</h1>\
    <h2 onclick='new_layout_alert()'>Tips for viewing the new layout</h2>\
    <a onclick='new_layout_leave()'>(I prefer the old-fashioned layout!)</a>"
    $("#watch-other-vids").innerHTML = "<div class=\"new-layout\">" + tipWindowInner + "</div>" + $("#watch-other-vids").innerHTML

    // ukrywanie yt2009-signin-hide
    s = document.querySelectorAll(".yt2009-signin-hide")
    for(var sel in s) {
        try {
            s[sel].className = s[sel].className.replace("yt2009-signin-hide", "hid")
        }
        catch(error) {}
    }

    // right -> left for .seek_btn
    if(document.querySelector(".seek_btn")) {
        var seekBtn = document.querySelector(".seek_btn");
        seekBtn.style.right = "initial"
        seekBtn.style.left = "-9px"
    }

    // login width
    document.querySelector("#masthead-utility").style.display = "inline-block"
    setTimeout(function() {
        var loginWidth = document.querySelector("#masthead-utility")
                             .getBoundingClientRect().width;

        document.querySelector("#masthead-utility")
                .style.marginLeft = (960 - loginWidth - 15) + "px"

        document.querySelector("#masthead-utility").style.display = ""      
    }, 50)
} 

function new_layout_alert() {
    window.open("/t/new_viewing_experience")
}

function new_layout_leave() {
    if(new Date().getMonth() == 3) {
        document.cookie = "unflip=1; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    } else {
        document.cookie = "unflip=1; Path=/; expires=Fri, 31 Dec 2008 23:59:59 GMT"
    }
    location.href = location.href.replace("&flip=1", "")
}

/*
======
video cards (favorite/share/playlists/flag)
======
*/

function switchWatchTab(tabName) {
    // hide report menu if open
    if(document.getElementById("watch-flag-menu")
    && $("#watch-flag-menu").className.indexOf("show") !== -1) {
        $("#watch-flag-menu").className = ""
        flagMenuShown = false;
    }

    // heading
    $(".watch-tab.watch-tab-sel").className = "watch-tab"
    $("#watch-tab-" + tabName).className = "watch-tab watch-tab-sel"

    // content
    var e = document.querySelectorAll(".watch-tab-body.watch-tab-sel")
    for(var sel in e) {
        try {
            e[sel].className = "watch-tab-body"
        }
        catch(error) {}
    }
    $("#watch-tab-" + tabName + "-body").className = "watch-tab-body watch-tab-sel"

    // custom per-card handling
    switch(tabName) {
        case "favorite": {
            favorite_video();
            break;
        }
        case "flag": {
            loadFlagMenu()
            break;
        }
    }
}

/*
======
favoriting videos
======
*/

// kod taktycznie z kanałów zabrany
// adding
function favorite_video() {
    var currentId = $(".email-video-url").value.split("?v=")[1]
    if((localStorage && localStorage.favorites
    && localStorage.favorites.indexOf("PCHELPER_MANAGED") !== -1)
    || (document.cookie
    && document.cookie.indexOf("favorites=PCHELPER_MANAGED") !== -1)) {
        $("#watch-remove-faves").className += " hid"
        var r = new XMLHttpRequest();
        r.open("POST", "/pchelper_favorites")
        r.send("video_id=" + currentId)
        r.addEventListener("load", function(e) {
            if(r.status >= 400) {
                alert("This video is already in your favorites!")
                return;
            }
            $("#watch-add-faves").className += " hid"
            $("#watch-remove-faves").className = "watch-action-result"

            // autoshare
            if(document.cookie
            && document.cookie.indexOf("pchelper_user=") !== -1
            && document.cookie.indexOf("sharing-fav") !== -1
            && document.cookie.indexOf("sharing-enabled") !== -1) {
                var reqParams = [
                    "type=favorite",
                    "video=" + currentId
                ].join("&")
                var mr = new XMLHttpRequest();
                mr.open("POST", "/autoshare_submit")
                mr.send(reqParams)
            }
        }, false)
        return;
    }
    var favorites = ""
    if(useLocalStorage) {
        // localstorage
        if(!localStorage.favorites) {
            localStorage.favorites = "[]"
        }
        favorites = JSON.parse(localStorage.favorites)
        if(JSON.stringify(favorites).indexOf(currentId) == -1) {
            favorites.unshift({
                "id": currentId,
                "title": $(".watch-vid-ab-title").innerHTML,
                "views": $("#watch-view-count").innerHTML
            })

            // remove empty elements (removed using ui)
            localStorage.favorites = JSON.stringify(favorites)
                                         .split(",{}").join("")
        }
    } else {
        // cookie
        var videoString = encodeURIComponent(
            $(".watch-vid-ab-title").innerHTML
            + "&" + $("#watch-view-count").innerHTML
            + "&" + currentId
        )
        document.cookie.split(";").forEach(function(cookie) {
            if(cookie.indexOf("favorites=") !== -1) {
                favorites = cookie.trimLeft().replace("favorites=", "")
            }
        })
        if(favorites.indexOf(currentId) == -1) {
            favorites = videoString + ":" + favorites
            document.cookie = "favorites="
                            + favorites
                            + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
        }
    }
    $("#watch-add-faves").className += " hid"
    $("#watch-remove-faves").className = "watch-action-result"
}

// removing
function favorite_undo() {
    var currentId = $(".email-video-url").value.split("?v=")[1]
    if((localStorage && localStorage.favorites
    && localStorage.favorites.indexOf("PCHELPER_MANAGED") !== -1)
    || (document.cookie
    && document.cookie.indexOf("favorites=PCHELPER_MANAGED") !== -1)) {
        var r = new XMLHttpRequest();
        r.open("POST", "/pchelper_favorites")
        r.send("video_id=" + currentId + "&state=undo")
        r.addEventListener("load", function(e) {
            $("#watch-remove-faves").className += " hid"
            $("#watch-add-faves").className = "watch-action-result"
        }, false)
        return;
    }
    var favorites = ""
    if(useLocalStorage) {
        // localstorage
        favorites = JSON.parse(localStorage.favorites)
        var index = 0;
        favorites.forEach(function(favorite) {
            if(favorite.id == currentId) {
                favorites[index] = {}
            }
            index++;
        })
        localStorage.favorites = JSON.stringify(favorites)
    } else {
        // cookie
        var videoString = encodeURIComponent(
            $("#watch-vid-title h1").innerHTML
            + "&" + $("#watch-view-count").innerHTML
            + "&" + currentId
        ) + ":"
        document.cookie.split(";").forEach(function(cookie) {
            if(cookie.indexOf("favorites=") !== -1) {
                favorites = cookie.trimLeft().replace("favorites=", "")
            }
        })
        favorites = favorites.replace(videoString, "")
        document.cookie = "favorites="
                        + favorites
                        + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }
    $("#watch-remove-faves").className += " hid"
    $("#watch-add-faves").className = "watch-action-result"
}

/*
======
sharing
======
*/
// more options
function expandShare() {
    $("#watch-sharetab-options #more-options").style.display = "none"
    $("#watch-share-services-collapsed").style.display = "none"
    $("#watch-share-services-expanded").style.display = ""
    $("#watch-sharetab-options #fewer-options").style.display = ""
}
$("#watch-sharetab-options #more-options a").addEventListener("click", function() {
    expandShare()
}, false)
// less options
$("#watch-sharetab-options #fewer-options a").addEventListener("click", function() {
    $("#watch-sharetab-options #more-options").style.display = ""
    $("#watch-share-services-collapsed").style.display = ""
    $("#watch-share-services-expanded").style.display = "none"
    $("#watch-sharetab-options #fewer-options").style.display = "none"
}, false)


/*
======
embeds
======
*/
var embed_settings = {
    "color1": "b1b1b1",
    "color2": "cfcfcf",
    "width": "425",
    "height": "344",
    "flash_player": true,
    "add_related_html": false,
    "add_border": false,
    "no_controls_fade": false
}
// załaduj
// load
function show_embed() {
    $("#watch-customize-embed-div").style.display = "block"
    if(!document.querySelector("#watch-customize-embed")) {
        // request
        var r = new XMLHttpRequest();
        r.open("GET", "/embed_generate")
        r.send(null)
        r.addEventListener("load", function(e) {
            $("#watch-customize-embed-div").innerHTML = r.responseText
        }, false)
    }
}
// update kodu
// code update
function embed_update_code() {
    var codeblock = $("#embed_code")
    var id = $("#watch-url-field").value.split("?v=")[1]
    var site = location.protocol.replace(":", "") + '://' + location.host
    var attributes = "?color1=" + embed_settings.color1 + "&color2=" + embed_settings.color2
    if(embed_settings.add_related_html) {
        attributes += "&server_fill_related=1"
    }
    if(!embed_settings.flash_player) {
        $(".embed-no-controls-fade-check").className = "embed-no-controls-fade-check"
    } else {
        $(".embed-no-controls-fade-check").className = "embed-no-controls-fade-check hid"
    }
    if(embed_settings.no_controls_fade) {
        attributes += "&no_controls_fade=1"
    }
    var code = '<iframe width="' + embed_settings.width
                + '" height="' + embed_settings.height
                + '" src="' + site + '/embed/' + id + attributes
                + '" allowfullscreen></iframe>' // html5
    if(embed_settings.flash_player) {
        // i gave up trying to format this
        code = '<object width="' + embed_settings.width + '" height="' + embed_settings.height + '"><param name="movie" value="' + site + '/embedF/' + id + attributes + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="' + site + '/embedF/' + id + attributes + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="' + embed_settings.width + '" height="' + embed_settings.height + '"></embed></object>' // flash player
    }


    codeblock.value = code
}

// kolorki
// colors
function switchColorEmbed(element) {
    document.querySelector("#watch-customize-embed-theme-swatches .selected").className = "embed-radio-link embed-sprite"
    element.className += " selected"
    // zmiana w embed_settings
    embed_settings.color1 = element.getAttribute("data-color1")
    embed_settings.color2 = element.getAttribute("data-color2")

    embed_update_code();
}

// rozmiary
// sizes
function switchSize(width, height, element) {
    embed_settings.width = width;
    embed_settings.height = height;
    
    document.querySelector(".watch-embed-radio-box.selected").className = "watch-embed-radio-box"
    element.querySelector(".watch-embed-radio-box").className += " selected"

    embed_update_code();
}

// wyłączanie
// hide the embed creator
function close_embed() {
    $("#watch-customize-embed-div").style.display = "none"
}

/*
======
adding videos to playlists
======
*/

// sprawdzanie czy mamy jakieś playlisty
// check if we have any playlists
var plDropdown = $(".playlists-options")
function updatePlaylists() {
    var optionsHTML = ""
    if(localStorage.playlistsIndex) {
        var playlists = JSON.parse(localStorage.playlistsIndex);
        playlists.forEach(function(playlist) {
            optionsHTML += "<option value=\"" + playlist.id + "\">" + playlist.name + "</option>"
        })
    
        // show the playlist create window if we don't have any
        if(optionsHTML == "") {
            $(".playlist-create").style.display = ""
            $(".playlist-add").style.display = "none"
        }
    } else {
        // create the localStorage playlists entry if we don't have any
        localStorage.playlistsIndex = "[]"
        $(".playlist-create").style.display = ""
        $(".playlist-add").style.display = "none"
    }

    optionsHTML += "<option value=\"override-createnew\">[ New Playlist ]</option>"
    plDropdown.innerHTML = optionsHTML
}
updatePlaylists();

var selectedOption = plDropdown.querySelectorAll("option")[0]

// pokazujemy/ukrywamy .playlist-create
// show/hide .playlist-create
plDropdown.addEventListener("change", function() {
    // get selected option
    var options = plDropdown.querySelectorAll("option")

    for(var s in options) {
        if(options[s].selected) {
            selectedOption = options[s]
        }
    }

    // show/hide
    if(selectedOption.value == "override-createnew") {
        $(".playlist-create").style.display = ""
        $(".playlist-add").style.display = "none"
    } else {
        $(".playlist-create").style.display = "none"
        $(".playlist-add").style.display = ""
    }
}, false)

// add current video to the playlist
function addPlaylistVideo(playlistId) {
    var currentId = $(".email-video-url").value.split("?v=")[1]
    var dateAdded = new Date().toString().split(" ")
    dateAdded.shift();
    dateAdded = dateAdded.slice(0, 3)
    dateAdded[1] += ","
    dateAdded = dateAdded.join(" ")
    var videoData = {
        "id": currentId,
        "title": $(".watch-vid-ab-title").innerHTML,
        "date": dateAdded,
        "rating": $("#ratingStars button").title,
        "viewCount": $("#watch-view-count").innerHTML,
        "time": $(".timer").innerHTML.split("/ ")[1]
    }

    if(document.cookie && document.cookie.indexOf("playlists_sync") !== -1) {
        var r = new XMLHttpRequest();
        r.open("POST", "/pchelper_playlists")
        var params = [
            "method=add_existing",
            "playlist_id=" + playlistId,
            "video=" + currentId
        ].join("&")
        r.send(params)
    } else {
        var playlist = JSON.parse(localStorage["playlist-" + playlistId])
        if(JSON.stringify(playlist).indexOf(currentId) == -1) {
            playlist.unshift(videoData)
        }
        localStorage["playlist-" + playlistId] = JSON.stringify(playlist)
    }

    // show success tick
    $("#addToPlaylistResult").style.display = "block"
    $("#addToPlaylistDiv").style.display = "none"
}

// pokaż z powrotem kartę dodawania do playlisty
// re-show an add to playlist card
function playlistResultBack() {
    $("#addToPlaylistResult").style.display = "none"
    $("#addToPlaylistDiv").style.display = "block"
}

// event listener: przycisk add na istniejącej playliście
// add button on an existing playlist
$("#playlist-add-btn").addEventListener("click", function() {
    addPlaylistVideo(selectedOption.value);
}, false)

// event listener: przycisk add na new playlist
// add button on a new playlist
$("#playlist-create-btn").addEventListener("click", function() {
    var playlistId = Math.floor(Date.now() / 1000)
    var name = $(".playlist-name-input").value
    var pchelperUsed = false;

    if(document.cookie && document.cookie.indexOf("playlists_sync") !== -1) {
        pchelperUsed = true;
        var r = new XMLHttpRequest();
        r.open("POST", "/pchelper_playlists")
        var params = [
            "method=create_new",
            "playlist_name=" + name,
            "video=" + currentId
        ].join("&")
        r.send(params)
        r.addEventListener("load", function(e) {
            if(r.status == 200) {
                playlistId = r.responseText
                commit();
            }
        })
    }

    function commit() {
        localStorage["playlist-" + playlistId] = "[]"
        if(!pchelperUsed) {
            addPlaylistVideo(playlistId);
        } else {
            $("#addToPlaylistResult").style.display = "block"
            $("#addToPlaylistDiv").style.display = "none"
        }

        var index = JSON.parse(localStorage.playlistsIndex);
        index.unshift({"id": playlistId, "name": $(".playlist-name-input").value})
        localStorage.playlistsIndex = JSON.stringify(index)

        // update playlists dropdown to show our new playlist
        updatePlaylists();
        $(".playlist-create").style.display = "none"
        $(".playlist-add").style.display = ""
        selectedOption = plDropdown.querySelectorAll("option")[0]
    }

    if(!pchelperUsed) {
        commit();
    }
}, false)


/*
======
video response
======
*/
// expander button
var responseExpander = $(".yt2009-video-response-expander")
var videoResponsesLoaded = false;
function videoResponsesExpand() {
    if(responseExpander.parentNode.className
        .indexOf("yt-uix-expander-collapsed") !== -1) {
        responseExpander.parentNode
        .className = responseExpander.parentNode.className.replace(
            "collapsed",
            "expanded"
        )

        if(!videoResponsesLoaded) {
            loadVideoResponses();
        }
    } else {
        responseExpander.parentNode
        .className = responseExpander.parentNode.className.replace(
            "expanded",
            "collapsed"
        )
    }
}
responseExpander.addEventListener("click", videoResponsesExpand, false)

// fetch our response list
var videoResponseCount = 0;
var vrPage = 0;
function loadVideoResponses() {
    var r = new XMLHttpRequest();
    r.open("POST", "/videoresponse_load")
    try {
        r.send($(".watch-vid-ab-title").innerHTML)
        r.addEventListener("load", function(e) {
            videoResponsesLoaded = true;
            $("#watch-video-responses-children").innerHTML = r.responseText
            videoResponseCount = r.responseText.split("video-bar-item")
                                  .length - 1;
        }, false)
    }
    catch(error) {
        videoResponsesLoaded = true;
        $("#watch-video-responses-children").innerHTML = "h?"
        console.log(error)
    }
    
}

// video response navigation with arrows
var videoResponseMargin = 0;
function responseNavigateLeft() {
    var tempMargin = 0;
    vrPage--;
    if(vrPage < 0) {
        vrPage = 0;
        return;
    }
    var x = setInterval(function() {
        tempMargin += 40;
        videoResponseMargin += 40;
        $(".video-bar-long-box").style.marginLeft = videoResponseMargin + "px"
        if(tempMargin >= 560) {
            clearInterval(x)
        }
    }, 20)
}

function responseNavigateRight() {
    var tempMargin = 0;
    vrPage++;
    if(vrPage >= Math.round(videoResponseCount / 4)) {
        vrPage--
        return;
    }
    var x = setInterval(function() {
        tempMargin -= 40;
        videoResponseMargin -= 40;
        $(".video-bar-long-box").style.marginLeft = videoResponseMargin + "px"
        if(tempMargin <= -560) {
            clearInterval(x)
        }
    }, 20)
}

/*
======
stats & data
======
*/
// expander button
var statsExpander = $(".yt2009-stats-data-expander")
var statsLoaded = false;
function statsDataExpand() {
    if(statsExpander.parentNode.className
       .indexOf("yt-uix-expander-collapsed") !== -1) {
        statsExpander.parentNode.className = responseExpander.parentNode.className
        .replace(
            "collapsed",
            "expanded"
        )

        if(!statsLoaded) {
            loadStats();
        }
    } else {
        statsExpander.parentNode.className = responseExpander.parentNode.className
        .replace(
            "expanded",
            "collapsed"
        )
    }
}
statsExpander.addEventListener("click", statsDataExpand, false)

// fetch our stats
function loadStats() {
    var id = window.location.href.split("v=")[1].split("&")[0]
    var v = document.getElementById("watch-view-count").innerHTML
    var s = document.getElementById("ratingStars")
            .getElementsByTagName("button")[0]
            .getAttribute("title")
    var r = new XMLHttpRequest();
    r.open("GET", "/insight_ajax?action_get_statistics_and_data=1&v=" + id)
    r.setRequestHeader("displayed_views", v)
    r.setRequestHeader("displayed_rating", s)
    r.send(null)
    r.addEventListener("load", function(e) {
        statsLoaded = true;
        $("#watch-tab-stats-body").innerHTML = r.responseText
    }, false)
    
}

/*
======
star ratings if login_simulate
======
*/
var videoRating = $(".yt2009-stars").getAttribute("title")
var ratingText = $("#defaultRatingMessage span").innerHTML
if(document.cookie.indexOf("login_simulate") !== -1) {
    // login_simulate enabled
    // show a star rating when hovered over the stars
    $(".yt2009-stars").addEventListener("mousemove", function(e) {
        var left = $(".yt2009-stars").getBoundingClientRect().left
        var offsetX = e.offsetX
                    || e.pageX - left
                    || e.clientX - left;
        var stars = Math.floor(offsetX / 15) + 1
        if(stars >= 6) {
            stars = 5;
        }
        $(".yt2009-stars").setAttribute("title", stars)
        var currentRating = "ratingL-" + $(".yt2009-stars")
                                        .className.split("ratingL-")[1]
        var newRating = "ratingL-" + stars + ".0"
        $(".yt2009-stars").className = $(".yt2009-stars").className
                                        .replace(currentRating, newRating)

        // rating texts
        var newRatingText = ""
        switch(stars) {
            case 1: {
                newRatingText = "Poor"
                break;
            }
            case 2: {
                newRatingText = "Nothing special"
                break;
            }
            case 3: {
                newRatingText = "Worth watching"
                break;
            }
            case 4: {
                newRatingText = "Pretty cool"
                break;
            }
            case 5: {
                newRatingText = "Awesome!"
                break;
            }
        }
        $("#defaultRatingMessage span").innerHTML = newRatingText;
    }, false)

    // return to the actual video's rating once out
    $(".yt2009-stars").addEventListener("mouseout", function() {
        var currentRating = "ratingL-" + $(".yt2009-stars")
                                        .className.split("ratingL-")[1]
        var newRating = "ratingL-" + videoRating
        $(".yt2009-stars").className = $(".yt2009-stars").className
                                        .replace(currentRating, newRating)


        $("#defaultRatingMessage span").innerHTML = ratingText
    }, false)

    // actually rate the video when clicked
    $(".yt2009-stars").addEventListener("click", function() {
        var r = new XMLHttpRequest();
        r.open("POST", "/video_rate")
        r.setRequestHeader("rating", parseInt(
            $(".yt2009-stars").getAttribute("title")
        ))
        r.setRequestHeader("source", location.href)
        r.send(null)
        r.addEventListener("load", function(e) {
            $("#defaultRatingMessage span").innerHTML = "Thanks for rating!"
        }, false)

        // pchelper autosharing
        if(document.cookie
        && document.cookie.indexOf("pchelper_user=")
        && document.cookie.indexOf("sharing-like") !== -1
        && document.cookie.indexOf("sharing-enabled") !== -1) {
            var currentId = $(".email-video-url").value.split("?v=")[1]
            var reqParams = [
                "type=rate",
                "video=" + currentId,
                "rating=" + parseInt(
                    $(".yt2009-stars").getAttribute("title")
                )
            ].join("&")
            var mr = new XMLHttpRequest();
            mr.open("POST", "/autoshare_submit")
            mr.send(reqParams)
        }
    }, false)
}


/*
======
comments
======
*/
function updateCharacterCount() {
    var charsLeft = 500 - $("#comment_textarea_main_comment").value.length
    $("#maxCharLabelmain_comment").innerHTML = "Remaining character count: " + charsLeft
    if(charsLeft < 0) {
        $("#maxCharLabelmain_comment").innerHTML = "Number of characters over the limit: " + Math.abs(charsLeft)
    }
}

function commentSend() {
    var newUser = false
    if(document.cookie.indexOf("syncses") == -1) {
        newUser = true
    }
    var r = new XMLHttpRequest();
    r.open("POST", "/comment_post")
    r.setRequestHeader("source", location.href)
    r.send(JSON.stringify({
        "comment": $("#comment_textarea_main_comment").value
    }))
    var btn = $("[name=\"add_comment_button\"]")
    btn.setAttribute("disabled", "")
    btn.setAttribute("value", "Adding comment...")
    r.addEventListener("load", function(e) {
        if(r.responseText == "empty") {
            btn.setAttribute("value", "You must enter a comment!")
            return;
        } else if(r.responseText == "long") {
            btn.setAttribute(
                "value",
                "Your comment must be shorter than 500 characters!"
            )
            return;
        }
        btn.setAttribute("value", "Comment Posted!")
        $(".comments-container").innerHTML += r.responseText;
        if(document.cookie.indexOf("syncses") !== -1 && newUser) {
            btn.setAttribute("value", "Comment Posted! (session created)")
        }
        if(r.getResponseHeader("fail-msg")
        && r.getResponseHeader("fail-msg") == "invalid-session") {
            var mc = $("#div_main_comment")
            var eBox = document.createElement("div")
            eBox.className = "errorBox"
            eBox.innerHTML = "invalid session token. "
            var a = document.createElement("a")
            a.href = "/assets/site-assets/invalid-session-help.txt"
            a.setAttribute("target", "_blank")
            a.innerHTML = "(help)"
            eBox.appendChild(a)
            mc.appendChild(eBox)
        }

        // pchelper autosharing
        if(document.cookie
        && document.cookie.indexOf("pchelper_user") !== -1
        && document.cookie.indexOf("comments_add_youtube") !== -1
        && document.cookie.indexOf("sharing-enabled") !== -1
        && document.cookie.indexOf("sharing-comment") !== -1) {
            // autoshare
            var currentId = $(".email-video-url").value.split("?v=")[1]
            var reqParams = [
                "type=comment",
                "video=" + currentId,
                "comment=" + $("#comment_textarea_main_comment").value
                             .trimLeft().trimRight().split("=").join("")
                             .split("&").join("")
            ].join("&")
            var mr = new XMLHttpRequest();
            mr.open("POST", "/autoshare_submit")
            mr.send(reqParams)
        }
    }, false)
}

/*
======
custom comment ratings
======
*/
function sendCmtRating(commentId, rating) {
    var c = document.getElementById("comment-" + commentId)
    var thumbsUp = c.querySelector("[class*=\"watch-comment-up\"]")
    var thumbsDown = c.querySelector("[class*=\"watch-comment-down\"]")
    var commentScore = c.querySelector(".watch-comment-score")
    var isLike = (rating == "like")
    var r = new XMLHttpRequest();
    r.open("POST", "/comment_rate")
    r.setRequestHeader("rating", rating)
    r.setRequestHeader("source", location.href)
    r.setRequestHeader("comment", commentId)
    r.setRequestHeader("initial", commentScore.getAttribute("data-initial"))
    r.send(null)
    r.addEventListener("load", function(e) {
        if(r.responseText.indexOf("rating:") == -1) return;
        // new rating sent - successful response
        var rating = parseInt(r.responseText.replace("rating:", ""))
        var color = "green"
        if(rating == 0) {color = "gray"}
        if(rating < 0) {
            rating = rating.toString()
            color = "red"
        }
        if(rating > 0) {
            rating = "+" + rating.toString()
        }
        c.querySelector(".watch-comment-score").innerHTML = rating

        var scoreClass = "watch-comment-score watch-comment-" + color
        c.querySelector(".watch-comment-score").className = scoreClass

        // mark the button as hovered
        if(isLike) {
            thumbsUp.className = "master-sprite watch-comment-up-on"
            thumbsDown.className = "master-sprite watch-comment-down-hover"
        } else {
            thumbsUp.className = "master-sprite watch-comment-up-hover"
            thumbsDown.className = "master-sprite watch-comment-down-on"
        }
    }, false)
}

/*
======
simulated flagging
======
*/
function loadFlagMenu() {
    if(!document.getElementById("watch-flag-menu")) {
        var r = new XMLHttpRequest();
        r.open("GET", "/flag_menu_template")
        r.send(null)
        r.addEventListener("load", function(e) {
            $("#inappropriateVidDiv").innerHTML = r.responseText
        }, false)
    }
}

var flagMenuShown = false;
function toggleFlagReason() {
    flagMenuShown = !flagMenuShown
    if(flagMenuShown) {
        $("#watch-flag-menu").className = "show y-in"
    } else {
        $("#watch-flag-menu").className = "y-in"
    }
}

function toggleFlagSubdrop(element) {
    var subdrop = element.getElementsByTagName("ul")[0]
    if(subdrop.className.indexOf("show") == -1) {
        subdrop.className = "show"
    } else {
        subdrop.className = ""
    }
}

function addMouseOver(element) {
    element.className += " mouseover"
}

function hideFlagSubdrop(element) {
    var subdrop = element.getElementsByTagName("ul")[0]
    if(subdrop.className.indexOf("mouseover") == -1) {
        subdrop.className = ""
    }
}

function flagProcessSubcategory(element) {
    toggleFlagReason()
    var ul = $("#watch-flag-menu").getElementsByTagName("ul")
    for(var i in ul) {
        if(ul[i].nodeName && ul[i].className.indexOf("show") !== -1) {
            ul[i].className = ""
        }
    }
    var reasonName = element.getElementsByTagName("a")[0].innerHTML
    $("#watch-flag-menu .parent").innerHTML = reasonName
    switch(element.className) {
        case "time-claim": {
            $(".box.time").className = "box time"
            $(".box.hatred").className = "box hatred hid"
            break;
        }
        case "hatred-claim": {
            $(".box.hatred").className = "box hatred"
            $(".box.time").className = "box time hid"
            break;
        }
        default: {
            $(".box.time").className = "box time hid"
            $(".box.hatred").className = "box hatred hid"
            break;
        }
    }
}

function flagVideoSend() {
    $("#inappropriateVidDiv").className = "watch-more-action hid"
    $("#inappropriateMsgsDiv").className = ""
}

/*
======
comment reply form
======
*/
function showReplyForm(comment) {
    if(document.cookie.indexOf("login_simulate") == -1) {
        location.href = "/signin"
        return;
    }
    comment = comment.parentNode.parentNode.parentNode
    var body = comment.querySelector(".watch-comment-body").parentNode

    var r = new XMLHttpRequest();
    r.open("GET", "/reply_template")
    r.setRequestHeader("source", location.href)
    r.send(null)
    r.addEventListener("load", function(e) {
        body.innerHTML += r.responseText

        var replyTo = body.parentNode.getElementsByTagName("a")[0].innerHTML
        var t = body.getElementsByTagName("textarea")[0]
        t.value = "@" + replyTo + " "
    }, false)
}

function updateCharCount(id) {
    var overLimit = "Number of characters over the limit: "
    var remain = "Remaining character count: "

    var charsLeft = 500 - $("#comment_textarea_comment_form_id_" + id).value.length
    $("#charCountcomment_form_id_" + id).value = Math.abs(charsLeft)
    if(charsLeft < 0) {
        $("#maxCharLabelcomment_form_id_" + id).innerHTML = overLimit
    } else {
        $("#maxCharLabelcomment_form_id_" + id).innerHTML = remain
    }
}

function rmReply(id) {
    var element = $("#comment_formcomment_form_id_" + id).parentNode
    element.parentNode.removeChild(element)
}

function submitReply(id) {
    var r = new XMLHttpRequest();
    r.open("POST", "/comment_post")
    r.setRequestHeader("source", location.href)
    r.send(JSON.stringify({
        "comment": $("#comment_textarea_comment_form_id_" + id).value
    }))
    var newUser = false
    if(document.cookie.indexOf("syncses") == -1) {
        newUser = true
    }
    var btn = $("#post-comment-" + id)
    btn.setAttribute("disabled", "")
    btn.setAttribute("value", "Adding comment...")
    r.addEventListener("load", function(e) {
        if(r.responseText == "empty") {
            btn.setAttribute("value", "You must enter a comment!")
            return;
        } else if(r.responseText == "long") {
            btn.setAttribute(
                "value",
                "Your comment must be shorter than 500 characters!"
            )
            return;
        }
        btn.setAttribute("value", "Comment Posted!")
        $(".comments-container").innerHTML += r.responseText;
        if(document.cookie.indexOf("syncses") !== -1 && newUser) {
            btn.setAttribute("value", "Comment Posted! (session created)")
        }
    }, false)
}

function showComment(comment) {
    var body = comment.querySelector(".watch-comment-body")
    body.className = body.className.replace(" hid", "")
    var voting = comment.querySelector(".watch-comment-voting-off")
    voting.className = "watch-comment-voting"
    var showBtn = comment.querySelector(".show-btn")
    showBtn.className = "watch-comment-head-link show-btn hid"
    showBtn.style.visibility = "hidden"
    var hideBtn = comment.querySelector(".hide-btn")
    hideBtn.className = "watch-comment-head-link hide-btn"
    hideBtn.style.visibility = "visible"
}

function hideComment(comment) {
    var body = comment.querySelector(".watch-comment-body")
    body.className += " hid"
    var voting = comment.querySelector(".watch-comment-voting")
    voting.className = "watch-comment-voting-off"
    var showBtn = comment.querySelector(".show-btn")
    showBtn.className = "watch-comment-head-link show-btn"
    showBtn.style.visibility = "visible"
    var hideBtn = comment.querySelector(".hide-btn")
    hideBtn.className = "watch-comment-head-link hide-btn hid"
    hideBtn.style.visibility = "hidden"
}

function mSpam(comment) {
    comment = comment.parentNode.parentNode.parentNode
    var action = comment.querySelector(".watch-comment-action")
    action.className = "watch-comment-action hid"
    var body = comment.querySelector(".watch-comment-body")
    if(body.className.indexOf("hid") == -1) {
        if(!comment.querySelector(".watch-comment-head-link")) {
            // create elements
            var showBtn = document.createElement("a")
            showBtn.className = "watch-comment-head-link show-btn"
            showBtn.onclick = function() {
                showComment(comment)
            }
            showBtn.style.visibility = "visible"
            showBtn.innerHTML = "Show"
            comment.querySelector(".watch-comment-info").appendChild(showBtn)

            var hideBtn = document.createElement("a")
            hideBtn.className = "watch-comment-head-link hide-btn"
            hideBtn.onclick = function() {
                hideComment(comment)
            }
            hideBtn.style.visibility = "hidden"
            hideBtn.innerHTML = "Hide"
            comment.querySelector(".watch-comment-info").appendChild(hideBtn)
        }
        hideComment(comment)
    }
}

/*
======
lights
======
*/
var lightsOff = false;
function toggleLights() {
    lightsOff = !lightsOff;
    if(lightsOff) {
        document.body.className += " watch-lights-off"
        var height = $("#baseDiv").offsetHeight + "px"
        $("#watch-longform-shade").style.height = height
        $("#watch-longform-shade").style.display = "block"
    } else {
        var className = document.body.className
        className = className.replace(" watch-lights-off", "")
        document.body.className = className;
        $("#watch-longform-shade").style.display = "none"
    }
}

/*
======
show more from if no related
======
*/
var related = document.getElementById("watch-related-discoverbox")
              .getElementsByClassName("video-entry");
if(related.length <= 0) {
    var channelVids = document.getElementById("watch-channel-videos-panel")
                      .getElementsByTagName("h2")[0]
    toggleExpander(channelVids)

    var relatedExpander = document.getElementById("watch-related-videos-panel")
                          .getElementsByTagName("h2")[0]
    toggleExpander(relatedExpander)
}

/*
======
update recommended rss if should
======
*/
if(document.cookie && document.cookie.indexOf("rec_rss_id=") !== -1) {
    var rssId = document.cookie.split("rec_rss_id=")[1].split(";")[0]
    var r = new XMLHttpRequest();
    r.open("POST", "/rec-submit")
    r.setRequestHeader("source", location.href)
    r.send(null)
}

/*
======
live chat -- actual video handled by html5player
======
*/
function initLiveChat(id) {
    var continuation = ""
    var last = ""
    function getChat() {
        var url = [
            "/stream_chat?video_id=" + id + "&format=json"
        ]
        if(continuation) {
            url.push("&continuation=" + continuation)
        }
        if(last) {
            url.push("&last=" + last)
        }
        url = url.join("")
        
        var r = new XMLHttpRequest();
        r.open("GET", url)
        r.send(null)
        
        // retry on network errors
        r.addEventListener("error", function() {
            setTimeout(function() {
                getChat()
            }, 2000)
        }, false)
        r.addEventListener("abort", function() {
            setTimeout(function() {
                getChat()
            }, 2000)
        }, false)

        // messages loaded
        r.addEventListener("load", function(e) {
            if(r.getResponseHeader("next-cont")) {
                continuation = r.getResponseHeader("next-cont")
            }
            if(r.getResponseHeader("next-last")) {
                last = r.getResponseHeader("next-last")
            }
            var msgs = JSON.parse(r.responseText)
            msgs.forEach(function(msg) {
                var mtr = document.createElement("tr")
                mtr.className = "live-chat-message"

                var matd = document.createElement("td")
                matd.className = "author-username"
                var maa = document.createElement("a")
                maa.href = "/channel/" + msg.authorId
                maa.innerHTML = msg.authorName
                matd.appendChild(maa)
                mtr.appendChild(matd)

                var mctd = document.createElement("td")
                mctd.className = "message-content"
                var mcs = document.createElement("span")
                mcs.innerHTML = msg.msg;
                mctd.appendChild(mcs)
                mtr.appendChild(mctd)

                $("#live-chat-t tbody").appendChild(mtr)
            })
            setTimeout(function() {
                getChat()
            }, 5000)
            $("#watch-live-discoverbox").scrollBy(0,900)
        }, false)
    }
    getChat()


    // other
    liveUiInit(id)
}

function liveUiInit(id) {
    $("#watch-comment-panel").style.display = "none"

    var continuation = ""
    function pullWatching() {
        var url = [
            "/stream_current_vc?video_id=" + id
        ]
        if(continuation) {
            url.push("&continuation=" + continuation)
        }
        url = url.join("")
        
        var r = new XMLHttpRequest();
        r.open("GET", url)
        r.send(null)
        
        // retry on network errors
        r.addEventListener("error", function() {
            setTimeout(function() {
                pullWatching()
            }, 2000)
        }, false)
        r.addEventListener("abort", function() {
            setTimeout(function() {
                pullWatching()
            }, 2000)
        }, false)

        // messages loaded
        r.addEventListener("load", function(e) {
            if(r.getResponseHeader("next-cont")) {
                continuation = r.getResponseHeader("next-cont")
            }
            $("#watch-views").innerHTML = r.responseText
            setTimeout(function() {
                pullWatching()
            }, 5000)
        }, false)
    }
    pullWatching()
}
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
    // request
    var r = new XMLHttpRequest();
    r.open("GET", "/get_more_comments")
    r.setRequestHeader(
        "page",
        parseInt($(".comments-container").getAttribute("data-page"))
    )
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
        $(".comments-container").setAttribute(
            "data-continuation-token",
            r.responseText.split(";yt_continuation=")[1]
        )
        // calc comment count + add page indicator
        var commentCount = parseInt($("#watch-comment-count").innerHTML)
                         + r.responseText.split("watch-comment-entry").length - 1
        $("#watch-comment-count").innerHTML = commentCount
        $(".comments-container").setAttribute("data-page", nextPage)
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
        annotation43()
    } else {
        player_overlay.className = "yt-rounded"
        player_element.className = "flash-player"
        $("#watch-vid-title").className = "title longform"
        $("#player-toggle-switch").className = "reverse-tooltip-wrapper"
        localStorage.removeItem("widescreenEnabled")
        fourthreechecked = false
        annotation43()
    }

    adjustSeekbarWidth();
}
$("#watch-longform-player").addEventListener("click", switchWidescreen, false)
if(localStorage && localStorage.widescreenEnabled) {
    switchWidescreen()
}

// popout
$("#watch-longform-popup").addEventListener("click", function() {
    var id = window.location.href.split("v=")[1].split("&")[0]
    window.open("/embed/" + id)
}, false)

/*
======
playlisty
======
*/

if(document.querySelector("#watch-playlist-videos-panel")) {
    // następny film
    $("video").addEventListener("ended", function() {
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
    }, false)

    // refetch jak nie ma filmów zapisanych
    if(document.querySelector(".yt2009_marking_fetch_playlist_client")) {
        // request
        var r = new XMLHttpRequest();
        r.open("GET", "/refetch_playlist_watch")
        r.setRequestHeader("source", location.href)
        r.send(null)
        r.addEventListener("load", function(e) {
            // dopełnianie htmla wysłanego z serwera
            $("#watch-playlist-discoverbox").innerHTML += r.responseText
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
    try {
        relayFavorite()
    }
    catch(error) {}


    var currentId = $(".email-video-url").value.split("?v=")[1]
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

    // relay if used
    relayPlaylistAdd(playlistId)
    
    // show success tick
    $("#addToPlaylistResult").style.display = "block"
    $("#addToPlaylistDiv").style.display = "none"

    var playlist = JSON.parse(localStorage["playlist-" + playlistId])
    if(JSON.stringify(playlist).indexOf(currentId) == -1) {
        playlist.unshift(videoData)
    }
    localStorage["playlist-" + playlistId] = JSON.stringify(playlist)
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
    localStorage["playlist-" + playlistId] = "[]"
    addPlaylistVideo(playlistId)

    var index = JSON.parse(localStorage.playlistsIndex);
    index.unshift({"id": playlistId, "name": $(".playlist-name-input").value})
    localStorage.playlistsIndex = JSON.stringify(index)

    // update playlists dropdown to show our new playlist
    updatePlaylists();
    $(".playlist-create").style.display = "none"
    $(".playlist-add").style.display = ""
    selectedOption = plDropdown.querySelectorAll("option")[0]
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
    }, false)
}


/*
======
comments with relay
======
*/
function updateCharacterCount() {
    var charsLeft = 500 - $("#comment_textarea_main_comment").value.length
    $("#maxCharLabelmain_comment").innerHTML = "Remaining character count: " + charsLeft
    if(charsLeft < 0) {
        $("#maxCharLabelmain_comment").innerHTML = "Number of characters over the limit: " + Math.abs(charsLeft)
    }
}

var relay_address = ""
if(document.querySelector("#comment_formmain_comment")) {
    relay_address = $("#comment_formmain_comment").getAttribute("action")
                    .replace("comment_post", "")
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
    }, false)
}

/*
======
favoriting with relay
======
*/
function relayFavorite() {
    var r = new XMLHttpRequest();
    r.open("POST", relay_address + "favorite_video")
    r.setRequestHeader("auth", $("[name=\"relay_key\"]").value)
    r.setRequestHeader("source", location.href)
    r.send(null)
    r.addEventListener("load", function(e) {
        var res = JSON.parse(r.responseText)
        // resync required to track the new favorites playlist
        // that may have been created
        if(res.relayCommand == "resync") {
            setTimeout(function() {
                relayResync()
            }, 1024)
        }
    }, false)
}

/*
======
relay resync
======
*/
function relayResync() {
    var settings;
    var r = new XMLHttpRequest();
    r.open("GET", relay_address + "relay_settings")
    r.setRequestHeader("auth", $("[name=\"relay_key\"]").value)
    r.send(null)
    r.addEventListener("load", function(e) {
        settings = JSON.parse(r.responseText)
        r = new XMLHttpRequest();
        r.open("POST", relay_address + "apply_relay_settings")
        r.setRequestHeader("auth", $("[name=\"relay_key\"]").value)
        r.send(JSON.stringify({
            "settings": settings
        }))
        r.addEventListener("load", function(e) {}, false)
    }, false)
}

/*
======
playlists with relay
======
*/
function relayPlaylistAdd(playlistId) {
    var r = new XMLHttpRequest();
    r.open("POST", relay_address + "playlist_add")
    r.setRequestHeader("auth", $("[name=\"relay_key\"]").value)
    r.setRequestHeader("source", location.href)
    r.send(JSON.stringify({
        "playlistId": playlistId
    }))
    r.addEventListener("load", function(e) {
        
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
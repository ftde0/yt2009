/*

yt2009 :D
2022 rewrite

*/

/*
======
polyfille, naprawki stron i inne takie
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

/*
======
elementy ui

dużo przestarzałych rzeczy/rozwiązań dla kompatybilności ze starszymi przeglądarkami (coś czego nie zrobiłem w 2019)
target firefox 3.6 & chrome 6 na winxp - nie powiecie że nie ma klimatu jak takie coś działa na starej przeglądarce na starym os
======
*/
var useLocalStorage = window.localStorage ? true : false;
// rozwijanie opisu
var descriptionExpanded = false;
// więcej
$("#watch-video-details-toggle-less").addEventListener("click", function() {
    $("#watch-video-details-inner-more").style.display = "block"
    $("#watch-video-details-toggle-more").style.display = "block"
    $("#watch-video-details-inner-less").style.display = "none"
    $("#watch-video-details-toggle-less").style.display = "none"
}, false)
// mniej
$("#watch-video-details-toggle-more").addEventListener("click", function() {
    $("#watch-video-details-inner-more").style.display = "none"
    $("#watch-video-details-toggle-more").style.display = "none"
    $("#watch-video-details-inner-less").style.display = "block"
    $("#watch-video-details-toggle-less").style.display = "block"
}, false)

// więcej komentarzy
function onWatchCommentsShowMore() {
    $("#watch-comments-show-more-td").style.display = "none"
    // request
    var r = new XMLHttpRequest();
    r.open("GET", "/get_more_comments")
    r.setRequestHeader("continuation", $(".comments-container")
                                    .getAttribute("data-continuation-token"))
    r.setRequestHeader("url_flags", location.href)
    r.setRequestHeader("source", location.href)
    r.send(null)
    r.addEventListener("load", function(e) {
        $("#watch-comments-show-more-td").style.display = "block"
        // dopełnianie htmla wysłanego z serwera
        $(".comments-container").innerHTML += r.responseText
                                            .split(";yt_continuation=")[0]
        $(".comments-container").setAttribute(
            "data-continuation-token",
            r.responseText.split(";yt_continuation=")[1]
        )
        // pełna liczba komentarzy
        var commentCount = parseInt($("#watch-comment-count").innerHTML) + r.responseText.split("watch-comment-entry").length - 1
        $("#watch-comment-count").innerHTML = commentCount
    }, false)
}

// rozwijanie/zwijanie related videos/more from
function toggleExpander(element) {
    if(element.className.indexOf("yt-uix-expander-collapsed") !== -1) {
        // zwinięte, rozwijamy
        element.className = "yt-uix-expander-head"
        var className = element.parentNode.querySelector(".watch-discoverbox-body").className
        element.parentNode.querySelector(".watch-discoverbox-body").className = className.replace(" hid", "")

        // fetch more from jak jest flaga always_morefrom a nie ma już tam filmów
        if(document.querySelector(".yt2009-mark-morefrom-fetch")) {
            morefrom_load();
        }
    } else {
        // rozwinięte, zwijamy
        element.className = "yt-uix-expander-head yt-uix-expander-collapsed"
        element.parentNode.querySelector(".watch-discoverbox-body").className += " hid"
    }
}

// rozwijanie/zwijanie komentarzy
function toggleCommentsExpander(element) {
    if(element.className.indexOf("yt-uix-expander-collapsed") !== -1) {
        element.className = "yt-uix-expander-head"
        element.parentNode.querySelector(".yt-uix-expander-body").className = "yt-uix-expander-body"
    } else {
        element.className = "yt-uix-expander-head yt-uix-expander-collapsed"
        element.parentNode.querySelector(".yt-uix-expander-body").className = "yt-uix-expander-body hid"
    }
}

// rozwijanie/zwijanie quicklisty
function toggleQuicklistExpander(element) {
    var ql = document.querySelector("#quicklist-panel")
    if(ql.className.indexOf("yt-uix-expander-collapsed") !== -1) {
        // zwinięte, rozwijamy
        document.querySelector("#playlistContainer_QL").style.display = "block"
        document.querySelector("#quicklist-panel #watch-playlist-actions")
                .style.display = "block"
        ql.className = ql.className
                        .split(" yt-uix-expander-collapsed")
                        .join("")
    } else {
        // rozwinięte, zwijamy
        document.querySelector("#playlistContainer_QL").style.display = "none"
        document.querySelector("#quicklist-panel #watch-playlist-actions")
                .style.display = "none"
        ql.className += " yt-uix-expander-collapsed"
    }
}

// dopisywanie do historii
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
        // backup historii aby można było usunąć
        document.cookie = "watch_history_backup_" + Date.now() + "=" + watchHistory + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
        document.cookie = "watch_history= ; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
        watchHistory = ""
    }
    if(watchHistory.split(":").splice(0, 20).join(":").indexOf($(".email-video-url").value.split("?v=")[1]) == -1) {
        watchHistory = encodeURIComponent($("#watch-vid-title h1").innerHTML) + "&" + $("#watch-view-count").innerHTML + "&" + $(".email-video-url").value.split("?v=")[1] + ":" + watchHistory;
        document.cookie = "watch_history=" + watchHistory + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }
}

// always_morefrom
function morefrom_load() {
    var site = location.protocol.replace(":", "") + '://' + location.host
    site = $(".yt2009-channel-link").href.replace(site, "")
    // request
    var r = new XMLHttpRequest();
    r.open("GET", "/morefrom_load")
    r.setRequestHeader("channel", site)
    r.setRequestHeader("source", location.href)
    r.send(null)
    r.addEventListener("load", function(e) {
        // dopełnianie htmla wysłanego z serwera
        $("#watch-channel-discoverbox").innerHTML += r.responseText

        // usuwanie markingu aby nie pobierać za każdym razem
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

$("#subscribeDiv").addEventListener("click", function() {
    $("#subscribeDiv").style.display = "none"
    $("#unsubscribeDiv").style.display = "block"

    if(useLocalStorage) {
        // localstorage
        var url = $(".yt2009-channel-link").href.replace(location.protocol + "//" + location.hostname + ":" + location.port, "")
        var creator = $(".yt2009-channel-link").innerHTML
        var subList = []
        subList = JSON.parse(localStorage.subscriptions)
        subList.unshift({
            "url": url,
            "creator": creator
        })
        localStorage.subscriptions = JSON.stringify(subList)
    } else {
        // dopisywanie do cookie
        var sub = ""
        document.cookie.split(";").forEach(function(cookie) {
            if(cookie.indexOf("sublist=") !== -1) {
                sub = cookie.trimLeft().replace("sublist=", "")
            }
        })

        sub = encodeURIComponent($(".yt2009-channel-link").href.replace(location.protocol + "//" + location.hostname + ":" + location.port, "")) + "&" + encodeURIComponent($(".yt2009-channel-link").innerHTML) + ":" + sub;
        document.cookie = "sublist=" + sub + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }
}, false)

$("#unsubscribeDiv").addEventListener("click", function() {
    $("#unsubscribeDiv").style.display = "none"
    $("#subscribeDiv").style.display = "block"
    var subscribeMethod = "cookie"
    var url = $(".yt2009-channel-link").href.replace(location.protocol + "//" + location.hostname + ":" + location.port, "")
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
        // wywalanie z cookie
        var sub = ""
        document.cookie.split(";").forEach(function(cookie) {
            if(cookie.indexOf("sublist=") !== -1) {
                sub = cookie.trimLeft().replace("sublist=", "")
            }
        })

        sub = sub.replace(encodeURIComponent($(".yt2009-channel-link").href.replace(location.protocol + "//" + location.hostname + ":" + location.port, "")) + "&" + encodeURIComponent($(".yt2009-channel-link").innerHTML) + ":", "")
        document.cookie = "sublist=" + sub + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }
}, false)

// sprawdzamy czy twórca jest subskrybowany z localStorage
if(window.localStorage) {
    JSON.parse(localStorage.subscriptions).forEach(function(sub) {
        if(!sub.url) return;
        var url = $(".yt2009-channel-link").href.replace(location.protocol + "//" + location.hostname + ":" + location.port, "")
        if(sub.url.indexOf(url) !== -1 || url.indexOf(sub.url) !== -1) {
            // jest zasubskrybowany już
            $("#subscribeDiv").style.display = "none"
            $("#unsubscribeDiv").style.display = "block"
        }
    })
}

/*
======
przyciski nad filmem
======
*/

// widescreen
var widescreen = false;
var player_overlay = $("#watch-this-vid");
var player_element = $("#watch-this-vid #watch-player-div");
$("#watch-longform-player").addEventListener("click", function() {
    widescreen = !widescreen;

    if(widescreen) {
        player_overlay.className = "yt-rounded widescreen"
        player_element.className = "flash-player widescreen"
        $("#watch-vid-title").className = "title longform widescreen"
        $("#player-toggle-switch").className = "reverse-tooltip-wrapper watch-wide-mode"
    } else {
        player_overlay.className = "yt-rounded"
        player_element.className = "flash-player"
        $("#watch-vid-title").className = "title longform"
        $("#player-toggle-switch").className = "reverse-tooltip-wrapper"
    }

    adjustSeekbarWidth();
}, false)

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

if(location.href.indexOf("&flip=1") !== -1) {
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
    .links, .region-and-language-pickers")
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

    // better account name positioning
    var loginDiv = document.querySelector("#masthead-utility #masthead-utility, #masthead-utility .utility-item")
    var loginWidth = loginDiv.getBoundingClientRect().width;
    document.querySelector("#masthead-utility").style = "margin-left: " + (960 - loginWidth) + "px !important;"
} 

function new_layout_alert() {
    window.open("/t/new_viewing_experience")
}

function new_layout_leave() {
    location.href = location.href.replace("&flip=1", "")
}

/*
======
karty pod filmem (favorite/share/playlists/flag)
======
*/

function switchWatchTab(tabName) {
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

    // custom handling na karty jak potrzebny
    switch(tabName) {
        case "favorite": {
            favorite_video();
            break;
        }
    }
}

/*
======
dodawanie filmów do ulubionych
======
*/

// kod taktycznie z kanałów zabrany
// dodawanie
function favorite_video() {
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

            // przy okazji usuń puste entry (usunięte z poziomu ui)
            localStorage.favorites = JSON.stringify(favorites).split(",{}").join("")
        }
    } else {
        // cookie
        var videoString = encodeURIComponent($(".watch-vid-ab-title").innerHTML + "&" + $("#watch-view-count").innerHTML + "&" + currentId)
        document.cookie.split(";").forEach(function(cookie) {
            if(cookie.indexOf("favorites=") !== -1) {
                favorites = cookie.trimLeft().replace("favorites=", "")
            }
        })
        if(favorites.indexOf(currentId) == -1) {
            favorites = videoString + ":" + favorites
            document.cookie = "favorites=" + favorites + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
        }
    }
    $("#watch-add-faves").className += " hid"
    $("#watch-remove-faves").className = "watch-action-result"
}

// usuwanie
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
        var videoString = encodeURIComponent($("#watch-vid-title h1").innerHTML + "&" + $("#watch-view-count").innerHTML + "&" + currentId) + ":"
        document.cookie.split(";").forEach(function(cookie) {
            if(cookie.indexOf("favorites=") !== -1) {
                favorites = cookie.trimLeft().replace("favorites=", "")
            }
        })
        favorites = favorites.replace(videoString, "")
        document.cookie = "favorites=" + favorites + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }
    $("#watch-remove-faves").className += " hid"
    $("#watch-add-faves").className = "watch-action-result"
}

/*
======
udostępnianie
======
*/
// więcej opcji
$("#watch-sharetab-options #more-options a").addEventListener("click", function() {
    $("#watch-sharetab-options #more-options").style.display = "none"
    $("#watch-share-services-collapsed").style.display = "none"
    $("#watch-share-services-expanded").style.display = ""
    $("#watch-sharetab-options #fewer-options").style.display = ""
}, false)
// mniej opcji
$("#watch-sharetab-options #fewer-options a").addEventListener("click", function() {
    $("#watch-sharetab-options #more-options").style.display = ""
    $("#watch-share-services-collapsed").style.display = ""
    $("#watch-share-services-expanded").style.display = "none"
    $("#watch-sharetab-options #fewer-options").style.display = "none"
}, false)


/*
======
embedy
======
*/
var embed_settings = {
    "color1": "b1b1b1",
    "color2": "cfcfcf",
    "width": "425",
    "height": "344",
    "flash_player": true,
    "add_related_html": false,
    "add_border": false
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
    var code = '<iframe width="' + embed_settings.width + '" height="' + embed_settings.height + '" src="' + site + '/embed/' + id + attributes + '" ></iframe>' // html5
    if(embed_settings.flash_player) {
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
dodawanie filmów do playlist
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
    
        // pokaż tworzenie playlist jak nie mamy żadnej
        if(optionsHTML == "") {
            $(".playlist-create").style.display = ""
            $(".playlist-add").style.display = "none"
        }
    } else {
        // tworzymy entry do localStorage jak nie mamy
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
    // które jest wybrane
    var options = plDropdown.querySelectorAll("option")

    for(var s in options) {
        if(options[s].selected) {
            selectedOption = options[s]
        }
    }

    // ukrywamy/pokazujemy
    if(selectedOption.value == "override-createnew") {
        $(".playlist-create").style.display = ""
        $(".playlist-add").style.display = "none"
    } else {
        $(".playlist-create").style.display = "none"
        $(".playlist-add").style.display = ""
    }
}, false)

// dodaj obecny film do playlisty
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

    // aktualizacja opcji playlist aby pokazywała się nowa
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
responseExpander.addEventListener("click", function() {
    if(responseExpander.parentNode.className
        .indexOf("yt-uix-expander-collapsed") !== -1) {
        responseExpander.parentNode.className = responseExpander.parentNode
                                                .className.replace(
                                                    "collapsed", "expanded"
                                                )

        if(!videoResponsesLoaded) {
            loadVideoResponses();
        }
    } else {
        responseExpander.parentNode.className = responseExpander.parentNode
                                                .className.replace(
                                                    "expanded", "collapsed"
                                                )
    }
}, false)

// fetch our response list
function loadVideoResponses() {
    var r = new XMLHttpRequest();
    r.open("POST", "/videoresponse_load")
    try {
        r.send($(".watch-vid-ab-title").innerHTML)
        r.addEventListener("load", function(e) {
            videoResponsesLoaded = true;
            $("#watch-video-responses-children").innerHTML = r.responseText
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
    var r = new XMLHttpRequest();
    r.open("POST", $("#comment_formmain_comment").getAttribute("action"))
    r.setRequestHeader("auth", $("[name=\"relay_key\"]").value)
    r.setRequestHeader("source", location.href)
    r.send(JSON.stringify({
        "comment": $("#comment_textarea_main_comment").value
    }))
    var btn = $("[name=\"add_comment_button\"]")
    btn.setAttribute("disabled", "")
    btn.setAttribute("value", "Adding comment...")
    r.addEventListener("load", function(e) {
        btn.setAttribute("value", "Comment Posted!")
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
    r.addEventListener("load", function(e) {
        var res = JSON.parse(r.responseText)
        // resync required to track the new favorites playlist
        // that may have been created
        if(res.relayCommand == "resync") {
            relayResync()
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
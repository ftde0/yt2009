/*
=======
f_script
skrypt ładowany dodając parametr f=1 obsługujący jeszcze starsze przeglądarki niż natywnie wspierane (2009>)
a script that's loaded by adding the f=1 parameter, supporting even older browsers than natively (2009>)

yt2009, 2022.
=======
*/

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

var sub = ""

// ui with &f=1

/*
=======
watchpage
=======
*/
if(location.href.indexOf("watch") !== -1) {
    // descriptions
    $("#watch-video-details-toggle-less").onclick = function() {
        $("#watch-video-details-inner-more").style.display = "block"
        $("#watch-video-details-toggle-more").style.display = "block"
        $("#watch-video-details-inner-less").style.display = "none"
        $("#watch-video-details-toggle-less").style.display = "none"
    }
    
    $("#watch-video-details-toggle-more").onclick = function() {
        $("#watch-video-details-inner-more").style.display = "none"
        $("#watch-video-details-toggle-more").style.display = "none"
        $("#watch-video-details-inner-less").style.display = "block"
        $("#watch-video-details-toggle-less").style.display = "block"
    }

    // sharing
    $("#more-options").onclick = function() {
        $("#more-options").style.display = "none"
        $("#watch-share-services-collapsed").style.display = "none"
        $("#watch-share-services-expanded").style.display = ""
        $("#fewer-options").style.display = ""
    }
    $("#fewer-options").onclick = function() {
        $("#more-options").style.display = ""
        $("#watch-share-services-collapsed").style.display = ""
        $("#watch-share-services-expanded").style.display = "none"
        $("#fewer-options").style.display = "none"
    }

    // save watched video to history
    // only cookie approach
    var watchHistory = ""
    var cookies = document.cookie.split(";")
    for(var c in cookies) {
        if(cookies[c].indexOf("watch_history=") !== -1) {
            watchHistory = trimLeft(cookies[c]).replace("watch_history=", "")
        }
    }
    
    if(watchHistory.length > 4000) {
        // if we surpass the cookie limit (4KB) make a backup for use later and clear
        document.cookie = "watch_history_backup_" + Date.now()
                          + "=" + watchHistory
                          + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
        document.cookie = "watch_history= ; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
        watchHistory = ""
    }

    var videoId = $(".email-video-url").value.split("?v=")[1]
    if(watchHistory.indexOf(videoId) == -1) {
        watchHistory = encodeURIComponent($(".watch-vid-ab-title").innerHTML)
                       + "&" + $("#watch-view-count").innerHTML
                       + "&" + $(".email-video-url").value.split("?v=")[1]
                       + ":" + watchHistory;
        document.cookie = "watch_history="
                          + watchHistory
                          + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }

    // widescreen and embed buttons
    var playerWidescreen = false;
    function switchWidescreen() {
        playerWidescreen = !playerWidescreen
        if(playerWidescreen) {
            // turn on widescreen
            var s = document.querySelectorAll(".fl")
            for(var sel in s) {
                try {
                    s[sel].setAttribute("width", "960")
                    s[sel].setAttribute("height", "565")
                }
                catch(error) {}
            }
            document.querySelector("#watch-vid-title").style.width = "960px"
            var toggleSwitch = document.getElementById("player-toggle-switch")
            toggleSwitch.className += " watch-wide-mode"
            $("#watch-this-vid").style.width = "960px"
            $("#watch-this-vid").style.height = "565px"
            var w = "widescreen=1; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
            document.cookie = w;
        } else {
            // turn off
            var s = document.querySelectorAll(".fl")
            for(var sel in s) {
                try {
                    s[sel].setAttribute("width", "640")
                    s[sel].setAttribute("height", "385")
                }
                catch(error) {}
            }
            document.querySelector("#watch-vid-title").style.width = "640px"
            var toggleSwitch = document.getElementById("player-toggle-switch")
            toggleSwitch.className = toggleSwitch.className.replace(
                "watch-wide-mode", ""
            )
            $("#watch-this-vid").style.width = ""
            $("#watch-this-vid").style.height = ""
            var w = "widescreen=0; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
            document.cookie = w;
        }
    }
    $("#watch-longform-player").onclick = switchWidescreen;
    if(document.cookie.indexOf("widescreen=1") !== -1) {
        switchWidescreen()
    }


    $("#watch-longform-popup").onclick = function() {
        window.open("/embedF/" + videoId)
    }


    // playlist stuff
    watchpage_initPlaylistsTab();
    onPlaylistChange();
    $(".playlists-options").onchange = onPlaylistChange;
    $("#playlist-create-btn").onclick = function() {
        var newId = playlistCreate();
        playlistAdd(newId)
        watchpage_initPlaylistsTab();
    }
    $("#playlist-add-btn").onclick = function() {
        onPlaylistChange();
        playlistAdd(plSelectedOption.getAttribute("value"));
        watchpage_initPlaylistsTab();
    }

    function updateSublist() {
        var split = document.cookie.split(";")
        for(var c in split) {
            var cookie = split[c]
            if(cookie.indexOf("sublist=") !== -1) {
                sub = cookie.replace("sublist=", "")
                if(sub.indexOf(" ") == 0) {
                    sub = sub.replace(" ", "")
                }
            }
        }
    }

    // SUBSCRIBE
    $("#subscribeDiv").onclick = function() {
        $("#subscribeDiv").style.display = "none"
        $("#unsubscribeDiv").style.display = "block"

        // cookie
        updateSublist()

        sub = encodeURIComponent(
            $(".yt2009-channel-link").href.replace(
                location.protocol + "//" + location.hostname + ":" + location.port,
                ""
            )
        ) + "&" + encodeURIComponent($(".yt2009-channel-link").innerHTML
        ) + ":" + sub;
        document.cookie = "sublist=" + sub
                        + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }
    
    // UNSUBSCRIBE
    $("#unsubscribeDiv").onclick = function() {
        $("#unsubscribeDiv").style.display = "none"
        $("#subscribeDiv").style.display = "block"
        // cookie
        updateSublist()

        sub = sub.replace(
            encodeURIComponent($(".yt2009-channel-link").href.replace(
                location.protocol + "//" + location.hostname + ":" + location.port,
                ""
            ))
            + "&" + encodeURIComponent($(".yt2009-channel-link").innerHTML)
            + ":",
            ""
        )
        document.cookie = "sublist=" + sub
                        + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }

    // check if subscribed
    updateSublist()
    if(decodeURIComponent(sub).indexOf($(".yt2009-channel-link").href) !== -1) {
        $("#subscribeDiv").style.display = "none"
        $("#unsubscribeDiv").style.display = "block"
    }
}

// switch tabs (/watch)
function switchWatchTab(tabName) {
    // hide previously shown tab
    var e = document.querySelectorAll(".watch-tab-body")
    for(var sel in e) {
        try {
            if(e[sel].className.indexOf("watch-tab-sel") !== -1) {
                e[sel].className = "watch-tab-body"
            }
        }
        catch(error) {}
    }

    e = document.querySelectorAll(".watch-tab")
    for(var sel in e) {
        try {
            if(e[sel].className.indexOf("watch-tab-sel") !== -1) {
                e[sel].className = "watch-tab"
            }
        }
        catch(error) {}
    } 

    // current tab
    $("#watch-tab-" + tabName).className = "watch-tab watch-tab-sel"
    $("#watch-tab-" + tabName + "-body").className = "watch-tab-body watch-tab-sel"

    // custom handling for tabs
    switch(tabName) {
        case "favorite": {
            favorite_video();
            break;
        }
    }
}

// add to favorites
function favorite_video() {
    var currentId = $(".email-video-url").value.split("?v=")[1]
    var favorites = ""
    var videoString = encodeURIComponent(
        $(".watch-vid-ab-title").innerHTML
        + "&" + $("#watch-view-count").innerHTML
        + "&" + currentId
    )
    var c = 0;
    var cookie = document.cookie.split(";")
    while(c !== cookie.length) {
        if(cookie[c].indexOf("favorites=") !== -1) {
            favorites = cookie[c].replace(" ", "").replace("favorites=", "")
        }
        c += 1
    }
    if(favorites.indexOf(currentId) == -1) {
        favorites = videoString + ":" + favorites
        document.cookie = "favorites="
                          + favorites
                          + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }
    $("#watch-add-faves").className += " hid"
    $("#watch-remove-faves").className = "watch-action-result"
}

// usuwanie
function favorite_undo() {
    var currentId = $(".email-video-url").value.split("?v=")[1]
    var favorites = ""
    var videoString = encodeURIComponent($(".watch-vid-ab-title").innerHTML
                      + "&" + $("#watch-view-count").innerHTML
                      + "&" + currentId) + ":"
    var c = 0;
    var cookie = document.cookie.split(";")
    while(c !== cookie.length) {
        if(cookie[c].indexOf("favorites=") !== -1) {
            favorites = cookie[c].replace(" ", "").replace("favorites=", "")
        }
        c += 1
    }
    favorites = favorites.replace(videoString, "")
    document.cookie = "favorites="
                      + favorites
                      + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    $("#watch-remove-faves").className += " hid"
    $("#watch-add-faves").className = "watch-action-result"
}

// more comments
function onWatchCommentsShowMore() {
    $("#watch-comments-show-more-td").style.display = "none"
    var nextPage = parseInt($(".comments-container").getAttribute("data-page")) + 1
    // request

    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("GET", "/get_more_comments")
    r.setRequestHeader(
        "page",
        parseInt($(".comments-container").getAttribute("data-page"))
    )
    r.setRequestHeader("source", location.href)
    r.send(null)
    r.onreadystatechange = function(e) {
        if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            $("#watch-comments-show-more-td").style.display = "block"
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
        }
    }
}


var plSelectedOption = false;
// watchpage: add to playlist tab, read the playlist index, create one if non-existent
function watchpage_initPlaylistsTab() {
    $(".playlists-options").innerHTML = ""
    var cookies = document.cookie.split(";")
    var cookieIndex = false;
    for(var c in cookies) {
        if(cookies[c].indexOf("playlist_index=") !== -1) {
            cookieIndex = trimLeft(cookies[c]).replace("playlist_index=", "")
        }
    }
    
    if(!cookieIndex) {
        // create the index first
        document.cookie = "playlist_index= ; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
        cookieIndex = " "
    }

    var playlists = cookieIndex.split(":")
    for(var p in playlists) {
        var playlist = decodeURIComponent(playlists[p])
        var playlistName = playlist.split(";")[0];
        var playlistId = playlist.split(";")[1];
        
        if(playlistId) {
            var optionCreate = document.createElement("option");
            optionCreate.setAttribute("value", playlistId)
            optionCreate.innerHTML = playlistName
            $(".playlists-options").appendChild(optionCreate)
        }
    }

    var optionCreate = document.createElement("option");
    optionCreate.setAttribute("value", "override-createnew")
    optionCreate.innerHTML = "[ New Playlist ]"
    $(".playlists-options").appendChild(optionCreate)
}


// watchpage: playlist change event, show the new playlist name textbox if that's selected
function onPlaylistChange() {
    var options = $(".playlists-options").getElementsByTagName("option")

    for(var s in options) {
        if(options[s].selected) {
            plSelectedOption = options[s]
        }
    }

    if(plSelectedOption.getAttribute("value") == "override-createnew") {
        $(".playlist-add").style.display = "none"
        $(".playlist-create").style.display = "block"
    } else {
        $(".playlist-add").style.display = "block"
        $(".playlist-create").style.display = "none"
    }
}


// watchpage: create playlist
function playlistCreate() {
    var id = "playlist-" + new Date().getTime();
    var name = $(".playlist-name-input").value

    // write cookie and index
    var cookies = document.cookie.split(";")
    var cookieIndex = false;
    for(var c in cookies) {
        if(cookies[c].indexOf("playlist_index=") !== -1) {
            cookieIndex = trimLeft(cookies[c]).replace("playlist_index=", "")
        }
    }

    cookieIndex = encodeURIComponent(name + ";" + id) + ":" + cookieIndex
    document.cookie = "playlist_index=" + cookieIndex
                      + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"

    return id;
}


// watchpage: add current video to playlist
function playlistAdd(id) {
    var currentId = $(".email-video-url").value.split("?v=")[1]
    var videoName = $(".watch-vid-ab-title").innerHTML
    var viewCount = $("#watch-view-count").innerHTML
    var starRating = $(".ratingL").className.split(" ")[2].split("-")[1]
    var currentDate = new Date();
    var months = ["Jan", "Feb", "Mar",
                  "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep",
                  "Oct", "Nov", "Dec"]
    var day = currentDate.getDate();
    if(day < 10) {
        day = "0" + day.toString();
    }
    var addDate = months[currentDate.getMonth()] + " "
                  + day + ", "
                  + currentDate.getFullYear();

    var playlistData = ""
    var cookies = document.cookie.split(";")
    for(var c in cookies) {
        if(cookies[c].indexOf(id + "=") !== -1) {
            playlistData = trimLeft(cookies[c]).replace(id + "=", "")
        }
    }

    if(playlistData.indexOf(currentId) == -1) {
        playlistData = encodeURIComponent(
            encodeURIComponent(videoName)
            + ";" + currentId
            + ";" + viewCount
            + ";" + starRating
            + ";" + addDate
        ) + ":" + playlistData
        document.cookie = id + "=" + playlistData
                          + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }

    $("#addToPlaylistResult").style.display = "block"
    $("#addToPlaylistDiv").style.display = "none"
}


// watchpage: go back to the playlist select screen
function playlistResultBack() {
    $("#addToPlaylistResult").style.display = "none"
    $("#addToPlaylistDiv").style.display = "block"
}

// expanders
function toggleExpander(element) {
    if(element.className.indexOf("yt-uix-expander-collapsed") !== -1) {
        // expand
        element.className = "yt-uix-expander-head"
        var className = getElementsByClassName(
            element.parentNode, "watch-discoverbox-body"
        )[0].className
        getElementsByClassName(
            element.parentNode, "watch-discoverbox-body"
        )[0].className = className.replace(" hid", "")

        // fetch "more from" if required 
        if(document.querySelector(".yt2009-mark-morefrom-fetch")) {
            morefrom_load();
        }
    } else {
        // collapse
        element.className = "yt-uix-expander-head yt-uix-expander-collapsed"
        getElementsByClassName(
            element.parentNode, "watch-discoverbox-body"
        )[0].className += " hid"
    }
}

function toggleCommentsExpander(element) {
    if(element.className.indexOf("yt-uix-expander-collapsed") !== -1) {
        element.className = "yt-uix-expander-head"
        getElementsByClassName(
            element.parentNode, "yt-uix-expander-body"
        )[0].className = "yt-uix-expander-body"
    } else {
        element.className = "yt-uix-expander-head yt-uix-expander-collapsed"
        getElementsByClassName(
            element.parentNode, "yt-uix-expander-body"
        )[0].className = "yt-uix-expander-body hid"
    }
}

// star ratings
var ratingText = document.getElementById("defaultRatingMessage")
                 .getElementsByTagName("span")[0]
var defaultRatingText = ratingText.innerHTML
function showStars(rating, source) {
    if(document.cookie.indexOf("login_simulate") == -1) return;
    rating = parseFloat(rating)
    var starIndex = 1;
    while(starIndex !== 6) {
        var starType = "empty"
        if(rating - starIndex >= 1
        || rating - starIndex == 0
        || rating - starIndex == 0.5) {
            starType = "full"
        } else if(rating - starIndex == -0.5) {
            starType = "half"
        }
        var r = "master-sprite rating icn_star_" + starType + "_large"
        document.getElementById("star__" + starIndex).className = r
        starIndex++
    }

    if(source !== "unhover") {
        // rating text
        var ratingTexts = [
            "Poor",
            "Nothing special",
            "Worth watching",
            "Pretty cool",
            "Awesome!"
        ]
        ratingText.innerHTML = ratingTexts[rating - 1]
    } else {
        ratingText.innerHTML = defaultRatingText
    }
}

function clearStars() {
    showStars(fullRating, "unhover")
}

function rateVid(rating) {
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("POST", "/video_rate")
    r.setRequestHeader("rating", rating)
    r.setRequestHeader("source", location.href)
    r.send(null)
    r.onreadystatechange = function(e) {
        if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            ratingText.innerHTML = "Thanks for rating!"
        }
    }
}

/*
=======
channels
=======
*/
function switchVideo(video) {
    var e = document.querySelectorAll(".playnav-video")
    for(var sel in e) {
        try {
            if(e[sel].className.indexOf("sel") !== -1) {
                e[sel].className = e[sel].className.replace(
                    "selected", ""
                ).replace(
                    "playnav-item-selected", ""
                )
            }
        }
        catch(error) {}
    }
    
    var id = video.id.split("-").splice(2, video.id.split("-").length).join("-")

    var videoUrl = customPlayerUrl + '?' + customPlayerArg + '=' + id
    if(document.cookie.indexOf("f_h264=on") !== -1) {
        videoUrl += "%2Fmp4"
        var fmtMap = "5/0/7/0/0"
        var fmtUrls = "5|http://" + location.host
                      + "/channel_fh264_getvideo?v=" + id
        videoUrl += "&fmt_map=" + encodeURIComponent(fmtMap)
        videoUrl += "&fmt_url_map=" + encodeURIComponent(fmtUrls)
    }

    var infoTitle = $("#playnav-curvideo-title")
    var infoLine = $("#playnav-curvideo-info-line")
    var videoMetadata = document.querySelector(".video-meta-" + id).innerHTML
    infoTitle.innerHTML = document.querySelector(".video-title-" + id).innerHTML
    infoLine.innerHTML = "From: " + $(".yt2009-name").innerHTML
                         + " | " + videoMetadata.replace(" - ", " | ")
    $("#playnav-curvideo-description").innerHTML = " "

    var ratingMsg = $("#defaultRatingMessage")
    var ratingCount = document.querySelector(".video-ratings-" + id).innerHTML
    ratingMsg.innerHTML = "<span class='smallText'>"
                          + ratingCount
                          + " ratings</span>"

    // flash video switch
    $(".playnav-mvlf9xls").innerHTML = '\
    <div class="for-some-reason-ie6-doesnt-work-without-this hid">h</div>\
    <object width="640" height="385">\
    <param class="fl" name="movie" value="' + videoUrl + '"></param>\
    <param name="allowFullScreen" value="true"></param>\
    <param name="allowscriptaccess" value="always"></param>\
    <embed src="'+ videoUrl + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="385" class="fl"></embed>\
    </object>'
    $("#playnav-watch-link").setAttribute("href", "/watch?v=" + id)

    if(navigator.userAgent.indexOf("MSIE") == -1) {
        video.className = "playnav-item playnav-video selected playnav-item-selected"
    }
    
}

// other playnav tabs (all/uploads/playlists etc)
var currentTab = "all"
function switchTab(tab_name, tabElement) {
    currentTab = tab_name
    var e = document.querySelectorAll(".yt2009-scrollbox")
    for(var sel in e) {
        try {
            e[sel].className += " hid"
        }
        catch(error) {console.log(error)}
    }

    var s = document.querySelectorAll(".navbar-tab")
    for(var sel in s) {
        try {
            s[sel].className = "navbar-tab inner-box-link-color"
        }
        catch(error) {}
    }

    tabElement.className = "navbar-tab inner-box-link-color navbar-tab-selected";
    $(".scrollbox-" + tab_name).className = "outer-scrollbox "
                                          + "yt2009-scrollbox "
                                          + "scrollbox-" + tab_name
}

// channel playlists
function openPlaylist(element, switchMode) {
    if(!switchMode) {
        switchMode = "playlists"
    }

    if(document.querySelector(".scrollbox-" + element.getAttribute("data-id"))) {
        // just show if we already have playlists
        switchTab(
            element.getAttribute("data-id"),
            $("#playnav-navbar-tab-" + switchMode)
        )
    } else {
        var r;
        if (window.XMLHttpRequest) {
            r = new XMLHttpRequest()
        } else {
            r = new ActiveXObject("Microsoft.XMLHTTP");
        }
        r.open("GET", "/channel_get_playlist")
        r.setRequestHeader("id", element.getAttribute("data-id"))
        r.send(null)
        r.onreadystatechange = function(e) {
            if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
                var tab = document.createElement("div")
                tab.className = "outer-scrollbox yt2009-scrollbox scrollbox-"
                                + element.getAttribute("data-id")
                                + " hid"
                tab.style.overflowX = "hidden"
                tab.innerHTML += '\
    <div id="playnav-play-all-items" class="inner-scrollbox">\
        <div class="playnav-playlist-header">\
            <a style="text-decoration:none" class="title title-text-color">\
                <span id="playnav-playlist-playlists-all-title" class="title">\
                </span>\
            </a>\
        </div>'
                tab.innerHTML += r.responseText
                tab.innerHTML += '\
        <div class=\"spacer\">&nbsp;</div>\
        <div class=\"scrollbox-separator\">\
        <div class=\"outer-box-bg-as-border\">\
        </div></div></div>\
    </div>';
                $(".scrollbox-body").appendChild(tab)
        
                switchTab(
                    element.getAttribute("data-id"),
                    $("#playnav-navbar-tab-" + switchMode)
                )
            }
        }
    }
}

// playnav: panel switching
function playnav_switchPanel(tabName) {
    var currentTab = $(".panel-tab-selected")
    currentTab.className = ""
    $("#playnav-panel-" + (currentTab.id || "").replace("playnav-panel-tab-", "")).className = "hid"

    // show the new tab
    var tabLink = $("#playnav-panel-tab-" + tabName)
    var tabContent = $("#playnav-panel-" + tabName)
    tabLink.className = "panel-tab-selected"

    tabContent.className = ""

    // other functions to display the tabs correctly
    switch(tabName) {
        case "comments": {
            get_video_comments();
            break;
        }
        case "favorite": {
            playnav_favorite_video();
            break;
        }
    }
}


// playnav: embedded comments
function get_video_comments() {
    // obecny film
    var l = '<img src="/assets/site-assets/icn_loading_animated-vfl24663.gif">'
    $("#playnav-panel-comments").innerHTML = l;
    var currentId = document.getElementsByTagName("embed")[0]
                            .getAttribute("src")
                            .split("?")[1].split("=")[1]
                            .split("&")[0]
    currentId = currentId.replace("%2Fmp4", "")
                         .replace("/mp4", "")

    // request
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("GET", "/playnav_get_comments")
    r.setRequestHeader("id", currentId)
    r.send(null)
    r.onreadystatechange = function(e) {
        if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            $("#playnav-panel-comments").innerHTML = r.responseText
        }
    }
}

// playnav: grid view
// switch the playnav view
var currentView = "play"
var ieGridCreated = false;
function playnav_view(view) {
    currentView = view;
    var viewNames = [
        document.getElementById("playnav-playview"),
        document.getElementById("playnav-gridview")
    ]
    for(var viewName in viewNames) {
        try {
            var tView = viewNames[viewName]
            tView.style.display = "none"
            $("#" + tView.id.split("-")[1] + "-icon").className = "view-button"
        }
        catch(error) {}
    }
    $("#playnav-" + view + "view").style.display = "block"
    $("#" + view + "view-icon").className = "view-button view-button-selected"

    if(view !== "play") {
        $("#playnav-player").style.display = "none"
    } else {
        $("#playnav-player").style.display = "block"
    }

    // prepare the grid view
    if(view == "grid" && !$("#playnav-grid-content").innerText) {
        // generate the grid view contents, its empty
        // 3x8 table
        var gridViewTable = document.createElement("table")
        gridViewTable.className = "yt2009-grid-tb"
        var rows = []
        while(rows.length !== 8) {
            var tr = document.createElement("tr")
            gridViewTable.appendChild(tr)
            rows.push(tr)
        }

        $("#playnav-grid-content").appendChild(gridViewTable)
    }
    grid_fillFromScrollbox();
}

// fill up the grid view
function grid_fillFromScrollbox() {
    if(currentView !== "grid"
    || ieGridCreated) return;
    var tableRowItems = {
        "0,8,16": 0,
        "1,9,17": 1,
        "2,10,18": 2,
        "3,11,19": 3,
        "4,12,20": 4,
        "5,13,21": 5,
        "6,14,22": 6,
        "7,15,23": 7
    }

    // put all grid elements to one array
    var tableRows = []
    var trs = document.getElementsByTagName("tr")
    for(var tr in trs) {
        if(trs[tr].tagName
        && trs[tr].parentNode == $(".yt2009-grid-tb")) {
            tableRows.push(trs[tr])
            try {
                trs[tr].innerHTML = ""
            }
            catch(error) {}
        }
    }
    
    // gather all items
    var tItems = []
    var pnavItems = document.getElementsByTagName("div")
    if(navigator.userAgent.indexOf("MSIE") == -1) {
        // non-ie: respects categories but DOESN'T WORK IN IE
        // FOR WHATEVER REASON. EVEN MODERN VERSIONS OF IT.
        // and no, it doesn't work any other way than this if.
        for(var item in pnavItems) {
            if(pnavItems[item].tagName
            && pnavItems[item].className.indexOf("playnav-item") !== -1
            && pnavItems[item].parentNode.parentNode.className.indexOf(
                "scrollbox-" + currentTab
            ) !== -1) {
                tItems.push(pnavItems[item])
            }
        }
    } else {
        for(var item in pnavItems) {
            if(pnavItems[item].tagName
            && pnavItems[item].className.indexOf("playnav-item") !== -1) {
                tItems.push(pnavItems[item])
            }
        }
    }

    // add items to correct rows accordingly with tableRowItems
    for(var row in tableRowItems) {
        var list = row.split(",")
        for(var n in list) {
            var rowItem = parseInt(list[n])
            if(tItems[rowItem]) {
                var e = tItems[rowItem].cloneNode(true)
                e.className += " yt2009-grid-playnav-item"
                var htmlRow = tableRows[tableRowItems[row]]
                htmlRow.appendChild(e)
            }
        }
    }

    // ie is weird and it doesn't show any videos without this
    // and it breaks on other browsers without that if!!! yay!!!
    if(navigator.userAgent.indexOf("MSIE") !== -1) {
        ieGridCreated = true;
        var grid = $("#playnav-grid-content")
        grid.innerHTML += '<div class="iefix hid">h</div>'
    }
}


// playnav: favorite videos
function playnav_favorite_video() {
    var currentId = document.getElementsByTagName("embed")[0]
                            .getAttribute("src")
                            .split("?")[1].split("=")[1]
                            .split("&")[0]
    var videoString = encodeURIComponent(
        document.querySelector(".video-title-" + currentId).innerHTML
        + "&" + document.querySelector(".video-meta-" + currentId)
                        .innerHTML.split(" views - ")[0]
        + "&" + currentId
    )
    var cookies = document.cookie.split(";")
    var favorites = ""
    for(var c in cookies) {
        if(cookies[c].indexOf("favorites=") !== -1) {
            favorites = trimLeft(cookies[c]).replace("favorites=", "")
        }
    }
    if(favorites.indexOf(currentId) == -1) {
        favorites = videoString + ":" + favorites
        document.cookie = "favorites="
                          + favorites
                          + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }
}


function subscribe() {
    // hide sub button
    var e = $(".yt2009-subscribe-button-hook")
    for(var sel in e) {
        try {e[sel].className += " hid"}
        catch(error) {}
    }
    e = $(".yt2009-unsubscribe-button-hook")
    for(var sel in e) {
        try {e[sel].className = "yt2009-unsubscribe-button-hook"}
        catch(error) {}
    }

    // write sub
    updateSublist()
    sub = encodeURIComponent(location.pathname)
          + "&" + encodeURIComponent($(".yt2009-name").innerHTML)
          + ":" + sub;
    document.cookie = "sublist=" + sub + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
}

// unsub
function unsubscribe() {
    // hide unsub button
    var e = $(".yt2009-unsubscribe-button-hook")
    for(var sel in e) {
        try {e[sel].className += " hid"}
        catch(error) {}
    }
    e = $(".yt2009-subscribe-button-hook")
    for(var sel in e) {
        try {e[sel].className = "subscribe-div yt2009-subscribe-button-hook"}
        catch(error) {}
    }
    
    // wywalanie z cookie
    updateSublist()
    sub = sub.replace(
        encodeURIComponent(location.pathname)
        + "&" + encodeURIComponent($(".yt2009-name").innerHTML)
        + ":",
        ""
    )
    document.cookie = "sublist=" + sub + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
}

// flip!!
// taken from nbedit_watch.js
// if you see this before apr 1, don't ruin the surprise to others!
if((location.href.indexOf("/watch") !== -1
&& location.href.indexOf("&flip=1") !== -1)
|| (new Date().getMonth() == 3
&& new Date().getDate() == 1
&& document.cookie.indexOf("unflip=1") == -1
&& location.href.indexOf("watch") !== -1)) {
    // css
    document.body.className += " flip"

    if(navigator.userAgent.indexOf("MSIE") !== -1) {
        document.body.className += " legacy"
    }
    
    // tips for viewing the new layout
    var tipWindowInner = "<h1 class='flip'>?</h1>\
    <h2 onclick='new_layout_alert()'>Tips for viewing the new layout</h2>\
    <a onclick='new_layout_leave()'>(I prefer the old-fashioned layout!)</a>"
    $("#watch-other-vids").innerHTML = "<div class=\"new-layout\">"
                                        + tipWindowInner + "</div>"
                                        + $("#watch-other-vids").innerHTML

    // add css and setup player
    if(navigator.userAgent.indexOf("MSIE") == -1) {
        var r = new XMLHttpRequest()
        r.open("GET", "/assets/site-assets/apr1.css")
        r.send(null)
        r.addEventListener("load", function(e) {
            var style = document.createElement("style")
            style.innerHTML = r.responseText;
            document.body.appendChild(style)
        }, false)


        var playerPath = document.getElementsByTagName("embed")[0].getAttribute("src")
        document.querySelector(".flash-video").innerHTML = '\
        <div class="aaa hid">h</div>\
        <param name="movie" value="' + playerPath + "&flip=1" + '">\
        <param name="allowFullScreen" value="true">\
        <param name="allowscriptaccess" value="always">\
        <embed src="' + playerPath + "&flip=1" + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="385" class="fl">'
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
video response
======
*/
// expander button
var responseExpander = document.querySelector(".yt2009-video-response-expander")
var videoResponsesLoaded = false;
responseExpander.onclick = function() {
    var responseParent = responseExpander.parentNode
    if(responseParent.className.indexOf("yt-uix-expander-collapsed") !== -1) {
        responseParent.className = responseParent.className.replace(
            "collapsed", "expanded"
        )
        if(!videoResponsesLoaded) {
            loadVideoResponses();
        }
    } else {
        responseParent.className = responseParent.className.replace(
            "expanded", "collapsed"
        )
    }
}

// fetch our response list
var videoResponseCount = 0;
var vrPage = 0;
function loadVideoResponses() {
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("POST", "/videoresponse_load")
    try {
        r.send(document.querySelector(".watch-vid-ab-title").innerHTML)
        r.onreadystatechange = function(e) {
            if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
                videoResponsesLoaded = true;
                document.querySelector("#watch-video-responses-children")
                        .innerHTML = r.responseText
                videoResponseCount = r.responseText.split("video-bar-item")
                                      .length - 1;
            }
        }
    }
    catch(error) {
        videoResponsesLoaded = true;
        document.querySelector("#watch-video-responses-children").innerHTML = "h?"
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

// load
function show_embed() {
    $("#watch-customize-embed-div").style.display = "block"
    if(!document.querySelector("#watch-customize-embed")) {
        // request
        var r;
        if (window.XMLHttpRequest) {
            r = new XMLHttpRequest()
        } else {
            r = new ActiveXObject("Microsoft.XMLHTTP");
        }
        r.open("GET", "/embed_generate")
        r.send(null)
        r.onreadystatechange = function(e) {
            if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
                $("#watch-customize-embed-div").innerHTML = r.responseText
            }
        }
    }
}

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
    var code = '<iframe width="' + embed_settings.width + '" height="' + embed_settings.height + '" src="' + site + '/embed/' + id + attributes + '" allowfullscreen></iframe>' // html5
    if(embed_settings.flash_player) {
        code = '<object width="' + embed_settings.width + '" height="' + embed_settings.height + '"><param name="movie" value="' + site + '/embedF/' + id + attributes + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="' + site + '/embedF/' + id + attributes + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="' + embed_settings.width + '" height="' + embed_settings.height + '"></embed></object>' // flash player
    }


    codeblock.value = code
}

// colors
function switchColorEmbed(element) {
    var colorPickers = document.getElementById(
        "watch-customize-embed-theme-swatches"
    ).getElementsByTagName("a")
    for(var c in colorPickers) {
        if(colorPickers[c].className
        && colorPickers[c].className.indexOf("embed-radio-link") !== -1) {
            colorPickers[c].className = colorPickers[c].className.replace(
                "selected", ""
            )
        }
    }
    element.className += " selected"
    embed_settings.color1 = element.getAttribute("data-color1")
    embed_settings.color2 = element.getAttribute("data-color2")

    embed_update_code();
}

// sizes
function switchSize(width, height, element) {
    embed_settings.width = width;
    embed_settings.height = height;
    
    var sizePickers = document.getElementsByTagName("div")
    for(var c in sizePickers) {
        if(sizePickers[c].className
        && sizePickers[c].className.indexOf("watch-embed-radio-box") !== -1) {
            sizePickers[c].className = sizePickers[c].className.replace(
                "selected", ""
            )
        }
    }
    element.getElementsByTagName("div")[0].className += " selected"

    embed_update_code();
}

// hide the embed creator
function close_embed() {
    $("#watch-customize-embed-div").style.display = "none"
}

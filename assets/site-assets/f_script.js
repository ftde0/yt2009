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
function expandShare() {
    $("#more-options").style.display = "none"
    $("#watch-share-services-collapsed").style.display = "none"
    $("#watch-share-services-expanded").style.display = ""
    $("#fewer-options").style.display = ""
}

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
    $("#more-options").onclick = expandShare
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
    if(document.getElementById("watch-flag-menu")
    && $("#watch-flag-menu").className.indexOf("show") !== -1) {
        $("#watch-flag-menu").className = ""
        flagMenuShown = false;
    }

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
        case "flag": {
            loadFlagMenu()
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

// share vid
function shareVideoFromFlash() {
    location.hash = "watch-main-area"
    expandShare()
}

// skipping
function skipAhead(seconds) {
    var vid = document.getElementById("movie_player")
    vid.seekTo(seconds, true, true);
    vid.playVideo()
}

// tooltips
function showSimpleTooltip(tip) {
    tip = tip.parentNode.getElementsByTagName("div")[0]
    tip.style.display = "block"
}
function hideSimpleTooltip(tip) {
    tip = tip.parentNode.getElementsByTagName("div")[0]
    tip.style.display = "none"
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

    if(!plSelectedOption
    || plSelectedOption.getAttribute("value") == "override-createnew") {
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
    var starRating = "5.0"
    var tempStars = 0
    var stars = document.getElementById("ratingStars").getElementsByTagName("a")
    for(var star in stars) {
        if(stars[star].nodeName
        && stars[star].getElementsByTagName("button")[0]
           .className.indexOf("icn_star_full") !== -1) {
            tempStars += 1
        } else if(stars[star].nodeName
        && stars[star].getElementsByTagName("button")[0]
           .className.indexOf("icn_star_half") !== -1) {
            tempStars += 0.5
        }
    }
    starRating = tempStars.toFixed(1)
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

//morefrom_load
function morefrom_load() {
    var site = location.protocol.replace(":", "") + '://' + location.host
    site = document.querySelector(".yt2009-channel-link").href.replace(site, "")
    var name = document.querySelector(".yt2009-channel-link").innerHTML
    // request
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("POST", "/morefrom_load")
    r.setRequestHeader("channel", site)
    r.setRequestHeader("source", location.href)
    r.send(name)
    r.onreadystatechange = function(e) {
        if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            $("#watch-channel-discoverbox").innerHTML += r.responseText

            // remove indicator so it doesn't load all the time
            var mark = document.querySelector(".yt2009-mark-morefrom-fetch")
            mark.parentNode.removeChild(mark)
        }
    }
}

// star ratings
var ratingText = ""
try {
    ratingText = document.getElementById("defaultRatingMessage")
                 .getElementsByTagName("span")[0]
}
catch(error) {}
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

// fastload: refetch comments
function commandComments() {
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var r = new XMLHttpRequest();
    var id = location.href.split("v=")[1].split("&")[0].split("#")[0]
    r.open("GET", "/fastload_initial_comments?id=" + id)
    r.send(null)
    r.onreadystatechange = function(e) {
        if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            $(".comments-container").innerHTML += r.responseText
        }
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

// watchpage: commenting
function updateCharacterCount() {
    var inputBox = document.getElementById("comment_textarea_main_comment")
    var charsText = document.getElementById("maxCharLabelmain_comment")
    var charsLeft = 500 - inputBox.value.length
    charsText.innerHTML = "Remaining character count: " + charsLeft
    if(charsLeft < 0) {
        charsText.innerHTML = "Number of characters over the limit: " + Math.abs(charsLeft)
    }
}


function commentSend() {
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var newUser = false
    if(document.cookie.indexOf("syncses") == -1) {
        newUser = true
    }
    r.open("POST", "/comment_post")
    r.setRequestHeader("source", location.href)
    r.send(document.getElementById("comment_textarea_main_comment").value)
    var btn = document.getElementById("comment_add_btn")
    btn.setAttribute("disabled", "")
    btn.setAttribute("value", "Adding comment...")
    r.onreadystatechange = function(e) {
        if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
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
        }
    }
}

function sendCmtRating(commentId, rating) {
    var c = document.getElementById("comment-" + commentId)
    var thumbsUp = c.getElementsByTagName("button")[1]
    var thumbsDown = c.getElementsByTagName("button")[0]
    var commentScore = c.getElementsByTagName("span")[1]
    var isLike = (rating == "like")
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("POST", "/comment_rate")
    r.setRequestHeader("rating", rating)
    r.setRequestHeader("source", location.href)
    r.setRequestHeader("comment", commentId)
    r.setRequestHeader("initial", commentScore.getAttribute("data-initial"))
    r.send(null)
    r.onreadystatechange = function(e) {
        if((r.readyState == 4 || this.readyState == 4 || e.readyState == 4)
        && (r.responseText.indexOf("rating:") !== -1)) {
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
            commentScore.innerHTML = rating

            var scoreClass = "watch-comment-score watch-comment-" + color
            commentScore.className = scoreClass

            // mark the button as hovered
            if(isLike) {
                thumbsUp.className = "master-sprite watch-comment-up-on"
                thumbsDown.className = "master-sprite watch-comment-down-hover"
            } else {
                thumbsUp.className = "master-sprite watch-comment-up-hover"
                thumbsDown.className = "master-sprite watch-comment-down-on"
            }
        }
    }
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
    var body;
    var divs = comment.getElementsByTagName("div")
    for(var i in divs) {
        if(divs[i].nodeName
        && divs[i].className.indexOf("watch-comment-body") !== -1) {
            body = divs[i].parentNode
        }
    }

    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("GET", "/reply_template")
    r.setRequestHeader("source", location.href)
    r.send(null)
    r.onreadystatechange = function(e) {
        if((r.readyState == 4 || this.readyState == 4 || e.readyState == 4)) {
            body.innerHTML += r.responseText

            var replyTo = body.parentNode.getElementsByTagName("a")[0].innerHTML
            var t = body.getElementsByTagName("textarea")[0]
            t.value = "@" + replyTo + " "
        }
    }
}

function updateCharCount(id) {
    var overLimit = "Number of characters over the limit: "
    var remain = "Remaining character count: "

    var charsLeft = 500 - document.getElementById(
        "comment_textarea_comment_form_id_" + id
    ).value.length
    document.getElementById(
        "charCountcomment_form_id_" + id
    ).value = Math.abs(charsLeft)
    if(charsLeft < 0) {
        document.getElementById(
            "maxCharLabelcomment_form_id_" + id
        ).innerHTML = overLimit
    } else {
        document.getElementById(
            "maxCharLabelcomment_form_id_" + id
        ).innerHTML = remain
    }
}

function rmReply(id) {
    var element = document.getElementById(
        "comment_formcomment_form_id_" + id
    ).parentNode
    element.parentNode.removeChild(element)
}

function submitReply(id) {
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var newUser = false
    if(document.cookie.indexOf("syncses") == -1) {
        newUser = true
    }
    r.open("POST", "/comment_post")
    r.setRequestHeader("source", location.href)
    r.send('{"comment":"' + document.getElementById(
        "comment_textarea_comment_form_id_" + id
    ).value.split('"').join('\\"') + '"}')
    var btn = document.getElementById("post-comment-" + id)
    btn.setAttribute("disabled", "")
    btn.setAttribute("value", "Adding comment...")
    r.onreadystatechange = function(e) {
        if((r.readyState == 4 || this.readyState == 4 || e.readyState == 4)) {
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
        }
    }
}

/*
======
simulated mark as spam
======
*/
function showComment(comment) {
    var body;
    var voting;
    var showBtn;
    var hideBtn;
    var els = comment.getElementsByTagName("*")
    for(var i in els) {
        switch(els[i].className || "") {
            case "watch-comment-body hid": {
                body = els[i]
                break;
            }
            case "watch-comment-voting-off": {
                voting = els[i]
                break;
            }
            case "watch-comment-head-link show-btn": {
                showBtn = els[i]
                break;
            }
            case "watch-comment-head-link hide-btn hid": {
                hideBtn = els[i]
                break;
            }
        }
    }
    body.className = body.className.replace(" hid", "")
    voting.className = "watch-comment-voting"
    showBtn.className = "watch-comment-head-link show-btn hid"
    showBtn.style.visibility = "hidden"
    hideBtn.className = "watch-comment-head-link hide-btn"
    hideBtn.style.visibility = "visible"
}

function hideComment(comment) {
    var body;
    var voting;
    var showBtn;
    var hideBtn;
    var els = comment.getElementsByTagName("*")
    for(var i in els) {
        switch(els[i].className || "") {
            case "watch-comment-body": {
                body = els[i]
                break;
            }
            case "watch-comment-voting": {
                voting = els[i]
                break;
            }
            case "watch-comment-head-link show-btn hid": {
                showBtn = els[i]
                break;
            }
            case "watch-comment-head-link hide-btn": {
                hideBtn = els[i]
                break;
            }
        }
    }
    body.className += " hid"
    voting.className = "watch-comment-voting-off"
    try {
        showBtn.className = "watch-comment-head-link show-btn"
        showBtn.style.visibility = "visible"
        hideBtn.className = "watch-comment-head-link hide-btn hid"
        hideBtn.style.visibility = "hidden"
    }
    catch(error) {}
}

function mSpam(comment) {
    comment = comment.parentNode.parentNode.parentNode
    var action;
    var body;
    var headLink;
    var commentInfo;
    var els = comment.getElementsByTagName("*")
    for(var i in els) {
        switch(els[i].className || "") {
            case "watch-comment-action": {
                action = els[i]
                break;
            }
            case "watch-comment-body": {
                body = els[i]
                break;
            }
            case "watch-comment-head-link": {
                headLink = els[i]
                break;
            }
            case "watch-comment-info": {
                commentInfo = els[i]
                break;
            }
        }
    }
    action.className = "watch-comment-action hid"
    if(body.className.indexOf("hid") == -1) {
        if(!headLink) {
            // create elements
            var showBtn = document.createElement("a")
            showBtn.className = "watch-comment-head-link show-btn"
            showBtn.onclick = function() {
                showComment(comment)
            }
            showBtn.style.visibility = "visible"
            showBtn.innerHTML = "Show"
            commentInfo.appendChild(showBtn)

            var hideBtn = document.createElement("a")
            hideBtn.className = "watch-comment-head-link hide-btn hid"
            hideBtn.onclick = function() {
                hideComment(comment)
            }
            hideBtn.style.visibility = "hidden"
            hideBtn.innerHTML = "Hide"
            commentInfo.appendChild(hideBtn)
        }
        hideComment(comment)
    }
}

/*
======
simulated flagging
======
*/
var videoFlagSource = "video"
function loadFlagMenu(channel) {
    if(!document.getElementById("watch-flag-menu")) {
        var r;
        if (window.XMLHttpRequest) {
            r = new XMLHttpRequest()
        } else {
            r = new ActiveXObject("Microsoft.XMLHTTP");
        }
        r.open("GET", "/flag_menu_template")
        if(channel) {
            videoFlagSource = "channel"
            r.setRequestHeader("source", "channel")
        }
        r.send(null)
        r.onreadystatechange = function(e) {
            if((r.readyState == 4 || this.readyState == 4 || e.readyState == 4)) {
                $("#inappropriateVidDiv").innerHTML = r.responseText
            }
        }
    }
    if(channel) {
        $("#inappropriateMsgsDiv").className = "hid"
        $("#inappropriateVidDiv").className = ""
    }
}

var flagMenuShown = false;
function toggleFlagReason() {
    flagMenuShown = !flagMenuShown
    if(flagMenuShown) {
        $("#watch-flag-menu").className = "show y-in"
        if(videoFlagSource == "channel") {
            $("#playnav-body").className = "flag-opened"
        }
    } else {
        $("#watch-flag-menu").className = "y-in"
        if(videoFlagSource == "channel") {
            $("#playnav-body").className = ""
        }
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
    var ul = document.getElementById("watch-flag-menu").getElementsByTagName("ul")
    for(var i in ul) {
        if(ul[i].nodeName && ul[i].className.indexOf("show") !== -1) {
            ul[i].className = ""
        }
    }

    var reasonName = element.getElementsByTagName("a")[0].innerHTML
    $("#watch-flag-menu .parent").innerHTML = reasonName
    if(videoFlagSource == "channel") return;
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
    currentVideo = id;

    var videoUrl = customPlayerUrl + '?' + customPlayerArg + '=' + id
    if(document.cookie.indexOf("f_h264=on") !== -1) {
        videoUrl += "%2Fmp4"
        var fmtMap = "5/0/7/0/0"
        var fmtUrls = "5|http://" + location.host
                      + "/channel_fh264_getvideo?v=" + id
        videoUrl += "&fmt_map=" + encodeURIComponent(fmtMap)
        videoUrl += "&fmt_url_map=" + encodeURIComponent(fmtUrls)
    }
    if(customPlayerUrl.indexOf("2012.swf") !== -1
    || customPlayerUrl.indexOf("cps2.swf") !== -1) {
        videoUrl += "&BASE_YT_URL=" + baseUrlSetting
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
        catch(error) {}
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
        r.open("GET", "/channel_get_playlist?r=" + Math.random().toString())
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
        case "flag": {
            loadFlagMenu(true)
            break;
        }
    }
}


// playnav: embedded comments
function get_video_comments() {
    // obecny film
    var l = '<img src="/assets/site-assets/icn_loading_animated-vfl24663.gif">'
    $("#playnav-panel-comments").innerHTML = l;
    // request
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("GET", "/playnav_get_comments")
    r.setRequestHeader("id", currentVideo)
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
    var currentId = currentVideo;
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

// playnav search/sort
function playnav_searchChannel() {
    if($("#upload_search_query-play").value == "") {
        $(".uploads-filtered").className = "uploads-filtered hid"
        $(".uploads").className = "uploads"
        return;
    }
    $("#playnav-play-loading").style.display = "block"
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("GET", "/search_channel?r=" + Math.random().toString())
    r.setRequestHeader("source", location.pathname)
    r.setRequestHeader("query", $("#upload_search_query-play").value)
    r.send(null)
    r.onreadystatechange = function(e) {
        if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            $("#playnav-play-loading").style.display = "none"
            $(".uploads").className = "uploads hid"
            $(".uploads-filtered").className = "uploads-filtered"
            $(".uploads-filtered").innerHTML = r.responseText
        }
    }
}

function playnav_sort(sortMode) {
    if(sortMode == "popularity") {
        $(".uploads-filtered").className = "uploads-filtered hid"
        $(".uploads").className = "uploads"
        return;
    }
    $("#playnav-play-loading").style.display = "block"
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("GET", "/channel_sort?r=" + Math.random().toString())
    r.setRequestHeader("source", location.pathname)
    r.setRequestHeader("sort", sortMode)
    r.send(null)
    r.onreadystatechange = function(e) {
        if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            $("#playnav-play-loading").style.display = "none"
            $(".uploads").className = "uploads hid"
            $(".uploads-filtered").className = "uploads-filtered"
            $(".uploads-filtered").innerHTML = r.responseText
        }
    }
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
stats & data
======
*/
// expander button
var statsExpander = $(".yt2009-stats-data-expander")
var statsLoaded = false;
statsExpander.onclick = function() {
    var statsParent = statsExpander.parentNode
    if(statsParent.className.indexOf("yt-uix-expander-collapsed") !== -1) {
        statsParent.className = statsParent.className.replace(
            "collapsed", "expanded"
        )
        if(!statsLoaded) {
            loadStats();
        }
    } else {
        statsParent.className = statsParent.className.replace(
            "expanded", "collapsed"
        )
    }
}

// fetch stats
function loadStats() {
    var id = window.location.href.split("v=")[1].split("&")[0]
    var v = document.getElementById("watch-view-count").innerHTML
    var s = document.getElementById("ratingStars")
            .getElementsByTagName("button")[0]
            .getAttribute("title")
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("GET", "/insight_ajax?action_get_statistics_and_data=1&v=" + id)
    r.setRequestHeader("displayed_views", v)
    r.setRequestHeader("displayed_rating", s)
    r.send(null)
    try {
        r.onreadystatechange = function(e) {
            if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
                statsLoaded = true;
                $("#watch-tab-stats-body").innerHTML = r.responseText
            }
        }
    }
    catch(error) {}
    
}


/*
======
video response
======
*/
// expander button
var responseExpander = document.querySelector(".yt2009-video-response-expander")
if(!responseExpander) {
    responseExpander = {"onlick": false}
}
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

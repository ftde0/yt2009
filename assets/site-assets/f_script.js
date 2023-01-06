/*
=======
f_script
skrypt ładowany dodając parametr f=1 obsługujący jeszcze starsze przeglądarki niż natywnie wspierane (2009>)
a script that's loaded by adding the f=1 parameter, supporting even older browsers than natively (2009>)

yt2009, 2022.
=======
*/

// polyfille
if(!document.querySelector) {
    document.querySelector = function(name) {
        return polyfillSelectorAll(name, true)
    }
    document.querySelectorAll = function(name) {
        return polyfillSelectorAll(name, false)
    }
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
            if(s[sel][type].indexOf(name + " ") !== -1 ||
            s[sel][type].indexOf(" " + name) !== -1 || 
            s[sel][type] == name) {
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
            if(s[sel].className.indexOf(className + " ") !== -1 ||
            s[sel].className.indexOf(" " + className) !== -1 || 
            s[sel].className == className) {
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

// elementy ui z &f=1

/*
=======
watchpage
=======
*/
if(location.href.indexOf("watch") !== -1) {
    // opisy
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

    // udostępnianie
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
}

// zmiana kart
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

// ulubione
function favorite_video() {
    var currentId = $(".email-video-url").value.split("?v=")[1]
    var favorites = ""
    var videoString = encodeURIComponent($(".watch-vid-ab-title").innerHTML + "&" + $("#watch-view-count").innerHTML + "&" + currentId)
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
        document.cookie = "favorites=" + favorites + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }
    $("#watch-add-faves").className += " hid"
    $("#watch-remove-faves").className = "watch-action-result"
}

// usuwanie
function favorite_undo() {
    var currentId = $(".email-video-url").value.split("?v=")[1]
    var favorites = ""
    var videoString = encodeURIComponent($(".watch-vid-ab-title").innerHTML + "&" + $("#watch-view-count").innerHTML + "&" + currentId) + ":"
    var c = 0;
    var cookie = document.cookie.split(";")
    while(c !== cookie.length) {
        if(cookie[c].indexOf("favorites=") !== -1) {
            favorites = cookie[c].replace(" ", "").replace("favorites=", "")
        }
        c += 1
    }
    favorites = favorites.replace(videoString, "")
    document.cookie = "favorites=" + favorites + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    $("#watch-remove-faves").className += " hid"
    $("#watch-add-faves").className = "watch-action-result"
}
/*
=======
kanały
=======
*/

function switchVideo(video) {
    var e = document.querySelectorAll(".playnav-video")
    for(var sel in e) {
        try {
            if(e[sel].className.indexOf("sel") !== -1) {
                e[sel].className = e[sel].className.replace(" selected", "")
            }
        }
        catch(error) {}
    }
    
    var id = video.id.split("-").splice(2, video.id.split("-").length).join("-")

    $("#playnav-curvideo-title").innerHTML = document.querySelector(".video-title-" + id).innerHTML
    $("#playnav-curvideo-info-line").innerHTML = "From: " + $(".yt2009-name").innerHTML + " | " + document.querySelector(".video-meta-" + id).innerHTML.replace(" - ", " | ")
    $("#playnav-curvideo-description").innerHTML = " "
    $("#defaultRatingMessage").innerHTML = "<span class='smallText'>" + document.querySelector(".video-ratings-" + id).innerHTML + " ratings</span>"
    // zmiana filmu z &f=1 (flash)
    $(".playnav-mvlf9xls").innerHTML = '\
    <div class="for-some-reason-ie6-doesnt-work-without-this hid">h</div>\
    <object width="640" height="385">\
    <param class="fl" name="movie" value="' + customPlayerUrl + '?' + customPlayerArg + '=' + id + '"></param>\
    <param name="allowFullScreen" value="true"></param>\
    <param name="allowscriptaccess" value="always"></param>\
    <embed src="' + customPlayerUrl + '?' + customPlayerArg + '=' + id + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="385" class="fl"></embed>\
    </object>'
    $("#playnav-watch-link").setAttribute("href", "/watch?v=" + id)

    if(navigator.userAgent.indexOf("MSIE") == -1) {
        video.className = "playnav-item playnav-video selected"
    }
    
}

// inna karta (all/uploads itp)

function switchTab(tab_name, tabElement) {
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

    tabElement.className = "navbar-tab inner-box-link-color navbar-tab-selected"
    $(".scrollbox-" + tab_name).className = "outer-scrollbox yt2009-scrollbox scrollbox-" + tab_name
}

// playlisty w kanałach

function openPlaylist(element, switchMode) {
    if(!switchMode) {
        switchMode = "playlists"
    }

    if(document.querySelector(".scrollbox-" + element.getAttribute("data-id"))) {
        // pokaż jak już mamy
        switchTab(element.getAttribute("data-id"), $("#playnav-navbar-tab-" + switchMode))
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
                tab.className = "outer-scrollbox yt2009-scrollbox scrollbox-" + element.getAttribute("data-id") + " hid"
                tab.style.overflowX = "hidden"
                tab.innerHTML += "<div id=\"playnav-play-all-items\" class=\"inner-scrollbox\"><div class=\"playnav-playlist-header\"><a style=\"text-decoration:none\" class=\"title title-text-color\"><span id=\"playnav-playlist-playlists-all-title\" class=\"title\"> </span></a></div>"
                tab.innerHTML += r.responseText
                tab.innerHTML += "<div class=\"spacer\">&nbsp;</div><div class=\"scrollbox-separator\"><div class=\"outer-box-bg-as-border\"></div></div></div></div>";
                $(".scrollbox-body").appendChild(tab)
        
                switchTab(element.getAttribute("data-id"), $("#playnav-navbar-tab-" + switchMode))
            }
        }
    }
}

function trimLeft(input) {
    var temp = input;
    while(temp.indexOf(" ") == 0) {
        temp = temp.replace(" ", "")
    }

    return temp;
}


// video page-specific things
if(location.href.indexOf("watch") !== -1) {
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
        document.cookie = "watch_history_backup_" + Date.now() + "=" + watchHistory + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
        document.cookie = "watch_history= ; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
        watchHistory = ""
    }
    if(watchHistory.indexOf($(".email-video-url").value.split("?v=")[1]) == -1) {
        watchHistory = encodeURIComponent($(".watch-vid-ab-title").innerHTML) + "&" + $("#watch-view-count").innerHTML + "&" + $(".email-video-url").value.split("?v=")[1] + ":" + watchHistory;
        document.cookie = "watch_history=" + watchHistory + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }

    // widescreen and embed buttons
    var playerWidescreen = false;
    $("#watch-longform-player").onclick = function() {
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
            $("#watch-this-vid").style.width = "960px"
            $("#watch-this-vid").style.height = "565px"
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
            $("#watch-this-vid").style.width = ""
            $("#watch-this-vid").style.height = ""
        }
    }


    $("#watch-longform-popup").onclick = function() {
        var videoId = $(".email-video-url").value.split("?v=")[1];
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
            favorite_video();
            break;
        }
    }
}


// playnav: embedded comments
function get_video_comments() {
    // obecny film
    $("#playnav-panel-comments").innerHTML = '<img src="/assets/site-assets/icn_loading_animated-vfl24663.gif">'
    var currentId = document.querySelector(".fl").getAttribute("src").split("?video_id=")[1]

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


// playnav: favorite videos
function favorite_video() {
    var currentId = document.querySelector(".fl").getAttribute("src").split("?video_id=")[1]
    var videoString = encodeURIComponent(document.querySelector(".video-title-" + currentId).innerHTML + "&" + document.querySelector(".video-meta-" + currentId).innerHTML.split(" views - ")[0] + "&" + currentId)
    var cookies = document.cookie.split(";")
    var favorites = ""
    for(var c in cookies) {
        if(cookies[c].indexOf("favorites=") !== -1) {
            favorites = trimLeft(cookies[c]).replace("favorites=", "")
        }
    }
    if(favorites.indexOf(currentId) == -1) {
        favorites = videoString + ":" + favorites
        document.cookie = "favorites=" + favorites + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
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
    document.cookie = "playlist_index=" + cookieIndex + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"

    return id;
}


// watchpage: add current video to playlist
function playlistAdd(id) {
    var currentId = $(".email-video-url").value.split("?v=")[1]
    var videoName = $(".watch-vid-ab-title").innerHTML
    var viewCount = $("#watch-view-count").innerHTML
    var starRating = $(".ratingL").className.split(" ")[2].split("-")[1]
    var currentDate = new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var day = currentDate.getDate();
    if(day < 10) {
        day = "0" + day.toString();
    }
    var addDate = months[currentDate.getMonth()] + " " + day + ", " + currentDate.getFullYear();

    var playlistData = ""
    var cookies = document.cookie.split(";")
    for(var c in cookies) {
        if(cookies[c].indexOf(id + "=") !== -1) {
            playlistData = trimLeft(cookies[c]).replace(id + "=", "")
        }
    }

    if(playlistData.indexOf(currentId) == -1) {
        playlistData = encodeURIComponent(encodeURIComponent(videoName) + ";" + currentId + ";" + viewCount + ";" + starRating + ";" + addDate) + ":" + playlistData
        document.cookie = id + "=" + playlistData + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
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

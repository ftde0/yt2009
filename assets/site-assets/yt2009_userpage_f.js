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

function $(element) {
    if(document.querySelectorAll(element).length !== 1) {
        return document.querySelectorAll(element);
    } else {
        return document.querySelector(element)
    }
}




function show_playlist(element) {
    // mark as selected
    var subfolders = document.querySelectorAll(".subfolder")
    for(var subfolder in subfolders) {
        subfolder = subfolders[subfolder]
        subfolder.className = "subfolder"
    }
    element.className = "subfolder selected"

    var id = element.getAttribute("data-id").replace('"', "")
    var rawVideos = document.cookie.split(id + "=")[1].split(";")[0]
    rawVideos = rawVideos.split(":")
    var videoIndex = 0;
    for(var video in rawVideos) {
        video = decodeURIComponent(rawVideos[video]).split(";");
        var title = decodeURIComponent(video[0])
        var id = video[1]
        if(!id) return;
        var viewCount = video[2]
        var rating = video[3]
        var addDate = video[4]

        var videoElement = document.createElement("tr")
        videoElement.setAttribute("data-videoid", id)
        videoElement.className = "video " + (videoIndex % 2 == 0 ? "even" : "odd")
        $(".yt2009-videos-insert").appendChild(videoElement)

        // create each element because putting them in innerhtml doesn't want to parse properly for whatever reason
        var heading_check = document.createElement("td")
        heading_check.id = "heading-check"
        heading_check.innerHTML = '<div><input id="all-items-checkbox" type="checkbox" onclick="" data-videoid="' + id + '"/></div>'
        videoElement.appendChild(heading_check)

        var heading_position = document.createElement("td")
        heading_position.id = "heading-position"
        heading_position.innerHTML = '<div style="text-align: center;"><a href="#" style="text-align: center;font-size: 14px;"><b>' +(videoIndex + 1) + '</b></a></div>'
        videoElement.appendChild(heading_position)

        var heading_title = document.createElement("td")
        heading_title.id = "heading-title"
        heading_title.innerHTML = '<button title="" class="master-sprite"></button><a href="#" style="height: 40px;overflow: hidden;"rel="nofollow"><img src="//i.ytimg.com/vi/' + id + '/hqdefault.jpg"></a><a href="#" class="video-title">' + title + '</a>'
        videoElement.appendChild(heading_title)
        
        var heading_time = document.createElement("td")
        heading_time.id = "heading-time"
        videoElement.appendChild(heading_time)
        
        var heading_date = document.createElement("td")
        heading_date.id = "heading-date"
        heading_date.innerHTML = "<div>" + addDate + "</div>"
        videoElement.appendChild(heading_date)

        var heading_views = document.createElement("td")
        heading_views.id = "heading-views"
        heading_views.innerHTML = "<div>" + viewCount + "</div>"
        videoElement.appendChild(heading_views)
        
        var heading_rating = document.createElement("td")
        heading_rating.id = "heading-rating"
        heading_rating.innerHTML = '<div><div class="video-stat"><span class="stat-rating"><img class="yt-rating-' + rating + '" src="assets/site-assets/pixel-vfl73.gif" alt="' + rating + '"></span></div>'
        videoElement.appendChild(heading_rating)
        
        videoIndex++;
    }
}


function switchChannel(element) {
    var url = element.getAttribute("data-url")
    var username = element.getElementsByTagName("a")[0].innerHTML

    var videos_element = document.getElementById("videos")
                                 .getElementsByTagName("td")[0]

    // classname .selected, remove from others, add to needed ones
    var s = document.getElementsByTagName("*")
    for(var e in s) {
        if(s[e].className
        && s[e].className.indexOf("channel-subfolder") !== -1
        && s[e].className.indexOf("selected") !== -1) {
            s[e].className = "subfolder channel-subfolder"
        }
    }
    
    element.className += " selected"

    // loading anim
    videos_element.innerHTML = "<img src=\"/assets/site-assets/icn_loading_animated-vfl24663.gif\" style=\"text-align: center;padding: 50px 50px;position: relative;left: 300px;\">"

    // fetch new videos
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("GET", "/subscriptions_new_videos?r=" + Math.random().toString())
    r.setRequestHeader("url", url)
    r.send(null)
    r.onreadystatechange = function(e) {
        if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            // html sent from server
            videos_element.innerHTML = r.responseText
            document.getElementById("view-pane")
                    .getElementsByTagName("h2")[0].innerHTML = username
        }
    }
}
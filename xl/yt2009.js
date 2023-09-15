// html5 support
var use_html5 = false;
var current_video = "";
if(location.href.indexOf("html5=1") !== -1) {
    use_html5 = true;
}

var video_change_event;
// patch in the html5 iframe
var old_id = "";
video_change_event = setInterval(function() {
    if(current_video !== old_id
    && use_html5) {
        setTimeout(function() {
            var html5_video = document.createElement("iframe")
            html5_video.src = "/xl/embed?video_id=" + current_video;
            html5_video.allowFullscreen = true;
            html5_video.className = "yt2009-full"
            document.querySelector(".xl-view-player-video").innerHTML = ""
            document.querySelector(".xl-view-player-video").appendChild(html5_video)
        }, 250)
    }
    old_id = current_video;
    
    // write to last 3 vids
    var history = ""
    if(document.cookie
    && document.cookie.indexOf("xl_history=") !== -1) {
        history = document.cookie.split("xl_history=")[1].split(";")[0]
        history = history.split(":").slice(0, 2).join(":")
    }
    if(current_video == "") return;
    if(history.indexOf(current_video) !== -1) return;
    history = current_video + ":" + history
    document.cookie = "xl_history=" + history + "; Path=/xl; expires=Fri, 31 Dec 2066 23:59:59 GMT";
}, 500)

// check if flash loaded, throw a message otherwise
function checkFlash() {
    if(document.getElementsByTagName("object").length <= 0
    && document.getElementsByTagName("embed").length <= 0
    && !use_html5) {
        document.getElementById("main.player.video").innerHTML += "\
        <h1 style=\"font-size: 16px;\">your browser may not support flash. <button>load html5</button></h1>"

        setTimeout(function() {
            document.getElementById("main.player.video")
                    .getElementsByTagName("button")[0]
                    .onclick = function() {
                location.href += "?html5=1"
            }
        }, 150)
    }
}

// wayback_features warning
if(document.cookie
&& document.cookie.indexOf("watch_flags=") !== -1
&& document.cookie.indexOf("xl_wayback_warning") == -1) {
    var watchFlags = document.cookie
                     .split("watch_flags=")[1]
                     .split(";")[0];
    if(watchFlags.indexOf("wayback_features") !== -1) {
        alert("\
        you seem to have the wayback_features watchpage flag enabled.\
        while xl will work, related videos will be retrieved from that source instead, which will be slow.")
        document.cookie = "xl_wayback_warning=1; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT";
    }
}
function placeChannelBanner(channelId) {
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("GET", "/minibanner?channel=" + channelId)
    r.send(null)
    r.onreadystatechange = function(e) {
        if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            document.getElementById(
                "yt2009-bannercard-container"
            ).innerHTML = r.responseText;
        }
    }
}
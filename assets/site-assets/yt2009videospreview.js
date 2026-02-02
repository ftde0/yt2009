var previewInterval;
var previewImg = 1;
var e;
var videoId;

function videosPreview(element, id) {
    var useProxy = (document.cookie
                 && document.cookie.indexOf("thumbnail_proxy") !== -1)
    e = element;
    videoId = id;
    previewInterval = setInterval(function() {
        var thumbFull = "//i.ytimg.com/vi/" + id + "/" + previewImg + ".jpg"
        if(useProxy) {
            thumbFull = "/thumb_proxy?v=" + videoId + "&alt=" + previewImg
        }
        e.setAttribute("src", thumbFull)
        previewImg++
        if(previewImg > 3) {
            previewImg = 1
        }
    }, 1000)
}

function removeVideoPreview() {
    var useAutogen = (document.cookie
                   && document.cookie.indexOf("autogen_thumbnails") !== -1)
    var useProxy = (document.cookie
                 && document.cookie.indexOf("thumbnail_proxy") !== -1)
    clearInterval(previewInterval)
    previewImg = 1;
    var thumbUrlS = useAutogen ? "1" : "default"
    var thumbFull = "//i.ytimg.com/vi/" + videoId + "/" + thumbUrlS + ".jpg"
    if(useProxy) {
        thumbFull = "/thumb_proxy?v=" + videoId
    }
    e.setAttribute("src", thumbFull)
    videoId = ""
}
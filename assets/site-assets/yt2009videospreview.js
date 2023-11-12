var previewInterval;
var previewImg = 1;
var e;
var videoId;

function videosPreview(element, id) {
    e = element;
    videoId = id;
    previewInterval = setInterval(function() {
        e.setAttribute(
            "src",
            "//i.ytimg.com/vi/" + id + "/" + previewImg + ".jpg"
        )
        previewImg++
        if(previewImg > 3) {
            previewImg = 1
        }
    }, 1000)
}

function removeVideoPreview() {
    clearInterval(previewInterval)
    previewImg = 1;
    e.setAttribute(
        "src",
        "//i.ytimg.com/vi/" + videoId + "/default.jpg"
    )
    videoId = ""
}
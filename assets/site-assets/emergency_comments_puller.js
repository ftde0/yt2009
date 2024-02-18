var fE = document.getElementById("profile_comments_table").getElementsByTagName("tbody")[0]

var emr;
if (window.XMLHttpRequest) {
    emr = new XMLHttpRequest()
} else {
    emr = new ActiveXObject("Microsoft.XMLHTTP");
}
var emr = new XMLHttpRequest();
emr.open("GET", "/em_channel_comments?id=" + TARGET_VIDEO_CMTS)
emr.send(null)
emr.onreadystatechange = function(e) {
    if(emr.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
        fE.innerHTML += emr.responseText.split(";comment_count=")[0]
        var count = emr.responseText.split(";comment_count=")[1]
    }
}
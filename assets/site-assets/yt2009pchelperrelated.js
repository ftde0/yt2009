var currentVideo = location.href.split("v=")[1]
                   .split("&")[0].split("#")[0]
                   .substring(0,11);
function pchelperRelated() {
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("GET", "/pchelper_related?id=" + currentVideo)
    r.send(null)
    r.onreadystatechange = function(e) {
        if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            pchelperRelatedEl.removeChild(pchelperWaiter)
            pchelperRelatedEl.innerHTML = r.responseText;

            if(window.video && window.endscreenCurrentVideoCount) {
                // in html5 player
                window.handleWatchpagePchelperRelated(pchelperRelatedEl)
            }
        }
    }
}
var pchelperRelatedEl = document.createElement("div")
pchelperRelatedEl.id = "yt2009-pchepler-related"
var pchelperWaiter = document.createElement("div")
pchelperWaiter.style.width = "272px"
pchelperWaiter.style.height = "435px"
var pchelperAnim = document.createElement("img")
pchelperAnim.setAttribute(
    "src",
    "/assets/site-assets/icn_loading_animated-vfl24663.gif"
)
pchelperAnim.style.marginLeft = "120px"
pchelperAnim.style.marignTop = "15px"
pchelperWaiter.appendChild(pchelperAnim)
pchelperRelatedEl.appendChild(pchelperWaiter)
var firstRelChild = document.getElementById("watch-related-discoverbox")
                            .getElementsByTagName("div")[0];
document.getElementById("watch-related-discoverbox").insertBefore(
    pchelperRelatedEl, firstRelChild
)

pchelperRelated()
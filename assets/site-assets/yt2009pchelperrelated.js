var currentVideo = location.href.split("v=")[1]
                   .split("&")[0].split("#")[0]
                   .substring(0,11);
/*function countBreakup(count) {
    count = count.split("")
            .reverse()
            .join("")
            .match(/.{1,3}/g)
            .reverse()
    
    let i = 0;
    count.forEach(c => {
        count[i] = c.split("").reverse().join("")
        i++;
    })

    count = count.join(",")

    return count;
}
var pchelperRelatedVideos = []*/
function pchelperRelated() {
    /*var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("GET", "/feeds/api/videos/" + currentVideo + "/related")
    r.send(null)
    r.onreadystatechange = function(e) {
        if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            var entries = r.responseText.split("<entry>")
            entries.shift()
            for(var entry in entries) {
                entry = entries[entry];
                if(typeof(entry) == "string") {
                    var id = entry.split("/api/videos/")[1].split("</id>")[0]
                    var title = entry.split("<title type='text'>")[1]
                                     .split("</title>")[0];
                    var author = entry.split("<name>")[1].split("</name>")[0]
                    var authorUrl = "/@" + author;
                    if(author.indexOf("UC") == 0) {
                        authorUrl = "/channel/" + author
                    }
                    var views = countBreakup(
                        entry.split("viewCount=\"")[1].split("\"")[0]
                    ) + " views"
                    var abViews = entry.split("viewCount=\"")[1].split("\"")[0]
                    pchelperRelatedVideos.push([
                        id, title, author, authorUrl, views, abViews
                    ])
                }
            }
            pchelperBuildHTML()
        }
    }*/
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
        }
    }
}
/*function pchelperBuildHTML() {
    pchelperWaiter.parentNode.removeChild(pchelperWaiter)
    var thumbUrl = "hqdefault.jpg"
    if(document.cookie && document.cookie.indexOf("autogen_thumbnails")) {
        thumbUrl = "1.jpg"
    }
    var addedVideos = 0;
    for(var v in pchelperRelatedVideos) {
        v = pchelperRelatedVideos[v]
        try {
            var e = document.createElement("div")
            e.className = "video-entry"
            e.setAttribute("data-id", v[0])
            // thumbnail
            var tUrl = "//i.ytimg.com/vi/"+v[0]+"/"+thumbUrl
            var t = document.createElement("div")
            t.className = "v90WideEntry"
            var to = document.createElement("div")
            to.className = "v90WrapperOuter"
            var ti = document.createElement("div")
            ti.className = "v90WrapperInner"
            
            var thumbA = document.createElement("a")
            thumbA.className = "video-thumb-link"
            thumbA.setAttribute("href", "/watch?v=" + v[0])
            thumbA.setAttribute("rel", "nofollow")
            var thumbImg = document.createElement("img")
            thumbImg.className = "vimg90"
            thumbImg.setAttribute("title", v[1].split("\"").join("&quot;"))
            thumbImg.setAttribute("alt", v[1].split("\"").join("&quot;"))
            thumbImg.setAttribute("thumb", tUrl)
            thumbImg.setAttribute("src", tUrl)
            thumbImg.setAttribute("qlicon", v[0])
            thumbA.appendChild(thumbImg)
            ti.appendChild(thumbA)

            var qlAdd = document.createElement("div")
            qlAdd.className = "addtoQL90"
            var qlA = document.createElement("a")
            qlA.setAttribute("href", "#")
            qlA.setAttribute("ql", v[0])
            
            to.appendChild(ti)
            t.appendChild(to)
            e.appendChild(t)
            pchelperRelatedEl.appendChild(e)
            addedVideos++
        }
        catch(error) {
            console.log(error)
        }
    }
}*/
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
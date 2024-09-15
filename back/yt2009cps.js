const utils = require("./yt2009utils")
const templates = require("./yt2009templates")
const search = require("./yt2009search")
const html = require("./yt2009html")
const channels = require("./yt2009channels")
const mobileauths = require("./yt2009mobileauths")
const yt2009jsongdata = require("./yt2009jsongdata")

module.exports = {
    "get_search": function(req, res) {
        req = utils.addFakeCookie(req)
        
        let compatAuth = false;
        if((req.headers.referer && req.headers.referer.includes(".swf"))
        || (req.headers["user-agent"]
        && req.headers["user-agent"].includes("Shockwave Flash"))) {
            compatAuth = true;
        }
        if(!compatAuth && !mobileauths.isAuthorized(req, res, "feed")) return;

        if(!req.query.q && req.query.vq) {
            req.query.q = req.query.vq;
        }

        let flags = ""
        if(req.headers.cookie.includes("search_flags")) {
            flags = req.headers.cookie.split("search_flags=")[1].split(";")[0]
        }
        if(req.headers["x-gdata-device"]) {
            // flags for mobile
            let mobileFlags = require("./yt2009mobileflags")
                              .get_flags(req)
                              .search;
            if(mobileFlags.includes("only-old")) {
                req.query.q += " +only_old"
            }
        }
        
        if(req.query.q.includes("+only_old")) {
            req.query.q = req.query.q.replace("+only_old", "")
            flags += "only_old"
        }

        let page = ((req.query["start-index"] || 0) / 20)

        // jsongdata
        if(req.query.alt == "json") {
            yt2009jsongdata.search(req, res)
            return;
        }

        /*
        =======
        create the search XML
        =======
        */

        let response = ``
        
        search.get_search(
            encodeURIComponent(req.query.q) || "",
            flags,
            {"page": page},
            (data => {
                let first3Videos = []
                data.forEach(video => {
                    if(video.type !== "video") return;
                    if(first3Videos.length < 3) {
                        first3Videos.push(video.id)
                    }
                })

                // add videos when preloading done
                html.bulk_get_videos(first3Videos, () => {
                    addVideosToResponse(data)
                })    
            }),
            utils.get_used_token(req) + "-cps",
            false
        )

        function addVideosToResponse(data) {
            let videos = ``
            let videosCount = 0;
            let resultCount = 0;
            data.forEach(video => {
                if(video.type == "metadata") {
                    resultCount = video.resultCount
                }
                if(video.type !== "video") return;
                videosCount++;
                let author_name = video.author_name;
                if(flags.includes("username_aciify")) {
                    author_name = utils.asciify(author_name)
                }
                if(flags.includes("author_old_names")
                && video.author_url.includes("/user/")) {
                    author_name = video.author_url.split("/user/")[1]
                }
                let videoTime = "0:00"
                if(video.time) {
                    videoTime = utils.time_to_seconds(video.time)
                }

                let videoDescription = html.get_video_description(video.id)
                if(videoDescription.length == 0 && video.description) {
                    videoDescription = video.description;
                }

                let cacheData = html.get_cache_video(video.id)

                videos += templates.gdata_feedVideo(
                    video.id,
                    video.title,
                    video.author_handle || utils.asciify(author_name || ""),
                    utils.bareCount(video.views),
                    videoTime,
                    videoDescription,
                    cacheData.upload
                    || utils.relativeToAbsoluteApprox(video.upload),
                    (cacheData.tags || []).join() || "-",
                    cacheData.category || "-",
                    cacheData.qualities || []
                )
            })

            response =
            templates.cpsSearchBegin(resultCount)
            .replace(`x>1<`, `x>${page * 20 + 1}<`)
            + "\n" + videos
            + templates.cpsSearchEnd;

            res.set("content-type", "application/atom+xml")
            res.send(response)
        }
    }
}
const utils = require("./yt2009utils")
const templates = require("./yt2009templates")
const search = require("./yt2009search")
const html = require("./yt2009html")
const config = require("./config.json")
const mobileauths = require("./yt2009mobileauths")
const mobileflags = require("./yt2009mobileflags")
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

        let index = req.query["start-index"]
        if(!index || index == 1) {index = 0;}

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
            {"custom_index": index},
            (data => {
                let first3Videos = []
                let allVideos = []
                let fetchesCompleted = 0;
                let fetchesRequired = 1;
                if(config.data_api_key) {
                    fetchesRequired++
                }
                data.forEach(video => {
                    if(video.type !== "video") return;
                    if(first3Videos.length < 3) {
                        first3Videos.push(video.id)
                    }
                    allVideos.push(video.id)
                })

                // add videos when preloading done
                html.bulk_get_videos(first3Videos, () => {
                    fetchesCompleted++
                    if(fetchesCompleted >= fetchesRequired) {
                        addVideosToResponse(data)
                    }
                })

                // also if using data api wait for that
                if(config.data_api_key) {
                    utils.dataApiBulk(allVideos, ["publishedAt"], (apidata) => {
                        for(let id in apidata) {
                            let videoData = apidata[id]
                            let rel = data.filter(s => {
                                return s.id == id
                            })[0]
                            let i = data.indexOf(rel)
                            if(i !== null && i !== undefined && i >= 0) {
                                data[i].upload = videoData.publishedAt
                                data[i].dataApi = true;
                            }
                        }
                        fetchesCompleted++
                        if(fetchesCompleted >= fetchesRequired) {
                            addVideosToResponse(data)
                        }
                    })
                }
            }),
            utils.get_used_token(req) + "-cps",
            false
        )

        let maxVideos = 25
        if(req.query["max-results"]
        && !isNaN(parseInt(req.query["max-results"]))) {
            maxVideos = parseInt(req.query["max-results"])
        }
        
        function addVideosToResponse(data) {
            let videos = ``
            let videosCount = 0;
            let resultCount = 0;
            let flags = mobileflags.get_flags(req).watch
            data.forEach(video => {
                if(video.type == "metadata") {
                    resultCount = video.resultCount
                }
                if(video.type !== "video" || videosCount >= maxVideos) return;
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

                let uploadDate = cacheData.upload;
                if(!uploadDate && video.dataApi) {
                    uploadDate = video.upload
                } else if(!uploadDate && !video.dataApi) {
                    uploadDate = utils.relativeToAbsoluteApprox(video.upload)
                }

                videos += templates.gdata_feedVideo(
                    video.id,
                    video.title,
                    video.author_handle || utils.asciify(author_name || ""),
                    utils.bareCount(video.views),
                    videoTime,
                    videoDescription,
                    uploadDate,
                    (cacheData.tags || []).join() || "-",
                    cacheData.category || "-",
                    flags,
                    cacheData.qualities || []
                )
            })

            if(!req.source || req.source !== "proxy") {
                response = templates.cpsSearchBegin(
                    resultCount, req.originalUrl
                ).replace(`x>1<`, `x>${index + 1}<`)
            } else {
                response = templates.gdata_feedStart
                                    .split(">1<")
                                    .join(`>${index + 1}<`)
            }
            response += "\n" + videos
                     + templates.cpsSearchEnd;

            res.set("content-type", "application/atom+xml")
            res.send(response)
        }
    }
}
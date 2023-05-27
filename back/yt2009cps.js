const utils = require("./yt2009utils")
const templates = require("./yt2009templates")
const search = require("./yt2009search")
const html = require("./yt2009html")
const channels = require("./yt2009channels")

module.exports = {
    "get_search": function(req, res) {
        req = utils.addFakeCookie(req)

        let flags = ""
        if(req.headers.cookie.includes("search_flags")) {
            flags = req.headers.cookie.split("search_flags=")[1].split(";")[0]
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
            "",
            (data => {
                let videos = ``
                let videosCount = 0;
                data.forEach(video => {
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

                    videos += templates.gdata_feedVideo(
                        video.id,
                        video.title,
                        utils.asciify(author_name || ""),
                        utils.bareCount(video.views),
                        videoTime,
                        videoDescription,
                        utils.relativeToAbsoluteApprox(video.upload)
                    )
                })

                response =
                templates.cpsSearchBegin(videosCount)
                + "\n" + videos
                + templates.cpsSearchEnd;

                res.send(response)
            }),
            utils.get_used_token(req) + "-cps",
            false
        )
    }
}
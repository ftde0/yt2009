const yt2009html = require("./yt2009html")
const videostab = require("./yt2009videos")
const search = require("./yt2009search")
const utils = require("./yt2009utils")
const templates = require("./yt2009templates")
const mobileauths = require("./yt2009mobileauths")

const categories = {
    "Autos": "2",
    "Comedy": "35",
    "Education": "34",
    "Entertainment": "24",
    "Film": "1",
    "Games": "33",
    "Music": "31",
    "News": "32",
    "Nonprofit": "29",
    "People": "22",
    "Animals": "15",
    "Tech": "28",
    "Sports": "30",
    "Travel": "19",
    "Howto": "26",
}
let reverseCategories = {}
for(let i in categories) {
    reverseCategories[categories[i]] = i;
}

module.exports = {
    "standardfeed": function(req, res) {
        if(!mobileauths.isAuthorized(req, res)) return;

        // parse request
        let max = 24;
        let start = 0;
        let videosQuery = {
            "query": {
                "s": "mr",
                "index": start
            }
        }
        let feedType = req.originalUrl.split("/standardfeeds/")[1].split("?")[0]
        if(req.query["max-results"]
        && !isNaN(parseInt(req.query["max-results"])
        && parseInt(req.query["max-results"]) <= 50)) {
            max = parseInt(req.query["max-results"])
        }
        if(feedType.includes("most_popular")) {
            videosQuery.query.s = "mp"
        }
        if(feedType.split("_").length >= 3) {
            let category = feedType.split("_")[2]
            if(categories[category]) {
                videosQuery.query.c = categories[category]
            }
        }

        videosQuery.query.max = max;

        // get vids
        res.set("content-type", "application/rss+xml;charset=UTF-8")
        let videos = videostab.internal_getVideos(videosQuery, "")
        let videoIds = []
        videos.forEach(v => {
            videoIds.push(v.id)
        })
        let response = templates.baseFeed_feedStart(
            feedType.split("_").join(" "), videoIds.length
        )
        yt2009html.bulk_get_videos(videoIds, () => {
            let videosAdded = 0;
            videoIds.forEach(v => {
                yt2009html.fetch_video_data(v, (v) => {
                    response += templates.baseFeed_feedVideo(
                        v, categories[v.category.split(" ")[0]]
                    )
                    videosAdded++
                    if(videosAdded >= max) {
                        response += templates.baseFeed_feedEnd
                        //response = response.split("    ").join("").split("\n").join("")
                        res.send(response)
                    }
                },
            "", false, false, false, true)})
        })
    },

    "videoData": function(req, res) {
        if(!mobileauths.isAuthorized(req, res)) return;
        res.set("content-type", "application/rss+xml;charset=UTF-8")
        let id = req.originalUrl.split("/videos/")[1].split("/")[0].split("?")[0]
                    .substring(0, 11)
                    .replace(/[^a-zA-Z0-9+\-+_]/g, "");
        yt2009html.fetch_video_data(id, (data) => {
            let c = categories[data.category.split(" ")[0]]
            res.send(templates.baseFeed_feedVideo(data, c, true))
        }, "", false, false, false, true)
    },

    "search": function(req, res) {
        if(!mobileauths.isAuthorized(req, res)) return;
        res.set("content-type", "application/rss+xml;charset=UTF-8")
        let query = req.query.q || req.query.vq;
        query = query.split("+").join(" ")
        search.get_search(query, "", false, (data => {
            let response = templates.baseFeed_feedStart(
                "search", data.filter(s => s.type == "video").length
            )
            data.forEach(v => {if(v.type == "video") {
                let transformedVideo = {
                    "id": v.id,
                    "viewCount": utils.bareCount(v.views),
                    "title": v.title,
                    "description": "",
                    "author_name": v.author_name,
                    "author_id": v.author_url.includes("/channel/") ?
                                 v.author_url.split("/channel/")[1]
                                 : v.author_handle.replace("@", ""),
                    "category": "-",
                    "upload": utils.relativeToAbsoluteApprox(v.upload)
                }
                response += templates.baseFeed_feedVideo(transformedVideo, 0)
            }})

            response += templates.baseFeed_feedEnd;
            res.send(response)
        }), false, false)
    }
}
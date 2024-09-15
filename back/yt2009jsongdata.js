const fetch = require("node-fetch")
const utils = require("./yt2009utils")
const search = require("./yt2009search")
const html = require("./yt2009html")
const cfg = require("./config.json")
const feedBase = {
    "version": "1.0",
    "encoding": "UTF-8",
    "feed": {
        "entry": [],
        "author": [{
            "name": {"$t": "YouTube"},
            "uri": {"$t": "http://www.youtube.com"}
        }],
        "category": [{
            "scheme": "http://schemas.google.com/g/2005#kind",
            "term": "http://gdata.youtube.com/schemas/2007#video"
        }],
        "generator": {
            "$t": "YouTube data API",
            "uri": "http://gdata.youtube.com",
            "version": "2.1"
        },
        "id": {"$t": "tag:youtube.com,2008:videos"},
        "logo": {"$t": "http://www.gstatic.com/youtube/img/logo.png"},
        "title": {"$t": "Videos"},
        "updated": {"$t": "2024-08-30T19:54:35.068Z"},
        "xmlns": "http://www.w3.org/2005/Atom",
        "xmlns$app": "http://www.w3.org/2007/app",
        "xmlns$gd": "http://schemas.google.com/g/2005",
        "xmlns$georss": "http://www.georss.org/georss",
        "xmlns$gml": "http://www.opengis.net/gml",
        "xmlns$media": "http://search.yahoo.com/mrss/",
        "xmlns$openSearch": "http://a9.com/-/spec/opensearch/1.1/",
        "xmlns$yt": "http://gdata.youtube.com/schemas/2007"
    }
}
function jsonVideo(v) {
    let author = (v.author_handle || v.author_name)
    let base = "http://" + cfg.ip + ":" + cfg.port
    let e = {
        "author": {
            "name": {"$t": author},
            "uri": {
                "$t": base + "/feeds/api/users/" + author
            }
        },
        "category": [
            {
                "scheme": "http://schemas.google.com/g/2005#kind",
                "term": "http://gdata.youtube.com/schemas/2007#video"
            },
            {
                "label": v.category || "-",
                "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                "term": v.category || "-"
            }
        ],
        "content": {
            "src": "http://" + cfg.ip + ":" + cfg.port + "/watch.swf?video_id" + v.id,
            "type": "application/x-shockwave-flash"
        },
        "gd$comments": {
            "gd$feedLink": base + "/feeds/api/videos/" + v.id + "/comments",
            "rel": "http://gdata.youtube.com/schemas/2007#comments",
            "countHint": 1
        },
        "id": {
            "$t": "tag:youtube.com,2008:video:" + v.id
        },
        "link": [
            {
                "href": "http://www.youtube.com/watch?v=" + v.id,
                "rel": "alternate",
                "type": "text/html"
            },
            {
                "href": base + "/feeds/api/videos/" + v.id,
                "rel": "http://gdata.youtube.com/schemas/2007#video.related",
                "type": "application/atom+xml"
            }
        ],
        "media$group": {
            "media$category": {
                "label": v.category || "-",
                "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                "term": v.category || "-"
            },
            "media$content": [{
                "duration": v.length || 2,
                "medium": "video",
                "yt$format": 5,
                "url": base + "/get_video?video_id=" + v.id + "/mp4"
            }],
            "media$credit": [{
                "$t": author,
                "role": "uploader",
                "scheme": "urn:youtube",
                "yt$display": author
            }],
            "media$description": {"$t": v.description},
            "media$keywords": {},
            "media$license": {
                "$t": "youtube",
                "href": "http://www.youtube.com/t/terms",
                "type": "text/html"
            },
            "media$player": {"url": "http://www.youtube.com/watch?v=" + v.id},
            "media$thumbnail": [
                {"height": 90, "width": 120, time: "00:00:00",
                "url": "//i.ytimg.com/vi/" + v.id + "/default.jpg"},
                {"height": 180, "width": 320, time: "00:00:00",
                "url": "//i.ytimg.com/vi/" + v.id + "/mqdefault.jpg"},
                {"height": 360, "width": 480, time: "00:00:00",
                "url": "//i.ytimg.com/vi/" + v.id + "/hqdefault.jpg"},
                {"height": 480, "width": 360, time: "00:00:00",
                "url": "//i.ytimg.com/vi/" + v.id + "/sddefault.jpg"},
                {"height": 90, "width": 120, time: "00:00:00",
                "url": "//i.ytimg.com/vi/" + v.id + "/1.jpg"},
                {"height": 90, "width": 120, time: "00:00:00",
                "url": "//i.ytimg.com/vi/" + v.id + "/2.jpg"},
                {"height": 90, "width": 120, time: "00:00:00",
                "url": "//i.ytimg.com/vi/" + v.id + "/3.jpg"}
            ],
            "media$title": {"$t": v.title, "type": "plain"},
            "yt$duration": {"seconds": v.length || "999"},
            "yt$uploaded": {"$t": new Date(
                utils.relativeToAbsoluteApprox(v.upload)
            ).toISOString()},
            "yt$videoid": {"$t": v.id}
        },
        "published": {"$t": new Date(
            utils.relativeToAbsoluteApprox(v.upload)
        ).toISOString()},
        "updated": {"$t": new Date(
            utils.relativeToAbsoluteApprox(v.upload)
        ).toISOString()},
        "y9$rupload": v.upload,
        "title": {"$t": v.title},
        "yt$hd": {}
    }
    if(v.author_url.includes("/channel/")) {
        e.author["yt$userId"] = {"$t": v.author_url.replace("/channel/UC", "")}
        e.media$group.yt$uploaderId = {"$t": v.author_url.replace("/channel/UC", "")}
    }
    if(v.upload && v.upload.includes("-") && v.upload.includes("T")) {
        e.media$group.yt$uploaded.$t = v.upload
        e.published = v.upload
        e.updated = v.upload
        delete e.y9$rupload;
    }
    return e;
}

module.exports = {
    "search": function(req, res) {
        res.set("content-type", "text/plain")
        let data = JSON.parse(JSON.stringify(feedBase))
        let callback = false;
        if(req.query.callback) {
            callback = req.query.callback;
        }
        if(!req.query.q) {
            res.sendStatus(400);
            return;
        }
        let results = 20
        let addedResults = 0;
        if(req.query["max-results"] && !isNaN(parseInt(req.query["max-results"]))) {
            results = parseInt(req.query["max-results"])
        }
        let order = "relevance"
        let page = ((req.query["start-index"] || 0) / 20)

        function addVideosToResponse(videos) {
            videos.forEach(v => {
                if(JSON.stringify(html.get_cache_video(v.id)) !== "{}") {
                    v = JSON.parse(JSON.stringify(html.get_cache_video(v.id)))
                    v.type = "video"
                }
                if(v.type == "video") {
                    data.feed.entry.push(jsonVideo(v))
                    addedResults++;
                }
            })
            if(callback) {
                res.send(callback + "(" + JSON.stringify(data) + ")")
            } else {
                res.send(JSON.stringify(data))
            }
        }

        search.get_search(
            encodeURIComponent(req.query.q) || "", "",
            {"page": page},
            (results => {
                let first3Videos = []
                results.forEach(video => {
                    if(video.type !== "video") return;
                    if(first3Videos.length < 3) {
                        first3Videos.push(video.id)
                    }
                })

                // add videos when preloading done
                html.bulk_get_videos(first3Videos, () => {
                    addVideosToResponse(results)
                })
            }),
            utils.get_used_token(req) + "-jsongdata", false
        )
    }
}
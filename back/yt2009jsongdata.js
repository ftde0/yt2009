const utils = require("./yt2009utils")
const search = require("./yt2009search")
const html = require("./yt2009html")
const trusted = require("./yt2009trustedcontext")
const cfg = require("./config.json")
const base = "http://" + cfg.ip + ":" + cfg.port
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
const bareBase = {
    "version": "1.0",
    "encoding": "UTF-8"
}
function jsonUser(u) {
    let avatar = u.avatar;
    if(!avatar.startsWith("http")) {
        avatar = `${base}${avatar}`
    }
    let e = {
        "author": [{
            "name": {"$t": u.name},
            "url": {"$t": `${base}/feeds/api/users/${u.id}`},
            "yt$userId": {"$t": u.id.replace("UC", "")}
        }],
        "category": [{
            "scheme": "http://schemas.google.com/g/2005#kind",
            "term": "http://gdata.youtube.com/schemas/2007#userProfile"
        }],
        "gd$feedLink": [
            {
                "href": `${base}/feeds/api/users/${u.id}/favorites`,
                "rel": "http://gdata.youtube.com/schemas/2007#user.favorites"
            },
            {
                "href": `${base}/feeds/api/users/${u.id}/playlists`,
                "rel": "http://gdata.youtube.com/schemas/2007#user.playlists"
            },
            {
                "href": `${base}/feeds/api/users/${u.id}/uploads`,
                "rel": "http://gdata.youtube.com/schemas/2007#user.uploads"
            }
        ],
        "id": {"$t": "tag:youtube.com,2008:user:" + u.id.replace("UC", "")},
        "link": [{
            "href": `${base}/channel/${u.id}`,
            "ref": "alternate",
            "type": "text/html"
        }],
        "media$thumbnail": {"url": avatar},
        "published": {"$t": "1970-01-01T00:00:00.000Z"},
        "summary": {"$t": u.properties.description || ""},
        "title": {"$t": u.name},
        "updated": {"$t": "1970-01-01T00:00:00.000Z"},
        "xmlns": "http://www.w3.org/2005/Atom",
        "xmlns$gd": "http://schemas.google.com/g/2005",
        "xmlns$media": "http://search.yahoo.com/mrss/",
        "xmlns$yt": "http://gdata.youtube.com/schemas/2007",
        "yt$channelId": {"$t": u.id},
        "yt$firstName": {"$t": u.name},
        "yt$googlePlusUserId": {"$t": "0"},
        "yt$location": {"$t": "US"},
        "yt$statistics": {
            "lastWebAccess": "1970-01-01T00:00:00.000Z",
            "subscriberCount": utils.approxSubcount(u.properties.subscribers || "0"),
            "totalUploadViews": "0",
            "videoWatchCount": 0,
            "viewCount": "0"
        },
        "yt$userId": {"$t": u.id.replace("UC", "")},
        "yt$username": {"$t": u.handle || u.name, "display": u.name}
    }
    return e;
}
function jsonVideo(v) {
    let author = (v.author_handle || v.author_name
                || v.uploaderHandle || v.uploaderName)
    let mp4Url = base + "/get_video?video_id=" + v.id + "/mp4"
    mp4Url += trusted.urlContext(v.id, "PLAYBACK_STD", (v.length >= (60 * 30)))
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
                "url": mp4Url
            }],
            "media$credit": [{
                "$t": author,
                "role": "uploader",
                "scheme": "urn:youtube",
                "yt$display": author
            }],
            "media$description": {"$t": v.description || "-"},
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
            "yt$uploaded": {"$t": v.upload ? (new Date(
                utils.relativeToAbsoluteApprox(v.upload)
            ).toISOString()) : "1970-01-01T00:00:00.000Z"},
            "yt$videoid": {"$t": v.id}
        },
        "published": {"$t": v.upload ? (new Date(
            utils.relativeToAbsoluteApprox(v.upload)
        ).toISOString()) : "1970-01-01T00:00:00.000Z"},
        "updated": {"$t": v.upload ? (new Date(
            utils.relativeToAbsoluteApprox(v.upload)
        ).toISOString()) : "1970-01-01T00:00:00.000Z"},
        "y9$rupload": v.upload,
        "title": {"$t": v.title},
        "yt$hd": {}
    }
    let authorUrl = v.author_url || v.uploaderUrl || ""
    if(authorUrl.includes("/channel/")) {
        e.author["yt$userId"] = {"$t": authorUrl.replace("/channel/UC", "")}
        e.media$group.yt$uploaderId = {"$t": authorUrl.replace("/channel/UC", "")}
    }
    if(v.upload && v.upload.includes("-") && v.upload.includes("T")) {
        e.media$group.yt$uploaded.$t = v.upload
        e.published = v.upload
        e.updated = v.upload
        delete e.y9$rupload;
    }
    return e;
}
function jsonPlaylist(p, authorName, authorId) {
    let e = {
        "author": [{
            "name": {"$t": authorName},
            "uri": {"$t": `${base}/feeds/api/users/${authorId}`},
            "yt$userId": {"$t": authorId.replace("UC", "")}
        }],
        "category": [{
            "scheme": "http://schemas.google.com/g/2005#kind",
            "term": "http://gdata.youtube.com/schemas/2007#playlistLink"
        }],
        "content": {
            "src": `${base}/feeds/api/playlists/${p.id}`,
            "type": "application/atom+xml;type=feed"
        },
        "id": {"$t": `tag:youtube.com,2008:user:${authorId}:playlist:${p.id}`},
        "link": [
            {
                "href": `${base}/feeds/api/users/${authorId}`,
                "rel": "related",
                "type": "application/atom+xml"
            },
            {
                "href": `${base}/playlist?list=${p.id}`,
                "rel": "alternate",
                "type": "text/html"
            },
            {
                "href": `${base}/feeds/api/users/${authorId}/playlists/${p.id}`,
                "rel": "self",
                "type": "application/atom+xml"
            }
        ],
        "media$group": {
            "media$thumbnail": [
                {
                    "width": 120,
                    "height": 90,
                    "url": `http:${p.thumbnail.replace("hqdefault", "default")}`
                },
                {
                    "width": 320,
                    "height": 180,
                    "url": `http:${p.thumbnail.replace("hqdefault", "mqdefault")}`
                },
                {
                    "width": 480,
                    "height": 360,
                    "url": `http:${p.thumbnail}`
                }
            ],
            "yt$duration": {"seconds": "0"}
        },
        "published": {"$t": "1970-01-01T00:00:00.000Z"},
        "summary": {"$t": ""},
        "title": {"$t": p.name},
        "updated": {"$t": "1970-01-01T00:00:00.000Z"},
        "yt$countHint": {"$t": p.videos},
        "yt$playlistId": {"$t": p.id}
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
        let addedResults = 0;
        if(req.query["max-results"] && !isNaN(parseInt(req.query["max-results"]))) {
            results = parseInt(req.query["max-results"])
        }
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
    },

    "video": function(req, res) {
        res.set("content-type", "text/plain")
        let data = JSON.parse(JSON.stringify(bareBase))
        let callback = false;
        if(req.query.callback) {
            callback = req.query.callback;
        }
        let id = req.originalUrl.split("videos/")[1]
                    .split("/")[0].split("?")[0].split("#")[0]
        if(!id) {
            res.sendStatus(400);
            return;
        }
        html.fetch_video_data(id, (v) => {
            data.entry = jsonVideo(v)
            if(callback) {
                res.send(callback + "(" + JSON.stringify(data) + ")")
            } else {
                res.send(JSON.stringify(data))
            }
        }, "",
        utils.get_used_token(req) + "-jsongdata", false, false, true)
    },

    "standardfeed": function(videos, res, callbackName) {
        res.set("content-type", "text/plain")
        let data = JSON.parse(JSON.stringify(feedBase))
        let callback = false;
        if(callbackName) {
            callback = callbackName;
        }
        videos.forEach(v => {
            data.feed.entry.push(jsonVideo(v))
        })
        if(callback) {
            res.send(callback + "(" + JSON.stringify(data) + ")")
        } else {
            res.send(JSON.stringify(data))
        }
    },

    "userData": function(userData, res, callbackName) {
        res.set("content-type", "text/plain")
        let data = JSON.parse(JSON.stringify(bareBase))
        let callback = false;
        if(callbackName) {
            callback = callbackName;
        }
        data.entry = jsonUser(userData);
        if(callback) {
            res.send(callback + "(" + JSON.stringify(data) + ")")
        } else {
            res.send(JSON.stringify(data))
        }
    },

    "userVideos": function(userData, res, callbackName) {
        res.set("content-type", "text/plain")
        let data = JSON.parse(JSON.stringify(feedBase))
        let callback = false;
        if(callbackName) {
            callback = callbackName;
        }

        let videosSource = userData.videos
        videosSource = videosSource.filter(s => {return !(
            s.badges
            && s.badges.includes("BADGE_STYLE_TYPE_MEMBERS_ONLY")
        )})

        videosSource.forEach(v => {
            v = JSON.parse(JSON.stringify(v))
            v.author_name = userData.name;
            data.feed.entry.push(jsonVideo(v))
        })
        if(callback) {
            res.send(callback + "(" + JSON.stringify(data) + ")")
        } else {
            res.send(JSON.stringify(data))
        }
    },

    "userPlaylists": function(playlists, res, callbackName, authorName, authorId) {
        res.set("content-type", "text/plain")
        let data = JSON.parse(JSON.stringify(feedBase))
        let callback = false;
        if(callbackName) {
            callback = callbackName;
        }
        playlists.forEach(v => {
            data.feed.entry.push(jsonPlaylist(v, authorName, authorId))
        })
        if(callback) {
            res.send(callback + "(" + JSON.stringify(data) + ")")
        } else {
            res.send(JSON.stringify(data))
        }
    },

    "sendEmptyFeed": function(res, callbackName) {
        res.set("content-type", "text/plain")
        let data = JSON.parse(JSON.stringify(feedBase))
        if(callbackName) {
            res.send(callbackName + "(" + JSON.stringify(data) + ")")
        } else {
            res.send(JSON.stringify(data))
        }
    },

    "playlistVideos": function(videos, res, callbackName) {
        res.set("content-type", "text/plain")
        let data = JSON.parse(JSON.stringify(feedBase))
        let callback = false;
        if(callbackName) {
            callback = callbackName;
        }
        videos.forEach(v => {
            data.feed.entry.push(jsonVideo(v))
        })
        if(callback) {
            res.send(callback + "(" + JSON.stringify(data) + ")")
        } else {
            res.send(JSON.stringify(data))
        }
    },
}
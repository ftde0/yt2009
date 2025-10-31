const fetch = require("node-fetch")
const constants = require("./yt2009constants.json")
const yt2009templates = require("./yt2009templates")
const config = require("./config.json")
const fs = require("fs")
const playlist_html = fs.readFileSync("../playlist.htm").toString();
const doodles = require("./yt2009doodles")
const language = require("./language_data/language_engine")
const utils = require("./yt2009utils")
const mobileauths = require("./yt2009mobileauths")

let cache = require("./cache_dir/playlist_cache_manager")

module.exports = {
    "innertube_get_data": function(id, callback) {
        fetch(`https://www.youtube.com/youtubei/v1/browse?prettyPrint=false`, {
            "headers": constants.headers,
            "referrer": `https://www.youtube.com/`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
                "browseId": "VL" + id,
                "context": constants.cached_innertube_context
            }),
            "method": "POST",
            "mode": "cors"
        }).then(r => {r.json().then(r => {
            callback(r)
        })})
    },


    "applyPlaylistHTML": function(data, req) {
        let code = playlist_html;

        code = require("./yt2009loginsimulate")(req, code, true)

        let vids = utils.bareCount(data.videoCount) + "lang_results_playlist_video_suffix"

        code = code.replace("yt2009_playlist_name", data.name)
        code = code.replace("yt2009_playlist_description", data.description)
        code = code.split("yt2009_videos_count").join(vids)
        code = code.replace("yt2009_last_update", data.lastUpdate)
        code = code.replace("yt2009_playlist_views", data.views)
        code = code.replace("yt2009_creator_link", data.creatorUrl)
        code = code.replace("yt2009_creator_name", data.creatorName)
        code = code.replace(
            "yt2009_playlistlink",
            "http://www.youtube.com/view_play_list?p=" + data.playlistId
        )

        // create and throw in playlist embed
        let playlist_embed_url = "http://www.youtube.com/swf/cpb.swf?"
        if(data.videos[0]) {
            playlist_embed_url += "player_id=" + data.videos[0].id + "&"
        }
        playlist_embed_url += "datatype=playlist&"
        playlist_embed_url += "data=" + data.playlistId + "&"
        playlist_embed_url += "BASE_YT_URL=http://" + config.ip + ":" + config.port + "/"
        code = code.replace(
            "yt2009_cpburl",
            playlist_embed_url
        )
        code = code.replace("yt2009_config_hostname", config.ip)
        code = code.replace("yt2009_config_port", config.port)

        if((req.headers.cookie || "").includes("shows_tab")) {
            // shows tab
            code = code.replace(
                `<a href="/channels">lang_channels</a>`,
                `<a href="/channels">lang_channels</a><a href="#">lang_shows</a>`
            )
        }

        let videos_html = ``
        data.videos.forEach(video => {
            videos_html += yt2009templates.playlistVideo(
                video, data.playlistId, req.protocol
            )
        })

        if(data.videos[0]) {
            code = code.replace(
                "/yt2009_playlist_thumbnail", data.videos[0].thumbnail
            )
            code = code.split("yt2009_watch_all_link").join(
                `/watch?v=${data.videos[0].id}&list=${data.playlistId}`
            )
        } else {
            code = code.split("yt2009_watch_all_link").join(`/`)
        }

        code = code.replace(`<!--yt2009_video_entries-->`, videos_html)
        code = doodles.applyDoodle(code, req)
        code = language.apply_lang_to_code(code, req)

        return code;
    },

    "parsePlaylist": function(playlistId, callback, sourceVideo) {
        if(cache.read()[playlistId]) {
            callback(JSON.parse(JSON.stringify(cache.read()[playlistId])))
            return JSON.parse(JSON.stringify(cache.read()[playlistId]));
        } else {
            let videoList = {
                "name": "",
                "videos": [],
                "views": "",
                "creatorName": "",
                "creatorUrl": "",
                "description": "",
                "lastUpdate": "",
                "videoCount": "",
                "playlistId": playlistId
            }

            if(playlistId.startsWith("RD") && sourceVideo) {
                // special handling for radio playlists
                //let ogId = playlistId.replace("RD", "")
                fetch(`https://www.youtube.com/youtubei/v1/next`, {
                    "headers": constants.headers,
                    "referrer": `https://www.youtube.com/`,
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": JSON.stringify({
                        "videoId": sourceVideo,
                        "playlistId": playlistId,
                        "context": constants.cached_innertube_context,
                        "autonavState": "STATE_ON",
                        "contentCheckOk": true,
                        "racyCheckOk": true
                    }),
                    "method": "POST",
                    "mode": "cors"
                }).then(r => {r.json().then(r => {
                    if(r.contents && r.contents.twoColumnWatchNextResults
                    && r.contents.twoColumnWatchNextResults.playlist
                    && r.contents.twoColumnWatchNextResults.playlist.playlist) {
                        let p = r.contents.twoColumnWatchNextResults
                                 .playlist.playlist;
                        let vids = []
                        p.contents.forEach(v => {
                            if(v.playlistPanelVideoRenderer) {
                                v = v.playlistPanelVideoRenderer
                                try {
                                    let thumb = [
                                        "http://i.ytimg.com/vi/",
                                        v.videoId,
                                        "/hqdefault.jpg"
                                    ].join("")
                                    let by = v.shortBylineText.runs[0]
                                    let byId = by.navigationEndpoint
                                                 .browseEndpoint.browseId
                                    vids.push({
                                        "id": v.videoId,
                                        "title": v.title.simpleText,
                                        "thumbnail": thumb,
                                        "uploaderName": by.text,
                                        "uploaderId": byId,
                                        "uploaderUrl": "/channel/" + byId,
                                        "time": v.lengthText ?
                                                v.lengthText.simpleText : "",
                                        "views": "0"
                                    })
                                }
                                catch(error) {console.log(error)}
                            }
                        })
                        callback({"videos": vids})
                    } else {
                        callback(false)
                    }
                })})
                return;
            }

            this.innertube_get_data(playlistId, (r) => {
                if(!r.contents) {
                    callback(false)
                    return;
                }
                let playlistArray = r.contents.twoColumnBrowseResultsRenderer
                                     .tabs[0].tabRenderer.content
                                     .sectionListRenderer.contents[0]
                                     .itemSectionRenderer.contents[0]
                                     .playlistVideoListRenderer.contents
                // metadata
                let primarySidebar = r.sidebar.playlistSidebarRenderer.items[0]
                                      .playlistSidebarPrimaryInfoRenderer
                let owner = ""
                try {
                    owner = r.sidebar.playlistSidebarRenderer.items[1]
                             .playlistSidebarSecondaryInfoRenderer.videoOwner
                             .videoOwnerRenderer.title.runs[0]
                }
                catch(error) {}
                
                let vidCount = ""
                primarySidebar.stats[0].runs.forEach(run => {
                    vidCount += run.text
                })

                let lastUpdate = ""
                primarySidebar.stats[2].runs.forEach(run => {
                    lastUpdate += run.text
                })

                videoList.name = primarySidebar.title.runs[0].text
                videoList.views = primarySidebar.stats[1].simpleText
                videoList.creatorName = owner.text
                if(owner.navigationEndpoint) {
                    videoList.creatorUrl = owner.navigationEndpoint.browseEndpoint
                                                .canonicalBaseUrl
                } else {
                    videoList.creatorUrl = "#"
                }
                try {
                    videoList.description = primarySidebar.description
                                            ? primarySidebar.description
                                              .simpleText.split("\n")
                                              .splice(0, 3).join("<br>") : ""
                }
                catch(error) {}
                videoList.lastUpdate = lastUpdate
                videoList.videoCount = vidCount

                // vids
                playlistArray.forEach(video => {
                    if(!video.playlistVideoRenderer) return;
                    video = video.playlistVideoRenderer
                    if((video.videoInfo && !video.videoInfo.runs)
                    || (!video.videoInfo)) return; //skip members-only?
                    videoList.videos.push({
                        "id": video.videoId,
                        "title": video.title.runs[0].text,
                        "thumbnail": "http://i.ytimg.com/vi/"
                                    + video.videoId
                                    + "/hqdefault.jpg",
                        "uploaderName": video.shortBylineText.runs[0].text,
                        "uploaderUrl": ((video.shortBylineText.runs[0]
                                         .navigationEndpoint
                                      && video.shortBylineText.runs[0]
                                         .navigationEndpoint.browseEndpoint
                                      && video.shortBylineText.runs[0]
                                         .navigationEndpoint.browseEndpoint
                                         .canonicalBaseUrl)||""),
                        "uploaderId": ((video.shortBylineText.runs[0]
                                         .navigationEndpoint
                                      && video.shortBylineText.runs[0]
                                         .navigationEndpoint.browseEndpoint
                                      && video.shortBylineText.runs[0]
                                         .navigationEndpoint.browseEndpoint
                                         .browseId)||""),
                        "time": video.lengthText ?
                                video.lengthText.simpleText : "",
                        "views": utils.approxSubcount(
                            video.videoInfo.runs[0].text.split(" ")[0]
                        )
                    })
                })

                cache.write(playlistId, JSON.parse(JSON.stringify(videoList)))
                callback(cache.read()[playlistId])
            })
        }
    },

    "create_cpb_xml": function(req, res) {
        res.set("content-type", "application/atom+xml")
        let compatAuth = false;
        if((req.headers.referer && req.headers.referer.includes(".swf"))
        || (req.headers["user-agent"]
        && req.headers["user-agent"].includes("Shockwave Flash"))) {
            compatAuth = true;
        }
        if(!compatAuth && !mobileauths.isAuthorized(req, res, "feed")) return;
        let id = req.originalUrl.split("playlists/")[1].split("?")[0]
        let xmlResponse = ""
        if(id.length >= 10 && !id.startsWith("PL") && !id.startsWith("OL")) {
            id = "PL" + id
        }
        this.parsePlaylist(id, (data) => {

            if(!data) {
                res.sendStatus(404)
                return;
            }

            if(req.query.alt == "json") {
                require("./yt2009jsongdata").playlistVideos(
                    data.videos, res, req.query.callback
                )
                return;
            }

            xmlResponse += yt2009templates.cpbPlaylistsBegin(
                data.name,
                data.playlistId,
                data.creatorName
            )
            xmlResponse += yt2009templates.cpbPlaylistsCounts(
                data.videos.length,
                data.playlistId,
                data.name,
                data.description
            )
            let videoIndex = 1;
            (data.videos || []).forEach(video => {
                xmlResponse += yt2009templates.cpbVideo(video, videoIndex)
                videoIndex += 1
            })
            xmlResponse += `
            </feed>`

            res.set("content-type", "application/atom+xml")
            res.send(xmlResponse)
        })
    },

    "apiV1_playlist": function(req, res) {
        let id = req.query.id;
        if(id.length >= 10 && !id.startsWith("PL") && !id.startsWith("OL")) {
            id = "PL" + id
        }
        this.parsePlaylist(id, (data) => {
            if(!data) {
                res.sendStatus(404)
                return;
            }

            let videos_xml = `<?xml version="1.0" encoding="utf-8"?>
<ut_response status="ok">
<video_list>`
            let video_index = 1;
            data.videos.forEach(v => {
                videos_xml += yt2009templates.warpVideo(
                    v.id, v.title, v.time, v.uploaderName,
                    video_index, "", v.views, 5
                )
            
                video_index++
            })

            videos_xml += `
</video_list>
</ut_response>`
            res.send(videos_xml)
        })
    }
}
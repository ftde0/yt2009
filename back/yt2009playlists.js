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
const hostname = config.alt_hostname
               ? `https://youtubei.googleapis.com`
               : `https://www.youtube.com`
let cache = require("./cache_dir/playlist_cache_manager")
const mobileflags = require("./yt2009mobileflags")
const sabr = require("./yt2009sabr")
function handleSabr(videoId, req) {
    let flags = mobileflags.get_flags(req)
    let urlFlags = mobileflags.url_flags(req)
    if(flags.watch.includes("sabr")
    || urlFlags.list.includes("sabr")) {
        let qualities = ["720p", "480p", "360p", "240p", "144p"]
        if(flags.watch.includes("sabr-nonhd")
        || urlFlags.list.includes("sabr-nonhd")) {
            qualities = ["480p", "360p", "240p", "144p"]
        }
        let sabrUrl = sabr.initPlaybackSession(
            videoId, qualities
        )
        return {
            "sabrUrl": sabrUrl,
            "sabrUsesModdedApp": flags.watch.includes(
                "sabr-uses-modded-app"
            ) || urlFlags.list.includes("sabr-uses-modded-app")
        }
    }
    return {"sabrUrl": false}
}

function splitEvery25(videoIds) {
     // slice every 25 for data api requests
    let twentyFives = []
    let totalVidsAdded = 0;
    let mult = 0;
    while(totalVidsAdded <= videoIds.length) {
        let temp = videoIds.slice(25 * mult, (25 * mult) + 25)
        twentyFives.push(temp)
        totalVidsAdded += 25
        mult++
    }
    twentyFives = twentyFives.filter(s => {
        return s.length >= 1
    })
    return twentyFives
}

module.exports = {
    "innertube_get_data": function(id, callback) {
        fetch(`${hostname}/youtubei/v1/browse?prettyPrint=false`, {
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

        if(data.firstContinuation) {
            videos_html += yt2009templates.web_playlists_loadmore_btn(
                data.firstContinuation
            )
        }

        code = code.replace(`<!--yt2009_video_entries-->`, videos_html)
        code = doodles.applyDoodle(code, req)
        code = language.apply_lang_to_code(code, req)

        return code;
    },

    "parsePlaylist": function(
        playlistId, callback, sourceVideo, resetCache, skipDataApi
    ) {
        if((playlistId.startsWith("RD") && sourceVideo)
        || (sourceVideo && playlistId.includes("-YT2009_FORCENEXT"))) {
            playlistId = playlistId.replace("-YT2009_FORCENEXT", "")
            this.nextAsPlaylist(playlistId, callback, sourceVideo)
            return;
        }

        if(cache.read()[playlistId] && !resetCache) {
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

            this.innertube_get_data(playlistId, (r) => {
                if(!r.contents) {
                    callback(false)
                    return;
                }
                let playlistArray = r.contents.twoColumnBrowseResultsRenderer
                                     .tabs[0].tabRenderer.content
                                     .sectionListRenderer.contents[0]
                                     .itemSectionRenderer.contents
                if(playlistArray[0]
                && playlistArray[0].playlistVideoListRenderer) {
                    playlistArray = playlistArray[0].playlistVideoListRenderer.contents
                }
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
                    if(video.continuationItemRenderer) {
                        try {
                            let e = video.continuationItemRenderer
                                         .continuationEndpoint;
                            let t = null;
                            if(e.continuationCommand) {
                                t = e.continuationCommand.token;
                            } else if(e.commandExecutorCommand) {
                                t = e.commandExecutorCommand.commands.filter(s => {
                                    return (
                                        s.continuationCommand
                                    )
                                })
                                if(t[0]) {
                                    t = t[0].continuationCommand.token;
                                } else {
                                    t = null;
                                }
                            }
                            videoList.firstContinuation = t
                        }
                        catch(error){console.log(error)}
                        return;
                    }
                    if(video.lockupViewModel) {
                        let v = viewmodelParse(video)
                        if(!v.badges || !v.badges.includes("BADGE_MEMBERS_ONLY")) {
                            videoList.videos.push(v)
                        }
                        return;
                    }
                    if(video.continuationItemViewModel) {
                        try {
                            let vmc = video.continuationItemViewModel
                                           .continuationCommand
                                           .innertubeCommand
                                           .continuationCommand.token
                            videoList.firstContinuation = vmc
                        }
                        catch(error){}
                        return;
                    }
                    if(!video.playlistVideoRenderer) return;
                    video = video.playlistVideoRenderer
                    if((video.videoInfo && !video.videoInfo.runs)
                    || (!video.videoInfo)) return; //skip members-only?
                    
                    if(!video.shortBylineText) {
                        video.shortBylineText = {
                            "runs": [{"text": ""}]
                        }
                    }

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

                function sendVideos() {
                    cache.write(
                        playlistId, JSON.parse(JSON.stringify(videoList))
                    )
                    callback(videoList)
                }

                if(config.data_api_key && !skipDataApi) {
                    let videoIds = videoList.videos.map(s => {
                        return s.id
                    })

                    // slice every 25 for data api requests
                    let twentyFives = splitEvery25(videoIds)
                    let setsCompleted = 0;
                    twentyFives.forEach(videoSet => {
                        utils.dataApiBulk(videoSet, [
                            "title", "viewCount"
                        ], (d) => {
                            if(d) {
                                for(let id in d) {
                                    if(d[id]
                                    && d[id].viewCount
                                    && d[id].title) {
                                        let i = videoIds.indexOf(id)
                                        videoList.videos[i].views = parseInt(
                                            d[id].viewCount
                                        )
                                        videoList.videos[i].title = d[id].title
                                    }
                                }
                            }
                            setsCompleted++
                            if(setsCompleted >= twentyFives.length) {
                                sendVideos()
                            }
                        })
                    })
                    if(twentyFives.length == 0) {
                        sendVideos()
                    }
                } else {
                    sendVideos()
                }
            })
        }
    },

    "create_cpb_xml": function(req, res) {
        res.set("content-type", "application/atom+xml")
        let compatAuth = false;
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
                xmlResponse += yt2009templates.cpbVideo(
                    video, videoIndex, handleSabr(video.id, req)
                )
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
    },

    "moreVideosContinuation": function(req, res) {
        const validDisplayTypes = ["vlpage", "channelpage"]
        if(!req.query.token) {
            res.sendStatus(400)
            return;
        }
        let continuation = req.query.token;
        let playlistId = ""
        let type = validDisplayTypes.includes(req.query.type)
                   ? req.query.type : validDisplayTypes[0];
        fetch(`${hostname}/youtubei/v1/browse?prettyPrint=false`, {
            "headers": constants.headers,
            "referrer": `https://www.youtube.com/`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
                "context": constants.cached_innertube_context,
                "continuation": continuation
            }),
            "method": "POST",
            "mode": "cors"
        }).then(r => {r.json().then(r => {
            let additionalFetchesRequired = 0;
            let additionalFetchesCompleted = 0;
            if(config.data_api_key) {
                additionalFetchesRequired++
            }
            let itemHTML = ``
            let items = []
            try {
                items = r.onResponseReceivedActions[0]
                         .appendContinuationItemsAction
                         .continuationItems
            }
            catch(error){}
            try {
                let append = r.onResponseReceivedActions[0]
                              .appendContinuationItemsAction
                              .targetId
                if(append) {
                    playlistId = append;
                }
            }
            catch(error){}
            let videoIndex = 1;
            function renderVideo(vid) {
                switch(type) {
                    case "vlpage": {
                        itemHTML += yt2009templates.playlistVideo(
                            vid, playlistId, req.protocol
                        )
                        break;
                    }
                    case "channelpage": {
                        itemHTML += yt2009templates.playnavVideo(
                            vid, videoIndex, "", "", 0, req.protocol
                        )
                        break;
                    }
                }
                videoIndex++
            }
            function renderContinuation(token) {
                switch(type) {
                    case "vlpage": {
                        itemHTML += yt2009templates.web_playlists_loadmore_btn(
                            token
                        )
                        break;
                    }
                    case "channelpage": {
                        itemHTML += yt2009templates.playnavContMore(
                            token, "scrollbox-" + playlistId
                        )
                        break;
                    }
                }
            }
            let videoIds = []
            let videos = []
            let continuation = null;
            items.forEach(i => {
                if(i.playlistVideoRenderer) {
                    try {
                        i = i.playlistVideoRenderer
                        let thumbnail = [
                            "http://i.ytimg.com/vi/",
                            i.videoId,
                            "/hqdefault.jpg"
                        ].join("")
                        let th = thumbnail
                        let author = i.shortBylineText.runs[0]
                        let authorId = author.navigationEndpoint
                                             .browseEndpoint.browseId;
                        let parsedItem = {
                            "id": i.videoId,
                            "thumbnail": th,
                            "time": i.lengthText.simpleText,
                            "uploaderName": author.text,
                            "uploaderUrl": "/channel/" + authorId,
                            "title": i.title.runs[0].text
                        }
                        videoIds.push(i.videoId)
                        videos.push(parsedItem)
                        if(additionalFetchesRequired == 0) {
                            renderVideo(parsedItem)
                        }
                    }
                    catch(error){}
                } else if(i.continuationItemRenderer) {
                    try {
                        let token = i.continuationItemRenderer
                                     .continuationEndpoint
                                     .continuationCommand
                                     .token;
                        if(additionalFetchesRequired == 0) {
                            renderContinuation(token)
                        } else {
                            continuation = token;
                        }
                    }
                    catch(error){}
                } else if(i.lockupViewModel) {
                    let v = viewmodelParse(i)
                    if(!v.badges || !v.badges.includes("BADGE_MEMBERS_ONLY")) {
                        videoIds.push(v.id)
                        videos.push(v)
                        if(additionalFetchesRequired == 0) {
                            renderVideo(v)
                        }
                    }
                } else if(i.continuationItemViewModel) {
                    try {
                        let token = i.continuationItemViewModel
                                     .continuationCommand
                                     .innertubeCommand
                                     .continuationCommand.token
                        if(additionalFetchesRequired == 0) {
                            renderContinuation(token)
                        } else {
                            continuation = token;
                        }
                    }
                    catch(error){}
                }
            })

            function renderFromParsedVLIST() {
                videoIndex = 1;
                videos.forEach(v => {
                    renderVideo(v)
                })
                if(continuation) {
                    renderContinuation(continuation)
                }
                res.send(language.apply_lang_to_code(itemHTML, req))
            }

            if(config.data_api_key) {
                let twentyFives = splitEvery25(videoIds)
                let setsCompleted = 0;
                twentyFives.forEach(videoSet => {
                    utils.dataApiBulk(videoSet, ["title"], (d) => {
                        if(d) {
                            for(let id in d) {
                                if(d[id]
                                && d[id].title) {
                                    let i = videoIds.indexOf(id)
                                    videos[i].title = d[id].title
                                }
                            }
                        }
                        setsCompleted++
                        if(setsCompleted >= twentyFives.length) {
                            additionalFetchesCompleted++
                            if(additionalFetchesCompleted >= additionalFetchesRequired) {
                                renderFromParsedVLIST()
                            }
                        }
                    })
                })
                if(twentyFives.length == 0) {
                    renderFromParsedVLIST()
                }
            }
            if(additionalFetchesRequired == 0) {
                res.send(language.apply_lang_to_code(itemHTML, req))
            }
        })})
    },

    "nextAsPlaylist": function(playlistId, callback, sourceVideo) {
        fetch(`${hostname}/youtubei/v1/next`, {
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
                if(config.data_api_key) {
                    let videoIds = vids.map(s => {
                        return s.id
                    })
                    let twentyFives = splitEvery25(videoIds)
                    let setsCompleted = 0;
                    twentyFives.forEach(videoSet => {
                        utils.dataApiBulk(videoSet, ["title"], (d) => {
                            if(d) {
                                for(let id in d) {
                                    if(d[id]
                                    && d[id].title) {
                                        let i = videoIds.indexOf(id)
                                        vids[i].title = d[id].title
                                    }
                                }
                            }
                            setsCompleted++
                            if(setsCompleted >= twentyFives.length) {
                                callback({"videos": vids})
                            }
                        })
                    })
                } else {
                    callback({"videos": vids})
                }
            } else {
                callback(false)
            }
        })})
    }
}

function viewmodelParse(video) {
    // viewmodel parsing (jun 26)
    video = video.lockupViewModel
    let id = video.contentId;
    let m = video.metadata.lockupMetadataViewModel
    let title = m.title.content
    let thumbnail = "http://i.ytimg.com/vi/"
                  + id + "/hqdefault.jpg"
    let metadataRows = []
    let uploaderId = ""
    let uploaderName = ""
    let badges = []
    m.metadata.contentMetadataViewModel.metadataRows
    .forEach(r => {
        if(r.metadataParts && r.metadataParts.forEach) {
            r.metadataParts.forEach(p => {
                if(p.text && p.text.content) {
                    metadataRows.push(p.text.content)
                }
                if(p.text && p.text.commandRuns) {
                    uploaderName = p.text.content
                    let r = p.text.commandRuns[0]
                    if(r
                    && r.onTap
                    && r.onTap.innertubeCommand) {
                        try {
                            uploaderId = r.onTap
                                        .innertubeCommand
                                        .browseEndpoint
                                        .browseId;
                        }
                        catch(error){}
                    }
                }
            })
        } else if(r.badges && r.badges.forEach) {
            r.badges.forEach(b => {
                badges.push((
                    b && b.badgeViewModel && b.badgeViewModel.badgeStyle
                ))
            })
        }
    })
    let viewCount = metadataRows.filter(s => {
        return !(s.includes(" ago"))
    })[0] || ""
    let time = ""
    try {
        let os = video.contentImage.thumbnailViewModel
                 .overlays
        if(os && os.forEach) {
            os.forEach(o => {
                if(o
                && o.thumbnailBottomOverlayViewModel) {
                    o.thumbnailBottomOverlayViewModel
                    .badges.forEach(b => {
                        b = b.thumbnailBadgeViewModel
                        time = b.text
                    })
                }
            })
        }
    }
    catch(error) {console.log(error)}
    return {
        "id": id,
        "title": title,
        "thumbnail": thumbnail,
        "uploaderName": uploaderName,
        "uploaderUrl": uploaderId
                     ? "/channel/" + uploaderId : "",
        "uploaderId": uploaderId,
        "time": time,
        "views": viewCount,
        "badges": badges
    }
}
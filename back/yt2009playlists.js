const fetch = require("node-fetch")
const constants = require("./yt2009constants.json")
const yt2009html = require("./yt2009html")
const fs = require("fs")
const playlist_html = fs.readFileSync("../playlist.htm").toString();

let cache = require("./cache_dir/playlist_cache_manager")

let saved_playlists = {}

module.exports = {
    "applyPlaylistHTML": function(data, req) {
        let code = playlist_html;

        code = require("./yt2009loginsimulate")(req, code)

        code = code.replace("yt2009_playlist_name", data.name)
        code = code.replace("yt2009_playlist_description", data.description)
        code = code.split("yt2009_videos_count").join(data.videoCount)
        code = code.replace("yt2009_last_update", data.lastUpdate)
        code = code.replace("yt2009_playlist_views", data.views)
        code = code.replace("yt2009_creator_link", data.creatorUrl)
        code = code.replace("yt2009_creator_name", data.creatorName)

        if((req.headers.cookie || "").includes("shows_tab")) {
            // shows tab
            code = code.replace(`<a href="/channels">Channels</a>`, `<a href="/channels">Channels</a><a href="#">Shows</a>`)
        }

        let videos_html = ``
        data.videos.forEach(video => {
            videos_html += `
            <div class="video-cell" style="width:19.5%">
                <div class="video-entry yt-uix-hovercard">
                    <div class="v120WideEntry">
                        <div class="v120WrapperOuter">
                            <div class="v120WrapperInner"><a class="video-thumb-link" href="/watch?v=${video.id}&list=${data.playlistId}" rel="nofollow">
                                <img src="${video.thumbnail.replace("http", req.protocol)}" class="vimg120 yt-uix-hovercard-target"></a>
                                <!--<div class="video-time" style="position: relative;top: -6px;"><a href="/watch?v=${video.id}&list=${data.playlistId}" rel="nofollow">yt2009_video_time</a></div>-->
                            </div>
                        </div>
                    </div>

                    <div class="video-main-content">
                        <div class="video-title ">
                            <div class="video-long-title">
                                <a href="/watch?v=${video.id}&list=${data.playlistId}" class="yt-uix-hovercard-target" rel="nofollow">${video.title}</a>
                            </div>
                        </div>

                        <div class="video-description">
                            ${require("./yt2009html").get_video_description(video.id)}
                        </div>

                        <div class="video-facets">
                            <span class="video-rating-list ">
                                <div>
                                    <button class="master-sprite ratingVS ratingVS-4.5" title="4.5"></button>
                                </div>
                            </span>
                            <span class="video-rating-grid ">
                                <div>
                                    <button class="master-sprite ratingVS ratingVS-4.5" title="4.5"></button>
                                </div>
                            </span>
                            <span class="video-username"><a class="hLink" href="${video.uploaderUrl}">${video.uploaderName}</a></span>
                        </div>

                    </div>

                    <div class="video-clear-list-left"></div>
                </div>
            </div>`
        })

        if(data.videos[0]) {
            code = code.replace("/yt2009_playlist_thumbnail", data.videos[0].thumbnail)
            code = code.split("yt2009_watch_all_link").join(`/watch?v=${data.videos[0].id}&list=${data.playlistId}`)
        } else {
            code = code.split("yt2009_watch_all_link").join(`/`)
        }

        code = code.replace(`<!--yt2009_video_entries-->`, videos_html)

        return code;
    },

    "parsePlaylist": function(playlistId, callback) {
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
            fetch(`https://www.youtube.com/playlist?list=${playlistId}`, {
                "headers": constants.headers
            }).then(r => {r.text().then(response => {
                // parse danych z ytInitialData

                let ytInitialData = JSON.parse(response.split("var ytInitialData = ")[1].split(";</script>")[0])
                let playlistArray = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents


                // metadane
                let primarySidebar = ytInitialData.sidebar.playlistSidebarRenderer.items[0].playlistSidebarPrimaryInfoRenderer
                let owner = ""
                try {
                    owner = ytInitialData.sidebar.playlistSidebarRenderer.items[1].playlistSidebarSecondaryInfoRenderer.videoOwner.videoOwnerRenderer.title.runs[0]
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
                videoList.creatorUrl = owner.navigationEndpoint.browseEndpoint.canonicalBaseUrl
                try {
                    videoList.description = primarySidebar.description ? primarySidebar.description.simpleText.split("\n").splice(0, 3).join("<br>") : ""
                }
                catch(error) {}
                videoList.lastUpdate = lastUpdate
                videoList.videoCount = vidCount

                // filmy

                playlistArray.forEach(video => {
                    if(!video.playlistVideoRenderer) return;
                    video = video.playlistVideoRenderer
                    videoList.videos.push({
                        "id": video.videoId,
                        "title": video.title.runs[0].text,
                        "thumbnail": "http://i.ytimg.com/vi/" + video.videoId + "/hqdefault.jpg",
                        "uploaderName": video.shortBylineText.runs[0].text,
                        "uploaderUrl": video.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl
                    })
                })

                cache.write(playlistId, JSON.parse(JSON.stringify(videoList)))
                callback(cache.read()[playlistId])
            })})
        }
    }
}
const fs = require("fs");
const fetch = require("node-fetch");
const dominant_color = require("./dominant_color")
const yt2009utils = require("./yt2009utils");
const yt2009html = require("./yt2009html");
const yt2009constants = require("./yt2009constants.json")
const yt2009search = require("./yt2009search")
const yt2009languages = require("./language_data/language_engine")
const yt2009doodles = require("./yt2009doodles")
const n_impl_yt2009channelcache = require("./cache_dir/channel_cache")
const yt2009defaultavatarcache = require("./cache_dir/default_avatar_adapt_manager")
const wayback_channel = require("./cache_dir/wayback_channel")
const templates = require("./yt2009templates")
const config = require("./config.json")
const userid_cache = require("./cache_dir/userid_cache")
const overrideBgs = require("./channel_backgrounds.json")
const oldbanner_unavail_cache = require("./cache_dir/oldbanner_unavail_cache")

const channel_code = fs.readFileSync("../channelpage.htm").toString();

let saved_channels = {}
let saved_channel_comments = {}
let saved_channel_sections = {}
let saved_channel_playlists = {}

let featured_channels = require("./cache_dir/public_channel_listing.json")

module.exports = {
    "main": function(req, res, flags, sendRawData) {
        let requestTime = 0;
        let timingData = ""
        let timing = setInterval(function() {
            requestTime += 0.1
        }, 100)
        function writeTimingData(stage) {
            timingData += stage + " finish at: " + requestTime.toFixed(2) + "\n"
        }
        // url parse
        let url = ""
        url = yt2009utils.channelUrlMarkup(req.path)
        req = yt2009utils.addFakeCookie(req)
        // log if dev, use fmode
        let flashMode = (req.query.f == 1
                      || req.headers.cookie.includes("f_mode"))

        if(config.env == "dev") {
            console.log(`(${yt2009utils.get_used_token(req)}) channel ${url}`)
        }

        let applyHTML = this.applyHTML
        let getAdditionalSections = this.get_additional_sections

        userid_cache.read(url, (id) => {
            writeTimingData("userid get")
            // read from cache
            if((n_impl_yt2009channelcache.read("main")[url]
            || n_impl_yt2009channelcache.read("main")[id])
            && req.query.resetcache !== "1") {
                writeTimingData("cache retrieve")
                sendResponse(
                    n_impl_yt2009channelcache.read("main")[id]
                    || n_impl_yt2009channelcache.read("main")[url]
                )
            } else {
                // clean fetch the channel
                fetch(`https://www.youtube.com/youtubei/v1/browse?key=${
                    yt2009html.get_api_key()
                }`, {
                    "headers": yt2009constants.headers,
                    "referrer": "https://www.youtube.com/",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": JSON.stringify({
                        "context": yt2009constants.cached_innertube_context,
                        "browseId": id
                    }),
                    "method": "POST",
                    "mode": "cors"
                }).then(r => {r.json().then(r => {
                    writeTimingData("clean innertube fetch")
                    this.parse_main_response(r, flags, (data) => {
                        if(!data) {
                            res.send(`[yt2009] channel not found`)
                            return;
                        }
                        writeTimingData("main response parse")
                        sendResponse(data)
                    })
                })})
            }

            function sendResponse(data) {
                // send raw json data or full HTML
                if(sendRawData) {
                    res.send(data)
                } else {
                    getAdditionalSections(data, flags, () => {
                        writeTimingData("getAdditionalSections")
                        applyHTML(data, flags, (html => {
                            writeTimingData("applyHTML")
                            html = yt2009languages.apply_lang_to_code(html, req)
                            html = yt2009doodles.applyDoodle(html)
                            if(html.includes(` (0)</div>`)) {
                                html = html.split(` (0)</div>`).join(`</div>`)
                            }
                            html = html.replace("yt2009_timings", timingData)
                            res.send(html)
                            clearInterval(timing)
                        }), req, flashMode)
                    })
                }
                n_impl_yt2009channelcache.write("main", id, data)
            }
        })
    },

    /*
    ========
    parse channel response, get videos
    ========
    */
    "parse_main_response": function(r, flags, callback) {
        let fetchesRequired = 3;
        if(config.use_pb) {
            fetchesRequired = 2;
        }
        let additionalFetchesCompleted = 0;

        // basic extract
        let data = {}
        if(!r.metadata) {
            callback(false)
            return;
        }
        data.name = r.metadata.channelMetadataRenderer.title
        data.id = r.header.c4TabbedHeaderRenderer.channelId
        data.url = r.metadata.channelMetadataRenderer.channelUrl
        if(r.header.c4TabbedHeaderRenderer.channelHandleText) {
            data.handle = r.header.c4TabbedHeaderRenderer
                           .channelHandleText.runs[0].text
        }
        data.properties = {
            "name": r.metadata.channelMetadataRenderer.title,
            "subscribers": r.header.c4TabbedHeaderRenderer.subscriberCountText
                         ? r.header.c4TabbedHeaderRenderer.subscriberCountText
                                   .simpleText.replace(" subscribers", "")
                         : "",
            "description": r.metadata.channelMetadataRenderer.description
                            .split("\n").join("<br>") || ""
        }
        data.videos = []
        try {
            data.videoCount = r.header.c4TabbedHeaderRenderer
                               .videosCountText.runs[0].text
        }
        catch(error) {}

        // fetch videos tab
        let videosTabAvailable = false;
        data.tabParams = {}
        if(config.use_pb) {
            const popularVids = require("./proto/popularVidsChip_pb")
            let vidsContinuation = new popularVids.vidsChip()
            let msg = new popularVids.vidsChip.nestedMsg1()
            msg.setChannelid(data.id)
            // need to figure out what that does, leaving it in as it's
            // what came out of decode
            msg.setChipparam(
                "8gYuGix6KhImCiQ2NTMyYTQzMi0wMDAwLTI3ODQtOTYzOC0xNGMxNGVmNDA5YjAYAg%3D%3D"
            )
            vidsContinuation.addMsg(msg)
            let chip = encodeURIComponent(Buffer.from(
                vidsContinuation.serializeBinary()
            ).toString("base64"))
            fetchChip(chip)
        }
        r.contents.twoColumnBrowseResultsRenderer.tabs.forEach(tab => {
            if(tab.tabRenderer
            && tab.tabRenderer.title.toLowerCase() == "videos"
            && !config.use_pb) {
                videosTabAvailable = true;
                setTimeout(function() {
                    let param = tab.tabRenderer.endpoint
                                   .browseEndpoint.params
                    let browseId = tab.tabRenderer.endpoint
                                      .browseEndpoint.browseId
                    getVideosByParam(param, browseId)
                }, 162)
            }

            // get params for other tabs for future use
            try {
                let tabName = tab.tabRenderer.title.toLowerCase()
                let param = tab.tabRenderer.endpoint.browseEndpoint.params
                data.tabParams[tabName] = param
            }
            catch(error) {}
        })

        function getVideosByParam(param, browseId) {
            fetch(`https://www.youtube.com/youtubei/v1/browse?key=${
                yt2009html.get_api_key()
            }`, {
                "headers": yt2009constants.headers,
                "referrer": "https://www.youtube.com/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": JSON.stringify({
                    "context": yt2009constants.cached_innertube_context,
                    "browseId": browseId,
                    "params": param
                }),
                "method": "POST",
                "mode": "cors"
            }).then(r => {r.json().then(r => {
                // videos tab response, send a popular chip click after that
                additionalFetchesCompleted++
                r.contents.twoColumnBrowseResultsRenderer.tabs.forEach(tab => {
                    if(tab.tabRenderer
                    && tab.tabRenderer.selected) {
                        let h = tab.tabRenderer.content.richGridRenderer.header
                        if(h
                        && h.feedFilterChipBarRenderer
                        && h.feedFilterChipBarRenderer.contents) {
                            h.feedFilterChipBarRenderer.contents.forEach(chip => {
                                // https://www.youtube.com/watch?v=WIRK_pGdIdA
                                if(chip.chipCloudChipRenderer.text.simpleText
                                .toLowerCase() == "popular") {
                                    fetchChip(
                                        chip.chipCloudChipRenderer
                                        .navigationEndpoint.continuationCommand
                                        .token
                                    )
                                }
                            })
                        } else {
                            // no chips :( we gotta continue tho
                            createVideosFromChip(
                                tab.tabRenderer.content.richGridRenderer
                                   .contents
                            )
                        }
                    }
                })
            })})
        }

        function fetchChip(chipToken) {
            fetch(`https://www.youtube.com/youtubei/v1/browse?key=${
                yt2009html.get_api_key()
            }`, {
                "headers": yt2009constants.headers,
                "referrer": "https://www.youtube.com/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": JSON.stringify({
                    "context": yt2009constants.cached_innertube_context,
                    "continuation": chipToken
                }),
                "method": "POST",
                "mode": "cors"
            }).then(r => {r.json().then(r => {
                if(!r.onResponseReceivedActions) {
                    createVideosFromChip([])
                    return;
                }
                r.onResponseReceivedActions.forEach(action => {
                    if(action.reloadContinuationItemsCommand.slot
                    == "RELOAD_CONTINUATION_SLOT_BODY") {
                        videosTabAvailable = true
                        createVideosFromChip(
                            action.reloadContinuationItemsCommand
                                  .continuationItems
                        )
                    }
                })
            })})
        }

        function createVideosFromChip(chip) {
            chip.forEach(video => {
                if(video.richItemRenderer || video.gridVideoRenderer) {
                    video = (video.richItemRenderer || video.gridVideoRenderer)
                            .content.videoRenderer
                    data.videos.push({
                        "id": video.videoId,
                        "title": video.title.runs[0].text,
                        "views": (video.viewCountText
                              || {"simpleText": "0 views"}).simpleText,
                        "upload": video.publishedTimeText.simpleText,
                        "thumbnail": "http://i.ytimg.com/vi/"
                                    + video.videoId
                                    + "/hqdefault.jpg",
                        "length": (video.lengthText || {"simpleText": "00:00"})
                                  .simpleText
                    })
                }
            })
            additionalFetchesCompleted++;
            onVideosCreate()
        }

        // fallback: no videos tab (eg topic channels)
        if(!videosTabAvailable && !config.use_pb) {
            additionalFetchesCompleted = fetchesRequired
            try {
                r.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer
                 .content.sectionListRenderer.contents[0].itemSectionRenderer
                 .contents[0].gridRenderer.items.forEach(video => {
                    if(video.gridVideoRenderer) {
                        video = video.gridVideoRenderer
                        data.videos.push({
                            "id": video.videoId,
                            "title": video.title.runs[0].text,
                            "views": video.viewCountText.simpleText,
                            "upload": video.publishedTimeText.simpleText,
                            "thumbnail": "http://i.ytimg.com/vi/"
                                        + video.videoId
                                        + "/hqdefault.jpg",
                            "length": (video.lengthText || {"simpleText": "00:00"})
                                      .simpleText
                        })
                    }
                })
            }
            catch(error) {
                try {
                    r.contents.twoColumnBrowseResultsRenderer.tabs[1]
                     .tabRenderer.content.richGridRenderer
                     .contents.forEach(video => {
                        if(video.richItemRenderer) {
                            video = video.richItemRenderer
                                    .content.videoRenderer
                            data.videos.push({
                                "id": video.videoId,
                                "title": video.title.runs[0].text,
                                "views": video.viewCountText.simpleText,
                                "upload": video.publishedTimeText.simpleText,
                                "thumbnail": "http://i.ytimg.com/vi/"
                                            + video.videoId
                                            + "/hqdefault.jpg",
                                "length": (video.lengthText || {"simpleText": "00:00"})
                                          .simpleText
                            })
                        }
                    })
                }
                catch(error) {}
            }
            onVideosCreate()
        }

        // exec when videos are done fetching
        function onVideosCreate() {
            if(additionalFetchesCompleted >= fetchesRequired) {
                callback(data)
            }

            // final things, dominant color and such
            // save avatar
            let avatar = r.header.c4TabbedHeaderRenderer.avatar.thumbnails[1].url
            let fname = avatar.split("/")[avatar.split("/").length - 1]
            if(!fs.existsSync(`../assets/${fname}.png`)) {
                yt2009utils.saveAvatar(avatar)
            }
            data.avatar = `/assets/${fname}.png`

            // get the dominant color from the banner
            try {
                let banner = r.header.c4TabbedHeaderRenderer.banner.thumbnails[0].url
                let banner_fname = banner.split("/")[banner.split("/").length - 1]
                data["banner"] = banner_fname + ".png"
                yt2009utils.get_dominant_color(banner, (color) => {
                    data["dominant_color"] = color;
                    additionalFetchesCompleted++;
                    if(additionalFetchesCompleted >= fetchesRequired) {
                        callback(data)
                    }
                })
            }
            catch(error) {
                data["dominant_color"] = [180, 180, 180]
                additionalFetchesCompleted++;
                if(additionalFetchesCompleted >= fetchesRequired) {
                    callback(data)
                }
            }
        }
    },

    /*
    ========
    fetch additional sections, such as channels
    ========
    */

    "get_additional_sections": function(data, flags, callback) {
        // mark a step as done
        let callbacksRequired = 3;
        let callbacksMade = 0;
        function markCompleteStep() {
            callbacksMade++;
            if(callbacksMade == callbacksRequired) {
                callback()
            }
        }


        // comments
        if(data.videos[0]) {
            let video = data.videos[0]
            if(saved_channel_comments[video.id]) {
                markCompleteStep()
            } else {
                yt2009html.get_video_comments(video.id, (comments) => {
                    saved_channel_comments[video.id] = JSON.parse(
                        JSON.stringify(comments)
                    );
                    markCompleteStep()
                })
            }
        } else {
            markCompleteStep()
        }

       // friends
       let channels_list = {}
       if(n_impl_yt2009channelcache.read("friend")[data.id]
       || !data.tabParams
       || !data.tabParams["channels"]) {
           markCompleteStep()
       } else {
           yt2009utils.channelGetSectionByParam(
               data.id, data.tabParams["channels"], (r => {
                   let tab = yt2009utils.channelJumpTab(r, "channels").content
                   try {
                       channels_list = yt2009utils.parseChannelsSections(
                           tab.sectionListRenderer.contents,
                           tab.sectionListRenderer.subMenu
                       )
                   }
                   catch(error) {}
           
                   n_impl_yt2009channelcache.write(
                       "friend",
                       data.id,
                       JSON.parse(JSON.stringify(channels_list))
                   )
                   markCompleteStep()
               }
           ))
       }


       // playlists
       let playlist_list = {}
       if(n_impl_yt2009channelcache.read("playlist")[data.id]
       || !data.tabParams
       || !data.tabParams["playlists"]) {
           markCompleteStep()
       } else {
           yt2009utils.channelGetSectionByParam(
               data.id, data.tabParams["playlists"], (r => {
                   let tab = yt2009utils.channelJumpTab(r, "playlists")
                                       .content
                                       .sectionListRenderer.contents[0]
                                       .itemSectionRenderer.contents[0]
                   try {
                       playlist_list = yt2009utils.parseChannelPlaylists(tab)
                   }
                   catch(error) {}
        
                   n_impl_yt2009channelcache.write(
                       "playlist",
                       data.id,
                       JSON.parse(JSON.stringify(playlist_list))
                   )
                   markCompleteStep()
               }
           ))
       }
    },

    /*
    ========
    create channel page html
    ========
    */
    "applyHTML": function(data, flags, callback, req, flashMode) {
        let env = config.env
        let code = channel_code;
        let stepsRequiredToCallback = 0;
        let requireMoreFetch = false;
        let videosSource = data.videos;
        let stepsTaken = 0;
        let channelCommentCount = 0;

        // wayback_features init
        let wayback_settings = ""
        let channelUrl = req.originalUrl.split("?")[0]
                                        .split("&")[0]
                                        .split("#")[0]
        if(channelUrl.startsWith("/")) {
            channelUrl = channelUrl.replace("/", "")
        }
        if(flags.includes("wayback_features")
        && channelUrl.includes("user/")) {
            wayback_settings = decodeURIComponent(
                flags.split("wayback_features")[1].split(";")[0]
            )
            if(wayback_settings.includes("all")) {
                wayback_settings = "fields+basic+sections+comments"
            }

            stepsRequiredToCallback++
        }

        if(flags.includes("banners")) {
            stepsRequiredToCallback++;
        }
        
        /*
        =======
        basic data & flag handling
        =======
        */
        // fill channel name & its flags
        let channelName = yt2009utils.textFlags(
            yt2009utils.xss(data.name), flags, data.url
        )
        if(!channelName && flags.includes("username_asciify")) {
            channelName = data.handle.replace("@", "")
                        || yt2009utils.asciify(data.name, true, false)
        }
        if(flags.includes("author_old_names")
        && channelUrl.includes("user/")) {
            channelName = channelUrl.split("user/")[1]
                                    .split("?")[0]
                                    .split("#")[0]
            channelName = yt2009utils.xss(channelName)
        }
        code = code.split("yt2009_channel_name").join(channelName)

        // channel avatar
        let channelAvatar = data.avatar
        if(flags.includes("default_avataradapt")) {
            if(yt2009defaultavatarcache.use(`../${data.avatar}`)) {
                channelAvatar = "/assets/site-assets/default.png"
            }
        } else if(
            flags.includes("default_avatar")
        && !flags.includes("default_avataradapt")
        ) {
            channelAvatar = "/assets/site-assets/default.png"
        }
        if(!wayback_settings.includes("basic")) {
            code = code.split("yt2009_channel_avatar").join(channelAvatar)
        }

        // custom colors
        // main background
        function defaultBg() {
            let mainBg = yt2009utils.createRgb([
                data.dominant_color[0] + 20,
                data.dominant_color[1] + 20,
                data.dominant_color[2] + 20
            ])
            if(flags.includes("default_color")) {
                mainBg = yt2009utils.createRgb([200, 200, 200])
            }
            if(!flags.includes("banners")) {
                code = code.split("yt2009_main_bg").join(mainBg)
            }
    
            // darker background
            let darkerBg = [
                data.dominant_color[0] - 45,
                data.dominant_color[1] - 45,
                data.dominant_color[2] - 45
            ]
            if(darkerBg[0] < 0
            || darkerBg[1] < 0
            || darkerBg[2] < 0) {
                darkerBg = data.dominant_color
            }
            let darkBg = yt2009utils.createRgb(darkerBg)
            if(flags.includes("default_color")) {
                mainBg = yt2009utils.createRgb([135, 135, 135])
            }
            if(!flags.includes("banners")) {
                code = code.split("yt2009_darker_bg").join(darkBg)
            }

            // find text color
            if(data.dominant_color[0] + data.dominant_color[1] >= 340
            || flags.includes("default_color")) {
                code = code.split("yt2009_text_color").join("black")
                code = code.split("yt2009_black").join("icon_black")
            } else {
                code = code.split("yt2009_text_color").join("white")
            }
        }
        if(!flags.includes("banners")) {defaultBg()}
        
        // use_ryd clientside
        if(flags.includes("use_ryd")) {
            code = code.replace(`<!--yt2009_ryd_set-->`, `
            <script>
                use_ryd = true;
                use_ryd_first_video();
            </script>`)
        }

        // shows_tab
        if(flags.includes("shows_tab")) {
            code = code.replace(
                `<a href="/channels">lang_channels</a>`,
                `<a href="/channels">lang_channels</a><a href="#">lang_shows</a>`
            )
        }

        // check if cookie subscribed
        let subList = yt2009utils.get_subscriptions(req)
        let subscribed = false;
        subList.forEach(sub => {
            if(sub.url.length > 1
            && ("/" + req.path).includes(sub.url)) {
                subscribed = true;
            }
        })

        if(subscribed) {
            code = code.split(
                `class="subscribe-div yt2009-subscribe-button-hook"`
            ).join(
                `class="subscribe-div yt2009-subscribe-button-hook hid"`
            )
        } else {
            code = code.split(
                `class="yt2009-unsubscribe-button-hook"`
            ).join(
                `class="yt2009-unsubscribe-button-hook hid"`
            )
        }

        /*
        =======
        videos
        =======
        */
        let scrollbox_all_html = ``
        let videoUploadDates = {}
        let video_index = 0;
        let watch_url = "/watch.swf"
        let watch_arg = "video_id"
        function videosRender() {
            // "All" scrollbox
            let scrollbox_all_videos = JSON.parse(JSON.stringify(videosSource))
                                        .splice(0, 10)
            scrollbox_all_videos.forEach(video => {
                let views = yt2009utils.viewFlags(video.views, flags)
                views = yt2009utils.playnavViewCount(
                    views, yt2009languages.get_language(req)
                )
                let ratings_est = yt2009utils.estRating(views)
                let upload_date = yt2009utils.timeFlags(video.upload, flags)
                videoUploadDates[video.id] = upload_date;
                scrollbox_all_html += templates.playnavVideo(
                    video,
                    video_index,
                    views,
                    yt2009utils.relativeTimeCreate(
                        upload_date, yt2009languages.get_language(req)
                    ),
                    ratings_est,
                    req.protocol
                )
                video_index++;
            })
            code = code.replace(
                "<!--yt2009_all_scrollbox_uploads-->",
                scrollbox_all_html
            )
            // "Videos" scrollbox
            let scrollbox_videos_html = ``
            let scrollbox_videos = JSON.parse(JSON.stringify(videosSource))
            video_index = 0;
            scrollbox_videos.forEach(video => {
                let views = yt2009utils.viewFlags(video.views, flags)
                views = yt2009utils.playnavViewCount(
                    views, yt2009languages.get_language(req)
                )
                let ratings_est = yt2009utils.estRating(views)
                let upload_date = yt2009utils.timeFlags(video.upload, flags)
                videoUploadDates[video.id] = upload_date
                scrollbox_videos_html += templates.playnavVideo(
                    video,
                    video_index,
                    views,
                    yt2009utils.relativeTimeCreate(
                        upload_date, yt2009languages.get_language(req)
                    ),
                    ratings_est,
                    req.protocol
                )
                video_index++;
            })
            code = code.replace(
                "<!--yt2009_uploads-->",
                scrollbox_videos_html
            )


            /*
            =======
            header video
            =======
            */
            if(videosSource[0]) {
                let video = videosSource[0]
                let views = yt2009utils.viewFlags(video.views, flags)
                                    .replace(" views", "")
                let rating_est = yt2009utils.estRating(views)

                // metadata
                code = code.replace("yt2009_head_video_title", video.title)
                code = code.replace("yt2009_head_video_views", views)
                code = code.replace("yt2009_head_video_ratings", rating_est)
                code = code.split("yt2009_head_video_id").join(video.id)

                code = code.replace(
                    "yt2009_head_video_short_description",
                    yt2009html.get_video_description(video.id)
                            .split("\n")
                            .splice(0, 3)
                            .join("<br>")
                )
                code = code.replace(
                    "yt2009_head_video_upload",
                    yt2009utils.relativeTimeCreate(
                        videoUploadDates[video.id],
                        yt2009languages.get_language(req)
                    )
                )

                // use video comments as channel comments
                // if not overriden by wayback_features
                let comments_html = ``
                if(saved_channel_comments[video.id]
                && saved_channel_comments[video.id].length > 0
                && flags.includes("exp_fill_comments")
                && !wayback_settings.includes("comments")) {
                    let comments = saved_channel_comments[video.id]
                    let count = 0;
                    comments.forEach(comment => {
                        try {
                            if (comment.content.includes("video")) return;
                            let showComment = true;
                            yt2009constants.comments_remove_future_phrases.forEach(phrase => {
                                if(comment.content.split("\n")[0].includes(phrase)) {
                                    showComment = false
                                }
                            })
                            let authorAvatar = yt2009utils.fakeAvatarFlags(
                                yt2009utils.saveAvatar(
                                    comment.authorAvatar
                                ),
                                flags
                            )
                            let authorName = yt2009utils.textFlags(
                                comment.authorName,
                                flags,
                                comment.authorUrl
                            )

                            if(showComment) {
                                comments_html += templates.channelComment(
                                    comment.authorUrl,
                                    authorAvatar,
                                    authorName,
                                    yt2009utils.timeFlags(comment.time, flags),
                                    comment.content.split("\n")[0]
                                )
                                count++;
                            }
                        }
                        catch(error) {}
                    })
                    
                    code = code.replace(`<!--yt2009_comments-->`, comments_html)
                    code = code.replace(`yt2009_channel_comment_count`, count)
                } else {
                    code = code.replace(
                        `<!--yt2009_no_comments-->`,
                        `<div class="alignC">There are no comments for this user.</div>`
                    )
                }

                // determine the used player (html5/flash)
                // and use it in playnav
                if(!flashMode) {
                    code = code.replace(
                        "<!--yt2009_player-->",
                        templates.html5Embed(video.id, "yt2009_playhead")
                    )
                } else {
                    // fmode~!!
                    if(req.headers.cookie.includes("alt_swf_path=")) {
                        watch_url = decodeURIComponent(
                            req.headers.cookie.split("alt_swf_path=")[1]
                                            .split(";")[0]
                        )
                    }
                    if(req.headers.cookie.includes("alt_swf_arg=")) {
                        watch_arg = req.headers.cookie.split("alt_swf_arg=")[1]
                                                    .split(";")[0]
                    }

                    
                    let flashUrl = `${watch_url}?${watch_arg}=${video.id}`
                    if(req.headers.cookie.includes("f_h264=on")) {
                        flashUrl += "%2Fmp4"
                    }
                    if(req.headers.cookie.includes("f_h264=on")
                    && watch_url == "/watch.swf") {
                        let fmtMap = "5/0/7/0/0"
                        let fmtUrls = `5|http://${config.ip}:${
                            config.port
                        }/channel_fh264_getvideo?v=${video.id}`
                        flashUrl += `&fmt_map=${encodeURIComponent(fmtMap)}`
                        flashUrl += `&fmt_url_map=${encodeURIComponent(fmtUrls)}`
                    }
                    if(watch_url == "/watch.swf") {
                        flashUrl += `&iv_module=http%3A%2F%2F`
                        + `${config.ip}%3A${config.port}%2Fiv_module.swf`;
                    }
                    code = code.replace(
                        "<!--yt2009_player-->",
                        templates.flashObject(flashUrl)
                    )
                    code = code.replace(
                        `//yt2009-f-custom-player`,
                        `var customPlayerUrl = "${watch_url}";
                        var customPlayerArg = "${watch_arg}"`
                    )
                }
            } else {
                // no videos
                code = code.replace(
                    `id="playnav-body"`, `id="playnav-body" class="hid"`
                )
                code = code.replace(
                    `id="playnav-navbar"`, `id="playnav-navbar" class="hid"`
                )
                code = code.replace(
                    `id="playnav-navbar-toggle"`,
                    `id="playnav-navbar-toggle" class="hid"`
                )
                code = code.replace(
                    `<div id="playnav-navbar"`,
                    `<div style="float:left;padding-top: 1.2em" class="inner-box">
                ${yt2009utils.xss(channelName)} has no videos available.</div><div id="playnav-navbar"`
                )
                code = code.replace(
                    `//[yt2009-hook-no-videos]`,
                    `$("#channel-body").style.height = window.innerHeight - 78 + "px"`
                )
                code = code.replace(
                    `yt2009_channel_comment_count`,
                    channelCommentCount
                )
                code = code.replace(
                    `<!--yt2009_no_comments-->`,
                    `<div class="alignC">There are no comments for this user.</div>`
                )

                if(!wayback_settings.includes("comments")) {
                    stepsTaken++;
                    setTimeout(function() {
                        if(stepsRequiredToCallback == stepsTaken) {
                            try {callback(code)}catch(error) {}
                        }
                    }, 100)
                }
            }
        }

        if(!flags.includes("only_old")) {
            videosRender();
        }

        /*
        =======
        login_simulate
        =======
        */
        let returnNoLang = req.headers.cookie.includes("lang=") || req.query.hl || false
        code = require("./yt2009loginsimulate")(flags, code, returnNoLang)

        /*
        =======
        fixups for f_mode
        =======
        */
        if(flashMode) {
            code = code.replace(`<!DOCTYPE html>`, templates.html4)
            code = code.replace(
                `id="playnav-player" class="playnav-player-container"`,
                `id="playnav-player" class="playnav-mvlf9xls playnav-player-container"`
            )
            code = code.replace(
                `><span style="display: block;">Search`,
                ` style="width: 40px;"><span>Search`
            )
            code = code.replace(
                `onclick="document.searchForm.submit();"`,
                `onclick="document.searchForm.submit();" style="width: 40px;"`
            )
            code = code.replace(
                `<!--yt2009_f-->`,
                `<script src="/assets/site-assets/f_script.js"></script>`
            )
            code = code.replace(
                `<script src="/assets/site-assets/channelpage.js"></script>`,
                ``
            )
            code = code.replace(
                `<!--yt2009_style_fixes_f-->`,
                `<link rel="stylesheet" href="/assets/site-assets/f.css">`
            )
            if(req.headers["user-agent"].includes("MSIE")) {
                code = code.split(`playnav-video selected`).join(`playnav-video`)
            }
        }

        /*
        =======
        data.properties
        =======
        */
        let properties_html = ``
        let swapTable = {
            "name": "lang_channel_field_name",
            "subscribers": "lang_channel_subscribers",
            "description": "lang_channel_field_description"
        }
        for(let p in data.properties) {
            let p_uppercase = yt2009utils.firstUppercase(p)
            let value = data.properties[p]
            if(p == "name") {
                value = yt2009utils.xss(value)
            }
            let valueMarkup = yt2009utils.markupDescription(value)

            properties_html += templates.channelProperty(
                swapTable[p], valueMarkup
            )
        }
        if(!wayback_settings.includes("fields")) {
            code = code.replace(
                "<!--yt2009_properties-->", properties_html
            )
        }

        /*
        =======
        exp_friends
        =======
        */
        let subscriptions_count = 0;
        let friends_count = 0;
        if(n_impl_yt2009channelcache.read("friend")[data.id]
        && !wayback_settings.includes("sections")) {
            let friends = n_impl_yt2009channelcache.read("friend")[data.id]
            let subscriptions_html = ``
            let friends_html = ``
            for(let list in friends) {
                if(list == "Subscriptions") {
                    friends[list].splice(0, 6).forEach(sub => {
                        let url = sub.url
                        if(!url.startsWith("/c/")
                        && !url.startsWith("/channel/")
                        && !url.startsWith("/user/")) {
                            url = "/channel/" + sub.id
                        }
                        let name = yt2009utils.textFlags(sub.name, flags, url)
                        subscriptions_html += templates.channelUserPeep(
                            name,
                            url,
                            yt2009utils.saveAvatar(sub.avatar),
                            false
                        )
                        subscriptions_count++
                    })
                } else {
                    friends[list].splice(0, 12).forEach(friend => {
                        let url = friend.url
                        if(!url.startsWith("/c/")
                        && !url.startsWith("/channel/")
                        && !url.startsWith("/user/")) {
                            url = "/channel/" + friend.id
                        }
                        let name = yt2009utils.textFlags(friend.name, flags, url)
                        friends_html += templates.channelUserPeep(
                            name,
                            url,
                            yt2009utils.saveAvatar(friend.avatar),
                            true
                        )
                        friends_count++
                    })
                }
            }

            code = code.replace(`<!--yt2009_subs-->`, subscriptions_html)
            code = code.replace(`<!--yt2009_default_friends-->`, friends_html)

            if(friends_html == "") {
                code = code.replace(
                    `yt2009-default-friends-mark`,
                    `yt2009-default-friends-mark hid`
                )
            }
            if(subscriptions_html == "") {
                code = code.replace(
                    `yt2009-subscriptions-mark`,
                    `yt2009-subscriptions-mark hid`
                )
            }
        }
        code = code.replace("yt2009_subscriptions_count", subscriptions_count)
        code = code.replace("yt2009_friends_count", friends_count)

        /*
        =======
        exp_playlists
        =======
        */
        let all_scrollbox_playlists_html = templates.allScrollboxPlaylistHead
        let playlists_scrollbox_html = templates.playlistScrollboxHead
        let savedPlaylists = n_impl_yt2009channelcache.read("playlist")[data.id]
        if(flags.includes("exp_playlists")
        && savedPlaylists && savedPlaylists.length > 0) {
            let playlists = n_impl_yt2009channelcache.read("playlist")[data.id]

            // "all" scrollbox playlists
            JSON.parse(JSON.stringify(playlists)).splice(0, 5).forEach(playlist => {
                all_scrollbox_playlists_html += templates.playnavPlaylist(
                    playlist, req.protocol, true
                )
            })
            all_scrollbox_playlists_html += templates.allScrollboxPlaylistEnd
            code = code.replace(
                "<!--yt2009_all_scrollbox_playlists-->",
                all_scrollbox_playlists_html
            )

            // playlists scrollbox
            JSON.parse(JSON.stringify(playlists)).forEach(playlist => {
                if(playlist.name == "Favorites") {
                    code = code.replace(`yt2009_favorites_remove_end-->`, "")
                    code = code.replace(
                        `<!--yt2009_favorites_remove_start`, ""
                    )
                    code = code.replace(
                        `yt2009_favorites_id_value`, playlist.id
                    )
                }
                playlists_scrollbox_html += templates.playnavPlaylist(
                    playlist, req.protocol, true
                )
            })
            playlists_scrollbox_html += templates.playlistScrollboxEnd

            // show playlist btn
            code = code.replace(`<!--yt2009_playlists_remove_start`, "")
            code = code.replace(`yt2009_playlists_remove_end-->`, "")
            code = code.replace(
                "<!--yt2009_playlists_scrollbox-->",
                playlists_scrollbox_html
            )
        }

        /*
        =======
        only_old
        =======
        */
        let onlyOldVideos = []
        if(flags.includes("only_old")) {
            if(data.videos.length <= 0) {
                videosRender()
                return;
            }
            stepsRequiredToCallback++;
            let only_old = yt2009search.handle_only_old(flags)
            let query = `"${data.name}" ${only_old}`
            yt2009search.get_search(query, flags, "", (results => {
                // throw actual results into data.videos
                // they use the same value names!! no parsing necessary
                results.forEach(result => {
                    if(result.type == "video"
                    && (data.name.includes(
                        result.author_name.split(" ").join("")
                    ) || data.name == result.author_name)) {
                        onlyOldVideos.push(result)
                    }
                })
                // main and render
                videosSource = onlyOldVideos;
                // if no videos with only_old and at least one without it,
                // use default
                if(!onlyOldVideos[0] && data.videos[0]) {
                    videosSource = data.videos;
                }
                // get comments for vid
                if(onlyOldVideos[0]
                && !saved_channel_comments[onlyOldVideos[0].id]) {
                    let id = onlyOldVideos[0].id
                    yt2009html.get_video_comments(id, (comments) => {
                        saved_channel_comments[id] = comments.slice();
                        videosRender();
                        stepsTaken++
                        if(stepsTaken >= stepsRequiredToCallback) {
                            try{callback(code)}catch(error){}
                        }
                    })
                } else {
                    videosRender();
                    stepsTaken++
                    if(stepsTaken >= stepsRequiredToCallback) {
                        try{callback(code)}catch(error){}
                    }
                }
                
            }), yt2009utils.get_used_token(req), false)
        }

        /*
        =======
        wayback_features render section
        =======
        */
        function wayback_render_section(
            sectionName, sectionArray, fullHTML, useSixColumn
        ) {
            let html = ``
            if(fullHTML) {
                html = templates.channelSectionHTMLBegin(sectionName)
            }
            let realCount = 0
            sectionArray.forEach(user => {
                if(user.type == "count") {
                    realCount = user.count;
                    return;
                }
                html += `\n${templates.channelUserPeep(
                    user.link.split("/")[user.link.split("/").length - 1],
                    user.link.split("youtube.com")[1],
                    user.icon,
                    useSixColumn
                )}`
            })
            if(fullHTML) {
                html += `\n${templates.channelSectionHTMLEnd()}`
            }
            if(realCount !== 0) {
                code = code.split(`yt2009_${sectionName}_count`, realCount)
            } else {
                code = code.split(`(yt2009_${sectionName}_count)`, ``)
            }

            return html;
        }

        /*
        =======
        wayback_features
        =======
        */
        if(flags.includes("wayback_features")
        && channelUrl.includes("user/")) {
            wayback_channel.read(
                channelUrl,
                (waybackData => {

                /*
                =======
                basic
                =======
                */
                if(wayback_settings.includes("basic")) {
                    if(waybackData.avatarUrl) {
                        code = code.split(`yt2009_channel_avatar`)
                                    .join(waybackData.avatarUrl)
                    } else {
                        code = code.split("yt2009_channel_avatar")
                                   .join(channelAvatar)
                    }
                    
                    
                    let customCSS = ""
                    if(typeof(waybackData.customCSS) == "string") {
                        customCSS = waybackData.customCSS
                    }

                    let innerBoxColor = ""
                    if(customCSS.includes(".inner-box-colors { background")) {
                        try {
                            innerBoxColor = customCSS.split(
                                            ".inner-box-colors { background")[1]
                                            .split("}")[0].split(":")[1].trim()
                        }
                        catch(error) {}
                    }

                    code = code.replace(
                        `<!--yt2009_wayback_channel_custom_css-->`,
                        `<style type="text/css"
                id="channel-theme-css"
                name="channel-theme-css">
                        ${customCSS}
    
    
                        /*yt2009*/
                        .panel-tab-indicator-cell svg,
                        .playnav-video.selected{
                            fill: ${innerBoxColor || "none"};
                            background: transparent;
                        }
                        </style>`
                    )
                }

                
                /*
                =======
                fields
                =======
                */
                if(wayback_settings.includes("fields")
                && waybackData.fields.length > 0) {
                    let fieldsHTML = ``
                    waybackData.fields.forEach(field => {
                        if(field.value.includes("float:left")
                        || field.value.includes("float: left")) {
                            fieldsHTML += `
                            <div class="show_info outer-box-bg-as-border">
                                ${field.value}
                            </div>`
                        } else {
                            fieldsHTML += `
                            <div class="show_info outer-box-bg-as-border">
                                <div style="float:left;font-weight:bold;">${
                                    field.name
                                }</div>
                                <div style="float:right;" id="profile_show_${
                                    field.name.replace(/[^a-zA-Z]/g, "")
                                                .toLowerCase()
                                }">${field.value}</div>
                                <div class="cb"></div>
                            </div>`
                        }
                    })
    
                    code = code.replace(
                        `<!--yt2009_wayback_properties-->`,
                        fieldsHTML
                    )
                }

                /*
                =======
                sections
                =======
                */
                if(wayback_settings.includes("sections")
                && (waybackData.friends.length > 0
                || waybackData.subscribers.length > 0
                || waybackData.subscriptions.length > 0)) {
                    // slots determine where on the page the section
                    // is displayed.
                    //
                    // slot1 - left
                    // slot2 - right

                    // friends
                    if(waybackData.friends
                    && waybackData.friends.length > 0) {
                        let useSixColumnRender = false;
                        let slot = "yt2009_friends_slot1" // slot1
                        if(waybackData.friends.length >= 6) {
                            useSixColumnRender = true;
                            slot = "yt2009_friends_slot2"
                        }
                        code = code.replace(
                            `<!--${slot}-->`,
                            wayback_render_section(
                                "friends",
                                waybackData.friends,
                                true,
                                useSixColumnRender
                            )
                        )
                        code = code.replace(
                            ` (yt2009_friends_count)`,
                            ``
                        )
                        code = code.replace(
                            `yt2009-default-friends-mark`,
                            `yt2009-default-friends-mark hid`
                        )
                    } else {
                        code = code.replace(
                            `yt2009-friends-mark`,
                            `yt2009-friends-mark hid`
                        )
                    }
    
                    // subscriptions
                    if(waybackData.subscriptions
                    && waybackData.subscriptions.length > 0) {
                        code = code.replace(
                            `<!--yt2009_subs-->`,
                            wayback_render_section(
                                "subscriptions",
                                waybackData.subscriptions,
                                false
                            )
                        )
                        code = code.split(
                            ` (yt2009_subscriptions_count)`
                        ).join("")
                    } else {
                        code = code.replace(
                            `yt2009-subscriptions-mark`,
                            `yt2009-subscriptions-mark hid`
                        )
                    }
    
                    // subscribers
                    if(waybackData.subscribers
                    && waybackData.subscribers.length > 0) {
                        let useSixColumnRender = false;
                        let slot = "yt2009_wayback_subscribers_slot1"
                        if(waybackData.subscribers.length >= 6) {
                            slot = "yt2009_wayback_subscribers_slot2"
                            useSixColumnRender = true;
                        }
                        code = code.replace(
                            `<!--${slot}-->`,
                            wayback_render_section(
                                "subscribers",
                                waybackData.subscribers,
                                true,
                                useSixColumnRender
                            )
                        )
                        code = code.replace(
                            ` (yt2009_subscribers_count)`,
                            ``
                        )
                    }
                }

                /*
                =======
                comments
                =======
                */
                if(wayback_settings.includes("comments")
                && waybackData.comments
                && waybackData.comments.length > 0) {
                    let commentsHTML = ``
                    waybackData.comments.forEach(comment => {
                        if(commentsHTML.includes(comment.content)) return;
                        commentsHTML += templates.channelComment(
                            "/" + comment.link,
                            comment.icon,
                            comment.name,
                            comment.time.replace("(", "").replace(")", ""),
                            comment.content
                        )
                    })
                    code = code.replace(
                        `<!--yt2009_comments-->`,
                        commentsHTML
                    )
                    code = code.replace(
                        `(yt2009_channel_comment_count)`,
                        ""
                    )
                }


                stepsTaken++
                if(stepsRequiredToCallback == stepsTaken) {
                    try{callback(code)}catch(error){}
                }
            }), (req.query.resetcache == 1 || req.query.resetwayback == 1))
        }


        /*
        =======
        banners
        =======
        */
        if(flags.includes("banners")) {
            let cId = data.id.replace("UC", "")
            let bannerSet = false;
            let bgSet = false;
            let banner = `https://i3.ytimg.com/u/${cId}/profile_header.jpg`
            let oBg = overrideBgs[cId]
            let bg = `https://i3.ytimg.com/bg/${cId}/${oBg ? oBg.imageId : "101"}.jpg`
            let bgfile = __dirname + "/../assets/" + cId + "_background.jpg"
            let oldBgUsed = false;

            // top banner
            let b = __dirname + "/../assets/" + cId + "_banner.jpg"
            let oldBannerUsed = false;
            let useBanner = true;
            if(!fs.existsSync(b)) {
                if(oldbanner_unavail_cache.read().includes(cId)) {
                    b = "/assets/" + data.banner
                    if(!data.banner) {
                        useBanner = false;
                    }
                    flags = flags.replace("banners", "")
                    defaultBg()
                    bannerSet = true;
                    c()
                    return;
                }
                fetch(banner, {
                    "headers": yt2009constants.headers
                }).then(r => {
                    let b = ""
                    if(r.status !== 404) {
                        b = yt2009utils.saveBanner(banner)
                        oldBannerUsed = true;
                    } else {
                        b = "/assets/" + data.banner
                        if(!data.banner) {
                            useBanner = false;
                        }
                        oldbanner_unavail_cache.write(cId)
                    }
    
                    if(useBanner && (
                        !oBg || oBg.showHeader || (oBg && !oBg.showHeader)
                    )) {
                        code = code.replace(
                            `<!--yt2009_banner-->`,
                            templates.banner(b)
                        )
                    } else {
                        flags = flags.replace("banners", "")
                        defaultBg()
                    }
    
                    bannerSet = true;
                    c()
                })
            } else {
                if(!oBg || oBg.showHeader || (oBg && !oBg.showHeader)) {
                    code = code.replace(
                        `<!--yt2009_banner-->`,
                        templates.banner(`/assets/${cId}_banner.jpg`)
                    )
                }
                bannerSet = true;
                oldBannerUsed = true;
                c()
            }

            // background
            function getOldBg() {
                let css = `#channel-body {
                    background-image: url("/assets/${cId}_background.jpg")
                }
                `
                if(!oldBannerUsed) {
                    bgSet = true;
                    c();
                    return;
                }
                if(!fs.existsSync(bgfile)) {
                    fetch(bg, {
                        "headers": yt2009constants.headers
                    }).then(r => {
                        b = yt2009utils.saveBanner(bg, true)
                        if(r.status !== 404) {
                            code = code.replace(`/*yt2009_custom_bg*/`, css)
                            oldBgUsed = true
                        }
                        bgSet = true
                        c()
                    })
                } else {
                    code = code.replace(`/*yt2009_custom_bg*/`, css)
                    bgSet = true
                    oldBgUsed = true;
                    c()
                }
            }

            // callback
            function ac() {
                stepsTaken++
                if(stepsRequiredToCallback <= stepsTaken) {
                    try{callback(code)}catch(error){}
                }
            }
            function c() {
                if(bannerSet && !bgSet) {
                    getOldBg()
                    return;
                }
                if(bannerSet && bgSet) {
                    // get dominant color of banner and set as bg
                    let fname = oldBannerUsed
                                ? `${__dirname}/../assets/${cId}_banner.jpg`
                                : `${__dirname}/../assets/${data.banner}`
                    if(oldBgUsed) {
                        // wait for file
                        let x = setInterval(function() {
                            if(fs.existsSync(fname)) {
                                fname = bgfile;
                                applyBanner()
                                clearInterval(x)
                            }
                        }, 250)
                        return;
                    }
                    function applyBanner() {
                        dominant_color(fname, (color) => {
                            code = code.split(`yt2009_main_bg`).join(
                                oBg && oBg.primaryBg
                                ? oBg.primaryBg : yt2009utils.createRgb(color)
                            )
                            let brighterBg = [
                                color[0] + 10, color[1] + 10, color[2] + 10
                            ]
                            code = code.split(`yt2009_darker_bg`).join(
                                oBg && oBg.secondaryBg
                                ? oBg.secondaryBg : yt2009utils.createRgb(brighterBg)
                            )
                            if(brighterBg[0] + brighterBg[1] >= 340
                            || (oBg && oBg.blackText)) {
                                code = code.split("yt2009_text_color").join("black")
                                code = code.split("yt2009_black").join("icon_black")
                            } else {
                                code = code.split("yt2009_text_color").join("white")
                            }
    
    
                            // callback
                            ac()
                        }, 32, true)
                    }
                    if((oldBannerUsed && !fs.existsSync(fname)
                    || !oldBannerUsed && !fs.existsSync(fname))) {
                        // wait for file
                        let x = setInterval(function() {
                            if(fs.existsSync(fname)) {
                                applyBanner()
                                clearInterval(x)
                            }
                        }, 250)
                    } else if(
                        (oldBannerUsed && fs.existsSync(fname))
                    ||  (!oldBannerUsed && fs.existsSync(fname))) {
                        applyBanner()
                    }
                    if(!useBanner) {
                        ac()
                    }
                }
            }
        }


        if(stepsRequiredToCallback <= stepsTaken) {
            try{callback(code)}catch(error){}
        }
    },

    "playnav_get_comments": function(req, res) {
        if(!yt2009utils.isAuthorized(req)) {
            res.send("")
            return;
        }

        function parse_comments_html(data) {
            let result = `<h2>Comments</h2>
            <div class="playnav_comments">`
            data.forEach(comment => {
                if(comment.continuation) return;
                result += `
            <div class="watch-comment-entry">
                <div class="watch-comment-head">
                    <div class="watch-comment-info">
                        <a class="watch-comment-auth" href="${comment.authorUrl}" rel="nofollow">${comment.authorName}</a>
                        <span class="watch-comment-time"> (${comment.time}) </span>
                    </div>
                    <div class="clearL"></div>
                </div>
                <div>
                    <div class="watch-comment-body">
                        <div>
                            ${comment.content}
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>`
            })

            result += `
            </div>`

            return result;
        }

        if(saved_channel_comments[req.headers.id]) {
            res.send(parse_comments_html(saved_channel_comments[req.headers.id]))
        } else {
            yt2009html.get_video_comments(req.headers.id, (comments) => {
                saved_channel_comments[req.headers.id] = comments.slice();
                res.send(parse_comments_html(comments))
            })
        }
    },

    "get_saved_channels": function() {
        let croppedFeaturedChannels = {}
        let i = 0;
        for(let c in featured_channels) {
            if(i <= 25) {
                croppedFeaturedChannels[c] = featured_channels[c]
                i++;
            }
        }
        return croppedFeaturedChannels;
    },

    "get_cache": n_impl_yt2009channelcache,

    "fill_videocount": function(url, callback) {
        // add video count to user caches without them
        userid_cache.read(url, (id) => {
            // clean fetch the channel
            fetch(`https://www.youtube.com/youtubei/v1/browse?key=${
                yt2009html.get_api_key()
            }`, {
                "headers": yt2009constants.headers,
                "referrer": "https://www.youtube.com/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": JSON.stringify({
                    "context": yt2009constants.cached_innertube_context,
                    "browseId": id
                }),
                "method": "POST",
                "mode": "cors"
            }).then(r => {r.json().then(r => {
                let videoCount = ""
                try {
                    videoCount = r.header.c4TabbedHeaderRenderer
                                  .videosCountText.runs[0].text
                }
                catch(error) {}
                if(n_impl_yt2009channelcache.read("main")[id]
                && !n_impl_yt2009channelcache.read("main")[id].videoCount
                && videoCount.length !== 0) {
                    let newCache = JSON.parse(
                        JSON.stringify(n_impl_yt2009channelcache.read("main")[id])
                    )
                    newCache.videoCount = videoCount
                    n_impl_yt2009channelcache.write("main", id, newCache)
                }

                callback(videoCount)
            })})
        })
    },

    "autoUserHandle": function(req, res, flags) {
        let url = req.originalUrl
        let userHandle = ""
        if(url.includes("/user/")) {
            // already a /user/ url, handle as normal
            this.main(req, res, flags)
            return;
        }

        // get user id
        let userId = ""
        if(url.includes("/channel/")) {
            userId = url.split("/channel/")[1].split("?")[0].split("#")[0]
            getUserHandle()
        } else {
            userid_cache.read(url, (id) => {
                userId = id;
                getUserHandle()
            })
        }

        // then get the user's handle to try to get /user/ with it
        function getUserHandle() {
            if(url.includes("@")) {
                userHandle = url.split("@")[1].split("?")[0].split("#")[0]
                compare()
            } else {
                // try to get handle from cache
                if((n_impl_yt2009channelcache.read("main")[url]
                &&  n_impl_yt2009channelcache.read("main")[url].handle)
                || (n_impl_yt2009channelcache.read("main")[userId]
                &&  n_impl_yt2009channelcache.read("main")[userId].handle)) {
                    let cache = n_impl_yt2009channelcache.read("main")
                    cache = cache[url] || cache[userId]
                    userHandle = cache.handle.replace("@", "")
                    compare()
                    return;
                }
                // clean fetch for handle
                else {
                    fetch(`https://www.youtube.com/youtubei/v1/browse?key=${
                        yt2009html.get_api_key()
                    }`, {
                        "headers": yt2009constants.headers,
                        "referrer": "https://www.youtube.com/",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": JSON.stringify({
                            "context": yt2009constants.cached_innertube_context,
                            "browseId": userId
                        }),
                        "method": "POST",
                        "mode": "cors"
                    }).then(r => {r.json().then(r => {
                        try {
                            userHandle = r.header.c4TabbedHeaderRenderer
                                          .channelHandleText.runs[0].text
                        }
                        catch(error) {}
                        compare()
                    })})
                }
            }
        }

        function compare() {
            userHandle = userHandle.replace("@", "")
            userid_cache.read(`/user/${userHandle}`, (id) => {
                if(userId == id) {
                    // the same ids, redirect to /user/!!!
                    res.redirect(`/user/${userHandle}`)
                } else {
                    // nah :(, continue with the request as normal
                    require("./yt2009channels").main(req, res, flags, false)
                }
            })
        }
    },

    "get_id": function(link, callback) {
        link = link.split("/")
        link.forEach(p => {
            if(p.startsWith("@")) {
                link = p
            }
            if(p == "user") {
                link = link[link.indexOf(p) + 1]
            }
        })
        userid_cache.read(link, (id) => {
            // clean fetch the channel
            callback(id)
        })
    }
}
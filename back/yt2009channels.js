const fs = require("fs");
const fetch = require("node-fetch");
const dominant_color = require("./dominant_color")
const yt2009utils = require("./yt2009utils");
const yt2009html = require("./yt2009html");
const yt2009constants = require("./yt2009constants.json")
const yt2009channelcache = require("./yt2009channelcache")
const n_impl_yt2009channelcache = require("./cache_dir/channel_cache")
const yt2009defaultavatarcache = require("./cache_dir/default_avatar_adapt_manager")
const wayback_channel = require("./cache_dir/wayback_channel")
const templates = require("./yt2009templates")
const config = require("./config.json")

const channel_code = fs.readFileSync("../channelpage.htm").toString();

let saved_channels = {}
let saved_channel_comments = {}
let saved_channel_sections = {}
let saved_channel_playlists = {}

let featured_channels = require("./cache_dir/public_channel_listing.json")

module.exports = {
    "main": function(req, res, flags, sendRawData) {
        // url parse
        let url = ""
        url = yt2009utils.channelUrlMarkup(req.path)
        // log if dev, use fmode
        let flashMode = (req.query.f == 1
                      || req.headers.cookie.includes("f_mode"))

        if(config.env == "dev") {
            console.log(`(${yt2009utils.get_used_token(req)}) channel ${url}`)
        }

        let applyHTML = this.applyHTML
        let getAdditionalSections = this.get_additional_sections

        require("./cache_dir/userid_cache").read(url, (id) => {
            // read from cache
            if((n_impl_yt2009channelcache.read("main")[url]
            || n_impl_yt2009channelcache.read("main")[id])
            && req.query.resetcache !== "1") {
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
                    this.parse_main_response(r, flags, (data) => {
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
                        applyHTML(data, flags, (html => {
                            res.send(html)
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
        let additionalFetchesCompleted = 0;

        // basic extract
        let data = {}
        data.name = r.metadata.channelMetadataRenderer.title
        data.id = r.header.c4TabbedHeaderRenderer.channelId
        data.url = r.metadata.channelMetadataRenderer.channelUrl
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

        // fetch videos tab
        let videosTabAvailable = false;
        data.tabParams = {}
        r.contents.twoColumnBrowseResultsRenderer.tabs.forEach(tab => {
            if(tab.tabRenderer
            && tab.tabRenderer.title.toLowerCase() == "videos") {
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
            setTimeout(function() {
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
                    r.onResponseReceivedActions.forEach(action => {
                        if(action.reloadContinuationItemsCommand.slot
                        == "RELOAD_CONTINUATION_SLOT_BODY") {
                            createVideosFromChip(
                                action.reloadContinuationItemsCommand
                                      .continuationItems
                            )
                        }
                    })
                })})
            }, 405)
        }

        function createVideosFromChip(chip) {
            chip.forEach(video => {
                if(video.richItemRenderer || video.gridVideoRenderer) {
                    video = (video.richItemRenderer || video.gridVideoRenderer)
                            .content.videoRenderer
                    data.videos.push({
                        "id": video.videoId,
                        "title": video.title.runs[0].text,
                        "views": video.viewCountText.simpleText,
                        "upload": video.publishedTimeText.simpleText,
                        "thumbnail": "http://i.ytimg.com/vi/"
                                    + video.videoId
                                    + "/hqdefault.jpg"
                    })
                }
                
            })
            onVideosCreate()
            additionalFetchesCompleted++;
        }

        // fallback: no videos tab (eg topic channels)
        if(!videosTabAvailable) {
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
                                        + "/hqdefault.jpg"
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
                                            + "/hqdefault.jpg"})
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
       || !data.tabParams) {
            markCompleteStep()
        } else {
            if(data.tabParams["channels"]) {
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
        }


        // playlists
        let playlist_list = {}
        if(n_impl_yt2009channelcache.read("playlist")[data.id]
        || !data.tabParams) {
            markCompleteStep()
        } else {
            if(data.tabParams["playlists"]) {
                yt2009utils.channelGetSectionByParam(
                    data.id, data.tabParams["playlists"], (r => {
                        let tab = yt2009utils.channelJumpTab(r, "playlists").content
                                             .sectionListRenderer.contents[0]
                                             .itemSectionRenderer.contents[0]
                        try {
                            playlist_list = yt2009utils.parseChannelPlaylists(tab)
                        }
                        catch(error) {console.log(error)}
            
                        n_impl_yt2009channelcache.write(
                            "playlist",
                            data.id,
                            JSON.parse(JSON.stringify(playlist_list))
                        )
                        markCompleteStep()
                    }
                ))
            }
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
        let stepsTaken = 0;
        let channelCommentCount = 0;

        // wayback_features init
        let wayback_settings = ""
        if(flags.includes("wayback_features")
        && data.url.includes("user/")) {
            wayback_settings = decodeURIComponent(
                flags.split("wayback_features")[1].split(";")[0]
            )
            if(wayback_settings.includes("all")) {
                wayback_settings = "fields+basic+sections+comments"
            }

            stepsRequiredToCallback++
        }
        
        /*
        =======
        basic data & flag handling
        =======
        */
        // fill channel name & its flags
        let channelName = yt2009utils.textFlags(data.name, flags, data.url)
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
        console.log(data.dominant_color)
        let mainBg = yt2009utils.createRgb([
            data.dominant_color[0] + 20,
            data.dominant_color[1] + 20,
            data.dominant_color[2] + 20
        ])
        if(flags.includes("default_color")) {
            mainBg = yt2009utils.createRgb([200, 200, 200])
        }
        code = code.split("yt2009_main_bg").join(mainBg)

        // darker background
        let darkBg = yt2009utils.createRgb([
            data.dominant_color[0] - 45,
            data.dominant_color[1] - 45,
            data.dominant_color[2] - 45,
        ])
        if(flags.includes("default_color")) {
            mainBg = yt2009utils.createRgb([135, 135, 135])
        }
        code = code.split("yt2009_darker_bg").join(darkBg)

        // find text color
        if(data.dominant_color[0] + data.dominant_color[1] >= 340
        || flags.includes("default_color")) {
            code = code.split("yt2009_text_color").join("black")
            code = code.split("yt2009_black").join("icon_black")
        } else {
            code = code.split("yt2009_text_color").join("white")
        }

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
                `<a href="/channels">Channels</a>`,
                `<a href="/channels">Channels</a><a href="#">Shows</a>`
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
        let video_index = 0;
        let videoUploadDates = {}
        // "All" scrollbox
        let scrollbox_all_videos = JSON.parse(JSON.stringify(data.videos))
                                       .splice(0, 10)
        scrollbox_all_videos.forEach(video => {
            let views = yt2009utils.viewFlags(video.views, flags)
            let ratings_est = yt2009utils.estRating(views)
            let upload_date = yt2009utils.timeFlags(video.upload, flags)
            videoUploadDates[video.id] = upload_date
            scrollbox_all_html += templates.playnavVideo(
                video,
                video_index,
                views,
                upload_date,
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
        let scrollbox_videos = JSON.parse(JSON.stringify(data.videos))
        video_index = 0;
        scrollbox_videos.forEach(video => {
            let views = yt2009utils.viewFlags(video.views, flags)
            let ratings_est = yt2009utils.estRating(views)
            let upload_date = yt2009utils.timeFlags(video.upload, flags)
            videoUploadDates[video.id] = upload_date
            scrollbox_videos_html += templates.playnavVideo(
                video,
                video_index,
                views,
                upload_date,
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
        login_simulate
        =======
        */
        code = require("./yt2009loginsimulate")(flags, code)

        /*
        =======
        header video
        =======
        */
        if(data.videos[0]) {
            let video = data.videos[0]
            let views = yt2009utils.viewFlags(video.views, flags)
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
                videoUploadDates[video.id]
            )

            // use video comments as channel comments
            // if not overriden by wayback_features
            let comments_html = ``
            if(saved_channel_comments[video.id]
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
                let watch_url = "/watch.swf"
                if(req.headers.cookie.includes("alt_swf_path=")) {
                    watch_url = decodeURIComponent(
                        req.headers.cookie.split("alt_swf_path=")[1]
                                          .split(";")[0]
                    )
                }
                let watch_arg = "video_id"
                if(req.headers.cookie.includes("alt_swf_arg=")) {
                    watch_arg = req.headers.cookie.split("alt_swf_arg=")[1]
                                                  .split(";")[0]
                }
                code = code.replace(
                    "<!--yt2009_player-->",
                    templates.flashObject(
                        `${watch_url}?${watch_arg}=${video.id}&`
                        + `iv_module=http%3A%2F%2F`
                        + `${config.ip}%3A${config.port}%2Fiv_module.swf`
                    )
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
            ${data.name} has no videos available.</div><div id="playnav-navbar"`
            )
            code = code.replace(
                `//[yt2009-hook-no-videos]`,
                `$("#channel-body").style.height = window.innerHeight - 78 + "px"`
            )
            code = code.replace(
                `yt2009_channel_comment_count`,
                channelCommentCount
            )

            if(!wayback_settings.includes("comments")) {
                stepsTaken++;
                setTimeout(function() {
                    if(stepsRequiredToCallback == stepsTaken) {
                        try {callback(code)}catch(error) {}
                    }
                }, 500)
            }
        }

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
                `//yt2009-f-custom-player`,
                `var customPlayerUrl = "${watch_url}";
                var customPlayerArg = "${watch_arg}"`
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
        for(let p in data.properties) {
            let p_uppercase = yt2009utils.firstUppercase(p)
            let value = data.properties[p]
            let valueMarkup = yt2009utils.markupDescription(value)

            properties_html += templates.channelProperty(
                p_uppercase, valueMarkup
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
        if(flags.includes("exp_playlists")
        && n_impl_yt2009channelcache.read("playlist")[data.id]) {
            let playlists = n_impl_yt2009channelcache.read("playlist")[data.id]

            // "all" scrollbox playlists
            JSON.parse(JSON.stringify(playlists)).splice(0, 5).forEach(playlist => {
                all_scrollbox_playlists_html += templates.playnavPlaylist(
                    playlist, req.protocol
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
                    playlist, req.protocol
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
            code = code.split(`yt2009_${sectionName}_count`, realCount)
            return html;
        }

        /*
        =======
        wayback_features
        =======
        */
        if(flags.includes("wayback_features")
        && data.url.includes("user/")) {
            wayback_channel.read(data.url, (waybackData => {

                /*
                =======
                basic
                =======
                */
                if(wayback_settings.includes("basic")) {
                    code = code.split(`yt2009_channel_avatar`)
                                .join(waybackData.avatarUrl)
                    
                    let customCSS = ""
                    if(typeof(waybackData.customCSS) == "string") {
                        customCSS = waybackData.customCSS
                    }
                    code = code.replace(
                        `<!--yt2009_wayback_channel_custom_css-->`,
                        `<style type="text/css"
                id="channel-theme-css"
                name="channel-theme-css">
                        ${customCSS}
    
    
                        /*yt2009*/
                        .panel-tab-indicator-cell svg,
                        .playnav-video.selected {
                            fill: none;
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
        return featured_channels;
    }
}
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

const channel_code = fs.readFileSync("../channelpage.htm").toString();

let saved_channels = {}
let saved_channel_comments = {}
let saved_channel_sections = {}
let saved_channel_playlists = {}

let featured_channels = require("./cache_dir/public_channel_listing.json")

function internal_applyHTML(data, flags, callback, req, flashMode) {
    let env = process.platform == "win32" ? "dev" : "prod"
    let code = channel_code;
    let stepsRequiredToCallback = 1;
    let stepsTaken = 0;

    // wayback_features init
    let wayback_settings = ""
    if(flags.includes("wayback_features")
    && data.url.includes("user/")) {
        wayback_settings = decodeURIComponent(
            flags.split("wayback_features")[1]
            .split(";")[0]
        )
        if(wayback_settings.includes("all")) {
            wayback_settings = "fields+basic+sections+comments"
        }

        stepsRequiredToCallback++
    }

    let channelCommentCount = 0;

    // flags
    flags.includes("exp_fill_comments")
    && !wayback_settings.includes("comments") ? stepsRequiredToCallback++ : ""
    flags.includes("exp_playlists") ? stepsRequiredToCallback++ : ""
    flags.includes("exp_friends")
    && !wayback_settings.includes("sections") ? stepsRequiredToCallback++ : ""

    let channelName = data.name
    if(flags.includes("remove_username_space")) {
        channelName = data.name.split(" ").join("")
    }
    if(flags.includes("username_asciify")) {
        channelName = yt2009utils.asciify(data.name)
    }
    if(flags.includes("author_old_names") && data.url.startsWith("user/")) {
        channelName = data.url.split("user/")[1]
    }
    code = code.split("yt2009_channel_name").join(channelName)
    
    
    // awatar
    let channelAvatar = data.avatar
    if(flags.includes("default_avataradapt")) {
        if(yt2009defaultavatarcache.use(`../${data.avatar}`)) {
            channelAvatar = "/assets/site-assets/default.png"
        }
    } else if(flags.includes("default_avatar") && !flags.includes("default_avataradapt")) {
        channelAvatar = "/assets/site-assets/default.png"
    }

    if(!wayback_settings.includes("basic")) {
        code = code.split("yt2009_channel_avatar").join(channelAvatar)
    }

    // login
    code = require("./yt2009loginsimulate")(flags, code)

    // kolorki (główna funkcja kanałów 2.0)
    let mainBg = flags.includes("default_color") ? `rgb(200, 200, 200)` : `rgb(${data.dominant_color[0] + 20}, ${data.dominant_color[1] + 20}, ${data.dominant_color[2] + 20})`

    if(data.dominant_color[0] + data.dominant_color[1] >= 340 || flags.includes("default_color")) {
        code = code.split("yt2009_text_color").join("black")
        code = code.split("yt2009_black").join("icon_black")
    } else {
        code = code.split("yt2009_text_color").join("white")
    }

    code = code.split("yt2009_main_bg").join(mainBg)
    let darkBg = flags.includes("default_color") ? `rgb(135, 135, 135)` : `rgb(${Math.abs(data.dominant_color[0] - 45)}, ${Math.abs(data.dominant_color[1] - 45)}, ${Math.abs(data.dominant_color[2] - 45)})`
    code = code.split("yt2009_darker_bg").join(darkBg)

    // use_ryd
    if(flags.includes("use_ryd")) {
        code = code.replace(`<!--yt2009_ryd_set-->`, `
        <script>
            use_ryd = true;
            use_ryd_first_video();
        </script>`)
    }

    // shows tab
    if(flags.includes("shows_tab")) {
        code = code.replace(
            `<a href="/channels">Channels</a>`,
            `<a href="/channels">Channels</a><a href="#">Shows</a>`
        )
    }

    // czy jest zasubskrybowany do kanału

    let subList = yt2009utils.get_subscriptions(req)
    let subscribed = false;
    subList.forEach(sub => {
        if(sub.url.length > 1 && ("/" + req.path).includes(sub.url)) {
            subscribed = true;
        }
    })

    if(subscribed) {
        code = code
                .split(`class="subscribe-div yt2009-subscribe-button-hook"`)
                .join(`class="subscribe-div yt2009-subscribe-button-hook hid"`)
    } else {
        code = code.split(`class="yt2009-unsubscribe-button-hook"`).join(`class="yt2009-unsubscribe-button-hook hid"`)
    }

    // filmy

    let videos_html = ""
    let video_index = 0;
    let video0uploadDate = ""
    let videoUploadDates = {}
    /*try {
        video0uploadDate = flags.includes("fake_upload_date") ? yt2009utils.genFakeDate() : data.videos[0].upload
    }
    catch(error) {}*/
    // yt2009_all_scrollbox_uploads
    let scrollbox_all_videos = JSON.parse(JSON.stringify(data.videos)).splice(0, 10)
    scrollbox_all_videos.splice(0, 10).forEach(video => {
        // flagi
        let views = "";
        if(flags.includes("realistic_view_count") && parseInt(video.views.replace(/[^0-9]/g, "")) >= 100000) {
            views = yt2009utils.countBreakup(Math.floor(parseInt(video.views.replace(/[^0-9]/g, "")) / 90)) + " views"
        } else {
            views = video.views
        }

        let ratings_estimate_power = 15
        if(parseInt(views.replace(/[^0-9]/g, "")) >= 100000) {
            ratings_estimate_power = 150
        }


        let upload_date = ""
        if(flags.includes("fake_upload_date")) {
            upload_date = yt2009utils.genFakeDate();
        } else {
            upload_date = video.upload
        }

        videoUploadDates[video.id] = upload_date

        videos_html += `
        <div class="playnav-item playnav-video ${video_index == 0 ? "selected" : ""}" id="playnav-video-${video.id}" onclick="switchVideo(this)">
            <div class="content">
                <div class="playnav-video-thumb link-as-border-color">
                    <a class="video-thumb-90 no-quicklist" href="#"><img title="${video.title.split('"').join("&quot;")}" src="${video.thumbnail.replace("http", req.protocol)}" class="vimg90 yt-uix-hovercard-target" alt="${video.title.split('"').join("&quot;")}"></a>
        
                </div>
                <div class="playnav-video-info">
                    <a href="#" class="playnav-item-title ellipsis"><span class="video-title-${video.id}">${video.title}</span></a>
                    <div class="metadata video-meta-${video.id}">${views} - ${upload_date}</div>
                    <div class="video-ratings-${video.id} hid">${yt2009utils.countBreakup(Math.floor(parseInt(views.replace(/[^0-9]/g, "")) / ratings_estimate_power))}</div>
                </div>
            </div>
        </div>`
        video_index++;
    })

    // yt2009_uploads
    let scrollbox_videos = JSON.parse(JSON.stringify(data.videos))
    let scrollbox_videos_html = ``
    video_index = 0;
    scrollbox_videos.forEach(video => {
        let ratings_estimate_power = 150
        if(parseInt(video.views.replace(/[^0-9]/g, "")) <= 100000) {
            ratings_estimate_power = 15
        }

        // flagi
        let views = "";
        if(flags.includes("realistic_view_count") && parseInt(video.views.replace(/[^0-9]/g, "")) >= 100000) {
            views = yt2009utils.countBreakup(Math.floor(parseInt(video.views.replace(/[^0-9]/g, "")) / 90)) + " views"
        } else {
            views = video.views
        }

        let upload_date = ""
        if(videoUploadDates[video.id]) {
            upload_date = videoUploadDates[video.id]
        } else {
            if(flags.includes("fake_upload_date")) {
                upload_date = yt2009utils.genFakeDate();
            } else {
                upload_date = video.upload
            }
            videoUploadDates[video.id] = upload_date
        }

        scrollbox_videos_html += `
        <div class="playnav-item playnav-video ${video_index == 0 ? "selected" : ""}" id="playnav-video-${video.id}" onclick="switchVideo(this)">
            <div class="content">
                <div class="playnav-video-thumb link-as-border-color">
                    <a class="video-thumb-90 no-quicklist" href="#"><img title="${video.title.split('"').join("&quot;")}" src="${video.thumbnail.replace("http", req.protocol)}" class="vimg90 yt-uix-hovercard-target" alt="${video.title}"></a>
        
                </div>
                <div class="playnav-video-info">
                    <a href="#" class="playnav-item-title ellipsis"><span class="video-title-${video.id}">${video.title}</span></a>
                    <div class="metadata video-meta-${video.id}">${views} - ${upload_date}</div>
                    <div class="video-ratings-${video.id} hid">${yt2009utils.countBreakup(Math.floor(parseInt(views.replace(/[^0-9]/g, "")) / ratings_estimate_power))}</div>
                </div>
            </div>
        </div>`
        video_index++;
    })

    // head film
    if(data.videos[0]) {
        let video = data.videos[0]

        let views = flags.includes("realistic_view_count") && parseInt(video.views.replace(/[^0-9]/g, "")) >= 1000 ? yt2009utils.countBreakup(Math.floor(parseInt(video.views.replace(/[^0-9]/g, "")) / 90)) + " views" : video.views

        let ratings_estimate_power = 15
        if(parseInt(views.replace(/[^0-9]/g, "")) >= 100000) {
            ratings_estimate_power = 150
        }

        code = code.replace("yt2009_head_video_title", video.title)
        code = code.replace("yt2009_head_video_upload", videoUploadDates[video.id])
        code = code.replace("yt2009_head_video_views", views)
        code = code.replace("yt2009_head_video_ratings", yt2009utils.countBreakup(Math.floor(parseInt(views.replace(/[^0-9]/g, "")) / ratings_estimate_power)))
        code = code.replace("yt2009_head_video_short_description", yt2009html.get_video_description(video.id).split("\n").splice(0, 3).join("<br>"))
        code = code.split("yt2009_head_video_id").join(video.id)

        if(!flashMode) {
            code = code.replace("<!--yt2009_player-->", `<iframe id="yt2009_playhead" allowfullscreen src="/embed/${video.id}"></iframe>`)
        } else {
            let watch_url = "/watch.swf"
            if(req.headers.cookie.includes("alt_swf_path=")) {
                watch_url = decodeURIComponent(
                    req.headers.cookie.split("alt_swf_path=")[1].split(";")[0]
                )
            }
            let watch_arg = "video_id"
            if(req.headers.cookie.includes("alt_swf_arg=")) {
                watch_arg
                = req.headers.cookie.split("alt_swf_arg=")[1].split(";")[0]
            }
            code = code.replace(`<!DOCTYPE html>`, `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">`)
            code = code.replace(`><span style="display: block;">Search`, ` style="width: 40px;"><span>Search`)
            code = code.replace(`id="playnav-player" class="playnav-player-container"`, `id="playnav-player" class="playnav-mvlf9xls playnav-player-container"`)
            code = code.replace("<!--yt2009_player-->", `<object width="640" height="385">
            <param name="movie" value="${watch_url}?${watch_arg}=${video.id}&iv_module=http%3A%2F%2F${env == "dev" ? "192.168.1.4%3A82" : "ftde-projects.tk%3A5316"}%2Fiv_module-${env}.swf"></param>
            <param name="allowFullScreen" value="true"></param>
            <param name="allowscriptaccess" value="always"></param>
            <embed src="${watch_url}?${watch_arg}=${video.id}&iv_module=http%3A%2F%2F${env == "dev" ? "192.168.1.4%3A82" : "ftde-projects.tk%3A5316"}%2Fiv_module-${env}.swf" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="385" class="fl"></embed>
            </object>`)
            code = code.replace(`onclick="document.searchForm.submit();"`, `onclick="document.searchForm.submit();" style="width: 40px;"`)
            code = code.replace(
                `//yt2009-f-custom-player`,
                `var customPlayerUrl = "${watch_url}";
                var customPlayerArg = "${watch_arg}"`
            )
            code = code.replace(`<!--yt2009_f-->`, `<script src="/assets/site-assets/f_script.js"></script>`)
            code = code.replace(`<script src="/assets/site-assets/channelpage.js"></script>`, ``)
            code = code.replace(`<!--yt2009_style_fixes_f-->`, `<link rel="stylesheet" href="/assets/site-assets/f.css">`)
        }

        // komentarze z top filmu
        if(flags.includes("exp_fill_comments")
        && !wayback_settings.includes("comments")) {
            function parse_comments_html(comments) {
                let comments_html = ``
                // nie wiem czemu to działa ale działa
                let cmts = comments.slice(0, 10)
                let index = 0;

                cmts.forEach(comment => {
                    try {
                        if(comment.content.includes("video")) return;

                        // zapisz awatar
                        let fname = comment.authorAvatar.split("/")[comment.authorAvatar.split("/").length - 1]
                        if(!fs.existsSync(`../assets/${fname}.png`)) {
                            fetch(comment.authorAvatar, {
                                "headers": {
                                    "accept-encoding": "gzip, deflate, br",
                                    "accept-language": "en-US,en;q=0.9",
                                    "dnt": 1,
                                    "sec-fetch-dest": "document",
                                    "sec-fetch-mode": "navigate",
                                    "sec-fetch-site": "same-origin",
                                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
                                }
                            }).then(r => {
                                r.buffer().then(buffer => {
                                    fs.writeFileSync(`../assets/${fname}.png`, buffer)
                                })
                            })
                        }
                        let authorAvatar = `/assets/${fname}.png`

                        if(flags.includes("default_avataradapt") && fs.existsSync(`..${authorAvatar}`) && yt2009defaultavatarcache.use(`..${authorAvatar}`)) {
                            authorAvatar = "/assets/site-assets/default.png"
                        }

                        let commentPass = true;
                        yt2009constants.comments_remove_future_phrases
                        .forEach(phrase => {
                            if(comment.content
                                .split("\n")[0]
                                .includes(phrase)) {
                                commentPass = false;
                            }
                        })

                        if(!commentPass) return;
                        let authorName = comment.authorName;
                        if(flags.includes("remove_username_space")) {
                            authorName = authorName.split(" ").join("")
                        }
                        if(flags.includes("username_asciify")) {
                            authorName = yt2009utils.asciify(authorName)
                        }
                        if(flags.includes("author_old_names")
                            && comment.authorUrl.includes("/user/")) {
                            authorName = comment.authorUrl.split("/user/")[1]
                        }

                        comments_html += templates.channelComment(
                            comment.authorUrl,
                            authorAvatar,
                            authorName,
                            flags.includes("fake_upload_date")
                            ? yt2009utils.genFakeDate(index) : comment.time,
                            comment.content.split("\n")[0]
                        )
                        /*comments_html += `
                        <tr class="commentsTableFull ">
                            <td style="padding-bottom: 15px;" width="60" valign="top">
                                <div class="user-thumb-medium">
                                    <div>
                                        <a href="${comment.authorUrl}"><img id="" src="${authorAvatar}" onerror="setDefault(this)"></a>
                                    </div>
                                </div>
                            </td>
                            <td style="padding-bottom: 15px;" valign="top">
                                <div style="float:left; margin-bottom: 5px;">
                                    <a name="profile-comment-username" href="${comment.authorUrl}" style="font-size: 12px;"><b>${authorName}</b></a>
                                    <span class="profile-comment-time-created">(${flags.includes("fake_upload_date") ? yt2009utils.genFakeDate(index) : comment.time})</span>
                                </div>
                                <div class="profile-comment-body" style="clear:both;">${comment.content.split("\n")[0]}</div>
                            </td>
                        </tr>`*/

                        index++;
                    }
                    catch(error) {console.log}
                })

                code = code.replace(`<!--yt2009_comments-->`, comments_html)
                code = code.replace(`yt2009_channel_comment_count`, index)

                stepsTaken++;
                setTimeout(function() {
                    if(stepsRequiredToCallback == stepsTaken) {
                        try {callback(code)}catch(error) {}
                    }
                }, 500)
            }

            
            if(saved_channel_comments[video.id]) {
                parse_comments_html(saved_channel_comments[video.id])
            } else {
                yt2009html.get_video_comments(video.id, (comments) => {
                    saved_channel_comments[video.id] = JSON.parse(
                        JSON.stringify(comments)
                    );
                    parse_comments_html(JSON.parse(JSON.stringify(comments)))
                })
            }
            
        } else {
            code = code.replace(
                `yt2009_channel_comment_count`,
                channelCommentCount
            )
        }
    } else {
        // nie ma filmów
        code = code.replace(
            `id="playnav-body"`,
            `id="playnav-body" class="hid"`
        )
        code = code.replace(
            `id="playnav-navbar"`,
            `id="playnav-navbar" class="hid"`
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

        if(flags.includes("exp_fill_comments")
        && !wayback_settings.includes("comments")) {
            stepsTaken++;
            setTimeout(function() {
                if(stepsRequiredToCallback == stepsTaken) {
                    try {callback(code)}catch(error) {}
                }
            }, 500)
        }
    }

    code = code.replace("<!--yt2009_all_scrollbox_uploads-->", videos_html)
    code = code.replace("<!--yt2009_uploads-->", scrollbox_videos_html)

    if(flashMode && req.headers["user-agent"].includes("MSIE")) {
        code = code.split(`playnav-video selected`).join(`playnav-video`)
    }

    // właściwości pokazywane na lewo pod playerem
    let properties_html = ""
    for(let p in data.properties) {
        let p_uppercase = p.split("")
        p_uppercase[0] = p_uppercase[0].toUpperCase();
        p_uppercase = p_uppercase.join("")

        let value = data.properties[p];
        let valueParsed = ""
        // wrapujemy linki w <a>
        value.split("<br>").forEach(line => {
            line.split(" ").forEach(part => {
                if(part.startsWith("http://") || part.startsWith("https://")) {
                    valueParsed += `<a href="${part}" target="_blank">${part.length > 40 ? part.substring(0, 40) + "..." : part}</a> `
                } else {
                    valueParsed += `${part} `
                }
            })
            valueParsed += "<br>"
        })

        properties_html += `
    <div class="show_info outer-box-bg-as-border">
        <div style="float:left;font-weight:bold;">${p_uppercase}</div>
        <div style="float:right;" id="profile_show_${p.toLowerCase()}">${valueParsed}</div>
        <div class="cb"></div>
    </div>`
    }

    if(!wayback_settings.includes("fields")) {
        code = code.replace("<!--yt2009_properties-->", properties_html)
    }
    

    // exp_friends
    // parsowanie
    let friends_html = ""
    let friends_count = 0;
    let subscriptions_html = ""
    let subscriptions_count = 0;
    let channels_list = {}
    function createDefaultFriendsSections() {
        function apply_html(channel_list) {
            // podkładanie zparsowanej listy kanałów do html'a

            channel_list = JSON.parse(JSON.stringify(channel_list))

            for(let list in channel_list) {
                if(list == "Subscriptions") {
                    // suby
                    channel_list[list].splice(0, 6).forEach(sub => {
                        let channel_url = sub.url
                        if(!channel_url.startsWith("/c/")
                        && !channel_url.startsWith("/channel/")
                        && !channel_url.startsWith("/user/")) {
                            channel_url = "/channel/" + sub.id
                        }

                        let subName = sub.name;
                        if(flags.includes("remove_username_space")) {
                            subName = subName.split(" ").join("")
                        }
                        if(flags.includes("username_asciify")) {
                            subName = yt2009utils.asciify(subName)
                        }
                        if(flags.includes("author_old_names")
                        && channel_url.includes("/user/")) {
                            subName = channel_url.split("/user/")[1]
                        }

                        subscriptions_html += `
                        <div class="user-peep" style="width:33%;text-align: center;overflow: hidden;height: 90px;">
                            <div class="user-thumb-large link-as-border-color" style="margin: auto;">
                                <div>
                                    <a href="${channel_url}"><img id="" src="${yt2009utils.saveAvatar(sub.avatar)}"></a>
                                </div>
                            </div>
    
                            <a href="${channel_url}">${subName}</a>
                        </div>`
                        subscriptions_count++;
                    })
                } else {
                    // reszta do friends
                    channel_list[list].splice(0, 12).forEach(friend => {
                        let channel_url = friend.url
                        if(!channel_url.startsWith("/c/")
                        && !channel_url.startsWith("/channel/")
                        && !channel_url.startsWith("/user/")) {
                            channel_url = "/channel/" + friend.id
                        }

                        let friendName = friend.name;
                        if(flags.includes("remove_username_space")) {
                            friendName = friendName.split(" ").join("")
                        }
                        if(flags.includes("username_asciify")) {
                            friendName = yt2009utils.asciify(friendName)
                        }
                        if(flags.includes("author_old_names")
                        && channel_url.includes("/user/")) {
                            friendName = channel_url.split("/user/")[1]
                        }


                        friends_html += `
                        <div class="user-peep" style="width:14.2%;text-align: center;">
                            <div class="user-thumb-large link-as-border-color" style="margin: auto;">
                                <div>
                                    <a href="${channel_url}"><img id="" src="${yt2009utils.saveAvatar(friend.avatar)}"></a>
                                </div>
                            </div>

                            <a href="${channel_url}">${friendName}</a>
                        </div>`
                        friends_count++;
                    })
                }
            }

            code = code.replace("yt2009_subscriptions_count", subscriptions_count)
            code = code.replace(`<!--yt2009_subs-->`, subscriptions_html)
            code = code.replace("yt2009_friends_count", friends_count)
            code = code.replace(`<!--yt2009_friends-->`, friends_html)

            stepsTaken++;
            if(stepsRequiredToCallback == stepsTaken) {
                setTimeout(function() {
                    try {callback(code)}catch(error) {}
                }, 500)
            }
        }


        if(n_impl_yt2009channelcache.read("friend")[data.id]) {
            apply_html(n_impl_yt2009channelcache.read("friend")[data.id])
        } else {
            fetch("https://youtube.com/channel/" + data.id + "/channels", {
                "headers": yt2009constants.headers
            }).then(r => {r.text().then(response => {
                // parse danych
                let ytInitialData = JSON.parse(
                    response.split("var ytInitialData = ")[1]
                            .split(";</script>")[0]
                )
                let channelsTab = {}
    
                ytInitialData.contents
                .twoColumnBrowseResultsRenderer.tabs.forEach(tab => {
                    if(!tab.tabRenderer) return;
    
                    if(tab.tabRenderer.selected
                    && tab.tabRenderer.title == "Channels") {
                        channelsTab = tab.tabRenderer.content
                                        .sectionListRenderer
                    }
                })
    
                // loop sekcji
                let sectionIndex = 0;
                let sectionIndexOffset = 0;
                try {
                    channelsTab.contents.forEach(section => {
                        try {
                            let sectionName = channelsTab
                                            .subMenu.channelSubMenuRenderer
                                            .contentTypeSubMenuItems
                                            [sectionIndex + sectionIndexOffset]
                                            .title
                            if(sectionName == "All channels") {
                                sectionIndexOffset++;
                                sectionName = channelsTab
                                            .subMenu.channelSubMenuRenderer
                                            .contentTypeSubMenuItems
                                            [sectionIndex + sectionIndexOffset]
                                            .title
                            }
                            let parsedSection = []
                            for(let group in section
                                            .itemSectionRenderer
                                            .contents[0]) {
                                switch(group) {
                                    case "gridRenderer": {
                                        section = section.itemSectionRenderer
                                                .contents[0][group].items
                                                .splice(0, 12)
                                        break;
                                    }
                                    case "shelfRenderer": {
                                        section = section.itemSectionRenderer
                                                .contents[0][group].content
                                                .horizontalListRenderer.items
                                                .splice(0, 12)
                                        break;
                                    }
                                }
                            }
                            
                            section.forEach(channel => {
                                channel = channel.gridChannelRenderer;
            
                                parsedSection.push({
                                    "name": channel.title.simpleText,
                                    "avatar": channel.thumbnail
                                                .thumbnails[1].url,
                                    "id": channel.channelId,
                                    "url": channel.navigationEndpoint
                                            .browseEndpoint.canonicalBaseUrl
                                })
                            })
                            channels_list[sectionName] = parsedSection
            
                            sectionIndex++;
                        }
                        catch(error) {}
                    })
                }
                catch(error) {}
    
                n_impl_yt2009channelcache.write(
                    "friend",
                    data.id,
                    JSON.parse(JSON.stringify(channels_list))
                )
                apply_html(channels_list)
            })})
        }

    }
    if(flags.includes("exp_friends")
    && !wayback_settings.includes("sections")) {
        createDefaultFriendsSections();
    } else if(!wayback_settings.includes("sections")) {
        code = code.replace("yt2009_subscriptions_count", "0")
        code = code.replace("yt2009_friends_count", "0")
    }

    // exp_playlists
    if(flags.includes("exp_playlists")) {
        function apply_html(data) {
            let playlists_scrollbox_html = `
            <div class="outer-scrollbox yt2009-scrollbox scrollbox-playlists hid">
                <div id="playnav-play-all-items" class="inner-scrollbox">
                    <div class="playnav-playlist-header">
                        <a style="text-decoration:none" class="title title-text-color">
                            <span id="playnav-playlist-playlists-all-title" class="title">Playlists</span>
                        </a>
                    </div>`

            data.forEach(playlist => {
                if(playlist.name == "Favorites") {
                    code = code.replace(`<!--yt2009_favorites_remove_start`, "")
                    code = code.replace(`yt2009_favorites_remove_end-->`, "")
                    code = code.replace(`yt2009_favorites_id_value`, playlist.id)
                }
                playlists_scrollbox_html += `
            <div class="playnav-item playnav-playlist" onclick="openPlaylist(this)" data-id="${playlist.id}">
                <div class="content">
                    <div class="playnav-video-thumb link-as-border-color playlist-thumbnail">
                        <a class="video-thumb-90 no-quicklist" href="#"><img src="${playlist.thumbnail.replace("http", req.protocol)}" class="vimg90 yt-uix-hovercard-target"></a>
            
                    </div>
                    <div class="playnav-video-info">
                        <a href="#" class="playnav-item-title ellipsis"><span>${playlist.name}</span></a>
                        <div class="metadata">${playlist.videos} videos</div>
                    </div>
                </div>
            </div>`
            })


            playlists_scrollbox_html += `
                    <div class="spacer">&nbsp;</div>
                    <div class="scrollbox-separator">
                        <div class="outer-box-bg-as-border"></div>
                    </div>
                </div>
            </div>`

            if(data.length !== 0) {
                code = code.replace(`<!--yt2009_playlists_remove_start`, "")
                code = code.replace(`yt2009_playlists_remove_end-->`, "")
            }
            code = code.replace("<!--yt2009_playlists_scrollbox-->", playlists_scrollbox_html)

            stepsTaken++;
            if(stepsRequiredToCallback == stepsTaken) {
                setTimeout(function() {
                    try {callback(code)}catch(error) {}
                }, 500)
            }
        }

        function apply_html_tab_all(data) {
            if(data.length == 0) return;
            let scrollbox_html = `
            <div class="playnav-playlist-header">
                <a style="text-decoration:none" class="title title-text-color">
                    <span id="playnav-playlist-all-all-title" class="title">Playlists</span>
                </a>
            </div>
            `

            data.forEach(playlist => {
                scrollbox_html += `
            <div class="playnav-item playnav-playlist" onclick="openPlaylist(this)" data-id="${playlist.id}">
                <div class="content">
                    <div class="playnav-video-thumb link-as-border-color playlist-thumbnail">
                        <a class="video-thumb-90 no-quicklist" href="#"><img src="${playlist.thumbnail}" class="vimg90 yt-uix-hovercard-target"></a>
            
                    </div>
                    <div class="playnav-video-info">
                        <a href="#" class="playnav-item-title ellipsis"><span>${playlist.name}</span></a>
                        <div class="metadata">${playlist.videos} videos</div>
                    </div>
                </div>
            </div>`
            })

            scrollbox_html += `
            <div class="playnav-play-column-all">
                <div class="playnav-more"><a class="channel-cmd" href="#" onclick="switchTab('playlists', $('#playnav-navbar-tab-playlists'))">see more</a></div>
            </div>
            <div class="spacer">&nbsp;</div>
            <div class="scrollbox-separator">
				<div class="outer-box-bg-as-border"></div>
			</div>`
            
            code = code.replace("<!--yt2009_all_scrollbox_playlists-->", scrollbox_html)
        }

        if(n_impl_yt2009channelcache.read("playlist")[data.id]) {
            // cache
            apply_html(n_impl_yt2009channelcache.read("playlist")[data.id])
            apply_html_tab_all(
                JSON.parse(
                    JSON.stringify(n_impl_yt2009channelcache
                                    .read("playlist")[data.id])
                )
                .splice(0, 5)
            )
        } else {
            // clean fetch
            fetch("https://youtube.com/channel/" + data.id + "/playlists", {
                "headers": yt2009constants.headers
            }).then(r => {r.text().then(response => {
                // parse danych
                let ytInitialData = JSON.parse(
                    response.split("var ytInitialData = ")[1]
                            .split(";</script>")[0]
                    )
                let playlists = []
                let parsedPlaylistData = []

                try {
                    playlists = ytInitialData.contents
                                .twoColumnBrowseResultsRenderer.tabs[2]
                                .tabRenderer.content.sectionListRenderer
                                .contents[0].itemSectionRenderer.contents[0]
                    if(playlists.gridRenderer) {
                        playlists = ytInitialData.contents
                                    .twoColumnBrowseResultsRenderer.tabs[2]
                                    .tabRenderer.content.sectionListRenderer
                                    .contents[0].itemSectionRenderer
                                    .contents[0].gridRenderer.items
                    } else if(playlists.shelfRenderer) {
                        playlists = ytInitialData.contents
                                    .twoColumnBrowseResultsRenderer.tabs[2]
                                    .tabRenderer.content.sectionListRenderer
                                    .contents[0].itemSectionRenderer
                                    .contents[0].shelfRenderer.content
                                    .horizontalListRenderer.items
                    }

                    playlists.forEach(playlist => {
                        if(playlist.gridPlaylistRenderer) {
                            playlist = playlist.gridPlaylistRenderer;
                            let videoId = playlist.navigationEndpoint
                                            .watchEndpoint.videoId
                            parsedPlaylistData.push({
                                "name": playlist.title.runs[0].text,
                                "videos": parseInt(
                                    playlist.videoCountShortText.simpleText
                                ),
                                "thumbnail": "http://i.ytimg.com/vi/" + videoId  + "/hqdefault.jpg",
                                "id": playlist.playlistId
                            })
                        }
                    })

                    // podkładanie do htmla
                    // karta playlisty
                    n_impl_yt2009channelcache.write(
                        "playlist",
                        data.id,
                        JSON.parse(JSON.stringify(parsedPlaylistData))
                    )
                    apply_html(
                        n_impl_yt2009channelcache.read("playlist")[data.id],
                        `<!--yt2009_playlists_scrollbox-->`
                    )
                    // karta all
                    apply_html_tab_all(
                        JSON.parse(
                            JSON.stringify(
                                n_impl_yt2009channelcache
                                .read("playlist")[data.id]
                            )
                        ).splice(0, 5)
                    )
                }
                catch(error) {
                    n_impl_yt2009channelcache.write("playlist", data.id, [])
                    apply_html([])
                }
            })})
        }
    }

    // wayback_features
    if(flags.includes("wayback_features")) {
        wayback_channel.read(data.url, (waybackData => {
            // "basic" settings
            if(wayback_settings.includes("basic")) {
                code = code.split(`yt2009_channel_avatar`)
                            .join(waybackData.avatarUrl)
                
                // remove wayback background link as yt still stores those
                let customCSS = ""
                if(typeof(waybackData.customCSS) == "string") {
                    customCSS = waybackData.customCSS
                    /*if(customCSS.includes("web.archive.org")) {
                        let waybackLink = "http://" + customCSS.split(
                            `url(http://web.)`
                        )[1].split("http://")[0]
                        console.log(waybackLink)
                    }*/
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
            

            // fields
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
            } else {
                // default fields render
            }

            // sections
            function renderWaybackSection(sectionName, sectionArray,
                                        fullHTML, useSixColumn) {
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
            
            if(wayback_settings.includes("sections")) {
                // only render wayback sections if we have any
                if(waybackData.friends.length > 0
                || waybackData.subscribers.length > 0
                || waybackData.subscriptions.length > 0) {
                    // slots determine where on the page the section is displayed.
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
                                renderWaybackSection(
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
                                renderWaybackSection(
                                    "subscriptions",
                                    waybackData.subscriptions,
                                    false
                                )
                            )
                            code = code.replace(
                                ` (yt2009_subscriptions_count)`,
                                ``
                            )
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
                                renderWaybackSection(
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
                // otherwise render the default sections
                else {
                    createDefaultFriendsSections();
                }
            }
            
            // channel comments
            if(waybackData.comments
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
            }


            stepsTaken++;
            if(stepsRequiredToCallback == stepsTaken) {
                try {callback(code)}catch(error) {}
            }
        }), req.query.resetcache == 1)
    }

    // finalize if no other fetching needs to be done
    stepsTaken++;
    if(stepsRequiredToCallback == stepsTaken) {
        code = code.replace("yt2009_subscriptions_count", "0")
        code = code.replace("yt2009_friends_count", "0")
        callback(code)
    }
}

module.exports = {
    "main": function(req, res, flags, sendRawData) {
        // url parse
        let url = ""
        switch(req.path.split("/")[1]) {
            case "user": {
                url = "user/" + req.path
                                .split("/")[2]
                                .split("/")[0]
                                .split("?")[0]
                break;
            }
            case "channel": {
                if(!req.path
                    .split("/")[2]
                    .split("?")[0]
                    .toLowerCase()
                    .startsWith("uc")) return;
                url = "channel/" + req.path
                                    .split("/")[2]
                                    .split("/")[0]
                                    .split("?")[0]
                break;
            }
            case "c": {
                url = "c/" + req.path
                            .split("/")[2]
                            .split("/")[0]
                            .split("?")[0]
                break;
            }
        }
        if(req.path.startsWith("/@")) {
            url = req.path
            .split("/")[1]
            .split("/")[0]
            .split("?")[0]
        }

        let flashMode = req.query.f == 1

        if(req.headers.cookie.includes("f_mode")) {
            flashMode = true;
        }
    
        if(req.log) {
            console.log(`(${yt2009utils.get_used_token(req)}) channel ${url}`)
        }
    
        if(n_impl_yt2009channelcache.read("main")[url]
        && req.query.resetcache !== "1") {
            // wysyłanie z cache jak mamy
            if(sendRawData) {
                res.send(n_impl_yt2009channelcache
                        .read("main")[url])
            } else {
                internal_applyHTML(n_impl_yt2009channelcache
                                    .read("main")[url], flags, (html) => {
                    try {
                        res.send(html)
                    }
                    catch(error) {}
                }, req, flashMode)
            }
        } else {
            // fetch
            fetch("https://youtube.com/" + url + "/videos?view=0&sort=p&flow=grid", {
                "headers": {
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "en-US,en;q=0.9",
                    "dnt": 1,
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "same-origin",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
                }
            }).then(r => {r.text().then(response => {
                // parse danych
                // fetchujemy /videos żeby od razu mieć filmy do pokazania
                let additionalFetchesCompleted = 0;
                let fetchesRequired = 1;
                let ytInitialData;
                try {
                    ytInitialData = JSON.parse(
                        response.split("var ytInitialData = ")[1]
                                .split(";</script>")[0]
                    )
                }
                catch(error) {
                    res.send(`[yt2009]
                            <br><hr>
                            error getting channel data
                            <br>404 error?<br>(most common cause - the user doesn't exist)`)
                    return;
                }
    
                let data = {}
                data.name = ytInitialData.metadata.channelMetadataRenderer.title
                data.id = ytInitialData.header.c4TabbedHeaderRenderer.channelId
                data.url = url;
                data.properties = {
                    "name": ytInitialData.metadata
                            .channelMetadataRenderer.title,
                    "subscribers": ytInitialData.header
                                    .c4TabbedHeaderRenderer.subscriberCountText
                                    ? ytInitialData.header.c4TabbedHeaderRenderer
                                        .subscriberCountText.simpleText
                                        .replace(" subscribers", "")
                                    : "[disabled]",
                    "description": ytInitialData.metadata
                                    .channelMetadataRenderer.description
                                    .split("\n").join("<br>") || ""
                }
    
                // lista filmów
                data.videos = []

                ytInitialData.contents
                .twoColumnBrowseResultsRenderer.tabs.forEach(tab => {
                    try {
                        if(tab.tabRenderer && tab.tabRenderer.selected) {
                            tab = tab.tabRenderer.content
                            tab.richGridRenderer.header
                            .feedFilterChipBarRenderer.contents
                            .forEach(chip => {
                                if(chip.chipCloudChipRenderer
                                    .text.simpleText == "Popular") {
                                    // most popular videos fetch
                                    let continuation = chip.chipCloudChipRenderer
                                                        .navigationEndpoint
                                                        .continuationCommand.token
                                    fetch("https://www.youtube.com/youtubei/v1/browse?key=" + yt2009html.get_api_key(), {
                                        "headers": {
                                            "accept": "*/*",
                                            "accept-language": "en-US,en;q=0.9",
                                            "content-type": "application/json",
                                            "sec-fetch-dest": "empty",
                                            "sec-fetch-mode": "same-origin",
                                            "sec-fetch-site": "same-origin",
                                            "sec-gpc": "1",
                                            "x-goog-eom-visitor-id": yt2009html.get_innertube_context().visitorData,
                                            "x-youtube-bootstrap-logged-in": "false",
                                            "x-youtube-client-name": "1",
                                            "x-youtube-client-version": yt2009html.get_innertube_context().clientVersion,
                                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
                                        },
                                        "referrer": "https://www.youtube.com/" + url,
                                        "referrerPolicy": "origin-when-cross-origin",
                                        "body": JSON.stringify({
                                            "context": yt2009html.get_innertube_context(),
                                            "continuation": continuation
                                        }),
                                        "method": "POST",
                                        "mode": "cors"
                                    }).then(r => {
                                        r.json().then(response => {
                                            if(!response
                                                .onResponseReceivedActions) {
                                                throw new error;
                                                return;
                                            }
                                            response
                                            .onResponseReceivedActions[1]
                                            .reloadContinuationItemsCommand
                                            .continuationItems
                                            .forEach(video => {
                                                if(video
                                                    .continuationItemRenderer)
                                                return;
                                                video = video.richItemRenderer
                                                ? video.richItemRenderer
                                                    .content.videoRenderer
                                                : video.gridVideoRenderer
                                                data.videos.push({
                                                    "id": video.videoId,
                                                    "title": video.title
                                                            .runs[0].text,
                                                    "views": video
                                                            .viewCountText
                                                            .simpleText,
                                                    "upload": video
                                                            .publishedTimeText
                                                            .simpleText,
                                                    "thumbnail":
                                                            "http://i.ytimg.com/vi/"
                                                            + video.videoId
                                                            + "/hqdefault.jpg"})
                                            })
                                            postVideosGetCreate();
                                        })
                                    })
                                }
                            })
                        }
                    }
                    // fallback: use existing videos
                    catch(error) {
                        try {
                            ytInitialData.contents
                            .twoColumnBrowseResultsRenderer.tabs[1]
                            .tabRenderer.content.sectionListRenderer
                            .contents[0].itemSectionRenderer
                            .contents[0].gridRenderer.items
                            .forEach(video => {
                                if(video.gridVideoRenderer) {
                                    video = video.gridVideoRenderer
                                    data.videos.push({
                                        "id": video.videoId,
                                        "title": video.title.runs[0].text,
                                        "views": video.viewCountText
                                                .simpleText,
                                        "upload": video.publishedTimeText
                                                .simpleText,
                                        "thumbnail": "http://i.ytimg.com/vi/"
                                                    + video.videoId
                                                    + "/hqdefault.jpg"
                                    })
                                }
                            })
                            postVideosGetCreate()
                        }
                        catch(error) {
                            try {
                                ytInitialData.contents
                                .twoColumnBrowseResultsRenderer.tabs[1]
                                .tabRenderer.content.richGridRenderer
                                .contents.forEach(video => {
                                    if(video.richItemRenderer) {
                                        video = video.richItemRenderer
                                                .content.videoRenderer
                                        data.videos.push({
                                            "id": video.videoId,
                                            "title": video.title.runs[0].text,
                                            "views": video.viewCountText
                                                    .simpleText,
                                            "upload": video.publishedTimeText
                                                    .simpleText,
                                            "thumbnail": "http://i.ytimg.com/vi/"
                                                        + video.videoId
                                                        + "/hqdefault.jpg"})
                                    }
                                })
                            }
                            catch(error) {}
                            postVideosGetCreate()
                        }
                    }
                })

                function postVideosGetCreate() {
                    // zapisz avatar
                    let avatar = ytInitialData.header.c4TabbedHeaderRenderer
                                .avatar.thumbnails[1].url
                        
                    let fname = avatar.split("/")[avatar.split("/").length - 1]
                    if(!fs.existsSync(`../assets/${fname}.png`)) {
                        fetch(avatar, {
                            "headers": {
                                "accept-encoding": "gzip, deflate, br",
                                "accept-language": "en-US,en;q=0.9",
                                "dnt": 1,
                                "sec-fetch-dest": "document",
                                "sec-fetch-mode": "navigate",
                                "sec-fetch-site": "same-origin",
                                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
                            }
                        }).then(r => {
                            r.buffer().then(buffer => {
                                fs.writeFileSync(`../assets/${fname}.png`,
                                                buffer)
                            })
                        })
                    }
                    data.avatar = `/assets/${fname}.png`

                    // kolor dominujący
                    try {
                        let banner = ytInitialData.header
                                    .c4TabbedHeaderRenderer.banner
                                    .thumbnails[0].url
                        let banner_fname = banner.split("/")
                                            [banner.split("/").length - 1]
                        if(!fs.existsSync(`../assets/${banner_fname}.png`)) {
                            fetch(banner, {
                                "headers": {
                                    "accept-encoding": "gzip, deflate, br",
                                    "accept-language": "en-US,en;q=0.9",
                                    "dnt": 1,
                                    "sec-fetch-dest": "document",
                                    "sec-fetch-mode": "navigate",
                                    "sec-fetch-site": "same-origin",
                                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
                                }
                            }).then(r => {
                                r.buffer().then(buffer => {
                                    fs.writeFileSync(
                                        `../assets/${banner_fname}.png`,
                                        buffer
                                    )
                                    data["banner"] = banner_fname + ".png"

                                    dominant_color(
                                        `${__dirname}/../assets/${banner_fname}.png`,
                                        (color) => {
                                        data["dominant_color"] = color
                                        additionalFetchesCompleted++;
                                        if(additionalFetchesCompleted
                                            == fetchesRequired) {
                                            yt2009channelcache
                                            .writeCache(
                                                url,
                                                JSON.parse(JSON.stringify(data))
                                            )
                                            n_impl_yt2009channelcache.write(
                                                "main", url, data
                                            )
                                            if(sendRawData) {
                                                res.send(data)
                                            } else {
                                                flags.includes("index_contribute")
                                                ? featured_channels[url]
                                                    = data : ""
                                                fs.writeFileSync(
                                                    `./cache_dir/public_channel_listing.json`,
                                                    JSON.stringify(featured_channels)
                                                )
                                                internal_applyHTML(
                                                    data,
                                                    flags,
                                                    (html) => {
                                                        res.send(html)
                                                    },
                                                    req)
                                            }
                                        }
                                    }, 32)
                                })
                            })
                        } else {
                            data["banner"] = banner_fname + ".png"
                            dominant_color(`${__dirname}/../assets/${banner_fname}.png`, (color) => {
                                data["dominant_color"] = color
                                additionalFetchesCompleted++;
                                if(additionalFetchesCompleted
                                    == fetchesRequired) {
                                    if(sendRawData) {
                                        res.send(data)
                                    } else {
                                        yt2009channelcache.writeCache(
                                            url,
                                            JSON.parse(JSON.stringify(data))
                                        )
                                        flags.includes("index_contribute")
                                        ? featured_channels[url] = data : ""
                                        fs.writeFileSync(
                                            `./cache_dir/public_channel_listing.json`,
                                            JSON.stringify(featured_channels)
                                        )
                                        internal_applyHTML(
                                            data,
                                            flags,
                                            (html) => {
                                                res.send(html)
                                            },
                                            req,
                                            flashMode
                                        )
                                        n_impl_yt2009channelcache.write(
                                            "main",
                                            url,
                                            data
                                        )
                                    }
                                }
                            }, 32)
                        }
                    }
                    catch(error) {
                        data["dominant_color"] = [180, 180, 180]
                        additionalFetchesCompleted++;
                        if(additionalFetchesCompleted == fetchesRequired) {
                            if(sendRawData) {
                                res.send(data)
                            } else {
                                yt2009channelcache.writeCache(
                                    url,
                                    JSON.parse(JSON.stringify(data))
                                )
                                flags.includes("index_contribute")
                                ? featured_channels[url] = data : ""
                                fs.writeFileSync(
                                    `./cache_dir/public_channel_listing.json`,
                                    JSON.stringify(featured_channels)
                                )
                                internal_applyHTML(data, flags, (html) => {
                                    res.send(html)
                                }, req, flashMode)
                                n_impl_yt2009channelcache.write("main",
                                                                url, data)
                            }
                        }
                    }
                }
            })})
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
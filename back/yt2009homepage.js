const fs = require("fs")
const videos = require("./yt2009constants.json");
const yt2009html = require("./yt2009html")
const yt2009utils = require("./yt2009utils")
const wayback_watchpage = require("./cache_dir/wayback_watchpage")
const doodles = require("./yt2009doodles")
const languages = require("./language_data/language_engine")
const templates = require("./yt2009templates")

const homepage_code = fs.readFileSync("../index.htm").toString()

const sections = {
    "top_favorited": videos.homepageCache_top_favorited,
    "gaming": videos.homepageCache_gaming,
    "science_technology": videos.homepageCache_science_technology,
    "howto_style": videos.homepageCache_howto_style,
    "sports": videos.homepageCache_sports,
    "film_animation": videos.homepageCache_film_animation,
    "news": videos.homepageCache_news,
    "music": videos.homepageCache_music,
    "entertainment": videos.homepageCache_entertainment
}

function section_fill(code, section_name, section_content, flags, protocol) {
    flags = flags.split(";")
    let views = section_content.views;
    if(flags.includes("realistic_view_count")
    && parseInt(views.replace(/[^0-9]/g, "")) >= 100000) {
        views = yt2009utils.countBreakup(
            Math.floor(parseInt(views.replace(/[^0-9]/g, "")) / 90)
        ) + " views"
    }
    let name = section_content.uploaderName
    if(flags.includes("remove_username_space")) {
        name = name.split(" ").join("")
    }
    let title = section_content.title
    if(section_name.includes("watchednow")
    && wayback_watchpage.readCacheOnly(section_content.id)) {
        let waybackData = wayback_watchpage.readCacheOnly(section_content.id)
        if(waybackData.title) {
            title = waybackData.title
        }
        if(waybackData.authorName
        && !waybackData.authorName.toLowerCase().includes("subscribe")) {
            name = waybackData.authorName
        }
    }

    views = "lang_views_prefix" + views.replace(" views", "lang_views_suffix")

    let thumbUrl = "hqdefault.jpg"
    if(flags.includes("autogen_thumbnails")) {
        thumbUrl = "1.jpg"
    }

    let temp_code = code;
    temp_code = temp_code.split(`/yt2009_${section_name}_watch`)
                         .join(`/watch?v=${section_content.id}`)
    temp_code = temp_code.split(`/yt2009_${section_name}_thumbnail`)
                         .join(`${protocol}://i.ytimg.com/vi/${section_content.id}/${thumbUrl}`)
    temp_code = temp_code.split(`yt2009_${section_name}_title`)
                         .join(title.trim())
    temp_code = temp_code.split(`yt2009_${section_name}_time`)
                         .join(section_content.time)
    temp_code = temp_code.split(`yt2009_${section_name}_views`)
                         .join(views)
    temp_code = temp_code.split(`yt2009_${section_name}_uploader_url`)
                         .join(section_content.uploaderUrl)
    temp_code = temp_code.split(`yt2009_${section_name}_uploader_name`)
                         .join(name)

    return temp_code;
}


module.exports = function(req, res) {
    let flags = req.query.flags || ""
    try {
        req.headers.cookie.split(";").forEach(cookie => {
            if(cookie.trimStart().startsWith("mainpage_flags")) {
                flags += cookie.trimStart().replace("mainpage_flags=", "")
                                           .split(":").join(";")
            }
            if(cookie.trimStart().startsWith("global_flags=")) {
                flags += cookie.trimStart().replace("global_flags=", "")
                                           .split(":").join(";")
            }
        })
    }
    catch(error) {}

    // resetflag
    if(req.query.resetflags == 1) {
        flags = ""
    }

    // replace sekcji randomowymi filmami z sections (constants)
    let code = homepage_code;

    // shows tab
    if((req.headers.cookie || "").includes("shows_tab")) {
        code = code.replace(
            `<a href="/channels">lang_channels</a>`,
            `<a href="/channels">lang_channels</a><a href="#">lang_shows</a>`
        )
    }
    

    code = require("./yt2009loginsimulate")(req, code, true)

    // module-based stuff
    let moduleHTML = ``
    let modules = "rec,watched,featured,pop,inbox"
    if((req.headers.cookie || "").includes("homepage_picked=")) {
        modules = req.headers.cookie.split("homepage_picked=")[1].split(";")[0]
    }
    modules.split(",").forEach(m => {
        switch(m) {
            case "rec": {
                moduleHTML += templates.homepage_recommended
                break;
            }
            case "watched": {
                // videos watched now
                let watchedNow = yt2009html.featured().slice(0, 4)
                if(watchedNow.length < 4) return;
                moduleHTML += templates.homepage_watched
            
                let watchedNowIndex = 0;
                watchedNow.forEach(watched => {
                    moduleHTML = section_fill(
                        moduleHTML,
                        `watchednow${watchedNowIndex}`,
                        watched,
                        flags,
                        req.protocol
                    )
                    watchedNowIndex++;
                })
                break;
            }
            case "featured": {
                // featured
                moduleHTML += templates.homepage_featured
                let featured_videos = []
                while(featured_videos.length !== 4) {
                    let video = videos.homepageCache_featured[
                        Math.floor(Math.random() * videos.homepageCache_featured.length)
                    ]
                    if(!featured_videos.includes(video)) {
                        featured_videos.push(video)
                    }
                }

                let featuredIndex = 0;
                featured_videos.forEach(video => {
                    moduleHTML = section_fill(
                        moduleHTML,
                        `featured${featuredIndex}`,
                        video,
                        flags,
                        req.protocol
                    )
                    featuredIndex++;
                })
                break;
            }
            case "pop": {
                // most popular by category
                moduleHTML += templates.homepage_mostpopular
                for(let section in sections) {
                    let vid = sections[section][
                        Math.floor(Math.random() * sections[section].length)
                    ]
                    moduleHTML = section_fill(
                        moduleHTML, section, vid, flags, req.protocol
                    )
                }
                break;
            }
            case "inbox": {
                // show inbox
                code = code.replace(
                    `<!--yt2009_inbox-->`,
                    templates.homepage_inbox
                )
                break;
            }
            case "activity": {
                // friendtivity
                let cellsHTML = ""
                let comments = yt2009utils.latestCustomComments(3)
                if(comments.length == 0) return;
                comments.forEach(cmt => {
                    let video = yt2009html.get_cache_video(cmt.video)
                    if(!video || !video.title) return;
                    cellsHTML += templates.friendtivity_comment(
                        video, cmt.author, cmt.text, flags
                    )
                })
                let fullModule = templates.homepage_friendtivity.replace(
                    "fri-data_fill", cellsHTML
                )
                moduleHTML += fullModule
                break;
            }
            case "nearyou": {
                moduleHTML += templates.homepage_nearyou
                break;
            }
            case "latest": {
                moduleHTML += templates.homepage_subs
                break;
            }
        }
    })

    code = code.replace(
        `<!--yt2009_modules-->`,
        moduleHTML
    )

    if((req.headers.cookie || "").includes("login_simulate")) {
        code = code.replace(
            `yt2009-signin-hide`,
            `yt2009-signin-hide hid`
        )
    }

    if(code.includes("signout_btn")) {
        // hide login promo when using login_simulate
        code = code.replace(
            `id="iyt-login-suggest-side-box" class="homepage-side-block"`,
            `id="iyt-login-suggest-side-box" class="homepage-side-block hid"`
        )
        // show login-only stuff
        code = code.split(
            `hid yt2009-login-only-box`
        ).join(
            `yt2009-login-only-box`
        )
        code = code.replace(
            `class="homepage-non-interactive"`, ""
        )
    }

    // set <title> based on login_simulate
    let default_title = "YouTube - Broadcast Yourself."
    if((req.headers.cookie || "").includes("login_simulate")) {
        let signedInName = req.headers.cookie.split("login_simulate")[1]
                                             .split(";")[0]
                                             .split(":")[0]
        signedInName = yt2009utils.xss(decodeURIComponent(signedInName))
        code = code.replace(
            "yt2009_pagetitle",
            "YouTube - " + signedInName + "'s YouTube"
        )
    } else {
        code = code.replace(
            "yt2009_pagetitle",
            default_title
        )
    }


    // fallback notification
    let addNotice = false;
    let noticeText = "";
    if(require("./config.json").fallbackMode
    && (!req.headers.cookie
    || (req.headers.cookie
    && !req.headers.cookie.includes("disable_fallback")))) {
        addNotice = true;
        noticeText = "yt2009 was loaded in fallback mode."
                   + " it may have happened after multiple"
                   + " failed restarts. some features may not"
                   + " work correctly."
    }

    let ytsessions = {
        "1": "This video is not available.",
        "2": "This channel is not available."
    }
    if(req.query.ytsession
    && ytsessions[req.query.ytsession]) {
        addNotice = true;
        noticeText = ytsessions[req.query.ytsession]
    }

    if(require("./config.json").customHomepageText) {
        addNotice = true;
        noticeText = require("./config.json").customHomepageText
    }

    if(addNotice) {
        code = code.replace(
            `<!--yt2009_notify-->`,
            `<div id="error-box" class="errorBox">
                ${noticeText}
            </div>`
        )
    }


    code = languages.apply_lang_to_code(code, req)
    code = doodles.applyDoodle(code)

    // wysyłamy
    res.send(code)
}
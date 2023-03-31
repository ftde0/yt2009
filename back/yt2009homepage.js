const fs = require("fs")
const videos = require("./yt2009constants.json");
const yt2009html = require("./yt2009html")
const yt2009utils = require("./yt2009utils")
const wayback_watchpage = require("./cache_dir/wayback_watchpage")

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

    let temp_code = code;
    temp_code = temp_code.split(`/yt2009_${section_name}_watch`)
                         .join(`/watch?v=${section_content.id}`)
    temp_code = temp_code.split(`/yt2009_${section_name}_thumbnail`)
                         .join(`${protocol}://i.ytimg.com/vi/${section_content.id}/hqdefault.jpg`)
    temp_code = temp_code.split(`yt2009_${section_name}_title`)
                         .join(title)
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
        })
    }
    catch(error) {}

    // resetflag
    if(req.query.resetflags == 1) {
        flags = ""
    }

    // replace sekcji randomowymi filmami z sections (constants)
    let code = homepage_code;

    for(let section in sections) {
        let vid = sections[section][
            Math.floor(Math.random() * sections[section].length)
        ]
        code = section_fill(code, section, vid, flags, req.protocol)
    }

    // featured
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
        code = section_fill(
            code,
            `featured${featuredIndex}`,
            video,
            flags,
            req.protocol
        )
        featuredIndex++;
    })

    // videos watched now
    let watchedNow = yt2009html.featured().slice(0, 4)

    if(watchedNow.length < 4) {
        // hide the section if less than 4 videos watched
        code = code.replace(`yt2009_mark_hid_if_needed`, `hid`)
    }

    let watchedNowIndex = 0;
    watchedNow.forEach(watched => {
        code = section_fill(
            code,
            `watchednow${watchedNowIndex}`,
            watched,
            flags,
            req.protocol
        )
        watchedNowIndex++;
    })

    // shows tab
    if((req.headers.cookie || "").includes("shows_tab")) {
        code = code.replace(
            `<a href="/channels">Channels</a>`,
            `<a href="/channels">Channels</a><a href="#">Shows</a>`
        )
    }
    

    code = require("./yt2009loginsimulate")(req, code)

    if(code.includes("Sign Out")) {
        // hide login promo when using login_simulate
        code = code.replace(
            `id="iyt-login-suggest-side-box" class="homepage-side-block"`,
            `id="iyt-login-suggest-side-box" class="homepage-side-block hid"`
        )
        // pokaż dla nich inbox
        code = code.replace(
            `hid yt2009-login-only-box`,
            `yt2009-login-only-box`
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
    if(require("./config.json").fallbackMode) {
        let fallbackNotice = "yt2009 was loaded in fallback mode."
                           + " it may have happened after multiple"
                           + " failed restarts. some features may not"
                           + " work correctly."
        code = code.replace(
            `<!--yt2009_notify-->`,
            `<div id="error-box" class="errorBox">
        ${fallbackNotice}
    </div>`
        )
    }


    // wysyłamy
    res.send(code)
}
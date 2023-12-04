const fetch = require("node-fetch")
const child_process = require("child_process")
const config = require("./back/config.json")
const constants = require("./back/yt2009constants.json")
const fs = require("fs")

/*
=======
check external clis
=======
*/
let check_tools = ["ffmpeg -h", "magick --help", "convert --version"]
check_tools.forEach(tool => {
    console.log("== checking external tool: " + tool.split(" ")[0])
    try {
        child_process.execSync(tool, {
            "stdio": "pipe"
        })
    }
    catch(error) {
        console.log(tool.split(" ")[0] + " not found!! make sure it is in your path")
        console.log("exiting")
        process.exit()
    }
})

/*
=======
generate tokens if prod
=======
*/
let tokensCount = 25;
if(config.env == "prod"
&& !config.tokens) {
    console.log("environment set to prod but no tokens. generating!!")
    let tokens = []
    while(tokens.length !== tokensCount) {
        let token = ""
        while(token.length !== 9) {
            token += "qwertyuiopasdfghjklzxcvbnm1234567890".split("")
                    [Math.floor(Math.random() * 36)]
        }
        tokens.push(token)
    }
    config.tokens = tokens
    console.log("writing " + tokensCount + " usable tokens to config")
    fs.writeFileSync("./back/config.json", JSON.stringify(config))
}

/*
=======
create cache files
=======
*/
const cacheFiles = {
    "channel_main_cache.json": {},
    "channel_playlist_cache.json": {},
    "default_avatar_adapt.json": {},
    "playlist_cache.json": {},
    "public_channel_listing.json": [],
    "rating_cache.json": {},
    "ryd_cache.json": {},
    "search_cache.json": {},
    "userid.json": {},
    "video_cache.json": {},
    "video_exists_cache.json": {},
    "watched_now.json": [],
    "wayback_channel_cache.json": {},
    "wayback_watch_cache.json": {},
    "captions_cache.json": {}
}
console.log("creating cache files")
for(let file in cacheFiles) {
    if(!fs.existsSync("./back/cache_dir/" + file)) {
        fs.writeFileSync(
            "./back/cache_dir/" + file,
            JSON.stringify(cacheFiles[file])
        )
    }
}

fs.mkdirSync("./back/cache_dir/annotations/")
fs.mkdirSync("./back/cache_dir/subtitles/")

/*
=======
generate innertube data
=======
*/
console.log("== generating innertube data")
let ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0"
if(!config.userAgent) {
    console.log("useragent not found in config, using \"" + ua + "\"")
    console.log("if you wish to use your own user agent,"
                + "add a userAgent entry to config.json.")
    constants.headers["user-agent"] = ua
} else {
    ua = config.userAgent;
}
fetch("https://www.youtube.com/", {
    "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
        "user-agent": ua
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
}).then(r => {
    // set cookies
    let cookie = r.headers.get("set-cookie").split(",")
    let cookieString = ""
    cookie.forEach(part => {
        if(part.split(";")[0].includes("=")) {
            cookieString += part.trimStart().split(";")[0] + "; "
        }
    })
    constants.headers.cookie = cookieString

    // set innertube context
    r.text().then(res => {
        let context = res.split(`"INNERTUBE_CONTEXT":`)[1]
                         .split(`,"user":{"lockedSafetyMode":`)[0] + "}"
        constants.cached_innertube_context = JSON.parse(context)

        console.log("writing to constants")
        fs.writeFileSync("./back/yt2009constants.json",
                        JSON.stringify(constants))
        console.log("=== !!! ===")
        console.log("/back/yt2009constants.json was modified to include unique data.")
        console.log("this data may include the used useragent, your ip and others.")
        console.log("make sure to remove such data if you intend on sharing your copy.")
        setTimeout(function() {
            console.log("=== downloading assets ===")
            downloadFile()
        }, 402)
    })
})

/*
=======
download site-assets
=======
*/
let files = [
    {
        "url": "https://web.archive.org/web/20091007050445if_/http://s.ytimg.com/yt/img/master-vfl121679.png",
        "path": "./master-vfl121679.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/video_bar_arrows-vfl84478.png",
        "path": "./video_bar_arrows-vfl84478.png"
    },
    {
        "url": "http://web.archive.org/web/20091121010820if_/http://www.youtube.com/favicon.ico",
        "path": "./favicon.ico"
    },
    {
        "url": "https://s.ytimg.com/yt/img/active_sharing_on-vfl70992.png",
        "path": "./assets/site-assets/active_sharing_on-vfl70992.png",
    },
    {
        "url": "https://s.ytimg.com/yt/img/activity_indicator-vfl120761.gif",
        "path": "./assets/site-assets/activity_indicator-vfl120761.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/annotations_editor_switch-vfl78622.gif",
        "path": "./assets/site-assets/annotations_editor_switch-vfl78622.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/annotations_icon-vfl78622.gif",
        "path": "./assets/site-assets/annotations_icon-vfl78622.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/arrow_dropdown-vfl29016.gif",
        "path": "./assets/site-assets/arrow_dropdown-vfl29016.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/autoshare-vfl137249.png",
        "path": "./assets/site-assets/autoshare-vfl137249.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/static/background-drop-fade-vfl85178.gif",
        "path": "./assets/site-assets/background-drop-fade-vfl85178.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/badge_annotate-vfl55396.gif",
        "path": "./assets/site-assets/badge_annotate-vfl55396.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/badge_cc_domestic-vfl55396.gif",
        "path": "./assets/site-assets/badge_cc_domestic-vfl55396.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/badge_cc_intl-vfl55396.gif",
        "path": "./assets/site-assets/badge_cc_intl-vfl55396.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/badge_featurelength-vfl55396.gif",
        "path": "./assets/site-assets/badge_featurelength-vfl55396.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/but-bck-vfl33160.png",
        "path": "./assets/site-assets/but-bck-vfl33160.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/button_icons-vfl72305.png",
        "path": "./assets/site-assets/button_icons-vfl72305.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/cart_icons-vfl115610.png",
        "path": "./assets/site-assets/cart_icons-vfl115610.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/channel_iconset-vfl65968.gif",
        "path": "./assets/site-assets/channel_iconset-vfl65968.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/channel/channel-bg-sprites-vfl91176.png",
        "path": "./assets/site-assets/channel-bg-sprites-vfl91176.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/channel/channel-sprites-vfl115627.gif",
        "path": "./assets/site-assets/channel-sprites-vfl115627.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/close-vfl69806.png",
        "path": "./assets/site-assets/close-vfl69806.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/static/contentid-cm-logo-vfl85500.jpg",
        "path": "./assets/site-assets/contentid-cm-logo-vfl85500.jpg"
    },
    {
        "url": "https://s.ytimg.com/yt/img/static/contentid-tick-vfl85500.jpg",
        "path": "./assets/site-assets/contentid-tick-vfl85500.jpg"
    },
    {
        "url": "https://s.ytimg.com/yt/img/logos/creatorscorner-vfl114850.png",
        "path": "./assets/site-assets/creatorscorner-vfl114850.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/drop_shadow-vfl111653.png",
        "path": "./assets/site-assets/drop_shadow-vfl111653.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/themes/embed_selection-vfl81006.png",
        "path": "./assets/site-assets/embed_selection-vfl81006.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/faketrans-vfl35975.gif",
        "path": "./assets/site-assets/faketrans-vfl35975.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/flags/flags-vfl57703.gif",
        "path": "./assets/site-assets/flags-vfl57703.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/forums_master-vfl68068.gif",
        "path": "./assets/site-assets/forums_master-vfl68068.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/icn_loading_animated-vfl24663.gif",
        "path": "./assets/site-assets/icn_loading_animated-vfl24663.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/img_about_toexternal_14x9-vfl35309.gif",
        "path": "./assets/site-assets/img_about_toexternal_14x9-vfl35309.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/iyt-vfl105161.png",
        "path": "./assets/site-assets/iyt-vfl105161.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/logo_content-id_352x109-vfl100716.png",
        "path": "./assets/site-assets/logo_content-id_352x109-vfl100716.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/master_old-vfl72391.gif",
        "path": "./assets/site-assets/master_old-vfl72391.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/mmgrads-vfl38740.gif",
        "path": "./assets/site-assets/mmgrads-vfl38740.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/mmimgs-vfl38740.gif",
        "path": "./assets/site-assets/mmimgs-vfl38740.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/mobile/img/pic_ytlogo_58x20-vfl124299.gif",
        "path": "./assets/site-assets/pic_ytlogo_58x20-vfl124299.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/pixel-vfl73.gif",
        "path": "./assets/site-assets/pixel-vfl73.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/play_all_small-vfl82345.png",
        "path": "./assets/site-assets/play_all_small-vfl82345.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/playlist_row_deleter-vfl69806.png",
        "path": "./assets/site-assets/playlist_row_deleter-vfl69806.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/profile-vfl30243.gif",
        "path": "./assets/site-assets/profile-vfl30243.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/sel-bck-omar-vfl34546.png",
        "path": "./assets/site-assets/sel-bck-omar-vfl34546.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/sharing_icons-vfl84489.png",
        "path": "./assets/site-assets/sharing_icons-vfl84489.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/silver-grad-vfl35285.png",
        "path": "./assets/site-assets/silver-grad-vfl35285.png"
    },
    {
        "url": "https://s.ytimg.com/yt/mobile/img/stars_5.0_49x9-vfl84759.gif",
        "path": "./assets/site-assets/stars_5.0_49x9-vfl84759.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/pixel-vfl73.gif",
        "path": "./assets/site-assets/ugcpromo_tagline_bg-vfl91176.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/video_bar_arrows-vfl84478.png",
        "path": "./assets/site-assets/video_bar_arrows-vfl84478.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/video_cluster_180_border-vfl88394.png",
        "path": "./assets/site-assets/video_cluster_180_border-vfl88394.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/yt-narrative-tail-vfl55396.gif",
        "path": "./assets/site-assets/yt-narrative-tail-vfl55396.gif"
    },
    {
        "url": "https://web.archive.org/web/20100815042640im_/http://s.ytimg.com/yt/m/mobile/img/apple-touch-icon2-vfl171763.png",
        "path": "./assets/site-assets/apple-touch-icon2-vfl171763.png"
    },
    {
        "url": "http://web.archive.org/web/20100815042630if_/http://s.ytimg.com/yt/m/mobile/img/blazer_sprite_high-vfl176462.png",
        "path": "./assets/site-assets/blazer_sprite_high-vfl176462.png"
    },
    {
        "url": "http://web.archive.org/web/20100815042635if_/http://s.ytimg.com/yt/m/mobile/img/blazer_sprite_vhigh-vfl176746.png",
        "path": "./assets/site-assets/blazer_sprite_vhigh-vfl176746.png"
    },
    {
        "url": "http://web.archive.org/web/20100815042625if_/http://s.ytimg.com/yt/m/mobile/img/blazer_sprite_low-vfl176462.png",
        "path": "./assets/site-assets/blazer_sprite_low-vfl176462.png"
    },
    {
        "url": "https://s.ytimg.com/yt/img/icn_cycds_warning-vfl33982.gif",
        "path": "./assets/site-assets/icn_cycds_warning-vfl33982.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/tooltip-reverse-vfl88394.gif",
        "path": "./assets/site-assets/tooltip-reverse-vfl88394.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/tooltip-vfl56131.gif",
        "path": "./assets/site-assets/tooltip-vfl56131.gif"
    },
    {
        "url": "https://s.ytimg.com/yt/img/longform-underlay-1x1-vfl55396.png",
        "path": "./assets/site-assets/longform-underlay-1x1-vfl55396.png"
    },
    {
        "url": "https://github.com/PaddeK/node-maxmind-db/raw/master/test/data/GeoLite2-City.mmdb",
        "path": "./back/GeoLite2-City.mmdb"
    },
    {
        "url": "https://s.ytimg.com/yt/img/youtube_logo_small_grey-vfl41206.png",
        "path": "./assets/site-assets/youtube_logo_small_grey-vfl41206.png"
    }
]
const initialFileCount = files.length
function downloadFile() {
    console.log("")
    let file = files[0]
    let fileNumber = initialFileCount - files.length + 1
    let relativeFileName = file.path.split("/")
    relativeFileName = relativeFileName[relativeFileName.length - 1]
    // save file
    setTimeout(function() {
        if(!fs.existsSync(file.path)) {
            console.log(`downloading ${relativeFileName} (${fileNumber}/${initialFileCount})`)
            fetch(file.url, {
                "headers": constants.headers
            }).then(r => {r.buffer().then(buffer => {
                fs.writeFileSync(file.path, buffer)
                // download the next file
                files.shift()
                if(files.length > 0) {
                    downloadFile()
                } else {
                    // done
                    console.log("file download done!!")
                }
            })})
        } else {
            // skip download if the file already exists
            console.log(`skipping ${relativeFileName}, file exists`)
            files.shift()
            if(files.length > 0) {
                downloadFile()
            } else {
                // done
                console.log("file download done!!")
            }
        }
    }, Math.floor(Math.random() * 604))
}

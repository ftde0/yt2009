const express = require("express");
const yt2009 = require("./yt2009html");
const yt2009_embed = require("./yt2009embed")
const yt2009_channels = require("./yt2009channels")
const yt2009_playlists = require("./yt2009playlists");
const yt2009_home = require("./yt2009homepage");
const yt2009_utils = require("./yt2009utils");
const yt2009_search = require("./yt2009search");
const yt2009_static = require("./yt2009static");
const yt2009_videos_page = require("./yt2009videos");
const yt2009_channels_page = require("./yt2009channelspage")
const yt2009_warp_test = require("./yt2009warp");
const yt2009_warp_swf = require("./yt2009warpSWF")
const yt2009_history = require("./yt2009history");
const yt2009_subs = require("./yt2009subscriptions");
const yt2009_favorites = require("./yt2009favorites");
const yt2009_mobile = require("./yt2009mobile");
const yt2009_client_playlists = require("./yt2009clientplaylists");
const yt2009_annotations = require("./yt2009annotations");
const yt2009_templates = require("./yt2009templates");
const yt2009_xl = require("./yt2009xl");
const yt2009_cps = require("./yt2009cps")
const yt2009_constant = require("./yt2009constants.json")
const yt2009_languages = require("./language_data/language_engine")
const yt2009_quicklist = require("./yt2009quicklistserver")
const yt2009_captions = require("./yt2009captions")
const yt2009_mobileflags = require("./yt2009mobileflags")
const yt2009_inbox = require("./yt2009inbox")
const yt2009_blazer = require("./yt2009mobileblazer")
//const yt2009_leanback = require("./yt2009leanback")
const yt2009_doodles = require("./yt2009doodles")
const yt2009_exports = require("./yt2009exports")
const ryd = require("./cache_dir/ryd_cache_manager")
const video_rating = require("./cache_dir/rating_cache_manager")
const config = require("./config.json")
const child_process = require("child_process")

const https = require("https")
const fs = require("fs")
const app = express();
app.use(express.raw({
    "type": () => true
}))

if(config.env == "dev") {
    let launchTime = ""
    let date = new Date();
    launchTime = `launch time: ${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()}`
    app.listen(config.port, () => {
        console.log(`
    ==========

    yt2009 - dev

    ==========
    ${launchTime}
        `);
    });
} else if(config.env == "prod") {
    if(config.useSSL) {
        const server = https.createServer({
            cert: fs.readFileSync(config.SSLCertPath),
            key: fs.readFileSync(config.SSLKeyPath)
        }, app).listen(config.SSLPort)    
    }
    
    app.listen(config.port, () => {
        console.log(`
    ==========

    yt2009 - prod

    ==========
        `);
    });
}

if(config.redirmode
&& typeof(config.redirmode) == "string") {
    app.get("*", (req, res) => {
        res.redirect(config.redirmode + req.path)
        return;
    })
    app.post("*", (req, res) => {
        res.redirect(config.redirmode + req.path)
        return;
    })
} else if(config.redirmode && typeof(config.redirmode) !== "string") {
    console.log("/!\\ config.redirmode set incorrectly. ignoring.")
}

// ws sync with master
let syncCommentCallbacks = {}
let syncCheckCallbacks = {}
if(!config.disableWs) {
    let wsIp = config.overrideMaster || "wss://orzeszek.website:178"
    function initWs() {
        if(yt2009_exports.read().masterWs) return;
        const ws = require("ws")
        try {
            yt2009_exports.writeData(
                "masterWs", new ws(wsIp)
            )
            let w = yt2009_exports.read().masterWs
            w.addEventListener("open", () => {
                w.send(JSON.stringify({
                    "type": "hello",
                    "user": "yt2009server"
                }))
            })
            w.addEventListener("message", (m) => {
                m = JSON.parse(m.data);
                switch(m.type) {
                    case "vids-sync": {
                        yt2009.masterVidsReceive(m.data)
                        break;
                    }
                    case "comment-feedback": {
                        if(syncCommentCallbacks[m.id]) {
                            syncCommentCallbacks[m.id](m)
                        }
                        if(m.source == "m") {
                            yt2009_mobile.commentCallback(m)
                        }
                        break;
                    }
                    case "comment-sync": {
                        let comments = yt2009.custom_comments()
                        let commentsAdded = 0
                        m.data.forEach(comment => {
                            if(!comment.id
                            || JSON.stringify(comments).includes(comment.id)) return;
                            if(!comments[comment.video]) {
                                comments[comment.video] = []
                            }
                            comments[comment.video].unshift(comment)
                            commentsAdded++
                        })
                        yt2009.receive_update_custom_comments(comments)
                        console.log("added " + commentsAdded + " comments from master")
                        break;
                    }
                    case "pull_name-result": {
                        if(syncCheckCallbacks[m.id]) {
                            syncCheckCallbacks[m.id](m)
                        }
                        break;
                    }
                    case "inbox_feedback": {
                        if(syncInboxCallbacks[m.id]) {
                            syncInboxCallbacks[m.id](m)
                        }
                        break;
                    }
                }
            })
            w.addEventListener("error", () => {
                yt2009_exports.writeData("masterWs", false)
                // retry after 120s
                setTimeout(() => {
                    initWs()
                }, 120000)
            })
            w.addEventListener("close", () => {
                yt2009_exports.writeData("masterWs", false)
                // retry after 60s
                setTimeout(() => {
                    initWs()
                }, 60000)
            })
        }
        catch(error) {}
    }
    try {
        initWs()
    }
    catch(error) {
        child_process.exec("npm install ws",
        (error, stdout, stderr) => {
            setTimeout(() => {
                initWs()
            }, 150)
        })
    }
}

app.get('/back/*', (req,res) => {
    res.redirect("https://github.com/ftde0/yt2009")
})
app.get('/node_modules/*', (req,res) => {
    res.sendStatus(404)
})
app.get("/.git/*", (req, res) => {
    res.sendStatus(404)
})

app.get('/', (req,res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        if(yt2009_utils.isTemplocked(req)) {
            res.redirect("/t.htm")
            return;
        }
        res.redirect("/auth.html")
        return;
    }
    if(config.env == "dev") {
        console.log(`(${yt2009_utils.get_used_token(req)}) mainpage ${Date.now()}`)
    }

    if(!req.headers.cookie
    || !req.headers.cookie.includes("global_flags")) {
        res.cookie("watch_flags", "", {
            "path": "/",
            "expires": new Date("Fri, 31 Dec 2066 23:59:59 GMT")
        })
        res.cookie("global_flags", "no_controls_fade:", {
            "path": "/",
            "expires": new Date("Fri, 31 Dec 2066 23:59:59 GMT")
        })
    }

    /*if(req.headers.cookie
    && req.headers.cookie.includes("activity")) {
        let comments = yt2009_utils.latestCustomComments(3)
        let vList = []
        comments.forEach(c => {
            vList.push(c.video)
        })
        yt2009.bulk_get_videos(vList, () => {
            yt2009_home(req, res)
        })
        return;
    }*/
    yt2009_home(req, res)
})

/*
======
watchpage
======
*/

app.get("/watch", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        if(yt2009_utils.isTemplocked(req)) {
            res.redirect("/t.htm")
            return;
        }
        res.redirect("/unauth.htm")
        return;
    }
    req = yt2009_utils.addFakeCookie(req)

    let id = req.query.v
    let useFlash = false;
    let resetCache = false;
    id = id.substring(0, 11)
    if(id.length !== 11 || id.includes("yt2009")) {
        res.redirect("/?ytsession=1")
        return;
    }

    if(req.headers.cookie.includes("useFeather")) {
        useFeather = true;
    }

    // flash
    if(req.originalUrl.includes("&f=1") ||
        req.headers.cookie.includes("f_mode")) {
        useFlash = true;
    }

    // reset flags
    if(req.originalUrl.includes("resetflags=1")) {
        flags = ""
    }

    // reset cache
    if(req.query.resetcache == "1") {
        resetCache = true;
    }

    if(!req.headers.cookie
    || !req.headers.cookie.includes("global_flags")) {
        res.cookie("watch_flags", "", {
            "path": "/",
            "expires": new Date("Fri, 31 Dec 2066 23:59:59 GMT")
        })
        res.cookie("global_flags", "no_controls_fade:", {
            "path": "/",
            "expires": new Date("Fri, 31 Dec 2066 23:59:59 GMT")
        })
    }

    yt2009.fetch_video_data(id, (data) => {
        if(!data) {
            res.redirect("/?ytsession=1")
            return;
        }
        yt2009.applyWatchpageHtml(data, req, (code => {
            code = yt2009_languages.apply_lang_to_code(code, req)
            code = yt2009_doodles.applyDoodle(code)
            res.send(code)
        }))
    }, req.headers["user-agent"],
        yt2009_utils.get_used_token(req),
        useFlash, 
        resetCache)
})


app.get("/watch_feather", (req, res) => {
    res.send(`[yt2009] watch_feather nie jest już wspierane. 
    włącz tryb Feather z TestTube, aby użyć Feather.<br><br>
    watch_feather is not supported anymore.
    turn on the Feather mode from TestTube to use Feather.<br><br>
    <a href="/feather_beta">feather &gt;&gt;</a>`)
})

/*
======
video response
======
*/
app.post("/videoresponse_load", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.redirect("/unauth.htm")
        return;
    }
    if(!req.body) {
        res.send("[yt2009] no query in body")
        return;
    }
    let query = req.body.toString().trimStart().split("\n").join("").trimEnd()
    // remove some common music suffixes in case of a wayback_features fail
    query = query
    .replace("(Official Music Video)", "")
    .replace("(Official Video)", "")
    
    let responsesHTML = yt2009_templates.videoResponsesBeginning

    yt2009_search.get_search(
        `"Re: ${query}"`,
        "only_old;author_old_names;remove_username_space;username_asciify",
        "",
    (data) => {
        let responseCount = 0;
        data.forEach(entry => {
            if(entry.type == "video"
            && entry.title.startsWith(`Re: ${query}`)) {
                responsesHTML += `\n${yt2009_templates.videoResponse(
                    entry.id,
                    entry.time,
                    entry.author_name,
                    entry.author_url,
                    req.protocol
                )}`
                responseCount++;
            }
        })

        responsesHTML += `\n${yt2009_templates.videoResponsesEnd}`
        if(responseCount == 0) {
            responsesHTML = `<div id="watch-video-responses-none">
            This video has <b>no Responses</b>.
            Be the first to <a class="bold" href="#">Post a Video Response</a>.
            </div>`
        }
        res.send(responsesHTML)
    }, 
        `videoresponse-${yt2009_utils.get_used_token(req)}`,
        false)
})

/*
======
more from: load section
======
*/
app.post("/morefrom_load", (req, res) => {
    let channelFlags = req.headers.cookie || ""
    if(channelFlags.includes("channel_flags")) {
        channelFlags = channelFlags.split("channel_flags")[1]
                       .split(";")[0]
    }
    let useOnlyOld = false;
    let onlyOldQuery = ""
    if(channelFlags.includes("only_old")) {
        useOnlyOld = true;
        onlyOldQuery = yt2009_search.handle_only_old(
            channelFlags.split(":").join(";").replace("=", "").replace(":", "")
        )
    }
    let videosHTML = ``


    // default videos (without only_old OR if no videos with only_old)
    function fetchDefaultVideos() {
        yt2009_channels.main({"path": req.headers.channel, 
        "headers": {"cookie": "auth=" + yt2009_utils.get_used_token(req)},
        "query": {"f": 0}}, 
        {"send": function(data) {
            if(data.videos) {
                data.videos.forEach(video => {
                    if(req.headers.source.includes(video.id)) return;
                    videosHTML += yt2009_templates.relatedVideo(
                        video.id, video.title, req.protocol, "",
                        video.views, "#", "", channelFlags
                    )
                })
            }
    
            res.send(videosHTML)
        }}, "", true)
    }

    if(useOnlyOld) {
        // use only_old as video source
        if(!req.body) {
            res.status(400).send("no name header specified");
            return;
        }
        let onlyOldVideos = []
        let name = req.body.toString().trim()
        let query = `"${name}" ${onlyOldQuery}`
        yt2009_search.get_search(query, channelFlags, "", (results => {
            // actual results
            results.forEach(result => {
                if(result.type == "video"
                && (name.includes(
                    result.author_name.split(" ").join("")
                ) || name == result.author_name)) {
                    onlyOldVideos.push(result)
                }
            })
            if(!onlyOldVideos[0]) {
                // no videos, fetch default
                fetchDefaultVideos();
                return;
            } else {
                // format only_old
                onlyOldVideos.forEach(video => {
                    if(req.headers.source.includes(video.id)) return;
                    videosHTML += yt2009_templates.relatedVideo(
                        video.id, video.title, req.protocol, "",
                        video.views, "#", "", channelFlags
                    )
                })
                res.send(videosHTML)
            }
        }), yt2009_utils.get_used_token(req), false)
    } else {
        // use default channel videos as video source
        fetchDefaultVideos()
    }

})

/*
======
annotations
======
*/

// using html5
app.get("/json_annotations", (req, res) => {
    yt2009_annotations.get(req, res)
})

// using f_mode
app.get("/read2", (req, res) => {
    yt2009_annotations.getFmode(
        req.query.video_id,
        yt2009_utils.get_used_token(req),
        (xml => {
            res.send(xml)
        }
    ))
})

// /profile endpoint used by annotations
app.get("/profile", (req, res) => {
    if(!req.query.user) {
        res.send("[yt2009] brak parametru user. / no user parameter.")
        return;
    }
    res.redirect("/user/" + req.query.user)
})

/*
======
subtitles
======
*/
app.get("/timedtext", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.status(403).send()
        return;
    }
    yt2009_captions.main(req, res)
})


/*
======
embed generator static
======
*/
app.get("/embed_generate", (req, res) => {
    res.send(
        fs.readFileSync("../static_pages/cropped/embed_gen.html").toString()
    );
})

/*
======
video rating
======
*/
app.post("/video_rate", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }
    if(!req.headers.source) {
        res.sendStatus(400)
        return;
    }
    let token = yt2009_utils.get_used_token(req);
    let rating = req.headers.rating || 5;
    let id = req.headers.source.split("v=")[1].split("&")[0].split("#")[0]
    video_rating.setRating(id, token, rating)
    res.sendStatus(200)
})


/*
======
return youtube dislike
======
*/
app.get("/ryd_request", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.redirect("/unauth.htm")
        return;
    }

    let id = req.headers.source.split("v=")[1].split("&")[0]
    ryd.fetch(id, (data) => {
        let toSend = data.toString();
        if(!toSend.includes(".5")) {
            toSend += ".0"
        } 
        res.send(toSend)
    })
})

/*
======
search page
======
*/

app.get("/results", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        if(yt2009_utils.isTemplocked(req)) {
            res.redirect("/t.htm")
            return;
        }
        res.redirect("/unauth.htm")
        return;
    }
    let query = req.query.search_query
    let flags = req.query.flags || ""
    let resetCache = false;
    // reset cache
    if(req.query.resetcache == "1") {
        resetCache = true;
    }

    try {
        req.headers.cookie.split(";").forEach(cookie => {
            if(cookie.trimStart().startsWith("results_flags")) {
                flags += cookie.trimStart().replace("results_flags=", "")
                                            .split(":").join(";")
            }
            if(cookie.trimStart().startsWith("global_flags=")) {
                flags += cookie.trimStart().replace("global_flags=", "")
                                            .split(":").join(";")
            }
        })
        flags += ";"
    }
    catch(error) {}

    // reset flag
    if(req.originalUrl.includes("resetflags=1")) {
        flags = ""
    }

    if(query.length == 0) {
        res.send(`[yt2009] wyszukiwania powinny mieć co najmniej 1 znak
                / searches should have at least 1 character`)
        return;
    }

    yt2009_search.get_search(query, decodeURIComponent(flags), req.query,
    (data) => {
        if(!data) {
            res.send(
                `[yt2009] coś poszło nie tak w parsowaniu wyników
                / something went wrong while parsing the results`)
            return;
        }
        res.send(yt2009_search.apply_search_html(
            data, query, flags,
            req.originalUrl,
            req.protocol,
            req.headers["user-agent"]
        ))
    }, yt2009_utils.get_used_token(req), resetCache)

    
})

/*
======
xl
======
*/
app.get("/xl", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.send("[yt2009] please authorize to use XL.")
        return;
    }
    let url = "/xl/index.htm"
    if(req.query.html5 == 1) {
        url += "?html5=1"
    }
    res.redirect(url)
})

const xlInitial = fs.readFileSync("../xl/index.htm").toString()
app.get("/xl/index.htm", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.redirect("/unauth.htm")
        return;
    }

    res.send(xlInitial)
})

app.get("/xl/console_browse", (req, res) => {
    yt2009_xl.get_mainpage(req, res)
})

app.get("/xl/console_related", (req, res) => {
    yt2009_xl.get_related(req, res)
})

app.get("/xl/console_results", (req, res) => {
    yt2009_xl.get_search(req, res)
})

app.get("/xl/console_profile", (req, res) => {
    yt2009_xl.get_profile(req, res)
})

app.get("/xl/console_profile_videos", (req, res) => {
    yt2009_xl.get_profile(req, res)
})

app.post("/xl/favorites", (req, res) => {
    yt2009_xl.add_favorites(req, res)
})

app.get("/xl/console_profile_favorites", (req, res) => {
    yt2009_xl.get_favorites(req, res)
})

app.get("/xl/console_profile_playlists", (req, res) => {
    yt2009_xl.get_playlists(req, res)
})

app.get("/xl/console_profile_recommendation", (req, res) => {
    yt2009_xl.get_recommendations(req, res)
})

let xlRedirectors = [
    "/console_browse",
    "/console_related",
    "/console_results",
    "/console_profile",
    "/console_profile_videos",
    "/console_profile_favorites",
    "/console_profile_playlists",
    "/console_profile_recommendation"
]
xlRedirectors.forEach(redir => {
    app.get(redir, (req, res) => {
        let getParams = "?"
        for(let p in req.query) {
            getParams += p + "=" + req.query[p] + "&"
        }
        getParams = getParams.substring(0, getParams.length - 1)
        res.redirect("/xl" + redir + getParams)
    })
})

app.get("/apiplayer", (req, res) => {
    res.redirect("/xl/apiplayer.swf")
})

app.get("/swf/apiplayer.swf", (req, res) => {
    res.redirect("/xl/apiplayer-f.swf")
})

app.get("/get_video_info", (req, res) => {
    if(req.query.el == "leanback") {
        // add to history if leanback
        let history = ""
        if(req.headers.cookie
        && req.headers.cookie.includes("leanback_history=")) {
            history = req.headers.cookie
                      .split("leanback_history=")[1].split(";")[0]
        }
        history = history.split(":")
        if(history.length >= 3) {
            history.pop()
        }
        history.unshift(req.query.video_id.replace("/mp4", ""))
        let cookieParams = [
            `leanback_history=${history.join(":")}; `,
            `Path=/; `,
            `Expires=Fri, 31 Dec 2066 23:59:59 GMT`
        ]
        res.set("set-cookie", cookieParams.join(""))
    }
    req.query.video_id = req.query.video_id.replace("/mp4", "")
    yt2009.fetch_video_data(req.query.video_id, (data => {
        yt2009.get_qualities(req.query.video_id, (qualities => {
            if((!qualities || qualities.length == 0) && data.qualities) {
                qualities = data.qualities
            }
            let fmt_list = ""
            let fmt_stream_map = ""
            let fmt_map = ""
            qualities.forEach(quality => {
                switch(quality) {
                    case "720p": {
                        fmt_list += "22/1280x720/9/0/115,"
                        fmt_map += "22/2000000/9/0/115,"
                        fmt_stream_map += `22|http://${config.ip}:${
                            config.port
                        }/exp_hd?video_id=${req.query.video_id},`
                        break;
                    }
                    case "480p": {
                        fmt_list += "35/854x480/9/0/115,"
                        fmt_map += "35/0/9/0/115,"
                        fmt_stream_map +=  `35|http://${config.ip}:${
                            config.port
                        }/get_480?video_id=${req.query.video_id},`
                        break;
                    }
                }
            })
            fmt_list += "5/640x360/9/0/115"
            fmt_map += "5/0/7/0/0"
            fmt_stream_map += `5|http://${config.ip}:${
                config.port
            }/get_video?video_id=${data.id}/mp4`
            res.send(`status=ok
length_seconds=1
keywords=a
vq=None
muted=0
avg_rating=5.0
thumbnail_url=${
    encodeURIComponent(
        `${req.protocol}://i.ytimg.com/vi/${req.query.video_id}/hqdefault.jpg`
    )
}
allow_ratings=1
hl=en
ftoken=
allow_embed=1
fmt_map=${encodeURIComponent(fmt_map)}
fmt_url_map=${encodeURIComponent(fmt_stream_map)}
token=amogus
plid=amogus
track_embed=0
author=${data.author_name}
title=${data.title}
video_id=${req.query.video_id}
fmt_list=${encodeURIComponent(fmt_list)}
fmt_stream_map=${encodeURIComponent(fmt_stream_map)}`.split("\n").join("&"))
        }))
        
    }), "", "", false, false)
})

app.get("/xl/embed", (req, res) => {
    yt2009_xl.xl_embed(req, res)
})

/*
======
quicklist
======
*/
app.get("/ql_html_template", (req, res) => {
    res.send(yt2009_languages.apply_lang_to_code(
        yt2009_templates.quicklistHTMLTemplate, req
    ))
})
app.get("/watch_queue", (req, res) => {
    yt2009_quicklist.apply(req, res)
})

/*
======
cps.swf/mobile videoinfo
======
*/
app.get("/feeds/api/videos/", (req, res) => {
    if(!req.query.q) {
        yt2009_mobile.videoData(req, res)
        return;
    }
    yt2009_cps.get_search(req, res)
})

//left this when messing about with leanbacklite_v3
// this gets it partially working lol
app.post("/feeds/api/videos/", (req, res) => {
    if(!req.query.q) {
        yt2009_mobile.videoData(req, res)
        return;
    }
    yt2009_cps.get_search(req, res)
})

/*
======
cpb.swf (flash embed playlists)
======
*/
app.get("/feeds/api/playlists/*", (req, res) => {
    yt2009_playlists.create_cpb_xml(req, res)
})

/*
======
embed
======
*/

app.get("/embed/*", (req, res) => {
    yt2009_embed(req, res)
})
app.get("/embedF/*", (req, res) => {
    yt2009_embed(req, res)
})
app.get("/generate_gradient", (req, res) => {
    const child_process = require("child_process")
    let color = req.query.c.substring(0, 6).replace(/[^0-9a-zA-Z]/g, "")
    if(fs.existsSync(`../player-imgs/embed-bgs/user-gen/${color}.png`)) {
        // callback generated gradient file
        res.redirect(`/player-imgs/embed-bgs/user-gen/${color}.png`)
    } else {
        // generate
        let generateCommand = [
            "magick",
            "-size 1x25",
            `gradient:"#ffffff"-"#${color}"`,
            `${__dirname}/../player-imgs/embed-bgs/user-gen/${color}.png`
        ]
        child_process.exec(generateCommand.join(" "), (error, stdout, stderr) => {
            res.redirect(`/player-imgs/embed-bgs/user-gen/${color}.png`)
        })
    }
})
app.get("/embed_get_endscreen", (req, res) => {
    const endscreen_sections = [
        `<div class="endscreen-section" style="opacity: 1;">`,
        `<div class="endscreen-section hid" style="opacity: 0;">`
    ]
    let videoId = req.headers.source.split("embed/")[1].substring(0, 11)
    let endscreen_html = yt2009_templates.html5Endscreen

    let endscreen_section_index = 0;
    let endscreen_section_html = endscreen_sections[0]

    yt2009.get_related_videos(videoId, (related) => {
        // add all videos into sections (two videos per section)
        related.forEach(video => {
            if(yt2009_utils.time_to_seconds(video.length) >= 1800) return;
            endscreen_section_html += yt2009_templates.endscreenVideo(
                video.id,
                req.protocol,
                video.length,
                video.title,
                2,
                video.creatorUrl,
                video.creatorName,
                video.views,
                5,
                ""
            )
    
            endscreen_section_index++;
            if(endscreen_section_index % 2 == 0) {
                endscreen_section_html += `</div>`
                endscreen_html += endscreen_section_html;
                endscreen_section_html = endscreen_sections[1]
            }
        })


        // finalize
        endscreen_html += `
        
        <style>
        .endscreen-section {
            margin-top: 15px;
        }

        .endscreen-video, .gr {
            color: #4d4b46 !important;
        }

        .endscreen-video {
            background-image: url(/player-imgs/darker-bg.png);
            background-size: contain;
            -moz-background-size: contain;
        }
        </style>
        `
        res.send(endscreen_html)
    }, "", true)
})

/*
======
channels
======
*/
let channel_endpoints = [
    "/channel/*",
    "/user/*",
    "/c/*",
    "/@*"
] 
channel_endpoints.forEach(channel_endpoint => {
    app.get(channel_endpoint, (req, res) => {
        if(!yt2009_utils.isAuthorized(req)) {
            if(yt2009_utils.isTemplocked(req)) {
                res.redirect("/t.htm")
                return;
            }
            res.redirect("/unauth.htm")
            return;
        }

        // flags
        let flags = decodeURIComponent(req.query.flags) || ""
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("channel_flags")) {
                    flags += cookie.trimStart()
                            .replace("channel_flags=", "")
                            .split(":").join(";")
                }
                if(cookie.trimStart().startsWith("global_flags=")) {
                    flags += cookie.trimStart()
                            .replace("global_flags=", "")
                            .split(":").join(";")
                }
            })
        }
        catch(error) {}
        flags += ";"

        // autouser
        if(flags.includes("auto_user")) {
            yt2009_channels.autoUserHandle(req, res, flags)
            return;
        }
    
        // reset flags
        if(req.originalUrl.includes("resetflags=1")) {
            flags = ""
        }
    
        // handle by yt2009channels
        yt2009_channels.main(req, res, flags)
    })
})

app.get("/get_userid", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }

    yt2009_channels.get_id(req.query.link, (id => {
        res.send(id)
    }))
})

app.post("/cbackground_suggest", (req, res) => {
    let channel = req.headers.channel
    let img = req.headers.image
    if(!channel || !img) {
        res.sendStatus(400)
        return;
    }

    let s = {}
    if(!fs.existsSync("./suggestions.json")) {
        fs.writeFileSync("./suggestions.json", "{}")
    } else {
        s = JSON.parse(fs.readFileSync("./suggestions.json").toString())
    }

    s[channel + "/" + Date.now() + yt2009_utils.get_used_token(req)] = img;
    fs.writeFileSync("./suggestions.json", JSON.stringify(s))

    res.sendStatus(200)
})

app.get("/playnav_get_comments", (req, res) => {
    yt2009_channels.playnav_get_comments(req, res)
})

function checkBaseline(req, res) {
    let tr = false;
    if(req.headers["user-agent"].includes("Android")) {
        let androidVersion = 9;
        androidVersion = req.headers["user-agent"].split("Android")[1]
                            .split(")")[0]
        androidVersion = parseFloat(androidVersion)
        // handle old android versions, go with standard method otherwise
        if(!isNaN(androidVersion) && androidVersion < 4.2) {
            ffmpegEncodeBaseline(req, res)
            tr = true;
        }
    }
    return tr;
}

app.get("/channel_fh264_getvideo", (req, res) => {
    if(checkBaseline(req, res)) return;

    if(yt2009_exports.getStatus(req.query.v)) {
        // wait for mp4 while it's downloading
        yt2009_exports.waitForStatusChange(req.query.v, () => {
            res.redirect("/assets/" + req.query.v + ".mp4")
        })
        return;
    }
    if(!fs.existsSync("../assets/" + req.query.v + ".mp4")) {
        yt2009_utils.saveMp4(req.query.v, (vid) => {
            let vidLink = vid.replace("../", "/")
            if(vidLink.includes("assets/")) {
                vidLink += ".mp4"
            }
            res.redirect(vidLink)
        })
    } else {
        res.redirect("/assets/" + req.query.v + ".mp4")
    }
    
})

function ffmpegEncodeBaseline(req, res) {
    let vId = ""
    if(req.query.v) {
        vId = req.query.v.replace(/[^a-zA-Z0-9+-+_]/g, "").substring(0, 11)
    } else if(req.query.video_id) {
        vId = req.query.video_id.replace(/[^a-zA-Z0-9+-+_]/g, "").substring(0, 11)
    }
    
    if(config.env == "dev") {
        console.log(`baseline h264 req ${req.originalUrl}`)
    }

    // send file once everything done
    function sendFile() {
        let filePath = __dirname.replace("\\back", "\\assets")
                                .replace("/back", "/assets")
                       + "/" + vId + "-baseline.mp4"
        res.sendFile(filePath)
    }

    // reencode from standard mp4 to baseline mp4
    function reencode() {
        let stdFile = __dirname + "/../assets/" + vId + ".mp4"
        let targetFile = __dirname + "/../assets/" + vId + "-baseline.mp4"
        // those fps and bitrate values are too specific but they work.
        // STAGEFRIGHT 1.1 I HATE YOU. I HOPE NOBODY HAS TO DEAL WITH THIS.
        let ffmpegOptions = [
            "-c:v libx264",
            "-profile:v baseline",
            "-preset ultrafast",
            "-movflags +faststart",
            "-b:v 1542k",
            "-filter:v fps=23.98",
            "-vf format=yuv420p"
        ]

        child_process.exec(
            `ffmpeg -i ${stdFile} ${ffmpegOptions.join(" ")} ${targetFile}`,
            (e, stdout, stderr) => {
                sendFile()
            }
        )
    }

    // video exists (highly unlikely but maybe??), send immediately
    if(fs.existsSync("../assets/" + vId + "-baseline.mp4")) {
        sendFile()
        return;
    }

    if(!fs.existsSync("../assets/" + vId + ".mp4")) {
        // standard mp4 doesn't exist, download and reencode
        yt2009_utils.saveMp4(vId, () => {
            reencode()
        })
    } else {
        // standard mp4 exists, reencode already
        reencode()
    }
}

/*
======
playlists
======
*/
let playlist_endpoints = ["/playlist", "/view_play_list"]
// view playlists
playlist_endpoints.forEach(playlistEndpoint => {
    app.get(playlistEndpoint, (req, res) => {
        if(!yt2009_utils.isAuthorized(req)) {
            res.redirect("/unauth.htm")
            return;
        }
        let playlistId = (req.query.list || req.query.p)
        yt2009_playlists.parsePlaylist(playlistId, (list) => {
            res.send(yt2009_playlists.applyPlaylistHTML(list, req))
        })
    })
})

// playlists inside of channels
app.get("/channel_get_playlist", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.redirect("/unauth.htm")
        return;
    }
    let videosHTML = ``
    yt2009_playlists.parsePlaylist(req.headers.id, (list) => {
        let video_index = 0;
        list.videos.forEach(video => {
            videosHTML += `
            <div class="playnav-item playnav-video ${video_index == 0 ? "selected" : ""}" id="playnav-video-${video.id}" onclick="switchVideo(this)">
                <div class="content">
                    <div class="playnav-video-thumb link-as-border-color">
                        <a class="video-thumb-90 no-quicklist" href="#"><img title="${video.title}" src="${video.thumbnail}" class="vimg90 yt-uix-hovercard-target" alt="${video.title}"></a>
            
                    </div>
                    <div class="playnav-video-info">
                        <a href="#" class="playnav-item-title ellipsis"><span class="video-title-${video.id}">${video.title}</span></a>
                        <div class="metadata video-meta-${video.id}"></div>
                        <div class="video-ratings-${video.id} hid">0</div>
                    </div>
                </div>
            </div>`

            video_index++;
        })

        res.send(videosHTML)
    })
})
app.get("/refetch_playlist_watch", (req, res) => {
    let videosHTML = ``
    let playlistId = req.headers.source.split("list=")[1].split("&")[0].split("#")[0]
    yt2009_playlists.parsePlaylist(playlistId, (list) => {
        let video_index = 0;
        list.videos.forEach(video => {
            videosHTML += `
            <div class="video-entry ${video.id == req.headers.source.split("v=")[1].split("&")[0].split("#")[0] ? "watch-ppv-vid" : ""}">
                <div class="v90WideEntry">
                    <div class="v90WrapperOuter">
                        <div class="v90WrapperInner">
                            <a href="/watch?v=${video.id}&list=${playlistId}" class="video-thumb-link" rel="nofollow"><img title="${video.title}" thumb="${req.protocol}://i.ytimg.com/vi/${video.id}/hqdefault.jpg" src="${req.protocol}://i.ytimg.com/vi/${video.id}/hqdefault.jpg" class="vimg90" qlicon="${video.id}" alt="${video.title}}"></a>
        
                            <div class="addtoQL90"><a href="#" ql="${video.id}" title="Add Video to QuickList"><button title="" class="master-sprite QLIconImg"></button></a>
                                <div class="hid quicklist-inlist"><a href="#">Added to Quicklist</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="video-main-content">
                    <div class="video-mini-title">
                    <a href="/watch?v=${video.id}&list=${playlistId}" rel="nofollow">${video.title}</a></div>
                    <div class="video-username"><a href="${video.uploaderUrl}">${video.uploaderName}</a>
                    </div>
                </div>
                <div class="video-clear-list-left"></div>
            </div>`

            video_index++;
        })

        res.send(videosHTML)
    })
})


/*
======
video comments
======
*/
app.get("/get_more_comments", (req, res) => {
    let id = req.headers.source
             .split("watch?v=")[1]
             .split("&")[0].split("#")[0]
    let pageNumber = parseInt(req.headers.page)
    let flags = ""
    try {
        if(req.headers.cookie
        && req.headers.cookie.includes("global_flags=")) {
            flags += req.headers.cookie
                     .split("global_flags=")[1]
                     .split(";")[0]
        }
    }
    catch(error) {}

    let comment_html = "";

    yt2009.comment_paging(id, pageNumber, flags, (data) => {
        let theoreticalIndex = (pageNumber - 1) * 20
        data.forEach(comment => {
            if(!comment.continuation && !comment.pinned) {
                let commentId = yt2009.commentId(comment.authorUrl, comment.content)
                let likes = comment.likes ? comment.likes : 0
                let customRating = 0;
                let customData = yt2009.hasComment(id, commentId)
                if(customData) {
                    likes += customData.rating
                    let token = yt2009_utils.get_used_token(req)
                    token == "" ? token = "dev" : ""
                    if(customData.ratingSources[token]) {
                        customRating = customData.ratingSources[token]
                    }
                }

                let commentHTML = yt2009_templates.videoComment(
                    comment.authorUrl,
                    comment.authorName,
                    flags.includes("fake_dates")
                    ? yt2009_utils.fakeDateSmall(theoreticalIndex)
                    : comment.time,
                    comment.content,
                    flags,
                    false,
                    likes,
                    commentId
                )

                if(customRating == 1) {
                    commentHTML = commentHTML.replace(
                        "watch-comment-up-hover",
                        "watch-comment-up-on"
                    )
                } else if(customRating == -1) {
                    commentHTML = commentHTML.replace(
                        "watch-comment-down-hover",
                        "watch-comment-down-on"
                    )
                }

                comment_html += commentHTML
                theoreticalIndex++
            }
        })
        res.send(comment_html)
    })
})

/*
======
warp! (html)
======
*/
app.get("/warp", (req, res) => {
    yt2009_warp_test.use(req, res)
})
app.get("/warp_continuation", (req, res) => {
     yt2009_warp_test.get_other_videos(req, res)
})

/*
======
warp! (swf)
======
*/
app.get("/api2_rest", (req, res) => {
    yt2009_warp_swf.get_video(req, res)
})
app.get("/get_awesome", (req, res) => {
    yt2009_warp_swf.get_related(req, res)
})
app.get("/set_awesome", (req, res) => {
    yt2009_warp_swf.get_related(req, res)
})
app.get("/next_awesome", (req, res) => {
    yt2009_warp_swf.get_related(req, res)
})
app.get("/get_video", (req, res) => {
    yt2009_warp_swf.get_flv(req, res)
})


/*
======
/videos, /videos rss /channels
======
*/
app.get("/videos", (req, res) => {
    yt2009_videos_page.apply(req, res)
})
app.get("/channels", (req, res) => {
    yt2009_channels_page.apply(req, res)
})
app.get("/videos-rss", (req, res) => {
    yt2009_videos_page.create_rss(req, res)
})

/*
======
history, subscriptions, favorites, clientside playlists, inbox
======
*/
app.get("/my_history", (req, res) => {
    yt2009_history.apply(req, res)
})
app.get("/my_favorites", (req, res) => {
    yt2009_favorites.apply(req, res)
})
app.get("/my_subscriptions", (req, res) => {
    yt2009_subs.apply(req, res)
})
app.get("/subscriptions_new_videos", (req, res) => {
    yt2009_subs.fetch_new_videos(req, res, false)
})
app.get("/my_playlists", (req, res) => {
    yt2009_client_playlists.apply(req, res)
})
app.get("/inbox", (req, res) => {
    yt2009_inbox.apply(req, res)
})


/*
======
static site (e.g. from the footer)
======
*/
let static_sites = {
    "/t/contact_us": "contact_us.html",
    "/press_room": "press_room.html",
    "/partners": "partner.html",
    "/t/content_management": "content_management.html",
    "/t/yt_handbook_home": "handbook_home.html",
    "/t/community_guidelines": "guidelines.html",
    "/t/creators_corner": "creators_corner.html",
    "/t/privacy": "privacy.html",
    "/t/dmca_policy": "dmca.html",
    "/feather_beta": "feather_beta.html",
    "/testtube": "test.html",
    "/my_videos_upload": "upload.html",
    "/warp_speed": "warp_speed.html",
    "/warp_speed_en": "warp_speed_en.html",
    "/t/new_viewing_experience": "new_viewing_experience.html",
    "/cbackground": "cbackground.html"
}
for(let site in static_sites) {
    app.get(site, (req, res) => {
        yt2009_static.createSite(static_sites[site], req, res)
    })
}
app.get("/toggle_f", (req, res) => {
    res.redirect("/toggle_f.htm")
})

/*
======
reject access to template pages without authorization
======
*/
let html_files = [
    "/channelpage.htm",
    "/channels.htm",
    "/history.htm",
    "/index.htm",
    "/playlist.htm",
    "/result-template.html",
    "/search-generic-page.htm",
    "/subscriptions.htm",
    "/videos.htm",
    "/warp.html",
    "/watch.html",
    "/watch_feather.html",
]
html_files.forEach(file => {
    app.get(file, (req, res) => {
        if(!yt2009_utils.isAuthorized(req)) {
            console.log(`(unathorized ${req.ip}/${req.headers["user-agent"]}) access attempt ${file}`)
            res.redirect("/unauth.htm")
            return;
        }

        res.send(
            require("fs").readFileSync(`${__dirname}/../${file}`).toString()
        )
    })
})

/*
======
yt2009_flags for fmode support
======
*/
app.get("/yt2009_flags.htm", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        if(yt2009_utils.isTemplocked(req)) {
            res.redirect("/t.htm")
            return;
        }
        res.redirect("/unauth.htm")
        return;
    }
    
    let flagsPage = require("fs").readFileSync(
        `${__dirname}/../yt2009_flags.htm`
    ).toString()

    if((req.headers.cookie || "").includes("f_mode=on")) {
        flagsPage = flagsPage.replace(
            `<!--yt2009_f-->`,
            `<script src="/assets/site-assets/yt2009_flags_f.js"></script>`
        )
        flagsPage = flagsPage.replace(
            `onclick="update_cookies();"`,
            `onclick="update_cookies_f();"`
        )
    }

    res.send(flagsPage)
})

/*
======
auth-protect leanback
======
*/
let leanbackEndpoints = ["/leanback", "/leanback/", "/leanback/index.htm"]
let leanback = fs.readFileSync("../leanback/index.html").toString()
leanback = leanback.split(`http_url`).join(
    "http://" + config.ip + ":" + config.port
)
leanbackEndpoints.forEach(lbe => {
    app.get(lbe, (req, res) => {
        if(!yt2009_utils.isAuthorized(req)) {
            res.redirect("/unauth.htm")
            return;
        }
        res.send(leanback)
    })
})

/*
======
virt /account management
======
*/
const accountHTML = fs.readFileSync("../account.html").toString()
app.get("/account", (req, res) => {
    if(!req.headers.cookie
    || (req.headers.cookie
    && !req.headers.cookie.includes("login_simulate"))) {
        res.redirect("/signin")
        return;
    }

    let code = accountHTML;
    code = require("./yt2009loginsimulate")(req, code, true)
    code = yt2009_languages.apply_lang_to_code(code, req)
    res.send(code)

})

app.use(express.static("../"))


/*
======
legacy authorization
this used to be necessary for some extremely old browsers.
nowadays pretty useless but leaving it for some extreme case scenario.
======
*/
app.get("/test_only_legacy_cookie_auth", (req, res) => {
    res.send(`<script>document.cookie = "auth=${
        req.query.token
    }; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT";</script>`)
})

/*
======
720p
======
*/
app.get("/exp_hd", (req, res) => {
    let id = req.query.video_id.substring(0, 11)

    // callback mp4 if we already have one
    if(fs.existsSync(`../assets/${id}-hd.mp4`)) {
        res.redirect(`/assets/${id}-hd.mp4`)
    } else {
        // download hd video and merge with main mp4 audio
        let writeStream = fs.createWriteStream(`../assets/${id}-hd-video.mp4`)
        writeStream.on("finish", () => {
            let videoFilename = `${__dirname}/../assets/${id}-hd-video.mp4`
            let audioFilename = `${__dirname}/../assets/${id}.mp4`
            let targetFilename = `${__dirname}/../assets/${id}-hd.mp4`
            let cmd = yt2009_templates.format_merge_command(
                videoFilename,
                audioFilename,
                targetFilename
            )
            child_process.exec(cmd, (error, stdout, stderr) => {
                res.redirect(`/assets/${id}-hd.mp4`)
                if(fs.existsSync(videoFilename)) {
                    fs.unlinkSync(videoFilename)
                }
            })
        })
        require("ytdl-core")(`https://youtube.com/watch?v=${id}`, {
            "quality": 136
        })
        .on("error", () => {
            res.redirect(`/get_video?video_id=${id}/mp4`)
            return;
        })
        .pipe(writeStream)
    }
})

/*
======
480p (HQ)
======
*/
app.get("/get_480", (req, res) => {
    let id = req.query.video_id.substring(0, 11)
    if(!fs.existsSync(`../assets/${id}.mp4`)) {
        yt2009_utils.saveMp4(id, () => {
            res.redirect(`/get_480?video_id=${id}&r=1`)
            return;
        })
        return;
    }
    if(fs.existsSync(`../assets/${id}-480.mp4`)) {
        res.redirect(`/assets/${id}-480.mp4`)
    } else {
        let writeStream = fs.createWriteStream(`../assets/${id}-480-temp.mp4`)
        writeStream.on("finish", () => {
            let videoFilename = `${__dirname}/../assets/${id}-480-temp.mp4`
            let audioFilename = `${__dirname}/../assets/${id}.mp4`
            let targetFilename = `${__dirname}/../assets/${id}-480.mp4`
            let cmd = yt2009_templates.format_merge_command(
                videoFilename,
                audioFilename,
                targetFilename
            )
            child_process.exec(cmd, (error, stdout, stderr) => {
                res.redirect(`/assets/${id}-480.mp4`)
                if(fs.existsSync(videoFilename)) {
                    fs.unlinkSync(videoFilename)
                }
            })
        })
        require("ytdl-core")(`https://youtube.com/watch?v=${id}`, {
            "quality": 135
        })
        .on("error", () => {
            res.redirect(`/get_video?video_id=${id}/mp4`)
            return;
        })
        .pipe(writeStream)
    }
})

/*
======
basic mobile view
======
*/

app.get("/mobile", (req, res) => {
    yt2009_mobile.create_homepage(req, res)
})
app.get("/mobile/watch", (req, res) => {
    yt2009_mobile.create_watchpage(req, res)
})
app.get("/mobile/results", (req, res) => {
    yt2009_mobile.search(req, res)
})
app.get("/mobile/view_comment", (req, res) => {
    yt2009_mobile.view_comments(req, res)
})
app.get("/mobile/profile", (req, res) => {
    yt2009_mobile.channels(req, res)
})
let videoProcessEndpoints = [
    "/mobile/create_rtsp",
    "/mp4_144",
    "/http_3gp"
]
videoProcessEndpoints.forEach(endpoint => {
    app.get(endpoint, (req, res) => {
        yt2009_mobile.video_process(req, res)
    })
})

/*
======
mobile (apk) endpoints
======
*/
app.post("/youtube/accounts/registerDevice", (req, res) => {
    let deviceId = ""
    while(deviceId.length !== 5) {
        deviceId += "qwertyuiopasdfghjklzxcvbnm1234567890".split("")
                    [Math.floor(Math.random() * 36)]
    }
    res.send(`DeviceId=${deviceId}
DeviceKey=ULxlVAAVMhZ2GeqZA/X1GgqEEIP1ibcd3S+42pkWfmk=
#yt2009 - devicekey created with aes secret from 2.3.4 apk`)
})
app.get("/feeds/api/standardfeeds/*", (req, res) => {
    yt2009_mobile.feeds(req, res)
})
app.get("/feeds/api/videos/*/comments", (req, res) => {
    yt2009_mobile.apkVideoComments(req, res)
})
app.post("/feeds/api/videos/*/comments", (req, res) => {
    yt2009_mobile.videoCommentPost(req, res)
})
let twoHundredEndpoints = [
    "/feeds/api/videos/*/related",
    "/feeds/api/users/*/favorites",
    "/feeds/api/users/*/subscriptions"
]
twoHundredEndpoints.forEach(e => {
    app.post(e, (req, res) => {
        res.status(200).send()
    })
})
app.get("/feeds/api/videos/*/related", (req, res) => {
    yt2009_mobile.apkVideoRelated(req, res)
})
app.get("/feeds/api/videos/*", (req, res) => {
    if(!req.query.q) {
        yt2009_mobile.videoData(req, res)
        return;
    }
})
app.post("/feeds/api/videos/*/ratings", (req, res) => {
    res.status(200).send()
})
app.get("/feeds/api/users/*/recommendations", (req, res) => {
    res.redirect("/feeds/api/standardfeeds/recently_featured")
})
app.get("/feeds/api/users/default/*", (req, res) => {
    if(req.headers["authorization"]) {
        res.send(yt2009_templates.gdata_feedStart
                + yt2009_templates.gdata_feedEnd)
    }
})
app.get("/feeds/api/users/*/newsubscriptionvideos", (req, res) => {
    res.redirect("/feeds/api/standardfeeds/recently_featured")
})
app.get("/feeds/api/users/*/uploads", (req, res) => {
    yt2009_mobile.userVideos(req, res)
})
app.get("/feeds/api/users/*/playlists/*", (req, res) => {
    yt2009_mobile.userPlaylistStart(req, res)
})
app.get("/feeds/api/users/*/playlists", (req, res) => {
    yt2009_mobile.userPlaylists(req, res)
})
app.get("/feeds/api/users/*/favorites", (req, res) => {
    yt2009_mobile.userFavorites(req, res)
})
app.get("/feeds/api/users/*", (req, res) => {
    yt2009_mobile.userInfo(req, res)
})
app.get("/feeds/api/events", (req, res) => {
    yt2009_mobile.apkUserEvents(req, res)
})
app.get("/schemas/2007/categories.cat", (req, res) => {
    res.send(fs.readFileSync("../assets/site-assets/gdata_categories.xml")
               .toString())
})
app.get("/mobile/connection_start", (req, res) => {
    yt2009_mobileflags.request_session(req, res)
})
app.get("/mobile/get_sessions", (req, res) => {
    yt2009_mobileflags.get_session(req, res)
})
app.post("/mobile/save_flags", (req, res) => {
    yt2009_mobileflags.save_flags(req, res)
})
app.get("/mobile/get_flags", (req, res) => {
    res.send(yt2009_mobileflags.get_flags(req));
})
let shorter_sessions = {}
app.get("/shorten_session", (req, res) => {
    if(!req.headers.session) {
        res.sendStatus(400)
        return;
    }
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }
    let s = req.headers.session
    let randomChars = ""
    while(randomChars.length <= 4) {
        randomChars += s.split("")[Math.floor(Math.random() * (s.length - 3))]
    }
    shorter_sessions[randomChars] = s
    res.send(randomChars)
    setTimeout(() => {
        try {
            delete shorter_sessions[req.headers.session]
        }
        catch(error) {}
    }, 1000 * 60 * 15)
})
app.get("/get_shortened_session", (req, res) => {
    if(!req.headers.session) {
        res.sendStatus(400)
        return;
    }
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }
    if(shorter_sessions[req.headers.session]) {
        res.send(shorter_sessions[req.headers.session])
        delete shorter_sessions[req.headers.session]
    } else {
        res.sendStatus(404)
    }
})
app.get("/get_name_by_session", (req, res) => {
    if(!req.headers.session) {
        res.sendStatus(400)
        return;
    }
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }
    let id = Math.floor(Math.random() * 5949534534)
    syncCheckCallbacks[id] = function(msg) {
        if(msg.result.length >= 1) {
            res.send(msg.result)
        }
    }
    try {
        yt2009_exports.read().masterWs.send(JSON.stringify({
            "type": "pull_name",
            "session": req.headers.session,
            "id": id
        }))
    }
    catch(error) {}
})

/*
======
mobile (blazer/ios 2010 webapp) endpoints
======
*/
let blazerEndpoints = [
    "/mobile/blzr",
    "/mobile/blzr/",
    "/mobile/blzr/site.html"
]
const blazer = fs.readFileSync("../mobile/blzr/site.html").toString()
blazerEndpoints.forEach(e => {
    app.get(e, (req, res) => {
        if(!yt2009_utils.isAuthorized(req)) {
            res.redirect("/auth.html?redir=blzr")
            return;
        }
        res.send(blazer)
    })
})
app.get("/mobile/blzr/home", (req, res) => {
    res.send(yt2009_blazer.homepage())
})
app.get("/mobile/blzr/my_account", (req, res) => {
    res.send({"result": "ok"})
})
app.get("/mobile/blzr/watch", (req, res) => {
    yt2009_blazer.video(req, res)
})
app.get("/mobile/blzr/view_comment", (req, res) => {
    yt2009_blazer.get_comments(req, res)
})
app.get("/mobile/blzr/results", (req, res) => {
    yt2009_blazer.search(req, res)
})
app.get("/mobile/blzr/profile", (req, res) => {
    // same endpoint is used for things on the channel (videos etc)
    // so check before passing
    switch(req.query.view) {
        case "videos": {
            yt2009_blazer.user_videos(req.query.user, (r) => {
                res.send(r)
            })
            break;
        }
        default: {
            let isSubscribed = false;
            if(req.headers.cookie
            && req.headers.cookie.includes("blzr_sublist=")) {
                let sublist = req.headers.cookie
                              .split("blzr_sublist=")[1]
                              .split(";")[0];
                if(sublist.includes(req.query.user)) {
                    isSubscribed = true;
                }
            }

            let disableDefaultAvatar = false;
            if(req.headers.cookie
            && req.headers.cookie.includes("undefault-avatar")) {
                disableDefaultAvatar = true;
            }

            yt2009_blazer.user_info(req.query.user, (r) => {
                res.send(r)
            }, isSubscribed, disableDefaultAvatar)
            break;
        }
    }
})
app.post("/mobile/blzr/profile", (req, res) => {
    yt2009_blazer.toggle_sub(req, res)
})
app.get("/mobile/blzr/videos", (req, res) => {
    yt2009_blazer.browse(req, res)
})
app.post("/mobile/blzr/post_comment", (req, res) => {
    if(req.body
    && req.body.toString().includes("&comment=")) {
        let username = (req.headers.cookie || "blazer_login=tnb")
        if(username.includes("blazer_login=")) {
            username = yt2009_utils.xss(decodeURIComponent(
                username.split("blazer_login=")[1].split(";")[0]
            ))
        }
        let content = yt2009_utils.xss(decodeURIComponent(
            req.body.toString().split("&comment=")[1].split("&")[0]
        ))
        res.send({
            "result": "ok",
            "content": {
                "allow_post_comment": true,
                "new_comment": {
                    "author_name": username,
                    "comment": content,
                    "time_ago": "1 second ago"
                }
            }
        })
    }
})
app.get("/mobile/blzr/manage_playlist", (req, res) => {
    res.send({"result": "ok", "content": {
        "playlists": yt2009_blazer.inter_read_playlists(req)
    }})
})
app.post("/mobile/blzr/manage_playlist", (req, res) => {
    yt2009_blazer.post_manage_playlist(req, res)
})
app.get("/mobile/blzr/patch_playlist", (req, res) => {
    let playlistId = req.query.pid;
    let videoId = req.query.vid;
    let newCookie = yt2009_blazer.add_to_playlist(
        req, playlistId, videoId
    )
    let cookieParams = [
        `blzr_pl_${playlistId}=${newCookie}; `,
        `Path=/; `,
        `Expires=Fri, 31 Dec 2066 23:59:59 GMT`
    ]
    res.set("set-cookie", cookieParams.join(""))
    res.send({"result": "ok"})
})
app.post("/mobile/blzr/add_favorite", (req, res) => {
    yt2009_blazer.favorite(req, res)
})
app.get("/mobile/blzr/my_favorites", (req, res) => {
    yt2009_blazer.get_favs(req, res)
})
app.get("/mobile/blzr/my_playlists", (req, res) => {
    yt2009_blazer.get_playlists(req, res)
})
app.get("/mobile/blzr/view_playlist", (req, res) => {
    yt2009_blazer.view_cookie_playlist(req, res)
})
app.get("/mobile/blzr/my_subscriptions", (req, res) => {
    // "s" parameter = fetch user's new videos
    // otherwise get the list
    if(req.query.s) {
        yt2009_blazer.sub_feed(req, res)
    } else {
        yt2009_blazer.user_subscriptions(req, res)
    }  
})
app.get("/mobile/blzr/my_videos", (req, res) => {
    res.send({"result": "ok", "content": {"videos": []}})
})
app.get("/mobile/blzr/signup", (req, res) => {
    if(req.query.action_logout == "1") {
        let cookieParams = [
            `blazer_login=so; `,
            `Path=/; `,
            `Expires=Fri, 31 Dec 2005 23:59:59 GMT`
        ]
        res.set("set-cookie", cookieParams.join(""))
    }

    res.redirect("/mobile/blzr")
})

/*
======
save clientside playlist for playback
======
*/
app.post("/create_playlist", (req, res) => {
    let c = true;
    if(!yt2009_utils.isAuthorized(req)) {
        res.status(401).send("")
        return;
    }

    // if this playlist exists, send it with its id
    let savedPlaylists = require("./cache_dir/playlist_cache_manager").read()
    for(let playlist in savedPlaylists) {
        if(savedPlaylists[playlist].custom_rawVideoIds == req.headers.videos) {
            res.send(playlist)
            c = false;
        }
    }

    if(!c) return;

    // metadata
    let videos = req.headers.videos.split(";")
    if(videos[videos.length - 1].length == 0) {
        videos.pop();
    }
    let playlist_name = req.headers.playlist_name;
    let playlistId = "yt9-"
    let randomId = ""
    while(randomId.length !== 8) {
        randomId += "qwertyuiopasdfghjklzxcvbnm".split("")
                    [Math.floor(Math.random() * 26)]
    }
    playlistId += randomId
    let dateAdded = new Date().toString().split(" ")
    dateAdded.shift();
    dateAdded = dateAdded.slice(0, 3)
    dateAdded[1] += ","
    dateAdded = dateAdded.join(" ")

    // create playlist readable by yt2009playlists
    let playlistObject = {
        "name": playlist_name.split("&lt;").join("<").split("&gt;").join(">"),
        "videos": [],
        "creatorName": "",
        "creatorUrl": "",
        "description": "",
        "lastUpdate": dateAdded,
        "playlistId": playlistId,
        "videoCount": "",
        "custom_rawVideoIds": req.headers.videos
    }

    // add videos
    videos.forEach(video => {
        yt2009.fetch_video_data(video, (data => {
            playlistObject.videos.push({
                "id": video,
                "title": data.title,
                "thumbnail": "http://i.ytimg.com/vi/" + video + "/hqdefault.jpg",
                "uploaderName": data.author_name,
                "uploaderUrl": data.author_url
            })

            playlistObject.videoCount = playlistObject.videos.length;
            if(videos.length == playlistObject.videos.length) {
                // send on everything
                sendResponse();
            }
        }), "", yt2009_utils.get_used_token(req), false, false, true)
    })

    function sendResponse() {
        playlistObject.videoCount += " videos"
        require("./cache_dir/playlist_cache_manager")
        .write(playlistId, playlistObject)
        res.send(playlistId)
    }
})

/*
======
relay
======
*/
app.get("/relay", (req, res) => {
    res.redirect("/relay/intro.htm")
})

/*
======
recommended section
======
*/
app.get("/yt2009_recommended", (req, res) => {
    if(!req.headers.ids) {
        res.send("YT2009_NO_DATA")
        return;
    }
    let baseVids = req.headers.ids.split(",").slice(0, 3)
    let processedVideos = 0;
    let videoSuggestions = []
    yt2009.bulk_get_videos(baseVids, () => {
        baseVids.forEach(vid => {
            setTimeout(function() {
                // have video data, get related with exp_related
                let videoData = yt2009.get_cache_video(vid)
                let lookup_keyword = ""
                if(!videoData.tags || !videoData.title) {
                    processedVideos++;
                    if(processedVideos == baseVids.length) {
                        createSuggestionsResponse();
                    }
                    return;
                }

                // tags
                videoData.tags.forEach(tag => {
                    if(lookup_keyword.length < 9) {
                        lookup_keyword += `${tag.toLowerCase()} `
                    }
                })
                // first word from the title as backup
                if(lookup_keyword.length < 9) {
                    lookup_keyword = videoData.title.split(" ")[0]
                }

                // get!!
                yt2009_search.related_from_keywords(
                    lookup_keyword,
                    vid,
                    "",
                    (html, rawData) => {
                        rawData.forEach(video => {
                            videoSuggestions.push(video)
                        })
                        processedVideos++;
                        if(processedVideos == baseVids.length) {
                            createSuggestionsResponse();
                            return;
                        }
                    },
                    req.protocol
                )
            }, Math.floor(Math.random() * 1000) + 300)
        })  
    })

    function createSuggestionsResponse() {
        // get 8 random videos from videoSuggestions
        let filteredSuggestions = []
        while(filteredSuggestions.length !== 8) {
            let randomVideo = videoSuggestions[
                Math.floor(Math.random() * videoSuggestions.length)
            ]
            if(!randomVideo) {
                res.send("YT2009_NO_DATA")
                return;
            }
            // regenerate if needed to avoid duplicates
            // use loopLimit to prevent the whole frontend from hanging up
            // in a while loop
            let loopCount = 0;
            let loopLimit = 30;
            while(
                JSON.stringify(filteredSuggestions).includes(randomVideo.id)
                && loopCount !== loopLimit) {
                randomVideo = videoSuggestions[
                    Math.floor(Math.random() * videoSuggestions.length)
                ]
                loopCount++;
            }

            filteredSuggestions.push(randomVideo)
        }


        // create and send html of filteredSuggestions
        let response = ""
        filteredSuggestions.forEach(video => {
            response += yt2009_templates.recommended_videoCell(video, req)
        })

        response = yt2009_languages.apply_lang_to_code(response, req)
        res.send(response)
    }
})

/*
======
userpage list view
======
*/
app.get("/userpage_expand_view", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }
    if(!req.headers.videos) {
        res.sendStatus(400)
        return;
    }
    let flags = ""
    if(req.headers.cookie
    && req.headers.cookie.includes("global_flags=")) {
        flags = req.headers.cookie.split("global_flags=")[1].split(";")[0]
    }

    // get all video data
    let videos = req.headers.videos.split(",")
    if(videos[videos.length - 1] == "") {
        videos = videos.slice(0, videos.length - 1)
    }
    let response = ``
    yt2009.bulk_get_videos(videos, () => {
        setTimeout(function() {
            let videoIndex = 0;
            videos.forEach(v => {
                v = yt2009.get_cache_video(v)
                response += yt2009_templates.listview_video(v, videoIndex, flags)
                videoIndex++
            })

            res.send(response)
        }, 100)
    })
})

/*
======
experimental: wordlist search
======
*/
if(fs.existsSync("../wordlist.txt")) {
    const wordlist = fs.readFileSync("../wordlist.txt").toString().split("\n")
    const charsRegex = /[-"'&_+=?!.,\[\]:;\/\\|]/g
    app.get("/suggest", (req, res) => {
        let q = req.query.q.toLowerCase();
        let matching = []
        let response = ``
        // add to matching array
        wordlist.forEach(w => {
            let wVisible = w.toLowerCase().replace(charsRegex, "")
            if((w.toLowerCase().startsWith(q)
            || w.replace(charsRegex, "")
                .split("  ").join(" ").startsWith(q))
            && matching.length <= 10
            && !matching.includes(wVisible)) {
                matching.push(wVisible)
            }
        })
        matching = matching.sort((a, b) => {return a.length - b.length})

        // add from matching array to response
        matching.forEach(m => {
            response += `
            <tr class="google-ac-a">
                <td class="google-ac-c">${m}</td>
                <td class="google-ac-d"></td>
            </tr>`
        })
        res.send(response)
    })
}

/*
======
retry video download using a different format id than 18 (360p)
as sometimes it's not available
(example: https://www.youtube.com/watch?v=auzfTPp4moA)
======
*/
app.get("/retry_video", (req, res) => {
    let id = req.query.video_id.substring(0, 11)
                .replace(/[^a-zA-Z0-9+-+_]/g, "")

    // check if there actually is a need to retry download
    if(fs.existsSync(`../assets/${id}.mp4`)
    && fs.statSync(`../assets/${id}.mp4`).size > 0) {
        res.redirect(`/assets/${id}.mp4`)
        return;
    }

    if(fs.existsSync(`../assets/${id}.mp4`)
    && fs.statSync(`../assets/${id}.mp4`).size == 0) {
        fs.unlinkSync(`../assets/${id}.mp4`)
    }

    // retry if so
    // get separate 360p video and audio and combine
    let ytdl = require("ytdl-core")
    
    let v = ytdl.getInfo("https://www.youtube.com/watch?v=" + id)
    let qualityItags = {}
    let videoItag = ""
    let audioItag = ""
    v.catch(error => {
        res.sendStatus(404)
        return;
    })
    v.then(v => {
        v.formats.forEach(format => {
            if(format.mimeType.includes("video/mp4")
            && format.mimeType.includes("avc")
            && format.height <= 360) {
                qualityItags[format.qualityLabel] = format.itag;
            } else if(format.mimeType.includes("audio/mp4")) {
                audioItag = format.itag
            }
        })

        // get highest video quality up to 360p (don't assume 360
        // as it won't be available everywhere)
        let qNames = []
        for(let name in qualityItags) {
            qNames.push(parseInt(name))
        }
        qNames = qNames.sort((a, b) => b - a)
        videoItag = qualityItags[qNames[0] + "p"]

        // download both
        // call mergeFormats once both done
        let vDownloaded = false;
        let aDownloaded = false;

        // video
        let vStream = fs.createWriteStream(`../assets/${id}-v.mp4`)
        vStream.on("finish", () => {
            vDownloaded = true;
            if(vDownloaded && aDownloaded) {
                mergeFormats()
            }
        })
        ytdl.downloadFromInfo(v, {"quality": videoItag})
        .on("error", (error) => {
            console.log("retry_video video: " + error)
            res.sendStatus(404)
            return;
        })
        .pipe(vStream)

        // audio
        let audioStream = fs.createWriteStream(`../assets/${id}-a.mp3`)
        audioStream.on("finish", () => {
            aDownloaded = true;
            if(vDownloaded && aDownloaded) {
                mergeFormats()
            }
        })
        ytdl.downloadFromInfo(v, {"quality": audioItag})
        .on("error", (error) => {
            console.log("retry_video audio: " + error)
            res.sendStatus(404)
            return;
        })
        .pipe(audioStream)
    })

    function mergeFormats() {
        let cmd = yt2009_templates.format_merge_command(
            `${__dirname}/../assets/${id}-v.mp4`,
            `${__dirname}/../assets/${id}-a.mp3`,
            `${__dirname}/../assets/${id}.mp4`
        )
        child_process.exec(cmd, (error, stdout, stderr) => {
            res.redirect(`/assets/${id}.mp4`)
            if(fs.existsSync(`${__dirname}/../assets/${id}-v.mp4`)
            && fs.existsSync(`${__dirname}/../assets/${id}-a.mp3`)) {
                fs.unlinkSync(`${__dirname}/../assets/${id}-v.mp4`)
                fs.unlinkSync(`${__dirname}/../assets/${id}-a.mp3`)
            }
        })
    }
})

/*
======
signin endpoints
======
*/
let signin = fs.readFileSync("../signin.htm").toString()
app.get("/signin", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.redirect("/unauth.htm")
        return;
    }

    res.send(signin)
})
app.get("/logout", (req, res) => {
    let flags = req.headers.cookie || ""
    let globalFlags = ""
    flags.split(";").forEach(c => {
        if(c.includes("global_flags=")) {
            globalFlags = c.split("global_flags=")[1]
        }
    })

    if(globalFlags.includes("login_simulate")) {
        let username = globalFlags.split("login_simulate")[1].split(":")[0]
        globalFlags = globalFlags.replace(
            "login_simulate" + username + ":", ""
        ).replace(
            "login_simulate" + username, ""
        )
    }

    let cookieParams = [
        `global_flags=${globalFlags} `,
        `Path=/; `,
        `Expires=Fri, 31 Dec 2066 23:59:59 GMT`
    ]
    res.set("set-cookie", cookieParams.join(""))
    res.send("<script>location.href = \"/\"</script>")
})


/*
======
language picker
======

bucket = vertical row
*/
app.get("/language_picker", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.send("")
        return;
    }
    let languageBuckets = [
        [], [], [], [], []
    ]
    let langListArray = []
    let bucketSize = 5;
    if(req.headers.referer
    && req.headers.referer.includes("/watch")) {
        bucketSize = 3;
        languageBuckets = [[], [], []]
    }

    // get available languages
    let langs = yt2009_languages.get_language_list()
    for(let langCode in langs) {
        langListArray.push([langCode, langs[langCode]])
    }
    let currentBucket = 0

    // put them into buckets
    langListArray.forEach(l => {
        languageBuckets[currentBucket].push(l)
        currentBucket++
        if(currentBucket >= bucketSize) {
            currentBucket = 0;
        }
    })

    // put buckets into html
    let html = yt2009_templates.langPickerBase
    let bucketHTML = [
        "", "", "", "", ""
    ]
    if(bucketSize == 3) {
        bucketHTML = ["", "", ""]
    }
    let bucketIndex = 0;
    languageBuckets.forEach(bucket => {
        bucket.forEach(lang => {
            bucketHTML[bucketIndex] += yt2009_templates.langPickerLanguage(
                lang[0], lang[1]
            )
        })
        html = html.replace(
            `<!--yt2009_bucket_${bucketIndex + 1}-->`,
            bucketHTML[bucketIndex]
        )
        bucketIndex++
    })


    res.send(html)
})

/*
======
/flags lister page
======
*/
let flagsCode = fs.readFileSync("../flags_main.htm").toString()
app.get("/flags_main.htm", (req, res) => {
    if(yt2009_utils.isAuthorized(req)) {
        res.send(flagsCode)
    } else {
        res.redirect("/unauth.htm")
    }
})
app.get("/flags", (req, res) => {
    res.redirect("/flags_main.htm")
})


/*
======
yt2009 comments
======
*/
app.post("/comment_post", (req, res) => {
    // preconditions
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401);
        return;
    }
    if(!req.headers.source
    || !req.body
    || !req.headers.cookie.includes("login_simulate")) {
        res.sendStatus(400)
        return;
    }
    let syncSession = false;
    if(req.headers.cookie.includes("syncses=")) {
        syncSession = req.headers.cookie
                      .split("syncses=")[1].split(";")[0]
                      .replace(/[^a-zA-Z0-9]/g, "").trim()
    }

    // parse request
    let body = {}
    if(!req.body.toString().startsWith("{")) {
        body = {"comment": req.body.toString()}
    } else {
        body = JSON.parse(req.body.toString())
    }
    body.video_id = req.headers.source.split("v=")[1]
                    .split("&")[0].split("#")[0]
    if(!fs.existsSync("./cache_dir/comments.json")) {
        fs.writeFileSync("./cache_dir/comments.json", "{}")
    }
    if(!body.comment) {
        res.send("empty")
        return;
    } else if(body.comment.length > 500) {
        res.send("long")
        return;
    }
    let comments = yt2009.custom_comments()
    if(!comments[body.video_id]) {
        comments[body.video_id] = []
    }

    // write comment
    let author = req.headers.cookie
                 .split("login_simulate")[1]
                 .split(":")[0].split(";")[0]
    let safeAuthor = yt2009_utils.asciify(decodeURIComponent(author), true, false)
                     .split(" ").join("").substring(0, 20)
    let safeComment = yt2009_utils.xss(body.comment)
    let commentId = Math.floor(Math.random() * 110372949)

    let commentObject = {
        "author": safeAuthor,
        "text": safeComment,
        "time": Date.now(),
        "token": yt2009_utils.get_used_token(req),
        "id": commentId,
        "rating": 0,
        "ratingSources": {}
    }

    if(req.headers.cookie.includes("exclude_cs")) {
        commentObject.csHide = true
    }

    if(yt2009_exports.read().masterWs) {
        let ws = yt2009_exports.read().masterWs
        // send & wait for synced data
        let syncSent = false;
        function bringSync(msg) {
            if(syncSent) return;
            syncSent = true
            if(!msg.syncable) {
                safeAuthor = "possibly_not_" + safeAuthor
                commentObject.author = "possibly_not_" + safeAuthor
            } else {
                safeAuthor = yt2009_utils.xss(msg.comment.author)
                commentObject.author = safeAuthor
                commentObject.token = yt2009_utils.get_used_token(req)
            }
            commentObject.rating = 0
            commentObject.ratingSources = {}

            if(commentObject.author.includes("possibly_not_possibly_not_")) {
                commentObject.author = commentObject.author.replace(
                    "possibly_not_", ""
                )
            }

            comments[body.video_id].push(commentObject)

            if(msg.new_session) {
                let cookieParams = [
                    `syncses=${msg.new_session}; `,
                    `Path=/; `,
                    `Expires=Fri, 31 Dec 2066 23:59:59 GMT`
                ]
                res.set("set-cookie", cookieParams.join(""))
            }

            yt2009.receive_update_custom_comments(comments)
            fs.writeFileSync("./cache_dir/comments.json", JSON.stringify(comments))

            try {
                res.send(yt2009_languages.apply_lang_to_code(
                    yt2009_templates.videoComment(
                        "#", safeAuthor, "1 second ago",
                        safeComment, "login_simulate" + safeAuthor, true, "0",
                        commentId
                    ), req)
                )
            }
            catch(error) {}
        }
        syncCommentCallbacks[commentId] = function(msg) {
            bringSync(msg)
        }
        setTimeout(() => {
            bringSync({"type": "comment-feedback"})
        }, 5000)
        ws.send(JSON.stringify({
            "type": "comment",
            "session": syncSession,
            "name": safeAuthor,
            "content": safeComment,
            "id": commentId,
            "video": body.video_id
        }))
    } else {
        commentObject.author = "possibly_not_" + safeAuthor
        comments[body.video_id].push(commentObject)

        res.send(yt2009_languages.apply_lang_to_code(
            yt2009_templates.videoComment(
                "#", "possibly_not_" + safeAuthor, "1 second ago",
                safeComment, "login_simulate" + safeAuthor, true, "0",
                commentId
            ), req)
        )
        yt2009.receive_update_custom_comments(comments)
        fs.writeFileSync("./cache_dir/comments.json", JSON.stringify(comments))
    }
})

app.post("/comment_rate", (req, res) => {
    // preconditions
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401);
        return;
    }
    if(!req.headers.source
    || !req.headers.rating
    || (req.headers.rating !== "like" && req.headers.rating !== "dislike")
    || !req.headers.comment) {
        res.sendStatus(400)
        return;
    }

    let displayRating = 0
    if(req.headers.initial
    && !isNaN(req.headers.initial)) {
        displayRating = parseInt(req.headers.initial)
    }

    let videoId = req.headers.source.split("v=")[1]
                  .split("&")[0].split("#")[0]

    // find the comment
    let commentObject = undefined;
    let comments = yt2009.custom_comments()
    if(!comments[videoId]) {
        comments[videoId] = []
    }

    comments[videoId].forEach(comment => {
        if(comment.id == req.headers.comment) {
            commentObject = comment;
        }
    })
    if(!commentObject) {
        commentObject = {
            "rating": 0,
            "ratingSources": {},
            "id": req.headers.comment
        }
        comments[videoId].push(commentObject)
    }

    // add rating
    let token = yt2009_utils.get_used_token(req)
    if(token == "") {
        token = "dev"
    }
    
    if(commentObject.ratingSources[token]) {
        let r = commentObject.ratingSources[token]
        if(r == 1) {
            commentObject.rating -= 1
        } else {
            commentObject.rating += 1
        }
        delete commentObject.ratingSources[token];
    }
    if(req.headers.rating == "like") {
        commentObject.rating += 1
        commentObject.ratingSources[token] = 1
        displayRating += 1
    } else {
        commentObject.rating -= 1
        commentObject.ratingSources[token] = -1
        displayRating -= 1
    }

    res.send("rating:" + displayRating)

    // save comments with new rating
    yt2009.receive_update_custom_comments(comments)
})

app.get("/reply_template", (req, res) => {
    if(!req.headers.source
    || !req.headers.cookie
    || (req.headers.cookie
    && !req.headers.cookie.includes("login_simulate"))) {
        res.sendStatus(400)
        return;
    }

    let video = req.headers.source
                .split("v=")[1]
                .split("&")[0]
                .split("#")[0]
    let loginName = yt2009_utils.xss(
        req.headers.cookie
        .split("login_simulate")[1]
        .split(":")[0].split(";")[0]
        .split("\"").join("'")
    )

    res.send(yt2009_templates.replyTemplate(
        Math.floor(Math.random() * 17112023), video, loginName
    ))
})

app.post("/comment_reply", (req, res) => {
    res.send("sus")
})

/*
======
flag menu
======
*/
let flagMenu = fs.readFileSync(
    "../assets/site-assets/flag-video-template.html"
).toString()
app.get("/flag_menu_template", (req, res) => {
    if(req.headers.source == "channel") {
        let response = flagMenu.split("\n")
        response.shift()
        response = response.join("\n")
        res.send(response)
        return;
    }
    res.send(flagMenu)
})

/*
======
channel filtering
======
*/
app.get("/search_channel", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {res.sendStatus(401);return;}
    if(!req.headers.source || !req.headers.query) {
        res.sendStatus(400);return;
    }

    // get channel flags so those work
    let channelFlags = ""
    let useOnlyOld = false;
    if(req.headers.cookie
    && req.headers.cookie.includes("channel_flags")) {
        channelFlags = req.headers.cookie
                       .split("channel_flags=")[1]
                       .split(";")[0]
                       .split(":").join(";")
    }
    if(channelFlags.includes("only_old")) {
        useOnlyOld = yt2009_search.handle_only_old(
            req.headers.cookie.split(":").join(";")
        )
    }

    // get channel by source
    yt2009_channels.main(
        {"path": req.headers.source,
        "headers": {},
        "query": {}},
        {"send": function(data) {
            yt2009_search.get_search(
                `${data.name} ${req.headers.query} ${useOnlyOld ? useOnlyOld : ""}`,
                "", {}, (search => {
                    let matchingVids = []
                    search.forEach(result => {
                        if(result.type == "video"
                        && result.title.toLowerCase().includes(
                            req.headers.query.toLowerCase()
                        )
                        && result.author_url.includes(data.id)) {
                            matchingVids.push(result)
                        }
                    })
                    render(matchingVids)
                }
            ), yt2009_utils.get_used_token(req), false)
        }
    }, "", true)

    // serverside render html
    function render(results) {
        let createdHTML = ``
        let i = 1;
        results.forEach(result => {
            let views = yt2009_utils.viewFlags(result.views, channelFlags)
            let upload = yt2009_utils.fakeDatesModern(req, result.upload)
            createdHTML += yt2009_templates.playnavVideo(
                result,
                i,
                views,
                upload,
                Math.floor(yt2009_utils.bareCount(views) / 150),
                req.protocol
            )
            i++
        })

        res.send(createdHTML)
    }
})

app.get("/channel_sort", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {res.sendStatus(401);return;}
    if(!req.headers.source || !req.headers.sort) {
        res.sendStatus(400);return;
    }

    // get channel flags so those work
    let channelFlags = ""
    let useOnlyOld = false;
    if(req.headers.cookie
    && req.headers.cookie.includes("channel_flags")) {
        channelFlags = req.headers.cookie
                       .split("channel_flags=")[1]
                       .split(";")[0]
                       .split(":").join(";")
    }
    if(channelFlags.includes("only_old")) {
        useOnlyOld = yt2009_search.handle_only_old(
            req.headers.cookie.split(":").join(";")
        )
    }

    // init search params
    let vids = []
    let page = 1;
    let params = {"page": page}
    switch(req.headers.sort) {
        case "date": {
            params.search_sort = "video_date_uploaded"
            break;
        }
        case "popularity": {
            params.search_sort = "video_view_count"
            break;
        }
        case "rating": {
            params.search_sort = "video_avg_rating"
            break;
        }
    }

    // get channel by source
    yt2009_channels.main(
        {"path": req.headers.source,
        "headers": {},
        "query": {}},
        {"send": function(data) {
            // get chips if set to most popular/latest and no only_old
            // search in any other case
            if(req.headers.sort == "date" && !useOnlyOld) {
                getByChip(yt2009_templates.latestChip, data.id)
                return;
            }
            if(req.headers.sort == "popularity" && !useOnlyOld) {
                getByChip(yt2009_templates.popularChip, data.id)
                return;
            }
            
            getNextPage(data.name, data.id)
            
        }
    }, "", true)

    // loop search until 10 videos (or 5 fetches to avoid infinite)
    function getNextPage(name, id) {
        yt2009_search.get_search(
            `${name} ${useOnlyOld ? useOnlyOld : ""}`,
            "", params, (search => {
                search.forEach(result => {
                    if(result.type == "video"
                    && result.author_url.includes(id)) {
                        vids.push(result)
                    }
                })
                if(vids.length <= 10 && page < 5) {
                    page++
                    params.page = page;
                    getNextPage(name, id)
                } else {
                    render(vids)
                }
            }
        ), yt2009_utils.get_used_token(req), false)
    }

    // get by chip if possible
    function getByChip(chipParam, channelId) {
        yt2009_channels.get_direct_by_chipparam(chipParam, channelId, (v) => {
            render(v)
        })
    }

    // serverside render html
    function render(results) {
        let createdHTML = ``
        let i = 1;
        results.forEach(result => {
            let views = yt2009_utils.viewFlags(result.views, channelFlags)
            let upload = yt2009_utils.fakeDatesModern(req, result.upload)
            createdHTML += yt2009_templates.playnavVideo(
                result,
                i,
                views,
                upload,
                Math.floor(yt2009_utils.bareCount(views) / 150),
                req.protocol
            )
            i++
        })

        res.send(createdHTML)
    }
})

/*
======
comment search
======
*/
const shtml = fs.readFileSync("../comment_search.htm").toString()
app.get("/comment_search", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.redirect("/unauth.htm")
        return;
    }
    let code = shtml;
    let flags = ""
    if(req.headers.cookie
    && req.headers.cookie.includes("global_flags=")) {
        flags = req.headers.cookie.split("global_flags=")[1].split(";")[0]
    }

    // enumerate
    let comments = yt2009.custom_comments()
    let commentsA = []
    for(let i in comments) {
        comments[i].forEach(comment => {
            if(!comment.time) return;
            let commentObject = JSON.parse(JSON.stringify(comment))
            commentObject.video = i;
            let commentTime = yt2009_utils.unixToRelative(comment.time)
            commentObject.relativeTime = yt2009_utils.relativeTimeCreate(
                commentTime, yt2009_languages.get_language(req)
            )
            if(yt2009.get_cache_video(i)) {
                commentObject.videoTitle = yt2009.get_cache_video(i).title
            }
            if(commentObject.text.length == 0 || commentObject.csHide) return;
            commentsA.push(commentObject)
        })
    }

    // sort
    // by rating, otherwise by time
    let param = req.url.includes("?") ? "&" : "?"
    if(req.query.so == "pagerank") {
        commentsA = commentsA.sort((a, b) => b.rating - a.rating)
        code = code.replace(
            `<!--sort_by_rating-->`,
            `<b>Sort by Rating</b>`
        )
        code = code.replace(
            `<!--sort_by_time-->`,
            `<a href="${req.url.replace("so=pagerank", "")}">Sort by Time</a>`
        )
    } else {
        commentsA = commentsA.sort((a, b) => b.time - a.time)
        code = code.replace(
            `<!--sort_by_time-->`,
            `<b>Sort by Time</b>`
        )
        code = code.replace(
            `<!--sort_by_rating-->`,
            `<a href="${req.url}${param}so=pagerank">Sort by Rating</a>`
        )
    }
    
    // filter comments
    // by user
    if(req.query.username) {
        req.query.username = yt2009_utils.xss(req.query.username)
        commentsA = commentsA.filter(s => s.author == req.query.username)
        code = code.replace(
            `<!--from_suffix-->`,
            `from <b>${req.query.username}</b>`
        )
    }
    // by content
    if(req.query.q) {
        commentsA = commentsA.filter(s => s.text.toLowerCase().includes(
            req.query.q.toLowerCase()
        ))
        code = code.replace(
            `yt2009_query`,
            req.query.q.split(`"`).join("&quot;")
        )
    } else {
        code = code.replace(`yt2009_query`, "")
    }
    // by page
    let page = parseInt(req.query.page || 1) - 1
    if(page < 0) {page = 0}
    let unpagedComments = JSON.parse(JSON.stringify(commentsA))
    commentsA = commentsA.slice(13 * page, (13 * page) + 13)

    // render
    let commentsHTML = ""
    commentsA.forEach(comment => {
        commentsHTML += yt2009_templates.commentSearchResult(comment, flags)
    })

    // pager render
    let pagerHTML = "Page " + (req.query.page || 1)
    if(req.query.page && parseInt(req.query.page) > 1) {
        let previousPage = parseInt(req.query.page) - 1
        let nextPage = parseInt(req.query.page) + 1
        let prev = req.url.replace(
            "page=" + req.query.page,
            "page=" + previousPage
        )
        let next = req.url.replace(
            "page=" + req.query.page,
            "page=" + nextPage
        )
        let prevPagehtml = yt2009_templates.csPager(previousPage, prev, true)
        let nextPagehtml = " - " + yt2009_templates.csPager(nextPage, next)
        if(!unpagedComments[(page + 1) * 13]) {nextPagehtml = ""}
        pagerHTML = `${prevPagehtml} - ${pagerHTML}${nextPagehtml}`
    } else {
        let nextPage = parseInt(req.query.page) + 1
        let next = req.url + param + "page=2"
        if(req.url.includes("page=")) {
            next = req.url.replace(
                "page=" + req.query.page,
                "page=" + nextPage
            )
        }
        let nextPagehtml = " - " + yt2009_templates.csPager(nextPage, next)
        if(!unpagedComments[(page + 1) * 13]) {nextPagehtml = ""}
        pagerHTML = `${pagerHTML}${nextPagehtml}`
    }
    code = code.replace(
        `<!--yt2009_pager-->`, pagerHTML
    )

    code = code.replace(`<!--yt2009_comments-->`, commentsHTML)
    code = require("./yt2009loginsimulate")(req, code, true)
    code = yt2009_languages.apply_lang_to_code(code, req)

    res.send(code)
})

/*
======
near you videos
======
*/

// yt2009upgrade: download modules on existing installs
let ipDb = false;
let regionParamTable = false;
let maxmind;
if(!fs.existsSync(__dirname + "/GeoLite2-City.mmdb")) {
    // download ip database
    let l = `https://github.com/PaddeK/node-maxmind-db/raw/master/test/data/GeoLite2-City.mmdb`
    console.log("yt2009upgrade: downloading ip-country db for near you")
    const fetch = require("node-fetch")
    fetch(l, {
        "headers": yt2009_constant.headers
    }).then(r => {
        r.buffer().then(buffer => {
            fs.writeFile(`./GeoLite2-City.mmdb`, buffer, () => {
                dlModule()
            })
        })
    })
    // download module
    function dlModule() {
        console.log("yt2009upgrade: downloading maxmind-db-reader")
        child_process.exec("npm install maxmind-db-reader",
        (error, stdout, stderr) => {
            console.log("yt2009upgrade: setup done")
            setTimeout(() => {
                maxmind = require("maxmind-db-reader")
                ipDb = maxmind.openSync("./GeoLite2-City.mmdb")
                regionParamTable = require("./location_params.json")
            }, 150)
        })
    }
} else {
    maxmind = require("maxmind-db-reader")
    ipDb = maxmind.openSync("./GeoLite2-City.mmdb")
    regionParamTable = require("./location_params.json")
}

app.get("/nearyou", (req, res) => {
    // get flags

    let flags = ""
    if(req.headers.cookie
    && req.headers.cookie.includes("mainpage_flags")) {
        flags += req.headers.cookie.split("mainpage_flags=")[1].split(";")[0]
    }
    if(req.headers.cookie
    && req.headers.cookie.includes("global_flags")) {
        flags += req.headers.cookie.split("global_flags=")[1].split(";")[0]
    }

    // get user region

    let region = "US"
    if(!ipDb) {
        region = "US"
    }
    let ip = req.ip.replace("::ffff:", "")
    let ipData;
    try {
        ipData = ipDb.getGeoDataSync(ip)
        region = ipData.country.iso_code
    }
    catch(error) {
        region = "US"
    }
    let initialRegion = JSON.parse(JSON.stringify(region))
    /*if(ipData && ipData.city) {
        try {
            region = ipData.city.names.en
        }
        catch(error) {}
    }
    region = "PL"*/

    // cookie region override
    if(req.headers.cookie
    && req.headers.cookie.includes("gl=")) {
        region = req.headers.cookie.split("gl=")[1].split(";")[0]
    }

    let regionParam = ""
    if(region.length == 2) {
        regionParam = regionParamTable[region] || regionParamTable["US"]
        setTimeout(createSearch, 50)
    } else {
        /*const fetch = require("node-fetch")
        let r = encodeURIComponent(region)
        fetch(`https://www.google.com/earth/rpc/search?q=${r}&ie=utf-8&hl=en`, {
            "headers": yt2009_constant.headers
        }).then(r => {r.text().then(r => {
            r = require("node-html-parser").parse(r)
            let feature = r.querySelector("feature_id")
            if(feature) {
                let location = feature.innerHTML.split(":")[0].replace("0x", "")
                let featureId = feature.innerHTML.split(":")[1].replace("0x", "")
                while(location.endsWith("0")) {
                    location = parseInt(location, 16).toString().slice(0, -1)
                }
                location = parseInt(location)
                while(featureId.endsWith("0")) {
                    featureId = parseInt(featureId, 16).toString().slice(0, -1)
                }
                featureId = parseInt(featureId)
                // create protobuf location param
                const locationParam = require("./proto/locationParam_pb")

                let locationMsg = new locationParam.root()
                let locationContainer = new locationParam.root.container()
                locationContainer.setLocation(location)
                locationContainer.setFeature(featureId)
                locationMsg.addC(locationContainer)

                try {
                    regionParam = Buffer.from(
                        locationMsg.serializeBinary()
                    ).toString("base64").split("=").join("")
                    createSearch()
                }
                catch(error) {
                    console.log(error)
                    region = initialRegion
                    regionParam = regionParamTable[region] || regionParamTable["US"]
                    createSearch()
                }
            } else {
                // fallback to country search
                region = initialRegion
                regionParam = regionParamTable[region] || regionParamTable["US"]
                createSearch()
            }
        })})*/
    }

    // search for vids in that region

    let randomMonth = Math.floor(Math.random() * 6) + 6
    if(randomMonth < 10) {
        randomMonth = "0" + randomMonth
    }
    let query = "a before:2012"
    let finishHTML = ""
    let videos = []
    function createSearch() {
        yt2009_search.get_search(query, "", {
            "location": regionParam,
            "page": Math.floor(Math.random() * 4) + 1
        }, (data) => {
            data.forEach(v => {
                if(v.type !== "video") return;
                if(v.upload.split(" ")[1] !== "years") return;
                if(parseInt(v.upload.split(" ")[0]) < 10) return;
                // parse with flags
                v = JSON.parse(JSON.stringify(v))
    
                if(flags.includes("fake_dates")) {
                    v.upload = yt2009_utils.fakeDatesModern(v.upload, "2012-01-01")
                }
    
                if(flags.includes("realistic_view_count")
                && yt2009_utils.bareCount(v.views) > 100000) {
                    v.views = yt2009_utils.countBreakup(Math.floor(
                        yt2009_utils.bareCount(v.views) / 90
                    )) + " views"
                }
    
                v.length = v.time
                v.creatorName = v.author_handle || yt2009_utils.asciify(v.author_name)
                videos.push(v)
            })
            if(videos.length < 8 && region.length !== 2) {
                region = initialRegion
                regionParam = regionParamTable[region] || regionParamTable["US"]
                createSearch()
            } else if(videos.length < 8) {
                createSearch()
            } else {
                renderVids()
            }
        }, yt2009_utils.get_used_token(req), false)
    }

    function renderVids() {
        let randomVids = []
        while(randomVids.length !== Math.min(videos.length, 8)) {
            let v = videos[Math.floor(Math.random() * videos.length)]
            let l = 0
            while(randomVids.includes(v) && l < 20) {
                v = videos[Math.floor(Math.random() * videos.length)]
            }
            randomVids.push(v)
        }

        randomVids.forEach(v => {
            finishHTML += yt2009_templates.recommended_videoCell(v, req)
        })

        finishHTML = yt2009_languages.apply_lang_to_code(finishHTML, req)
        res.send(finishHTML)
    }
})

// region picker
app.get("/region_picker", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.send("")
        return;
    }
    let languageBuckets = [
        [], [], [], [], []
    ]
    let bucketSize = 5;
    if(req.headers.referer
    && req.headers.referer.includes("/watch")) {
        bucketSize = 3;
        languageBuckets = [[], [], []]
    }

    // get locations
    let locations = yt2009_templates.regions
    let currentBucket = 0
    locations.forEach(l => {
        languageBuckets[currentBucket].push(l)
        currentBucket++
        if(currentBucket >= bucketSize) {
            currentBucket = 0;
        }
    })

    // put buckets into html
    let html = yt2009_templates.locPickerBase
    let bucketHTML = [
        "", "", "", "", ""
    ]
    if(bucketSize == 3) {
        bucketHTML = ["", "", ""]
    }
    let bucketIndex = 0;
    languageBuckets.forEach(bucket => {
        bucket.forEach(lang => {
            bucketHTML[bucketIndex] += yt2009_templates.locPickerLoc(
                lang[0], lang[1], lang[2]
            )
        })
        html = html.replace(
            `<!--yt2009_bucket_${bucketIndex + 1}-->`,
            bucketHTML[bucketIndex]
        )
        bucketIndex++
    })


    res.send(html)
})

/*
======
bulk subscriptions to homepage video_cell (Latest from Subscriptions)
======
*/
app.post("/homepage_subscriptions", (req, res) => {
    // create a full list of channels
    function sc(c) {
        return c.split("\n").join("").split("\t").join("")
    }

    let local = req.body.toString()
    let cookieSubs = ""
    let channels = []
    if(req.headers.cookie
    && req.headers.cookie.includes("; sublist=")) {
        cookieSubs = decodeURIComponent(
            req.headers.cookie.split("; sublist=")[1].split(";")[0]
        ).split(`	`).join("").split("\n").join("")
    }
    cookieSubs.split(":").forEach(s => {
        if(!s.startsWith("http")
        || s.startsWith("blzr")
        || !s.includes("&")) return;
        channels.push([s.split("&")[0], sc(s.split("&")[1])])
    })
    try {
        local = JSON.parse(local)
        local.forEach(s => {
            if(!s.url || s.id || !s.creator
            || JSON.stringify(channels).includes(sc(s.creator))) return;
            channels.push([
                s.url, sc(s.creator)
            ])
        })
    }
    catch(error) {}

    // request max 5 channels

    let neededChannels = channels.slice(0, 5).length

    if(neededChannels == 0) {
        res.status(404)
        res.send("YT2009_NO_DATA")
        return;
    }

    let sentChannels = 0;
    let combinedVideos = []
    channels.slice(0, 5).forEach(c => {
        if(c[0].startsWith("http")) {
            c[0] = "/" + c[0].split("/").slice(3).join("/")
        }
        yt2009_subs.fetch_new_videos({
            "headers": {"url": c[0]},
            "query": {"flags": ""}
        }, {"send": function(data) {
            data.videos.forEach(v => {
                let tv = JSON.parse(JSON.stringify(v))
                tv.uploadUnix = Math.floor(new Date(
                    yt2009_utils.relativeToAbsoluteApprox(
                        tv.upload || ""
                    )
                ).getTime() / 1000)
                tv.creatorName = c[1]
                tv.creatorUrl = c[0]
                tv.o = true
                tv.length = tv.time
                combinedVideos.push(tv)
            })
            sentChannels++
            if(sentChannels >= neededChannels) {
                presentVids()
            }
        }}, true)
    })

    // sort and send
    function presentVids() {
        combinedVideos = combinedVideos.sort(
            (a, b) => b.uploadUnix - a.uploadUnix
        ).slice(0, 8)

        let finishHTML = ""
        let i = 0;
        combinedVideos.forEach(v => {
            let tv = JSON.parse(JSON.stringify(v))
            if(req.headers.cookie
            && req.headers.cookie.includes("fake_dates")) {
                tv.upload = yt2009_utils.genFakeDate(i)
            }
            finishHTML += yt2009_templates.recommended_videoCell(tv, req)
            i++
        })

        finishHTML = yt2009_languages.apply_lang_to_code(finishHTML, req)
        res.send(finishHTML)
    }
})

app.get("/ver", (req, res) => {
    let ver = require("../package.json")
    let version = ver.version
    let wsEnabled = config.disableWs || true
    let wsCon = yt2009_exports.read().masterWs ? true : false
    res.send(`${version}<br>sync enabled:${wsEnabled}<br>sync connected:${wsCon}`)
})

/*
======
sync inbox
======
*/
let syncInboxCallbacks = {}
app.get("/get_notifications", (req, res) => {
    let session = false
    if(req.headers.cookie
    && req.headers.cookie.includes("syncses=")) {
        session = req.headers.cookie.split("syncses=")[1].split(";")[0]
    }
    if(!session) {res.sendStatus(401);return;}


    let id = Math.floor(Math.random() * 5949534534)
    syncInboxCallbacks[id] = function(msg) {
        res.send(msg.data)
    }
    try {
        yt2009_exports.read().masterWs.send(JSON.stringify({
            "type": "inbox_msg_get",
            "session": session,
            "id": id
        }))
        setTimeout(() => {
            try {res.send([]);}catch(error){}
        }, 5000)
    }
    catch(error) {
        res.send([])
    }
})

app.post("/inbox_send", (req, res) => {
    // check for valid body
    if(!yt2009_utils.isAuthorized(req)) {res.sendStatus(401);return;}
    let b = (req.body || "").toString().split("&")
    let dataJSON = {}
    b.forEach(d => {
        dataJSON[d.split("=")[0]] = decodeURIComponent(d.split("=")[1])
    })
    if(!dataJSON.compose_to
    || !dataJSON.compose_message) {res.sendStatus(400);return;}

    // check for valid session
    let session = false
    if(req.headers.cookie
    && req.headers.cookie.includes("syncses=")) {
        session = req.headers.cookie.split("syncses=")[1].split(";")[0]
    }
    if(!session) {res.sendStatus(401);return;}
    let id = Math.floor(Math.random() * 5949534534)
    syncCheckCallbacks[id] = function(msg) {
        if(msg.result
        && msg.result.length > 1) {
            onCheckPass()
        } else {
            res.redirect("/inbox?msg=2")
        }
    }
    try {
        yt2009_exports.read().masterWs.send(JSON.stringify({
            "type": "pull_name",
            "session": session,
            "id": id
        }))
        setTimeout(() => {
            try {res.redirect("/inbox?msg=1")}catch(error) {}
            return;
        }, 5000)
    }
    catch(error) {
        res.redirect("/inbox?msg=1")
    }

    // send msg
    function onCheckPass() {
        id = Math.floor(Math.random() * 5949534534)
        syncInboxCallbacks[id] = function(m) {
            if(m.error) {
                res.redirect("/inbox?msg=" + m.msg)
            } else {
                res.redirect("/inbox?msg=5")
            }
        }
        yt2009_exports.read().masterWs.send(JSON.stringify({
            "type": "inbox_msg_post",
            "session": session,
            "id": id,
            "msg_type": "text_msg",
            "to": dataJSON.compose_to,
            "subject": dataJSON.compose_subject,
            "content": dataJSON.compose_message
        }))
    }
})

app.post("/mark_spam", (req, res) => {
    try {
        let session = false;
        if(req.headers.cookie
        && req.headers.cookie.includes("syncses=")) {
            session = req.headers.cookie.split("syncses=")[1].split(";")[0]
        }
        if(!session) {
            res.sendStatus(401)
            return;
        }
        let body = JSON.parse(req.body.toString())
        if(!body.from
        || !body.subject
        || !body.content) {
            res.sendStatus(400)
            return;
        }
        yt2009_exports.read().masterWs.send(JSON.stringify({
            "type": "inbox_spam_mark",
            "session": session,
            "from": body.from,
            "subject": body.subject,
            "content": body.content,
            "source": require("crypto").createHash("sha1")
                      .update(req.ip).digest("hex")
        }))
        res.sendStatus(200)
    }
    catch(error) {
        res.sendStatus(503)
        console.log(error)
    }
})

/*
pizdec
jp2gmd
mleczsus :*
Stawik
*/
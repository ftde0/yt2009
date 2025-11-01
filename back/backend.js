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
const yt2009_stats = require("./yt2009statsdata")
const yt2009_myvideos = require("./yt2009myvideos")
const yt2009_autoshare = require("./yt2009autoshare")
const yt2009sabr = require("./yt2009sabr")
const ryd = require("./cache_dir/ryd_cache_manager")
const video_rating = require("./cache_dir/rating_cache_manager")
const config = require("./config.json")
const child_process = require("child_process")
const yt2009charts = require("./yt2009charts")
const yt2009gdataauths = require("./yt2009mobileauths")
const yt2009basefeeds = require("./yt2009basefeeds")
const yt2009m = require("./yt2009m")
const yt2009trusted = require("./yt2009trustedcontext")
const mobileHelper = require("./yt2009mobilehelper")
const devTimings = false;
const p = require("../package.json")
const version = p.version;

const https = require("https")
const fs = require("fs")
const app = express();

// nodejs v5 patches
try {
	if(!Array.prototype.includes) {
		Array.prototype.includes = function(i) {
			return this.indexOf(i) !== -1;
		}
	}
}
catch(error) {}

// file limits, server init
let fileLimit = 10;
if(config.file_limit && !isNaN(parseInt(config.file_limit))) {
    fileLimit = parseInt(config.file_limit)
}

app.use(express.raw({
    "type": () => true,
    "limit": fileLimit + "mb"
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
    ${version}, ${launchTime}
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
    ${version}

    ==========
        `);
    });
}

if(require("os").totalmem() <= 110000000) {
    console.log(`
        
    
    low RAM amount (1G or less) detected!
    you might run into issues with video encoding.
    
    
`)
}
if(config.ip == "127.0.0.1" || config.ip == "localhost") {
    console.log(`
        
        
    config.ip set to "${config.ip}"!
    for anything other than quick testing, things WILL break!
    set yt2009's config correctly if planning on actual usage.
    

`)
}
if(!config.data_api_key) {
    console.log(`
        
        
    data api V3 key not set.
    while playback will work,
    not all video data may be accurate.
    recommended to set with config.data_api_key.


`)
}
if(yt2009_utils.isUnsupportedNode()) {
    console.log(`
        
        
    running with an old version of node!
    some features will not be available.
    recommended: node v10+


`)
}

if(fs.existsSync("../Dockerfile")) {
    let dockerfile = fs.readFileSync("../Dockerfile").toString().split("\r").join("")
    let crypto = require("crypto")
    let d = crypto.createHash("sha1")
    d.update(dockerfile)
    let digest = d.digest("hex")
    if(digest !== "0f60f203f9ccba549c632d266fabb1aae8bbfe3c") {
        console.log("Docker Validation Failure")
        process.exit(1);
    }
}

if(fs.existsSync("./yt2009experimentals.js")) {
    try {
        require("./yt2009experimentals").set(app)
    }
    catch(error) {console.log(error)}
}

if(config.redirmode
&& typeof(config.redirmode) == "string") {
    app.get("*", (req, res) => {
        if(req.url.startsWith("/") && config.redirmode.endsWith("/")) {
            req.url = req.url.replace("/", "")
        }
        res.redirect(308, config.redirmode + req.url)
        return;
    })
    app.post("*", (req, res) => {
        if(req.url.startsWith("/") && config.redirmode.endsWith("/")) {
            req.url = req.url.replace("/", "")
        }
        res.redirect(308, config.redirmode + req.url)
        return;
    })
} else if(config.redirmode && typeof(config.redirmode) !== "string") {
    console.log("/!\\ config.redirmode set incorrectly. ignoring.")
}

require("./yt2009androidsignin").set(app)

// ws sync with master
let syncCommentCallbacks = {}
let syncCheckCallbacks = {}
if(!config.disableWs) {
    let wsIp = config.overrideMaster || "wss://u.orzeszek.website:178"
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
                    "user": "yt2009server",
                    "v": version
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
                    case "update-sync-rm": {
                        yt2009.masterWarningRm()
                        break;
                    }
                    case "version-warning": {
                        if(m.version !== version) {
                            yt2009_home({
                                "type": "version-warning",
                                "version": m.version,
                                "current": version
                            }, () => {})
                        }
                        break;
                    }
                    case "c-sup-data": {
                        yt2009_channels.setSupData(m.channels)
                        break;
                    }
                    case "w-sup-data": {
                        yt2009.setSupData(m.channels)
                        break;
                    }
                    case "ping": {
                        w.send(JSON.stringify({
                            "type": "pong"
                        }))
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
    if(yt2009_utils.isRatelimited(req, res)) return;
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
        if(config.default_fh264) {
            res.cookie("f_h264", "on", {
                "path": "/",
                "expires": new Date("Fri, 31 Dec 2066 23:59:59 GMT")
            })
        }
        if(config.default_f) {
            res.cookie("f_mode", "on", {
                "path": "/",
                "expires": new Date("Fri, 31 Dec 2066 23:59:59 GMT")
            })
        }
    }

    if(req.headers.cookie
    && req.headers.cookie.includes("activity")) {
        let comments = yt2009_utils.latestCustomComments(3)
        let vList = []
        comments.forEach(c => {
            vList.push(c.video)
        })
        if(vList[0]
        && yt2009.get_cache_video(vList[0]).id) {
            yt2009_home(req, res)
            return;
        }
        yt2009.bulk_get_videos(vList, () => {
            yt2009_home(req, res)
        })
        return;
    }
    yt2009_home(req, res)
})

/*
======
watchpage
======
*/

app.get("/watch", (req, res) => {
    let x;
    let t = 0;
    if(devTimings) {
        x = setInterval(function() {
            t += 0.1
        }, 100)
    }
    if(!yt2009_utils.isAuthorized(req)) {
        if(yt2009_utils.isTemplocked(req)) {
            res.redirect("/t.htm")
            return;
        }
        res.redirect("/unauth.htm")
        return;
    }
    if(yt2009_utils.isRatelimited(req, res)) return;
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
        if(config.default_fh264) {
            res.cookie("f_h264", "on", {
                "path": "/",
                "expires": new Date("Fri, 31 Dec 2066 23:59:59 GMT")
            })
        }
        if(config.default_f) {
            res.cookie("f_mode", "on", {
                "path": "/",
                "expires": new Date("Fri, 31 Dec 2066 23:59:59 GMT")
            })
        }
    }

    let disableDownloads = false;
    if(req.headers.cookie
    && req.headers.cookie.includes("exp_sabr")) {
        disableDownloads = true
    }

    // start ryd early
    ryd.fetch(id, (d) => {})

    // actual handling
    yt2009.fetch_video_data(id, (data) => {
        if(devTimings) {
            console.log(t, "fetch video data done")
        }
        if(!data) {
            res.redirect("/?ytsession=1")
            return;
        }
        if(data.error) {
            let s = yt2009_home({"error": data.error})
            res.redirect("/?ytsession=" + s)
            return;
        }
        yt2009.applyWatchpageHtml(data, req, (code => {
            if(code == "safetymode") {
                res.redirect("/?ytsession=3")
            }
            code = yt2009_languages.apply_lang_to_code(code, req)
            code = yt2009_doodles.applyDoodle(code, req)
            if(devTimings) {
                console.log(t, "apply watchpage done")
                clearInterval(x)
            }
            res.send(code)
        }), id)
    }, req.headers["user-agent"],
        yt2009_utils.get_used_token(req),
        useFlash, 
        resetCache,
        disableDownloads,
        true
    )
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
    query = query.replace(/\(.*\)/g, "").trim()
    
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
                    req
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
    if(!req.headers.source
    || !req.headers.rating
    || !req.headers.source.includes("v=")) {
        res.sendStatus(400)
        return;
    }
    let token = yt2009_utils.get_used_token(req);
    let rating = req.headers.rating || 5;
    let id = req.headers.source.split("v=")[1].split("&")[0].split("#")[0]
    video_rating.setRating(id, token, rating)
    let usePchelper = false;
    if(req.headers.cookie.includes("pchelper_flags=")
    && req.headers.cookie.includes("pchelper_user=")
    && mobileHelper && mobileHelper.hasLogin(req)) {
        let pcf = req.headers.cookie.split("pchelper_flags=")[1].split(";")[0]
        if(pcf.includes("commit_ratings")) {
            usePchelper = true;
        }
    }

    if(!usePchelper) {
        res.sendStatus(200) // instant send 200 without pchelper
    } else {
        let state = false;
        switch(parseInt(rating)) {
            case 1:
            case 2: {
                state = "dislike"
                break;
            }
            case 4:
            case 5: {
                state = "like"
                break;
            }
        }
        if(state) {
            let fReq = {
                "originalUrl": "/videos/" + id + "/rating",
                "body": state,
                "headers": req.headers
            }
            mobileHelper.rateVideo(fReq, res)
        } else {
            res.sendStatus(200)
        }
    }
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
    if(!req.headers.source
    || !req.headers.source.includes("v=")) {
        res.sendStatus(400)
        return;
    }

    let id = req.headers.source.split("v=")[1].split("&")[0]
    ryd.readWait(id, (data) => {
        let toSend = data.toString();
        if(!toSend.includes(".5")) {
            toSend += ".0"
        } 
        try {res.send(toSend)}catch(error) {}
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
    if(yt2009_utils.isRatelimited(req, res)) return;
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
            data, query, flags, req
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
    if(yt2009_utils.isRatelimited(req, res)) return;
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
    if(yt2009_utils.isRatelimited(req, res)) return;
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
    if(!yt2009trusted.get_video_info_eligible(req)) {
        res.send([
            "status=fail",
            "errorcode=100",
            "suberrorcode=8",
            "reason=ratelimited."
        ].join("&"))
        return;
    }
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
        history.unshift(req.query.video_id.split("/mp4")[0])
        let cookieParams = [
            `leanback_history=${history.join(":")}; `,
            `Path=/; `,
            `Expires=Fri, 31 Dec 2066 23:59:59 GMT`
        ]
        res.set("set-cookie", cookieParams.join(""))
    }
    req.query.video_id = req.query.video_id.split("/mp4")[0]
    yt2009.fetch_video_data(req.query.video_id, (data => {
        if(data.unplayable) {
            res.send([
                "status=fail",
                "errorcode=100",
                "suberrorcode=8",
                "reason=This video is unavailable."
            ].join("&"))
            return;
        }
        if(data.live) {
            res.send([
                "status=fail",
                "errorcode=100",
                "suberrorcode=8",
                "reason=live streams are currently not supported in flash"
            ].join("&"))
            return;
        }
        if(req.headers.referer
        && req.headers.referer.includes("mp.swf")
        && !req.headers.referer.includes("/mp4")) {
            // minimal flash-only response for mobile flash flv option
            res.send(yt2009_templates.get_video_info_onlyFlash(data, req, res))
            return;
        }
        let playback = "amogus"
        if(req.headers.referer
        && req.headers.referer.includes("cps2.swf")) {
            // custom playbacktoken for cps2 to allow get_video with fmt
            playback = "CPS_ALL_" + Math.floor(Math.random() * 1003050)
        }
        let longVid = (data.length >= 60 * 30)
        yt2009.get_qualities(req.query.video_id, (qualities => {
            if((!qualities || qualities.length == 0) && data.qualities) {
                qualities = data.qualities
            }
            let fmt_list = ""
            let fmt_stream_map = ""
            let fmt_map = ""
            let url_encoded_fmt_stream_map = []
            let addUrlEncoded = false;
            if(req.query.html5) {
                addUrlEncoded = true;
            }
            let dashData = ""
            qualities.forEach(quality => {
                switch(quality) {
                    case "1080p": {
                        let fmtUrl = [
                            `http://${config.ip}:${config.port}`,
                            `/exp_hd?video_id=${req.query.video_id}&fhd=1`,
                            `${yt2009trusted.urlContext(
                                req.query.video_id, "PLAYBACK_FHD", longVid
                            )}`
                         ].join("")
                        fmt_list += "37/1920x1080/9/0/115,"
                        fmt_map += "37/3000000/9/0/115,"
                        fmt_stream_map += `37|${fmtUrl}&,`
                        if(addUrlEncoded) {
                            let fmtData = [
                                "type=video%2Fmp4%3B+codecs%3D%22avc1.64001F%2C+mp4a.40.2%22",
                                "itag=37",
                                `url=${encodeURIComponent(fmtUrl)}`,
                                "quality=hd1080"
                            ].join("&")
                            url_encoded_fmt_stream_map.push(fmtData)
                        }
                        break;
                    }
                    case "720p": {
                        let fmtUrl = [
                            `http://${config.ip}:${config.port}`,
                            `/exp_hd?video_id=${req.query.video_id}`,
                            `${yt2009trusted.urlContext(
                                req.query.video_id, "PLAYBACK_HD", longVid
                            )}`
                         ].join("")
                        fmt_list += "22/1280x720/9/0/115,"
                        fmt_map += "22/2000000/9/0/115,"
                        fmt_stream_map += `22|${fmtUrl}&,`
                        if(addUrlEncoded) {
                            let fmtData = [
                                "type=video%2Fmp4%3B+codecs%3D%22avc1.64001F%2C+mp4a.40.2%22",
                                "itag=22",
                                `url=${encodeURIComponent(fmtUrl)}`,
                                "quality=hd720"
                            ].join("&")
                            url_encoded_fmt_stream_map.push(fmtData)
                        }
                        break;
                    }
                    case "480p": {
                        let fmtUrl = [
                            `http://${config.ip}:${config.port}`,
                            `/get_480?video_id=${req.query.video_id}`,
                            `${yt2009trusted.urlContext(
                                req.query.video_id, "PLAYBACK_HQ", longVid
                            )}`
                         ].join("")
                        fmt_list += "35/854x480/9/0/115,"
                        fmt_map += "35/0/9/0/115,"
                        fmt_stream_map +=  `35|${fmtUrl}&,`
                        if(addUrlEncoded) {
                            let fmtData = [
                                "type=video%2Fmp4%3B+codecs%3D%22avc1.64001F%2C+mp4a.40.2%22",
                                "itag=35",
                                `url=${encodeURIComponent(fmtUrl)}`,
                                "quality=large"
                            ].join("&")
                            url_encoded_fmt_stream_map.push(fmtData)
                        }
                        break;
                    }
                }
            })
            let fmtUrl = [
                `http://${config.ip}:${config.port}`,
                `/get_video?video_id=${req.query.video_id}/mp4`,
                `${yt2009trusted.urlContext(
                     req.query.video_id, "PLAYBACK_STD", longVid
                 )}`
             ].join("")
            fmt_list += "5/640x360/9/0/115"
            fmt_map += "5/0/7/0/0"
            fmt_stream_map += `5|${fmtUrl}`
            if(addUrlEncoded && url_encoded_fmt_stream_map.length == 0) {
                let fmtData = [
                    "type=video%2Fmp4%3B+codecs%3D%22avc1.64001F%2C+mp4a.40.2%22",
                    "itag=5",
                    `url=${encodeURIComponent(fmtUrl)}`,
                    "quality=medium"
                ].join("&")
                url_encoded_fmt_stream_map.push(fmtData)
            }
            let urlStreams = (addUrlEncoded
            ? "\nurl_encoded_fmt_stream_map=" + encodeURIComponent(
                url_encoded_fmt_stream_map.join(",")
            )
            : "")
            function sendData() {
                res.send(`status=ok
length_seconds=${data.length}
keywords=${data.tags.join(",").split("&").join("")}
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
token=${playback}
plid=${playback}
track_embed=0
author=${data.author_name.split("&").join("")}
title=${data.title.split("&").join("")}
video_id=${req.query.video_id}
fmt_list=${encodeURIComponent(fmt_list)}
fmt_stream_map=${encodeURIComponent(fmt_stream_map)}${urlStreams}`.split("\n").join("&"))
            }
            sendData()
        }))
    }), "", "", false, false)
})

app.get("/get_video_metadata", (req, res) => {
    if(!req.query.video_id) {
        res.sendStatus(400)
        return;
    }
    req.query.video_id = req.query.video_id.split("/mp4")[0]
    yt2009.fetch_video_data(req.query.video_id, (data) => {
        let channelRequest = {
            "path": "/channel/" + data.author_id,
            "headers": {},
            "query": {}
        }
        yt2009_channels.main(channelRequest, ({"send": function(channel) {
            let authorImg = data.author_img
            if(authorImg == "default"
            || authorImg == "/assets/default.png") {
                authorImg = "/assets/site-assets/default.png"
            }
            res.send(`<root><return_code>0</return_code>
<html_content>
    <video_info>
        <description>${yt2009_utils.xss(data.description)}</description>
        <view_count>${data.viewCount}</view_count>
        <likes_count_unformatted></likes_count_unformatted>
        <dislikes_count_unformatted></dislikes_count_unformatted>
    </video_info>
    <user_info>
        <username>${yt2009_utils.xss(data.author_name)}</username>
        <image_url>http://${config.ip}:${config.port}${authorImg}</image_url>
        <external_id>${data.author_id}</external_id>
        <public_name>${yt2009_utils.xss(data.author_name)}</public_name>
        <subscriber_count>${
            channel.properties
            && channel.properties.subscribers
            ? channel.properties.subscribers : "?"}</subscriber_count>
    </user_info>
</html_content></root>`)
        }}), "", true)
    }, "", "source-get_video_metadata-" + yt2009_utils.get_used_token(req),
    false, false, true)
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
    if(!req.query.q && !req.query.vq) {
        yt2009_mobile.videoData(req, res)
        return;
    }
    yt2009_cps.get_search(req, res)
})

//left this when messing about with leanbacklite_v3
// this gets it partially working lol
app.post("/feeds/api/videos/", (req, res) => {
    if(!req.query.q && !req.query.vq) {
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
            `"${__dirname}/../player-imgs/embed-bgs/user-gen/${color}.png"`
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
    }, "", (req.headers.cookie && req.headers.cookie.includes("exp_related")))
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
        if(yt2009_utils.isRatelimited(req, res)) return;

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
            if(devTimings) {
                console.log("potential time loss because of auto_user")
            }
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

let reencodeDevs = [
    "HTC Streaming Player",
    "Android NexPlayer",
    "LG Player 1."
]
if(config.reencode_devs && typeof(config.reencode_devs) == "string") {
    let d = config.reencode_devs.split(",")
    d.forEach(device => {
        if(device.length > 1) {
            reencodeDevs.push(device)
        }
    })
}
function checkBaseline(req, res) {
    let tr = false;
    if(!req.headers["user-agent"]) return false;
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
    let inReencodeDevs = false;
    reencodeDevs.forEach(dev => {
        if(req.headers["user-agent"].includes(dev)) {
            inReencodeDevs = true;
        }
    })
    if(inReencodeDevs) {
        ffmpegEncodeBaseline(req, res)
        tr = true;
    }
    return tr;
}

app.get("/channel_fh264_getvideo", (req, res) => {
    if(!yt2009trusted.isValid(req, res)
    && !yt2009trusted.validateShortContext(req, res)) return;
    if(checkBaseline(req, res)) return;

    req.query.v = req.query.v.replace(/[^a-zA-Z0-9+\-+_]/g, "").substring(0, 11)

    if(req.headers.range && yt2009_utils.privExpStreamEligible(req)) {
        let partSize = (1024 * 1024 * 2) // send the file in 2mb parts
        // when streaming

        let id = req.query.v;
        let partSent = false;
        let callbackId;
        let start = 0;
        let end = -1;
        let range = req.headers.range
        if(range && range.includes("bytes=")) {
            if(!isNaN(parseInt(range.split("bytes=")[1].split("-")[0]))) {
                start = parseInt(range.split("bytes=")[1].split("-")[0])
            }
        }
        res.status(206)
        res.set("accept-ranges", "bytes")
        res.set("content-type", "video/mp4")
        function sendPart(full) {
            if(end == -1) {
                end = start + partSize
            }
            res.set(
                "content-range",
                "bytes " + start + "-" + (full - 1) + "/" + full
            )
            fs.createReadStream(
                `../assets/${id}.mp4`,
                {"start": start, "end": end}
            ).pipe(res)

            if(callbackId) {
                yt2009_exports.unregisterExtendCallback(callbackId)
            }
        }
        if(yt2009_exports.getStatus(id)
        && yt2009_exports.getStatus(id) < 2) {
            callbackId = yt2009_exports.registerExtendCallback(
                "verboseDownloadProgress", id, () => {
                    // download state changed
                    let s = yt2009_exports.read().verboseDownloadProgress[id]

                    if(s.type == "NONDASH"
                    && s.downloaded >= (start + partSize + (512 * 1024))
                    && !partSent) {
                        // ready to send part
                        sendPart(parseInt(s.reportLength))
                        partSent = true;
                    }
                }
            )
        }
    }

    if(yt2009_exports.getStatus(req.query.v)) {
        // wait for mp4 while it's downloading
        yt2009_exports.waitForStatusChange(req.query.v, () => {
            try {
                res.redirect("/assets/" + req.query.v + ".mp4")
            }catch(error) {}
        })
        return;
    }
    if(!fs.existsSync("../assets/" + req.query.v + ".mp4")
    || (fs.existsSync("../assets/" + req.query.v + ".mp4")
    && fs.statSync("../assets/" + req.query.v + ".mp4").size < 5)) {
        yt2009_utils.saveMp4(req.query.v, (vid) => {
            if(!vid || vid.message || typeof(vid) !== "string") {
                res.sendStatus(404)
                return;
            }
            let vidLink = vid.replace("../", "/")
            if(vidLink.includes("assets/")) {
                vidLink += ".mp4"
            }
            try {res.redirect(vidLink)}catch(error) {}
        }, true)
    } else {
        try {
            res.redirect("/assets/" + req.query.v + ".mp4")
        }catch(error){}
    }
    
})

function ffmpegEncodeBaseline(req, res) {
    let vId = ""
    if(req.query.v) {
        vId = req.query.v.replace(/[^a-zA-Z0-9+\-+_]/g, "").substring(0, 11)
    } else if(req.query.video_id) {
        vId = req.query.video_id.replace(/[^a-zA-Z0-9+\-+_]/g, "").substring(0, 11)
    }
    
    if(config.env == "dev") {
        console.log(`baseline h264 req ${req.originalUrl}`)
    }

    // send file once everything done
    function sendFile() {
        let filePath = __dirname.replace("\\back", "\\assets")
                                .replace("/back", "/assets")
                       + "/" + vId + "-baseline.mp4"
        if(!fs.existsSync(filePath)) {
            res.sendStatus(404)
            return;
        }
        try {
            res.sendFile(filePath)
        }
        catch(error) {}
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
            `ffmpeg -i "${stdFile}" ${ffmpegOptions.join(" ")} "${targetFile}"`,
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
        if(yt2009_utils.isRatelimited(req, res)) return;
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
    let sourceVideo = ""
    try {
        sourceVideo = req.headers.source
                      .split("v=")[1]
                      .split("&")[0]
                      .split("#")[0]
    }
    catch(error) {}
    yt2009_playlists.parsePlaylist(playlistId, (list) => {
        let video_index = 0;
        if(!list || !list.videos) {
            res.send("REFETCH_INTERNAL_ERROR")
            return;
        }
        list.videos.forEach(video => {
            videosHTML += `
            <div class="video-entry ${video.id == sourceVideo ? "watch-ppv-vid" : ""}">
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
    }, sourceVideo)
})


/*
======
video comments
======
*/
app.get("/get_more_comments", (req, res) => {
    let id = ""
    try {
        id = req.headers.source
                .split("watch?v=")[1]
                .split("&")[0].split("#")[0]
    }
    catch(e) {
        id = req.headers.source
                .split("v=")[1].split("&")[0].split("#")[0]
    }
    let pageNumber = parseInt(req.headers.page || 1)
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

    let theoreticalIndex = (pageNumber - 1) * 20
    let continuation = false;
    let comment_html = "";

    function addComment(comment) {
        if(comment.pinned) return;
        if(comment.continuation) {
            continuation = comment.continuation;
            return;
        }
        let commentId = comment.commentId || yt2009.commentId(
            comment.authorUrl, comment.content
        )
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
            comment.content.split("<br><br>").join("<br>"),
            flags,
            true,
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
        
    }

    // continuation token based
    if(req.headers.continuation) {
        yt2009.request_continuation(
            req.headers.continuation, id, flags, (data => {
                data.forEach(c => {
                    addComment(c)
                })
                if(continuation) {
                    comment_html += `;yt_continuation=${continuation}`
                }
                res.send(yt2009_languages.apply_lang_to_code(
                    comment_html, req
                ))
            }), true
        )
        return;
    }

    // page-based (no continuation token)
    yt2009.comment_paging(id, pageNumber, flags, (data) => {
        data.forEach(comment => {
            addComment(comment)
        })
        if(continuation) {
            comment_html += `;yt_continuation=${continuation}`
        }
        res.send(yt2009_languages.apply_lang_to_code(comment_html, req))
    })
})

app.get("/comment_get_replies", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }
    let id = ""
    try {
        id = req.headers.source
                .split("watch?v=")[1]
                .split("&")[0].split("#")[0]
    }
    catch(e) {
        id = req.headers.source
                .split("v=")[1].split("&")[0].split("#")[0]
    }
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
    if(!id || !req.headers.continuation
    || !req.headers["original-comment"]) {
        res.sendStatus(400)
        return;
    }

    let commentsHTML = ""
    yt2009.request_continuation(req.headers.continuation, id, flags, (data) => {
        data.forEach(c => {
            if(c.continuation) {
                commentsHTML += yt2009_templates.replyHoldReplyCode(
                    c.continuation, req.headers["original-comment"]
                )
            } else {
                commentsHTML += yt2009_templates.commentReply(c)
            }
            
        })
        res.send(yt2009_languages.apply_lang_to_code(commentsHTML, req))
    }, true)
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
    switch(req.query.method) {
        case "youtube.videos.list_by_playlist": {
            yt2009_playlists.apiV1_playlist(req, res)
            break;
        }
        default: {
            yt2009_warp_swf.get_video(req, res)
            break;
        }
    }
})
app.get("/get_awesome", (req, res) => {
    yt2009_warp_swf.get_related(req, res)
})
app.get("/set_awesome", (req, res) => {
    yt2009_warp_swf.get_related(req, res)
})
app.get("/embed_api_rest", (req, res) => {
    if(req.query.method == "list_recs"
    && req.query.v) {
        req.query.video_id = req.query.v
        yt2009_warp_swf.get_related(req, res)
    } else {
        res.sendStatus(200)
    }
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
app.post("/rec-submit", (req, res) => {
    yt2009_videos_page.submitById(req, res)
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
app.get("/my_videos", (req, res) => {
    yt2009_myvideos.apply(req, res)
})
app.get("/my_videos_edit", (req, res) => {
    yt2009_myvideos.createEditPage(req, res)
})
app.post("/my_videos_edit", (req, res) => {
    yt2009_myvideos.craftEditProto(req, res)
})
app.get("/my_videos_upload", (req, res) => {
    yt2009_myvideos.createInitialUpload(req, res)
})
app.post("/my_videos_upload", (req, res) => {
    yt2009_myvideos.handleUploadFlow(req, res)
})
app.post("/my_videos_delete", (req, res) => {
    if(!mobileHelper.hasLogin(req)) {
        res.sendStatus(400)
        return;
    }
    let s = ""
    let fRes = {
        "setS": function(state) {
            s = state;
        },
        "sendStatus": function(status) {
            if(status >= 200 && status <= 300) {
                res.redirect("/my_videos?s="  +s)
            } else {
                res.redirect("/my_videos")
            }
        }
    }
    mobileHelper.deleteVideos(req, fRes)
})

/*
======
activity sharing endpoints
======
*/
app.get("/autoshare_connect", (req, res) => {
    yt2009_autoshare.genConnectPage(req, res)
})
app.post("/autoshare_connect", (req, res) => {
    yt2009_autoshare.handleConnect(req, res)
})
app.get("/autoshare_resolve_user", (req, res) => {
    yt2009_autoshare.handleResolve(req, res)
})
app.get("/autoshare_disconnect", (req, res) => {
    yt2009_autoshare.disconnect(req, res)
})
app.post("/autoshare_submit", (req, res) => {
    yt2009_autoshare.submit(req, res)
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
    "/warp_speed": "warp_speed.html",
    "/warp_speed_en": "warp_speed_en.html",
    "/t/new_viewing_experience": "new_viewing_experience.html",
    "/cbackground": "cbackground.html",
    "/wariolandshakeit2008": "wariolandshakeit2008.html",
    "/mh_pc_intro": "mh_pc_intro.html",
    "/mh_pc_manage": "mh_pc_manage.html"
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
        if(yt2009_utils.isRatelimited(req, res)) return;
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

    let fetchesRequired = 0;
    let fetchesCompleted = 0;

    function finalize() {
        // add mainpage notices if needed
        if(req.query.src == "avatar_changed") {
            code = code.replace(
                `page-main-message hid`,
                `page-main-message`
            )
            code = code.replace(
                `changes_saved_notice`,
                `Changes saved! Your new picture may take a few minutes to appear everywhere.`
                //"Changes saved!"
            )
        }

        if(code.includes("yt2009_videos_uploaded")) {
            code = code.replace("yt2009_videos_uploaded", "0")
            code = code.replace("yt2009_video_views", "0")
            code = code.replace("yt2009_channel_views", "1")
            code = code.replace("yt2009_subscriber_count", "0")
            code = code.replace("yt2009_favorite_count", "0")
        }
        res.send(code)
    }

    let code = accountHTML;
    code = require("./yt2009loginsimulate")(req, code, true)
    code = yt2009_languages.apply_lang_to_code(code, req)

    // account data if pchelper
    if(mobileHelper.hasLogin(req)) {
        fetchesRequired++;
        mobileHelper.openBrowseId(req, (id) => {
            fetchesCompleted++
            if(!id) {
                // can't proceed without channel id (no channel?)
                fetchesCompleted++
                if(fetchesCompleted == fetchesRequired) {
                    finalize()
                }
                return;
            }

            code = code.replace(
                `class="bold" id="pchelper-notice"`,
                `class="bold hid" id="pchelper-notice"`
            )
            code = code.replace(
                `id="pchelper-profile-setup-form" class="hid"`,
                `id="pchelper-profile-setup-form"`
            )
            code = code.replace(
                `#channel_url`,
                `/channel/${id}`
            )
            code = code.replace(
                `<span class="greyText">Channel Views:</span>`,
                ""
            )
            code = code.replace(
                `<span id="channel-views">yt2009_channel_views</span><br>`,
                ""
            )

            fetchesRequired += 4
            // about channel
            yt2009_channels.aboutChannel(id, (about) => {
                if(about.avatar && about.avatar.thumbnails
                && about.avatar.thumbnails[0]) {
                    let url = about.avatar.thumbnails[0].url;
                    if(url.includes("=s900")) {
                        url = url.replace("=s900", "=s88")
                    }
                    if(url.includes("=s48")) {
                        url = url.replace("=s48", "=s88")
                    }
                    url = yt2009_utils.saveAvatar(url, false, true)
                    code = code.replace(
                        `/assets/site-assets/default.png`,
                        url
                    )
                    code = code.replace(
                        `/assets/site-assets/default-centered.png`,
                        url
                    )
                    code = code.replace(
                        ` style="margin-left: -12px"`,
                        ""
                    )
                    code = code.replace(
                        ` style="margin-left: -2px;"`,
                        ""
                    )
                }
                if(about.viewCountText && about.viewCountText.simpleText) {
                    code = code.replace(
                        `yt2009_video_views`,
                        about.viewCountText.simpleText.split(" ")[0]
                    )
                } else {
                    code = code.replace(
                        `yt2009_video_views`,
                        "0"
                    )
                }
                if(about.title) {
                    if(about.title.simpleText) {
                        code = code.replace(
                            `>username<`,
                            ">" + yt2009_utils.xss(about.title.simpleText) + "<"
                        )
                    } else {
                        code = code.replace(
                            `>username<`,
                            ">" + yt2009_utils.xss(about.title) + "<"
                        )
                    }
                }

                let countries = require("./geo/country-codes.json")
                let countriesHTML = ""
                for(let name in countries) {
                    let code = countries[name]
                    countriesHTML += `<option value="${code}">${name}</option>`
                }
                code = code.replace(
                    `<!--yt2009_insert_countries-->`,
                    countriesHTML
                )


                if(about.description && typeof(about.description) == "string") {
                    code = code.replace(
                        `yt2009_channel_description`,
                        about.description
                    )
                    code = yt2009_templates.applyAboutProperties(
                        code, about.description
                    )
                } else if(about.description && about.description.simpleText) {
                    code = code.replace(
                        `yt2009_channel_description`,
                        about.description.simpleText
                    )
                    code = yt2009_templates.applyAboutProperties(
                        code, about.description.simpleText
                    )
                } else {
                    code = code.replace(`yt2009_channel_description`, "")
                }

                setTimeout(() => {
                    fetchesCompleted++
                    if(fetchesCompleted == fetchesRequired) {
                        finalize()
                    }
                }, 400)
            })
            // subscriber count
            yt2009_channels.subCount(id, (count) => {
                code = code.replace(
                    "yt2009_subscriber_count",
                    yt2009_utils.countBreakup(count)
                )

                fetchesCompleted++
                if(fetchesCompleted == fetchesRequired) {
                    finalize()
                }
            })
            // videos for video uploaded count
            mobileHelper.pullOwnVideos(req, (videos) => {
                let vCount = videos.length;
                let firstThree = videos.filter(s => {
                    return s.privacy !== "VIDEO_PRIVACY_PRIVATE"
                }).slice(0,3)

                code = code.replace(
                    "yt2009_videos_uploaded",
                    vCount
                )

                if(vCount == 0) {
                    code = code.replace(
                        `<!--yt2009_videos_insert-->`,
                        `<span class="grayText">no videos</span>`
                    )
                }

                let videosHTML = ""
                let vi = 0;
                firstThree.forEach(v => {
                    vi++
                    videosHTML += `<td><a href="javascript:void(0)" id="video-still-${vi}" onclick="pickVideoStill(${vi}, '${v.id}')">
						<div class="outer-border">
							<div class="image-holder">
								<img src="http://i.ytimg.com/vi/${v.id}/2.jpg"/>
							</div>
						</div>
					</a></td>`
                })
                code = code.replace(
                    `<!--yt2009_videos_insert-->`,
                    videosHTML
                )

                fetchesCompleted++
                if(fetchesCompleted == fetchesRequired) {
                    finalize()
                }
            })
            // favorite count
            let fReq = {
                "headers": req.headers,
                "fake": true,
                "unfiltered": true
            }
            let fRes = {
                "sendStatus": function(s) {res.sendStatus(s);},
                "set": function(name,value){},
                "send": function(data) {
                    let favsFound = false;
                    data.forEach(p => {
                        if(p[1] == "Favorites") {
                            favsFound = p[0]
                        }
                    })

                    if(favsFound) {
                        fReq = {
                            "playlistId": favsFound,
                            "originalUrl": "/playlists/" + favsFound,
                            "headers": req.headers
                        }
                        fRes = {
                            "set": function(name,value){},
                            "send": function(data) {
                                let fcount = data.split("<entry>").length - 1
                                code = code.replace(
                                    `yt2009_favorite_count`,
                                    fcount
                                )
                                fetchesCompleted++
                                if(fetchesCompleted == fetchesRequired) {
                                    finalize()
                                }
                            }
                        }
                        mobileHelper.pullPlaylistAsUser(fReq, fRes)
                    } else {
                        code = code.replace(
                            `yt2009_favorite_count`,
                            "0"
                        )
                        fetchesCompleted++
                        if(fetchesCompleted == fetchesRequired) {
                            finalize()
                        }
                    }
                }
            }
            mobileHelper.getPlaylists(fReq, fRes)
        })
    }

    if(fetchesCompleted == fetchesRequired) {
        finalize()
    }
})

app.post("/pchelper_avatar_change", (req, res) => {
    let uploadType = req.body.toString().split(`name="av_type"`)[1]
                        .split("\n--")[0].trim().split("\n").join("");
    let dir = `${__dirname}/../assets/user-uploads-tmp`
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    let targetUrl = "/account?src=avatar_changed&r=" + Date.now()
    switch(uploadType) {
        case "upload_image": {
            // custom image to be uploaded
            let index = req.body.toString().split(`name="image-file"`)[1]
                           .split(`Content-Type: `)[1].split("\n")[0];
            index = req.body.toString().indexOf(index) + index.length
            let file = req.body.slice(index)
            while((file[0] == 10 || file[0] == 13)
            && (file[0] !== undefined && file[0] !== null)) {
                file = file.slice(1)
            }
            let fname = `flow-${Date.now()}`
            let f = `${__dirname}/../assets/user-uploads-tmp/${fname}`

            fs.writeFile(
                `../assets/user-uploads-tmp/${fname}`,
                file,
                (err, callback) => {
                    mobileHelper.changeAvatar(
                        req,
                        `/assets/user-uploads-tmp/${fname}`,
                        (status) => {
                            res.redirect(targetUrl)
                            setTimeout(() => {
                                try { 
                                    fs.unlink(f, (e) => {})
                                }
                                catch(error) {}
                            }, 10000)
                        }
                    )
                }
            )
            break;
        }
        case "video_still": {
            // thumbnail from a picked video
            let v = req.body.toString().split(`name="picked_video_still_id"`)[1]
                       .split("\n--")[0].trim().split("\n").join("");
            const fetch = require("node-fetch")
            fetch(`https://i.ytimg.com/vi/${v}/hq2.jpg`, {
                "headers": yt2009_constant.headers,
                "method": "GET"
            }).then(r => {
                let fname = `flow-${Date.now()}`
                let f = `${__dirname}/../assets/user-uploads-tmp/${fname}`
                r.buffer().then(buffer => {
                    fs.writeFileSync(
                        `../assets/user-uploads-tmp/${fname}`,
                        buffer
                    )

                    mobileHelper.changeAvatar(
                        req,
                        `/assets/user-uploads-tmp/${fname}`,
                        (status) => {
                            res.redirect(targetUrl)
                            setTimeout(() => {
                                try { 
                                    fs.unlink(f, (e) => {})
                                }
                                catch(error) {}
                            }, 10000)
                        }
                    )
                })
            })
            break;
        }
        case "use_default": {
            // default (/assets/site-assets/default-centered.png)
            mobileHelper.changeAvatar(
                req,
                "/assets/site-assets/default-centered.png",
                (status) => {
                    res.redirect(targetUrl)
                }
            )
            break;
        }
    }
})

app.use(express.static("../"))


/*
======
legacy authorization
======
*/
app.get("/test_only_legacy_cookie_auth", (req, res) => {
    res.send(`<script>document.cookie = "auth=${
        req.query.token
    }; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT";</script>`)
})
app.get("/yt2009_nonjs_auth", (req, res) => {
    if(!req.query.key) {
        res.sendStatus(400)
        return;
    }
    let cookieParams = [
        `auth=${req.query.key}; `,
        `Path=/; `,
        `Expires=Fri, 31 Dec 2066 23:59:59 GMT`
    ]
    res.set("set-cookie", cookieParams.join(""))
    res.send(`auth cookie added!<br><a href="/">return to yt2009</a>`)
})

/*
======
720p
======
*/
app.get("/exp_hd", (req, res) => {
    if(!yt2009trusted.isValid(req, res)) return;
    let lower = req.query.video_id.includes("/lower")
    let id = req.query.video_id.substring(0, 11)
    let quality = "720p"
    if((req.headers.cookie
    && req.headers.cookie.includes("hd_1080"))
    || req.query.fhd) {
        quality = "1080p"
    }
    // callback mp4 if we already have one
    if(quality == "1080p"
    && fs.existsSync(`../assets/${id}-1080p.mp4`)
    && fs.statSync(`../assets/${id}-1080p.mp4`).size < 5
    && fs.existsSync(`../assets/${id}-720p.mp4`)) {
        res.redirect(`/assets/${id}-720p.mp4?ac=${Math.random()}`)
        return;
    }

    if(config.priv_exp_stream && req.headers.range
    && yt2009_utils.privExpStreamEligible(req)) {
        let partSize = (1024 * 1024 * 2)
        let partSent = false;
        let fname = `${id}-${quality}`
        if(yt2009_exports.getStatus(fname) !== 1
        && quality == "1080p"
        && yt2009_exports.getStatus(`${id}-720p`)) {
            fname = `${id}-720p`
        }
        let fpath = `../assets/${fname}`
        let callbackId;
        let start = 0;
        let end = -1;
        let range = req.headers.range
        if(range && range.includes("bytes=")) {
            if(!isNaN(parseInt(range.split("bytes=")[1].split("-")[0]))) {
                start = parseInt(range.split("bytes=")[1].split("-")[0])
            }
        }
        res.status(206)
        res.set("accept-ranges", "bytes")
        res.set("content-type", "video/mp4")
        function sendPart(full) {
            if(end == -1) {
                end = start + partSize
            }
            res.set(
                "content-range",
                "bytes " + start + "-" + (full - 1) + "/" + full
            )
            fs.createReadStream(fname, {"start": start, "end": end}).pipe(res)

            if(callbackId) {
                yt2009_exports.unregisterExtendCallback(callbackId)
            }
        }
        if(yt2009_exports.getStatus(id)
        && yt2009_exports.getStatus(id) < 2) {
            console.log("// incomplete download HD")
            callbackId = yt2009_exports.registerExtendCallback(
                "verboseDownloadProgress", fname, () => {
                    // download state changed
                    let s = yt2009_exports.read().verboseDownloadProgress[fname]
                    console.log(s)

                    end = start + partSize

                    if(s.type == "DASH"
                    && s.state == "MERGE_STARTED"
                    && fs.existsSync(fpath)
                    && fs.statSync(fpath).size >= start + end + (512 * 1024)
                    && !partSent) {
                        // ready to send part
                        let fullSize = s.videoFileSize
                                     + s.audioFileSize
                                     + (512 * 1024)
                        console.log("// ready to send part - partially downloaded video: " + start)
                        sendPart(fullSize)
                        partSent = true;
                    }
                }
            )
        }
    }

    if(fs.existsSync(`../assets/${id}-${quality}.mp4`)
    && fs.statSync(`../assets/${id}-${quality}.mp4`).size > 5) {
        res.redirect(`/assets/${id}-${quality}.mp4?ac=${Math.random()}`)
    } else {
        yt2009_utils.saveMp4_android(id, (success) => {
            if(success) {
                res.redirect("/assets/" + success + "?ac=" + Math.random())
            } else {
                if(lower) {
                    let url = "/get_480?video_id=" + id + "/lower"
                    if(config.trusted_context) {
                        url += "&" + yt2009trusted.getContext(req)
                    }
                    res.redirect(url)
                } else {
                    res.sendStatus(404)
                }
            }
        }, false, quality)
    }
})

/*
======
480p (HQ)
======
*/
app.get("/get_480", (req, res) => {
    if(!yt2009trusted.isValid(req, res)) return;
    let lower = req.query.video_id.includes("/lower")
    let id = req.query.video_id.substring(0, 11)
    let quality = "480p"
    // callback mp4 if we already have one
    if(fs.existsSync(`../assets/${id}-${quality}.mp4`)) {
        res.redirect(`/assets/${id}-${quality}.mp4?ac=${Math.random()}`)
    } else {
        yt2009_utils.saveMp4_android(id, (success) => {
            if(success) {
                res.redirect("/assets/" + success + "?ac=" + Math.random())
            } else {
                if(lower) {
                    let url = "/channel_fh264_getvideo?v=" + id
                    if(config.trusted_context) {
                        url += "&" + yt2009trusted.getContext(req)
                    }
                    res.redirect(url)
                } else {
                    res.sendStatus(404)
                }
            }
        }, false, quality)
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
app.get("/mobile/playback_setup_save", (req, res) => {
    let o = req.query.playback_option || "rtsp_mp4"
    if(o.length >= 16 || o.includes("<") || o.includes(">")) {
        res.sendStatus(400)
        return;
    }
    let cookieParams = [
        `mobile_playback=${o}; `,
        `Path=/; `,
        `Expires=Fri, 31 Dec 2066 23:59:59 GMT`
    ]
    res.set("set-cookie", cookieParams.join(""))
    res.send(`playback set to ${o}!<br><a href="/mobile/">return to /mobile</a>`)
})
let videoProcessEndpoints = [
    "/mobile/create_rtsp",
    "/mp4_144",
    "/http_3gp",
    "/http_wmv",
    "/http_xvid"
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
mobileHelper.set(app)
let useMobileHelper = true;
app.post("/youtube/accounts/registerDevice", (req, res) => {
    let deviceId = ""
    while(deviceId.length !== 7) {
        deviceId += "qwertyuiopasdfghjklzxcvbnm1234567890".split("")
                    [Math.floor(Math.random() * 36)]
    }
    while(useMobileHelper && mobileHelper.hasLogin(deviceId)) {
        deviceId = ""
        while(deviceId.length !== 7) {
            deviceId += "qwertyuiopasdfghjklzxcvbnm1234567890".split("")
                        [Math.floor(Math.random() * 36)]
        }
    } 
    /*
    as cool as that text was, i have to get rid of it from response
    for 1.6.21 and below.

    sorry!
    
    #yt2009 - devicekey created with aes secret from 2.3.4 apk*/
    res.send(`DeviceId=${deviceId}
DeviceKey=ULxlVAAVMhZ2GeqZA/X1GgqEEIP1ibcd3S+42pkWfmk=`)
})
app.get("/youtube/accounts/registerDevice", (req, res) => {
    let deviceId = ""
    while(deviceId.length !== 7) {
        deviceId += "qwertyuiopasdfghjklzxcvbnm1234567890".split("")
                    [Math.floor(Math.random() * 36)]
    }
    while(useMobileHelper && mobileHelper.hasLogin(deviceId)) {
        deviceId = ""
        while(deviceId.length !== 7) {
            deviceId += "qwertyuiopasdfghjklzxcvbnm1234567890".split("")
                        [Math.floor(Math.random() * 36)]
        }
    } 
    /* This is required for RedirMode to work. Without the same function with GET instead of POST, all 
	clients connecting for the first time will error out during initialization.
    
    #yt2009 - devicekey created with aes secret from 2.3.4 apk*/
    res.send(`DeviceId=${deviceId}
DeviceKey=ULxlVAAVMhZ2GeqZA/X1GgqEEIP1ibcd3S+42pkWfmk=`)
})
app.get("/feeds/api/standardfeeds/*", (req, res) => {
    yt2009_mobile.feeds(req, res)
})
app.get("/feeds/api/videos/*/comments", (req, res) => {
    let mhelper = (useMobileHelper && mobileHelper.hasLogin(req))
    yt2009_mobile.apkVideoComments(req, res, mhelper)
})
app.post("/feeds/api/videos/*/comments", (req, res) => {
    if(useMobileHelper && mobileHelper.hasLogin(req)) {
        mobileHelper.addComment(req, res)
        return;
    }
    yt2009_mobile.videoCommentPost(req, res)
})
let twoHundredEndpoints = [
    "/feeds/api/videos/*/related",
    "/feeds/api/users/*/favorites",
    "/feeds/api/users/*/subscriptions"
]
twoHundredEndpoints.forEach(e => {
    if(useMobileHelper) return;
    app.post(e, (req, res) => {
        res.status(200).send()
    })
})
app.get("/feeds/api/videos/*/related", (req, res) => {
    if(useMobileHelper && mobileHelper.hasLogin(req)) {
        mobileHelper.personalizedRelated(req, res)
        return;
    }
    yt2009_mobile.apkVideoRelated(req, res)
})
app.get("/feeds/api/videos/*", (req, res) => {
    if(!req.query.q && !req.query.vq) {
        yt2009_mobile.videoData(req, res)
        return;
    }
})
app.post("/feeds/api/videos/*/ratings", (req, res) => {
    if(useMobileHelper && mobileHelper.hasLogin(req)) {
        mobileHelper.rateVideo(req, res)
        return;
    }
    res.status(200).send()
})
app.get("/feeds/api/users/g.a000*", (req, res) => {
    // rewrite 2.0.26 urls (#242)
    let loginToken = req.originalUrl.split("/g.a000")[1].split("/")[0]
    let urlSuffix = req.originalUrl.split(loginToken)[1]
    res.redirect("/feeds/api/users/default" + urlSuffix)
})
app.post("/feeds/api/users/g.a000*", (req, res) => {
    // 308 (redirect with body on browser) doesn't work on those apps
    // proxy it is
    let loginToken = req.originalUrl.split("/g.a000")[1].split("/")[0]
    let urlSuffix = req.originalUrl.split(loginToken)[1]
    let url = "/feeds/api/users/default" + urlSuffix
    let body = (req.body && req.body.toString()) ? req.body.toString()
               : ""
    const fetch = require("node-fetch")
    //console.log(body, req.headers, "http://" + config.ip + ":" + config.port + url)
    fetch("http://" + config.ip + ":" + config.port + url, {
        "method": "POST",
        "body": body,
        "headers": req.headers
    }).then(r => {
        res.status(r.status)
        try {
            r.text().then(r => {
                res.send(r)
            })
        }
        catch(error) {
            res.send("")
        }
    })
})
app.get("/feeds/api/users/default/subscriptions", (req, res, next) => {
    if(useMobileHelper && mobileHelper.hasLogin(req)) {
        mobileHelper.getSubscriptions(req, res)
        return;
    }
    next()
})
app.get("/feeds/api/users/default/playlists", (req, res, next) => {
    if(useMobileHelper && mobileHelper.hasLogin(req)) {
        mobileHelper.getPlaylists(req, res)
        return;
    }
    next()
})
app.get("/feeds/api/users/default/uploads", (req, res, next) => {
    if(useMobileHelper && mobileHelper.hasLogin(req)) {
        mobileHelper.getUploads(req, res)
        return;
    }
    next()
})
app.get("/feeds/api/users/default/watch_later", (req, res, next) => {
    if(useMobileHelper && mobileHelper.hasLogin(req)) {
        req.playlistId = "WL"
        mobileHelper.pullPlaylistAsUser(req, res)
        return;
    }
    next()
})
app.get("/feeds/api/users/default/favorites", (req, res, next) => {
    if(useMobileHelper && mobileHelper.hasLogin(req)) {
        req.unfiltered = true;
        req.fake = true;
        let done = false;
        mobileHelper.getPlaylists(req, {"send": (d) => {
            d.forEach(p => {
                if(p[1] == "Favorites") {
                    done = true;
                    res.redirect("/feeds/api/users/you/playlists/" + p[0])
                }
            })

            if(!done) {
                res.send(yt2009_templates.gdata_emptyfeed)
            }
        },"set": function(s1,s2){}})
        return;
    }
    next()
})
app.get("/feeds/api/users/*/recommendations", (req, res) => {
    if(useMobileHelper) {
        mobileHelper.handle_recommendations(req, res)
        return;
    }
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
if(useMobileHelper) {
    app.get("/feeds/api/users/you/playlists/*", (req, res) => {
        mobileHelper.pullPlaylistAsUser(req, res)
    })
}
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
    if(req.originalUrl.includes("users/default")
    && useMobileHelper && mobileHelper.hasLogin(req)) {
        mobileHelper.userData(req, res)
        return;
    }
    yt2009_mobile.userInfo(req, res)
})
app.get("/feeds/api/channels*", (req, res) => {
    if(req.query.q) {
        res.sendStatus(404) //unsupported (for now)
        return;
    }
    req.originalUrl = req.originalUrl.replace("/channels", "/users")
    if(req.originalUrl.includes("users/default")
    && useMobileHelper && mobileHelper.hasLogin(req)) {
        mobileHelper.userData(req, res)
        return;
    }
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
app.get("/mobile/avatar_process", (req, res) => {
    yt2009_mobile.avatarUncrop(req, res)
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

app.get("/mobile/gdata_gen_auth_page", (req, res) => {
    yt2009gdataauths.genMainPage(req, res)
})
app.post("/mobile/gdata_set_auth", (req, res) => {
    yt2009gdataauths.setAuth(req, res)
})
if(useMobileHelper) {
    app.post("/feeds/api/users/default/playlists", (req, res) => {
        mobileHelper.createPlaylist(req, res)
    })
    app.post("/feeds/api/users/you/playlists/*", (req, res) => {
        mobileHelper.addToPlaylist(req, res);
    })
    app.post("/feeds/api/users/default/favorites", (req, res) => {
        mobileHelper.addToFavorites(req, res);
    })
    app.post("/feeds/api/users/default/watch_later", (req, res) => {
        mobileHelper.addToWatchLater(req, res);
    })
    app.post("/feeds/api/users/default/subscriptions", (req, res) => {
        mobileHelper.manageSubscription(req, res)
    })
    app.get("/unlinkhelper", (req, res) => {
        mobileHelper.unlink(req, res)
    })
}


app.post("/deviceregistration/v1/devices", (req, res) => {
    yt2009m.staticRegister(req, res)
})
app.post("/youtubei/*", (req, res) => {
    yt2009m.rootHandle(req, res)
})

/*
======
standardfeeds (gdata rss) basic support
======
*/
app.get("/feeds/base/standardfeeds/*", (req, res) => {
    yt2009basefeeds.standardfeed(req, res)
})
app.get("/feeds/base/videos/*", (req, res) => {
    yt2009basefeeds.videoData(req, res)
})
app.get("/feeds/base/videos", (req, res) => {
    if(req.query.q || req.query.vq) {
        yt2009basefeeds.search(req, res)
        return;
    }
    res.sendStatus(400)
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
        if(yt2009_utils.isRatelimited(req, res)) return;
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
app.get("/complete/search", (req, res) => {
    yt2009_blazer.suggest(req, res)
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
recommended section
======
*/
app.get("/yt2009_recommended", (req, res) => {
    let usePchelper = false;
    if(req.headers.cookie.includes("pchelper_flags=")
    && req.headers.cookie.includes("pchelper_user=")
    && mobileHelper && mobileHelper.hasLogin(req)) {
        let pcf = req.headers.cookie.split("pchelper_flags=")[1].split(";")[0]
        if(pcf.includes("default_w2w")) {
            usePchelper = true;
        }
    }
    if(!req.headers.ids && !usePchelper) {
        res.send("YT2009_NO_DATA")
        return;
    }
    let disableOld = false;
    if(req.headers.cookie
    && req.headers.cookie.includes("new_recommended")) {
        disableOld = true;
    }
    let targetVideos = 8;
    let isRecommendedPage = false;
    let usePaging = false;
    let listStyle = false;
    if(req.headers.source
    && req.headers.source == "recommended_page") {
        targetVideos = 25;
        isRecommendedPage = true;
    }
    if(req.headers.cookie
    && req.headers.cookie.includes("reco_homepage_style=list")
    && !isRecommendedPage) {
        listStyle = true;
    }
    if(req.headers.cookie
    && req.headers.cookie.includes("reco_homepage_count=")
    && (hc = req.headers.cookie.split("reco_homepage_count=")[1].split(";")[0])
    && (hc = parseInt(hc))
    && !isNaN(hc) && hc >= 1 && hc <= 5
    && !isRecommendedPage) {
        let hc = parseInt(
            req.headers.cookie.split("reco_homepage_count=")[1].split(";")[0]
        )
        targetVideos = (listStyle ? hc : (hc * 4))
    }
    let processedVideos = 0;
    let videoSuggestions = []

    if(usePchelper) {
        let fReq = {
            "headers": req.headers,
            "targetVids": 100
        }
        let fRes = {
            "set":function(name,key){},
            "redirect":function(u){},
            "send": function(data) {data.split("<entry>").forEach(v => {
                if(v.includes("<feed xmlns")) return;
                let id = v.split(`/feeds/api/videos/`)[1].split(`</id>`)[0]
                let title = v.split(`<title type='text'>`)[1].split("</title>")[0]
                let creatorName = yt2009_utils.xss(decodeURIComponent(
                    v.split(`<name>`)[1].split("</name>")[0]
                ))
                let creatorUrl = "/@" + creatorName
                if(creatorName.startsWith("UC")) {
                    creatorUrl = "/channel/" + creatorName
                }
                let views = v.split(`viewCount="`)[1].split(`"`)[0]
                views = yt2009_utils.countBreakup(parseInt(views)) + " views"
                let length = yt2009_utils.seconds_to_time(
                    v.split(`<yt:duration seconds='`)[1].split(`'`)[0]
                )
                videoSuggestions.push({
                    "o": true,
                    "upload": "",
                    "id": id,
                    "title": title,
                    "creatorName": creatorName,
                    "creatorUrl": creatorUrl,
                    "views": views,
                    "length": length
                })
            });createSuggestionsResponse()}
        }
        mobileHelper.handle_recommendations(fReq, fRes)
        if(isRecommendedPage) {
            usePaging = true;
        }
        return;
    }

    let baseVids = req.headers.ids.split(",").slice(0, 3)
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
                    req.protocol,
                    disableOld
                )
            }, Math.floor(Math.random() * 1000) + 300)
        })  
    })

    function createSuggestionsResponse() {
        // get 8 random videos from videoSuggestions
        let filteredSuggestions = []
        if(usePaging) {
            // put ALL received videos if paging, only for recommended page
            if(!videoSuggestions[0]) {
                res.send("YT2009_NO_DATA")
                return;
            }
            let part = 0;
            while(part * 25 <= videoSuggestions.length) {
                filteredSuggestions.push(videoSuggestions.slice(
                    part * 25, (part * 25) + 25
                ))
                part++
            }
            let pagedHTML = ""
            let i = 0;
            filteredSuggestions.forEach(page => {
                pagedHTML += yt2009_templates.csRecommendedPagedHeadin(i)
                page.forEach(video => {
                    pagedHTML += yt2009_templates.videoCell(
                        video.id,
                        video.title,
                        req.protocol,
                        video.creatorName,
                        video.creatorUrl,
                        video.views,
                        req, true
                    )
                })
                pagedHTML += "</div>"
                i++
            })
            pagedHTML = yt2009_languages.apply_lang_to_code(pagedHTML, req)

            for (let j = 0; j < filteredSuggestions.length; j++) {
                pagedHTML += yt2009_templates.pagerClientside(
                    j, filteredSuggestions.length, (j !== 0)
                )
            }

            res.send(pagedHTML)
            return;
        }
        while(filteredSuggestions.length !== targetVideos) {
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
            if(isRecommendedPage) {
                response += yt2009_templates.videoCell(
                    video.id,
                    video.title,
                    req.protocol,
                    video.creatorName,
                    video.creatorUrl,
                    video.views,
                    req, true
                )
            } else {
                if(!listStyle) {
                    response += yt2009_templates.recommended_videoCell(video, req)
                } else {
                    response += yt2009_templates.searchVideo(
                        video.id, video.title, "", video.creatorUrl,
                        video.creatorName, video.upload, video.views,
                        video.length, req.protocol, "chrome",
                        (req.headers.cookie || "")
                    )
                }
                
            }
        })

        response = yt2009_languages.apply_lang_to_code(response, req)
        res.send(response)
    }
})

/*
======
userpage views (expand/list/grid)
======
*/
app.get("/userpage_view", (req, res) => {
    let view = "expand"
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }
    if(!req.headers.videos) {
        res.sendStatus(400)
        return;
    }
    switch(req.headers.view) {
        case "expand":
        case "list":
        case "grid": {
            view = req.headers.view
            break;
        }
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
    function renderVideo(v, videoIndex) {
        switch(view) {
            case "expand": {
                response += yt2009_templates.expandview_video(
                    v, videoIndex, flags
                )
                break;
            }
            case "list": {
                v.rating = "5.0"
                let autogen = (
                    req.headers.cookie
                 && req.headers.cookie.includes("autogen_thumbnails")
                )
                let proxy = (
                    req.headers.cookie
                 && req.headers.cookie.includes("thumbnail_proxy")
                )
                v.time = yt2009_utils.seconds_to_time(
                    yt2009_utils.dataApiDurationSeconds(v.duration)
                )
                v.date = ""
                v.viewCount = yt2009_utils.countBreakup(v.viewCount)
                response += yt2009_templates.ssr_yt_playlist(
                    [v], autogen, proxy, videoIndex
                )
                break;
            }
            case "grid": {
                v.views = yt2009_utils.countBreakup(
                    yt2009_utils.bareCount(v.viewCount)
                )
                response += yt2009_languages.apply_lang_to_code(
                    yt2009_templates.historyVideo(v, req), req
                )
                break;
            }
        }
    }

    // bulk fetch_video_data approach
    // only use if data api is unavailable
    function bulkVideos() {
        yt2009.bulk_get_videos(videos, () => {
            setTimeout(function() {
                let videoIndex = 0;
                videos.forEach(v => {
                    v = yt2009.get_cache_video(v)
                    renderVideo(v, videoIndex)
                    videoIndex++
                })

                res.send(response)
            }, 100)
        })
    }

    // use data api if available (faster and less resources used)
    function dataApiVideos() {
        let requiredProperties = [
            "title", "description", "publishedAt",
            "channelId", "channelTitle", "viewCount",
            "duration"
        ]
        yt2009_utils.dataApiBulk(videos, requiredProperties, (data) => {
            for(let id in data) {
                let v = data[id]
                v.id = id;
                renderVideo(v, v.index)
            }

            res.send(response)
        })
    }



    if(config.data_api_key) {
        dataApiVideos()
    } else {
        bulkVideos()
    }
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
        if(req.headers.cookie
        && req.headers.cookie.includes("new_suggestions")) {
            pullNewSuggestions(q, (data) => {
                res.send(data);
            })
            return;
        }
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

function pullNewSuggestions(q, callback) {
    const fetch = require("node-fetch")
    fetch("http://suggestqueries.google.com/complete/search?ds=yt&client=androidyt&hjson=t&oe=UTF-8&q=" + q, {
        "headers": yt2009_constant.headers
    }).then(r => {r.json().then(r => {
        let suggestions = []
        let response = ""
        r.forEach(element => {
            if(typeof(element) == "object"
            && element.length) {
                element.forEach(s => {
                    suggestions.push(s[0].replace(/\p{Other_Symbol}/gui, ""))
                })
            }
        })
        suggestions = suggestions.sort((a, b) => {return a.length - b.length})
        suggestions.forEach(m => {
            response += `
            <tr class="google-ac-a">
                <td class="google-ac-c">${m}</td>
                <td class="google-ac-d"></td>
            </tr>`
        })
        callback(response)
    })})
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
                .replace(/[^a-zA-Z0-9+\-+_]/g, "")

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
    if(yt2009_exports.getStatus(id)) {
        // wait for mp4 while it's downloading
        yt2009_exports.waitForStatusChange(id, () => {
            try {
                res.redirect("/assets/" + id + ".mp4")
            }catch(error) {}
        })
        return;
    }
    yt2009_utils.saveMp4(id, (path => {
        res.redirect("/assets/" + id + ".mp4")
    }))
})

/*
======
signin endpoints
======
*/
const signin = fs.readFileSync("../signin.htm").toString()
app.get("/signin", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.redirect("/unauth.htm")
        return;
    }

    let code = signin;
    if(req.headers.cookie && req.headers.cookie.includes("shows_tab")) {
        code = code.replace(`<!--shows_tab-->`, `<a href="#">Shows</a>`)
    }
    res.send(code)
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
    let pchelper = false;
    let usePchelper = false;
    if(req.headers.cookie.includes("pchelper_flags=")
    && req.headers.cookie.includes("pchelper_user=")
    && mobileHelper && mobileHelper.hasLogin(req)) {
        pchelper = req.headers.cookie.split("pchelper_user=")[1].split(";")[0]
        let pcf = req.headers.cookie.split("pchelper_flags=")[1].split(";")[0]
        if(pcf.includes("comments_add_youtube")) {
            usePchelper = true;
        }
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

    if(usePchelper && pchelper) {
        let fReq = {
            "headers": req.headers,
            "originalUrl": "/videos/" + body.video_id + "/comments",
            "body": `<content>${safeComment}</content>`
        }
        let fRes = {
            "set": function(name, key) {},
            "send": function(data) {
                let content = data.split(`<content>`)[1].split(`</content>`)[0]
                                  .split("\n").join("<br>");
                let author = yt2009_utils.xss(
                    data.split(`<name>`)[1].split(`</name>`)[0]
                )
                res.send(yt2009_languages.apply_lang_to_code(
                    yt2009_templates.videoComment(
                        "#", author, "1 second ago", content, "login_simulate",
                        true, "0", yt2009.commentId(author, content)
                    ), req)
                )
            }
        }
        mobileHelper.addComment(fReq, fRes)
        return;
    }

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
                res.status(401)
                res.setHeader("fail-msg", "invalid-session")
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

        res.setHeader("fail-msg", "invalid-session")
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
    if(!req.headers.source) {
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

    // skip figuring out chipparams if we a direct continuation
    if(req.headers.continuation) {
        getByChip(`DIRECT:${req.headers.continuation}`, false)
        return;
    }

    // init search params
    if(!req.headers.sort) {
        res.sendStatus(400);return;
    }
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
    yt2009_channels.get_id(req.headers.source, (id) => {
        // get chips if set to most popular/latest and no only_old
        // search in any other case
        if(req.headers.sort == "date" && !useOnlyOld) {
            getByChip(yt2009_templates.latestChip, id)
            return;
        }
        if(req.headers.sort == "popularity" && !useOnlyOld) {
            getByChip(yt2009_templates.popularChip, id)
            return;
        }

        let channelRequest = {
            "path": "/channel/" + id,
            "headers": {},
            "query": {}
        }
        yt2009_channels.main(channelRequest, ({"send": function(data) {
            getNextPage(data.name, data.id)
        }}), "", true)
    })

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
        results = results.filter(s => {return !(
            s.badges
            && s.badges.includes("BADGE_STYLE_TYPE_MEMBERS_ONLY")
        )})
        results.forEach(result => {
            if(result.continuation) {
                createdHTML += yt2009_languages.apply_lang_to_code(
                    yt2009_templates.playnavContMore(
                        result.continuation
                    ),
                    req
                )
                return;
            }
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

    // shows_tab
    if(flags.includes("shows_tab")) {
        // shows tab
        code = code.replace(
            `<a href="/channels">lang_channels</a>`,
            `<a href="/channels">lang_channels</a><a href="#">lang_shows</a>`
        )
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
    if(req.query.page) {
        req.query.page = yt2009_utils.xss(req.query.page)
    }
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
    let pagerHTML = "Page " + parseInt(req.query.page || 1)
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

    // renderign stuff
    let randomMonth = Math.floor(Math.random() * 6) + 6
    if(randomMonth < 10) {
        randomMonth = "0" + randomMonth
    }
    let query = "a"
    if(!req.headers.cookie
    || !req.headers.cookie.includes("new_recommended")) {
        query += " before:2012"
    }
    let finishHTML = ""
    let videos = []
    let calls = 0;
    let regionParams = []
    function createSearch() {
        regionParams.forEach(rp => {
            yt2009_search.get_search(query, "", {
                "location": rp,
                "page": Math.floor(Math.random() * 2) + 1
            }, (data) => {
                calls++
                data.forEach(v => {
                    if(v.type !== "video") return;
                    if(query.includes("before:")) {
                        if(v.upload.split(" ")[1] !== "years") return;
                        if(parseInt(v.upload.split(" ")[0]) < 10) return;
                    }
                    // parse with flags
                    v = JSON.parse(JSON.stringify(v))

                    if(flags.includes("fake_dates")) {
                        v.upload = yt2009_utils.fakeDatesModern(v.upload, "2012-01-01")
                    } else {
                        v.o = true
                    }
        
                    if(flags.includes("realistic_view_count")
                    && yt2009_utils.bareCount(v.views) > 100000) {
                        v.views = yt2009_utils.countBreakup(Math.floor(
                            yt2009_utils.bareCount(v.views) / 90
                        )) + " views"
                    }
        
                    v.length = v.time
                    videos.push(v)
                })
                if(calls >= regionParams.length) {
                    renderVids()
                    return;
                }
            }, yt2009_utils.get_used_token(req), false)
        })
    }

    // get user region

    let region = "US"
    if(!ipDb) {
        region = "US"
    }
    let location = false;
    let ip = req.ip.replace("::ffff:", "")
    let ipData;
    try {
        ipData = ipDb.getGeoDataSync(ip)
        region = ipData.country.iso_code
        location = ipData.city.names.en
    }
    catch(error) {
        region = "US"
    }

    // cookie region override
    if(req.headers.cookie
    && req.headers.cookie.includes("gl=")) {
        region = req.headers.cookie.split("gl=")[1].split(";")[0]
    }

    if(location) {
        let fReq = {
            "query": {
                "query": location
            },
            "headers": {}
        }
        mobileHelper.locAutocomplete(fReq, (locData => {
            if(locData[0]) {
                locData.forEach(l => {
                    regionParams.push(l[0])
                })
                regionParams.push(
                    regionParamTable[region] || regionParamTable["US"]
                )
                setTimeout(createSearch, 50)
            } else {
                regionParams.push(
                    regionParamTable[region] || regionParamTable["US"]
                )
                setTimeout(createSearch, 50)
            }
        }), true)
        return;
    } else {
        regionParams.push(
            regionParamTable[region] || regionParamTable["US"]
        )
        setTimeout(createSearch, 50)
    }

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
    
    function renderVids() {
        let randomVids = []
        while(randomVids.length !== Math.min(videos.length, 8)) {
            let v = videos[Math.floor(Math.random() * videos.length)]
            let l = 0
            while(randomVids.includes(v) && l < 20) {
                v = videos[Math.floor(Math.random() * videos.length)]
                l++
            }
            randomVids.push(v)
        }

        randomVids.forEach(v => {
            finishHTML += yt2009_templates.recommended_videoCell(v, req, flags)
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
    let subpage = false;
    if(req.headers.format && req.headers.format == "subpage") {
        subpage = true;
    }

    // skip local fetch entirely when using pchelper
    if(mobileHelper.hasLogin(req)) {
        mobileHelper.getSubscriptionVideos(req, (vids) => {
            presentVids({
                "source": "mobilehelper",
                "videoSource": vids
            })
        })
        return;
    }
    
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
            if(!data.videos) {data.videos = []}
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
    function presentVids(altData) {
        if(!altData || altData.source !== "mobilehelper") {
            if(!subpage) {
                combinedVideos = combinedVideos.sort(
                    (a, b) => b.uploadUnix - a.uploadUnix
                ).slice(0, 8)
            } else {
                combinedVideos = combinedVideos.sort(
                    (a, b) => b.uploadUnix - a.uploadUnix
                ).slice(0, 25)
            }
        }
        
        let finishHTML = ""
        let i = 0;

        let vids = (altData && altData.videoSource)
                 ? altData.videoSource
                 : combinedVideos

        vids.forEach(v => {
            let tv = JSON.parse(JSON.stringify(v))
            if(req.headers.cookie
            && req.headers.cookie.includes("fake_dates")) {
                tv.upload = yt2009_utils.genFakeDate(i)
            }
            if(!subpage) {
                finishHTML += yt2009_templates.recommended_videoCell(tv, req)
            } else {
                tv.thumbnail = "//i.ytimg.com/vi/" + tv.id + "/1.jpg"
                finishHTML += yt2009_templates.subscriptionVideo(tv, "", req)
            }
            i++
        })

        finishHTML = yt2009_languages.apply_lang_to_code(finishHTML, req)
        res.send(finishHTML)
    }
})

app.get("/ver", (req, res) => {
    let wsEnabled = config.disableWs ? false : true
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
======
stats/data
======
*/
function amDate(date) {
    let dString = ""
    date = new Date(date)
    let month = date.getMonth() + 1
    let day = date.getDate()
    let year = parseInt(date.getFullYear().toString().substring(2, 4))
    dString += (month < 10 ? "0" + month : month) + "/"
    dString += (day < 10 ? "0" + day : day) + "/"
    dString += (year < 10 ? "0" + year : year)
    return dString;
}

const continents = require("./geo/continent-data.json")
let reverseContinents = {}
for(var country in continents) {
    if(!reverseContinents[continents[country]]) {
        reverseContinents[continents[country]] = []
    }
    reverseContinents[continents[country]].push(country)
}

app.get("/insight_ajax", (req, res) => {
    let insightHTML;
    if(req.query.v
    && req.query.action_get_statistics_and_data == "1") {
        yt2009.fetch_video_data(req.query.v.substring(0, 11), (data => {
            insightHTML = yt2009_templates.leadin_stats(
                req.headers.displayed_views
                || yt2009_utils.countBreakup(data.viewCount)
            )
            let bareViews = parseInt(yt2009_utils.bareCount(
                req.headers.displayed_views || data.viewCount.toString()
            ))
            let rating = parseInt(yt2009_utils.bareCount(
                req.headers.displayed_rating || "5"
            ))
            // pull insights from yt2009_stats
            yt2009_stats.mainPull(data, req, (insights => {
                if(req.query.format == "json") {
                    res.send(insights)
                    return;
                }

                let actualInsights = []
                let audienceAges;
                let audienceCountries;
                let chartData = ["0.0", "100.0"]

                let alph = ["A", "B", "C", "D"]
                insights.forEach(i => {
                    if(i.type == "audience-ages") {
                        audienceAges = i
                    } else if(i.type == "audience-countries") {
                        audienceCountries = i;
                    } else if(i.type == "chart-data") {
                        chartData = i.value
                    } else {
                        actualInsights.push(i)
                    }
                })
                actualInsights = actualInsights.sort(
                    (a, b) => b.approx_view - a.approx_view
                )
                alph = alph.slice(0, actualInsights.length).reverse()
                let index = 0;

                // calculate middle date for chart
                let date1 = amDate(data.upload)
                let dateDiff;
                let date3 = amDate(Date.now())
                let datesScaled = false;
                dateDiff = (new Date(Date.now()) - new Date(data.upload)) / 2
                if(new Date(data.upload) < new Date("2010-04-01")
                && (req.headers.cookie
                && req.headers.cookie.includes("enable_stats_countback"))) {
                    date3 = amDate("2010-04-01")
                    dateDiff = (new Date("2010-04-01") - new Date(date1)) / 2
                    datesScaled = true
                }
                let date2 = amDate(new Date(date1).getTime() + dateDiff)
                
                // render by type
                let linksHTML = yt2009_templates.table_stats_start
                let chartPercentages = {}
                actualInsights.forEach(i => {
                    chartPercentages[alph[index]] = (
                        (i.approx_view / bareViews)
                    ).toFixed(2)

                    linksHTML += yt2009_templates.table_stats_entry(
                        i, alph[index],
                        datesScaled
                        ? [date1, date3, (i.approx_view / bareViews)] : null
                    )

                    index++
                })
                linksHTML += "</table>"

                // render view chart
                let chxr = (Math.floor(bareViews / 1000) * 1000)
                if(bareViews < 1000) {
                    chxr = bareViews;
                }
                let chartLink = [
                    "/chart?cht=lc:nda&chs=593x110",
                    "&chco=647b5c",
                    "&chg=0,-1,1,1&chxt=y,x",
                    "&chxs=0N*s*%20,333333,10|1,333333,10",
                    "&chxl=1:|" + date1 + "|" + date2 + "|" + date3,
                    "&chxp=1,5,50,95&chxr=0,0," + chxr + "|1,0,100&chd=t:",
                    chartData.join(),
                    "&chm=B,b6cfadaa,0,0,0"
                ].join("")
                for(let l in chartPercentages) {
                    chartLink += "|A" + l + ",333333,0," + chartPercentages[l] + ",10"
                }

                insightHTML += `<img id="stats-big-chart-expanded" src="${chartLink}"/>`
                insightHTML += yt2009_templates.table_stats_charts(rating)
                insightHTML += linksHTML

                // render audience parts
                // gender/age table
                insightHTML += yt2009_templates.table_audiences_leadin
                insightHTML += yt2009_templates.table_audiences_element(audienceAges)

                // map
                insightHTML += yt2009_templates.table_audiences_end
                let percentagesParam = []
                let countriesParam = []
                if(!audienceCountries) {
                    insightHTML += yt2009_templates.map_audiences_empty
                    insightHTML += yt2009_templates.map_audiences_end
                    res.send(insightHTML)
                    return;
                }
                audienceCountries.code_names.forEach(c => {
                    let continent = continents[c] || "North America"
                    reverseContinents[continent].forEach(d => {
                        if(d !== c
                        && (!countriesParam.includes(d)
                        && !audienceCountries.code_names.includes(d))) {
                            percentagesParam.push(Math.floor(Math.random() * 10) + 13)
                            countriesParam.push(d)
                        }
                    })
                    if(!countriesParam.includes(c)) {
                        percentagesParam.push(Math.floor(Math.random() * 20) + 70)
                        countriesParam.push(c)
                    }
                })

                // slight tints on common countries (na/random parts of asia)
                /*let rCountries = []
                reverseContinents["North America"].forEach(c => {
                    rCountries.push(c)
                })
                reverseContinents["Asia"].forEach(c => {
                    rCountries.push(c)
                })
                rCountries.forEach(c => {
                    if(!countriesParam.includes(c)) {
                        percentagesParam.push(Math.floor(Math.random() * 10) + 10)
                        countriesParam.push(c)
                    }
                })
                
                while(percentagesParam.join().split(",").length > countriesParam.join("").length / 2) {
                    percentagesParam.shift()
                }*/

                // render map
                let mapUrl = [
                    "/chart?cht=t&chs=350x170",
                    "&chtm=world&chd=t:" + percentagesParam.join(),
                    "&chf=bg,s,eff8fe",
                    "&chco=f6f6f6,e5e9c9,ced9ab,a7ba7b,86a058,8ba65b,547136,32501a",
                    "&chld=" + countriesParam.join(""),
                    "&cbg=e5e9c9"
                ].join("")
                insightHTML += `<img width="350" height="170" id="stats-big-map-expanded" src="${mapUrl}"/>`
                insightHTML += yt2009_templates.map_audiences_end

                // send
                res.send(insightHTML)
            }))
        }),
        "", "", false, false, true)
        return;
    }
    res.sendStatus(400)
})

app.get("/chart", (req, res) => {
    if(req.query.chtm == "world") {
        yt2009charts.genWorld(req, res)
        return;
    }
    yt2009charts.gen(req, res)
})

/*
======
auto_maintain config opt
======
*/
let maxSizeGB = 10;
let maxJSONMB = 15;
if(config.auto_maintain) {
    // auto-remove 
    if(config.maintain_max_size
    && typeof(config.maintain_max_size) == "number") {
        maxSizeGB = config.maintain_max_size
    }
    if(config.maintain_max_cache_size
    && typeof(config.maintain_max_cache_size) == "number") {
        maxJSONMB = config.maintain_max_cache_size
    }
    

    function checkSize() {
        let totalSize = 0;
        let filesChecked = 0;
        let totalFiles = 0;
        let fileSizes = []
        fs.readdir(__dirname + "/../assets/", (err, data) => {
            data.forEach(f => {
                totalFiles++
                fs.stat(__dirname + "/../assets/" + f, (err, stats) => {
                    if(stats && stats.size) {
                        fileSizes.push([
                            __dirname + "/../assets/" + f,
                            stats.size
                        ])
                        totalSize += stats.size
                        filesChecked++
                        if(filesChecked >= totalFiles) {
                            fileGrabComplete()
                        }
                    } else {
                        totalFiles--
                    }
                })
            })
        })

        function fileGrabComplete() {
            let maxSizeBytes = ((maxSizeGB) * 1024 * 1024 * 1024)
            fileSizes = fileSizes.sort((a, b) => b[1] - a[1])
            if(totalSize >= maxSizeBytes) {
                // cleanup files
                let targetSize = totalSize - (maxSizeBytes / 4)
                let foundSize = 0;
                let i = 0;
                let foundFiles = []
                while(foundSize <= targetSize) {
                    foundFiles.push(fileSizes[i])
                    foundSize += fileSizes[i][1]
                    i++
                }

                let aNotice = `auto_maintain: cleanup ${foundFiles.length} files`
                aNotice += `\nfree up ${((targetSize) / 1024 / 1024 / 1024).toFixed(1)}GB`
                console.log(aNotice)
                foundFiles.forEach(f => {
                    fs.unlink(f[0], (e) => {})
                })
            }
        }
        

        // check out caches
        let maxCacheSizeMB = maxJSONMB
        let maxCacheSizeB = maxCacheSizeMB * 1024 * 1024
        let vCache = require("./cache_dir/video_cache_manager")
        let cCache = require("./cache_dir/channel_cache")
        let sCache = require("./cache_dir/search_cache_manager")
        let pCache = require("./cache_dir/old_comments.json")
        if(JSON.stringify(vCache.read()).length > maxCacheSizeB) {
            vCache.clean()
            console.log(`auto_maintain: clean video_cache`)
            fs.writeFileSync("./cache_dir/video_cache.json", "{}")
        }
        if(JSON.stringify(cCache.read("main")).length > maxCacheSizeB) {
            cCache.clean()
            console.log(`auto_maintain: clean channel_cache`)
            fs.writeFileSync("./cache_dir/channel_main_cache.json", "{}")
        }
        if(JSON.stringify(sCache.read()).length > maxCacheSizeB) {
            sCache.clean()
            console.log(`auto_maintain: clean search_cache`)
            fs.writeFileSync("./cache_dir/search_cache.json", "{}")
        }
        if(JSON.stringify(pCache).length > maxCacheSizeB) {
            console.log(`auto_maintain: clean old_comments`)
            fs.writeFileSync("./cache_dir/old_comments.json", "{}")
        }
    }
    let autoCheckSize = setInterval(checkSize, 1000 * 60 * 60 * 4)
    checkSize()
}

/*
======
thumbnail proxy
======
*/
let thumbnailProxyEndpoints = [
    "/get_still.php",
    "/thumb_proxy"
]
thumbnailProxyEndpoints.forEach(t => {
    app.get(t, (req, res) => {
        if(!req.query.video_id && !req.query.v) {
            res.sendStatus(400)
            return;
        }
        let id = req.query.video_id || req.query.v;
        id = id.substring(0, 11)
               .replace(/[^a-zA-Z0-9+\-+_]/g, "");
        let thumbFile = "hqdefault.jpg"
        if(req.headers.cookie
        && req.headers.cookie.includes("autogen_thumbnails")) {
            thumbFile = "1.jpg"
        }
        const fetch = require("node-fetch")
        fetch("http://i.ytimg.com/vi/" + id + "/" + thumbFile, {
            "headers": yt2009_constant.headers
        }).then(r => {r.buffer().then(rr => {
            res.set("content-type", "image/jpg")
            res.send(rr)
        })})
    })
})

/*
======
misc flash endpoints
======
*/

app.get("/wiitv", (req, res) => {
    if(req.query.action_get_flashvars) {
        res.status(200).send("")
        return;
    }
    res.status(200).send("")
})
app.get("/leanback_ajax", (req, res) => {
    if(req.query.action_search) {
        if(!req.query.search_query) {
            res.sendStatus(400)
            return;
        }
        let query = req.query.search_query;
        let page = req.query.page || "1"
        page = parseInt(page)
        if(isNaN(page)) {page = 1;}
        let quality = req.query.quality || "all"
        let searchParams = {}
        if(quality == "HD") {
            searchParams.high_definition = true;
            searchParams.page = page;
        }
        res.status(200)
        yt2009_search.get_search(query, "", searchParams, (data => {
            let formattedResults = []
            let resultCount = 20;
            data.forEach(r => {
                if(r.type == "video") {
                    formattedResults.push({
                        "title": r.title,
                        "id": r.id,
                        "encrypted_id": r.id,
                        "thumbnail": yt2009_utils.getThumbUrl(r.id, req),
                        "views": yt2009_utils.bareCount(r.views).toString(),
                        "duration": r.time,
                        "author": r.author_name,
                        "user_id": r.author_url.split("channel/")[1],
                        "time_created": r.upload,
                        "description": r.description
                    })
                } else if(r.type == "metadata") {
                    resultCount = r.resultCount;
                }
            })

            res.send({
                "total": resultCount,
                "videos": formattedResults
            })
        }), yt2009_utils.get_used_token(req), false)
        return;
    }
    if(req.query.action_featured) {
        let r = fs.readFileSync("../assets/site-assets/leanback_ajax.json").toString()
        res.send(r)
        return;
    }
    res.status(200).send("")
})
app.get("/player_204", (req, res) => {
    res.sendStatus(204)
})
app.get("/media/iviv", (req, res) => {
    res.redirect("/media/iviv/iv3_edit_module.swf")
})
app.post("/annotations_auth/update2", (req, res) => {
    let annotations = ""
    try {
        annotations = req.body.toString()
        annotations = annotations.split("<updatedItems>")[1].split("</updatedItems>")[0]
    }
    catch(error) {}
    res.send(`<?xml version="1.0" encoding="UTF-8" ?><document><annotations>
    ${annotations}
    </annotations></document>`)
})
app.get("/annotations_auth/read2", (req, res) => {
    res.status(200).end(
        `<?xml version="1.0" encoding="UTF-8" ?><document><annotations>
</annotations></document>`
    )
})
app.get("/auth/read2", (req, res) => {
    res.send(`<?xml version="1.0" encoding="UTF-8" ?><document><annotations>
    </annotations></document>`)
})
app.get("/v/*", (req, res) => {
    let video = req.originalUrl.split("/v/")[1]
    res.redirect("/embedF/" + video)
})
app.get("/avatar_wait", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }
    yt2009m.avatarWait(req, res)
})

/*
======
cfg.ac (merged)
======
*/

let exceptions = [
    "uncaughtException", "unhandledRejection"
]
exceptions.forEach(e => {
    process.on(e, (msg) => {
        console.log(msg)
    })
})

/*
======
data export through yt2009flags
======
*/
let exportedDataCodes = {}
let eRatelimit = {}
app.post("/export_flags_data", (req, res) => {
    if(!eRatelimit[req.ip]) {
        eRatelimit[req.ip] = 0;
        setTimeout(() => {
            delete eRatelimit[req.ip];
        }, 1000 * 60)
    }
    eRatelimit[req.ip]++
    if(eRatelimit[req.ip] >= 3) {
        res.status(429).send("exporting called too many times recently");
        return;
    }
    let b = req.body.toString()
    let randomCode = ""
    if(b.startsWith("c:") && (
        b.includes("\x00")
        || b.includes("/x/x/x/x/x/")
    )) {
        function s() {
            randomCode = ""
            let c = "qwertyuiopasdfghjklzxcvbnm".split("")
            while(randomCode.length !== 8) {
                randomCode += c[Math.floor(Math.random() * 26)]
            }
        }
        s()
        while(exportedDataCodes[randomCode]) {s()}
        exportedDataCodes[randomCode] = req.body.toString()
        setTimeout(() => {
            if(exportedDataCodes[randomCode]) {
                delete exportedDataCodes[randomCode];
            }
        }, 1000 * 60 * 15)
        res.send(randomCode)
    } else {
        res.sendStatus(400);
        return;
    }
})
app.get("/get_flags_data", (req, res) => {
    if(!req.headers.code) {
        res.status(400).send("no code found.")
        return;
    }
    req.headers.code = req.headers.code.replace(/[^a-z]/g, "").trim()
    let c = req.headers.code
    if(!exportedDataCodes[c]) {
        res.status(404).send(c + ": invalid data code.");
        return;
    }
    res.send(exportedDataCodes[c]);
    delete exportedDataCodes[c]
})

/*
======
pchelper-specific ajax
======
*/
app.get("/pchelper_related", (req, res) => {
    if(!mobileHelper.hasLogin(req)) {
        res.sendStatus(401)
        return;
    }
    if(!req.query.id || req.query.id.length !== 11) {
        res.sendStatus(400)
        return;
    }
    let watchFlags = ""
    if(req.headers.cookie && req.headers.cookie.includes("watch_flags=")) {
        watchFlags = req.headers.cookie.split("watch_flags=")[1].split(";")[0]
    }
    if(req.headers.cookie && req.headers.cookie.includes("global_flags")) {
        watchFlags += ":" + req.headers.cookie
                               .split("global_flags=")[1]
                               .split(";")[0];
    }
    let oId = req.query.id;
    let fReq = {
        "originalUrl": "videos/" + oId + "/related",
        "headers": req.headers
    }
    let html = ""
    let fRes = {
        "set": function(name,key){},
        "send": function(data) {data.split("<entry>").forEach(v => {
            if(v.includes("<feed xmlns")) return;
            let id = v.split(`/feeds/api/videos/`)[1].split(`</id>`)[0]
            let title = v.split(`<title type='text'>`)[1].split("</title>")[0]
            let creatorName = v.split(`<name>`)[1].split("</name>")[0]
            let creatorUrl = "/@" + creatorName
            if(creatorName.startsWith("UC")) {
                creatorUrl = "/channel/" + creatorName
            }
            let creatorId = ""
            if(v.includes(`<yt9aid>`)) {
                creatorId = v.split(`<yt9aid>`)[1].split(`</yt9aid>`)[0]
                creatorUrl = "/channel/" + creatorId
            }
            let views = v.split(`viewCount="`)[1].split(`"`)[0]
            views = yt2009_utils.countBreakup(parseInt(views)) + " views"
            let length = yt2009_utils.seconds_to_time(
                v.split(`<yt:duration seconds='`)[1].split(`'`)[0]
            )
            if(v.includes("<yt9full>")) {
                creatorName = v.split("<yt9full>")[1].split("</yt9full>")[0]
            }
            html += yt2009_templates.relatedVideo(
                id, title, req.protocol, length, views,
                creatorUrl, creatorName, (watchFlags + "/pch")
            )
        });html = yt2009_languages.apply_lang_to_code(html, req);res.send(html);}
    }
    mobileHelper.personalizedRelated(fReq, fRes)
})
app.get("/pchelper_subs", (req, res) => {
    if(!mobileHelper.hasLogin(req)) {
        res.sendStatus(401)
        return;
    }
    let format = "cookie"
    if(req.query.format == "localstorage") {
        format = "localstorage"
    }
    let channels = []
    let fRes = {
        "set": function(key,value){},
        "sendStatus":function(status){res.sendStatus(status)},
        "send": function(data) {
            data.split("<entry>").forEach(e => {
                if(e.includes("<feed")) return;
                let name = e.split("<yt:username>")[1].split("</yt:usernam")[0]
                            .split("&").join("").split(";").join("")
                            .split(":").join("")
                let id = e.split("<y9id>")[1].split("</y9id>")[0]
                if(format == "localstorage") {
                    channels.push({"url": "/channel/" + id, "creator": name})
                } else {
                    if(channels.join(":").length > 3900) return;
                    let channel = [
                        encodeURIComponent(
                            `http://${config.ip}:${config.port}/channel/${id}`
                        ),
                        encodeURIComponent(name)
                    ]
                    channels.push(channel.join("&"))
                }
            })
            if(format == "localstorage") {
                res.send(channels)
            } else {
                res.send(channels.join(":"))
            }
        }
    }
    mobileHelper.getSubscriptions(req, fRes)
})
app.post("/pchelper_subs", (req, res) => {
    if(!mobileHelper.hasLogin(req)) {
        res.sendStatus(401)
        return;
    }
    let state = "subscribe"
    let user = "uh00"
    if(!req.body || !req.body.toString().includes("user=")) {
        res.sendStatus(400)
        return;
    }
    let body = req.body.toString().split("&")
    body.forEach(v => {
        switch(v.split("=")[0]) {
            case "user": {
                user = v.split("=")[1].replace("@", "")
                break;
            }
            case "state": {
                state = v.split("=")[1]
                if(state !== "subscribe" && state !== "unsubscribe") {
                    state = "subscribe"
                }
                break;
            }
        }
    })

    let fReq = {
        "headers": req.headers,
        "body": `
        <yt:username>${user}</yt:username>
        ${state == "unsubscribe" ? `<yt:unsubscribe/>` : ""}`
    }

    mobileHelper.manageSubscription(fReq, res)
})
app.get("/pchelper_playlists", (req, res) => {
    if(!mobileHelper.hasLogin(req)) {
        res.sendStatus(401)
        return;
    }
    let format = "cookie"
    if(req.query.format == "localstorage") {
        format = "localstorage"
    }
    let fReq = {
        "headers": req.headers,
        "fake": true
    }
    let fRes = {
        "sendStatus": function(s) {res.sendStatus(s);},
        "set": function(name,value){},
        "send": function(data) {
            if(format == "cookie") {
                let c = ""
                data.forEach(pl => {
                    if(pl[0] == "WL" || pl[0] == "LL"
                    || pl[1] == "Favorites") return;
                    // pl[0] = playlist id, pl[1] = playlist name
                    pl[1] = pl[1].split(";").join("")
                    c += encodeURIComponent(pl[1] + ";" + pl[0]) + ":"
                })
                res.send(c)
            } else if(format == "localstorage") {
                let r = []
                data.forEach(pl => {
                    if(pl[0] == "WL" || pl[0] == "LL"
                    || pl[1] == "Favorites") return;
                    r.push({"id": pl[0], "name": pl[1]})
                })
                res.send(r)
            }
        }
    }
    mobileHelper.getPlaylists(fReq, fRes)
})
app.post("/pchelper_playlists", (req, res) => {
    if(!mobileHelper.hasLogin(req)) {
        res.sendStatus(401)
        return;
    }
    if(!req.body || !req.body.toString().includes("method=")) {
        res.sendStatus(400)
        return;
    }
    let params = {}
    req.body.toString().split("&").forEach(p => {
        params[p.split("=")[0]] = p.split("=")[1]
    })
    if((!params.video_ids
    && (!params.video || params.video.length !== 11))
    || (params.method == "create_new" && !params.playlist_name)
    || (params.method == "add_existing" && !params.playlist_id)
    || (params.method == "remove_videos" && !params.video_ids)
    || (params.method == "remove_videos" && !params.playlist_id)
    || (params.method !== "create_new" && params.method !== "add_existing"
    && params.method !== "remove_videos")) {
        res.sendStatus(400)
        return;
    }
    switch(params.method) {
        case "create_new": {
            let fReq = {
                "headers": req.headers,
                "body": `
                <title type='text'>${params.playlist_name}</title>
                <yt:videoid>${params.video}</yt:videoid>`
            }
            let fRes = {
                "redirect": function(url) {
                    let pid = url.split("/playlists/")[1]
                    res.send(pid);
                }
            }
            mobileHelper.createPlaylist(fReq, fRes)
            break;
        }
        case "add_existing": {
            let fReq = {
                "headers": req.headers,
                "originalUrl": "/playlists/" + params.playlist_id,
                "body": `<id>${params.video}</id>`
            }
            let fRes = {
                "set": function(name,value) {},
                "sendStatus": function(status) {res.sendStatus(status)}
            }
            mobileHelper.addToPlaylist(fReq, fRes)
            break;
        }
        case "remove_videos": {
            let i = 0;
            params.video_ids.split(",").forEach(v => {
                setTimeout(() => {
                    let fReq = {
                        "headers": req.headers,
                        "originalUrl": "/playlists/" + params.playlist_id,
                        "body": `<id>${v}</id>`
                    }
                    let fRes = {
                        "set": function(name,value) {},
                        "sendStatus": function(a) {}
                    }
                    mobileHelper.removeFromPlaylist(fReq, fRes)
                }, 500 * i)
                i++
            })
            setTimeout(() => {
                res.sendStatus(200)
            }, 500 * (i + 1))
            break;
        }
    }
})
app.get("/pchelper_playlist", (req, res) => {
    if(!mobileHelper.hasLogin(req)) {
        res.sendStatus(401)
        return;
    }
    if(!req.query.playlist) {
        res.sendStatus(400)
        return;
    }
    let format = "f"
    switch(req.query.format) {
        case "modern": {
            format = "modern"
            break;
        }
        case "ssr": {
            format = "ssr"
            break;
        }
    }
    let fReq = {
        "playlistId": req.query.playlist,
        "originalUrl": "/playlists/" + req.query.playlist,
        "headers": req.headers
    }
    let fRes = {
        "set": function(name,value){},
        "send": function(data) {
            data = data.split("<entry>")
            let vs = []
            data.forEach(v => {
                if(v.includes("<feed")) return;
                let id = v.split(`<yt:videoid id='`)[1].split("'")[0]
                let title = v.split(`<title type='text'>`)[1].split("</tit")[0]
                let time = yt2009_utils.seconds_to_time(
                    v.split(`<yt:duration seconds='`)[1].split("'")[0]
                )
                vs.push([id, title, "", "5", "", time])
            })
            switch(format) {
                case "f": {
                    let vr = []
                    vs.forEach(v => {
                        vr.push(encodeURIComponent(
                            [encodeURIComponent(v[1]), v[0],
                            v[4], "5", ""].join(";")
                        ))
                    })
                    res.send(vr.join(":"))
                    break;
                }
                case "modern": {
                    let vr = []
                    vs.forEach(v => {
                        vr.push({
                            "id": v[0],
                            "title": v[1],
                            "date": v[2],
                            "rating": v[3],
                            "viewCount": v[4],
                            "time": v[5]
                        })
                    })
                    res.send(vr)
                    break;
                }
                case "ssr": {
                    let autogen = (req.headers.cookie
                                  && req.headers.cookie.includes("autogen"))
                    let proxy = (req.headers.cookie
                                && req.headers.cookie.includes("_proxy"))
                    let vr = []
                    vs.forEach(v => {
                        vr.push({
                            "id": v[0],
                            "title": v[1],
                            "date": v[2],
                            "rating": v[3],
                            "viewCount": v[4],
                            "time": v[5]
                        })
                    })
                    let ssrHTML = yt2009_templates.ssr_yt_playlist(
                        vr, autogen, proxy
                    )
                    res.send(ssrHTML)
                    break;
                }
            }
        }
    }
    mobileHelper.pullPlaylistAsUser(fReq, fRes)
})
app.get("/nonpch_playlist", (req, res) => {
    if(!req.query.playlist) {
        res.sendStatus(400)
        return;
    }
    let format = "f"
    switch(req.query.format) {
        case "modern": {
            format = "modern"
            break;
        }
        case "ssr": {
            format = "ssr"
            break;
        }
    }
    yt2009_playlists.parsePlaylist(req.query.playlist, (data) => {
        let v = []
        if(format == "modern" || format == "ssr") {
            data.videos.forEach(vr => {
                v.push({
                    "id": vr.id,
                    "title": vr.title,
                    "date": "",
                    "rating": "5",
                    "viewCount": yt2009_utils.countBreakup(vr.views),
                    "time": vr.time
                })
            });
            if(format == "ssr") {
                let autogen = (req.headers.cookie
                                  && req.headers.cookie.includes("autogen"))
                let proxy = (req.headers.cookie
                            && req.headers.cookie.includes("_proxy"))
                res.send(yt2009_templates.ssr_yt_playlist(v, autogen, proxy))
            } else {
                res.send(v)
            }
        } else {
            data.videos.forEach(vr => {
                v.push(encodeURIComponent([
                    encodeURIComponent(vr.title), vr.id,
                    yt2009_utils.countBreakup(vr.views), "5", ""
                ].join(";")))
            })
            res.send(v.join(":"))
        }
    })
})
app.get("/pchelper_favorites", (req, res) => {
    // pchelper_favorites 
    if(!mobileHelper.hasLogin(req)) {
        res.sendStatus(401)
        return;
    }
    let format = "cookie"
    if(req.query.format == "localstorage") {
        format = "localstorage"
    }
    let fReq = {
        "headers": req.headers,
        "fake": true,
        "unfiltered": true
    }
    let fRes = {
        "sendStatus": function(s) {res.sendStatus(s);},
        "set": function(name,value){},
        "send": function(data) {
            let favsFound = false;
            data.forEach(p => {
                if(p[1] == "Favorites") {
                    favsFound = p[0]
                }
            })

            if(favsFound) {
                fReq = {
                    "playlistId": favsFound,
                    "originalUrl": "/playlists/" + favsFound,
                    "headers": req.headers
                }
                fRes = {
                    "set": function(name,value){},
                    "send": function(data) {
                        data = data.split("<entry>")
                        let vs = []
                        data.forEach(v => {
                            if(v.includes("<feed")) return;
                            let id = v.split(`<yt:videoid id='`)[1].split("'")[0]
                            let title = v.split(`<title type='text'>`)[1].split("</tit")[0]
                            vs.push({
                                "id": id,
                                "title": title
                            })
                        })

                        if(format == "localstorage") {
                            res.send(vs)
                        } else {
                            let cookieVs = []
                            vs.forEach(v => {
                                cookieVs.push([
                                    encodeURIComponent(v.title),
                                    "EMPTY_ALLOWED", v.id
                                ].join("&"))
                            })
                            res.send(encodeURIComponent(cookieVs.join(":")))
                        }
                    }
                }
                mobileHelper.pullPlaylistAsUser(fReq, fRes)
            } else {
                if(format == "cookie") {
                    res.send("")
                } else if(format == "localstorage") {
                    res.send("[]")
                }
            }
        }
    }
    mobileHelper.getPlaylists(fReq, fRes)
})
app.post("/pchelper_favorites", (req, res) => {
    if(!mobileHelper.hasLogin(req)) {
        res.sendStatus(401)
        return;
    }
    if(!req.body || !req.body.toString().includes("video_id=")) {
        res.sendStatus(400)
        return;
    }
    let video = req.body.toString().split("video_id=")[1].substring(0,11)
    let fReq = {
        "headers": req.headers,
        "body": `<id>${video}</id>`
    }
    let fRes = {
        "set": function(name,value){},
        "sendStatus": function(s) {res.sendStatus(s)},
        "redirect": function(u) {res.sendStatus(200)}
    }
    if(req.body.toString().includes("state=undo")) {
        mobileHelper.removeFromFavorites(fReq, fRes)
        return;
    }
    mobileHelper.addToFavorites(fReq, fRes)
})
app.get("/pchelper_location_autocomplete", (req, res) => {
    mobileHelper.locAutocomplete(req, (data) => {
        if(req.query.format == "raw") {
            res.send(data)
        } else {
            let response = `<table class="google-ac-m location" cellpadding="0" cellspacing="0">`
            data.forEach(p => {
                let events = [
                    `onclick="sl('${p[0]}', this);"`,
                    `onmousemove="hl(this);"`,
                    `onmouseout="uhl(this);"`
                ].join(" ")
                response += `
            <tr class="google-ac-a" ${events}>
                <td class="google-ac-c">${p[1]}</td>
                <td class="google-ac-d"></td>
            </tr>`
            })
            response += "</table>"
            res.send(response)
        }
    })
})
app.get("/pchelper_insights", (req, res) => {
    mobileHelper.analyticsMain(req, (data) => {
        if(req.query.format == "raw") {
            res.send(data)
            return;
        }

        let response = "///WORLDCHART///\n"

        // world chart/other audience data parse
        let audienceAges = []
        let audienceGenders = []
        let topCountries = []
        let insightMapChart = {}
        let c = require("./geo/country-codes.json")
        let continents = require("./geo/continent-data.json")
        let tintedContinents = []
        if(data.audiences) {data.audiences.forEach(aud => {aud.forEach(a => {
            if(a.label && a.barRatio && c[a.label]) {
                insightMapChart[c[a.label]] = Math.floor(Math.random() * 30) + (a.barRatio * 100) + 40
                if(insightMapChart[c[a.label]] > 100) {
                    insightMapChart[c[a.label]] = 100;
                }
    
                let continent = continents[c[a.label]] || "North America"
                if(!tintedContinents.includes(continent)) {
                    reverseContinents[continent].forEach(d => {
                        if(d !== c[a.label]
                        && (!insightMapChart[d])) {
                            insightMapChart[d] = Math.floor(Math.random() * 23) + 5
                        }
                    })
                    tintedContinents.push(continent)
                }
    
                topCountries.push([a.label, a.barRatio])
            } else if(a.label && a.barRatio && a.label.includes(" years")) {
                audienceAges.push(a)
            } else if(a.label && a.barRatio && (
                a.label == "Male" || a.label == "Female"
                || a.label == "User-specified"
            )) {
                audienceGenders.push(a)
            }
        })})}
        topCountries = topCountries.sort((a, b) => {return b[1] - a[1]})
        audienceAges = audienceAges.sort((a, b) => {
            return b.barRatio - a.barRatio
        })
        audienceGenders = audienceGenders.sort((a, b) => {
            return b.barRatio - a.barRatio
        })
        let percentagesParam = []
        let countriesParam = []
        for(let c in insightMapChart) {
            countriesParam.push(c)
            percentagesParam.push(insightMapChart[c])
        }
        let mapUrl = [
            "/chart?cht=t&chs=350x170",
            "&chtm=world&chd=t:" + percentagesParam.join(),
            "&chf=bg,s,eff8fe",
            "&chco=f6f6f6,e5e9c9,ced9ab,a7ba7b,86a058,8ba65b,547136,32501a",
            "&chld=" + countriesParam.join("") + "&cbg=e5e9c9"
        ].join("")

        // view count chart
        let chartUrl = [
            "/chart?cht=lc:nda&chs=380x181",
            "&chf=bg,s,FFFFFF&chco=8ba65b&chg=0,33,1,1",
            "&chxt=y,x&chxr=0,0,1|1,0&chm=B,b6cfadaa,0,0,0",
            "&chxl=0:&chds=0,1&chd=t:"
        ].join("")
        if(data.recentViews) {
            let points = []
            data.recentViews.forEach(v => {
                points.push(v.barHeight)
            })
            let t = []
            if(points.length < 10) {
                points.forEach(p => {
                    t.push(p);t.push(p)
                })
            }
            chartUrl += t.join()
        }

        response += yt2009_templates.bareHTML_map(
            mapUrl, topCountries, chartUrl.replace("380x181", "200x40")
        )

        response += "\n///VIEWCHART///\n"
        response += yt2009_templates.bareHTML_chart(
            chartUrl, topCountries, data.mostViewed, audienceGenders
        )

        res.send(response)
    })
})

/*
======
live streams
======
*/

let videoStream_players = {}
app.get("/stream_get_fragment", (req, res) => {
    const fetch = require("node-fetch")
    const yt2009signin = require("./yt2009androidsignin")
    const playerResponsePb = require("./proto/android_player_pb")
    const androidHeaders = {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,pl;q=0.8",
        "content-type": "application/json",
        "cookie": "",
        "x-goog-authuser": "0",
        "x-origin": "https://www.youtube.com/",
        "user-agent": "com.google.android.youtube/20.06.39 (Linux; U; Android 14) gzip"
    }

    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }
    if(!req.query.video_id || !req.query.type
    || (req.query.type !== "360" && req.query.type !== "hq"
    && req.query.type !== "aud")) {
        res.sendStatus(400)
        return;
    }
    let retryAttempts = 0;
    function processPlayer() {
        // process ANDROID player response
        let qualities = [720, 480, 360, 240, 144]
        if(req.headers.cookie
        && req.headers.cookie.includes("hd_1080")) {
            qualities = [1080, 720, 480, 360, 240, 144]
        }
        if(req.query.type == "360") {
            qualities = [360, 240, 144]
        }
        let urls = []
        let r = videoStream_players[v]
        if(r.streamingData && r.streamingData.adaptiveFormats) {
            let usable = []
            if(req.query.type !== "aud") {
                usable = r.streamingData.adaptiveFormats.filter(s => {
                    return s.url 
                        && s.videoheight
                        && qualities.includes(s.videoheight)
                        && s.mimetype.includes("avc1")
                })
                usable = usable.sort((a, b) => {
                    return b.videoheight - a.videoheight
                })
                res.set("content-type", "video/mp4")
            } else {
                usable = r.streamingData.adaptiveFormats.filter(s => {
                    return s.url
                        && s.mimetype.includes("audio/mp4")
                })
                usable = usable.sort((a, b) => {
                    return b.totalbitrate - a.totalbitrate
                })
                res.set("content-type", "audio/mp4")
            }
            usable.forEach(f => {
                urls.push(f.url)
            })
        }
        if(!urls[0]) {
            // no valid format
            res.sendStatus(404)
            return;
        }
        if(req.query.sq) {
            urls[0] += "&sq=" + req.query.sq
        }
        // send stream
        fetch(urls[0], {
            "headers": androidHeaders,
            "method": "GET"
        }).catch(error => {
            console.log(error)
            console.log("^^ retrying!!")
            // retry request in case of network error
            retryAttempts++
            if(retryAttempts <= 5) {
                processPlayer()
            } else {
                res.status(500).send("")
                return;
            }
        }).then(r => {
            if(r.headers.get("x-sequence-num")) {
                res.set(
                    "x-sequence-num",
                    r.headers.get("x-sequence-num")
                )
            }
            if(r.headers.get("x-head-time-millis")) {
                res.set(
                    "x-head-time-millis",
                    r.headers.get("x-head-time-millis")
                )
            }
            r.body.pipe(res)
        })
    }
    let v = req.query.video_id.substring(0,11)
    if(videoStream_players[v] && videoStream_players[v].expiry >= Date.now()) {
        // no need to request new /player
        processPlayer()
    } else {
        let rHeaders = JSON.parse(JSON.stringify(yt2009_constant.headers))
        rHeaders["user-agent"] = "com.google.android.youtube/20.06.36 (Linux; U; Android 14) gzip"
        if(yt2009signin.needed() && yt2009signin.getData().yAuth) {
            let d = yt2009signin.getData().yAuth
            rHeaders.Authorization = `Bearer ${d}`
        }
        rHeaders["Content-Type"] = "application/x-protobuf"
        rHeaders["x-goog-api-format-version"] = "2"
        yt2009_utils.craftPlayerProto(v, (pbmsg) => {
            fetch("https://youtubei.googleapis.com/youtubei/v1/player", {
                "headers": rHeaders,
                "method": "POST",
                "body": pbmsg
            }).then(r => {r.buffer().then(b => {
                let resp = playerResponsePb.root.deserializeBinary(b)
                let formats = resp.toObject().formatsList[0]
                let bp = {} //bp -- backport
                let expire = "0"
                function backportFormat(f) {
                    let a = JSON.parse(JSON.stringify(f))
                    a.qualityLabel = f.qualitylabel;
                    a.bitrate = f.totalbitrate;
                    a.mimeType = f.mimetype;
                    if(f.audiotrackList && f.audiotrackList[0]) {
                        let at = f.audiotrackList[0]
                        a.audioTrack = {
                            "label": at.displayname,
                            "vss_id": at.vssid,
                            "audioIsDefault": Boolean(at.isdefault)
                        }
                    }
                    if(f.initrangeList) {
                        a.initRange = f.initrangeList[0]
                    }
                    if(f.indexrangeList) {
                        a.indexRange = f.indexrangeList[0]
                    }
                    if(a.url && a.url.includes("expire=")) {
                        expire = a.url.split("expire=")[1].split("&")[0]
                    }
                    return a;
                }
                if(!formats) {
                    res.sendStatus(404)
                    return;
                }
                if(formats.dashformatList) {
                    if(!bp.streamingData) {
                        bp.streamingData = {}
                    }
                    bp.streamingData.adaptiveFormats = []
                    formats.dashformatList.forEach(f => {
                        bp.streamingData.adaptiveFormats.push(
                            backportFormat(f)
                        )
                    })
                }
                bp.expiry = parseInt(expire) * 1000
                videoStream_players[v] = bp;
                processPlayer()
            })})
        })
    }
})

app.get("/stream_chat", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)
    || !req.query.video_id || req.query.video_id.length < 11) {
        res.sendStatus(400)
        return;
    }

    const fetch = require("node-fetch")
    let v = req.query.video_id.substring(0,11)

    if(!req.query.continuation) {
        // if no continuation data, pull and redir
        fetch(`https://www.youtube.com/youtubei/v1/next`, {
            "headers": yt2009_constant.headers,
            "referrer": `https://www.youtube.com/`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
                "autonavState": "STATE_OFF",
                "captionsRequested": false,
                "contentCheckOk": true,
                "context": yt2009_constant.cached_innertube_context,
                "playbackContext": {"vis": 0, "lactMilliseconds": "1"},
                "racyCheckOk": true,
                "videoId": v
            }),
            "method": "POST",
            "mode": "cors"
        }).then(r => {r.json().then(r => {
            if(r.contents && r.contents.twoColumnWatchNextResults
            && r.contents.twoColumnWatchNextResults.conversationBar) {
                try {
                    let c = r.contents.twoColumnWatchNextResults.conversationBar
                             .liveChatRenderer.continuations[0]
                             .reloadContinuationData.continuation
                    let newUrl = [
                        "/stream_chat",
                        "?video_id=" + v,
                        "&continuation=" + c,
                        (req.query.format ? "&format=" + req.query.format : "")
                    ].join("")
                    res.redirect(newUrl)
                }
                catch(error) {
                    console.log(error)
                    res.sendStatus(404)
                }
            } else {
                res.sendStatus(404)
            }
        })})
        return;
    }

    // have continuation, request innertube
    let body = {
        "context": yt2009_constant.cached_innertube_context,
        "continuation": req.query.continuation
    }
    if(!req.query.last) {
        body.isInvalidationTimeoutRequest = "true"
    } else {
        body.invalidationPayloadLastPublishAtUsec = req.query.last
    }
    fetch(`https://www.youtube.com/youtubei/v1/live_chat/get_live_chat`, {
        "headers": yt2009_constant.headers,
        "referrer": `https://www.youtube.com/`,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify(body),
        "method": "POST",
        "mode": "cors"
    }).then(r => {r.json().then(r => {
        if(r.liveChatStreamingResponseExtension
        && r.liveChatStreamingResponseExtension.lastPublishAtUsec) {
            res.set(
                "next-last",
                r.liveChatStreamingResponseExtension.lastPublishAtUsec
            )
        }
        if(r.continuationContents
        && r.continuationContents.liveChatContinuation) {
            let content = r.continuationContents.liveChatContinuation
            try {
                res.set(
                    "next-cont",
                    content.continuations[0].invalidationContinuationData
                    .continuation
                )
            }
            catch(error) {
                console.log("continuation not set!")
            }

            let messages = []
            try {
                content.actions.forEach(m => {
                    m = m.addChatItemAction.item.liveChatTextMessageRenderer
                    let msgContent = []
                    m.message.runs.forEach(r => {
                        if(r.text) {
                            msgContent.push(r.text) 
                        } else if(r.emoji
                        && r.emoji.emojiId
                        && r.emoji.emojiId.length <= 5) {
                            msgContent.push(r.emoji.emojiId)
                        }
                    })
                    msgContent = msgContent.join(" ")
                    if(msgContent) {
                        messages.push({
                            "authorId": m.authorExternalChannelId,
                            "authorName": yt2009_utils.xss(
                                m.authorName.simpleText
                            ),
                            "msg": yt2009_utils.xss(msgContent)
                        })
                    }
                    
                })
            }
            catch(error) {}

            if(req.query.format == "json") {
                res.send(messages)
                return;
            }

            // ssr html
            let html = ""
            messages.forEach(msg => {
                html += yt2009_templates.liveChatMessage(msg)
            })
            res.send(html)
        }
    })})
})

app.get("/stream_current_vc", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)
    || !req.query.video_id || req.query.video_id.length < 11) {
        res.sendStatus(400)
        return;
    }

    const fetch = require("node-fetch")
    let v = req.query.video_id.substring(0,11)

    let body = {
        "context": yt2009_constant.cached_innertube_context,
        "videoId": v
    }
    if(req.query.continuation) {
        body.continuation = req.query.continuation;
    }

    fetch(`https://www.youtube.com/youtubei/v1/updated_metadata`, {
        "headers": yt2009_constant.headers,
        "referrer": `https://www.youtube.com/`,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify(body),
        "method": "POST",
        "mode": "cors"
    }).then(r => {r.json().then(r => {
        if(r.continuation) {
            try {
                res.set(
                    "next-cont",
                    r.continuation.timedContinuationData.continuation
                )
            }
            catch(error) {}
        }

        let vc = ""
        try {
            r.actions.forEach(a => {
                if(a.updateViewershipAction) {
                    vc = a.updateViewershipAction.viewCount
                          .videoViewCountRenderer.viewCount.simpleText
                }
            })
        }
        catch(error) {}

        vc = vc.split(" ")
        vc[0] = `<span id="watch-view-count">${vc[0]}</span>`
        vc = vc.join(" ")

        res.send(vc)
    })})
})

/*
======
yt2009upgrade: updates that can't be applied through git through various reasons
======
*/

// remove obama video (removed from youtube)
let obamaVideoObject = yt2009_constant.homepageCache_news.filter(s => s.id == "Z9eId_9n1NM")
if(obamaVideoObject) {
    let newNewsCache = yt2009_constant.homepageCache_news.filter(s => s.id !== "Z9eId_9n1NM")
    yt2009_constant.homepageCache_news = newNewsCache;
    fs.writeFileSync("./yt2009constants.json", JSON.stringify(yt2009_constant))
}
// remove zombies video (privated)
let zombiesVideoObject = yt2009_constant.homepageCache_featured.filter(s => s.id == "czWoP7qVNSI")
if(zombiesVideoObject) {
    let newFeaturedCache = yt2009_constant.homepageCache_featured.filter(s => s.id !== "czWoP7qVNSI")
    yt2009_constant.homepageCache_featured = newFeaturedCache
    fs.writeFileSync("./yt2009constants.json", JSON.stringify(yt2009_constant))
}

/*
======
sabr playback
======
*/

app.get("/sabr_playback", (req, res) => {
    if(!req.query.pid) {
        res.sendStatus(400)
        return;
    }
    let usesCustomXtags = (
        req.headers.cookie
     && req.headers.cookie.includes("exp_sabr_audiotracks")
    )
    let offset = 0;
    if(req.query.offset && !isNaN(parseInt(req.query.offset))) {
        offset = parseInt(req.query.offset)
    }
    yt2009sabr.handlePlayer(req.query.pid, offset, req, (result) => {
        if(!result) {
            // smth went wrong
            res.sendStatus(500)
            return;
        }
        res.set(
            "content-type",
            "application/x-yt2009-saber"
        )
        let partCount = 0;
        let resp = Buffer.from("SABER-START///")
        for(let part in result) {
            switch(part) {
                case "xtags": {
                    if(usesCustomXtags) {
                        res.set("x-yt2009-xtags", result[part])
                    }
                    break;
                }
                case "usedXtag": {
                    if(usesCustomXtags) {
                        res.set("x-yt2009-used-xtag", result[part])
                    }
                    break;
                }
                default: {
                    let header = `//SPART-"${part}"-CL=${result[part].length}//`
                    resp = Buffer.concat([
                        resp,
                        Buffer.from(header),
                        result[part]
                    ])
                    partCount++
                    break;
                }
            }
        }
        res.set(
            "x-part-count",
            partCount
        )
        res.send(resp)
    })
})

/*
======
pchelper channel customization
======
*/
const cbg_uploadr = fs.readFileSync("../cbg_uploadr.html").toString()
app.get("/my_profile_theme_background_frame", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }
    res.send(cbg_uploadr)
})
app.post("/my_profile_theme_post", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }

    // jpeg without exif data
    let jpgUnexifHead = Buffer.from([
        255, 216, 255, 224, 0, 16, 74, 70, 73, 70
    ])
    // jpeg with exif data
    let jpgExifHead = Buffer.from([
        255, 216, 255, 124, 244, 69, 120, 105, 102
    ])
    // png
    let pngHead = Buffer.from([
        137, 80, 78, 71, 13, 10, 26, 10
    ])
    // webp
    let webpHead = Buffer.from([
        82, 73, 70, 70, 238, 248, 3, 0, 87, 69, 66, 80
    ])


    let jpgUnexifIndex = req.body.indexOf(jpgUnexifHead)
    let jpgExifIndex = req.body.indexOf(jpgExifHead)
    let pngIndex = req.body.indexOf(pngHead)
    let webpIndex = req.body.indexOf(webpHead)
    let index = 0;
    let fileType = false;

    if((jpgUnexifIndex >= 10 && jpgUnexifIndex <= 1000)
    || (jpgExifIndex >= 10 && jpgExifHead <= 1000)) {
        fileType = "jpg"
        index = Math.max(jpgUnexifIndex, jpgExifIndex)
    } else if(pngIndex >= 10 && pngIndex <= 1000) {
        fileType = "png"
        index = pngIndex
    } else if(webpIndex >= 10 && webpIndex <= 1000) {
        fileType = "webp"
        index = webpIndex
    }

    let file = Buffer.from(req.body.slice(index))
    
    if(!fileType) {
        let url = [
            "/my_profile_theme_background_frame",
            "?status=error",
            "&etype=funsupported",
            "&nc=" + Date.now()
        ]
        res.redirect(url.join(""))
        return;
    }

    let maxSize = (256 * 1024)
    if(file.length >= maxSize) {
        let url = [
            "/my_profile_theme_background_frame",
            "?status=error",
            "&etype=size",
            "&nc=" + Date.now()
        ]
        res.redirect(url.join(""))
        return;
    }

    const fetch = require("node-fetch")
    fetch("http://orzeszek.website:4091/upload_raw", {
        "method": "POST",
        "body": file
    }).then(r => {
        if(r.status == 200) {
            let url = [
                "/my_profile_theme_background_frame",
                "?status=success",
                "&fileid=" + r.headers.get("x-file"),
                "&nc=" + Date.now()
            ]
            res.redirect(url.join(""))
        } else {
            let url = [
                "/my_profile_theme_background_frame",
                "?status=error",
                "&nc=" + Date.now()
            ]
            res.redirect(url.join(""))
        }
    })
})
app.post("/pchelper_customize", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)
    || !mobileHelper.hasLogin(req)) {
        res.sendStatus(401)
        return;
    }
    if(!req.body) {
        res.sendStatus(400)
        return;
    }
    let params = false;
    try {
        params = JSON.parse(decodeURIComponent(
            req.body.toString().split("data=")[1]
        ))
    }
    catch(error) {
        res.sendStatus(400)
        return;
    }

    mobileHelper.createCustomization(req, params, res)
})
app.get("/cbg_proxie", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }
    if(!req.query.id || req.query.id.length !== 24) {
        res.sendStatus(400)
        return;
    }
    const fetch = require("node-fetch")
    let url = [
        "http://orzeszek.website:4091",
        "/get_file?file_id=" + req.query.id
    ]
    fetch(url.join(""), {
        "method": "GET"
    }).then(r => {
        res.set("content-type", r.headers.get("content-type"))
        r.buffer().then(z => {
            res.send(z)
        })
    })
})
app.get("/minipicty", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)) {
        res.sendStatus(401)
        return;
    }
    if(!req.query.channel
    || req.query.channel.length !== 24
    || !req.query.channel.startsWith("UC")) {
        res.sendStatus(400)
        return;
    }

    yt2009_channels.main({
        "path": "/channel/" + req.query.channel,
        "headers": req.headers,
        "query": {}
    },
    {"send": function(data) {
        try {
            if(data && data.avatar) {
                res.redirect(data.avatar)
            } else {
                res.redirect("/assets/site-assets/default.png")
            }
        }
        catch(error) {
            console.log(error)
        }
    }}, "", true)
})
app.post("/pchelper_profile_setup", (req, res) => {
    if(!yt2009_utils.isAuthorized(req)
    || !mobileHelper.hasLogin(req)) {
        res.sendStatus(401)
        return;
    }
    if(!req.body) {
        res.sendStatus(400)
        return;
    }
    mobileHelper.applyProfileSetup(req, res)
})


/*
======
/proxy/ytbt (ANDROID v1.(?)-1.4)
======
*/

app.post("/proxy/ytbt", (req, res) => {
    // parse request
    if(!req.headers["user-agent"]
    || !req.headers["user-agent"].includes("Android-YouTube")) {
        res.sendStatus(400)
        return;
    }
    let body = ""
    if(!req.body || !req.body.toString) {
        res.sendStatus(400)
        return;
    }
    body = req.body.toString();
    if(body.includes("'url'")) {
        body = body.split("\"").join("").split("'").join("\"")
    }
    if(body.includes(",}") || body.includes(",]")) {
        body = body.replace(",}", "}").replace(",]", "]")
    }
    try {
        body = JSON.parse(body)
    }
    catch(error) {
        res.status(400).send("invalid JSON payload")
        return;
    }
    // process request
    res.set("content-type", "text/plain")
    //console.log(body)
    let responsesNeeded = body.length
    let responses = []
    let videos = []
    body.forEach(request => {
        if(!request.url || !request.token) return;
        let relativeUrl = request.url.split("/").slice(3).join("/")
        let params = {}
        if(relativeUrl.includes("?")) {
            let tempParams = relativeUrl.split("?")[1].split("&")
            tempParams.forEach(p => {
                if(!p.includes("=")) return;
                let key = p.split("=")[0]
                let value = decodeURIComponent(p.split("=")[1])
                params[key] = value;
            })
        }
        let fakeReq = {
            "originalUrl": relativeUrl,
            "headers": req.headers,
            "ip": req.ip,
            "query": params,
            "light": true,
            "source": "proxy"
        }
        let fakeRes = {
            "set": function(a,b) {},
            "send": function(data) {
                // to a 1liner
                let lines = data.split("\r").join("").split("\n")
                let newLines = []
                lines.forEach(l => {
                    newLines.push(l.trim())
                })
                newLines = newLines.join("")
                responses.push([request.url, newLines])
                //console.log(`received ${request.url} (${newLines.length}b after parse)`)
                let rzs = newLines.split("i.ytimg.com/vi/")
                rzs.forEach(z => {
                    if(z.split("/")[0].length == 11
                    && !videos.includes(z.split("/")[0])) {
                        videos.push(z.split("/")[0])
                    }
                })
                if(responses.length >= responsesNeeded) {
                    onAllResponses()
                }
            },
            "status": function(s) {},
            "sendStatus": function(s) {
                responses.push([request.url, ""])
                if(responses.length >= responsesNeeded) {
                    onAllResponses()
                }
            }
        }
        function putEmptyResponse() {
            // used as a fallback for unproxied endpoints
            responses.push([request.url, ""])
            if(responses.length >= responsesNeeded) {
                onAllResponses()
            }
        }
        let endpoint = relativeUrl.split("/").slice(2).join("/").split("?")[0]
        //console.log(endpoint)
        switch(endpoint) {
            case "recently_featured":
            case "most_popular":
            case "most_viewed":
            case "top_rated":
            case "most_recent":
            case "most_discussed":
            case "standardfeeds/most_viewed":
            case "standardfeeds/most_discussed":
            case "standardfeeds/most_recent":
            case "standardfeeds/top_rated": {
                yt2009_mobile.feeds(fakeReq, fakeRes)
                break;
            }
            case "videos": {
                //console.log(relativeUrl)
                if(relativeUrl.includes("q=")
                || relativeUrl.includes("vq=")) {
                    yt2009_cps.get_search(fakeReq, fakeRes)
                } else {
                    putEmptyResponse()
                }
                break;
            }
            default: {
                // category feeds (also handled by feeds but different urls)
                if(endpoint.includes("most_popular")) {
                    yt2009_mobile.feeds(fakeReq, fakeRes)
                    return;
                }
                // otherwise empty
                putEmptyResponse()
                break;
            }
        }
    })
    // parse to proxy format and send to user
    function onAllResponses() {
        let proxyFormatLines = []
        responses.forEach(z => {
            let url = z[0]
            let body = z[1]
            let isThumbnail = z[2]
            let response = [
                Buffer.byteLength(body).toString(16),
                200,
                isThumbnail ? "image" : "feed",
                url
            ].join(" ")
            proxyFormatLines.push(response)
            proxyFormatLines.push(body)
        })
        res.status(200).send(proxyFormatLines.join("\r\n"))
    }
})

/*
pizdec
jp2gmd
mleczsus :*
Stawik
*/

const ytdl = require("ytdl-core");
const fs = require("fs");
const child_process = require("child_process")
const embed_code = fs.readFileSync("../embedded-player.html").toString()
const wayback = require("./cache_dir/wayback_watchpage")
const videoExists = require("./cache_dir/video_exists_cache_mgr")
const templates = require("./yt2009templates")
const utils = require("./yt2009utils")
const config = require("./config.json")
const yt2009exports = require("./yt2009exports")

let ip_request_count = {}

function flash_handler(req, res) {
    let videoId = req.originalUrl.split("embedF/")[1].split("?")[0]
    let restArguments = req.originalUrl.split("?")
    restArguments.shift();
    restArguments = restArguments.join("&")
    let h264 = videoId.includes("/mp4");
    videoId = videoId.substring(0, 11)
    let createdUrl = req.originalUrl.split("embedF")[0]
                  + "watch.swf?video_id=" + videoId + (h264 ? "/mp4" : "")
                  + "&" + restArguments;
    // related videos
    if(req.query.server_fill_related == 1
    && !req.headers["user-agent"].includes("MSIE")) {
        let i = 0;
        require("./yt2009html").get_related_videos(videoId, (related) => {
            related.forEach(video => {
                if(i !== 8) {
                    createdUrl += `&rv.${i}.title=${encodeURIComponent(
                        video.title
                    )}`
                    createdUrl += `&rv.${i}.thumbnailUrl=${encodeURIComponent(
                        `http://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
                    )}`
                    createdUrl += `&rv.${i}.length_seconds=${
                        utils.time_to_seconds(video.length)
                    }`
                    createdUrl += `&rv.${i}.url=${encodeURIComponent(
                        `http://${config.ip}:${config.port}/watch?v=${video.id}&f=1`
                    )}`
                    createdUrl += `&rv.${i}.view_count=${
                        video.views.replace(" views", "")
                    }`
                    createdUrl += `&rv.${i}.rating=5`
                    createdUrl += `&rv.${i}.id=${video.id}`
                    createdUrl += `&rv.${i}.author=${encodeURIComponent(
                        video.creatorName
                    )}`
                    i++;
                }
                
            })

            if(h264) {
                res.redirect(createdUrl)
                return;
            }
            require("./yt2009warpSWF").vid_flv(videoId, () => {
                res.redirect(createdUrl)
            })
        })
    } else {
        // albo nie
        if(h264) {
            res.redirect(createdUrl)
            return;
        }
        require("./yt2009warpSWF").vid_flv(videoId, () => {
            res.redirect(createdUrl)
        })
    }
}


module.exports = function(req, res) {
    // flash?
    if(req.originalUrl.includes("embedF")) {
        flash_handler(req, res);
        return;
    }

    let id = req.originalUrl.split("embed/")[1].split("?")[0].substring(0, 11)
    let watchflags = "";
    let code = embed_code;

    // authorized?
    if(utils.isAuthorized(req)) {
        if(config.env == "dev") {
            console.log(`(${utils.get_used_token(req)}) embed ${id}`)
        }
    } else {
        if(!ip_request_count[req.ip]) {
            ip_request_count[req.ip] = 1
        } else {
            ip_request_count[req.ip]++;
        }

        setTimeout(function() {
            ip_request_count[req.ip] = 0;
        }, 150000) 

        if(ip_request_count[req.ip] >= 20) {
            res.send("[yt2009] embed cooldown (come back in 2.5 minutes).")
            return;
        }
    }

    // colors
    let colorways = {
        "b1b1b1-cfcfcf": "default",
        "3a3a3a-999999": 'url("/player-imgs/embed-bgs/dark.png")',
        "2b405b-6b8ab6": 'url("/player-imgs/embed-bgs/dblue.png")',
        "006699-54abd6": 'url("/player-imgs/embed-bgs/blue.png")',
        "234900-4e9e00": 'url("/player-imgs/embed-bgs/green.png")',
        "e1600f-febd01": 'url("/player-imgs/embed-bgs/orange.png")',
        "cc2550-e87a9f": 'url("/player-imgs/embed-bgs/pink.png")',
        "402061-9461ca": 'url("/player-imgs/embed-bgs/purple.png")',
        "5d1719-cd311b": 'url("/player-imgs/embed-bgs/dred.png")',
    }
    // apply colors
    if(req.query.color1 && req.query.color2) {
        let generatedCSS = `
        .video_controls .play_btn,
        .video_controls .pause_btn,
        .video_controls .seek_btn,
        .video_controls .volume_button,
        .volume_popout .volume_head,
        .video_controls .player_additions {
            background-image: url("/player-imgs/player-buttons-transparent.png") !important;
        }`
        if(colorways[req.query.color1 + "-" + req.query.color2]
        && colorways[req.query.color1 + "-" + req.query.color2] !== "default") {
            // one of the predefined colors from colorways
            generatedCSS += `
            .video_controls {
                background-image: ${
                    colorways[req.query.color1 + "-" + req.query.color2]
                } !important;
            }
            `
        } else if(!colorways[req.query.color1 + "-" + req.query.color2]) {
            // custom color
            generatedCSS += `
            .video_controls {
                background-image: url("/generate_gradient?c=${
                    req.query.color2
                }") !important;
            }
            `
        }

        // set border to color1
        let color1 = req.query.color1.substring(0, 6).replace(/[^0-9a-zA-Z]/g, "")
        generatedCSS += `
            .video_controls {
                border: 1px #${color1} solid;
            }
            .video_controls .play_btn, .video_controls .pause_btn {
                border-right: 1px #${color1} solid;
            }
            .video_controls .seek, .video_controls .elapsed {
                border: 1px #${color1} solid;
            }
            .video_controls .volume_container,
            .video_controls .player_additions,
            .video_controls .hq {
                border-left: 1px #${color1} solid;
                border-right: 1px #${color1} solid;
            }

            .video_controls .loaded {
                top: 1px;
                background-position: 0px -1px;
            }

            .video_controls .elapsed {
                top: 0px;
                background-position: 0px -1px;
            }

            .video_controls .seek, .video_controls .elapsed, .video_controls .loaded {
                height: 7px !important;
            }
        `

        code = code.replace(`/*yt2009_embed_css`, generatedCSS)
        code = code.replace(`embed_css_end_mark*/`, "")
    }

    // related
    if(req.query.server_fill_related == 1) {
        code = code.replace(`<!--related_hook-->`, `
        <script>
        // related_hook - fetch filmów na endscreen na koniec
        var r = new XMLHttpRequest();
        r.open("GET", "/embed_get_endscreen")
        r.setRequestHeader("source", location.href)
        r.send(null)
        r.addEventListener("load", function(e) {
            $(".endscreen").innerHTML = r.responseText
        }, false)
        </script>
        `)
    }

    // parse flags
    try {
        (req.headers.cookie || "").split(";").forEach(cookie => {
            if(cookie.trimStart().startsWith("watch_flags=")) {
                watchflags += cookie.trimStart()
                                    .replace("watch_flags=", "")
                                    .split(":").join(";")
            }
        })
    }
    catch(error) {}

    // flag autoplay
    if(!req.query.autoplay
    || req.query.autoplay !== "0") {
        code = code.replace(
            `<!--autoplay_hook-->`,
            templates.embedAutoplayCode
        )
    }
    

    // flag annotation_redirect
    if((req.headers.cookie || "").includes("annotation_redirect")) {
        code = code.replace(
            `//yt2009-annotation-redirect`,
            `annotationsRedirect = true;`
        )
    }

    if(id.length !== 11) {
        res.send("[yt2009] niepoprawne id")
        return;
    }

    // flag no_controls_fade
    if((req.headers.cookie || "").includes("no_controls_fade")
    || req.originalUrl.includes("no_controls_fade=1")) {
        code = code.replace(
            `//yt2009-no-controls-fade`,
            templates.embedNoControlsFadeCode
        )
    }

    let waitForOgv = false;

    // if firefox <= 25 wait for ogv, callback mp4 otherwise
    if(req.headers["user-agent"].includes("Firefox/")) {
        let ffVersion = parseInt(
            req.headers["user-agent"].split("Firefox/")[1]
                                     .split(" ")[0]
        )
        if(ffVersion <= 25) {
            waitForOgv = true;
        }
    }

    // exp_hd=1
    let videoQualities = require("./yt2009html").get_cache_video(id).qualities || []
    if(videoQualities.includes("720p")
    || videoQualities.includes("480p")) {
        let use720p = videoQualities.includes("720p")
        code = code.replace(
            `<!--yt2009_style_hq_button-->`,
            templates.playerCssHDBtn.replace("98px", "99px")
        )
        code = code.replace(
            `//yt2009-exp-hq-btn`,
            templates.playerHDBtnJS(id, use720p)
        )
        // 720p
        if(use720p) {
            code = code.replace(`<!--yt2009_hq_btn-->`, `<span class="hq hd"></span>`)
        } else {
            // 480p
            code = code.replace(`<!--yt2009_hq_btn-->`, `<span class="hq"></span>`)
        }
    }

    // auto_additions=1
    if(req.query.auto_additions == 1) {
        code = code.replace(
            `//yt2009-autoadditions`,
            `annotationsMain();captionsMain();`
        )
    }

    // download the video if needed, also convert to ogv in case of ff<=25
    if(!waitForOgv) {
        res.send(code.replace(
            "mp4_files",
            templates.embedVideoSources(id)
        ))
        return;
    }
    if(fs.existsSync(`../assets/${id}.mp4`)
    && !fs.existsSync(`../assets/${id}.ogg`)
    && waitForOgv) {
        // ogg wymagane
        child_process.exec(templates.createFffmpegOgg(id),
        (error, stdout, stderr) => {
            res.send(code.replace("mp4_files", `
            <source src="/assets/${id}.mp4" type="video/mp4"></source>
            <source src="/assets/${id}.ogg" type="video/ogg"></source>`))
        })
    }
    if(!fs.existsSync(`../assets/${id}.mp4`)) {
        utils.saveMp4(id, (path) => {
            if(waitForOgv) {
                child_process.exec(templates.createFffmpegOgg(id),
                (error, stdout, stderr) => {
                    res.send(code.replace(
                        "mp4_files",
                        templates.embedVideoSources(id)
                    ))
                })
            }
        }, true)
        if(!waitForOgv) {
            res.send(code.replace(
                "mp4_files",
                templates.embedVideoSources(id)
            ))
        }
    } else {
        res.send(code.replace(
            "mp4_files",
            templates.embedVideoSources(id)
        ))
    }
}
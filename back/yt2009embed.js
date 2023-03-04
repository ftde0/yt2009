const ytdl = require("ytdl-core");
const fs = require("fs");
const child_process = require("child_process")
const embed_code = fs.readFileSync("../embedded-player.html").toString()
const wayback = require("./cache_dir/wayback_watchpage")
const videoExists = require("./cache_dir/video_exists_cache_mgr")
const utils = require("./yt2009utils")
const config = require("./config.json")

let ip_request_count = {}

function flash_handler(req, res) {
    let videoId = req.originalUrl.split("embedF/")[1].split("?")[0].substring(0, 11)
    let restArguments = req.originalUrl.split("?")
    restArguments.shift();
    restArguments = restArguments.join("&")
    let createdUrl = req.originalUrl.split("embedF")[0] + "watch.swf?video_id=" + videoId + "&" + restArguments;

    // related videos
    if(req.query.server_fill_related == 1 && !req.headers["user-agent"].includes("MSIE")) {
        let i = 0;
        require("./yt2009html").get_related_videos(videoId, (related) => {
            related.forEach(video => {
                if(i !== 8) {
                    createdUrl += `&rv.${i}.title=${encodeURIComponent(video.title)}`
                    createdUrl += `&rv.${i}.thumbnailUrl=${encodeURIComponent(`http://i.ytimg.com/vi/${video.id}/hqdefault.jpg`)}`
                    createdUrl += `&rv.${i}.length_seconds=${utils.time_to_seconds(video.length)}`
                    createdUrl += `&rv.${i}.url=${encodeURIComponent(`http://${config.ip}:${config.port}/watch?v=${video.id}&f=1`)}`
                    createdUrl += `&rv.${i}.view_count=${video.views.replace(" views", "")}`
                    createdUrl += `&rv.${i}.rating=5`
                    createdUrl += `&rv.${i}.id=${video.id}`
                    createdUrl += `&rv.${i}.author=${encodeURIComponent(video.creatorName)}`
                    i++;
                }
                
            })
            require("./yt2009warpSWF").vid_flv(videoId, () => {
                res.redirect(createdUrl)
            })
        })
    } else {
        // albo nie
        require("./yt2009warpSWF").vid_flv(videoId, () => {
            res.redirect(createdUrl)
        })
    }
}


module.exports = function(req, res) {
    // czy to flash?
    if(req.originalUrl.includes("embedF")) {
        flash_handler(req, res);
        return;
    }

    let id = req.originalUrl.split("embed/")[1].split("?")[0].substring(0, 11)
    let watchflags = "";
    let code = embed_code;

    // autoryzacja
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
            console.log(`([unathorized] ${req.ip} | ${req.headers["user-agent"]}) ograniczony`)
            return;
        } else {
            console.log(`([unathorized] ${req.ip} | ${req.headers["user-agent"]}) embed ${id}`)
        }
    }

    // kolorki
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
    // aplikujemy po kolei
    // magick -size 1x25 gradient:"#ffffff"-"#[color2]" test.png
    if(req.query.color1 && req.query.color2) {
        let generatedCSS = ``
        if(colorways[req.query.color1 + "-" + req.query.color2]
        && colorways[req.query.color1 + "-" + req.query.color2] !== "default") {
            // jeden z kolorków w colorways poza default
            generatedCSS += `
            .video_controls .play_btn,
            .video_controls .pause_btn,
            .video_controls .seek_btn,
            .video_controls .volume_button,
            .volume_popout .volume_head,
            .video_controls .player_additions {
                background-image: url("/player-imgs/player-buttons-transparent.png") !important;
            }
            `
            generatedCSS += `
            .video_controls {
                background-image: ${colorways[req.query.color1 + "-" + req.query.color2]} !important;
            }
            `
        } else if(!colorways[req.query.color1 + "-" + req.query.color2]) {
            // custom kolor
            generatedCSS += `
            .video_controls .play_btn,
            .video_controls .pause_btn,
            .video_controls .seek_btn,
            .video_controls .volume_button,
            .volume_popout .volume_head,
            .video_controls .player_additions {
                background-image: url("/player-imgs/player-buttons-transparent.png") !important;
            }
            `
            generatedCSS += `
            .video_controls {
                background-image: url("/generate_gradient?c=${req.query.color2}") !important;
            }
            `
        }

        // border na color1
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
            .video_controls .player_additions {
                border-left: 1px #${color1} solid;
                border-right: 1px #${color1} solid;
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
                watchflags += cookie.trimStart().replace("watch_flags=", "").split(":").join(";")
            }
        })
    }
    catch(error) {}

    // flaga autoplay
    watchflags += ";"
    if(watchflags.includes("autoplay")) {
        code = code.replace(`<!--autoplay_hook-->`, `
            
            <script>
                // autoplay
                
                document.querySelector("video").addEventListener("canplay", function() {
                    setTimeout(function() {
                        document.querySelector("video").play()
                    }, 100)
                }, false)
                if(document.querySelector("video").readyState >= 3) {
                    document.querySelector("video").play();
                }
            </script>`)
    }

    // flaga annotation_redirect
    if((req.headers.cookie || "").includes("annotation_redirect")) {
        code = code.replace(`//yt2009-annotation-redirect`, `annotationsRedirect = true;`)
    }

    if(id.length == 0) {
        res.send("[yt2009] niepoprawne id")
        return;
    }

    // flaga no_controls_fade
    if((req.headers.cookie || "").includes("no_controls_fade") || req.originalUrl.includes("no_controls_fade=1")) {
        code = code.replace(`//yt2009-no-controls-fade`, `
        fadeControlsEnable = false;
        var s = document.createElement("style")
        s.innerHTML = "video:not(.showing-endscreen) {height: calc(100% - 25px) !important;}#watch-player-div {background: black !important;}"
        document.body.appendChild(s)`)
    }

    let waitForOgv = false;

    // jeśli mamy do czynienia z firefoxem <=25, czekamy na ogg, inaczej callbackujemy mp4
    if(req.headers["user-agent"].includes("Firefox/")) {
        let ffVersion = parseInt(req.headers["user-agent"].split("Firefox/")[1].split(" ")[0])
        if(ffVersion <= 25) {
            waitForOgv = true;
        }
    }

    // pobieranie
    if(fs.existsSync(`../assets/${id}.mp4`) && !fs.existsSync(`../assets/${id}.ogg`) && waitForOgv) {
        // ogg wymagane
        child_process.exec(`ffmpeg -i ${__dirname}/../assets/${id}.mp4 -b 1500k -ab 128000 -speed 2 ${__dirname}/../assets/${id}.ogg`, (error, stdout, stderr) => {
            res.send(code.replace("mp4_files", `
            <source src="/assets/${id}.mp4" type="video/mp4"></source>
            <source src="/assets/${id}.ogg" type="video/ogg"></source>`))
        })
    }
    if(!fs.existsSync(`../assets/${id}.mp4`)) {
        let writeStream = fs.createWriteStream(`../assets/${id}.mp4`)
        
        writeStream.on("finish", () => {
            setTimeout(function() {
                if(waitForOgv) {
                    child_process.exec(`ffmpeg -i ${__dirname}/../assets/${id}.mp4 -b 1500k -ab 128000 -speed 2 ${__dirname}/../assets/${id}.ogg`, (error, stdout, stderr) => {
                        res.send(code.replace("mp4_files", `
                        <source src="/assets/${id}.mp4" type="video/mp4"></source>
                        <source src="/assets/${id}.ogg" type="video/ogg"></source>`))
                    })
                } else {
                    res.send(code.replace("mp4_files", `
                    <source src="/assets/${id}.mp4" type="video/mp4"></source>
                    <source src="/assets/${id}.ogg" type="video/ogg"></source>`))
                }
                
            }, 250)
        })

        ytdl(`https://youtube.com/watch?v=${id}`, {
            "quality": 18
        })
        .on("error", (error) => {
            res.send("[yt2009] nie można pobrać filmu / can't download the video")
            console.log(error)
        })
        .pipe(writeStream)
    } else {
        res.send(code.replace("mp4_files", `
        <source src="/assets/${id}.mp4" type="video/mp4"></source>
        <source src="/assets/${id}.ogg" type="video/ogg"></source>`))
    }
}
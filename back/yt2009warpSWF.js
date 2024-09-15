const yt2009main = require("./yt2009html")
const yt2009search = require("./yt2009search")
const yt2009wayback = require("./cache_dir/wayback_watchpage")
const yt2009templates = require("./yt2009templates")
const yt2009exports = require("./yt2009exports")
const video_exists = require("./cache_dir/video_exists_cache_mgr")
const ryd = require("./cache_dir/ryd_cache_manager")
const fs = require("fs")
const fetch = require("node-fetch")
const constants = require("./yt2009constants.json")
const utils = require("./yt2009utils")
const child_process = require("child_process")
const ytdl = require("ytdl-core")
const config = require("./config.json")
let flvProcessingVideos = []

module.exports = {
    "get_video": function(req, res) {
        // main video data - sent when warp.swf is started
        if(!utils.isAuthorized(req)) {
            res.send("");
            return;
        }

        let video = req.query.video_id.replace("/mp4", "")

        if(config.env == "dev") {
            console.log(`(${utils.get_used_token(req) + "_warp_swf"}) warp init (${Date.now()})`)
        }

        yt2009main.fetch_video_data(video, (data) => {
            res.send(`
<?xml version="1.0" encoding="utf-8"?>
<ut_response status="ok">
    <video>
        <author>${data.author_name}</author>
        <id>${video}</id>
        <title>${data.title}</title>
        <length_seconds>${data.length}</length_seconds>
        <rating_avg>5</rating_avg>
        <rating_count>1</rating_count>
        <description>.</description>
        <view_count>1</view_count>
        <upload_time>1</upload_time>
        <comment_count>1</comment_count>
        <tags> </tags>
        <url>http://www.youtube.com/watch?v=${video}</url>
        <thumbnail_url>http://i.ytimg.com/vi/${video}/default.jpg</thumbnail_url>
        <embed_status>ok</embed_status>
        <allow_ratings>yes</allow_ratings>
    </video>
</ut_response>`)
        },
        req.headers["user-agent"], 
        utils.get_used_token(req),
        false, false, true)
    },


    "get_related": function(req, res) {
        // warp related videos
        if(!utils.isAuthorized(req)) {
            res.send("");
            return;
        }

        let video = req.query.video_id.replace("/mp4", "")

        if(config.env == "dev") {
            console.log(`(${
                utils.get_used_token(req) + "_warp_swf"
            }) warp videos load (${video}, ${Date.now()})`)
        }

        let videos_xml = `<?xml version="1.0" encoding="utf-8"?>
<ut_response status="ok">
<video_list>`
        let video_index = 1;

        yt2009main.fetch_video_data(video, (data) => {
            yt2009search.related_from_keywords(
                utils.exp_related_keyword(data.tags, data.title),
                video, "", (html, related) => {
                    related.forEach(v => {
                        videos_xml += yt2009templates.warpVideo(
                            v.id,
                            v.title,
                            v.length,
                            v.creatorHandle || v.creatorName,
                            video_index,
                            v.description,
                            v.views,
                            ryd.readCache(v.id) || 5,
                            v.upload
                        )

                        video_index++
                    })

                    videos_xml += `
</video_list>
</ut_response>`
                    res.send(videos_xml)
            }, "http")
        }, req.headers["user-agent"], utils.get_used_token(req), false, false, true)
    },

    // handling /get_video (flv)
    "get_flv": function(req, res) {
        let avoidRedirect = false;
        if(req.headers["user-agent"]
        && req.headers["user-agent"].includes("Nintendo 3DS")) {
            avoidRedirect = true;
        }
        if(!req.query.video_id) {
            res.sendStatus(400)
            return;
        }
        if(req.query.fmt == 5
        || req.query.video_id.includes("/mp4")
        || (req.headers.referer || "").includes("/mp4")
        || req.query.t == "amogus") {
            req.query.video_id = req.query.video_id.replace("/mp4", "")
            if(avoidRedirect) {
                let v = req.query.video_id;
                let d = __dirname.split("back")
                d.pop()
                d = d.join("back")
                let f = d + "/assets/" + v + ".mp4"
                if(!fs.existsSync(f)
                || (fs.existsSync(f)
                && fs.statSync(f).size < 5)) {
                    utils.saveMp4(v, () => {
                        if(fs.existsSync(f)) {
                            res.sendFile(f)
                        } else {
                            res.sendStatus(404)
                        }
                    }, false)
                } else {
                    res.sendFile(f)
                }
            } else {
                res.redirect("/channel_fh264_getvideo?v=" + req.query.video_id)
            }
            return;
        }
        let v = req.query.video_id.replace("/mp4", "")
        if(yt2009main.get_cache_video(v).restricted) {
            res.redirect("/tvhtml5simply?v=" + v)
        }
        if(req.query.noflv == 1) {
            res.send("")
            return;
        }
        if(req.query.eurl
        && req.query.eurl.includes("embedr.com")) {
            // xl
            if(req.query.fmt == "22") {
                // hd
                res.redirect("/exp_hd?video_id=" + req.query.video_id)
                return;
            }
            if(req.query.fmt == "35") {
                // hq
                res.redirect("/get_480?video_id=" + req.query.video_id)
                return;
            }
        }
        this.vid_flv(req.query.video_id, () => {
            try {
                res.redirect(`../assets/${req.query.video_id}.flv`)
            }
            catch(error) {}
        })
    },

    "vid_flv": function(id, callback) {
        // get a flv file needed by flash
        let ffmpegCommandFlv = [
            "ffmpeg",
            `-i ${__dirname}/../assets/${id}.mp4`,
            ` -b 1500k -ab 128000`,
            `${__dirname}/../assets/${id}.flv`
        ]

        // have flv?
        if(flvProcessingVideos.includes(id)) {
            // wait for flv to finish processing (another request sent before)
            let x = setInterval(() => {
                if(!flvProcessingVideos.includes(id)) {
                    callback();
                    clearInterval(x)
                }
            }, 250)
            return;
        }
        if(!fs.existsSync(`../assets/${id}.flv`)
        && yt2009exports.getStatus(id)) {
            // mp4 downloading, wait and convert
            yt2009exports.waitForStatusChange(id, () => {
                convert_mp4_to_flv(id, () => {
                    callback()
                })
            })
            return;
        }
        if(fs.existsSync(`../assets/${id}.flv`)) {
            callback()
        } else if(fs.existsSync(`../assets/${id}.mp4`)
                && !fs.existsSync(`../assets/${id}.flv`)) {
            // have mp4 but no flv, convert
            convert_mp4_to_flv(id, () => {
                callback()
            })
        } else {
            // neither available - download and convert
            utils.saveMp4(id, () => {
                convert_mp4_to_flv(id, () => {
                    callback()
                })
            })
        }

        function convert_mp4_to_flv(id, callback) {
            flvProcessingVideos.push(id)
            child_process.exec(ffmpegCommandFlv.join(" "),
            (error, stdout, stderr) => {
                flvProcessingVideos = flvProcessingVideos.filter(s => s !== id)
                callback()
            })
        }
    }
}
const yt2009main = require("./yt2009html")
const yt2009search = require("./yt2009search")
const yt2009wayback = require("./cache_dir/wayback_watchpage")
const yt2009templates = require("./yt2009templates")
const video_exists = require("./cache_dir/video_exists_cache_mgr")
const fs = require("fs")
const fetch = require("node-fetch")
const constants = require("./yt2009constants.json")
const utils = require("./yt2009utils")
const child_process = require("child_process")
const ytdl = require("ytdl-core")
const config = require("./config.json")

module.exports = {
    "get_video": function(req, res) {
        // main video data - sent when warp.swf is started
        if(!utils.isAuthorized(req)) {
            res.send("");
            return;
        }

        if(config.env == "dev") {
            console.log(`(${utils.get_used_token(req) + "_warp_swf"}) warp init (${Date.now()})`)
        }

        yt2009main.fetch_video_data(req.query.video_id, (data) => {
            res.send(`
<?xml version="1.0" encoding="utf-8"?>
<ut_response status="ok">
    <video>
        <author>${data.author_name}</author>
        <id>${req.query.video_id}</id>
        <title>${data.title}</title>
        <length_seconds>${data.length}</length_seconds>
        <rating_avg>5</rating_avg>
        <rating_count>1</rating_count>
        <description>.</description>
        <view_count>1</view_count>
        <upload_time>1</upload_time>
        <comment_count>1</comment_count>
        <tags> </tags>
        <url>http://www.youtube.com/watch?v=${req.query.video_id}</url>
        <thumbnail_url>http://i.ytimg.com/vi/${req.query.video_id}/default.jpg</thumbnail_url>
        <embed_status>ok</embed_status>
        <allow_ratings>yes</allow_ratings>
    </video>
</ut_response>`)
        }, req.headers["user-agent"], utils.get_used_token(req))
    },


    "get_related": function(req, res) {
        // warp related videos
        if(!utils.isAuthorized(req)) {
            res.send("");
            return;
        }

        if(config.env == "dev") {
            console.log(`(${utils.get_used_token(req) + "_warp_swf"}) warp videos load (${req.query.video_id}, ${Date.now()})`)
        }

        let videos_xml = `
        <?xml version="1.0" encoding="utf-8"?>
        <ut_response status="ok">
        <video_list>`
        let video_index = 1;

        yt2009main.fetch_video_data(req.query.video_id, (data) => {
            yt2009search.related_from_keywords(
                utils.exp_related_keyword(data.tags, data.title),
                req.query.video_id, "", (html, related) => {
                    related.forEach(v => {
                        videos_xml += yt2009templates.warpVideo(
                            v.id,
                            v.title,
                            v.length,
                            v.creatorHandle || v.creatorName,
                            video_index
                        )

                        video_index++
                    })

                    videos_xml += `</video_list></ut_response>`
                    res.send(videos_xml)
            }, "http")
        }, req.headers["user-agent"], utils.get_used_token(req), false, false, true)
    },

    // handling /get_video (flv)
    "get_flv": function(req, res) {
        if(req.query.noflv == 1) {
            res.send("")
            return;
        }
        if(req.query.fmt == 5
        || req.query.video_id.includes("/mp4")) {
            req.query.video_id = req.query.video_id.replace("/mp4", "")
            res.redirect("/channel_fh264_getvideo?v=" + req.query.video_id)
            return;
        }
        this.vid_flv(req.query.video_id, () => {
            res.redirect(`../assets/${req.query.video_id}.flv`)
        })
    },

    "vid_flv": function(id, callback) {
        // get a flv file needed by flash

        // have flv?
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
            let writeStream = fs.createWriteStream(`../assets/${id}.mp4`)

            writeStream.on("finish", () => {
                setTimeout(function() {
                    convert_mp4_to_flv(id, () => {
                        callback()
                    })
                    convert_mp4_to_ogv(id)
                }, 250)
            })
    
            ytdl(`https://youtube.com/watch?v=${id}`, {
                "quality": 18
            })
            .pipe(writeStream)
            .on("error", (error) => {
                callback()
                console.log(`warp_flv: ${error}`)
            })
        }

        function convert_mp4_to_flv(id, callback) {
            child_process.exec(`ffmpeg -i ${__dirname}/../assets/${id}.mp4 -b 1500k -ab 128000 ${__dirname}/../assets/${id}.flv`, (error, stdout, stderr) => {
                callback()
            })
        }

        // konwertujemy do ogg w tle
        function convert_mp4_to_ogv(id) {
            child_process.exec(`ffmpeg -i ${__dirname}/../assets/${id}.mp4 -b 1500k -ab 128000 -speed 2 ${__dirname}/../assets/${id}.ogg`, (error, stdout, stderr) => {})
        }
    }
}
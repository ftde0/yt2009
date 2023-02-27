const yt2009html = require("./yt2009html")
const ytsearch = require("./yt2009search")
const channels = require("./yt2009html")
const utils = require("./yt2009utils")
const templates = require("./yt2009templates")
const fs = require("fs")
const child_process = require("child_process")
const config = require("./config.json")
const env = config.env
const rtsp_server = `rtsp://${config.ip}:${config.port + 2}/`
const ffmpeg_process_144 = [
    "ffmpeg",
    "-i $1",
    "-ac 1",
    "-acodec aac",
    "-c:v libx264",
    "-s 256x144",
    "$2"
]
const ffmpeg_stream = [
    "ffmpeg",
    "-re -i",
    "$1",
    "$2",
    "-f rtsp",
    "-rtsp_transport udp",
    "$3"
]

const watchpage_html = fs.readFileSync("../mobile/watchpage.htm").toString();
const search_html = fs.readFileSync("../mobile/search.htm").toString();
const comments_html = fs.readFileSync("../mobile/view-comment.htm").toString();
const homepage_html = fs.readFileSync("../mobile/mainpage.htm").toString()

module.exports = {
    // create the watch page
    "create_watchpage": function(req, res) {
        let id = req.query.v.substring(0, 11)
        yt2009html.fetch_video_data(id, (data) => {
            if(!data) {
                res.send(`[yt2009] something went wrong while getting video data`)
                return;
            }

            let code = watchpage_html;
            code = code.split(`yt2009_id`).join(data.id)
            code = code.replace(`yt2009_title`, data.title)
            code = code.replace(`yt2009_description`, data.description)
            code = code.replace(`yt2009_length`, utils.seconds_to_time(data.length))
            code = code.replace(`yt2009_views`, data.viewCount + " views")
            code = code.replace(`yt2009_user`, data.author_name)
            code = code.replace(`yt2009_upload`, data.upload)
            code = code.replace(`yt2009_thumbnail`, `http://i.ytimg.com/vi/${data.id}/hqdefault.jpg`)

            // related
            let relatedHTML = ``
            let relatedIndex = 0;
            data.related.forEach(video => {
                if(utils.time_to_seconds(video.length) >= 1800 || relatedIndex > 4) return;

                relatedHTML += templates.mobile_video(video)
                relatedIndex++;
            })

            code = code.replace(`<!--yt2009_related-->`, relatedHTML)

            res.send(code)
        }, req.headers["user-agent"], utils.get_used_token(req), false)
    },

    // video searching
    "search": function(req, res) {
        let code = search_html
        let query = req.query.q;

        let searchHTML = ``
        ytsearch.get_search(query, "", "", (data => {
            let videoIndex = 0;
            data.forEach(video => {
                if(videoIndex > 10 || video.type !== "video") return;

                searchHTML += templates.mobile_video(video)
                videoIndex++;
            })


            code = code.replace(`<!--yt2009_search-->`, searchHTML)
            res.send(code)
        }), utils.get_used_token(req))
    },

    // rtsp video watch
    "setup_rtsp": function(id, mute, res) {
        let fileName = `${id}-144.mp4`
        let streamId = Math.floor(Math.random() * 37211)

        // process requested video if needed
        if(!fs.existsSync(`../assets/${fileName}`)
        && fs.existsSync(`../assets/${id}.mp4`)) {
            // convert to 144p
            child_process.execSync(
                ffmpeg_process_144.join(" ").replace(
                    "$1", `${__dirname}/../assets/${id}.mp4`
                ).replace(
                    "$2", `${__dirname}/../assets/${fileName}`
                )
            )
        }

        // start RTSP stream of 144 file
        child_process.exec(
            ffmpeg_stream.join(" ").replace(
                "$1", `${__dirname}/../assets/${fileName}`
            ).replace(
                "$2", `${mute ? "-an" : ""}`
            ).replace(
                "$3", `${rtsp_server}video/${id}-${streamId}`
            )
        )
        res.redirect(`${rtsp_server}video/${id}-${streamId}`)
    },

    // mobile homepage
    "create_homepage": function(req, res) {
        let code = homepage_html;
        let index = 0;

        // get homepage videos, fill in the html template and send
        yt2009html.featured().splice(0, 4).forEach(video => {
            index++;
            code = code.split(`v${index}_id`).join(video.id)
            code = code.split(`v${index}_title`).join(video.title)
            code = code.split(`v${index}_views`).join(video.views)
        })
        res.send(code)
    },

    // comments view page
    "view_comments": function(req, res) {
        let code = comments_html
        let actual_comments = ``
        req = utils.addFakeCookie(req)
        let id = req.query.v.substring(0, 11)

        yt2009html.fetch_video_data(id, (data => {
            // fill video data
            code = code.split("yt2009_id").join(data.id)
            code = code.split("yt2009_title").join(data.title)
            code = code.split("yt2009_length").join(
                utils.seconds_to_time(data.length)
            )
            code = code.split("yt2009_publish").join(data.upload)
            code = code.split("yt2009_views").join(
                utils.countBreakup(data.viewCount) + " views"
            )
            code = code.split("yt2009_uploader").join(
                utils.asciify(data.author_name)
            )

            // fill comments and send
            data.comments.forEach(comment => {
                if(!comment.content) return;
                if(comment.content.length > 500) return;
                actual_comments += `
            <div style="border-top:1px dashed #ADADAD;padding-top:8px">
                <a href="#">${utils.asciify(comment.authorName)}</a>&nbsp;&nbsp;${comment.time}
            </div>
            <div style="padding-top:3px;padding-bottom:5px">${comment.content}</div>`
            })
            code = code.replace(`<!--yt2009_comments-->`, actual_comments)
            res.send(code)
        }), "", utils.get_used_token(req), false, false)
    }
}
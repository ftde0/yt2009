const yt2009html = require("./yt2009html")
const ytsearch = require("./yt2009search")
const channels = require("./yt2009html")
const utils = require("./yt2009utils")
const fs = require("fs")
const child_process = require("child_process")
const config = require("./config.json")
const env = config.env
// todo: generalize soon
const rtsp_server = `rtsp://${config.ip}:${config.port + 2}/`

const watchpage_html = fs.readFileSync("../mobile/watchpage.htm").toString();
const search_html = fs.readFileSync("../mobile/search.htm").toString()

module.exports = {
    // tworzenie strony oglądania
    "create_watchpage": function(req, res) {
        let id = req.query.v.substring(0, 11)
        yt2009html.fetch_video_data(id, (data) => {
            if(!data) {
                res.send(`[yt2009] zepsuło się<br>możliwe powody:<br>- film nie istnieje/jest prywatny<br>- filmu nie można pobrać`)
                return;
            }

            let code = watchpage_html;
            code = code.replace(`yt2009_id`, data.id)
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

                relatedHTML += `
            <table width="100%">
                <tr valign="top">
                    <td style="font-size:0px" width="80">
                        <a href="watch?v=${video.id}"><img src="http://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="video" width="80" height="60" style="border:0;margin:0px;" /></a>
                    </td>
                    <td style="width:100%;font-size:13px;padding-left:2px">
                        <div style="font-size:90%;padding-bottom:1px">
                            <a accesskey="1" href="watch?v=${video.id}">${video.title}</a>
                        </div>
                        <div style="color:#333;font-size:80%">1:20&nbsp;&nbsp;<img src="/assets/site-assets/stars_5.0_49x9-vfl84759.gif" alt="5.0 stars" width="49" height="9" style="border:0;margin:0px;" /></div>
                        <div style="color:#333;font-size:80%">${video.views}</div>
                    </td>
                </tr>
            </table>
            <hr size="1" noshade="noshade" color="#999" style="width:100%;height:1px;margin:2px 0;padding:0;color:#999;background:#999;border:none;" />`

                relatedIndex++;
            })

            code = code.replace(`<!--yt2009_related-->`, relatedHTML)

            res.send(code)
        }, req.headers["user-agent"], utils.get_used_token(req), false)
    },

    // wyszukiwanie
    "search": function(req, res) {

        let code = search_html
        let query = req.query.q;
        console.log(query)
        let searchHTML = ``
        
        ytsearch.get_search(query, "", "", (data => {
            let videoIndex = 0;
            data.forEach(video => {
                if(videoIndex > 10 || video.type !== "video") return;

                searchHTML += `
            <table width="100%">
                <tbody>
                    <tr valign="top">
                        <td style="font-size:0px" width="80">
                            <a href="watch?v=${video.id}"><img src="${video.thumbnail}" alt="video" style="border:0;margin:0px;" width="80" height="60"></a>
                        </td>
                        <td style="width:100%;font-size:13px;padding-left:2px">
                            <div style="font-size:90%;padding-bottom:1px">
                                <a accesskey="1" href="watch?v=${video.id}">${video.title}</a>
                            </div>
                            <div style="color:#333;font-size:80%">${video.time}<img src="/assets/site-assets/stars_5.0_49x9-vfl84759.gif" alt="5.0 stars" style="border:0;margin:0px;" width="49" height="9"></div>
                            <div style="color:#333;font-size:80%">${video.upload}</div>
                            <div style="color:#333;font-size:80%">${video.views}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style="width:100%;height:1px;margin:2px 0;padding:0;color:#999;background:#999;border:none;" size="1" noshade="noshade" color="#999">`

                videoIndex++;
            })


            code = code.replace(`<!--yt2009_search-->`, searchHTML)
            res.send(code)
        }), utils.get_used_token(req))
    },

    // oglądanie filmów
    "setup_rtsp": function(id, mute, res) {
        let fileName = `${id}-144.mp4`
        // process requested video if needed
        if(!fs.existsSync(`../assets/${fileName}`)
        && fs.existsSync(`../assets/${id}.mp4`)) {
            let streamId = Math.floor(Math.random() * 37211)
            child_process.execSync(`ffmpeg -i ${__dirname}/../assets/${id}.mp4 -ac 1 -c:v libx264 -s 256x144 ${__dirname}/../assets/${fileName}`)
            child_process.exec(`ffmpeg -re -i ${__dirname}/../assets/${fileName} ${mute ? "-an" : ""} -f rtsp -rtsp_transport udp ${rtsp_server}video/${id}-${streamId}`, (error, stdout, stderr) => {
                
            })
            res.redirect(`${rtsp_server}video/${id}-${streamId}`)
        } else if(fs.existsSync(`../assets/${fileName}`)) {
            let streamId = Math.floor(Math.random() * 37211)
            child_process.exec(`ffmpeg -re -i ${__dirname}/../assets/${fileName} ${mute ? "-an" : ""} -f rtsp -acodec aac -rtsp_transport udp ${rtsp_server}video/${id}-${streamId}`, (error, stdout, stderr) => {
                
            })
            res.redirect(`${rtsp_server}video/${id}-${streamId}`)
        }
    }
}
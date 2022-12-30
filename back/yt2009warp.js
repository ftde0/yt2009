const fs = require("fs")
const utils = require("./yt2009utils")
const yt2009main = require("./yt2009html")
const file = fs.readFileSync("../warp.html").toString()
const circlesDistance = [[200, 0], [100, 140], [0, 200], [-100, 140], [-200, 0], [-100, -140], [0, -200], [100, -140]]
let clientCooldowns = []

// warp!
// https://www.youtube.com/watch?v=qa-juo22LZU

module.exports = {
    "use": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("");
            return;
        }

        if(!req.query.v) {
            res.send("[yt2009] poprawne użycie: /warp?v=id_filmu")
            return;
        }

        let code = file

        console.log(`(${utils.get_used_token(req) + "_warp"}) warp init ${Date.now()}`)

        let initialCircles = ``
        yt2009main.fetch_video_data(req.query.v, (data) => {
            // pierwsze kółko (główny filmik)
            initialCircles += `<div class="video-circle" style="border-color: rgb(155, 180, 69);left: 1300px;top: 1400px;background-image: url(http://i.ytimg.com/vi/${data.id}/hqdefault.jpg)" data-hover-title="${data.title.split(`"`).join(`'`)}" data-hover-length="${utils.seconds_to_time(data.length)}" data-hover-id="${data.id}" onclick="warpPlay(this)" onmouseover="warpHover(this)"onmouseout="warpHoverRemove();"></div>`

            // related filmy
            let index = 0;
            
            data.related.forEach(video => {
                if(!circlesDistance[index] || utils.time_to_seconds(video.length) >= 900) return;
                initialCircles += `<div class="video-circle n1 small animate" style="border-color: rgb(155, 180, 69);left: 1300px;top: 1400px;background-image: url(http://i.ytimg.com/vi/${video.id}/hqdefault.jpg)" data-hover-title="${video.title.split(`"`).join(`'`)}" data-hover-id="${video.id}" data-hover-length="${video.length}" data-left-anim="${circlesDistance[index][0]}" data-top-anim="${circlesDistance[index][1]}" onclick="warpPlay(this)" onmouseout="warpHoverRemove();" onmouseover="warpHover(this)"></div>`

                index++;
            })

            // wysyłamy :D
            code = code.replace("<!--yt2009_initial_data_insert-->", initialCircles)
            res.send(code)
        }, req.headers["user-agent"], utils.get_used_token(req) + "_warp")
    },


    "get_other_videos": function(req, res) {
        if(!utils.isAuthorized(req) || clientCooldowns.includes(utils.get_used_token(req))) {
            res.send("");
            return;
        }

        console.log(`(${utils.get_used_token(req) + "_warp"}) warp videos load (${req.headers.id}, ${Date.now()})`)

        clientCooldowns.push(utils.get_used_token(req))

        let completeHTML = ``
        let index = 0;
        let baseLeft = parseInt(req.headers.left);
        let baseTop = parseInt(req.headers.top);
        let videosExclude = []
        req.headers["discovered-videos"].split(":").forEach(video => {
            videosExclude.push(video)
        })
        let randomCirclesDistance = [[100 + Math.floor(Math.random() * 100), 0 + Math.floor(Math.random() * 10)],
                                     [50 + Math.floor(Math.random() * 50), 80 + Math.floor(Math.random() * 60)],
                                     [0 + Math.floor(Math.random() * 10), 100 + Math.floor(Math.random() * 100)],
                                     [-50 - Math.floor(Math.random() * 100), 80 + Math.floor(Math.random() * 60)],
                                     [-100 - Math.floor(Math.random() * 100), 0 + Math.floor(Math.random() * 10)],
                                     [-50 - Math.floor(Math.random() * 50), -80 - Math.floor(Math.random() * 60)],
                                     [0 + Math.floor(Math.random() * 10), -100 - Math.floor(Math.random() * 100)],
                                     [50 + Math.floor(Math.random() * 50), -80 - Math.floor(Math.random() * 60)]]
        let randomColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`

        yt2009main.get_related_videos(req.headers.id, (videos) => {
            videos.forEach(video => {
                if(!randomCirclesDistance[index] || utils.time_to_seconds(video.length) >= 900 || videosExclude.includes(video.id)) return;
                completeHTML += `<div class="video-circle small animate" style="left: ${baseLeft}px;top: ${baseTop}px;background-image: url(http://i.ytimg.com/vi/${video.id}/hqdefault.jpg);border-color: ${randomColor};" data-hover-title="${video.title.split(`"`).join(`'`)}" data-hover-id="${video.id}" data-hover-length="${video.length}" onclick="warpPlay(this)" data-left-anim="${randomCirclesDistance[index][0]}" data-top-anim="${randomCirclesDistance[index][1]}" onmouseout="warpHoverRemove();" onmouseover="warpHover(this)"></div>`
                index++;
            })

            res.send(completeHTML + `<!--yt2009_break-->;yt2009_border_color:${randomColor}`)
        })
        setTimeout(function() {
            clientCooldowns = clientCooldowns.filter(s => s !== utils.get_used_token(req))
        }, 5000)
    }
}
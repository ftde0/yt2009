/*
=======
/my_history handler
=======

yt2009, 2022-2023
*/

const utils = require("./yt2009utils")
const fs = require("fs")
const page = fs.readFileSync("../history.htm").toString()
const doodles = require("./yt2009doodles")
const templates = require("./yt2009templates")

module.exports = {
    "apply": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }
        req = utils.addFakeCookie(req)
        
        let code = page;

        // shows tab
        if(req.headers.cookie.includes("shows_tab")) {
            code = code.replace(
                `<a href="/channels">Channels</a>`,
                `<a href="/channels">Channels</a><a href="#">Shows</a>`
            )
        }

        // read cookie based history
        let history = ""
        let backupCookies = []
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.includes("watch_history")) {
                    history += cookie.split("watch_history=")[1]
                }
                if(cookie.includes("watch_history_backup")) {
                    let tempHistory = cookie.split("=")
                    tempHistory.shift()
                    tempHistory = tempHistory.join("=")
                    backupCookies.push(tempHistory)
                }
            })
        }
        catch(error) {console.log(error);}
        backupCookies.forEach(cookie => {
            history += cookie
        })
        history = history.split(":")
        let historyReadable = []

        if(typeof(history) == "object") {
            history.forEach(video => {
                if(video.startsWith("undefined")) {
                    video = video.replace("undefined", "")
                }
                let s = video.split("&")
                let title = s[0]
                let views = s[1]
                let id = s[2]

                if(!views) return;
    
                historyReadable.push({
                    "title": decodeURIComponent(title).trim(),
                    "views": views,
                    "id": id
                })
            })
        }
        

        // split every 20
        function splitEvery(array, num) {
            let tr = []
            let tempArray = []
            array.forEach(el => {
                tempArray.push(el)
                if(tempArray.length == num
                || array.indexOf(el) == array.length - 1) {
                    tr.push(tempArray)
                    tempArray = []
                }
            })
        
            return tr;
        }

        let videosHTML = ``
        
        // foreach and to html
        let pageNum = 0;

        splitEvery(historyReadable, 20).forEach(videosPage => {
            videosHTML += templates.historyParts[0](pageNum)
            videosPage.forEach(video => {
                videosHTML += templates.historyVideo(video, req)
            })
            videosHTML += templates.historyParts[1]
            pageNum++;
        })

        code = require("./yt2009loginsimulate")(req, code);
        code = code.replace(`<!--yt2009_videos_insert-->`, videosHTML)
        code = code.split(`yt2009_page_count`).join(pageNum)
        code = doodles.applyDoodle(code)

        res.send(code);
    }
}
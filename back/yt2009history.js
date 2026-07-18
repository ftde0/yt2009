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
const languages = require("./language_data/language_engine")
const mobilehelper = require("./yt2009mobilehelper")

module.exports = {
    "apply": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }
        req = utils.addFakeCookie(req)
        
        let usePchelper = (
            req.headers.cookie
         && req.headers.cookie.includes("use_yt_history")
         && mobilehelper.hasLogin(req)
        )
        let code = page;

        // shows tab
        if(req.headers.cookie.includes("shows_tab")) {
            code = code.replace(
                `<a href="/channels">lang_channels</a>`,
                `<a href="/channels">lang_channels</a><a href="#">lang_shows</a>`
            )
        }

        // fmode
        if(req.headers.cookie
        && req.headers.cookie.includes("f_mode=on")) {
            code = code.replace(
                `/assets/site-assets/yt2009_userpage_common.js`,
                `/assets/site-assets/yt2009_userpage_f.js`
            )
        }

        // read pchelper based history
        if(usePchelper) {
            code = code.replace(
                `<!--yt2009_history_source_marker_div-->`,
                `<div id="yt2009-pchelper-fetched-marker"></div>`
            )
            mobilehelper.requestWatchHistory(req, (history) => {
                createFromVideos((history || []))
            })
            return;
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

        if(typeof(history) == "object" && !usePchelper) {
            history.forEach(video => {
                if(video.startsWith("undefined")) {
                    video = video.replace("undefined", "")
                }
                let s = video.split("&")
                let title = s[0]
                let views = s[1]
                let id = s[2]

                if(!views) return;

                if(title.startsWith("undefined")) {
                    title = title.replace("undefined", "")
                }
    
                historyReadable.push({
                    "title": decodeURIComponent(title).trim(),
                    "views": views,
                    "id": id
                })
            })
            createFromVideos(historyReadable)
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

        // create html
        function createFromVideos(historySource) {
            let hasContinuation = historySource.filter(s => {
                return s && s.type == "continuation"
            })[0]
            if(hasContinuation) {
                historySource = historySource.filter(s => {
                    return s && s.type == "video"
                })
            }
            let videosHTML = ``
        
            // foreach and to html
            let isFirstPage = true;
            let pageNum = 0;
            if(req.query.display_page
            && !isNaN(parseInt(req.query.display_page))) {
                //pageNum = parseInt(req.query.display_page)
                code = code.split(`lang_userpage_paging_ind 1`).join(
                    `lang_userpage_paging_ind ${parseInt(req.query.display_page)}`
                )
                code = code.replace(
                    `pageNumVisualOffset = 1;`,
                    `pageNumVisualOffset = ${parseInt(req.query.display_page)};`
                )
            }

            splitEvery(historySource, 20).forEach(videosPage => {
                videosHTML += templates.historyParts[0](pageNum, isFirstPage)
                videosPage.forEach(video => {
                    videosHTML += templates.historyVideo(video, req, video.removeToken)
                })
                videosHTML += templates.historyParts[1]
                pageNum++;
                isFirstPage = false;
            })

            if(hasContinuation) {
                code = code.replace(
                    `historyContinuation = "";`,
                    `historyContinuation = "${hasContinuation.token}";`
                )
            }
            code = require("./yt2009loginsimulate")(req, code, true);
            code = code.replace(`<!--yt2009_videos_insert-->`, videosHTML)
            if(usePchelper){
                code = code.split(` - yt2009_page_count`).join("")
            }
            code = code.split(`yt2009_page_count`).join(pageNum)
            code = doodles.applyDoodle(code, req)
            code = languages.apply_lang_to_code(code, req)

            res.send(code);
        }
    }
}
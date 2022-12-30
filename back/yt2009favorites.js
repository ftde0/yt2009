/*
=======
/my_favorites handler
=======

yt2009, 2022
*/

const utils = require("./yt2009utils")
const fs = require("fs")
const page = fs.readFileSync("../favorites.htm").toString()

module.exports = {
    "apply": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }
        
        let code = page;

        // shows tab
        if(req.headers.cookie.includes("shows_tab")) {
            code = code.replace(`<a href="/channels">Channels</a>`, `<a href="/channels">Channels</a><a href="#">Shows</a>`)
        }

        // czytamy ulubione

        let favorites = ""
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("favorites")) {
                    favorites = decodeURIComponent(cookie.trimStart().replace("favorites=", "")).split(":")
                }
            })
        }
        catch(error) {}
        let readable = []

        if(typeof(favorites) == "object") {
            favorites.forEach(video => {
                let s = video.split("&")
                let title = s[0]
                let views = s[1]
                let id = s[2]

                if(!views) return;
    
                readable.push({"title": decodeURIComponent(title), "views": views, "id": id})
            })
        }
        

        // splitujemy co 20 na strony

        function splitEvery(array, num) {
            let tr = []
            let tempArray = []
            array.forEach(el => {
                tempArray.push(el)
                if(tempArray.length == num || array.indexOf(el) == array.length - 1) {
                    tr.push(tempArray)
                    tempArray = []
                }
            })
        
            return tr;
        }

        let videosHTML = ``
        
        // foreach i pod htmla
        let pageNum = 0;

        splitEvery(readable, 20).forEach(videosPage => {

            videosHTML += `
        <tbody id="videos" class="videos-page videos-page-${pageNum} ${pageNum !== 0 ? "hid" : ""}">
            <tr>
                <td colspan="2">
        `

        videosPage.forEach(video => {
            videosHTML += `
                    <div class="video" style="float: left; margin: 15px 0 0 0; padding: 10px 0 10px 10px; width: 150px;">
                        <div style="float: left;">
                            <div style="float: left;">
                                <input type="checkbox" class="checkbox" value="${video.id}" />
                            </div>
                        </div>
                        <div style="float: left; width: 120px;">
                            <a href="/watch?v=${video.id}" class="video-thumb"><img src="http://i.ytimg.com/vi/${video.id}/hqdefault.jpg"/></a>
                            <a href="/watch?v=${video.id}" class="title" style="display: block; color: #03c;">${video.title}</a>
                            <div class="video-stats">
                                <div class="video-stat"><span class="stat-views">Views: ${video.views}</span></div>
                                <div class="video-stat"><span class="stat-rating"><img class="yt-rating-5.0" src="/assets/site-assets/pixel-vfl73.gif" alt="5.0" /></span></div>
                            </div>
                        </div>
                    </div>`;
        })
            
        
            videosHTML += `
                </td>
            </tr>
        </tbody>`

            pageNum++;
        })

        /*let flags = req.query.flags || ""
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("mainpage_flags")) {
                    flags += cookie.trimStart().replace("mainpage_flags=", "").split(":").join(";")
                }
            })
        }
        catch(error) {}*/

        code = require("./yt2009loginsimulate")(req, code);
        code = code.replace(`<!--yt2009_videos_insert-->`, videosHTML)
        code = code.split(`yt2009_page_count`).join(pageNum)

        res.send(code);
    }
}
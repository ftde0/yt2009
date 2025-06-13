/*
=======
/my_favorites handler
=======

yt2009, 2022-2023
*/

const utils = require("./yt2009utils")
const fs = require("fs")
const templates = require("./yt2009templates")
const page = fs.readFileSync("../favorites.htm").toString()
const doodles = require("./yt2009doodles")
const languages = require("./language_data/language_engine")
const mobilehelper = require("./yt2009mobilehelper")

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
                `<a href="/channels">lang_channels</a>`,
                `<a href="/channels">lang_channels</a><a href="#">lang_shows</a>`
            )
        }

        // read favorites from cookies
        let favorites = ""
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("favorites=")) {
                    favorites = decodeURIComponent(
                        cookie.trimStart().replace("favorites=", "")
                    ).split(":")
                }
            })
        }
        catch(error) {}
        let readable = []

        if(!favorites.includes("PCHELPER_MANAGED")) {
            code = code.split(`visible-if-pchelper`).join("hid")
            buildHTML();
        } else if(mobilehelper.hasLogin(req)) {
            let fReq = {
                "headers": req.headers,
                "fake": true,
                "unfiltered": true
            }
            let fRes = {
                "sendStatus": function(s) {res.sendStatus(s);},
                "set": function(name,value){},
                "send": function(data) {
                    let favsFound = false;
                    data.forEach(p => {
                        if(p[1] == "Favorites") {
                            favsFound = p[0]
                        }
                    })

                    if(favsFound) {
                        pchelper_favs(favsFound)
                    } else {
                        buildHTML()
                    }
                }
            }
            mobilehelper.getPlaylists(fReq, fRes)
        } else {
            buildHTML()
        }

        function pchelper_favs(favId) {
            code = code.replace(`pchelper_fav_id`, favId)
            code = code.replace(
                `pchelper_dummies`,
                `<div id="playlist-btn-play"></div>`
            )
            let fReq = {
                "playlistId": favId,
                "originalUrl": "/playlists/" + favId,
                "headers": req.headers
            }
            let fRes = {
                "set": function(name,value){},
                "send": function(data) {
                    data = data.split("<entry>")
                    let vs = []
                    data.forEach(v => {
                        if(v.includes("<feed")) return;
                        let id = v.split(`<yt:videoid id='`)[1].split("'")[0]
                        let title = v.split(`<title type='text'>`)[1].split("</tit")[0]
                        vs.push([
                            encodeURIComponent(title), "EMPTY_ALLOWED", id
                        ].join("&"))
                    })
                    favorites = vs.reverse();
                    buildHTML()
                }
            }
            mobilehelper.pullPlaylistAsUser(fReq, fRes)
        }

        function buildHTML() {
            if(typeof(favorites) == "object") {
                favorites.forEach(video => {
                    let s = video.split("&")
                    try {
                        decodeURIComponent(s[0])
                    }
                    catch(error) {return;}
                    let title = s[0]
                    let views = s[1]
                    let id = s[2]
    
                    if(!views) return;
        
                    readable.push({
                        "title": decodeURIComponent(title),
                        "views": views,
                        "id": id
                    })
                })
            }
            
            // split every 20 for pages
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
            
            // foreach and add to html
            let pageNum = 0;
    
            splitEvery(readable, 20).forEach(videosPage => {
                videosHTML += templates.favoritepage_videocell_part[0](pageNum)
                videosPage.forEach(video => {
                    video.thumbnail = utils.getThumbUrl(video.id, req)
                    videosHTML += templates.subscriptionVideo(
                        video,
                        "",
                        0
                    )
                })
                videosHTML += templates.favoritepage_videocell_part[1]
                pageNum++;
            })
    
            code = require("./yt2009loginsimulate")(req, code, true);
            code = code.replace(`<!--yt2009_videos_insert-->`, videosHTML)
            code = code.split(`yt2009_page_count`).join(pageNum)
            code = doodles.applyDoodle(code, req)
            code = languages.apply_lang_to_code(code, req)
    
            res.send(code);
        }
    }
}
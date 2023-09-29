/*
=======
/my_playlists handler
=======

yt2009, 2022-2033
*/

const utils = require("./yt2009utils")
const template = require("./yt2009templates")
const fs = require("fs")
const page = fs.readFileSync("../playlists.htm").toString()
const doodles = require("./yt2009doodles")
let client_playlists = {}

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

        // render cookie playlists (f_mode)
        if(req.headers.cookie.includes("playlist_index")) {
            let playlistIndexHTML = ``
            let playlistIndex = req.headers.cookie.split("playlist_index=")[1]
                                                    .split(";")[0]
            playlistIndex.split(":").forEach(playlist => {
                if(!playlist) return;
                playlist = decodeURIComponent(playlist)
                playlistIndexHTML += template.playlist(
                    playlist.split(";")[0],
                    playlist.split(";")[1]
                )
            })

            code = code.replace(`<!--yt2009-cookie-playlists-->`, playlistIndexHTML)
        }

        if(req.headers.cookie.includes("f_mode=on")) {
            code = code.replace(
                `<script src="/assets/site-assets/yt2009_userpage_common.js"></script>`,
                `<script src="/assets/site-assets/yt2009_userpage_f.js"></script>`
            )
        }

        code = require("./yt2009loginsimulate")(req, code);
        code = doodles.applyDoodle(code)
        res.send(code);
    }
}
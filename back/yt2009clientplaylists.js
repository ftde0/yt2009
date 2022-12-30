/*
=======
/my_playlists handler
=======

yt2009, 2022
*/

const utils = require("./yt2009utils")
const fs = require("fs")
const page = fs.readFileSync("../playlists.htm").toString()
let client_playlists = {}

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

        // render cookie playlists (f_mode)
        if(req.headers.cookie.includes("playlist_index")) {
            let playlistIndexHTML = ``
            let playlistIndex = req.headers.cookie.split("playlist_index=")[1].split(";")[0]
            playlistIndex.split(":").forEach(playlist => {
                playlist = decodeURIComponent(playlist)
                playlistIndexHTML += `<div class="subfolder" data-id="${playlist.split(";")[1]}" onclick="show_playlist(this)"><a class="name" href="#">${playlist.split(";")[0]}</a></div>`
            })

            code = code.replace(`<!--yt2009-cookie-playlists-->`, playlistIndexHTML)
            code = code.replace(`<script src="/assets/site-assets/yt2009_userpage_common.js"></script>`, `<script src="/assets/site-assets/yt2009_userpage_f.js"></script>`)
        }

        code = require("./yt2009loginsimulate")(req, code);
        res.send(code);
    }
}
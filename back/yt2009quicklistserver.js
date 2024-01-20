/*
=======
/watch_queue handler
=======

yt2009, 2022-2024??
i really need to merge those userpages this is a pain to
maintain
*/

const utils = require("./yt2009utils")
const fs = require("fs")
const page = fs.readFileSync("../quicklist.htm").toString()
const doodles = require("./yt2009doodles")
const languages = require("./language_data/language_engine")

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

        code = require("./yt2009loginsimulate")(req, code, true);
        code = doodles.applyDoodle(code)
        code = languages.apply_lang_to_code(code, req)

        res.send(code);
    }
}
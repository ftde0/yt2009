const utils = require("./yt2009utils")
const fs = require("fs")
const page = fs.readFileSync("../inbox.htm").toString()
const doodles = require("./yt2009doodles")

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
        code = require("./yt2009loginsimulate")(req, code);
        code = doodles.applyDoodle(code)

        res.send(code);
    }
}
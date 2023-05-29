const fs = require("fs")
const header = fs.readFileSync("../static_pages/header.html")
const footer = fs.readFileSync("../static_pages/footer.html")
const utils = require("./yt2009utils")
const templates = require("./yt2009templates")

module.exports = {
    "createSite": function(path_to_content, req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }
        req = utils.addFakeCookie(req)
        const content = fs.readFileSync("../static_pages/cropped/" + path_to_content)
        let site = header + content + footer

        if(req.headers.cookie.includes("shows_tab")) {
            // shows tab
            site = site.replace(
                `<a href="/channels">Channels</a>`,
                `<a href="/channels">Channels</a><a href="#">Shows</a>`
            )
        }

        const config = require("./config.json")
        site = site.split(
            `yt2009_http_root_url`
        ).join(`http://${config.ip}:${config.port}/`)

        if(req.query.f == 1 || req.headers.cookie.includes("f_mode")) {
            site = site.replace(`<!DOCTYPE html>`, templates.html4)
            //site = site.replace(`href="#" onclick="document.searchForm.submit(); return false;"`, `href="#"
            //onclick="document.searchForm.submit(); return false;" style="width: 40px;"`)
            //site = site.replace(`<!--yt2009_style_fixes_f-->`, `<link rel="stylesheet" href="/assets/site-assets/f.css">`)
        } else {
            site = site.replace(
                `<!--yt2009_html5_stylesheet-->`,
                `<link rel="stylesheet" href="/assets/site-assets/html5-header.css">`
            )
            site = site.replace(`yt2009_html5_mark`, `html5`)
        }
        site = require("./yt2009loginsimulate")(req, site)
        res.send(site)
    }
}
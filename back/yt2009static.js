const fs = require("fs")
const header = fs.readFileSync("../static_pages/header.html")
const footer = fs.readFileSync("../static_pages/footer.html")
const utils = require("./yt2009utils")
const templates = require("./yt2009templates")
const doodles = require("./yt2009doodles")

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

        // experimental: wordlist-based search suggestions
        // create the list in /wordlist.txt and separate suggestions
        // by newlines to use.
        if(fs.existsSync("../wordlist.txt")) {
            site = site.replace(
                `<!--wordlist_srch-->`,
                `<script src="/assets/site-assets/search-suggestions.js"></script>`
            )
            site = site.replace(
                `<!--yt2009_wordlist_css-->`,
                `<link rel="stylesheet" href="/assets/site-assets/search-suggestions.css">`
            )
        }

        if(req.query.f == 1 || req.headers.cookie.includes("f_mode")) {
            site = site.replace(`<!DOCTYPE html>`, templates.html4)
        } else {
            site = site.replace(
                `<!--yt2009_html5_stylesheet-->`,
                `<link rel="stylesheet" href="/assets/site-assets/html5-header.css">`
            )
            site = site.replace(`yt2009_html5_mark`, `html5`)
        }
        site = require("./yt2009loginsimulate")(req, site)
        site = doodles.applyDoodle(site)
        res.send(site)
    }
}
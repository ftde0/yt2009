const fs = require("fs")
const header = fs.readFileSync("../static_pages/header.html")
const footer = fs.readFileSync("../static_pages/footer.html")
const utils = require("./yt2009utils")
const templates = require("./yt2009templates")
const doodles = require("./yt2009doodles")
const languages = require("./language_data/language_engine")

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

        if(utils.isUnsupportedNode()
        && site.includes(`var usesUnsupportedNode = false;`)) {
            site = site.replace(
                `var usesUnsupportedNode = false;`,
                `var usesUnsupportedNode = true;`
            )
        }

        const config = require("./config.json")
        site = site.split(
            `yt2009_http_root_url`
        ).join(`http://${config.ip}:${config.port}/`)

        // per-site code
        switch(path_to_content) {
            case "insight.html": {
                let formatDate = utils.dateFormat
                let loadTimeId = 7;
                let loadCurrentTimeString = "---"
                let dateGroups = [
                    {
                        "6": formatDate(Date.now() - (1000 * 60 * 60 * 24 * 7)) + " - " + formatDate(Date.now()),
                        "7": formatDate(Date.now() - (1000 * 60 * 60 * 24 * 28)) + " - " + formatDate(Date.now()),
                        "13": formatDate(Date.now() - (1000 * 60 * 60 * 24 * 90)) + " - " + formatDate(Date.now()),
                        "14": formatDate(Date.now() - (1000 * 60 * 60 * 24 * 365)) + " - " + formatDate(Date.now())
                    },
                    {
                        "12": "This month",
                        "22": "Last month",
                        "23": "2 months prior"
                    },
                    {
                        "1": "Whole period"
                    }
                ]
                // render dates
                let dateHTML = ``
                dateGroups.forEach(dg => {
                    for(let date in dg) {
                        if(date == loadTimeId) {
                            loadCurrentTimeString = dg[date]
                        }
                        dateHTML += `<li><a href="#" onclick="loadDate(${date},this);return false;">${dg[date]}</a></li>`
                    }
                    dateHTML += "<hr>"
                })
                site = site.replace(
                    "yt2009_insight_load_time", loadCurrentTimeString
                )
                site = site.replace(
                    `<!--yt2009_insight_dates-->`, dateHTML
                )
                break;
            }
        }

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
        site = doodles.applyDoodle(site, req)
        site = languages.apply_lang_to_code(site, req)
        res.send(site)
    }
}
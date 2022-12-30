const fs = require("fs")
const header = fs.readFileSync("../static_pages/header.html")
const footer = fs.readFileSync("../static_pages/footer.html")
const utils = require("./yt2009utils")

module.exports = {
    "createSite": function(path_to_content, req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }
        const content = fs.readFileSync("../static_pages/cropped/" + path_to_content)
        let site = header + content + footer

        if(req.headers.cookie.includes("shows_tab")) {
            // shows tab
            site = site.replace(`<a href="/channels">Channels</a>`, `<a href="/channels">Channels</a><a href="#">Shows</a>`)
        }

        if(req.query.f == 1 || req.headers.cookie.includes("f_mode")) {
            site = site.replace(`href="#" onclick="document.searchForm.submit(); return false;"`, `href="#"
            onclick="document.searchForm.submit(); return false;" style="width: 40px;"`)
            site = site.replace(`<!--yt2009_style_fixes_f-->`, `<link rel="stylesheet" href="/assets/site-assets/f.css">`)
        }
        site = require("./yt2009loginsimulate")(req, site)
        res.send(site)
    }
}
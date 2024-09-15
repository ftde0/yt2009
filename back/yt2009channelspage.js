/*
=======
/channels handler
=======

yt2009, 2022-2023
*/

const fs = require("fs")
const page = fs.readFileSync("../channels.htm").toString()
const channels = require("./yt2009channels")
const utils = require("./yt2009utils")
const templates = require("./yt2009templates")
const doodles = require("./yt2009doodles")
const languages = require("./language_data/language_engine")

module.exports = {
    "apply": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }

        let flags = req.query.flags || ""
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("mainpage_flags")) {
                    flags += cookie.trimStart().replace("mainpage_flags=", "")
                                               .split(":").join(";")
                }
            })
        }
        catch(error) {}
       
        let code = page;
        let pageNumber = parseInt(req.query.p || 1)

        // resetflags=1
        if(req.query.resetflags == 1) {
            flags = ""
        }

        // shows tab
        if(req.headers.cookie.includes("shows_tab")) {
            code = code.replace(
                `<a href="/channels">lang_channels</a>`,
                `<a href="/channels">lang_channels</a><a href="#">lang_shows</a>`
            )
        }

        code = require("./yt2009loginsimulate")(req, code)

        let channelList = channels.get_saved_channels().slice(
            20 * (pageNumber - 1), 20 * (pageNumber - 1) + 24
        )
        let listedChannels = []
        let index = 0;
        let channelsHTML = ``
        for(let channel in channelList) {
            if(!listedChannels.includes(channel)) {
                listedChannels.push(channel)
                channel = channelList[channel]
                index++;
            }
        }

        listedChannels.forEach(channel => {
            channel = channelList[channel]

            let channelName = flags.includes("remove_username_space")
                            ? channel.name.split(" ").join("") : channel.name

            channelsHTML += templates.channelspageChannel(channel, channelName)
        })

        // paging
        let pagingHTML = `
        <div class="searchFooterBox">
            <div class="pagingDiv">
                <span class="pagerLabel smallText label">lang_channelpage_pages</span>`
        let pageNumbers = [
            pageNumber - 2,
            pageNumber - 1,
            pageNumber,
            pageNumber + 1,
            pageNumber + 2
        ]
        if(pageNumbers[1] >= 1) {
            pagingHTML += `<a href="?p=${pageNumber - 1}" class="pagerNotCurrent">lang_channelpage_prev</a>`
        }
        let addedPages = []
        pageNumbers.forEach(page => {
            if(page > 0) {
                if(page == pageNumber) {
                    pagingHTML += `<span class="pagerCurrent">${page}</span>`
                } else {
                    pagingHTML += `<a href="?p=${page}" class="pagerNotCurrent">${page}</a>`
                }
                addedPages.push(page)
            }
        })
        while(addedPages.length !== 5) {
            let lastPage = addedPages[addedPages.length - 1]
            let p = lastPage + 1
            addedPages.push(lastPage + 1)
            pagingHTML += `<a href="?p=${p}" class="pagerNotCurrent">${p}</a>`
        }
        pagingHTML += `<a href="?p=${pageNumber + 1}" class="pagerNotCurrent">lang_channelpage_next</a>`
        pagingHTML += `
            </div>
        </div>`

        // final
        code = code.replace(`<!--yt2009_channels_insert-->`, channelsHTML + pagingHTML)
        code = doodles.applyDoodle(code)
        code = languages.apply_lang_to_code(code, req)

        res.send(code)
    }
}
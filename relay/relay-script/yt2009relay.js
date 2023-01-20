const express = require("express")
const cors = require("cors")
const fetch = require("node-fetch")
const fs = require("fs")
const ytdl = require("ytdl-core")
const utils = require("./utils")
const config = require("./config.json")
let userdata = {}
if(fs.existsSync("userdata.json")) {
    userdata = JSON.parse(fs.readFileSync("userdata.json").toString())
    console.log("userdata file exists, no need to create")
}
const browserHeaders = {
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    "cookie": config.cookie,
    "dnt": "1",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "user-agent": config.useragent
}


const app = express();
app.listen(config.port, () => {
    console.log(`yt2009relay server started!! port ${config.port}`);
});
app.use(express.static("./vidstorage/"))
app.use(cors()) // make it work!!!

/*
=======
first run, create userdata files
=======
*/
if(!fs.existsSync(`userdata.json`)) {
    let key = ""
    while(key.length !== 6) {
        key += "qwertyuiopasdfghjklzxcvbnm1234567890".split("")
                [Math.floor(Math.random() * 36)]
    }
    console.log(`yt2009relay first time run: access code: ${key},
use it on (frontend url)/relay/link.htm`)
    let initialUserdata = {
        "code": key
    }
    // fetch mainpage with cookies for signed in data
    fetch("https://www.youtube.com/", {
        "headers": browserHeaders
    }).then(r => {r.text().then(r => {
        let itApiKey = r.split(`"INNERTUBE_API_KEY":"`)[1].split(`"`)[0]
        let itContext = JSON.parse(
            r.split(`"INNERTUBE_CONTEXT":`)[1].split(`}}`)[0] + "}}"
        )
        let itSession = r.split(`"DELEGATED_SESSION_ID":"`)[1].split(`"`)[0]
        initialUserdata.itKey = itApiKey;
        initialUserdata.itContext = itContext;
        initialUserdata.session = itSession;
        // cache username + handle (if available)
        console.log(JSON.stringify(utils.createInnertubeHeaders(
            config.cookie,
            itContext,
            itSession,
            config.useragent
        )))
        fetch(`https://www.youtube.com/youtubei/v1/account/account_menu?key=${itApiKey}`, {
            "headers": utils.createInnertubeHeaders(
                config.cookie,
                itContext,
                itSession,
                config.useragent
            ),
            "method": "POST",
            "body": JSON.stringify({
                "context": itContext,
                "deviceTheme": "DEVICE_THEME_SUPPORTED",
                "userInterfaceTheme": "USER_INTERFACE_THEME_DARK"
            })
        }).then(res => {res.json().then(res => {
            let username = res.actions[0].openPopupAction
                            .popup.multiPageMenuRenderer.header
                            .activeAccountHeaderRenderer.accountName
                            .simpleText
            let handle = res.actions[0].openPopupAction
                            .popup.multiPageMenuRenderer.header
                            .activeAccountHeaderRenderer.channelHandle
                            .simpleText
            initialUserdata.usernameCache = username;
            initialUserdata.handleCache = handle;
            fs.writeFileSync("userdata.json", JSON.stringify(initialUserdata))
            userdata = initialUserdata;
            console.log("created userdata, saved to userdata.json")
        })})
    })})
} else {
    userdata = JSON.parse(
        fs.readFileSync(`userdata.json`).toString()
    )
}

/*
=======
test relay
=======
*/
app.get("/relay_test_auth", (req, res) => {
    console.log("\nrelay authorization test running")
    if(req.headers.auth == userdata.code) {
        res.sendStatus(200)
        console.log("relay test: authorization successful!")
        return;
    } else {
        res.sendStatus(401)
        console.log("relay test: fail (wrong key?)")
        return;
    }
})

/*
=======
test yt connection
=======
*/
app.get("/relay_test_yt", (req, res) => {
    if(req.headers.auth !== userdata.code) {
        res.sendStatus(401)
        return;
    }
    if(userdata.usernameCache) {
        res.send(userdata.usernameCache)
    } else {
        res.send(404)
    }
})
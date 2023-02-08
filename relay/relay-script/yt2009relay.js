const express = require("express")
const cors = require("cors")
const fetch = require("node-fetch")
const fs = require("fs")
const ytdl = require("ytdl-core")
const utils = require("./utils")
const config = require("./config.json")
let userdata = {
    "itKey": "",
    "itContext": {},
    "session": "",
    "usernameCache": "",
    "handleCache": "@h"
}
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
app.use(express.raw({
    "type": () => true
}))

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
        res.send({
            "username": userdata.usernameCache,
            "handle": userdata.handleCache
        })
    } else {
        res.send(404)
    }
})


/*
=======
relay settings update
=======
*/
app.post("/apply_relay_settings", (req, res) => {
    if(req.headers.auth !== userdata.code || !userdata.usernameCache) {
        res.sendStatus(401)
        return;
    }
    let guideCache = {}
    let settings = JSON.parse(req.body.toString()).settings
    // if required, fetch guide for playlists and subs first
    if(settings.includes("relay-playlists-sync")
    || settings.includes("relay-sub-sync")) {
        utils.fetchGuide(
            config.cookie,
            userdata.itContext,
            userdata.session,
            config.useragent,
            userdata.itKey,
            (data) => {
                guideCache = data;
                fs.writeFileSync("test.json", JSON.stringify(data))
                applySettings()
            }
        )
    } else {
        applySettings()
    }

    // and THEN apply the settings
    function applySettings() {
        userdata.uiSettings = settings;
        settings.forEach(setting => {
            switch(setting) {
                // per-setting handling

                // import playlists
                case "relay-playlists-sync": {
                    let playlists = []
                    // get to array
                    // I HATE THIS.
                    guideCache.items.forEach(item => {
                        if(item.guideSectionRenderer) {
                            item.guideSectionRenderer.items.forEach(
                                sectionRenderer => {
                                if(sectionRenderer
                                   .guideCollapsibleSectionEntryRenderer) {
                                    sectionRenderer
                                    .guideCollapsibleSectionEntryRenderer
                                    .sectionItems.forEach(sectionItem => {
                                        if(sectionItem
                                           .guideCollapsibleEntryRenderer) {
                                            handleExpandableItems(
                                                sectionItem
                                                .guideCollapsibleEntryRenderer
                                                .expandableItems
                                            )
                                        }
                                    })
                                }
                            })
                        }
                    }) 
                    // move over the further handle so this doesnt pile up
                    // infinitely
                    function handleExpandableItems(expandableItems) {
                        expandableItems.forEach(item => {
                            item = item.guideEntryRenderer
                            if(item.icon.iconType == "PLAYLISTS") {
                                playlists.push({
                                    "name": item.formattedTitle.simpleText,
                                    "id": item.entryData
                                          .guideEntryData.guideEntryId
                                })
                            }
                        })
                    }
                    userdata.playlists = playlists
                    break;
                }

                // import subscriptions
                case "relay-sub-sync": {
                    let subscriptions = []
                    guideCache.items.forEach(section => {
                        if(section.guideSubscriptionsSectionRenderer) {
                            section = section.guideSubscriptionsSectionRenderer
                            section.items.forEach(item => {
                                // channels!! (hope)
                                if(item.guideEntryRenderer) {
                                    item = item.guideEntryRenderer
                                    addSubscription(item)
                                } else if(item.guideCollapsibleEntryRenderer) {
                                    item = item.guideCollapsibleEntryRenderer
                                    // more items!!!
                                    item.expandableItems.forEach(subscription => {
                                        subscription = subscription
                                                       .guideEntryRenderer
                                        if(!subscription.icon) {
                                            addSubscription(subscription)
                                        }
                                        
                                    })
                                }
                            })
                        }
                    })

                    // actually push a subscription
                    function addSubscription(item) {
                        if(item.guideEntryRenderer) {
                            item = item.guideEntryRenderer
                        }
                        subscriptions.push({
                            "creator": item.formattedTitle.simpleText,
                            "id": item.entryData.guideEntryData
                                  .guideEntryId,
                            "url": item.navigationEndpoint
                                          .browseEndpoint
                                          .canonicalBaseUrl
                        })
                    }
                    userdata.subscriptions = subscriptions
                    break;
                }
            }
        })
        fs.writeFileSync("./userdata.json", JSON.stringify(userdata))
    }


    let response = {}
    if(userdata.subscriptions) {
        response.subscriptions = userdata.subscriptions
    }
    if(userdata.playlists) {
        response.playlists = userdata.playlists
    }
    res.send(response)
    
})

/*
=======
comment
=======
*/
app.post("/comment_post", (req, res) => {
    if(req.headers.auth !== userdata.code || !userdata.usernameCache) {
        res.sendStatus(401)
        return;
    }
    let commentText = JSON.parse(req.body.toString()).comment
    let id = req.headers.source.split("v=")[1].split("&")[0].split("#")[0]
    utils.commentParamFromVideoId(
        id, config.cookie,
        userdata.itContext,
        userdata.session,
        config.useragent,
        userdata.itKey,
    (data) => {
        setTimeout(function() {
            fetch(`https://www.youtube.com/youtubei/v1/comment/create_comment?key=${userdata.itKey}`, {
                "headers": utils.createInnertubeHeaders(
                    config.cookie,
                    userdata.itContext,
                    userdata.session,
                    config.useragent
                ),
                "method": "POST",
                "body": JSON.stringify({
                    "context": userdata.itContext,
                    "commentText": commentText,
                    "createCommentParams": data
                })
            }).then(r => {r.json().then(r => {
                res.send("")
                console.log(`comment posted via relay to ${id}, with text ${commentText}`)
            })})
        }, 1753)
    })
})
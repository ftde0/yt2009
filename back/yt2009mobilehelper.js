const fs = require("fs")
const config = require("./config.json")
const templates = require("./yt2009templates")
const fetch = require("node-fetch")
const userdata_fname = "./mobilehelper_userdata.json"
const utils = require("./yt2009utils")
const create_comment_pb = require("./proto/create_comment_pb")
const mobileflags = require("./yt2009mobileflags")
const watchNext = require("./proto/watchNextFeed_pb")
const protobufNextReq = require("./proto/android_next_pb")
const protoAnalytics = require("./proto/analytics_screen_request_pb")
const metadataUpdate = require("./proto/android_metadata_update_pb")
const userMetadata = require("./proto/android_user_metadata_pb")
const customChannel = require("./proto/yt2009_channel_pb")
const androidHeaders = {
    "Accept": "*/*",
    "Accept-Language": "en-US;q=0.7,en;q=0.3",
    "Content-Type": "application/json",
    "x-goog-authuser": "0",
    "x-origin": "https://www.youtube.com/",
    "user-agent": "com.google.android.youtube/19.02.39 (Linux; U; Android 14) gzip"
}
const upUA = [
    "com.google.android.youtube/1552803264",
    "(Linux; U; Android 10; en_US; Android SDK built for x86;",
    "Build/QSR1.190920.001; Cronet/133.0.6876.3)"
].join(" ")
const upInitial = JSON.stringify({
    "deviceDisplayName":"GOOGLE Android SDK built for x86",
    "fileId":"goog-edited-video:\\/\\/generated?videoFileUri=content%3A%2F%2Fmedia%2Fexternal%2Fvideo%2Fmedia%2F29",
    "mp4MoovAtomRelocationStatus":"UNNECESSARY",
    "transcodeResult":"DISABLED",
    "connectionType":"WIFI"
})
const androidContext = {
    "client": {
        "hl": "en",
        "clientName": "ANDROID",
        "clientVersion": "19.02.39",
        "androidSdkVersion": 34
    }
}
const genericDefault = fs.readFileSync(
    "../mobile/mobilehelper/generic_default.xml"
).toString().split("{url}").join(`${config.ip}:${config.port}`)
const uida = "1234567890abcde".split("")
let genericDg = fs.readFileSync("../mobile/mobilehelper/generic_dg.txt").toString()
let userdata = {"ikmc": 1}
let initedSessions = []
if(fs.existsSync(userdata_fname)) {
    try {
        userdata = JSON.parse(fs.readFileSync(userdata_fname).toString())
    }
    catch(error){}
} else {
    fs.writeFileSync(userdata_fname, "{\"ikmc\":1}")
}

module.exports = {
    "set": function(app) {
        app.get("/gsign", (req, res) => {
            if(req.headers["user-agent"]
            && (req.headers["user-agent"].toLowerCase().includes("android")
            || req.headers["user-agent"].toLowerCase().includes("ios")
            || req.headers["user-agent"].toLowerCase().includes("iphone")
            || req.headers["user-agent"].toLowerCase().includes("ipad"))) {
                if(req.query.device && req.query.device.length <= 7) {
                    if(!initedSessions.includes(req.query.device)) {
                        initedSessions.push(req.query.device)
                        setTimeout(() => {
                            initedSessions = initedSessions.filter(
                                s => s !== req.query.device
                            )
                        }, 3600000)
                    }
                    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>*{font-family: sans-serif;}body{text-align:center;}.g{color:#666;}</style>
</head>
<body>
    <h1>visit this website on a PC!</h1>
    <h2 class="g">http://${config.ip}:${config.port}/gsign</h2>
    <h1>device code:</h1>
    <h1 class="g">${req.query.device}</h1>
</body>
</html>`)
                } else {
                    res.sendStatus(400);
                }
                return;
            }


            let code = fs.readFileSync(
                "../mobile/mobilehelper/pc_connect.html"
            ).toString()
            res.send(code)
        })

        app.get("/gsign_inited", (req, res) => {
            if(!req.headers.device) {
                res.sendStatus(400)
                return;
            }

            if(req.headers.device
            && initedSessions.includes(req.headers.device)) {
                res.send("1")
            } else if(req.headers.device
            && userdata[req.headers.device]){
                res.send("2")
            } else {
                res.send("0")
            }
        })

        app.post("/gsign_submit", (req, res) => {
            let body = ""
            if(!req.headers.device
            || req.headers.device.length > 7) {
                res.sendStatus(400);
                return;
            }
            let device = req.headers.device
            if(!req.body
            || !req.body.toString().includes("\x00")
            || !req.body.toString().includes("\x01")) {
                res.sendStatus(400);
                return;
            }

            body = req.body.toString();
            let email = body.split("\x00")[0]
            let token = body.split("\x00")[1].split("\x01").join("")
            token = token.split("").reverse().join("")

            pullFirstGoogleAuth(email, token, (data) => {
                if(!data) {
                    res.status(500)
                    res.send("1")
                    return;
                }

                userdata[device] = {
                    "email": encryptWithIk(email)
                }

                for(let entry in data) {
                    userdata[device][entry] = data[entry]
                }

                pullYouTubeAuth(userdata[device], (data) => {
                    if(!data) {
                        res.status(500)
                        res.send("2")
                        return;
                    }

                    for(let entry in data) {
                        userdata[device][entry] = data[entry]
                    }

                    initedSessions = initedSessions.filter(
                        s => s !== device
                    )

                    pullYouTubeAccounts(userdata[device], (data) => {
                        for(let entry in data) {
                            userdata[device][entry] = data[entry]
                        }
                        userdata[device].refDevice = device;
                        userdata[device].isFirst = true;
                        fs.writeFileSync(userdata_fname, JSON.stringify(userdata))
                        res.sendStatus(200)
                    })
                })
            })
        })

        app.get("/gsign_get_devices", (req, res) => {
            if(!req.headers.device
            && req.headers.cookie
            && req.headers.cookie.includes("pchelper_user=")) {
                // ie fallback
                req.headers.device = req.headers.cookie
                                     .split("pchelper_user=")[1]
                                     .split(";")[0].trim()
                req.headers.mode = "pchelper"
            }

            if(!req.headers.device
            || req.headers.device.length > 7) {
                res.sendStatus(400);
                return;
            }

            let device = req.headers.device
            if(!userdata[device]) {
                res.sendStatus(400);
                return;
            }

            let dataSent = false;
            refreshTube(device, () => {
                pullAllYouTubeAccounts(userdata[device], (data) => {
                    if(req.headers.mode == "pchelper") {
                        let t = templates.pchelper_accounts(data)
                        res.send(t)
                        return;
                    }
                    dataSent = true;
                    res.send(data)
                })
            })
            
            setTimeout(() => {
                if(!dataSent && req.headers.mode == "pchelper") {
                    const joinedMsg = [
                        "timed out waiting for your accounts.",
                        "make sure you have at least 1 youtube channel",
                        "added to this account. if so,",
                        "try refreshing this page. if it doesn't work,",
                        "try removing your pchelper_user cookie",
                        "and readding your account."
                    ].join(" ")
                    try {res.send(joinedMsg)}catch(error) {}
                }
            }, 5000)
        })

        app.post("/gsign_set", (req, res) => {
            if(!req.headers.device
            && req.query.device) {
                req.headers.device = req.query.device;
            }
            if(!req.headers.uid
            && req.query.uid) {
                req.headers.uid = req.query.uid
            }
            if(!req.headers.username
            && req.query.username) {
                req.headers.username = decodeURIComponent(req.query.username)
            }
            if(!req.headers.first
            && req.query.first) {
                req.headers.first = true
            }

            if(!req.headers.device
            || req.headers.device.length > 7
            || !req.headers.uid
            || !req.headers.username) {
                res.sendStatus(400);
                return;
            }
    
            let device = req.headers.device
            if(!userdata[device]) {
                res.sendStatus(400);
                return;
            }

            userdata[device].pageId = req.headers.uid;
            userdata[device].cachedName = req.headers.username
            if(req.headers.first) {
                userdata[device].isFirst = true;
            } else {
                userdata[device].isFirst = false;
            }
            fs.writeFileSync(userdata_fname, JSON.stringify(userdata))

            res.send("")
        })

        app.post("/create_pchelper", (req, res) => {
            let devId = ""
            function createDevId() {
                devId = ""
                while(devId.length !== 7) {
                    devId += uida[Math.floor(Math.random() * uida.length)]
                }
            }
            createDevId()
            while(initedSessions.includes(devId)
            || this.hasLogin(devId)) {
                createDevId()
            }

            res.send([
                "ok=true",
                "pchelper_user=" + devId,
                "instance=" + config.ip
            ].join("&"))
        })

        app.get("/pull_pchelper", (req, res) => {
            if(pullDeviceId(req) && this.hasLogin(req)) {
                res.sendStatus(200)
                return;
            }
            res.sendStatus(401);
        })
    },

    "handle_recommendations": function(req, res) {
        let deviceId = pullDeviceId(req)
        if(deviceId && !userdata[deviceId]) {
            let r = templates.gdata_feedStart;
            
            r += templates.gdata_feedVideo(
                "12345678911",
                "open this video to complete your yt2009 sign in",
                "completesignin", "1", "1",
                `open the link below for more information on completing sign in to your google account on a yt2009 app.
you will need a PC with a modern browser for this.

[!] only do this for instances you trust.

currently used instance: ${config.ip}

complete sign in:
http://${config.ip}:${config.port}/gsign?device=${deviceId}`,
                "1900-01-01", "-", "-", "", ""
            )

            r += templates.gdata_feedEnd;

            res.set("content-type", "application/xml")
            res.send(r)
        } else if(deviceId && userdata[deviceId]) {
            let rt = templates.gdata_feedStart;
            setupYouTube(deviceId, (h) => {
                fetch("https://www.youtube.com/youtubei/v1/browse", {
                    "method": "POST",
                    "headers": h,
                    "body": JSON.stringify({
                        "context": androidContext,
                        "browseId": "FEwhat_to_watch"
                    })
                }).then(r => {r.json().then(r => {
                    let vl = []
                    let targetVids = 25
                    if(req.targetVids) {
                        targetVids = req.targetVids;
                    }
                    let addedIds = []
                    try {
                        r = r.contents.singleColumnBrowseResultsRenderer.tabs[0]
                             .tabRenderer.content.sectionListRenderer.contents;
                    }
                    catch(error) {
                        res.send(templates.gdata_emptyfeed);
                    }
                    r.forEach(s => {
                        try {
                            if(!s.shelfRenderer) return;
                            s = s.shelfRenderer.content.horizontalListRenderer
                                 .items;
                            s.forEach(i => {
                                if(i.gridVideoRenderer
                                && !addedIds.includes(i.gridVideoRenderer.videoId)) {
                                    vl.push(i.gridVideoRenderer)
                                    addedIds.push(i.gridVideoRenderer.videoId)
                                }
                            })
                        }
                        catch(error){console.log(error)}
                    })

                    let videoList = vl.slice(0, targetVids)

                    function applyData() {
                        videoList.forEach(v => {
                            if(!v.shortBylineText || !v.lengthText
                            || !v.viewCountText) return;
                            let a = v.shortBylineText.runs[0]
                            let handle = false;

                            try {
                                let c = a.navigationEndpoint.browseEndpoint
                                        .canonicalBaseUrl;
                                if(c.startsWith("/@")) {
                                    handle = c.split("/@")[1];
                                }
                            }
                            catch(error){}

                            if(handle) {
                                a = handle;
                            } else {
                                a = utils.asciify(a.text)
                            }

                            try {
                                let title = v.originalTitle
                                         || v.title.runs[0].text
                                rt += templates.gdata_feedVideo(
                                    v.videoId, title, a,
                                    utils.bareCount(v.viewCountText.runs[0].text),
                                    utils.time_to_seconds(
                                        v.lengthText.runs[0].text
                                    ),
                                    "-", utils.relativeToAbsoluteApprox(
                                        v.publishedTimeText.runs[0].text
                                    ), "-", "-", mobileflags.get_flags(req).watch
                                )
                                //console.log("successfully added video " + v.videoId)
                            }
                            catch(error){}
                        })

                        rt += templates.gdata_feedEnd;
                        res.set("content-type", "application/xml")
                        res.send(rt)
                    }

                    if(config.data_api_key) {
                        function applyOriginalData(apid) {
                            for(let id in apid) {
                                let videoData = apid[id]
                                let rel = videoList.filter(s => {
                                    return s.videoId == id
                                })[0]
                                let i = videoList.indexOf(rel)
                                if(i !== null && i !== undefined && i >= 0) {
                                    videoList[i].originalTitle = videoData.title
                                    videoList[i].dataApi = true;
                                }
                            }
                        }

                        let videoIds = []
                        let requestedParts = ["title"]

                        let fetchesRequired = 1;
                        let fetchesDone = 0;

                        videoList.forEach(v => {videoIds.push(v.videoId)})
                        
                        if(videoIds.length > 50) {
                            let vl2 = videoIds.slice(50)
                            fetchesRequired = 2;
                            videoIds = videoIds.slice(0,50);
                            utils.dataApiBulk(vl2, requestedParts, (apid) => {
                                applyOriginalData(apid)
                                fetchesDone++
                                if(fetchesDone >= fetchesRequired) {
                                    applyData()
                                }
                            })
                        }

                        utils.dataApiBulk(videoIds, requestedParts, (apid) => {
                            applyOriginalData(apid)
                            fetchesDone++
                            if(fetchesDone >= fetchesRequired) {
                                applyData()
                            }
                        })
                    } else {
                        applyData()
                    }
                })})
            })
        } else {
            res.redirect("/feeds/api/standardfeeds/recently_featured")
        }
    },


    "userData": function(req, res) {
        let deviceId = pullDeviceId(req)
        res.set("content-type", "application/xml")
        if(!deviceId) {
            res.send(genericDefault)
            return;
        }

        pullUserIdFromDevice(deviceId, (id) => {
            if(id.type && id.type == "b") {
                let avatar = `http://${config.ip}:${config.port}/${utils.saveAvatar(id.avatar)}`
                res.send(templates.gdata_user(
                    "default", id.username, avatar, 0, 0, 0, 0,
                    mobileflags.get_flags(req).channel
                ))
                return;
            }
            res.redirect("/feeds/api/users/" + id)
        })
    },

    "getSubscriptions": function(req, res) {
        let deviceId = pullDeviceId(req)
        if(!deviceId) {res.sendStatus(400);return;}
        res.set("content-type", "application/xml")
        if(req.headers["user-agent"]
        && (req.headers["user-agent"].includes("/4.1.")
        || req.headers["user-agent"].includes("/4.2."))) {
            res.send(templates.gdata_emptyfeed)
            return;
        }
        let fullRes = templates.gdata_feedStart
        setupYouTube(deviceId, (h) => {
            fetch("https://www.youtube.com/youtubei/v1/browse", {
                "method": "POST",
                "headers": h,
                "body": JSON.stringify({
                    "context": androidContext,
                    "browseId": "FEchannels"
                })
            }).then(r => {r.json().then(r => {
                //fs.writeFileSync("./test.json", JSON.stringify(r))
                r = r.contents.singleColumnBrowseResultsRenderer
                     .tabs[0].tabRenderer.content.sectionListRenderer
                     .contents[0];
                if(r.itemSectionRenderer && r.itemSectionRenderer.contents) {
                    r = r.itemSectionRenderer.contents
                } else if(r.shelfRenderer) {
                    r = r.shelfRenderer.content.verticalListRenderer.items
                }
                if(!r) {
                    res.send(templates.gdata_emptyfeed)
                    return;
                }
                if(req.originalUrl && req.originalUrl.includes("/feeds/")) {
                    r = r.slice(0, 25)
                }
                r.forEach(v => {
                    if(!v.elementRenderer) return;
                    try {
                        v = v.elementRenderer.newElement.type.componentType
                             .model.subscriptionsChannelPageListItemModel
                             .channelListItemData

                        if(!v) return;
                        let name = v.channelName.content;
                        let avatar = "/assets/site-assets/default.png"
                        try {
                            avatar = utils.saveAvatar(
                                v.avatar.avatar.image.sources[0].url
                            )
                        }
                        catch(error){}
                        let id = false;
                        let handle = false;
                        try {
                            function put(browseEndpoint) {
                                if(browseEndpoint) {
                                    c = browseEndpoint
                                    id = c.browseId;
                                    if(c.canonicalBaseUrl
                                    && c.canonicalBaseUrl.includes("/@")) {
                                        handle = c.canonicalBaseUrl.split("/@")[1]
                                    }
                                    handle = decodeURIComponent(handle)
                                }
                            }
                            let command = v.command.innertubeCommand
                            if(command.commandExecutorCommand) {
                                command.commandExecutorCommand
                                .commands.forEach(c => {
                                    if(c.browseEndpoint) {put(c.browseEndpoint)}
                                })
                            } else if(command.browseEndpoint) {
                                put(command.browseEndpoint)
                            }
                            
                        }
                        catch(error){}
                        if(!id) return;
                        fullRes += templates.gdata_subscriptionChannel(
                            name, (req.withAvatars ? avatar : ""), id, handle
                        )
                    }
                    catch(error){console.log(error)}
                })
                fullRes += templates.gdata_feedEnd;
                res.send(fullRes)
            })})
        })
    },


    "getPlaylists": function(req, res) {
        let deviceId = pullDeviceId(req)
        if(!deviceId) {res.sendStatus(400);return;}
        res.set("content-type", "application/xml")
        let fullRes = templates.gdata_feedStart
        let f = []
        setupYouTube(deviceId, (h) => {
            fetch("https://www.youtube.com/youtubei/v1/browse", {
                "method": "POST",
                "headers": h,
                "body": JSON.stringify({
                    "context": androidContext,
                    "browseId": "FEplaylist_aggregation"
                })
            }).then(r => {r.json().then(r => {
                r = r.contents.singleColumnBrowseResultsRenderer.tabs[0]
                     .tabRenderer.content.sectionListRenderer.contents
                r.forEach(s => {
                    try {
                        s = s.itemSectionRenderer.contents[0].elementRenderer
                             .newElement.type.componentType.model
                             .compactPlaylistModel.compactPlaylistData;
                        if(s && s.thumbnail && s.thumbnail.isMix) return;
                        let name = s.metadata.title;
                        let id = s.dragAndDropUrl.split("list=")[1].split("&")[0]
                        if(req.fake) {
                            f.push([id, name])
                        }
                        if(!req.unfiltered &&
                        (name == "Liked videos" || name == "Favorites"
                        || name == "Watch later")) return;
                        let v = s.thumbnail.videoCount;
                        fullRes += templates.gdata_playlistEntry(
                            "you",
                            id,
                            name,
                            v || 1,
                            ""
                        )
                    }
                    catch(error){}
                })

                fullRes += templates.gdata_feedEnd;
                res.send(req.fake ? f : fullRes)
            })})
        })
    },


    "getUploads": function(req, res) {
        let deviceId = pullDeviceId(req)
        res.set("content-type", "application/xml")
        if(!deviceId) {
            res.send(genericDefault)
            return;
        }

        pullUserIdFromDevice(deviceId, (id) => {
            if(id.type && id.type == "b") {
                res.send(templates.gdata_emptyfeed)
                return;
            }
            res.redirect("/feeds/api/users/" + id + "/uploads")
        })
    },

    "personalizedRelated": function(req, res) {
        let device = pullDeviceId(req)
        let protoShortcut = this.parseProtoViewmodelNext
        let videoId = req.originalUrl.split("videos/")[1].split("/related")[0]
        res.set("content-type", "application/xml")
        let fullRes = templates.gdata_feedStart
        setupYouTube(device, (h) => {

            let watchNextMsg = new watchNext.root()
            let watchNextContainer = new watchNext.root.container()
            watchNextContainer.setVideo(videoId)
            watchNextContainer.setZeroint(3)
            watchNextContainer.setThreeint(2)
            watchNextMsg.addC(watchNextContainer)
            watchNextMsg.setWatchnextfeed("watch-next-feed")
            let token = encodeURIComponent(Buffer.from(
                watchNextMsg.serializeBinary()
            ).toString("base64"))

            fetch("https://www.youtube.com/youtubei/v1/next", {
                "method": "POST",
                "headers": h,
                "body": JSON.stringify({
                    "context": androidContext,
                    "continuation": token
                })
            }).then(r => {r.json().then(r => {
                if(JSON.stringify(r).includes("video_lockup_with_attachment.eml")
                && JSON.stringify(r).includes("elementRenderer")) {
                    console.log("viewmodel related; try protobuf request")
                    retryProto()
                    return;
                }
                if(!r.continuationContents) {
                    res.send(templates.gdata_emptyfeed)
                    return;
                }
                r = r.continuationContents.sectionListContinuation.contents[0]
                     .itemSectionRenderer.contents;
                r.forEach(s => {
                    try {
                        s = s.elementRenderer.newElement.type.componentType
                             .model.videoWithContextModel.videoWithContextData
                             .videoData
                        let title = s.metadata.title;
                        let id = s.dragAndDropUrl.split("v=")[1].split("&")[0]
                        let relative = utils.relativeToAbsoluteApprox(
                            s.metadata.metadataDetails.split(" · ")[2]
                        )
                        let length = utils.time_to_seconds(s.thumbnail.timestampText)
                        let views = utils.approxSubcount(
                            s.metadata.metadataDetails.split(" · ")[1].split(" ")[0]
                        )
                        let author = s.avatar.endpoint.innertubeCommand.browseEndpoint
                        if(author.canonicalBaseUrl
                        && author.canonicalBaseUrl.includes("/@")) {
                            author = author.canonicalBaseUrl.split("/@")[1]
                        } else {
                            author = utils.asciify(
                                s.metadata.metadataDetails.split(" · ")[0],
                                true, true
                            )
                            if(!author
                            && s.avatar.endpoint.innertubeCommand
                            .browseEndpoint.browseId) {
                                author = s.avatar.endpoint.innertubeCommand
                                          .browseEndpoint.browseId
                            }
                        }
                        if(!length) return;

                        fullRes += templates.gdata_feedVideo(
                            id, title, author, views, length, "-",
                            relative, "-", "-", mobileflags.get_flags(req).watch
                        )
                    }
                    catch(error){}
                })

                fullRes += templates.gdata_feedEnd;
                res.send(fullRes)
            })})

            function retryProto() {
                let root = new protobufNextReq.root()
                let context = new protobufNextReq.root.contextType()
                let client = new protobufNextReq.root.contextType.clientType()
                client.setClientnumber(3)
                client.setClientversion("19.02.39")
                client.setOsname("Android")
                client.setOsversion("14")
                client.setAndroidsdkversion(34)
                context.addClient(client)
                root.setContinuationtoken(token)
                root.addContext(context)
                let pbmsg = root.serializeBinary()

                h["Content-Type"] = "application/x-protobuf"
                h["x-goog-api-format-version"] = "2"
                fetch("https://youtubei.googleapis.com/youtubei/v1/next", {
                    "method": "POST",
                    "headers": h,
                    "body": pbmsg
                }).then(s => (s.text().then(s => {
                    let videos = protoShortcut(s)
                    let fetchesRequired = 0;
                    let fetchesCompleted = 0;

                    if(config.data_api_key) {
                        fetchesRequired++

                        let videoIds = []
                        let requestedParts = ["viewCount", "publishedAt", "title"]

                        videos.forEach(v => {videoIds.push(v.id)})

                        utils.dataApiBulk(videoIds, requestedParts, (apid) => {
                            for(let id in apid) {
                                let videoData = apid[id]
                                let rel = videos.filter(s => {
                                    return s.id == id
                                })[0]
                                let i = videos.indexOf(rel)
                                if(i !== null && i !== undefined && i >= 0) {
                                    videos[i].upload = videoData.publishedAt
                                    videos[i].views = videoData.viewCount
                                    videos[i].title = videoData.title
                                    videos[i].dataApi = true;
                                }
                            }
                            fetchesCompleted++
                            if(fetchesCompleted >= fetchesRequired) {
                                applyResponse()
                            }
                        })
                    }

                    function applyResponse() {
                        videos.forEach(v => {
                            let author = v.authorHandle || v.authorId || ""
                            fullRes += templates.gdata_feedVideo(
                                v.id, v.title, author, v.views, v.length, "-",
                                v.upload, "-", "-",
                                mobileflags.get_flags(req).watch,
                                null, {"authorFull": v.authorFull,
                                "authorId": v.authorId}
                            )
                        })
                        fullRes += templates.gdata_feedEnd;
                        res.send(fullRes)
                    }
                    if(fetchesCompleted >= fetchesRequired) {
                        applyResponse()
                    }
                })))
            }
        })
    },

    "addToPlaylist": function(req, res) {
        let device = pullDeviceId(req)
        res.set("content-type", "application/xml")
        let playlist = req.originalUrl.split("/playlists/")[1].split("?")[0]
        let v = req.body.toString().split("<id>")[1].split("</id>")[0]
        setupYouTube(device, (h) => {
            fetch("https://www.youtube.com/youtubei/v1/browse/edit_playlist", {
                "headers": h,
                "body": JSON.stringify({
                    "context": androidContext,
                    "playlistId": playlist,
                    "actions": [{
                        "action": "ACTION_ADD_VIDEO",
                        "addedVideoId": v
                    }]
                }),
                "method": "POST"
            }).then(r => {
                res.sendStatus(200);
            })
        })
        //POST http://192.168.1.7/feeds/api/users/default/favorites
        //POST http://192.168.1.7/feeds/api/users/default/watch_later
        //POST http://192.168.1.7/feeds/api/users/default/playlists create pl <yt:private/>
    },

    "removeFromPlaylist": function(req, res) {
        let device = pullDeviceId(req)
        res.set("content-type", "application/xml")
        let playlist = req.originalUrl.split("/playlists/")[1].split("?")[0]
        let v = req.body.toString().split("<id>")[1].split("</id>")[0]
        setupYouTube(device, (h) => {
            fetch("https://www.youtube.com/youtubei/v1/browse/edit_playlist", {
                "headers": h,
                "body": JSON.stringify({
                    "context": androidContext,
                    "playlistId": playlist,
                    "actions": [{
                        "action": "ACTION_REMOVE_VIDEO_BY_VIDEO_ID",
                        "removedVideoId": v
                    }]
                }),
                "method": "POST"
            }).then(r => {
                res.sendStatus(200);
            })
        })
    },

    "addToFavorites": function(req, res) {
        let device = pullDeviceId(req)
        if(!device || !userdata[device]) {res.sendStatus(400);return;}
        res.set("content-type", "application/xml")
        let v = req.body.toString().split("<id>")[1].split("</id>")[0]
        req.fake = true;
        this.getPlaylists(req, {"send": (p) => {
            let favesId = false;
            p.forEach(playlist => {
                if(playlist[1] == "Favorites") {
                    favesId = playlist[0]
                }
            })

            // if there is a favorites playlist, add into it,
            // otherwise create one
            if(favesId) {
                checkAlreadyAdded(favesId)
            } else {
                createPl()
            }
        }, "set": function(s1, s2){}})

        function createPl() {
            setupYouTube(device, (h) => {
                fetch("https://www.youtube.com/youtubei/v1/playlist/create", {
                    "headers": h,
                    "method": "POST",
                    "body": JSON.stringify({
                        "context": androidContext,
                        "privacyStatus": "PUBLIC",
                        "title": "Favorites",
                        "videoIds": [v]
                    })
                }).then(r => {
                    res.redirect("/feeds/api/videos/" + v)
                })
            })
        }

        let pullPlaylistAsUser = this.pullPlaylistAsUser;
        function checkAlreadyAdded(playlistId) {
            // check if video isn't already added to favorites
            let fReq = {
                "playlistId": playlistId,
                "originalUrl": "/playlists/" + playlistId,
                "headers": req.headers
            }
            let fRes = {
                "set": function(name,value){},
                "send": function(data) {
                    data = data.split("<entry>")
                    let vs = []
                    data.forEach(v => {
                        if(v.includes("<feed")) return;
                        let id = v.split(`<yt:videoid id='`)[1].split("'")[0]
                        vs.push(id)
                    })

                    console.log(vs, v)

                    if(!vs.includes(v)) {
                        // not in favorites
                        addToPl(playlistId)
                    } else {
                        // already in favorites
                        res.sendStatus(400)
                    }
                }
            }
            pullPlaylistAsUser(fReq, fRes)
        }

        function addToPl(playlistId) {
            setupYouTube(device, (h) => {
                fetch("https://www.youtube.com/youtubei/v1/browse/edit_playlist", {
                    "headers": h,
                    "body": JSON.stringify({
                        "context": androidContext,
                        "playlistId": playlistId,
                        "actions": [{
                            "action": "ACTION_ADD_VIDEO",
                            "addedVideoId": v
                        }]
                    }),
                    "method": "POST"
                }).then(r => {
                    res.redirect("/feeds/api/videos/" + v)
                })
            })
        }
    },

    "removeFromFavorites": function(req, res) {
        let device = pullDeviceId(req)
        if(!device || !userdata[device]) {res.sendStatus(400);return;}
        res.set("content-type", "application/xml")
        let v = req.body.toString().split("<id>")[1].split("</id>")[0]
        req.fake = true;
        this.getPlaylists(req, {"send": (p) => {
            let favesId = false;
            p.forEach(playlist => {
                if(playlist[1] == "Favorites") {
                    favesId = playlist[0]
                }
            })

            // if there is a favorites playlist, add into it,
            // otherwise create one
            if(favesId) {
                rmPl(favesId)
            } else {
                // removing from nonexistent playlist?
                res.sendStatus(400)
            }
        }, "set": function(s1, s2){}})

        let removeFromPlaylist = this.removeFromPlaylist;
        function rmPl(playlistId) {
            let fReq = {
                "headers": req.headers,
                "originalUrl": "/playlists/" + playlistId,
                "body": req.body.toString()
            }
            let fRes = {
                "set": function(a1, a2) {},
                "sendStatus": function(status) {
                    res.sendStatus(status)
                }
            }
            
            removeFromPlaylist(fReq, fRes)
        }
    },

    "addToWatchLater": function(req, res) {
        let device = pullDeviceId(req)
        if(!device || !userdata[device]) {res.sendStatus(400);return;}
        res.set("content-type", "application/xml")
        let v = req.body.toString().split("<id>")[1].split("</id>")[0]
        setupYouTube(device, (h) => {
            fetch("https://www.youtube.com/youtubei/v1/browse/edit_playlist", {
                "headers": h,
                "body": JSON.stringify({
                    "context": androidContext,
                    "playlistId": "WL",
                    "actions": [{
                        "action": "ACTION_ADD_VIDEO",
                        "addedVideoId": v
                    }]
                }),
                "method": "POST"
            }).then(r => {
                res.sendStatus(200)
            })
        })
    },

    "addComment": function(req, res) {
        let deviceId = pullDeviceId(req)
        if(!userdata[deviceId]) return;
        let id = req.originalUrl.split("/videos/")[1].split("/comments")[0]
        let content = req.body.toString().split("<content>")[1]
                      .split("</content>")[0].split("    ").join("")

        // create comment token
        let commentToken = new create_comment_pb.root()
        commentToken.setVideoid(id)
        commentToken.setSevenint(7)
        let zeroMsg = new create_comment_pb.root.zeroMsg();
        zeroMsg.setZeroint(0)
        commentToken.addFivemsg(zeroMsg)
        let token = encodeURIComponent(Buffer.from(
            commentToken.serializeBinary()
        ).toString("base64"))

        let cachedName = userdata[deviceId].cachedName

        // fill cachedName in if not here
        function pullCachedName(callback) {
            if(!userdata[deviceId].cachedName) {
                pullAllYouTubeAccounts(userdata[deviceId], (data) => {
                    data.forEach(a => {
                        if(a.selected) {
                            cachedName = a.handle || a.name || "."
                        }
                    })
                    callback(cachedName.replace("@", ""))
                })
            } else {
                callback(cachedName)
            }
        }
        
        // post comment
        setupYouTube(deviceId, (h) => {
            pullCachedName((name) => {
                fetch("https://www.youtube.com/youtubei/v1/comment/create_comment", {
                    "method": "POST",
                    "headers": h,
                    "body": JSON.stringify({
                        "context": androidContext,
                        "commentText": content,
                        "createCommentParams": token
                    })
                }).then(r => {r.json().then(r => {
                    res.set("content-type", "application/atom+xml")
                    if(!userdata[deviceId].cachedComments) {
                        userdata[deviceId].cachedComments = []
                    }
                    userdata[deviceId].cachedComments.push([
                        id,
                        name,
                        content,
                        new Date().toISOString()
                    ])
                    res.send(templates.gdata_feedComment(
                        id,
                        name,
                        content,
                        new Date().toISOString()
                    ))
                    fs.writeFileSync(userdata_fname, JSON.stringify(userdata))
                })})
            })
        })
    },

    "pullCommentsByUser": function(req) {
        let deviceId = pullDeviceId(req)
        if(!userdata[deviceId]
        || !userdata[deviceId].cachedComments) return [];
        let data = []
        userdata[deviceId].cachedComments.forEach(c => {
            data.push({
                "video": c[0],
                "name": c[1],
                "content": c[2],
                "date": c[3]
            })
        })
        return data
    },

    "createPlaylist": function(req, res) {
        let deviceId = pullDeviceId(req)
        if(!userdata[deviceId]) return;
        let body = req.body.toString()
        let name = body.split(`<title type='text'>`)[1].split("</title>")[0]
        let addVideos = []
        if(body.includes("<yt:videoid>")) {
            addVideos.push(
                body.split(`<yt:videoid>`)[1].split(`</yt:videoid>`)[0]
            )
        }
        let isPrivate = body.includes("<yt:private")
        setupYouTube(deviceId, (h) => {
            fetch("https://www.youtube.com/youtubei/v1/playlist/create", {
                "headers": h,
                "method": "POST",
                "body": JSON.stringify({
                    "context": androidContext,
                    "privacyStatus": isPrivate ? "PRIVATE" : "PUBLIC",
                    "title": name,
                    "videoIds": addVideos
                })
            }).then(r => {r.json().then(r => {
                let p = r.playlistId;
                //res.send(templates.gdata_emptyfeed)
                res.redirect("/feeds/api/users/you/playlists/" + p)
            })})
        })
    },

    "pullPlaylistAsUser": function(req, res) {
        let deviceId = pullDeviceId(req)
        res.set("content-type", "application/atom+xml")
        if(!userdata[deviceId]) return;
        let playlistId = ""
        if(req.originalUrl.includes("/playlists/")) {
            playlistId = req.originalUrl.split("/playlists/")[1]
                            .split("?")[0];
        } else if(req.playlistId) {
            playlistId = req.playlistId
        }
        
        let videos = []
        let continuationsPulled = 0;

        // add to response
        function createGdata() {
            let fullRes = templates.gdata_feedStart
            fullRes += `<yt:playlistId>${playlistId}</yt:playlistId>`

            videos.forEach(v => {
                try {
                    if(!v.shortBylineText
                    || !v.lengthSeconds
                    || !v.isPlayable) return;
                    let author = v.shortBylineText.runs[0].navigationEndpoint
                                  .browseEndpoint;
                    if(author.canonicalBaseUrl
                    && author.canonicalBaseUrl.includes("/@")) {
                        author = author.canonicalBaseUrl.split("/@")[1]
                    } else {
                        author = author.browseId
                    }
                    fullRes += templates.gdata_feedVideo(
                        v.videoId + "/fav", v.title.runs[0].text, author,
                        "", parseInt(v.lengthSeconds), "-", "", "-",
                        "-", mobileflags.get_flags(req).watch
                    )
                }
                catch(error){}
            })

            fullRes += templates.gdata_feedEnd
            res.send(fullRes)
        }

        function getContinuation(token) {
            setTimeout(() => {
                setupYouTube(deviceId, (h) => {
                    fetch("https://www.youtube.com/youtubei/v1/browse", {
                        "headers": h,
                        "method": "POST",
                        "body": JSON.stringify({
                            "context": androidContext,
                            "continuation": token
                        })
                    }).then(r => {r.json().then(r => {
                        r = r.continuationContents.playlistVideoListContinuation
                        continuationsPulled++
                        r.contents.forEach(v => {
                            if(v.playlistVideoRenderer) {
                                videos.push(v.playlistVideoRenderer)
                            }
                        })
                        if(r.continuations && continuationsPulled <= 2) {
                            let t = r.continuations[0].nextContinuationData.continuation
                            getContinuation(t)
                        } else {
                            createGdata()
                        }
                    })})
                })
            }, 200)
        }

        // pull first request + 2 continuations
        setupYouTube(deviceId, (h) => {
            fetch("https://www.youtube.com/youtubei/v1/browse", {
                "headers": h,
                "method": "POST",
                "body": JSON.stringify({
                    "context": androidContext,
                    "browseId": "VL" + playlistId
                })
            }).then(r => {r.json().then(r => {
                try {
                    r = r.contents.singleColumnBrowseResultsRenderer.tabs[0]
                         .tabRenderer.content.sectionListRenderer.contents[0]
                         .playlistVideoListRenderer;
                }
                catch(error) {
                    createGdata()
                    return;
                }
                if(!r || !r.contents) {
                    createGdata()
                    return;
                }
                r.contents.forEach(v => {
                    if(v.playlistVideoRenderer) {
                        videos.push(v.playlistVideoRenderer)
                    }
                })
                if(r.continuations && continuationsPulled <= 2) {
                    let t = r.continuations[0].nextContinuationData.continuation
                    getContinuation(t)
                } else {
                    createGdata()
                }
            })})
        })
    },

    "rateVideo": function(req, res) {
        let deviceId = pullDeviceId(req)
        let video = req.originalUrl.split("/videos/")[1].split("/rating")[0]
        let state = "like"
        if(req.body.toString() && req.body.toString().includes("dislike")) {
            state = "dislike"
        }
        setupYouTube(deviceId, (h) => {
            fetch("https://www.youtube.com/youtubei/v1/like/" + state, {
                "method": "POST",
                "headers": h,
                "body": JSON.stringify({
                    "context": androidContext,
                    "target": {
                        "videoId": video
                    }
                })
            }).then(r => {
                res.sendStatus(200)
            })
        })
    },

    "outsourceBareVideo": function(req, res) {
        let device = pullDeviceId(req)
        res.send(templates.gdata_feedVideo(
            "12345678911",
            "open this video to complete your yt2009 sign in",
            "completesignin", "1", "1",
            `open the link below for more information on completing sign in to your google account on a yt2009 app.
you will need a PC with a modern browser for this.

[!] only do this for instances you trust.

currently used instance: ${config.ip}

complete sign in:
http://${config.ip}:${config.port}/gsign?device=${device}`,
            "1900-01-01", "-", "-", "", ""
        ))
    },

    "manageSubscription": function(req, res) {
        let device = pullDeviceId(req)
        if(!userdata[device]) {
            res.sendStatus(404);
            return;
        }
        let state = "subscribe"
        let user = ""
        if(!req.body || !req.body.toString().includes("<yt:username>")) {
            res.sendStatus(400);
            return;
        }
        if(req.body.toString().includes("<yt:unsubscribe/>")) {
            state = "unsubscribe"
        }
        user = req.body.toString().split("<yt:username>")[1].split("</yt")[0]
        setupYouTube(device, (h) => {
            function onceIdPull(id) {
                fetch("https://www.youtube.com/youtubei/v1/subscription/" + state, {
                    "headers": h,
                    "method": "POST",
                    "body": JSON.stringify({
                        "context": androidContext,
                        "channelIds": [id]
                    })
                }).then(r => {
                    res.sendStatus(200)
                })
            }

            if(!user.startsWith("UC")) {
                require("./cache_dir/userid_cache").read("/@" + user, (id) => {
                    if(!id) {
                        res.sendStatus(404)
                        return;
                    }
                    onceIdPull(id)
                })
            } else {
                onceIdPull(user)
            }
        })
    },

    "hasLogin": function(req) {
        if(typeof(req) == "string") {
            if(userdata[req]) {
                return true;
            }
            return false;
        }
        let deviceId = pullDeviceId(req)
        if(userdata[deviceId]) {
            return true;
        }
        return false;
    },

    "parseProtoViewmodelNext": function(data) {
        let videos = []
        const cid = [
            "QWERTYUIOPASDFGHJKLZXCVBNM",
            "qwertyuiopasdfghjklzxcvbnm",
            "1234567890_-"
        ].join("").split("")

        //fs.writeFileSync("test.txt", data)

        data.split("video_lockup_with_attachment").forEach(v => {try{
            if(v.includes("vi/") || v.includes("vi_webp/")) {
                // video result
                let id = ""
                try {id = v.split("vi/")[1].split("/")[0].substring(0,11)}
                catch(error) {id = v.split("vi_webp/")[1].split("/")[0].substring(0,11)}
                let authorPicture = "https://yt3.ggpht.com/" 
                                  + v.split("https://yt3.ggpht.com/")[1]
                                     .split(" ")[0]

                let views = v.split(" views")[0]
                views = views.split(" ")[views.split(" ").length - 1]
                if(isNaN(parseInt(views))) return;

                let title = v.split("/watch?v=" + id)[1].split(" - Go to channel")[0]
                title = title.split(" - ").slice(
                    0, title.split(" - ").length - 1
                ).join(" - ")
                if(title.includes("\x01")) {
                    title = title.split("\x01")[title.split("\x01").length - 1]
                } else {
                    title = title.substring(2)
                }
                if(title.includes("\x12")) {
                    title = title.substring(3)
                }
                if(title.length >= 300 || title.includes("\x00")
                || title.includes("\x01") || title.includes("\x02")) return;

                let authorHandle = false
                if(v.includes("/@")) {
                    authorHandle = v.split("/@")[1].split("2+")[0].split("+")[0]
                    authorHandle = decodeURIComponent(authorHandle)
                }
                let authorId = ""
                if(v.includes("UC")) {
                    let ids = v.split("UC")
                    ids.forEach(s => {
                        let pid = s.substring(0,22)
                        if(pid.split("").filter(s => cid.includes(s)).length == 22) {
                            authorId = "UC" + pid;
                        }
                    })
                }

                let authorFull = ""
                try {
                    authorFull = v.split(" · ")[0].split("\u001a")
                    authorFull = authorFull[authorFull.length - 1].substring(1)
                    if(authorFull.includes("\x00")
                    || authorFull.includes("\x12")) {
                        authorFull = authorFull.split("\n")
                        authorFull = authorFull[authorFull.length - 1]
                        authorFull = authorFull.substring(1)
                    }
                }
                catch(error) {
                    //console.log(error)
                }

                let length = v.split(" second")[0]
                if(!v.includes(" second") && v.includes(" minute")) {
                    length = v.split(" minute")[0]
                }
                length = length.split("(")[length.split("(").length - 1]
                               .split(" ")[0]
                length = length.replace(/[^0-9+\:]/g, "")

                if(utils.time_to_seconds(length) >= 7200) return;

                let upload = v.split(" ago")[0]
                upload = upload.split(" · ")[upload.split(" · ").length - 1]
                if(isNaN(parseInt(upload.substring(0,2)))) {
                    upload = "1 minute ago"
                }

                videos.push({
                    "id": id,
                    "title": title,
                    "authorFull": authorFull,
                    "authorHandle": authorHandle,
                    "authorId": authorId,
                    "length": utils.time_to_seconds(length),
                    "views": utils.approxSubcount(views),
                    "authorAvatar": utils.saveAvatar(authorPicture),
                    "upload": utils.relativeToAbsoluteApprox(upload)
                })
            }
        }catch(error){}})

        return videos;
    },

    "unlink": function(req, res) {
        if(!req.query.device || !userdata[req.query.device]) {
            res.sendStatus(400);
            return;
        }
        userdata[req.query.device] = false;
        delete userdata[req.query.device];
        res.status(200);
        fs.writeFileSync(userdata_fname, JSON.stringify(userdata))
        res.send("unlink successful! you can now close this window.")
    },

    "pullOwnVideos": function(req, callback) {
        let device = pullDeviceId(req)
        if(!userdata[device]) {
            res.sendStatus(404);
            return;
        }
        let videos = []
        setupYouTube(device, (h) => {
            fetch("https://www.youtube.com/youtubei/v1/browse", {
                "headers": h,
                "method": "POST",
                "body": JSON.stringify({
                    "context": androidContext,
                    "browseId": "FEmy_videos"
                })
            }).then(r => {r.json().then(r => {
                r.frameworkUpdates.entityBatchUpdate.mutations.forEach(m => {
                    if(m.payload && m.payload.creatorVideoData) {try {
                        let v = m.payload.creatorVideoData
                        let likes = parseInt(v.metrics.likeCount)
                        let dislikes = parseInt(v.metrics.dislikeCount)
                        let comments = v.metrics.commentCount
                        let views = v.metrics.viewCount
                        let added = parseInt(v.timeCreatedSeconds) * 1000
                        let needThumbnail = false
                        if(v.privacy == "VIDEO_PRIVACY_PRIVATE") {
                            let thumb = v.thumbnailDetails.thumbnails.filter(s => {
                                return s.url && s.url.includes("hqdefault")
                            })
                            if(thumb[0]) {
                                needThumbnail = thumb[0].url
                            }
                        }
                        videos.push({
                            "id": v.videoId,
                            "title": v.title,
                            "likes": likes,
                            "dislikes": dislikes,
                            "comments": comments,
                            "views": views,
                            "added": added,
                            "downloadUrl": v.downloadUrl,
                            "time": utils.seconds_to_time(v.lengthSeconds),
                            "privacy": v.privacy,
                            "thumbnail": needThumbnail
                        })
                    }catch(error){}}
                })
                callback(videos)
            })})
        })
    },

    "locAutocomplete": function(req, callback, useHostAccount) {
        if(!req.query.query) {
            callback(false)
        }
        let q = req.query.query
        let device = pullDeviceId(req)
        if(!userdata[device] && !useHostAccount) {
            callback([])
            return;
        }
        function request(h) {
            let root = new protobufNextReq.root()
            let context = new protobufNextReq.root.contextType()
            let client = new protobufNextReq.root.contextType.clientType()
            client.setClientnumber(3)
            client.setClientversion("19.02.39")
            client.setOsname("Android")
            client.setOsversion("14")
            client.setAndroidsdkversion(34)
            context.addClient(client)
            root.setParams(q)
            root.addContext(context)
            let pbmsg = root.serializeBinary()

            h["Content-Type"] = "application/x-protobuf"
            h["x-goog-api-format-version"] = "2"
            fetch("https://youtubei.googleapis.com/youtubei/v1/geo/place_autocomplete", {
                "method": "POST",
                "headers": h,
                "body": pbmsg
            }).then(s => (s.text().then(s => {
                let filteredList = []
                s = s.split("\x1a").filter(e => {return e.includes("ChIJ")})
                s.shift()
                s.forEach(l => {
                    let pname = l.split("\n")
                    let placeId = ""
                    pname.forEach(part => {
                        if(part.startsWith("\x1BChIJ")) {
                            placeId = part.split("\x1B")[1].split("\x12")[0]
                        }
                    })
                    pname = pname[pname.length - 1]
                            .replace(/\p{Other_Symbol}/gui, "")
                    while(pname.length > 0 && pname.charCodeAt(0) < 48) {
                        pname = pname.substring(1)
                    }
                    if(pname.includes("\x12") || pname.length == 0) return;
                    if(filteredList.filter(e => e[1] == pname).length == 0) {
                        filteredList.push([placeId, pname])
                    }
                })

                callback(filteredList)
            })))
        }

        if(!useHostAccount) {
            setupYouTube(device, (h) => {
                request(h)
            })
        } else {
            const account = require("./yt2009androidsignin").getData()
            if(!account || !account.yAuth) {
                callback([])
                return;
            }
            let h = JSON.parse(JSON.stringify(androidHeaders))
            h.Authorization = `Bearer ${account.yAuth}`
            request(h)
        }
    },

    "pullPlayer": function(req, callback) {
        let device = pullDeviceId(req)
        if(!userdata[device]) {
            callback(false)
            return;
        }
        setupYouTube(device, (h) => {
            fetch("https://www.youtube.com/youtubei/v1/player", {
                "headers": h,
                "method": "POST",
                "body": JSON.stringify({
                    "context": androidContext,
                    "videoId": req.query.video_id
                })
            }).then(r => {r.json().then(r => {
                callback(r)
            })})
        })
    },

    "applyUpdateMetadata": function(req, res) {
        let device = pullDeviceId(req)
        if(!userdata[device]) {
            callback(false)
            return;
        }
        setupYouTube(device, (h) => {
            h["Content-Type"] = "application/x-protobuf"
            h["x-goog-api-format-version"] = "2"
            fetch("https://youtubei.googleapis.com/youtubei/v1/video_manager/metadata_update", {
                "method": "POST",
                "headers": h,
                "body": req.protoBody
            }).then(r => {
                if(r.status == 200) {
                    res.redirect("/my_videos")
                } else {
                    res.sendStatus(r.status)
                }
            })
        })
    },

    "analyticsMain": function(req, callback) {
        let device = pullDeviceId(req)
        if(!userdata[device]) {
            callback(false)
            return;
        }
        pullUserIdFromDevice(device, (id) => {
            if(id.type || typeof(id) !== "string") {
                callback({})
                return;
            }
            let msg = new protoAnalytics.root()
            let mc = new protoAnalytics.root.reqParamContents()
            mc.setChannelid(id)
            msg.addContents(mc)
            let params = Buffer.from(
                msg.serializeBinary()
            ).toString("base64")

            setupYouTube(device, (h) => {
                fetch("https://youtubei.googleapis.com/youtubei/v1/browse", {
                    "headers": h,
                    "method": "POST",
                    "body": JSON.stringify({
                        "context": androidContext,
                        "browseId": "FEanalytics_screen",
                        "params": params
                    })
                }).then(r => {r.json().then(r => {
                    let data = {
                        "recentViews": [],
                        "audiences": [],
                        "mostViewed": []
                    }
                    let contents = []
                    try {
                        contents = r.contents.singleColumnBrowseResultsRenderer
                        .tabs[0].tabRenderer.content.sectionListRenderer
                        .contents[0].itemSectionRenderer.contents
                    }
                    catch(error) {console.log(error)}
                    //fs.writeFileSync("./test.json", JSON.stringify(contents))
                    contents.forEach(e => {
                        try {
                            e = e.elementRenderer.newElement.type.componentType
                                 .model;
                            if(e.analyticsRecentViewsModel) {
                                e.analyticsRecentViewsModel.bars.forEach(b => {
                                    data.recentViews.push(b)
                                })
                            }
                            if(e.analyticsRootModel) {
                                e.analyticsRootModel.analyticsTableCarouselData
                                .data.tableCards.forEach(card => {
                                    let m = []
                                    card.cardData.rows.forEach(r => {
                                        m.push(r)
                                    })
                                    data.audiences.push(m)
                                })
                            }
                            if(e.analyticsVodCarouselCardModel) {
                                e.analyticsVodCarouselCardModel.videoCarouselData
                                .videos.forEach(v => {
                                    data.mostViewed.push(v)
                                })
                            }
                        }
                        catch(error) {console.log(error)}
                    })
                    callback(data)
                })})
            })
        })
    },

    "upload": function(req, flowData, callback) {
        let device = pullDeviceId(req)
        if(!userdata[device]) {
            callback(false)
            return;
        }
        let initHeaders = {
            "user-agent": upUA,
            "x-goog-upload-header-content-length": flowData.fsize,
            "x-goog-upload-command": "start",
            "x-goog-upload-protocol": "resumable",
            "content-type": "application/x-www-form-urlencoded"
        }
        
        // generate upload uuid
        // from https://github.com/yusufusta/ytstudio/
        let uuid = ""
        let keys = []
        while(keys.length !== 36) {
            keys.push(" ")
        }
        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
        let e = 0;
        let b = 0;
        let c = ""
        while(e < 36) {
            if(e == 8 || e == 13 || e == 18 || e == 23) {
                keys[e] = "-"
            } else {
                if(e == 14) {
                    keys[e] = "4"
                } else if(b <= 2) {
                    let r = Math.random()
                    while(r >= 0.9) {
                        r = Math.random()
                    }
                    b = Math.round(33554432 + 16777216 * r)
                }
                c = b & 15;
                b = b >> 4;
                let index = 0;
                if(e == 19) {
                    index = (c & 3 | 8)
                } else {
                    index = c;
                }
                keys[e] = chars[index]
            }
            e++
        }
        uuid = keys.join("").toLowerCase()
        
        let uploadId = "innertube_android:"+uuid+":0:v=3,api=1,cf=3"
        flowData.frontendUuid = uploadId
        let initialData = JSON.parse(JSON.stringify(upInitial))
        initialData.frontendUploadId = uploadId

        // flow 1 - create upload session
        setupYouTube(device, (h) => {
            initHeaders.Authorization = h.Authorization
            if(h["x-goog-pageid"]) {
                initHeaders["x-goog-pageid"] = h["x-goog-pageid"]
            }
            fetch("https://upload.youtube.com/upload/youtubei", {
                "headers": initHeaders,
                "method": "POST",
                "body": initialData
            }).then(r => {
                if(r.status !== 200) {
                    console.log("INITIAL UP received " + r.status + "!")
                    callback(false)
                    return;
                }
                flowData.uploadUrl = r.headers.get("x-goog-upload-url")
                flowData.controlUrl = r.headers.get("x-goog-upload-control-url")
                flowData.scottyId = r.headers.get("x-goog-upload-header-scotty-resource-id")
                queryUploadUrl();
            })
        })

        // flow 2 - query upload id
        function queryUploadUrl() {
            fetch(flowData.uploadUrl, {
                "headers": {
                    "user-agent": upUA,
                    "x-goog-upload-command": "query",
                    "x-goog-upload-protocol": "resumable"
                },
                "method": "PUT"
            }).then(r => {
                if(r.status !== 200) {
                    callback(false)
                    console.log("QUERYUPLOAD received " + r.status + "!")
                    return;
                }
                if(r.headers.has("x-guploader-uploadid")) {
                    flowData.uploadId = r.headers.get("x-guploader-uploadid")
                } else if(flowData.uploadUrl.includes("upload_id=")) {
                    let uid = flowData.upload.split("upload_id=")[1]
                                      .split("&")[0].split("#")[0];
                    flowData.uploadId = uid;
                }
                if(r.headers.has("x-goog-upload-status")
                && r.headers.get("x-goog-upload-status") == "active") {
                    uploadFile()
                }
            })
        }

        // flow 3 - upload video file to server
        function uploadFile() {
            let dir = `${__dirname}/../assets/user-uploads-tmp`
            const stream = fs.createReadStream(`${dir}/${flowData.fname}`)

            fetch(flowData.uploadUrl, {
                "headers": {
                    "user-agent": upUA,
                    "x-goog-upload-command": "upload, finalize",
                    "x-goog-upload-protocol": "resumable",
                    "x-goog-upload-offset": "0",
                    "content-length": flowData.fsize
                },
                "method": "PUT",
                "body": stream
            }).then(r => {
                if(r.status !== 200) {
                    callback(false)
                    console.log("UPLOADFILE return " + r.status + "!")
                    return;
                }
                r.text().then(r => {
                    try {flowData.nScotty = JSON.parse(r).scottyResourceId}
                    catch(error) {}
                    createInnertubeEntry()
                })
            })
        }

        // flow 4 - create video entry thru innertube
        function createInnertubeEntry() {
            let pageId = ""
            let channelId = ""
            function sendCreate() {
                setupYouTube(device, (h) => {
                    let privacy = flowData.privacy || "public"
                    if(privacy !== "public"
                    && privacy !== "unlisted"
                    && privacy !== "private") {
                        privacy = "public"
                    }
                    privacy = privacy.toUpperCase()
    
                    let nc = JSON.parse(JSON.stringify(androidContext))
                    nc.user = {
                        "onBehalfOfUser": pageId,
                        "delegationContext": {
                            "externalChannelId": channelId,
                            "roleType": {
                                "channelRoleType": "CREATOR_CHANNEL_ROLE_TYPE_OWNER"
                            }
                        }
                    }

                    fetch("https://youtubei.googleapis.com/youtubei/v1/upload/createvideo", {
                        "headers": h,
                        "method": "POST",
                        "body": JSON.stringify({
                            "context": nc,
                            "resourceId": {"scottyResourceId": {
                                "id": flowData.scottyId
                            }},
                            "frontendUploadId": uploadId,
                            "initialMetadata": {
                                "privacy": {"newPrivacy": privacy}
                            }
                        })
                    }).then(r => {r.json().then(r => {
                        //console.log(r)
                        if(r.videoId) {
                            flowData.videoId = r.videoId;
                            updateMetadata()
                        } else {
                            console.log("smth went wrong", flowData)
                            callback(false)
                        }
                    })})
                })
            }
            pullAllYouTubeAccounts(userdata[device], (data) => {
                data.forEach(a => {
                    if(a.selected) {
                        pageId = a.pageId
                    }
                })
                if(channelId && pageId) {
                    sendCreate()
                }
            })
            pullUserIdFromDevice(device, (id) => {
                channelId = id;
                if(channelId && pageId) {
                    sendCreate()
                }
            })
            
        }

        // flow 5 - update video metadata to include things like description
        function updateMetadata() {
            let root = new metadataUpdate.root()
            let context = new metadataUpdate.root.contextType()
            let client = new metadataUpdate.root.contextType.clientType()
            client.setClientnumber(3)
            client.setClientversion("19.02.39")
            client.setOsname("Android")
            client.setOsversion("14")
            client.setAndroidsdkversion(34)
            context.addClient(client)
            root.addContext(context)

            root.setBrowseid(flowData.videoId)
            root.setEightythree(1)

            let titleUpd = new metadataUpdate.stringUpdateMsg()
            titleUpd.addNewstring(flowData.title)
            titleUpd.setUpdatetype(1)
            root.addTitleupdate(titleUpd)

            if(flowData.description) {
                let upd = new metadataUpdate.stringUpdateMsg()
                upd.addNewstring(flowData.description)
                upd.setUpdatetype(1)
                root.addDescriptionupdate(upd)
            }

            if(flowData.tags) {
                let upd = new metadataUpdate.stringUpdateMsg()
                flowData.tags = flowData.tags.split(" ")
                flowData.tags.forEach(t => {
                    upd.addNewstring(t.trim())
                })
                upd.setUpdatetype(1)
                root.addTagsupdate(upd)
            }

            const acceptedPrivacyValues = ["public", "unlisted", "private"]
            if(flowData.privacy
            && acceptedPrivacyValues.includes(flowData.privacy)) {
                let shouldUpd = new metadataUpdate.updateToggle()
                shouldUpd.setUpdatefield(1)
                root.addUpdateprivacysettings(shouldUpd)
                let updSettings = new metadataUpdate.updateToggle()
                switch(flowData.privacy) {
                    case "public": {
                        updSettings.setUpdatefield(1)
                        break;
                    }
                    case "unlisted": {
                        updSettings.setUpdatefield(2)
                        break;
                    }
                    case "private": {
                        updSettings.setUpdatefield(0)
                        break;
                    }
                }
                root.addVideoprivacy(updSettings)
            }

            const acceptedCommentsValues = [
                "allow-all", "allow-friends", "allow-approved", "deny-all"
            ]
            if(flowData.comments
            && acceptedCommentsValues.includes(flowData.comments)) {
                let upd = new metadataUpdate.commentsUpdateMsg()
                upd.setInt4(1)
                upd.setInt5(1)
                switch(flowData.comments) {
                    case "allow-all": {
                        upd.setAllowcomments(2)
                        upd.setModerationtype(1)
                        break;
                    }
                    case "allow-friends": {
                        upd.setAllowcomments(2)
                        upd.setModerationtype(3)
                        break;
                    }
                    case "allow-approved": {
                        upd.setAllowcomments(2)
                        upd.setModerationtype(2)
                        break;
                    }
                    case "deny-all": {
                        upd.setAllowcomments(1)
                        break;
                    }
                }
                root.addCommentsupdate(upd)
            }

            let pbmsg = root.serializeBinary()
            
            setupYouTube(device, (h) => {
                h["Content-Type"] = "application/x-protobuf"
                h["x-goog-api-format-version"] = "2"
                fetch("https://youtubei.googleapis.com/youtubei/v1/video_manager/metadata_update", {
                    "method": "POST",
                    "headers": h,
                    "body": pbmsg
                }).then(r => {
                    if(r.status == 200) {
                        callback(flowData)
                    } else {
                        console.log("METADATAUPDATE return " + r.status + "!")
                        callback(false)
                    }
                })
            })
        }
    },

    "openBrowseId": function(req, callback) {
        pullUserIdFromDevice(pullDeviceId(req), (id) => {
            if(id.type) {
                callback(false)
                return;
            }
            callback(id)
        })
    },

    "changeAvatar": function(req, imgPath, callback) {
        imgPath = imgPath.split("..").join("")
        if(imgPath.startsWith("/assets/")) {
            imgPath = ".." + imgPath
        }

        let device = pullDeviceId(req);
        if(!userdata[device]) {
            callback(false)
            return;
        }

        pullUserIdFromDevice(device, (id) => {
            if(id.type || !id) {
                callback(false)
                return;
            }
            let h = {}
            setupYouTube(device, (headers) => {
                for(let n in headers) {
                    h[n] = headers[n]
                }
                if(id) {
                    h["x-youtube-channelid"] = id;
                }
                h["content-type"] = "application/json-rpc; charset=utf-8"
                h["x-goog-upload-command"] = "start"
                h["x-goog-upload-protocol"] = "resumable"
                fetch("https://www.youtube.com/channel_image_upload/profile", {
                    "method": "POST",
                    "headers": h,
                    "body": ""
                }).then(r => {
                    let uploadUrl = ""
                    if(r.headers.has("X-Goog-Upload-URL")) {
                        uploadUrl = r.headers.get("X-Goog-Upload-URL")
                    } else if(r.headers.has("X-GUploader-UploadID")) {
                        uploadUrl = [
                            "https://www.youtube.com/channel_image_upload/profile",
                            "?upload_id=" + r.headers.get("X-GUploader-UploadID")
                        ].join("")
                    }

                    if(uploadUrl) {
                        console.log(uploadUrl)
                        uploadImage(uploadUrl, h, id)
                    }
                })
            })
        })

        function uploadImage(url, headers, userId) {
            const stream = fs.createReadStream(imgPath)
            headers["x-goog-upload-command"] = "upload, finalize"
            headers["x-goog-upload-offset"] = "0"
            headers["content-length"] = fs.statSync(imgPath).size
            fetch(url, {
                "method": "PUT",
                "headers": headers,
                "body": stream
            }).then(r => {r.json().then(r => {
                // get blobId to update with innertube
                if(r.encryptedBlobId) {
                    innertubeUpdate(r.encryptedBlobId, userId)
                } else {
                    callback(500)
                }
            })})
        }

        function innertubeUpdate(blob, userId) {
            let root = new userMetadata.root()
            let context = new userMetadata.root.contextType()
            let client = new userMetadata.root.contextType.clientType()
            client.setClientnumber(3)
            client.setClientversion("19.02.39")
            client.setOsname("Android")
            client.setOsversion("14")
            client.setAndroidsdkversion(34)
            context.addClient(client)
            root.addContext(context)

            root.setBrowseid(userId)

            let upd = new userMetadata.stringUpdateMsg()
            upd.addNewstring(blob)
            root.addAvatarblob(upd)
            
            let pbmsg = root.serializeBinary()
            
            setupYouTube(device, (h) => {
                h["Content-Type"] = "application/x-protobuf"
                h["x-goog-api-format-version"] = "2"
                fetch("https://youtubei.googleapis.com/youtubei/v1/channel_edit/update_channel_page_settings", {
                    "method": "POST",
                    "headers": h,
                    "body": pbmsg
                }).then(r => {
                    callback(r.status)
                })
            })
        }
    },

    "deleteVideos": function(req, res) {
        if(!req.body
        || !req.body.toString()
        || !req.body.toString().includes("video_ids=")) {
            res.sendStatus(400)
            return;
        }

        let device = pullDeviceId(req);
        if(!userdata[device]) {
            res.sendStatus(400)
            return;
        }

        let videos = req.body.toString()
                        .split("video_ids=")[1]
                        .split("&")[0].split(",");
        if(videos.length < 1) {
            res.sendStatus(400)
            return;
        }

        if(!req.setS) {
            req.setS = function(s) {}
        }
        if(!res.setS) {
            res.setS = function(s) {}
        }

        if(videos.length == 1) {
            setupYouTube(device, (h) => {
                fetch("https://www.youtube.com/youtubei/v1/video/delete", {
                    "headers": h,
                    "method": "POST",
                    "body": JSON.stringify({
                        "context": androidContext,
                        "videoId": videos[0]
                    })
                }).then(r => {
                    res.setS("SINGLE_DELETE")
                    res.sendStatus(r.status)
                })
            })
        } else {
            setupYouTube(device, (h) => {
                fetch("https://www.youtube.com/youtubei/v1/creator/enqueue_creator_bulk_delete", {
                    "headers": h,
                    "method": "POST",
                    "body": JSON.stringify({
                        "context": androidContext,
                        "videos": {"videoIds": videos}
                    })
                }).then(r => {
                    res.setS("MULTI_DELETE")
                    res.sendStatus(r.status)
                })
            })
        }
    },

    "createCustomization": function(req, params, res) {
        let t = this;
        let fetchesRequired = 0;
        let fetchesCompleted = 0;

        if(!params.fields) {
            params.fields = {}
        }
        if(!params.checkboxes) {
            params.checkboxes = {}
        }
        if(!params.themeName) {
            params.themeName = "custom"
        }
        let msg = new customChannel.root()
        msg.setTitle(params.fields.channel_title_input)
        let validTypes = ["u", "d", "m", "c", "g", "j"]
        if(params.fields.channel_type
        && validTypes.includes(params.fields.channel_type)) {
            msg.setType(params.fields.channel_type)
        }
        msg.setTags(params.fields.keywords)

        let themes = {
            "default": 1,
            "blue": 2,
            "red": 3,
            "sunlight": 4,
            "forest": 5,
            "8bit": 6,
            "princess": 7,
            "fire": 8,
            "stealth": 9,
            "clean": 10,
            "custom": 11
        }
        msg.setThemeid(themes[params.themeName] || 1)

        let fonts = {
            "Times New Roman": 1,
            "Arial": 2,
            "Verdana": 3,
            "Georgia": 4,
            "Courier New": 5
        }
        msg.setFont(fonts[params.fields.font.split("+").join(" ")] || 2)

        msg.setBackgroundcolor(params.fields.background_color || "CCCCCC")
        msg.setWrappercolor(params.fields.wrapper_color || "999999")
        msg.setWrappertextcolor(params.fields.wrapper_text_color || "000000")
        msg.setWrapperlinkcolor(params.fields.wrapper_link_color || "0000cc")
        msg.setInnerboxbackgroundcolor(
            params.fields.box_background_color || "eeeeff"
        )
        msg.setInnerboxtitletextcolor(
            params.fields.title_text_color || "000000"
        )
        msg.setInnerboxlinkcolor(params.fields.link_color || "0000cc")
        msg.setInnerboxbodytextcolor(params.fields.body_text_color || "333333")
        if(params.fields.background_image
        && params.fields.background_image.length == 24) {
            msg.setCustombackgroundid(params.fields.background_image)
        }

        if(params.fields.wrapper_opacity
        && !isNaN(parseInt(params.fields.wrapper_opacity))
        && parseInt(params.fields.wrapper_opacity) >= 0
        && parseInt(params.fields.wrapper_opacity) <= 255) {
            msg.setWrapperopacity(parseInt(params.fields.wrapper_opacity))
        }

        if(params.fields.innerbox_opacity
        && !isNaN(parseInt(params.fields.innerbox_opacity))
        && parseInt(params.fields.innerbox_opacity) >= 0
        && parseInt(params.fields.innerbox_opacity) <= 255) {
            msg.setInnerboxopacity(parseInt(params.fields.innerbox_opacity))
        }

        msg.setHidebanner(params.checkboxes.hide_def_banner_check)
        msg.setRepeatcustombackground(
            params.checkboxes.background_repeat_check
        )

        let shownModulesString = ""
        if(params.checkboxes.box_status_user_comments) {
            shownModulesString += "c"
        }
        if(params.checkboxes.box_status_user_recent_activity) {
            shownModulesString += "r"
        }
        if(params.checkboxes.box_status_user_hubber_links) {
            shownModulesString += "o"
        }
        if(params.checkboxes.box_status_user_subscribers) {
            shownModulesString += "s"
            fetchesRequired++
            this.getSubscribers(req, (data) => {
                if(data) {
                    data.slice(0,6).forEach(d => {
                        let c = new customChannel.featuredChannel()
                        c.setId(d.id)
                        c.setName(d.name)
                        msg.addSubscriber(c)
                    })
                }
                fetchesCompleted++
                if(fetchesCompleted == fetchesRequired) {
                    t.applyCustomization(msg.serializeBinary(), res, req)
                }
            })
        }
        if(params.checkboxes.box_status_user_subscriptions) {
            shownModulesString += "z"
            fetchesRequired++
            //req.withAvatars = true;
            this.getSubscriptions(req, {
                "set": function(a,b) {},
                "send": function(data) {
                    data.split("<entry>").slice(0,7).forEach(e => {
                        if(e.includes("<feed")) return;
                        let name = e.split("<yt:username>")[1]
                                    .split("</yt:usernam")[0]
                                    .split("&").join("")
                                    .split(";").join("")
                                    .split(":").join("")
                        let id = e.split("<y9id>")[1].split("</y9id>")[0]
                        let c = new customChannel.featuredChannel()
                        c.setId(id)
                        c.setName(name)
                        msg.addSubscription(c)
                    })
                    fetchesCompleted++
                    if(fetchesCompleted == fetchesRequired) {
                        t.applyCustomization(msg.serializeBinary(), res, req)
                    }
                }
            })
        }
        msg.setShownmodules(shownModulesString)

        
        let shownContentString = ""
        if(params.checkboxes.display_uploads) {
            shownContentString += "u"
        }
        if(params.checkboxes.display_favorites) {
            shownContentString += "f"
        }
        if(params.checkboxes.display_playlists) {
            shownContentString += "p"
        }
        if(params.checkboxes.display_all) {
            shownContentString += "a"
        }
        msg.setShowncontent(shownContentString)
        
        msg.setEnableautoplay(params.checkboxes.enable_autoplay)

        if(params.fields.default_view == "grid") {
            msg.setDefaultgrid(true)
        }
        switch(params.fields.default_set || "") {
            case "uploads": {
                msg.setAltdefaultset(2)
                break;
            }
            case "favorites": {
                msg.setAltdefaultset(3)
                break;
            }
        }

        if(params.fields.featured_video_id == "OTHER111111") {
            let altVideoId = false;
            let vurl = params.fields.featured_video_url
            if(vurl && vurl.includes("youtu.be/")) {
                altVideoId = vurl.split("youtu.be/")[1]
                                 .split("?")[0]
                                 .split("#")[0];
                altVideoId = altVideoId.substring(0,11)
            } else if(vurl.includes("/watch") && vurl.includes("v=")) {
                altVideoId = vurl.split("v=")[1].substring(0,11)
            }
            if(altVideoId) {
                msg.setAltdefaultvidid(altVideoId)
            }
        }

        if(fetchesCompleted == fetchesRequired) {
            this.applyCustomization(msg.serializeBinary(), res, req)
        }
    },

    "updateChannelDescription": function(req, description, id, callback) {
        // craft description update proto
        let root = new userMetadata.root()
        let context = new userMetadata.root.contextType()
        let client = new userMetadata.root.contextType.clientType()
        client.setClientnumber(3)
        client.setClientversion("19.02.39")
        client.setOsname("Android")
        client.setOsversion("14")
        client.setAndroidsdkversion(34)
        context.addClient(client)
        root.addContext(context)

        root.setBrowseid(id)

        let upd = new userMetadata.root.channelAboutTab()
        upd.setDescription(description)
        root.addAbout(upd)
        
        let pbmsg = root.serializeBinary()

        // send request
        setupYouTube(pullDeviceId(req), (h) => {
            h["Content-Type"] = "application/x-protobuf"
            h["x-goog-api-format-version"] = "2"
            let url = [
                "https://youtubei.googleapis.com",
                "/youtubei/v1/channel_edit",
                "/update_channel_page_settings"
            ].join("")
            fetch(url, {
                "method": "POST",
                "headers": h,
                "body": pbmsg
            }).then(r => {
                callback()
            })
        })
    },

    "applyCustomization": function(proto, res, req) {
        //console.log(Buffer.from(proto).toString("base64"))
        const identif = "-- x-yt2009-custom"
        const warning = [
            " -- channel customization code for yt2009"
        ].join("")
        this.openBrowseId(req, (id) => {
            require("./yt2009channels").aboutChannel(id, (data) => {
                // put customiation code to channel description
                let description = data.description || ""
                if(description
                && description.includes(identif)) {
                    let customizi = description.split(identif)[1]
                                    .split("\n")[1];
                    description = description.replace(customizi, "")
                    let descriptiLine = description.split(identif)[1]
                                        .split("\n")[0]
                    description = description.replace(
                        identif + descriptiLine, ""
                    )
                }
                
                description += identif + warning + "\n"
                description += Buffer.from(proto).toString("base64").split("+").join("-")

                // craft description update proto
                this.updateChannelDescription(req, description, id, () => {
                    setTimeout(() => {
                        let ownUrl = [
                            "/channel/" + id,
                            "?resetcache=1",
                            "&nc=" + Date.now()
                        ].join("")
                        res.redirect(ownUrl)
                    }, 1000)
                })
                /*let root = new userMetadata.root()
                let context = new userMetadata.root.contextType()
                let client = new userMetadata.root.contextType.clientType()
                client.setClientnumber(3)
                client.setClientversion("19.02.39")
                client.setOsname("Android")
                client.setOsversion("14")
                client.setAndroidsdkversion(34)
                context.addClient(client)
                root.addContext(context)

                root.setBrowseid(id)

                let upd = new userMetadata.root.channelAboutTab()
                upd.setDescription(description)
                root.addAbout(upd)
                
                let pbmsg = root.serializeBinary()

                // send request
                setupYouTube(pullDeviceId(req), (h) => {
                    h["Content-Type"] = "application/x-protobuf"
                    h["x-goog-api-format-version"] = "2"
                    let url = [
                        "https://youtubei.googleapis.com",
                        "/youtubei/v1/channel_edit",
                        "/update_channel_page_settings"
                    ].join("")
                    fetch(url, {
                        "method": "POST",
                        "headers": h,
                        "body": pbmsg
                    }).then(r => {
                        setTimeout(() => {
                            let ownUrl = [
                                "/channel/" + id,
                                "?resetcache=1",
                                "&nc=" + Date.now()
                            ].join("")
                            res.redirect(ownUrl)
                        }, 1000)
                    })
                })*/
            })
        })
    },

    "getSubscribers": function(req, callback) {
        let device = pullDeviceId(req);
        if(!userdata[device]) {
            callback([])
            return;
        }

        this.openBrowseId(req, (id) => {
            const tempBehalf = require("./proto/temp_behalfof_pb")
            let pmsg = new tempBehalf.root()
            let pimsg = new tempBehalf.behalf()
            pimsg.setChannelid(id)
            pimsg.setEmpty2("")
            pmsg.addBeh(pimsg)
            let behalfOf = Buffer.from(
                pmsg.serializeBinary()
            ).toString("base64")

            setupYouTube(device, (h) => {
                fetch("https://www.youtube.com/youtubei/v1/browse", {
                    "method": "POST",
                    "headers": h,
                    "body": JSON.stringify({
                        "context": androidContext,
                        "browseId": "FEsubscriber_list",
                        "params": behalfOf
                    })
                }).then(r => {r.json().then(r => {
                    let subList = []
                    try {
                        let a = r.contents.singleColumnBrowseResultsRenderer
                                 .tabs[0].tabRenderer.content
                                 .sectionListRenderer.contents
                        a.forEach(b => {
                            try {
                                b = b.itemSectionRenderer.contents
                                b.forEach(c => {
                                    c = c.elementRenderer.newElement.type
                                         .componentType.model
                                         .subscriptionsChannelPageListItemModel
                                         .channelListItemData
                                    let userId = false;
                                    try {
                                        function put(browseEndpoint) {
                                            if(browseEndpoint) {
                                                let d = browseEndpoint
                                                userId = d.browseId;
                                            }
                                        }
                                        let command = c.command.innertubeCommand
                                        if(command.commandExecutorCommand) {
                                            command.commandExecutorCommand
                                            .commands.forEach(d => {
                                                if(d.browseEndpoint) {
                                                    put(d.browseEndpoint)
                                                }
                                            })
                                        } else if(command.browseEndpoint) {
                                            put(command.browseEndpoint)
                                        }
                                        
                                    }
                                    catch(error){}
                                    let name = c.channelName.content
                                    if(userId) {
                                        subList.push({
                                            "id": userId,
                                            "name": name
                                        })
                                    }
                                })
                            }
                            catch(error) {}
                        })
                    }
                    catch(error) {
                        console.log("failed to pull subscribers list!", error)
                    }
                    

                    callback(subList)
                })})
            }, req)
        })
    },

    "applyProfileSetup": function(req, res) {
        let delimiter = "═"
        let whitelistedProperties = [
            "website", "first-name", "last-name", "gender", "relationship",
            "hometown", "current-city", "zip-code", "country", "occupations",
            "companies", "schools", "interests", "fav-movies", "fav-music",
            "fav-books", "channel-description", "pronouns"
        ]
        let data = {}
        let raw = req.body.toString().split("&")
        let propertyNames = {
            "website": "Website",
            "name": "Name",
            "gender": "Gender",
            "relationship": "Relationship",
            "hometown": "Hometown",
            "current-city": "City",
            "country": "Country",
            "zip-code": "Zip",
            "occupations": "Occupation",
            "companies": "Companies",
            "schools": "Schools",
            "interests": "Hobbies",
            "fav-movies": "Movies",
            "fav-music": "Music",
            "fav-books": "Books",
            "pronouns": "Pronouns"
        }
        let dropdownValues = {
            "Gender": {
                "m": "Male",
                "f": "Female"
            },
            "Relationship": {
                "s": "Single",
                "t": "Taken",
                "o": "Open"
            },
            "Country": {}
        }
        let countries = require("./geo/country-codes.json")
        let reversedCountries = {}
        for(let name in countries) {
            reversedCountries[countries[name]] = name;
        }
        dropdownValues.Country = reversedCountries;

        raw.forEach(p => {
            let key = p.split("=")[0]
            let value = decodeURIComponent(p.split("=")[1]).split("\r").join("")
            if(whitelistedProperties.includes(key)) {
                data[propertyNames[key] || key] = value;
            }
        })

        /*if(data.country && data.country.length == 2
        && reversedCountries[data.country]) {
            data.country = reversedCountries[data.country]
        }*/

        for(let prop in dropdownValues) {
            let value = data[prop]
            //console.log(prop, value, dropdownValues[prop])
            if(value && dropdownValues[prop][value]) {
                data[prop] = dropdownValues[prop][value]
            } else {
                data[prop] = ""
            }
        }

        if(data["first-name"] || data["last-name"]) {
            data["Name"] = `${data["first-name"] || ""} ${data["last-name"] || ""}`
            delete data["first-name"]
            delete data["last-name"]
        }

        let completeDescription = ""
        if(data["channel-description"]) {
            completeDescription = data["channel-description"].split("+").join(" ")
            delete data["channel-description"]
        }
        if(completeDescription.includes(delimiter)) {
            // remove previous properties
            let part = completeDescription.split("\n\n" + delimiter + " ")[1]
                       .split("\n\n")[0]
            completeDescription = completeDescription.replace(
                "\n\n" + delimiter + " " + part, ""
            )
        }

        if(completeDescription.includes("-- x-yt2009-custom")) {
            // has channel customization, put before
            completeDescription = completeDescription.replace(
                "\n\n-- x-yt2009-custom",
                "\n\n//properties-insert\n\n-- x-yt2009-custom"
            )
        } else {
            // put at the end
            completeDescription += "\n\n//properties-insert"
        }

        // craft properties
        let textData = []
        for(let p in data) {
            if(data[p] && data[p].length >= 1) {
                textData.push(`${delimiter} ${p}: ${data[p]}`)
            }
        }
        textData = textData.join("\n")

        completeDescription = completeDescription.replace(
            "//properties-insert", textData
        )

        this.openBrowseId(req, (id) => {
            this.updateChannelDescription(req, completeDescription, id, () => {
                setTimeout(() => {
                    res.redirect(`/channel/${id}?resetcache=1&nc=${Math.random()}`)
                }, 250)
            })
        })
    },

    "getSubscriptionVideos": function(req, callback) {
        let device = pullDeviceId(req);
        if(!userdata[device]) {
            callback([])
            return;
        }

        setupYouTube(device, (h) => {
            fetch("https://www.youtube.com/youtubei/v1/browse", {
                "method": "POST",
                "headers": h,
                "body": JSON.stringify({
                    "context": androidContext,
                    "browseId": "FEsubscriptions"
                })
            }).then(r => {r.json().then(r => {
                let vids = []
                try {
                    let a = r.contents.singleColumnBrowseResultsRenderer
                             .tabs[0].tabRenderer.content
                             .sectionListRenderer.contents
                    a.forEach(b => {
                        try {
                            b = b.shelfRenderer.content.verticalListRenderer
                                 .items
                            b.forEach(c => {
                                c = c.compactVideoRenderer //<3
                                let authorId = c.shortBylineText.runs[0]
                                                .navigationEndpoint
                                                .browseEndpoint.browseId
                                let upload = c.publishedTimeText.runs[0].text
                                upload = upload.replace("Streamed ", "")
                                               .replace("Premiered ", "")
                                vids.push({
                                    "id": c.videoId,
                                    "author_name": c.shortBylineText
                                                    .runs[0].text,
                                    "title": c.title.runs[0].text,
                                    "length": c.lengthText.runs[0].text,
                                    "upload": upload,
                                    "views": c.viewCountText.runs[0].text,
                                    "author_url": "/channel/" + authorId,
                                    "o": true
                                })
                            })
                        }
                        catch(error) {}
                    })
                }
                catch(error) {
                    console.log("failed to pull vid list!", error)
                }

                callback(vids)
            })})
        }, req)
    },
}

function pullFirstGoogleAuth(email, token, callback) {
    token = "oauth2_4/" + token;
    let randomDevice = "33a06"
    while(randomDevice.length !== 16) { 
        randomDevice += uida[Math.floor(Math.random() * uida.length)]
    }
    fetch("https://android.googleapis.com/auth", {
        "method": "POST",
        "headers": {
            "device": randomDevice,
            "app": "com.google.android.gms",
            "user-agent": "GoogleAuth/1.4 (generic_x86 OSM1.180201.037); gzip",
            "content-type": "application/x-www-form-urlencoded",
            "accept-encoding": "gzip"
        },
        "body": [
            "androidId=" + randomDevice,
            "lang=en-US",
            "google_play_services_version=202414022",
            "sdk_version=27",
            "device_country=us",
            "is_dev_key_gmscore=1",
            "Email=" + encodeURIComponent(email),
            "build_product=sdk_gphone_x86",
            "build_brand=google",
            "Token=" + encodeURIComponent(token),
            "build_fingerprint=google%2Fsdk_gphone_x86%2Fgeneric_x86%3A8%2FQSR1.210802.001%2F7603624%3Auserdebug%2Fdev-keys",
            "build_device=generic_x86",
            "service=ac2dm",
            "get_accountid=1",
            "ACCESS_TOKEN=1",
            "callerPkg=com.google.android.gms",
            "add_account=1",
            "callerSig=58e1c4133f7441ec3d2c270270a14802da47ba0e",
            "droidguard_results=" + genericDg
        ].join("&")
    }).then(r => {
        console.log("access token response status: " + r.status);
        let status = r.status;
        r.text().then(r => {
            if(status !== 200) {
                console.log(status + " / " + r)
                callback(false)
                return;
            }

            let token = r.split("Token=")[1].split("\n")[0]
            let auth = r.split("Auth=")[1].split("\n")[0]

            callback({
                "androidId": randomDevice,
                "gToken": encryptWithIk(token),
                "gAuth": encryptWithIk(auth)
            })
        })
    })
}

function pullYouTubeAuth(userdata, callback) {
    fetch("https://android.googleapis.com/auth", {
        "method": "POST",
        "headers": {
            "device": userdata.androidId,
            "app": "com.google.android.youtube",
            "user-agent": "GoogleAuth/1.4 (generic_x86 OSM1.180201.037); gzip",
            "content-type": "application/x-www-form-urlencoded",
            "accept-encoding": "gzip"
        },
        "body": [
            "androidId=" + userdata.androidId,
            "lang=en-US",
            "google_play_services_version=202414022",
            "sdk_version=27",
            "device_country=us",
            "is_dev_key_gmscore=1",
            "Email=" + encodeURIComponent(decryptWthIk(userdata.email)),
            "token_request_options=CAA4AVAB",
            "build_product=sdk_gphone_x86",
            "build_brand=google",
            "Token=" + encodeURIComponent(decryptWthIk(userdata.gToken)),
            "build_fingerprint=google%2Fsdk_gphone_x86%2Fgeneric_x86%3A8%2FQSR1.210802.001%2F7603624%3Auserdebug%2Fdev-keys",
            "build_device=generic_x86",
            "oauth2_foreground=1",
            "callerPkg=com.google.android.youtube",
            "app=com.google.android.youtube",
            "check_email=1",
            "system_partition=1",
            "callerSig=24bb24c05e47e0aefa68a58a766179d9b613a600",
            "client_sig=24bb24c05e47e0aefa68a58a766179d9b613a600",
            "service=oauth2%3Ahttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Faccounts.reauth%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fidentity.lateimpersonation%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fassistant-sdk-prototype"
        ].join("&")
    }).then(r => {
        let status = r.status;
        r.text().then(r => {
            if(status !== 200) {
                console.log(status + " / " + r)
                callback(false)
                return;
            }

            let auth = r.split("Auth=")[1].split("\n")[0]
            let expire = r.split("Expiry=")[1].split("\n")[0]

            callback({
                "yAuth": encryptWithIk(auth),
                "yExpire": expire
            })
        })
    })
}

function pullYouTubeAccounts(loginData, callback) {
    let h = JSON.parse(JSON.stringify(androidHeaders))
    h.Authorization = `Bearer ${decryptWthIk(loginData.yAuth)}`
    fetch("https://www.youtube.com/youtubei/v1/account/accounts_list", {
        "method": "POST",
        "headers": h,
        "body": JSON.stringify({
            "context": androidContext,
            "accountReadMask": {
                "returnOwner": true,
                "returnFamilyChildAccounts": true,
                "returnBrandAccounts": true,
                "returnPersonaAccounts": true
            }
        })
    }).then(r => {r.json().then(r => {
        try {
            //fs.writeFileSync("test.json", JSON.stringify(r))
            let selectedAccount = ""
            let selectedType = "handle"
            r.contents[0].accountSectionListRenderer
            .contents[0].accountItemSectionRenderer.contents.forEach(a => {
                if(a.accountItem && a.accountItem.isSelected) {
                    a = a.accountItem;
                    if(a.channelHandle && a.channelHandle.runs[0]) {
                        selectedAccount = a.channelHandle.runs[0].text
                    } else if(a.accountName && a.accountName.runs[0]) {
                        selectedAccount = a.accountName.runs[0].text
                        selectedType = "user"
                    } else if(a.channelHandle && a.channelHandle.simpleText) {
                        selectedAccount = a.channelHandle.simpleText
                    } else if(a.accountName && a.accountName.simpleText) {
                        selectedAccount = a.accountName.simpleText
                        selectedType = "user"
                    }
                }
            })

            callback({
                "yAccount": encryptWithIk(selectedAccount),
                "yAccountType": encryptWithIk(selectedType)
            })
        }
        catch(error) {
            console.log("sign-in test failed!", error)
        }
    })})
}

function pullAllYouTubeAccounts(loginData, callback) {
    let h = JSON.parse(JSON.stringify(androidHeaders))
    h.Authorization = `Bearer ${decryptWthIk(loginData.yAuth)}`
    if(loginData.pageId && !loginData.isFirst) {
        h["x-goog-pageid"] = loginData.pageId
    }
    fetch("https://www.youtube.com/youtubei/v1/account/accounts_list", {
        "method": "POST",
        "headers": h,
        "body": JSON.stringify({
            "context": androidContext,
            "accountReadMask": {
                "returnOwner": true,
                "returnFamilyChildAccounts": true,
                "returnBrandAccounts": true,
                "returnPersonaAccounts": true
            }
        })
    }).then(r => {r.json().then(r => {
        let accounts = []

        function pullName(accountItem) {
            a = accountItem;
            let handle = false;
            let name = false;
            if(a.channelHandle && a.channelHandle.runs) {
                handle = a.channelHandle.runs[0].text
            } else if(a.channelHandle && a.channelHandle.simpleText) {
                handle = a.channelHandle.simpleText
            }
            if(a.accountName && a.accountName.runs) {
                name = a.accountName.runs[0].text
            } else if(a.accountName && a.accountName.simpleText) {
                name = a.accountName.simpleText
            }

            return {
                "handle": handle,
                "name": name
            }
        }

        try {
            //fs.writeFileSync("test.json", JSON.stringify(r))
            let hadAvatars = false;
            r.contents[0].accountSectionListRenderer
            .contents[0].accountItemSectionRenderer.contents.forEach(a => {
                if(a.accountItem) {
                    a = a.accountItem
                    let name = pullName(a)
                    let avatarUrl = false;
                    try {
                        avatarUrl = utils.saveAvatar(
                            a.accountPhoto.thumbnails[0].url
                        )
                        hadAvatars = true;
                    }
                    catch(error) {console.log(error)}
                    if(!a.isRedirectToStudio) {
                        accounts.push({
                            "name": name.name,
                            "handle": name.handle,
                            "pageId": a.serviceEndpoint.signInEndpoint
                                       .directSigninIdentity
                                       .effectiveObfuscatedGaiaId,
                            "selected": a.isSelected,
                            "avatar": avatarUrl
                        })
                    }
                }
            })

            if(hadAvatars) {
                setTimeout(() => {callback(accounts)}, 300)
            } else {
                callback(accounts)
            }
        }
        catch(error) {
            console.log("account pull failed!", error)
        }
    })})
}

function refreshTube(device, callback) {
    if(userdata[device]) {
        let d = userdata[device]
        if(d.yExpire
        && Date.now() >= ((parseInt(d.yExpire) * 1000) - (1000 * 120))) { 
            console.log("does actually refresh")
            pullYouTubeAuth(d, (data) => {
                for(let entry in data) {
                    userdata[device][entry] = data[entry]
                }
                fs.writeFileSync(userdata_fname, JSON.stringify(userdata))
                callback()
            })
        } else {
            callback()
        }
    } else {
        callback()
    }
}

function setupYouTube(device, callback, req) {
    if(!userdata[device]) {
        callback(false);
    }
    refreshTube(device, () => {
        let h = JSON.parse(JSON.stringify(androidHeaders))
        let loginData = userdata[device]
        h.Authorization = `Bearer ${decryptWthIk(loginData.yAuth)}`
        if(loginData.pageId && !loginData.isFirst) {
            h["x-goog-pageid"] = loginData.pageId
        }
        callback(h)
    })
}

function pullDeviceId(req) {
    let deviceId = false;
    if(req.headers["x-gdata-device"]
    && req.headers["x-gdata-device"].includes("device-id=\"")) {
        deviceId = req.headers["x-gdata-device"]
                    .split("device-id=\"")[1]
                    .split("\"")[0];
    } else if(req.headers.cookie
    && req.headers.cookie.includes("pchelper_user=")) {
        deviceId = req.headers.cookie.split("pchelper_user=")[1].split(";")[0]
    }
    return deviceId
}

function pullUserIdFromDevice(device, callback) {
    setupYouTube(device, (h) => {
        fetch("https://www.youtube.com/youtubei/v1/guide", {
            "method": "POST",
            "headers": h,
            "body": JSON.stringify({
                "context": androidContext
            })
        }).then(r => {r.json().then(r => {
            //fs.writeFileSync("test.json", JSON.stringify(r))
            let uid = JSON.stringify(r).split(" ").join("")
            if(uid.includes(`"browseId":"UC`)) {
                uid = uid.split(`"browseId":"UC`)[1].split("\"")[0]
                uid = "UC" + uid
                callback(uid)
            } else {
                uid = JSON.stringify(r)
                // account with no channel, try to get data
                let avatar = uid.split(`{"avatar":{"thumbnails":[{"url":"`)[1]
                                .split('"')[0]
                let username = uid.split(`{"accountName":{"runs":[{"text":"`)[1]
                                  .split('"')[0]
                callback({"type": "b", "avatar": avatar, "username": username})
            }
            
        })})
    })
}

const crypto = require("crypto")
const tranferIkRef = "../www-core-feather.css"
const i = new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])
let ik = false;

function decryptWthIk(input) {
    let d = crypto.createDecipheriv("aes-128-cbc", getIk(), i)
    let c = d.update(input, "hex", "utf8").toString()
    c += d.final("utf8")
    return c;
}

function encryptWithIk(input, whileIkmc) {
    let d;
    if(whileIkmc) {
        let ref = tranferIkRef
        let bt = 1
        if(fs.existsSync(ref)) {
            bt = fs.statSync(ref).birthtime.getTime()
        }
        let transferIk = bt.toString().padStart(16, "0");
        d = crypto.createCipheriv("aes-128-cbc", transferIk, i)
    } else {
        d = crypto.createCipheriv("aes-128-cbc", getIk(), i)
    }
    let c = d.update(input, "utf8", "hex")
    c += d.final("hex")
    return c;
}

// calculate ik
function getIk() {
    if(!ik) {
        let ref = "./backend.js"
        if(userdata && userdata.ikmc) {
            ref = tranferIkRef
        }
        let bt = 1
        if(fs.existsSync(ref)) {
            bt = fs.statSync(ref).birthtime.getTime()
        }
        ik = bt.toString().padStart(16, "0");
    }
    return ik;
}

// migrate previous ik prone to breaking signins with updates
if(userdata && !userdata.ikmc) {
    //let oldIk = getIk().substring(0,17)
    for(let u in userdata) {
        if(userdata[u] && userdata[u].email) {
            let elem = userdata[u]
            let email = decryptWthIk(elem.email)
            let gToken = decryptWthIk(elem.gToken)
            let gAuth = decryptWthIk(elem.gAuth)
            let yAuth = decryptWthIk(elem.yAuth)
            email = encryptWithIk(email, true)
            gToken = encryptWithIk(gToken, true)
            gAuth = encryptWithIk(gAuth, true)
            yAuth = encryptWithIk(yAuth, true)

            userdata[u].email = email;
            userdata[u].gToken = gToken;
            userdata[u].gAuth = gAuth;
            userdata[u].yAuth = yAuth;
        }
    }

    userdata.ikmc = 1
    let ref = tranferIkRef
    let bt = 1
    if(fs.existsSync(ref)) {
        bt = fs.statSync(ref).birthtime.getTime()
    }
    ik = bt.toString().padStart(16, "0");
    fs.writeFileSync(userdata_fname, JSON.stringify(userdata))
}
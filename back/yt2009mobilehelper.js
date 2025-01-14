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
const androidHeaders = {
    "Accept": "*/*",
    "Accept-Language": "en-US;q=0.7,en;q=0.3",
    "Content-Type": "application/json",
    "x-goog-authuser": "0",
    "x-origin": "https://www.youtube.com/",
    "user-agent": "com.google.android.youtube/19.02.39 (Linux; U; Android 14) gzip"
}
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
let userdata = {}
let initedSessions = []
if(fs.existsSync(userdata_fname)) {
    try {
        userdata = JSON.parse(fs.readFileSync(userdata_fname).toString())
    }
    catch(error){}
} else {
    fs.writeFileSync(userdata_fname, "{}")
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
            || req.headers.device.length > 7) {
                res.sendStatus(400);
                return;
            }

            let device = req.headers.device
            if(!userdata[device]) {
                res.sendStatus(400);
                return;
            }

            refreshTube(device, () => {
                pullAllYouTubeAccounts(userdata[device], (data) => {
                    res.send(data)
                })
            })
        })

        app.post("/gsign_set", (req, res) => {
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
    },

    "handle_recommendations": function(req, res) {
        let deviceId = false;
        if(req.headers["x-gdata-device"]
        && req.headers["x-gdata-device"].includes("device-id=\"")) {
            deviceId = req.headers["x-gdata-device"]
                          .split("device-id=\"")[1]
                          .split("\"")[0];
        }

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
                    try {
                        r = r.contents.singleColumnBrowseResultsRenderer.tabs[0]
                             .tabRenderer.content.sectionListRenderer.contents;
                    }
                    catch(error) {
                        res.send(templates.gdata_emptyfeed);
                    }
                    r.forEach(s => {
                        try {
                            s = s.shelfRenderer.content.horizontalListRenderer
                                 .items;
                            s.forEach(i => {
                                if(i.gridVideoRenderer) {
                                    vl.push(i.gridVideoRenderer)
                                }
                            })
                        }
                        catch(error){console.log(error)}
                    })


                    vl.slice(0, 25).forEach(v => {
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
                            rt += templates.gdata_feedVideo(
                                v.videoId, v.title.runs[0].text, a,
                                utils.bareCount(v.viewCountText.runs[0].text),
                                utils.time_to_seconds(v.lengthText.runs[0].text),
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
                r = r.contents.singleColumnBrowseResultsRenderer
                     .tabs[0].tabRenderer.content.sectionListRenderer
                     .contents[0].itemSectionRenderer.contents;
                if(!r) {
                    res.send(templates.gdata_emptyfeed)
                    return;
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
                            v.command.innertubeCommand.commandExecutorCommand
                            .commands.forEach(c => {
                                if(c.browseEndpoint) {
                                    c = c.browseEndpoint
                                    id = c.browseId;
                                    if(c.canonicalBaseUrl
                                    && c.canonicalBaseUrl.includes("/@")) {
                                        handle = c.canonicalBaseUrl.split("/@")[1]
                                    }
                                }
                            })
                        }
                        catch(error){}
                        if(!id) return;
                        fullRes += templates.gdata_subscriptionChannel(
                            name, avatar, id, handle
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
                    videos.forEach(v => {
                        let author = v.authorHandle || v.authorId || ""
                        fullRes += templates.gdata_feedVideo(
                            v.id, v.title, author, v.views, v.length, "-",
                            v.upload, "-", "-", mobileflags.get_flags(req).watch
                        )
                    })
                    fullRes += templates.gdata_feedEnd;
                    res.send(fullRes)
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
                addToPl(favesId)
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

        // post comment
        setupYouTube(deviceId, (h) => {
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
                    userdata[deviceId].cachedName,
                    content,
                    new Date().toISOString()
                ])
                res.send(templates.gdata_feedComment(
                    id,
                    userdata[deviceId].cachedName,
                    content,
                    new Date().toISOString()
                ))
                fs.writeFileSync(userdata_fname, JSON.stringify(userdata))
            })})
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
        let private = body.includes("<yt:private")
        setupYouTube(deviceId, (h) => {
            fetch("https://www.youtube.com/youtubei/v1/playlist/create", {
                "headers": h,
                "method": "POST",
                "body": JSON.stringify({
                    "context": androidContext,
                    "privacyStatus": private ? "PRIVATE" : "PUBLIC",
                    "title": name,
                    "videoIds": []
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

                let title = v.split("/watch?v=" + id)[1].split(" - Go to channel")[0]
                title = title.split(" - ").slice(
                    0, title.split(" - ").length - 1
                ).join(" - ")
                if(title.includes("\x01")) {
                    title = title.substring(3)
                } else {
                    title = title.substring(2)
                }

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

                let length = v.split(" seconds")[0]
                length = length.split("(")[length.split("(").length - 1]
                               .split(" ")[0]
                length = length.replace(/[^0-9+\:]/g, "")

                let upload = v.split(" ago")[0]
                upload = upload.split(" · ")[upload.split(" · ").length - 1]
                if(isNaN(parseInt(upload.substring(0,2)))) {
                    upload = "1 minute ago"
                }

                videos.push({
                    "id": id,
                    "title": title,
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
    }
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
            r.contents[0].accountSectionListRenderer
            .contents[0].accountItemSectionRenderer.contents.forEach(a => {
                if(a.accountItem) {
                    a = a.accountItem
                    let name = pullName(a)
                    if(!a.isRedirectToStudio) {
                        accounts.push({
                            "name": name.name,
                            "handle": name.handle,
                            "pageId": a.serviceEndpoint.signInEndpoint
                                       .directSigninIdentity
                                       .effectiveObfuscatedGaiaId,
                            "selected": a.isSelected
                        })
                    }
                }
            })

            callback(accounts)
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

const i = new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])
const crypto = require("crypto")
function decryptWthIk(input) {
    let d = crypto.createDecipheriv("aes-128-cbc", getIk(), i)
    let c = d.update(input, "hex", "utf8").toString()
    c += d.final("utf8")
    return c;
}

function encryptWithIk(input) {
    let d = crypto.createCipheriv("aes-128-cbc", getIk(), i)
    let c = d.update(input, "utf8", "hex")
    c += d.final("hex")
    return c;
}

// calculate ik
let ik = false;
function getIk() {
    if(!ik) {
        ik = fs.statSync("./backend.js").birthtime
               .getTime().toString().padStart(16, "0");
    }
    return ik;
}
const yt2009html = require("./yt2009html")
const yt2009channels = require("./yt2009channels")
const yt2009playlists = require("./yt2009playlists")
const yt2009search = require("./yt2009search")
const yt2009videos = require("./yt2009videos")
const yt2009trusted = require("./yt2009trustedcontext")
const mobileauths = require("./yt2009mobileauths")
const constants = require("./yt2009constants.json")
const utils = require("./yt2009utils")
const config = require("./config.json")
const baseUrl = `http://${config.ip}:${config.port}`
const davatar = `${baseUrl}/assets/site-assets/default.png`
const search_proto = require("./proto/android_search_pb")
const player_proto = require("./proto/android_player_pb")
const next_proto = require("./proto/android_full_next_pb")
const browse_proto = require("./proto/video_list_proto_pb")
const resolve_proto = require("./proto/android_resolve_pb")
const guide_proto = require("./proto/android_guide_pb")
const chip = require("./yt2009templates").latestChip
const channelCache = require("./cache_dir/channel_cache")
const fs = require("fs")
const fetch = require("node-fetch")
const dbg = true;

function getBrowseData(message, outputVersion, outputRaw, protoType) {
    let deserialized;
    if(protoType) {
        deserialized = protoType.root.deserializeBinary(message).toObject()
    } else {
        deserialized = require("./proto/android_player_request_pb")
                       .root.deserializeBinary(message).toObject()
    }

    if(outputRaw) {
        return deserialized;
    }

    let CLIENT_VER = "6.0"
    try {
        CLIENT_VER = deserialized.contextList[0].clientList[0].clientversion
    }
    catch(error) {}
    
    let targetId = deserialized.videoid || deserialized.browseid || deserialized.query

    if(outputVersion) {
        return [targetId, CLIENT_VER]
    } else {
        return targetId;
    }
}

let w2w_tab_music = []
let w2w_tab_trending = []
function pullNewTrending() {
    // trending MUSIC (V5?-V10)
    
    let trendingMusic = "RDCLAK5uy_kmPRjHDECIcuVwnKsx2Ng7fyNgFKWNJFs"
    yt2009playlists.parsePlaylist(trendingMusic, (data) => {
        w2w_tab_music = data.videos.slice(0, 15)
    })

    // TRENDING TAB (V11<=)

    fetch("https://www.youtube.com/youtubei/v1/browse", {
        "method": "POST",
        "body": JSON.stringify({
            "context": constants.cached_innertube_context,
            "browseId": "FEtrending",
        }),
        "headers": constants.headers
    }).then(r => {r.json().then(r => {
        if(!r || !r.contents || !r.contents.twoColumnBrowseResultsRenderer) {
            console.log(
                `\n\n[warn] invalid trending response.`
            )
            console.log(
                `^ this will not affect usability, but is being looked into.`
            )
            return;
        }
        //fs.writeFileSync("./test.json", JSON.stringify(r))
        let c = r.contents.twoColumnBrowseResultsRenderer.tabs
                 .filter(s => s.tabRenderer && s.tabRenderer.selected)[0]
                 .tabRenderer.content.sectionListRenderer.contents
        let bareVids = []
        c.forEach(f => {
            try {
                let a = f.itemSectionRenderer.contents[0].shelfRenderer.content
                         .expandedShelfContentsRenderer.items
                a.forEach(v => {bareVids.push(v)})
            }
            catch(error) {}
        })
        bareVids = bareVids.slice(0, 20)
        w2w_tab_trending = []
        bareVids.forEach(v => {
            if(!v.videoRenderer) return;
            v = v.videoRenderer;
            if(!v.shortBylineText || !v.shortBylineText.runs) return;
            let byUsername = v.shortBylineText.runs[0].text;
            if(!v.shortBylineText.runs[0].navigationEndpoint.browseEndpoint) return;
            let byId = v.shortBylineText.runs[0].navigationEndpoint
                        .browseEndpoint.browseId;
            let video = {
                "id": v.videoId,
                "title": v.title.runs[0].text,
                "uploaderName": byUsername,
                "uploaderId": byId,
                "time": v.lengthText.simpleText,
                "views": v.viewCountText.simpleText,
                "uploaded": v.publishedTimeText.simpleText
            }
            w2w_tab_trending.push(video)
        })
    })})
}
pullNewTrending()
// pull trending daily
let x = setInterval(pullNewTrending, (1000 * 60 * 60 * 24))

module.exports = {
    "avatarWait": function(req, res) {
        if(!req.query.av
        || !req.query.av.startsWith("/assets/")
        || (!req.query.av.endsWith(".jpg")
        && !req.query.av.endsWith(".png"))
        || req.query.av.includes("..")) {
            res.sendStatus(400);
            return;
        }

        let f = decodeURIComponent(req.query.av)
        let fPath = __dirname.split("back")
        fPath.pop()
        fPath = fPath.join("back")
        let tries = 0;
        function avTry() {
            if(fs.existsSync(fPath + f)) {
                res.redirect(f)
                return;
            }
            tries++
            if(tries >= 5) {
                res.sendStatus(404)
                return;
            }
            setTimeout(() => {
                avTry()
            }, 1000)
        }
        avTry()
    },

    "staticRegister": function(req, res) {
        res.set("content-type", "application/json")
        deviceId = ""
        while(deviceId.length !== 9) {
            deviceId += "qwertyuiopasdfghjklzxcvbnm1234567890".split("")
                        [Math.floor(Math.random() * 36)]
        }
        res.send({
            "id": deviceId,
            "key": "AP+lc79/lqV58X9FLDdn7SiOzH8hDb1ItXMmm25Cb4YDLWZkI+gXBiwwOvcssAY"
        })
    },

    "rootHandle": function(req, res) {
        if(!req.originalUrl.includes("/youtubei/v1/")) {
            res.sendStatus(404)
            return;
        }

        let endpoint = req.originalUrl.split("/youtubei/v1/")[1].split("?")[0]
        switch(endpoint) {
            case "browse": {
                this.root_browse(req, res)
                break;
            }
            case "next": {
                this.root_next(req, res)
                break;
            }
            case "search": {
                this.root_search(req, res)
                break;
            }
            case "player": {
                this.root_player(req, res)
                break;
            }
            case "guide": {
                this.root_guide(req, res)
                return;
            }
            case "navigation/resolve_url": {
                this.root_resolve_url(req, res)
                break;
            }
            default: {
                res.sendStatus(404)
                return;
            }
        }
    },

    "root_player": function(req, res) {
        if(!mobileauths.isAuthorized(req, {"sendStatus": function(s) {}})) {
            createAuthPlayer(req, res)
            return;
        }
        res.set("content-type", "application/x-protobuf")
        let p = player_proto;
        let id = getBrowseData(
            req.body, false, false, require("./proto/android_player_request_pb")
        )
        let root = new p.root()
        let playability = new p.root.playabilityStatus()
        playability.setStatus(0)
        playability.setPlayableinembed(1)
        playability.setContentparams("CAESAggB")
        root.addPlayability(playability)
        let formats = new p.root.playerFormats()
        formats.setExpiresinseconds(21540)
        
        let f18Added = false;

        yt2009html.fetch_video_data(id, (data) => {
            data.qualities.forEach(f => {
                switch(f) {
                    case "360p": {
                        f18Added = true;
                        let url = `${baseUrl}/get_video?video_id=${id}/mp4`
                        url += yt2009trusted.urlContext(
                            id, "PLAYBACK_STD", (data.length >= 60 * 30)
                        )
                        let f = addFormat(18, url, "360p", p)
                        formats.addNondashformat(f)
                        break;
                    }
                    case "480p": {
                        let url = `${baseUrl}/get_480?video_id=${id}`
                        url += yt2009trusted.urlContext(
                            id, "PLAYBACK_HQ", (data.length >= 60 * 30)
                        )
                        let f = addFormat(59, url, "480p", p)
                        formats.addNondashformat(f)
                        break;
                    }
                    case "720p": {
                        let url = `${baseUrl}/exp_hd?video_id=${id}`
                        url += yt2009trusted.urlContext(
                            id, "PLAYBACK_HD", (data.length >= 60 * 30)
                        )
                        let f = addFormat(22, url, "720p", p)
                        formats.addNondashformat(f)
                        break;
                    }
                }
            })
            if(!f18Added) {
                let url = `${baseUrl}/get_video?video_id=${id}/mp4`
                url += yt2009trusted.urlContext(
                    id, "PLAYBACK_STD", (data.length >= 60 * 30)
                )
                let f = addFormat(18, url, "360p", p)
                formats.addNondashformat(f)
            }
            root.addFormats(formats)

            let meta = new p.root.metadata()
            meta.setId(id)
            meta.setTitle(data.title)
            meta.setVideolength(data.length)
            meta.setChannelid(data.author_id)
            meta.setDescription(data.description)
            let thumbList = new p.root.metadata.thumbList()
            let thumb = new p.root.metadata.thumbList.thumb()
            thumb.setUrl(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
            thumb.setWidth(480)
            thumb.setHeight(360)
            thumbList.addThumbnail(thumb)
            meta.addThumbnails(thumbList)
            meta.setViewcount(utils.bareCount(data.viewCount).toString())
            meta.setAuthorname(data.author_name)
            meta.setIsownerviewing(0)
            meta.setIscrawlable(0)
            meta.setAllowratings(0)
            meta.setIsprivate(0)
            meta.setIsunpluggedcorpus(0)
            meta.setIslivecontent(0)
            root.addVideometadata(meta)
            root.setPbvarious69("CAA%3D")

            res.send(Buffer.from(root.serializeBinary()))
            if(dbg) {fs.writeFileSync("../media/test_player", root.serializeBinary())}
        }, "", "", false, false, true)
    },

    "root_browse": function(req, res) {
        if(!mobileauths.isAuthorized(req, {"sendStatus": function(s) {}})) {
            createAuthBrowse(req, res)
            return;
        }
        res.set("content-type", "application/x-protobuf")
        let p = browse_proto;

        let browse = getBrowseData(req.body, true, false)

        let id = browse[0]
        let ver = browse[1] || 6;

        if(ver.split) {
            ver = parseInt(ver.split(".")[0])
        }

        console.log("BROWSE",id,ver)

        let root = new p.root()
        let context = new p.root.contextType()
        let client = new p.root.contextType.clientType()
        client.setService(6)
        let client_name = new p.root.contextType.clientType.clientParam()
        client_name.setName("client.name")
        client_name.setValue("ANDROID")
        client.addParam(client_name)
        let client_version = new p.root.contextType.clientType.clientParam()
        client_version.setName("client.version")
        client_version.setValue("1.0")
        client.addParam(client_version)
        context.addClient(client)
        context.setMaxageseconds(300)
        root.addContext(context)

        let body = new p.root.responseBody()
        let bd = new p.root.responseBody.singleColumnBrowseResultsRenderer()
        let tS = p.root.responseBody.singleColumnBrowseResultsRenderer
                  .tabs.tabRenderer
        if(id.startsWith("UC")) {
            // channel
            yt2009channels.main({
                "path": "/channel/" + id,
                "query": {},
                "headers": {}
            }, {"send": (data) => {
                // new videos
                let videos = []
                let vPullComplete = false;
                let playlists = []
                let pPullComplete = false;
                yt2009channels.get_direct_by_chipparam(chip, id, (v) => {
                    videos = v;
                    vPullComplete = true;
                    if(pPullComplete) {
                        createData(data, videos, playlists)
                    }
                })
                let fd = JSON.parse(JSON.stringify(data))
                fd.videos = []
                yt2009channels.get_additional_sections(fd, "", () => {
                    playlists = channelCache.read("playlist")[id]
                    pPullComplete = true;
                    if(vPullComplete) {
                        createData(data, videos, playlists)
                    }
                })
            }}, "", true)

            function createData(data, videos, playlists) {
                // header
                let header = new p.root.headerRender()
                let c4Header = new p.root.headerRender.c4Header()
                c4Header.setChannelid(id)
                c4Header.setChannelname(data.name)
                c4Header.addAvatars(generateThumbnails(
                    `${baseUrl}${data.avatar}`,
                    160, 160, p
                ))
                c4Header.addMobilebanners(generateThumbnails(
                    `${baseUrl}/assets/${data.newBanner || data.banner}`,
                    1060, 175, p
                ))
                if(data.properties.subscribers) {
                    c4Header.addSubscribecount(
                        generateRun(data.properties.subscribers + " subscribers", p)
                    )
                }

                let subscribeButton = new p.subscribeButtonData()
                let subContents = new p.subscribeButtonData.subContents()
                subContents.setChannelid(id)
                subContents.setInt3(0)
                subContents.setInt4(1)
                subContents.setInt6(0)
                subContents.setInt8(0)
                subContents.addSubscribebutton(generateRun("Subscribe", p))
                subContents.addSubscribedlabel(generateRun("Subscribed", p))
                subContents.addSubscribelabel(generateRun("Subscribe", p))
                subContents.addUnsubscribelabel(generateRun("Unsubscribe", p))
                let action1 = new p.subscribeButtonData.subContents.subAction()
                let action1d = new p.subscribeButtonData.subContents.subAction.sub1()
                action1d.setId(id)
                action1d.setParams("b")
                action1.addSubscr1(action1d)
                subContents.addAction(action1)
                let action2 = new p.subscribeButtonData.subContents.subAction()
                let action2d = new p.subscribeButtonData.subContents.subAction.sub2()
                action2d.setId(id)
                action2d.setParams("c")
                action2.addSubscr1(action2d)
                subContents.addAction(action2)
                subContents.setIdentifier("c4-subscribe")
                subscribeButton.addContent(subContents)
                c4Header.addSubscribebutton(subscribeButton)

                header.addChannelheader(c4Header)
                root.addHeader(header)

                // featured channels
                let friends = []
                if(data.friends) {
                    for(let f in data.friends) {
                        f = data.friends[f]
                        try {
                            f.forEach(c => {
                                friends.push(c)
                            })
                        }
                        catch(error) {}
                    }
                }

                // home tab
                let ht1 = new p.root.responseBody
                          .singleColumnBrowseResultsRenderer
                          .tabs();
                let ht2 = new tS()
                let ht3 = new tS.contentEntry()
                let ht4 = new tS.contentEntry.contentData()

                if(videos.length >= 1) {
                    let ht5 = new tS.contentEntry.contentData.contentActualData()
                    let shelf = generateShelf(
                        "Latest uploads", "videos",
                        videos.slice(0, 5), p, data.name, data.id
                    )
                    ht5.addShelf(shelf)
                    ht4.addC(ht5)
                }

                if(data.videos && data.videos.length >= 1) {
                    let ht5 = new tS.contentEntry.contentData.contentActualData()
                    let shelf = generateShelf(
                        "Popular videos", "videos",
                        data.videos.slice(0, 5), p, data.name, data.id
                    )
                    ht5.addShelf(shelf)
                    ht4.addC(ht5)
                }

                if(playlists && playlists.length >= 1) {
                    let ht5 = new tS.contentEntry.contentData.contentActualData()
                    let shelf = generateShelf(
                        "Playlists", "playlists",
                        playlists.slice(0, 5), p, data.name, data.id
                    )
                    ht5.addShelf(shelf)
                    ht4.addC(ht5)
                }

                if(friends.length >= 1) {
                    let ht5 = new tS.contentEntry.contentData.contentActualData()
                    let shelf = generateShelf(
                        "Featured channels", "channels",
                        friends.slice(0, 5), p, data.name, data.id
                    )
                    ht5.addShelf(shelf)
                    ht4.addC(ht5)
                }
                
                ht3.addContentarray(ht4)
                ht2.setSelected(1)
                ht2.setTabidentifier("Home")
                ht2.addContentsentry(ht3)
                ht2.setTabtitle("Home")
                ht1.addTabrender(ht2)
                bd.addTab(ht1)


                // videos tab
                let vt1 = new p.root.responseBody
                          .singleColumnBrowseResultsRenderer
                          .tabs();
                let vt2 = new tS()
                let vt3 = new tS.contentEntry()
                let vt4 = new tS.contentEntry.contentData()
                let vt5 = new tS.contentEntry.contentData.contentActualData()
                let vs = new p.itemSectionRenderer()
                videos.forEach(v => {
                    let visc = new p.itemSectionRenderer.icsContents()
                    visc.addVideo(generateVideo(
                        v.id, v.title, data.name, data.id,
                        `${baseUrl}${data.avatar}`, v.upload, v.views,
                        v.length, p
                    ))
                    vs.addIcscontent(visc)
                })
                vt5.addSection(vs)
                vt4.addC(vt5)
                vt3.addContentarray(vt4)
                vt2.setSelected(0)
                vt2.setTabidentifier("Videos")
                vt2.addContentsentry(vt3)
                vt2.setTabtitle("Videos")
                vt1.addTabrender(vt2)
                bd.addTab(vt1)


                // playlists tab
                if(playlists && playlists.length >= 1) {
                    let pt1 = new p.root.responseBody
                              .singleColumnBrowseResultsRenderer
                              .tabs();
                    let pt2 = new tS()
                    let pt3 = new tS.contentEntry()
                    let pt4 = new tS.contentEntry.contentData()
                    let pt5 = new tS.contentEntry.contentData.contentActualData()
                    let ps = new p.itemSectionRenderer()
                    playlists.forEach(pl => {
                        let pisc = new p.itemSectionRenderer.icsContents()
                        pisc.addPlaylist(generatePlaylist(
                            pl.id, pl.name, "", "", pl.videos + " videos",
                            [pl.thumbnail.split("/vi/")[1].split("/")[0]],
                            p
                        ))
                        ps.addIcscontent(pisc)
                    })
                    pt5.addSection(ps)
                    pt4.addC(pt5)
                    pt3.addContentarray(pt4)
                    pt2.setSelected(0)
                    pt2.setTabidentifier("Playlists")
                    pt2.addContentsentry(pt3)
                    pt2.setTabtitle("Playlists")
                    pt1.addTabrender(pt2)
                    bd.addTab(pt1)
                }

                // channels tab
                if(friends && friends.length >= 1) {
                    let ft1 = new p.root.responseBody
                              .singleColumnBrowseResultsRenderer
                              .tabs();
                    let ft2 = new tS()
                    let ft3 = new tS.contentEntry()
                    let ft4 = new tS.contentEntry.contentData()
                    let ft5 = new tS.contentEntry.contentData.contentActualData()
                    let fs = new p.itemSectionRenderer()
                    friends.forEach(f => {
                        let fisc = new p.itemSectionRenderer.icsContents()
                        fisc.addChannel(generateChannel(
                            f.name, f.avatar, "", f.id, p
                        ))
                        fs.addIcscontent(fisc)
                    })
                    ft5.addSection(fs)
                    ft4.addC(ft5)
                    ft3.addContentarray(ft4)
                    ft2.setSelected(0)
                    ft2.setTabidentifier("Channels")
                    ft2.addContentsentry(ft3)
                    ft2.setTabtitle("Channels")
                    ft1.addTabrender(ft2)
                    bd.addTab(ft1)
                }

                // about tab
                if(data.properties.description) {
                    let at1 = new p.root.responseBody
                              .singleColumnBrowseResultsRenderer
                              .tabs();
                    let at2 = new tS()
                    let at3 = new tS.contentEntry()
                    let at4 = new tS.contentEntry.contentData()
                    let at5 = new tS.contentEntry.contentData.contentActualData()
                    let as = new p.itemSectionRenderer()
                    let aisc = new p.itemSectionRenderer.icsContents()
                    let aboutTab = new p.aboutRenderer()
                    aboutTab.addChanneldescription(
                        generateRun(data.properties.description, p)
                    )
                    aboutTab.setWeburl(
                        "https://www.youtube.com/channel/" + id
                    )
                    aisc.addAbout(aboutTab)
                    as.addIcscontent(aisc)
                    at5.addSection(as)
                    at4.addC(at5)
                    at3.addContentarray(at4)
                    at2.setSelected(0)
                    at2.setTabidentifier("About")
                    at2.addContentsentry(at3)
                    at2.setTabtitle("About")
                    at1.addTabrender(at2)
                    bd.addTab(at1)
                }


                body.addBrowsedata(bd)
                root.addContents(body)
                res.send(Buffer.from(root.serializeBinary()))
                if(dbg) {fs.writeFileSync("../media/test_channel", root.serializeBinary())}
            }
            return;
        }
        if(id.startsWith("VL")) {
            // playlist
            let pid = id.replace("VL", "")
            yt2009playlists.parsePlaylist(pid, (data) => {
                // header
                let header = new p.root.headerRender()
                let vlHeader = new p.root.headerRender.vlHeader()
                vlHeader.setId("PLsus")
                vlHeader.addName(generateRun(data.name, p))
                vlHeader.addVideocount(generateRun(data.videoCount, p))
                vlHeader.addDescription(generateRun(data.description, p))
                let owner = new p.authorData()
                let ownerC = new p.authorData.authorDataContent()
                ownerC.setAuthordisplayname(data.creatorName)
                let creatorId = data.creatorUrl.split("/channel/")[1]
                ownerC.setNavigation(generateBrowseData(
                    creatorId, false, data.creatorUrl, p
                ))
                owner.setAc(ownerC)
                vlHeader.addOwner(owner)
                let pb11 = new p.root.headerRender.vlHeader.pb11()
                pb11.setInt1(1)
                vlHeader.addUnk11(pb11)
                vlHeader.setPublic(1)
                vlHeader.addNavigationdata(
                    generateBrowseData(pid, false, false, p)
                )
                vlHeader.addInlineproperty(
                    generateRun(data.videoCount, p)
                )
                header.addPlaylistheader(vlHeader)
                root.addHeader(header)


                // body --videos
                let t1 = new p.root.responseBody
                              .singleColumnBrowseResultsRenderer.tabs()
                let t2 = new p.root.responseBody
                              .singleColumnBrowseResultsRenderer
                              .tabs.tabRenderer()
                let tS = p.root.responseBody
                          .singleColumnBrowseResultsRenderer
                          .tabs.tabRenderer
                let t3 = new tS.contentEntry()
                let t4 = new tS.contentEntry.contentData()
                let t5 = new tS.contentEntry.contentData.contentActualData()
                let pBody = new p.playlistData()
                pBody.setId(pid)
                let videoIndex = 1;
                data.videos.forEach(v => {
                    pBody.addVideo(generatePlaylistVideo(
                        v.id, v.title, v.uploaderName, (v.uploaderId || ""),
                        v.time, pid, p, videoIndex
                    ))
                    videoIndex++
                })
                t5.addPlaylist(pBody)
                t4.addC(t5)
                t3.addContentarray(t4)
                t2.setSelected(1)
                t2.setTabidentifier("Playlist")
                t2.addContentsentry(t3)
                t2.setTabtitle("Playlist")
                t1.addTabrender(t2)
                bd.addTab(t1)
                body.addBrowsedata(bd)
                root.addContents(body)

                res.send(Buffer.from(root.serializeBinary()))
                if(dbg) {fs.writeFileSync("../media/test_playlist", root.serializeBinary())}
            })
            return;
        }
        if(id.startsWith("FEwhat_to_watch")) {
            // homepage
            let usesV11Tabs = false;
            if(ver >= 11) {
                usesV11Tabs = true;
            }

            let t1 = new p.root.responseBody
                          .singleColumnBrowseResultsRenderer
                          .tabs();
            let t2 = new tS()
            let t3 = new tS.contentEntry()
            let t4 = new tS.contentEntry.contentData()
            let t5 = new tS.contentEntry.contentData.contentActualData()

            yt2009videos.internal_getVideos(
                {"query": {"s": "mr", "max": 15}}, ""
            ).forEach(v => {
                let ics = new p.itemSectionRenderer()
                let icsC = new p.itemSectionRenderer.icsContents()
                icsC.addVideo(generateVideo(
                    v.id, v.title, v.uploaderName,
                    v.uploaderUrl.split("/channel/")[1], davatar,
                    v.upload, v.views, utils.seconds_to_time(v.length), p
                ))
                ics.addIcscontent(icsC)
                t5.addSection(ics)
            })

            t4.addC(t5)
            t3.addContentarray(t4)
            t2.setSelected(1)
            t2.setTabidentifier("FEwhat_to_watch")
            t2.addContentsentry(t3)
            t2.setTabtitle("Home")
            if(usesV11Tabs) {
                let tabRendererIcon = new tS.icon()
                tabRendererIcon.setIcontype(65) // icon HOME
                t2.addIcondata(tabRendererIcon)
            }
            t1.addTabrender(t2)
            bd.addTab(t1)

            // if not usesV11Tabs, add music tab
            // otherwise add trending and account
            if(!usesV11Tabs) {
                let h1 = new p.root.responseBody
                        .singleColumnBrowseResultsRenderer
                        .tabs();
                let h2 = new tS()
                let h3 = new tS.contentEntry()
                let h4 = new tS.contentEntry.contentData()
                let h5 = new tS.contentEntry.contentData.contentActualData()

                w2w_tab_music.forEach(v => {
                    let ics = new p.itemSectionRenderer()
                    let icsC = new p.itemSectionRenderer.icsContents()
                    icsC.addVideo(generateVideo(
                        v.id, v.title, v.uploaderName,
                        (v.uploaderId || ""), davatar,
                        "", v.views, v.time, p
                    ))
                    ics.addIcscontent(icsC)
                    h5.addSection(ics)
                })

                h4.addC(h5)
                h3.addContentarray(h4)
                h2.setSelected(0)
                h2.setTabidentifier("FEmusic")
                h2.addContentsentry(h3)
                h2.setTabtitle("Music")
                h1.addTabrender(h2)
                bd.addTab(h1)

                body.addBrowsedata(bd)
                root.addContents(body)

                let header = new p.root.headerRender()
                let headerContent = new p.root.headerRender.headerContent()
                headerContent.addText(generateRun("What to Watch", p))
                header.addContent(headerContent)
                root.addHeader(header)
            } else {
                // TRENDING tab
                let h1 = new p.root.responseBody
                        .singleColumnBrowseResultsRenderer
                        .tabs();
                let h2 = new tS()
                let h3 = new tS.contentEntry()
                let h4 = new tS.contentEntry.contentData()
                let h5 = new tS.contentEntry.contentData.contentActualData()

                w2w_tab_trending.forEach(v => {
                    let ics = new p.itemSectionRenderer()
                    let icsC = new p.itemSectionRenderer.icsContents()
                    icsC.addVideo(generateVideo(
                        v.id, v.title, v.uploaderName,
                        (v.uploaderId || ""), davatar,
                        v.uploaded, v.views, v.time, p
                    ))
                    ics.addIcscontent(icsC)
                    h5.addSection(ics)
                })

                h4.addC(h5)
                h3.addContentarray(h4)
                h2.setSelected(0)
                h2.setTabidentifier("FEtrending")
                h2.addContentsentry(h3)
                h2.setTabtitle("Trending")
                let hIcon = new tS.icon()
                hIcon.setIcontype(67) // icon TRENDING
                h2.addIcondata(hIcon)
                h1.addTabrender(h2)
                bd.addTab(h1)

                // ACCOUNT tab
                let i1 = new p.root.responseBody
                        .singleColumnBrowseResultsRenderer
                        .tabs();
                let i2 = new tS()
                let i3 = new tS.contentEntry()
                let i4 = new tS.contentEntry.contentData()
                let i5 = new tS.contentEntry.contentData.contentActualData()
                
                let i6 = new p.itemSectionRenderer()
                let i7 = new p.itemSectionRenderer.icsContents()
                let i8 = new p.accountTabLink()
                let icon = new p.accountTabLink.icon()
                icon.setIcontype(69)
                i8.setIcondata(icon)
                i8.addText(generateRun("Sign in", p))
                i7.addAccountlink(i8)
                i6.addIcscontent(i7)
                i5.addSection(i6)

                i4.addC(i5)
                i3.addContentarray(i4)
                i2.setSelected(0)
                i2.setTabidentifier("FEaccount")
                i2.addContentsentry(i3)
                i2.setTabtitle("Account")
                let iIcon = new tS.icon()
                iIcon.setIcontype(69) // icon ACCOUNT
                i2.addIcondata(iIcon)
                i1.addTabrender(i2)
                bd.addTab(i1)

                body.addBrowsedata(bd)
                root.addContents(body)

                let header = new p.root.headerRender()
                let headerContent = new p.root.headerRender.headerContent()
                headerContent.addText(generateRun("YouTube", p))
                header.addContent(headerContent)
                root.addHeader(header)
            }

            res.send(Buffer.from(root.serializeBinary()))
            if(dbg) {fs.writeFileSync(
                "../media/test_w2w", root.serializeBinary()
            )}
            
            return;
        }
        if(id.startsWith("FEtrending")) {
            let t1 = new p.root.responseBody
                          .singleColumnBrowseResultsRenderer
                          .tabs();
            let t2 = new tS()
            let t3 = new tS.contentEntry()
            let t4 = new tS.contentEntry.contentData()
            let t5 = new tS.contentEntry.contentData.contentActualData()

            let requestParams = {
                "context": constants.cached_innertube_context,
                "browseId": "FEtrending",
            }
            if(id.includes("+")) {
                requestParams.params = id.split("+")[1]
            }
            fetch("https://www.youtube.com/youtubei/v1/browse", {
                "method": "POST",
                "body": JSON.stringify(requestParams),
                "headers": constants.headers
            }).then(r => {r.json().then(r => {
                let c = r.contents.twoColumnBrowseResultsRenderer.tabs
                        .filter(s => s.tabRenderer && s.tabRenderer.selected)[0]
                        .tabRenderer.content.sectionListRenderer.contents
                let bareVids = []
                c.forEach(f => {
                    try {
                        let a = f.itemSectionRenderer.contents[0].shelfRenderer.content
                                .expandedShelfContentsRenderer.items
                        a.forEach(v => {bareVids.push(v)})
                    }
                    catch(error) {}
                })
                bareVids = bareVids.slice(0, 20)

                let title = r.contents.twoColumnBrowseResultsRenderer.tabs
                         .filter(s => s.tabRenderer && s.tabRenderer.selected)[0]
                         .tabRenderer.title;
                
                bareVids.forEach(v => {
                    if(!v.videoRenderer) return;
                    v = v.videoRenderer;
                    let ics = new p.itemSectionRenderer()
                    let icsC = new p.itemSectionRenderer.icsContents()
                    if(!v.shortBylineText || !v.shortBylineText.runs) return;
                    let byUsername = v.shortBylineText.runs[0].text;
                    let byId = v.shortBylineText.runs[0].navigationEndpoint
                                .browseEndpoint.browseId;
                    icsC.addVideo(generateVideo(
                        v.videoId, v.title.runs[0].text, byUsername, byId,
                        davatar, v.publishedTimeText.simpleText,
                        v.viewCountText.simpleText, v.lengthText.simpleText, p
                    ))
                    ics.addIcscontent(icsC)
                    t5.addSection(ics)
                })

                t4.addC(t5)
                t3.addContentarray(t4)
                t2.setSelected(1)
                t2.setTabidentifier(title)
                t2.addContentsentry(t3)
                t2.setTabtitle(title)
                t1.addTabrender(t2)
                bd.addTab(t1)
                body.addBrowsedata(bd)
                root.addContents(body)

                let header = new p.root.headerRender()
                let headerContent = new p.root.headerRender.headerContent()
                headerContent.addText(generateRun(title, p))
                header.addContent(headerContent)
                root.addHeader(header)

                res.send(Buffer.from(root.serializeBinary()))
                if(dbg) {fs.writeFileSync(
                    "../media/test_trending", root.serializeBinary()
                )}
            })})
            return;
        }
        if(id.startsWith("FEvl_as_browse_")) {
            let t1 = new p.root.responseBody
                          .singleColumnBrowseResultsRenderer
                          .tabs();
            let t2 = new tS()
            let t3 = new tS.contentEntry()
            let t4 = new tS.contentEntry.contentData()
            let t5 = new tS.contentEntry.contentData.contentActualData()
            let plid = id.split("FEvl_as_browse_")[1].split("+")[0]
            let title = id.split("+title-")[1]
            yt2009playlists.parsePlaylist(plid, (data) => {
                let videosStart = Math.floor(Math.random() * data.videos.length);
                let vs = data.videos.slice(videosStart, videosStart + 25);

                vs.forEach(v => {
                    let ics = new p.itemSectionRenderer()
                    let icsC = new p.itemSectionRenderer.icsContents()
                    icsC.addVideo(generateVideo(
                        v.id, v.title, v.uploaderName, v.uploaderId,
                        davatar, "", v.views, v.time, p
                    ))
                    ics.addIcscontent(icsC)
                    t5.addSection(ics)
                })

                t4.addC(t5)
                t3.addContentarray(t4)
                t2.setSelected(1)
                t2.setTabidentifier(title)
                t2.addContentsentry(t3)
                t2.setTabtitle(title)
                t1.addTabrender(t2)
                bd.addTab(t1)
                body.addBrowsedata(bd)
                root.addContents(body)

                let header = new p.root.headerRender()
                let headerContent = new p.root.headerRender.headerContent()
                headerContent.addText(generateRun(title, p))
                header.addContent(headerContent)
                root.addHeader(header)

                res.send(Buffer.from(root.serializeBinary()))
                if(dbg) {fs.writeFileSync(
                    "../media/test_vl_as_browse", root.serializeBinary()
                )}
            })
            return;
        }
        if(id.startsWith("FEbare_user_as_browse_")) {
            let t1 = new p.root.responseBody
                          .singleColumnBrowseResultsRenderer
                          .tabs();
            let t2 = new tS()
            let t3 = new tS.contentEntry()
            let t4 = new tS.contentEntry.contentData()
            let t5 = new tS.contentEntry.contentData.contentActualData()
            let user = id.split("FEbare_user_as_browse_")[1].split("+")[0]
            let title = id.split("+title-")[1]
            yt2009channels.get_direct_by_chipparam(chip, user, (data) => {
                data.forEach(v => {
                    let ics = new p.itemSectionRenderer()
                    let icsC = new p.itemSectionRenderer.icsContents()
                    icsC.addVideo(generateVideo(
                        v.id, v.title, title, user,
                        davatar, v.upload, v.views, v.length, p
                    ))
                    ics.addIcscontent(icsC)
                    t5.addSection(ics)
                })
                t4.addC(t5)
                t3.addContentarray(t4)
                t2.setSelected(1)
                t2.setTabidentifier(title)
                t2.addContentsentry(t3)
                t2.setTabtitle(title)
                t1.addTabrender(t2)
                bd.addTab(t1)
                body.addBrowsedata(bd)
                root.addContents(body)

                let header = new p.root.headerRender()
                let headerContent = new p.root.headerRender.headerContent()
                headerContent.addText(generateRun(title, p))
                header.addContent(headerContent)
                root.addHeader(header)

                res.send(Buffer.from(root.serializeBinary()))
                if(dbg) {fs.writeFileSync(
                    "../media/test_user_as_browse", root.serializeBinary()
                )}
            })
            return;
        }
        if(id.startsWith("FEgrid_as_browse_")) {
            let t1 = new p.root.responseBody
                          .singleColumnBrowseResultsRenderer
                          .tabs();
            let t2 = new tS()
            let t3 = new tS.contentEntry()
            let t4 = new tS.contentEntry.contentData()
            let t5 = new tS.contentEntry.contentData.contentActualData()

            let browseId = id.split("FEgrid_as_browse_")[1].split("+")[0]
            let requestParams = {
                "context": constants.cached_innertube_context,
                "browseId": browseId,
            }
            if(id.includes("+")) {
                requestParams.params = id.split("+")[1]
            }
            let title = ""

            fetch("https://www.youtube.com/youtubei/v1/browse", {
                "method": "POST",
                "body": JSON.stringify(requestParams),
                "headers": constants.headers
            }).then(r => {r.json().then(r => {
                r = r.contents.twoColumnBrowseResultsRenderer.tabs[0]
                     .tabRenderer.content.richGridRenderer;
                
                if(r.title && r.title.runs) {
                    title = r.title.runs[0].text
                }

                r.contents.forEach(v => {
                    try {
                        v = v.richItemRenderer.content.videoRenderer;
                        let ics = new p.itemSectionRenderer()
                        let icsC = new p.itemSectionRenderer.icsContents()
                        if(!v.shortBylineText || !v.shortBylineText.runs) return;
                        let byUsername = v.shortBylineText.runs[0].text;
                        let byId = v.shortBylineText.runs[0].navigationEndpoint
                                    .browseEndpoint.browseId;
                        icsC.addVideo(generateVideo(
                            v.videoId, v.title.runs[0].text, byUsername,
                            byId, davatar, v.publishedTimeText.simpleText,
                            v.viewCountText.simpleText,
                            v.lengthText.simpleText, p
                        ))
                        ics.addIcscontent(icsC)
                        t5.addSection(ics)
                    }
                    catch(error) {}
                })

                t4.addC(t5)
                t3.addContentarray(t4)
                t2.setSelected(1)
                t2.setTabidentifier(title)
                t2.addContentsentry(t3)
                t2.setTabtitle(title)
                t1.addTabrender(t2)
                bd.addTab(t1)
                body.addBrowsedata(bd)
                root.addContents(body)

                let header = new p.root.headerRender()
                let headerContent = new p.root.headerRender.headerContent()
                headerContent.addText(generateRun(title, p))
                header.addContent(headerContent)
                root.addHeader(header)

                res.send(Buffer.from(root.serializeBinary()))
                if(dbg) {fs.writeFileSync(
                    "../media/test_grid_as_browse", root.serializeBinary()
                )}
            })})
            return;
        }


        // send empty response in case of unsupported feed
        res.status(200).send("")
    },

    "root_next": function(req, res) {
        // currently only use /next for video metadata, so only use videoids
        res.set("content-type", "application/x-protobuf")
        if(!mobileauths.isAuthorized(req, {"sendStatus": function(s) {}})) {
            createAuthNext(req, res)
            return;
        }
        let p = next_proto;
        let isc = p.root.contents.singleColumnWatchNextResults
                   .contents.results.contents.itemSectionRenderer;
                
        let id = getBrowseData(req.body)

        if(id.length !== 11) {res.sendStatus(400);return;}
        let root = new p.root()
        let c = new p.root.contents()
        let sc = new p.root.contents.singleColumnWatchNextResults()
        let d1 = new p.root.contents.singleColumnWatchNextResults
                      .contents()
        let d2 = new p.root.contents.singleColumnWatchNextResults
                      .contents.results();
        let d3 = new p.root.contents.singleColumnWatchNextResults
                      .contents.results.contents();

        yt2009html.fetch_video_data(id, (data) => {
            // video data renderer
            let vs = new isc()
            let vc = new isc.contents()
            let vmRenderer = new p.videoMetadataRenderer()
            vmRenderer.setTitle(generateRun(data.title, p))
            let temp = new Date(data.upload)
            let upload = ["Jan", "Feb", "Mar", "Apr",
                          "May", "Jun", "Jul", "Aug",
                          "Sep", "Oct", "Nov", "Dec"][temp.getMonth()]
                          + " " + temp.getDate()
                          + ", " + temp.getFullYear()
            let views = utils.countBreakup(data.viewCount) + " views"
            vmRenderer.setViewcount(generateRun(views, p))
            vmRenderer.setDescription(generateRun(data.description, p))
            vmRenderer.setPublishdate(generateRun(`Published on ${upload}`, p))
            vmRenderer.setVideoid("aC0EYufA4nY")
            vmRenderer.setShortviewcount(generateRun(views, p))
            vmRenderer.setAllowratings(1)
            vmRenderer.setIslimitedstate(0)

            let pb13 = new p.videoMetadataRenderer.pbVarious13()
            let pb13Data = new p.videoMetadataRenderer.pbVarious13.pbVarious()
            pb13Data.setVideoid(generateRun(id, p))
            pb13Data.addCount1(generateSimple("Like", p))
            pb13Data.setInt2(2)
            pb13Data.setInt3(30358)
            pb13Data.setInt13(1)
            pb13Data.setInt23(0)
            pb13.addPb(pb13Data)
            vmRenderer.addPb13(pb13)

            vc.addVideometadata(vmRenderer)
            vs.addContent(vc)
            d3.addItemsectionrender(vs)

            // author render
            let as = new isc()
            let ac = new isc.contents()
            let authorData = new p.authorRendererData()

            let avatarUrl = data.author_img;
            if(data.author_img.startsWith("/assets/")) {
                avatarUrl = baseUrl + data.author_img
            }
            authorData.setAvatars(generateThumbnails(avatarUrl, 88, 88, p))
            authorData.setName(generateRun(data.author_name, p))
            //authorData.addSubscribecount(generateRun("subscribers?"))
            authorData.setNavidata(generateBrowseData(
                data.author_id, false, `/channel/${data.author_id}`, p
            ))
            
            
            let asub = new p.authorRendererData.subscribeButtonData()
            let asubc = new p.authorRendererData.subscribeButtonData
                             .subContents()
            asubc.setChannelid(data.author_id)
            asubc.setInt3(0)
            asubc.setInt4(1)
            asubc.setInt6(0)
            asubc.setInt8(0)
            asubc.setSubscribebutton(generateRun("Subscribe", p))
            asubc.setSubscribedlabel(generateRun("Subscribed", p))
            asubc.setSubscribelabel(generateRun("Subscribe", p))
            asubc.setUnsubscribelabel(generateRun("Unsubscribe", p))
            let action1 = new p.authorRendererData.subscribeButtonData
                               .subContents.subAction()
            let action1d = new p.authorRendererData.subscribeButtonData
                                .subContents.subAction.sub1()
            action1d.setId(data.author_id)
            action1d.setParams("b")
            action1.addSubscr1(action1d)
            asubc.addAction(action1)
            let action2 = new p.authorRendererData.subscribeButtonData
                               .subContents.subAction()
            let action2d = new p.authorRendererData.subscribeButtonData
                                .subContents.subAction.sub2()
            action2d.setId(data.author_id)
            action2d.setParams("c")
            action2.addSubscr1(action2d)
            asubc.addAction(action2)
            asubc.setIdentifier("watch-subscribe")
            asub.addContent(asubc)
            authorData.addSubscribebutton(asub)

            ac.addAuthordata(authorData)
            as.addContent(ac)
            d3.addItemsectionrender(as)

            // related videos
            let s = new isc()
            data.related.forEach(v => {
                let c = new isc.contents()
                c.addNextvideo(generateVideo(
                    v.id, v.title, v.creatorName,
                    v.creatorUrl.split("/channel/")[1], davatar,
                    v.uploaded, v.views, v.length, p
                ))
                s.addContent(c)
            })
            d3.addItemsectionrender(s)
            
            // finalize
            d2.addContent(d3)
            d1.addResult(d2)
            sc.addContent(d1)
            c.addNextresults(sc)
            root.addContent(c)

            let nav = new p.navigationData()
            let navd = new p.navigationData.navData()
            navd.setNavid(id)
            nav.setNavproperties(navd)
            root.setNavigationendpoint(nav)

            let overlays = new p.root.playerOverlays()
            let overlaysrender = new p.root.playerOverlays.playerOverlaysRenderer()
            overlays.setOverlay(overlaysrender)
            root.setPoverlays(overlays)

            res.send(Buffer.from(root.serializeBinary()))
            if(dbg) {fs.writeFileSync("../media/test_full_next", root.serializeBinary())}
        }, "", "", false, false, true)
    },

    "root_search": function(req, res) {
        if(!mobileauths.isAuthorized(req, res)) return;
        res.set("content-type", "application/x-protobuf")
        let p = search_proto;

        let browseData = getBrowseData(
            req.body, true, true, require("./proto/android_search_request_pb")
        )

        let root = new p.root()
        let content = p.root.contents.searchResults.contents
                       .itemSectionRender.contents;
        
        let d1 = new p.root.contents()
        let d2 = new p.root.contents.searchResults()
        let d3 = new p.root.contents.searchResults.contents()
        let d4 = new p.root.contents.searchResults.contents.itemSectionRender()

        let params = parseSearch(browseData.params)
        let query = browseData.query
        if(!query) {res.sendStatus(400);return;}

        yt2009search.get_search(query, "", params, (sr) => {
            sr.forEach(result => {
                switch(result.type) {
                    case "video": {
                        let r = new content()
                        r.addVideo(generateVideo(
                            result.id, result.title, result.author_name,
                            result.author_url.split("/channel/")[1],
                            davatar, result.upload, result.views,
                            result.time, p
                        ))
                        d4.addContent(r)
                        break;
                    }
                    case "channel": {
                        let a = `${baseUrl}${result.avatar}`
                        let r = new content()
                        r.addChannel(generateChannel(
                            result.name, a, result.subscribers,
                            result.url.split("/channel/")[1], p
                        ))
                        d4.addContent(r)
                        break;
                    }
                    case "playlist": {
                        let previewVids = []
                        if(result.videos && result.videos.length >= 1) {
                            previewVids.push(result.videos[0].id)
                        }
                        let r = new content()
                        let vcount = result.videoCount;
                        if(!vcount.includes("videos")) {
                            vcount += " videos"
                        }
                        if(!vcount.includes("50+")) {
                            r.addPlaylist(generatePlaylist(
                                result.id, result.name, "", "",
                                vcount, previewVids, p
                            ))
                            d4.addContent(r)
                        }
                        break;
                    }
                }
            })

            d3.addSection(d4)
            d2.addContent(d3)
            d1.addResultscontainer(d2)
            root.addContent(d1)
            res.send(Buffer.from(root.serializeBinary()))
            if(dbg) {fs.writeFileSync("../media/test_search", root.serializeBinary())}
        }, "")
    },

    "root_resolve_url": function(req, res) {
        if(!mobileauths.isAuthorized(req, res)) return;
        res.set("content-type", "application/x-protobuf")
        let p = resolve_proto;

        let query = getBrowseData(req.body)

        let root = new p.root()
        let content = new p.root.contents()

        function finalize() {
            root.addContent(content)
            res.send(Buffer.from(root.serializeBinary()))
            if(dbg) {fs.writeFileSync("../media/test_resolve", root.serializeBinary())}
        }

        if(query.includes("/watch")) {
            let v = new p.videoNavigation()
            v.setId(query.split("v=")[1].split("&")[0].split("#")[0])
            content.addVideo(v)
            finalize()
            return;
        }
        if(query.includes("/yt.be/")) {
            let v = new p.videoNavigation()
            v.setId(
                query.split("/yt.be/")[1].split("?")[0]
                     .split("&")[0].split("#")[0]
            )
            content.addVideo(v)
            finalize()
            return;
        }
        if(query.includes("search_query=")) {
            let s = new p.searchNavigation()
            s.setQuery(decodeURIComponent(
                query.split("search_query=")[1].split("+")
                     .join(" ").split("&")[0].split("#")[0]
            ))
            content.addSearch(s)
            finalize()
            return;
        }

        // otherwise treat as /browse
        fetch("https://www.youtube.com/youtubei/v1/navigation/resolve_url", {
            "headers": constants.headers,
            "method": "POST",
            "body": JSON.stringify({
                "context": constants.cached_innertube_context,
                "url": query
            })
        }).then(r => {r.json().then(r => {
            try {
                let e = r.endpoint.browseEndpoint

                let b = new p.browseNavigation()
                if(e.browseId) {
                    b.setBrowseid(e.browseId)
                }
                if(e.params) {
                    b.setParams(e.params)
                }

                content.addBrowse(b)
                finalize()
            }
            catch(error) {
                console.log(error)
                res.sendStatus(500)
            }
        })})
    },

    "root_guide": function(req, res) {
        res.set("content-type", "application/x-protobuf")
        let p = guide_proto;
        let root = new p.root()

        // w2w top item
        let c1 = new p.root.items()
        let c2 = new p.root.items.guideSectionRenderer()
        let c3 = new p.root.items.guideSectionRenderer.contents()
        let entry = new p.guideEntry()
        entry.setTitle("What to Watch")
        let homeIcon = new p.guideEntry.iconContainer()
        homeIcon.setIcontype(5)
        entry.addIcon(homeIcon)
        entry.addNavigation(generateBrowseData("FEwhat_to_watch", false, false, p))
        c3.addEntry(entry)
        c2.addContent(c3)
        c1.addGuidesection(c2)
        root.addItem(c1)

        // yt feeds
        let d1 = new p.root.items()
        let d2 = new p.root.items.guideSectionRenderer()
        let entries = [
            ["Popular on YouTube",
            "https://www.youtube.com/img/trending/avatar/trending.png",
            "FEtrending"],
            ["Music",
            "https://www.youtube.com/img/trending/chips/music_80x80.png",
            "FEvl_as_browse_RDCLAK5uy_kmPRjHDECIcuVwnKsx2Ng7fyNgFKWNJFs+title-Music"],
            ["Sports",
            "https://yt3.googleusercontent.com/RV7Xjtmnl7ld6OERcxfHRePw3dfRRAcD5_OyEZHiBIA6DBkQwiL0WjHV4nQDrVwOknlJTTbRfQ=s88-c-k-c0x00ffffff-no-rj-mo",
            "FEgrid_as_browse_UCEgdi0XIXXZ-qJOFPf4JSKw+EglzcG9ydHN0YWKSAQMIxwE%3D"],
            ["Gaming",
            "https://www.youtube.com/img/trending/chips/gaming_80x80.png",
            "FEtrending+4gIcGhpnYW1pbmdfY29ycHVzX21vc3RfcG9wdWxhcg%3D%3D"],
            ["Movies",
            "https://www.youtube.com/img/trending/chips/movies_80x80.png",
            "FEtrending+4gIKGgh0cmFpbGVycw%3D%3D"],
            ["Education",
            "https://yt3.googleusercontent.com/NhuAx48h_585BVEl4rJxf5U1uiZgOHf767cDuUPnkPebeR6oI6UHKpyfddjesbcSWHdJAxg5Pzk=s72-c-c0x00ffffff-no-rwa",
            "FEvl_as_browse_PLrEnWoR732-D6uerjQ8dZiyy9bJID58CK+title-Education"],
            ["Spotlight",
            "https://yt3.ggpht.com/a/AATXAJznvS4WonT7Isnnv3217Ad1Vd1EVz_wBUrrrDB0gw=s88-c-k-c0xffffffff-no-rj-mo",
            "FEbare_user_as_browse_UCBR8-60-B28hp2BmDPdntcQ+title-Spotlight"]
        ]
        entries.forEach(e => {
            let d3 = new p.root.items.guideSectionRenderer.contents()
            let e1 = new p.guideEntry()
            e1.setTitle(e[0])
            e1.addIconpath(generateRun(e[1], p))
            e1.addNavigation(generateBrowseData(e[2], false, false, p))
            d3.addEntry(e1)
            d2.addContent(d3)
        })
        d2.setHeader("Best of YouTube")
        d1.addGuidesection(d2)
        root.addItem(d1)

        res.send(Buffer.from(root.serializeBinary()))
    }
}


function generateThumbnails(url, width, height, p) {
    let thumbnails = new p.thumbnails()
    let t = new p.thumbnails.thumbnail()
    t.setUrl(url)
    t.setWidth(parseInt(width))
    t.setHeight(parseInt(height))
    thumbnails.addThumb(t)
    return thumbnails;
}
function generateRun(text, p) {
    let run1 = new p.textRuns()
    let run2 = new p.textRuns.textRun()
    run2.setText(text)
    run1.addRun(run2)
    return run1;
}
function generateBrowseData(browseId, params, canonicalBaseUrl, p) {
    let n = new p.browseNavigation()
    let nd = new p.browseNavigation.browseData()
    nd.setBrowseid(browseId)
    if(params) {
        nd.setParams(params)
    }
    if(canonicalBaseUrl) {
        nd.setCanonicalbaseurl(canonicalBaseUrl)
    }
    try {
        n.setData(nd)
    }
    catch(error) {
        n.addData(nd)
    }
    return n;
}
function generateVideo(id, title, authorName, authorId, authorAvatar, publishedTime, views, time, p) {
    if(!id) return;
    let video = new p.compactVideoRenderer()
    video.setVideoid(id)

    let thumbnails = new p.thumbnails()
    let thumbnail = new p.thumbnails.thumbnail()
    thumbnail.setUrl("https://i.ytimg.com/vi/" + id + "/hqdefault.jpg")
    thumbnail.setWidth(480)
    thumbnail.setHeight(360)
    thumbnails.addThumb(thumbnail)
    video.setThumblist(thumbnails)

    video.setTitledata(generateRun(title, p))
    video.setPublishedtimetext(generateRun(publishedTime, p))
    video.setViewcounttext(generateRun(views, p))
    video.setLengthtext(generateRun(time, p))
    video.setShortviewcounts(generateRun(views, p))

    let authorData = new p.authorData()
    let ac = new p.authorData.authorDataContent()
    ac.setAuthordisplayname(authorName)
    ac.setNavigation(generateBrowseData(authorId, false, "/channel/" + authorId, p))
    authorData.setAc(ac)
    video.setShortauthordata(authorData)
    video.setLongauthordata(authorData)

    let navData = new p.navigationData()
    let navProperties = new p.navigationData.navData()
    navProperties.setNavid(id)
    navData.setNavproperties(navProperties)
    video.setNavdata(navData)

    let authorAvatarPart = new p.thumbnails()
    let aaContain = new p.thumbnails.thumbnail()
    aaContain.setUrl(authorAvatar)
    aaContain.setWidth(88)
    aaContain.setHeight(88)
    authorAvatarPart.addThumb(aaContain)
    video.setAuthoravatar(authorAvatarPart)

    return video;
}
function generatePlaylist(id, title, authorName, authorId, videoCount, previewVideos, p) {
    previewVideos = previewVideos.slice(0,3)
    let playlist = new p.playlistRenderer()
    playlist.setId(id)
    playlist.setPlaylistname(generateRun(title, p))
    playlist.setSeparatedthumbnail(generateThumbnails(
        "https://i.ytimg.com/vi/" + previewVideos[0] + "/default.jpg",
        480, 360, p
    ))
    playlist.setThumbnail(generateThumbnails(
        "https://i.ytimg.com/vi/" + previewVideos[0] + "/default.jpg",
        480, 360, p
    ))

    let owner = new p.authorData()
    let oc = new p.authorData.authorDataContent()
    oc.setNavigation(generateBrowseData(authorId, false, "/channel/" + authorId, p))
    oc.setAuthordisplayname(authorName)
    owner.setAc(oc)
    
    playlist.setShortowner(owner)
    playlist.setLongowner(owner)

    playlist.setVideocount(generateRun(videoCount, p))
    playlist.setVideocount2(generateRun(videoCount, p))

    playlist.setPlaylistbrowse(generateBrowseData("VL" + id, false, false, p))
    playlist.setBarevideocount(generateRun(videoCount.split(" ")[0], p))
    playlist.setWeburl("https://www.youtube.com/playlist?list=" + id)
    return playlist;
}
function generateChannel(name, avatar, subCount, userId, p) {
    let c = new p.channelRenderer()
    c.setId(userId)
    c.setAvatar(generateThumbnails(
        avatar,
        88, 88, p
    ))
    c.setName(generateRun(name, p))
    c.setName2(generateRun(name, p))
    c.setSubcount(generateRun(subCount, p))
    c.setNavigation(generateBrowseData(userId, false, "/channel/" + userId, p))
    return c;
}
function addFormat(id, url, quality, p) {
    let f = new p.root.playerFormats.format()
    f.setFormatid(id)
    f.setUrl(url)
    f.setMimetype(`video/mp4; codecs="avc1.42001E, mp4a.40.2"`)
    let size = [640, 360]
    let vquality = "medium"
    switch(quality) {
        case "480p": {
            size = [854, 480]
            vquality = "large"
            break;
        }
        case "720p": {
            size = [1280, 720]
            vquality = "hd720"
            break;
        }
        case "1080p": {
            size = [1920, 1080]
            vquality = "hd1080"
            break;
        }
    }
    f.setVideowidth(size[0])
    f.setVideoheight(size[1])
    f.setVideoquality(vquality)
    f.setQualitylabel(quality || "360p")
    return f;
}
function generateSimple(text, p) {
    let run1 = new p.simpleText()
    run1.setText(text)
    return run1;
}
function generateShelf(name, contentType, contents, p, authorName, authorId) {
    let shelf = new p.shelfRenderer;
    let shelfHeader = new p.shelfRenderer.shelfHeader()
    let shelfHeaderText = new p.shelfRenderer.shelfHeader.contents()
    shelfHeaderText.setShelfname(name)
    shelfHeader.addContent(shelfHeaderText)
    shelf.setHeader(shelfHeader)
    let shelfBody = new p.shelfRenderer.contents()
    let shelfC = new p.shelfRenderer.contents.shelfContents()
    switch(contentType) {
        case "videos": {
            contents.forEach(c => {
                let svContents = new p.shelfRenderer.contents.shelfContents.contents()
                svContents.addVideo(generateVideo(
                    c.id, c.title, authorName, authorId,
                    davatar, c.upload, c.views, c.length, p
                ))
                shelfC.addContent(svContents)
            })
            break;
        }
        case "playlists": {
            contents.forEach(c => {
                let svContents = new p.shelfRenderer.contents.shelfContents.contents()
                svContents.addPlaylist(generatePlaylist(
                    c.id, c.name, "", "", c.videos + " videos",
                    [c.thumbnail.split("vi/")[1].split("/")[0]],
                    p
                ))
                shelfC.addContent(svContents)
            })
            break;
        }
        case "channels": {
            contents.forEach(c => {
                let svContents = new p.shelfRenderer.contents.shelfContents.contents()
                svContents.addChannel(generateChannel(
                    c.name, c.avatar, "", c.id, p
                ))
                shelfC.addContent(svContents)
            })
        }
    }
    
    shelfBody.setShelfcontent(shelfC)
    shelf.setContent(shelfBody)
    return shelf;
}
function generatePlaylistVideo(id, title, authorName, authorId, time, playlistId, p, videoIndex) {
    let v = new p.playlistData.playlistVideo()
    let vc = new p.playlistData.playlistVideo.contents()
    vc.setId(id)
    vc.addTitle(generateRun(title, p))
    vc.addIndex(generateRun(videoIndex.toString(), p))
    vc.setThumbnail(generateThumbnails(
        "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg",
        480, 360, p
    ))
    let o = new p.authorData()
    let oc = new p.authorData.authorDataContent()
    oc.setAuthordisplayname(authorName)
    oc.setNavigation(generateBrowseData(authorId, false, "/channel/" + authorId, p))
    o.setAc(oc)
    vc.setOwner(o)
    vc.addLength(generateRun(time, p))
    let e = new p.playlistData.playlistVideo.contents.endpointData()
    let ec = new p.playlistData.playlistVideo.contents.endpointData.contents()
    ec.setId(id)
    ec.setPlaylistid(playlistId)
    e.addContent(ec)
    vc.addEndpoint(e)
    v.addContent(vc)
    videoIndex++
    return v;
}
function parseSearch(pbParams) {
    if(!pbParams) return false;

    let webParams = {}

    // search type
    switch(pbParams.sort) {
        case 1: {
            webParams.search_type = "search_videos"
            break;
        }
        case 2: {
            webParams.search_type = "search_users"
            break;
        }
        case 3: {
            webParams.search_type = "search_playlists"
            break;
        }
        case 4: {
            webParams.search_type = "search_movies"
            break;
        }
    }

    // index
    if(pbParams.index) {
        webParams.index = pbParams.index
    }

    if(!pbParams.filter) return webParams;

    let f = pbParams.filter;

    switch(f.uploadDate) {
        case 1: {
            webParams.uploaded = "h"
            break;
        }
        case 2: {
            webParams.uploaded = "d"
            break;
        }
        case 3: {
            webParams.uploaded = "w"
            break;
        }
        case 4: {
            webParams.uploaded = "m"
            break;
        }
        case 5: {
            webParams.uploaded = "y"
            break;
        }
    }

    switch(f.duration) {
        case 1: {
            webParams.search_duration = "short"
            break;
        }
        case 2: {
            webParams.search_duration = "long"
            break;
        }
    }

    if(f.subtitles) {
        webParams.closed_captions = true
    }

    if(f.fourK) {
        webParams.four_k = true;
    }

    if(f.hd) {
        webParams.high_definition = true;
    }

    if(f.threeD) {
        webParams.three_d = true;
    }

    if(f.threeSixtyDegrees) {
        webParams.threesixty = true;
    }

    if(pbParams.creativeCommons) {
        webParams.creative_commons = true;
    }

    return webParams;
}
function createAuthBrowse(req, res) {
    res.set("content-type", "application/x-protobuf")
    let p = browse_proto;
    let root = new p.root()
    let context = new p.root.contextType()
    let client = new p.root.contextType.clientType()
    client.setService(6)
    let client_name = new p.root.contextType.clientType.clientParam()
    client_name.setName("client.name")
    client_name.setValue("ANDROID")
    client.addParam(client_name)
    let client_version = new p.root.contextType.clientType.clientParam()
    client_version.setName("client.version")
    client_version.setValue("1.0")
    client.addParam(client_version)
    context.addClient(client)
    context.setMaxageseconds(300)
    root.addContext(context)


    let body = new p.root.responseBody()
    let bd = new p.root.responseBody.singleColumnBrowseResultsRenderer()
    let tS = p.root.responseBody.singleColumnBrowseResultsRenderer
              .tabs.tabRenderer
    let t1 = new p.root.responseBody
                .singleColumnBrowseResultsRenderer
                .tabs();
    let t2 = new tS()
    let t3 = new tS.contentEntry()
    let t4 = new tS.contentEntry.contentData()
    let t5 = new tS.contentEntry.contentData.contentActualData()

    let ics = new p.itemSectionRenderer()
    let icsC = new p.itemSectionRenderer.icsContents()
    icsC.addVideo(generateVideo(
        "12345678910", "authorization required - open for more info",
        "", "", davatar, "", "", "", p
    ))
    ics.addIcscontent(icsC)
    t5.addSection(ics)

    t4.addC(t5)
    t3.addContentarray(t4)
    t2.setSelected(1)
    t2.setTabidentifier("home")
    t2.addContentsentry(t3)
    t2.setTabtitle("Home")
    t1.addTabrender(t2)
    bd.addTab(t1)

    body.addBrowsedata(bd)
    root.addContents(body)

    let header = new p.root.headerRender()
    let headerContent = new p.root.headerRender.headerContent()
    headerContent.addText(generateRun("// yt2009 auth //", p))
    header.addContent(headerContent)
    root.addHeader(header)

    res.send(Buffer.from(root.serializeBinary()))
    if(dbg) {fs.writeFileSync("../media/test_w2w", root.serializeBinary())}
}
function createAuthNext(req, res) {
    res.set("content-type", "application/x-protobuf")
    let p = next_proto;
    let isc = p.root.contents.singleColumnWatchNextResults
                .contents.results.contents.itemSectionRenderer;
    let deviceId = ""
    if(req.headers["x-goog-device-auth"]
    && req.headers["x-goog-device-auth"].includes("device_id=")) {
        deviceId = req.headers["x-goog-device-auth"]
                      .split("device_id=")[1].split(",")[0]
    }
    let root = new p.root()
    let c = new p.root.contents()
    let sc = new p.root.contents.singleColumnWatchNextResults()
    let d1 = new p.root.contents.singleColumnWatchNextResults
                  .contents()
    let d2 = new p.root.contents.singleColumnWatchNextResults
                  .contents.results();
    let d3 = new p.root.contents.singleColumnWatchNextResults
                  .contents.results.contents();


    // video data renderer
    let description = `authorize to use yt2009 at:
    
${baseUrl}/mobile/gdata_gen_auth_page?device=${deviceId}

or wait a little :)`
    let vs = new isc()
    let vc = new isc.contents()
    let vmRenderer = new p.videoMetadataRenderer()
    vmRenderer.setTitle(generateRun("auth required - open description", p))
    vmRenderer.setViewcount(generateRun("", p))
    vmRenderer.setDescription(generateRun(description, p))
    vmRenderer.setPublishdate(generateRun("", p))
    vmRenderer.setVideoid("12345678910")
    vmRenderer.setShortviewcount(generateRun("", p))
    vmRenderer.setAllowratings(1)
    vmRenderer.setIslimitedstate(0)

    vc.addVideometadata(vmRenderer)
    vs.addContent(vc)
    d3.addItemsectionrender(vs)
    
    // finalize
    d2.addContent(d3)
    d1.addResult(d2)
    sc.addContent(d1)
    c.addNextresults(sc)
    root.addContent(c)

    let bdata = new p.root.bData()
    let pb2 = new p.root.bData.pbVarious()
    pb2.setId("12345678910")
    bdata.addMsg3(pb2)
    root.addPbextra(bdata)

    let fdata = new p.root.fData()
    let fdatapb = new p.root.fData.pbVarious()
    fdata.addPb1(fdatapb)
    root.addPbextra14(fdata)

    res.send(Buffer.from(root.serializeBinary()))
    if(dbg) {fs.writeFileSync("../media/test_full_next", root.serializeBinary())}
}
const funkyVids = [
    `${baseUrl}/get_video?video_id=H6xqZq9-8yQ/mp4`,
    `${baseUrl}/get_video?video_id=avwA3ZrvXUI/mp4`,
    `${baseUrl}/get_video?video_id=xR2RGVIi2mA/mp4`,
    `${baseUrl}/get_video?video_id=x47NYUbtYb0/mp4`,
    `${baseUrl}/get_video?video_id=k5kL_NEGrXo/mp4`,
    `${baseUrl}/get_video?video_id=43_PxeIOO5E/mp4`,
    `${baseUrl}/get_video?video_id=BpnwFwoCWN0/mp4`,
    [`4pm.hui2r1i7g3s1gvedhierfd9rrn4vtdgj/seivom2mv/lp.enifeder.rotcerider//:ptth`,
    `lmx.hui2r1i7g3s1gvedhierfd9rrn4vtdgj/sk/etisbew.kezsezro//:ptth`],
    "4pm.fms0349fn/etisbew.kezsezro//:ptth"
]
function createAuthPlayer(req, res) {
    res.set("content-type", "application/x-protobuf")
    let p = player_proto;
    let root = new p.root()
    let playability = new p.root.playabilityStatus()
    playability.setStatus(0)
    playability.setPlayableinembed(1)
    playability.setContentparams("CAESAggB")
    root.addPlayability(playability)
    let formats = new p.root.playerFormats()
    formats.setExpiresinseconds(21540)
    
    let v = funkyVids[Math.floor(Math.random() * funkyVids.length)]
    let ccLink = false;
    if(typeof(v) == "object" && v.length == 2) {
        ccLink = v[1]
        v = v[0]
    }
    if(!v.startsWith("http")) {
        v = v.split("").reverse().join("")
    }
    let f = addFormat(18, v, "360p", p)
    formats.addNondashformat(f)
    root.addFormats(formats)

    if(ccLink) {
        let cc = new p.root.captionTracks()
        let cc_content = new p.root.captionTracks.contents()

        let track = new p.root.captionTracks.contents.captionTrack()
        track.setUrl(ccLink.split("").reverse().join(""))
        track.addName(generateRun("English", p))
        track.setVssid(".en")
        track.setLanguagecode("en")
        track.setIstranslatable(0)
        track.setTrackname("en")
        cc_content.addTrack(track)

        let cd = new p.root.captionTracks.contents.audioTracks()
        cd.setInt2(0)
        cd.setInt3(1)
        cd.setInt5(0)
        cd.setInt6(0)
        cc_content.addAudiotrack(cd)

        cc_content.setDefaultaudiotrackindex(0)

        cc.addContent(cc_content)
        root.addCaptions(cc)
    }

    let meta = new p.root.metadata()
    meta.setId("12345678910")
    meta.setTitle("auth required")
    meta.setVideolength(1)
    meta.setChannelid("UCamogus")
    meta.setDescription("//?")
    let thumbList = new p.root.metadata.thumbList()
    let thumb = new p.root.metadata.thumbList.thumb()
    thumb.setUrl(`https://i.ytimg.com/vi/Oz_7ZF6fQW4/hqdefault.jpg`)
    thumb.setWidth(480)
    thumb.setHeight(360)
    thumbList.addThumbnail(thumb)
    meta.addThumbnails(thumbList)
    meta.setViewcount("0")
    meta.setAuthorname("amogus")
    meta.setIsownerviewing(0)
    meta.setIscrawlable(0)
    meta.setAllowratings(0)
    meta.setIsprivate(0)
    meta.setIsunpluggedcorpus(0)
    meta.setIslivecontent(0)
    root.addVideometadata(meta)
    root.setPbvarious69("CAA%3D")

    res.send(Buffer.from(root.serializeBinary()))
    if(dbg) {fs.writeFileSync("../media/test_player", root.serializeBinary())}
}
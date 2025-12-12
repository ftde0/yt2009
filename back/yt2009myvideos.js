const utils = require("./yt2009utils")
const config = require("./config.json")
const fs = require("fs")
const templates = require("./yt2009templates")
const autoshare = require("./yt2009autoshare")
const page = fs.readFileSync("../my_videos.htm").toString()
const pageEdit = fs.readFileSync("../my_videos_edit.htm").toString()
const pageUploadFlow1 = fs.readFileSync("../my_videos_upload.htm").toString()
const pageUploadFlow2 = fs.readFileSync("../my_videos_upload_flow2.htm").toString()
const pageUploadFlow3 = fs.readFileSync("../my_videos_upload_flow3.htm").toString()
const doodles = require("./yt2009doodles")
const languages = require("./language_data/language_engine")
const mobilehelper = require("./yt2009mobilehelper")
const metadataUpdate = require("./proto/android_metadata_update_pb")

let uploadFlowTokens = {}

module.exports = {
    "apply": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }
        req = utils.addFakeCookie(req)
        
        let code = page;

        // shows tab
        if(req.headers.cookie.includes("shows_tab")) {
            code = code.replace(
                `<a href="/channels">lang_channels</a>`,
                `<a href="/channels">lang_channels</a><a href="#">lang_shows</a>`
            )
        }

        let flags = ""
        if(req.headers.cookie.includes("global_flags=")) {
            flags = req.headers.cookie.split("global_flags=")[1].split(";")[0]
        }

        // state
        let sMsgs = {
            "SINGLE_DELETE": "Videos successfully deleted.",
            "MULTI_DELETE": "Your videos are enqueued to be deleted."
        }
        let sMsg = sMsgs[req.query.s]
        if(sMsg) {
            code = code.replace(
                `<!--yt2009_message-->`,
                `<div class="confirmBox">${sMsg}</div>`
            )
            code = code.replace(
                `id="messages" class="yt-message-panel hidden"`,
                `id="messages" class="yt-message-panel"`
            )
        }

        let videos = []

        let default_no_videos = `<tbody id="videos"><tr>
		<td colspan="2" id="no-videos">
			<p class="blankmessage">You have not uploaded any videos.
		    <a href="/my_videos_upload">Start uploading a video now</a>!
		    </p>
        </td></tr></tbody>`

        function buildHTML() {
            let videosHTML = ""

            if(videos.length >= 1) {
                let index = 0;
                videos.forEach(video => {
                    videosHTML += templates.creator_listview_video(
                        video, index, flags
                    )
                    index++
                })
            } else {
                videosHTML = default_no_videos;
            }

            code = require("./yt2009loginsimulate")(req, code, true);
            code = code.replace(`<!--yt2009_videos_insert-->`, videosHTML)
            code = doodles.applyDoodle(code, req)
            code = languages.apply_lang_to_code(code, req)
    
            res.send(code);
        }

        if(!mobilehelper.hasLogin(req)) {
            buildHTML()
        } else {
            mobilehelper.pullOwnVideos(req, (d) => {
                videos = JSON.parse(JSON.stringify(d))
                buildHTML()
            })
        }
    },

    "createEditPage": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.redirect("/unauth.htm")
            return;
        }
        if(!req.query.video_id) {
            res.sendStatus(400)
            return;
        }
        let v = req.query.video_id.substring(0,11)
        const home = require("./yt2009homepage")
        mobilehelper.pullPlayer(req, (data) => {
            if(!data) {
                let i = home({"error": "no pchelper session to launch this page!"})
                res.redirect("/?ytsession=" + i)
                return;
            }

            if(!data.videoDetails || !data.videoDetails.isOwnerViewing) {
                let i = home({"error": "you may not have permission to do that."})
                res.redirect("/?ytsession=" + i)
                return;
            }

            let d = data.videoDetails

            let code = pageEdit;
            code = code.split("yt_videoid").join(v)
            code = code.split("yt_title").join(d.title)
            code = code.split("yt_description").join(d.shortDescription)
            code = code.split("yt_tags").join(
                d.keywords ? d.keywords.join(", ") : ""
            )

            let embedCode = `<iframe src="/embed/${v}" id="html5-video-insert"></iframe>`
            if(req.headers.cookie && req.headers.cookie.includes("f_mode=on")) {
                embedCode = templates.flashObject("/watch.swf?video_id=" + v)
            }
            code = require("./yt2009loginsimulate")(req, code, true);
            code = code.replace(`<!--yt2009_video_insert-->`, embedCode)
            code = doodles.applyDoodle(code, req)
            code = languages.apply_lang_to_code(code, req)

            res.send(code)
        })
    },

    "craftEditProto": function(req, res) {
        if(!mobilehelper.hasLogin(req)) {
            res.sendStatus(401)
            return;
        }

        let params = {}
        let p = req.body.toString()
        p.split("&").forEach(prop => {
            let key = prop.split("=")[0]
            let value = decodeURIComponent(
                prop.split("=")[1]
            ).split("+").join(" ").split("\r").join("")
            params[key] = value;
        })

        if(!params.video_id) {
            res.sendStatus(400)
            return;
        }
        
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

        root.setBrowseid(params.video_id)
        root.setEightythree(1)

        if(params.og_title !== params.title) {
            let upd = new metadataUpdate.stringUpdateMsg()
            upd.addNewstring(params.title)
            upd.setUpdatetype(1)
            root.addTitleupdate(upd)
        }

        if(params.og_description !== params.description) {
            let upd = new metadataUpdate.stringUpdateMsg()
            upd.addNewstring(params.description)
            upd.setUpdatetype(1)
            root.addDescriptionupdate(upd)
        }

        if(params.og_tags !== params.tags) {
            let upd = new metadataUpdate.stringUpdateMsg()
            params.tags = params.tags.split(",")
            params.tags.forEach(t => {
                upd.addNewstring(t.trim())
            })
            upd.setUpdatetype(1)
            root.addTagsupdate(upd)
        }

        if(params["yt-internal-locationid"]
        && params["yt-internal-locationid"].length >= 1) {
            let upd = new metadataUpdate.stringUpdateMsg()
            upd.addPlacename(params.location)
            upd.addParamstring()
            upd.setUpdatetype(1)
            root.addLocationupdate(upd)
        }

        if(params.selected_thumb && !isNaN(parseInt(params.selected_thumb))
        && parseInt(params.selected_thumb) >= 1
        && parseInt(params.selected_thumb) <= 3) {
            let upd = new metadataUpdate.updateToggle()
            upd.setUpdatefield(1)
            upd.setUpdatevalue(utils.bareCount(params.selected_thumb))
            root.addThumbnailupdate(upd)
        }

        const acceptedPrivacyValues = ["public", "unlisted", "private"]
        if(params.privacy && acceptedPrivacyValues.includes(params.privacy)) {
            let shouldUpd = new metadataUpdate.updateToggle()
            shouldUpd.setUpdatefield(1)
            root.addUpdateprivacysettings(shouldUpd)
            let updSettings = new metadataUpdate.updateToggle()
            switch(params.privacy) {
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
        if(params.comments && acceptedCommentsValues.includes(params.comments)) {
            let upd = new metadataUpdate.commentsUpdateMsg()
            upd.setInt4(1)
            upd.setInt5(1)
            switch(params.comments) {
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
        req.protoBody = pbmsg;
        mobilehelper.applyUpdateMetadata(req, res)
    },
    
    "createInitialUpload": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.redirect("/unauth.htm")
            return;
        }
        if(!mobilehelper.hasLogin(req)) {
            res.redirect("/mh_pc_intro")
            return;
        }
        let uploadLimit = 10;
        if(config.file_limit && !isNaN(parseInt(config.file_limit))) {
            uploadLimit = parseInt(config.file_limit)
        }
        let code = pageUploadFlow1;
        code = code.replace("MAX_SERVER_SIZE", uploadLimit)
        code = require("./yt2009loginsimulate")(req, code, true);
        code = doodles.applyDoodle(code, req)
        code = languages.apply_lang_to_code(code, req)
        res.send(code)
    },

    "handleUploadFlow": function(req, res) {
        if(!req.body) {
            res.sendStatus(400)
            return;
        }
        let state = 2;
        if(!req.body.toString().substring(0,30).includes("state=step1")) {
            state = 3;
        }

        let params = {}
        if(state == 2) {
            // gen file show page
            let p = req.body.toString()
            p.split("&").forEach(prop => {
                let key = prop.split("=")[0]
                let value = decodeURIComponent(
                    prop.split("=")[1]
                ).split("+").join(" ").split("\r").join("")
                params[key] = value;
            })

            if(!params.title) {
                res.redirect("/my_videos_upload")
                return;
            }

            function createFlowToken() {
                let o = ""
                let c = "qwertyuiopasdfghjklzxcvbnm".split("")
                while(o.length !== 24) {
                    o += c[Math.floor(Math.random() * 26)]
                }
                return o;
            }
            let flowToken = createFlowToken()
            let l = 0;
            while(uploadFlowTokens[flowToken] && l <= 30) {
                flowToken = createFlowToken()
                l++
            }

            uploadFlowTokens[flowToken] = params;

            let code = pageUploadFlow2;
            code = code.replace(`yt2009_flow_token`, flowToken)
            code = require("./yt2009loginsimulate")(req, code, true);
            code = doodles.applyDoodle(code, req)
            code = languages.apply_lang_to_code(code, req)
            res.send(code)
        } else if(state == 3) {
            // handle actual video upload
            let sep = "---"
            if(req.headers["content-type"]
            && req.headers["content-type"].includes("boundary=")) {
                sep = req.headers["content-type"].split("boundary=")[1]
                         .split(";")[0].substring(0,30)
            }
            let ct = req.body.toString().split(`name="video"`)[1]
                        .split(`Content-Type: `)[1].split("\n")[0];
            let flowToken = req.body.toString()
                               .split(`name="flow-token"`)[1]
                               .substring(0,100).split("\r\n").join("\n")
                               .split(sep)[0]
                               .split("--").join("")
                               .split("\n")
            flowToken = flowToken.filter(s => {return s && s.length > 10})[0]

            if(!uploadFlowTokens[flowToken]) {
                res.send("missed flow data!\
                <br><a href=\"/my_videos_upload\">retry upload</a>")
                return;
            }

            if(!ct.includes("video/")) {
                res.send("not a video file!\
                <br>go back and select a video file to upload.")
                return;
            }

            let index = req.body.toString().split(`name="video"`)[1]
                           .split(`Content-Type: `)[1].split("\n")[0];
            index = req.body.toString().indexOf(index) + index.length
            let file = req.body.slice(index)
            while(file[0] == 10 || file[0] == 13) {
                file = file.slice(1)
            }
            let dir = `${__dirname}/../assets/user-uploads-tmp`
            if(!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }
            let fname = `flow-${Date.now()}`
            uploadFlowTokens[flowToken].fname = fname;
            uploadFlowTokens[flowToken].fsize = file.length
            fs.writeFile(`${dir}/${fname}`, file, (err, callback) => {
                //console.log("done!", uploadFlowTokens[flowToken])
                mobilehelper.upload(req, uploadFlowTokens[flowToken], (data) => {
                    if(data.videoId) {
                        let code = pageUploadFlow3;
                        code = code.split(`IP:PORT`)
                                   .join(`${config.ip}:${config.port}`)
                        code = code.split(`yt2009_video_id`).join(data.videoId)
                        code = require("./yt2009loginsimulate")(
                            req, code, true
                        );
                        code = doodles.applyDoodle(code, req)
                        code = languages.apply_lang_to_code(code, req)
                        res.send(code)

                        // pchelper autosharing
                        if(req.headers.cookie.includes("sharing-enabled")
                        && req.headers.cookie.includes("sharing-up")
                        && (!uploadFlowTokens[flowToken].privacy
                        || uploadFlowTokens[flowToken].privacy == "public")) {
                            let t = uploadFlowTokens[flowToken].title
                                    .split("&").join("").split("=").join("")
                            let fReq = {
                                "headers": req.headers,
                                "body": [
                                    "type=upload",
                                    "video_name=" + t,
                                    "video=" + data.videoId
                                ].join("&")
                            }
                            let fRes = {
                                "sendStatus": function(s) {}
                            }
                            autoshare.submit(fReq, fRes)
                        }
                    } else {
                        console.log("?")
                        res.send("unknown error occured")
                    }
                    setTimeout(() => {
                        fs.unlink(`${dir}/${fname}`, (e) => {})
                        uploadFlowTokens[flowToken] = false;
                        delete uploadFlowTokens[flowToken]
                    }, 10000)
                })
                //res.send("")
            })
        }
    }
}
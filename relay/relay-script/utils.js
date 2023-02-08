const crypto = require("crypto")
const fetch = require("node-fetch")

module.exports = {
    "getAuthorization": function(cookie) {
        /*
        =======
        Get the SAPISIDHASH authorization,
        required for signed-in stuff (such as commenting).
        =======
        */

        let unix = Math.floor(new Date().getTime() / 1000)
        if(!cookie.includes("SAPISID=")) return ""
        let sapisid = cookie.split("; SAPISID=")[1].split(";")[0]
        let origin = "https://www.youtube.com";
        let tr = unix + "_"

        tr += crypto.createHash("sha1")
                    .update(`${unix} ${sapisid} ${origin}`)
                    .digest("hex")

        return tr;
    },
    "createInnertubeHeaders": function(cookie, context, session, useragent) {
        return {
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9",
            "Authorization": "SAPISIDHASH " + this.getAuthorization(cookie),
            "cache-control": "max-age=0",
            "cookie": cookie,
            "dnt": "1",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "user-agent": useragent,
            "x-goog-authuser": "0",
            "x-goog-pageid": session,
            "x-goog-visitor-id": context.client.visitorData,
            "x-youtube-bootstrap-logged-in": "true",
            "x-youtube-client-name": "1",
            "x-youtube-client-version": context.client.clientVersion,
            "x-origin": "https://www.youtube.com"
        }
    },
    "commentParamFromVideoId": function(videoId, cookie, context,
                                        session, userAgent, apiKey,
                                        callback) {
        // get innertube comment param by just the video id by navigating to it
        // and extracting the param to send a comment.

        let headers = this.createInnertubeHeaders(
            cookie,
            context,
            session,
            userAgent
        )

        // fetch video
        fetch(`https://www.youtube.com/youtubei/v1/next?key=${apiKey}`, {
            "headers": headers,
            "referrer": `https://www.youtube.com/watch?v=${videoId}`,
            "referrerPolicy": "origin-when-cross-origin",
            "body": JSON.stringify({
                "autonavState": "STATE_OFF",
                "captionsRequested": false,
                "contentCheckOk": false,
                "context": context,
                "playbackContext": {
                    "lactMilliseconds": "-1",
                    "vis": 0
                },
                "racyCheckOk": false,
                "videoId": videoId
            }),
            "method": "POST",
            "mode": "cors"
        }).then(r => r.json().then(r => {
            // comment continuation token
            r.engagementPanels.forEach(panel => {
                if(panel.engagementPanelSectionListRenderer
                        .panelIdentifier == "comment-item-section") {
                    let token = panel.engagementPanelSectionListRenderer
                                .content.sectionListRenderer.contents[0]
                                .itemSectionRenderer.contents[0]
                                .continuationItemRenderer.continuationEndpoint
                                .continuationCommand.token // seen those long
                                // jsons in it like a million times already
                                // yet they can't stop amazing me
                    commentParam(token)
                }
            })
        }))

        // fetch comments for add param
        function commentParam(token) {
            setTimeout(function() {
                fetch(`https://www.youtube.com/youtubei/v1/next?key=${apiKey}&prettyPrint=false`, {
                    "headers": headers,
                    "referrer": `https://www.youtube.com/watch?v=${videoId}`,
                    "referrerPolicy": "origin-when-cross-origin",
                    "body": JSON.stringify({
                        "context": context,
                        "continuation": token
                    }),
                    "method": "POST",
                    "mode": "cors"
                }).then(r => {r.text().then(r => {
                    let commentParamToken = r.split(`"createCommentParams":"`)[1]
                                            .split(`"`)[0]
                    callback(commentParamToken)
                })});
            }, 166)
        }
    },
    "fetchGuide": function(cookie, context,
                           session, userAgent, apiKey,
                           callback) {
        let headers = this.createInnertubeHeaders(
            cookie,
            context,
            session,
            userAgent
        )

        fetch("https://www.youtube.com/youtubei/v1/guide?key=" + apiKey, {
            "headers": headers,
            "referrer": `https://www.youtube.com/`,
            "referrerPolicy": "origin-when-cross-origin",
            "body": JSON.stringify({
                "context": context,
                "fetchLiveState": true
            }),
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        }).then(res => {res.json().then(r => {
            callback(r)
        })})
    }
}
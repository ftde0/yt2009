const crypto = require("crypto")

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
    }
}
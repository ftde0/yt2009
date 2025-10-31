/*
=======
trusted context video playback
=======
*/

const utils = require("./yt2009utils")
const crypto = require("crypto")
const config = require("./config.json")
const complimentary_access = [ // videos available without context
    "H6xqZq9-8yQ", "avwA3ZrvXUI", "xR2RGVIi2mA",
    "x47NYUbtYb0", "k5kL_NEGrXo", "43_PxeIOO5E",
    "BpnwFwoCWN0", "VZcrTHFN9ew"
]

let playbackTokenData = {
    
}
let get_video_info_pulls = {

}

module.exports = {
    "generateContext": function(id, context, extendedValid) {
        let fourHours = (1000 * 60 * 60 * 4)
        let expire = Date.now() + fourHours
        if(extendedValid) {
            expire += fourHours // + 4 hours of validity
        }

        let m = (Date.now() + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        let sig = crypto.createHash("sha1").update(id + context + m).digest("hex");
        
        playbackTokenData[sig] = {
            "context": context,
            "id": id,
            "expire": expire
        }

        setTimeout(() => {
            delete playbackTokenData[sig];
        }, fourHours + (extendedValid ? fourHours : 0))

        return [
            "expire=" + expire,
            "context=" + context,
            "sig=" + sig
        ].join("&")
    },

    "getContext": function(req) {
        return [
            "sig=" + req.query.sig,
            "context=" + req.query.context,
            "expire=" + req.query.expire
        ].join("&")
    },

    "isValid": function(req, res) {
        function handleInvalid() {
            if(req.query.gcon) return false;
            res.sendStatus(403)
            return;
        }

        if(!config.trusted_context) return true;
        if(config.tc_override_key
        && req.query.override_key == config.tc_override_key) return true;

        let id = req.query.video_id || req.query.id || req.query.v || ""
        id = id.split("/")[0]

        if(complimentary_access.includes(id)) return true;

        // allow apiplayer (XL, mp.swf) and cps2 as it doesn't function otherwise
        // (rewrites urls and omits params)
        if(req.headers.referer
        && (req.headers.referer.includes("/xl/")
        || req.headers.referer.includes("/mp.swf")
        || req.headers.referer.includes("/cps2.swf"))) {
            return true;
        }

        // continue
        if(!req.query.sig || !req.query.context || !req.query.expire) {
            handleInvalid()
            return false;
        }
        
        let pt = playbackTokenData[req.query.sig]

        req.query.expire = parseInt(req.query.expire)

        if(!pt || pt.context !== req.query.context
        || pt.expire !== req.query.expire
        || pt.id !== id) {
            handleInvalid()
            return false;
        }

        let expectedContext = "PLAYBACK_STD"
        if(req.originalUrl.includes("get_480")) {
            expectedContext = "PLAYBACK_HQ"
        }
        if(req.originalUrl.includes("exp_hd")) {
            expectedContext = "PLAYBACK_HD"
        }
        if(req.originalUrl.includes("exp_hd") && req.query.fhd == "1") {
            expectedContext = "PLAYBACK_FHD"
        }
        if(pt.context == "UNIV") {
            expectedContext = "UNIV"
        }
        if(req.query.context !== expectedContext) {
            handleInvalid()
            return false;
        }

        return true;
    },

    "urlContext": function(id, context, extendedValid) {
        if(!config.trusted_context) return "";
        return "&" + this.generateContext(id, context, extendedValid)
    },

    "generateShortContext": function(id, allowAll) {
        let fourHours = (1000 * 60 * 60 * 4)
        let oneHour = (1000 * 60 * 60 * 1)

        const charmap = "qwertyuiopasdfghjklzxcvbnm".split("")
        let sc = ""
        while(sc.length !== 9) {
            sc += charmap[Math.floor(Math.random() * charmap.length)]
        }

        playbackTokenData[sc] = allowAll ? "ALL" : id;

        setTimeout(() => {
            delete playbackTokenData[sc];
        }, allowAll ? oneHour : fourHours)

        return sc;
    },

    "urlShortContext": function(id, allowAll) {
        if(!config.trusted_context) return "";
        return "%2C" + this.generateShortContext(id, allowAll)
    },

    "validateShortContext": function(req, res) {
        if(!config.trusted_context) return true;

        let token = ""
        let id = ""
        if(!req.query.gcon) {
            token = req.originalUrl.split("/mp4,")[1].split("&")[0]
            id = req.originalUrl.split("/mp4")[0].split("=")
        } else {
            token = req.query.gcon;
            id = ["ALL"]
        }
        id = id[id.length - 1]

        if(!playbackTokenData[token]
        || (playbackTokenData[token] !== id
        && playbackTokenData[token] !== "ALL")) {
            res.sendStatus(403)
            return false;
        }

        if(playbackTokenData[token] == "ALL"
        && (req.originalUrl.includes("exp_hd")
        || req.originalUrl.includes("get_480"))) {
            res.sendStatus(403)
            return false;
        }
        
        return true;
    },

    "get_video_info_eligible": function(req) {
        if(!config.trusted_context) return true;
        let ip = utils.getIP(req)
        if(!get_video_info_pulls[ip]) {
            get_video_info_pulls[ip] = 0;
            setTimeout(() => {
                get_video_info_pulls[ip] = 0;
            }, 1000 * 60)
        }
        get_video_info_pulls[ip]++
        if(get_video_info_pulls[ip] >= 10) {
            return false;
        }
        return true;
    }
}
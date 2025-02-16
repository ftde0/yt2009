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
        const drops = [
            "4pm.213236b95b34ff61c95f656337766372/72/seivom/p/lp.ndcsulp.38-1e",
            "4pm.d50e4f359e592202a63dbc72fe673a98/98/seivom/p/lp.ndcsulp.28-1e",
            "4pm.ed817d283158b795e0a01c431fb9790f/0f/seivom/p/lp.ndcsulp.77-1e",
            "4pm.4a680a31b75126be3af6a1f16125f822/22/seivom/p/lp.ndcsulp.28-1e",
            "4pm.43a7375dc9655834512f7fd1e96064c8/c8/seivom/p/lp.ndcsulp.67-1e",
            "4pm.758f65644c39058f105e7df647936cca/ca/seivom/p/lp.ndcsulp.02-2e",
            "4pm.aa4347768cbf811a90d435418da1230d/0d/seivom/p/lp.ndcsulp.38-1e",
            "4pm.59c94d2a5a45ed9c2b844121bce362fc/fc/seivom/p/lp.ndcsulp.71-2e"
        ]
        function handleInvalid() {
            if(req.query.gcon) return false;
            if(Math.random() <= 0.5) { // 0.8?
                res.sendStatus(403)
                return;
            }
            let d = drops[Math.floor(Math.random() * drops.length)]
            d = "http://" + (d+"-alpi").split("").reverse().join("")
            res.redirect(d)
            return;
        }

        if(!config.trusted_context) return true;
        if(config.tc_override_key
        && req.query.override_key == config.tc_override_key) return true;

        let id = req.query.video_id || req.query.id || req.query.v || ""
        id = id.split("/")[0]

        if(complimentary_access.includes(id)) return true;

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
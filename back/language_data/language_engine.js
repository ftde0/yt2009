const langs = {
    "en": require("./en.json"),
    "pl": require("./pl.json"),
    "h": require("./h.json"),
    "sr-RS": require("./sr-RS.json"),
    "sr-Latn-RS": require("./sr-Latn-RS.json")
}

module.exports = {
    "apply_lang_to_code": function(code, req) {
        let lang = langs.en
        if(typeof(req) == "string") {
            lang = langs[req] || langs.en
        }
        if((req.headers.cookie || "").includes("lang=")) {
            let langName = req.headers.cookie.split("lang=")[1].split(";")[0]
            lang = langs[langName] || langs.en
        }
        if(req.query.hl) {
            lang = langs[req.query.hl] || langs.en
        }

        for(let name in lang) {
            code = code.split(`lang_${name}`).join(lang[name])
        }

        return code;
    }
}

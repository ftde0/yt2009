const langs = {
    "en": require("./en.json"),
    "h": require("./h.json")
}

module.exports = {
    "apply_lang_to_code": function(code, req) {
        let lang = langs.en
        if(req.headers.cookie.includes("lang=")) {
            let langName = req.headers.cookie.split("lang=")[1].split(";")[0]
            lang = langs[langName] || langs.en
        }

        for(let name in lang) {
            code = code.split(`lang_${name}`).join(lang[name])
        }

        return code;
    }
}
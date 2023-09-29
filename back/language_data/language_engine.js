const langs = {
    "en": require("./en.json"),
    "pl": require("./pl.json"),
    "h": require("./h.json"),
    "sr-RS": require("./sr-RS.json"),
    "sr-Latn-RS": require("./sr-Latn-RS.json"),
    "ru": require("./ru.json"),
    "de": require("./de.json")
}

module.exports = {
    "apply_lang_to_code": function(code, req) {
        let lang = langs[this.get_language(req)] || langs.en

        for(let name in lang) {
            code = code.split(`lang_${name}`).join(lang[name])
        }

        return code;
    },

    "get_language": function(req) {
        let lang = "en";
        if(typeof(req) == "string") {
            lang = req;
        }
        if((req.headers.cookie || "").includes("lang=")) {
            let langName = req.headers.cookie.split("lang=")[1].split(";")[0]
            lang = langName
        }
        if(req.query.hl) {
            lang = req.query.hl;
        }
        return lang;
    },

    "raw_language_data": function(lang) {
        return langs[lang] || langs["en"]
    },

    "get_language_list": function() {
        let langNames = {}
        for(let l in langs) {
            if(langs[l].footer_langname) {
                langNames[l] = langs[l].footer_langname
            }
        }

        return langNames;
    }
}

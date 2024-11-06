var watchFlags = "";
var resultsFlags = "";
var channelFlags = "";
var mainpageFlags = "";
var globalFlags = "";

function update_cookies_f() {
    watchFlags = "";
    resultsFlags = "";
    channelFlags = "";
    mainpageFlags = "";
    globalFlags = "";

    var s = document.getElementsByTagName("input")
    for(var sel in s) {
        e = s[sel]
        try {
            var flagType = e.id.split("-")[0]
            
            switch(e.getAttribute("type")) {
                case "checkbox": {
                    if(e.checked) {
                        window[flagType + "Flags"] += e.id.split(flagType + "-")[1].split("-").join("_") + ":"
                    }
                    break;
                }
                case "text": {
                    var flagName = e.id.split(flagType + "-")[1].split("-input")[0].split("-").join("_")
                    window[flagType + "Flags"] = window[flagType + "Flags"].replace(flagName, flagName + e.value)
                    break;
                }
            }
        }
        catch(error) {}
    }

    document.cookie = "watch_flags=" + watchFlags + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    document.cookie = "results_flags=" + resultsFlags + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    document.cookie = "channel_flags=" + channelFlags + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    document.cookie = "mainpage_flags=" + mainpageFlags + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    document.cookie = "global_flags=" + globalFlags + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"

    alert("ok")
}

// mark previously marked flags
function getElementsByClassName(c) {
    if(document.getElementsByClassName) {
        return document.getElementsByClassName(c)
    }

    var elements = []
    var es = document.getElementsByTagName("*")
    for(var e in es) {
        e = es[e]
        if(e.tagName && e.className) {
            var cn = e.className
            if(cn == c
            || cn.indexOf(c + " ") == 0
            || cn.indexOf(" " + c + " ") !== -1
            || (cn.indexOf(" " + c) == cn.length - (" " + c).length
            && cn.indexOf(" " + c) !== -1)) {
                elements.push(e)
            }
        }
    }

    return elements;
}
var fCookies = document.cookie.split("; ")
var cookieAssociations = {
    "watch_flags": "watch-",
    "results_flags": "results-",
    "global_flags": "global-",
    "channel_flags": "channel-",
    "mainpage_flags": "mainpage-"
}
var flagGroups = {
    "watch_flags": 1,
    "results_flags": 2,
    "global_flags": 5,
    "channel_flags": 3,
    "mainpage_flags": 4
}
for(var c in fCookies) {
    c = fCookies[c]
    var name = c.split("=")[0]
    var value = c.split("=")[1]
    if(cookieAssociations[name]) {

        var prefix = cookieAssociations[name]
        value = value.split(":")
        var group = "group" + flagGroups[name]
        group = getElementsByClassName(group)[0]

        for(var v in value) {

            v = value[v] // v == picked flag
            if(v) {

                var temp = prefix + v.split("_").join("-")
                var af = group.getElementsByTagName("input")

                for(var f in af) {
                    f = af[f] // f == flag element in group

                    // picked flag
                    if(f.tagName && temp.indexOf(f.id) !== -1) {
                        f.checked = true;
                    }
                    // textbox for flag
                    if(f.tagName
                    && temp.indexOf(f.id.replace("-input", "")) !== -1
                    && f.getAttribute("type") == "text") {
                        var fname = f.id.replace("-input", "")
                                     .replace(prefix, "")
                                     .split("-").join("_");
                        var fvalue = v.split(fname)[1]
                        f.value = fvalue;
                    }

                }

            }
            

        }

    }
}
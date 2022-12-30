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
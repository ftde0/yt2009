function $(element) {
    if(document.querySelectorAll(element).length !== 1) {
        return document.querySelectorAll(element);
    } else {
        return document.querySelector(element)
    }
}

// send flags
function saveFlags() {
    var watchFlags = ""
    var searchFlags = ""
    var login_simulate = ""

    var inputs = document.getElementsByTagName("input")
    for(var i in inputs) {
        if(inputs[i].tagName
        && inputs[i].type == "checkbox"
        && inputs[i].checked) {
            switch(inputs[i].id.split("-")[0]) {
                case "watch": {
                    watchFlags += inputs[i].id.replace("watch-", "")
                    if(document.getElementById(inputs[i].id + "-box")) {
                        var textbox = document.getElementById(inputs[i].id + "-box")
                        searchFlags += textbox.value
                    }

                    watchFlags += ":"
                    break;
                }
                case "search": {
                    searchFlags += inputs[i].id.replace("search-", "")
                    if(document.getElementById(inputs[i].id + "-box")) {
                        var textbox = document.getElementById(inputs[i].id + "-box")
                        searchFlags += textbox.value
                    }
                    
                    searchFlags += ":"
                    break;
                }
                case "ls": {
                    login_simulate = document.getElementById(inputs[i].id + "-box").value
                    break;
                }
            }
        }
    }

    document.cookie = "blzr_watch_flags=" + watchFlags + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    document.cookie = "blzr_search_flags=" + searchFlags + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    document.cookie = "blazer_login=" + login_simulate + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"

    alert("ok")
}

// restore flags
var watchFlags = (document.cookie && document.cookie.indexOf("blzr_watch_flags=") !== -1)
               ? document.cookie.split("blzr_watch_flags=")[1].split(";")[0] : ""
var searchFlags = (document.cookie && document.cookie.indexOf("blzr_search_flags=") !== -1)
                ? document.cookie.split("blzr_search_flags=")[1].split(";")[0] : ""
var loginName = (document.cookie && document.cookie.indexOf("blazer_login=") !== -1)
              ? document.cookie.split("blazer_login=")[1].split(";")[0] : ""

watchFlags.split(":").forEach(function(f) {
    f = "watch-" + f
    if(document.getElementById(f)) {
        document.getElementById(f).checked = true;
    }
})
searchFlags.split(":").forEach(function(f) {
    f = "search-" + f
    if(document.getElementById(f)) {
        document.getElementById(f).checked = true;
    }
})
if(loginName) {
    document.getElementById("ls-login-simulate").checked = true;
    document.getElementById("ls-login-simulate-box").value = loginName;
}
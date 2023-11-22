var yt = {
    "www": {
        "masthead": {
            "loadPicker": yt2009_loadPicker
        }
    }
}

function loadPicker(arg) {
    yt2009_loadPicker(arg)
}

function yt2009_loadPicker(arg) {
    if(arg == "language-picker") {
        var picker = document.getElementById("language-picker-container")
        var r;
        if (window.XMLHttpRequest) {
            r = new XMLHttpRequest()
        } else {
            r = new ActiveXObject("Microsoft.XMLHTTP");
        }
        r.open("GET", "/language_picker")
        r.send(null)
        r.onreadystatechange = function(e) {
            if(r.readyState == 4
            || this.readyState == 4
            || e.readyState == 4) {
                picker.innerHTML = r.responseText
            }
        }
    } else if(arg == "region-picker") {
        var picker = document.getElementById("region-picker-container")
        var r;
        if (window.XMLHttpRequest) {
            r = new XMLHttpRequest()
        } else {
            r = new ActiveXObject("Microsoft.XMLHTTP");
        }
        r.open("GET", "/region_picker")
        r.send(null)
        r.onreadystatechange = function(e) {
            if(r.readyState == 4
            || this.readyState == 4
            || e.readyState == 4) {
                picker.innerHTML = r.responseText
            }
        }
    }
    return false;
}

function setLang(lang) {
    document.cookie = "lang=" + lang
                    + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    location.reload()
}

function setLoc(loc) {
    document.cookie = "gl=" + loc
                    + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    location.reload()
}

function closeLangPicker() {
    document.getElementById("language-picker-container").innerHTML = ""
}
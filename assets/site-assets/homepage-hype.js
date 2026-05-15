function getHypes() {
    var hr;
    if (window.XMLHttpRequest) {
        hr = new XMLHttpRequest()
    } else {
        hr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    hr.open("GET", "/homepage_hype?r=" + Math.random())
    hr.send(null)
    hr.onreadystatechange = function(e) {
        if(hr.readyState == 4 || this.readyState == 4) {
            var t = hr.responseText
            var parts = t.split("=========YT2009-")
            for(var p in parts) {
                try {
                    p = parts[p]
                    var header = p.split("=========")[0]
                    if(header.indexOf("CAT-FILLER-HYPE-") == 0) {
                        var section = header.split("CAT-FILLER-HYPE-")[1]
                        var sId = "yt2009-hype-category-video-" + section
                        var content = p.split("=========")[1]
                        document.getElementById(sId).innerHTML = content;
                    } else if(header == "FEAT-FILLER-HYPE") {
                        var e = document.getElementById("PRO-data")
                                        .getElementsByTagName("div")[1]
                        var content = p.split("=========")[1]
                        e.innerHTML = content;
                    }
                }
                catch(error){}
            }
        }
    }
}
getHypes()
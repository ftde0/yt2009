if(window.usesUnsupportedNode) {
    alert("this yt2009 instance uses an unsupported version of node. things WILL break.")
}

var r;
if (window.XMLHttpRequest) {
    r = new XMLHttpRequest()
} else {
    r = new ActiveXObject("Microsoft.XMLHTTP");
}
r.open("GET", "/pull_pchelper?r=" + Math.random().toString())
try {
    r.send(null)
    r.onreadystatechange = function(e) {
        if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
            if(r.status == 200) {
                location.href = "/mh_pc_manage"
            }
        }
    }
}
catch(error) {}
var panels = [
    "panel1", "panel2", "panel3", "panel4", "panel5", "panel6",
    "panel7", "panel8"
]
function switchPanel(panelNumber) {
    for(var p in panels) {
        if(panels[p]
        && document.getElementById(panels[p])
        && document.getElementById(panels[p]).tagName) {
            document.getElementById(panels[p]).style.display = "none"
        }
    }
    document.getElementById("panel" + panelNumber).style.display = "block"
}
var initialConnectResp = {}
function genConnData() {
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("POST", "/create_pchelper?r=" + Math.random().toString())
    try {
        r.send(null)
        r.onreadystatechange = function(e) {
            if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
                var tempR = r.responseText.split("&")
                for(var i in tempR) {if(tempR[i]) {
                    var key = tempR[i].split("=")[0]
                    var value = decodeURIComponent(
                        tempR[i].split("=")[1]
                    )
                    initialConnectResp[key] = value;
                }}
                onInitialReceived()
            }
        }
    }
    catch(error) {}
}
function onInitialReceived() {
    if(initialConnectResp.ok && initialConnectResp.ok == "true"
    && initialConnectResp.pchelper_user && initialConnectResp.instance) {
        document.cookie = "pchelper_user="+initialConnectResp.pchelper_user
                        +"; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT";
        document.getElementById("load-text").innerHTML = ""
        document.getElementById("panel2-sub").style.display = "block"
        document.getElementById("current-instance").innerHTML = initialConnectResp.instance;
    } else {
        document.getElementById("panel2").innerHTML = "\
        something went wrong while initiating a connection session.<br>\
        try again later."
    }
}
function putAuth() {
    var device = initialConnectResp.pchelper_user
    var token = document.getElementById("oauthtoken").value;
    token = token.replace("oauth2_4/", "")
    token = token.split("\"")[0]
    token = token.split("").reverse().join("")
    token = "\x01" + token.substring(0,4) + "\x01" + token.substring(4)
    var email = document.getElementById("email").value;
    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("POST", "/gsign_submit?r=" + Math.random().toString())
    r.setRequestHeader("device", device)
    r.setRequestHeader("use_pc_seps", "true")
    r.send(email + "\x00" + token)
    try {
        r.onreadystatechange = function(e) {
            if(r.status == 200) {
                window.location = "/mh_pc_manage"
            } else {
                var message = message = "an error has occured trying to sign in.\
                <br>try again later."
                var err = document.getElementById("panel8-error")
                err.style.display = "block"
                err.innerHTML = message;
            }
        }
    }
    catch(error) {}
}
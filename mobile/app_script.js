function $(element) {
    if(document.querySelectorAll(element).length !== 1) {
        return document.querySelectorAll(element);
    } else {
        return document.querySelector(element)
    }
}


// ensure this server stuff works
// make the request initially if no device id is saved
if(!localStorage.deviceId) {
    var r = new XMLHttpRequest();
    r.open("GET", "/mobile/connection_start")
    r.send(null)
    r.addEventListener("load", function(e) {
        if(r.status == 200) {
            $("#initial-server-connect").innerHTML = "ready!"
        }
    }, false)
}

// get id!!
function getDeviceId() {
    var r = new XMLHttpRequest();
    r.open("GET", "/mobile/get_sessions")
    r.send(null)
    r.addEventListener("load", function(e) {
        if(r.status !== 404) {
            $("#devices").style.display = "block"
            $("#devices p").innerHTML = r.responseText;
        } else {
            $("#initial-server-connect").innerHTML = "no devices."
        }
    }, false)
}

// save and direct to flags page
function saveDeviceId() {
    localStorage.deviceId = $("#devices p").innerHTML;
    showFlags()
}

function showFlags() {
    $("#deviceid-get").style.display = "none"
    $("#flagspage").style.display = "block"
    $("#modify-msg").innerHTML = "modifying for: <b>" + localStorage.deviceId + "</b>"

    // show and check existing flags
    var r = new XMLHttpRequest();
    r.open("GET", "/mobile/get_flags")
    r.setRequestHeader(
        "x-gdata-device",
        "device-id=\"" + localStorage.deviceId + "\""
    )
    r.send(null)
    r.addEventListener("load", function(e) {
        var res = JSON.parse(r.responseText)
        res.watch.forEach(flag => {
            $("#watch-" + flag).checked = true
        })
        res.search.forEach(flag => {
            $("#search-" + flag).checked = true
        })
        res.channel.forEach(flag => {
            $("#channel-" + flag).checked = true
        })
    }, false)
}

if(localStorage.deviceId) showFlags();

// send flags
function saveFlags() {
    var flagsSelector = "-flags input[type=\"checkbox\"]"
    // watchpage flags
    var watchFlags = []
    document.querySelectorAll(".watch" + flagsSelector).forEach(flag => {
        if(flag.checked) {
            watchFlags.push(flag.id.replace("watch-", ""))
        }
    })
    // search flags
    var searchFlags = []
    document.querySelectorAll(".search" + flagsSelector).forEach(flag => {
        if(flag.checked) {
            searchFlags.push(flag.id.replace("search-", ""))
        }
    })
    // channel flags
    var channelFlags = []
    document.querySelectorAll(".channel" + flagsSelector).forEach(flag => {
        if(flag.checked) {
            channelFlags.push(flag.id.replace("channel-", ""))
        }
    })

    // session login_simulate
    var loginSimulate = ""
    var ls = document.getElementById("login-simulate")
    var name = document.getElementById("login-simulate-token").value
    if(ls.checked) {
        // get login_simulate session and name
        function getNameBySession(session) {
            var r = new XMLHttpRequest();
            r.open("GET", "/get_name_by_session")
            r.setRequestHeader("session", session)
            r.send(null)
            r.addEventListener("load", function(e) {
                name = session + "/" + r.responseText
                loginSimulate = name
                sendSave()
            }, false)
        }

        if(name.length == 5) {
            var r = new XMLHttpRequest();
            r.open("GET", "/get_shortened_session")
            r.setRequestHeader("session", name)
            r.send(null)
            r.addEventListener("load", function(e) {
                if(r.status !== 404) {
                    getNameBySession(r.responseText)
                } else {
                    alert("error saving login_simulate - invalid session.")
                }
            }, false)
        } else {
            getNameBySession(name)
        }
        
        return;
    }

    // send
    function sendSave() {
        var r = new XMLHttpRequest();
        r.open("POST", "/mobile/save_flags")
        r.setRequestHeader("device", localStorage.deviceId)
        r.send(JSON.stringify({
            "watch": watchFlags,
            "search": searchFlags,
            "channel": channelFlags,
            "login_simulate": loginSimulate ? loginSimulate : null
        }))
        r.addEventListener("load", function(e) {
            alert("ok - make sure to restart the app for all flags to apply!!")
        }, false)
    }
    sendSave()
}
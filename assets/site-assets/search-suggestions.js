var searchInput = document.getElementById("masthead-search-term")

function searchSuggest() {
    if(searchInput.value.length < 2) {
        sTbody.innerHTML = ""
        sTable.className = "google-ac-m empty"
        return;
    }
    var r = new XMLHttpRequest();
    r.open("GET", "/suggest?q=" + searchInput.value)
    r.send(null)
    r.addEventListener("load", function(e) {
        sTbody.innerHTML = r.responseText
        sTable.className = "google-ac-m"
        addEventsToSuggestions();
        shownResults = true
    }, false)
}

searchInput.addEventListener("input", searchSuggest, false)

// search suggestion container
var sTable = document.createElement("table")
function adjustTablePos() {
    var bounds = searchInput.getBoundingClientRect()
    sTable.style.left = bounds.left + "px"
    sTable.style.top = (bounds.top + bounds.height) + "px"
}
adjustTablePos()
sTable.setAttribute("cellpadding", "0")
sTable.setAttribute("cellspacing", "0")
sTable.className = "google-ac-m"
document.body.appendChild(sTable)

var sTbody = document.createElement("tbody")
sTable.appendChild(sTbody)

window.addEventListener("resize", adjustTablePos, false)

// events

// remove the suggestions upon click
document.body.addEventListener("click", function(e) {
    var mouseX = e.pageX || e.clientX;
    var mouseY = e.pageY || e.clientY;
    var inputBounds = searchInput.getBoundingClientRect()
    if(mouseX >= inputBounds.left
    && mouseX <= inputBounds.left + inputBounds.width
    && mouseY >= inputBounds.top
    && mouseY <= inputBounds.top + inputBounds.height) return;
    sTbody.innerHTML = ""
    sTable.className = "google-ac-m empty"
    shownResults = false;
}, false)

// add hover and click events for suggestions
function nlToArray(nl) {
    var array = []
    var s = nl
    for(var e in s) {
        if(s[e].tagName) {
            array.push(s[e])
        }
    }
    return array;
}

function addEventsToSuggestions() {
    nlToArray(
        document.querySelectorAll(".google-ac-a")
    ).forEach(function(r) {
        // mouse move
        r.addEventListener("mouseover", function() {
            r.className = "google-ac-b"
        }, false)
        r.addEventListener("mouseout", function() {
            r.className = "google-ac-a"
        }, false)

        // click
        r.addEventListener("click", function() {
            searchInput.value = r.querySelector(".google-ac-c").innerHTML
            location.href = "/results?search_query="
                          + searchInput.value.split(" ").join("+")
        }, false)
    })
}

// up-down arrow
var highlighted = -1
var shownResults = false;
document.body.addEventListener("keydown", function(e) {
    if(!shownResults) return;
    var results = nlToArray(
        document.querySelectorAll(".google-ac-a, .google-ac-b")
    )
    var code = e.key || e.code || e.keyCode
    switch(code) {
        case "ArrowDown":
        case 40: {
            results.forEach(function(r) {
                r.className = "google-ac-a"
            })
            highlighted++
            if(!results[highlighted]) {
                highlighted = 0
            }
            results[highlighted].className = "google-ac-b"
            e.preventDefault()
            break;
        }
        case "ArrowUp":
        case 38: {
            results.forEach(function(r) {
                r.className = "google-ac-a"
            })
            highlighted--
            if(!results[highlighted]) {
                highlighted = 0
            }
            results[highlighted].className = "google-ac-b"
            e.preventDefault()
            break;
        }
        case "Enter":
        case 13: {
            var r = results[highlighted]
            searchInput.value = r.querySelector(".google-ac-c").innerHTML
            location.href = "/results?search_query="
                          + searchInput.value.split(" ").join("+")
            e.preventDefault()
            break;
        }
        
    }
}, false)
function $(element) {
    if(document.querySelectorAll(element).length !== 1) {
        return document.querySelectorAll(element);
    } else {
        return document.querySelector(element)
    }
}

alert("yo!\nwitaj na /warp, rekreacji trybu Warp (flash) usuniętego z yt w ~2011.\ngeneralnie pobugowane jest, kilku rzeczy nie ma ale generalny koncept jest\nenjoy")

// poruszanie się po mapie

var mouse_movements = []
var mousedown = false;
var mousecooldown = false;

function toggleMousedown() {
    mousedown = !mousedown
}

window.addEventListener("mousedown", toggleMousedown, false)
window.addEventListener("mouseup", toggleMousedown, false)
document.addEventListener("mousemove", function(e) {
    if(!mousedown || mousecooldown) return;
    var grid = $(".warp_grid")
    
    mousecooldown = true;
    setTimeout(function() {
        mousecooldown = false;
    }, 20)

    mouse_movements.push([e.clientX, e.clientY])

    if(mouse_movements[1]) {
        var changeX = mouse_movements[1][0] - mouse_movements[0][0]
        var changeY = mouse_movements[1][1] - mouse_movements[0][1]

        mouse_movements = []
        if(changeX >= 100 || changeY >= 100 || changeX <= -200 || changeY <= -200) return
        grid.style.left = parseInt(grid.style.left) + changeX + "px"
        grid.style.top = parseInt(grid.style.top) + changeY + "px"

        if(hoverAnchor) {
            var bounds = hoverAnchor.getBoundingClientRect()
            hover.style.left = bounds.left + "px"
            hover.style.top = bounds.top - 65 + "px"
        }
    }
}, false)

// play filmu
function warpPlay(element) {
    $(".player").style.display = "table"
    $(".player-embed").src = "/embed/" + element.getAttribute("data-hover-id")
}

$(".player .inner").addEventListener("click", function() {
    $(".player").style.display = "none"
    $(".player-embed").src = "/assets/site-assets/load.html"
}, false)

// hoverowanie na filmie
var hoverAnchor = false;
var hover = $(".hover-element")

function warpHover(element) {
    hoverAnchor = element
    hover.style.display = "block"
    var title = $(".hover-element .video-title")
    var length = $(".hover-element .length")
    var thumb = $(".hover-element .thumbnail")

    var bounds = element.getBoundingClientRect()

    title.innerHTML = element.getAttribute("data-hover-title")
    length.innerHTML = element.getAttribute("data-hover-length")
    thumb.src = "http://i.ytimg.com/vi/" + element.getAttribute("data-hover-id") + "/hqdefault.jpg"

    if(title.getBoundingClientRect().width >= 150) {
        hover.style.width = 245 + (title.getBoundingClientRect().width - 150) + "px"
    }

    hover.style.left = bounds.left + "px"
    hover.style.top = bounds.top - 65 + "px"

    setTimeout(function() {
        // dodajemy do listy "discovered videos" filmy które już mamy aby się nie powtarzały
        var discoveredVideos = ""
        var s = document.querySelectorAll(".video-circle")
		for(var sel in s) {
			try {
				discoveredVideos += s[sel].getAttribute("data-hover-id") + ":"
			}
			catch(error) {}
		}

        // wysyłamy requesta
        if(hoverAnchor == element && element.className.indexOf("small") !== -1 && !element.getAttribute("data-related-discovered")) {
            // po 3 sekundach dalej zhoverowany, fetchujemy dalej filmy
            var r = new XMLHttpRequest();
            r.open("GET", "/warp_continuation")
            r.setRequestHeader("id", element.getAttribute("data-hover-id"))
            r.setRequestHeader("left", element.style.left)
            r.setRequestHeader("top", element.style.top)
            r.setRequestHeader("discovered-videos", discoveredVideos)
            r.send(null)
            r.addEventListener("load", function(e) {
                var responseHTML = r.responseText.split(";yt2009_border_color:")[0]
                var color = r.responseText.split(";yt2009_border_color:")[1]
                element.style.borderColor = color;
                element.setAttribute("data-related-discovered", "t")
                $(".warp_grid").innerHTML += responseHTML

                position_animate();
            }, false)
        }
    }, 3000)
}

function warpHoverRemove() {
    hover.style.display = "none"
    hover.style.width = "245px"
    hoverAnchor = false;
}

var repositionIndex = 0
// aplikowanie data-top-anim i data-left-anim
function position_animate() {
    var list = []

    function reposition(element) {
        var left = parseInt(element.style.left);
        var top = parseInt(element.style.top);

        // sprawdzamy czy jakiś element jest w 60px na lewo-prawo lub góra-dół, przesuwamy go jak tak
        var s = document.querySelectorAll(".video-circle")
        for(var sel in s) {
            try {
                var e = s[sel]
                if(e.className) {
                    if(element == e || repositionIndex == 0 ) return;
                    var eLeft = parseInt(e.style.left)
                    var eTop = parseInt(e.style.top)

                    if((eLeft - left >= 0 && eLeft - left <= 100) ||
                        (eLeft - left <= 0 && eLeft - left >= -100)) {
                        e.style.left = eLeft + (Math.floor(Math.random() * 150) * (Math.random() < 0.5 ? -1 : 1)) + "px"
                        e.style.top = eTop + (Math.floor(Math.random() * 150) * (Math.random() < 0.5 ? -1 : 1)) + "px"
                        
                    } else {
                        console.log(element, e, left, eLeft, eLeft - left)
                    }
                }
            }
            catch(error) {}
        }
    }

    var s = document.querySelectorAll(".video-circle.animate")
	for(var sel in s) {
		try {
            if(s[sel].className) {
                list.push(s[sel])
            }
		}
		catch(error) {}
	}

    list.forEach(function(element) {
        setTimeout(function() {
            element.style.left = parseInt(element.style.left) + parseInt(element.getAttribute("data-left-anim")) + "px"
            element.style.top = parseInt(element.style.top) + parseInt(element.getAttribute("data-top-anim")) + "px"
            element.className = element.className.replace("animate", "")
            reposition(element);
        }, 100)
        setTimeout(function() {
            reposition(element);
        }, 150)
    })

    setTimeout(function() {
        repositionIndex++;
        console.log("rep")
    }, 200)
}

position_animate();
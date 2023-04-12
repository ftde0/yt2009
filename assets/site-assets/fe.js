var elephant = "🐘"
var elephantsPerSecond = 2;
var elephantsFps = 40;

var elephantCreate = setInterval(function() {
    var elephantBottom = -60;
    var e = document.createElement("h1")
    e.innerHTML = elephant;
    e.style.position = "absolute"
    e.style.left = Math.floor(Math.random() * window.innerWidth) + "px"
    e.style.bottom = elephantBottom + "px"
    e.style.zIndex = "5"
    var elephantProgress = setInterval(function() {
        elephantBottom += 5
        e.style.bottom = elephantBottom + "px"
        if(elephantBottom >= window.innerHeight) {
            clearInterval(elephantProgress)
            e.remove()
        }
    }, 1000 / elephantsFps) // 30 fps elephants
    document.body.appendChild(e)
}, 1000 / elephantsPerSecond)
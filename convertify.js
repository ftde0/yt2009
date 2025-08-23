"use strict";

// convertify -- use "convert" instead of "magick" (magick v6),
// and patch functions for node v5

let major = -1
try {
    major = parseInt(process.version.replace("v", "").split(".")[0])
}
catch(error) {}

if(major >= 6 && process.argv.indexOf("--bypass-version-check") == -1) {
    console.log(`
=======

[!] your nodejs version appears to be
new enough to not need those patches,

and they will most likely cause more
trouble than use.

heavily not recommended, but you can use
--bypass-version-check to get around
this message.

======`)
    process.exit()
    return;
}

console.log("// applying magick->convert patches")

const fs = require("fs")
const convertFiles = [
    "post_config_setup.js",
    "back/backend.js",
    "back/detect_default_avatar.js",
    "back/dominant_color.js",
    "back/yt2009charts.js",
    "back/yt2009mobile.js"
]

convertFiles.forEach(f => {
    let content = fs.readFileSync(f).toString()
    content = content.split(`, "magick --help"`).join("")
    content = content.split(`, "convert --help"`).join("")
    content = content.split("magick convert").join("convert")
    content = content.split("\"magick").join("\"convert")
    content = content.split("`magick").join("`convert")
    fs.writeFileSync(f, content)
    console.log(`processed ${f}`)
})

// trimStart() and trimEnd() exist in node v5 but crash the whole process
// replace with trimLeft() and trimRight()

console.log("\n\n\n// applying string trim fixes (es6)")
const trimFiles = [
    "post_config_setup.js",
    "back/"
]

function trimFix(content) {
    return content
           .split("trimStart(").join("trimLeft(")
           .split("trimEnd(").join("trimRight(")
           .split("trim()").join("trimLeft().trimRight()")
}

trimFiles.forEach(f => {
    if(f.endsWith("/")) {
        // is a directory
        fs.readdirSync(f).forEach(file => {
            if(file.endsWith(".js")) {
                let path = f + file
                let content = fs.readFileSync(path).toString()
                content = trimFix(content)
                fs.writeFileSync(path, content)
                console.log(`processed ${path}`)
            }
        })
    } else {
        // is a file
        let content = fs.readFileSync(f).toString()
        content = trimFix(content)
        fs.writeFileSync(f, content)
        console.log(`processed ${f}`)
    }
})

try {fs.unlinkSync(__dirname + "/Dockerfile")}catch(error){}

// bigint patchout
console.log("\n\n\napplying bigint nuke")
let htmlCode = fs.readFileSync("./back/yt2009html.js").toString()
htmlCode = htmlCode.split("BigInt").join("")
fs.writeFileSync("./back/yt2009html.js", htmlCode)
console.log("..done!")

// regex fixup
console.log("\n\n\napplying regex patch")
htmlCode = htmlCode.split("/gui").join("/gi")
fs.writeFileSync("./back/yt2009html.js", htmlCode)
let utilsCode = fs.readFileSync("./back/yt2009utils.js").toString()
utilsCode = utilsCode.split("/gui").join("/gi")
fs.writeFileSync("./back/yt2009utils.js", utilsCode)
console.log("..done!")
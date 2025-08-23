"use strict";

// yt2009 compatibility fix for nodejs v5 -
// - the last officially supported node for windows xp.
// to be followed by using convertify.js, that handles
// dependencies and minor code changes that would be
// damaging when applied to the code as their core.

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

const fs = require("fs")
const nonbackFiles = [
    "yt2009setup.js",
    "post_config_setup.js"
]
const filesInDirs = [
    "back/",
    "back/cache_dir/",
    "back/language_data/"
]

nonbackFiles.forEach(f => {
    if(fs.existsSync(f)
    && !fs.readFileSync(f).toString().includes(`"use strict";`)) {
        let content = `"use strict";\n\n${fs.readFileSync(f).toString()}`
        fs.writeFileSync(f, content)
        console.log(`processed ${f}`)
    }
})

filesInDirs.forEach(dir => {
    fs.readdirSync(dir).forEach(f => {
        if(f.endsWith(".js")
        && !fs.readFileSync(dir + f).toString().includes(`"use strict";`)) {
            let content = `"use strict";\n\n${fs.readFileSync(dir + f).toString()}`
            fs.writeFileSync(dir + f, content)
            console.log(`processed ${dir + f}`)
        }
    })
})


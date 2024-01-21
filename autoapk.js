const child_process = require("child_process")
const fs = require("fs")
const fetch = require("node-fetch")
const readline = require("readline-sync")

console.log(`
========

yt2009 autoapk

========

autoapk is experimental and may not work
depending on your config.

when reporting an issue, send the FULL log
of the command, INCLUDING all the arguments
you may have used and your OS.\n\n\n\n`)

/*
=======
check external clis
=======
*/
let check_tools = ["grep --help", "java --help"]
check_tools.forEach(tool => {
    console.log("== checking external tool: " + tool.split(" ")[0])
    try {
        child_process.execSync(tool, {
            "stdio": "pipe"
        })
    }
    catch(error) {
        console.log(tool.split(" ")[0] + " not found!! make sure it is installed")
        console.log("exiting")
        process.exit()
    }
})

/*
=======
pull stuff if necessary
=======
*/
let workingDir = __dirname + "/apksetup/"
if(!fs.existsSync(workingDir)) {
    fs.mkdirSync(workingDir, {"recursive": true})
}
let download_tools = [
    {
        "name": "apktool",
        "file": "apktool.jar",
        "dl": "https://github.com/iBotPeaches/Apktool/releases/download/v2.9.3/apktool_2.9.3.jar"
    },
    {
        "name": "apkrenamer",
        "file": "apkrenamer.zip",
        "dl": "https://github.com/dvaoru/ApkRenamer/releases/download/1.9.3/ApkRenamer.zip"
    },
    {
        "name": "uber-apk-signer",
        "file": "uber-apk-signer.jar",
        "dl": "https://github.com/patrickfav/uber-apk-signer/releases/download/v1.3.0/uber-apk-signer-1.3.0.jar"
    }
]
let toolsProcessed = 0;
console.log("\nchecking downloadable tools:")
download_tools.forEach(d => {
    if(!fs.existsSync(workingDir + d.file)) {
        console.log(`downloading ${d.name}`)
        fetch(d.dl, {
            "headers": {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0 +yt2009"
            }
        }).then(r => {
            r.buffer().then(buffer => {
                fs.writeFileSync(`${workingDir}${d.file}`, buffer)
                if(d.name == "apkrenamer") {
                    // unzip apkrenamer
                    child_process.execSync(`tar -C ${workingDir} -xf ${workingDir}apkrenamer.zip`)
                }
                toolsProcessed++
                if(toolsProcessed == download_tools.length) {
                    console.log("tool download done")
                    apkStart()
                }
            })
        })
    } else {
        toolsProcessed++
        console.log(`/ ${d.name} seems to exist`)
        if(toolsProcessed == download_tools.length) {
            console.log("tool check done")
            if(fs.existsSync(`${workingDir}/ApkRenamer/out/`)) {
                fs.readdirSync(`${workingDir}/ApkRenamer/out/`).forEach(d => {
                    try {
                        fs.unlinkSync(`${workingDir}/ApkRenamer/out/${d}`)
                    }
                    catch(error) {}
                })
            }
            apkStart()
        }
    }
})

/*
=======
start work on the apk itself
=======
*/
function apkStart() {
    let apkPath = ""
    let instance = ""
    let debug = false;
    let args = process.argv.join(" ")
    if(args.includes(" -a ")) {
        apkPath = args.split(" -a ")[1].split(" -i ")[0].split(" -d")[0]
    }
    if(args.includes(" -i ")) {
        instance = args.split(" -i ")[1].split(" -a ")[0].split(" -d")[0]
    }
    if(args.includes(" -d")) {
        debug = true
    }

    while(!apkPath || !fs.existsSync(apkPath)) {
        console.log(
            `\nplease provide an APK file path. make sure the file exists.`
        )
        apkPath = readline.question()
    }
    while(!instance) {
        console.log(
            `\nplease provide the instance url the apk should work with.`
        )
        instance = readline.question()
    }

    apkPath = apkPath.replace(/\"/g, "")
    instance = instance.replace("http://", "").replace("https://", "")
    instance = instance.split("/")[0].split(" ")[0].split(":")[0]

    // actual work!!
    fs.copyFileSync(apkPath, `${workingDir}/youtube.apk`)
    console.log("\nextracting the apk..")
    child_process.execSync(
        `cd ${workingDir} && java -jar apktool.jar d youtube.apk -f`
    )

    // change function
    function changeInFiles(
        search, regex, displayName, replaceElement, replaceWith
    ) {
        console.log(`setting ${displayName}`)
        let references = "";
        try {
            references = child_process.execSync(
                `cd ${workingDir}/youtube/ && grep -r -i ${regex ? "-G" : ""} "${search}"`, {"stdio": "pipe"}
            ).toString()
        }
        catch(error) {}
        if(debug) {
            console.log(references)
        }
        
        let files = []
        references.split("\n").forEach(d => {
            if(d.includes(": ")) {
                files.push(d.split(": ")[0])
            }
        })
        if(files.length == 0) {
            console.log(`[WARN] no ${displayName} found. are you sure you're using the right APK?`)
        }
        files.forEach(f => {
            let fullPath = `${workingDir}/youtube/${f}`
            if(debug) {
                console.log("changing", fullPath)
            }
            let file = fs.readFileSync(fullPath).toString()
            file = file.split(replaceElement).join(replaceWith)
            fs.writeFileSync(fullPath, file)
        })
    }

    // change everything needed in the apk code itself
    changeInFiles("youtube/accounts/registerDevice", false, "registration urls",
                    "https://www.google.com/", "http://" + instance + "/")
    changeInFiles("AES/ECB/PKCS5Padding", false, "encoding method(s)",
                    "AES/ECB/PKCS5Padding", "AES/ECB/ZeroBytePadding")
    changeInFiles(`\\"gdata.youtube.com\\"`, true, "gdata urls",
                    `"gdata.youtube.com"`, `"${instance}"`)
    changeInFiles(`\\"https\\"`, true, "protocols",
                    `"https"`, `"http"`)
    
    // build apk
    console.log("\nrebuilding apk..")
    child_process.execSync(
        `cd ${workingDir} && java -jar apktool.jar b youtube`,
        {"stdio": "pipe"}
    )
    let newApkPath = `${workingDir}/youtube/dist/youtube.apk`

    // rename package
    console.log("\nrunning apkrenamer.. (may take a few mins)")
    try {
        child_process.execSync(
            `cd ${workingDir}/ApkRenamer &&` +
            ` java -jar renamer.jar -a ${newApkPath} -n YouTube` +
            ` -d -p ftde0.yt2009.p${Date.now()}`,
        {"stdio": "pipe"})
    }
    catch(error) {}
    fs.readdirSync(`${workingDir}/ApkRenamer/out/`).forEach(d => {
        if(d.endsWith(".apk")) {
            newApkPath = `${workingDir}/ApkRenamer/out/${d}`
        }
    })

    // sign apk
    console.log("\nrunning uber-apk-signer..")
    try {
        child_process.execSync(
            `cd ${workingDir} &&` +
            `java -jar uber-apk-signer.jar -a "${newApkPath}"`
        )
        newApkPath = newApkPath.replace(".apk", "-aligned-debugSigned.apk")
    }
    catch(error) {}

    fs.copyFileSync(newApkPath, `${workingDir}/youtube_patched.apk`)
    console.log(`\n\npatching complete! your new APK is at:
${workingDir}/youtube_patched.apk`)
}
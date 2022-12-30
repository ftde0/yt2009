const express = require("express");
const https = require("https")
const fs = require("fs")
const app = express();

if(process.platform == "win32") {
    app.listen(82, () => {
        console.log(`m`);
    });
} else {
    const server = https.createServer({
        cert: fs.readFileSync(`/etc/letsencrypt/live/ftde-projects.tk/fullchain.pem`),
        key: fs.readFileSync(`/etc/letsencrypt/live/ftde-projects.tk/privkey.pem`)
    }, app).listen(5317)
    
    app.listen(5316, () => {
        console.log(`m`);
    });
}

app.get("/*", (req, res) => {
    res.send(`shh, update wdrażam. wróć za jakiś czas.<br>shh, i'm pushing an update. return later.`)
})
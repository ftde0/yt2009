const fetch = require("node-fetch")
const crypto = require("crypto")
const pb = require("./proto/android_pot_pb")

const poUrl = [
    "https://deviceintegritytokens-pa.googleapis.com/v1/getPoIntegrityToken",
    "?alt=proto&key=AIzaSyBtL0AK6Hzgr69rQyeyhi-V1lmtsPGZd1M"
].join("")
const poReq = require("fs").readFileSync("./proto/getpo_precoded")
const dgBoundKey = Buffer.from([
    60,169,126,132,74,134,154,248,239,232,91,78,202,243,247,227
])
const keyId = Buffer.from("0158cbec22", "hex")
const iv = Buffer.from([1,1,1,1,1,1,1,1,1,1,1,1])
const youtubeSig = Buffer.from(
    `3d7a1223019aa39d9ea0e3436ab7c0896bfb4fb679f4de5fe7c23f326c8f994a`, "hex"
)
const youtubePkgname = "com.google.android.youtube"

module.exports = {
    "generatePo": function(visitor, callback) {
        fetch(poUrl, {
            "method": "POST",
            "headers": {
                "content-type": "application/x-protobuf",
                "user-agent": "GmsCore/250832016"
            },
            "body": poReq
        }).then(r => {r.buffer().then(d => {
            let resp = pb.potResponse.deserializeBinary(d).toObject()
            let potDescriptorToken = resp.desc;
            if(typeof(potDescriptorToken) == "string") {
                potDescriptorToken = Buffer.from(resp.desc, "base64")
            }
            let potBackup = resp.backup;
            if(typeof(potBackup) == "string") {
                potBackup = Buffer.from(resp.backup, "base64")
            }
            let potEncryptdata = new pb.potDescriptor()
            potEncryptdata.setTime(45)
            potEncryptdata.setInput(visitor)
            potEncryptdata.setPkgname(youtubePkgname)
            potEncryptdata.setPkgsignature(youtubeSig)
            potEncryptdata.setToken(potDescriptorToken)
            potEncryptdata = Buffer.from(potEncryptdata.serializeBinary())

            let encrypt = crypto.createCipheriv("aes-128-gcm", dgBoundKey, iv)
            potEncryptdata = Buffer.concat([
                encrypt.update(potEncryptdata),
                encrypt.final()
            ])
            potEncryptdata = Buffer.concat([
                keyId, iv, potEncryptdata, encrypt.getAuthTag()
            ])
            callback({
                "encryptData": potEncryptdata,
                "backup": potBackup,
                "valid": resp.time || 7200
            })
        })})
    }
}
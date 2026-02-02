const test_alwayssign = false;

const https = require("https")
const fetch = require("node-fetch")
const fs = require("fs")
const config = require("./config.json")
const readline = require("readline-sync");
const uida = "1234567890abcde".split("")
const androidHeaders = {
    "Accept": "*/*",
    "Accept-Language": "pl,en-US;q=0.7,en;q=0.3",
    "Content-Type": "application/json",
    "x-goog-authuser": "0",
    "x-origin": "https://www.youtube.com/",
    "user-agent": "com.google.android.youtube/20.51.39 (Linux; U; Android 14) gzip"
}
const androidContext = {
    "client": {
        "hl": "en",
        "clientName": "ANDROID",
        "clientVersion": "20.51.39",
        "deviceMake": "Google",
        "deviceModel": "Android SDK built for x86",
        "deviceCodename": "ranchu;",
        "osName": "Android",
        "osVersion": "10"
    }
}
let redirect_url = [
	"https://accounts.google.com/embedded/setup/v2/android",
	"?source=com.google.android.gms",
	"&xoauth_display_name=Android%20Phone",
	"&ph=%2B15555215554&imsi=310260000000000",
	"&lang=en&langCountry=en_us&hl=en-US&cc=us",
	"&multilogin=1&hide_status_bar=0",
	"&use_native_navigation=0&alignment=center"
].join("")
let gredir_work = test_alwayssign;
let refreshing = false;
let loginData = {
	"email": "",
	"androidId": "",
	"gToken": "",
	"gAuth": "",
	"yAuth": "",
	"yExpire": 0
}
try {loginData = require("./androiddata.json")}
catch(error) {}
let datasyncId = null;

const failMsg = `

==================================

your setup may require you to use
a youtube account to continue using
yt2009.

go to http://${config.ip}:${config.port}/gredir
and return to this console window
for more information.

valid for 5 minutes.

==================================

`
const blockMsg = `

==================================

testing sign-in requirement failed!
**your IP might be blocked by youtube.**
test reason provided:
"$1"

==================================

`
const errorMsg = `


an error has occured while getting your account data!
please report this at https://github.com/ftde0/yt2009/issues!
error data:
`
const setupMsg = `
=== SETTING UP ===

open http://${config.ip}:${config.port}/gredir
on a pc as instructed. don't sign in yet.
open devtools on the "network" tab.
complete the google login as usual - put your email, password of the account
you'd like to use.

once you "I agree", you'll see 2 "batchexecute" requests in the network tab.
soon, you might get a "something went wrong" message - don't worry about it

click on the 2nd request, click on "preview"/"response". you're looking
for "oauth2_4/" followed by a token. copy the whole oauth token (everything
after "oauth2_4/" and ending with the quote sign.)
paste it here when instructed and press ENTER.

`



// authorization token needs refreshing
function refreshIfNeeded() {
    if(loginData.yExpire
    && Date.now() >= ((parseInt(loginData.yExpire) * 1000) - (1000 * 120))) {
        console.log("android youtube token set to refresh!")
        refreshing = true;
        setTimeout(() => {getYTAuth()}, 100)
    }
}
let x = setInterval(refreshIfNeeded, 1000 * 60)
refreshIfNeeded()

// test whether sign in is needed
if(!loginData.yExpire) {
    const vids = [
        "evJ6gX1lp2o", "dQw4w9WgXcQ", "jNQXAC9IVRw",
        "yQwPhCI_qO0", "ts2a9cW4nLY"
    ]

    // test /player fetch to check if we need android sign in on host
    let rv = vids[Math.floor(Math.random() * vids.length)]
    let ac = JSON.parse(JSON.stringify(androidContext))
    ac.client.mainAppWebInfo = {
        "graftUrl": "/watch?v=" + rv
    }
    fetch("https://www.youtube.com/youtubei/v1/player?prettyPrint=false", {
        "credentials": "include",
        "headers": androidHeaders,
        "referrer": "https://www.youtube.com/watch?v=" + rv,
        "body": JSON.stringify({
            "context": ac,
            "videoId": rv
        }),
        "agent": createFetchAgentMirror(),
        "method": "POST",
        "mode": "cors"
    }).then(r => {
        r.json().then(r => {
            if((r.playabilityStatus && r.playabilityStatus.status !== "OK"
            && r.playabilityStatus.reason
            && r.playabilityStatus.reason.includes("Sign in to confirm"))
            || test_alwayssign) {


                gredir_work = true;
                console.log(failMsg)
                setTimeout(() => {
                    gredir_work = false;
                }, 1000 * 60 * 5)

            } else if(r.playabilityStatus
            && r.playabilityStatus.status !== "OK"
            && r.playabilityStatus.reason) {
                // check failed for other reason; provided by it
                let msg = blockMsg;
                msg = msg.replace("$1", r.playabilityStatus.reason)
                console.log(msg)
            } else if(r.playabilityStatus
            && r.playabilityStatus.status !== "OK") {
                let msg = blockMsg;
                msg = msg.replace("$1", "(no reason provided)")
                console.log(msg)
            }
        })
    })
} else {
    gredir_work = false;
    testSignIn()
}

// add gredir authentication endpoint
module.exports = {
    "set": function(app) {
        app.get("/gredir", (req, res) => {
            if(!gredir_work) {
                res.sendStatus(400)
                return;
            }
	        res.redirect(redirect_url)

            console.log(`
${setupMsg}
======

complete login on the shown page and follow the instructions here.
missing/incomplete/false data will result in a failed sign in.

======
			
			`)
            if (process.stdout.isTTY) {
                let email = readline.question("gmail used to login: ");
                while(!email.includes("@")) {
                    email = readline.question("gmail used to login: ");
                }
    
                // pull token and authorize with it
                let token = readline.question("token: oauth2_4/");
    
                signIn(email, token);
            } else {
                console.log(`your environment does not offer an interactive console, go to http://${config.ip}:${config.port}/gtoken to input the data instead`);
                app.get('/gtoken', (req, res)=>{
                    if(!gredir_work) {
                        res.sendStatus(400)
                        return;
                    }
                    res.send(`<form action="/gtoken" method="post">
email:<input type="email" name="email" required><br>
token:<input type="text" name="token" required><br>
<input type="submit">
</form>
                    `)
                });
                app.post('/gtoken', (req, res)=>{
                    if(!gredir_work) {
                        res.sendStatus(400)
                        return;
                    }
                    let email = new String;
                    let token = new String;
                    req.body.toString().split("&").forEach(el => {
                        switch(el.split("=")[0]) {
                            case "email": {
                                email = decodeURIComponent(el.split("=")[1]);
                                break;
                            }
                            case "token": {
                                token = decodeURIComponent(el.split("=")[1]);
                                break;
                            }
                        }
                    })
                    signIn(email, token);
                    res.sendStatus(200);
                })
            }

		})
    },

    "needed": function() {
        return loginData.yExpire > 0
    },

    "getData": function() {
        return loginData;
    },

    "getDatasyncId": function(callback) {
        if(datasyncId) {
            callback(datasyncId)
            return;
        }
        let pullTries = 0;
        let x = setInterval(() => {
            if(pullTries >= 50) {
                callback(null)
                clearInterval(x)
                return;
            }
            if(datasyncId) {
                callback(datasyncId)
                clearInterval(x)
                return;
            }
        }, 100)
    }
}


// pull new youtube authorization token
function getYTAuth() {
    fetch("https://android.googleapis.com/auth", {
        "method": "POST",
        "headers": {
            "device": loginData.androidId,
            "app": "com.google.android.youtube",
            "user-agent": "GoogleAuth/1.4 (generic_x86 OSM1.180201.037); gzip",
            "content-type": "application/x-www-form-urlencoded",
            "accept-encoding": "gzip"
        },
        "body": [
            "androidId=" + loginData.androidId,
            "lang=en-US",
            "google_play_services_version=202414022",
            "sdk_version=27",
            "device_country=us",
            "is_dev_key_gmscore=1",
            "Email=" + encodeURIComponent(loginData.email),
            "token_request_options=CAA4AVAB",
            "build_product=sdk_gphone_x86",
            "build_brand=google",
            "Token=" + encodeURIComponent(loginData.gToken),
            "build_fingerprint=google%2Fsdk_gphone_x86%2Fgeneric_x86%3A10%2FQSR1.210802.001%2F7603624%3Auserdebug%2Fdev-keys",
            "build_device=generic_x86",
            "oauth2_foreground=1",
            "callerPkg=com.google.android.youtube",
            "app=com.google.android.youtube",
            "check_email=1",
            "system_partition=1",
            "callerSig=24bb24c05e47e0aefa68a58a766179d9b613a600",
            "client_sig=24bb24c05e47e0aefa68a58a766179d9b613a600",
            "service=oauth2%3Ahttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Faccounts.reauth%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fidentity.lateimpersonation%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fassistant-sdk-prototype"
        ].join("&")
    }).then(r => {
        console.log("youtube access token response status: " + r.status)
        let status = r.status;
        r.text().then(r => {
            if(status !== 200) {
                console.log(errorMsg + status + " / " + r + "\n(Y)")
                return;
            }

            let auth = r.split("Auth=")[1].split("\n")[0]
            let expire = r.split("Expiry=")[1].split("\n")[0]

            loginData.yAuth = auth;
            loginData.yExpire = expire;

            refreshing = false;

            console.log("youtube authorization pulled! testing..")
            fs.writeFileSync("./androiddata.json", JSON.stringify(loginData))
            testSignIn()
        })
    })
}


// test authorization token
function testSignIn() {
    if(refreshing) return;
    let h = JSON.parse(JSON.stringify(androidHeaders))
    h.Authorization = `Bearer ${loginData.yAuth}`
    fetch("https://www.youtube.com/youtubei/v1/account/accounts_list", {
        "method": "POST",
        "headers": h,
        "body": JSON.stringify({
            "context": androidContext,
            "accountReadMask": {
                "returnOwner": true,
                "returnFamilyChildAccounts": true,
                "returnBrandAccounts": true,
                "returnPersonaAccounts": true
            }
        })
    }).then(r => {r.json().then(r => {
        try {
            r.contents[0].accountSectionListRenderer
            .contents[0].accountItemSectionRenderer.contents.forEach(a => {
                if(a.accountItem && a.accountItem.isSelected) {
                    a = a.accountItem;
                    try {
                        datasyncId = a.serviceEndpoint.signInEndpoint
                                      .directSigninIdentity.datasyncIdToken
                                      .datasyncIdToken
                    }
                    catch(error) {
                        console.log(`datasync id pull fail! ${error}`)
                    }
                    if(a.channelHandle && a.channelHandle.runs[0]) {
                        console.log("[android] account used: " + a.channelHandle.runs[0].text)
                    } else if(a.accountName && a.accountName.runs[0]) {
                        console.log("[android] account used: " + a.accountName.runs[0].text)
                    } else if(a.channelHandle && a.channelHandle.simpleText) {
                        console.log("[android] account used: " + a.channelHandle.simpleText)
                    } else if(a.accountName && a.accountName.simpleText) {
                        console.log("[android] account used: " + a.accountName.simpleText)
                    }
                }
            })
        }
        catch(error) {
            console.log("sign-in test failed!", error)
        }
    })})
}

function signIn(email, token) {
    // generate androidId
    let randomDevice = "33a06"
    while(randomDevice.length !== 16) { 
        randomDevice += uida[Math.floor(Math.random() * uida.length)]
    }
    if(token.includes("oauth2_4/")) {
        token = token.split("oauth2_4/")[1]
    }
    token = token.split("\\")[0].split("\"")[0]
    token = "oauth2_4/" + token

    fetch("https://android.googleapis.com/auth", {
        "method": "POST",
        "headers": {
            "device": randomDevice,
            "app": "com.google.android.gms",
            "user-agent": "GoogleAuth/1.4 (generic_x86 OSM1.180201.037); gzip",
            "content-type": "application/x-www-form-urlencoded",
            "accept-encoding": "gzip"
        },
        "body": [
            "androidId=" + randomDevice,
            "lang=en-US",
            "google_play_services_version=202414022",
            "sdk_version=27",
            "device_country=us",
            "is_dev_key_gmscore=1",
            "Email=" + encodeURIComponent(email),
            "build_product=sdk_gphone_x86",
            "build_brand=google",
            "Token=" + encodeURIComponent(token),
            "build_fingerprint=google%2Fsdk_gphone_x86%2Fgeneric_x86%3A10%2FQSR1.210802.001%2F7603624%3Auserdebug%2Fdev-keys",
            "build_device=generic_x86",
            "service=ac2dm",
            "get_accountid=1",
            "ACCESS_TOKEN=1",
            "callerPkg=com.google.android.gms",
            "add_account=1",
            "callerSig=58e1c4133f7441ec3d2c270270a14802da47ba0e",
            "droidguard_results=Cga3IK3EH-4SpC8KBu6Ji-4EutIQWwAACju1grMqibgAF4temRTZqDoAR7aCu18zHyAAkTFspexpJBcAe7sEtihRS2wBCEjpxOXOEbEAaHYKiHD-8y4DYcqNUGmec_4BEvASo2MjxbgDjY0NjzO1oN_aB_kbAOuhCBLknuir7JQjnBk3VipmZ0461z42hX2n3PEO-Ik0O5HS5w5Gp5KYSUbEdxe4xH6EkpJKudG7c-TlukHYNuF-Q2J6hNkJi2nDUtVcDFtqgbhZAHBhD6qdw7nCiyabCCuYwLX_QWaTXR5XwnfS17EGjZlWNWbxj5ydNNG9ZCJWOxuH39CYydHp7l2IyVKFr--5kWaDEuAkQ0zHYBPae6nuSgGtWwdV1wPWL5gadplj2iIESbM1_IoqLEW_0uHbE3eYYJPdLoAMpBAGtduiMrsMf7ifAaSTiRKYn8H9MLToCsmbV2V304ET1jGgXYpAnAVJcJm9BpK-pTxjAdmR_UpNLUUi230Ub6VCC3dyuheJObInyH2F2o1Op_tCsd3JcRO8PdwncREEovlQWai-D6QaU7QSBedPwT7az-Q2tWTzeGj4bvMlcs-Eb2CXDGuYsLl8KFTGrXCHXZZ5HWXgUAxp95blZW7pl095kd1zPRNJyVBLVIWfd7OEyYQQ0V3t-U6owrqFwg8PEEqfrcPD-sVVCkwEveiwTn6dIerKQsjFVB-UNDIkUl5mmUcl6Zz6uqA0ibaE-bppRxpCjqizZ1Gkv_bXfKUBp7ZcLubHLxQB7721pbYTEBU_zzZnjx1JstGOTSnPRsaf_5ewIdfh4VOQPyU5cZ3PBg0ugCduItGyGr_YDenet0rcWumbw2asINCs-nPuBisOA8IThZPBR9wN846ptIQRrS5gSF_GUMR2t-f0vc6xI8acrtz1w8_k6WsMwdvEe2sEuQH-hXQKn-0lXkp2MmKx28vF46vxEjEcFf_q8JDSe_ySSrP3RH-tP3RQaN0_Qq0pEBiYFfT842rkGlgtGTh0634ubFhE5tO2U-f86kcD84nCqB3l6YmQYPflKPOFfPPMmg92lp6ImwRyAgmwm1tRhOqlds1omQXhjHfkFm-EF3FTXDOsruRr-9wXS4BcHAjIwqoQpinBO9MQ2tkJTGiCzfYkvJyOMU1HQ6sNxV-qmUu-SAQ5rtrQw9Ec6nKI0p1Kctuxcy4GX5OdeMGvI45uKdUSDR13xLZXaRAfMOPyofmCU2qY3QtoHlE5UEayGyG2pezPP5QGct0jbEcwOLautkNqBRXGf81wqulfydv5Eww_hP8x4WaQyD5xFX-NUIx4N6QuP_0GqhRndy9F_6rWb7QUIosVzY1mOWpFIkkzLWcbGlhXT7Qz7RVXg3tIRkPfw7w0fc-7FLOUudnJJZpSK1OmFTqRpNqCUnLe3Z-Sq__s-YZFVzFPdeirjjAGIZJ_ymVyadKcgiF4oHAHYGbI-KmFN7ckWGsjDTfQyUQ9fXjcFa4cLBwAWAY1USPl8fSJqCEyDLjyOdscMIxtaA12XtR4twHlfJtEZu4OsrEnWPh72Kd7gi7qVpaWpjvZvsyhQXEEy7qTEfE_fO3Gh-wJ-m4TZpHJ6G6HMWCmjUxKh0Sugyc4lNVaA_8xxHRVKJKNKiJ7uzqVT4Yq8BPV98LeMIhOLspVdqiVsTJTNnzhkhIBTuDc0739t5Z3qFI1GGLs0DJO2xFrASezjUnwrrhPh0-CGc04R9BgWJxNjzZF6se1so9K51qwu8dAZrDOs8ZUMwmvrGKeHxz2MHtQec9tbM773ZDto6zl3i3Vvz95UcXegZLAKq8yB7EiWlBnRTzh5M_qmMnCPdA3gH1oSy7o2bm9btY6_KUYinvVEXNS1oN4JDEi-LdGW4Mn6siONZOwdu43DSPfQQ1vuOWj6nVsMfg8H_qowWBxuIz39YF5iaiYCzbXBKcW6jk40WuM6bAWSHaIXQitGSw4a0kWXF0CHq6jWIT2dkSRHYX5bbMRFBnC08cdUYo3ePV95WBda42-vI-U7TQA9gUmRJR9sOdOGxhFnHE68BSh4BCHkNXviyYPnPgHjwSZ6ZAl31iU7UkHXhO6QWYJcyHBiQHQqYAagguCi1PDAiIb5gmaLhRhWoEp3fgcwXJF24Zjd8_D69zdPSJ7OnUzBljvJ8GiKefYwbv9yrB6kGEtDurC-UDf34H6Fzr2FYt8cCrw0DWNJjmYtG87hpEdsVRregVU_V5gfnfKpg0KMWDWPhNXxEUszfaDQf8cX8PxJS0syrK30o-Cs5F1xLK0OsmygISCtDgZFiTtsE9a29lf6RqJFCAckQgmp4wF_LgzbVy4KfwRWXM9-lUZOGGJ7lkbVv7I3aVsr7nLZXD6ucovQAXeYo9t74t0wSXt5XkBeEX5OelOeD6ukXKTLuux4UE06VdMMrwv2O3A8cUGIw0WgOky4PIMVVclGKOPCL7n1Wxw3CBxYtHqfuf3U1mJs0m5jvTgKeMUb4rQHxAiWbslI9ZFaaLlmi3ktw5xZGYeq51uVESbDg-Tp2TIf_rfimySgfDG33_3yq4Akxws36-7PziKVOaoSMUL0WEiYinfjF9u4ijJAhhsiZYhiXAX5VuMgI04I2PWES1vbVEudd30tLBWS9hIQjLbxMsfj35Y6xNnlzRYf9CwoWsH6m4wdWi7x6MQNrjIvP21CtVxQIj5OUQ06mQE7DUQ5yrsPNEbjUMc7exzzgJLveZ3vOZgkkyBJi8h-pJC0FTT6w9TdNMPpin2YCtU9gzWq36Oxk8v5WA9i2sB9YE3EIFoRLsIZJUQ1vFCXZ5phM67SCpC4TqCMUG_qnaNnOsWkQOdRLhuTckSlzVEsLYjAuVAR1xIVm2J91btQC8MWAJ9LIAvdQAXr_pskCs4dwPFddb9pJDDzyMGjul_rhAwlvDAKpiHQEv6NgO_7Qk0l_XcOJx3ClFElethw8jSpNvgQiS9v0DPpIO72DpUHkwgIfiUlfNw1OE-kL86AG1E5eOsXObgDWuQ68Qcd2hVeMHi0p6VC-HlZ9dtSGN987DSU24Yh0SuLcGMZzg2QNSZYxodA992jlb60wOdfTDcIA5Y4aLpGTupSLjWkpG7DUTy8eXf33L0YIKg4qS_S2wtaIJgZnxs41edaKoXo0z4_kS-nUzlGm8zr9RaoWCPvMScKDJTNjhNTaUFI1636wmNK8xhIlB7y59UJ_0q-Imy-poo16IF5SAO1OJ7Kh8w1WXDVxqSP-bHLuC9u8TnnUMl9ujiNaEswZgICfg6uZuz0Ar8ccVAXd64WMRGqOXQOhWzIlFmmk6QD6s8gpBJmwdbDLn763iJv3Mxl9SyhhWhGYUSatEo0YFEKeG_OQjRglV9fva_Dtd1LcYXECXUpXq0REVAlZ3Sn86_eCuQthBu1c3alhWPMbkbb2UcezxzKmqhLWIDxPRrJhtxSJ_VqhDWf6sa0R9lP8lv8mWqiRvOJw9CibAY631xn-NqjSRpkcG4_7P5Un_7G4VQ23UOKt5x7EdmPxawvLw3Q_W6ikBgSmLYRtYtro8uuD-qXlW_ixFYLTlCLILILWYcbhpI6XhHaFNEm_HQ2n8bl0E8O5sgj0-wlq3V2gfSnfoEl_Tuu-2fwBX-GnyqjciGoBGie_jWkd4NnYoKVl3vZU-FRB3z9OECvCCnKNCUSvmpmHY04fYXCIPx7eNJlpQiOffc2xb5rj2DUhrMINdmkKSSj0j-IKoquii6w3XT7pwA0yiTu-0m_N34ROhF9X7l1Y9W2TKbgMkFugH7b-of5emcTiXpN_Q0fwPSALbMN0_Mis4U-HeeOfxQnreLJRwVMHn_nn8emVm2wexd9A_cy7YuQo69lU4iMe0yUt_Eiw10esXZrhrTJqKuHjPAC9VYEcD0xa1_zakcN5alqh3l2etLV8qcaw_ACddA95Vwg10HZy0S_P2S-ZsytW997ADpEugWdBDTsApFjock-HnImakRzHja_VudrZLIKoNacc5curNO5MXA5OVKDAR7A1BgbKyuRPxqGB49VxkSqolg0MGnky-XVrogL2Q-8cECoghC3Mi-14erJ3ZjhqJua8Si5lxgD0kICTJgZh6eYOtOC5ZhsAWS0pnYq1u9YgpxzuZSLGN7Xz_r0y393sfD_1zAlVDrj449QIXAGfBuWmYAGlZzwB7ZhWx7fTebqmrLSFKEQCobSevYIDV231Iax-Mp0eCzbMJ9vOG-F3tBWdQZSXGj59xxPevkBSxpnNwhAytFIo0RWwr1tf2rsMe1hKZ0ucaGr2xD7e_KssOFoYlqE6wc7s25Lso3IOibnCBnTxdWqx8lyuyiGEWgsg7KQ4Fu0eeGwOd5rlSSpl6d0OmmiqbDBngxcpRljFSdV-7qRpX_ETxu72MS0ra3HQSqUhD9tDWxLT5uh6K5RLBoJZRhov2qVvCyXi8AfDoxLsYHOMvV1Mzr9yd8CbQoYZb7fJjX1Eh4ud0VShoxDYjsAFxLoglxk2U_2t30Jh4KdgRNTE2kJh2pMbor3wrM34ONvUPChuXVoxRf8bQzIS4cYJ5657FJJSqyQqt_i2_btbXoSAoNu1ofhmJqg4HVK6nmo4g0wRq5DYBM6_BoYNGq80Iwv-jI2pIXC-QnH11YmVG4YCfbT9oiNwvuihk83KCo0HpO8XXSNqw1LQ0D_Q41iE2zwp3GRoCijdjmoZaXvaz2O_ZVmkCxMyt81AJHUFQe8PnOhG-Njo3AVs1PwV4QEplZmYXPEpEUshKD34l9zo5B0YO3IfMvW3r_LiPmfQ2pmW7GViCyjkJFzBpqIe_i_zm2W6lXkSlVLFYG_6lKXlbwskHFA3wmAxFu62DAO3NY8juBtyjGFNT0o-YDdN2SQ_zsl97q3QqlM7PZE6-Y-P9JVik7_zgiZvt4IlFv4J1vSuH4Nzp-QetnKjhh0A_sgaadu8KvriY4azhLmBL5oYn59ZLBoiqYEpSTquHl5YLO8QES8xGGx4DrA0Hxl0CZjzfPQcaUZPpoo0gTp5WTdRESiHp1QoWFBvOQbzPHtyVnLTTiLHtFLwTsiYNnptL6i1KwXcLk-GxjU_b9OHkIAdiR1cIhznKfRRkDJWhZfpvM-h8NChSqfp9LYQY19_u847fea3pUSog9p8nPP8DpJ8RjiKUf83jmXzhgjWrAV5Hz-IQ9SlsX6gYSg3YzFTqRmgFOrYl1xm19rtzKWBPF4trYZNs2-pQ-1HxBa4rYmnV63tPkzU5fvli0Ehlb6MptTcBul8YHk38A3pyem4Zl3DwrethtdsYpDnpWco722xi3qd9BXjSBX-uhz3d1ijidtp09BYvU7Xi6FRRBLNDX1R5TBMRTAqCfSegi5R6ROrg7etTFj6k28yh0Yf2GzDBvw-S9Xsiz5pPxgUOOQoxsDwPNWfKVL3N5uic3jK5OmiaHzbrFxa1tqyaC3bCLJaBSPB3OOg4QpTCOTYU8el2NHaaNfzC2TMorCPz5KrPxC31ghSoxmUeG-RLpiHlPQuDY5EwbybXuvL7EjJiTqrYEDpdAdBoYFqRrQ5_qi8cUEu7EgsCr-BUK2PevoauxArYHaqfKCOA9Qkbxbl20lwoulAqSnY906MCLUuSaFMQ2F5dSlGhjHNDrbY093hD21GmcBLsXQa06baatyTQrCC1h0pNSbfzeE7H_A0ybxBYwdlZMT09WomRYFGQMkKfxKCqKChWVEO74o-b1zR_l4lJcHAHcGjOMLVrVxvaeo6btv-dslxbUEXGrfr5tanXN9HFUQc0_6pMVG-zl08EfCo-9drxQW3QWdzPSr2qE_EVPOY_H01V19B79cbbT0N2mZkziBH2_TUGKmTNgYeIdqsfa68Kmxk5FsWknLdR6X3i2eFl9mmgWowm9J6qy_iIkzFW828GCJzjsBFQJx2vLfyLOUI8nmWlHsTCve9Cro7kasD9nqeDGHruIZAXsSrhQ77oDXd0ChhCorQEHyt8dgtqt5ERd4gVszsa43jCfZLRbcYiuPrClzvqdh3eKEIyCgEvLFbqRy42W1DBzjUFJahlXgJrllfCDA6cLqMWzC85vh7fZiCXLouNEhT5iNyGIEVQ5B47RO1sxJn8_7PqAY2iwIhy5OpZSA3GyVgugWkbe1hAyTpzDkO3jiyokA0VBLDvS4pjSlT4SpqfbvuPYf0XAU2sFWX_ZnOb6OHv-mdhFZ3sNSuMOsCklItp6AxDNfqaFBqDGyTQ_v2GuWW_mAADPRsfN3mKLivn_25gbVCYETpAqTR-ciqG0vbpb4EbN0H585ZZlcF_-GgmCJL4KZdgw8AvRM_WGQQM6APvx_Iou-b5-AHXeLIUPbl9gFOeOdSLEueWNDQ-8ITSF-duou9WDyZLQ_9ltMu5Cgq2ELeAMgXhTLVSAVnb74-ejtFPvAgLBq0x5wE7xZQ70h1rj1GNhNhANNwvYq-LlSakoeA0zYRBRQvy5g_cIqdHEieZXotMBeDo0FiJYCImwLHpLZ-nv74_v1Xj0NQxMGlpfrKcSkxzkH3sE4hr5vLXf5vh97B3ldWc0XCqa6OOROOHh7pUdBFA0-rfrcA-t3s6-SkHsG92QR7bS2-wsOotrO-eeSOyb4wypZOaCRfK1q-K0rGDYHyYAcA07OybIF7Flyw4Dk9pQawiT_-UMyeKCcz3qhdiKxMSa4NHodiTZbqOmnWGrGEE7TiXzLj8zR5TiU7WDwi4nZIzO4IMrb3b_8d-vmJp4krTdfpzdoAQM1Lmu2UaNcReK4OYtEc6z7T248wrt8rBlDevnWjHdQRH0I3ObWh_dsVO4CboEObELipdkA806dYKfuqu0gddWbeTexzxGClE2s2CmLIB48omXDBAeEiBrK7_nKxBTcvoCW1OUNQ2N9bK7OH48wGx4bb8aSNpNGRWeRTkAUzalGRpYktykQ4GSFhOdJ-HjHGbvC_xfmWBIZMPS8Abix9_F04VxyZ6pmbzG2z9DHoVLK1bUXVen0V8VpaS-Wk_pNngRh269M2vrXxhwIPyByEhN-HFgdh44iCoeFTd0pDBLHFEXAOiQaGiYQg131lZxZAFoS-dW0IdJX1hRQQP_uv-7F_HaZ4V9oeNxoUa9SHXVGnZ0PKWq9hfD7WDq652vG25bR-ROAzMZTdYGZIDSQ4hR86qYwsGNnpR5lNJnYPHH3RZiACyrBAeYiIM-36w8V1GW0bqWaFYGguEEqT8EUIblI2y06D09HICdlX5_dln12hD95sa1KyYdh3rj-lX5-NJovDuSUfGySUZc2kSXnsELav_v0ZGZyjqfoSszQdHATMxRiF_3mRTKgcMRss0yFKWKEFNe9D9ecbfykvJi9OeB5MSmS-WRttDh83AOP1DcwIafPx3-5rwKtkLiX51fM8OruMLYZ0zokkvBVaycJKHiamMWseah2LDklbA0WOAuIQSt2o1TvL4KbzUvKCH9LM7pN_j7Y8cuJXxtYqIFfDTkbsdew24TcT9Or98cgOJWzFgJkPQzXX3BSLripQdJ3-WeKrRvMjMUxUWYfkTyPC1JRyaSDcgzmJRM_qj5z3bXMFzTlL9-6XgtOgNl7qtL7n2Ow-3G_YHFCoTHv__haMDFqDLiT2MDulm5IhzDCB1RudeYRdY4E2KWFEWqhpu76iAtG9yVa7O13_FqxSwvMhXrtGHYhpqcTpJzqrKGYgOLdnWvqkEvN_XX3UFe-SkPfoOuPAUHREvUe_LwOcFzLM0NliK3p261ElKQ3zp5kAAqveW70rxWVAmtzh78N0hE53d_pmQogBngXsSJOMX3UO_fq30rwn9Jdn-3yI3txaLrSj3yuDxng9USmhGPZLh_maWq28_tAwa1j9ZCfTXbXma13FkOXHUJBQeeSi4CD2cssFEECw9O_EjvXhmaQNJTO5e2V6wJ-UU2-nwj8HHzeUrCziGAeyN5F28AiF5c13v_kcEXCllbauUYIzIX4jTpZZGEUyYpYT2slbpZsrcYb0OZjhCsMPdmskczd73tmP-pXWNr2qYoFPQfACxHXM89OV3vUlrtzd5jEnKnxILivivEIKoQINe1Kxo3PaffAwgOtwerfP_S_31bGlz1tZCIIOhBoys3GhYKAggBCgQIDBA9CgQIDRAACgQIDhABIgA"
        ].join("&")
    }).then(r => {
        console.log("access token response status: " + r.status);
        let status = r.status;
        r.text().then(r => {
            if(status !== 200) {
                console.log(errorMsg + status + " / " + r + "\n(G)")
                return;
            }

            let token = r.split("Token=")[1].split("\n")[0]
            let auth = r.split("Auth=")[1].split("\n")[0]


            // we've got android auth!
            loginData.email = email;
            loginData.androidId = randomDevice;
            loginData.gToken = token;
            loginData.gAuth = auth;

            // try to pull youtube oauth with those
            getYTAuth()
        })
    })    
}

function createFetchAgentMirror(pickedAddress) {
    if(pickedAddress) {
        return new https.Agent({
            "localAddress": pickedAddress
        })
    }
    if(config.ipv6) {
        const ipChars = "0123456789abcdef".split("")
        let unshortened = config.ipv6.split(":").map(s => {
            return (s&&s.toString()&&s.toString().padStart(4, "0"))
        }).filter(s => {return s})
        unshortened = unshortened.slice(0,8)
        while(unshortened.length !== 8) {
            let part = ""
            while(part.length !== 4) {
                part += ipChars[Math.floor(Math.random() * ipChars.length)]
            }
            unshortened.push(part)
        }

        return new https.Agent({
            "localAddress": unshortened.join(":")
        })
    }
    return null;
}
const base_code_logged_in = `
<style>.yt-menulink-menu a {padding: 5px 8px;display: block;}</style>
<div id="masthead-utility">
    <span class="utility-item" id="masthead-utility-menulink-long">
        <span class="yt-menulink yt-menulink-primary" id="" style="" onmouseenter="this.className += ' yt-menulink-primary-hover';" onmouseleave="this.className = this.className.replace(' yt-menulink-primary-hover', '');">
            <a class="yt-menulink-btn yt-button yt-button-primary">yt2009_username</a>
            <a class="yt-menulink-arr"></a>
            <span class="yt-menulink-menu">
                <span><a href="#">Account</a></span>
                <span><a href="#">My Videos</a></span>
                <span><a href="/my_favorites">Favorites</a></span>
                <span><a href="/my_playlists">Playlists</a></span>
            </span>
        </span>
    </span>
    <span class="utility-item">
        <button class="master-sprite img-general-messages" title="Inbox"></button>
        <a href="/inbox" class="notif-count hid">(0)</a>
    </span>
    <span class="utility-item"><a href="/logout">Sign Out</a></span>
</div>
<script src="/assets/site-assets/notifications.js"></script>
`

const base_code_logged_out = `
<span class="utility-item">
	<a href="#"><strong>Create Account</strong></a>
	<span class="utility-joiner">or</span>
	<a href="/signin">Sign In</a>
</span>`

module.exports = function(req, code, returnNoLang) {
    let flags = req.query && req.query.flags ? req.query.flags + ":" : ""
    try {
        req.headers.cookie.split(";").forEach(cookie => {
            if(cookie.trimStart().startsWith("global_flags")) {
                flags += cookie.trimStart().replace("global_flags=", "")
            }
        })
    }
    catch(error) {
        flags = req;
    }

    let loggedInUsername = false;

    try {
        flags = flags.split(";").join(":")
        flags.split(":").forEach(flag => {
            if(flag.includes("login_simulate")) {
                loggedInUsername = flag.split("login_simulate")[1];
            }
        })
    }
    catch(error) {
        // ej ej ej ale bez takich
        if(req.headers["user-agent"] == "Shockwave Flash") {
            return "";
        }
    }

    if(loggedInUsername) {
        loggedInUsername = require("./yt2009utils").asciify(
            decodeURIComponent(loggedInUsername), true, true
        ).substring(0, 20)
        if(loggedInUsername.length == 0) {
            loggedInUsername = "guest"
        }
        code = code.replace(
            "<!--yt2009_login_insert-->",
            base_code_logged_in.split("yt2009_username").join(
                loggedInUsername
            )
        )
    } else {
        code = code.replace("<!--yt2009_login_insert-->", base_code_logged_out)
    }

    // languages via hl param/lang cookie
    if(returnNoLang) {
        code = code.replace(`Sign Out`, "lang_signout_btn")
        code = code.replace(`Create Account`, "lang_create_btn")
        code = code.replace(`>or<`, ">lang_or<")
        code = code.replace(`Sign In`, "lang_sign_btn")
    }

    return code;
}
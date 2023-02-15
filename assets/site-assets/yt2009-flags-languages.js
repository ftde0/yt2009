var languageData_EN = {
    "tooltips": {
        "watch-always-morefrom": "always shows a 'More from' section, even if the channel videos aren't cached.",
        "watch-author-old-names": "if the creator has a /user/ link, use the name from it instead of their current name.",
        "watch-autoplay": "start video playback automatically (may require enabling autoplay in your browser)",
        "watch-comments-remove-future": "remove comments that contain years 2011-2022",
        "watch-default-avatar": "default 2009 avatar instead of the current creator's avatar",
        "watch-exp-hd": "shows a HQ button in the player if available.",
        "watch-exp-related": "shows more related videos based on the tags of the currently watched video",
        "watch-fake-comment-dates": "fake comment dates",
        "watch-fake-upload-date": "fake upload date (ranging anywhere in 2009)",
        "watch-homepage-contribute": "videos watched by you will be visible on /videos and a 'Videos being watched now' section on the homepage.",
        "watch-realistic-view-count": "more realistic for 2009 view count and rating count",
        "watch-remove-username-space": "removes spaces from usernames",
        "watch-share-behavior": "sets how the Share section should work",
        "watch-use-ryd": "use data from Return YouTube Dislike (https://returnyoutubedislike.com/) for correct star ratings",
        "watch-username-asciify": "remove special characters from usernames",
        "watch-wayback-features": "use Wayback Machine data for yt2009",


        "results-author-old-names": "if the creator has a /user/ link, use the name from it instead of their current name.",
        "results-fake-upload-dates": "fake upload dates (ex. 11 years ago -> 3 months ago)",
        "results-only-old": "only shows videos uploaded before 2010-04-01",
        "results-realistic-view-count": "more realistic for 2009 view counts",
        "results-remove-username-space": "removes spaces from usernames",
        "results-username-asciify": "remove special characters from usernames",


        "channel-author-old-names": "if the creator has a /user/ link, use the name from it instead of their current name.",
        "channel-default-avatar": "default 2009 avatar instead of the current creator's avatar",
        "channel-default-color": "use the default gray color instead of taking one from the banner",
        "channel-exp-fill-comments": "fill the channel comments section with comments from the top video",
        "channel-exp-friends": "fills the Friends and Subscriptions sections if possible",
        "channel-exp-playlists": "adds support for playlists",
        "channel-fake-upload-date": "fake upload dates for videos (ex. 11 years ago -> 3 months ago)",
        "channel-index-contribute": "visited channels will be visible in /channels",
        "channel-realistic-view-count": "more realistic for 2009 view counts",
        "channel-remove-username-space": "removes spaces from usernames",
        "channel-use-ryd": "use data from Return YouTube Dislike (https://returnyoutubedislike.com/) for correct star ratings",
        "channel-username-asciify": "remove special characters from usernames",

        "mainpage-realistic-view-count": "more realistic for 2009 view counts",
        "mainpage-remove-username-space": "removes spaces from usernames",
        "mainpage-username-asciify": "remove special characters from usernames",

        "global-always-annotations": "automatically enables annotations for videos",
        "global-login-simulate": "simulates a logged in user",
        "global-no-controls-fade": "disables video controls fade out",
        "global-annotation-redirect": "redirects all youtube.com links within annotations to yt2009",
        "global-shows-tab": "shows a Shows tab (only for demo, doesn't actually work)"
    },

    "elements": {
        "#i_header": "yt2009 flags<br>\
        each one of those flags change functionality in some way. hover over a flag's checkbox to see the flag description.\
        <br>this function requires cookies to be enabled, so if it doesn't work, check that first.\
        <br><br>if you want to use a flag only once, add a flags parameter to the URL.",

        "#watch-share-expander": "(possible values)",
        "#watch-upload-expander": "(possible values)",
        "#watch-avatar-expander": "(possible values)",
        "#watch-wayback-expander": "(possible values)",
        "#channel-wayback-expander": "(possible values)",

        "#watch-fake-upload-date-expander": "fake_upload_date mode:\
        <br>- adapt - sets a 2009 upload date only if a video was uploaded after April 2010\
        <br>- always - the same way this flag used to work - set a 2009 date regardless of the video.\
        <br>setting anything else/leaving the mode box empty will be treated as always.",

        "#watch-share-behavior-expander": "share_behavior modes:\
        <br>- only_remove - removes services that are non-functional\
        <br>- only_add - only adds new services\
        <br>- both - removes &amp; and adds services",

        "#watch-default-avatar-expander": "default_avatar modes:\
        <br>- adapt - shows a default avatar only if the current avatar is default\
        <br>- always - sets a default avatar regardless of the current uploader's avatar.\
        <br>(leaving this box empty/setting anything else will be treated as always).",

        "#watch-wayback-features-expander": "when using multiple values, separate them with a <code>+</code>, ex. <code>related+metadata</code>.\
        you can also type <code>all</code> to use them all at once.\
        <br>- metadata - main video data - title, description, tags\
        <br>- author - name, avatar of the creator\
        <br>- related - adds related videos, filters dead links\
        <br>- comments - will show comments from the save\
        <br><b>wayback_features will not work for videos uploaded after 2013-01-01.</b>",

        "#i_exp_notice": "flags starting with \"exp_\" are experimental and may not always work. bug reports appreciated.",
        "#i_all_pages": "these flags work with all pages. they may behave in a different way than the other ones.",
        "#i_save": "save",
        "#default-avatar-notice": "check default_avatar in /watch for possible values",

        "#channel-wayback-features-expander": "when using multiple values, separate them with a <code>+</code>, ex. <code>fields+comments</code>.\
        you can also type <code>all</code> to use them all at once.<br>\
        - fields - one-line information visible on the left side, usually filled by the creator, like a website link or a description<br>\
        - basic - basic channel data, such as avatar and colors<br>\
        - sections - subscriptions and friends sections if present<br>\
        - comments - channel comments"
    },

    "placeholders": {
        "watch-share-behavior-input": "mode",
        "watch-fake-upload-date-input": "mode",
        "watch-default-avatar-input": "mode",
        "watch-wayback-features-input": "mode",
        "channel-default-avatar-input": "mode",
        "channel-wayback-features-input": "mode",
        "global-login-simulate-input": "username"
    }
}

function setEnglish() {
    document.querySelector("#lang-pl").removeAttribute("checked")
    // set tooltips
    var tooltips = languageData_EN.tooltips;
    for(var text in tooltips) {
        document.querySelector("#" + text).setAttribute("title", tooltips[text])
    }

    // set element text
    var elements = languageData_EN.elements;
    for(var element in elements) {
        document.querySelector(element).innerHTML = elements[element]
    }

    // set placeholder texts
    var placeholders = languageData_EN.placeholders;
    for(var element in placeholders) {
        document.querySelector("#" + element).setAttribute("placeholder", placeholders[element])
    }
}


document.querySelector("#lang-en").checked = false;
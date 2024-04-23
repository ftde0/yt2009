var languageData_EN = {
    "tooltips": {
        "watch-annotation-gradients": "shows previously seen gradients on annotations in html5.",
        "watch-comments-remove-future": "show old comments on a video",
        "watch-default-avatar": "default 2009 avatar instead of the current creator's avatar",
        "watch-distill-description": "&quot;distills&quot; a description from signs of new descriptions while keeping the original text",
        "watch-distill-tags": "&quot;distills&quot; the video's tags for more accuracy",
        "watch-enable-stats-countback": "dials back counters on the Statistics & Data tab for old videos.",
        "watch-exclude-cs": "hides comments you post from /comment_search",
        "watch-exp-related": "shows more related videos based on the tags of the currently watched video",
        "watch-fake-upload-date": "fake 2009 upload year",
        "watch-hd-1080": "HD button in player will load 1080p instead of 720p",
        "watch-homepage-contribute": "videos watched by you will be visible on /videos and a 'Videos being watched now' section on the homepage.",
        "watch-old-banners": "uses old channel banners without wayback_features if possible",
        "watch-realistic-view-count": "more realistic for 2009 view count and rating count",
        "watch-remove-username-space": "removes spaces from usernames",
        "watch-share-behavior": "sets how the Share section should work",
        "watch-turn-down-lights": "shows a button to turn down the lights. was available for some videos in 2009.",
        "watch-username-asciify": "remove special characters from usernames",
        "watch-wayback-features": "use Wayback Machine data for yt2009",


        "results-author-old-names": "if the creator has a /user/ link, use the name from it instead of their current name.",
        "results-only-old": "only shows videos uploaded in a specified time range (default before 2010-04-01)",
        "results-realistic-view-count": "more realistic for 2009 view counts",
        "results-remove-username-space": "removes spaces from usernames",
        "results-username-asciify": "remove special characters from usernames",


        "channel-author-old-names": "if the creator has a /user/ link, use the name from it instead of their current name.",
        "channel-auto-user": "always try to redirect to a /user/ url if one can be found",
        "channel-default-avatar": "default 2009 avatar instead of the current creator's avatar",
        "channel-default-color": "use the default gray color instead of taking one from the banner",
        "channel-index-contribute": "visited channels will be visible in /channels",
        "channel-only-old": "will only show videos uploaded in the specified date range on channels (default before 2010-04-01)",
        "channel-realistic-view-count": "more realistic for 2009 view counts",
        "channel-remove-username-space": "removes spaces from usernames",
        "channel-username-asciify": "remove special characters from usernames",
        "channel-wayback-features": "use Wayback Machine data for yt2009",

        "mainpage-disable-fallback": "hides fallback mode warning",
        "mainpage-new-recommended": "will show new videos on the recommended section",
        "mainpage-realistic-view-count": "more realistic for 2009 view counts",
        "mainpage-remove-username-space": "removes spaces from usernames",
        "mainpage-username-asciify": "remove special characters from usernames",

        "global-always-annotations": "automatically enables annotations for videos",
        "global-always-captions": "automatically enables captions for videos",
        "global-author-old-avatar": "uses old avatars if present on youtube servers",
        "global-autogen-thumbnails": "use automatically generated thumbnails",
        "global-fake-dates": "fake upload and comment dates",
        "global-login-simulate": "simulates a logged in user",
        "global-new-suggestions": "shows new suggestions in search box",
        "global-no-controls-fade": "disables video controls fade out",
        "global-annotation-redirect": "redirects all youtube.com links within annotations to yt2009",
        "global-shows-tab": "shows a Shows tab (only for demo, doesn't actually work)",
        "global-thumbnail-proxy": "routes thumbnails through yt2009 to fix them on networks that might block youtube."
    },

    "elements": {
        "#i_header": "yt2009 flags<br>\
        each one of those flags change functionality in some way. hover over a flag's checkbox to see the flag description.\
        <br>this function requires cookies to be enabled, so if it doesn't work, check that first.\
        <br><br>if you want to use a flag only once, add a flags parameter to the URL.",

        "#watch-distill-expander": "(possible values)",
        "#watch-share-expander": "(possible values)",
        "#watch-upload-expander": "(possible values)",
        "#watch-avatar-expander": "(possible values)",
        "#watch-wayback-expander": "(possible values)",
        "#results-old-expander": "(possible values)",
        "#channel-wayback-expander": "(possible values)",

        "#watch-fake-upload-date-expander": "fake_upload_date mode:\
        <br>- adapt - sets a 2009 upload date only if a video was uploaded after April 2010\
        <br>- always - set a 2009 date regardless of the video.\
        <br>setting anything else/leaving the mode box empty will be treated as always.",

        "#watch-share-behavior-expander": "share_behavior modes:\
        <br>- only_remove - removes services that are non-functional\
        <br>- only_add - only adds new services\
        <br>- both - removes &amp; and adds services",

        "#watch-default-avatar-expander": "default_avatar modes:\
        <br>- adapt - shows a default avatar only if the current avatar is default\
        <br>- always - sets a default avatar regardless of the current uploader's avatar.\
        <br>(leaving this box empty/setting anything else will be treated as always).",

        "#watch-wayback-features-expander": "when using multiple values, separate them with a <code>+</code>, e.g. <code>related+metadata</code>.\
        you can also type <code>all</code> to use them all at once.\
        <br>- metadata - main video data - title, description, tags\
        <br>- author - name, avatar of the creator\
        <br>- related - adds related videos, filters dead links\
        <br>- comments - will show comments from the save\
        <br><b>wayback_features will not work for videos uploaded after 2013-01-01.</b>",

        "#i_all_pages": "these flags will affect all pages they will have a use on.",
        "#i_save": "save",
        "#default-avatar-notice": "check default_avatar in /watch for possible values",
        "#only-old-notice": "check only_old in /results for possible values",

        "#channel-wayback-features-expander": "when using multiple values, separate them with a <code>+</code>, e.g. <code>fields+comments</code>.\
        you can also type <code>all</code> to use them all at once.<br>\
        - fields - one-line information visible on the left side, usually filled by the creator, like a website link or a description<br>\
        - basic - basic channel data, such as avatar and colors<br>\
        - sections - subscriptions and friends sections if present<br>\
        - comments - channel comments",

        "#results-only-old-expander": "only_old syntax (YYYY-MM-DD):<br>\
        - 1 date - e.g. <b>2010-04-01</b> - will only show videos uploaded before that date<br>\
        - 2 dates (space-separated) - e.g. <b>2007-01-01 2010-04-01</b> - will only show videos uploaded between those dates<br>\
        - leaving this box empty - standard behavior - will only show videos uploaded before 2010-04-01.",

        "#watch-distill-description-expander": "distill_description modes:<br>\
        - poor - removes emojis and hashtags<br>\
        - moderate - everything from poor + known new words<br>\
        - max - removes whole lines of text matching moderate<br>\
        (leaving this box empty/different value = max.)",

        "#hpr_notice": "homepage_recommended is located in the Add/Remove Modules section on the homepage.",
        "#leg_annot_notice": "annotation_gradients is not accurate to its flash counterpart.<br>it was added as the previous html5 annotations' implementation had them."
    },

    "placeholders": {
        "watch-share-behavior-input": "mode",
        "watch-fake-upload-date-input": "mode",
        "watch-default-avatar-input": "mode",
        "watch-distill-description-input": "mode",
        "watch-wayback-features-input": "mode",
        "channel-default-avatar-input": "mode",
        "channel-only-old-input": "check possible values",
        "channel-wayback-features-input": "mode",
        "global-login-simulate-input": "username",
        "results-only-old-input": "check possible values"
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

    updateDescriptions()
}


document.querySelector("#lang-en").checked = false;
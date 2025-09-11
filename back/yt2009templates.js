/*
=======
templates for individual yt2009 parts fillable with function calls.
=======
*/
const utils = require("./yt2009utils")
const config = require("./config.json")
const langs = require("./language_data/language_engine")

module.exports = {
    "videoComment": function(authorUrl, authorName, commentTime, content, flags, useLanguage, likes, id, replyData) {
        if(commentTime.includes("in playlist")) {
            commentTime = commentTime.split("in playlist")[0]
        }
        let likeColor = "gray"
        let likePrefix = ""
        if(likes > 0) {
            likeColor = "green"
            likePrefix = "+"
        } else if(likes < 0) {
            likeColor = "red"
        }
        // check for timestamps/@s in contents
        content = utils.xss(content)
        content.split(" ").forEach(c => {
            if(c.includes(":")) {
                let dIndex = c.indexOf(":")
                let cBefore = c.substring(dIndex - 1, dIndex)
                let cAfter = c.substring(dIndex + 1, dIndex + 2)
                if(!isNaN(parseInt(cBefore))
                && !isNaN(parseInt(cAfter))) {
                    // timestamp!!
                    let timestamp = c.replace(/[^0-9+:]/g, "")
                    let minutes = parseInt(timestamp.split(":")[0]) * 60
                    let seconds = parseInt(timestamp.split(":")[1])
                    let total = minutes + seconds
                    content = content.replace(
                        timestamp,
                        `<a href="#" onclick="skipAhead(${total});return false;">${timestamp}</a>`
                    )
                }
            } else if(c.startsWith("@")) {
                let user = utils.xss(c.replace("@", ""))
                let encUser = encodeURIComponent(user)
                content = content.replace(
                    c,
                    `<a href="/comment_search?username=${encUser}">@${user}</a>`
                )
            }
        })
        content = content.split("$").join("&#36;")
        let replyCode = ""
        let replyHolderCode = ""
        if(replyData && replyData.length == 2) {
            let continuation = replyData[0]
            let count = replyData[1]
            let replyString = "View " + count + " repl" + (count >= 2 ? "ies" : "y")
            if(useLanguage && count == 1) {
                replyString = "lang_watch_replies_single"
            } else if(useLanguage) {
                replyString = "lang_watch_replies_plural_prefix" + count + "lang_watch_replies_plural_suffix"
            }
            replyCode = `<a href="javascript:void(0)" onclick="loadReplies('${continuation}', this, '${id}');return false;" class="watch-replies-show-link">» ${replyString}</a>`
            replyHolderCode = `<div id="yt2009-reply-holder-${id}"></div>`
        }
        let dislikeCode = `onclick="sendCmtRating('${id}', 'dislike');return false;"`
        let likeCode = `onclick="sendCmtRating('${id}', 'like');return false;"`
        return `<div class="watch-comment-entry" ${id ? `id="comment-${id}"` : ""}>
            <div class="watch-comment-head">
                <div class="watch-comment-info">
                    <a class="watch-comment-auth" href="${authorUrl}" rel="nofollow">${authorName}</a>
                    <span class="watch-comment-time"> (${commentTime}) </span>
                </div>
                <div class="watch-comment-voting">
                    <span class="watch-comment-score watch-comment-${likeColor}" data-initial="${likes || 0}">${likePrefix}${likes || 0}</span>
                    <a href="#" ${id && flags.includes("login_simulate") ? dislikeCode : ""}><button class="master-sprite watch-comment-down${flags.includes("login_simulate") ? "-hover" : ""}" title="Poor comment"></button></a>
                    <a href="#" ${id && flags.includes("login_simulate") ? likeCode : ""}><button class="master-sprite watch-comment-up${flags.includes("login_simulate") ? "-hover" : ""}" title="Good comment"></button></a>
                    <span class="watch-comment-msg"></span>
                </div>
                <span class="watch-comment-spam-bug">Marked as spam</span>
                <div class="watch-comment-action">
                    <a onclick="showReplyForm(this)">${useLanguage ? "lang_comment_reply" : "Reply"}</a>
                    ${flags.includes("login_simulate") ? `
                    |
                    <a title="Flag this comment as Spam" onclick="mSpam(this)">Spam</a>` : ""}
                </div>
                <div class="clearL"></div>
            </div>
    
            <div>
                <div class="watch-comment-body">
                    <div>
                        ${content}
                    </div>
                </div>
                <div></div>
            </div>${replyCode}
        </div>${replyHolderCode}`
    },
    "relatedVideo": function(id, title, protocol, length, viewCount, creatorUrl, creatorName, flags, playlistId) {
        if(creatorName.startsWith("by ")) {
            creatorName = creatorName.replace("by ", "")
        }
        let thumbUrl = utils.getThumbUrl(id, flags)
        return `<div class="video-entry" data-id="${id}">
                    <div class="v90WideEntry">
                        <div class="v90WrapperOuter">
                            <div class="v90WrapperInner">
                                <a href="/watch?v=${id}${playlistId ? "&list=" + playlistId : ""}" class="video-thumb-link" rel="nofollow"><img title="${title.split('"').join("&quot;")}" thumb="${thumbUrl}" src="${thumbUrl}" class="vimg90" qlicon="${id}" alt="${title.split('"').join("&quot;")}}" ${flags.includes("/wayback") ? `onload="checkExists(this)"` : ""}></a>
        
                                <div class="addtoQL90"><a href="#" ql="${id}" title="lang_add_to_ql"><button title="" class="master-sprite QLIconImg" onclick="addToQuicklist('${id}', '${encodeURIComponent(title).split("'").join("\\'")}', '${encodeURIComponent(creatorName)}')"></button></a>
                                    <div class="hid quicklist-inlist"><a href="#">lang_ql_added</a></div>
                                </div>
        
                                ${length !== "" ? `<div class="video-time"><a href="/watch?v=${id}${playlistId ? "&list=" + playlistId : ""}" rel="nofollow">${length}</a></div>` : ""}
                            </div>
                        </div>
                    </div>
                    <div class="video-main-content">
                        <div class="video-mini-title">
                        <a href="/watch?v=${id}${playlistId ? "&list=" + playlistId : ""}" rel="nofollow">${title}</a></div>
                        <div class="video-view-count">${viewCount}</div>
                        <div class="video-username"><a href="${creatorUrl}">${creatorUrl.includes("/user/") && flags.includes("author_old_names") ? creatorUrl.split("/user/")[1] : creatorName}</a>
                        </div>
                    </div>
                    <span class="abs-views hid">${viewCount.replace(/[^0-9]/g, "")}</span>
                    <div class="video-clear-list-left"></div>
                </div>`;
    },
    "videoResponse": function(id, time, uploaderName, uploaderUrl, req) {
        let thumbUrl = utils.getThumbUrl(id, req)
        return `
                <div class="video-bar-item">
                    <div class="v90WideEntry">
                        <div class="v90WrapperOuter">
                            <div class="v90WrapperInner"><a href="/watch?v=${id}" class="video-thumb-link" rel="nofollow"><img src="${thumbUrl}" class="vimg90"></a>
                                <div class="video-time" style="margin-top: -28px;"><a href="/watch?v=${id}" rel="nofollow">${time}</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="alignC">
                        <a class="hLink" href="${uploaderUrl}">${uploaderName}</a>
                    </div>
                </div>`
    },
    "videoResponsesBeginning": `
    <div id="watch-video-responses-children" class="yt-uix-expander-body">
	    <div class="video-bar-left-arrow-box">
	    	<a href="#" onclick="responseNavigateLeft();"><img src="/assets/site-assets/pixel-vfl73.gif" class="video-bar-left-arrow"></a>
	    </div>
	    <div id="video-bar-container-box-watch-video-responses-children" class="video-bar-container-box">
	    	<div id="video-bar-long-box-watch-video-responses-children" class="video-bar-long-box" style="margin-left: 0px;">`,
    "videoResponsesEnd": `
            </div>
        </div>
        <div class="video-bar-right-arrow-box">
            <a href="#" onclick="responseNavigateRight();"><img src="/assets/site-assets/pixel-vfl73.gif" class="video-bar-right-arrow"></a>
        </div>
        <div class="clear"></div>
    </div>
    `,
    "XLFormatVideo": function(video, protocol, smallThumbs) {
        let authorName = video.author_handle
                         || video.uploaderHandle
                         || video.creatorHandle
                         || video.creatorName
                         || video.uploaderName
                         || video.author_name
                         || ""
        let authorUrl = video.uploaderUrl
                        || video.creatorUrl
                        || video.author_url
                        || ""
        if(authorUrl.includes("/user/")) {
            authorName = authorUrl.split("/user/")[1]
        } else {
            authorName = authorName.replace(/[^a-zA-Z0-9+-+_]/g, "")
        }
        let time = video.length || video.time
        if(!time) {
            time = Math.floor(Math.random() * 100) + 60
        }
        if(utils.time_to_seconds(time) == time) {
            time = utils.seconds_to_time(time)
        }
        let views = video.views || video.viewCount || ""
        return {
            "video_id": video.id,
            "displayable_view_count": views ? views.replace(/[^0-9]/g, "") : "",                
            "view_count": views ? views.replace(/[^0-9]/g, "") : "",
            "author": authorName,
            "duration": (time || ""),
            "length_seconds": (time ?
                                utils.time_to_seconds(time)
                                : ""),
            "restricted": 0,
            "image_url": protocol + "://i.ytimg.com/vi/" + video.id + (
                smallThumbs ? "/default.jpg" : "/hqdefault.jpg"
            ),
            "user_id": "/",
            "description": video.description || "",
            "title": video.title,
            "rating": 5,
            "author_url": authorUrl
        }
        //"format": "34\/640x360\/9\/0\/115,18\/640x360\/9\/0\/115,5\/320x240\/7\/0\/0,36\/320x240\/99\/0\/0,17\/176x144\/99\/0\/0"
    },
    "cpsSearchBegin": function(resultCount, ogUrl) {
        let nextUrl = `http://${config.ip}:${config.port}${ogUrl}`;
        let addNext = false;
        let vidNumber = 20;
        if(ogUrl.includes("max-results=")
        && !isNaN(parseInt(
            ogUrl.split("max-results=")[1].split("&")[0].split("#")[0]
        ))) {
            vidNumber = parseInt(
                ogUrl.split("max-results=")[1].split("&")[0].split("#")[0]
            )
        }
        if(ogUrl.includes("start-index=")) {
            let index = ogUrl.split("start-index=")[1].split("&")[0].split("#")[0]
            if(!isNaN(parseInt(index))) {
                nextUrl = nextUrl.replace(
                    "start-index=" + index,
                    "start-index=" + (parseInt(index) + vidNumber)
                )
                addNext = true
            }
        } else {
            nextUrl += "&start-index=" + vidNumber
            addNext = true
        }
        nextUrl = nextUrl.split("&").join("&amp;")
        let next = `\n    <link rel='next' type='application/atom+xml' href='${nextUrl}'/>`
        return `<?xml version='1.0' encoding='UTF-8'?>
<feed>
    <id>http://gdata.youtube.com/feeds/api/videos</id>
    <category scheme='http://schemas.google.com/g/2005#kind' term='http://gdata.youtube.com/schemas/2007#video'/>
    <title type='text'>YouTube Videos</title>
    <logo>http://www.youtube.com/img/pic_youtubelogo_123x63.gif</logo>
    <link rel='alternate' type='text/html' href='http://www.youtube.com'/>
    <link rel='http://schemas.google.com/g/2005#feed' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/videos'/>
    <link rel='http://schemas.google.com/g/2005#batch' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/videos/batch'/>
    <author>
      <name>YouTube/yt2009</name>
      <uri>http://www.youtube.com/</uri>
    </author>
    <generator version='2.0' uri='http://gdata.youtube.com/'>YouTube data API</generator>
    <openSearch:totalResults>${resultCount}</openSearch:totalResults>
    <openSearch:startIndex>1</openSearch:startIndex>
    <openSearch:itemsPerPage>20</openSearch:itemsPerPage>${addNext ? next : ""}`
    },
    "cpsSearchEntry": function(id, title, description, lengthSeconds, authorName) {
        let domainName = config.ip + ":" + config.port
        if(!id || lengthSeconds > 600) return;
        return `
    <entry>
        <id>http://${domainName}/feeds/api/videos/${id}</id>
        <title type='text'>${title}</title>
        <content type='text'>${description}</content>
        <author>
          <name>${authorName}</name>
        </author>
        <media:group>
          <media:content url='http://${domainName}/get_video?video_id=${id}' type='application/x-shockwave-flash' id='${id}' medium='video' isDefault='true' expression='full' duration='${lengthSeconds}' yt:format='5'/>
          <media:description type='plain'>${description}</media:description>
          <media:player url='http://${domainName}/watch?v=${id}'/>
          <yt:videoid id='${id}'>${id}</yt:videoid>
          <media:thumbnail url='http://i.ytimg.com/vi/${id}/hqdefault.jpg' height='360' width='640' time='00:00:00.00'/>
          <media:title type='plain'>${title}</media:title>
          <yt:duration seconds='${lengthSeconds}'/>
        </media:group>
    </entry>
        `
    },
    "cpsSearchEnd": `
</feed>`,
    "searchVideo": function(id, title, description, authorUrl, authorName, uploadDate, viewCount, time, protocol, browser, flags) {
        let thumbUrl = utils.getThumbUrl(id, flags)
        title = title.split("$").join("&#36;")
        description = description.split("$").join("&#36;")
        authorName = authorName.split("$").join("&#36;")
        return `
        <div class="video-cell" data-id="${id}">
            <div class="video-entry">
                <div class="v120WideEntry">
                    <div class="v120WrapperOuter">
                        <div class="v120WrapperInner">
                            <a id="video-title-results" href="/watch?v=${id}" rel="nofollow">
                                <img title="${utils.xss(title.split('"').join("&quot;"))}" src="${thumbUrl}" class="vimg120">
                            </a>
                            <div id="quicklist-icon-${id}" class="addtoQL90"><a id="add-to-quicklist-${id}" href="#" ql="${id}" title="lang_add_to_ql"><button class="master-sprite QLIconImg ${browser == "firefox" ? "firefox" : ""} title="" onclick="addToQuicklist('${id}', '${encodeURIComponent(title).split("'").join("\\'")}', '${encodeURIComponent(authorName)}')"></button></a>
                                <div class="hid quicklist-inlist"><a href="#">lang_ql_added</a></div>
                            </div>
                            <div class="video-time ${browser == "chrome" ? "chrome" : ""}"><span id="video-run-time">${time}</span></div>
                        </div>
                    </div>
                </div>
    
                <div class="video-main-content" id="video-main-content">
                    <div class="video-title video-title-results">
                        <div class="video-short-title">
                            <a id="video-short-title" href="/watch?v=${id}" title="${utils.xss(title.split('"').join("&quot;"))}" rel="nofollow">${title}</a>
                        </div>
                        <div class="video-long-title">
                            <a id="video-long-title" href="/watch?v=${id}" title="${utils.xss(title.split('"').join("&quot;"))}" rel="nofollow">${title}</a>
                        </div>
                    </div>
    
                    <div id="video-description" class="video-description">
                        ${description}
                    </div>
    
                    <div class="result-label">
                        <span class="result-type">Video:</span>
                        <span class="video-username"><a id="video-from-username" class="hLink" href="${authorUrl}">${utils.xss(authorName)}</a></span>
                    </div>
    
                    <div class="video-facets">
                        <span id="video-average-rating" class="video-rating-list">
                            <div>
                                <button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button>
                            </div>
                        </span>
    
                        <span id="video-added-time" class="video-date-added">${uploadDate}</span>
                        <span id="video-num-views" class="video-view-count">${viewCount}</span>
                        <span class="video-username"><a id="video-from-username" class="hLink" href="${authorUrl}">${utils.xss(authorName)}</a></span>
                        <span id="video-average-rating" class="video-rating-grid ">
                            <div>
                                <button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button>
                            </div>
                        </span>
                    </div>
                </div>
                <div class="video-clear-list-left"></div>
            </div>
        </div>`
    },
    "warpVideo": function(id, title, length, creatorName, video_index, description, views, rating, uploaded) {
        if(typeof(views) == "string") {
            views = utils.bareCount(views || "1 views")
        }
        return `
    <video>
        <author>${creatorName}</author>
        <id>${id}</id>
        <title>${title}</title>
        <length_seconds>${utils.time_to_seconds(length)}</length_seconds>
        <run_time>${length}</run_time>
        <rating_avg>${rating}</rating_avg>
        <rating_count>${Math.floor(views / 150)}</rating_count>
        <description>${description || "."}</description>
        <view_count>${views}</view_count>
        <upload_time>${utils.relativeToAbsoluteApprox(uploaded || "1 day ago")}</upload_time>
        <comment_count>${Math.floor(views / 170)}</comment_count>
        <tags> </tags>
        <url>http://www.youtube.com/watch?v=${id}</url>
        <thumbnail_url>http://i.ytimg.com/vi/${id}/default.jpg</thumbnail_url>
        <thumbnail_url2>http://i.ytimg.com/vi/${id}/hqdefault.jpg</thumbnail_url2>
        <embed_status>ok</embed_status>
        <allow_ratings>yes</allow_ratings>
        <w>${video_index}</w>
    </video>`
    },
    "channelSectionHTMLBegin": function(sectionName) {
        return `
    <div class="inner-box yt2009-${sectionName}-mark" id="user_${sectionName.toLowerCase()}">
        <div style="zoom:1">
            <div class="box-title title-text-color">lang_channel_${sectionName} (yt2009_${sectionName}_count)</div>
            <div style="float:right;zoom:1;_display:inline;white-space:nowrap">
                <div style="float:right">
                </div>
            </div>
            <div class="cb"></div>
        </div>
        <div id="user_${sectionName.toLowerCase()}-messages" style="color:#333;margin:1em;padding:1em;display:none"></div>

        <div id="user_${sectionName.toLowerCase()}-body">
            <div style="zoom:1;margin: 0 -12px">`
    },
    "channelUserPeep": function(name, link, avatarUrl, useSixColumn) {
        let randomPeepId = ""
        while(randomPeepId.length !== 5) {
            randomPeepId += "qwertyuiopasdfghjklzxcvbnm1234567890".split("")
                            [Math.floor(Math.random() * 36)]
        }
        return `
    <div class="user-peep" id="peep-${randomPeepId}" style="width:${useSixColumn ? "16.5" : "33"}%;text-align: center;overflow: hidden;height: 90px;">
        <div class="user-thumb-large link-as-border-color" style="margin: auto;">
            <div>
                <a href="${link}"><img id="" src="${avatarUrl}" onerror="removeUserPeep('${randomPeepId}')"></a>
            </div>
        </div>

        <a href="${link}">${name}</a>
    </div>`
    },
    "channelSectionHTMLEnd": function() {
        return `
                <div style="clear:both;font-height:1px"></div>
            </div>
        </div>
        <div class="clear"></div>
    </div>`
    },
    "channelComment": function(authorUrl, authorAvatar, authorName, time, content) {
        return `
    <tr class="commentsTableFull ">
        <td style="padding-bottom: 15px;" width="60" valign="top">
            <div class="user-thumb-medium">
                <div>
                    <a href="${authorUrl}"><img id="" src="${authorAvatar}" onerror="setDefault(this)"></a>
                </div>
            </div>
        </td>
        <td style="padding-bottom: 15px;" valign="top">
            <div style="float:left; margin-bottom: 5px;">
                <a name="profile-comment-username" href="${authorUrl}" style="font-size: 12px;"><b>${authorName}</b></a>
                <span class="profile-comment-time-created">(${time})</span>
            </div>
            <div class="profile-comment-body" style="clear:both;">${content}</div>
        </td>
    </tr>`
    },
    "quicklistHTMLTemplate": `
	<div id="quicklist-panel" class="yt-uix-expander " style="margin-bottom: 10px">
		<div class="yt-uix-expander-body floatR"></div>
		<h2 class="yt-uix-expander-head" onclick="toggleQuicklistExpander(this)">
			<button title="" class="yt-uix-expander-arrow master-sprite"></button>
			<span>lang_quicklist</span><span class="watch-quicklist-count">(<span id="playlistVideoCount_QL">?</span>)</span>
		</h2>
		<div id="playlistContainer_QL" class="yt-uix-expander-body watch-playlist-container watch-playlist-auto-height">
			<div id="playlistRows_QL" class="yt2009-ql-videos">

			</div>
		</div>
		<div id="watch-playlist-actions" class="yt-uix-expander-body">
			<span class="smallText">
				<a href="#" onclick="clearQuicklist()" title="lang_ql_clear_desc" rel="nofollow">lang_ql_clear_title</a> <span class="smallText grayText">|</span>
				<a href="#" title="lang_ql_save_desc" onmousedown="createPlaylistFromQuicklist()" rel="nofollow">lang_ql_save_title</a>
			</span>
		</div>
	</div>
    `,
    "videoCell": function(id, title, protocol, uploaderName, uploaderUrl, views, flags, noLang) {
        let thumbUrl = utils.getThumbUrl(id, flags)
        let viewCount = noLang ? `lang_views_prefix${utils.countBreakup(utils.bareCount(views))}lang_views_suffix`
                      : views
        if(typeof(flags) !== "string") {
            try {
                flags = flags.headers.cookie
            }
            catch(error) {}
        }
        return `
        <div class="video-cell *vl" style="width:19.5%" data-id="${id}">
            <div class="video-entry yt-uix-hovercard">
                <div class="v120WideEntry">
                    <div class="v120WrapperOuter">
                        <div class="v120WrapperInner">
                            <a class="video-thumb-link" href="/watch?v=${id}" rel="nofollow"><img title="${title.split("\"").join("&quot;")}" src="${thumbUrl}" onmouseover="videosPreview(this, '${id}')" onmouseout="removeVideoPreview()"></a>

                            <div class="addtoQL90"><a href="#" ql="${id}" title="${noLang ? "lang_add_to_ql": "Add Video to Quickist"}"><button title="" class="master-sprite QLIconImg" onclick="addToQuicklist('${id}', '${encodeURIComponent(title).split("'").join("\\'")}', '${encodeURIComponent(uploaderName.split(" ").join(""))}')"></button></a>
                                <div class="hid quicklist-inlist"><a href="#">${noLang ? "lang_ql_added" : "Added to Quicklist"}</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="video-main-content">
                    <div class="video-title ">
                        <div class="video-short-title">
                            <a href="/watch?v=${id}" class="yt-uix-hovercard-target" title="${title.split("\"").join("&quot;")}" rel="nofollow">${title}</a>
                        </div>
                    </div>
                    <div class="video-facets">
                        <span class="video-view-count">${viewCount}</span>
                        <span class="video-username"><a class="hLink" href="${uploaderUrl}">${flags.includes("remove_username_space") ? uploaderName.split(" ").join("") : uploaderName}</a></span>
                    </div>
                </div>
                <div class="video-clear-list-left"></div>
            </div>
        </div>`
    },
    "videoCommentPost": function(id) {
        return `
                        <div id="watch-comment-post">
                            <div class="floatR hid">
                                <a class="hLink bold" href="#" rel="nofollow">Post a Video Response</a>
                            </div>
                            <h2>Comment on this video</h2>
                        </div>
                        <div>
                            <div style="float:left;width:650px;">
                                <div id="div_main_comment" style="float:left;" class="">
                                    <form name="comment_formmain_comment" id="comment_formmain_comment" onsubmit="return false;" method="post" action="/comment_post">
                                        <input type="hidden" name="video_id" value="${id}" id="comment_textarea_video_id">
                                        <input type="hidden" name="form_id" value="comment_formmain_comment">
                                        <input type="hidden" name="reply_parent_id" value="">
                                        <textarea id="comment_textarea_main_comment" name="comment" class="comments-textarea" cols="46" rows="5" maxchars="500" oninput="updateCharacterCount();" onkeypress="updateCharacterCount();"></textarea>
                                        <br>
                                        <div class="watch-comment-reply-form-actions">
                                            <input type="button" name="add_comment_button" value="Post Comment" onclick="commentSend()" id="comment_add_btn">
                                            <span id="maxCharLabelmain_comment">Remaining character count: 500</span>
                                        </div>
                                    </form>
                                    <br class="clear">
                                </div>
                            </div>
                            <div style="clear:both;"></div>
                        </div>`
    },
    "createFffmpegOgg": function(id) {
        return `ffmpeg -i "${__dirname}/../assets/${id}.mp4" -b 1500k -ab 128000 -speed 2 "${__dirname}/../assets/${id}.ogg"`
    },
    "morefromEntry": function(name) {
        return `
            <div id="watch-channel-videos-panel" class="watch-discoverbox-wrapper yt-uix-expander " data-expander-action="watchTogglePanel" data-discoverbox-type="channel">
                <h2 class="yt-uix-expander-head yt-uix-expander-collapsed" onclick="toggleExpander(this)">
                    <button title="" class="yt-uix-expander-arrow master-sprite"></button>
                    <span>
                        lang_morefrom${name}
                    </span>
                </h2>
                <div id="watch-channel-vids-body" class="watch-discoverbox-body mini-list-view yt-uix-expander-body hid">
                    <div id="watch-channel-discoverbox" class="watch-discoverbox" style="height:432px">`
    },
    "html4": `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">`,
    "watchpagePlaylistPanelEntry": `
    <div id="watch-playlist-videos-panel" class="watch-discoverbox-wrapper yt-uix-expander" data-expander-action="watchTogglePanel" data-discoverbox-type="playlist" data-discoverbox-username="">
        <h2 class="yt-uix-expander-head">
            <span>Playlist</span>
        </h2>
        <div id="watch-playlist-vids-body" class="watch-discoverbox-body mini-list-view yt-uix-expander-body">
            <div id="watch-playlist-discoverbox" class="watch-discoverbox" style="height:432px">`,
    "html5Endscreen": `
                        <span class="endscreen-arrow-left" onclick="endscreen_section_change(-1)"></span>
                        <span class="endscreen-arrow-right" onclick="endscreen_section_change(1)"></span>
                        <div class="buttons yt-center">
                            <div class="button-share" onclick="shareVideoFromFlash();">
                                <img src="/player-imgs/share.png"/>
                                <h2>Share</h2>
                            </div>
                            <div class="button-replay" onclick="videoReplay();">
                                <img src="/player-imgs/replay.png"/>
                                <h2>Replay</h2>
                            </div>
                        </div>
    `,
    "endscreenVideo": function(id, protocol, length, title, endscreen_version, creatorUrl, creatorName, views, rating, flags) {
        let thumbUrl = utils.getThumbUrl(id, flags)
        return `
        <div class="endscreen-video" onclick="videoNav('${id}')">
            <div class="endscreen-video-thumbnail">
                <img src="${thumbUrl}" width="93" height="70"/>
                ${endscreen_version !== 1 ? `<div class="video-time" style="float: right;"><a href="">${utils.seconds_to_time(length)}</a></div>` : ""}
            </div>
            <div class="endscreen-video-info">
                <div class="endscreen-title-container" style="width: 0px;">
                    <h3 class="endscreen-video-title">${title.length > 80 ? title.substring(0, 80) + "..." : title}</h3>
                </div>
                <h3 class="gr video-from" style="width: 40px;">From: <span class="text-light">${(creatorUrl || "").includes("/user/") && flags.includes("author_old_names") ? (creatorUrl || "").split("/user/")[1] : creatorName}</span></h3>
                <h3 class="gr video-views" style="width: 45px;">Views: <span class="text-light">${views.replace(/[^0-9]/g, "")}</span></h3>
                ${endscreen_version !== 1 ? `<span class="endscreen-video-star rating-${rating}" style="background-position: -75px 0px;"></span>` : ""}
            </div>
        </div>`
    },
    "flashObject": function(url) {
        return `<object width="640" height="385" class="fl flash-video" id="watch-player-div"><param name="movie" value="${url}"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="${url}" type="application/x-shockwave-flash" id="movie_player" allowscriptaccess="always" allowfullscreen="true" width="640" height="385" class="fl"></embed></object>`
    },
    "html5Embed": function(id, elementId, disableAutoplay) {
        return `<iframe id="${elementId}" allowfullscreen src="/embed/${id}${disableAutoplay ? "?autoplay=0" : ""}"></iframe>`
    },
    "playlist": function(name, id) {
        return `<div class="subfolder" data-id=${id}" onclick="show_playlist(this)"><a class="name" href="#">${name}</a></div>`
    },
    "searchChannel": function(url, avatar, name, subscribers) {
        return `
        <div class="channel-cell" style="height: 90px;">
            <div class="channel-entry yt-uix-hovercard">
                <div class="user-thumb-large" style="float: left;">
                    <div><a href="${url}"><img class="yt-uix-hovercard-target" src="${avatar}"></a></div>
                </div>
                <div class="channel-main-content" style="float: left;margin-left: 8px;margin-top: 3px;">
                    <div class="channel-title">
                        <div class="channel-long-title"><a href="${url}" title="${name}" rel="nofollow">${name}</a></div>
                    </div>
                    <div class="channel-facets"><span>${subscribers.replace(/ subscriber.*/g, "lang_results_channel_sub_suffix")}</span></div>
                </div>
            </div>
        </div>`
    },
    "searchPlaylistEntry": function(id, protocol, videos, name, videoCount, a, flags) {
        let navUrl = `/playlist?list=${id}`
        if(id.startsWith("RD") && videos[0] && videos[0].id) {
            navUrl = `/watch?v=${videos[0].id}&list=${id}`
        }
        return `
        <div class="playlist-cell" style="width:24.5%">
            <div class="playlist-entry yt-uix-hovercard">
                <div class="playlist-main-thumb">
                    <div class="vCluster120WideEntry">
                        <div class="vCluster120WrapperOuter playlist-thumbnail">
                            <div class="vCluster120WrapperInner">
                                <a href="${navUrl}" rel="nofollow">${videos[0] ? `<img src="${utils.getThumbUrl(videos[0].id, flags)}" class="vimgCluster120 yt-uix-hovercard-target">` : (a ? `<img src="${a}" class="vimgCluster120 yt-uix-hovercard-target"/>` : "")}</a>
                                ${videos[0] ? `<div class="video-corner-text"><span>${videos[0].length}</span></div>` : ""}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="playlist-main-content" id="playlist-main-content-${id}">
                    <div class="playlist-title playlist-title-results">
                        <div class="playlist-long-title">
                            <a href="${navUrl}" class="yt-uix-hovercard-target" rel="nofollow">${name}</a>
                            <span class="playlist-video-count">${videoCount}lang_results_playlist_video_suffix</span>
                        </div>
                    </div>
                    <div class="playlist-videos">
                        <ul>
                        `
    },
    "searchPlaylistVideo": function(video, playlist) {
        return `
                            <li>
                                <div class="playlist-video">
                                    <span><a class="hLink" title="" href="/watch?v=${video.id}&list=${playlist.id}">${video.title}</a></span>
                                    <span class="playlist-video-duration">(${video.length})</span>
                                </div>
                            </li>`
    },
    "searchPlaylistEnd": function(playlist) {
        return `
                        </ul>
                    </div>
                    <div class="playlist-facets">
                        <span class="result-type">Playlist</span>
                        <span class="playlist-video-count">(${playlist.videoCount}lang_results_playlist_video_suffix)</span>
                    </div>	
                </div>
                <div class="playlist-clear-list-left"></div>
                </div>	
            </div>
                `
    },
    "playnavVideo": function(video, video_index, views, upload_date, ratings, protocol, live) {
        return `
        <div class="playnav-item playnav-video ${video_index == 0 ? "selected playnav-item-selected" : ""} ${live ? "playnav-live-video" : ""}" id="playnav-video-${video.id}" onclick="switchVideo(this);return false;">
            <div id="playnav-video-play-${video.id}-selector" class="selector"></div>
            <div class="content">
                <div class="playnav-video-thumb link-as-border-color">
                    <a class="video-thumb-90 no-quicklist" href="#"><img title="${video.title.split('"').join("&quot;")}" src="${video.thumbnail.replace("http", protocol)}" class="vimg90 yt-uix-hovercard-target" alt="${video.title.split('"').join("&quot;")}"></a>
        
                </div>
                <div class="playnav-video-info">
                    <a href="#" class="playnav-item-title ellipsis"><span class="video-title-${video.id}">${video.title}</span></a>
                    <div class="metadata video-meta-${video.id}">${views}${!live ? " - " : ""}${upload_date}</div>
                    <div class="video-ratings-${video.id} hid">${utils.countBreakup(ratings)}</div>
                </div>
            </div>
        </div>`
    },
    "html4": `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">`,
    "channelProperty": function(p_uppercase, value) {
        return `
        <div class="show_info outer-box-bg-as-border">
            <div style="float:left;font-weight:bold;">${p_uppercase}</div>
            <div style="float:right;" id="profile_show_${p_uppercase.toLowerCase()}">${value}</div>
            <div class="cb"></div>
        </div>`
    },
    "allScrollboxPlaylistHead": `
    <div class="playnav-playlist-header">
        <a style="text-decoration:none" class="title title-text-color">
            <span id="playnav-playlist-all-all-title" class="title">lang_playnav_playlists_top</span>
        </a>
    </div>
    `,
    "allScrollboxPlaylistEnd": `
    <div class="playnav-play-column-all">
        <div class="playnav-more"><a class="channel-cmd" href="#" onclick="switchTab('playlists', $('#playnav-navbar-tab-playlists'))">lang_playnav_more</a></div>
    </div>
    <div class="spacer">&nbsp;</div>
    <div class="scrollbox-separator">
        <div class="outer-box-bg-as-border"></div>
    </div>`,
    "playlistScrollboxHead": `
    <div class="outer-scrollbox yt2009-scrollbox scrollbox-playlists hid">
        <div id="playnav-play-all-items" class="inner-scrollbox">
            <div class="playnav-playlist-header">
                <a style="text-decoration:none" class="title title-text-color">
                    <span id="playnav-playlist-playlists-all-title" class="title">lang_playnav_playlists_top</span>
                </a>
            </div>`,
    "playlistScrollboxEnd": `
        <div class="spacer">&nbsp;</div>
        <div class="scrollbox-separator">
            <div class="outer-box-bg-as-border"></div>
        </div>
    </div>
    </div>`,
    "liveScrollboxHead": `
    <div class="outer-scrollbox yt2009-scrollbox scrollbox-live hid">
        <div id="playnav-play-live-items" class="inner-scrollbox">
            <div class="playnav-live-header">
                <a style="text-decoration:none" class="title title-text-color">
                    <span id="playnav-live-title" class="title">lang_playnav_livevids</span>
                </a>
            </div>`,
    "liveScrollboxEnd": `
        <div class="spacer">&nbsp;</div>
        <div class="scrollbox-separator">
            <div class="outer-box-bg-as-border"></div>
        </div>
    </div>
    </div>`,
    "playnavPlaylist": function(playlist, protocol, useLanguage) {
        return `
        <div class="playnav-item playnav-playlist" onclick="openPlaylist(this);return false;" data-id="${playlist.id}">
            <div class="content">
                <div class="playnav-video-thumb link-as-border-color playlist-thumbnail">
                    <a class="video-thumb-90 no-quicklist" href="#"><img src="${playlist.thumbnail.replace("http", protocol)}" class="vimg90 yt-uix-hovercard-target"></a>
        
                </div>
                <div class="playnav-video-info">
                    <a href="#" class="playnav-item-title ellipsis"><span>${playlist.name}</span></a>
                    <div class="metadata">${useLanguage ? "lang_playnav_playlist_videos_prefix" : ""}${playlist.videos}${useLanguage ? "lang_playnav_playlist_videos_suffix" : " videos"}</div>
                </div>
            </div>
        </div>`
    },
    "mobile_video": function(video, upload) {
        return `
            <table width="100%">
                <tr valign="top">
                    <td style="font-size:0px" width="80">
                        <a href="watch?v=${video.id}"><img src="http://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="video" width="80" height="60" style="border:0;margin:0px;" /></a>
                    </td>
                    <td style="width:100%;font-size:13px;padding-left:2px">
                        <div style="font-size:90%;padding-bottom:1px">
                            <a accesskey="1" href="watch?v=${video.id}">${video.title}</a>
                        </div>
                        <div style="color:#333;font-size:80%">${video.time || video.length || ""}&nbsp;&nbsp;<img src="/assets/site-assets/stars_5.0_49x9-vfl84759.gif" alt="5.0 stars" width="49" height="9" style="border:0;margin:0px;" /></div>
                        ${video.upload ? `<div style="color:#333;font-size:80%">${upload || video.upload}</div>` : ""}
                        <div style="color:#333;font-size:80%">${video.views}</div>
                    </td>
                </tr>
            </table>
            <hr size="1" noshade="noshade" color="#999" style="width:100%;height:1px;margin:2px 0;padding:0;color:#999;background:#999;border:none;" />`
    },
    "mobile_search_video": function(video) {
        return `
            <table width="100%">
                <tbody>
                    <tr valign="top">
                        <td style="font-size:0px" width="80">
                            <a href="watch?v=${video.id}"><img src="${video.thumbnail}" alt="video" style="border:0;margin:0px;" width="80" height="60"></a>
                        </td>
                        <td style="width:100%;font-size:13px;padding-left:2px">
                            <div style="font-size:90%;padding-bottom:1px">
                                <a accesskey="1" href="watch?v=${video.id}">${video.title}</a>
                            </div>
                            <div style="color:#333;font-size:80%">${video.time}<img src="/assets/site-assets/stars_5.0_49x9-vfl84759.gif" alt="5.0 stars" style="border:0;margin:0px;" width="49" height="9"></div>
                            <div style="color:#333;font-size:80%">${video.upload}</div>
                            <div style="color:#333;font-size:80%">${video.views}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style="width:100%;height:1px;margin:2px 0;padding:0;color:#999;background:#999;border:none;" size="1" noshade="noshade" color="#999">`
    },
    "playlistVideo": function(video, playlistId, protocol) {
        return `
            <div class="video-cell" style="width:19.5%">
                <div class="video-entry yt-uix-hovercard">
                    <div class="v120WideEntry">
                        <div class="v120WrapperOuter">
                            <div class="v120WrapperInner"><a class="video-thumb-link" href="/watch?v=${video.id}&list=${playlistId}" rel="nofollow">
                                <img src="${video.thumbnail.replace("http", protocol)}" class="vimg120 yt-uix-hovercard-target"></a>
                                ${video.time ? `<div class="video-time" style="position: relative;top: -6px;"><a href="/watch?v=${video.id}&list=${playlistId}" rel="nofollow">${video.time}</a></div>` : ""}
                            </div>
                        </div>
                    </div>

                    <div class="video-main-content">
                        <div class="video-title ">
                            <div class="video-long-title">
                                <a href="/watch?v=${video.id}&list=${playlistId}" class="yt-uix-hovercard-target" rel="nofollow">${video.title}</a>
                            </div>
                        </div>

                        <div class="video-description">
                            ${require("./yt2009html").get_video_description(video.id)}
                        </div>

                        <div class="video-facets">
                            <span class="video-rating-list ">
                                <div>
                                    <button class="master-sprite ratingVS ratingVS-4.5" title="4.5"></button>
                                </div>
                            </span>
                            <span class="video-rating-grid ">
                                <div>
                                    <button class="master-sprite ratingVS ratingVS-4.5" title="4.5"></button>
                                </div>
                            </span>
                            <span class="video-username"><a class="hLink" href="${video.uploaderUrl}">${video.uploaderName}</a></span>
                        </div>

                    </div>

                    <div class="video-clear-list-left"></div>
                </div>
            </div>`
    },
    "cpbPlaylistsBegin": function(title, id, authorName) {
        function sd(i) {
            return i.split("<").join("").split(">").join("").split("&").join("")
        }
        return `<?xml version='1.0' encoding='UTF-8'?>
<feed xmlns='http://www.w3.org/2005/Atom' xmlns:app='http://purl.org/atom/app#' xmlns:media='http://search.yahoo.com/mrss/' xmlns:openSearch='http://a9.com/-/spec/opensearchrss/1.0/' xmlns:gd='http://schemas.google.com/g/2005' xmlns:yt='http://gdata.youtube.com/schemas/2007'>
    <id>http://${config.ip}:${config.port}/feeds/api/playlists/${id}</id>
    <updated>2009-06-22T19:41:28.000Z</updated>
    <category scheme='http://schemas.google.com/g/2005#kind' term='http://gdata.youtube.com/schemas/2007#playlist'/>
    <title type='text'>${sd(title)}</title>
    <subtitle type='text' />
    <logo>http://www.youtube.com/img/pic_youtubelogo_123x63.gif</logo>
    <link rel='alternate' type='text/html' href='http://www.youtube.com/view_play_list?p=${id}'/>
    <link rel='http://schemas.google.com/g/2005#feed' type='application/atom+xml' href='http://${config.ip}:${config.port}/feeds/api/playlists/${id}?r=2'/>
    <link rel='http://schemas.google.com/g/2005#batch' type='application/atom+xml' href='http://${config.ip}:${config.port}/feeds/api/playlists/${id}/batch'/>
    <link rel='self' type='application/atom+xml' href='http://${config.ip}:${config.port}/feeds/api/playlists/${id}?r=2'/>
    <author>
        <name>${sd(authorName)}</name>
        <uri>http://${config.ip}:${config.port}/feeds/api/users/${authorName}</uri>
    </author>
    <generator version='2.0' uri='http://gdata.youtube.com/'>YouTube data API</generator>`
    },
    "cpbPlaylistsCounts": function(results, id, title, description) {
        function sd(i) {
            return i.split("<").join("").split(">").join("").split("&").join("")
        }
        return `
    <openSearch:totalResults>${results}</openSearch:totalResults>
    <openSearch:startIndex>1</openSearch:startIndex>
    <openSearch:itemsPerPage>${results}</openSearch:itemsPerPage>
    <media:group>
        <media:content url='http://www.youtube.com/ep.swf?id=${id}' type='application/x-shockwave-flash' yt:format='5'/>
        <media:description type='plain'>${sd(description)}</media:description>
        <media:title type='plain'>${sd(title)}</media:title>
    </media:group>
    <yt:playlistId>${id}</yt:playlistId>`
    },
    "cpbVideo": function(video, index) {
        let videoUrl = `http://${config.ip}:${config.port}/get_video?video_id=${video.id}/mp4`
        if(config.trusted_context) {
            videoUrl += require("./yt2009trustedcontext").urlContext(
                video.id, "PLAYBACK_STD", false
            ).split("&").join("&amp;")
        }
        function sd(i) {
            return i.split("<").join("").split(">").join("").split("&").join("")
        }
        return `
    <entry>
        <id>${video.id}</id>
        <updated>2010-06-30T22:34:43.880Z</updated>
        <title>${sd(video.title)}</title>
        <link rel='alternate' type='text/html' href='http://www.youtube.com/watch?v=${video.id}&amp;feature=youtube_gdata'/>
        <link rel='http://gdata.youtube.com/schemas/2007#video.responses' type='application/atom+xml' href='http://${config.ip}:${config.port}/feeds/api/videos/${video.id}/responses?v=2'/>
        <link rel='http://gdata.youtube.com/schemas/2007#video.related' type='application/atom+xml' href='http://${config.ip}:${config.port}/feeds/api/videos/${video.id}/related?v=2'/>
        <link rel='related' type='application/atom+xml' href='http://${config.ip}:${config.port}/feeds/api/videos/${video.id}?v=2'/>
        <link rel='self' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/playlists/0A7ED544A0D9877D/00A37F607671690E?v=2'/>
        <author>
            <name>${sd(video.uploaderName)}</name>
            <uri>http://gdata.youtube.com/feeds/api/users/${video.uploaderId}</uri>
        </author>
        <yt:accessControl action='comment' permission='allowed'/>
        <yt:accessControl action='commentVote' permission='allowed'/>
        <yt:accessControl action='videoRespond' permission='moderated'/>
        <yt:accessControl action='rate' permission='allowed'/>
        <yt:accessControl action='embed' permission='allowed'/>
        <yt:accessControl action='syndicate' permission='allowed'/>
        <yt:accessControl action='list' permission='allowed'/>
        <gd:comments>
            <gd:feedLink href='http://gdata.youtube.com/feeds/api/videos/${video.id}/comments?v=2' countHint='1'/>
        </gd:comments>
        <media:group>
            <media:content url='${videoUrl}' type='video/3gpp' medium='video' expression='full' duration='999' yt:format='3'/>
            <media:credit role='uploader' scheme='urn:youtube' yt:type='partner'>${video.uploaderName}</media:credit>
            <media:description type='plain'>${sd(video.description || "")}</media:description>
            <media:keywords>-</media:keywords>
            <media:player url='http://www.youtube.com/watch?v=${video.id}&amp;feature=youtube_gdata'/>
            <media:thumbnail yt:name='hqdefault' url='http://i.ytimg.com/vi/${video.id}/hqdefault.jpg' height='240' width='320' time='00:00:00'/>
            <media:thumbnail yt:name='poster' url='http://i.ytimg.com/vi/${video.id}/0.jpg' height='240' width='320' time='00:00:00'/>
            <media:thumbnail yt:name='default' url='http://i.ytimg.com/vi/${video.id}/0.jpg' height='240' width='320' time='00:00:00'/>
            <media:title type='plain'>${sd(video.title)}</media:title>
            <yt:duration seconds='${video.time ? utils.time_to_seconds(video.time) : "1"}'/>
            <yt:uploaded>2009-03-02T21:47:27.000Z</yt:uploaded>
            <yt:videoid>${video.id}</yt:videoid>
        </media:group>
        <gd:rating average='5.0' max='5' min='1' numRaters='1' rel='http://schemas.google.com/g/2005#overall'/>
        <yt:statistics favoriteCount='0' viewCount='${video.views || 0}'/>
        <yt:position>${index}</yt:position>
    </entry>`
    },
    "subscriptionVideo": function(video, flags, videoIndex) {
        let uploadDate = flags.includes("fake_dates")
                        ? utils.genFakeDate(videoIndex) : video.upload
        let viewCount = video.views;
        if(video.views == "EMPTY_ALLOWED") {
            video.views = ""
            viewCount = ""
        }
        if(flags.includes("realistic_view_count")
        && parseInt(video.views.replace(/[^0-9]/g, "")) >= 100000) {
            viewCount = utils.countBreakup(
                Math.floor(parseInt(video.views.replace(/[^0-9]/g, "")) / 90)
            ) + " views"
        }
        return `
        <div class="video" style="float: left; margin: 15px 0 0 0; padding: 10px 0 10px 10px; width: 150px;">
            <div style="float: left;">
                <div style="float: left;">
                    <input type="checkbox" class="checkbox" value="${video.id}" data-videoid="${video.id}" />
                </div>
            </div>
            <div style="float: left; width: 120px;">
                <a href="/watch?v=${video.id}" class="video-thumb"><img src="${video.thumbnail}"/></a>
                <a href="/watch?v=${video.id}" class="title" style="display: block; color: #03c;">${video.title}</a>
                <div class="video-stats">
                    <div class="video-stat"><span class="stat-upload">${video.upload ? `Added: ${uploadDate}` : ""}</span></div>
                    ${viewCount ? `<div class="video-stat"><span class="stat-views">Views: ${viewCount}</span></div>` : ""}
                    <div class="video-stat"><span class="stat-rating"><img class="yt-rating-5.0" src="/assets/site-assets/pixel-vfl73.gif" alt="5.0" /></span></div>
                </div>
            </div>
        </div>`
    },
    "embedAutoplayCode": `<script>
    // autoplay
    
    document.querySelector("video").addEventListener("canplay", function() {
        setTimeout(function() {
            document.querySelector("video").play()
        }, 100)
    }, false)
    if(document.querySelector("video").readyState >= 3) {
        document.querySelector("video").play();
    }
    showLoadingSprite()
    document.querySelector("video").play()
</script>`,
    "embedNoControlsFadeCode": `
    fadeControlsEnable = false;
    var s = document.createElement("style")
    s.innerHTML = "video {height: calc(100% - 25px) !important;}#watch-player-div {background: black !important;}"
    document.body.appendChild(s)`,
    "embedVideoSources": function(id) {
        let mp4Path = `/get_video?video_id=${id}/mp4`
        let ogvPath = `/assets/${id}.ogg`
        if(id.includes("googlevideo")) {
            mp4Path = id;
            ogvPath = id;
        }

        if(config.trusted_context) {
            mp4Path += "&" + require("./yt2009trustedcontext").generateContext(
                id, "PLAYBACK_STD", false
            )
        }

        return `<source src="${mp4Path}" type="video/mp4"></source>
        <source src="${ogvPath}" type="video/ogg"></source>`
    },
    "xmlSubListBegin": `<?xml version="1.0" encoding="utf-8" ?>
<transcript_list docid="1">`,
    "xmlSubListTrack": function(code, name, index) {
        return `<track id="${index}" name="${code}" kind="xml" lang_code="${code}" lang_original="${name}" lang_translated="${name}" ${index == 0 ? `lang_default="true"` : ""}/>`
    },
    "xmlListEnd": `</transcript_list>`,
    "playerCssHDBtn": `
    <style>
    /*fixy css pod przycisk HQ*/
    .volume_container {
        right: 98px !important;
    }
    .timer {
        right: 135px !important;
    }
    .volume_popout {
        right: 98px !important;
    }
    </style>
    `,
    "playerHDBtnJS": function(id, use720p, autoHQ, trustedContextData) {
        let stdUrl = `/get_video?video_id=${id}/mp4`
        let hqUrl = `/${use720p ? "exp_hd" : "get_480"}?video_id=${id}`
        if(trustedContextData) {
            stdUrl += "&" + trustedContextData.sd;
            hqUrl += "&" + trustedContextData.hq;
        }
        return `
        //exp_hq
        seekbarRemoveWidth = 245;
        adjustSeekbarWidth();
        var hqPlaying = false;

        // hd/hq playback
        $(".video_controls .hq").addEventListener("click", function() {
            video_pause();

            if(!hqPlaying) {
                hqPlaying = true;
                $("video").innerHTML = "";
                var length = seconds_to_time(Math.floor(video.duration || 0))
                $("video").src = "${hqUrl}"
                setTimeout(function() {
                    $(".video_controls .timer").innerHTML = "0:00 / " + length;
                    showLoadingSprite();
                }, 500)
                $(".video_controls .hq").className = "hq ${use720p ? "hd" : ""} enabled"
                video_play()
            } else {
                $("video").src = "${stdUrl}";
                hqPlaying = false;
                $(".video_controls .hq").className = "hq ${use720p ? "hd" : ""}"
            }
        }, false)
        
        // fallback do 360p
        $("video").addEventListener("error", function() {
            if(hqPlaying) {
                $("video").src = "${stdUrl}";
                hqPlaying = false;
                $(".video_controls .hq").className = "hq ${use720p ? "hd" : ""}"
            }
        }, false)${autoHQ ? `
        
        hqPlaying = true;
        showLoadingSprite();` : ""}`
    },
    "hqCheckConnection": `
        
    if(navigator.connection
    && navigator.connection.downlink >= 10) {
        try {$(".video_controls .hq").click()}catch(error) {}
    }
    `,
    "channelspageChannel": function(channel, channelName) {
        channel.url = channel.url.replace(`https://www.youtube.com`, ``)
        return `<div class="channel-cell" style="width:19.5%">
                <div class="channel-entry yt-uix-hovercard">
                    <div class="channel-title">
                        <div class="channel-short-title yt-uix-hovercard-target">
                            <a href="${channel.url}" title="${channelName}" rel="nofollow">${channelName}</a>
                        </div>
                    </div>
                    <div class="user-thumb-large">
                        <div>
                            <a href="${channel.url}">
                                <img class="yt-uix-hovercard-target" src="${channel.avatar}" title="${channelName}">
                            </a>
                        </div>
                    </div>
                    <div class="channel-main-content">
                        <div class="channel-title">
                            <div class="channel-long-title">
                                <a href="${channel.url}" title="${channelName}" rel="nofollow">${channelName}</a>
                            </div>
                        </div>
                        <div class="channel-facets">
                            <span class="result-type">lang_channelpage_type</span>
                            <span class="channel-video-count"></span>
                            <span>${channel.properties.subscribers ? channel.properties.subscribers : "0"} <span class="channel-text-break-grid"></span>lang_channelpage_subs</span>
                            <span class="channel-username"><a class="hLink" href="${channel.url}">${channelName}</a></span>
                        </div>
                    </div>
                    <div class="channel-clear-list-left"></div>
                    <div class="channel-clear-grid"></div>
                </div>
            </div>`
    },
    "gdata_emptyfeed": `<?xml version='1.0' encoding='UTF-8'?>
    <feed>
        <id>http://gdata.youtube.com/feeds/api/standardfeeds/us/recently_featured</id>
        <updated>2010-12-21T18:59:58.000-08:00</updated>
        <category scheme='http://schemas.google.com/g/2005#kind' term='http://gdata.youtube.com/schemas/2007#video'/>
        <title type='text'>vds</title>
        <logo>http://www.youtube.com/img/pic_youtubelogo_123x63.gif</logo>
        <author>
            <name>YouTube</name>
            <uri>http://www.youtube.com/</uri>
        </author>
        <generator version='2.0' uri='http://gdata.youtube.com/'>YouTube data API</generator>
        <openSearch:totalResults>100</openSearch:totalResults>
        <openSearch:startIndex>1</openSearch:startIndex>
        <openSearch:itemsPerPage>25</openSearch:itemsPerPage>
    </feed>`,
    "gdata_feedStart": `<?xml version='1.0' encoding='UTF-8'?>
<feed xmlns='http://www.w3.org/2005/Atom' xmlns:media='http://search.yahoo.com/mrss/' xmlns:openSearch='http://a9.com/-/spec/opensearchrss/1.0/' xmlns:gd='http://schemas.google.com/g/2005' xmlns:yt='http://gdata.youtube.com/schemas/2007'>
    <id>http://gdata.youtube.com/feeds/api/standardfeeds/us/recently_featured</id>
    <updated>2010-12-21T18:59:58.000-08:00</updated>
    <category scheme='http://schemas.google.com/g/2005#kind' term='http://gdata.youtube.com/schemas/2007#video'/>
    <title type='text'> </title>
    <logo>http://www.youtube.com/img/pic_youtubelogo_123x63.gif</logo>
    <author>
        <name>YouTube</name>
        <uri>http://www.youtube.com/</uri>
    </author>
    <generator version='2.0' uri='http://gdata.youtube.com/'>YouTube data API</generator>
    <openSearch:totalResults>25</openSearch:totalResults>
    <openSearch:startIndex>1</openSearch:startIndex>
    <openSearch:itemsPerPage>25</openSearch:itemsPerPage>`,
    "gdata_feedEnd": "\n</feed>",
    "gdata_feedVideo": function(id, title, author, views, length, description, uploadDate, keywords, category, flags, qualities, additional) {
        if(!id) return ""
        
        // flag handling
        if(typeof(flags) == "object") {
            try {
                flags = flags.join(",")
            }
            catch(error){}
        }
        if(flags && flags.includes("realistic-view-count")
        && views >= 100000) {
            views = Math.floor(views / 90)
        }

        // is a video from favorites
        let isFav = id.includes("/fav")
        id = id.replace("/fav", "")
        let favCode = ""
        if(isFav) {
            favCode = `<link rel="edit" href="http://${config.ip}:${config.port}/feeds/api/videos/${id}/edit"/>`
        }

        // rating
        let rating = 4.5;
        let ryd = require("./cache_dir/ryd_cache_manager")
        if(ryd.readCache(id)) {
            rating = ryd.readCache(id)
        }
        let ratingApproxDivide = 150;
        if(views < 1000000) {
            ratingApproxDivide = 15;
        }
        let likeCount = parseInt(views) / ratingApproxDivide * (rating / 5)
        let dislikeCount = parseInt(views) / ratingApproxDivide * (1 - (rating / 5))
        if(dislikeCount == 0) {
            dislikeCount = likeCount * 0.00731
        }

        // tags/keywords
        let unduplicateKeywordList = []
        let oldKeywords = (keywords || "").replace(/[^a-zA-Z0-9\,]/g, "").trim()
        oldKeywords.split(",").forEach(keyword => {
            if(keyword.length > 0
            && keyword.length < 11
            && unduplicateKeywordList.length < 8
            && !unduplicateKeywordList.includes(keyword.toLowerCase())) {
                unduplicateKeywordList.push(keyword.toLowerCase())
            }
        })
        if(unduplicateKeywordList.length == 0) {
            unduplicateKeywordList.push("-")
        }

        // qualities
        let trustedContexts = false;
        const yt2009trusted = require("./yt2009trustedcontext")
        let long = length >= (60 * 30)
        let streamHQ = `http://${config.ip}:${config.port}/get_480?video_id=${id}`
        let streamHD = `http://${config.ip}:${config.port}/exp_hd?video_id=${id}`
        let streamStd = `http://${config.ip}:${config.port}/channel_fh264_getvideo?v=${id}`
        if(config.trusted_context) {
            trustedContexts = {
                "sd": yt2009trusted.generateContext(id, "PLAYBACK_STD", long)
            }
            if(!qualities) {qualities = []}
            if(qualities.includes("480p")) {
                trustedContexts.hq = yt2009trusted.generateContext(
                    id, "PLAYBACK_HQ", long
                ).split("&").join("&amp;")
            }
            if(qualities.includes("720p")) {
                trustedContexts.hd = yt2009trusted.generateContext(
                    id, "PLAYBACK_HD", long
                ).split("&").join("&amp;")
            }

            streamStd += "&amp;" + trustedContexts.sd.split("&").join("&amp;")
            streamHQ += "&amp;" + trustedContexts.hq
            streamHD += "&amp;" + trustedContexts.hd
        }

        let qualityCode = ""
        if(qualities) {
            if(qualities.includes("480p")) {
                qualityCode += `<media:content url='${streamHQ}' type='video/3gpp' medium='video' expression='full' duration='999' yt:format='14'/>`
            }
            if(qualities.includes("720p")) {
                qualityCode += `<media:content url='${streamHD}' type='video/3gpp' medium='video' expression='full' duration='999' yt:format='8'/>`
            }
        }

        // auto-try hd
        let videoUrl = streamStd
        if(flags && flags.includes("better-hd")) {
            videoUrl = `http://${config.ip}:${config.port}/exp_hd?video_id=${id}/lower`
            videoUrl += "&amp;" + yt2009trusted.generateContext(id, "UNIV", long)
                        .split("&").join("&amp;")
            qualityCode = ""
        }

        // category names
        category = (category || "-").split("&").join("&amp;")

        // additional data
        let add = ""
        if(additional && additional.authorFull) {
            add += "\n          <yt9full>" + utils.xss(additional.authorFull).split("&").join("&amp;") + "</yt9full>"
        }
        if(additional && additional.authorId) {
            add += "\n          <yt9aid>" + additional.authorId + "</yt9aid>"
        }

        return `
        <entry>
            <id>http://${config.ip}:${config.port}/feeds/api/videos/${id}</id>
            <youTubeId id='${id}'>${id}</youTubeId>
            <published>${uploadDate ? new Date(uploadDate).toISOString() : ""}</published>
            <updated>${uploadDate ? new Date(uploadDate).toISOString() : ""}</updated>
            <category scheme="http://gdata.youtube.com/schemas/2007/categories.cat" label="${category}" term="${category}">${category}</category>
            <title type='text'>${title.split("<").join("").split(">").join("").split("&").join("&amp;")}</title>
            <content type='text'>${description.split("<").join("").split(">").join("").split("&").join("&amp;")}</content>
            <link rel="http://gdata.youtube.com/schemas/2007#video.related" href="http://${config.ip}:${config.port}/feeds/api/videos/${id}/related"/>${favCode}
            <author>
                <name>${author}</name>
                <uri>http://${config.ip}:${config.port}/feeds/api/users/${author}</uri>
            </author>
            <gd:comments>
                <gd:feedLink href='http://${config.ip}:${config.port}/feeds/api/videos/${id}/comments' countHint='530'/>
            </gd:comments>
            <media:group>
                <media:title>${title.split("<").join("").split(">").join("").split("&").join("&amp;")}</media:title>
                <media:category label='${category}' scheme='http://gdata.youtube.com/schemas/2007/categories.cat'>${category}</media:category>
                <media:content url='${videoUrl}' type='video/3gpp' medium='video' expression='full' duration='999' yt:format='3'/>${qualityCode}
                <media:description type='plain'>${description.split("<").join("").split(">").join("").split("&").join("&amp;")}</media:description>
                <media:keywords>${unduplicateKeywordList.join(", ")}</media:keywords>
                <media:player url='http://www.youtube.com/watch?v=${id}'/>
                <media:thumbnail yt:name='hqdefault' url='http://i.ytimg.com/vi/${id}/hqdefault.jpg' height='240' width='320' time='00:00:00'/>
                <media:thumbnail yt:name='poster' url='http://i.ytimg.com/vi/${id}/0.jpg' height='240' width='320' time='00:00:00'/>
                <media:thumbnail yt:name='default' url='http://i.ytimg.com/vi/${id}/0.jpg' height='240' width='320' time='00:00:00'/>
                <yt:duration seconds='${length}'/>
                <yt:videoid id='${id}'>${id}</yt:videoid>
                <youTubeId id='${id}'>${id}</youTubeId>
                <media:credit role='uploader' name='${author}'>${author}</media:credit>
            </media:group>
            <gd:rating average='5' max='5' min='1' numRaters='${Math.floor(views / 600)}' rel='http://schemas.google.com/g/2005#overall'/>
            <yt:statistics favoriteCount="${Math.floor(views / 150)}" viewCount="${views}"/>
            <yt:rating numLikes="${Math.floor(likeCount)}" numDislikes="${Math.floor(dislikeCount)}"/>${add}
        </entry>`
    },
    "gdata_feedComment": function(id, authorName, comment, time) {
        return `<entry gd:etag=' '>
		<id>tag:youtube.com,2008:video:b:comment:c</id>
		<published>${new Date(time).toISOString()}</published>
		<updated>${new Date(time).toISOString()}</updated>
		<category scheme='http://schemas.google.com/g/2005#kind' term='http://gdata.youtube.com/schemas/2007#comment'/>
		<title>...</title>
		<content>${comment.split("<br>").join("\n")
                          .split("<").join("")
                          .split(">").join("")
                          .split("&").join("")
                          .trim()}</content>
		<link rel='related' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/videos/${id}?v=2'/>
		<link rel='alternate' type='text/html' href='http://www.youtube.com/watch?v=${id}'/>
		<link rel='self' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/videos/${id}/comments/c?v=2'/>
		<author>
			<name>${authorName}</name>
			<uri>http://gdata.youtube.com/feeds/api/users/${authorName}</uri>
		</author>
	</entry>`
    },
    "gdata_user": function(id, name, avatar, subs, videoCount, channelViews, uploadViews, flags) {
        if(flags.includes("uncrop-avatar")
        && avatar.includes("/assets/")) {
            avatar = `http://${config.ip}:${config.port}/mobile/avatar_process?avatar=/assets/${avatar.split("assets/")[1]}`
        }
        if(flags.includes("default-avatar-adapt")) {
            let avatarUrl = avatar.replace(
                `http://${config.ip}:${config.port}`,
                ""
            )
            avatarUrl = __dirname + "/.." + avatarUrl
            let isDefaultAvatar = require("./detect_default_avatar")(avatarUrl)
            if(isDefaultAvatar) {
                avatar = `http://${config.ip}:${config.port}/assets/site-assets/default.png`
            }
        }

        if((videoCount || "").toString().includes("K")) {
            videoCount = parseInt(videoCount) * 1000
        } else if((videoCount || "").toString().includes("M")) {
            videoCount = parseInt(videoCount) * 1000000
        }

        return `<?xml version='1.0' encoding='UTF-8'?>
<entry
    xmlns='http://www.w3.org/2005/Atom'
    xmlns:media='http://search.yahoo.com/mrss/'
    xmlns:gd='http://schemas.google.com/g/2005'
    xmlns:yt='http://gdata.youtube.com/schemas/2007'>
    <id>http://${config.ip}:${config.port}/feeds/api/users/${id}</id>
    <published>2010-05-28T09:21:19.000-07:00</published>
    <updated>2011-02-09T03:27:42.000-08:00</updated>
    <category scheme='http://schemas.google.com/g/2005#kind' term='http://gdata.youtube.com/schemas/2007#userProfile'/>
    <category scheme='http://gdata.youtube.com/schemas/2007/channeltypes.cat' term=''/>
    <title type='text'>${name} Channel</title>
    <content type='text'></content>
    <link rel='self' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/users/${id}'/>
    <author>
        <name>${name}</name>
        <uri>http://gdata.youtube.com/feeds/api/users/${id}</uri>
    </author>
    <yt:age>1</yt:age>
    <yt:description></yt:description>
    <gd:feedLink rel='http://gdata.youtube.com/schemas/2007#user.uploads' href='http://gdata.youtube.com/feeds/api/users/${name}/uploads' countHint='${videoCount}'/>
    <yt:statistics lastWebAccess='2011-02-01T12:45:18.000-08:00' subscriberCount='${subs}' videoWatchCount='1' viewCount='${channelViews}' totalUploadViews='${uploadViews}'/>
    <media:thumbnail url='${avatar}'/>
    <yt:username>${name}</yt:username>
</entry>` 
    },
    "gdata_playlistEntry": function(author, playlistId, playlistName, vidCount, summary) {
        return `
    <entry>
	    <id>http://${config.ip}:${config.port}/feeds/api/users/${author}/playlists/${playlistId}</id>
        <playlistId>${playlistId}</playlistId>
        <yt:playlistId>${playlistId}</yt:playlistId>
		<published>2008-08-25T10:05:58.000-07:00</published>
		<updated>2008-08-27T22:37:59.000-07:00</updated>
		<category scheme='http://schemas.google.com/g/2005#kind' term='http://gdata.youtube.com/schemas/2007#playlistLink'/>
		<title type='text'>${playlistName.split("<").join("").split(">").join("").split("&").join("").trim()}</title>
		<content type='text' src='http://${config.ip}:${config.port}/feeds/api/users/${author}/playlists/${playlistId}'>None</content>
		<link rel='related' type='application/atom+xml' href='http://${config.ip}:${config.port}/feeds/api/users/${author}'/>
		<link rel='alternate' type='text/html' href='http://${config.ip}:${config.port}/view_play_list?p=${playlistId}'/>
		<link rel='self' type='application/atom+xml' href='http://${config.ip}:${config.port}/feeds/api/users/${author}/playlists/${playlistId}'/>
		<author>
			<name>${author}</name>
			<uri>http://${config.ip}:${config.port}/feeds/api/users/${author}</uri>
		</author>
		<gd:feedLink rel='http://gdata.youtube.com/schemas/2007#playlist' href='http://${config.ip}:${config.port}/feeds/api/playlists/${playlistId}' countHint='${vidCount}'/>
		<yt:description>None</yt:description>
        <yt:countHint>${vidCount}</yt:countHint>
		<summary>${summary}</summary>
	</entry>`
    },
    "gdata_activityEntry": function(type, author, title, id, timestamp, length, views) {
        return `
    <entry>
		<id>tag:youtube.com,2008:video:${id}</id>
		<updated>${timestamp ? new Date(timestamp).toISOString() : ""}</updated>
		<category scheme='http://schemas.google.com/g/2005#kind' term='http://http://gdata.youtube.com/schemas/2007#userEvent'/>
		<category scheme='http://gdata.youtube.com/schemas/2007/userevents.cat' term='${type}'/>
		<title>${title.split("<").join("").split(">").join("").split("&").join("").trim()}</title>
		<yt:videoid>${id}</yt:videoid>
        <yt:username>${id}</yt:username>
        <yt:groupId>0</yt:groupId>
        <author>
			<name>${author}</name>
			<uri>http://gdata.youtube.com/feeds/api/users/${author}</uri>
		</author>
        <link rel='http://gdata.youtube.com/schemas/2007#video' href='http://${config.ip}:${config.port}/feeds/api/videos/${id}'>
            ${this.gdata_feedVideo(
                id, title, author,
                utils.bareCount(views), utils.time_to_seconds(length),
                "-", timestamp, "-", "-", ""
            )}
        </link>
	</entry>`
    },
    "gdata_userPlaylistStart": function(playlistId, playlistName, firstVideoId, author, updateDate, videoCount) {
        return `
        <category scheme='http://schemas.google.com/g/2005#kind' term='http://gdata.youtube.com/schemas/2007#playlistLink'/>
        <!--<category scheme='http://gdata.youtube.com/schemas/2007/tags.cat' term='d'/>-->
        <title>${playlistName.split("<").join("").split(">").join("").split("&").join("").trim()}</title>
        <summary></summary>
        <content type='application/atom+xml;type=feed' src='http://${config.ip}:${config.port}/feeds/api/playlists/${playlistId}'/>
        <link rel='related' type='application/atom+xml' href='http://${config.ip}:${config.port}/feeds/api/users/${author}'/>
        <link rel='self' type='application/atom+xml' href='http://${config.ip}:${config.port}/feeds/api/users/${author}/playlists/${playlistId}'/>
        <author>
            <name>${author}</name>
            <uri>http://gdata.youtube.com/feeds/api/users/${author}</uri>
        </author>
        <yt:countHint>${videoCount}</yt:countHint>
        <media:group>
            <media:thumbnail url='http://i.ytimg.com/vi/${firstVideoId}/default.jpg' height='90' width='120' yt:name='default'/>
            <media:thumbnail url='http://i.ytimg.com/vi/${firstVideoId}/hqdefault.jpg' height='360' width='480' yt:name='hqdefault'/>
            <yt:duration seconds='${videoCount * (Math.floor(Math.random() * 100) + 120)}'/>
        </media:group>
        <yt:playlistId>${playlistId}</yt:playlistId>
        <playlistId>${playlistId}</playlistId>`
    },
    "homepage_recommended": `<div id="feedmodule-REC" class="feedmodule-anchor">
                    <div class="feedmodule-modheader" id="REC-titlebar">
                        <div id="feed_recommended">
                            <div class="fm2-title-border-box-gray yt-rounded">
                                <div class="fm2-title">
                                    <img class="img_feed_recommended master-sprite fm2-icon" src="/assets/site-assets/pixel-vfl73.gif">
                                    <span class="fm2-titleText" id="feed_recommended-titleText">lang_hp_recommended</span>
                                </div>
                                <div class="feedmodule-preamble yt2009-signin-hide" style="border-bottom: 1px dotted;" id="yt2009-rec-learn-more">
                                    <a href="#">lang_hp_learnmore</a>
                                </div>
                                <div class="feedmodule-updown">
                                    <span id="medit-REC" class="iyt-edit-link iyt-edit-link-gray" onclick="recommended_edit_show();">lang_hp_edit</span>
                                    <span id="mup-REC" class="up-button" onclick="moveUp('rec')">
                                        <img class="master-sprite img-php-up-arrow" src="/assets/site-assets/pixel-vfl73.gif">
                                    </span>
                                    <span id="mdown-REC" class="down-button" onclick="moveDown('rec')">
                                        <img class="master-sprite img-php-down-arrow"  src="/assets/site-assets/pixel-vfl73.gif">
                                    </span>
                                    <span id="mclose-REC" onclick="removeModule('rec')">
                                        <img class="master-sprite img-php-close-button" src="/assets/site-assets/pixel-vfl73.gif">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clear feedmodule-border-gray yt-rounded" id="feed_recommended-content">
                        <div id="REC-data" class="feedmodule-data">
                            <div id="REC-options" class="opt-pane hid">
                                <div class="opt-box-top">
                                    <img class="homepage-ajax-sprite img-php-opt-box-caret" src="/assets/site-assets/pixel-vfl73.gif">
                                </div>
                                <div class="opt-banner">
                                    <div class="opt-links">
                                        <div class="opt-edit grayText">Editing: Recommended for You</div>
                                        <div class="opt-close opt-close-text iyt-edit-link" onclick="recommended_edit_hide();">close</div>
                                        <div id="REC-loading-msg" class="opt-loading-msg" style="display: none;">
                                            Saving...
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                </div>
                                <div class="opt-main">
                                    <div class="opt-divider">
                                        <table class="opt-tbl">
                                            <tbody>
                                                <tr>
                                                    <td class="opt-name">
                                                        Display as:
                                                    </td>
                                                    <td class="opt-val opt-sel">
                                                        <div id="REC-options-SIN" class="opt-form-type-btns">
                                                            <img src="/assets/site-assets/pixel-vfl73.gif" class="homepage-ajax-sprite btn-listview-off" title="List View" alt="List View" id="rec-style-list" onclick="homepageRecSet('list')"><img src="/assets/site-assets/pixel-vfl73.gif" id="rec-style-grid" class="homepage-ajax-sprite btn-gridview-on" title="Grid View" alt="Grid View" onclick="homepageRecSet('grid')">
                                                        </div>
                                                    </td>
                                                    <td class="opt-name" id="reco-opt-num-picker">
                                                        Number of rows to display:
                                                    </td>
                                                    <td class="opt-val">
                                                        <select id="REC-options-num" name="REC-options-num" onchange="homepageRecSet('rows')">
                                                            <option value="1">1</option>
                                                            <option value="2" selected>2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div id="logged_out_rec_learn_more_box" class="yt-rounded side-announcement-box" style="margin: 5px 10px 5px 5px; padding: 5px; display: none;">
                                <div style="cursor: pointer; display:inline; float: right;" id="yt2009-rec-more-close"><img class="img-php-close-button master-sprite" style="background-position: -57px -712px;" src="/assets/site-assets/pixel-vfl73.gif"></div>
                                <div style="color: black; padding-left: 5px;">
                                    lang_hp_rec_desc_p1lang_hp_rec_desc_p2
                                </div>
                                <div style="color: black; padding-left: 5px; padding-right: 10px; margin-top: 10px;">
                                    lang_hp_rec_desc_p3
                                </div>
                            </div>
                            <div class="feedmodule-body grid-view" id="REC-feedmodule-body">
                                <div id="recommended-loading-sprite"><img src="/assets/site-assets/icn_loading_animated-vfl24663.gif" style="margin-left: 310px;margin-top: 30px;margin-bottom: 30px;"></div>
                                <div class="clearL yt2009-cells-container" id="yt2009-recommended-cells-container">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <script src="/assets/site-assets/homepage-recommended.js"></script>`,
    "recommended_videoCell": function(video, req, flags) {
        let thumbUrl = utils.getThumbUrl(video.id, req)
        let creatorName = video.author_name || video.creatorName;
        if(flags && flags.includes("username_asciify")) {
            creatorName = utils.asciify(creatorName)
        }
        return `<div class="video-cell" style="width:24.5%" data-id="${video.id}">
        <div class="video-entry yt-uix-hovercard">
            <div class="v120WideEntry">
                <div class="v120WrapperOuter">
                    <div class="v120WrapperInner"><a id="video-url-${video.id}" class="video-thumb-link" href="/watch?v=${video.id}" rel="nofollow"><img title="${video.title.split(`"`).join(`&quot;`)}" src="${thumbUrl}" class="vimg120 yt-uix-hovercard-target"></a>
                        <div id="quicklist-icon-${video.id}" class="addtoQL90"><a id="add-to-quicklist-${video.id}" href="#" ql="${video.id}" title="lang_add_to_ql" onclick="addToQuicklist('${video.id}', '${video.title.split(`'`).join("&quot;").split(`"`).join("&quot;")}', '${creatorName.split(`'`).join("&quot;").split(`"`).join("&quot;")}')"><button class="master-sprite QLIconImg" title=""></button></a>
                            <div class="hid quicklist-inlist"><a href="/my_quicklist">lang_ql_added_homepage</a></div>
                        </div>
                        <div class="video-time"><a id="video-run-time-${video.id}" href="/watch?v=${video.id}" rel="nofollow">${video.length}</a></div>
                    </div>
                </div>
            </div>
            <div class="video-main-content" id="video-main-content-${video.id}">
                <div class="video-title ">
                    <div class="video-short-title">
                        <a id="video-short-title-${video.id}" href="/watch?v=${video.id}" class="yt-uix-hovercard-target" title="${video.title.split(`"`).join(`&quot;`)}" rel="nofollow">${video.title}</a>
                    </div>
                </div>
                <div class="video-facets">
                    <span id="video-average-rating-${video.id}" class="video-rating-list ">
                        <div>
                            <button class="master-sprite ratingVS ratingVS-4.5" title="4.5"></button>
                        </div>
                    </span>
                    <span id="video-added-time-${video.id}" class="video-date-added">${!video.o ? utils.relativeTimeCreate(
                        utils.fakeDatesModern("2010-04-02", utils.relativeToAbsoluteApprox(video.upload)), langs.get_language(req)
                    ) : video.upload}</span>
                    <span id="video-num-views-${video.id}" class="video-view-count">lang_views_prefix${utils.countBreakup(
                        utils.bareCount(video.views || "0")
                    )}lang_views_suffix</span>
                    <span id="video-average-rating-${video.id}" class="video-rating-grid ">
                        <div>
                            <button class="master-sprite ratingVS ratingVS-4.5" title="4.5"></button>
                        </div>
                    </span>
                    <span class="video-username"><a id="video-from-username-${video.id}" class="hLink" href="${video.author_url || video.creatorUrl}">${creatorName}</a></span>
                </div>
            </div>
            <div class="video-clear-list-left"></div>
        </div>
    </div>`
    },
    "videosFooterPaging": function(page, pages, url) {
        let htmlBox = `
        <div class="searchFooterBox">
            <div class="pagingDiv">
                <span class="pagerLabel smallText label">Pages: </span>`

        // url for hrefs
        let basePagingUrl = url
        let pagingPart = [
            "?p=" + page,
            "&p=" + page
        ]
        pagingPart.forEach(urlPart => {
            basePagingUrl = basePagingUrl.replace(urlPart, "")
        })

        let c = "&"
        if(!basePagingUrl.includes("?")) {
            c = "?"
        }

        // previous button
        if(pages[0] > 1) {
            htmlBox += `<a href="${basePagingUrl}${c}p=${page - 1}" class="pagerNotCurrent">Previous</a>`
        }


        // add <a> elements
        pages.forEach(possiblePage => {
            if(possiblePage == page) {
                htmlBox += `<span class="pagerCurrent">${page}</span>`
            } else {
                htmlBox += `<a href="${basePagingUrl}${c}p=${possiblePage}" class="pagerNotCurrent">${possiblePage}</a>`
            }
        })

        // next button
        if(pages.includes(page + 1)) {
            htmlBox += `<a href="${basePagingUrl}${c}p=${page + 1}" class="pagerNotCurrent">Next</a>`
        }

        htmlBox += `</div>
        </div>`

        return htmlBox;
    },
    "format_merge_command": function(f1, f2, f3) {
        let cmd = [
            "ffmpeg",
            `-i "${f1}"`,
            `-i "${f2}"`,
            `-c:v copy -c:a copy`,
            `-map 0:v -map 1:a`,
            `-ab 192000`,
            `"${f3}"`
        ].join(" ")
        return cmd;
    },
    "favoritepage_videocell_part": [function(pageNum) {
        return `
        <tbody id="videos" class="videos-page videos-page-${pageNum} ${pageNum !== 0 ? "hid" : ""}">
            <tr>
                <td colspan="2">
        `
    }, `</td></tr></tbody>`],
    "listview_video": function(v, index, flags) {
        let thumbUrl = utils.getThumbUrl(v.id, flags)
        return `
    <tr id="video-${v.id}" class="video ${index % 2 == 0 ? "even" : "odd"}">
        <td class="column-check first"><input type="checkbox" value="${v.id}"></td>
        <td class="column-details">
            <div class="video-panel">
                <div class="video-details" style="margin: 0 0 10px 130px;">
                    <div class="video-image" style="position: absolute; margin-left: -130px;overflow: hidden;height: 78px;">
                        <a class="video-thumb-120 no-quicklist" href="/watch?v=${v.id}"><img title="${v.title.split("\"").join("&quot;")}" src="${thumbUrl}" class="vimg120 yt-uix-hovercard-target" style="margin-top: -6px" alt="${v.title.split("\"").join("&quot;")}"></a>
                    </div>
                    <div class="video-title">
                        <div class="clipper">
                            <a href="/watch?v=${v.id}">${v.title}</a>
                        </div>
                    </div>
                    <p id="video-description-${v.id}" class="video-description-expanded"><span>${
                        v.description.length > 140
                        ? v.description.split("\n")[0].substring(0, 140) + "..."
                        : v.description
                    }</span></p>
                    <div class="video-stats">
                        <div class="video-stat">
                            Added: <span class="stat-date-added">${utils.dateFormat(v.upload)}</span>
                        </div>
                        <div class="video-stat">
                            Time: <span class="stat-duration">${utils.seconds_to_time(v.length)}</span>
                        </div>
                        <div class="video-stat">
                            Owner: <a href="${v.author_url}" class="stat-username">${utils.asciify(v.author_name)}</a>
                        </div>
                    </div>
                    <div class="video-stats">
                        <div class="video-stat">
                            Views: <span class="stat-views">${utils.countBreakup(utils.bareCount(v.viewCount))}</span>
                        </div>
                        <div class="video-stat">
                            Rating: <span class="stat-rating"><img class="yt-rating-4.5" src="/assets/site-assets/pixel-vfl73.gif" alt="4.5"></span>
                        </div>
                    </div>
                    <div style="clear: both;"></div>
                    <div class="video-buttons">
                        <a class="yt-button" id="" href="/watch?v=${v.id}"><span>Play</span></a>
                    </div>
                </div>
                <div class="video-buttons-ext">
                </div>
            </div>
        </td>
    </tr>`
    },
    "creator_listview_video": function(v, index, flags) {
        let thumbUrl = utils.getThumbUrl(v.id, flags)

        if(v.thumbnail) {
            // override thumbnail - if defined, then needed
            thumbUrl = v.thumbnail
        }
        let privacy = "Public"
        switch(v.privacy) {
            case "VIDEO_PRIVACY_PUBLIC": {
                privacy = "Public"
                break;
            }
            case "VIDEO_PRIVACY_UNLISTED": {
                privacy = "Unlisted"
                break;
            }
            case "VIDEO_PRIVACY_PRIVATE": {
                privacy = "Private"
                break;
            }
        }
        let rating;
        if(v.likes == 0 && v.dislikes == 0) {
            rating = 0
        } else if(v.likes == 0 && v.dislikes >= 1) {
            rating = 1
        } else {
            rating = 5 * (v.likes / (v.likes + v.dislikes))
            rating = utils.custom_rating_round(rating)
        }
        rating = rating.toFixed(1)
        return `
    <tr id="video-${v.id}" class="video ${index % 2 == 0 ? "even" : "odd"}">
        <td class="column-check first"><input type="checkbox" value="${v.id}"></td>
        <td class="column-details">
            <div class="video-panel">
                <div class="video-details" style="margin: 0 0 10px 130px;">
                    <div class="video-image" style="position: absolute; margin-left: -130px;overflow: hidden;height: 78px;">
                        <a class="video-thumb-120 no-quicklist" href="/watch?v=${v.id}"><img title="${v.title.split("\"").join("&quot;")}" src="${thumbUrl}" class="vimg120 yt-uix-hovercard-target" style="margin-top: -6px" alt="${v.title.split("\"").join("&quot;")}"></a>
                    </div>
                    <div class="video-title">
                        <div class="clipper">
                            <a href="/watch?v=${v.id}">${v.title}</a>
                        </div>
                    </div>
                    <p id="video-description-${v.id}" class="video-description-expanded"><span>  </span></p>
                    <div class="video-stats">
                        <div class="video-stat">
                            Added: <span class="stat-date-added">${utils.dateFormat(v.added)}</span>
                        </div>
                        <div class="video-stat">
                            Time: <span class="stat-duration">${v.time}</span>
                        </div>
                        <div class="video-stat">
                            Broadcast: <span class="stat-privacy">${privacy}</span></a>
                        </div>
                    </div>
                    <div class="video-stats">
                        <div class="video-stat">
                            Views: <span class="stat-views">${utils.countBreakup(v.views)}</span>
                        </div>
                        <div class="video-stat">
                            Comments: <span class="stat-comments">${utils.countBreakup(v.comments)}</span>
                        </div>
                        <div class="video-stat">
                            Rating: <span class="stat-rating"><img class="yt-rating-${rating}" src="/assets/site-assets/pixel-vfl73.gif" alt="${rating}"></span>
                        </div>
                    </div>
                    <div style="clear: both;"></div>
                    <div class="video-buttons">
                        <a class="yt-button" id="" href="/watch?v=${v.id}"><span>Play</span></a>
                        <a class="yt-button" id="" href="/my_videos_edit?video_id=${v.id}"><span>Edit</span></a>
                        ${v.downloadUrl ? `<a class="yt-button" target="_blank" id="" href="https://www.youtube.com${v.downloadUrl}"><span>Download MP4</span></a>` : ""}
                        <a class="yt-button" id="delete-video-button" href="javascript:void(0)" onclick="deletePrompt('${v.id}')"><span>Delete</span></a>
                        <form action="/my_videos_delete" method="POST" class="hid" id="video-delete-${v.id}">
                        <input type="hidden" name="video_ids" value="${v.id}">
                        </form>
                    </div>
                </div>
                <div class="video-buttons-ext">
                </div>
            </div>
        </td>
    </tr>`
    },
    "blazer_bareVideo": function(id, title, length, views, author, tags) {
        let stream_url = "/get_video?video_id=" + id + "/mp4";
        if(config.trusted_context) {
            stream_url += "&" + require("./yt2009trustedcontext").generateContext(
                id, "PLAYBACK_STD", false
            )
        }
        return {
            "id": id,
            "video_id": id,
            "title": title,
            "duration": length,
            "view_count": utils.countBreakup(utils.bareCount(views)),
            "is_playable": true,
            "username": author,
            "watch_link": "/watch?v=" + id,
            "thumbnail_for_list": "<img src=\"http://i.ytimg.com/vi/" + id + "/default.jpg\"/>",
            "stream_url": stream_url,
            "landscape": true,
            "stitched_thumbnail_large": {
                "url": "http://i.ytimg.com/vi/" + id + "/hqdefault.jpg",
                "width": 160,
                "height": 120,
                "posx": 60,
                "posy": 25
            },
            "length": utils.time_to_seconds(length),
            "tags": (tags || []),
            "short_description": "loading",
            "time_created_text": ""
        }
    },
    "banner": function(url) {return `<div id="user_banner" class="profile-banner-box"><img src="${url}" class="" width="960" height="150"></div>`},
    "watchBanner": function(link, img) {
    return `<div id="watch-channel-brand-cap">
        <a href="${link}"><img src="${img}" onerror="document.getElementById('watch-channel-brand-cap').style.display = 'none';" width="300" height="50" border="0"></a>
    </div>`},
    "sidebarSub": function(sub) {return `<div class="subfolder channel-subfolder" onclick="switchChannel(this)" data-url="${sub.url}"><a class="name" href="#">${sub.name.trim()}</a></div>`},
    "langPickerBase": `
    <div id="language-picker">
        <div class="picker-top" style="">
            <h2>Set Your Language Preference</h2>
            <div id="language-picker-help">
                <a href="#" class="picker-help-link">(What is this?)</a>
            </div>
            <div class="box-close-link">
                <img onclick="closeLangPicker()" src="/assets/site-assets/pixel-vfl73.gif" alt="Close">
            </div>
            <div class="clearR"></div>
        </div>
        <div class="flag-list">
            <div class="flag-bucket">
                <!--yt2009_bucket_1-->
            </div>
            <div class="flag-bucket">
                <!--yt2009_bucket_2-->
            </div>
            <div class="flag-bucket">
                <!--yt2009_bucket_3-->
            </div>
            <div class="flag-bucket">
                <!--yt2009_bucket_4-->
            </div>
            <div class="flag-bucket">
                <!--yt2009_bucket_5-->
            </div>
            <div class="spacer">&nbsp;</div>
        </div>
    </div>`,
    "langPickerLanguage": function(code, name) {
        return `
                <div class="flag-div">
                    <a href="#" onclick="setLang('${code}'); return false;">
                        ${name}
                    </a>
                </div>`
    },
    "historyVideo": function(video, req) {
        let thumbUrl = utils.getThumbUrl(video.id, req)
        return `
                <div class="video" style="float: left; margin: 15px 0 0 0; padding: 10px 0 10px 10px; width: 150px;">
                    <div style="float: left;">
                        <div style="float: left;">
                            <input type="checkbox" class="checkbox" value="${video.id}" />
                        </div>
                    </div>
                    <div style="float: left; width: 120px;">
                        <a href="/watch?v=${video.id}" class="video-thumb"><img src="${thumbUrl}"/></a>
                        <a href="/watch?v=${video.id}" class="title" style="display: block; color: #03c;">${video.title}</a>
                        <div class="video-stats">
                            <div class="video-stat"><span class="stat-views">lang_userpage_views_prefix${video.views}</span></div>
                            <div class="video-stat"><span class="stat-rating"><img class="yt-rating-5.0" src="/assets/site-assets/pixel-vfl73.gif" alt="5.0" /></span></div>
                        </div>
                    </div>
                </div>`;
    },
    "historyParts": [function (pageNum){return `
    <tbody id="videos" class="videos-page videos-page-${pageNum} ${pageNum !== 0 ? "hid" : ""}">
        <tr>
            <td colspan="2">`},
            `
            </td>
        </tr>
    </tbody>`],
    "oneLineRating": function(rating) {
        return `<button class="yt2009-stars master-sprite ratingL ratingL-${rating}" title="${rating}"></button>`
    },
    "separatedRating": function(rating) {
        rating = parseFloat(rating)
        let starIndex = 1;
        let fullHTML = ""
        while(starIndex !== 6) {
            let starType = "empty"
            if(rating - starIndex >= 1
            || rating - starIndex == 0
            || rating - starIndex == 0.5) {
                starType = "full"
            } else if(rating - starIndex == -0.5) {
                starType = "half"
            }
            fullHTML += `<a href="#" onclick="rateVid(${starIndex}); return false;" onmouseover="showStars(${starIndex});" onmouseout="clearStars();"><button id="star__${starIndex}" class="master-sprite rating icn_star_${starType}_large" title=""></button></a>`
            starIndex++
        }

        return fullHTML
    },
    "searchNoResults": function(term) {
        return `
    <div style="margin-top: 10px" id="search-no-results-message">
        <img src="/assets/site-assets/icn_cycds_warning-vfl33982.gif" alt="">&nbsp;No videos found for
        <span>“${term}”</span>
    </div>`
    },
    "latestChip": "8gYuGix6KhImCiQ2N2FiOTYwMC0wMDAwLTI0N2QtYjAyYi01ODI0MjljNmI1ZjggBA%3D%3D",
    "popularChip": "8gYuGix6KhImCiQ2N2FiOTYwMC0wMDAwLTI0N2QtYjAyYi01ODI0MjljNmI1ZjggAg%3D%3D",
    "replyTemplate": function(commentIndex, video, loginSimulateName) {
        return `
    <div id="div_comment_form_id_${commentIndex}">
        <form name="comment_formcomment_form_id_${commentIndex}" id="comment_formcomment_form_id_${commentIndex}" onsubmit="return false;" method="post" action="/comment_reply">
            <input type="hidden" name="video_id" value="${video}">
            <input type="hidden" name="session_token" value="${loginSimulateName}">
            <input type="hidden" name="form_id" value="comment_formcomment_form_id_${commentIndex}">
            <input type="hidden" name="reply_parent_id" value="${commentIndex}">
            <textarea id="comment_textarea_comment_form_id_${commentIndex}" name="comment" class="comments-textarea" cols="46" rows="5" maxchars="500" onkeyup="updateCharCount('${commentIndex}')" onpaste="updateCharCount('${commentIndex}')" oninput="updateCharCount('${commentIndex}')"></textarea>
            <br>
            <div class="watch-comment-reply-form-actions"><input type="button" id="post-comment-${commentIndex}" name="add_comment_button" value="Post Comment" onclick="submitReply('${commentIndex}')">
            <input type="button" name="discard_comment_button" value="Discard" onclick="rmReply('${commentIndex}')">
            <span id="maxCharLabelcomment_form_id_${commentIndex}">Remaining character count: </span>
            <input readonly="true" class="watch-comment-char-count inner-box-colors" type="text" id="charCountcomment_form_id_${commentIndex}" value="500"></div>
        </form><br class="clear">
    </div>`
    },
    "commentSearchResult": function(comment, flags) {
        function atReply(name) {
            return `<a class="watch-comment-atlink" href="/comment_search?username=${name}">@${name}</a>`
        }
        let commentContent = comment.text
        if(commentContent.startsWith("@")) {
            // first word is a @ mention
            let at = commentContent.split(" ")[0]
            let username = at.replace("@", "")
            commentContent = atReply(username) + commentContent.replace(at, "")
        }
        let thumbUrl = utils.getThumbUrl(comment.video, flags)
        return `
    <div class="comment-result">
        <div class="comment-result-video">
            <div class="v90WideEntry">
                <div class="v90WrapperOuter">
                    <div class="v90WrapperInner">
                        <a href="/watch?v=${comment.video}" class="video-thumb-link" rel="nofollow">
                            <img title="${comment.videoTitle || ""}" thumb="${thumbUrl}" src="${thumbUrl}" class="vimg90" alt="${comment.videoTitle || ""}">
                        </a>
                    </div>
                </div>
            </div>
            </a>
        </div>
        <div class="comment-facets">
            <div class="comment-snippet">
                <span class="comment-result-comment">
                    ${commentContent}
                </span>
            </div>
            <div class="comment-footer">posted ${comment.relativeTime} by <span class="comment-result-user"><a class="comment-user-link" href="/comment_search?username=${comment.author}">${comment.author}</a></span></div>
            <div class="comment-header ${!comment.videoTitle ? " hid" : ""}">on <span class="comment-result-title"><a href="/watch?v=${comment.video}">${comment.videoTitle || ""}</a></span></div>
            
            
        </div>
        <div class="clear"></div>
    </div>`
    },
    "csPager": function(pageNum, url, prev) {
        return `<a href="${url}" class="pagerNotCurrent" data-page="${pageNum}">${prev ? "Previous" : "Next"}</a>`
    },
    "watchpageTurn": function(posExclude) {
        return `
        <div id="lights-off-switch" class="reverse-tooltip-wrapper" style="z-index: 0;">
            <button id="watch-longform-lights-off" class="master-sprite ${posExclude ? "not-pos-exclude" : ""}" onclick="toggleLights(true);" onmouseover="showSimpleTooltip(this)" onmouseout="hideSimpleTooltip(this)"></button>
            <div class="reverse-tooltip-wrapper-box" style="display: none;">
                <div class="reverse-tooltip-box">Turn down the lights</div>
                <img class="reverse-tooltip-box-bot" src="/assets/site-assets/pixel-vfl73.gif">
            </div>
        </div>
        <div id="lights-on-switch" class="reverse-tooltip-wrapper" style="z-index: 0;">
            <button id="watch-longform-lights-on" class="master-sprite ${posExclude ? "not-pos-exclude" : ""}" onclick="toggleLights(true);" onmouseover="showSimpleTooltip(this)" onmouseout="hideSimpleTooltip(this)"></button>
            <div class="reverse-tooltip-wrapper-box" style="display: none;">
                <div class="reverse-tooltip-box">Turn up the lights</div>
                <img class="reverse-tooltip-box-bot" src="/assets/site-assets/pixel-vfl73.gif">
            </div>
        </div>`
    },
    "homepage_watched": `
    <div id="feedmodule-POP" class="feedmodule-anchor yt2009_mark_hid_if_needed">
        <div class="feedmodule-modheader" id="POP-titlebar">

            <div id="feed_popular">
                <div class="fm2-title-border-box-gray yt-rounded">
                    <div class="fm2-title">
                        <img class="img_feed_popular master-sprite fm2-icon" src="/assets/site-assets/pixel-vfl73.gif" />
                        <span class="fm2-titleText" id="feed_popular-titleText">lang_hp_watched</span>
                    </div>

                    <div class="feedmodule-preamble">
                        <a href="/videos?s=pop">lang_hp_viewall</a>
                    </div>
                    <div class="feedmodule-updown">
                        <span id="medit-POP" class="iyt-edit-link iyt-edit-link-gray">lang_hp_edit</span>
                        <span id="mup-POP" class="up-button" onclick="moveUp('watched')">
                        <img class="master-sprite img-php-up-arrow" src="/assets/site-assets/pixel-vfl73.gif" /></span>
                        <span id="mdown-POP" class="down-button" onclick="moveDown('watched')">
                        <img class="master-sprite img-php-down-arrow" src="/assets/site-assets/pixel-vfl73.gif"/></span>
                        <span id="mclose-POP" onclick="removeModule('watched')">
                        <img class="master-sprite img-php-close-button" src="/assets/site-assets/pixel-vfl73.gif" /></span>
                    </div>

                </div>
            </div>
        </div>

        <div class="clear feedmodule-border-gray yt-rounded" id="feed_popular-content">
            <div id="POP-data" class="feedmodule-data">
                <div class="feedmodule-body bigthumb-view">
                    <div class="feeditem-bigthumb super-large-video yt-uix-hovercard ">
                        <div style="font-size: 12px;" class="floatL">
                            <div class="feedmodule-thumbnail">
                                <div class="v220WideEntry">
                                    <div class="v220WrapperOuter">
                                        <div class="v220WrapperInner">
                                            <a class="video-thumb-link" href="/yt2009_watchednow0_watch" rel="nofollow"><img title="yt2009_watchednow0_title" src="/yt2009_watchednow0_thumbnail" class="vimg220 yt-uix-hovercard-target"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="feedmodule-singleform-info">
                            <div class="video-title"><a href="/yt2009_watchednow0_watch" class="yt-uix-hovercard-target" title="yt2009_watchednow0_title">yt2009_watchednow0_title</a></div>
                            <div>yt2009_watchednow0_views</div>
                            <div><nobr><a href="yt2009_watchednow0_uploader_url">yt2009_watchednow0_uploader_name</a></nobr></div>
                            <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></span></div>
                        </div>
                        <div class="spacer">&nbsp;</div>
                    </div>
                    <div class="feeditem-bigthumb normal-size-video yt-uix-hovercard ">
                        <div style="font-size: 12px;" class="floatL">
                            <div class="feedmodule-thumbnail">
                                <div class="v120WideEntry">
                                    <div class="v120WrapperOuter">
                                        <div class="v120WrapperInner"><a class="video-thumb-link" href="/yt2009_watchednow1_watch" rel="nofollow"><img title="yt2009_watchednow1_title" src="/yt2009_watchednow1_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="feedmodule-singleform-info">
                            <div class="video-title">
                            <a href="/yt2009_watchednow1_watch" class="yt-uix-hovercard-target">yt2009_watchednow1_title</a></div>
                            <div>yt2009_watchednow1_views</div>
                            <div><nobr><a href="yt2009_watchednow1_uploader_url">yt2009_watchednow1_uploader_name</a></nobr></div>
                            <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-4.5" title="4.5"></button></span></div>
                        </div>
                        <div class="spacer">&nbsp;</div>
                    </div>
                    <div class="feeditem-bigthumb normal-size-video yt-uix-hovercard ">
                        <div style="font-size: 12px;" class="floatL">
                            <div class="feedmodule-thumbnail">
                                <div class="v120WideEntry">
                                    <div class="v120WrapperOuter">
                                        <div class="v120WrapperInner"><a class="video-thumb-link" href="/yt2009_watchednow2_watch" rel="nofollow"><img title="yt2009_watchednow2_title" src="/yt2009_watchednow2_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="feedmodule-singleform-info">
                            <div class="video-title">
                            <a href="/yt2009_watchednow2_watch" class="yt-uix-hovercard-target">yt2009_watchednow2_title</a></div>
                            <div>yt2009_watchednow2_views</div>
                            <div><nobr><a href="yt2009_watchednow2_uploader_url">yt2009_watchednow2_uploader_name</a></nobr></div>
                            <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-4.5" title="4.5"></button></span></div>
                        </div>
                        <div class="spacer">&nbsp;</div>
                    </div>
                    <div class="feeditem-bigthumb normal-size-video yt-uix-hovercard ">
                        <div style="font-size: 12px;" class="floatL">
                            <div class="feedmodule-thumbnail">
                                <div class="v120WideEntry">
                                    <div class="v120WrapperOuter">
                                        <div class="v120WrapperInner"><a class="video-thumb-link" href="/yt2009_watchednow3_watch" rel="nofollow"><img title="yt2009_watchednow3_title" src="/yt2009_watchednow3_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="feedmodule-singleform-info">
                            <div class="video-title">
                            <a href="/yt2009_watchednow3_watch" class="yt-uix-hovercard-target">yt2009_watchednow3_title</a></div>
                            <div>yt2009_watchednow3_views</div>
                            <div><nobr><a href="yt2009_watchednow3_uploader_url">yt2009_watchednow3_uploader_name</a></nobr></div>
                            <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-4.5" title="4.5"></button></span></div>
                        </div>
                        <div class="spacer">&nbsp;</div>
                    </div>

                    <div class="spacer">&nbsp;</div>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>`,
    "homepage_featured": `
    <div id="feedmodule-PRO" class="feedmodule-anchor">
        <div class="feedmodule-modheader" id="PRO-titlebar">
            <div id="feed_promoted">
                <div class="fm2-title-border-box-blue yt-rounded">
                    <div class="fm2-title">
                        <img class="img_feed_promoted master-sprite fm2-icon" src="/assets/site-assets/pixel-vfl73.gif" />
                        <span class="fm2-titleText" id="feed_promoted-titleText">lang_hp_featured</span>
                    </div>

                    <div class="feedmodule-updown">
                        <span id="mup-PRO" class="up-button" onclick="moveUp('featured')">
                        <img class="master-sprite img-php-up-arrow" src="/assets/site-assets/pixel-vfl73.gif"/></span>
                        <span id="mdown-PRO" class="down-button" onclick="moveDown('featured')">
                        <img class="master-sprite img-php-down-arrow" src="/assets/site-assets/pixel-vfl73.gif" /></span>
                        <span id="mclose-PRO" onclick="removeModule('featured')">
                        <img class="master-sprite img-php-close-button" src="/assets/site-assets/pixel-vfl73.gif"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="clear feedmodule-border-blue yt-rounded" id="feed_promoted-content">
            <div id="PRO-data" class="feedmodule-data">

                <div class="feedmodule-body grid-view">
                    <div class="clearL">

                        <div class="video-cell" style="width:24.5%">
                            <div class="video-entry yt-uix-hovercard">
                                <div class="v120WideEntry">
                                    <div class="v120WrapperOuter">
                                        <div class="v120WrapperInner"><a class="video-thumb-link yt2009_f" href="/yt2009_featured0_watch" rel="nofollow"><img title="yt2009_featured0_title" src="/yt2009_featured0_thumbnail"></a>
                                            <div class="video-time"><a href="/yt2009_featured0_watch" rel="nofollow">yt2009_featured0_time</a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="video-main-content">
                                    <div class="video-title ">
                                        <div class="video-short-title">
                                            <a href="/yt2009_featured0_watch" class="yt-uix-hovercard-target" title="yt2009_featured0_title" rel="nofollow">yt2009_featured0_title</a>
                                        </div>
                                    </div>
                                    <div class="video-facets">
                                        <span class="video-rating-list "><div><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></div></span>
                                        <span class="video-view-count">yt2009_featured0_views</span>
                                        <span class="video-rating-grid ">
                                        <div><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></div>
                                        </span>
                                        <span class="video-username"><a class="hLink" href="yt2009_featured0_uploader_url">yt2009_featured0_uploader_name</a></span>
                                    </div>
                                </div>
                                <div class="video-clear-list-left"></div>
                            </div>
                        </div>

                        <div class="video-cell" style="width:24.5%">
                            <div class="video-entry yt-uix-hovercard">
                                <div class="v120WideEntry">
                                    <div class="v120WrapperOuter">
                                        <div class="v120WrapperInner"><a class="video-thumb-link yt2009_f" href="/yt2009_featured1_watch" rel="nofollow"><img title="yt2009_featured1_title" src="/yt2009_featured1_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                            <div class="video-time"><a href="/yt2009_featured1_watch" rel="nofollow">yt2009_featured1_time</a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="video-main-content">
                                    <div class="video-title ">
                                        <div class="video-short-title">
                                            <a href="/yt2009_featured1_watch" class="yt-uix-hovercard-target"  rel="nofollow">yt2009_featured1_title</a>
                                        </div>
                                    </div>
                                    <div class="video-facets">
                                        <span class="video-rating-list "><div><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></div></span>
                                        <span class="video-view-count">yt2009_featured1_views</span>
                                        <span class="video-rating-grid ">
                                        <div><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></div>
                                        </span>
                                        <span class="video-username"><a class="hLink" href="yt2009_featured1_uploader_url">yt2009_featured1_uploader_name</a></span>
                                    </div>
                                </div>
                                <div class="video-clear-list-left"></div>
                            </div>
                        </div>

                        <div class="video-cell" style="width:24.5%">
                            <div class="video-entry yt-uix-hovercard">
                                <div class="v120WideEntry">
                                    <div class="v120WrapperOuter">
                                        <div class="v120WrapperInner"><a class="video-thumb-link yt2009_f" href="/yt2009_featured2_watch" rel="nofollow"><img title="yt2009_featured2_title" src="/yt2009_featured2_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                            <div class="video-time"><a href="/yt2009_featured2_watch" rel="nofollow">yt2009_featured2_time</a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="video-main-content">
                                    <div class="video-title ">
                                        <div class="video-short-title">
                                            <a href="/yt2009_featured2_watch" class="yt-uix-hovercard-target"  rel="nofollow">yt2009_featured2_title</a>
                                        </div>
                                    </div>
                                    <div class="video-facets">
                                        <span class="video-rating-list "><div><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></div></span>
                                        <span class="video-view-count">yt2009_featured2_views</span>
                                        <span class="video-rating-grid ">
                                        <div><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></div>
                                        </span>
                                        <span class="video-username"><a class="hLink" href="yt2009_featured2_uploader_url">yt2009_featured2_uploader_name</a></span>
                                    </div>
                                </div>
                                <div class="video-clear-list-left"></div>
                            </div>
                        </div>

                        <div class="video-cell" style="width:24.5%">
                            <div class="video-entry yt-uix-hovercard">
                                <div class="v120WideEntry">
                                    <div class="v120WrapperOuter">
                                        <div class="v120WrapperInner"><a class="video-thumb-link yt2009_f" href="/yt2009_featured3_watch" rel="nofollow"><img  src="/yt2009_featured3_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                            <div class="video-time"><a href="/yt2009_featured3_watch" rel="nofollow">yt2009_featured3_time</a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="video-main-content">
                                    <div class="video-title ">
                                        <div class="video-short-title">
                                            <a href="/yt2009_featured3_watch" class="yt-uix-hovercard-target"  rel="nofollow">yt2009_featured3_title</a>
                                        </div>
                                    </div>
                                    <div class="video-facets">
                                        <span class="video-rating-list "><div><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></div></span>
                                        <span class="video-view-count">yt2009_featured3_views</span>
                                        <span class="video-rating-grid ">
                                        <div><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></div>
                                        </span>
                                        <span class="video-username"><a class="hLink" href="yt2009_featured3_uploader_url">yt2009_featured3_uploader_name</a></span>
                                    </div>
                                </div>
                                <div class="video-clear-list-left"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>`,
    "homepage_mostpopular": `
    <div id="feedmodule-TOP" class="feedmodule-anchor">
        <div class="feedmodule-modheader" id="TOP-titlebar">

            <div id="feed_top_videos">
                <div class="fm2-title-border-box-gray yt-rounded">
                    <div class="fm2-title">
                        <img class="img_feed_top_videos master-sprite fm2-icon" src="/assets/site-assets/pixel-vfl73.gif" />
                        <span class="fm2-titleText" id="feed_top_videos-titleText">lang_hp_pop</span>
                    </div>

                    <div class="feedmodule-preamble">
                        <a href="/videos?s=pop">lang_hp_viewall</a>
                    </div>
                    <div class="feedmodule-updown">
                        <span id="mup-TOP" class="up-button" onclick="moveUp('pop')">
                        <img class="master-sprite img-php-up-arrow" src="/assets/site-assets/pixel-vfl73.gif" /></span>
                        <span id="mdown-TOP" class="down-button" onclick="moveDown('pop')">
                        <img class="master-sprite img-php-down-arrow" src="/assets/site-assets/pixel-vfl73.gif" /></span>
                        <span id="mclose-TOP" onclick="removeModule('pop')">
                        <img class="master-sprite img-php-close-button" src="/assets/site-assets/pixel-vfl73.gif" /></span>
                    </div>

                </div>
            </div>
        </div>

        <div class="clear feedmodule-border-gray yt-rounded" id="feed_top_videos-content">
            <div id="TOP-data" class="feedmodule-data">

                <div class="feedmodule-body compressed-view">
                    <div class="feeditem-compressed">
                        <div class="feeditem-compressed-category-title">
                            <div>
                                <a class="hLink" href="/videos?c=24">lang_cat_entertainment</a>
                            </div>
                        </div>

                        <div class="TOP-data compressed-form-content yt-uix-hovercard">
                            <div class="clear">
                                <div class="feedmodule-thumbnail">
                                    <div class="v120WideEntry">
                                        <div class="v120WrapperOuter">
                                            <div class="v120WrapperInner"><a class="video-thumb-link" href="/yt2009_entertainment_watch" rel="nofollow"><img  src="/yt2009_entertainment_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                                <div class="video-time"><a href="/yt2009_entertainment_watch" rel="nofollow">yt2009_entertainment_time</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="feedmodule-singleform-info">
                                    <div class="video-title"><a href="/yt2009_entertainment_watch" class="yt-uix-hovercard-target" >yt2009_entertainment_title</a></div>
                                    <div>yt2009_entertainment_views</div>
                                    <div><nobr><a href="yt2009_entertainment_uploader_url">yt2009_entertainment_uploader_name</a></nobr></div>
                                    <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></span></div>
                                </div>
                                <div class="spacer">&nbsp;</div>
                            </div>
                        </div>

                        <div class="spacer">&nbsp;</div>
                    </div>
                    <div class="feeditem-compressed">
                        <div class="feeditem-compressed-category-title">
                            <div>
                                <a class="hLink" href="/videos?c=31">lang_cat_music</a>
                            </div>
                        </div>

                        <div class="TOP-data compressed-form-content yt-uix-hovercard">
                            <div class="clear">
                                <div class="feedmodule-thumbnail">
                                    <div class="v120WideEntry">
                                        <div class="v120WrapperOuter">
                                            <div class="v120WrapperInner"><a class="video-thumb-link" href="/yt2009_music_watch" rel="nofollow"><img title="yt2009_music_title" src="/yt2009_music_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                                <div class="video-time"><a href="/yt2009_music_watch" rel="nofollow">yt2009_music_time</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="feedmodule-singleform-info">
                                    <div class="video-title"><a href="/yt2009_music_watch" class="yt-uix-hovercard-target" title="yt2009_music_title">yt2009_music_title</a></div>
                                    <div>yt2009_music_views</div>
                                    <div><nobr><a href="yt2009_music_uploader_url">yt2009_music_uploader_name</a></nobr></div>
                                    <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></span></div>
                                </div>
                                <div class="spacer">&nbsp;</div>
                            </div>
                        </div>

                        <div class="spacer">&nbsp;</div>
                    </div>
                    <div class="feeditem-compressed">
                        <div class="feeditem-compressed-category-title">
                            <div>
                                <a class="hLink" href="/videos?c=32">lang_cat_news</a>
                            </div>
                        </div>

                        <div class="TOP-data compressed-form-content yt-uix-hovercard">
                            <div class="clear">
                                <div class="feedmodule-thumbnail">
                                    <div class="v120WideEntry">
                                        <div class="v120WrapperOuter">
                                            <div class="v120WrapperInner"><a class="video-thumb-link" href="/yt2009_news_watch" rel="nofollow"><img title="yt2009_news_title" src="/yt2009_news_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                                <div class="video-time"><a href="/yt2009_news_watch" rel="nofollow">yt2009_news_time</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="feedmodule-singleform-info">
                                    <div class="video-title"><a href="/yt2009_news_watch" class="yt-uix-hovercard-target" title="yt2009_news_title">yt2009_news_title</a></div>
                                    <div>yt2009_news_views</div>
                                    <div><nobr><a href="yt2009_news_uploader_url">yt2009_news_uploader_name</a></nobr></div>
                                    <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></span></div>
                                </div>
                                <div class="spacer">&nbsp;</div>
                            </div>
                        </div>

                        <div class="spacer">&nbsp;</div>
                    </div>
                    <div class="feeditem-compressed">
                        <div class="feeditem-compressed-category-title">
                            <div>
                                <a class="hLink" href="/videos?c=1">lang_cat_film</a>
                            </div>
                        </div>

                        <div class="TOP-data compressed-form-content yt-uix-hovercard">
                            <div class="clear">
                                <div class="feedmodule-thumbnail">
                                    <div class="v120WideEntry">
                                        <div class="v120WrapperOuter">
                                            <div class="v120WrapperInner"><a class="video-thumb-link" href="/yt2009_film_animation_watch" rel="nofollow"><img title="yt2009_film_animation_title" src="/yt2009_film_animation_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                                <div class="video-time"><a href="/yt2009_film_animation_watch" rel="nofollow">yt2009_film_animation_time</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="feedmodule-singleform-info">
                                    <div class="video-title"><a href="/yt2009_film_animation_watch" class="yt-uix-hovercard-target" title="yt2009_film_animation_title">yt2009_film_animation_title</a></div>
                                    <div>yt2009_film_animation_views</div>
                                    <div><nobr><a href="yt2009_film_animation_uploader_url">yt2009_film_animation_uploader_name</a></nobr></div>
                                    <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></span></div>
                                </div>
                                <div class="spacer">&nbsp;</div>
                            </div>
                        </div>

                        <div class="spacer">&nbsp;</div>
                    </div>
                    <div class="feeditem-compressed">
                        <div class="feeditem-compressed-category-title">
                            <div>
                                <a class="hLink" href="/videos?c=30">lang_cat_sports</a>
                            </div>
                        </div>

                        <div class="TOP-data compressed-form-content yt-uix-hovercard">
                            <div class="clear">
                                <div class="feedmodule-thumbnail">
                                    <div class="v120WideEntry">
                                        <div class="v120WrapperOuter">
                                            <div class="v120WrapperInner"><a class="video-thumb-link" href="/yt2009_sports_watch" rel="nofollow"><img title="yt2009_sports_title" src="/yt2009_sports_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                                <div class="video-time"><a href="/yt2009_sports_watch" rel="nofollow">yt2009_sports_time</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="feedmodule-singleform-info">
                                    <div class="video-title"><a href="/yt2009_sports_watch" class="yt-uix-hovercard-target" title="yt2009_sports_title">yt2009_sports_title</a></div>
                                    <div>yt2009_sports_views</div>
                                    <div><nobr><a href="yt2009_sports_uploader_url">yt2009_sports_uploader_name</a></nobr></div>
                                    <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></span></div>
                                </div>
                                <div class="spacer">&nbsp;</div>
                            </div>
                        </div>

                        <div class="spacer">&nbsp;</div>
                    </div>
                    <div class="feeditem-compressed">
                        <div class="feeditem-compressed-category-title">
                            <div>
                                <a class="hLink" href="/videos?c=26">lang_cat_howto</a>
                            </div>
                        </div>

                        <div class="TOP-data compressed-form-content yt-uix-hovercard">
                            <div class="clear">
                                <div class="feedmodule-thumbnail">
                                    <div class="v120WideEntry">
                                        <div class="v120WrapperOuter">
                                            <div class="v120WrapperInner"><a class="video-thumb-link" href="/yt2009_howto_style_watch" rel="nofollow"><img title="yt2009_howto_style_title" src="/yt2009_howto_style_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                                <div class="video-time"><a href="/yt2009_howto_style_watch" rel="nofollow">yt2009_howto_style_time</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="feedmodule-singleform-info">
                                    <div class="video-title"><a href="/yt2009_howto_style_watch" class="yt-uix-hovercard-target" title="yt2009_howto_style_title">yt2009_howto_style_title</a></div>
                                    <div>yt2009_howto_style_views</div>
                                    <div><nobr><a href="yt2009_howto_style_uploader_url">yt2009_howto_style_uploader_name</a></nobr></div>
                                    <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></span></div>
                                </div>
                                <div class="spacer">&nbsp;</div>
                            </div>
                        </div>

                        <div class="spacer">&nbsp;</div>
                    </div>
                    <div class="feeditem-compressed">
                        <div class="feeditem-compressed-category-title">
                            <div>
                                <a class="hLink" href="/videos?c=28">lang_cat_sci</a>
                            </div>
                        </div>

                        <div class="TOP-data compressed-form-content yt-uix-hovercard">
                            <div class="clear">
                                <div class="feedmodule-thumbnail">
                                    <div class="v120WideEntry">
                                        <div class="v120WrapperOuter">
                                            <div class="v120WrapperInner"><a class="video-thumb-link" href="/yt2009_science_technology_watch" rel="nofollow"><img title="yt2009_science_technology_title" src="/yt2009_science_technology_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                                <div class="video-time"><a href="/yt2009_science_technology_watch" rel="nofollow">yt2009_science_technology_time</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="feedmodule-singleform-info">
                                    <div class="video-title"><a href="/yt2009_science_technology_watch" class="yt-uix-hovercard-target" title="yt2009_science_technology_title">yt2009_science_technology_title</a></div>
                                    <div>yt2009_science_technology_views</div>
                                    <div><nobr><a href="yt2009_science_technology_uploader_url">yt2009_science_technology_uploader_name</a></nobr></div>
                                    <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></span></div>
                                </div>
                                <div class="spacer">&nbsp;</div>
                            </div>
                        </div>

                        <div class="spacer">&nbsp;</div>
                    </div>
                    <div class="feeditem-compressed">
                        <div class="feeditem-compressed-category-title">
                            <div>
                                <a class="hLink" href="/videos?c=33">lang_cat_gaming</a>
                            </div>
                        </div>

                        <div class="TOP-data compressed-form-content yt-uix-hovercard">
                            <div class="clear">
                                <div class="feedmodule-thumbnail">
                                    <div class="v120WideEntry">
                                        <div class="v120WrapperOuter">
                                            <div class="v120WrapperInner"><a class="video-thumb-link" href="/yt2009_gaming_watch" rel="nofollow"><img  src="/yt2009_gaming_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                                <div class="video-time"><a href="/yt2009_gaming_watch" rel="nofollow">yt2009_gaming_time</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="feedmodule-singleform-info">
                                    <div class="video-title"><a href="/yt2009_gaming_watch" class="yt-uix-hovercard-target" title="yt2009_gaming_title">yt2009_gaming_title</a></div>
                                    <div>yt2009_gaming_views</div>
                                    <div><nobr><a href="yt2009_gaming_uploader_url">yt2009_gaming_uploader_name</a></nobr></div>
                                    <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></span></div>
                                </div>
                                <div class="spacer">&nbsp;</div>
                            </div>
                        </div>

                        <div class="spacer">&nbsp;</div>
                    </div>
                    <!--<div class="feeditem-compressed">
                        <div class="feeditem-compressed-category-title">
                            <div>
                                <a class="hLink" href="/videos?s=mp">Most Viewed</a>
                            </div>
                        </div>

                        <div class="TOP-data compressed-form-content yt-uix-hovercard">
                            <div class="clear">
                                <div class="feedmodule-thumbnail">
                                    <div class="v120WideEntry">
                                        <div class="v120WrapperOuter">
                                            <div class="v120WrapperInner"><a class="video-thumb-link" href="/yt2009_watch" rel="nofollow"><img  src="/yt2009_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                                <div class="video-time"><a href="/yt2009_watch" rel="nofollow">yt2009_time</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="feedmodule-singleform-info">
                                    <div class="video-title"><a href="/yt2009_watch" class="yt-uix-hovercard-target" >yt2009_title</a></div>
                                    <div>yt2009_views</div>
                                    <div><nobr><a href="yt2009_uploader_url">yt2009_uploader_name</a></nobr></div>
                                    <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></span></div>
                                </div>
                                <div class="spacer">&nbsp;</div>
                            </div>
                        </div>

                        <div class="spacer">&nbsp;</div>
                    </div>-->
                    <div class="feeditem-compressed">
                        <div class="feeditem-compressed-category-title">
                            <div>
                                <a class="hLink" href="#">lang_cat_fav</a>
                            </div>
                        </div>

                        <div class="TOP-data compressed-form-content yt-uix-hovercard">
                            <div class="clear">
                                <div class="feedmodule-thumbnail">
                                    <div class="v120WideEntry">
                                        <div class="v120WrapperOuter">
                                            <div class="v120WrapperInner"><a class="video-thumb-link" href="/yt2009_top_favorited_watch" rel="nofollow"><img  src="/yt2009_top_favorited_thumbnail" class="vimg120 yt-uix-hovercard-target"></a>
                                                <div class="video-time"><a href="/yt2009_top_favorited_watch" rel="nofollow">yt2009_top_favorited_time</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="feedmodule-singleform-info">
                                    <div class="video-title"><a href="/yt2009_top_favorited_watch" class="yt-uix-hovercard-target" title="yt2009_top_favorited_title">yt2009_top_favorited_title</a></div>
                                    <div>yt2009_top_favorited_views</div>
                                    <div><nobr><a href="yt2009_top_favorited_uploader_url">yt2009_top_favorited_uploader_name</a></nobr></div>
                                    <div class="feedmodule-singleform-info-ratings"><span><button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button></span></div>
                                </div>
                                <div class="spacer">&nbsp;</div>
                            </div>
                        </div>

                        <div class="spacer">&nbsp;</div>
                    </div>
                    <div class="spacer">&nbsp;</div>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>`,
    "homepage_inbox": `
    <div class="homepage-side-block hid yt2009-login-only-box">
        <div id="stat-module-wrapper-statmodules_inbox" class="opened">
            <div id="statmodules_inbox">
                <div class="statModule-title fm2-title-border-box-gray yt-rounded" id="statmodules_inbox-title">
                    <span class="statModule-titleText" id="statmodules_inbox-titleText">lang_hp_inbox</span>
                </div>
            </div>

            <div class="module-item-wrapper yt-rounded feedmodule-border-gray" id="statmodules_inbox-content">
                <div class="statModule-item-line">
                    <div class="statModule-item-text">
                        <button class="master-sprite img-general-messages yt2009-side-icon"></button>
                        <a href="/inbox">lang_hp_messages_prefix0 lang_hp_messages</a>
                    </div>
                </div>
                <div class="statModule-item-line">
                    <div class="statModule-item-text">
                        <button class="master-sprite img-received-videos yt2009-side-icon"></button>
                        <a href="/inbox?folder=videos&amp;action_message=1">lang_hp_shared_prefix0 lang_hp_shared</a>
                    </div>
                </div>
                <div class="statModule-item-line">
                    <div class="statModule-item-text">
                        <button class="master-sprite img-comments yt2009-side-icon"></button>
                        <a href="/inbox?folder=comments&amp;action_message=1">lang_hp_comments_prefix0 lang_hp_comments</a>
                    </div>
                </div>
                <div class="statModule-item-line">
                    <div class="statModule-item-text">
                        <button class="master-sprite img-viewers yt2009-side-icon" style="margin-right: 14px;"></button>
                        <a href="/inbox?folder=invites&amp;action_message=1">lang_hp_friend_inv_prefix0 lang_hp_friend_inv</a>
                    </div>
                </div>
                <div class="statModule-item-line">
                    <div class="statModule-item-text">
                        <button class="master-sprite img-video-responses yt2009-side-icon"></button>
                        <a href="/inbox?folder=responses&amp;action_message=1">lang_hp_video_responses_prefix0 lang_hp_video_responses</a>
                    </div>
                </div>
                <div class="statModule-item-line">
                    <div style="text-align: right; margin-top: 2px;">
                        <a href="/inbox?action_compose=1">lang_hp_msg_compose</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>`,
    "homepage_friendtivity": `
    <div id="feedmodule-FRI" class="feedmodule-anchor">
        <div class="feedmodule-modheader" id="FRI-titlebar">
            <div id="feed_activity">
                <div class="fm2-title-border-box-gray yt-rounded">
                    <div class="fm2-title">
                        <img src="/assets/site-assets/pixel-vfl73.gif" class="img_feed_friendtivity master-sprite fm2-icon">
                        <span class="fm2-titleText" id="feed_friendtivity-titleText">Recent Activity</span>
                    </div>
                    <div class="feedmodule-updown">
                        <span id="mup-FRI" class="up-button" onclick="moveUp('activity')">
                            <img class="master-sprite img-php-up-arrow" src="/assets/site-assets/pixel-vfl73.gif">
                        </span>
                        <span id="mdown-FRI" class="down-button" onclick="moveDown('activity')">
                            <img class="master-sprite img-php-down-arrow" src="/assets/site-assets/pixel-vfl73.gif">
                        </span>
                        <span id="mclose-FRI" onclick="removeModule('activity')">
                            <img class="master-sprite img-php-close-button" src="/assets/site-assets/pixel-vfl73.gif">
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="clear feedmodule-border-gray yt-rounded" id="feed_friendtivity-content">
            <div id="FRI-data" class="feedmodule-data">
                <div class="feedmodule-body list-view">
                    fri-data_fill
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>`,
    "friendtivity_comment": function(video, comment_author, comment_content, flags) {
        /*id, title, description, upload, viewcount,
                                    authorurl, authorname, vidlength,*/
        let upload = utils.unixToRelative(new Date(video.upload).getTime())
        if(new Date(video.upload).getFullYear() <= 2010) {
            upload = utils.unixToRelative(
                new Date(video.upload).getTime(), new Date("2010-01-01").getTime()
            )
        } else if(new Date(video.upload).getFullYear() <= 2013) {
            upload = utils.unixToRelative(
                new Date(video.upload).getTime(), new Date("2014-01-01").getTime()
            )
        }

        let author = video.author_handle
        if(!author
        && flags.includes("remove_username_space")) {
            comment_author = comment_author.split(" ").join("")
            video = JSON.parse(JSON.stringify(video))
            video.author_name = video.author_name.split(" ").join("")
        } else if(!author
        && flags.includes("username_asciify")) {
            comment_author = utils.asciify(comment_author)
            video = JSON.parse(JSON.stringify(video))
            video.author_name = utils.asciify(video.author_name)
        }

        let viewCount = video.viewCount
        if(flags.includes("realistic_view_count")
        && viewCount > 100000) {
            viewCount = Math.floor(viewCount / 90)
        }
        viewCount = utils.countBreakup(viewCount) + " views"

        let thumbUrl = utils.getThumbUrl(video.id, flags)
        return `
        <div class="video-cell" data-id="${video.id}">
            <div class="feedmodule-smtitle-wrapper" style="margin-bottom: 0px;">
                <div class="feedmodule-smtitle">
                    <span style="display: inline-block;" class="feed_icon_img icon-COM master-sprite"></span>
                    <div class="comment-header" style="display: inline-block;"><a href="/comment_search?username=${comment_author}">${comment_author}</a> commented on a video</div>
                </div>
            </div>
        
            <div class="feedmodule-cmt">"${comment_content}"</div>
            <div class="video-entry yt-uix-hovercard feedmodule-cmt-vid">
                <div class="v90WideEntry">
                    <div class="v90WrapperOuter">
                        <div class="v90WrapperInner"><a id="video-url-${video.id}" class="video-thumb-link" href="/watch?v=${video.id}" rel="nofollow"><img title="vititle" src="${thumbUrl}" class="vimg90 yt-uix-hovercard-target"></a>
                            <div id="quicklist-icon-${video.id}" class="addtoQL90"><a id="add-to-quicklist-${video.id}" href="#" ql="${video.id}" title="Add Video to QuickList" onclick="addToQuicklist('${video.id}', '${video.title.split('"').join("&quot;")}', '${author}')"><button class="master-sprite QLIconImg" title=""></button></a>
                                <div class="hid quicklist-inlist"><a href="/my_quicklist">Added to <br> QuickList</a></div>
                            </div>
                            <div class="video-time"><a id="video-run-time-${video.id}" href="/watch?v=${video.id}" rel="nofollow">${utils.seconds_to_time(video.length)}</a></div>
                        </div>
                    </div>
                </div>
                <div class="video-main-content" id="video-main-content-${video.id}">
                    <div class="video-long-title">
                        <a id="video-short-title-${video.id}" href="/watch?v=${video.id}" class="yt-uix-hovercard-target" title="${video.title.split('"').join("&quot;")}" rel="nofollow">${utils.xss(video.title)}</a>
                    </div>
                    <div class="video-description">${video.description.length > 100 ? (video.description.substring(0, 100) + "...") : video.description}</div>
                    <div class="video-facets">
                        <span id="video-average-rating-${video.id}" class="video-rating-list ">
                            <div>
                                <button class="master-sprite ratingVS ratingVS-4.5" title="4.5"></button>
                            </div>
                        </span>
                        <span id="video-added-time-${video.id}" class="video-date-added">${upload}</span>
                        <span id="video-num-views-${video.id}" class="video-view-count">${viewCount}</span>
                        <span id="video-average-rating-${video.id}" class="video-rating-grid ">
                            <div>
                                <button class="master-sprite ratingVS ratingVS-4.5" title="4.5"></button>
                            </div>
                        </span>
                        <span class="video-username"><a id="video-from-username-${video.id}" class="hLink" href="${video.author_url}">${author}</a></span>
                    </div>
                </div>
                <div class="video-clear-list-left"></div>
            </div>
        </div>`
    },
    "homepage_nearyou": `
    <div id="feedmodule-GEO" class="feedmodule-anchor">
        <div class="feedmodule-modheader" id="GEO-titlebar">
            <div id="feed_hometown">
                <div class="fm2-title-border-box-gray yt-rounded">
                    <div class="fm2-title">
                        <img class="homepage-sprite img_feed_hometown fmt2-icon" src="/assets/site-assets/pixel-vfl73.gif">
                        <span class="fm2-titleText" id="feed_hometown-titleText">Videos Near You</span>
                    </div>
                    <div class="feedmodule-updown">
                        <span id="mup-GEO" class="up-button" onclick="moveUp('nearyou')">
                            <img class="master-sprite img-php-up-arrow" src="/assets/site-assets/pixel-vfl73.gif">
                        </span>
                        <span id="mdown-GEO" class="down-button" onclick="moveDown('nearyou')">
                            <img class="master-sprite img-php-down-arrow"  src="/assets/site-assets/pixel-vfl73.gif">
                        </span>
                        <span id="mclose-GEO" onclick="removeModule('nearyou')">
                            <img class="master-sprite img-php-close-button" src="/assets/site-assets/pixel-vfl73.gif">
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="clear feedmodule-border-gray yt-rounded" id="feed_hometown-content">
            <div id="GEO-data" class="feedmodule-data">
                <div class="feedmodule-body grid-view">
                    <div id="hometown-loading-sprite"><img src="/assets/site-assets/icn_loading_animated-vfl24663.gif" style="margin-left: 310px;margin-top: 30px;margin-bottom: 30px;"></div>
                    <div class="clearL yt2009-cells-container" id="yt2009-hometown-cells-container">
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>`,
    "regions": [
        ["US", "Worldwide (All)", "en_US"],
        ["DE", "Germany", "de_DE"],
        ["NZ", "New Zealand", "en_NZ"],
        ["CA", "Canada", "en_CA"],
        ["UK", "UK", "en_GB"],
        ["IE", "Ireland", "en_IE"],
        ["AU", "Australia", "en_AU"],
        ["ES", "Spain", "es_ES"],
        ["MX", "Mexico", "es_MX"],
        ["FR", "France", "fr_FR"],
        ["IT", "Italy", "it_IT"],
        ["JP", "Japan", "ja_JP"],
        ["NL", "Netherlands", "nl_NL"],
        ["PL", "Poland", "pl_PL"],
        ["BR", "Brazil", "pt_BR"],
        ["RU", "Russia", "ru_RU"],
        ["HK", "Hong Kong", "zh_HK"],
        ["TW", "Taiwan", "zh_TW"],
        ["KR", "South Korea", "ko_KR"],
        ["IN", "India", "en_IN"],
        ["IL", "Israel", "en_IL"],
        ["CZ", "Czech Republic", "cs_CZ"],
        ["SE", "Sweden", "sv_SE"]
    ],
    "locPickerLoc": function(code, name, flagcode) {
        return `
                <div class="flag-div">
                    <a href="#" onclick="setLoc('${code}'); return false;">
                        <img id="flag_${flagcode}" src="/assets/site-assets/pixel-vfl73.gif" class="flag_${flagcode}" alt="" width="17" height="11">
                        ${name}
                    </a>
                </div>`
    },
    "locPickerBase": `
    <div id="region-picker">
        <div class="picker-top" style="">
            <h2>Choose your content location</h2><br>
            <p style="clear: left;">Choose which country or region's content (videos and channels) you would like to view. This will not change the language of the site.</p>
            <div class="box-close-link">
                <img onclick="closeLangPicker()" src="/assets/site-assets/pixel-vfl73.gif" alt="Close">
            </div>
            <div class="clearR"></div>
        </div>
        <div class="flag-list">
            <div class="flag-bucket">
                <!--yt2009_bucket_1-->
            </div>
            <div class="flag-bucket">
                <!--yt2009_bucket_2-->
            </div>
            <div class="flag-bucket">
                <!--yt2009_bucket_3-->
            </div>
            <div class="flag-bucket">
                <!--yt2009_bucket_4-->
            </div>
            <div class="flag-bucket">
                <!--yt2009_bucket_5-->
            </div>
            <div class="spacer">&nbsp;</div>
        </div>
    </div>`,
    "homepage_subs": `
    <div id="feedmodule-SUB" class="feedmodule-anchor">
        <div class="feedmodule-modheader" id="SUB-titlebar">
            <div id="feed_subscriptions">
                <div class="fm2-title-border-box-gray yt-rounded">
                    <div class="fm2-title">
                        <img class="master-sprite img_feed_subscriptions" src="/assets/site-assets/pixel-vfl73.gif">
                        <span class="fm2-titleText" id="feed_subscriptions-titleText">Subscriptions</span>
                    </div>
                    <div class="feedmodule-updown">
                        <span id="mup-SUB" class="up-button" onclick="moveUp('latest')">
                            <img class="master-sprite img-php-up-arrow" src="/assets/site-assets/pixel-vfl73.gif">
                        </span>
                        <span id="mdown-SUB" class="down-button" onclick="moveDown('latest')">
                            <img class="master-sprite img-php-down-arrow"  src="/assets/site-assets/pixel-vfl73.gif">
                        </span>
                        <span id="mclose-SUB" onclick="removeModule('latest')">
                            <img class="master-sprite img-php-close-button" src="/assets/site-assets/pixel-vfl73.gif">
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="clear feedmodule-border-gray yt-rounded" id="feed_subscriptions-content">
            <div id="GEO-data" class="feedmodule-data">
                <div class="feedmodule-body grid-view">
                    <div id="subscriptions-loading-sprite"><img src="/assets/site-assets/icn_loading_animated-vfl24663.gif" style="margin-left: 310px;margin-top: 30px;margin-bottom: 30px;"></div>
                    <div class="clearL yt2009-cells-container" id="yt2009-subscriptions-cells-container">
                    </div>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>`,

    // stats and data data
    "leadin_stats": function(views) {
        return `
        <div id="watch-actions-stats" class="watch-actions-stats">
            <div class="stats-header">
                <b>Total Views: ${views}</b>
            </div>`
    },

    "table_stats_start": `
    <b class="sep">Links</b>
    <table id="watch-tab-stats-links-table">
        <tr id="watch-tab-stats-entry">
            <th class="letter"> </th>
            <th class="date">Date</th>
            <th class="link">Link</th>
            <th class="views">Views</th>
        </tr>
    `,

    "table_stats_entry": function(i, letter, dateScale) {
        let displayHTML = ""
        switch(i.type) {
            case "ref-found-search": {
                displayHTML = i.display_header + `<a href="/results?search_query=${encodeURIComponent(i.query)}">${i.query}</a>`
                break;
            }
            case "first-ref-search": {
                displayHTML = i.display_header + `<a href="/watch?v=${i.video.id}">${i.video.title}</a>`
                break;
            }
            case "ref-video-response": {
                displayHTML = i.display_header + `<a href="/watch?v=${i.video.id}">${i.video.title}</a>`
                break;
            }
            case "viral": {
                displayHTML = "Other/Viral"
                break;
            }
        }
        if(dateScale) {
            let dateRange = [
                new Date(dateScale[0]).getTime(),
                new Date(dateScale[1]).getTime()
            ]
            let diff = (dateRange[1] - dateRange[0]) * dateScale[2]
            i.date = dateRange[0] + diff
        }
        return `
        <tr>
            <td><span class="leg">${letter}</span></td>
            <td>${utils.dateFormat(i.date)}</td>
            <td>${displayHTML}</td>
            <td class="views">${utils.countBreakup(i.approx_view)}</td>
        </tr>`
    },

    "table_stats_charts": function(rating) {
        let chartImgs = [
            ["/chart",
            "?cht=lc:nda&chs=70x15&chco=647b5c",
            "&chm=B,b6cfadaa,0,0,0&chd=t:0.0,60.0,75.0,90.0"].join(""),
            ["/chart",
            "?cht=lc:nda&chs=70x15&chco=647b5c",
            "&chm=B,b6cfadaa,0,0,0&chd=t:0.0,60.0,70.0,100.0"].join(""),
            ["/chart",
            "?cht=lc:nda&chs=70x15&chco=647b5c&chds=120",
            "&chm=B,b6cfadaa,0,0,0&chd=t:" + (rating * 20) + ".0," + (rating * 20) + ".0"].join("")
        ]

        return `
        <table id="watch-tab-stats-smaller-table">
            <tr>
                <th>Comments</th>
                <th>Favorites</th>
                <th>Ratings</th>
                <th>Average Rating</th>
            </tr>
            <tr>
                <td><img src="${chartImgs[0]}"/></td>
                <td><img src="${chartImgs[1]}"/></td>
                <td><img src="${chartImgs[1]}"/></td>
                <td><img src="${chartImgs[2]}"/></td>
            </tr>
        </table>`
    },

    "table_audiences_leadin": `
    <b class="sep">Audiences</b>
    <div id="watch-tab-stats-audiences-container">
        <div id="watch-tab-stats-audiences-age">
            <p>This video is most popular with:</p>
            <table id="watch-tab-stats-audiences-table">
                <tr id="watch-tab-stats-entry">
                    <th class="gender">Gender</th>
                    <th class="age">Age</th>
                </tr>`,

    "table_audiences_element": function(list) {
        let r = ""
        list.value.forEach(a => {
            r += 
                `<tr id="watch-tab-stats-entry">
                    <td>${a[0]}</td>
                    <td>${a[1]}</td>
                </tr>`
        })
        return r;
    },
    "table_audiences_end": `
            </table>
        </div>
        <div id="watch-tab-stats-audiences-countries">
            <p>This video is most popular in:</p>`,
    "map_audiences_end": `
        </div>
    </div>`,

    "map_audiences_empty": `<img width="350" height="170" id="stats-big-map-expanded" src="/chart?cht=t&chs=350x170&chtm=world&chd=t:&chf=bg,s,eff8fe&chco=f6f6f6,32501a&chld="/>`,

    "gdata_entryAuth": function(device) {
        let msg = `authorize with your yt2009 instance token at: http://${config.ip}:${config.port}/mobile/gdata_gen_auth_page?device=${device}`
        if(!device) {
            msg = `add a &token= param with your yt2009 instance token to continue`
        }
        return `
    <entry>
        <id>http://${config.ip}:${config.port}/feeds/api/videos/12345678901</id>
        <youTubeId id='12345678901'>12345678901</youTubeId>
        <published>${new Date().toISOString()}</published>
        <updated>${new Date().toISOString()}</updated>
        <category scheme="http://gdata.youtube.com/schemas/2007/categories.cat" label="-" term="-">-</category>
        <title type='text'>authorization required - open for more info</title>
        <content type='text'>${msg}</content>
        <link rel="http://gdata.youtube.com/schemas/2007#video.related" href="http://${config.ip}:${config.port}/feeds/api/videos/12345678901/related"/>
        <author>
            <name>auth_required</name>
            <uri>http://gdata.youtube.com/feeds/api/users/auth_required</uri>
        </author>
        <gd:comments>
            <gd:feedLink href='http://${config.ip}:${config.port}/feeds/api/videos/12345678901/comments' countHint='530'/>
        </gd:comments>
        <media:group>
            <media:category label='-' scheme='http://gdata.youtube.com/schemas/2007/categories.cat'>-</media:category>
            <media:content url='http://${config.ip}:${config.port}/assets/site-assets/black.mp4' type='video/3gpp' medium='video' expression='full' duration='25' yt:format='3'/>
            <media:description type='plain'>${msg}</media:description>
            <media:keywords>-</media:keywords>
            <media:player url='http://www.youtube.com/watch?v=12345678901'/>
            <media:thumbnail yt:name='hqdefault' url='http://i.ytimg.com/vi/Oz_7ZF6fQW4/hqdefault.jpg' height='240' width='320' time='00:00:00'/>
            <media:thumbnail yt:name='poster' url='http://i.ytimg.com/vi/Oz_7ZF6fQW4/0.jpg' height='240' width='320' time='00:00:00'/>
            <media:thumbnail yt:name='default' url='http://i.ytimg.com/vi/Oz_7ZF6fQW4/0.jpg' height='240' width='320' time='00:00:00'/>
            <yt:duration seconds='25'/>
            <yt:videoid id='12345678901'>12345678901</yt:videoid>
            <youTubeId id='12345678901'>12345678901</youTubeId>
            <media:credit role='uploader' name='auth_required'>auth_required</media:credit>
        </media:group>
        <gd:rating average='5' max='5' min='1' numRaters='1' rel='http://schemas.google.com/g/2005#overall'/>
        <yt:statistics favoriteCount="0" viewCount="0"/>
        <yt:rating numLikes="0" numDislikes="0"/>
    </entry>`
    },

    "gdata_subscriptionChannel": function(name, avatar, id, handle) {
        let fname = handle ? handle : utils.asciify(name)
        return `
        <entry>
            <category scheme='http://gdata.youtube.com/schemas/2007/subscriptiontypes.cat'
term='channel'/>
            <content type='application/atom+xml;type=feed' src='http://${config.ip}:${config.port}/feeds/api/users/${fname}/videos'/>
            <link rel='edit' href='http://${config.ip}:${config.port}/edit'/>
            <yt:username>${fname}</yt:username>
            <y9id>${id}</y9id>${avatar ? `
            <y9av>${avatar}</y9av>` : ""}
        </entry>`
    },

    "baseFeed_feedStart": function(feedName, videoCount) {
        return `<?xml version='1.0' encoding='UTF-8'?>
<rss xmlns:atom='http://www.w3.org/2005/Atom' xmlns:openSearch='http://a9.com/-/spec/opensearchrss/1.0/' version='2.0'>
    <channel>
        <description></description>
        <atom:id>http://gdata.youtube.com/feeds/base/standardfeeds/most_popular</atom:id>
        <lastBuildDate>${new Date().toString().split(" (")[0]}</lastBuildDate>
        <category domain='http://schemas.google.com/g/2005#kind'>http://gdata.youtube.com/schemas/2007#video</category>
        <title>${feedName}</title>
        <image>
            <url>http://www.youtube.com/img/pic_youtubelogo_123x63.gif</url>
            <title>${feedName}</title>
            <link>http://www.youtube.com/browse?s=bzb</link>
        </image>
        <link>http://www.youtube.com/browse?s=bzb</link>
        <managingEditor>YouTube</managingEditor>
        <generator>YouTube data API</generator>
        <openSearch:totalResults>${videoCount}</openSearch:totalResults>
        <openSearch:startIndex>1</openSearch:startIndex>
        <openSearch:itemsPerPage>${videoCount}</openSearch:itemsPerPage>`
    },

    "baseFeed_feedVideo": function(video, categoryNumber, notFeed) {
        function safeData(i, override) {
            i = i.split(">").join(override ? override : "&amp;gt;")
                 .split("<").join(override ? override : "&amp;lt;")
                 .split("&").join(override ? override : "&amp;")
                 .split("'").join("")
                 .split("\"").join(override ? override : "&quot;")
            return i;
        }

        let fcount = Math.round(parseInt(video.viewCount) / 15)
        if(parseInt(video.viewCount) > 100000) { 
            fcount = Math.round(parseInt(video.viewCount) / 90)
        }

        let description = `<div style="color: #000000;font-family: Arial, Helvetica, sans-serif; font-size:12px; font-size: 12px; width: 555px;">
            <table cellspacing="0" cellpadding="0" border="0">
                <tbody>
                    <tr>
                        <td width="140" valign="top" rowspan="2">
                            <div style="border: 1px solid #999999; margin: 0px 10px 5px 0px;"><a href="http://${config.ip}:${config.port}/watch?v=${video.id}"><img alt="" src="http://i.ytimg.com/vi/${video.id}/2.jpg"></a></div>
                        </td>
                        <td width="256" valign="top">
                            <div style="font-size: 12px; font-weight: bold;"><a style="font-size: 15px; font-weight: bold; font-decoration: none;" href="http://${config.ip}:${config.port}/watch?v=${video.id}">${safeData(video.title, "")}</a><br>
                            </div>
                            <div style="font-size: 12px; margin: 3px 0px;"><span>${safeData(video.description, "")}</span></div>
                        </td>
                        <td style="font-size: 11px; line-height: 1.4em; padding-left: 20px; padding-top: 1px;" width="146" valign="top">
                            <div><span style="color: #666666; font-size: 11px;">From:</span>
                                <a href="http://${config.ip}:${config.port}/channel/${video.author_id}">${video.author_name}</a>
                            </div>
                            <div><span style="color: #666666; font-size: 11px;">Views:</span>${video.viewCount}</div>
                            <div style="white-space: nowrap;text-align: left"><img style="border: 0px none; margin: 0px; padding: 0px; vertical-align: middle; font-size: 11px;" align="top" alt="" src="http://${config.ip}:${config.port}/assets/site-assets/icn_star_full_11x11.gif"> <img style="border: 0px none; margin: 0px; padding: 0px; vertical-align: middle; font-size: 11px;" align="top" alt="" src="http://${config.ip}:${config.port}/assets/site-assets/icn_star_full_11x11.gif"> <img style="border: 0px none; margin: 0px; padding: 0px; vertical-align: middle; font-size: 11px;" align="top" alt="" src="http://${config.ip}:${config.port}/assets/site-assets/icn_star_full_11x11.gif"> <img style="border: 0px none; margin: 0px; padding: 0px; vertical-align: middle; font-size: 11px;" align="top" alt="" src="http://${config.ip}:${config.port}/assets/site-assets/icn_star_full_11x11.gif"> <img style="border: 0px none; margin: 0px; padding: 0px; vertical-align: middle; font-size: 11px;" align="top" alt="" src="http://${config.ip}:${config.port}/assets/site-assets/icn_star_full_11x11.gif"></div>
                            <div style="font-size: 11px;">${fcount}<span style="color: #666666; font-size: 11px;">ratings</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><span style="color: #666666; font-size: 11px;">Time:</span>
                            <span style="color: #000000; font-size: 11px; font-weight: bold;">${utils.seconds_to_time(video.length)}</span>
                        </td>
                        <td style="font-size: 11px; padding-left: 20px;"><span style="color: #666666; font-size: 11px;">More in</span>
                            <a href="http://${config.ip}:${config.port}/videos?c=${categoryNumber}">${video.category.split("&").join("")}</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`

        if(notFeed) {
            return `<?xml version='1.0' encoding='UTF-8'?>
        <entry xmlns='http://www.w3.org/2005/Atom'>
            <id>http://gdata.youtube.com/feeds/base/videos/--5psRI6Yx8</id>
            <published>${video.upload}</published>
            <updated>${video.upload}</updated>
            <category scheme='http://schemas.google.com/g/2005#kind' term='http://gdata.youtube.com/schemas/2007#video' />
            <title type='text'>${safeData(video.title)}</title>
            <content type='html'>${utils.xss(description)}</content>
            <link rel='alternate' type='text/html' href='http://${config.ip}:${config.port}/watch?v=${video.id}' />
            <link rel='self' type='application/atom+xml' href='http://gdata.youtube.com/feeds/base/videos/${video.id}' />
            <author>
                <name>${safeData(video.author_name)}</name>
                <uri>http://gdata.youtube.com/feeds/base/users/${video.author_id}</uri>
            </author>
        </entry>`
        }

        return `
        <item>
            <guid isPermaLink='false'>http://gdata.youtube.com/feeds/base/videos/F35L1dZtxjI</guid>
            <pubDate>${new Date(video.upload).toString().split(" (")[0]}</pubDate>
            <atom:updated>${video.upload}</atom:updated>
            <category domain='http://schemas.google.com/g/2005#kind'>http://gdata.youtube.com/schemas/2007#video</category>
            <title>${safeData(video.title)}</title>
            <description>${utils.xss(description)}</description>
            <link>http://${config.ip}:${config.port}/watch?v=${video.id}</link>
            <author>${safeData(video.author_name)}</author>
        </item>`
    },

    "baseFeed_feedEnd": `
    </channel>
</rss>`,

    "pchelper_accounts": function(accounts) {
        let html = `<table id="account-list">`
        let firstMarked = false;
        let selectedName = ""
        let selectedHandle = ""
        accounts.forEach(a => {
            let name = a.name;
            if(name.length > 26) {
                name = name.substring(0, 26) + "..."
            }
            if(a.selected) {
                selectedName = a.name;
                selectedHandle = a.handle.replace("@", "");
            }
            let avatar = "/assets/site-assets/default.png"
            if(a.avatar && require("fs").existsSync(".." + a.avatar)) {
                avatar = a.avatar;
            }
            html += `<tr class="account" data-pageid="${a.pageId}">
            <td><img src="${avatar}"/><span id="account-name">${name}</span></td>
            <td class="selector">${a.selected
            ? `<span class="selected-label">Selected</span>`
            : `<a class="yt-button yt-button-primary"
				href="#" onclick="login_change('${a.pageId}','${name.split("'").join("\"")}',${!firstMarked ? "true" : "false"})">
				<span>Select</span>
			</a>`}</td>
        </tr>`
            firstMarked = true;
        })
        html += `</table>`
        if(selectedName && selectedHandle) {
            html += `
        <div id="login-simulate-autopicker">
            <h3>want to adjust your login name on yt2009?</h3>
            <a class="yt-button yt-button-primary" href="#" onclick="login_sim_change('${selectedName.split("'").join("\\'")}')">
				<span>${utils.xss(selectedName)}</span>
			</a>
            <a class="yt-button yt-button-primary" href="#" onclick="login_sim_change('${selectedHandle.split("'").join("\\'")}')">
				<span>${utils.xss(selectedHandle)}</span>
			</a>
        </div>`
        }
        return html;
    },

    "insightMap": `<div class="feedmodule-anchor" id="feedmodule-IMN">
    <div class="feedmodule-modheader" id="IMN-titlebar">
        <div id="feed_insight_map">
            <div class="fm2-title-border-box-gray yt-rounded">
                <div class="fm2-title">
                    <img src="/assets/site-assets/pixel-vfl73.gif" class="homepage-sprite img_feed_insight_map fm2-icon">
                    <span class="fm2-titleText" id="feed_insight_map-titleText">Insight: Statistics and Data</span>
                </div>
                <div class="feedmodule-updown">
                    <span id="mup-IMN" class="up-button" onclick="moveUp('insmap')">
                        <img class="master-sprite img-php-up-arrow" src="/assets/site-assets/pixel-vfl73.gif"></span>
                    <span id="mdown-IMN" class="down-button" onclick="moveDown('insmap')">
                        <img class="master-sprite img-php-down-arrow" src="/assets/site-assets/pixel-vfl73.gif"></span>
                    <span id="mclose-IMN" onclick="removeModule('insmap')">
                        <img class="master-sprite img-php-close-button" src="/assets/site-assets/pixel-vfl73.gif"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="clear feedmodule-border-gray yt-rounded" id="feed_insight_map-content">
        <div class="feedmodule-data" id="IMN-data">
            <div class="feedmodule-body compressed-view" id="feed_insight_map-body">
                <span class="feedmodule-maintext">How popular were your videos, relative to those of other uploaders, in the last 7 days?</span>
                <div class="spacer">&nbsp;</div>
                <div class="feedmodule-chart"><img src="/assets/site-assets/pixel-vfl73.gif" class="feedmodule-border-gray"></div>
                <div class="feedmodule-next"></div>
                <div class="spacer">&nbsp;</div>
            </div>
        </div>
    </div>
    <div class="clear"></div>
</div>`,

    "insightChart": `<div class="feedmodule-anchor" id="feedmodule-IMC">
        <div class="feedmodule-modheader" id="IMC-titlebar">
            <div id="feed_insight_chart">
                <div class="fm2-title-border-box-gray yt-rounded">
                    <div class="fm2-title">
                        <img src="/assets/site-assets/pixel-vfl73.gif" class="homepage-sprite img_feed_insight_chart fm2-icon">
                        <span class="fm2-titleText" id="feed_insight_chart-titleText">Insight: Statistics and Data</span>
                    </div>
                    <div class="feedmodule-updown">
                        <span id="mup-IMC" class="up-button" onclick="moveUp('inschrt')">
                            <img class="master-sprite img-php-up-arrow" src="/assets/site-assets/pixel-vfl73.gif"></span>
                        <span id="mdown-IMC" class="down-button" onclick="moveDown('inschrt')">
                            <img class="master-sprite img-php-down-arrow" src="/assets/site-assets/pixel-vfl73.gif"></span>
                        <span id="mclose-IMC" onclick="removeModule('inschrt')">
                            <img class="master-sprite img-php-close-button" src="/assets/site-assets/pixel-vfl73.gif"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="clear feedmodule-border-gray yt-rounded" id="feed_insight_chart-content">
            <div class="feedmodule-data" id="IMC-data">
                <div class="feedmodule-body compressed-view" id="feed_insight_chart-body">
                    <span class="feedmodule-maintext">Views for all of your videos for the last 7 days</span>
                    <div class="spacer">&nbsp;</div>
                    <div class="feedmodule-chart"><div class="feedmodule_chart_crop_big feedmodule-border-gray">
                        <img src="/assets/site-assets/pixel-vfl73.gif"/>
                    </div></div>
                    <div class="feedmodule-next"></div>
                    <div class="spacer">&nbsp;</div>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>`,

    "bareHTML_map": function(chartUrl, topCountries, viewChart) {
        return `<span class="feedmodule-maintext">How popular were your videos, relative to those of other uploaders, in the last 7 days?</span>
        <div class="spacer">&nbsp;</div>
        <div class="feedmodule-chart"><img src="${chartUrl}" class="feedmodule-border-gray"></div>
        <div class="feedmodule-next">
            ${topCountries && topCountries[0] ? `<div class="feedmodule-next-section">
                <span class="bold">Your videos were most popular in</span>
                <div class="spacer">&nbsp;</div>
                <span class="feedmodule-stext">${topCountries[0] ? topCountries[0][0] : ""}</span>
            </div>` : ""}
            <div class="feedmodule-next-section">
                <span class="bold">Total Views</span>
                <div class="spacer">&nbsp;</div>
                <div class="feedmodule_chart_crop_small">
                    <img src="${viewChart}"/>
                </div>
            </div>
        </div>
        <div class="spacer">&nbsp;</div>`
    },

    "bareHTML_chart": function(chartUrl, topCountries, topVideos, genders) {
        let topVList = ""
        if(topVideos && topVideos[0]) {
            topVideos.slice(0,3).forEach(v => {
                let id = ""
                try {
                    id = v.videoEndpoint.innertubeCommand.watchEndpoint.videoId
                    topVList += `<li><a href="/watch?v=${id}">${v.videoTitle}</a></li>`
                }
                catch(error) {}
            })
        }
        let topGList = ""
        if(genders && genders[0]) {
            genders.forEach(g => {
                topGList += `<li><span class="feedmodule-stext">${g.label} - ${g.displayValue}</span></li>`
            })
        }
        let topCountriesFormatted = []
        topCountries.forEach(tc => {
            topCountriesFormatted.push(tc[0])
        })
        topCountriesFormatted = topCountriesFormatted.join(", ")
        return `<span class="feedmodule-maintext">Views for all of your videos for the last 7 days</span>
        <div class="spacer">&nbsp;</div>
        <div class="feedmodule-chart"><div class="feedmodule_chart_crop_big feedmodule-border-gray">
            <img src="${chartUrl}"/>
        </div></div>
        <div class="feedmodule-next">
            ${topVideos && topVideos[0] ? `<div class="feedmodule-next-section">
                <span class="bold">Most watched videos</span>
                <div class="spacer">&nbsp;</div>
                <ol>${topVList}</ol>
            </div>` : ""}
            ${topCountries && topCountries[0] ? `<div class="feedmodule-next-section">
                <span class="bold">Your videos were most viewed in</span>
                <div class="spacer">&nbsp;</div>
                <span class="feedmodule-stext">${topCountriesFormatted}</span>
            </div>` : ""}
            ${genders && genders[0] ? `<div class="feedmodule-next-section">
                <span class="bold">Your videos were most viewed by</span>
                <div class="spacer">&nbsp;</div>
                <ol>${topGList}</ol>
            </div>` : ""}
        </div>
        <div class="spacer">&nbsp;</div>`
    },
    "ssr_yt_playlist": function(videos, autogen, proxy) {
        let html = ""
        let i = 0;
        videos.forEach(v => {
            let thumbUrl = `//i.ytimg.com/vi/${v.id}/${autogen ? "1.jpg" : "default.jpg"}`
            if(proxy) {
                thumbUrl = `/get_still.php?video_id=${v.id}`
            }
            html += `
<tr class="video ${i % 2 == 0 ? "even" : "odd"}" data-videoid="${v.id}">
    <td id="heading-check" class="first heading">
        <div><input id="all-items-checkbox" type="checkbox" onclick="" data-videoid="${v.id}"/></div>
    </td>
    <td id="heading-position" class="heading">
        <div style="text-align: center;"><a href="#" style="text-align: center;font-size: 14px;"><b>${i + 1}</b></a></div>
    </td>
    <td id="heading-title" class="heading">
        <button title="" class="master-sprite"></button>
        <a href="/watch?v=${v.id}" style="height: 40px;overflow: hidden;" rel="nofollow"><img src="${thumbUrl}"></a>
        <a href="/watch?v=${v.id}" class="video-title">${utils.xss(v.title)}</a>
    </td>
    <td id="heading-time" class="heading">
        <div>${v.time}</div>
    </td>
    <td id="heading-date" class="heading">
        <div>${v.date}</div>
    </td>
    <td id="heading-views" class="heading">
        <div>${v.viewCount}</div>
    </td>
    <td id="heading-rating" class="heading">
        <div><div class="video-stat"><span class="stat-rating"><img class="yt-rating-${v.rating}" src="/assets/site-assets/pixel-vfl73.gif" alt="${v.rating}" /></span></div></div>
    </td>
</tr>`
            i++
        })
        return html;
    },
    "playerHDLive": function(id, use720p, autoHQ) {
        return `
        //exp_hq
        seekbarRemoveWidth = 245;
        adjustSeekbarWidth();
        var liveHd = false;

        ${autoHQ ? `
        liveHd = true;` : ""}

        // hd/hq playback
        $(".video_controls .hq").addEventListener("click", function() {
            video_pause();

            if(!liveHd) {
                liveHd = true;
                $("video").innerHTML = "";
                initAsLive("${id}")
                $(".video_controls .hq").className = "hq ${use720p ? "hd" : ""} enabled"
                //video_play()
            } else {
                liveHd = false;
                $("video").innerHTML = "";
                initAsLive("${id}")
                $(".video_controls .hq").className = "hq ${use720p ? "hd" : ""}"
                //video_play()
            }
        }, false)`
    },
    
    "liveChatMessage": function(msg) {
        return `<tr class="live-chat-message">
            <td class="author-username">
                <a href="/channel/${msg.authorId}">${msg.authorName}</a>
            </td>
            <td class="message-content">
                <span>${msg.msg}</span>
            </td>
        </tr>`
    },

    "livechatTemplate": `<div id="watch-live-chat-panel" class="watch-discoverbox-wrapper yt-uix-expander " data-expander-action="watchTogglePanel" data-discoverbox-type="live" data-discoverbox-username="">
		<h2 class="yt-uix-expander-head" onclick="toggleExpander(this)">
			<button title="" class="yt-uix-expander-arrow master-sprite"></button>
			<span>Live Chat</span>
		</h2>
		<div id="watch-live-chat-body" class="watch-discoverbox-body mini-list-view yt-uix-expander-body">
			<div id="watch-live-discoverbox" class="watch-discoverbox" style="height:432px">
				<table id="live-chat-t"><tbody></tbody></table>
			</div>
		</div>
		<div class="clearL"></div>
	</div>`,

    "recentActivityHead": `<div class="inner-box" id="user_recent_activity">
	<div style="zoom:1">
		<div class="box-title title-text-color">Recent Activity &nbsp;</div>
		<div style="float:right;zoom:1;_display:inline;white-space:nowrap"><div style="float:right"></div></div>
		<div class="cb"></div>
	</div>
	<div id="user_recent_activity-messages" style="color:#333;margin:1em;padding:1em;display:none"></div>
	<div id="user_recent_activity-body">
		<div id="feed_success" style="display: none;">Successfully removed.</div>
		<div id="feed_success_custom" style="display: none;"></div>
		<div id="feed_error" style="display: none;">Sorry, an error occurred.</div>
		<div id="feed_error_custom" style="display: none;"></div>
		<div id="feed_loading" style="display: none; text-align: center;"><img src="/assets/site-assets/icn_loading_animated-vfl24663.gif"></div>
		<div id="feed_table">
			<div class="text-field recent-activity-content outer-box-bg-as-border">
				<table border="0" cellspacing="0" cellpadding="0" width="97%">
					<tbody>`,
    
    "recentActivityPost": function(p, index, req) {
        //console.log(p)
        let imagesHTML = ""
        if(p.attachments) {
            p.attachments.forEach(img => {
                if(img.imageAttachmentSmall) {
                    imagesHTML += `<div style="float:left; margin-right: 8px;"><img class="feed-image" src="/avatar_wait?av=${encodeURIComponent(img.imageAttachmentSmall)}"/></div>`
                }
            })
        }
        return `<tr id="feed_item_${index}" valign="top">
			<td class="feed_icon"><img src="/assets/site-assets/pixel-vfl73.gif" class="icon-BUL"></td>
			<td>
				<div class="feed_title">
					${p.authorText}
                    <span class="feed-content">${p.text}</span>
					<span class="timestamp">(${p.time})</span>
				</div>
				<div class="centerpiece">
                    ${imagesHTML}
                    ${p.embedVideoId && p.embedVideoTitle ? 
                    `<div style="float:left; margin-right: 8px;"><a href="/watch?v=${p.embedVideoId}" rel="nofollow"><img style="width: 60px; height: 45px; border: 1px solid;" src="${utils.getThumbUrl(p.embedVideoId, req)}" class="link-as-border-color"></a></div>
					<div>
						<a href="/watch?v=${p.embedVideoId}" rel="nofollow">${p.embedVideoTitle}</a>
					</div>` : ""}
				</div>
			</td>
			<td class="feed_delete">&nbsp;</td>
		</tr>

		<tr id="feed_divider_${index}">
			<td colspan="3" class="outer-box-bg-as-border divider">&nbsp;</td>
		</tr>`

        /*<div>
						<span id="feed_item_UgY69lf0UCE_collapsed">
							ALTERNATE ENDING &amp; DELETED SCENE: <a href="http://web.archive.org/web/20091124022218/http://smosh.com/videos" target="_blank" title="http://smosh.com/videos" rel="nofollow" dir="ltr">http://smosh.com/videos</a><br><br>Can we survive a frickin' zombie apocalypse? See if we make it in our new video!<br><br><a href="http://web.archive.org/web/20091124022218/http://smosh.com/" target="_blank" title="http://smosh.com" rel="nofollow" dir="ltr">http:/...</a>
							&nbsp;
							<a href="#" onclick="_hidediv('feed_item_UgY69lf0UCE_collapsed'); _showdiv('feed_item_UgY69lf0UCE_expanded'); return false;" style="font-size: 10px;" class="hLink">more</a>
						</span>
						<span id="feed_item_UgY69lf0UCE_expanded" style="display:none">
							ALTERNATE ENDING &amp; DELETED SCENE: <a href="http://web.archive.org/web/20091124022218/http://smosh.com/videos" target="_blank" title="http://smosh.com/videos" rel="nofollow" dir="ltr">http://smosh.com/videos</a><br><br>Can we survive a frickin' zombie apocalypse? See if we make it in our new video!<br><br><a href="http://web.archive.org/web/20091124022218/http://smosh.com/" target="_blank" title="http://smosh.com" rel="nofollow" dir="ltr">http://smosh.com</a><br><a href="http://web.archive.org/web/20091124022218/http://twitter.com/smosh" target="_blank" title="http://twitter.com/smosh" rel="nofollow" dir="ltr">http://twitter.com/smosh</a><br><a href="http://web.archive.org/web/20091124022218/http://facebook.com/smosh" target="_blank" title="http://facebook.com/smosh" rel="nofollow" dir="ltr">http://facebook.com/smosh</a><br><a href="http://web.archive.org/web/20091124022218/http://myspace.com/smosh" target="_blank" title="http://myspace.com/smosh" rel="nofollow" dir="ltr">http://myspace.com/smosh</a>
							&nbsp;
							<a href="#" onclick="_hidediv('feed_item_UgY69lf0UCE_expanded'); _showdiv('feed_item_UgY69lf0UCE_collapsed'); return false;" style="font-size: 10px;" class="hLink">less</a>
						</span>
					</div>*/
    },

    "recentActivityEnd": `</tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>`,

    "playerHDSabr": function(use720p, autoHQ) {
        return `
        //exp_hq
        seekbarRemoveWidth = 245;
        adjustSeekbarWidth();
        var sabrHd = false;

        ${autoHQ ? `
        sabrHd = true;` : ""}

        // hd/hq playback
        $(".video_controls .hq").addEventListener("click", function() {
            if(!sabrHd) {
                sabrHd = true;
                sabrQualityChanged()
                $("video").innerHTML = "";
                $(".video_controls .hq").className = "hq ${use720p ? "hd" : ""} enabled"
            } else {
                sabrHd = false;
                sabrQualityChanged()
                $("video").innerHTML = "";
                $(".video_controls .hq").className = "hq ${use720p ? "hd" : ""}"
            }
        }, false)`
    },
    "csRecommendedPagedHeadin": function(i) {
        return `<div class="cs-video-grid page-${i} ${i !== 0 ? "hid" : ""}" id="cs-video-grid-page-${i}">`
    },
    "csRecommendedPagedA": `
        <div class="searchFooterBox">
            <div class="pagingDiv">
                <span class="pagerLabel smallText label">Pages: </span>`,
    "pagerClientside": function(pageNumber, pageCount, hidden) {
        let html = `
        <div class="searchFooterBox ${hidden ? "hid" : ""}" id="footer-pager-for-${pageNumber}">
            <div class="pagingDiv">
                <span class="pagerLabel smallText label">Pages: </span>`
        for (let i = 0; i < pageCount; i++) {
            if(pageNumber == i) {
                html += `<span class="pagerCurrent">${i + 1}</span>`
            } else {
                html += `<a href="#" onclick="navClPage(${i}, ${pageCount})" class="pagerNotCurrent">${i + 1}</a>`
            }
        }
        html += "</div></div>"
        return html
    },
    "genericThemePickrCustomSelected": `<div id="custom" class="theme_selector_div theme_selected" style="font-family:Arial" onclick="set_theme_obj(this.id);">
	<div style="background-color: #FFF;color:#000;padding: 3px;line-height:120%">
		<div style="background-color: #D6D6D6;color: #666;padding:3px;font-size:10px">
			<div style="float:right;width:4em;background-color:#FFF;font-size:9px;padding-left:1px;color:#000"><span style="color:#666;font-size:120%">A</span> &nbsp;<span style="color:#03C;text-decoration:underline">url</span><br>abc</div><span style="color:#03C;text-decoration:underline">url</span><br>abc
		</div>
	</div>
	<div style="text-align:center;"><span class="theme_title" style="padding:2px;height:2em;overflow:hidden">Custom</span></div>
</div>`,
    "channelShowinfoBegin": `<div class="show_info" style="padding-top: 8px;border:0">
        <table id="user-profile-honors" cellpadding="0" cellspacing="0">
            <tbody>
                <tr>
                    <td width="20" valign="top"><img src="//s.ytimg.com/yt/img/icn_award_17x24-vfl10931.gif" border="0"></td>
                    <td valign="top" style="font-size: 12px;">
                        <span id="BeginvidDeschonors" style="" class="">`,
    "channelShowinfoRow": function(text, link) {
        return `<a href="${link}">${text}</a><br>`
    },
    "channelShowinfoEnd": `
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>`,
    "watchSupIcon": `<span class="yt2009-sup-icon" title="yt2009 Supporter">♥</span>`,
    "applyAboutProperties": function(code, description) {
        let delim = "═"

        // textbox-based properties
        let textboxProperties = {
            "Website": "website",
            "Gender": "gender",
            "Relationship": "relationship",
            "Hometown": "hometown",
            "City": "current-city",
            "Country": "country",
            "Zip": "zip-code",
            "Occupation": "occupations",
            "Companies": "companies",
            "Schools": "schools",
            "Hobbies": "interests",
            "Movies": "fav-movies",
            "Music": "fav-music",
            "Books": "fav-books",
            "Pronouns": "pronouns"
        }
        let textareaProperties = [
            "occupations", "companies", "schools", "interests", "fav-movies",
            "fav-music", "fav-books"
        ]
        for(let p in textboxProperties) {
            if(description.includes(`${delim} ${p}: `)) {
                let key = textboxProperties[p]
                let value = description.split(`${delim} ${p}: `)[1]
                                       .split(`\n${delim}`)[0]
                                       .split("\n\n")[0];
                if(textareaProperties.includes(key)) {
                    code = code.replace(
                        `<textarea name="${key}">`,
                        `<textarea name="${key}">${utils.xss(value)}`
                    )
                } else {
                    code = code.replace(
                        `name="${key}" spellcheck="false" autocomplete="off">`,
                        `name="${key}" spellcheck="false" autocomplete="off" value="${value.split("\"").join("&quot;")}">`
                    )
                }
                /*description = description.replace(
                    `${delim} ${p}: ${value}`, ""
                )*/
            }
        }
        
        // custom handling for name
        if(description.includes(`${delim} Name: `)) {
            let value = description.split(`${delim} Name: `)[1]
                                   .split(`\n${delim}`)[0]
                                   .split("\n\n")[0].split(" ")
            let last = value.pop()
            let first = value.join(" ")
            code = code.replace(
                `name="first-name" spellcheck="false" autocomplete="off"`,
                `name="first-name" value="${first.split("\"").join("&quot;")}" spellcheck="false" autocomplete="off"`
            )
            code = code.replace(
                `name="last-name" spellcheck="false" autocomplete="off"`,
                `name="last-name" value="${last.split("\"").join("&quot;")}" spellcheck="false" autocomplete="off"`
            )
        }

        // dropdown-based properties
        let dropdownValues = {
            "Gender": {
                "Male": "m",
                "Female": "f"
            },
            "Relationship": {
                "Single": "s",
                "Taken": "t",
                "Open": "o"
            },
            "Country": require("./geo/country-codes.json")
        }
        for(let p in dropdownValues) {
            if(description.includes(`${delim} ${p}: `)) {
                let value = description.split(`${delim} ${p}: `)[1]
                                       .split(`\n${delim}`)[0]
                                       .split("\n\n")[0];
                value = dropdownValues[p][value]
                code = code.replace(
                    `<option value="${value}">`,
                    `<option value="${value}" selected="">`
                )
            }
        }

        return code;
    },

    "commentReply": function(c) {
        let sanitizedContent = utils.xss(c.content).split("$").join("&#36;")
        if(sanitizedContent.length == 0) return "";
        return `<div id="${c.commentId}" class="watch-comment-entry">
	<div class="watch-comment-entry-reply">
		<div class="watch-comment-head">
			<div class="watch-comment-info">
				<a class="watch-comment-auth" href="/channel/${c.authorId}" rel="nofollow">${utils.xss(c.authorName)}</a>
				<span class="watch-comment-time"> (${c.time}) </span>
				<a id="show_link_${c.commentId}" class="watch-comment-head-link" onclick="displayHideCommentLink('${c.commentId}')">Show</a>
				<a id="hide_link_${c.commentId}" class="watch-comment-head-link" onclick="displayShowCommentLink('${c.commentId}')">Hide</a>
			</div>
			<span id="comment_spam_bug_${c.commentId}" class="watch-comment-spam-bug">Marked as spam</span>
			<div id="reply_comment_form_id_${c.commentId}" class="watch-comment-action">
			</div>
			<div class="clearL"></div>
		</div>
		<div id="comment_body_${c.commentId}">
			<div class="watch-comment-body">
				<div>${sanitizedContent}</div>
			</div>
			<div id="div_comment_form_id_${c.commentId}"></div>
		</div>
	</div>
</div>`
    },

    "replyHoldReplyCode": function(continuation, commentId) {
        return `<a href="javascript:void(0)" onclick="loadReplies('${continuation}', this, '${commentId}');return false;" class="watch-replies-show-link">» lang_watch_replies_more</a>`
    }
}
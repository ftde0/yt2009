/*
=======
templates for individual yt2009 parts fillable with function calls.
=======
*/
const utils = require("./yt2009utils")
const config = require("./config.json")

module.exports = {
    "videoComment": function(authorUrl, authorName, commentTime, content, flags) {
        if(commentTime.includes("in playlist")) {
            commentTime = commentTime.split("in playlist")[0]
        }
        return `<div class="watch-comment-entry">
            <div class="watch-comment-head">
                <div class="watch-comment-info">
                    <a class="watch-comment-auth" href="${authorUrl}" rel="nofollow">${authorName}</a>
                    <span class="watch-comment-time"> (${commentTime}) </span>
                </div>
                <div class="watch-comment-voting">
                    <!--<span class="watch-comment-score watch-comment-gray">&nbsp;0</span>-->
                    <a href="#"><button class="master-sprite watch-comment-down${flags.includes("login_simulate") ? "-hover" : ""}" title="Poor comment"></button></a>
                    <a href="#"><button class="master-sprite watch-comment-up${flags.includes("login_simulate") ? "-hover" : ""}" title="Good comment"></button></a>
                    <span class="watch-comment-msg"></span>
                </div>
                <span class="watch-comment-spam-bug">Marked as spam</span>
                <div class="watch-comment-action">
                    <a>Reply</a>
                    ${flags.includes("login_simulate") ? `
                    |
                    <a title="Flag this comment as Spam">Spam</a>` : ""}
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
            </div>
        </div>`
    },
    "relatedVideo": function(id, title, protocol, length, viewCount, creatorUrl, creatorName, flags) {
        if(creatorName.startsWith("by ")) {
            creatorName = creatorName.replace("by ", "")
        }
        return `<div class="video-entry" data-id="${id}">
                    <div class="v90WideEntry">
                        <div class="v90WrapperOuter">
                            <div class="v90WrapperInner">
                                <a href="/watch?v=${id}" class="video-thumb-link" rel="nofollow"><img title="${title.split('"').join("&quot;")}" thumb="${protocol}://i.ytimg.com/vi/${id}/hqdefault.jpg" src="${protocol}://i.ytimg.com/vi/${id}/hqdefault.jpg" class="vimg90" qlicon="${id}" alt="${title.split('"').join("&quot;")}}" onload="checkExists(this)"></a>
        
                                <div class="addtoQL90"><a href="#" ql="${id}" title="Add Video to QuickList"><button title="" class="master-sprite QLIconImg" onclick="addToQuicklist('${id}', '${encodeURIComponent(title).split("'").join("\\'")}', '${encodeURIComponent(creatorName)}')"></button></a>
                                    <div class="hid quicklist-inlist"><a href="#">Added to Quicklist</a></div>
                                </div>
        
                                <div class="video-time"><a href="/watch?v=${id}" rel="nofollow">${length}</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="video-main-content">
                        <div class="video-mini-title">
                        <a href="/watch?v=${id}" rel="nofollow">${title}</a></div>
                        <div class="video-view-count">${viewCount}</div>
                        <div class="video-username"><a href="${creatorUrl}">${creatorUrl.includes("/user/") && flags.includes("author_old_names") ? creatorUrl.split("/user/")[1] : creatorName}</a>
                        </div>
                    </div>
                    <span class="abs-views hid">${viewCount.replace(/[^0-9]/g, "")}</span>
                    <div class="video-clear-list-left"></div>
                </div>`;
    },
    "videoResponse": function(id, time, uploaderName, uploaderUrl, protocol) {
        return `
                <div class="video-bar-item">
                    <div class="v90WideEntry">
                        <div class="v90WrapperOuter">
                            <div class="v90WrapperInner"><a href="/watch?v=${id}" class="video-thumb-link" rel="nofollow"><img src="${protocol}://i.ytimg.com/vi/${id}/hqdefault.jpg" class="vimg90"></a>
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
    "XLFormatVideo": function(video, protocol) {
        let authorName = video.creatorName
                        || video.uploaderName
                        || video.author_name || ""
        let authorUrl = video.uploaderUrl
                        || video.creatorUrl
                        || video.author_url || ""
        if(authorUrl.includes("/user/")) {
            authorName = authorUrl.split("/user/")[1]
        } else {
            authorName = authorName.replace(/[^0-9a-zA-Z]/g, "")
        }
        let time = video.length || video.time
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
            "image_url": protocol + "://i.ytimg.com/vi/" + video.id + "/hqdefault.jpg",
            "user_id": "/",
            "description": "",
            "title": video.title,
            "rating": 5,
            "author_url": authorUrl
        }
        //"format": "34\/640x360\/9\/0\/115,18\/640x360\/9\/0\/115,5\/320x240\/7\/0\/0,36\/320x240\/99\/0\/0,17\/176x144\/99\/0\/0"
    },
    "cpsSearchBegin": function(resultCount) {
        return `
<?xml version='1.0' encoding='UTF-8'?>
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
    <openSearch:startIndex>0</openSearch:startIndex>
    <openSearch:itemsPerPage>12</openSearch:itemsPerPage>`
    },
    "cpsSearchEntry": function(id, title, description, lengthSeconds, authorName) {
        let domainName = config.ip + ":" + config.port
        return `
    <entry>
        <id>http://${domainName}/feeds/api/videos/${id}</id>
        <title type='text'>${title}</title>
        <content type='text'>${description}</content>
        <author>
          <name>${authorName}</name>
        </author>
        <media:group>
          <media:content url='http://${domainName}/get_video?video_id=${id}' type='application/x-shockwave-flash' medium='video' isDefault='true' expression='full' duration='${lengthSeconds}' yt:format='5'/>
          <media:description type='plain'>${description}</media:description>
          <media:player url='http://${domainName}/watch?v=${id}'/>
          <media:thumbnail url='http://i.ytimg.com/vi/${id}/hqdefault.jpg' height='360' width='640' time='00:00:00.00'/>
          <media:title type='plain'>${title}</media:title>
          <yt:duration seconds='${lengthSeconds}'/>
        </media:group>
    </entry>
        `
    },
    "cpsSearchEnd": `
</feed>`,
    "searchVideo": function(id, title, description, authorUrl, authorName, uploadDate, viewCount, time, protocol, browser) {
        return `
        <div class="video-cell" data-id="${id}">
            <div class="video-entry">
                <div class="v120WideEntry">
                    <div class="v120WrapperOuter">
                        <div class="v120WrapperInner">
                            <a id="video-title-results" href="/watch?v=${id}" rel="nofollow">
                                <img title="${title.split('"').join("&quot;")}" src="${protocol}://i.ytimg.com/vi/${id}/hqdefault.jpg" class="vimg120">
                            </a>
                            <div id="quicklist-icon-${id}" class="addtoQL90"><a id="add-to-quicklist-${id}" href="#" ql="${id}" title="Add Video to QuickList"><button class="master-sprite QLIconImg ${browser == "firefox" ? "firefox" : ""} title="" onclick="addToQuicklist('${id}', '${encodeURIComponent(title).split("'").join("\\'")}', '${encodeURIComponent(authorName)}')"></button></a>
                                <div class="hid quicklist-inlist"><a href="#">Added</a></div>
                            </div>
                            <div class="video-time ${browser == "chrome" ? "chrome" : ""}"><span id="video-run-time">${time}</span></div>
                        </div>
                    </div>
                </div>
    
                <div class="video-main-content" id="video-main-content">
                    <div class="video-title video-title-results">
                        <div class="video-short-title">
                            <a id="video-short-title" href="/watch?v=${id}" title="${title.split('"').join("&quot;")}" rel="nofollow">${title}</a>
                        </div>
                        <div class="video-long-title">
                            <a id="video-long-title" href="/watch?v=${id}" title="${title.split('"').join("&quot;")}" rel="nofollow">${title}</a>
                        </div>
                    </div>
    
                    <div id="video-description" class="video-description">
                        ${description}
                    </div>
    
                    <div class="result-label">
                        <span class="result-type">Video:</span>
                        <span class="video-username"><a id="video-from-username" class="hLink" href="${authorUrl}">${authorName}</a></span>
                    </div>
    
                    <div class="video-facets">
                        <span id="video-average-rating" class="video-rating-list">
                            <div>
                                <button class="master-sprite ratingVS ratingVS-5.0" title="5.0"></button>
                            </div>
                        </span>
    
                        <span id="video-added-time" class="video-date-added">${uploadDate}</span>
                        <span id="video-num-views" class="video-view-count">${viewCount}</span>
                        <span class="video-username"><a id="video-from-username" class="hLink" href="${authorUrl}">${authorName}</a></span>
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
    "warpVideo": function(id, title, length, creatorName, video_index) {
        return `<video><author>${creatorName}</author><id>${id}</id><title>${title}</title><length_seconds>${utils.time_to_seconds(length)}</length_seconds><rating_avg>5</rating_avg><rating_count>1</rating_count><description>.</description><view_count>1</view_count><upload_time>1</upload_time><comment_count>1</comment_count><tags> </tags><url>http://www.youtube.com/watch?v=${id}</url><thumbnail_url>http://i.ytimg.com/vi/${id}/default.jpg</thumbnail_url><embed_status>ok</embed_status><allow_ratings>yes</allow_ratings><w>${video_index}</w></video>`
    },
    "channelSectionHTMLBegin": function(sectionName) {
        return `
    <div class="inner-box yt2009-${sectionName}-mark" id="user_${sectionName.toLowerCase()}">
        <div style="zoom:1">
            <div class="box-title title-text-color">${utils.firstUppercase(sectionName)} (yt2009_${sectionName}_count)</div>
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
			<span>QuickList</span><span class="watch-quicklist-count">(<span id="playlistVideoCount_QL">?</span>)</span>
		</h2>
		<div id="playlistContainer_QL" class="yt-uix-expander-body watch-playlist-container watch-playlist-auto-height">
			<div id="playlistRows_QL" class="yt2009-ql-videos">

			</div>
		</div>
		<div id="watch-playlist-actions" class="yt-uix-expander-body">
			<span class="smallText">
				<a href="#" onclick="clearQuicklist()" title="Remove all videos from QuickList" rel="nofollow">Clear</a> <span class="smallText grayText">|</span>
				<a href="#" title="Save all videos into a permanent playlist" onmousedown="createPlaylistFromQuicklist()" rel="nofollow">Save</a>
			</span>
		</div>
	</div>
    `,
    "videoCell": function(id, title, protocol, uploaderName, uploaderUrl, views, flags) {
        return `
        <div class="video-cell *vl" style="width:19.5%" data-id="${id}">
            <div class="video-entry yt-uix-hovercard">
                <div class="v120WideEntry">
                    <div class="v120WrapperOuter">
                        <div class="v120WrapperInner">
                            <a class="video-thumb-link" href="/watch?v=${id}" rel="nofollow"><img title="${title.split("\"").join("&quot;")}" src="${protocol}://i.ytimg.com/vi/${id}/hqdefault.jpg"></a>

                            <div class="addtoQL90"><a href="#" ql="${id}" title="Add Video to QuickList"><button title="" class="master-sprite QLIconImg" onclick="addToQuicklist('${id}', '${encodeURIComponent(title).split("'").join("\\'")}', '${encodeURIComponent(uploaderName.split(" ").join(""))}')"></button></a>
                                <div class="hid quicklist-inlist"><a href="#">Added to Quicklist</a></div>
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
                        <span class="video-view-count">${views}</span>
                        <span class="video-username"><a class="hLink" href="${uploaderUrl}">${flags.includes("remove_username_space") ? uploaderName.split(" ").join("") : uploaderName}</a></span>
                    </div>
                </div>
                <div class="video-clear-list-left"></div>
            </div>
        </div>`
    },
    "videoCommentPost": function(relay_url, id, relay_key) {
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
                                    <form name="comment_formmain_comment" id="comment_formmain_comment" onsubmit="return false;" method="post" action="${relay_url}/comment_post">
                                        <input type="hidden" name="relay_key" value="${relay_key}">
                                        <input type="hidden" name="video_id" value="${id}">
                                        <input type="hidden" name="form_id" value="comment_formmain_comment">
                                        <input type="hidden" name="reply_parent_id" value="">
                                        <textarea id="comment_textarea_main_comment" name="comment" class="comments-textarea" cols="46" rows="5" maxchars="500" oninput="updateCharacterCount();"></textarea>
                                        <br>
                                        <div class="watch-comment-reply-form-actions">
                                            <input type="button" name="add_comment_button" value="Post Comment" onclick="commentSend()">
                                            <span id="maxCharLabelmain_comment">Remaining character count: 500</span>
                                        </div>
                                    </form>
                                    <br class="clear">
                                </div>
                            </div>
                            <div style="clear:both;"></div>
                        </div>`
    }
}
/*
=======
templates for individual yt2009 parts fillable with function calls.
=======
*/
const utils = require("./yt2009utils")
const config = require("./config.json")

module.exports = {
    "videoComment": function(authorUrl, authorName, commentTime, content, flags, useLanguage) {
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
                    <a>${useLanguage ? "lang_comment_reply" : "Reply"}</a>
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
    "relatedVideo": function(id, title, protocol, length, viewCount, creatorUrl, creatorName, flags, playlistId) {
        if(creatorName.startsWith("by ")) {
            creatorName = creatorName.replace("by ", "")
        }
        return `<div class="video-entry" data-id="${id}">
                    <div class="v90WideEntry">
                        <div class="v90WrapperOuter">
                            <div class="v90WrapperInner">
                                <a href="/watch?v=${id}${playlistId ? "&list=" + playlistId : ""}" class="video-thumb-link" rel="nofollow"><img title="${title.split('"').join("&quot;")}" thumb="${protocol}://i.ytimg.com/vi/${id}/hqdefault.jpg" src="${protocol}://i.ytimg.com/vi/${id}/hqdefault.jpg" class="vimg90" qlicon="${id}" alt="${title.split('"').join("&quot;")}}" onload="checkExists(this)"></a>
        
                                <div class="addtoQL90"><a href="#" ql="${id}" title="Add Video to QuickList"><button title="" class="master-sprite QLIconImg" onclick="addToQuicklist('${id}', '${encodeURIComponent(title).split("'").join("\\'")}', '${encodeURIComponent(creatorName)}')"></button></a>
                                    <div class="hid quicklist-inlist"><a href="#">Added to Quicklist</a></div>
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
    <openSearch:itemsPerPage>${resultCount}</openSearch:itemsPerPage>`
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
    },
    "createFffmpegOgg": function(id) {
        return `ffmpeg -i ${__dirname}/../assets/${id}.mp4 -b 1500k -ab 128000 -speed 2 ${__dirname}/../assets/${id}.ogg`
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
                            <div class="button-share">
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
        return `
        <div class="endscreen-video" onclick="videoNav('${id}')">
            <div class="endscreen-video-thumbnail">
                <img src="${protocol}://i.ytimg.com/vi/${id}/hqdefault.jpg" width="80" height="65"/>
                ${endscreen_version !== 1 ? `<div class="video-time" style="float: right;"><a href="">${utils.seconds_to_time(length)}</a></div>` : ""}
            </div>
            <div class="endscreen-video-info">
                <h3 style="max-width: 0px;overflow: hidden;" class="endscreen-video-title">${title.length > 80 ? title.substring(0, 80) + "..." : title}</h3>
                <h3 class="gr" ${endscreen_version !== 1 ? `style="height: 17px"` : ""}>${endscreen_version == 1 ? `<span>${length}</span>` : ""}</h3>
                <h3 class="gr">From: <span class="text-light">${(creatorUrl || "").includes("/user/") && flags.includes("author_old_names") ? (creatorUrl || "").split("/user/")[1] : creatorName}</span></h3>
                <h3 class="gr" ${endscreen_version !== 1 ? `style="margin-top: 2px !important;"` : ""}>Views: <span class="text-light">${views.replace(/[^0-9]/g, "")}</span></h3>
                ${endscreen_version !== 1 ? `<span class="endscreen-video-star rating-${rating}"></span>` : ""}
            </div>
        </div>`
    },
    "flashObject": function(url) {
        return `<object width="640" height="385" class="fl flash-video"><param name="movie" value="${url}"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="${url}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="385" class="fl"></embed></object>`
    },
    "html5Embed": function(id, elementId) {
        return `<iframe id="${elementId}" allowfullscreen src="/embed/${id}"></iframe>`
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
                    <div class="channel-facets"><span>${subscribers}</span></div>
                </div>
            </div>
        </div>`
    },
    "searchPlaylistEntry": function(id, protocol, videos, name, videoCount) {
        return `
        <div class="playlist-cell" style="width:24.5%">
            <div class="playlist-entry yt-uix-hovercard">
                <div class="playlist-main-thumb">
                    <div class="vCluster120WideEntry">
                        <div class="vCluster120WrapperOuter playlist-thumbnail">
                            <div class="vCluster120WrapperInner">
                                <a href="/playlist?list=${id}" rel="nofollow"><img src="${protocol}://i.ytimg.com/vi/${videos[0].id}/hqdefault.jpg" class="vimgCluster120 yt-uix-hovercard-target"></a>
                                <div class="video-corner-text"><span>${videos[0].length}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="playlist-main-content" id="playlist-main-content-DF3129C5832D6AE7">
                    <div class="playlist-title playlist-title-results">
                        <div class="playlist-long-title">
                            <a href="/playlist?list=${id}" class="yt-uix-hovercard-target" rel="nofollow">${name}</a>
                            <span class="playlist-video-count">${videoCount} videos</span>
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
                        <span class="playlist-video-count">(${playlist.videoCount} videos)</span>
                    </div>	
                </div>
                <div class="playlist-clear-list-left"></div>
                </div>	
            </div>
                `
    },
    "playnavVideo": function(video, video_index, views, upload_date, ratings, protocol) {
        return `
        <div class="playnav-item playnav-video ${video_index == 0 ? "selected playnav-item-selected" : ""}" id="playnav-video-${video.id}" onclick="switchVideo(this)">
            <div id="playnav-video-play-${video.id}-selector" class="selector"></div>
            <div class="content">
                <div class="playnav-video-thumb link-as-border-color">
                    <a class="video-thumb-90 no-quicklist" href="#"><img title="${video.title.split('"').join("&quot;")}" src="${video.thumbnail.replace("http", protocol)}" class="vimg90 yt-uix-hovercard-target" alt="${video.title.split('"').join("&quot;")}"></a>
        
                </div>
                <div class="playnav-video-info">
                    <a href="#" class="playnav-item-title ellipsis"><span class="video-title-${video.id}">${video.title}</span></a>
                    <div class="metadata video-meta-${video.id}">${views} - ${upload_date}</div>
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
    "playnavPlaylist": function(playlist, protocol, useLanguage) {
        return `
        <div class="playnav-item playnav-playlist" onclick="openPlaylist(this)" data-id="${playlist.id}">
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
    "mobile_video": function(video) {
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
                        ${video.upload ? `<div style="color:#333;font-size:80%">${video.upload}</div>` : ""}
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
        return `<?xml version='1.0' encoding='UTF-8'?>
<feed
    xmlns='http://www.w3.org/2005/Atom'
    xmlns:app='http://www.w3.org/2007/app'
    xmlns:media='http://search.yahoo.com/mrss/'
    xmlns:openSearch='http://a9.com/-/spec/opensearch/1.1/'
    xmlns:gd='http://schemas.google.com/g/2005'
    xmlns:yt='http://gdata.youtube.com/schemas/2007' gd:etag='W/&quot;A0EMSX47eCp7ImA9WxJWFkQ.&quot;'>
    <id>yt2009playlist</id>
    <updated>2009-06-22T19:41:28.000Z</updated>
    <category scheme='http://schemas.google.com/g/2005#kind' term='http://gdata.youtube.com/schemas/2007#playlist'/>
    <title>${title}</title>
    <subtitle>${title.toLowerCase()}</subtitle>
    <logo>http://www.youtube.com/img/pic_youtubelogo_123x63.gif</logo>
    <link rel='alternate' type='text/html' href='http://www.youtube.com/view_play_list?p=${id}'/>
    <link rel='http://schemas.google.com/g/2005#feed' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/playlists/${id}?v=2'/>
    <link rel='http://schemas.google.com/g/2005#batch' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/playlists/${id}/batch?v=2'/>
    <link rel='self' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/playlists/${id}?start-index=1&amp;max-results=25&amp;v=2'/>
    <link rel='service' type='application/atomsvc+xml' href='http://gdata.youtube.com/feeds/api/playlists/${id}?alt=atom-service&amp;v=2'/>
    <author>
        <name>${authorName}</name>
        <uri>http://gdata.youtube.com/feeds/api/users/${authorName}</uri>
    </author>
    <generator version='2.0' uri='http://gdata.youtube.com/'>YouTube data API</generator>`
    },
    "cpbPlaylistsCounts": function(results, id, title, description) {
        return `
    <openSearch:totalResults>${results}</openSearch:totalResults>
    <openSearch:startIndex>1</openSearch:startIndex>
    <openSearch:itemsPerPage>${results}</openSearch:itemsPerPage>
    <media:group>
        <media:content url='http://www.youtube.com/ep.swf?id=${id}' type='application/x-shockwave-flash' yt:format='5'/>
        <media:description type='plain'>${description}</media:description>
        <media:title type='plain'>${title}</media:title>
    </media:group>
    <yt:playlistId>${id}</yt:playlistId>`
    },
    "cpbVideo": function(video, index) {
        return `
    <entry gd:etag='W/&quot;DUUMQnYzeCp7ImA9WxFUGU4.&quot;'>
        <id>${video.id}</id>
        <updated>2010-06-30T22:34:43.880Z</updated>
        <title>${video.title}</title>
        <link rel='alternate' type='text/html' href='http://www.youtube.com/watch?v=rInvb982mYU&amp;feature=youtube_gdata'/>
        <link rel='http://gdata.youtube.com/schemas/2007#video.responses' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/videos/rInvb982mYU/responses?v=2'/>
        <link rel='http://gdata.youtube.com/schemas/2007#video.related' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/videos/rInvb982mYU/related?v=2'/>
        <link rel='related' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/videos/rInvb982mYU?v=2'/>
        <link rel='self' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/playlists/0A7ED544A0D9877D/00A37F607671690E?v=2'/>
        <author>
            <name>${video.uploaderName}</name>
            <uri>http://gdata.youtube.com/feeds/api/users/degumusic</uri>
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
            <media:content url='http://www.youtube.com/v/${video.id}?f=playlists&amp;app=youtube_gdata' type='application/x-shockwave-flash' medium='video' isDefault='true' expression='full' duration='583' yt:format='5'/>
            <media:credit role='uploader' scheme='urn:youtube' yt:type='partner'>sltrib</media:credit>
            <media:description type='plain'>${video.description}</media:description>
            <media:keywords>salt, lake, tribune, utah, tourist, business</media:keywords>
            <media:player url='http://www.youtube.com/watch?v=rInvb982mYU&amp;feature=youtube_gdata'/>
            <media:thumbnail url='http://i.ytimg.com/vi/${video.id}/default.jpg' height='90' width='120' time='00:00:00.500'/>
            <media:thumbnail url='http://i.ytimg.com/vi/rInvb982mYU/hqdefault.jpg' height='360' width='480'/>
            <media:title type='plain'>${video.title}</media:title>
            <yt:aspectRatio>widescreen</yt:aspectRatio>
            <yt:duration seconds='${video.time ? utils.time_to_seconds(video.time) : "1"}'/>
            <yt:uploaded>2009-03-02T21:47:27.000Z</yt:uploaded>
            <yt:videoid>${video.id}</yt:videoid>
        </media:group>
        <gd:rating average='5.0' max='5' min='1' numRaters='1' rel='http://schemas.google.com/g/2005#overall'/>
        <yt:statistics favoriteCount='0' viewCount='0'/>
        <yt:position>${index}</yt:position>
    </entry>`
    },
    "subscriptionVideo": function(video, flags, videoIndex) {
        let uploadDate = flags.includes("fake_upload_date")
                        ? utils.genFakeDate(videoIndex) : video.upload
        let viewCount = video.views;
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
                    <input type="checkbox" class="checkbox" value="${video.id}" />
                </div>
            </div>
            <div style="float: left; width: 120px;">
                <a href="/watch?v=${video.id}" class="video-thumb"><img src="${video.thumbnail}"/></a>
                <a href="/watch?v=${video.id}" class="title" style="display: block; color: #03c;">${video.title}</a>
                <div class="video-stats">
                    <div class="video-stat"><span class="stat-upload">${video.upload ? `Added: ${uploadDate}` : ""}</span></div>
                    <div class="video-stat"><span class="stat-views">Views: ${viewCount}</span></div>
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
</script>`,
    "embedNoControlsFadeCode": `
    fadeControlsEnable = false;
    var s = document.createElement("style")
    s.innerHTML = "video:not(.showing-endscreen) {height: calc(100% - 25px) !important;}#watch-player-div {background: black !important;}"
    document.body.appendChild(s)`,
    "embedVideoSources": function(id) {
        let mp4Path = `/assets/${id}.mp4`
        let ogvPath = `/assets/${id}.ogg`
        if(id.includes("googlevideo")) {
            mp4Path = id;
            ogvPath = id;
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
    "playerHDBtnJS": function(id, use720p) {
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
                var length = seconds_to_time(Math.floor(video.duration))
                $("video").src = "/${use720p ? "exp_hd" : "get_480"}?video_id=${id}"
                setTimeout(function() {
                    $(".video_controls .timer").innerHTML = "0:00 / " + length;
                    showLoadingSprite();
                }, 500)
                $(".video_controls .hq").className = "hq ${use720p ? "hd" : ""} enabled"
                video_play()
            } else {
                $("video").src = "/assets/${id}.mp4";
                hqPlaying = false;
                $(".video_controls .hq").className = "hq ${use720p ? "hd" : ""}"
            }
        }, false)
        
        // fallback do 360p
        $("video").addEventListener("error", function() {
            if(hqPlaying) {
                $("video").src = "/assets/${id}.mp4";
                hqPlaying = false;
                $(".video_controls .hq").className = "hq ${use720p ? "hd" : ""}"
            }
        }, false)`
    },
    "channelspageChannel": function(channel, channelName) {
        return `<div class="channel-cell" style="width:19.5%">
                <div class="channel-entry yt-uix-hovercard">
                    <div class="channel-title">
                        <div class="channel-short-title yt-uix-hovercard-target">
                            <a href="/${channel.url}" title="${channelName}" rel="nofollow">${channelName}</a>
                        </div>
                    </div>
                    <div class="user-thumb-large">
                        <div>
                            <a href="/${channel.url}">
                                <img class="yt-uix-hovercard-target" src="${channel.avatar}" title="${channelName}">
                            </a>
                        </div>
                    </div>
                    <div class="channel-main-content">
                        <div class="channel-title">
                            <div class="channel-long-title">
                                <a href="/${channel.url}" title="${channelName}" rel="nofollow">${channelName}</a>
                            </div>
                        </div>
                        <div class="channel-facets">
                            <span class="result-type">Channel</span>
                            <span class="channel-video-count"></span>
                            <span>${channel.properties.subscribers !== "[disabled]" ? channel.properties.subscribers : "0"} <span class="channel-text-break-grid"></span>Subscribers</span>
                            <span class="channel-username"><a class="hLink" href="/${channel.url}">${channelName}</a></span>
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
<feed xmlns='http://www.w3.org/2005/Atom'
xmlns:media='http://search.yahoo.com/mrss/'
xmlns:openSearch='http://a9.com/-/spec/opensearchrss/1.0/'
xmlns:gd='http://schemas.google.com/g/2005'
xmlns:yt='http://gdata.youtube.com/schemas/2007'>
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
    "gdata_feedVideo": function(id, title, author, views, length, description, uploadDate, keywords, category, flags) {
        // flag handling
        if((flags || []).includes("realistic-view-count")
        && views >= 100000) {
            views = Math.floor(views / 90)
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

        // category names
        category = (category || "-").split("&").join("&amp;")
        return `
        <entry>
            <id>http://${config.ip}:${config.port}/feeds/api/videos/${id}</id>
            <youTubeId id='${id}'>${id}</youTubeId>
            <published>${uploadDate ? new Date(uploadDate).toISOString() : ""}</published>
            <updated>${uploadDate ? new Date(uploadDate).toISOString() : ""}</updated>
            <category scheme="http://gdata.youtube.com/schemas/2007/categories.cat" label="${category}" term="${category}">${category}</category>
            <title type='text'>${title.split("<").join("").split(">").join("").split("&").join("")}</title>
            <content type='text'>${description.split("<").join("").split(">").join("").split("&").join("")}</content>
            <link rel="http://gdata.youtube.com/schemas/2007#video.related" href="http://${config.ip}:${config.port}/feeds/api/videos/${id}/related"/>
            <author>
                <name>${author}</name>
                <uri>http://gdata.youtube.com/feeds/api/users/${author}</uri>
            </author>
            <gd:comments>
                <gd:feedLink href='http://${config.ip}:${config.port}/feeds/api/videos/${id}/comments' countHint='530'/>
            </gd:comments>
            <media:group>
                <media:category label='${category}' scheme='http://gdata.youtube.com/schemas/2007/categories.cat'>${category}</media:category>
                <media:content url='http://${config.ip}:${config.port}/channel_fh264_getvideo?v=${id}' type='video/3gpp' medium='video' expression='full' duration='999' yt:format='3'/>
                <media:description type='plain'>${description.split("<").join("").split(">").join("").split("&").join("")}</media:description>
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
            <yt:rating numLikes="${Math.floor(likeCount)}" numDislikes="${Math.floor(dislikeCount)}"/>
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
		<summary>${summary}</summary>
	</entry>`
    },
    "gdata_activityEntry": function(type, author, title, id, timestamp) {
        return `
    <entry>
		<id>tag:youtube.com,2008:video:${id}</id>
		<updated>${timestamp ? new Date(timestamp).toISOString() : ""}</updated>
		<category scheme='http://schemas.google.com/g/2005#kind' term='http://http://gdata.youtube.com/schemas/2007#userEvent'/>
		<category scheme='http://gdata.youtube.com/schemas/2007/userevents.cat' term='${type}'/>
		<title>${title.split("<").join("").split(">").join("").split("&").join("").trim()}</title>
		<yt:videoid>${id}</yt:videoid>
		<author>
			<name>${author}</name>
			<uri>http://gdata.youtube.com/feeds/api/users/${author}</uri>
		</author>
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
                                    <span class="fm2-titleText" id="feed_recommended-titleText">Recommended for You</span>
                                </div>
                                <div class="feedmodule-preamble yt2009-signin-hide" style="border-bottom: 1px dotted;" id="yt2009-rec-learn-more">
                                    <a href="#">Learn More</a>
                                </div>
                                <div class="feedmodule-updown">
                                    <span id="medit-REC" class="iyt-edit-link iyt-edit-link-gray">edit</span>
                                    <span id="mup-REC" class="up-button">
                                        <img class="master-sprite img-php-up-arrow" src="/assets/site-assets/pixel-vfl73.gif">
                                    </span>
                                    <span id="mdown-REC" class="down-button">
                                        <img class="master-sprite img-php-down-arrow"  src="/assets/site-assets/pixel-vfl73.gif">
                                    </span>
                                    <span id="mclose-REC">
                                        <img class="master-sprite img-php-close-button" src="/assets/site-assets/pixel-vfl73.gif">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clear feedmodule-border-gray yt-rounded" id="feed_recommended-content">
                        <div id="REC-data" class="feedmodule-data">
                            <div id="logged_out_rec_learn_more_box" class="yt-rounded side-announcement-box" style="margin: 5px 10px 5px 5px; padding: 5px; display: none;">
                                <div style="cursor: pointer; display:inline; float: right;" id="yt2009-rec-more-close"><img class="img-php-close-button master-sprite" style="background-position: -57px -712px;" src="/assets/site-assets/pixel-vfl73.gif"></div>
                                <div style="color: black; padding-left: 5px;">
                                    The "Recommended for You" module picks videos based on your viewing history. To see your <a href="/my_history">viewing history</a>, click on the History link at the top right of the page; if you want to clear your history and recommendations, click the "Clear Viewing History" button on that page.
                                </div>
                                <div style="color: black; padding-left: 5px; padding-right: 10px; margin-top: 10px;">
                                    Remember, you will get better, more specific, and more consistent recommendations by <a href="#">logging in</a> (or <a href="#">signing up</a> for a YouTube account, if you don't already have one).
                                </div>
                            </div>
                            <div class="feedmodule-body grid-view">
                                <div id="recommended-loading-sprite"><img src="/assets/site-assets/icn_loading_animated-vfl24663.gif" style="margin-left: 310px;margin-top: 30px;margin-bottom: 30px;"></div>
                                <div class="clearL yt2009-cells-container" id="yt2009-recommended-cells-container">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <script src="/assets/site-assets/homepage-recommended.js"></script>`,
    "recommended_videoCell": function(video) {
        return `<div class="video-cell" style="width:24.5%" data-id="${video.id}">
        <div class="video-entry yt-uix-hovercard">
            <div class="v120WideEntry">
                <div class="v120WrapperOuter">
                    <div class="v120WrapperInner"><a id="video-url-${video.id}" class="video-thumb-link" href="/watch?v=${video.id}" rel="nofollow"><img title="${video.title.split(`"`).join(`&quot;`)}" src="//i.ytimg.com/vi/${video.id}/default.jpg" class="vimg120 yt-uix-hovercard-target"></a>
                        <div id="quicklist-icon-${video.id}" class="addtoQL90"><a id="add-to-quicklist-${video.id}" href="#" ql="${video.id}" title="Add Video to QuickList" onclick="addToQuicklist('${video.id}', '${video.title.split(`'`).join("&quot;").split(`"`).join("&quot;")}', '${utils.asciify(video.creatorName)}')"><button class="master-sprite QLIconImg" title=""></button></a>
                            <div class="hid quicklist-inlist"><a href="/my_quicklist">Added to <br> Quicklist</a></div>
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
                    <span id="video-added-time-${video.id}" class="video-date-added">${utils.genFakeDate()}</span>
                    <span id="video-num-views-${video.id}" class="video-view-count">${video.views}</span>
                    <span id="video-average-rating-${video.id}" class="video-rating-grid ">
                        <div>
                            <button class="master-sprite ratingVS ratingVS-4.5" title="4.5"></button>
                        </div>
                    </span>
                    <span class="video-username"><a id="video-from-username-${video.id}" class="hLink" href="${video.creatorUrl}">${utils.asciify(video.creatorName)}</a></span>
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
    }, `</td></tr></tbody>`]
}
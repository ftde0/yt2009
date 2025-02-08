// source: video_list_proto.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

goog.exportSymbol('proto.browse_proto.aboutRenderer', null, global);
goog.exportSymbol('proto.browse_proto.aboutRenderer.externalSite', null, global);
goog.exportSymbol('proto.browse_proto.accountTabLink', null, global);
goog.exportSymbol('proto.browse_proto.accountTabLink.icon', null, global);
goog.exportSymbol('proto.browse_proto.browseNavigation', null, global);
goog.exportSymbol('proto.browse_proto.browseNavigation.browseData', null, global);
goog.exportSymbol('proto.browse_proto.channelRenderer', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.authorAvatarType', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.authorData', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.authorData.authorDataContent', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.longAuthorData', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.navigationData', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.navigationData.navData', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.navigationData.navType', null, global);
goog.exportSymbol('proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType', null, global);
goog.exportSymbol('proto.browse_proto.itemSectionRenderer', null, global);
goog.exportSymbol('proto.browse_proto.itemSectionRenderer.icsContents', null, global);
goog.exportSymbol('proto.browse_proto.nextRequest', null, global);
goog.exportSymbol('proto.browse_proto.nextRequest.continuationData', null, global);
goog.exportSymbol('proto.browse_proto.ownerData', null, global);
goog.exportSymbol('proto.browse_proto.ownerData.ownerContainer', null, global);
goog.exportSymbol('proto.browse_proto.playlistData', null, global);
goog.exportSymbol('proto.browse_proto.playlistData.playlistVideo', null, global);
goog.exportSymbol('proto.browse_proto.playlistData.playlistVideo.contents', null, global);
goog.exportSymbol('proto.browse_proto.playlistData.playlistVideo.contents.endpointData', null, global);
goog.exportSymbol('proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents', null, global);
goog.exportSymbol('proto.browse_proto.playlistRenderer', null, global);
goog.exportSymbol('proto.browse_proto.root', null, global);
goog.exportSymbol('proto.browse_proto.root.contextType', null, global);
goog.exportSymbol('proto.browse_proto.root.contextType.clientType', null, global);
goog.exportSymbol('proto.browse_proto.root.contextType.clientType.clientParam', null, global);
goog.exportSymbol('proto.browse_proto.root.headerRender', null, global);
goog.exportSymbol('proto.browse_proto.root.headerRender.c4Header', null, global);
goog.exportSymbol('proto.browse_proto.root.headerRender.headerContent', null, global);
goog.exportSymbol('proto.browse_proto.root.headerRender.vlHeader', null, global);
goog.exportSymbol('proto.browse_proto.root.headerRender.vlHeader.pb11', null, global);
goog.exportSymbol('proto.browse_proto.root.responseBody', null, global);
goog.exportSymbol('proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer', null, global);
goog.exportSymbol('proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs', null, global);
goog.exportSymbol('proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer', null, global);
goog.exportSymbol('proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry', null, global);
goog.exportSymbol('proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData', null, global);
goog.exportSymbol('proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData', null, global);
goog.exportSymbol('proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData', null, global);
goog.exportSymbol('proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents', null, global);
goog.exportSymbol('proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon', null, global);
goog.exportSymbol('proto.browse_proto.shelfRenderer', null, global);
goog.exportSymbol('proto.browse_proto.shelfRenderer.contents', null, global);
goog.exportSymbol('proto.browse_proto.shelfRenderer.contents.shelfContents', null, global);
goog.exportSymbol('proto.browse_proto.shelfRenderer.contents.shelfContents.contents', null, global);
goog.exportSymbol('proto.browse_proto.shelfRenderer.shelfHeader', null, global);
goog.exportSymbol('proto.browse_proto.shelfRenderer.shelfHeader.contents', null, global);
goog.exportSymbol('proto.browse_proto.subscribeButtonData', null, global);
goog.exportSymbol('proto.browse_proto.subscribeButtonData.subContents', null, global);
goog.exportSymbol('proto.browse_proto.subscribeButtonData.subContents.subAction', null, global);
goog.exportSymbol('proto.browse_proto.subscribeButtonData.subContents.subAction.sub1', null, global);
goog.exportSymbol('proto.browse_proto.subscribeButtonData.subContents.subAction.sub2', null, global);
goog.exportSymbol('proto.browse_proto.textRuns', null, global);
goog.exportSymbol('proto.browse_proto.textRuns.textRun', null, global);
goog.exportSymbol('proto.browse_proto.thumbnails', null, global);
goog.exportSymbol('proto.browse_proto.thumbnails.thumbnail', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.nextRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.nextRequest.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.nextRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.nextRequest.displayName = 'proto.browse_proto.nextRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.nextRequest.continuationData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.nextRequest.continuationData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.nextRequest.continuationData.displayName = 'proto.browse_proto.nextRequest.continuationData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.textRuns = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.textRuns.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.textRuns, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.textRuns.displayName = 'proto.browse_proto.textRuns';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.textRuns.textRun = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.textRuns.textRun, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.textRuns.textRun.displayName = 'proto.browse_proto.textRuns.textRun';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.subscribeButtonData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.subscribeButtonData.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.subscribeButtonData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.subscribeButtonData.displayName = 'proto.browse_proto.subscribeButtonData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.subscribeButtonData.subContents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.subscribeButtonData.subContents.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.subscribeButtonData.subContents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.subscribeButtonData.subContents.displayName = 'proto.browse_proto.subscribeButtonData.subContents';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.subscribeButtonData.subContents.subAction = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.subscribeButtonData.subContents.subAction.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.subscribeButtonData.subContents.subAction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.subscribeButtonData.subContents.subAction.displayName = 'proto.browse_proto.subscribeButtonData.subContents.subAction';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub1 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.subscribeButtonData.subContents.subAction.sub1, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.displayName = 'proto.browse_proto.subscribeButtonData.subContents.subAction.sub1';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub2 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.subscribeButtonData.subContents.subAction.sub2, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.displayName = 'proto.browse_proto.subscribeButtonData.subContents.subAction.sub2';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.thumbnails = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.thumbnails.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.thumbnails, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.thumbnails.displayName = 'proto.browse_proto.thumbnails';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.thumbnails.thumbnail = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.thumbnails.thumbnail, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.thumbnails.thumbnail.displayName = 'proto.browse_proto.thumbnails.thumbnail';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.browseNavigation = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.browseNavigation.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.browseNavigation, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.browseNavigation.displayName = 'proto.browse_proto.browseNavigation';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.browseNavigation.browseData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.browseNavigation.browseData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.browseNavigation.browseData.displayName = 'proto.browse_proto.browseNavigation.browseData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.compactVideoRenderer.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.displayName = 'proto.browse_proto.compactVideoRenderer';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.authorData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.compactVideoRenderer.authorData.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.authorData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.authorData.displayName = 'proto.browse_proto.compactVideoRenderer.authorData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.authorData.authorDataContent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.displayName = 'proto.browse_proto.compactVideoRenderer.authorData.authorDataContent';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.displayName = 'proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.displayName = 'proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.navigationData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.compactVideoRenderer.navigationData.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.navigationData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.navigationData.displayName = 'proto.browse_proto.compactVideoRenderer.navigationData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.compactVideoRenderer.navigationData.navType.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.navigationData.navType, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.navigationData.navType.displayName = 'proto.browse_proto.compactVideoRenderer.navigationData.navType';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.displayName = 'proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.navigationData.navData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.navigationData.navData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.navigationData.navData.displayName = 'proto.browse_proto.compactVideoRenderer.navigationData.navData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.longAuthorData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.compactVideoRenderer.longAuthorData.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.longAuthorData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.longAuthorData.displayName = 'proto.browse_proto.compactVideoRenderer.longAuthorData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.displayName = 'proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.displayName = 'proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.displayName = 'proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.compactVideoRenderer.authorAvatarType.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.authorAvatarType, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.authorAvatarType.displayName = 'proto.browse_proto.compactVideoRenderer.authorAvatarType';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.displayName = 'proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.ownerData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.ownerData.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.ownerData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.ownerData.displayName = 'proto.browse_proto.ownerData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.ownerData.ownerContainer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.ownerData.ownerContainer.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.ownerData.ownerContainer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.ownerData.ownerContainer.displayName = 'proto.browse_proto.ownerData.ownerContainer';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.playlistRenderer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.playlistRenderer.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.playlistRenderer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.playlistRenderer.displayName = 'proto.browse_proto.playlistRenderer';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.aboutRenderer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.aboutRenderer.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.aboutRenderer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.aboutRenderer.displayName = 'proto.browse_proto.aboutRenderer';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.aboutRenderer.externalSite = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.aboutRenderer.externalSite.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.aboutRenderer.externalSite, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.aboutRenderer.externalSite.displayName = 'proto.browse_proto.aboutRenderer.externalSite';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.channelRenderer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.channelRenderer.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.channelRenderer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.channelRenderer.displayName = 'proto.browse_proto.channelRenderer';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.shelfRenderer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.shelfRenderer.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.shelfRenderer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.shelfRenderer.displayName = 'proto.browse_proto.shelfRenderer';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.shelfRenderer.shelfHeader = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.shelfRenderer.shelfHeader.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.shelfRenderer.shelfHeader, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.shelfRenderer.shelfHeader.displayName = 'proto.browse_proto.shelfRenderer.shelfHeader';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.shelfRenderer.shelfHeader.contents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.shelfRenderer.shelfHeader.contents.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.shelfRenderer.shelfHeader.contents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.shelfRenderer.shelfHeader.contents.displayName = 'proto.browse_proto.shelfRenderer.shelfHeader.contents';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.shelfRenderer.contents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.shelfRenderer.contents.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.shelfRenderer.contents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.shelfRenderer.contents.displayName = 'proto.browse_proto.shelfRenderer.contents';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.shelfRenderer.contents.shelfContents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.shelfRenderer.contents.shelfContents.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.shelfRenderer.contents.shelfContents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.shelfRenderer.contents.shelfContents.displayName = 'proto.browse_proto.shelfRenderer.contents.shelfContents';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.shelfRenderer.contents.shelfContents.contents.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.shelfRenderer.contents.shelfContents.contents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.shelfRenderer.contents.shelfContents.contents.displayName = 'proto.browse_proto.shelfRenderer.contents.shelfContents.contents';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.playlistData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.playlistData.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.playlistData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.playlistData.displayName = 'proto.browse_proto.playlistData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.playlistData.playlistVideo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.playlistData.playlistVideo.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.playlistData.playlistVideo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.playlistData.playlistVideo.displayName = 'proto.browse_proto.playlistData.playlistVideo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.playlistData.playlistVideo.contents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.playlistData.playlistVideo.contents.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.playlistData.playlistVideo.contents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.playlistData.playlistVideo.contents.displayName = 'proto.browse_proto.playlistData.playlistVideo.contents';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.playlistData.playlistVideo.contents.endpointData.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.playlistData.playlistVideo.contents.endpointData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.playlistData.playlistVideo.contents.endpointData.displayName = 'proto.browse_proto.playlistData.playlistVideo.contents.endpointData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.displayName = 'proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.accountTabLink = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.accountTabLink.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.accountTabLink, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.accountTabLink.displayName = 'proto.browse_proto.accountTabLink';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.accountTabLink.icon = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.accountTabLink.icon, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.accountTabLink.icon.displayName = 'proto.browse_proto.accountTabLink.icon';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.itemSectionRenderer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.itemSectionRenderer.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.itemSectionRenderer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.itemSectionRenderer.displayName = 'proto.browse_proto.itemSectionRenderer';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.itemSectionRenderer.icsContents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.itemSectionRenderer.icsContents.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.itemSectionRenderer.icsContents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.itemSectionRenderer.icsContents.displayName = 'proto.browse_proto.itemSectionRenderer.icsContents';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.root.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.displayName = 'proto.browse_proto.root';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.contextType = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.root.contextType.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.contextType, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.contextType.displayName = 'proto.browse_proto.root.contextType';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.contextType.clientType = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.root.contextType.clientType.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.contextType.clientType, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.contextType.clientType.displayName = 'proto.browse_proto.root.contextType.clientType';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.contextType.clientType.clientParam = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.root.contextType.clientType.clientParam, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.contextType.clientType.clientParam.displayName = 'proto.browse_proto.root.contextType.clientType.clientParam';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.responseBody = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.root.responseBody.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.responseBody, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.responseBody.displayName = 'proto.browse_proto.root.responseBody';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.displayName = 'proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.displayName = 'proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.displayName = 'proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.displayName = 'proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.displayName = 'proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.displayName = 'proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.displayName = 'proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.displayName = 'proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.displayName = 'proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.headerRender = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.browse_proto.root.headerRender.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.headerRender, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.headerRender.displayName = 'proto.browse_proto.root.headerRender';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.headerRender.headerContent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.root.headerRender.headerContent.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.headerRender.headerContent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.headerRender.headerContent.displayName = 'proto.browse_proto.root.headerRender.headerContent';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.headerRender.c4Header = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.root.headerRender.c4Header.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.headerRender.c4Header, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.headerRender.c4Header.displayName = 'proto.browse_proto.root.headerRender.c4Header';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.headerRender.vlHeader = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.browse_proto.root.headerRender.vlHeader.repeatedFields_, null);
};
goog.inherits(proto.browse_proto.root.headerRender.vlHeader, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.headerRender.vlHeader.displayName = 'proto.browse_proto.root.headerRender.vlHeader';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.browse_proto.root.headerRender.vlHeader.pb11 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.browse_proto.root.headerRender.vlHeader.pb11, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.browse_proto.root.headerRender.vlHeader.pb11.displayName = 'proto.browse_proto.root.headerRender.vlHeader.pb11';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.nextRequest.repeatedFields_ = [52047593];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.nextRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.nextRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.nextRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.nextRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    int1: jspb.Message.getFieldWithDefault(msg, 1, 0),
    continuationList: jspb.Message.toObjectList(msg.getContinuationList(),
    proto.browse_proto.nextRequest.continuationData.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.nextRequest}
 */
proto.browse_proto.nextRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.nextRequest;
  return proto.browse_proto.nextRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.nextRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.nextRequest}
 */
proto.browse_proto.nextRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt1(value);
      break;
    case 52047593:
      var value = new proto.browse_proto.nextRequest.continuationData;
      reader.readMessage(value,proto.browse_proto.nextRequest.continuationData.deserializeBinaryFromReader);
      msg.addContinuation(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.nextRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.nextRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.nextRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.nextRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getInt1();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getContinuationList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      52047593,
      f,
      proto.browse_proto.nextRequest.continuationData.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.nextRequest.continuationData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.nextRequest.continuationData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.nextRequest.continuationData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.nextRequest.continuationData.toObject = function(includeInstance, msg) {
  var f, obj = {
    token: jspb.Message.getFieldWithDefault(msg, 1, ""),
    int2: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.nextRequest.continuationData}
 */
proto.browse_proto.nextRequest.continuationData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.nextRequest.continuationData;
  return proto.browse_proto.nextRequest.continuationData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.nextRequest.continuationData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.nextRequest.continuationData}
 */
proto.browse_proto.nextRequest.continuationData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setToken(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt2(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.nextRequest.continuationData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.nextRequest.continuationData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.nextRequest.continuationData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.nextRequest.continuationData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getToken();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getInt2();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional string token = 1;
 * @return {string}
 */
proto.browse_proto.nextRequest.continuationData.prototype.getToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.nextRequest.continuationData} returns this
 */
proto.browse_proto.nextRequest.continuationData.prototype.setToken = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 int2 = 2;
 * @return {number}
 */
proto.browse_proto.nextRequest.continuationData.prototype.getInt2 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.nextRequest.continuationData} returns this
 */
proto.browse_proto.nextRequest.continuationData.prototype.setInt2 = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 int1 = 1;
 * @return {number}
 */
proto.browse_proto.nextRequest.prototype.getInt1 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.nextRequest} returns this
 */
proto.browse_proto.nextRequest.prototype.setInt1 = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated continuationData continuation = 52047593;
 * @return {!Array<!proto.browse_proto.nextRequest.continuationData>}
 */
proto.browse_proto.nextRequest.prototype.getContinuationList = function() {
  return /** @type{!Array<!proto.browse_proto.nextRequest.continuationData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.nextRequest.continuationData, 52047593));
};


/**
 * @param {!Array<!proto.browse_proto.nextRequest.continuationData>} value
 * @return {!proto.browse_proto.nextRequest} returns this
*/
proto.browse_proto.nextRequest.prototype.setContinuationList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 52047593, value);
};


/**
 * @param {!proto.browse_proto.nextRequest.continuationData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.nextRequest.continuationData}
 */
proto.browse_proto.nextRequest.prototype.addContinuation = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 52047593, opt_value, proto.browse_proto.nextRequest.continuationData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.nextRequest} returns this
 */
proto.browse_proto.nextRequest.prototype.clearContinuationList = function() {
  return this.setContinuationList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.textRuns.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.textRuns.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.textRuns.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.textRuns} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.textRuns.toObject = function(includeInstance, msg) {
  var f, obj = {
    runList: jspb.Message.toObjectList(msg.getRunList(),
    proto.browse_proto.textRuns.textRun.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.textRuns.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.textRuns;
  return proto.browse_proto.textRuns.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.textRuns} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.textRuns.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.textRuns.textRun;
      reader.readMessage(value,proto.browse_proto.textRuns.textRun.deserializeBinaryFromReader);
      msg.addRun(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.textRuns.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.textRuns.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.textRuns} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.textRuns.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRunList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.textRuns.textRun.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.textRuns.textRun.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.textRuns.textRun.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.textRuns.textRun} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.textRuns.textRun.toObject = function(includeInstance, msg) {
  var f, obj = {
    text: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.textRuns.textRun}
 */
proto.browse_proto.textRuns.textRun.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.textRuns.textRun;
  return proto.browse_proto.textRuns.textRun.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.textRuns.textRun} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.textRuns.textRun}
 */
proto.browse_proto.textRuns.textRun.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setText(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.textRuns.textRun.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.textRuns.textRun.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.textRuns.textRun} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.textRuns.textRun.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getText();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string text = 1;
 * @return {string}
 */
proto.browse_proto.textRuns.textRun.prototype.getText = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.textRuns.textRun} returns this
 */
proto.browse_proto.textRuns.textRun.prototype.setText = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated textRun run = 1;
 * @return {!Array<!proto.browse_proto.textRuns.textRun>}
 */
proto.browse_proto.textRuns.prototype.getRunList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns.textRun>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns.textRun, 1));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns.textRun>} value
 * @return {!proto.browse_proto.textRuns} returns this
*/
proto.browse_proto.textRuns.prototype.setRunList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.textRuns.textRun=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns.textRun}
 */
proto.browse_proto.textRuns.prototype.addRun = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.textRuns.textRun, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.textRuns} returns this
 */
proto.browse_proto.textRuns.prototype.clearRunList = function() {
  return this.setRunList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.subscribeButtonData.repeatedFields_ = [55419609];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.subscribeButtonData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.subscribeButtonData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.subscribeButtonData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.subscribeButtonData.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.browse_proto.subscribeButtonData.subContents.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.subscribeButtonData}
 */
proto.browse_proto.subscribeButtonData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.subscribeButtonData;
  return proto.browse_proto.subscribeButtonData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.subscribeButtonData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.subscribeButtonData}
 */
proto.browse_proto.subscribeButtonData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 55419609:
      var value = new proto.browse_proto.subscribeButtonData.subContents;
      reader.readMessage(value,proto.browse_proto.subscribeButtonData.subContents.deserializeBinaryFromReader);
      msg.addContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.subscribeButtonData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.subscribeButtonData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.subscribeButtonData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.subscribeButtonData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      55419609,
      f,
      proto.browse_proto.subscribeButtonData.subContents.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.subscribeButtonData.subContents.repeatedFields_ = [1,12,13,16,18];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.subscribeButtonData.subContents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.subscribeButtonData.subContents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.subscribeButtonData.subContents.toObject = function(includeInstance, msg) {
  var f, obj = {
    subscribebuttonList: jspb.Message.toObjectList(msg.getSubscribebuttonList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    int3: jspb.Message.getFieldWithDefault(msg, 3, 0),
    int4: jspb.Message.getFieldWithDefault(msg, 4, 0),
    int6: jspb.Message.getFieldWithDefault(msg, 6, 0),
    channelid: jspb.Message.getFieldWithDefault(msg, 7, ""),
    int8: jspb.Message.getFieldWithDefault(msg, 8, 0),
    subscribedlabelList: jspb.Message.toObjectList(msg.getSubscribedlabelList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    subscribelabelList: jspb.Message.toObjectList(msg.getSubscribelabelList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    unsubscribelabelList: jspb.Message.toObjectList(msg.getUnsubscribelabelList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    actionList: jspb.Message.toObjectList(msg.getActionList(),
    proto.browse_proto.subscribeButtonData.subContents.subAction.toObject, includeInstance),
    identifier: jspb.Message.getFieldWithDefault(msg, 31, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.subscribeButtonData.subContents}
 */
proto.browse_proto.subscribeButtonData.subContents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.subscribeButtonData.subContents;
  return proto.browse_proto.subscribeButtonData.subContents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.subscribeButtonData.subContents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.subscribeButtonData.subContents}
 */
proto.browse_proto.subscribeButtonData.subContents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addSubscribebutton(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt3(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt4(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt6(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setChannelid(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt8(value);
      break;
    case 12:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addSubscribedlabel(value);
      break;
    case 13:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addSubscribelabel(value);
      break;
    case 16:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addUnsubscribelabel(value);
      break;
    case 18:
      var value = new proto.browse_proto.subscribeButtonData.subContents.subAction;
      reader.readMessage(value,proto.browse_proto.subscribeButtonData.subContents.subAction.deserializeBinaryFromReader);
      msg.addAction(value);
      break;
    case 31:
      var value = /** @type {string} */ (reader.readString());
      msg.setIdentifier(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.subscribeButtonData.subContents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.subscribeButtonData.subContents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.subscribeButtonData.subContents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSubscribebuttonList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = message.getChannelid();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 8));
  if (f != null) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getSubscribedlabelList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      12,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getSubscribelabelList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      13,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getUnsubscribelabelList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      16,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getActionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      18,
      f,
      proto.browse_proto.subscribeButtonData.subContents.subAction.serializeBinaryToWriter
    );
  }
  f = message.getIdentifier();
  if (f.length > 0) {
    writer.writeString(
      31,
      f
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.repeatedFields_ = [68997349,68997401];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.subscribeButtonData.subContents.subAction.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.subscribeButtonData.subContents.subAction} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.toObject = function(includeInstance, msg) {
  var f, obj = {
    subscr1List: jspb.Message.toObjectList(msg.getSubscr1List(),
    proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.toObject, includeInstance),
    subscr2List: jspb.Message.toObjectList(msg.getSubscr2List(),
    proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.subscribeButtonData.subContents.subAction;
  return proto.browse_proto.subscribeButtonData.subContents.subAction.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.subscribeButtonData.subContents.subAction} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 68997349:
      var value = new proto.browse_proto.subscribeButtonData.subContents.subAction.sub1;
      reader.readMessage(value,proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.deserializeBinaryFromReader);
      msg.addSubscr1(value);
      break;
    case 68997401:
      var value = new proto.browse_proto.subscribeButtonData.subContents.subAction.sub2;
      reader.readMessage(value,proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.deserializeBinaryFromReader);
      msg.addSubscr2(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.subscribeButtonData.subContents.subAction.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.subscribeButtonData.subContents.subAction} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSubscr1List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      68997349,
      f,
      proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.serializeBinaryToWriter
    );
  }
  f = message.getSubscr2List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      68997401,
      f,
      proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub1} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    params: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub1}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.subscribeButtonData.subContents.subAction.sub1;
  return proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub1} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub1}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setParams(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub1} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getParams();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub1} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string params = 3;
 * @return {string}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.prototype.getParams = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub1} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub1.prototype.setParams = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub2} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    params: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub2}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.subscribeButtonData.subContents.subAction.sub2;
  return proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub2} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub2}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setParams(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub2} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getParams();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub2} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string params = 4;
 * @return {string}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.prototype.getParams = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub2} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.sub2.prototype.setParams = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated sub1 subscr1 = 68997349;
 * @return {!Array<!proto.browse_proto.subscribeButtonData.subContents.subAction.sub1>}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.prototype.getSubscr1List = function() {
  return /** @type{!Array<!proto.browse_proto.subscribeButtonData.subContents.subAction.sub1>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.subscribeButtonData.subContents.subAction.sub1, 68997349));
};


/**
 * @param {!Array<!proto.browse_proto.subscribeButtonData.subContents.subAction.sub1>} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction} returns this
*/
proto.browse_proto.subscribeButtonData.subContents.subAction.prototype.setSubscr1List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 68997349, value);
};


/**
 * @param {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub1=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub1}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.prototype.addSubscr1 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 68997349, opt_value, proto.browse_proto.subscribeButtonData.subContents.subAction.sub1, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.prototype.clearSubscr1List = function() {
  return this.setSubscr1List([]);
};


/**
 * repeated sub2 subscr2 = 68997401;
 * @return {!Array<!proto.browse_proto.subscribeButtonData.subContents.subAction.sub2>}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.prototype.getSubscr2List = function() {
  return /** @type{!Array<!proto.browse_proto.subscribeButtonData.subContents.subAction.sub2>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.subscribeButtonData.subContents.subAction.sub2, 68997401));
};


/**
 * @param {!Array<!proto.browse_proto.subscribeButtonData.subContents.subAction.sub2>} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction} returns this
*/
proto.browse_proto.subscribeButtonData.subContents.subAction.prototype.setSubscr2List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 68997401, value);
};


/**
 * @param {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub2=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction.sub2}
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.prototype.addSubscr2 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 68997401, opt_value, proto.browse_proto.subscribeButtonData.subContents.subAction.sub2, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.subAction.prototype.clearSubscr2List = function() {
  return this.setSubscr2List([]);
};


/**
 * repeated textRuns subscribeButton = 1;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.getSubscribebuttonList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 1));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
*/
proto.browse_proto.subscribeButtonData.subContents.prototype.setSubscribebuttonList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.addSubscribebutton = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.clearSubscribebuttonList = function() {
  return this.setSubscribebuttonList([]);
};


/**
 * optional int32 int3 = 3;
 * @return {number}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.getInt3 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.setInt3 = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.clearInt3 = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.hasInt3 = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional int32 int4 = 4;
 * @return {number}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.getInt4 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.setInt4 = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.clearInt4 = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.hasInt4 = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional int32 int6 = 6;
 * @return {number}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.getInt6 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.setInt6 = function(value) {
  return jspb.Message.setField(this, 6, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.clearInt6 = function() {
  return jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.hasInt6 = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional string channelId = 7;
 * @return {string}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.getChannelid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.setChannelid = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional int32 int8 = 8;
 * @return {number}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.getInt8 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.setInt8 = function(value) {
  return jspb.Message.setField(this, 8, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.clearInt8 = function() {
  return jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.hasInt8 = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * repeated textRuns subscribedLabel = 12;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.getSubscribedlabelList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 12));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
*/
proto.browse_proto.subscribeButtonData.subContents.prototype.setSubscribedlabelList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 12, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.addSubscribedlabel = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 12, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.clearSubscribedlabelList = function() {
  return this.setSubscribedlabelList([]);
};


/**
 * repeated textRuns subscribeLabel = 13;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.getSubscribelabelList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 13));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
*/
proto.browse_proto.subscribeButtonData.subContents.prototype.setSubscribelabelList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 13, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.addSubscribelabel = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 13, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.clearSubscribelabelList = function() {
  return this.setSubscribelabelList([]);
};


/**
 * repeated textRuns unsubscribeLabel = 16;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.getUnsubscribelabelList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 16));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
*/
proto.browse_proto.subscribeButtonData.subContents.prototype.setUnsubscribelabelList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 16, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.addUnsubscribelabel = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 16, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.clearUnsubscribelabelList = function() {
  return this.setUnsubscribelabelList([]);
};


/**
 * repeated subAction action = 18;
 * @return {!Array<!proto.browse_proto.subscribeButtonData.subContents.subAction>}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.getActionList = function() {
  return /** @type{!Array<!proto.browse_proto.subscribeButtonData.subContents.subAction>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.subscribeButtonData.subContents.subAction, 18));
};


/**
 * @param {!Array<!proto.browse_proto.subscribeButtonData.subContents.subAction>} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
*/
proto.browse_proto.subscribeButtonData.subContents.prototype.setActionList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 18, value);
};


/**
 * @param {!proto.browse_proto.subscribeButtonData.subContents.subAction=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.subscribeButtonData.subContents.subAction}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.addAction = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 18, opt_value, proto.browse_proto.subscribeButtonData.subContents.subAction, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.clearActionList = function() {
  return this.setActionList([]);
};


/**
 * optional string identifier = 31;
 * @return {string}
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.getIdentifier = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 31, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.subscribeButtonData.subContents} returns this
 */
proto.browse_proto.subscribeButtonData.subContents.prototype.setIdentifier = function(value) {
  return jspb.Message.setProto3StringField(this, 31, value);
};


/**
 * repeated subContents content = 55419609;
 * @return {!Array<!proto.browse_proto.subscribeButtonData.subContents>}
 */
proto.browse_proto.subscribeButtonData.prototype.getContentList = function() {
  return /** @type{!Array<!proto.browse_proto.subscribeButtonData.subContents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.subscribeButtonData.subContents, 55419609));
};


/**
 * @param {!Array<!proto.browse_proto.subscribeButtonData.subContents>} value
 * @return {!proto.browse_proto.subscribeButtonData} returns this
*/
proto.browse_proto.subscribeButtonData.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 55419609, value);
};


/**
 * @param {!proto.browse_proto.subscribeButtonData.subContents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.subscribeButtonData.subContents}
 */
proto.browse_proto.subscribeButtonData.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 55419609, opt_value, proto.browse_proto.subscribeButtonData.subContents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.subscribeButtonData} returns this
 */
proto.browse_proto.subscribeButtonData.prototype.clearContentList = function() {
  return this.setContentList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.thumbnails.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.thumbnails.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.thumbnails.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.thumbnails} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.thumbnails.toObject = function(includeInstance, msg) {
  var f, obj = {
    thumbList: jspb.Message.toObjectList(msg.getThumbList(),
    proto.browse_proto.thumbnails.thumbnail.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.thumbnails.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.thumbnails;
  return proto.browse_proto.thumbnails.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.thumbnails} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.thumbnails.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.thumbnails.thumbnail;
      reader.readMessage(value,proto.browse_proto.thumbnails.thumbnail.deserializeBinaryFromReader);
      msg.addThumb(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.thumbnails.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.thumbnails.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.thumbnails} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.thumbnails.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getThumbList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.thumbnails.thumbnail.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.thumbnails.thumbnail.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.thumbnails.thumbnail.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.thumbnails.thumbnail} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.thumbnails.thumbnail.toObject = function(includeInstance, msg) {
  var f, obj = {
    url: jspb.Message.getFieldWithDefault(msg, 1, ""),
    width: jspb.Message.getFieldWithDefault(msg, 2, 0),
    height: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.thumbnails.thumbnail}
 */
proto.browse_proto.thumbnails.thumbnail.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.thumbnails.thumbnail;
  return proto.browse_proto.thumbnails.thumbnail.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.thumbnails.thumbnail} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.thumbnails.thumbnail}
 */
proto.browse_proto.thumbnails.thumbnail.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setWidth(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.thumbnails.thumbnail.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.thumbnails.thumbnail.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.thumbnails.thumbnail} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.thumbnails.thumbnail.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getWidth();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getHeight();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * optional string url = 1;
 * @return {string}
 */
proto.browse_proto.thumbnails.thumbnail.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.thumbnails.thumbnail} returns this
 */
proto.browse_proto.thumbnails.thumbnail.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 width = 2;
 * @return {number}
 */
proto.browse_proto.thumbnails.thumbnail.prototype.getWidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.thumbnails.thumbnail} returns this
 */
proto.browse_proto.thumbnails.thumbnail.prototype.setWidth = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 height = 3;
 * @return {number}
 */
proto.browse_proto.thumbnails.thumbnail.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.thumbnails.thumbnail} returns this
 */
proto.browse_proto.thumbnails.thumbnail.prototype.setHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * repeated thumbnail thumb = 1;
 * @return {!Array<!proto.browse_proto.thumbnails.thumbnail>}
 */
proto.browse_proto.thumbnails.prototype.getThumbList = function() {
  return /** @type{!Array<!proto.browse_proto.thumbnails.thumbnail>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.thumbnails.thumbnail, 1));
};


/**
 * @param {!Array<!proto.browse_proto.thumbnails.thumbnail>} value
 * @return {!proto.browse_proto.thumbnails} returns this
*/
proto.browse_proto.thumbnails.prototype.setThumbList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.thumbnails.thumbnail=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.thumbnails.thumbnail}
 */
proto.browse_proto.thumbnails.prototype.addThumb = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.thumbnails.thumbnail, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.thumbnails} returns this
 */
proto.browse_proto.thumbnails.prototype.clearThumbList = function() {
  return this.setThumbList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.browseNavigation.repeatedFields_ = [48687626];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.browseNavigation.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.browseNavigation.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.browseNavigation} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.browseNavigation.toObject = function(includeInstance, msg) {
  var f, obj = {
    dataList: jspb.Message.toObjectList(msg.getDataList(),
    proto.browse_proto.browseNavigation.browseData.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.browseNavigation}
 */
proto.browse_proto.browseNavigation.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.browseNavigation;
  return proto.browse_proto.browseNavigation.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.browseNavigation} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.browseNavigation}
 */
proto.browse_proto.browseNavigation.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 48687626:
      var value = new proto.browse_proto.browseNavigation.browseData;
      reader.readMessage(value,proto.browse_proto.browseNavigation.browseData.deserializeBinaryFromReader);
      msg.addData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.browseNavigation.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.browseNavigation.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.browseNavigation} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.browseNavigation.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      48687626,
      f,
      proto.browse_proto.browseNavigation.browseData.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.browseNavigation.browseData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.browseNavigation.browseData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.browseNavigation.browseData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.browseNavigation.browseData.toObject = function(includeInstance, msg) {
  var f, obj = {
    browseid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    params: jspb.Message.getFieldWithDefault(msg, 3, ""),
    canonicalbaseurl: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.browseNavigation.browseData}
 */
proto.browse_proto.browseNavigation.browseData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.browseNavigation.browseData;
  return proto.browse_proto.browseNavigation.browseData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.browseNavigation.browseData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.browseNavigation.browseData}
 */
proto.browse_proto.browseNavigation.browseData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setBrowseid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setParams(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setCanonicalbaseurl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.browseNavigation.browseData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.browseNavigation.browseData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.browseNavigation.browseData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.browseNavigation.browseData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBrowseid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getParams();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getCanonicalbaseurl();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string browseId = 2;
 * @return {string}
 */
proto.browse_proto.browseNavigation.browseData.prototype.getBrowseid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.browseNavigation.browseData} returns this
 */
proto.browse_proto.browseNavigation.browseData.prototype.setBrowseid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string params = 3;
 * @return {string}
 */
proto.browse_proto.browseNavigation.browseData.prototype.getParams = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.browseNavigation.browseData} returns this
 */
proto.browse_proto.browseNavigation.browseData.prototype.setParams = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string canonicalBaseUrl = 4;
 * @return {string}
 */
proto.browse_proto.browseNavigation.browseData.prototype.getCanonicalbaseurl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.browseNavigation.browseData} returns this
 */
proto.browse_proto.browseNavigation.browseData.prototype.setCanonicalbaseurl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated browseData data = 48687626;
 * @return {!Array<!proto.browse_proto.browseNavigation.browseData>}
 */
proto.browse_proto.browseNavigation.prototype.getDataList = function() {
  return /** @type{!Array<!proto.browse_proto.browseNavigation.browseData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.browseNavigation.browseData, 48687626));
};


/**
 * @param {!Array<!proto.browse_proto.browseNavigation.browseData>} value
 * @return {!proto.browse_proto.browseNavigation} returns this
*/
proto.browse_proto.browseNavigation.prototype.setDataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 48687626, value);
};


/**
 * @param {!proto.browse_proto.browseNavigation.browseData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.browseNavigation.browseData}
 */
proto.browse_proto.browseNavigation.prototype.addData = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 48687626, opt_value, proto.browse_proto.browseNavigation.browseData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.browseNavigation} returns this
 */
proto.browse_proto.browseNavigation.prototype.clearDataList = function() {
  return this.setDataList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.compactVideoRenderer.repeatedFields_ = [2,3,4,5,6,7,8,10,14,23];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.toObject = function(includeInstance, msg) {
  var f, obj = {
    videoid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    thumblistList: jspb.Message.toObjectList(msg.getThumblistList(),
    proto.browse_proto.thumbnails.toObject, includeInstance),
    titledataList: jspb.Message.toObjectList(msg.getTitledataList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    authorList: jspb.Message.toObjectList(msg.getAuthorList(),
    proto.browse_proto.compactVideoRenderer.authorData.toObject, includeInstance),
    publishedtimetextList: jspb.Message.toObjectList(msg.getPublishedtimetextList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    viewcounttextList: jspb.Message.toObjectList(msg.getViewcounttextList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    lengthtextList: jspb.Message.toObjectList(msg.getLengthtextList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    navdataList: jspb.Message.toObjectList(msg.getNavdataList(),
    proto.browse_proto.compactVideoRenderer.navigationData.toObject, includeInstance),
    ladataList: jspb.Message.toObjectList(msg.getLadataList(),
    proto.browse_proto.compactVideoRenderer.longAuthorData.toObject, includeInstance),
    authoravatarList: jspb.Message.toObjectList(msg.getAuthoravatarList(),
    proto.browse_proto.compactVideoRenderer.authorAvatarType.toObject, includeInstance),
    shortviewcountsList: jspb.Message.toObjectList(msg.getShortviewcountsList(),
    proto.browse_proto.textRuns.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer}
 */
proto.browse_proto.compactVideoRenderer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer;
  return proto.browse_proto.compactVideoRenderer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer}
 */
proto.browse_proto.compactVideoRenderer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVideoid(value);
      break;
    case 2:
      var value = new proto.browse_proto.thumbnails;
      reader.readMessage(value,proto.browse_proto.thumbnails.deserializeBinaryFromReader);
      msg.addThumblist(value);
      break;
    case 3:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addTitledata(value);
      break;
    case 4:
      var value = new proto.browse_proto.compactVideoRenderer.authorData;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.authorData.deserializeBinaryFromReader);
      msg.addAuthor(value);
      break;
    case 5:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addPublishedtimetext(value);
      break;
    case 6:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addViewcounttext(value);
      break;
    case 7:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addLengthtext(value);
      break;
    case 8:
      var value = new proto.browse_proto.compactVideoRenderer.navigationData;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.navigationData.deserializeBinaryFromReader);
      msg.addNavdata(value);
      break;
    case 10:
      var value = new proto.browse_proto.compactVideoRenderer.longAuthorData;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.longAuthorData.deserializeBinaryFromReader);
      msg.addLadata(value);
      break;
    case 14:
      var value = new proto.browse_proto.compactVideoRenderer.authorAvatarType;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.authorAvatarType.deserializeBinaryFromReader);
      msg.addAuthoravatar(value);
      break;
    case 23:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addShortviewcounts(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVideoid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getThumblistList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.browse_proto.thumbnails.serializeBinaryToWriter
    );
  }
  f = message.getTitledataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getAuthorList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.browse_proto.compactVideoRenderer.authorData.serializeBinaryToWriter
    );
  }
  f = message.getPublishedtimetextList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getViewcounttextList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getLengthtextList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getNavdataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.browse_proto.compactVideoRenderer.navigationData.serializeBinaryToWriter
    );
  }
  f = message.getLadataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      10,
      f,
      proto.browse_proto.compactVideoRenderer.longAuthorData.serializeBinaryToWriter
    );
  }
  f = message.getAuthoravatarList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      14,
      f,
      proto.browse_proto.compactVideoRenderer.authorAvatarType.serializeBinaryToWriter
    );
  }
  f = message.getShortviewcountsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      23,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.compactVideoRenderer.authorData.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.authorData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.authorData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.authorData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.authorData.toObject = function(includeInstance, msg) {
  var f, obj = {
    acList: jspb.Message.toObjectList(msg.getAcList(),
    proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.authorData}
 */
proto.browse_proto.compactVideoRenderer.authorData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.authorData;
  return proto.browse_proto.compactVideoRenderer.authorData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.authorData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.authorData}
 */
proto.browse_proto.compactVideoRenderer.authorData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.compactVideoRenderer.authorData.authorDataContent;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.deserializeBinaryFromReader);
      msg.addAc(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.authorData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.authorData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.authorData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.authorData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAcList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.toObject = function(includeInstance, msg) {
  var f, obj = {
    authordisplayname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    navigationList: jspb.Message.toObjectList(msg.getNavigationList(),
    proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.authorData.authorDataContent;
  return proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAuthordisplayname(value);
      break;
    case 5:
      var value = new proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.deserializeBinaryFromReader);
      msg.addNavigation(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAuthordisplayname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNavigationList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.repeatedFields_ = [48687626];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.toObject = function(includeInstance, msg) {
  var f, obj = {
    authorendpointList: jspb.Message.toObjectList(msg.getAuthorendpointList(),
    proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData;
  return proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 48687626:
      var value = new proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.deserializeBinaryFromReader);
      msg.addAuthorendpoint(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAuthorendpointList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      48687626,
      f,
      proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.toObject = function(includeInstance, msg) {
  var f, obj = {
    browseid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    canonicalbaseurl: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint;
  return proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setBrowseid(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setCanonicalbaseurl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBrowseid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getCanonicalbaseurl();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string browseId = 2;
 * @return {string}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.prototype.getBrowseid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint} returns this
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.prototype.setBrowseid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string canonicalBaseUrl = 4;
 * @return {string}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.prototype.getCanonicalbaseurl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint} returns this
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.prototype.setCanonicalbaseurl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated navigationEndpoint authorEndpoint = 48687626;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint>}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.prototype.getAuthorendpointList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint, 48687626));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint>} value
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData} returns this
*/
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.prototype.setAuthorendpointList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 48687626, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.prototype.addAuthorendpoint = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 48687626, opt_value, proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData} returns this
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.prototype.clearAuthorendpointList = function() {
  return this.setAuthorendpointList([]);
};


/**
 * optional string authorDisplayName = 1;
 * @return {string}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.prototype.getAuthordisplayname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent} returns this
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.prototype.setAuthordisplayname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated authorNavigationData navigation = 5;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData>}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.prototype.getNavigationList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData, 5));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData>} value
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent} returns this
*/
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.prototype.setNavigationList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData}
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.prototype.addNavigation = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.authorNavigationData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent} returns this
 */
proto.browse_proto.compactVideoRenderer.authorData.authorDataContent.prototype.clearNavigationList = function() {
  return this.setNavigationList([]);
};


/**
 * repeated authorDataContent ac = 1;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent>}
 */
proto.browse_proto.compactVideoRenderer.authorData.prototype.getAcList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.authorData.authorDataContent, 1));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent>} value
 * @return {!proto.browse_proto.compactVideoRenderer.authorData} returns this
*/
proto.browse_proto.compactVideoRenderer.authorData.prototype.setAcList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.authorData.authorDataContent}
 */
proto.browse_proto.compactVideoRenderer.authorData.prototype.addAc = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.compactVideoRenderer.authorData.authorDataContent, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer.authorData} returns this
 */
proto.browse_proto.compactVideoRenderer.authorData.prototype.clearAcList = function() {
  return this.setAcList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.compactVideoRenderer.navigationData.repeatedFields_ = [1,48687757];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.navigationData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.navigationData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.navigationData.toObject = function(includeInstance, msg) {
  var f, obj = {
    navList: jspb.Message.toObjectList(msg.getNavList(),
    proto.browse_proto.compactVideoRenderer.navigationData.navType.toObject, includeInstance),
    navpropertiesList: jspb.Message.toObjectList(msg.getNavpropertiesList(),
    proto.browse_proto.compactVideoRenderer.navigationData.navData.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData}
 */
proto.browse_proto.compactVideoRenderer.navigationData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.navigationData;
  return proto.browse_proto.compactVideoRenderer.navigationData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData}
 */
proto.browse_proto.compactVideoRenderer.navigationData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.compactVideoRenderer.navigationData.navType;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.navigationData.navType.deserializeBinaryFromReader);
      msg.addNav(value);
      break;
    case 48687757:
      var value = new proto.browse_proto.compactVideoRenderer.navigationData.navData;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.navigationData.navData.deserializeBinaryFromReader);
      msg.addNavproperties(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.navigationData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.navigationData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.navigationData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNavList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.compactVideoRenderer.navigationData.navType.serializeBinaryToWriter
    );
  }
  f = message.getNavpropertiesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      48687757,
      f,
      proto.browse_proto.compactVideoRenderer.navigationData.navData.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.repeatedFields_ = [19];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.navigationData.navType.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData.navType} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.toObject = function(includeInstance, msg) {
  var f, obj = {
    i1: jspb.Message.getFieldWithDefault(msg, 1, 0),
    i2: jspb.Message.getFieldWithDefault(msg, 2, 0),
    i3: jspb.Message.getFieldWithDefault(msg, 3, 0),
    source: jspb.Message.getFieldWithDefault(msg, 11, ""),
    navextraList: jspb.Message.toObjectList(msg.getNavextraList(),
    proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.navigationData.navType;
  return proto.browse_proto.compactVideoRenderer.navigationData.navType.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData.navType} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setI1(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setI2(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setI3(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setSource(value);
      break;
    case 19:
      var value = new proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.deserializeBinaryFromReader);
      msg.addNavextra(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.navigationData.navType.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData.navType} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getI1();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getI2();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getI3();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getSource();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getNavextraList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      19,
      f,
      proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.toObject = function(includeInstance, msg) {
  var f, obj = {
    i2: jspb.Message.getFieldWithDefault(msg, 2, 0),
    i3: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType;
  return proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setI2(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setI3(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getI2();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getI3();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * optional int32 i2 = 2;
 * @return {number}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.prototype.getI2 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType} returns this
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.prototype.setI2 = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 i3 = 3;
 * @return {number}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.prototype.getI3 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType} returns this
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType.prototype.setI3 = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 i1 = 1;
 * @return {number}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.getI1 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType} returns this
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.setI1 = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 i2 = 2;
 * @return {number}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.getI2 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType} returns this
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.setI2 = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 i3 = 3;
 * @return {number}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.getI3 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType} returns this
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.setI3 = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional string source = 11;
 * @return {string}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.getSource = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType} returns this
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.setSource = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};


/**
 * repeated navExtraType navExtra = 19;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType>}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.getNavextraList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType, 19));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType>} value
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType} returns this
*/
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.setNavextraList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 19, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.addNavextra = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 19, opt_value, proto.browse_proto.compactVideoRenderer.navigationData.navType.navExtraType, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType} returns this
 */
proto.browse_proto.compactVideoRenderer.navigationData.navType.prototype.clearNavextraList = function() {
  return this.setNavextraList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.navigationData.navData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData.navData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.navigationData.navData.toObject = function(includeInstance, msg) {
  var f, obj = {
    navid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navData}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.navigationData.navData;
  return proto.browse_proto.compactVideoRenderer.navigationData.navData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData.navData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navData}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setNavid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.navigationData.navData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData.navData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.navigationData.navData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNavid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string navId = 1;
 * @return {string}
 */
proto.browse_proto.compactVideoRenderer.navigationData.navData.prototype.getNavid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navData} returns this
 */
proto.browse_proto.compactVideoRenderer.navigationData.navData.prototype.setNavid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated navType nav = 1;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.navigationData.navType>}
 */
proto.browse_proto.compactVideoRenderer.navigationData.prototype.getNavList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.navigationData.navType>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.navigationData.navType, 1));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.navigationData.navType>} value
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData} returns this
*/
proto.browse_proto.compactVideoRenderer.navigationData.prototype.setNavList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData.navType=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navType}
 */
proto.browse_proto.compactVideoRenderer.navigationData.prototype.addNav = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.compactVideoRenderer.navigationData.navType, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData} returns this
 */
proto.browse_proto.compactVideoRenderer.navigationData.prototype.clearNavList = function() {
  return this.setNavList([]);
};


/**
 * repeated navData navProperties = 48687757;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.navigationData.navData>}
 */
proto.browse_proto.compactVideoRenderer.navigationData.prototype.getNavpropertiesList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.navigationData.navData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.navigationData.navData, 48687757));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.navigationData.navData>} value
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData} returns this
*/
proto.browse_proto.compactVideoRenderer.navigationData.prototype.setNavpropertiesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 48687757, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData.navData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData.navData}
 */
proto.browse_proto.compactVideoRenderer.navigationData.prototype.addNavproperties = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 48687757, opt_value, proto.browse_proto.compactVideoRenderer.navigationData.navData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData} returns this
 */
proto.browse_proto.compactVideoRenderer.navigationData.prototype.clearNavpropertiesList = function() {
  return this.setNavpropertiesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.longAuthorData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.toObject = function(includeInstance, msg) {
  var f, obj = {
    ladatacontentList: jspb.Message.toObjectList(msg.getLadatacontentList(),
    proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.longAuthorData;
  return proto.browse_proto.compactVideoRenderer.longAuthorData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.deserializeBinaryFromReader);
      msg.addLadatacontent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.longAuthorData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLadatacontentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.toObject = function(includeInstance, msg) {
  var f, obj = {
    displayname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    lanaviList: jspb.Message.toObjectList(msg.getLanaviList(),
    proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer;
  return proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setDisplayname(value);
      break;
    case 5:
      var value = new proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.deserializeBinaryFromReader);
      msg.addLanavi(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDisplayname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getLanaviList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.repeatedFields_ = [48687626];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.toObject = function(includeInstance, msg) {
  var f, obj = {
    lanaviendpointList: jspb.Message.toObjectList(msg.getLanaviendpointList(),
    proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation;
  return proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 48687626:
      var value = new proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.deserializeBinaryFromReader);
      msg.addLanaviendpoint(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLanaviendpointList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      48687626,
      f,
      proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.toObject = function(includeInstance, msg) {
  var f, obj = {
    browseid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    canonicalbaseurl: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint;
  return proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setBrowseid(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setCanonicalbaseurl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBrowseid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getCanonicalbaseurl();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string browseId = 2;
 * @return {string}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.prototype.getBrowseid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint} returns this
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.prototype.setBrowseid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string canonicalBaseUrl = 4;
 * @return {string}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.prototype.getCanonicalbaseurl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint} returns this
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.prototype.setCanonicalbaseurl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated navigationEndpoint laNaviEndpoint = 48687626;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint>}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.prototype.getLanaviendpointList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint, 48687626));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint>} value
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation} returns this
*/
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.prototype.setLanaviendpointList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 48687626, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.prototype.addLanaviendpoint = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 48687626, opt_value, proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation} returns this
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation.prototype.clearLanaviendpointList = function() {
  return this.setLanaviendpointList([]);
};


/**
 * optional string displayName = 1;
 * @return {string}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.prototype.getDisplayname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer} returns this
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.prototype.setDisplayname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated navigation laNavi = 5;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation>}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.prototype.getLanaviList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation, 5));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation>} value
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer} returns this
*/
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.prototype.setLanaviList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.prototype.addLanavi = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.navigation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer} returns this
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer.prototype.clearLanaviList = function() {
  return this.setLanaviList([]);
};


/**
 * repeated laDataContainer laDataContent = 1;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer>}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.prototype.getLadatacontentList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer, 1));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer>} value
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData} returns this
*/
proto.browse_proto.compactVideoRenderer.longAuthorData.prototype.setLadatacontentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer}
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.prototype.addLadatacontent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.compactVideoRenderer.longAuthorData.laDataContainer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData} returns this
 */
proto.browse_proto.compactVideoRenderer.longAuthorData.prototype.clearLadatacontentList = function() {
  return this.setLadatacontentList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.authorAvatarType.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.authorAvatarType} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.toObject = function(includeInstance, msg) {
  var f, obj = {
    aadataList: jspb.Message.toObjectList(msg.getAadataList(),
    proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.authorAvatarType}
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.authorAvatarType;
  return proto.browse_proto.compactVideoRenderer.authorAvatarType.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.authorAvatarType} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.authorAvatarType}
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.deserializeBinaryFromReader);
      msg.addAadata(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.authorAvatarType.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.authorAvatarType} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAadataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.toObject = function(includeInstance, msg) {
  var f, obj = {
    url: jspb.Message.getFieldWithDefault(msg, 1, ""),
    width: jspb.Message.getFieldWithDefault(msg, 2, 0),
    height: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain}
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain;
  return proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain}
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setWidth(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getWidth();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getHeight();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * optional string url = 1;
 * @return {string}
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain} returns this
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 width = 2;
 * @return {number}
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.prototype.getWidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain} returns this
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.prototype.setWidth = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 height = 3;
 * @return {number}
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain} returns this
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain.prototype.setHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * repeated aaContain aaData = 1;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain>}
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.prototype.getAadataList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain, 1));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain>} value
 * @return {!proto.browse_proto.compactVideoRenderer.authorAvatarType} returns this
*/
proto.browse_proto.compactVideoRenderer.authorAvatarType.prototype.setAadataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain}
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.prototype.addAadata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.compactVideoRenderer.authorAvatarType.aaContain, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer.authorAvatarType} returns this
 */
proto.browse_proto.compactVideoRenderer.authorAvatarType.prototype.clearAadataList = function() {
  return this.setAadataList([]);
};


/**
 * optional string videoId = 1;
 * @return {string}
 */
proto.browse_proto.compactVideoRenderer.prototype.getVideoid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
 */
proto.browse_proto.compactVideoRenderer.prototype.setVideoid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated thumbnails thumblist = 2;
 * @return {!Array<!proto.browse_proto.thumbnails>}
 */
proto.browse_proto.compactVideoRenderer.prototype.getThumblistList = function() {
  return /** @type{!Array<!proto.browse_proto.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.thumbnails, 2));
};


/**
 * @param {!Array<!proto.browse_proto.thumbnails>} value
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
*/
proto.browse_proto.compactVideoRenderer.prototype.setThumblistList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.browse_proto.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.compactVideoRenderer.prototype.addThumblist = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.browse_proto.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
 */
proto.browse_proto.compactVideoRenderer.prototype.clearThumblistList = function() {
  return this.setThumblistList([]);
};


/**
 * repeated textRuns titleData = 3;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.compactVideoRenderer.prototype.getTitledataList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 3));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
*/
proto.browse_proto.compactVideoRenderer.prototype.setTitledataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.compactVideoRenderer.prototype.addTitledata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
 */
proto.browse_proto.compactVideoRenderer.prototype.clearTitledataList = function() {
  return this.setTitledataList([]);
};


/**
 * repeated authorData author = 4;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.authorData>}
 */
proto.browse_proto.compactVideoRenderer.prototype.getAuthorList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.authorData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.authorData, 4));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.authorData>} value
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
*/
proto.browse_proto.compactVideoRenderer.prototype.setAuthorList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.authorData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.authorData}
 */
proto.browse_proto.compactVideoRenderer.prototype.addAuthor = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.browse_proto.compactVideoRenderer.authorData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
 */
proto.browse_proto.compactVideoRenderer.prototype.clearAuthorList = function() {
  return this.setAuthorList([]);
};


/**
 * repeated textRuns publishedTimeText = 5;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.compactVideoRenderer.prototype.getPublishedtimetextList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 5));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
*/
proto.browse_proto.compactVideoRenderer.prototype.setPublishedtimetextList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.compactVideoRenderer.prototype.addPublishedtimetext = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
 */
proto.browse_proto.compactVideoRenderer.prototype.clearPublishedtimetextList = function() {
  return this.setPublishedtimetextList([]);
};


/**
 * repeated textRuns viewCountText = 6;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.compactVideoRenderer.prototype.getViewcounttextList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 6));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
*/
proto.browse_proto.compactVideoRenderer.prototype.setViewcounttextList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.compactVideoRenderer.prototype.addViewcounttext = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
 */
proto.browse_proto.compactVideoRenderer.prototype.clearViewcounttextList = function() {
  return this.setViewcounttextList([]);
};


/**
 * repeated textRuns lengthText = 7;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.compactVideoRenderer.prototype.getLengthtextList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 7));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
*/
proto.browse_proto.compactVideoRenderer.prototype.setLengthtextList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.compactVideoRenderer.prototype.addLengthtext = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
 */
proto.browse_proto.compactVideoRenderer.prototype.clearLengthtextList = function() {
  return this.setLengthtextList([]);
};


/**
 * repeated navigationData navData = 8;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.navigationData>}
 */
proto.browse_proto.compactVideoRenderer.prototype.getNavdataList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.navigationData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.navigationData, 8));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.navigationData>} value
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
*/
proto.browse_proto.compactVideoRenderer.prototype.setNavdataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.navigationData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.navigationData}
 */
proto.browse_proto.compactVideoRenderer.prototype.addNavdata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.browse_proto.compactVideoRenderer.navigationData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
 */
proto.browse_proto.compactVideoRenderer.prototype.clearNavdataList = function() {
  return this.setNavdataList([]);
};


/**
 * repeated longAuthorData laData = 10;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.longAuthorData>}
 */
proto.browse_proto.compactVideoRenderer.prototype.getLadataList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.longAuthorData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.longAuthorData, 10));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.longAuthorData>} value
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
*/
proto.browse_proto.compactVideoRenderer.prototype.setLadataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 10, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.longAuthorData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.longAuthorData}
 */
proto.browse_proto.compactVideoRenderer.prototype.addLadata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 10, opt_value, proto.browse_proto.compactVideoRenderer.longAuthorData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
 */
proto.browse_proto.compactVideoRenderer.prototype.clearLadataList = function() {
  return this.setLadataList([]);
};


/**
 * repeated authorAvatarType authorAvatar = 14;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer.authorAvatarType>}
 */
proto.browse_proto.compactVideoRenderer.prototype.getAuthoravatarList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer.authorAvatarType>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer.authorAvatarType, 14));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer.authorAvatarType>} value
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
*/
proto.browse_proto.compactVideoRenderer.prototype.setAuthoravatarList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 14, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer.authorAvatarType=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer.authorAvatarType}
 */
proto.browse_proto.compactVideoRenderer.prototype.addAuthoravatar = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 14, opt_value, proto.browse_proto.compactVideoRenderer.authorAvatarType, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
 */
proto.browse_proto.compactVideoRenderer.prototype.clearAuthoravatarList = function() {
  return this.setAuthoravatarList([]);
};


/**
 * repeated textRuns shortViewCounts = 23;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.compactVideoRenderer.prototype.getShortviewcountsList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 23));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
*/
proto.browse_proto.compactVideoRenderer.prototype.setShortviewcountsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 23, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.compactVideoRenderer.prototype.addShortviewcounts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 23, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.compactVideoRenderer} returns this
 */
proto.browse_proto.compactVideoRenderer.prototype.clearShortviewcountsList = function() {
  return this.setShortviewcountsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.ownerData.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.ownerData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.ownerData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.ownerData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.ownerData.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.browse_proto.ownerData.ownerContainer.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.ownerData}
 */
proto.browse_proto.ownerData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.ownerData;
  return proto.browse_proto.ownerData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.ownerData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.ownerData}
 */
proto.browse_proto.ownerData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.ownerData.ownerContainer;
      reader.readMessage(value,proto.browse_proto.ownerData.ownerContainer.deserializeBinaryFromReader);
      msg.addContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.ownerData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.ownerData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.ownerData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.ownerData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.ownerData.ownerContainer.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.ownerData.ownerContainer.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.ownerData.ownerContainer.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.ownerData.ownerContainer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.ownerData.ownerContainer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.ownerData.ownerContainer.toObject = function(includeInstance, msg) {
  var f, obj = {
    ownername: jspb.Message.getFieldWithDefault(msg, 1, ""),
    navigationList: jspb.Message.toObjectList(msg.getNavigationList(),
    proto.browse_proto.browseNavigation.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.ownerData.ownerContainer}
 */
proto.browse_proto.ownerData.ownerContainer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.ownerData.ownerContainer;
  return proto.browse_proto.ownerData.ownerContainer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.ownerData.ownerContainer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.ownerData.ownerContainer}
 */
proto.browse_proto.ownerData.ownerContainer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwnername(value);
      break;
    case 5:
      var value = new proto.browse_proto.browseNavigation;
      reader.readMessage(value,proto.browse_proto.browseNavigation.deserializeBinaryFromReader);
      msg.addNavigation(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.ownerData.ownerContainer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.ownerData.ownerContainer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.ownerData.ownerContainer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.ownerData.ownerContainer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwnername();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNavigationList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.browse_proto.browseNavigation.serializeBinaryToWriter
    );
  }
};


/**
 * optional string ownerName = 1;
 * @return {string}
 */
proto.browse_proto.ownerData.ownerContainer.prototype.getOwnername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.ownerData.ownerContainer} returns this
 */
proto.browse_proto.ownerData.ownerContainer.prototype.setOwnername = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated browseNavigation navigation = 5;
 * @return {!Array<!proto.browse_proto.browseNavigation>}
 */
proto.browse_proto.ownerData.ownerContainer.prototype.getNavigationList = function() {
  return /** @type{!Array<!proto.browse_proto.browseNavigation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.browseNavigation, 5));
};


/**
 * @param {!Array<!proto.browse_proto.browseNavigation>} value
 * @return {!proto.browse_proto.ownerData.ownerContainer} returns this
*/
proto.browse_proto.ownerData.ownerContainer.prototype.setNavigationList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.browse_proto.browseNavigation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.browseNavigation}
 */
proto.browse_proto.ownerData.ownerContainer.prototype.addNavigation = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.browse_proto.browseNavigation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.ownerData.ownerContainer} returns this
 */
proto.browse_proto.ownerData.ownerContainer.prototype.clearNavigationList = function() {
  return this.setNavigationList([]);
};


/**
 * repeated ownerContainer content = 1;
 * @return {!Array<!proto.browse_proto.ownerData.ownerContainer>}
 */
proto.browse_proto.ownerData.prototype.getContentList = function() {
  return /** @type{!Array<!proto.browse_proto.ownerData.ownerContainer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.ownerData.ownerContainer, 1));
};


/**
 * @param {!Array<!proto.browse_proto.ownerData.ownerContainer>} value
 * @return {!proto.browse_proto.ownerData} returns this
*/
proto.browse_proto.ownerData.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.ownerData.ownerContainer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.ownerData.ownerContainer}
 */
proto.browse_proto.ownerData.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.ownerData.ownerContainer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.ownerData} returns this
 */
proto.browse_proto.ownerData.prototype.clearContentList = function() {
  return this.setContentList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.playlistRenderer.repeatedFields_ = [2,3,4,5,6,9,13,15,21];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.playlistRenderer.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.playlistRenderer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.playlistRenderer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.playlistRenderer.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    thumbnailList: jspb.Message.toObjectList(msg.getThumbnailList(),
    proto.browse_proto.thumbnails.toObject, includeInstance),
    playlistnameList: jspb.Message.toObjectList(msg.getPlaylistnameList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    ownerList: jspb.Message.toObjectList(msg.getOwnerList(),
    proto.browse_proto.ownerData.toObject, includeInstance),
    videocountList: jspb.Message.toObjectList(msg.getVideocountList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    playlistbrowseList: jspb.Message.toObjectList(msg.getPlaylistbrowseList(),
    proto.browse_proto.browseNavigation.toObject, includeInstance),
    barevideocountList: jspb.Message.toObjectList(msg.getBarevideocountList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    separatedthumbnailList: jspb.Message.toObjectList(msg.getSeparatedthumbnailList(),
    proto.browse_proto.thumbnails.toObject, includeInstance),
    videocount2List: jspb.Message.toObjectList(msg.getVideocount2List(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    weburl: jspb.Message.getFieldWithDefault(msg, 19, ""),
    owner2List: jspb.Message.toObjectList(msg.getOwner2List(),
    proto.browse_proto.ownerData.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.playlistRenderer}
 */
proto.browse_proto.playlistRenderer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.playlistRenderer;
  return proto.browse_proto.playlistRenderer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.playlistRenderer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.playlistRenderer}
 */
proto.browse_proto.playlistRenderer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = new proto.browse_proto.thumbnails;
      reader.readMessage(value,proto.browse_proto.thumbnails.deserializeBinaryFromReader);
      msg.addThumbnail(value);
      break;
    case 3:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addPlaylistname(value);
      break;
    case 4:
      var value = new proto.browse_proto.ownerData;
      reader.readMessage(value,proto.browse_proto.ownerData.deserializeBinaryFromReader);
      msg.addOwner(value);
      break;
    case 5:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addVideocount(value);
      break;
    case 6:
      var value = new proto.browse_proto.browseNavigation;
      reader.readMessage(value,proto.browse_proto.browseNavigation.deserializeBinaryFromReader);
      msg.addPlaylistbrowse(value);
      break;
    case 9:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addBarevideocount(value);
      break;
    case 13:
      var value = new proto.browse_proto.thumbnails;
      reader.readMessage(value,proto.browse_proto.thumbnails.deserializeBinaryFromReader);
      msg.addSeparatedthumbnail(value);
      break;
    case 15:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addVideocount2(value);
      break;
    case 19:
      var value = /** @type {string} */ (reader.readString());
      msg.setWeburl(value);
      break;
    case 21:
      var value = new proto.browse_proto.ownerData;
      reader.readMessage(value,proto.browse_proto.ownerData.deserializeBinaryFromReader);
      msg.addOwner2(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.playlistRenderer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.playlistRenderer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.playlistRenderer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.playlistRenderer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getThumbnailList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.browse_proto.thumbnails.serializeBinaryToWriter
    );
  }
  f = message.getPlaylistnameList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getOwnerList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.browse_proto.ownerData.serializeBinaryToWriter
    );
  }
  f = message.getVideocountList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getPlaylistbrowseList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.browse_proto.browseNavigation.serializeBinaryToWriter
    );
  }
  f = message.getBarevideocountList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      9,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getSeparatedthumbnailList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      13,
      f,
      proto.browse_proto.thumbnails.serializeBinaryToWriter
    );
  }
  f = message.getVideocount2List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      15,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getWeburl();
  if (f.length > 0) {
    writer.writeString(
      19,
      f
    );
  }
  f = message.getOwner2List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      21,
      f,
      proto.browse_proto.ownerData.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.browse_proto.playlistRenderer.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.playlistRenderer} returns this
 */
proto.browse_proto.playlistRenderer.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated thumbnails thumbnail = 2;
 * @return {!Array<!proto.browse_proto.thumbnails>}
 */
proto.browse_proto.playlistRenderer.prototype.getThumbnailList = function() {
  return /** @type{!Array<!proto.browse_proto.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.thumbnails, 2));
};


/**
 * @param {!Array<!proto.browse_proto.thumbnails>} value
 * @return {!proto.browse_proto.playlistRenderer} returns this
*/
proto.browse_proto.playlistRenderer.prototype.setThumbnailList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.browse_proto.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.playlistRenderer.prototype.addThumbnail = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.browse_proto.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistRenderer} returns this
 */
proto.browse_proto.playlistRenderer.prototype.clearThumbnailList = function() {
  return this.setThumbnailList([]);
};


/**
 * repeated textRuns playlistName = 3;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.playlistRenderer.prototype.getPlaylistnameList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 3));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.playlistRenderer} returns this
*/
proto.browse_proto.playlistRenderer.prototype.setPlaylistnameList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.playlistRenderer.prototype.addPlaylistname = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistRenderer} returns this
 */
proto.browse_proto.playlistRenderer.prototype.clearPlaylistnameList = function() {
  return this.setPlaylistnameList([]);
};


/**
 * repeated ownerData owner = 4;
 * @return {!Array<!proto.browse_proto.ownerData>}
 */
proto.browse_proto.playlistRenderer.prototype.getOwnerList = function() {
  return /** @type{!Array<!proto.browse_proto.ownerData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.ownerData, 4));
};


/**
 * @param {!Array<!proto.browse_proto.ownerData>} value
 * @return {!proto.browse_proto.playlistRenderer} returns this
*/
proto.browse_proto.playlistRenderer.prototype.setOwnerList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.browse_proto.ownerData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.ownerData}
 */
proto.browse_proto.playlistRenderer.prototype.addOwner = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.browse_proto.ownerData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistRenderer} returns this
 */
proto.browse_proto.playlistRenderer.prototype.clearOwnerList = function() {
  return this.setOwnerList([]);
};


/**
 * repeated textRuns videoCount = 5;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.playlistRenderer.prototype.getVideocountList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 5));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.playlistRenderer} returns this
*/
proto.browse_proto.playlistRenderer.prototype.setVideocountList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.playlistRenderer.prototype.addVideocount = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistRenderer} returns this
 */
proto.browse_proto.playlistRenderer.prototype.clearVideocountList = function() {
  return this.setVideocountList([]);
};


/**
 * repeated browseNavigation playlistBrowse = 6;
 * @return {!Array<!proto.browse_proto.browseNavigation>}
 */
proto.browse_proto.playlistRenderer.prototype.getPlaylistbrowseList = function() {
  return /** @type{!Array<!proto.browse_proto.browseNavigation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.browseNavigation, 6));
};


/**
 * @param {!Array<!proto.browse_proto.browseNavigation>} value
 * @return {!proto.browse_proto.playlistRenderer} returns this
*/
proto.browse_proto.playlistRenderer.prototype.setPlaylistbrowseList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.browse_proto.browseNavigation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.browseNavigation}
 */
proto.browse_proto.playlistRenderer.prototype.addPlaylistbrowse = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.browse_proto.browseNavigation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistRenderer} returns this
 */
proto.browse_proto.playlistRenderer.prototype.clearPlaylistbrowseList = function() {
  return this.setPlaylistbrowseList([]);
};


/**
 * repeated textRuns bareVideoCount = 9;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.playlistRenderer.prototype.getBarevideocountList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 9));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.playlistRenderer} returns this
*/
proto.browse_proto.playlistRenderer.prototype.setBarevideocountList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 9, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.playlistRenderer.prototype.addBarevideocount = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 9, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistRenderer} returns this
 */
proto.browse_proto.playlistRenderer.prototype.clearBarevideocountList = function() {
  return this.setBarevideocountList([]);
};


/**
 * repeated thumbnails separatedThumbnail = 13;
 * @return {!Array<!proto.browse_proto.thumbnails>}
 */
proto.browse_proto.playlistRenderer.prototype.getSeparatedthumbnailList = function() {
  return /** @type{!Array<!proto.browse_proto.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.thumbnails, 13));
};


/**
 * @param {!Array<!proto.browse_proto.thumbnails>} value
 * @return {!proto.browse_proto.playlistRenderer} returns this
*/
proto.browse_proto.playlistRenderer.prototype.setSeparatedthumbnailList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 13, value);
};


/**
 * @param {!proto.browse_proto.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.playlistRenderer.prototype.addSeparatedthumbnail = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 13, opt_value, proto.browse_proto.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistRenderer} returns this
 */
proto.browse_proto.playlistRenderer.prototype.clearSeparatedthumbnailList = function() {
  return this.setSeparatedthumbnailList([]);
};


/**
 * repeated textRuns videoCount2 = 15;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.playlistRenderer.prototype.getVideocount2List = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 15));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.playlistRenderer} returns this
*/
proto.browse_proto.playlistRenderer.prototype.setVideocount2List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 15, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.playlistRenderer.prototype.addVideocount2 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 15, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistRenderer} returns this
 */
proto.browse_proto.playlistRenderer.prototype.clearVideocount2List = function() {
  return this.setVideocount2List([]);
};


/**
 * optional string webUrl = 19;
 * @return {string}
 */
proto.browse_proto.playlistRenderer.prototype.getWeburl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 19, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.playlistRenderer} returns this
 */
proto.browse_proto.playlistRenderer.prototype.setWeburl = function(value) {
  return jspb.Message.setProto3StringField(this, 19, value);
};


/**
 * repeated ownerData owner2 = 21;
 * @return {!Array<!proto.browse_proto.ownerData>}
 */
proto.browse_proto.playlistRenderer.prototype.getOwner2List = function() {
  return /** @type{!Array<!proto.browse_proto.ownerData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.ownerData, 21));
};


/**
 * @param {!Array<!proto.browse_proto.ownerData>} value
 * @return {!proto.browse_proto.playlistRenderer} returns this
*/
proto.browse_proto.playlistRenderer.prototype.setOwner2List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 21, value);
};


/**
 * @param {!proto.browse_proto.ownerData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.ownerData}
 */
proto.browse_proto.playlistRenderer.prototype.addOwner2 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 21, opt_value, proto.browse_proto.ownerData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistRenderer} returns this
 */
proto.browse_proto.playlistRenderer.prototype.clearOwner2List = function() {
  return this.setOwner2List([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.aboutRenderer.repeatedFields_ = [1,2,5,6,19,20,21];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.aboutRenderer.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.aboutRenderer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.aboutRenderer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.aboutRenderer.toObject = function(includeInstance, msg) {
  var f, obj = {
    channeldescriptionList: jspb.Message.toObjectList(msg.getChanneldescriptionList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    siteList: jspb.Message.toObjectList(msg.getSiteList(),
    proto.browse_proto.aboutRenderer.externalSite.toObject, includeInstance),
    totalviewsList: jspb.Message.toObjectList(msg.getTotalviewsList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    joindateList: jspb.Message.toObjectList(msg.getJoindateList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    weburl: jspb.Message.getFieldWithDefault(msg, 13, ""),
    int15: jspb.Message.getFieldWithDefault(msg, 15, 0),
    channelnameList: jspb.Message.toObjectList(msg.getChannelnameList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    avatarList: jspb.Message.toObjectList(msg.getAvatarList(),
    proto.browse_proto.thumbnails.toObject, includeInstance),
    countryList: jspb.Message.toObjectList(msg.getCountryList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    int23: jspb.Message.getFieldWithDefault(msg, 23, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.aboutRenderer}
 */
proto.browse_proto.aboutRenderer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.aboutRenderer;
  return proto.browse_proto.aboutRenderer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.aboutRenderer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.aboutRenderer}
 */
proto.browse_proto.aboutRenderer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addChanneldescription(value);
      break;
    case 2:
      var value = new proto.browse_proto.aboutRenderer.externalSite;
      reader.readMessage(value,proto.browse_proto.aboutRenderer.externalSite.deserializeBinaryFromReader);
      msg.addSite(value);
      break;
    case 5:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addTotalviews(value);
      break;
    case 6:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addJoindate(value);
      break;
    case 13:
      var value = /** @type {string} */ (reader.readString());
      msg.setWeburl(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt15(value);
      break;
    case 19:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addChannelname(value);
      break;
    case 20:
      var value = new proto.browse_proto.thumbnails;
      reader.readMessage(value,proto.browse_proto.thumbnails.deserializeBinaryFromReader);
      msg.addAvatar(value);
      break;
    case 21:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addCountry(value);
      break;
    case 23:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt23(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.aboutRenderer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.aboutRenderer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.aboutRenderer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.aboutRenderer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getChanneldescriptionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getSiteList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.browse_proto.aboutRenderer.externalSite.serializeBinaryToWriter
    );
  }
  f = message.getTotalviewsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getJoindateList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getWeburl();
  if (f.length > 0) {
    writer.writeString(
      13,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 15));
  if (f != null) {
    writer.writeInt32(
      15,
      f
    );
  }
  f = message.getChannelnameList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      19,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getAvatarList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      20,
      f,
      proto.browse_proto.thumbnails.serializeBinaryToWriter
    );
  }
  f = message.getCountryList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      21,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 23));
  if (f != null) {
    writer.writeInt32(
      23,
      f
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.aboutRenderer.externalSite.repeatedFields_ = [1,3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.aboutRenderer.externalSite.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.aboutRenderer.externalSite.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.aboutRenderer.externalSite} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.aboutRenderer.externalSite.toObject = function(includeInstance, msg) {
  var f, obj = {
    linkList: jspb.Message.toObjectList(msg.getLinkList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    nameList: jspb.Message.toObjectList(msg.getNameList(),
    proto.browse_proto.textRuns.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.aboutRenderer.externalSite}
 */
proto.browse_proto.aboutRenderer.externalSite.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.aboutRenderer.externalSite;
  return proto.browse_proto.aboutRenderer.externalSite.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.aboutRenderer.externalSite} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.aboutRenderer.externalSite}
 */
proto.browse_proto.aboutRenderer.externalSite.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addLink(value);
      break;
    case 3:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.aboutRenderer.externalSite.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.aboutRenderer.externalSite.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.aboutRenderer.externalSite} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.aboutRenderer.externalSite.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLinkList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getNameList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
};


/**
 * repeated textRuns link = 1;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.aboutRenderer.externalSite.prototype.getLinkList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 1));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.aboutRenderer.externalSite} returns this
*/
proto.browse_proto.aboutRenderer.externalSite.prototype.setLinkList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.aboutRenderer.externalSite.prototype.addLink = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.aboutRenderer.externalSite} returns this
 */
proto.browse_proto.aboutRenderer.externalSite.prototype.clearLinkList = function() {
  return this.setLinkList([]);
};


/**
 * repeated textRuns name = 3;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.aboutRenderer.externalSite.prototype.getNameList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 3));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.aboutRenderer.externalSite} returns this
*/
proto.browse_proto.aboutRenderer.externalSite.prototype.setNameList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.aboutRenderer.externalSite.prototype.addName = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.aboutRenderer.externalSite} returns this
 */
proto.browse_proto.aboutRenderer.externalSite.prototype.clearNameList = function() {
  return this.setNameList([]);
};


/**
 * repeated textRuns channelDescription = 1;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.aboutRenderer.prototype.getChanneldescriptionList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 1));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.aboutRenderer} returns this
*/
proto.browse_proto.aboutRenderer.prototype.setChanneldescriptionList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.aboutRenderer.prototype.addChanneldescription = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.aboutRenderer} returns this
 */
proto.browse_proto.aboutRenderer.prototype.clearChanneldescriptionList = function() {
  return this.setChanneldescriptionList([]);
};


/**
 * repeated externalSite site = 2;
 * @return {!Array<!proto.browse_proto.aboutRenderer.externalSite>}
 */
proto.browse_proto.aboutRenderer.prototype.getSiteList = function() {
  return /** @type{!Array<!proto.browse_proto.aboutRenderer.externalSite>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.aboutRenderer.externalSite, 2));
};


/**
 * @param {!Array<!proto.browse_proto.aboutRenderer.externalSite>} value
 * @return {!proto.browse_proto.aboutRenderer} returns this
*/
proto.browse_proto.aboutRenderer.prototype.setSiteList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.browse_proto.aboutRenderer.externalSite=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.aboutRenderer.externalSite}
 */
proto.browse_proto.aboutRenderer.prototype.addSite = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.browse_proto.aboutRenderer.externalSite, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.aboutRenderer} returns this
 */
proto.browse_proto.aboutRenderer.prototype.clearSiteList = function() {
  return this.setSiteList([]);
};


/**
 * repeated textRuns totalViews = 5;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.aboutRenderer.prototype.getTotalviewsList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 5));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.aboutRenderer} returns this
*/
proto.browse_proto.aboutRenderer.prototype.setTotalviewsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.aboutRenderer.prototype.addTotalviews = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.aboutRenderer} returns this
 */
proto.browse_proto.aboutRenderer.prototype.clearTotalviewsList = function() {
  return this.setTotalviewsList([]);
};


/**
 * repeated textRuns joinDate = 6;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.aboutRenderer.prototype.getJoindateList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 6));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.aboutRenderer} returns this
*/
proto.browse_proto.aboutRenderer.prototype.setJoindateList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.aboutRenderer.prototype.addJoindate = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.aboutRenderer} returns this
 */
proto.browse_proto.aboutRenderer.prototype.clearJoindateList = function() {
  return this.setJoindateList([]);
};


/**
 * optional string webUrl = 13;
 * @return {string}
 */
proto.browse_proto.aboutRenderer.prototype.getWeburl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.aboutRenderer} returns this
 */
proto.browse_proto.aboutRenderer.prototype.setWeburl = function(value) {
  return jspb.Message.setProto3StringField(this, 13, value);
};


/**
 * optional int32 int15 = 15;
 * @return {number}
 */
proto.browse_proto.aboutRenderer.prototype.getInt15 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 15, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.aboutRenderer} returns this
 */
proto.browse_proto.aboutRenderer.prototype.setInt15 = function(value) {
  return jspb.Message.setField(this, 15, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.browse_proto.aboutRenderer} returns this
 */
proto.browse_proto.aboutRenderer.prototype.clearInt15 = function() {
  return jspb.Message.setField(this, 15, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.browse_proto.aboutRenderer.prototype.hasInt15 = function() {
  return jspb.Message.getField(this, 15) != null;
};


/**
 * repeated textRuns channelName = 19;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.aboutRenderer.prototype.getChannelnameList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 19));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.aboutRenderer} returns this
*/
proto.browse_proto.aboutRenderer.prototype.setChannelnameList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 19, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.aboutRenderer.prototype.addChannelname = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 19, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.aboutRenderer} returns this
 */
proto.browse_proto.aboutRenderer.prototype.clearChannelnameList = function() {
  return this.setChannelnameList([]);
};


/**
 * repeated thumbnails avatar = 20;
 * @return {!Array<!proto.browse_proto.thumbnails>}
 */
proto.browse_proto.aboutRenderer.prototype.getAvatarList = function() {
  return /** @type{!Array<!proto.browse_proto.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.thumbnails, 20));
};


/**
 * @param {!Array<!proto.browse_proto.thumbnails>} value
 * @return {!proto.browse_proto.aboutRenderer} returns this
*/
proto.browse_proto.aboutRenderer.prototype.setAvatarList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 20, value);
};


/**
 * @param {!proto.browse_proto.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.aboutRenderer.prototype.addAvatar = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 20, opt_value, proto.browse_proto.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.aboutRenderer} returns this
 */
proto.browse_proto.aboutRenderer.prototype.clearAvatarList = function() {
  return this.setAvatarList([]);
};


/**
 * repeated textRuns country = 21;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.aboutRenderer.prototype.getCountryList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 21));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.aboutRenderer} returns this
*/
proto.browse_proto.aboutRenderer.prototype.setCountryList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 21, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.aboutRenderer.prototype.addCountry = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 21, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.aboutRenderer} returns this
 */
proto.browse_proto.aboutRenderer.prototype.clearCountryList = function() {
  return this.setCountryList([]);
};


/**
 * optional int32 int23 = 23;
 * @return {number}
 */
proto.browse_proto.aboutRenderer.prototype.getInt23 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 23, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.aboutRenderer} returns this
 */
proto.browse_proto.aboutRenderer.prototype.setInt23 = function(value) {
  return jspb.Message.setField(this, 23, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.browse_proto.aboutRenderer} returns this
 */
proto.browse_proto.aboutRenderer.prototype.clearInt23 = function() {
  return jspb.Message.setField(this, 23, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.browse_proto.aboutRenderer.prototype.hasInt23 = function() {
  return jspb.Message.getField(this, 23) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.channelRenderer.repeatedFields_ = [2,3,4,5,6,9,16];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.channelRenderer.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.channelRenderer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.channelRenderer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.channelRenderer.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    avatarList: jspb.Message.toObjectList(msg.getAvatarList(),
    proto.browse_proto.thumbnails.toObject, includeInstance),
    nameList: jspb.Message.toObjectList(msg.getNameList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    subcountList: jspb.Message.toObjectList(msg.getSubcountList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    handleList: jspb.Message.toObjectList(msg.getHandleList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    navigationList: jspb.Message.toObjectList(msg.getNavigationList(),
    proto.browse_proto.browseNavigation.toObject, includeInstance),
    name2List: jspb.Message.toObjectList(msg.getName2List(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    avatar2List: jspb.Message.toObjectList(msg.getAvatar2List(),
    proto.browse_proto.thumbnails.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.channelRenderer}
 */
proto.browse_proto.channelRenderer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.channelRenderer;
  return proto.browse_proto.channelRenderer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.channelRenderer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.channelRenderer}
 */
proto.browse_proto.channelRenderer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = new proto.browse_proto.thumbnails;
      reader.readMessage(value,proto.browse_proto.thumbnails.deserializeBinaryFromReader);
      msg.addAvatar(value);
      break;
    case 3:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addName(value);
      break;
    case 4:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addSubcount(value);
      break;
    case 5:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addHandle(value);
      break;
    case 6:
      var value = new proto.browse_proto.browseNavigation;
      reader.readMessage(value,proto.browse_proto.browseNavigation.deserializeBinaryFromReader);
      msg.addNavigation(value);
      break;
    case 9:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addName2(value);
      break;
    case 16:
      var value = new proto.browse_proto.thumbnails;
      reader.readMessage(value,proto.browse_proto.thumbnails.deserializeBinaryFromReader);
      msg.addAvatar2(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.channelRenderer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.channelRenderer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.channelRenderer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.channelRenderer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAvatarList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.browse_proto.thumbnails.serializeBinaryToWriter
    );
  }
  f = message.getNameList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getSubcountList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getHandleList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getNavigationList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.browse_proto.browseNavigation.serializeBinaryToWriter
    );
  }
  f = message.getName2List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      9,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getAvatar2List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      16,
      f,
      proto.browse_proto.thumbnails.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.browse_proto.channelRenderer.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.channelRenderer} returns this
 */
proto.browse_proto.channelRenderer.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated thumbnails avatar = 2;
 * @return {!Array<!proto.browse_proto.thumbnails>}
 */
proto.browse_proto.channelRenderer.prototype.getAvatarList = function() {
  return /** @type{!Array<!proto.browse_proto.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.thumbnails, 2));
};


/**
 * @param {!Array<!proto.browse_proto.thumbnails>} value
 * @return {!proto.browse_proto.channelRenderer} returns this
*/
proto.browse_proto.channelRenderer.prototype.setAvatarList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.browse_proto.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.channelRenderer.prototype.addAvatar = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.browse_proto.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.channelRenderer} returns this
 */
proto.browse_proto.channelRenderer.prototype.clearAvatarList = function() {
  return this.setAvatarList([]);
};


/**
 * repeated textRuns name = 3;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.channelRenderer.prototype.getNameList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 3));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.channelRenderer} returns this
*/
proto.browse_proto.channelRenderer.prototype.setNameList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.channelRenderer.prototype.addName = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.channelRenderer} returns this
 */
proto.browse_proto.channelRenderer.prototype.clearNameList = function() {
  return this.setNameList([]);
};


/**
 * repeated textRuns subCount = 4;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.channelRenderer.prototype.getSubcountList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 4));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.channelRenderer} returns this
*/
proto.browse_proto.channelRenderer.prototype.setSubcountList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.channelRenderer.prototype.addSubcount = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.channelRenderer} returns this
 */
proto.browse_proto.channelRenderer.prototype.clearSubcountList = function() {
  return this.setSubcountList([]);
};


/**
 * repeated textRuns handle = 5;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.channelRenderer.prototype.getHandleList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 5));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.channelRenderer} returns this
*/
proto.browse_proto.channelRenderer.prototype.setHandleList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.channelRenderer.prototype.addHandle = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.channelRenderer} returns this
 */
proto.browse_proto.channelRenderer.prototype.clearHandleList = function() {
  return this.setHandleList([]);
};


/**
 * repeated browseNavigation navigation = 6;
 * @return {!Array<!proto.browse_proto.browseNavigation>}
 */
proto.browse_proto.channelRenderer.prototype.getNavigationList = function() {
  return /** @type{!Array<!proto.browse_proto.browseNavigation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.browseNavigation, 6));
};


/**
 * @param {!Array<!proto.browse_proto.browseNavigation>} value
 * @return {!proto.browse_proto.channelRenderer} returns this
*/
proto.browse_proto.channelRenderer.prototype.setNavigationList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.browse_proto.browseNavigation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.browseNavigation}
 */
proto.browse_proto.channelRenderer.prototype.addNavigation = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.browse_proto.browseNavigation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.channelRenderer} returns this
 */
proto.browse_proto.channelRenderer.prototype.clearNavigationList = function() {
  return this.setNavigationList([]);
};


/**
 * repeated textRuns name2 = 9;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.channelRenderer.prototype.getName2List = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 9));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.channelRenderer} returns this
*/
proto.browse_proto.channelRenderer.prototype.setName2List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 9, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.channelRenderer.prototype.addName2 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 9, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.channelRenderer} returns this
 */
proto.browse_proto.channelRenderer.prototype.clearName2List = function() {
  return this.setName2List([]);
};


/**
 * repeated thumbnails avatar2 = 16;
 * @return {!Array<!proto.browse_proto.thumbnails>}
 */
proto.browse_proto.channelRenderer.prototype.getAvatar2List = function() {
  return /** @type{!Array<!proto.browse_proto.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.thumbnails, 16));
};


/**
 * @param {!Array<!proto.browse_proto.thumbnails>} value
 * @return {!proto.browse_proto.channelRenderer} returns this
*/
proto.browse_proto.channelRenderer.prototype.setAvatar2List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 16, value);
};


/**
 * @param {!proto.browse_proto.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.channelRenderer.prototype.addAvatar2 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 16, opt_value, proto.browse_proto.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.channelRenderer} returns this
 */
proto.browse_proto.channelRenderer.prototype.clearAvatar2List = function() {
  return this.setAvatar2List([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.shelfRenderer.repeatedFields_ = [1,3,5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.shelfRenderer.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.shelfRenderer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.shelfRenderer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.shelfRenderer.toObject = function(includeInstance, msg) {
  var f, obj = {
    headerList: jspb.Message.toObjectList(msg.getHeaderList(),
    proto.browse_proto.shelfRenderer.shelfHeader.toObject, includeInstance),
    navigationList: jspb.Message.toObjectList(msg.getNavigationList(),
    proto.browse_proto.browseNavigation.toObject, includeInstance),
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.browse_proto.shelfRenderer.contents.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.shelfRenderer}
 */
proto.browse_proto.shelfRenderer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.shelfRenderer;
  return proto.browse_proto.shelfRenderer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.shelfRenderer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.shelfRenderer}
 */
proto.browse_proto.shelfRenderer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.shelfRenderer.shelfHeader;
      reader.readMessage(value,proto.browse_proto.shelfRenderer.shelfHeader.deserializeBinaryFromReader);
      msg.addHeader(value);
      break;
    case 3:
      var value = new proto.browse_proto.browseNavigation;
      reader.readMessage(value,proto.browse_proto.browseNavigation.deserializeBinaryFromReader);
      msg.addNavigation(value);
      break;
    case 5:
      var value = new proto.browse_proto.shelfRenderer.contents;
      reader.readMessage(value,proto.browse_proto.shelfRenderer.contents.deserializeBinaryFromReader);
      msg.addContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.shelfRenderer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.shelfRenderer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.shelfRenderer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.shelfRenderer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHeaderList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.shelfRenderer.shelfHeader.serializeBinaryToWriter
    );
  }
  f = message.getNavigationList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.browse_proto.browseNavigation.serializeBinaryToWriter
    );
  }
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.browse_proto.shelfRenderer.contents.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.shelfRenderer.shelfHeader.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.shelfRenderer.shelfHeader.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.shelfRenderer.shelfHeader.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.shelfRenderer.shelfHeader} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.shelfRenderer.shelfHeader.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.browse_proto.shelfRenderer.shelfHeader.contents.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.shelfRenderer.shelfHeader}
 */
proto.browse_proto.shelfRenderer.shelfHeader.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.shelfRenderer.shelfHeader;
  return proto.browse_proto.shelfRenderer.shelfHeader.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.shelfRenderer.shelfHeader} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.shelfRenderer.shelfHeader}
 */
proto.browse_proto.shelfRenderer.shelfHeader.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.shelfRenderer.shelfHeader.contents;
      reader.readMessage(value,proto.browse_proto.shelfRenderer.shelfHeader.contents.deserializeBinaryFromReader);
      msg.addContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.shelfRenderer.shelfHeader.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.shelfRenderer.shelfHeader.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.shelfRenderer.shelfHeader} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.shelfRenderer.shelfHeader.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.shelfRenderer.shelfHeader.contents.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.shelfRenderer.shelfHeader.contents.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.shelfRenderer.shelfHeader.contents.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.shelfRenderer.shelfHeader.contents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.shelfRenderer.shelfHeader.contents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.shelfRenderer.shelfHeader.contents.toObject = function(includeInstance, msg) {
  var f, obj = {
    shelfname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    navigationList: jspb.Message.toObjectList(msg.getNavigationList(),
    proto.browse_proto.browseNavigation.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.shelfRenderer.shelfHeader.contents}
 */
proto.browse_proto.shelfRenderer.shelfHeader.contents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.shelfRenderer.shelfHeader.contents;
  return proto.browse_proto.shelfRenderer.shelfHeader.contents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.shelfRenderer.shelfHeader.contents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.shelfRenderer.shelfHeader.contents}
 */
proto.browse_proto.shelfRenderer.shelfHeader.contents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setShelfname(value);
      break;
    case 5:
      var value = new proto.browse_proto.browseNavigation;
      reader.readMessage(value,proto.browse_proto.browseNavigation.deserializeBinaryFromReader);
      msg.addNavigation(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.shelfRenderer.shelfHeader.contents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.shelfRenderer.shelfHeader.contents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.shelfRenderer.shelfHeader.contents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.shelfRenderer.shelfHeader.contents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getShelfname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNavigationList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.browse_proto.browseNavigation.serializeBinaryToWriter
    );
  }
};


/**
 * optional string shelfName = 1;
 * @return {string}
 */
proto.browse_proto.shelfRenderer.shelfHeader.contents.prototype.getShelfname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.shelfRenderer.shelfHeader.contents} returns this
 */
proto.browse_proto.shelfRenderer.shelfHeader.contents.prototype.setShelfname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated browseNavigation navigation = 5;
 * @return {!Array<!proto.browse_proto.browseNavigation>}
 */
proto.browse_proto.shelfRenderer.shelfHeader.contents.prototype.getNavigationList = function() {
  return /** @type{!Array<!proto.browse_proto.browseNavigation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.browseNavigation, 5));
};


/**
 * @param {!Array<!proto.browse_proto.browseNavigation>} value
 * @return {!proto.browse_proto.shelfRenderer.shelfHeader.contents} returns this
*/
proto.browse_proto.shelfRenderer.shelfHeader.contents.prototype.setNavigationList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.browse_proto.browseNavigation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.browseNavigation}
 */
proto.browse_proto.shelfRenderer.shelfHeader.contents.prototype.addNavigation = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.browse_proto.browseNavigation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.shelfRenderer.shelfHeader.contents} returns this
 */
proto.browse_proto.shelfRenderer.shelfHeader.contents.prototype.clearNavigationList = function() {
  return this.setNavigationList([]);
};


/**
 * repeated contents content = 1;
 * @return {!Array<!proto.browse_proto.shelfRenderer.shelfHeader.contents>}
 */
proto.browse_proto.shelfRenderer.shelfHeader.prototype.getContentList = function() {
  return /** @type{!Array<!proto.browse_proto.shelfRenderer.shelfHeader.contents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.shelfRenderer.shelfHeader.contents, 1));
};


/**
 * @param {!Array<!proto.browse_proto.shelfRenderer.shelfHeader.contents>} value
 * @return {!proto.browse_proto.shelfRenderer.shelfHeader} returns this
*/
proto.browse_proto.shelfRenderer.shelfHeader.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.shelfRenderer.shelfHeader.contents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.shelfRenderer.shelfHeader.contents}
 */
proto.browse_proto.shelfRenderer.shelfHeader.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.shelfRenderer.shelfHeader.contents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.shelfRenderer.shelfHeader} returns this
 */
proto.browse_proto.shelfRenderer.shelfHeader.prototype.clearContentList = function() {
  return this.setContentList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.shelfRenderer.contents.repeatedFields_ = [57988071];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.shelfRenderer.contents.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.shelfRenderer.contents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.shelfRenderer.contents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.shelfRenderer.contents.toObject = function(includeInstance, msg) {
  var f, obj = {
    shelfcontentList: jspb.Message.toObjectList(msg.getShelfcontentList(),
    proto.browse_proto.shelfRenderer.contents.shelfContents.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.shelfRenderer.contents}
 */
proto.browse_proto.shelfRenderer.contents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.shelfRenderer.contents;
  return proto.browse_proto.shelfRenderer.contents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.shelfRenderer.contents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.shelfRenderer.contents}
 */
proto.browse_proto.shelfRenderer.contents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 57988071:
      var value = new proto.browse_proto.shelfRenderer.contents.shelfContents;
      reader.readMessage(value,proto.browse_proto.shelfRenderer.contents.shelfContents.deserializeBinaryFromReader);
      msg.addShelfcontent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.shelfRenderer.contents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.shelfRenderer.contents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.shelfRenderer.contents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.shelfRenderer.contents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getShelfcontentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      57988071,
      f,
      proto.browse_proto.shelfRenderer.contents.shelfContents.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.shelfRenderer.contents.shelfContents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.shelfRenderer.contents.shelfContents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.browse_proto.shelfRenderer.contents.shelfContents.contents.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.shelfRenderer.contents.shelfContents;
  return proto.browse_proto.shelfRenderer.contents.shelfContents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.shelfRenderer.contents.shelfContents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.shelfRenderer.contents.shelfContents.contents;
      reader.readMessage(value,proto.browse_proto.shelfRenderer.contents.shelfContents.contents.deserializeBinaryFromReader);
      msg.addContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.shelfRenderer.contents.shelfContents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.shelfRenderer.contents.shelfContents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.shelfRenderer.contents.shelfContents.contents.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.repeatedFields_ = [50630979,50742631,50794305];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.shelfRenderer.contents.shelfContents.contents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.shelfRenderer.contents.shelfContents.contents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.toObject = function(includeInstance, msg) {
  var f, obj = {
    videoList: jspb.Message.toObjectList(msg.getVideoList(),
    proto.browse_proto.compactVideoRenderer.toObject, includeInstance),
    playlistList: jspb.Message.toObjectList(msg.getPlaylistList(),
    proto.browse_proto.playlistRenderer.toObject, includeInstance),
    channelList: jspb.Message.toObjectList(msg.getChannelList(),
    proto.browse_proto.channelRenderer.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents.contents}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.shelfRenderer.contents.shelfContents.contents;
  return proto.browse_proto.shelfRenderer.contents.shelfContents.contents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.shelfRenderer.contents.shelfContents.contents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents.contents}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 50630979:
      var value = new proto.browse_proto.compactVideoRenderer;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.deserializeBinaryFromReader);
      msg.addVideo(value);
      break;
    case 50742631:
      var value = new proto.browse_proto.playlistRenderer;
      reader.readMessage(value,proto.browse_proto.playlistRenderer.deserializeBinaryFromReader);
      msg.addPlaylist(value);
      break;
    case 50794305:
      var value = new proto.browse_proto.channelRenderer;
      reader.readMessage(value,proto.browse_proto.channelRenderer.deserializeBinaryFromReader);
      msg.addChannel(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.shelfRenderer.contents.shelfContents.contents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.shelfRenderer.contents.shelfContents.contents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVideoList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      50630979,
      f,
      proto.browse_proto.compactVideoRenderer.serializeBinaryToWriter
    );
  }
  f = message.getPlaylistList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      50742631,
      f,
      proto.browse_proto.playlistRenderer.serializeBinaryToWriter
    );
  }
  f = message.getChannelList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      50794305,
      f,
      proto.browse_proto.channelRenderer.serializeBinaryToWriter
    );
  }
};


/**
 * repeated compactVideoRenderer video = 50630979;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer>}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.getVideoList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer, 50630979));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer>} value
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents.contents} returns this
*/
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.setVideoList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 50630979, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.addVideo = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 50630979, opt_value, proto.browse_proto.compactVideoRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents.contents} returns this
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.clearVideoList = function() {
  return this.setVideoList([]);
};


/**
 * repeated playlistRenderer playlist = 50742631;
 * @return {!Array<!proto.browse_proto.playlistRenderer>}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.getPlaylistList = function() {
  return /** @type{!Array<!proto.browse_proto.playlistRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.playlistRenderer, 50742631));
};


/**
 * @param {!Array<!proto.browse_proto.playlistRenderer>} value
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents.contents} returns this
*/
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.setPlaylistList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 50742631, value);
};


/**
 * @param {!proto.browse_proto.playlistRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.playlistRenderer}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.addPlaylist = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 50742631, opt_value, proto.browse_proto.playlistRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents.contents} returns this
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.clearPlaylistList = function() {
  return this.setPlaylistList([]);
};


/**
 * repeated channelRenderer channel = 50794305;
 * @return {!Array<!proto.browse_proto.channelRenderer>}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.getChannelList = function() {
  return /** @type{!Array<!proto.browse_proto.channelRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.channelRenderer, 50794305));
};


/**
 * @param {!Array<!proto.browse_proto.channelRenderer>} value
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents.contents} returns this
*/
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.setChannelList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 50794305, value);
};


/**
 * @param {!proto.browse_proto.channelRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.channelRenderer}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.addChannel = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 50794305, opt_value, proto.browse_proto.channelRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents.contents} returns this
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.contents.prototype.clearChannelList = function() {
  return this.setChannelList([]);
};


/**
 * repeated contents content = 1;
 * @return {!Array<!proto.browse_proto.shelfRenderer.contents.shelfContents.contents>}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.prototype.getContentList = function() {
  return /** @type{!Array<!proto.browse_proto.shelfRenderer.contents.shelfContents.contents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.shelfRenderer.contents.shelfContents.contents, 1));
};


/**
 * @param {!Array<!proto.browse_proto.shelfRenderer.contents.shelfContents.contents>} value
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents} returns this
*/
proto.browse_proto.shelfRenderer.contents.shelfContents.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.shelfRenderer.contents.shelfContents.contents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents.contents}
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.shelfRenderer.contents.shelfContents.contents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents} returns this
 */
proto.browse_proto.shelfRenderer.contents.shelfContents.prototype.clearContentList = function() {
  return this.setContentList([]);
};


/**
 * repeated shelfContents shelfContent = 57988071;
 * @return {!Array<!proto.browse_proto.shelfRenderer.contents.shelfContents>}
 */
proto.browse_proto.shelfRenderer.contents.prototype.getShelfcontentList = function() {
  return /** @type{!Array<!proto.browse_proto.shelfRenderer.contents.shelfContents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.shelfRenderer.contents.shelfContents, 57988071));
};


/**
 * @param {!Array<!proto.browse_proto.shelfRenderer.contents.shelfContents>} value
 * @return {!proto.browse_proto.shelfRenderer.contents} returns this
*/
proto.browse_proto.shelfRenderer.contents.prototype.setShelfcontentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 57988071, value);
};


/**
 * @param {!proto.browse_proto.shelfRenderer.contents.shelfContents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.shelfRenderer.contents.shelfContents}
 */
proto.browse_proto.shelfRenderer.contents.prototype.addShelfcontent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 57988071, opt_value, proto.browse_proto.shelfRenderer.contents.shelfContents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.shelfRenderer.contents} returns this
 */
proto.browse_proto.shelfRenderer.contents.prototype.clearShelfcontentList = function() {
  return this.setShelfcontentList([]);
};


/**
 * repeated shelfHeader header = 1;
 * @return {!Array<!proto.browse_proto.shelfRenderer.shelfHeader>}
 */
proto.browse_proto.shelfRenderer.prototype.getHeaderList = function() {
  return /** @type{!Array<!proto.browse_proto.shelfRenderer.shelfHeader>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.shelfRenderer.shelfHeader, 1));
};


/**
 * @param {!Array<!proto.browse_proto.shelfRenderer.shelfHeader>} value
 * @return {!proto.browse_proto.shelfRenderer} returns this
*/
proto.browse_proto.shelfRenderer.prototype.setHeaderList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.shelfRenderer.shelfHeader=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.shelfRenderer.shelfHeader}
 */
proto.browse_proto.shelfRenderer.prototype.addHeader = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.shelfRenderer.shelfHeader, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.shelfRenderer} returns this
 */
proto.browse_proto.shelfRenderer.prototype.clearHeaderList = function() {
  return this.setHeaderList([]);
};


/**
 * repeated browseNavigation navigation = 3;
 * @return {!Array<!proto.browse_proto.browseNavigation>}
 */
proto.browse_proto.shelfRenderer.prototype.getNavigationList = function() {
  return /** @type{!Array<!proto.browse_proto.browseNavigation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.browseNavigation, 3));
};


/**
 * @param {!Array<!proto.browse_proto.browseNavigation>} value
 * @return {!proto.browse_proto.shelfRenderer} returns this
*/
proto.browse_proto.shelfRenderer.prototype.setNavigationList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.browse_proto.browseNavigation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.browseNavigation}
 */
proto.browse_proto.shelfRenderer.prototype.addNavigation = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.browse_proto.browseNavigation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.shelfRenderer} returns this
 */
proto.browse_proto.shelfRenderer.prototype.clearNavigationList = function() {
  return this.setNavigationList([]);
};


/**
 * repeated contents content = 5;
 * @return {!Array<!proto.browse_proto.shelfRenderer.contents>}
 */
proto.browse_proto.shelfRenderer.prototype.getContentList = function() {
  return /** @type{!Array<!proto.browse_proto.shelfRenderer.contents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.shelfRenderer.contents, 5));
};


/**
 * @param {!Array<!proto.browse_proto.shelfRenderer.contents>} value
 * @return {!proto.browse_proto.shelfRenderer} returns this
*/
proto.browse_proto.shelfRenderer.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.browse_proto.shelfRenderer.contents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.shelfRenderer.contents}
 */
proto.browse_proto.shelfRenderer.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.browse_proto.shelfRenderer.contents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.shelfRenderer} returns this
 */
proto.browse_proto.shelfRenderer.prototype.clearContentList = function() {
  return this.setContentList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.playlistData.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.playlistData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.playlistData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.playlistData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.playlistData.toObject = function(includeInstance, msg) {
  var f, obj = {
    videoList: jspb.Message.toObjectList(msg.getVideoList(),
    proto.browse_proto.playlistData.playlistVideo.toObject, includeInstance),
    id: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.playlistData}
 */
proto.browse_proto.playlistData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.playlistData;
  return proto.browse_proto.playlistData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.playlistData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.playlistData}
 */
proto.browse_proto.playlistData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.playlistData.playlistVideo;
      reader.readMessage(value,proto.browse_proto.playlistData.playlistVideo.deserializeBinaryFromReader);
      msg.addVideo(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.playlistData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.playlistData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.playlistData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.playlistData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVideoList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.playlistData.playlistVideo.serializeBinaryToWriter
    );
  }
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.playlistData.playlistVideo.repeatedFields_ = [53330184];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.playlistData.playlistVideo.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.playlistData.playlistVideo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.playlistData.playlistVideo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.playlistData.playlistVideo.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.browse_proto.playlistData.playlistVideo.contents.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.playlistData.playlistVideo}
 */
proto.browse_proto.playlistData.playlistVideo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.playlistData.playlistVideo;
  return proto.browse_proto.playlistData.playlistVideo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.playlistData.playlistVideo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.playlistData.playlistVideo}
 */
proto.browse_proto.playlistData.playlistVideo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 53330184:
      var value = new proto.browse_proto.playlistData.playlistVideo.contents;
      reader.readMessage(value,proto.browse_proto.playlistData.playlistVideo.contents.deserializeBinaryFromReader);
      msg.addContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.playlistData.playlistVideo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.playlistData.playlistVideo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.playlistData.playlistVideo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.playlistData.playlistVideo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      53330184,
      f,
      proto.browse_proto.playlistData.playlistVideo.contents.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.playlistData.playlistVideo.contents.repeatedFields_ = [2,3,4,5,6,7];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.playlistData.playlistVideo.contents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.playlistData.playlistVideo.contents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.playlistData.playlistVideo.contents.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    thumbnailList: jspb.Message.toObjectList(msg.getThumbnailList(),
    proto.browse_proto.thumbnails.toObject, includeInstance),
    titleList: jspb.Message.toObjectList(msg.getTitleList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    indexList: jspb.Message.toObjectList(msg.getIndexList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    ownerList: jspb.Message.toObjectList(msg.getOwnerList(),
    proto.browse_proto.ownerData.toObject, includeInstance),
    lengthList: jspb.Message.toObjectList(msg.getLengthList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    endpointList: jspb.Message.toObjectList(msg.getEndpointList(),
    proto.browse_proto.playlistData.playlistVideo.contents.endpointData.toObject, includeInstance),
    int11: jspb.Message.getFieldWithDefault(msg, 11, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents}
 */
proto.browse_proto.playlistData.playlistVideo.contents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.playlistData.playlistVideo.contents;
  return proto.browse_proto.playlistData.playlistVideo.contents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.playlistData.playlistVideo.contents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents}
 */
proto.browse_proto.playlistData.playlistVideo.contents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = new proto.browse_proto.thumbnails;
      reader.readMessage(value,proto.browse_proto.thumbnails.deserializeBinaryFromReader);
      msg.addThumbnail(value);
      break;
    case 3:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addTitle(value);
      break;
    case 4:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addIndex(value);
      break;
    case 5:
      var value = new proto.browse_proto.ownerData;
      reader.readMessage(value,proto.browse_proto.ownerData.deserializeBinaryFromReader);
      msg.addOwner(value);
      break;
    case 6:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addLength(value);
      break;
    case 7:
      var value = new proto.browse_proto.playlistData.playlistVideo.contents.endpointData;
      reader.readMessage(value,proto.browse_proto.playlistData.playlistVideo.contents.endpointData.deserializeBinaryFromReader);
      msg.addEndpoint(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt11(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.playlistData.playlistVideo.contents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.playlistData.playlistVideo.contents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.playlistData.playlistVideo.contents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getThumbnailList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.browse_proto.thumbnails.serializeBinaryToWriter
    );
  }
  f = message.getTitleList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getIndexList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getOwnerList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.browse_proto.ownerData.serializeBinaryToWriter
    );
  }
  f = message.getLengthList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getEndpointList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.browse_proto.playlistData.playlistVideo.contents.endpointData.serializeBinaryToWriter
    );
  }
  f = message.getInt11();
  if (f !== 0) {
    writer.writeInt32(
      11,
      f
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.repeatedFields_ = [48687757];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.playlistData.playlistVideo.contents.endpointData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData}
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.playlistData.playlistVideo.contents.endpointData;
  return proto.browse_proto.playlistData.playlistVideo.contents.endpointData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData}
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 48687757:
      var value = new proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents;
      reader.readMessage(value,proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.deserializeBinaryFromReader);
      msg.addContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.playlistData.playlistVideo.contents.endpointData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      48687757,
      f,
      proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    playlistid: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents}
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents;
  return proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents}
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPlaylistid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPlaylistid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents} returns this
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string playlistId = 2;
 * @return {string}
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.prototype.getPlaylistid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents} returns this
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents.prototype.setPlaylistid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated contents content = 48687757;
 * @return {!Array<!proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents>}
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.prototype.getContentList = function() {
  return /** @type{!Array<!proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents, 48687757));
};


/**
 * @param {!Array<!proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents>} value
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData} returns this
*/
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 48687757, value);
};


/**
 * @param {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents}
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 48687757, opt_value, proto.browse_proto.playlistData.playlistVideo.contents.endpointData.contents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData} returns this
 */
proto.browse_proto.playlistData.playlistVideo.contents.endpointData.prototype.clearContentList = function() {
  return this.setContentList([]);
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated thumbnails thumbnail = 2;
 * @return {!Array<!proto.browse_proto.thumbnails>}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.getThumbnailList = function() {
  return /** @type{!Array<!proto.browse_proto.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.thumbnails, 2));
};


/**
 * @param {!Array<!proto.browse_proto.thumbnails>} value
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
*/
proto.browse_proto.playlistData.playlistVideo.contents.prototype.setThumbnailList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.browse_proto.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.addThumbnail = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.browse_proto.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.clearThumbnailList = function() {
  return this.setThumbnailList([]);
};


/**
 * repeated textRuns title = 3;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.getTitleList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 3));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
*/
proto.browse_proto.playlistData.playlistVideo.contents.prototype.setTitleList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.addTitle = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.clearTitleList = function() {
  return this.setTitleList([]);
};


/**
 * repeated textRuns index = 4;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.getIndexList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 4));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
*/
proto.browse_proto.playlistData.playlistVideo.contents.prototype.setIndexList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.addIndex = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.clearIndexList = function() {
  return this.setIndexList([]);
};


/**
 * repeated ownerData owner = 5;
 * @return {!Array<!proto.browse_proto.ownerData>}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.getOwnerList = function() {
  return /** @type{!Array<!proto.browse_proto.ownerData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.ownerData, 5));
};


/**
 * @param {!Array<!proto.browse_proto.ownerData>} value
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
*/
proto.browse_proto.playlistData.playlistVideo.contents.prototype.setOwnerList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.browse_proto.ownerData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.ownerData}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.addOwner = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.browse_proto.ownerData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.clearOwnerList = function() {
  return this.setOwnerList([]);
};


/**
 * repeated textRuns length = 6;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.getLengthList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 6));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
*/
proto.browse_proto.playlistData.playlistVideo.contents.prototype.setLengthList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.addLength = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.clearLengthList = function() {
  return this.setLengthList([]);
};


/**
 * repeated endpointData endpoint = 7;
 * @return {!Array<!proto.browse_proto.playlistData.playlistVideo.contents.endpointData>}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.getEndpointList = function() {
  return /** @type{!Array<!proto.browse_proto.playlistData.playlistVideo.contents.endpointData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.playlistData.playlistVideo.contents.endpointData, 7));
};


/**
 * @param {!Array<!proto.browse_proto.playlistData.playlistVideo.contents.endpointData>} value
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
*/
proto.browse_proto.playlistData.playlistVideo.contents.prototype.setEndpointList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents.endpointData}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.addEndpoint = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.browse_proto.playlistData.playlistVideo.contents.endpointData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.clearEndpointList = function() {
  return this.setEndpointList([]);
};


/**
 * optional int32 int11 = 11;
 * @return {number}
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.getInt11 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents} returns this
 */
proto.browse_proto.playlistData.playlistVideo.contents.prototype.setInt11 = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};


/**
 * repeated contents content = 53330184;
 * @return {!Array<!proto.browse_proto.playlistData.playlistVideo.contents>}
 */
proto.browse_proto.playlistData.playlistVideo.prototype.getContentList = function() {
  return /** @type{!Array<!proto.browse_proto.playlistData.playlistVideo.contents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.playlistData.playlistVideo.contents, 53330184));
};


/**
 * @param {!Array<!proto.browse_proto.playlistData.playlistVideo.contents>} value
 * @return {!proto.browse_proto.playlistData.playlistVideo} returns this
*/
proto.browse_proto.playlistData.playlistVideo.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 53330184, value);
};


/**
 * @param {!proto.browse_proto.playlistData.playlistVideo.contents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.playlistData.playlistVideo.contents}
 */
proto.browse_proto.playlistData.playlistVideo.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 53330184, opt_value, proto.browse_proto.playlistData.playlistVideo.contents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistData.playlistVideo} returns this
 */
proto.browse_proto.playlistData.playlistVideo.prototype.clearContentList = function() {
  return this.setContentList([]);
};


/**
 * repeated playlistVideo video = 1;
 * @return {!Array<!proto.browse_proto.playlistData.playlistVideo>}
 */
proto.browse_proto.playlistData.prototype.getVideoList = function() {
  return /** @type{!Array<!proto.browse_proto.playlistData.playlistVideo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.playlistData.playlistVideo, 1));
};


/**
 * @param {!Array<!proto.browse_proto.playlistData.playlistVideo>} value
 * @return {!proto.browse_proto.playlistData} returns this
*/
proto.browse_proto.playlistData.prototype.setVideoList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.playlistData.playlistVideo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.playlistData.playlistVideo}
 */
proto.browse_proto.playlistData.prototype.addVideo = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.playlistData.playlistVideo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.playlistData} returns this
 */
proto.browse_proto.playlistData.prototype.clearVideoList = function() {
  return this.setVideoList([]);
};


/**
 * optional string id = 2;
 * @return {string}
 */
proto.browse_proto.playlistData.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.playlistData} returns this
 */
proto.browse_proto.playlistData.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.accountTabLink.repeatedFields_ = [1,2,3,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.accountTabLink.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.accountTabLink.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.accountTabLink} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.accountTabLink.toObject = function(includeInstance, msg) {
  var f, obj = {
    icondataList: jspb.Message.toObjectList(msg.getIcondataList(),
    proto.browse_proto.accountTabLink.icon.toObject, includeInstance),
    imageList: jspb.Message.toObjectList(msg.getImageList(),
    proto.browse_proto.thumbnails.toObject, includeInstance),
    textList: jspb.Message.toObjectList(msg.getTextList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    navigationList: jspb.Message.toObjectList(msg.getNavigationList(),
    proto.browse_proto.browseNavigation.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.accountTabLink}
 */
proto.browse_proto.accountTabLink.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.accountTabLink;
  return proto.browse_proto.accountTabLink.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.accountTabLink} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.accountTabLink}
 */
proto.browse_proto.accountTabLink.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.accountTabLink.icon;
      reader.readMessage(value,proto.browse_proto.accountTabLink.icon.deserializeBinaryFromReader);
      msg.addIcondata(value);
      break;
    case 2:
      var value = new proto.browse_proto.thumbnails;
      reader.readMessage(value,proto.browse_proto.thumbnails.deserializeBinaryFromReader);
      msg.addImage(value);
      break;
    case 3:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addText(value);
      break;
    case 4:
      var value = new proto.browse_proto.browseNavigation;
      reader.readMessage(value,proto.browse_proto.browseNavigation.deserializeBinaryFromReader);
      msg.addNavigation(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.accountTabLink.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.accountTabLink.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.accountTabLink} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.accountTabLink.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIcondataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.accountTabLink.icon.serializeBinaryToWriter
    );
  }
  f = message.getImageList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.browse_proto.thumbnails.serializeBinaryToWriter
    );
  }
  f = message.getTextList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getNavigationList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.browse_proto.browseNavigation.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.accountTabLink.icon.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.accountTabLink.icon.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.accountTabLink.icon} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.accountTabLink.icon.toObject = function(includeInstance, msg) {
  var f, obj = {
    icontype: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.accountTabLink.icon}
 */
proto.browse_proto.accountTabLink.icon.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.accountTabLink.icon;
  return proto.browse_proto.accountTabLink.icon.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.accountTabLink.icon} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.accountTabLink.icon}
 */
proto.browse_proto.accountTabLink.icon.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setIcontype(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.accountTabLink.icon.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.accountTabLink.icon.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.accountTabLink.icon} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.accountTabLink.icon.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIcontype();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 iconType = 1;
 * @return {number}
 */
proto.browse_proto.accountTabLink.icon.prototype.getIcontype = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.accountTabLink.icon} returns this
 */
proto.browse_proto.accountTabLink.icon.prototype.setIcontype = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated icon iconData = 1;
 * @return {!Array<!proto.browse_proto.accountTabLink.icon>}
 */
proto.browse_proto.accountTabLink.prototype.getIcondataList = function() {
  return /** @type{!Array<!proto.browse_proto.accountTabLink.icon>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.accountTabLink.icon, 1));
};


/**
 * @param {!Array<!proto.browse_proto.accountTabLink.icon>} value
 * @return {!proto.browse_proto.accountTabLink} returns this
*/
proto.browse_proto.accountTabLink.prototype.setIcondataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.accountTabLink.icon=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.accountTabLink.icon}
 */
proto.browse_proto.accountTabLink.prototype.addIcondata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.accountTabLink.icon, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.accountTabLink} returns this
 */
proto.browse_proto.accountTabLink.prototype.clearIcondataList = function() {
  return this.setIcondataList([]);
};


/**
 * repeated thumbnails image = 2;
 * @return {!Array<!proto.browse_proto.thumbnails>}
 */
proto.browse_proto.accountTabLink.prototype.getImageList = function() {
  return /** @type{!Array<!proto.browse_proto.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.thumbnails, 2));
};


/**
 * @param {!Array<!proto.browse_proto.thumbnails>} value
 * @return {!proto.browse_proto.accountTabLink} returns this
*/
proto.browse_proto.accountTabLink.prototype.setImageList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.browse_proto.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.accountTabLink.prototype.addImage = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.browse_proto.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.accountTabLink} returns this
 */
proto.browse_proto.accountTabLink.prototype.clearImageList = function() {
  return this.setImageList([]);
};


/**
 * repeated textRuns text = 3;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.accountTabLink.prototype.getTextList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 3));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.accountTabLink} returns this
*/
proto.browse_proto.accountTabLink.prototype.setTextList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.accountTabLink.prototype.addText = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.accountTabLink} returns this
 */
proto.browse_proto.accountTabLink.prototype.clearTextList = function() {
  return this.setTextList([]);
};


/**
 * repeated browseNavigation navigation = 4;
 * @return {!Array<!proto.browse_proto.browseNavigation>}
 */
proto.browse_proto.accountTabLink.prototype.getNavigationList = function() {
  return /** @type{!Array<!proto.browse_proto.browseNavigation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.browseNavigation, 4));
};


/**
 * @param {!Array<!proto.browse_proto.browseNavigation>} value
 * @return {!proto.browse_proto.accountTabLink} returns this
*/
proto.browse_proto.accountTabLink.prototype.setNavigationList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.browse_proto.browseNavigation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.browseNavigation}
 */
proto.browse_proto.accountTabLink.prototype.addNavigation = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.browse_proto.browseNavigation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.accountTabLink} returns this
 */
proto.browse_proto.accountTabLink.prototype.clearNavigationList = function() {
  return this.setNavigationList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.itemSectionRenderer.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.itemSectionRenderer.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.itemSectionRenderer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.itemSectionRenderer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.itemSectionRenderer.toObject = function(includeInstance, msg) {
  var f, obj = {
    icscontentList: jspb.Message.toObjectList(msg.getIcscontentList(),
    proto.browse_proto.itemSectionRenderer.icsContents.toObject, includeInstance),
    nextList: jspb.Message.toObjectList(msg.getNextList(),
    proto.browse_proto.nextRequest.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.itemSectionRenderer}
 */
proto.browse_proto.itemSectionRenderer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.itemSectionRenderer;
  return proto.browse_proto.itemSectionRenderer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.itemSectionRenderer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.itemSectionRenderer}
 */
proto.browse_proto.itemSectionRenderer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.itemSectionRenderer.icsContents;
      reader.readMessage(value,proto.browse_proto.itemSectionRenderer.icsContents.deserializeBinaryFromReader);
      msg.addIcscontent(value);
      break;
    case 2:
      var value = new proto.browse_proto.nextRequest;
      reader.readMessage(value,proto.browse_proto.nextRequest.deserializeBinaryFromReader);
      msg.addNext(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.itemSectionRenderer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.itemSectionRenderer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.itemSectionRenderer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.itemSectionRenderer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIcscontentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.itemSectionRenderer.icsContents.serializeBinaryToWriter
    );
  }
  f = message.getNextList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.browse_proto.nextRequest.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.itemSectionRenderer.icsContents.repeatedFields_ = [50630979,50742631,52191200,50794305,79129962];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.itemSectionRenderer.icsContents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.itemSectionRenderer.icsContents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.itemSectionRenderer.icsContents.toObject = function(includeInstance, msg) {
  var f, obj = {
    videoList: jspb.Message.toObjectList(msg.getVideoList(),
    proto.browse_proto.compactVideoRenderer.toObject, includeInstance),
    playlistList: jspb.Message.toObjectList(msg.getPlaylistList(),
    proto.browse_proto.playlistRenderer.toObject, includeInstance),
    aboutList: jspb.Message.toObjectList(msg.getAboutList(),
    proto.browse_proto.aboutRenderer.toObject, includeInstance),
    channelList: jspb.Message.toObjectList(msg.getChannelList(),
    proto.browse_proto.channelRenderer.toObject, includeInstance),
    accountlinkList: jspb.Message.toObjectList(msg.getAccountlinkList(),
    proto.browse_proto.accountTabLink.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.itemSectionRenderer.icsContents}
 */
proto.browse_proto.itemSectionRenderer.icsContents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.itemSectionRenderer.icsContents;
  return proto.browse_proto.itemSectionRenderer.icsContents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.itemSectionRenderer.icsContents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.itemSectionRenderer.icsContents}
 */
proto.browse_proto.itemSectionRenderer.icsContents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 50630979:
      var value = new proto.browse_proto.compactVideoRenderer;
      reader.readMessage(value,proto.browse_proto.compactVideoRenderer.deserializeBinaryFromReader);
      msg.addVideo(value);
      break;
    case 50742631:
      var value = new proto.browse_proto.playlistRenderer;
      reader.readMessage(value,proto.browse_proto.playlistRenderer.deserializeBinaryFromReader);
      msg.addPlaylist(value);
      break;
    case 52191200:
      var value = new proto.browse_proto.aboutRenderer;
      reader.readMessage(value,proto.browse_proto.aboutRenderer.deserializeBinaryFromReader);
      msg.addAbout(value);
      break;
    case 50794305:
      var value = new proto.browse_proto.channelRenderer;
      reader.readMessage(value,proto.browse_proto.channelRenderer.deserializeBinaryFromReader);
      msg.addChannel(value);
      break;
    case 79129962:
      var value = new proto.browse_proto.accountTabLink;
      reader.readMessage(value,proto.browse_proto.accountTabLink.deserializeBinaryFromReader);
      msg.addAccountlink(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.itemSectionRenderer.icsContents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.itemSectionRenderer.icsContents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.itemSectionRenderer.icsContents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVideoList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      50630979,
      f,
      proto.browse_proto.compactVideoRenderer.serializeBinaryToWriter
    );
  }
  f = message.getPlaylistList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      50742631,
      f,
      proto.browse_proto.playlistRenderer.serializeBinaryToWriter
    );
  }
  f = message.getAboutList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      52191200,
      f,
      proto.browse_proto.aboutRenderer.serializeBinaryToWriter
    );
  }
  f = message.getChannelList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      50794305,
      f,
      proto.browse_proto.channelRenderer.serializeBinaryToWriter
    );
  }
  f = message.getAccountlinkList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      79129962,
      f,
      proto.browse_proto.accountTabLink.serializeBinaryToWriter
    );
  }
};


/**
 * repeated compactVideoRenderer video = 50630979;
 * @return {!Array<!proto.browse_proto.compactVideoRenderer>}
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.getVideoList = function() {
  return /** @type{!Array<!proto.browse_proto.compactVideoRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.compactVideoRenderer, 50630979));
};


/**
 * @param {!Array<!proto.browse_proto.compactVideoRenderer>} value
 * @return {!proto.browse_proto.itemSectionRenderer.icsContents} returns this
*/
proto.browse_proto.itemSectionRenderer.icsContents.prototype.setVideoList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 50630979, value);
};


/**
 * @param {!proto.browse_proto.compactVideoRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.compactVideoRenderer}
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.addVideo = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 50630979, opt_value, proto.browse_proto.compactVideoRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.itemSectionRenderer.icsContents} returns this
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.clearVideoList = function() {
  return this.setVideoList([]);
};


/**
 * repeated playlistRenderer playlist = 50742631;
 * @return {!Array<!proto.browse_proto.playlistRenderer>}
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.getPlaylistList = function() {
  return /** @type{!Array<!proto.browse_proto.playlistRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.playlistRenderer, 50742631));
};


/**
 * @param {!Array<!proto.browse_proto.playlistRenderer>} value
 * @return {!proto.browse_proto.itemSectionRenderer.icsContents} returns this
*/
proto.browse_proto.itemSectionRenderer.icsContents.prototype.setPlaylistList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 50742631, value);
};


/**
 * @param {!proto.browse_proto.playlistRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.playlistRenderer}
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.addPlaylist = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 50742631, opt_value, proto.browse_proto.playlistRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.itemSectionRenderer.icsContents} returns this
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.clearPlaylistList = function() {
  return this.setPlaylistList([]);
};


/**
 * repeated aboutRenderer about = 52191200;
 * @return {!Array<!proto.browse_proto.aboutRenderer>}
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.getAboutList = function() {
  return /** @type{!Array<!proto.browse_proto.aboutRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.aboutRenderer, 52191200));
};


/**
 * @param {!Array<!proto.browse_proto.aboutRenderer>} value
 * @return {!proto.browse_proto.itemSectionRenderer.icsContents} returns this
*/
proto.browse_proto.itemSectionRenderer.icsContents.prototype.setAboutList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 52191200, value);
};


/**
 * @param {!proto.browse_proto.aboutRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.aboutRenderer}
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.addAbout = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 52191200, opt_value, proto.browse_proto.aboutRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.itemSectionRenderer.icsContents} returns this
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.clearAboutList = function() {
  return this.setAboutList([]);
};


/**
 * repeated channelRenderer channel = 50794305;
 * @return {!Array<!proto.browse_proto.channelRenderer>}
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.getChannelList = function() {
  return /** @type{!Array<!proto.browse_proto.channelRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.channelRenderer, 50794305));
};


/**
 * @param {!Array<!proto.browse_proto.channelRenderer>} value
 * @return {!proto.browse_proto.itemSectionRenderer.icsContents} returns this
*/
proto.browse_proto.itemSectionRenderer.icsContents.prototype.setChannelList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 50794305, value);
};


/**
 * @param {!proto.browse_proto.channelRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.channelRenderer}
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.addChannel = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 50794305, opt_value, proto.browse_proto.channelRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.itemSectionRenderer.icsContents} returns this
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.clearChannelList = function() {
  return this.setChannelList([]);
};


/**
 * repeated accountTabLink accountLink = 79129962;
 * @return {!Array<!proto.browse_proto.accountTabLink>}
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.getAccountlinkList = function() {
  return /** @type{!Array<!proto.browse_proto.accountTabLink>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.accountTabLink, 79129962));
};


/**
 * @param {!Array<!proto.browse_proto.accountTabLink>} value
 * @return {!proto.browse_proto.itemSectionRenderer.icsContents} returns this
*/
proto.browse_proto.itemSectionRenderer.icsContents.prototype.setAccountlinkList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 79129962, value);
};


/**
 * @param {!proto.browse_proto.accountTabLink=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.accountTabLink}
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.addAccountlink = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 79129962, opt_value, proto.browse_proto.accountTabLink, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.itemSectionRenderer.icsContents} returns this
 */
proto.browse_proto.itemSectionRenderer.icsContents.prototype.clearAccountlinkList = function() {
  return this.setAccountlinkList([]);
};


/**
 * repeated icsContents icsContent = 1;
 * @return {!Array<!proto.browse_proto.itemSectionRenderer.icsContents>}
 */
proto.browse_proto.itemSectionRenderer.prototype.getIcscontentList = function() {
  return /** @type{!Array<!proto.browse_proto.itemSectionRenderer.icsContents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.itemSectionRenderer.icsContents, 1));
};


/**
 * @param {!Array<!proto.browse_proto.itemSectionRenderer.icsContents>} value
 * @return {!proto.browse_proto.itemSectionRenderer} returns this
*/
proto.browse_proto.itemSectionRenderer.prototype.setIcscontentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.itemSectionRenderer.icsContents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.itemSectionRenderer.icsContents}
 */
proto.browse_proto.itemSectionRenderer.prototype.addIcscontent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.itemSectionRenderer.icsContents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.itemSectionRenderer} returns this
 */
proto.browse_proto.itemSectionRenderer.prototype.clearIcscontentList = function() {
  return this.setIcscontentList([]);
};


/**
 * repeated nextRequest next = 2;
 * @return {!Array<!proto.browse_proto.nextRequest>}
 */
proto.browse_proto.itemSectionRenderer.prototype.getNextList = function() {
  return /** @type{!Array<!proto.browse_proto.nextRequest>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.nextRequest, 2));
};


/**
 * @param {!Array<!proto.browse_proto.nextRequest>} value
 * @return {!proto.browse_proto.itemSectionRenderer} returns this
*/
proto.browse_proto.itemSectionRenderer.prototype.setNextList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.browse_proto.nextRequest=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.nextRequest}
 */
proto.browse_proto.itemSectionRenderer.prototype.addNext = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.browse_proto.nextRequest, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.itemSectionRenderer} returns this
 */
proto.browse_proto.itemSectionRenderer.prototype.clearNextList = function() {
  return this.setNextList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.repeatedFields_ = [1,9,13];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.toObject = function(includeInstance, msg) {
  var f, obj = {
    contextList: jspb.Message.toObjectList(msg.getContextList(),
    proto.browse_proto.root.contextType.toObject, includeInstance),
    contentsList: jspb.Message.toObjectList(msg.getContentsList(),
    proto.browse_proto.root.responseBody.toObject, includeInstance),
    headerList: jspb.Message.toObjectList(msg.getHeaderList(),
    proto.browse_proto.root.headerRender.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root}
 */
proto.browse_proto.root.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root;
  return proto.browse_proto.root.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root}
 */
proto.browse_proto.root.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.root.contextType;
      reader.readMessage(value,proto.browse_proto.root.contextType.deserializeBinaryFromReader);
      msg.addContext(value);
      break;
    case 9:
      var value = new proto.browse_proto.root.responseBody;
      reader.readMessage(value,proto.browse_proto.root.responseBody.deserializeBinaryFromReader);
      msg.addContents(value);
      break;
    case 13:
      var value = new proto.browse_proto.root.headerRender;
      reader.readMessage(value,proto.browse_proto.root.headerRender.deserializeBinaryFromReader);
      msg.addHeader(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContextList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.root.contextType.serializeBinaryToWriter
    );
  }
  f = message.getContentsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      9,
      f,
      proto.browse_proto.root.responseBody.serializeBinaryToWriter
    );
  }
  f = message.getHeaderList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      13,
      f,
      proto.browse_proto.root.headerRender.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.contextType.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.contextType.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.contextType.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.contextType} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.contextType.toObject = function(includeInstance, msg) {
  var f, obj = {
    contexttoken: jspb.Message.getFieldWithDefault(msg, 2, ""),
    clientList: jspb.Message.toObjectList(msg.getClientList(),
    proto.browse_proto.root.contextType.clientType.toObject, includeInstance),
    hundredint: jspb.Message.getFieldWithDefault(msg, 7, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.contextType}
 */
proto.browse_proto.root.contextType.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.contextType;
  return proto.browse_proto.root.contextType.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.contextType} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.contextType}
 */
proto.browse_proto.root.contextType.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContexttoken(value);
      break;
    case 6:
      var value = new proto.browse_proto.root.contextType.clientType;
      reader.readMessage(value,proto.browse_proto.root.contextType.clientType.deserializeBinaryFromReader);
      msg.addClient(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHundredint(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.contextType.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.contextType.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.contextType} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.contextType.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContexttoken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getClientList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.browse_proto.root.contextType.clientType.serializeBinaryToWriter
    );
  }
  f = message.getHundredint();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.contextType.clientType.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.contextType.clientType.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.contextType.clientType.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.contextType.clientType} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.contextType.clientType.toObject = function(includeInstance, msg) {
  var f, obj = {
    clientsmth: jspb.Message.getFieldWithDefault(msg, 1, 0),
    paramList: jspb.Message.toObjectList(msg.getParamList(),
    proto.browse_proto.root.contextType.clientType.clientParam.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.contextType.clientType}
 */
proto.browse_proto.root.contextType.clientType.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.contextType.clientType;
  return proto.browse_proto.root.contextType.clientType.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.contextType.clientType} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.contextType.clientType}
 */
proto.browse_proto.root.contextType.clientType.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setClientsmth(value);
      break;
    case 2:
      var value = new proto.browse_proto.root.contextType.clientType.clientParam;
      reader.readMessage(value,proto.browse_proto.root.contextType.clientType.clientParam.deserializeBinaryFromReader);
      msg.addParam(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.contextType.clientType.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.contextType.clientType.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.contextType.clientType} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.contextType.clientType.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getClientsmth();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getParamList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.browse_proto.root.contextType.clientType.clientParam.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.contextType.clientType.clientParam.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.contextType.clientType.clientParam.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.contextType.clientType.clientParam} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.contextType.clientType.clientParam.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    value: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.contextType.clientType.clientParam}
 */
proto.browse_proto.root.contextType.clientType.clientParam.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.contextType.clientType.clientParam;
  return proto.browse_proto.root.contextType.clientType.clientParam.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.contextType.clientType.clientParam} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.contextType.clientType.clientParam}
 */
proto.browse_proto.root.contextType.clientType.clientParam.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.contextType.clientType.clientParam.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.contextType.clientType.clientParam.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.contextType.clientType.clientParam} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.contextType.clientType.clientParam.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getValue();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.browse_proto.root.contextType.clientType.clientParam.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.root.contextType.clientType.clientParam} returns this
 */
proto.browse_proto.root.contextType.clientType.clientParam.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string value = 2;
 * @return {string}
 */
proto.browse_proto.root.contextType.clientType.clientParam.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.root.contextType.clientType.clientParam} returns this
 */
proto.browse_proto.root.contextType.clientType.clientParam.prototype.setValue = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int32 clientSmth = 1;
 * @return {number}
 */
proto.browse_proto.root.contextType.clientType.prototype.getClientsmth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.root.contextType.clientType} returns this
 */
proto.browse_proto.root.contextType.clientType.prototype.setClientsmth = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated clientParam param = 2;
 * @return {!Array<!proto.browse_proto.root.contextType.clientType.clientParam>}
 */
proto.browse_proto.root.contextType.clientType.prototype.getParamList = function() {
  return /** @type{!Array<!proto.browse_proto.root.contextType.clientType.clientParam>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.contextType.clientType.clientParam, 2));
};


/**
 * @param {!Array<!proto.browse_proto.root.contextType.clientType.clientParam>} value
 * @return {!proto.browse_proto.root.contextType.clientType} returns this
*/
proto.browse_proto.root.contextType.clientType.prototype.setParamList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.browse_proto.root.contextType.clientType.clientParam=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.contextType.clientType.clientParam}
 */
proto.browse_proto.root.contextType.clientType.prototype.addParam = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.browse_proto.root.contextType.clientType.clientParam, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.contextType.clientType} returns this
 */
proto.browse_proto.root.contextType.clientType.prototype.clearParamList = function() {
  return this.setParamList([]);
};


/**
 * optional string contextToken = 2;
 * @return {string}
 */
proto.browse_proto.root.contextType.prototype.getContexttoken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.root.contextType} returns this
 */
proto.browse_proto.root.contextType.prototype.setContexttoken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated clientType client = 6;
 * @return {!Array<!proto.browse_proto.root.contextType.clientType>}
 */
proto.browse_proto.root.contextType.prototype.getClientList = function() {
  return /** @type{!Array<!proto.browse_proto.root.contextType.clientType>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.contextType.clientType, 6));
};


/**
 * @param {!Array<!proto.browse_proto.root.contextType.clientType>} value
 * @return {!proto.browse_proto.root.contextType} returns this
*/
proto.browse_proto.root.contextType.prototype.setClientList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.browse_proto.root.contextType.clientType=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.contextType.clientType}
 */
proto.browse_proto.root.contextType.prototype.addClient = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.browse_proto.root.contextType.clientType, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.contextType} returns this
 */
proto.browse_proto.root.contextType.prototype.clearClientList = function() {
  return this.setClientList([]);
};


/**
 * optional int32 hundredInt = 7;
 * @return {number}
 */
proto.browse_proto.root.contextType.prototype.getHundredint = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.root.contextType} returns this
 */
proto.browse_proto.root.contextType.prototype.setHundredint = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.responseBody.repeatedFields_ = [58173949];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.responseBody.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.responseBody.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.responseBody} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.toObject = function(includeInstance, msg) {
  var f, obj = {
    browsedataList: jspb.Message.toObjectList(msg.getBrowsedataList(),
    proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.responseBody}
 */
proto.browse_proto.root.responseBody.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.responseBody;
  return proto.browse_proto.root.responseBody.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.responseBody} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.responseBody}
 */
proto.browse_proto.root.responseBody.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 58173949:
      var value = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer;
      reader.readMessage(value,proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.deserializeBinaryFromReader);
      msg.addBrowsedata(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.responseBody.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.responseBody.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.responseBody} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBrowsedataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      58173949,
      f,
      proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.toObject = function(includeInstance, msg) {
  var f, obj = {
    tabList: jspb.Message.toObjectList(msg.getTabList(),
    proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer;
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs;
      reader.readMessage(value,proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.deserializeBinaryFromReader);
      msg.addTab(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTabList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.repeatedFields_ = [58174010];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.toObject = function(includeInstance, msg) {
  var f, obj = {
    tabrenderList: jspb.Message.toObjectList(msg.getTabrenderList(),
    proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs;
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 58174010:
      var value = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer;
      reader.readMessage(value,proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.deserializeBinaryFromReader);
      msg.addTabrender(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTabrenderList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      58174010,
      f,
      proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.repeatedFields_ = [1,4,6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.toObject = function(includeInstance, msg) {
  var f, obj = {
    navigationdataList: jspb.Message.toObjectList(msg.getNavigationdataList(),
    proto.browse_proto.browseNavigation.toObject, includeInstance),
    tabtitle: jspb.Message.getFieldWithDefault(msg, 2, ""),
    selected: jspb.Message.getFieldWithDefault(msg, 3, 0),
    contentsentryList: jspb.Message.toObjectList(msg.getContentsentryList(),
    proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.toObject, includeInstance),
    icondataList: jspb.Message.toObjectList(msg.getIcondataList(),
    proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.toObject, includeInstance),
    tabidentifier: jspb.Message.getFieldWithDefault(msg, 11, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer;
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.browseNavigation;
      reader.readMessage(value,proto.browse_proto.browseNavigation.deserializeBinaryFromReader);
      msg.addNavigationdata(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTabtitle(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSelected(value);
      break;
    case 4:
      var value = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry;
      reader.readMessage(value,proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.deserializeBinaryFromReader);
      msg.addContentsentry(value);
      break;
    case 6:
      var value = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon;
      reader.readMessage(value,proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.deserializeBinaryFromReader);
      msg.addIcondata(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setTabidentifier(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNavigationdataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.browseNavigation.serializeBinaryToWriter
    );
  }
  f = message.getTabtitle();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSelected();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getContentsentryList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.serializeBinaryToWriter
    );
  }
  f = message.getIcondataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.serializeBinaryToWriter
    );
  }
  f = message.getTabidentifier();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.repeatedFields_ = [49399797];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentarrayList: jspb.Message.toObjectList(msg.getContentarrayList(),
    proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry;
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 49399797:
      var value = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData;
      reader.readMessage(value,proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.deserializeBinaryFromReader);
      msg.addContentarray(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentarrayList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      49399797,
      f,
      proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.toObject = function(includeInstance, msg) {
  var f, obj = {
    cList: jspb.Message.toObjectList(msg.getCList(),
    proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.toObject, includeInstance),
    loadcommandList: jspb.Message.toObjectList(msg.getLoadcommandList(),
    proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData;
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData;
      reader.readMessage(value,proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.deserializeBinaryFromReader);
      msg.addC(value);
      break;
    case 2:
      var value = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData;
      reader.readMessage(value,proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.deserializeBinaryFromReader);
      msg.addLoadcommand(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.serializeBinaryToWriter
    );
  }
  f = message.getLoadcommandList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.repeatedFields_ = [50195462,51845067,54681060];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.toObject = function(includeInstance, msg) {
  var f, obj = {
    sectionList: jspb.Message.toObjectList(msg.getSectionList(),
    proto.browse_proto.itemSectionRenderer.toObject, includeInstance),
    shelfList: jspb.Message.toObjectList(msg.getShelfList(),
    proto.browse_proto.shelfRenderer.toObject, includeInstance),
    playlistList: jspb.Message.toObjectList(msg.getPlaylistList(),
    proto.browse_proto.playlistData.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData;
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 50195462:
      var value = new proto.browse_proto.itemSectionRenderer;
      reader.readMessage(value,proto.browse_proto.itemSectionRenderer.deserializeBinaryFromReader);
      msg.addSection(value);
      break;
    case 51845067:
      var value = new proto.browse_proto.shelfRenderer;
      reader.readMessage(value,proto.browse_proto.shelfRenderer.deserializeBinaryFromReader);
      msg.addShelf(value);
      break;
    case 54681060:
      var value = new proto.browse_proto.playlistData;
      reader.readMessage(value,proto.browse_proto.playlistData.deserializeBinaryFromReader);
      msg.addPlaylist(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSectionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      50195462,
      f,
      proto.browse_proto.itemSectionRenderer.serializeBinaryToWriter
    );
  }
  f = message.getShelfList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      51845067,
      f,
      proto.browse_proto.shelfRenderer.serializeBinaryToWriter
    );
  }
  f = message.getPlaylistList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      54681060,
      f,
      proto.browse_proto.playlistData.serializeBinaryToWriter
    );
  }
};


/**
 * repeated itemSectionRenderer section = 50195462;
 * @return {!Array<!proto.browse_proto.itemSectionRenderer>}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.getSectionList = function() {
  return /** @type{!Array<!proto.browse_proto.itemSectionRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.itemSectionRenderer, 50195462));
};


/**
 * @param {!Array<!proto.browse_proto.itemSectionRenderer>} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData} returns this
*/
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.setSectionList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 50195462, value);
};


/**
 * @param {!proto.browse_proto.itemSectionRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.itemSectionRenderer}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.addSection = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 50195462, opt_value, proto.browse_proto.itemSectionRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.clearSectionList = function() {
  return this.setSectionList([]);
};


/**
 * repeated shelfRenderer shelf = 51845067;
 * @return {!Array<!proto.browse_proto.shelfRenderer>}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.getShelfList = function() {
  return /** @type{!Array<!proto.browse_proto.shelfRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.shelfRenderer, 51845067));
};


/**
 * @param {!Array<!proto.browse_proto.shelfRenderer>} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData} returns this
*/
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.setShelfList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 51845067, value);
};


/**
 * @param {!proto.browse_proto.shelfRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.shelfRenderer}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.addShelf = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 51845067, opt_value, proto.browse_proto.shelfRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.clearShelfList = function() {
  return this.setShelfList([]);
};


/**
 * repeated playlistData playlist = 54681060;
 * @return {!Array<!proto.browse_proto.playlistData>}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.getPlaylistList = function() {
  return /** @type{!Array<!proto.browse_proto.playlistData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.playlistData, 54681060));
};


/**
 * @param {!Array<!proto.browse_proto.playlistData>} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData} returns this
*/
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.setPlaylistList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 54681060, value);
};


/**
 * @param {!proto.browse_proto.playlistData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.playlistData}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.addPlaylist = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 54681060, opt_value, proto.browse_proto.playlistData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData.prototype.clearPlaylistList = function() {
  return this.setPlaylistList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.repeatedFields_ = [60487319];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData;
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 60487319:
      var value = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents;
      reader.readMessage(value,proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.deserializeBinaryFromReader);
      msg.addContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      60487319,
      f,
      proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents;
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated contents content = 60487319;
 * @return {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents>}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.prototype.getContentList = function() {
  return /** @type{!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents, 60487319));
};


/**
 * @param {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents>} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData} returns this
*/
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 60487319, value);
};


/**
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 60487319, opt_value, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.contents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData.prototype.clearContentList = function() {
  return this.setContentList([]);
};


/**
 * repeated contentActualData c = 1;
 * @return {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData>}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.prototype.getCList = function() {
  return /** @type{!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData, 1));
};


/**
 * @param {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData>} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData} returns this
*/
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.prototype.setCList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.prototype.addC = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.contentActualData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.prototype.clearCList = function() {
  return this.setCList([]);
};


/**
 * repeated loadData loadCommand = 2;
 * @return {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData>}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.prototype.getLoadcommandList = function() {
  return /** @type{!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData, 2));
};


/**
 * @param {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData>} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData} returns this
*/
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.prototype.setLoadcommandList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.prototype.addLoadcommand = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.loadData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData.prototype.clearLoadcommandList = function() {
  return this.setLoadcommandList([]);
};


/**
 * repeated contentData contentArray = 49399797;
 * @return {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData>}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.prototype.getContentarrayList = function() {
  return /** @type{!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData, 49399797));
};


/**
 * @param {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData>} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry} returns this
*/
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.prototype.setContentarrayList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 49399797, value);
};


/**
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.prototype.addContentarray = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 49399797, opt_value, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.contentData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry.prototype.clearContentarrayList = function() {
  return this.setContentarrayList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.toObject = function(includeInstance, msg) {
  var f, obj = {
    icontype: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon;
  return proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setIcontype(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIcontype();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 iconType = 1;
 * @return {number}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.prototype.getIcontype = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon.prototype.setIcontype = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated browseNavigation navigationData = 1;
 * @return {!Array<!proto.browse_proto.browseNavigation>}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.getNavigationdataList = function() {
  return /** @type{!Array<!proto.browse_proto.browseNavigation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.browseNavigation, 1));
};


/**
 * @param {!Array<!proto.browse_proto.browseNavigation>} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer} returns this
*/
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.setNavigationdataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.browseNavigation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.browseNavigation}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.addNavigationdata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.browseNavigation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.clearNavigationdataList = function() {
  return this.setNavigationdataList([]);
};


/**
 * optional string tabTitle = 2;
 * @return {string}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.getTabtitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.setTabtitle = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int32 selected = 3;
 * @return {number}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.getSelected = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.setSelected = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * repeated contentEntry contentsEntry = 4;
 * @return {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry>}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.getContentsentryList = function() {
  return /** @type{!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry, 4));
};


/**
 * @param {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry>} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer} returns this
*/
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.setContentsentryList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.addContentsentry = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.contentEntry, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.clearContentsentryList = function() {
  return this.setContentsentryList([]);
};


/**
 * repeated icon iconData = 6;
 * @return {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon>}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.getIcondataList = function() {
  return /** @type{!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon, 6));
};


/**
 * @param {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon>} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer} returns this
*/
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.setIcondataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.addIcondata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.icon, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.clearIcondataList = function() {
  return this.setIcondataList([]);
};


/**
 * optional string tabIdentifier = 11;
 * @return {string}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.getTabidentifier = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer.prototype.setTabidentifier = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};


/**
 * repeated tabRenderer tabRender = 58174010;
 * @return {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer>}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.prototype.getTabrenderList = function() {
  return /** @type{!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer, 58174010));
};


/**
 * @param {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer>} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs} returns this
*/
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.prototype.setTabrenderList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 58174010, value);
};


/**
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.prototype.addTabrender = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 58174010, opt_value, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.tabRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs.prototype.clearTabrenderList = function() {
  return this.setTabrenderList([]);
};


/**
 * repeated tabs tab = 1;
 * @return {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs>}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.prototype.getTabList = function() {
  return /** @type{!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs, 1));
};


/**
 * @param {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs>} value
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer} returns this
*/
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.prototype.setTabList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs}
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.prototype.addTab = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.tabs, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer} returns this
 */
proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer.prototype.clearTabList = function() {
  return this.setTabList([]);
};


/**
 * repeated singleColumnBrowseResultsRenderer browseData = 58173949;
 * @return {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer>}
 */
proto.browse_proto.root.responseBody.prototype.getBrowsedataList = function() {
  return /** @type{!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer, 58173949));
};


/**
 * @param {!Array<!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer>} value
 * @return {!proto.browse_proto.root.responseBody} returns this
*/
proto.browse_proto.root.responseBody.prototype.setBrowsedataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 58173949, value);
};


/**
 * @param {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer}
 */
proto.browse_proto.root.responseBody.prototype.addBrowsedata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 58173949, opt_value, proto.browse_proto.root.responseBody.singleColumnBrowseResultsRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.responseBody} returns this
 */
proto.browse_proto.root.responseBody.prototype.clearBrowsedataList = function() {
  return this.setBrowsedataList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.headerRender.repeatedFields_ = [50236216,46407682,53272665];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.headerRender.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.headerRender.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.headerRender} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.headerRender.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.browse_proto.root.headerRender.headerContent.toObject, includeInstance),
    channelheaderList: jspb.Message.toObjectList(msg.getChannelheaderList(),
    proto.browse_proto.root.headerRender.c4Header.toObject, includeInstance),
    playlistheaderList: jspb.Message.toObjectList(msg.getPlaylistheaderList(),
    proto.browse_proto.root.headerRender.vlHeader.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.headerRender}
 */
proto.browse_proto.root.headerRender.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.headerRender;
  return proto.browse_proto.root.headerRender.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.headerRender} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.headerRender}
 */
proto.browse_proto.root.headerRender.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 50236216:
      var value = new proto.browse_proto.root.headerRender.headerContent;
      reader.readMessage(value,proto.browse_proto.root.headerRender.headerContent.deserializeBinaryFromReader);
      msg.addContent(value);
      break;
    case 46407682:
      var value = new proto.browse_proto.root.headerRender.c4Header;
      reader.readMessage(value,proto.browse_proto.root.headerRender.c4Header.deserializeBinaryFromReader);
      msg.addChannelheader(value);
      break;
    case 53272665:
      var value = new proto.browse_proto.root.headerRender.vlHeader;
      reader.readMessage(value,proto.browse_proto.root.headerRender.vlHeader.deserializeBinaryFromReader);
      msg.addPlaylistheader(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.headerRender.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.headerRender.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.headerRender} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.headerRender.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      50236216,
      f,
      proto.browse_proto.root.headerRender.headerContent.serializeBinaryToWriter
    );
  }
  f = message.getChannelheaderList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      46407682,
      f,
      proto.browse_proto.root.headerRender.c4Header.serializeBinaryToWriter
    );
  }
  f = message.getPlaylistheaderList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      53272665,
      f,
      proto.browse_proto.root.headerRender.vlHeader.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.headerRender.headerContent.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.headerRender.headerContent.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.headerRender.headerContent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.headerRender.headerContent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.headerRender.headerContent.toObject = function(includeInstance, msg) {
  var f, obj = {
    textList: jspb.Message.toObjectList(msg.getTextList(),
    proto.browse_proto.textRuns.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.headerRender.headerContent}
 */
proto.browse_proto.root.headerRender.headerContent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.headerRender.headerContent;
  return proto.browse_proto.root.headerRender.headerContent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.headerRender.headerContent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.headerRender.headerContent}
 */
proto.browse_proto.root.headerRender.headerContent.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addText(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.headerRender.headerContent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.headerRender.headerContent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.headerRender.headerContent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.headerRender.headerContent.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTextList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
};


/**
 * repeated textRuns text = 1;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.root.headerRender.headerContent.prototype.getTextList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 1));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.root.headerRender.headerContent} returns this
*/
proto.browse_proto.root.headerRender.headerContent.prototype.setTextList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.root.headerRender.headerContent.prototype.addText = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.headerContent} returns this
 */
proto.browse_proto.root.headerRender.headerContent.prototype.clearTextList = function() {
  return this.setTextList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.headerRender.c4Header.repeatedFields_ = [7,9,10,18,22,24,25,59];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.headerRender.c4Header.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.headerRender.c4Header} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.headerRender.c4Header.toObject = function(includeInstance, msg) {
  var f, obj = {
    channelid: jspb.Message.getFieldWithDefault(msg, 5, ""),
    channelname: jspb.Message.getFieldWithDefault(msg, 6, ""),
    navigationdataList: jspb.Message.toObjectList(msg.getNavigationdataList(),
    proto.browse_proto.browseNavigation.toObject, includeInstance),
    avatarsList: jspb.Message.toObjectList(msg.getAvatarsList(),
    proto.browse_proto.thumbnails.toObject, includeInstance),
    bannersList: jspb.Message.toObjectList(msg.getBannersList(),
    proto.browse_proto.thumbnails.toObject, includeInstance),
    subscribebuttonList: jspb.Message.toObjectList(msg.getSubscribebuttonList(),
    proto.browse_proto.subscribeButtonData.toObject, includeInstance),
    subscribecountList: jspb.Message.toObjectList(msg.getSubscribecountList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    fullresbannersList: jspb.Message.toObjectList(msg.getFullresbannersList(),
    proto.browse_proto.thumbnails.toObject, includeInstance),
    mobilebannersList: jspb.Message.toObjectList(msg.getMobilebannersList(),
    proto.browse_proto.thumbnails.toObject, includeInstance),
    channelhandleList: jspb.Message.toObjectList(msg.getChannelhandleList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    renderstyle: jspb.Message.getFieldWithDefault(msg, 60, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.headerRender.c4Header}
 */
proto.browse_proto.root.headerRender.c4Header.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.headerRender.c4Header;
  return proto.browse_proto.root.headerRender.c4Header.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.headerRender.c4Header} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.headerRender.c4Header}
 */
proto.browse_proto.root.headerRender.c4Header.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setChannelid(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setChannelname(value);
      break;
    case 7:
      var value = new proto.browse_proto.browseNavigation;
      reader.readMessage(value,proto.browse_proto.browseNavigation.deserializeBinaryFromReader);
      msg.addNavigationdata(value);
      break;
    case 9:
      var value = new proto.browse_proto.thumbnails;
      reader.readMessage(value,proto.browse_proto.thumbnails.deserializeBinaryFromReader);
      msg.addAvatars(value);
      break;
    case 10:
      var value = new proto.browse_proto.thumbnails;
      reader.readMessage(value,proto.browse_proto.thumbnails.deserializeBinaryFromReader);
      msg.addBanners(value);
      break;
    case 18:
      var value = new proto.browse_proto.subscribeButtonData;
      reader.readMessage(value,proto.browse_proto.subscribeButtonData.deserializeBinaryFromReader);
      msg.addSubscribebutton(value);
      break;
    case 22:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addSubscribecount(value);
      break;
    case 24:
      var value = new proto.browse_proto.thumbnails;
      reader.readMessage(value,proto.browse_proto.thumbnails.deserializeBinaryFromReader);
      msg.addFullresbanners(value);
      break;
    case 25:
      var value = new proto.browse_proto.thumbnails;
      reader.readMessage(value,proto.browse_proto.thumbnails.deserializeBinaryFromReader);
      msg.addMobilebanners(value);
      break;
    case 59:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addChannelhandle(value);
      break;
    case 60:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setRenderstyle(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.headerRender.c4Header.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.headerRender.c4Header} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.headerRender.c4Header.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getChannelid();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getChannelname();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getNavigationdataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.browse_proto.browseNavigation.serializeBinaryToWriter
    );
  }
  f = message.getAvatarsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      9,
      f,
      proto.browse_proto.thumbnails.serializeBinaryToWriter
    );
  }
  f = message.getBannersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      10,
      f,
      proto.browse_proto.thumbnails.serializeBinaryToWriter
    );
  }
  f = message.getSubscribebuttonList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      18,
      f,
      proto.browse_proto.subscribeButtonData.serializeBinaryToWriter
    );
  }
  f = message.getSubscribecountList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      22,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getFullresbannersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      24,
      f,
      proto.browse_proto.thumbnails.serializeBinaryToWriter
    );
  }
  f = message.getMobilebannersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      25,
      f,
      proto.browse_proto.thumbnails.serializeBinaryToWriter
    );
  }
  f = message.getChannelhandleList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      59,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getRenderstyle();
  if (f !== 0) {
    writer.writeInt32(
      60,
      f
    );
  }
};


/**
 * optional string channelId = 5;
 * @return {string}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.getChannelid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
 */
proto.browse_proto.root.headerRender.c4Header.prototype.setChannelid = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string channelName = 6;
 * @return {string}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.getChannelname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
 */
proto.browse_proto.root.headerRender.c4Header.prototype.setChannelname = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * repeated browseNavigation navigationData = 7;
 * @return {!Array<!proto.browse_proto.browseNavigation>}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.getNavigationdataList = function() {
  return /** @type{!Array<!proto.browse_proto.browseNavigation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.browseNavigation, 7));
};


/**
 * @param {!Array<!proto.browse_proto.browseNavigation>} value
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
*/
proto.browse_proto.root.headerRender.c4Header.prototype.setNavigationdataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.browse_proto.browseNavigation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.browseNavigation}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.addNavigationdata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.browse_proto.browseNavigation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
 */
proto.browse_proto.root.headerRender.c4Header.prototype.clearNavigationdataList = function() {
  return this.setNavigationdataList([]);
};


/**
 * repeated thumbnails avatars = 9;
 * @return {!Array<!proto.browse_proto.thumbnails>}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.getAvatarsList = function() {
  return /** @type{!Array<!proto.browse_proto.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.thumbnails, 9));
};


/**
 * @param {!Array<!proto.browse_proto.thumbnails>} value
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
*/
proto.browse_proto.root.headerRender.c4Header.prototype.setAvatarsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 9, value);
};


/**
 * @param {!proto.browse_proto.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.addAvatars = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 9, opt_value, proto.browse_proto.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
 */
proto.browse_proto.root.headerRender.c4Header.prototype.clearAvatarsList = function() {
  return this.setAvatarsList([]);
};


/**
 * repeated thumbnails banners = 10;
 * @return {!Array<!proto.browse_proto.thumbnails>}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.getBannersList = function() {
  return /** @type{!Array<!proto.browse_proto.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.thumbnails, 10));
};


/**
 * @param {!Array<!proto.browse_proto.thumbnails>} value
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
*/
proto.browse_proto.root.headerRender.c4Header.prototype.setBannersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 10, value);
};


/**
 * @param {!proto.browse_proto.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.addBanners = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 10, opt_value, proto.browse_proto.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
 */
proto.browse_proto.root.headerRender.c4Header.prototype.clearBannersList = function() {
  return this.setBannersList([]);
};


/**
 * repeated subscribeButtonData subscribeButton = 18;
 * @return {!Array<!proto.browse_proto.subscribeButtonData>}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.getSubscribebuttonList = function() {
  return /** @type{!Array<!proto.browse_proto.subscribeButtonData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.subscribeButtonData, 18));
};


/**
 * @param {!Array<!proto.browse_proto.subscribeButtonData>} value
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
*/
proto.browse_proto.root.headerRender.c4Header.prototype.setSubscribebuttonList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 18, value);
};


/**
 * @param {!proto.browse_proto.subscribeButtonData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.subscribeButtonData}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.addSubscribebutton = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 18, opt_value, proto.browse_proto.subscribeButtonData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
 */
proto.browse_proto.root.headerRender.c4Header.prototype.clearSubscribebuttonList = function() {
  return this.setSubscribebuttonList([]);
};


/**
 * repeated textRuns subscribeCount = 22;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.getSubscribecountList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 22));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
*/
proto.browse_proto.root.headerRender.c4Header.prototype.setSubscribecountList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 22, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.addSubscribecount = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 22, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
 */
proto.browse_proto.root.headerRender.c4Header.prototype.clearSubscribecountList = function() {
  return this.setSubscribecountList([]);
};


/**
 * repeated thumbnails fullresBanners = 24;
 * @return {!Array<!proto.browse_proto.thumbnails>}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.getFullresbannersList = function() {
  return /** @type{!Array<!proto.browse_proto.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.thumbnails, 24));
};


/**
 * @param {!Array<!proto.browse_proto.thumbnails>} value
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
*/
proto.browse_proto.root.headerRender.c4Header.prototype.setFullresbannersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 24, value);
};


/**
 * @param {!proto.browse_proto.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.addFullresbanners = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 24, opt_value, proto.browse_proto.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
 */
proto.browse_proto.root.headerRender.c4Header.prototype.clearFullresbannersList = function() {
  return this.setFullresbannersList([]);
};


/**
 * repeated thumbnails mobileBanners = 25;
 * @return {!Array<!proto.browse_proto.thumbnails>}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.getMobilebannersList = function() {
  return /** @type{!Array<!proto.browse_proto.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.thumbnails, 25));
};


/**
 * @param {!Array<!proto.browse_proto.thumbnails>} value
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
*/
proto.browse_proto.root.headerRender.c4Header.prototype.setMobilebannersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 25, value);
};


/**
 * @param {!proto.browse_proto.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.thumbnails}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.addMobilebanners = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 25, opt_value, proto.browse_proto.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
 */
proto.browse_proto.root.headerRender.c4Header.prototype.clearMobilebannersList = function() {
  return this.setMobilebannersList([]);
};


/**
 * repeated textRuns channelHandle = 59;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.getChannelhandleList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 59));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
*/
proto.browse_proto.root.headerRender.c4Header.prototype.setChannelhandleList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 59, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.addChannelhandle = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 59, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
 */
proto.browse_proto.root.headerRender.c4Header.prototype.clearChannelhandleList = function() {
  return this.setChannelhandleList([]);
};


/**
 * optional int32 renderStyle = 60;
 * @return {number}
 */
proto.browse_proto.root.headerRender.c4Header.prototype.getRenderstyle = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 60, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.root.headerRender.c4Header} returns this
 */
proto.browse_proto.root.headerRender.c4Header.prototype.setRenderstyle = function(value) {
  return jspb.Message.setProto3IntField(this, 60, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.browse_proto.root.headerRender.vlHeader.repeatedFields_ = [3,5,6,7,8,11,17,32,33];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.headerRender.vlHeader.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.headerRender.vlHeader} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.headerRender.vlHeader.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    nameList: jspb.Message.toObjectList(msg.getNameList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    videocountList: jspb.Message.toObjectList(msg.getVideocountList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    descriptionList: jspb.Message.toObjectList(msg.getDescriptionList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    ownerList: jspb.Message.toObjectList(msg.getOwnerList(),
    proto.browse_proto.ownerData.toObject, includeInstance),
    viewcountList: jspb.Message.toObjectList(msg.getViewcountList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    unk11List: jspb.Message.toObjectList(msg.getUnk11List(),
    proto.browse_proto.root.headerRender.vlHeader.pb11.toObject, includeInstance),
    int12: jspb.Message.getFieldWithDefault(msg, 12, 0),
    pb_public: jspb.Message.getFieldWithDefault(msg, 16, 0),
    navigationdataList: jspb.Message.toObjectList(msg.getNavigationdataList(),
    proto.browse_proto.browseNavigation.toObject, includeInstance),
    inlinepropertyList: jspb.Message.toObjectList(msg.getInlinepropertyList(),
    proto.browse_proto.textRuns.toObject, includeInstance),
    inlineproperty2List: jspb.Message.toObjectList(msg.getInlineproperty2List(),
    proto.browse_proto.textRuns.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.headerRender.vlHeader}
 */
proto.browse_proto.root.headerRender.vlHeader.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.headerRender.vlHeader;
  return proto.browse_proto.root.headerRender.vlHeader.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.headerRender.vlHeader} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.headerRender.vlHeader}
 */
proto.browse_proto.root.headerRender.vlHeader.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 3:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addName(value);
      break;
    case 5:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addVideocount(value);
      break;
    case 6:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addDescription(value);
      break;
    case 7:
      var value = new proto.browse_proto.ownerData;
      reader.readMessage(value,proto.browse_proto.ownerData.deserializeBinaryFromReader);
      msg.addOwner(value);
      break;
    case 8:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addViewcount(value);
      break;
    case 11:
      var value = new proto.browse_proto.root.headerRender.vlHeader.pb11;
      reader.readMessage(value,proto.browse_proto.root.headerRender.vlHeader.pb11.deserializeBinaryFromReader);
      msg.addUnk11(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt12(value);
      break;
    case 16:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPublic(value);
      break;
    case 17:
      var value = new proto.browse_proto.browseNavigation;
      reader.readMessage(value,proto.browse_proto.browseNavigation.deserializeBinaryFromReader);
      msg.addNavigationdata(value);
      break;
    case 32:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addInlineproperty(value);
      break;
    case 33:
      var value = new proto.browse_proto.textRuns;
      reader.readMessage(value,proto.browse_proto.textRuns.deserializeBinaryFromReader);
      msg.addInlineproperty2(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.headerRender.vlHeader.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.headerRender.vlHeader} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.headerRender.vlHeader.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNameList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getVideocountList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getDescriptionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getOwnerList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.browse_proto.ownerData.serializeBinaryToWriter
    );
  }
  f = message.getViewcountList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getUnk11List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      11,
      f,
      proto.browse_proto.root.headerRender.vlHeader.pb11.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 12));
  if (f != null) {
    writer.writeInt32(
      12,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 16));
  if (f != null) {
    writer.writeInt32(
      16,
      f
    );
  }
  f = message.getNavigationdataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      17,
      f,
      proto.browse_proto.browseNavigation.serializeBinaryToWriter
    );
  }
  f = message.getInlinepropertyList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      32,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getInlineproperty2List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      33,
      f,
      proto.browse_proto.textRuns.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.browse_proto.root.headerRender.vlHeader.pb11.prototype.toObject = function(opt_includeInstance) {
  return proto.browse_proto.root.headerRender.vlHeader.pb11.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.browse_proto.root.headerRender.vlHeader.pb11} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.headerRender.vlHeader.pb11.toObject = function(includeInstance, msg) {
  var f, obj = {
    int1: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.browse_proto.root.headerRender.vlHeader.pb11}
 */
proto.browse_proto.root.headerRender.vlHeader.pb11.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.browse_proto.root.headerRender.vlHeader.pb11;
  return proto.browse_proto.root.headerRender.vlHeader.pb11.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.browse_proto.root.headerRender.vlHeader.pb11} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.browse_proto.root.headerRender.vlHeader.pb11}
 */
proto.browse_proto.root.headerRender.vlHeader.pb11.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt1(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.browse_proto.root.headerRender.vlHeader.pb11.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.browse_proto.root.headerRender.vlHeader.pb11.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.browse_proto.root.headerRender.vlHeader.pb11} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.browse_proto.root.headerRender.vlHeader.pb11.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 int1 = 1;
 * @return {number}
 */
proto.browse_proto.root.headerRender.vlHeader.pb11.prototype.getInt1 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.root.headerRender.vlHeader.pb11} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.pb11.prototype.setInt1 = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.browse_proto.root.headerRender.vlHeader.pb11} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.pb11.prototype.clearInt1 = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.browse_proto.root.headerRender.vlHeader.pb11.prototype.hasInt1 = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated textRuns name = 3;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.getNameList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 3));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
*/
proto.browse_proto.root.headerRender.vlHeader.prototype.setNameList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.addName = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.clearNameList = function() {
  return this.setNameList([]);
};


/**
 * repeated textRuns videoCount = 5;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.getVideocountList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 5));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
*/
proto.browse_proto.root.headerRender.vlHeader.prototype.setVideocountList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.addVideocount = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.clearVideocountList = function() {
  return this.setVideocountList([]);
};


/**
 * repeated textRuns description = 6;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.getDescriptionList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 6));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
*/
proto.browse_proto.root.headerRender.vlHeader.prototype.setDescriptionList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.addDescription = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.clearDescriptionList = function() {
  return this.setDescriptionList([]);
};


/**
 * repeated ownerData owner = 7;
 * @return {!Array<!proto.browse_proto.ownerData>}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.getOwnerList = function() {
  return /** @type{!Array<!proto.browse_proto.ownerData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.ownerData, 7));
};


/**
 * @param {!Array<!proto.browse_proto.ownerData>} value
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
*/
proto.browse_proto.root.headerRender.vlHeader.prototype.setOwnerList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.browse_proto.ownerData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.ownerData}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.addOwner = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.browse_proto.ownerData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.clearOwnerList = function() {
  return this.setOwnerList([]);
};


/**
 * repeated textRuns viewCount = 8;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.getViewcountList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 8));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
*/
proto.browse_proto.root.headerRender.vlHeader.prototype.setViewcountList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.addViewcount = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.clearViewcountList = function() {
  return this.setViewcountList([]);
};


/**
 * repeated pb11 unk11 = 11;
 * @return {!Array<!proto.browse_proto.root.headerRender.vlHeader.pb11>}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.getUnk11List = function() {
  return /** @type{!Array<!proto.browse_proto.root.headerRender.vlHeader.pb11>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.headerRender.vlHeader.pb11, 11));
};


/**
 * @param {!Array<!proto.browse_proto.root.headerRender.vlHeader.pb11>} value
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
*/
proto.browse_proto.root.headerRender.vlHeader.prototype.setUnk11List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 11, value);
};


/**
 * @param {!proto.browse_proto.root.headerRender.vlHeader.pb11=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.headerRender.vlHeader.pb11}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.addUnk11 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 11, opt_value, proto.browse_proto.root.headerRender.vlHeader.pb11, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.clearUnk11List = function() {
  return this.setUnk11List([]);
};


/**
 * optional int32 int12 = 12;
 * @return {number}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.getInt12 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.setInt12 = function(value) {
  return jspb.Message.setField(this, 12, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.clearInt12 = function() {
  return jspb.Message.setField(this, 12, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.hasInt12 = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional int32 public = 16;
 * @return {number}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.getPublic = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 16, 0));
};


/**
 * @param {number} value
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.setPublic = function(value) {
  return jspb.Message.setField(this, 16, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.clearPublic = function() {
  return jspb.Message.setField(this, 16, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.hasPublic = function() {
  return jspb.Message.getField(this, 16) != null;
};


/**
 * repeated browseNavigation navigationData = 17;
 * @return {!Array<!proto.browse_proto.browseNavigation>}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.getNavigationdataList = function() {
  return /** @type{!Array<!proto.browse_proto.browseNavigation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.browseNavigation, 17));
};


/**
 * @param {!Array<!proto.browse_proto.browseNavigation>} value
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
*/
proto.browse_proto.root.headerRender.vlHeader.prototype.setNavigationdataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 17, value);
};


/**
 * @param {!proto.browse_proto.browseNavigation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.browseNavigation}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.addNavigationdata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 17, opt_value, proto.browse_proto.browseNavigation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.clearNavigationdataList = function() {
  return this.setNavigationdataList([]);
};


/**
 * repeated textRuns inlineProperty = 32;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.getInlinepropertyList = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 32));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
*/
proto.browse_proto.root.headerRender.vlHeader.prototype.setInlinepropertyList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 32, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.addInlineproperty = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 32, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.clearInlinepropertyList = function() {
  return this.setInlinepropertyList([]);
};


/**
 * repeated textRuns inlineProperty2 = 33;
 * @return {!Array<!proto.browse_proto.textRuns>}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.getInlineproperty2List = function() {
  return /** @type{!Array<!proto.browse_proto.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.textRuns, 33));
};


/**
 * @param {!Array<!proto.browse_proto.textRuns>} value
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
*/
proto.browse_proto.root.headerRender.vlHeader.prototype.setInlineproperty2List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 33, value);
};


/**
 * @param {!proto.browse_proto.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.textRuns}
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.addInlineproperty2 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 33, opt_value, proto.browse_proto.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender.vlHeader} returns this
 */
proto.browse_proto.root.headerRender.vlHeader.prototype.clearInlineproperty2List = function() {
  return this.setInlineproperty2List([]);
};


/**
 * repeated headerContent content = 50236216;
 * @return {!Array<!proto.browse_proto.root.headerRender.headerContent>}
 */
proto.browse_proto.root.headerRender.prototype.getContentList = function() {
  return /** @type{!Array<!proto.browse_proto.root.headerRender.headerContent>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.headerRender.headerContent, 50236216));
};


/**
 * @param {!Array<!proto.browse_proto.root.headerRender.headerContent>} value
 * @return {!proto.browse_proto.root.headerRender} returns this
*/
proto.browse_proto.root.headerRender.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 50236216, value);
};


/**
 * @param {!proto.browse_proto.root.headerRender.headerContent=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.headerRender.headerContent}
 */
proto.browse_proto.root.headerRender.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 50236216, opt_value, proto.browse_proto.root.headerRender.headerContent, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender} returns this
 */
proto.browse_proto.root.headerRender.prototype.clearContentList = function() {
  return this.setContentList([]);
};


/**
 * repeated c4Header channelHeader = 46407682;
 * @return {!Array<!proto.browse_proto.root.headerRender.c4Header>}
 */
proto.browse_proto.root.headerRender.prototype.getChannelheaderList = function() {
  return /** @type{!Array<!proto.browse_proto.root.headerRender.c4Header>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.headerRender.c4Header, 46407682));
};


/**
 * @param {!Array<!proto.browse_proto.root.headerRender.c4Header>} value
 * @return {!proto.browse_proto.root.headerRender} returns this
*/
proto.browse_proto.root.headerRender.prototype.setChannelheaderList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 46407682, value);
};


/**
 * @param {!proto.browse_proto.root.headerRender.c4Header=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.headerRender.c4Header}
 */
proto.browse_proto.root.headerRender.prototype.addChannelheader = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 46407682, opt_value, proto.browse_proto.root.headerRender.c4Header, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender} returns this
 */
proto.browse_proto.root.headerRender.prototype.clearChannelheaderList = function() {
  return this.setChannelheaderList([]);
};


/**
 * repeated vlHeader playlistHeader = 53272665;
 * @return {!Array<!proto.browse_proto.root.headerRender.vlHeader>}
 */
proto.browse_proto.root.headerRender.prototype.getPlaylistheaderList = function() {
  return /** @type{!Array<!proto.browse_proto.root.headerRender.vlHeader>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.headerRender.vlHeader, 53272665));
};


/**
 * @param {!Array<!proto.browse_proto.root.headerRender.vlHeader>} value
 * @return {!proto.browse_proto.root.headerRender} returns this
*/
proto.browse_proto.root.headerRender.prototype.setPlaylistheaderList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 53272665, value);
};


/**
 * @param {!proto.browse_proto.root.headerRender.vlHeader=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.headerRender.vlHeader}
 */
proto.browse_proto.root.headerRender.prototype.addPlaylistheader = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 53272665, opt_value, proto.browse_proto.root.headerRender.vlHeader, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root.headerRender} returns this
 */
proto.browse_proto.root.headerRender.prototype.clearPlaylistheaderList = function() {
  return this.setPlaylistheaderList([]);
};


/**
 * repeated contextType context = 1;
 * @return {!Array<!proto.browse_proto.root.contextType>}
 */
proto.browse_proto.root.prototype.getContextList = function() {
  return /** @type{!Array<!proto.browse_proto.root.contextType>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.contextType, 1));
};


/**
 * @param {!Array<!proto.browse_proto.root.contextType>} value
 * @return {!proto.browse_proto.root} returns this
*/
proto.browse_proto.root.prototype.setContextList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.browse_proto.root.contextType=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.contextType}
 */
proto.browse_proto.root.prototype.addContext = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.browse_proto.root.contextType, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root} returns this
 */
proto.browse_proto.root.prototype.clearContextList = function() {
  return this.setContextList([]);
};


/**
 * repeated responseBody contents = 9;
 * @return {!Array<!proto.browse_proto.root.responseBody>}
 */
proto.browse_proto.root.prototype.getContentsList = function() {
  return /** @type{!Array<!proto.browse_proto.root.responseBody>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.responseBody, 9));
};


/**
 * @param {!Array<!proto.browse_proto.root.responseBody>} value
 * @return {!proto.browse_proto.root} returns this
*/
proto.browse_proto.root.prototype.setContentsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 9, value);
};


/**
 * @param {!proto.browse_proto.root.responseBody=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.responseBody}
 */
proto.browse_proto.root.prototype.addContents = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 9, opt_value, proto.browse_proto.root.responseBody, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root} returns this
 */
proto.browse_proto.root.prototype.clearContentsList = function() {
  return this.setContentsList([]);
};


/**
 * repeated headerRender header = 13;
 * @return {!Array<!proto.browse_proto.root.headerRender>}
 */
proto.browse_proto.root.prototype.getHeaderList = function() {
  return /** @type{!Array<!proto.browse_proto.root.headerRender>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.browse_proto.root.headerRender, 13));
};


/**
 * @param {!Array<!proto.browse_proto.root.headerRender>} value
 * @return {!proto.browse_proto.root} returns this
*/
proto.browse_proto.root.prototype.setHeaderList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 13, value);
};


/**
 * @param {!proto.browse_proto.root.headerRender=} opt_value
 * @param {number=} opt_index
 * @return {!proto.browse_proto.root.headerRender}
 */
proto.browse_proto.root.prototype.addHeader = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 13, opt_value, proto.browse_proto.root.headerRender, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.browse_proto.root} returns this
 */
proto.browse_proto.root.prototype.clearHeaderList = function() {
  return this.setHeaderList([]);
};


goog.object.extend(exports, proto.browse_proto);

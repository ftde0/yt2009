// source: android_full_next.proto
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

goog.exportSymbol('proto.android_full_next.authorRendererData', null, global);
goog.exportSymbol('proto.android_full_next.authorRendererData.navigation', null, global);
goog.exportSymbol('proto.android_full_next.authorRendererData.navigation.endpoints', null, global);
goog.exportSymbol('proto.android_full_next.authorRendererData.subscribeButtonData', null, global);
goog.exportSymbol('proto.android_full_next.authorRendererData.subscribeButtonData.subContents', null, global);
goog.exportSymbol('proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction', null, global);
goog.exportSymbol('proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1', null, global);
goog.exportSymbol('proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.authorAvatarType', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.authorData', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.authorData.authorDataContent', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.longAuthorData', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.navigationData', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.navigationData.navData', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.navigationData.navType', null, global);
goog.exportSymbol('proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType', null, global);
goog.exportSymbol('proto.android_full_next.nextRequest', null, global);
goog.exportSymbol('proto.android_full_next.nextRequest.continuationData', null, global);
goog.exportSymbol('proto.android_full_next.root', null, global);
goog.exportSymbol('proto.android_full_next.root.bData', null, global);
goog.exportSymbol('proto.android_full_next.root.bData.pbVarious', null, global);
goog.exportSymbol('proto.android_full_next.root.contents', null, global);
goog.exportSymbol('proto.android_full_next.root.contents.singleColumnWatchNextResults', null, global);
goog.exportSymbol('proto.android_full_next.root.contents.singleColumnWatchNextResults.contents', null, global);
goog.exportSymbol('proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results', null, global);
goog.exportSymbol('proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents', null, global);
goog.exportSymbol('proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer', null, global);
goog.exportSymbol('proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents', null, global);
goog.exportSymbol('proto.android_full_next.root.fData', null, global);
goog.exportSymbol('proto.android_full_next.root.fData.pbVarious', null, global);
goog.exportSymbol('proto.android_full_next.simpleText', null, global);
goog.exportSymbol('proto.android_full_next.textRuns', null, global);
goog.exportSymbol('proto.android_full_next.textRuns.textRun', null, global);
goog.exportSymbol('proto.android_full_next.thumbnails', null, global);
goog.exportSymbol('proto.android_full_next.thumbnails.thumbnail', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer.pbVarious13', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer.pbVarious25', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer.videoActions', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer.videoActions.container', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData', null, global);
goog.exportSymbol('proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8', null, global);
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
proto.android_full_next.textRuns = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.textRuns.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.textRuns, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.textRuns.displayName = 'proto.android_full_next.textRuns';
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
proto.android_full_next.textRuns.textRun = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.textRuns.textRun, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.textRuns.textRun.displayName = 'proto.android_full_next.textRuns.textRun';
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
proto.android_full_next.thumbnails = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.thumbnails.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.thumbnails, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.thumbnails.displayName = 'proto.android_full_next.thumbnails';
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
proto.android_full_next.thumbnails.thumbnail = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.thumbnails.thumbnail, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.thumbnails.thumbnail.displayName = 'proto.android_full_next.thumbnails.thumbnail';
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
proto.android_full_next.nextRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.nextRequest.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.nextRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.nextRequest.displayName = 'proto.android_full_next.nextRequest';
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
proto.android_full_next.nextRequest.continuationData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.nextRequest.continuationData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.nextRequest.continuationData.displayName = 'proto.android_full_next.nextRequest.continuationData';
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
proto.android_full_next.simpleText = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.simpleText, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.simpleText.displayName = 'proto.android_full_next.simpleText';
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
proto.android_full_next.authorRendererData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.authorRendererData.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.authorRendererData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.authorRendererData.displayName = 'proto.android_full_next.authorRendererData';
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
proto.android_full_next.authorRendererData.navigation = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.authorRendererData.navigation.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.authorRendererData.navigation, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.authorRendererData.navigation.displayName = 'proto.android_full_next.authorRendererData.navigation';
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
proto.android_full_next.authorRendererData.navigation.endpoints = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.authorRendererData.navigation.endpoints, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.authorRendererData.navigation.endpoints.displayName = 'proto.android_full_next.authorRendererData.navigation.endpoints';
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
proto.android_full_next.authorRendererData.subscribeButtonData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.authorRendererData.subscribeButtonData.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.authorRendererData.subscribeButtonData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.authorRendererData.subscribeButtonData.displayName = 'proto.android_full_next.authorRendererData.subscribeButtonData';
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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.authorRendererData.subscribeButtonData.subContents.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.authorRendererData.subscribeButtonData.subContents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.authorRendererData.subscribeButtonData.subContents.displayName = 'proto.android_full_next.authorRendererData.subscribeButtonData.subContents';
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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.displayName = 'proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction';
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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.displayName = 'proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1';
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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.displayName = 'proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2';
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
proto.android_full_next.videoMetadataRenderer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.videoMetadataRenderer.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.displayName = 'proto.android_full_next.videoMetadataRenderer';
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
proto.android_full_next.videoMetadataRenderer.pbVarious13 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.videoMetadataRenderer.pbVarious13.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer.pbVarious13, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.pbVarious13.displayName = 'proto.android_full_next.videoMetadataRenderer.pbVarious13';
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
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.displayName = 'proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious';
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
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.displayName = 'proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain';
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
proto.android_full_next.videoMetadataRenderer.pbVarious25 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.videoMetadataRenderer.pbVarious25.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer.pbVarious25, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.pbVarious25.displayName = 'proto.android_full_next.videoMetadataRenderer.pbVarious25';
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
proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.displayName = 'proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1';
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
proto.android_full_next.videoMetadataRenderer.videoActions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.videoMetadataRenderer.videoActions.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer.videoActions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.videoActions.displayName = 'proto.android_full_next.videoMetadataRenderer.videoActions';
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
proto.android_full_next.videoMetadataRenderer.videoActions.container = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.videoMetadataRenderer.videoActions.container.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer.videoActions.container, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.videoActions.container.displayName = 'proto.android_full_next.videoMetadataRenderer.videoActions.container';
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.displayName = 'proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8';
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.displayName = 'proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10';
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.displayName = 'proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19';
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.displayName = 'proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry';
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.displayName = 'proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo';
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.displayName = 'proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData';
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
proto.android_full_next.compactVideoRenderer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.compactVideoRenderer.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.displayName = 'proto.android_full_next.compactVideoRenderer';
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
proto.android_full_next.compactVideoRenderer.authorData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.compactVideoRenderer.authorData.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.authorData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.authorData.displayName = 'proto.android_full_next.compactVideoRenderer.authorData';
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
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.authorData.authorDataContent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.displayName = 'proto.android_full_next.compactVideoRenderer.authorData.authorDataContent';
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
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.displayName = 'proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData';
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
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.displayName = 'proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint';
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
proto.android_full_next.compactVideoRenderer.navigationData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.compactVideoRenderer.navigationData.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.navigationData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.navigationData.displayName = 'proto.android_full_next.compactVideoRenderer.navigationData';
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
proto.android_full_next.compactVideoRenderer.navigationData.navType = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.compactVideoRenderer.navigationData.navType.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.navigationData.navType, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.navigationData.navType.displayName = 'proto.android_full_next.compactVideoRenderer.navigationData.navType';
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
proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.displayName = 'proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType';
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
proto.android_full_next.compactVideoRenderer.navigationData.navData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.navigationData.navData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.navigationData.navData.displayName = 'proto.android_full_next.compactVideoRenderer.navigationData.navData';
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
proto.android_full_next.compactVideoRenderer.longAuthorData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.compactVideoRenderer.longAuthorData.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.longAuthorData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.longAuthorData.displayName = 'proto.android_full_next.compactVideoRenderer.longAuthorData';
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
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.displayName = 'proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer';
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
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.displayName = 'proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation';
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
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.displayName = 'proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint';
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
proto.android_full_next.compactVideoRenderer.authorAvatarType = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.compactVideoRenderer.authorAvatarType.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.authorAvatarType, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.authorAvatarType.displayName = 'proto.android_full_next.compactVideoRenderer.authorAvatarType';
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
proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.displayName = 'proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain';
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
proto.android_full_next.root = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.root.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.root, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.root.displayName = 'proto.android_full_next.root';
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
proto.android_full_next.root.contents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.root.contents.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.root.contents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.root.contents.displayName = 'proto.android_full_next.root.contents';
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
proto.android_full_next.root.contents.singleColumnWatchNextResults = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.root.contents.singleColumnWatchNextResults.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.root.contents.singleColumnWatchNextResults, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.root.contents.singleColumnWatchNextResults.displayName = 'proto.android_full_next.root.contents.singleColumnWatchNextResults';
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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.root.contents.singleColumnWatchNextResults.contents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.displayName = 'proto.android_full_next.root.contents.singleColumnWatchNextResults.contents';
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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.displayName = 'proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results';
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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.displayName = 'proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents';
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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.displayName = 'proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer';
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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.displayName = 'proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents';
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
proto.android_full_next.root.bData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.root.bData.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.root.bData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.root.bData.displayName = 'proto.android_full_next.root.bData';
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
proto.android_full_next.root.bData.pbVarious = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.root.bData.pbVarious, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.root.bData.pbVarious.displayName = 'proto.android_full_next.root.bData.pbVarious';
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
proto.android_full_next.root.fData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.android_full_next.root.fData.repeatedFields_, null);
};
goog.inherits(proto.android_full_next.root.fData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.root.fData.displayName = 'proto.android_full_next.root.fData';
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
proto.android_full_next.root.fData.pbVarious = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.android_full_next.root.fData.pbVarious, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.android_full_next.root.fData.pbVarious.displayName = 'proto.android_full_next.root.fData.pbVarious';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.textRuns.repeatedFields_ = [1];



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
proto.android_full_next.textRuns.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.textRuns.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.textRuns} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.textRuns.toObject = function(includeInstance, msg) {
  var f, obj = {
    runList: jspb.Message.toObjectList(msg.getRunList(),
    proto.android_full_next.textRuns.textRun.toObject, includeInstance)
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
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.textRuns.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.textRuns;
  return proto.android_full_next.textRuns.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.textRuns} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.textRuns.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.textRuns.textRun;
      reader.readMessage(value,proto.android_full_next.textRuns.textRun.deserializeBinaryFromReader);
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
proto.android_full_next.textRuns.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.textRuns.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.textRuns} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.textRuns.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRunList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.textRuns.textRun.serializeBinaryToWriter
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
proto.android_full_next.textRuns.textRun.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.textRuns.textRun.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.textRuns.textRun} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.textRuns.textRun.toObject = function(includeInstance, msg) {
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
 * @return {!proto.android_full_next.textRuns.textRun}
 */
proto.android_full_next.textRuns.textRun.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.textRuns.textRun;
  return proto.android_full_next.textRuns.textRun.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.textRuns.textRun} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.textRuns.textRun}
 */
proto.android_full_next.textRuns.textRun.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.textRuns.textRun.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.textRuns.textRun.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.textRuns.textRun} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.textRuns.textRun.serializeBinaryToWriter = function(message, writer) {
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
proto.android_full_next.textRuns.textRun.prototype.getText = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.textRuns.textRun} returns this
 */
proto.android_full_next.textRuns.textRun.prototype.setText = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated textRun run = 1;
 * @return {!Array<!proto.android_full_next.textRuns.textRun>}
 */
proto.android_full_next.textRuns.prototype.getRunList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns.textRun>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns.textRun, 1));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns.textRun>} value
 * @return {!proto.android_full_next.textRuns} returns this
*/
proto.android_full_next.textRuns.prototype.setRunList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.textRuns.textRun=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns.textRun}
 */
proto.android_full_next.textRuns.prototype.addRun = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.textRuns.textRun, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.textRuns} returns this
 */
proto.android_full_next.textRuns.prototype.clearRunList = function() {
  return this.setRunList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.thumbnails.repeatedFields_ = [1];



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
proto.android_full_next.thumbnails.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.thumbnails.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.thumbnails} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.thumbnails.toObject = function(includeInstance, msg) {
  var f, obj = {
    thumbList: jspb.Message.toObjectList(msg.getThumbList(),
    proto.android_full_next.thumbnails.thumbnail.toObject, includeInstance)
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
 * @return {!proto.android_full_next.thumbnails}
 */
proto.android_full_next.thumbnails.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.thumbnails;
  return proto.android_full_next.thumbnails.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.thumbnails} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.thumbnails}
 */
proto.android_full_next.thumbnails.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.thumbnails.thumbnail;
      reader.readMessage(value,proto.android_full_next.thumbnails.thumbnail.deserializeBinaryFromReader);
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
proto.android_full_next.thumbnails.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.thumbnails.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.thumbnails} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.thumbnails.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getThumbList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.thumbnails.thumbnail.serializeBinaryToWriter
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
proto.android_full_next.thumbnails.thumbnail.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.thumbnails.thumbnail.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.thumbnails.thumbnail} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.thumbnails.thumbnail.toObject = function(includeInstance, msg) {
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
 * @return {!proto.android_full_next.thumbnails.thumbnail}
 */
proto.android_full_next.thumbnails.thumbnail.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.thumbnails.thumbnail;
  return proto.android_full_next.thumbnails.thumbnail.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.thumbnails.thumbnail} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.thumbnails.thumbnail}
 */
proto.android_full_next.thumbnails.thumbnail.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.thumbnails.thumbnail.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.thumbnails.thumbnail.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.thumbnails.thumbnail} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.thumbnails.thumbnail.serializeBinaryToWriter = function(message, writer) {
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
proto.android_full_next.thumbnails.thumbnail.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.thumbnails.thumbnail} returns this
 */
proto.android_full_next.thumbnails.thumbnail.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 width = 2;
 * @return {number}
 */
proto.android_full_next.thumbnails.thumbnail.prototype.getWidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.thumbnails.thumbnail} returns this
 */
proto.android_full_next.thumbnails.thumbnail.prototype.setWidth = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 height = 3;
 * @return {number}
 */
proto.android_full_next.thumbnails.thumbnail.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.thumbnails.thumbnail} returns this
 */
proto.android_full_next.thumbnails.thumbnail.prototype.setHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * repeated thumbnail thumb = 1;
 * @return {!Array<!proto.android_full_next.thumbnails.thumbnail>}
 */
proto.android_full_next.thumbnails.prototype.getThumbList = function() {
  return /** @type{!Array<!proto.android_full_next.thumbnails.thumbnail>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.thumbnails.thumbnail, 1));
};


/**
 * @param {!Array<!proto.android_full_next.thumbnails.thumbnail>} value
 * @return {!proto.android_full_next.thumbnails} returns this
*/
proto.android_full_next.thumbnails.prototype.setThumbList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.thumbnails.thumbnail=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.thumbnails.thumbnail}
 */
proto.android_full_next.thumbnails.prototype.addThumb = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.thumbnails.thumbnail, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.thumbnails} returns this
 */
proto.android_full_next.thumbnails.prototype.clearThumbList = function() {
  return this.setThumbList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.nextRequest.repeatedFields_ = [52047593];



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
proto.android_full_next.nextRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.nextRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.nextRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.nextRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    int1: jspb.Message.getFieldWithDefault(msg, 1, 0),
    continuationList: jspb.Message.toObjectList(msg.getContinuationList(),
    proto.android_full_next.nextRequest.continuationData.toObject, includeInstance)
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
 * @return {!proto.android_full_next.nextRequest}
 */
proto.android_full_next.nextRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.nextRequest;
  return proto.android_full_next.nextRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.nextRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.nextRequest}
 */
proto.android_full_next.nextRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.android_full_next.nextRequest.continuationData;
      reader.readMessage(value,proto.android_full_next.nextRequest.continuationData.deserializeBinaryFromReader);
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
proto.android_full_next.nextRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.nextRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.nextRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.nextRequest.serializeBinaryToWriter = function(message, writer) {
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
      proto.android_full_next.nextRequest.continuationData.serializeBinaryToWriter
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
proto.android_full_next.nextRequest.continuationData.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.nextRequest.continuationData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.nextRequest.continuationData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.nextRequest.continuationData.toObject = function(includeInstance, msg) {
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
 * @return {!proto.android_full_next.nextRequest.continuationData}
 */
proto.android_full_next.nextRequest.continuationData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.nextRequest.continuationData;
  return proto.android_full_next.nextRequest.continuationData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.nextRequest.continuationData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.nextRequest.continuationData}
 */
proto.android_full_next.nextRequest.continuationData.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.nextRequest.continuationData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.nextRequest.continuationData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.nextRequest.continuationData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.nextRequest.continuationData.serializeBinaryToWriter = function(message, writer) {
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
proto.android_full_next.nextRequest.continuationData.prototype.getToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.nextRequest.continuationData} returns this
 */
proto.android_full_next.nextRequest.continuationData.prototype.setToken = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 int2 = 2;
 * @return {number}
 */
proto.android_full_next.nextRequest.continuationData.prototype.getInt2 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.nextRequest.continuationData} returns this
 */
proto.android_full_next.nextRequest.continuationData.prototype.setInt2 = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 int1 = 1;
 * @return {number}
 */
proto.android_full_next.nextRequest.prototype.getInt1 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.nextRequest} returns this
 */
proto.android_full_next.nextRequest.prototype.setInt1 = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated continuationData continuation = 52047593;
 * @return {!Array<!proto.android_full_next.nextRequest.continuationData>}
 */
proto.android_full_next.nextRequest.prototype.getContinuationList = function() {
  return /** @type{!Array<!proto.android_full_next.nextRequest.continuationData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.nextRequest.continuationData, 52047593));
};


/**
 * @param {!Array<!proto.android_full_next.nextRequest.continuationData>} value
 * @return {!proto.android_full_next.nextRequest} returns this
*/
proto.android_full_next.nextRequest.prototype.setContinuationList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 52047593, value);
};


/**
 * @param {!proto.android_full_next.nextRequest.continuationData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.nextRequest.continuationData}
 */
proto.android_full_next.nextRequest.prototype.addContinuation = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 52047593, opt_value, proto.android_full_next.nextRequest.continuationData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.nextRequest} returns this
 */
proto.android_full_next.nextRequest.prototype.clearContinuationList = function() {
  return this.setContinuationList([]);
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
proto.android_full_next.simpleText.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.simpleText.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.simpleText} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.simpleText.toObject = function(includeInstance, msg) {
  var f, obj = {
    text: jspb.Message.getFieldWithDefault(msg, 4, "")
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
 * @return {!proto.android_full_next.simpleText}
 */
proto.android_full_next.simpleText.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.simpleText;
  return proto.android_full_next.simpleText.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.simpleText} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.simpleText}
 */
proto.android_full_next.simpleText.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 4:
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
proto.android_full_next.simpleText.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.simpleText.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.simpleText} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.simpleText.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getText();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string text = 4;
 * @return {string}
 */
proto.android_full_next.simpleText.prototype.getText = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.simpleText} returns this
 */
proto.android_full_next.simpleText.prototype.setText = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.authorRendererData.repeatedFields_ = [1,2,4,5,6];



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
proto.android_full_next.authorRendererData.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.authorRendererData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.authorRendererData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.toObject = function(includeInstance, msg) {
  var f, obj = {
    avatarsList: jspb.Message.toObjectList(msg.getAvatarsList(),
    proto.android_full_next.thumbnails.toObject, includeInstance),
    nameList: jspb.Message.toObjectList(msg.getNameList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    navidataList: jspb.Message.toObjectList(msg.getNavidataList(),
    proto.android_full_next.authorRendererData.navigation.toObject, includeInstance),
    subscribecountList: jspb.Message.toObjectList(msg.getSubscribecountList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    subscribebuttonList: jspb.Message.toObjectList(msg.getSubscribebuttonList(),
    proto.android_full_next.authorRendererData.subscribeButtonData.toObject, includeInstance)
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
 * @return {!proto.android_full_next.authorRendererData}
 */
proto.android_full_next.authorRendererData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.authorRendererData;
  return proto.android_full_next.authorRendererData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.authorRendererData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.authorRendererData}
 */
proto.android_full_next.authorRendererData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.thumbnails;
      reader.readMessage(value,proto.android_full_next.thumbnails.deserializeBinaryFromReader);
      msg.addAvatars(value);
      break;
    case 2:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addName(value);
      break;
    case 4:
      var value = new proto.android_full_next.authorRendererData.navigation;
      reader.readMessage(value,proto.android_full_next.authorRendererData.navigation.deserializeBinaryFromReader);
      msg.addNavidata(value);
      break;
    case 5:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addSubscribecount(value);
      break;
    case 6:
      var value = new proto.android_full_next.authorRendererData.subscribeButtonData;
      reader.readMessage(value,proto.android_full_next.authorRendererData.subscribeButtonData.deserializeBinaryFromReader);
      msg.addSubscribebutton(value);
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
proto.android_full_next.authorRendererData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.authorRendererData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.authorRendererData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAvatarsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.thumbnails.serializeBinaryToWriter
    );
  }
  f = message.getNameList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getNavidataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.android_full_next.authorRendererData.navigation.serializeBinaryToWriter
    );
  }
  f = message.getSubscribecountList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getSubscribebuttonList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.android_full_next.authorRendererData.subscribeButtonData.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.authorRendererData.navigation.repeatedFields_ = [48687626];



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
proto.android_full_next.authorRendererData.navigation.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.authorRendererData.navigation.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.authorRendererData.navigation} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.navigation.toObject = function(includeInstance, msg) {
  var f, obj = {
    endpointdataList: jspb.Message.toObjectList(msg.getEndpointdataList(),
    proto.android_full_next.authorRendererData.navigation.endpoints.toObject, includeInstance)
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
 * @return {!proto.android_full_next.authorRendererData.navigation}
 */
proto.android_full_next.authorRendererData.navigation.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.authorRendererData.navigation;
  return proto.android_full_next.authorRendererData.navigation.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.authorRendererData.navigation} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.authorRendererData.navigation}
 */
proto.android_full_next.authorRendererData.navigation.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 48687626:
      var value = new proto.android_full_next.authorRendererData.navigation.endpoints;
      reader.readMessage(value,proto.android_full_next.authorRendererData.navigation.endpoints.deserializeBinaryFromReader);
      msg.addEndpointdata(value);
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
proto.android_full_next.authorRendererData.navigation.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.authorRendererData.navigation.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.authorRendererData.navigation} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.navigation.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEndpointdataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      48687626,
      f,
      proto.android_full_next.authorRendererData.navigation.endpoints.serializeBinaryToWriter
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
proto.android_full_next.authorRendererData.navigation.endpoints.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.authorRendererData.navigation.endpoints.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.authorRendererData.navigation.endpoints} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.navigation.endpoints.toObject = function(includeInstance, msg) {
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
 * @return {!proto.android_full_next.authorRendererData.navigation.endpoints}
 */
proto.android_full_next.authorRendererData.navigation.endpoints.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.authorRendererData.navigation.endpoints;
  return proto.android_full_next.authorRendererData.navigation.endpoints.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.authorRendererData.navigation.endpoints} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.authorRendererData.navigation.endpoints}
 */
proto.android_full_next.authorRendererData.navigation.endpoints.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.authorRendererData.navigation.endpoints.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.authorRendererData.navigation.endpoints.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.authorRendererData.navigation.endpoints} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.navigation.endpoints.serializeBinaryToWriter = function(message, writer) {
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
proto.android_full_next.authorRendererData.navigation.endpoints.prototype.getBrowseid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.authorRendererData.navigation.endpoints} returns this
 */
proto.android_full_next.authorRendererData.navigation.endpoints.prototype.setBrowseid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string canonicalBaseUrl = 4;
 * @return {string}
 */
proto.android_full_next.authorRendererData.navigation.endpoints.prototype.getCanonicalbaseurl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.authorRendererData.navigation.endpoints} returns this
 */
proto.android_full_next.authorRendererData.navigation.endpoints.prototype.setCanonicalbaseurl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated endpoints endpointData = 48687626;
 * @return {!Array<!proto.android_full_next.authorRendererData.navigation.endpoints>}
 */
proto.android_full_next.authorRendererData.navigation.prototype.getEndpointdataList = function() {
  return /** @type{!Array<!proto.android_full_next.authorRendererData.navigation.endpoints>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.authorRendererData.navigation.endpoints, 48687626));
};


/**
 * @param {!Array<!proto.android_full_next.authorRendererData.navigation.endpoints>} value
 * @return {!proto.android_full_next.authorRendererData.navigation} returns this
*/
proto.android_full_next.authorRendererData.navigation.prototype.setEndpointdataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 48687626, value);
};


/**
 * @param {!proto.android_full_next.authorRendererData.navigation.endpoints=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.authorRendererData.navigation.endpoints}
 */
proto.android_full_next.authorRendererData.navigation.prototype.addEndpointdata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 48687626, opt_value, proto.android_full_next.authorRendererData.navigation.endpoints, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData.navigation} returns this
 */
proto.android_full_next.authorRendererData.navigation.prototype.clearEndpointdataList = function() {
  return this.setEndpointdataList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.authorRendererData.subscribeButtonData.repeatedFields_ = [55419609];



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
proto.android_full_next.authorRendererData.subscribeButtonData.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.authorRendererData.subscribeButtonData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.subscribeButtonData.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.android_full_next.authorRendererData.subscribeButtonData.subContents.toObject, includeInstance)
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
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.authorRendererData.subscribeButtonData;
  return proto.android_full_next.authorRendererData.subscribeButtonData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 55419609:
      var value = new proto.android_full_next.authorRendererData.subscribeButtonData.subContents;
      reader.readMessage(value,proto.android_full_next.authorRendererData.subscribeButtonData.subContents.deserializeBinaryFromReader);
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
proto.android_full_next.authorRendererData.subscribeButtonData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.authorRendererData.subscribeButtonData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.subscribeButtonData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      55419609,
      f,
      proto.android_full_next.authorRendererData.subscribeButtonData.subContents.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.repeatedFields_ = [1,12,13,16,18];



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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.authorRendererData.subscribeButtonData.subContents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.toObject = function(includeInstance, msg) {
  var f, obj = {
    subscribebuttonList: jspb.Message.toObjectList(msg.getSubscribebuttonList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    int3: jspb.Message.getFieldWithDefault(msg, 3, 0),
    int4: jspb.Message.getFieldWithDefault(msg, 4, 0),
    int6: jspb.Message.getFieldWithDefault(msg, 6, 0),
    channelid: jspb.Message.getFieldWithDefault(msg, 7, ""),
    int8: jspb.Message.getFieldWithDefault(msg, 8, 0),
    subscribedlabelList: jspb.Message.toObjectList(msg.getSubscribedlabelList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    subscribelabelList: jspb.Message.toObjectList(msg.getSubscribelabelList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    unsubscribelabelList: jspb.Message.toObjectList(msg.getUnsubscribelabelList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    actionList: jspb.Message.toObjectList(msg.getActionList(),
    proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.toObject, includeInstance),
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
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.authorRendererData.subscribeButtonData.subContents;
  return proto.android_full_next.authorRendererData.subscribeButtonData.subContents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
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
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addSubscribedlabel(value);
      break;
    case 13:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addSubscribelabel(value);
      break;
    case 16:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addUnsubscribelabel(value);
      break;
    case 18:
      var value = new proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction;
      reader.readMessage(value,proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.deserializeBinaryFromReader);
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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.authorRendererData.subscribeButtonData.subContents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSubscribebuttonList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
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
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getSubscribelabelList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      13,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getUnsubscribelabelList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      16,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getActionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      18,
      f,
      proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.serializeBinaryToWriter
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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.repeatedFields_ = [68997349,68997401];



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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.toObject = function(includeInstance, msg) {
  var f, obj = {
    subscr1List: jspb.Message.toObjectList(msg.getSubscr1List(),
    proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.toObject, includeInstance),
    subscr2List: jspb.Message.toObjectList(msg.getSubscr2List(),
    proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.toObject, includeInstance)
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
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction;
  return proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 68997349:
      var value = new proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1;
      reader.readMessage(value,proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.deserializeBinaryFromReader);
      msg.addSubscr1(value);
      break;
    case 68997401:
      var value = new proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2;
      reader.readMessage(value,proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.deserializeBinaryFromReader);
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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSubscr1List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      68997349,
      f,
      proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.serializeBinaryToWriter
    );
  }
  f = message.getSubscr2List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      68997401,
      f,
      proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.serializeBinaryToWriter
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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.toObject = function(includeInstance, msg) {
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
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1;
  return proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.serializeBinaryToWriter = function(message, writer) {
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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string params = 3;
 * @return {string}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.prototype.getParams = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1.prototype.setParams = function(value) {
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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.toObject = function(includeInstance, msg) {
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
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2;
  return proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.serializeBinaryToWriter = function(message, writer) {
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
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string params = 4;
 * @return {string}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.prototype.getParams = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2.prototype.setParams = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated sub1 subscr1 = 68997349;
 * @return {!Array<!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1>}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.prototype.getSubscr1List = function() {
  return /** @type{!Array<!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1, 68997349));
};


/**
 * @param {!Array<!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1>} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction} returns this
*/
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.prototype.setSubscr1List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 68997349, value);
};


/**
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.prototype.addSubscr1 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 68997349, opt_value, proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub1, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.prototype.clearSubscr1List = function() {
  return this.setSubscr1List([]);
};


/**
 * repeated sub2 subscr2 = 68997401;
 * @return {!Array<!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2>}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.prototype.getSubscr2List = function() {
  return /** @type{!Array<!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2, 68997401));
};


/**
 * @param {!Array<!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2>} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction} returns this
*/
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.prototype.setSubscr2List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 68997401, value);
};


/**
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.prototype.addSubscr2 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 68997401, opt_value, proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.sub2, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction.prototype.clearSubscr2List = function() {
  return this.setSubscr2List([]);
};


/**
 * repeated textRuns subscribeButton = 1;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.getSubscribebuttonList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 1));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
*/
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.setSubscribebuttonList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.addSubscribebutton = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.clearSubscribebuttonList = function() {
  return this.setSubscribebuttonList([]);
};


/**
 * optional int32 int3 = 3;
 * @return {number}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.getInt3 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.setInt3 = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.clearInt3 = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.hasInt3 = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional int32 int4 = 4;
 * @return {number}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.getInt4 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.setInt4 = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.clearInt4 = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.hasInt4 = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional int32 int6 = 6;
 * @return {number}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.getInt6 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.setInt6 = function(value) {
  return jspb.Message.setField(this, 6, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.clearInt6 = function() {
  return jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.hasInt6 = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional string channelId = 7;
 * @return {string}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.getChannelid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.setChannelid = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional int32 int8 = 8;
 * @return {number}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.getInt8 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.setInt8 = function(value) {
  return jspb.Message.setField(this, 8, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.clearInt8 = function() {
  return jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.hasInt8 = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * repeated textRuns subscribedLabel = 12;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.getSubscribedlabelList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 12));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
*/
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.setSubscribedlabelList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 12, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.addSubscribedlabel = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 12, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.clearSubscribedlabelList = function() {
  return this.setSubscribedlabelList([]);
};


/**
 * repeated textRuns subscribeLabel = 13;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.getSubscribelabelList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 13));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
*/
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.setSubscribelabelList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 13, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.addSubscribelabel = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 13, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.clearSubscribelabelList = function() {
  return this.setSubscribelabelList([]);
};


/**
 * repeated textRuns unsubscribeLabel = 16;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.getUnsubscribelabelList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 16));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
*/
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.setUnsubscribelabelList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 16, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.addUnsubscribelabel = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 16, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.clearUnsubscribelabelList = function() {
  return this.setUnsubscribelabelList([]);
};


/**
 * repeated subAction action = 18;
 * @return {!Array<!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction>}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.getActionList = function() {
  return /** @type{!Array<!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction, 18));
};


/**
 * @param {!Array<!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction>} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
*/
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.setActionList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 18, value);
};


/**
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.addAction = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 18, opt_value, proto.android_full_next.authorRendererData.subscribeButtonData.subContents.subAction, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.clearActionList = function() {
  return this.setActionList([]);
};


/**
 * optional string identifier = 31;
 * @return {string}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.getIdentifier = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 31, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.subContents.prototype.setIdentifier = function(value) {
  return jspb.Message.setProto3StringField(this, 31, value);
};


/**
 * repeated subContents content = 55419609;
 * @return {!Array<!proto.android_full_next.authorRendererData.subscribeButtonData.subContents>}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.prototype.getContentList = function() {
  return /** @type{!Array<!proto.android_full_next.authorRendererData.subscribeButtonData.subContents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.authorRendererData.subscribeButtonData.subContents, 55419609));
};


/**
 * @param {!Array<!proto.android_full_next.authorRendererData.subscribeButtonData.subContents>} value
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData} returns this
*/
proto.android_full_next.authorRendererData.subscribeButtonData.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 55419609, value);
};


/**
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData.subContents}
 */
proto.android_full_next.authorRendererData.subscribeButtonData.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 55419609, opt_value, proto.android_full_next.authorRendererData.subscribeButtonData.subContents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData} returns this
 */
proto.android_full_next.authorRendererData.subscribeButtonData.prototype.clearContentList = function() {
  return this.setContentList([]);
};


/**
 * repeated thumbnails avatars = 1;
 * @return {!Array<!proto.android_full_next.thumbnails>}
 */
proto.android_full_next.authorRendererData.prototype.getAvatarsList = function() {
  return /** @type{!Array<!proto.android_full_next.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.thumbnails, 1));
};


/**
 * @param {!Array<!proto.android_full_next.thumbnails>} value
 * @return {!proto.android_full_next.authorRendererData} returns this
*/
proto.android_full_next.authorRendererData.prototype.setAvatarsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.thumbnails}
 */
proto.android_full_next.authorRendererData.prototype.addAvatars = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData} returns this
 */
proto.android_full_next.authorRendererData.prototype.clearAvatarsList = function() {
  return this.setAvatarsList([]);
};


/**
 * repeated textRuns name = 2;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.authorRendererData.prototype.getNameList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 2));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.authorRendererData} returns this
*/
proto.android_full_next.authorRendererData.prototype.setNameList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.authorRendererData.prototype.addName = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData} returns this
 */
proto.android_full_next.authorRendererData.prototype.clearNameList = function() {
  return this.setNameList([]);
};


/**
 * repeated navigation naviData = 4;
 * @return {!Array<!proto.android_full_next.authorRendererData.navigation>}
 */
proto.android_full_next.authorRendererData.prototype.getNavidataList = function() {
  return /** @type{!Array<!proto.android_full_next.authorRendererData.navigation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.authorRendererData.navigation, 4));
};


/**
 * @param {!Array<!proto.android_full_next.authorRendererData.navigation>} value
 * @return {!proto.android_full_next.authorRendererData} returns this
*/
proto.android_full_next.authorRendererData.prototype.setNavidataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.android_full_next.authorRendererData.navigation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.authorRendererData.navigation}
 */
proto.android_full_next.authorRendererData.prototype.addNavidata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.android_full_next.authorRendererData.navigation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData} returns this
 */
proto.android_full_next.authorRendererData.prototype.clearNavidataList = function() {
  return this.setNavidataList([]);
};


/**
 * repeated textRuns subscribeCount = 5;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.authorRendererData.prototype.getSubscribecountList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 5));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.authorRendererData} returns this
*/
proto.android_full_next.authorRendererData.prototype.setSubscribecountList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.authorRendererData.prototype.addSubscribecount = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData} returns this
 */
proto.android_full_next.authorRendererData.prototype.clearSubscribecountList = function() {
  return this.setSubscribecountList([]);
};


/**
 * repeated subscribeButtonData subscribeButton = 6;
 * @return {!Array<!proto.android_full_next.authorRendererData.subscribeButtonData>}
 */
proto.android_full_next.authorRendererData.prototype.getSubscribebuttonList = function() {
  return /** @type{!Array<!proto.android_full_next.authorRendererData.subscribeButtonData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.authorRendererData.subscribeButtonData, 6));
};


/**
 * @param {!Array<!proto.android_full_next.authorRendererData.subscribeButtonData>} value
 * @return {!proto.android_full_next.authorRendererData} returns this
*/
proto.android_full_next.authorRendererData.prototype.setSubscribebuttonList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.android_full_next.authorRendererData.subscribeButtonData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.authorRendererData.subscribeButtonData}
 */
proto.android_full_next.authorRendererData.prototype.addSubscribebutton = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.android_full_next.authorRendererData.subscribeButtonData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.authorRendererData} returns this
 */
proto.android_full_next.authorRendererData.prototype.clearSubscribebuttonList = function() {
  return this.setSubscribebuttonList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.videoMetadataRenderer.repeatedFields_ = [1,2,3,4,5,6,7,10,13,17,18,25,31,33,37];



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
proto.android_full_next.videoMetadataRenderer.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.toObject = function(includeInstance, msg) {
  var f, obj = {
    titleList: jspb.Message.toObjectList(msg.getTitleList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    viewcountList: jspb.Message.toObjectList(msg.getViewcountList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    liketext1List: jspb.Message.toObjectList(msg.getLiketext1List(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    disliketext1List: jspb.Message.toObjectList(msg.getDisliketext1List(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    descriptionList: jspb.Message.toObjectList(msg.getDescriptionList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    liketext2List: jspb.Message.toObjectList(msg.getLiketext2List(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    disliketext2List: jspb.Message.toObjectList(msg.getDisliketext2List(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    int8: jspb.Message.getFieldWithDefault(msg, 8, 0),
    int9: jspb.Message.getFieldWithDefault(msg, 9, 0),
    publishdateList: jspb.Message.toObjectList(msg.getPublishdateList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    likestatus: jspb.Message.getFieldWithDefault(msg, 11, 0),
    videoid: jspb.Message.getFieldWithDefault(msg, 12, ""),
    pb13List: jspb.Message.toObjectList(msg.getPb13List(),
    proto.android_full_next.videoMetadataRenderer.pbVarious13.toObject, includeInstance),
    string17List: jspb.Message.toObjectList(msg.getString17List(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    shortviewcountList: jspb.Message.toObjectList(msg.getShortviewcountList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    int24: jspb.Message.getFieldWithDefault(msg, 24, 0),
    pb25List: jspb.Message.toObjectList(msg.getPb25List(),
    proto.android_full_next.videoMetadataRenderer.pbVarious25.toObject, includeInstance),
    videoactionList: jspb.Message.toObjectList(msg.getVideoactionList(),
    proto.android_full_next.videoMetadataRenderer.videoActions.toObject, includeInstance),
    str33List: jspb.Message.toObjectList(msg.getStr33List(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    str37List: jspb.Message.toObjectList(msg.getStr37List(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    pb38: jspb.Message.getFieldWithDefault(msg, 38, 0),
    pb43: jspb.Message.getFieldWithDefault(msg, 43, 0)
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
 * @return {!proto.android_full_next.videoMetadataRenderer}
 */
proto.android_full_next.videoMetadataRenderer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer;
  return proto.android_full_next.videoMetadataRenderer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer}
 */
proto.android_full_next.videoMetadataRenderer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addTitle(value);
      break;
    case 2:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addViewcount(value);
      break;
    case 3:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addLiketext1(value);
      break;
    case 4:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addDisliketext1(value);
      break;
    case 5:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addDescription(value);
      break;
    case 6:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addLiketext2(value);
      break;
    case 7:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addDisliketext2(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt8(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt9(value);
      break;
    case 10:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addPublishdate(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setLikestatus(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setVideoid(value);
      break;
    case 13:
      var value = new proto.android_full_next.videoMetadataRenderer.pbVarious13;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.pbVarious13.deserializeBinaryFromReader);
      msg.addPb13(value);
      break;
    case 17:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addString17(value);
      break;
    case 18:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addShortviewcount(value);
      break;
    case 24:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt24(value);
      break;
    case 25:
      var value = new proto.android_full_next.videoMetadataRenderer.pbVarious25;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.pbVarious25.deserializeBinaryFromReader);
      msg.addPb25(value);
      break;
    case 31:
      var value = new proto.android_full_next.videoMetadataRenderer.videoActions;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.videoActions.deserializeBinaryFromReader);
      msg.addVideoaction(value);
      break;
    case 33:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addStr33(value);
      break;
    case 37:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addStr37(value);
      break;
    case 38:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPb38(value);
      break;
    case 43:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPb43(value);
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
proto.android_full_next.videoMetadataRenderer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTitleList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getViewcountList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getLiketext1List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getDisliketext1List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getDescriptionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getLiketext2List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getDisliketext2List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 8));
  if (f != null) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 9));
  if (f != null) {
    writer.writeInt32(
      9,
      f
    );
  }
  f = message.getPublishdateList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      10,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 11));
  if (f != null) {
    writer.writeInt32(
      11,
      f
    );
  }
  f = message.getVideoid();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getPb13List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      13,
      f,
      proto.android_full_next.videoMetadataRenderer.pbVarious13.serializeBinaryToWriter
    );
  }
  f = message.getString17List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      17,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getShortviewcountList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      18,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 24));
  if (f != null) {
    writer.writeInt32(
      24,
      f
    );
  }
  f = message.getPb25List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      25,
      f,
      proto.android_full_next.videoMetadataRenderer.pbVarious25.serializeBinaryToWriter
    );
  }
  f = message.getVideoactionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      31,
      f,
      proto.android_full_next.videoMetadataRenderer.videoActions.serializeBinaryToWriter
    );
  }
  f = message.getStr33List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      33,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getStr37List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      37,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 38));
  if (f != null) {
    writer.writeInt32(
      38,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 43));
  if (f != null) {
    writer.writeInt32(
      43,
      f
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.repeatedFields_ = [60091038];



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
proto.android_full_next.videoMetadataRenderer.pbVarious13.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.pbVarious13.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious13} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.toObject = function(includeInstance, msg) {
  var f, obj = {
    pbList: jspb.Message.toObjectList(msg.getPbList(),
    proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.toObject, includeInstance)
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
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer.pbVarious13;
  return proto.android_full_next.videoMetadataRenderer.pbVarious13.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious13} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 60091038:
      var value = new proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.deserializeBinaryFromReader);
      msg.addPb(value);
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
proto.android_full_next.videoMetadataRenderer.pbVarious13.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.pbVarious13.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious13} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPbList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      60091038,
      f,
      proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.repeatedFields_ = [1,4,5];



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
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.toObject = function(includeInstance, msg) {
  var f, obj = {
    videoidList: jspb.Message.toObjectList(msg.getVideoidList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    int2: jspb.Message.getFieldWithDefault(msg, 2, 0),
    int3: jspb.Message.getFieldWithDefault(msg, 3, 0),
    count1List: jspb.Message.toObjectList(msg.getCount1List(),
    proto.android_full_next.simpleText.toObject, includeInstance),
    count2List: jspb.Message.toObjectList(msg.getCount2List(),
    proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.toObject, includeInstance),
    int13: jspb.Message.getFieldWithDefault(msg, 13, 0),
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
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious;
  return proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addVideoid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt2(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt3(value);
      break;
    case 4:
      var value = new proto.android_full_next.simpleText;
      reader.readMessage(value,proto.android_full_next.simpleText.deserializeBinaryFromReader);
      msg.addCount1(value);
      break;
    case 5:
      var value = new proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.deserializeBinaryFromReader);
      msg.addCount2(value);
      break;
    case 13:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt13(value);
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
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVideoidList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getCount1List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.android_full_next.simpleText.serializeBinaryToWriter
    );
  }
  f = message.getCount2List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 13));
  if (f != null) {
    writer.writeInt32(
      13,
      f
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
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.repeatedFields_ = [1];



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
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.toObject = function(includeInstance, msg) {
  var f, obj = {
    countList: jspb.Message.toObjectList(msg.getCountList(),
    proto.android_full_next.textRuns.toObject, includeInstance)
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
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain;
  return proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addCount(value);
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
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCountList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
};


/**
 * repeated textRuns count = 1;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.prototype.getCountList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 1));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain} returns this
*/
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.prototype.setCountList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.prototype.addCount = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain.prototype.clearCountList = function() {
  return this.setCountList([]);
};


/**
 * repeated textRuns videoId = 1;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.getVideoidList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 1));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
*/
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.setVideoidList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.addVideoid = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.clearVideoidList = function() {
  return this.setVideoidList([]);
};


/**
 * optional int32 int2 = 2;
 * @return {number}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.getInt2 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.setInt2 = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.clearInt2 = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.hasInt2 = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional int32 int3 = 3;
 * @return {number}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.getInt3 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.setInt3 = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.clearInt3 = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.hasInt3 = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * repeated simpleText count1 = 4;
 * @return {!Array<!proto.android_full_next.simpleText>}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.getCount1List = function() {
  return /** @type{!Array<!proto.android_full_next.simpleText>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.simpleText, 4));
};


/**
 * @param {!Array<!proto.android_full_next.simpleText>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
*/
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.setCount1List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.android_full_next.simpleText=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.simpleText}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.addCount1 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.android_full_next.simpleText, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.clearCount1List = function() {
  return this.setCount1List([]);
};


/**
 * repeated contain count2 = 5;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain>}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.getCount2List = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain, 5));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
*/
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.setCount2List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.addCount2 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.contain, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.clearCount2List = function() {
  return this.setCount2List([]);
};


/**
 * optional int32 int13 = 13;
 * @return {number}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.getInt13 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.setInt13 = function(value) {
  return jspb.Message.setField(this, 13, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.clearInt13 = function() {
  return jspb.Message.setField(this, 13, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.hasInt13 = function() {
  return jspb.Message.getField(this, 13) != null;
};


/**
 * optional int32 int23 = 23;
 * @return {number}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.getInt23 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 23, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.setInt23 = function(value) {
  return jspb.Message.setField(this, 23, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.clearInt23 = function() {
  return jspb.Message.setField(this, 23, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious.prototype.hasInt23 = function() {
  return jspb.Message.getField(this, 23) != null;
};


/**
 * repeated pbVarious pb = 60091038;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious>}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.prototype.getPbList = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious, 60091038));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13} returns this
*/
proto.android_full_next.videoMetadataRenderer.pbVarious13.prototype.setPbList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 60091038, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.prototype.addPb = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 60091038, opt_value, proto.android_full_next.videoMetadataRenderer.pbVarious13.pbVarious, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious13.prototype.clearPbList = function() {
  return this.setPbList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.repeatedFields_ = [71271859];



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
proto.android_full_next.videoMetadataRenderer.pbVarious25.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.pbVarious25.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious25} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.toObject = function(includeInstance, msg) {
  var f, obj = {
    unkList: jspb.Message.toObjectList(msg.getUnkList(),
    proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.toObject, includeInstance)
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
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious25}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer.pbVarious25;
  return proto.android_full_next.videoMetadataRenderer.pbVarious25.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious25} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious25}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 71271859:
      var value = new proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.deserializeBinaryFromReader);
      msg.addUnk(value);
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
proto.android_full_next.videoMetadataRenderer.pbVarious25.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.pbVarious25.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious25} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUnkList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      71271859,
      f,
      proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.serializeBinaryToWriter
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
proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.toObject = function(includeInstance, msg) {
  var f, obj = {
    int1: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1;
  return proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
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
proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional int32 int1 = 2;
 * @return {number}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.prototype.getInt1 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.prototype.setInt1 = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.prototype.clearInt1 = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1.prototype.hasInt1 = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated unk1 unk = 71271859;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1>}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.prototype.getUnkList = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1, 71271859));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious25} returns this
*/
proto.android_full_next.videoMetadataRenderer.pbVarious25.prototype.setUnkList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 71271859, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1}
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.prototype.addUnk = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 71271859, opt_value, proto.android_full_next.videoMetadataRenderer.pbVarious25.unk1, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious25} returns this
 */
proto.android_full_next.videoMetadataRenderer.pbVarious25.prototype.clearUnkList = function() {
  return this.setUnkList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.videoMetadataRenderer.videoActions.repeatedFields_ = [65153809];



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
proto.android_full_next.videoMetadataRenderer.videoActions.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.videoActions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.toObject = function(includeInstance, msg) {
  var f, obj = {
    cList: jspb.Message.toObjectList(msg.getCList(),
    proto.android_full_next.videoMetadataRenderer.videoActions.container.toObject, includeInstance)
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
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer.videoActions;
  return proto.android_full_next.videoMetadataRenderer.videoActions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 65153809:
      var value = new proto.android_full_next.videoMetadataRenderer.videoActions.container;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.videoActions.container.deserializeBinaryFromReader);
      msg.addC(value);
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
proto.android_full_next.videoMetadataRenderer.videoActions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.videoActions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      65153809,
      f,
      proto.android_full_next.videoMetadataRenderer.videoActions.container.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.repeatedFields_ = [5,8,10,19];



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
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.toObject = function(includeInstance, msg) {
  var f, obj = {
    int3: jspb.Message.getFieldWithDefault(msg, 3, 0),
    actionnameList: jspb.Message.toObjectList(msg.getActionnameList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    proto8List: jspb.Message.toObjectList(msg.getProto8List(),
    proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.toObject, includeInstance),
    proto10List: jspb.Message.toObjectList(msg.getProto10List(),
    proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.toObject, includeInstance),
    proto19List: jspb.Message.toObjectList(msg.getProto19List(),
    proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.toObject, includeInstance)
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
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer.videoActions.container;
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInt3(value);
      break;
    case 5:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addActionname(value);
      break;
    case 8:
      var value = new proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.deserializeBinaryFromReader);
      msg.addProto8(value);
      break;
    case 10:
      var value = new proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.deserializeBinaryFromReader);
      msg.addProto10(value);
      break;
    case 19:
      var value = new proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.deserializeBinaryFromReader);
      msg.addProto19(value);
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.videoActions.container.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getActionnameList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getProto8List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.serializeBinaryToWriter
    );
  }
  f = message.getProto10List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      10,
      f,
      proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.serializeBinaryToWriter
    );
  }
  f = message.getProto19List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      19,
      f,
      proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.serializeBinaryToWriter
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.toObject = function(includeInstance, msg) {
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
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8;
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.serializeBinaryToWriter = function(message, writer) {
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.prototype.getInt1 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.prototype.setInt1 = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.prototype.clearInt1 = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8.prototype.hasInt1 = function() {
  return jspb.Message.getField(this, 1) != null;
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.toObject = function(includeInstance, msg) {
  var f, obj = {
    actionname: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10;
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setActionname(value);
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getActionname();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string actionName = 2;
 * @return {string}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.prototype.getActionname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10.prototype.setActionname = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.repeatedFields_ = [49706687];



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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.toObject = function(includeInstance, msg) {
  var f, obj = {
    targetentryList: jspb.Message.toObjectList(msg.getTargetentryList(),
    proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.toObject, includeInstance)
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
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19;
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 49706687:
      var value = new proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.deserializeBinaryFromReader);
      msg.addTargetentry(value);
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTargetentryList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      49706687,
      f,
      proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.repeatedFields_ = [2];



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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
    targetiList: jspb.Message.toObjectList(msg.getTargetiList(),
    proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.toObject, includeInstance)
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
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry;
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = new proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.deserializeBinaryFromReader);
      msg.addTargeti(value);
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTargetiList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.repeatedFields_ = [48687757];



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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    targetdList: jspb.Message.toObjectList(msg.getTargetdList(),
    proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.toObject, includeInstance)
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
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo;
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 48687757:
      var value = new proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.deserializeBinaryFromReader);
      msg.addTargetd(value);
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTargetdList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      48687757,
      f,
      proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.serializeBinaryToWriter
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.toObject = function(includeInstance, msg) {
  var f, obj = {
    videoid: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData;
  return proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVideoid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string videoId = 1;
 * @return {string}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.prototype.getVideoid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData.prototype.setVideoid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated targetData targetD = 48687757;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData>}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.prototype.getTargetdList = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData, 48687757));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo} returns this
*/
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.prototype.setTargetdList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 48687757, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.prototype.addTargetd = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 48687757, opt_value, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.targetData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo.prototype.clearTargetdList = function() {
  return this.setTargetdList([]);
};


/**
 * repeated targetInfo targetI = 2;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo>}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.prototype.getTargetiList = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo, 2));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry} returns this
*/
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.prototype.setTargetiList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.prototype.addTargeti = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.targetInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry.prototype.clearTargetiList = function() {
  return this.setTargetiList([]);
};


/**
 * repeated targetDataEntry targetEntry = 49706687;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry>}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.prototype.getTargetentryList = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry, 49706687));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19} returns this
*/
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.prototype.setTargetentryList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 49706687, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.prototype.addTargetentry = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 49706687, opt_value, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.targetDataEntry, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19.prototype.clearTargetentryList = function() {
  return this.setTargetentryList([]);
};


/**
 * optional int32 int3 = 3;
 * @return {number}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.getInt3 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.setInt3 = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.clearInt3 = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.hasInt3 = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * repeated textRuns actionName = 5;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.getActionnameList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 5));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container} returns this
*/
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.setActionnameList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.addActionname = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.clearActionnameList = function() {
  return this.setActionnameList([]);
};


/**
 * repeated pb8 proto8 = 8;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8>}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.getProto8List = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8, 8));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container} returns this
*/
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.setProto8List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.addProto8 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb8, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.clearProto8List = function() {
  return this.setProto8List([]);
};


/**
 * repeated pb10 proto10 = 10;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10>}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.getProto10List = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10, 10));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container} returns this
*/
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.setProto10List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 10, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.addProto10 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 10, opt_value, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb10, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.clearProto10List = function() {
  return this.setProto10List([]);
};


/**
 * repeated pb19 proto19 = 19;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19>}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.getProto19List = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19, 19));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container} returns this
*/
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.setProto19List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 19, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.addProto19 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 19, opt_value, proto.android_full_next.videoMetadataRenderer.videoActions.container.pb19, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.container.prototype.clearProto19List = function() {
  return this.setProto19List([]);
};


/**
 * repeated container c = 65153809;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container>}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.prototype.getCList = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer.videoActions.container, 65153809));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions.container>} value
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions} returns this
*/
proto.android_full_next.videoMetadataRenderer.videoActions.prototype.setCList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 65153809, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions.container=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions.container}
 */
proto.android_full_next.videoMetadataRenderer.videoActions.prototype.addC = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 65153809, opt_value, proto.android_full_next.videoMetadataRenderer.videoActions.container, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions} returns this
 */
proto.android_full_next.videoMetadataRenderer.videoActions.prototype.clearCList = function() {
  return this.setCList([]);
};


/**
 * repeated textRuns title = 1;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getTitleList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 1));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setTitleList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addTitle = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearTitleList = function() {
  return this.setTitleList([]);
};


/**
 * repeated textRuns viewCount = 2;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getViewcountList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 2));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setViewcountList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addViewcount = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearViewcountList = function() {
  return this.setViewcountList([]);
};


/**
 * repeated textRuns likeText1 = 3;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getLiketext1List = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 3));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setLiketext1List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addLiketext1 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearLiketext1List = function() {
  return this.setLiketext1List([]);
};


/**
 * repeated textRuns dislikeText1 = 4;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getDisliketext1List = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 4));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setDisliketext1List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addDisliketext1 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearDisliketext1List = function() {
  return this.setDisliketext1List([]);
};


/**
 * repeated textRuns description = 5;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getDescriptionList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 5));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setDescriptionList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addDescription = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearDescriptionList = function() {
  return this.setDescriptionList([]);
};


/**
 * repeated textRuns likeText2 = 6;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getLiketext2List = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 6));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setLiketext2List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addLiketext2 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearLiketext2List = function() {
  return this.setLiketext2List([]);
};


/**
 * repeated textRuns dislikeText2 = 7;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getDisliketext2List = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 7));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setDisliketext2List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addDisliketext2 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearDisliketext2List = function() {
  return this.setDisliketext2List([]);
};


/**
 * optional int32 int8 = 8;
 * @return {number}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getInt8 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.setInt8 = function(value) {
  return jspb.Message.setField(this, 8, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearInt8 = function() {
  return jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.videoMetadataRenderer.prototype.hasInt8 = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional int32 int9 = 9;
 * @return {number}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getInt9 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.setInt9 = function(value) {
  return jspb.Message.setField(this, 9, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearInt9 = function() {
  return jspb.Message.setField(this, 9, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.videoMetadataRenderer.prototype.hasInt9 = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * repeated textRuns publishDate = 10;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getPublishdateList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 10));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setPublishdateList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 10, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addPublishdate = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 10, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearPublishdateList = function() {
  return this.setPublishdateList([]);
};


/**
 * optional int32 likeStatus = 11;
 * @return {number}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getLikestatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.setLikestatus = function(value) {
  return jspb.Message.setField(this, 11, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearLikestatus = function() {
  return jspb.Message.setField(this, 11, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.videoMetadataRenderer.prototype.hasLikestatus = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional string videoId = 12;
 * @return {string}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getVideoid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.setVideoid = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};


/**
 * repeated pbVarious13 pb13 = 13;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious13>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getPb13List = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious13>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer.pbVarious13, 13));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious13>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setPb13List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 13, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious13=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious13}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addPb13 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 13, opt_value, proto.android_full_next.videoMetadataRenderer.pbVarious13, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearPb13List = function() {
  return this.setPb13List([]);
};


/**
 * repeated textRuns string17 = 17;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getString17List = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 17));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setString17List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 17, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addString17 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 17, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearString17List = function() {
  return this.setString17List([]);
};


/**
 * repeated textRuns shortViewCount = 18;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getShortviewcountList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 18));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setShortviewcountList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 18, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addShortviewcount = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 18, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearShortviewcountList = function() {
  return this.setShortviewcountList([]);
};


/**
 * optional int32 int24 = 24;
 * @return {number}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getInt24 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 24, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.setInt24 = function(value) {
  return jspb.Message.setField(this, 24, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearInt24 = function() {
  return jspb.Message.setField(this, 24, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.videoMetadataRenderer.prototype.hasInt24 = function() {
  return jspb.Message.getField(this, 24) != null;
};


/**
 * repeated pbVarious25 pb25 = 25;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious25>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getPb25List = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious25>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer.pbVarious25, 25));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer.pbVarious25>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setPb25List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 25, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer.pbVarious25=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer.pbVarious25}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addPb25 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 25, opt_value, proto.android_full_next.videoMetadataRenderer.pbVarious25, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearPb25List = function() {
  return this.setPb25List([]);
};


/**
 * repeated videoActions videoAction = 31;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getVideoactionList = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer.videoActions>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer.videoActions, 31));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer.videoActions>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setVideoactionList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 31, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer.videoActions=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer.videoActions}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addVideoaction = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 31, opt_value, proto.android_full_next.videoMetadataRenderer.videoActions, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearVideoactionList = function() {
  return this.setVideoactionList([]);
};


/**
 * repeated textRuns str33 = 33;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getStr33List = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 33));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setStr33List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 33, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addStr33 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 33, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearStr33List = function() {
  return this.setStr33List([]);
};


/**
 * repeated textRuns str37 = 37;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getStr37List = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 37));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
*/
proto.android_full_next.videoMetadataRenderer.prototype.setStr37List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 37, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.videoMetadataRenderer.prototype.addStr37 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 37, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearStr37List = function() {
  return this.setStr37List([]);
};


/**
 * optional int32 pb38 = 38;
 * @return {number}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getPb38 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 38, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.setPb38 = function(value) {
  return jspb.Message.setField(this, 38, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearPb38 = function() {
  return jspb.Message.setField(this, 38, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.videoMetadataRenderer.prototype.hasPb38 = function() {
  return jspb.Message.getField(this, 38) != null;
};


/**
 * optional int32 pb43 = 43;
 * @return {number}
 */
proto.android_full_next.videoMetadataRenderer.prototype.getPb43 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 43, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.setPb43 = function(value) {
  return jspb.Message.setField(this, 43, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.android_full_next.videoMetadataRenderer} returns this
 */
proto.android_full_next.videoMetadataRenderer.prototype.clearPb43 = function() {
  return jspb.Message.setField(this, 43, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.android_full_next.videoMetadataRenderer.prototype.hasPb43 = function() {
  return jspb.Message.getField(this, 43) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.compactVideoRenderer.repeatedFields_ = [2,3,4,5,6,7,8,10,14,23];



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
proto.android_full_next.compactVideoRenderer.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.toObject = function(includeInstance, msg) {
  var f, obj = {
    videoid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    thumblistList: jspb.Message.toObjectList(msg.getThumblistList(),
    proto.android_full_next.thumbnails.toObject, includeInstance),
    titledataList: jspb.Message.toObjectList(msg.getTitledataList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    authorList: jspb.Message.toObjectList(msg.getAuthorList(),
    proto.android_full_next.compactVideoRenderer.authorData.toObject, includeInstance),
    publishedtimetextList: jspb.Message.toObjectList(msg.getPublishedtimetextList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    viewcounttextList: jspb.Message.toObjectList(msg.getViewcounttextList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    lengthtextList: jspb.Message.toObjectList(msg.getLengthtextList(),
    proto.android_full_next.textRuns.toObject, includeInstance),
    navdataList: jspb.Message.toObjectList(msg.getNavdataList(),
    proto.android_full_next.compactVideoRenderer.navigationData.toObject, includeInstance),
    ladataList: jspb.Message.toObjectList(msg.getLadataList(),
    proto.android_full_next.compactVideoRenderer.longAuthorData.toObject, includeInstance),
    authoravatarList: jspb.Message.toObjectList(msg.getAuthoravatarList(),
    proto.android_full_next.compactVideoRenderer.authorAvatarType.toObject, includeInstance),
    shortviewcountsList: jspb.Message.toObjectList(msg.getShortviewcountsList(),
    proto.android_full_next.textRuns.toObject, includeInstance)
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
 * @return {!proto.android_full_next.compactVideoRenderer}
 */
proto.android_full_next.compactVideoRenderer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer;
  return proto.android_full_next.compactVideoRenderer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer}
 */
proto.android_full_next.compactVideoRenderer.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.android_full_next.thumbnails;
      reader.readMessage(value,proto.android_full_next.thumbnails.deserializeBinaryFromReader);
      msg.addThumblist(value);
      break;
    case 3:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addTitledata(value);
      break;
    case 4:
      var value = new proto.android_full_next.compactVideoRenderer.authorData;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.authorData.deserializeBinaryFromReader);
      msg.addAuthor(value);
      break;
    case 5:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addPublishedtimetext(value);
      break;
    case 6:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addViewcounttext(value);
      break;
    case 7:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
      msg.addLengthtext(value);
      break;
    case 8:
      var value = new proto.android_full_next.compactVideoRenderer.navigationData;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.navigationData.deserializeBinaryFromReader);
      msg.addNavdata(value);
      break;
    case 10:
      var value = new proto.android_full_next.compactVideoRenderer.longAuthorData;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.longAuthorData.deserializeBinaryFromReader);
      msg.addLadata(value);
      break;
    case 14:
      var value = new proto.android_full_next.compactVideoRenderer.authorAvatarType;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.authorAvatarType.deserializeBinaryFromReader);
      msg.addAuthoravatar(value);
      break;
    case 23:
      var value = new proto.android_full_next.textRuns;
      reader.readMessage(value,proto.android_full_next.textRuns.deserializeBinaryFromReader);
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
proto.android_full_next.compactVideoRenderer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.serializeBinaryToWriter = function(message, writer) {
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
      proto.android_full_next.thumbnails.serializeBinaryToWriter
    );
  }
  f = message.getTitledataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getAuthorList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.android_full_next.compactVideoRenderer.authorData.serializeBinaryToWriter
    );
  }
  f = message.getPublishedtimetextList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getViewcounttextList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getLengthtextList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
  f = message.getNavdataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.android_full_next.compactVideoRenderer.navigationData.serializeBinaryToWriter
    );
  }
  f = message.getLadataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      10,
      f,
      proto.android_full_next.compactVideoRenderer.longAuthorData.serializeBinaryToWriter
    );
  }
  f = message.getAuthoravatarList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      14,
      f,
      proto.android_full_next.compactVideoRenderer.authorAvatarType.serializeBinaryToWriter
    );
  }
  f = message.getShortviewcountsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      23,
      f,
      proto.android_full_next.textRuns.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.compactVideoRenderer.authorData.repeatedFields_ = [1];



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
proto.android_full_next.compactVideoRenderer.authorData.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.authorData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.authorData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.authorData.toObject = function(includeInstance, msg) {
  var f, obj = {
    acList: jspb.Message.toObjectList(msg.getAcList(),
    proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.toObject, includeInstance)
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
 * @return {!proto.android_full_next.compactVideoRenderer.authorData}
 */
proto.android_full_next.compactVideoRenderer.authorData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.authorData;
  return proto.android_full_next.compactVideoRenderer.authorData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.authorData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.authorData}
 */
proto.android_full_next.compactVideoRenderer.authorData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.compactVideoRenderer.authorData.authorDataContent;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.deserializeBinaryFromReader);
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
proto.android_full_next.compactVideoRenderer.authorData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.authorData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.authorData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.authorData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAcList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.repeatedFields_ = [5];



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
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.toObject = function(includeInstance, msg) {
  var f, obj = {
    authordisplayname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    navigationList: jspb.Message.toObjectList(msg.getNavigationList(),
    proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.toObject, includeInstance)
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
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent}
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.authorData.authorDataContent;
  return proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent}
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.deserializeBinaryFromReader);
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
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.serializeBinaryToWriter = function(message, writer) {
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
      proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.repeatedFields_ = [48687626];



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
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.toObject = function(includeInstance, msg) {
  var f, obj = {
    authorendpointList: jspb.Message.toObjectList(msg.getAuthorendpointList(),
    proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.toObject, includeInstance)
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
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData}
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData;
  return proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData}
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 48687626:
      var value = new proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.deserializeBinaryFromReader);
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
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAuthorendpointList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      48687626,
      f,
      proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.serializeBinaryToWriter
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
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.toObject = function(includeInstance, msg) {
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
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint}
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint;
  return proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint}
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.serializeBinaryToWriter = function(message, writer) {
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
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.prototype.getBrowseid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint} returns this
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.prototype.setBrowseid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string canonicalBaseUrl = 4;
 * @return {string}
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.prototype.getCanonicalbaseurl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint} returns this
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint.prototype.setCanonicalbaseurl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated navigationEndpoint authorEndpoint = 48687626;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint>}
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.prototype.getAuthorendpointList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint, 48687626));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint>} value
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData} returns this
*/
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.prototype.setAuthorendpointList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 48687626, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint}
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.prototype.addAuthorendpoint = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 48687626, opt_value, proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.navigationEndpoint, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData} returns this
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData.prototype.clearAuthorendpointList = function() {
  return this.setAuthorendpointList([]);
};


/**
 * optional string authorDisplayName = 1;
 * @return {string}
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.prototype.getAuthordisplayname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent} returns this
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.prototype.setAuthordisplayname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated authorNavigationData navigation = 5;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData>}
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.prototype.getNavigationList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData, 5));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData>} value
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent} returns this
*/
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.prototype.setNavigationList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData}
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.prototype.addNavigation = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.authorNavigationData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent} returns this
 */
proto.android_full_next.compactVideoRenderer.authorData.authorDataContent.prototype.clearNavigationList = function() {
  return this.setNavigationList([]);
};


/**
 * repeated authorDataContent ac = 1;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent>}
 */
proto.android_full_next.compactVideoRenderer.authorData.prototype.getAcList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.authorData.authorDataContent, 1));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent>} value
 * @return {!proto.android_full_next.compactVideoRenderer.authorData} returns this
*/
proto.android_full_next.compactVideoRenderer.authorData.prototype.setAcList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.authorData.authorDataContent}
 */
proto.android_full_next.compactVideoRenderer.authorData.prototype.addAc = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.compactVideoRenderer.authorData.authorDataContent, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer.authorData} returns this
 */
proto.android_full_next.compactVideoRenderer.authorData.prototype.clearAcList = function() {
  return this.setAcList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.compactVideoRenderer.navigationData.repeatedFields_ = [1,48687757];



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
proto.android_full_next.compactVideoRenderer.navigationData.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.navigationData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.navigationData.toObject = function(includeInstance, msg) {
  var f, obj = {
    navList: jspb.Message.toObjectList(msg.getNavList(),
    proto.android_full_next.compactVideoRenderer.navigationData.navType.toObject, includeInstance),
    navpropertiesList: jspb.Message.toObjectList(msg.getNavpropertiesList(),
    proto.android_full_next.compactVideoRenderer.navigationData.navData.toObject, includeInstance)
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
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData}
 */
proto.android_full_next.compactVideoRenderer.navigationData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.navigationData;
  return proto.android_full_next.compactVideoRenderer.navigationData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData}
 */
proto.android_full_next.compactVideoRenderer.navigationData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.compactVideoRenderer.navigationData.navType;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.navigationData.navType.deserializeBinaryFromReader);
      msg.addNav(value);
      break;
    case 48687757:
      var value = new proto.android_full_next.compactVideoRenderer.navigationData.navData;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.navigationData.navData.deserializeBinaryFromReader);
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
proto.android_full_next.compactVideoRenderer.navigationData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.navigationData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.navigationData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNavList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.compactVideoRenderer.navigationData.navType.serializeBinaryToWriter
    );
  }
  f = message.getNavpropertiesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      48687757,
      f,
      proto.android_full_next.compactVideoRenderer.navigationData.navData.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.repeatedFields_ = [19];



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
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.navigationData.navType.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData.navType} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.toObject = function(includeInstance, msg) {
  var f, obj = {
    i1: jspb.Message.getFieldWithDefault(msg, 1, 0),
    i2: jspb.Message.getFieldWithDefault(msg, 2, 0),
    i3: jspb.Message.getFieldWithDefault(msg, 3, 0),
    source: jspb.Message.getFieldWithDefault(msg, 11, ""),
    navextraList: jspb.Message.toObjectList(msg.getNavextraList(),
    proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.toObject, includeInstance)
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
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType}
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.navigationData.navType;
  return proto.android_full_next.compactVideoRenderer.navigationData.navType.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData.navType} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType}
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.deserializeBinaryFromReader);
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
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.navigationData.navType.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData.navType} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.serializeBinaryToWriter = function(message, writer) {
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
      proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.serializeBinaryToWriter
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
proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.toObject = function(includeInstance, msg) {
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
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType}
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType;
  return proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType}
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.serializeBinaryToWriter = function(message, writer) {
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
proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.prototype.getI2 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType} returns this
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.prototype.setI2 = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 i3 = 3;
 * @return {number}
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.prototype.getI3 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType} returns this
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType.prototype.setI3 = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 i1 = 1;
 * @return {number}
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.getI1 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType} returns this
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.setI1 = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 i2 = 2;
 * @return {number}
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.getI2 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType} returns this
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.setI2 = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 i3 = 3;
 * @return {number}
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.getI3 = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType} returns this
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.setI3 = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional string source = 11;
 * @return {string}
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.getSource = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType} returns this
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.setSource = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};


/**
 * repeated navExtraType navExtra = 19;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType>}
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.getNavextraList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType, 19));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType>} value
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType} returns this
*/
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.setNavextraList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 19, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType}
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.addNavextra = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 19, opt_value, proto.android_full_next.compactVideoRenderer.navigationData.navType.navExtraType, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType} returns this
 */
proto.android_full_next.compactVideoRenderer.navigationData.navType.prototype.clearNavextraList = function() {
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
proto.android_full_next.compactVideoRenderer.navigationData.navData.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.navigationData.navData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData.navData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.navigationData.navData.toObject = function(includeInstance, msg) {
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
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navData}
 */
proto.android_full_next.compactVideoRenderer.navigationData.navData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.navigationData.navData;
  return proto.android_full_next.compactVideoRenderer.navigationData.navData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData.navData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navData}
 */
proto.android_full_next.compactVideoRenderer.navigationData.navData.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.compactVideoRenderer.navigationData.navData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.navigationData.navData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData.navData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.navigationData.navData.serializeBinaryToWriter = function(message, writer) {
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
proto.android_full_next.compactVideoRenderer.navigationData.navData.prototype.getNavid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navData} returns this
 */
proto.android_full_next.compactVideoRenderer.navigationData.navData.prototype.setNavid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated navType nav = 1;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.navigationData.navType>}
 */
proto.android_full_next.compactVideoRenderer.navigationData.prototype.getNavList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.navigationData.navType>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.navigationData.navType, 1));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.navigationData.navType>} value
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData} returns this
*/
proto.android_full_next.compactVideoRenderer.navigationData.prototype.setNavList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData.navType=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navType}
 */
proto.android_full_next.compactVideoRenderer.navigationData.prototype.addNav = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.compactVideoRenderer.navigationData.navType, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData} returns this
 */
proto.android_full_next.compactVideoRenderer.navigationData.prototype.clearNavList = function() {
  return this.setNavList([]);
};


/**
 * repeated navData navProperties = 48687757;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.navigationData.navData>}
 */
proto.android_full_next.compactVideoRenderer.navigationData.prototype.getNavpropertiesList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.navigationData.navData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.navigationData.navData, 48687757));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.navigationData.navData>} value
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData} returns this
*/
proto.android_full_next.compactVideoRenderer.navigationData.prototype.setNavpropertiesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 48687757, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData.navData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData.navData}
 */
proto.android_full_next.compactVideoRenderer.navigationData.prototype.addNavproperties = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 48687757, opt_value, proto.android_full_next.compactVideoRenderer.navigationData.navData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData} returns this
 */
proto.android_full_next.compactVideoRenderer.navigationData.prototype.clearNavpropertiesList = function() {
  return this.setNavpropertiesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.repeatedFields_ = [1];



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
proto.android_full_next.compactVideoRenderer.longAuthorData.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.longAuthorData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.toObject = function(includeInstance, msg) {
  var f, obj = {
    ladatacontentList: jspb.Message.toObjectList(msg.getLadatacontentList(),
    proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.toObject, includeInstance)
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
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.longAuthorData;
  return proto.android_full_next.compactVideoRenderer.longAuthorData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.deserializeBinaryFromReader);
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
proto.android_full_next.compactVideoRenderer.longAuthorData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.longAuthorData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLadatacontentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.repeatedFields_ = [5];



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
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.toObject = function(includeInstance, msg) {
  var f, obj = {
    displayname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    lanaviList: jspb.Message.toObjectList(msg.getLanaviList(),
    proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.toObject, includeInstance)
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
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer;
  return proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.deserializeBinaryFromReader);
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
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.serializeBinaryToWriter = function(message, writer) {
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
      proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.repeatedFields_ = [48687626];



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
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.toObject = function(includeInstance, msg) {
  var f, obj = {
    lanaviendpointList: jspb.Message.toObjectList(msg.getLanaviendpointList(),
    proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.toObject, includeInstance)
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
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation;
  return proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 48687626:
      var value = new proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.deserializeBinaryFromReader);
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
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLanaviendpointList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      48687626,
      f,
      proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.serializeBinaryToWriter
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
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.toObject = function(includeInstance, msg) {
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
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint;
  return proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.serializeBinaryToWriter = function(message, writer) {
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
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.prototype.getBrowseid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint} returns this
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.prototype.setBrowseid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string canonicalBaseUrl = 4;
 * @return {string}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.prototype.getCanonicalbaseurl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint} returns this
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint.prototype.setCanonicalbaseurl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated navigationEndpoint laNaviEndpoint = 48687626;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint>}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.prototype.getLanaviendpointList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint, 48687626));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint>} value
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation} returns this
*/
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.prototype.setLanaviendpointList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 48687626, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.prototype.addLanaviendpoint = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 48687626, opt_value, proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.navigationEndpoint, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation} returns this
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation.prototype.clearLanaviendpointList = function() {
  return this.setLanaviendpointList([]);
};


/**
 * optional string displayName = 1;
 * @return {string}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.prototype.getDisplayname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer} returns this
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.prototype.setDisplayname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated navigation laNavi = 5;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation>}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.prototype.getLanaviList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation, 5));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation>} value
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer} returns this
*/
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.prototype.setLanaviList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.prototype.addLanavi = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.navigation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer} returns this
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer.prototype.clearLanaviList = function() {
  return this.setLanaviList([]);
};


/**
 * repeated laDataContainer laDataContent = 1;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer>}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.prototype.getLadatacontentList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer, 1));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer>} value
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData} returns this
*/
proto.android_full_next.compactVideoRenderer.longAuthorData.prototype.setLadatacontentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer}
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.prototype.addLadatacontent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.compactVideoRenderer.longAuthorData.laDataContainer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData} returns this
 */
proto.android_full_next.compactVideoRenderer.longAuthorData.prototype.clearLadatacontentList = function() {
  return this.setLadatacontentList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.repeatedFields_ = [1];



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
proto.android_full_next.compactVideoRenderer.authorAvatarType.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.authorAvatarType.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.authorAvatarType} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.toObject = function(includeInstance, msg) {
  var f, obj = {
    aadataList: jspb.Message.toObjectList(msg.getAadataList(),
    proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.toObject, includeInstance)
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
 * @return {!proto.android_full_next.compactVideoRenderer.authorAvatarType}
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.authorAvatarType;
  return proto.android_full_next.compactVideoRenderer.authorAvatarType.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.authorAvatarType} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.authorAvatarType}
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.deserializeBinaryFromReader);
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
proto.android_full_next.compactVideoRenderer.authorAvatarType.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.authorAvatarType.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.authorAvatarType} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAadataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.serializeBinaryToWriter
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
proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.toObject = function(includeInstance, msg) {
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
 * @return {!proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain}
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain;
  return proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain}
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.serializeBinaryToWriter = function(message, writer) {
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
proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain} returns this
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.prototype.setUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 width = 2;
 * @return {number}
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.prototype.getWidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain} returns this
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.prototype.setWidth = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 height = 3;
 * @return {number}
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain} returns this
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain.prototype.setHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * repeated aaContain aaData = 1;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain>}
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.prototype.getAadataList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain, 1));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain>} value
 * @return {!proto.android_full_next.compactVideoRenderer.authorAvatarType} returns this
*/
proto.android_full_next.compactVideoRenderer.authorAvatarType.prototype.setAadataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain}
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.prototype.addAadata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.compactVideoRenderer.authorAvatarType.aaContain, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer.authorAvatarType} returns this
 */
proto.android_full_next.compactVideoRenderer.authorAvatarType.prototype.clearAadataList = function() {
  return this.setAadataList([]);
};


/**
 * optional string videoId = 1;
 * @return {string}
 */
proto.android_full_next.compactVideoRenderer.prototype.getVideoid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
 */
proto.android_full_next.compactVideoRenderer.prototype.setVideoid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated thumbnails thumblist = 2;
 * @return {!Array<!proto.android_full_next.thumbnails>}
 */
proto.android_full_next.compactVideoRenderer.prototype.getThumblistList = function() {
  return /** @type{!Array<!proto.android_full_next.thumbnails>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.thumbnails, 2));
};


/**
 * @param {!Array<!proto.android_full_next.thumbnails>} value
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
*/
proto.android_full_next.compactVideoRenderer.prototype.setThumblistList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.android_full_next.thumbnails=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.thumbnails}
 */
proto.android_full_next.compactVideoRenderer.prototype.addThumblist = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.android_full_next.thumbnails, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
 */
proto.android_full_next.compactVideoRenderer.prototype.clearThumblistList = function() {
  return this.setThumblistList([]);
};


/**
 * repeated textRuns titleData = 3;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.compactVideoRenderer.prototype.getTitledataList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 3));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
*/
proto.android_full_next.compactVideoRenderer.prototype.setTitledataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.compactVideoRenderer.prototype.addTitledata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
 */
proto.android_full_next.compactVideoRenderer.prototype.clearTitledataList = function() {
  return this.setTitledataList([]);
};


/**
 * repeated authorData author = 4;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.authorData>}
 */
proto.android_full_next.compactVideoRenderer.prototype.getAuthorList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.authorData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.authorData, 4));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.authorData>} value
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
*/
proto.android_full_next.compactVideoRenderer.prototype.setAuthorList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.authorData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.authorData}
 */
proto.android_full_next.compactVideoRenderer.prototype.addAuthor = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.android_full_next.compactVideoRenderer.authorData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
 */
proto.android_full_next.compactVideoRenderer.prototype.clearAuthorList = function() {
  return this.setAuthorList([]);
};


/**
 * repeated textRuns publishedTimeText = 5;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.compactVideoRenderer.prototype.getPublishedtimetextList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 5));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
*/
proto.android_full_next.compactVideoRenderer.prototype.setPublishedtimetextList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.compactVideoRenderer.prototype.addPublishedtimetext = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
 */
proto.android_full_next.compactVideoRenderer.prototype.clearPublishedtimetextList = function() {
  return this.setPublishedtimetextList([]);
};


/**
 * repeated textRuns viewCountText = 6;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.compactVideoRenderer.prototype.getViewcounttextList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 6));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
*/
proto.android_full_next.compactVideoRenderer.prototype.setViewcounttextList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.compactVideoRenderer.prototype.addViewcounttext = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
 */
proto.android_full_next.compactVideoRenderer.prototype.clearViewcounttextList = function() {
  return this.setViewcounttextList([]);
};


/**
 * repeated textRuns lengthText = 7;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.compactVideoRenderer.prototype.getLengthtextList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 7));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
*/
proto.android_full_next.compactVideoRenderer.prototype.setLengthtextList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.compactVideoRenderer.prototype.addLengthtext = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
 */
proto.android_full_next.compactVideoRenderer.prototype.clearLengthtextList = function() {
  return this.setLengthtextList([]);
};


/**
 * repeated navigationData navData = 8;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.navigationData>}
 */
proto.android_full_next.compactVideoRenderer.prototype.getNavdataList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.navigationData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.navigationData, 8));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.navigationData>} value
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
*/
proto.android_full_next.compactVideoRenderer.prototype.setNavdataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.navigationData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.navigationData}
 */
proto.android_full_next.compactVideoRenderer.prototype.addNavdata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.android_full_next.compactVideoRenderer.navigationData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
 */
proto.android_full_next.compactVideoRenderer.prototype.clearNavdataList = function() {
  return this.setNavdataList([]);
};


/**
 * repeated longAuthorData laData = 10;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.longAuthorData>}
 */
proto.android_full_next.compactVideoRenderer.prototype.getLadataList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.longAuthorData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.longAuthorData, 10));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.longAuthorData>} value
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
*/
proto.android_full_next.compactVideoRenderer.prototype.setLadataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 10, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.longAuthorData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.longAuthorData}
 */
proto.android_full_next.compactVideoRenderer.prototype.addLadata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 10, opt_value, proto.android_full_next.compactVideoRenderer.longAuthorData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
 */
proto.android_full_next.compactVideoRenderer.prototype.clearLadataList = function() {
  return this.setLadataList([]);
};


/**
 * repeated authorAvatarType authorAvatar = 14;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer.authorAvatarType>}
 */
proto.android_full_next.compactVideoRenderer.prototype.getAuthoravatarList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer.authorAvatarType>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer.authorAvatarType, 14));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer.authorAvatarType>} value
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
*/
proto.android_full_next.compactVideoRenderer.prototype.setAuthoravatarList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 14, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer.authorAvatarType=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer.authorAvatarType}
 */
proto.android_full_next.compactVideoRenderer.prototype.addAuthoravatar = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 14, opt_value, proto.android_full_next.compactVideoRenderer.authorAvatarType, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
 */
proto.android_full_next.compactVideoRenderer.prototype.clearAuthoravatarList = function() {
  return this.setAuthoravatarList([]);
};


/**
 * repeated textRuns shortViewCounts = 23;
 * @return {!Array<!proto.android_full_next.textRuns>}
 */
proto.android_full_next.compactVideoRenderer.prototype.getShortviewcountsList = function() {
  return /** @type{!Array<!proto.android_full_next.textRuns>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.textRuns, 23));
};


/**
 * @param {!Array<!proto.android_full_next.textRuns>} value
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
*/
proto.android_full_next.compactVideoRenderer.prototype.setShortviewcountsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 23, value);
};


/**
 * @param {!proto.android_full_next.textRuns=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.textRuns}
 */
proto.android_full_next.compactVideoRenderer.prototype.addShortviewcounts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 23, opt_value, proto.android_full_next.textRuns, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.compactVideoRenderer} returns this
 */
proto.android_full_next.compactVideoRenderer.prototype.clearShortviewcountsList = function() {
  return this.setShortviewcountsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.root.repeatedFields_ = [7,9,14];



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
proto.android_full_next.root.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.root.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.root} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.android_full_next.root.contents.toObject, includeInstance),
    pbextraList: jspb.Message.toObjectList(msg.getPbextraList(),
    proto.android_full_next.root.bData.toObject, includeInstance),
    pbextra14List: jspb.Message.toObjectList(msg.getPbextra14List(),
    proto.android_full_next.root.fData.toObject, includeInstance)
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
 * @return {!proto.android_full_next.root}
 */
proto.android_full_next.root.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.root;
  return proto.android_full_next.root.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.root} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.root}
 */
proto.android_full_next.root.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 7:
      var value = new proto.android_full_next.root.contents;
      reader.readMessage(value,proto.android_full_next.root.contents.deserializeBinaryFromReader);
      msg.addContent(value);
      break;
    case 9:
      var value = new proto.android_full_next.root.bData;
      reader.readMessage(value,proto.android_full_next.root.bData.deserializeBinaryFromReader);
      msg.addPbextra(value);
      break;
    case 14:
      var value = new proto.android_full_next.root.fData;
      reader.readMessage(value,proto.android_full_next.root.fData.deserializeBinaryFromReader);
      msg.addPbextra14(value);
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
proto.android_full_next.root.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.root.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.root} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.android_full_next.root.contents.serializeBinaryToWriter
    );
  }
  f = message.getPbextraList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      9,
      f,
      proto.android_full_next.root.bData.serializeBinaryToWriter
    );
  }
  f = message.getPbextra14List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      14,
      f,
      proto.android_full_next.root.fData.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.root.contents.repeatedFields_ = [51779735];



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
proto.android_full_next.root.contents.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.root.contents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.root.contents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.toObject = function(includeInstance, msg) {
  var f, obj = {
    nextresultsList: jspb.Message.toObjectList(msg.getNextresultsList(),
    proto.android_full_next.root.contents.singleColumnWatchNextResults.toObject, includeInstance)
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
 * @return {!proto.android_full_next.root.contents}
 */
proto.android_full_next.root.contents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.root.contents;
  return proto.android_full_next.root.contents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.root.contents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.root.contents}
 */
proto.android_full_next.root.contents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 51779735:
      var value = new proto.android_full_next.root.contents.singleColumnWatchNextResults;
      reader.readMessage(value,proto.android_full_next.root.contents.singleColumnWatchNextResults.deserializeBinaryFromReader);
      msg.addNextresults(value);
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
proto.android_full_next.root.contents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.root.contents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.root.contents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNextresultsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      51779735,
      f,
      proto.android_full_next.root.contents.singleColumnWatchNextResults.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.repeatedFields_ = [1];



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
proto.android_full_next.root.contents.singleColumnWatchNextResults.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.root.contents.singleColumnWatchNextResults.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.toObject, includeInstance)
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
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.root.contents.singleColumnWatchNextResults;
  return proto.android_full_next.root.contents.singleColumnWatchNextResults.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.root.contents.singleColumnWatchNextResults.contents;
      reader.readMessage(value,proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.deserializeBinaryFromReader);
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
proto.android_full_next.root.contents.singleColumnWatchNextResults.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.root.contents.singleColumnWatchNextResults.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.repeatedFields_ = [49399797];



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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.toObject = function(includeInstance, msg) {
  var f, obj = {
    resultList: jspb.Message.toObjectList(msg.getResultList(),
    proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.toObject, includeInstance)
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
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.root.contents.singleColumnWatchNextResults.contents;
  return proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 49399797:
      var value = new proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results;
      reader.readMessage(value,proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.deserializeBinaryFromReader);
      msg.addResult(value);
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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResultList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      49399797,
      f,
      proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.repeatedFields_ = [1];



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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.toObject, includeInstance)
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
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results;
  return proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents;
      reader.readMessage(value,proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.deserializeBinaryFromReader);
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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.repeatedFields_ = [50195462];



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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.toObject = function(includeInstance, msg) {
  var f, obj = {
    itemsectionrenderList: jspb.Message.toObjectList(msg.getItemsectionrenderList(),
    proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.toObject, includeInstance)
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
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents;
  return proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 50195462:
      var value = new proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer;
      reader.readMessage(value,proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.deserializeBinaryFromReader);
      msg.addItemsectionrender(value);
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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getItemsectionrenderList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      50195462,
      f,
      proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.repeatedFields_ = [1,2];



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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.toObject = function(includeInstance, msg) {
  var f, obj = {
    contentList: jspb.Message.toObjectList(msg.getContentList(),
    proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.toObject, includeInstance),
    commentrequestList: jspb.Message.toObjectList(msg.getCommentrequestList(),
    proto.android_full_next.nextRequest.toObject, includeInstance),
    identifier: jspb.Message.getFieldWithDefault(msg, 7, "")
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
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer;
  return proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents;
      reader.readMessage(value,proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.deserializeBinaryFromReader);
      msg.addContent(value);
      break;
    case 2:
      var value = new proto.android_full_next.nextRequest;
      reader.readMessage(value,proto.android_full_next.nextRequest.deserializeBinaryFromReader);
      msg.addCommentrequest(value);
      break;
    case 7:
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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.serializeBinaryToWriter
    );
  }
  f = message.getCommentrequestList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.android_full_next.nextRequest.serializeBinaryToWriter
    );
  }
  f = message.getIdentifier();
  if (f.length > 0) {
    writer.writeString(
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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.repeatedFields_ = [51779720,51779708,50630979];



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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.toObject = function(includeInstance, msg) {
  var f, obj = {
    videometadataList: jspb.Message.toObjectList(msg.getVideometadataList(),
    proto.android_full_next.videoMetadataRenderer.toObject, includeInstance),
    authordataList: jspb.Message.toObjectList(msg.getAuthordataList(),
    proto.android_full_next.authorRendererData.toObject, includeInstance),
    nextvideoList: jspb.Message.toObjectList(msg.getNextvideoList(),
    proto.android_full_next.compactVideoRenderer.toObject, includeInstance)
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
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents;
  return proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 51779720:
      var value = new proto.android_full_next.videoMetadataRenderer;
      reader.readMessage(value,proto.android_full_next.videoMetadataRenderer.deserializeBinaryFromReader);
      msg.addVideometadata(value);
      break;
    case 51779708:
      var value = new proto.android_full_next.authorRendererData;
      reader.readMessage(value,proto.android_full_next.authorRendererData.deserializeBinaryFromReader);
      msg.addAuthordata(value);
      break;
    case 50630979:
      var value = new proto.android_full_next.compactVideoRenderer;
      reader.readMessage(value,proto.android_full_next.compactVideoRenderer.deserializeBinaryFromReader);
      msg.addNextvideo(value);
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
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVideometadataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      51779720,
      f,
      proto.android_full_next.videoMetadataRenderer.serializeBinaryToWriter
    );
  }
  f = message.getAuthordataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      51779708,
      f,
      proto.android_full_next.authorRendererData.serializeBinaryToWriter
    );
  }
  f = message.getNextvideoList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      50630979,
      f,
      proto.android_full_next.compactVideoRenderer.serializeBinaryToWriter
    );
  }
};


/**
 * repeated videoMetadataRenderer videoMetadata = 51779720;
 * @return {!Array<!proto.android_full_next.videoMetadataRenderer>}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.getVideometadataList = function() {
  return /** @type{!Array<!proto.android_full_next.videoMetadataRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.videoMetadataRenderer, 51779720));
};


/**
 * @param {!Array<!proto.android_full_next.videoMetadataRenderer>} value
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents} returns this
*/
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.setVideometadataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 51779720, value);
};


/**
 * @param {!proto.android_full_next.videoMetadataRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.videoMetadataRenderer}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.addVideometadata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 51779720, opt_value, proto.android_full_next.videoMetadataRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents} returns this
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.clearVideometadataList = function() {
  return this.setVideometadataList([]);
};


/**
 * repeated authorRendererData authorData = 51779708;
 * @return {!Array<!proto.android_full_next.authorRendererData>}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.getAuthordataList = function() {
  return /** @type{!Array<!proto.android_full_next.authorRendererData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.authorRendererData, 51779708));
};


/**
 * @param {!Array<!proto.android_full_next.authorRendererData>} value
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents} returns this
*/
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.setAuthordataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 51779708, value);
};


/**
 * @param {!proto.android_full_next.authorRendererData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.authorRendererData}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.addAuthordata = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 51779708, opt_value, proto.android_full_next.authorRendererData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents} returns this
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.clearAuthordataList = function() {
  return this.setAuthordataList([]);
};


/**
 * repeated compactVideoRenderer nextVideo = 50630979;
 * @return {!Array<!proto.android_full_next.compactVideoRenderer>}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.getNextvideoList = function() {
  return /** @type{!Array<!proto.android_full_next.compactVideoRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.compactVideoRenderer, 50630979));
};


/**
 * @param {!Array<!proto.android_full_next.compactVideoRenderer>} value
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents} returns this
*/
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.setNextvideoList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 50630979, value);
};


/**
 * @param {!proto.android_full_next.compactVideoRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.compactVideoRenderer}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.addNextvideo = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 50630979, opt_value, proto.android_full_next.compactVideoRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents} returns this
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents.prototype.clearNextvideoList = function() {
  return this.setNextvideoList([]);
};


/**
 * repeated contents content = 1;
 * @return {!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents>}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.prototype.getContentList = function() {
  return /** @type{!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents, 1));
};


/**
 * @param {!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents>} value
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer} returns this
*/
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.contents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer} returns this
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.prototype.clearContentList = function() {
  return this.setContentList([]);
};


/**
 * repeated nextRequest commentRequest = 2;
 * @return {!Array<!proto.android_full_next.nextRequest>}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.prototype.getCommentrequestList = function() {
  return /** @type{!Array<!proto.android_full_next.nextRequest>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.nextRequest, 2));
};


/**
 * @param {!Array<!proto.android_full_next.nextRequest>} value
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer} returns this
*/
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.prototype.setCommentrequestList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.android_full_next.nextRequest=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.nextRequest}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.prototype.addCommentrequest = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.android_full_next.nextRequest, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer} returns this
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.prototype.clearCommentrequestList = function() {
  return this.setCommentrequestList([]);
};


/**
 * optional string identifier = 7;
 * @return {string}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.prototype.getIdentifier = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer} returns this
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer.prototype.setIdentifier = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * repeated itemSectionRenderer itemSectionRender = 50195462;
 * @return {!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer>}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.prototype.getItemsectionrenderList = function() {
  return /** @type{!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer, 50195462));
};


/**
 * @param {!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer>} value
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents} returns this
*/
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.prototype.setItemsectionrenderList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 50195462, value);
};


/**
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.prototype.addItemsectionrender = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 50195462, opt_value, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.itemSectionRenderer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents} returns this
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents.prototype.clearItemsectionrenderList = function() {
  return this.setItemsectionrenderList([]);
};


/**
 * repeated contents content = 1;
 * @return {!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents>}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.prototype.getContentList = function() {
  return /** @type{!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents, 1));
};


/**
 * @param {!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents>} value
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results} returns this
*/
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.contents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results} returns this
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results.prototype.clearContentList = function() {
  return this.setContentList([]);
};


/**
 * repeated results result = 49399797;
 * @return {!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results>}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.prototype.getResultList = function() {
  return /** @type{!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results, 49399797));
};


/**
 * @param {!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results>} value
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents} returns this
*/
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.prototype.setResultList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 49399797, value);
};


/**
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.prototype.addResult = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 49399797, opt_value, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.results, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents} returns this
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.contents.prototype.clearResultList = function() {
  return this.setResultList([]);
};


/**
 * repeated contents content = 1;
 * @return {!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents>}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.prototype.getContentList = function() {
  return /** @type{!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents, 1));
};


/**
 * @param {!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents>} value
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults} returns this
*/
proto.android_full_next.root.contents.singleColumnWatchNextResults.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults.contents}
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.android_full_next.root.contents.singleColumnWatchNextResults.contents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults} returns this
 */
proto.android_full_next.root.contents.singleColumnWatchNextResults.prototype.clearContentList = function() {
  return this.setContentList([]);
};


/**
 * repeated singleColumnWatchNextResults nextResults = 51779735;
 * @return {!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults>}
 */
proto.android_full_next.root.contents.prototype.getNextresultsList = function() {
  return /** @type{!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.root.contents.singleColumnWatchNextResults, 51779735));
};


/**
 * @param {!Array<!proto.android_full_next.root.contents.singleColumnWatchNextResults>} value
 * @return {!proto.android_full_next.root.contents} returns this
*/
proto.android_full_next.root.contents.prototype.setNextresultsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 51779735, value);
};


/**
 * @param {!proto.android_full_next.root.contents.singleColumnWatchNextResults=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.root.contents.singleColumnWatchNextResults}
 */
proto.android_full_next.root.contents.prototype.addNextresults = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 51779735, opt_value, proto.android_full_next.root.contents.singleColumnWatchNextResults, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root.contents} returns this
 */
proto.android_full_next.root.contents.prototype.clearNextresultsList = function() {
  return this.setNextresultsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.root.bData.repeatedFields_ = [48687757];



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
proto.android_full_next.root.bData.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.root.bData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.root.bData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.bData.toObject = function(includeInstance, msg) {
  var f, obj = {
    msg3List: jspb.Message.toObjectList(msg.getMsg3List(),
    proto.android_full_next.root.bData.pbVarious.toObject, includeInstance)
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
 * @return {!proto.android_full_next.root.bData}
 */
proto.android_full_next.root.bData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.root.bData;
  return proto.android_full_next.root.bData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.root.bData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.root.bData}
 */
proto.android_full_next.root.bData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 48687757:
      var value = new proto.android_full_next.root.bData.pbVarious;
      reader.readMessage(value,proto.android_full_next.root.bData.pbVarious.deserializeBinaryFromReader);
      msg.addMsg3(value);
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
proto.android_full_next.root.bData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.root.bData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.root.bData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.bData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMsg3List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      48687757,
      f,
      proto.android_full_next.root.bData.pbVarious.serializeBinaryToWriter
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
proto.android_full_next.root.bData.pbVarious.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.root.bData.pbVarious.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.root.bData.pbVarious} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.bData.pbVarious.toObject = function(includeInstance, msg) {
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
 * @return {!proto.android_full_next.root.bData.pbVarious}
 */
proto.android_full_next.root.bData.pbVarious.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.root.bData.pbVarious;
  return proto.android_full_next.root.bData.pbVarious.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.root.bData.pbVarious} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.root.bData.pbVarious}
 */
proto.android_full_next.root.bData.pbVarious.deserializeBinaryFromReader = function(msg, reader) {
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
proto.android_full_next.root.bData.pbVarious.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.root.bData.pbVarious.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.root.bData.pbVarious} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.bData.pbVarious.serializeBinaryToWriter = function(message, writer) {
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
proto.android_full_next.root.bData.pbVarious.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.android_full_next.root.bData.pbVarious} returns this
 */
proto.android_full_next.root.bData.pbVarious.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated pbVarious msg3 = 48687757;
 * @return {!Array<!proto.android_full_next.root.bData.pbVarious>}
 */
proto.android_full_next.root.bData.prototype.getMsg3List = function() {
  return /** @type{!Array<!proto.android_full_next.root.bData.pbVarious>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.root.bData.pbVarious, 48687757));
};


/**
 * @param {!Array<!proto.android_full_next.root.bData.pbVarious>} value
 * @return {!proto.android_full_next.root.bData} returns this
*/
proto.android_full_next.root.bData.prototype.setMsg3List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 48687757, value);
};


/**
 * @param {!proto.android_full_next.root.bData.pbVarious=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.root.bData.pbVarious}
 */
proto.android_full_next.root.bData.prototype.addMsg3 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 48687757, opt_value, proto.android_full_next.root.bData.pbVarious, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root.bData} returns this
 */
proto.android_full_next.root.bData.prototype.clearMsg3List = function() {
  return this.setMsg3List([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.android_full_next.root.fData.repeatedFields_ = [78882851];



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
proto.android_full_next.root.fData.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.root.fData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.root.fData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.fData.toObject = function(includeInstance, msg) {
  var f, obj = {
    pb1List: jspb.Message.toObjectList(msg.getPb1List(),
    proto.android_full_next.root.fData.pbVarious.toObject, includeInstance)
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
 * @return {!proto.android_full_next.root.fData}
 */
proto.android_full_next.root.fData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.root.fData;
  return proto.android_full_next.root.fData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.root.fData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.root.fData}
 */
proto.android_full_next.root.fData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 78882851:
      var value = new proto.android_full_next.root.fData.pbVarious;
      reader.readMessage(value,proto.android_full_next.root.fData.pbVarious.deserializeBinaryFromReader);
      msg.addPb1(value);
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
proto.android_full_next.root.fData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.root.fData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.root.fData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.fData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPb1List();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      78882851,
      f,
      proto.android_full_next.root.fData.pbVarious.serializeBinaryToWriter
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
proto.android_full_next.root.fData.pbVarious.prototype.toObject = function(opt_includeInstance) {
  return proto.android_full_next.root.fData.pbVarious.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.android_full_next.root.fData.pbVarious} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.fData.pbVarious.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.android_full_next.root.fData.pbVarious}
 */
proto.android_full_next.root.fData.pbVarious.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.android_full_next.root.fData.pbVarious;
  return proto.android_full_next.root.fData.pbVarious.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.android_full_next.root.fData.pbVarious} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.android_full_next.root.fData.pbVarious}
 */
proto.android_full_next.root.fData.pbVarious.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.android_full_next.root.fData.pbVarious.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.android_full_next.root.fData.pbVarious.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.android_full_next.root.fData.pbVarious} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.android_full_next.root.fData.pbVarious.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


/**
 * repeated pbVarious pb1 = 78882851;
 * @return {!Array<!proto.android_full_next.root.fData.pbVarious>}
 */
proto.android_full_next.root.fData.prototype.getPb1List = function() {
  return /** @type{!Array<!proto.android_full_next.root.fData.pbVarious>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.root.fData.pbVarious, 78882851));
};


/**
 * @param {!Array<!proto.android_full_next.root.fData.pbVarious>} value
 * @return {!proto.android_full_next.root.fData} returns this
*/
proto.android_full_next.root.fData.prototype.setPb1List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 78882851, value);
};


/**
 * @param {!proto.android_full_next.root.fData.pbVarious=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.root.fData.pbVarious}
 */
proto.android_full_next.root.fData.prototype.addPb1 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 78882851, opt_value, proto.android_full_next.root.fData.pbVarious, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root.fData} returns this
 */
proto.android_full_next.root.fData.prototype.clearPb1List = function() {
  return this.setPb1List([]);
};


/**
 * repeated contents content = 7;
 * @return {!Array<!proto.android_full_next.root.contents>}
 */
proto.android_full_next.root.prototype.getContentList = function() {
  return /** @type{!Array<!proto.android_full_next.root.contents>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.root.contents, 7));
};


/**
 * @param {!Array<!proto.android_full_next.root.contents>} value
 * @return {!proto.android_full_next.root} returns this
*/
proto.android_full_next.root.prototype.setContentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.android_full_next.root.contents=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.root.contents}
 */
proto.android_full_next.root.prototype.addContent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.android_full_next.root.contents, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root} returns this
 */
proto.android_full_next.root.prototype.clearContentList = function() {
  return this.setContentList([]);
};


/**
 * repeated bData pbExtra = 9;
 * @return {!Array<!proto.android_full_next.root.bData>}
 */
proto.android_full_next.root.prototype.getPbextraList = function() {
  return /** @type{!Array<!proto.android_full_next.root.bData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.root.bData, 9));
};


/**
 * @param {!Array<!proto.android_full_next.root.bData>} value
 * @return {!proto.android_full_next.root} returns this
*/
proto.android_full_next.root.prototype.setPbextraList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 9, value);
};


/**
 * @param {!proto.android_full_next.root.bData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.root.bData}
 */
proto.android_full_next.root.prototype.addPbextra = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 9, opt_value, proto.android_full_next.root.bData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root} returns this
 */
proto.android_full_next.root.prototype.clearPbextraList = function() {
  return this.setPbextraList([]);
};


/**
 * repeated fData pbExtra14 = 14;
 * @return {!Array<!proto.android_full_next.root.fData>}
 */
proto.android_full_next.root.prototype.getPbextra14List = function() {
  return /** @type{!Array<!proto.android_full_next.root.fData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.android_full_next.root.fData, 14));
};


/**
 * @param {!Array<!proto.android_full_next.root.fData>} value
 * @return {!proto.android_full_next.root} returns this
*/
proto.android_full_next.root.prototype.setPbextra14List = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 14, value);
};


/**
 * @param {!proto.android_full_next.root.fData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.android_full_next.root.fData}
 */
proto.android_full_next.root.prototype.addPbextra14 = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 14, opt_value, proto.android_full_next.root.fData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.android_full_next.root} returns this
 */
proto.android_full_next.root.prototype.clearPbextra14List = function() {
  return this.setPbextra14List([]);
};


goog.object.extend(exports, proto.android_full_next);

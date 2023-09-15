// data cache for various video lists
var cacheSpotlight = {
    itemsPerBlock: 40
};
var cacheMostViewed = {
    itemsPerBlock: 40
};
var cacheTopRated = {
    itemsPerBlock: 40
};
var cacheMore = {
    itemsPerBlock: 40
};
var cacheSubscriptions = {
    itemsPerBlock: 40,
    alwaysRefresh: true
};
var cacheUploads = {
    itemsPerBlock: 40,
    alwaysRefresh: true
};
var cacheFavorites = {
    itemsPerBlock: 40,
    alwaysRefresh: true
};
var cachePlaylistVideos = {
    itemsPerBlock: 40,
    alwaysRefresh: true
};
var cachePlaylists = {
    itemsPerBlock: 40,
    alwaysRefresh: true
};
var cacheRelated1 = {
    itemsPerBlock: 40
};
var cacheRelated2 = {
    itemsPerBlock: 40
};
var cacheRecommended = {
    itemsPerBlock: 40
};
var cacheSearch = {
    itemsPerBlock: 40
};

var focusMouseOver = {
    focusstyle: 'mouseover',
    focusevent: 'click'
};
var focusPlayerOver = {
    focusstyle: 'playerover',
    focusevent: 'click'
};
var focusMouseHover = {
    focusstyle: 'mousehover',
    focusevent: 'click'
};
var focusLocaleHover = {
    focusstyle: 'localehover',
    focusevent: 'click'
};
var focusLinkOver = {
    focusstyle: 'linkover',
    focusevent: 'click'
};
var focusDownHighlight = {
    focusstyle: 'downhighlight',
    focusevent: 'click'
};
var focusNewHover = {
    focusstyle: 'newhover',
    focusevent: 'click'
};
var focusPaddleOver = {
    focusstyle: 'paddleover',
    focusevent: 'click'
};
var focusInputOver = {
    focusstyle: 'inputover',
    focusevent: 'SYN_EVENT_NAVIGATE_SELECT'
};

var dataSignInText = 'Please sign in';

var dataAllCache = [
    cacheSpotlight,
    cacheMostViewed,
    cacheTopRated,
    cacheMore,
    cacheSubscriptions,
    cacheUploads,
    cacheFavorites,
    cachePlaylistVideos,
    cachePlaylists,
    cacheRelated1,
    cacheRelated2,
    cacheRecommended,
    cacheSearch
];

var textNoVideosFound = 'No Videos Found';

// Active Sets. Only one in each array can be active at a time.
var viewSubmenuBrowse = [
    'main.browse_site.browse-buttons.menu-container',
    'main.browse_site.browse-buttons.toprated-videos',
    'main.browse_site.browse-buttons.mostviewed-videos',
    'main.browse_site.browse-buttons.more-videos'
];
var viewSubmenuBrowseButtons = [
    'main.browse_site.browse-buttons.menu-container.featured-videos',
    'main.browse_site.browse-buttons.menu-container.recommended-videos',
    'main.browse_site.browse-buttons.toprated-videos.button',
    'main.browse_site.browse-buttons.mostviewed-videos.button',
    'main.browse_site.browse-buttons.more-videos.button'
];
var viewSubmenuAccount = [
    'main.browse_site.browse-buttons.myvideos-button',
    'main.browse_site.browse-buttons.favorites-button',
    'main.browse_site.browse-buttons.playlists-button',
    'main.browse_site.browse-buttons.logout-button'
];
var viewSubmenuAccountButtons = [
    'main.browse_site.browse-buttons.myvideos-button.button',
    'main.browse_site.browse-buttons.favorites-button.button',
    'main.browse_site.browse-buttons.playlists-button.button',
    'main.browse_site.browse-buttons.logout-button.button'
];
var viewMenuButtons = [
    'main.browse_site.browse-buttons.browse-videos.button',
    'main.browse_site.browse-buttons.search-videos.button',
    'main.browse_site.browse-buttons.loggedinbutton.button',
    'main.browse_site.browse-buttons.loginbutton.button',
    'main.browse_site.browse-buttons.settings.button',
    'main.browse_site.browse-buttons.about.button'
];
var viewLoginSet = [
    'main.browse_site.browse-buttons.loggedinbutton',
    'main.browse_site.browse-buttons.loginbutton'
];
var viewTabsChannel = [
    'main.browse_site.video-container.channeltabs.channellist1',
    'main.browse_site.video-container.channeltabs.channellist2',
    'main.browse_site.video-container.channeltabs.channellist3'
];
var viewChannelButtons = [
    'main.browse_site.channelsub.channelinfo',
    'main.browse_site.channelsub.videos_button'
];
var viewTabsTopRated = [
    'main.browse_site.video-container.topratedtabs.today',
    'main.browse_site.video-container.topratedtabs.thisweek',
    'main.browse_site.video-container.topratedtabs.alltime'
];
var viewTabsMostViewed = [
    'main.browse_site.video-container.mostviewedtabs.today',
    'main.browse_site.video-container.mostviewedtabs.thisweek',
    'main.browse_site.video-container.mostviewedtabs.alltime'
];
var viewHomePageContent = [
    'main.browse_site.video-container',
    'main.browse_site.content_search',
    'main.browse_site.content_channel',
    'main.browse_site.content_browsemore',
    'main.browse_site.content_settings',
    'main.browse_site.content_geo',
    'main.browse_site.content_language',
    'main.browse_site.content_about'
];
var viewMainPage = ['main.browse_site', 'main.content_watch'];
var viewTabSet = [
    'main.browse_site.video-container.notabs',
    'main.browse_site.video-container.topratedtabs',
    'main.browse_site.video-container.mostviewedtabs',
    'main.browse_site.video-container.searchtabs',
    'main.browse_site.video-container.channeltabs'
];
var viewWatchContent = [
    'main.content_watch.info',
    'main.content_watch.relatedcontainer',
    'main.content_watch.sharepopup',
    'main.content_watch.flag',
    'main.content_watch.infringe'
];
var viewWatchButtons = [
    'main.content_watch.moreinfo_button',
    'main.content_watch.related_button',
    'main.content_watch.share_button',
    'main.content_watch.flag_button',
    'main.content_watch.login_button'
];
var viewFlagReasons = [
    'main.content_watch.flag.reason1',
    'main.content_watch.flag.reason2',
    'main.content_watch.flag.reason3',
    'main.content_watch.flag.reason4',
    'main.content_watch.flag.reason5',
    'main.content_watch.flag.reason6'
];
var viewHomePageMenu = [
    'main.browse_site.browse-buttons',
    'main.browse_site.channelsub'
];
var viewBackButton = [
    'main.browse_site.browse-buttons',
    'main.browse_site.gobackcontainer'
];

var viewServices = [
    '.service_browse_videos',
    '.service_browse_search',
    '.service_browse_myvideos',
    '.service_browse_uservideos',
    '.service_related'
]

var dataPageMap = {
    'default': 'main.page-1',
    featured: 'main.page-1',
    about: 'main.page-2',
    mostviewedtoday: 'main.page-3',
    mostviewedthisweek: 'main.page-4',
    mostviewedthismonth: 'main.page-5',
    mostviewedalltime: 'main.page-6',
    topratedtoday: 'main.page-7',
    topratedthisweek: 'main.page-8',
    topratedthismonth: 'main.page-9',
    topratedalltime: 'main.page-10',
    search: 'main.page-11',
    watch: 'main.page-12',
    searchresults: 'main.page-13',
    login: 'main.page-14',
    subscriptions: 'main.page-15',
    playlists: 'main.page-16',
    myvideos: 'main.page-17',
    favorites: 'main.page-18',
    settings: 'main.page-19',
    settings_geo: 'main.page-20',
    settings_lang: 'main.page-21',
    browsemore: 'main.page-28',
    videos_recently_added: 'main.page-29',
    buzz_browse_today: 'main.page-30',
    buzz_browse_week: 'main.page-31',
    buzz_browse_month: 'main.page-32',
    videos_most_popular_today: 'main.page-33',
    videos_most_popular_week: 'main.page-34',
    videos_most_popular_month: 'main.page-35',
    videos_comment_count_today: 'main.page-36',
    videos_comment_count_week: 'main.page-37',
    videos_comment_count: 'main.page-38',
    videos_most_responded_today: 'main.page-39',
    videos_most_responded_week: 'main.page-40',
    videos_most_responded: 'main.page-41',
    videos_most_added_to_favorites_today: 'main.page-42',
    videos_most_added_to_favorites_week: 'main.page-43',
    videos_most_added_to_favorites: 'main.page-44',
    mpt_top_music_today: 'main.page-45',
    mpt_top_music_week: 'main.page-46',
    mpt_top_music_month: 'main.page-47',
    mpt_top_indy_music_today: 'main.page-48',
    mpt_top_indy_music_week: 'main.page-49',
    mpt_top_indy_music_month: 'main.page-50',
    mpt_top_major_music_today: 'main.page-51',
    mpt_top_major_music_week: 'main.page-52',
    mpt_top_major_music_month: 'main.page-53',
    mpt_top_unsigned_music_today: 'main.page-54',
    mpt_top_unsigned_music_week: 'main.page-55',
    mpt_top_unsigned_music_month: 'main.page-56',
    edu_videos_views_week: 'main.page-58',
    edu_videos_views_month: 'main.page-59',
    edu_videos_views: 'main.page-60',
    recommended: 'main.page-62'
}

var dataPending = {
    video_id: null,
    playlist_id: null,
    image_url: null,
    title: 'loading...',
    description: null,
    duration: null,
    published: null,
    category: null,
    author: null,
    rating: null,
    view_count: null
};

var dataVideo = [
    'video_id',
    'playlist_id',
    'image_url',
    'title',
    'description',
    'duration',
    'published',
    'category',
    'author',
    'author_url',
    'rating',
    'view_count',
    'cache_index',
    'cache_source'
];

var dataVideoBroken = {
    video_id: null,
    playlist_id: null,
    image_url: 'http://s.ytimg.com/yt/img/syn/wii-broken-vfl82372.png',
    title: 'not available',
    description: null,
    duration: null,
    published: null,
    category: null,
    author: null,
    rating: null,
    view_count: null
};

var dataPendingImg = 'http://s.ytimg.com/yt/img/syn/pixel-vfl82372.gif';

var dataNoVideo = {
    video_id: null,
    playlist_id: null,
    image_url: 'http://s.ytimg.com/yt/img/syn/pixel-vfl82372.gif',
    title: null,
    description: null,
    duration: null,
    published: null,
    category: null,
    author: null,
    rating: null,
    view_count: null
};

var dataKeyToMediaEventMap = [[]];

var generateImage = function (src, alt, innerAspectRatio, outerAspectRatio, fit, opt_controls) {
    var controls = opt_controls || [];
    controls.push({
        _CLASS: 'xl-control-scale_on_resize',
        innerAspectRatio: innerAspectRatio,
        outerAspectRatio: outerAspectRatio,
        center: true,
        fit: fit
    });
    return {
        _CLASS: 'xl-view-image',
        _CONTROL: controls,
        image: src,
        image_alt: alt
    };
};

var generateRating = function (outer, opt_controls) {
    var controls = opt_controls || [];
    controls.push({
        _CLASS: 'xl-control-scale_on_resize',
        innerAspectRatio: 0.891891,
        outerAspectRatio: outer,
        n: 5,
        // Compensate for pixel-rounding of percent-based styling to avoid stars overflowing onto next line.
        scale: 0.95
    });

    return {
        _CLASS: 'xl-view-rating',
        _CONTROL: controls
    };
};

var controlActiveIfLoggedIn = function (onTrue, onFalse) {
    return {
        _CLASS: 'syn-control-check_properties',
        source: 'main',
        every: 'config.user',
        activate_on_true: onTrue,
        activate_on_false: onFalse
    };
};

var generateVideoItem = function () {
    return {
        _CLASS: 'xl-view-browsethumb',
        navobject: focusMouseOver,
        _CONTROL: [
            { _CLASS: 'syn-control-activate_on_click' },
            { _CLASS: 'syn-control-deactivate', target: 'main.service_watch' },
            { _CLASS: 'syn-control-set_properties', target: ['main.page-12', 'main.on_restricted', 'main.check_restricted'], map: { video: 'video' } },
            { _CLASS: 'syn-control-set_properties', target: 'main.service_watch', map: { index: 'video.cache_index', source: 'video.cache_source' } },
            {
                _CLASS: 'syn-control-check_properties',
                some: ['video.video_id', 'video.playlist_id'],
                activate_on_true: ['main.check_restricted']
            }
        ],
        _VIEW: {
            image: generateImage('', dataPendingImg, 1.333333, 0.808098, 'max'),
            overlay: {
                _CLASS: 'xl-view-image',
                image: 'http://s.ytimg.com/yt/img/syn/xl-video-gloss-vfl91176.png'
            },
            title: { _CLASS: 'xl-view-text' },
            rating: generateRating(3),
            duration: { _CLASS: 'xl-view-text' },
            views: { _CLASS: 'xl-view-text', label_decorator: 'Views:' + ' %s' },
            author: { _CLASS: 'xl-view-text' }
        }
    };
};

var generateRelatedVideoItem = function () {
    return {
        _CLASS: 'xl-view-relatedthumb',
        navobject: focusMouseOver,
        _CONTROL: [
            { _CLASS: 'syn-control-activate_on_click' },
            { _CLASS: 'syn-control-deactivate', target: 'main.service_watch' },
            { _CLASS: 'syn-control-set_properties', target: 'main.service_watch', map: { index: 'video.cache_index', source: 'video.cache_source' } },
            { _CLASS: 'syn-control-set_properties', target: ['main.page-12', 'main.on_restricted', 'main.check_restricted'], map: { video: 'video' } },
            {
                _CLASS: 'syn-control-check_properties',
                some: ['video.video_id', 'video.playlist_id'],
                activate_on_true: ['main.check_restricted']
            }
        ],
        _VIEW: {
            image: generateImage('', dataPendingImg, 1.333333, 0.84375, 'max'),
            overlay: {
                _CLASS: 'xl-view-image',
                image: 'http://s.ytimg.com/yt/img/syn/xl-video-gloss-vfl91176.png'
            },
            imagebox: { _CLASS: 'xl-view-default' },
            title: { _CLASS: 'xl-view-text' },
            rating: generateRating(2.925),
            duration: { _CLASS: 'xl-view-text' },
            views: { _CLASS: 'xl-view-text', label_decorator: 'Views:' + ' %s' }
        }
    };
};

var generatePageCount = function () {
    return {
        _CLASS: 'xl-view-pagecount',
        of: 'of'
    };
};

var generateSearchBox = function (sync) {
    function focus(e) {
        e.currentTarget.focus();
    }
    function blur(e) {
        e.currentTarget.blur();
    }
    return {
        _CLASS: 'xl-view-input',
        navobject: focusInputOver,
        _CONTROL: [
            { _CLASS: 'syn-control-update' },
            { _CLASS: 'syn-control-on_event', map: { SYN_EVENT_NAVIGATE_IN: focus, SYN_EVENT_NAVIGATE_OUT: blur } },
            { _CLASS: 'syn-control-activate_on_event', event: (configuration.has_virtual_keyboard ? 'change' : 'SYN_EVENT_NAVIGATE_SELECT') },
            { _CLASS: 'syn-control-set_properties', target: 'main.page-13', map: { query: 'get' } },
            { _CLASS: 'syn-control-set_properties', target: sync, map: { set: 'get' } },
            { _CLASS: 'syn-control-activate', target: 'main.page-13' }
        ]
    };
};

//-------------------------------------------------------------------------
// Channel Content
//-------------------------------------------------------------------------
var generateChannelDescContent = function () {
    return {
        _CLASS: 'xl-view-default',
        _CONTROL: [{ _CLASS: 'syn-control-set_visible' }],
        _VIEW: {
            channelcontent: {
                _CLASS: 'xl-view-default',
                _VIEW: {
                    channeltitle: { _CLASS: 'xl-view-text', label: 'Description:' },
                    description: {
                        _CLASS: 'xl-view-wrappingtext'
                    },
                    joined: { _CLASS: 'xl-view-text', label_decorator: 'Joined:' + ' %s' },
                    subscribers: { _CLASS: 'xl-view-text', label_decorator: 'Subscribers:' + ' %s' },
                    lastlogin: { _CLASS: 'xl-view-text', label_decorator: 'Last Sign In:' + ' %s' },
                    viewcount: { _CLASS: 'xl-view-text', label_decorator: 'View Count:' + ' %s' }

                }
            }
        }
    };
};
//-----------------------------------------------------------------------//
// Search Content
//-----------------------------------------------------------------------//
var generateSearchContent = function () {
    return {
        _CLASS: 'xl-view-default',
        _CONTROL: [
            { _CLASS: 'syn-control-set_visible' },
            { _CLASS: 'syn-control-navigate' }
        ],
        _VIEW: {
            search: {
                _CLASS: 'xl-view-default',
                _VIEW: {
                    prompt: { _CLASS: 'xl-view-text', label: 'Search for videos:' },
                    input: {
                        _CLASS: 'xl-view-default',
                        _VIEW: {
                            inputbox: generateSearchBox(['main.browse_site.search_box.search_input', 'main.content_watch.search_box.search_input'])
                        }
                    },
                    searchbutton: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: 'main.browse_site.content_search.search.input.inputbox' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'Search' }
                        }
                    }
                }
            }
        }
    };
};

var generateBrowseMoreContent = function () {
    return {
        _CLASS: 'xl-view-default',
        _CONTROL: [
            { _CLASS: 'syn-control-set_visible' },
            { _CLASS: 'syn-control-navigate' }
        ],
        _VIEW: {
            contentwindow: {
                _CLASS: 'xl-view-default',
                _VIEW: {
                    countries: {
                        _CLASS: 'xl-view-countries',
                        _VIEW: {
                            v0: generateFeedButton('main.page-29', 'Recently Added'),
                            v1: generateFeedButton('main.page-30', 'Rising Videos'),
                            v2: generateFeedButton('main.page-33', 'Most Popular'),
                            v3: generateFeedButton('main.page-42', 'Top Favorited'),
                            v4: generateFeedButton('main.page-36', 'Most Discussed'),
                            v5: generateFeedButton('main.page-39', 'Most Responded'),
                            v6: { _CLASS: 'xl-view-feedspacer' },
                            v7: { _CLASS: 'xl-view-feedspacer' },
                            v8: generateFeedButton('main.page-45', 'Top Music'),
                            v9: generateFeedButton('main.page-48', 'Top Indie Music'),
                            v10: generateFeedButton('main.page-51', 'Top Major Label Music'),
                            v11: generateFeedButton('main.page-54', 'Top Unsigned Music'),
                            v12: { _CLASS: 'xl-view-feedspacer' },
                            v13: { _CLASS: 'xl-view-feedspacer' },
                            v15: generateFeedButton('main.page-58', 'Education'),
                            v16: generateFeedButton('main.page-1', 'Spotlight')
                        }
                    }
                }
            }
        }
    };
};

var generateFeedButton = function (page, label) {
    return {
        _CLASS: 'xl-view-feed',
        _CONTROL: [
            { _CLASS: 'syn-control-activate_on_click', target: page }
        ],
        _VIEW: {
            contentcenter: { _CLASS: 'xl-view-text', label: label }
        },
        navobject: focusLocaleHover
    };
};

var generateGeoContent = function () {
    return {
        _CLASS: 'xl-view-default',
        _CONTROL: [
            { _CLASS: 'syn-control-set_visible' },
            { _CLASS: 'syn-control-navigate' }
        ],
        _VIEW: {
            allcountries: {
                _CLASS: 'xl-view-default',
                _VIEW: {
                    geoprompt: { _CLASS: 'xl-view-text', label: 'Set Geography' },
                    countries: {
                        _CLASS: 'xl-view-countries',
                        _VIEW: {
                            worldwide: generateGeoItem('US', 'Worldwide'),
                            spacer1: { _CLASS: 'xl-view-countryspacer' },
                            spacer2: { _CLASS: 'xl-view-countryspacer' },
                            cau: generateGeoItem('AU', 'Australia'),
                            cbr: generateGeoItem('BR', 'Brazil'),
                            cca: generateGeoItem('CA', 'Canada'),
                            ccz: generateGeoItem('CZ', 'Czech Republic'),
                            cde: generateGeoItem('DE', 'Germany'),
                            ces: generateGeoItem('ES', 'Spain'),
                            cfr: generateGeoItem('FR', 'France'),
                            cgb: generateGeoItem('GB', 'UK'),
                            chk: generateGeoItem('HK', 'Hong Kong'),
                            cie: generateGeoItem('IE', 'Ireland'),
                            cil: generateGeoItem('IL', 'Israel'),
                            cin: generateGeoItem('IN', 'India'),
                            cit: generateGeoItem('IT', 'Italy'),
                            cjp: generateGeoItem('JP', 'Japan'),
                            ckr: generateGeoItem('KR', 'South Korea'),
                            cmx: generateGeoItem('MX', 'Mexico'),
                            cnl: generateGeoItem('NL', 'Netherlands'),
                            cnz: generateGeoItem('NZ', 'New Zealand'),
                            cpl: generateGeoItem('PL', 'Poland'),
                            cru: generateGeoItem('RU', 'Russia'),
                            cse: generateGeoItem('SE', 'Sweden'),
                            ctw: generateGeoItem('TW', 'Taiwan')
                        }
                    }
                }
            }
        }
    };
};

var generateLanguageContent = function () {
    return {
        _CLASS: 'xl-view-default',
        _CONTROL: [
            { _CLASS: 'syn-control-set_visible' },
            { _CLASS: 'syn-control-navigate' }
        ],
        _VIEW: {
            alllanguages: {
                _CLASS: 'xl-view-default',
                _VIEW: {
                    langprompt: { _CLASS: 'xl-view-text', label: 'Set Language' },
                    languages: {
                        _CLASS: 'xl-view-default',
                        _VIEW: {
                            lde: generateLanguageItem('de', 'Deutsch'),
                            lengb: generateLanguageItem('en-GB', 'English (UK)'),
                            len: generateLanguageItem('en', 'English (US)'),
                            lfr: generateLanguageItem('fr', 'Fran\u00E7ais'),
                            lit: generateLanguageItem('it', 'Italiano'),
                            lnl: generateLanguageItem('nl', 'Nederlands'),
                            lpt: generateLanguageItem('pt', 'Portugu\u00EAs (Brasil)'),
                            les: generateLanguageItem('es', 'Espa\u00F1ol (Espa\u00F1a)'),
                            lesmx: generateLanguageItem('es-MX', 'Espa\u00F1ol (Latinoam\u00E9rica)'),
                            lzhtw: generateLanguageItem('zh-TW', '\u4E2D\u6587 (\u7E41\u9AD4)'),
                            lja: generateLanguageItem('ja', '\u65E5\u672C\u8A9E'),
                            lru: generateLanguageItem('ru', 'Pycc\u0138\u0438\u0439'),
                            lsv: generateLanguageItem('sv', 'Svenska'),
                            lpl: generateLanguageItem('pl', 'Polski'),
                            lcs: generateLanguageItem('cs', '\u010Ce\u0161tina'),
                            lzhcn: generateLanguageItem('zh-CN', '\u4E2D\u6587 (\u7B80\u4F53)'),
                            lko: generateLanguageItem('ko', '\uD55C\uAD6D\uC5B4')
                        }
                    }
                }
            }
        }
    };
};

var generateCheckBoxItem = function (label, key, value) {
    var map = {};
    map[key] = key;

    return {
        _CLASS: 'xl-view-checkbox_container',
        navobject: focusMouseOver,
        _CONTROL: [{
            _CLASS: 'syn-control-activate_on_click',
            target: '.onclick'
        }, {
            _CLASS: 'syn-control-set_style_on_property',
            source: 'main',
            target: '.boxchecked',
            key: key,
            map: { 'showcheck': [value, value.toString()] }
        }],
        _VIEW: {
            boxchecked: generateImage('http://s.ytimg.com/yt/img/syn/xl-checkbox-checked-vfl82372.png', '', 1.058823, 1.1, 'min'),
            boxempty: generateImage('http://s.ytimg.com/yt/img/syn/xl-checkbox-empty-vfl82372.png', '', 1.058823, 1.1, 'min'),
            text: { _CLASS: 'xl-view-wrappingtext', label: label },
            onclick: {
                _CLASS: 'xl-view-hidden',
                _CONTROL: [{
                    _CLASS: 'syn-control-set_properties',
                    source: 'main',
                    target: 'main',
                    map: map,
                    transform: { 'true': false, 'false': true }
                }, {
                    _CLASS: 'syn-control-on_event',
                    map: { SYN_EVENT_ACTIVATE: yt.xl.config.savePreferences }
                }, {
                    _CLASS: 'syn-control-activate',
                    target: '..'
                }]
            }
        }
    };
};

var generateFlaggingReason = function (label, reasonCode) {
    return {
        _CLASS: 'xl-view-checkbox_container',
        navobject: focusMouseOver,
        _CONTROL: [{
            _CLASS: 'syn-control-active_set',
            target: viewFlagReasons
        }, {
            _CLASS: 'syn-control-activate_on_click',
            target: '.onclick'
        }, {
            _CLASS: 'syn-control-set_style_on_property',
            source: 'main.service_flag',
            target: '.boxchecked',
            key: 'reason',
            map: { 'showcheck': reasonCode }
        }],
        _VIEW: {
            boxchecked: generateImage('http://s.ytimg.com/yt/img/syn/xl-radio-selected-vfl100357.png', '', 1.058823, 1.1, 'min'),
            boxempty: generateImage('http://s.ytimg.com/yt/img/syn/xl-radio-empty-vfl100357.png', '', 1.058823, 1.1, 'min'),
            text: { _CLASS: 'xl-view-wrappingtext', label: label },
            onclick: {
                _CLASS: 'xl-view-hidden',
                reason: reasonCode,
                _CONTROL: [{
                    _CLASS: 'syn-control-set_properties',
                    target: 'main.service_flag',
                    map: { reason: 'reason' }
                }, {
                    _CLASS: 'syn-control-activate',
                    target: viewFlagReasons
                }]
            }
        }
    };
};

var generateLocaleItem = function (label, url, className) {
    if (url) {
        return {
            _CLASS: className,
            navobject: focusLocaleHover,
            _CONTROL: [
                { _CLASS: 'syn-control-activate_on_click' },
                { _CLASS: 'syn-control-redirect', url: url }
            ],
            _VIEW: {
                contentcenter: { _CLASS: 'xl-view-text', label: label }
            }
        };
    } else {
        return {
            _CLASS: className,
            navobject: focusLocaleHover,
            _VIEW: {
                contentcenter: { _CLASS: 'xl-view-text', label: label }
            }
        };
    }
};

var generateLanguageItem = function (hl, label) {
    if (hl == display.hlSelected) {
        return generateLocaleItem(label, '', 'xl-view-languagecurrent')
    } else {
        var url = yt.syn.setURLParameter(window.location.href, 'page', 'settings_lang');
        url = yt.syn.setURLParameter(url, 'hl', hl);
        url = yt.syn.setURLParameter(url, 'persist_hl', 1);
        return generateLocaleItem(label, url, 'xl-view-language');
    }
};

var generateGeoItem = function (gl, label) {
    if (gl == display.glSelected) {
        return generateLocaleItem(label, '', 'xl-view-countrycurrent')
    } else {
        var url = yt.syn.setURLParameter(window.location.href, 'page', 'settings_geo');
        url = yt.syn.setURLParameter(url, 'gl', gl);
        url = yt.syn.setURLParameter(url, 'persist_gl', 1);
        return generateLocaleItem(label, url, 'xl-view-country');
    }
};

//-----------------------------------------------------------------------//
// Settings Content                                                      //
//-----------------------------------------------------------------------//
var generateSettingsContent = function () {
    return {
        _CLASS: 'xl-view-default',
        _CONTROL: [
            { _CLASS: 'syn-control-set_visible' },
            { _CLASS: 'syn-control-navigate' },
            {
                _CLASS: 'syn-control-activate',
                target: [
                    'main.browse_site.content_settings.allsettings.cont_playback',
                    'main.browse_site.content_settings.allsettings.racy',
                    'main.browse_site.content_settings.allsettings.quality'
                ]
            }
        ],
        _VIEW: {
            allsettings: {
                _CLASS: 'xl-view-default',
                _VIEW: {
                    title: { _CLASS: 'xl-view-text', label: 'Settings' },
                    cont_playback: generateCheckBoxItem(
                        'Play next video when current video ends.',
                        'config.autoPlayNextOff',
                        false
                    ),
                    racy: generateCheckBoxItem(
                        'Filter videos that may not be suitable for minors.',
                        'config.filterRacyContent',
                        true
                    ),
                    quality: { _CLASS: 'xl-view-hidden' },
                    language_button: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: 'main.page-21' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'Set Language' }
                        }
                    },
                    geo_button: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: 'main.page-20' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'Set Geography' }
                        }
                    }
                }
            }
        }
    };
};

//-----------------------------------------------------------------------//
// About Content                                                      //
//-----------------------------------------------------------------------//
var generateAboutContent = function () {
    return {
        _CLASS: 'xl-view-default',
        _CONTROL: [
            { _CLASS: 'syn-control-set_visible' },
            { _CLASS: 'syn-control-navigate' }
        ],
        _VIEW: {
            aboutcontent: {
                _CLASS: 'xl-view-default',
                _VIEW: {
                    aboutdescription: {
                        _CLASS: 'xl-view-wrappingtext',
                        label: 'YouTube XL is a version of YouTube optimized for watching YouTube videos on any large screen.'
                    },
                    link1: {
                        _CLASS: 'xl-view-wrappingtext',
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click' },
                            { _CLASS: 'syn-control-redirect', url: '/t/privacy?persist_app=1&app=desktop' }
                        ],
                        navobject: focusLinkOver,
                        label: 'Privacy Policy'
                    },
                    link2: {
                        _CLASS: 'xl-view-wrappingtext',
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click' },
                            { _CLASS: 'syn-control-redirect', url: '/t/terms?persist_app=1&app=desktop' }
                        ],
                        navobject: focusLinkOver,
                        label: 'Terms of Service'
                    },
                    link3: {
                        _CLASS: 'xl-view-wrappingtext',
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click' },
                            { _CLASS: 'syn-control-redirect', url: '/t/dmca_policy?persist_app=1&app=desktop' }
                        ],
                        navobject: focusLinkOver,
                        label: 'Copyright Notices'
                    },
                    link4: {
                        _CLASS: 'xl-view-wrappingtext',
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click' },
                            { _CLASS: 'syn-control-redirect', url: '/t/community_guidelines?persist_app=1&app=desktop' }
                        ],
                        navobject: focusLinkOver,
                        label: 'Community Guidelines'
                    }
                }
            }
        }
    };
};

//-----------------------------------------------------------------------//
// Watch Content
//-----------------------------------------------------------------------//
var generateWatch = function () {
    return {
        _CLASS: 'xl-view-watch',
        _CONTROL: [
            { _CLASS: 'syn-control-set_properties', source: 'main.service_watch', map: { video: 'video' } },
            { _CLASS: 'syn-control-set_visible' },
            { _CLASS: 'syn-control-deactivate', target: ['main.browse_site.video-container', 'main.browse_site.browse-buttons', 'main.browse_site.channelsub'] },
            { _CLASS: 'syn-control-navigate' },
            { _CLASS: 'syn-control-activate', target: ['main.content_watch.relatedcontainer'] },
            { _CLASS: 'syn-control-link', target: ['main.service_watch', 'main.player.video'] }
        ],
        _VIEW: {
            logo: generateImage('http://s.ytimg.com/yt/img/syn/xl-logo-sm-vfl92884.png', '', 2.479452, 2.040540, 'min', [
                { _CLASS: 'syn-control-activate_on_click', target: 'main.page-1' }
            ]),
            search_box: {
                _CLASS: 'xl-view-search',
                _VIEW: {
                    search_input: generateSearchBox(['main.browse_site.search_box.search_input', 'main.browse_site.content_search.search.input.inputbox']),
                    search_button: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: 'main.content_watch.search_box.search_input' }
                        ],
                        _VIEW: {
                            content: {
                                _CLASS: 'xl-view-iconbuttoncontent',
                                _VIEW: {
                                    icon: generateImage('http://s.ytimg.com/yt/img/syn/xl-search_icon-vfl92884.png', '', 1, 1.008116, 'min')
                                }
                            }
                        }
                    }
                }
            },
            title: {
                _CLASS: 'xl-view-text',
                _CONTROL: [{ _CLASS: 'syn-control-set_properties', source: 'main.service_watch', map: { label: 'video.title' } }]
            },
            popup: {
                _CLASS: 'xl-view-popup',
                _CONTROL: { _CLASS: 'syn-control-set_visible', mode: 'message', delay_out: 3000 },
                _VIEW: {
                    content: { _CLASS: 'xl-view-wrappingtext', label_key: 'status', label_alt: dataSignInText }
                }
            },
            info: {
                _CLASS: 'xl-view-default',
                set: '',
                _CONTROL: [
                    { _CLASS: 'syn-control-set_visible' },
                    { _CLASS: 'syn-control-set_style', style: 'selected', target: 'main.content_watch.moreinfo_button' },
                    { _CLASS: 'syn-control-set_focus_on_event', target: 'main.content_watch.moreinfo_button' },
                    {
                        _CLASS: 'syn-control-set_properties',
                        target: ['main.content_watch.sharepopup.emails', 'main.content_watch.sharepopup.message'],
                        map: {
                            set: 'set'
                        }
                    }
                ],
                _VIEW: {
                    usernamesetter: {
                        _CLASS: 'xl-view-hidden',
                        _CONTROL: [
                            { _CLASS: 'syn-control-set_properties', source: 'main.content_watch.info.uploadedbycontainer.contentcenter', target: ['main.service_browse_uservideos', 'main.service_channel', 'main.browse_site.channelsub.channelinfo.channelname'], map: { 'user': 'label' } },
                            { _CLASS: 'syn-control-activate', target: 'main.page-25' }
                        ]
                    },
                    uploadedbycontainer: {
                        _CLASS: 'xl-view-button',
                        _CONTROL: { _CLASS: 'syn-control-activate_on_click', target: 'main.content_watch.info.usernamesetter' },
                        navobject: focusMouseHover,
                        _VIEW: {
                            contentcenter: {
                                _CLASS: 'xl-view-text',
                                _CONTROL: [
                                    { _CLASS: 'syn-control-set_properties', source: 'main.service_watch', target: 'main.content_watch.info.uploadedbycontainer.contentcenter', map: { label: 'video.author' } }
                                ]
                            }
                        }
                    },
                    addedon: {
                        _CLASS: 'xl-view-text',
                        label_decorator: 'Added:' + ' %s',
                        _CONTROL: [{ _CLASS: 'syn-control-set_visible' }, { _CLASS: 'syn-control-set_properties', source: 'main.service_watch', map: { label: 'video.published' } }]
                    },
                    rating: generateRating(3.545454, [{
                        _CLASS: 'syn-control-set_properties',
                        source: 'main.service_watch',
                        map: { rating: 'video.rating' }
                    }]),
                    views: {
                        _CLASS: 'xl-view-text', label_decorator: 'Views:' + ' %s',
                        _CONTROL: [{ _CLASS: 'syn-control-set_properties', source: 'main.service_watch', map: { label: 'video.view_count' } }]
                    },
                    info: {
                        _CLASS: 'xl-view-wrappingtext',
                        _CONTROL: [{ _CLASS: 'syn-control-set_visible' }, { _CLASS: 'syn-control-set_properties', source: 'main.service_watch', map: { label: 'video.description' } }]
                    }
                }
            },
            moreinfo_button: {
                _CLASS: 'xl-view-watchbutton',
                navobject: focusMouseHover,
                _CONTROL: [
                    { _CLASS: 'syn-control-activate_on_click', target: 'main.content_watch.info' }
                ],
                _VIEW: {
                    contentcenter: { _CLASS: 'xl-view-text', label: 'Info' }
                }
            },
            related_button: {
                _CLASS: 'xl-view-watchbutton',
                navobject: focusMouseHover,
                _CONTROL: [
                    { _CLASS: 'syn-control-activate_on_click', target: 'main.content_watch.relatedcontainer' }
                ],
                _VIEW: {
                    contentcenter: { _CLASS: 'xl-view-text', label: 'Related' }
                }
            },
            relatedcontainer: {
                _CLASS: 'xl-view-relatedcontainer',
                set: '',
                _CONTROL: [
                    { _CLASS: 'syn-control-set_visible' },
                    { _CLASS: 'syn-control-set_style', style: 'selected', target: 'main.content_watch.related_button' },
                    {
                        _CLASS: 'syn-control-set_properties',
                        target: ['main.content_watch.sharepopup.emails', 'main.content_watch.sharepopup.message'],
                        map: {
                            set: 'set'
                        }
                    }
                ],
                _VIEW: {
                    upbutton: {
                        _CLASS: 'xl-view-button',
                        navobject: focusDownHighlight,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click' }
                        ],
                        _VIEW: {
                            paddlecontent: generateImage('http://s.ytimg.com/yt/img/syn/xl-uparrow-vfl92884.png', '', 1.457142, 1.329545, 'min'),
                            paddlecontentover: generateImage('http://s.ytimg.com/yt/img/syn/xl-uparrow-hover-vfl91176.png', '', 1.457142, 1.329545, 'min')
                        }
                    },
                    related: {
                        _CLASS: 'xl-view-related',
                        set: '',
                        _VIEW: {
                            item1: generateRelatedVideoItem(),
                            item2: generateRelatedVideoItem(),
                            item3: generateRelatedVideoItem(),
                            item4: generateRelatedVideoItem(),
                            item5: generateRelatedVideoItem(),
                            counter: generatePageCount()
                        }
                    },
                    downbutton: {
                        _CLASS: 'xl-view-button',
                        navobject: focusDownHighlight,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click' }
                        ],
                        _VIEW: {
                            paddlecontent: generateImage('http://s.ytimg.com/yt/img/syn/xl-downarrow-vfl92884.png', '', 1.5, 1.329545, 'min'),
                            paddlecontentover: generateImage('http://s.ytimg.com/yt/img/syn/xl-downarrow-hover-vfl91176.png', '', 1.5, 1.329545, 'min')
                        }
                    }
                }
            },
            sharepopup: {
                _CLASS: 'xl-view-watchdialog',
                _CONTROL: [
                    { _CLASS: 'syn-control-set_visible' },
                    { _CLASS: 'syn-control-set_focus_on_event', target: 'main.content_watch.sharepopup.emails' },
                    { _CLASS: 'syn-control-set_style', style: 'selected', target: 'main.content_watch.share_button' }
                ],
                _VIEW: {
                    email_prompt: { _CLASS: 'xl-view-text', label: 'Email' },
                    emails: {
                        _CLASS: 'xl-view-input',
                        navobject: focusInputOver
                    },
                    message_prompt: { _CLASS: 'xl-view-text', label: 'Message' },
                    message: {
                        _CLASS: 'xl-view-textarea',
                        navobject: focusInputOver
                    },
                    ok_button: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: 'main.service_share' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'Send' }
                        }
                    },
                    cancel_button: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: 'main.content_watch.info' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'Cancel' }
                        }
                    }
                }
            },
            flag: {
                _CLASS: 'xl-view-hidden',
                _CONTROL: { _CLASS: 'syn-control-synthesize', dna: generateFlag }
            },
            infringe: {
                _CLASS: 'xl-view-hidden',
                _CONTROL: { _CLASS: 'syn-control-synthesize', dna: generateInfringe }
            },
            login: {
                _CLASS: 'xl-view-hidden',
                _CONTROL: [
                    { _CLASS: 'syn-control-set_properties', target: 'main.content_watch.popup.content', map: { label: 'label' } },
                    { _CLASS: 'syn-control-activate', target: 'main.content_watch.popup' }
                ],
                label: dataSignInText
            },
            favorite_button: {
                _CLASS: 'xl-view-watchbutton',
                navobject: focusMouseHover,
                _CONTROL: [
                    controlActiveIfLoggedIn('main.service_favorite', 'main.content_watch.login'),
                    { _CLASS: 'syn-control-activate_on_click' },
                    { _CLASS: 'syn-control-ga_track_event', category: 'watch', action: 'favorite' }
                ],
                _VIEW: {
                    contentcenter: { _CLASS: 'xl-view-text', label: 'Favorite' }
                }
            },
            flag_button: {
                _CLASS: 'xl-view-watchbutton',
                navobject: focusMouseHover,
                _CONTROL: [
                    controlActiveIfLoggedIn('main.content_watch.flag', 'main.content_watch.login'),
                    { _CLASS: 'syn-control-activate_on_click' },
                    { _CLASS: 'syn-control-ga_track_event', category: 'watch', action: 'flag' }
                ],
                _VIEW: {
                    contentcenter: { _CLASS: 'xl-view-text', label: 'Flag' }
                }
            },
            share_button: {
                _CLASS: 'xl-view-watchbutton',
                navobject: focusMouseHover,
                _CONTROL: [
                    controlActiveIfLoggedIn('main.content_watch.sharepopup', 'main.content_watch.login'),
                    { _CLASS: 'syn-control-activate_on_click' },
                    { _CLASS: 'syn-control-ga_track_event', category: 'watch', action: 'share' }
                ],
                _VIEW: {
                    contentcenter: { _CLASS: 'xl-view-text', label: 'Share' }
                }
            },
            login_button: {
                _CLASS: 'xl-view-hidden'
            },
            goback_button: {
                _CLASS: 'xl-view-button',
                navobject: focusNewHover,
                _CONTROL: [
                    { _CLASS: 'syn-control-activate_on_click', target: 'main.loader' }
                ],
                _VIEW: {
                    vicon: generateImage('http://s.ytimg.com/yt/img/syn/xl-leftarrow-vfl92884.png', '', 0.653846, 0.315, 'min'),
                    viconover: generateImage('http://s.ytimg.com/yt/img/syn/xl-leftarrow-hover-vfl91176.png', '', 0.653846, 0.315, 'min')
                }
            }
        }
    };
};

var generateFlag = function () {
    return {
        _CLASS: 'xl-view-watchdialog',
        reason: '',
        _CONTROL: [
            { _CLASS: 'syn-control-set_visible' },
            { _CLASS: 'syn-control-navigate' },
            { _CLASS: 'syn-control-set_style', style: 'selected', target: 'main.content_watch.flag_button' },
            { _CLASS: 'syn-control-activate', target: viewFlagReasons },
            { _CLASS: 'syn-control-set_focus_on_event', target: 'main.content_watch.flag.cancel_button' },
            { _CLASS: 'syn-control-set_properties', event: 'SYN_EVENT_DEACTIVATE', target: 'main.service_flag', map: { reason: 'reason' } }
        ],
        _VIEW: {
            description: {
                _CLASS: 'xl-view-wrappingtext',
                label: 'Please select a reason.'
            },
            reason1: generateFlaggingReason(
                'Sexual Content',
                'P'
            ),
            reason2: generateFlaggingReason(
                'Violent or Repulsive Content',
                'G'
            ),
            reason3: generateFlaggingReason(
                'Hateful or Abusive Content',
                'R'
            ),
            reason4: generateFlaggingReason(
                'Harmful Dangerous Acts',
                'X'
            ),
            reason5: generateFlaggingReason(
                'Spam',
                'Z'
            ),
            reason6: generateFlaggingReason(
                'Infringes My Rights',
                'Y'
            ),
            ok_button: {
                _CLASS: 'xl-view-button',
                navobject: focusMouseHover,
                _CONTROL: [
                    { _CLASS: 'syn-control-activate_on_click', target: '.check_infringe' }
                ],
                _VIEW: {
                    contentcenter: { _CLASS: 'xl-view-text', label: 'Flag' },
                    check_infringe: {
                        _CLASS: 'xl-view-hidden',
                        _CONTROL: {
                            _CLASS: 'syn-control-switch',
                            source: 'main.service_flag',
                            key: 'reason',
                            activate: {
                                'Y': 'main.content_watch.infringe',
                                'default': 'main.service_flag'
                            }
                        }
                    }
                }
            },
            cancel_button: {
                _CLASS: 'xl-view-button',
                navobject: focusMouseHover,
                _CONTROL: [
                    { _CLASS: 'syn-control-activate_on_click', target: 'main.content_watch.info' }
                ],
                _VIEW: {
                    contentcenter: { _CLASS: 'xl-view-text', label: 'Cancel' }
                }
            }
        }
    };
};

var generateInfringe = function () {
    return {
        _CLASS: 'xl-view-watchdialog',
        _CONTROL: [
            { _CLASS: 'syn-control-set_visible' },
            { _CLASS: 'syn-control-navigate' },
            { _CLASS: 'syn-control-set_focus_on_event', target: 'main.content_watch.infringe.cancel_button' },
            { _CLASS: 'syn-control-set_style', style: 'selected', target: 'main.content_watch.flag_button' }
        ],
        _VIEW: {
            description: {
                _CLASS: 'xl-view-wrappingtext',
                label: 'This video infringes my rights.'
            },
            title1: {
                _CLASS: 'xl-view-text',
                label: 'Invades my privacy'
            },
            content1: {
                _CLASS: 'xl-view-wrappingtext',
                label: 'To report privacy violations please see' + ' http://www.youtube.com/t/safety'
            },
            title2: {
                _CLASS: 'xl-view-text',
                label: 'Infringes my copyright'
            },
            content2: {
                _CLASS: 'xl-view-wrappingtext',
                label: 'To report copyright infringement please see' + ' http://www.youtube.com/t/copyright_notice'
            },
            cancel_button: {
                _CLASS: 'xl-view-button',
                navobject: focusMouseHover,
                _CONTROL: [
                    { _CLASS: 'syn-control-activate_on_click', target: 'main.content_watch.info' }
                ],
                _VIEW: {
                    contentcenter: { _CLASS: 'xl-view-text', label: 'Close' }
                }
            }
        }
    };
};

//-----------------------------------------------------------------------//
// Pages
//-----------------------------------------------------------------------//
var pageBrowse = function (name, data, target, firstelement) {
    return {
        _CLASS: 'xl-view-hidden',
        name: name,
        _CONTROL: [
            { _CLASS: 'syn-control-link', target: data },
            { _CLASS: 'syn-control-activate', target: target },
            { _CLASS: 'syn-control-history' },
            { _CLASS: 'syn-control-ga_track_pageview', name: '/' + name },
            { _CLASS: 'syn-control-set_properties', map: { 'config.startpage': 'name' }, target: 'main' },
            { _CLASS: 'syn-control-set_focus_on_event', target: firstelement }
        ]
    };
};

var page = function (name, target, firstelement) {
    return {
        _CLASS: 'xl-view-hidden',
        name: name,
        firstelement: firstelement,
        _CONTROL: [
            { _CLASS: 'syn-control-activate', target: target },
            { _CLASS: 'syn-control-history' },
            { _CLASS: 'syn-control-ga_track_pageview', name: '/' + name },
            { _CLASS: 'syn-control-set_properties', map: { 'config.startpage': 'name' }, target: 'main' },
            { _CLASS: 'syn-control-set_focus_on_event', target: firstelement }
        ]
    };
};

var pageChannel = function (name, target, firstelement) {
    return {
        _CLASS: 'xl-view-hidden',
        name: name,
        firstelement: firstelement,
        _CONTROL: [
            { _CLASS: 'syn-control-activate', target: target },
            { _CLASS: 'syn-control-history' },
            { _CLASS: 'syn-control-link', target: 'main.service_channel' },
            { _CLASS: 'syn-control-ga_track_pageview', name: '/' + name },
            { _CLASS: 'syn-control-set_focus_on_event', target: firstelement }
        ]
    };
};


var pageWatch = function (name, target, firstelement) {
    return {
        _CLASS: 'xl-view-hidden',
        firstelement: firstelement,
        _CONTROL: [
            { _CLASS: 'syn-control-activate', target: target },
            { _CLASS: 'syn-control-history' },
            { _CLASS: 'syn-control-ga_track_pageview', name: '/' + name },
            { _CLASS: 'syn-control-set_focus_on_event', target: firstelement }
        ]
    };
};

var generateBrowseContent = function () {
    return {
        _CLASS: 'xl-view-default',
        _CONTROL: [
            { _CLASS: 'syn-control-set_visible' },
            { _CLASS: 'syn-control-navigate' }
        ],
        _VIEW: {
            notabs: { _CLASS: 'xl-view-default' },
            topratedtabs: {
                _CLASS: 'xl-view-default',
                _CONTROL: [{ _CLASS: 'syn-control-set_visible' }],
                _VIEW: {
                    today: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: ['.', 'main.page-7'] },
                            { _CLASS: 'syn-control-set_style', style: 'selected' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'Today' }
                        }
                    },
                    thisweek: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: ['.', 'main.page-8'] },
                            { _CLASS: 'syn-control-set_style', style: 'selected' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'This Week' }
                        }
                    },
                    alltime: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: ['.', 'main.page-10'] },
                            { _CLASS: 'syn-control-set_style', style: 'selected' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'All Time' }
                        }
                    }
                }
            },
            channeltabs: {
                _CLASS: 'xl-view-default',
                _CONTROL: [{ _CLASS: 'syn-control-set_visible' }],
                _VIEW: {
                    channellist1: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: ['.', 'main.page-25'] },
                            { _CLASS: 'syn-control-set_style', style: 'selected' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'Videos' }
                        }
                    },
                    channellist2: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: ['.', 'main.page-26'] },
                            { _CLASS: 'syn-control-set_style', style: 'selected' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'Favorites' }
                        }
                    },
                    channellist3: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: ['.', 'main.page-27'] },
                            { _CLASS: 'syn-control-set_style', style: 'selected' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'Playlists' }
                        }
                    }
                }
            },
            mostviewedtabs: {
                _CLASS: 'xl-view-default',
                _CONTROL: [{ _CLASS: 'syn-control-set_visible' }],
                _VIEW: {
                    today: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: ['.', 'main.page-3'] },
                            { _CLASS: 'syn-control-set_style', style: 'selected' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'Today' }
                        }
                    },
                    thisweek: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: ['.', 'main.page-4'] },
                            { _CLASS: 'syn-control-set_style', style: 'selected' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'This Week' }
                        }
                    },
                    alltime: {
                        _CLASS: 'xl-view-button',
                        navobject: focusMouseHover,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click', target: ['.', 'main.page-6'] },
                            { _CLASS: 'syn-control-set_style', style: 'selected' }
                        ],
                        _VIEW: {
                            contentcenter: { _CLASS: 'xl-view-text', label: 'All Time' }
                        }
                    }
                }
            },
            searchtabs: {
                _CLASS: 'xl-view-default',
                _CONTROL: [{ _CLASS: 'syn-control-set_visible' }],
                _VIEW: {
                    title: { _CLASS: 'xl-view-text', label: 'Search Results' }
                }
            },
            downbutton: {
                _CLASS: 'xl-view-button',
                navobject: focusPaddleOver,
                _CONTROL: [
                    { _CLASS: 'syn-control-activate_on_click' }
                ],
                _VIEW: {
                    paddlecontent: generateImage('http://s.ytimg.com/yt/img/syn/xl-downarrow-vfl92884.png', '', 1.5, 1.1953125, 'min'),
                    paddlecontentover: generateImage('http://s.ytimg.com/yt/img/syn/xl-downarrow-hover-vfl91176.png', '', 1.5, 1.1953125, 'min')
                }
            },
            upbutton: {
                _CLASS: 'xl-view-button',
                navobject: focusPaddleOver,
                _CONTROL: [
                    { _CLASS: 'syn-control-activate_on_click' }
                ],
                _VIEW: {
                    paddlecontent: generateImage('http://s.ytimg.com/yt/img/syn/xl-uparrow-vfl92884.png', '', 1.457142, 1.1953125, 'min'),
                    paddlecontentover: generateImage('http://s.ytimg.com/yt/img/syn/xl-uparrow-hover-vfl91176.png', '', 1.457142, 1.1953125, 'min')
                }
            },
            counter: generatePageCount(),
            videos: {
                _CLASS: 'xl-view-default',
                _VIEW: {
                    popup: {
                        _CLASS: 'xl-view-popup',
                        _CONTROL: { _CLASS: 'syn-control-set_visible' },
                        _VIEW: {
                            content: { _CLASS: 'xl-view-wrappingtext', label_key: 'status', label_alt: 'No Videos Found' }
                        }
                    },
                    videolist: [
                        generateVideoItem(),
                        generateVideoItem(),
                        generateVideoItem(),
                        generateVideoItem(),
                        generateVideoItem()
                    ]
                }
            }
        }
    };
};

//-----------------------------------------------------------------------//
// Service Interfaces
//-----------------------------------------------------------------------//
var serviceBrowse = function (cache, uri, novideomessage, opt_feed) {
    return {
        _CLASS: 'xl-view-hidden',
        status: novideomessage,
        cache: cache,
        _CONTROL: [{
            _CLASS: 'xl-control-page',
            prev: 'main.browse_site.video-container.upbutton',
            next: 'main.browse_site.video-container.downbutton',
            counter: ['main.browse_site.video-container.counter'],
            target: 'main.browse_site.video-container.videos.videolist',
            activate_on_no_video: 'main.browse_site.video-container.videos.popup',
            start: 1,
            blocksize: 3,
            loadahead: 2,
            delay: 500,
            uri: uri,
            pending: dataPending,
            error: dataVideoBroken,
            no_item: dataNoVideo
        },
        { _CLASS: 'syn-control-event_on_event', target: 'main.browse_site.video-container.videos.popup', map: { SYN_EVENT_ACTIVATE: 'SYN_EVENT_DEACTIVATE' } },
        { _CLASS: 'syn-control-set_properties', target: 'main.browse_site.video-container.videos.popup.content', map: { status: 'status' } }
        ],
        feed: opt_feed
    };
};


var servicePlaylistItem = function (cache, novideomessage) {
    return {
        _CLASS: 'xl-view-hidden',
        status: novideomessage,
        cache: cache,
        _CONTROL: [{
            _CLASS: 'syn-control-set_properties',
            source: 'main.page-12',
            map: { playlist_id: 'video.playlist_id' }
        }, {
            _CLASS: 'xl-control-page',
            target: ['.'],
            activate_on_success: '.success',
            start: 1,
            blocksize: 3,
            loadahead: 2,
            delay: 500,
            uri: 'console_playlist',
            pending: dataPending,
            error: dataVideoBroken,
            no_item: dataNoVideo
        },
        { _CLASS: 'syn-control-event_on_event', target: 'main.browse_site.video-container.videos.popup', map: { SYN_EVENT_ACTIVATE: 'SYN_EVENT_DEACTIVATE' } },
        { _CLASS: 'syn-control-set_properties', target: 'main.browse_site.video-container.videos.popup.content', map: { status: 'status' } }
        ],
        _VIEW: {
            success: {
                _CLASS: 'yytv-view-hidden',
                _CONTROL: {
                    _CLASS: 'syn-control-event_on_event',
                    target: 'main.service_watch',
                    map: { SYN_EVENT_ACTIVATE: 'activate_playlist' }
                }
            }
        }
    };
};

var serviceRecommended = function (cache, url, novideomessage) {
    return {
        _CLASS: 'xl-view-hidden',
        status: novideomessage,
        cache: cache,
        _CONTROL: [{
            _CLASS: 'syn-control-set_properties',
            source: 'main',
            map: { user: 'config.user' }
        }, {
            _CLASS: 'xl-control-page',
            prev: 'main.browse_site.video-container.upbutton',
            next: 'main.browse_site.video-container.downbutton',
            counter: ['main.browse_site.video-container.counter'],
            target: 'main.browse_site.video-container.videos.videolist',
            activate_on_no_video: 'main.browse_site.video-container.videos.popup',
            start: 1,
            blocksize: 3,
            loadahead: 2,
            delay: 500,
            uri: url,
            pending: dataPending,
            error: dataVideoBroken,
            no_item: dataNoVideo
        },
        { _CLASS: 'syn-control-event_on_event', target: 'main.browse_site.video-container.videos.popup', map: { SYN_EVENT_ACTIVATE: 'SYN_EVENT_DEACTIVATE' } },
        { _CLASS: 'syn-control-set_properties', target: 'main.browse_site.video-container.videos.popup.content', map: { status: 'status' } }
        ]
    };
};


var serviceRelated = function (cache, url) {
    return {
        _CLASS: 'xl-view-hidden',
        cache: cache,
        _CONTROL: [{
            _CLASS: 'syn-control-set_properties',
            source: 'main.service_watch',
            map: { video_id: 'video.video_id' }
        }, {
            _CLASS: 'xl-control-page',
            prev: 'main.content_watch.relatedcontainer.upbutton',
            next: 'main.content_watch.relatedcontainer.downbutton',
            counter: ['main.browse_site.video-container.counter'],
            target: ['main.content_watch.relatedcontainer.related.item1', 'main.content_watch.relatedcontainer.related.item2', 'main.content_watch.relatedcontainer.related.item3', 'main.content_watch.relatedcontainer.related.item4', 'main.content_watch.relatedcontainer.related.item5'],
            start: 1,
            blocksize: 4,
            loadahead: 2,
            delay: 500,
            max: 100,
            uri: url,
            pending: dataPending,
            error: dataVideoBroken,
            no_item: dataNoVideo
        }]
    };
};


var serviceBrowseMyVideos = function (cache, uri, novideomessage) {
    return {
        _CLASS: 'xl-view-hidden',
        cache: cache,
        status: novideomessage,
        _CONTROL: [{
            _CLASS: 'syn-control-set_properties',
            source: 'main',
            map: { user: 'config.user' }
        }, {
            _CLASS: 'xl-control-page',
            prev: 'main.browse_site.video-container.upbutton',
            next: 'main.browse_site.video-container.downbutton',
            counter: ['main.browse_site.video-container.counter'],
            target: 'main.browse_site.video-container.videos.videolist',
            activate_on_no_video: 'main.browse_site.video-container.videos.popup',
            start: 1,
            blocksize: 3,
            loadahead: 2,
            delay: 500,
            max: 100,
            uri: uri,
            pending: dataPending,
            error: dataVideoBroken,
            no_item: dataNoVideo
        },
        { _CLASS: 'syn-control-event_on_event', target: 'main.browse_site.video-container.videos.popup', map: { SYN_EVENT_ACTIVATE: 'SYN_EVENT_DEACTIVATE' } },
        { _CLASS: 'syn-control-set_properties', target: 'main.browse_site.video-container.videos.popup.content', map: { status: 'status' } }
        ]
    };
};


var serviceBrowseUserVideos = function (cache, uri, novideomessage) {
    return {
        _CLASS: 'xl-view-hidden',
        cache: cache,
        status: novideomessage,
        _CONTROL: [{
            _CLASS: 'xl-control-page',
            prev: 'main.browse_site.video-container.upbutton',
            next: 'main.browse_site.video-container.downbutton',
            counter: ['main.browse_site.video-container.counter'],
            target: 'main.browse_site.video-container.videos.videolist',
            activate_on_no_video: 'main.browse_site.video-container.videos.popup',
            start: 1,
            blocksize: 3,
            loadahead: 2,
            delay: 500,
            max: 100,
            uri: uri,
            pending: dataPending,
            error: dataVideoBroken,
            no_item: dataNoVideo
        },
        { _CLASS: 'syn-control-event_on_event', target: 'main.browse_site.video-container.videos.popup', map: { SYN_EVENT_ACTIVATE: 'SYN_EVENT_DEACTIVATE' } },
        { _CLASS: 'syn-control-set_properties', target: 'main.browse_site.video-container.videos.popup.content', map: { status: 'status' } }
        ]
    };
};

var serviceSubscribe = function () {
    return {
        _CLASS: 'xl-view-hidden',
        _CONTROL: [{
            _CLASS: 'xl-control-subscribe',
            type: 'POST',
            uri: 'ajax_subscriptions',
            activate_on_success: 'main.browse_site.channelsub.subscribe.unsubscribebuttoncontainer',
            button: 'main.browse_site.channelsub.subscribe.subscribebuttoncontainer.subscribebutton',
            parameters: 'subscribe_to_user=%s',
            status: 'main.content_watch.popup.content',
            codemap: {
                '-3': 'Please log in',
                '-1': 'Unable to Subscribe',
                '0': 'Subscribed!'
            }
        }]
    };
};

var serviceUnsubscribe = function () {
    return {
        _CLASS: 'xl-view-hidden',
        _CONTROL: [{
            _CLASS: 'xl-control-subscribe',
            type: 'POST',
            uri: 'ajax_subscriptions',
            activate_on_success: 'main.browse_site.channelsub.subscribe.subscribebuttoncontainer',
            button: 'main.browse_site.channelsub.subscribe.unsubscribebuttoncontainer.unsubscribebutton',
            parameters: 'unsubscribe_from_user=%s',
            status: 'main.content_watch.popup.content',
            codemap: {
                '-3': dataSignInText,
                '-1': 'Unable to Subscribe',
                '0': 'Unubscribed!'
            }
        }]
    };
};

var serviceChannel = function () {
    return {
        _CLASS: 'xl-view-hidden',
        _CONTROL: [{
            _CLASS: 'syn-control-set_properties',
            source: 'main.browse_site.channelsub.channelinfo.channelname',
            map: { user: 'user' }
        }, {
            _CLASS: 'xl-control-channel',
            type: 'GET',
            uri: 'console_profile',
            photo: 'main.browse_site.channelsub.channelinfo.channelicon',
            last_log_in: 'main.browse_site.content_channel.channelcontent.lastlogin',
            view_count: 'main.browse_site.content_channel.channelcontent.viewcount',
            signup_date: 'main.browse_site.content_channel.channelcontent.joined',
            total_subscribers: 'main.browse_site.content_channel.channelcontent.subscribers',
            subscribe_container: 'main.browse_site.channelsub.subscribe',
            description: ['main.browse_site.content_channel.channelcontent.description'],
            no_desc: 'User has not entered a description.',
            favorites_button: 'main.browse_site.video-container.channeltabs.channellist2',
            playlists_button: 'main.browse_site.video-container.channeltabs.channellist3',
            parameters: 'user=%s'
        }]
    };
};

var serviceBrowseSearch = function (cache, uri, novideomessage) {
    return {
        _CLASS: 'xl-view-hidden',
        cache: cache,
        status: novideomessage,
        _CONTROL: [
            { _CLASS: 'syn-control-set_properties', source: 'main.page-13', map: { query: 'query' } },
            {
                _CLASS: 'xl-control-page',
                prev: 'main.browse_site.video-container.upbutton',
                next: 'main.browse_site.video-container.downbutton',
                counter: ['main.browse_site.video-container.counter'],
                target: 'main.browse_site.video-container.videos.videolist',
                activate_on_no_video: 'main.browse_site.video-container.videos.popup',
                start: 1,
                blocksize: 3,
                loadahead: 2,
                delay: 500,
                uri: uri,
                pending: dataPending,
                error: dataVideoBroken,
                no_item: dataNoVideo
            },
            { _CLASS: 'syn-control-event_on_event', target: 'main.browse_site.video-container.videos.popup', map: { SYN_EVENT_ACTIVATE: 'SYN_EVENT_DEACTIVATE' } },
            { _CLASS: 'syn-control-set_properties', target: 'main.browse_site.video-container.videos.popup.content', map: { status: 'status' } }
        ]
    };
};

var serviceWatch = function () {
    return {
        _CLASS: 'xl-view-hidden',
        _CONTROL: [{
            _CLASS: 'syn-control-set_properties',
            source: 'main.page-12',
            map: {
                type: 'video.type',
                index: 'video.cache_index',
                source: 'video.cache_source',
                playlist_id: 'video.playlist_id',
                publisher: 'video.publisher'
            }
        }, {
            _CLASS: 'syn-control-event_on_key', map: dataKeyToMediaEventMap
        }, {
            _CLASS: (configuration.playback_mode == 'html' ? 'xl-control-player_html' : 'xl-control-player_flash'),
            player: 'main.player',
            progress_bar: 'main.player.video.controls.progressbarcontainer.progressbar',
            playlist_service: 'main.service_playlist_item',
            player_video: 'main.player.video',
            player_video_properties: {
                url: display.resourceSwfPlayer,
                params: {
                    allowFullScreen: !configuration.player_disable_native_fullscreen,
                    allowScriptAccess: 'always',
                    quality: configuration.player_quality,
                    wmode: configuration.player_wmode,
                    base: display.rootUrl
                },
                variables: {
                    debug: display.debug,
                    disableExternalInterface: configuration.player_disable_external_interface,
                    intervalTime: configuration.player_tick,
                    el: configuration.player_event_label,
                    ps: configuration.player_style_label,
                    vq: display.vq,
                    hd: configuration.playback_hd,
                    enableH264ForFlashLite: configuration.playback_flashlite_h264,
                    activityIdleTime: 2000
                }
            },
            player_bridge: 'main.player.bridge',
            player_bridge_properties: {
                url: display.resourceSwfBridge,
                params: {
                    allowFullScreen: false,
                    allowScriptAccess: 'always',
                    quality: configuration.player_quality,
                    wmode: configuration.player_wmode,
                    bgcolor: display.debug ? '#FF0000' : '#000000'
                },
                variables: {
                    debug: display.debug,
                    resizeWidth: 400
                }
            },
            hotKeyMap: dataKeyToMediaEventMap[0],
            activate_on_video: [
                'main.content_watch.title',
                'main.content_watch.info.rating',
                'main.content_watch.info.views',
                'main.content_watch.info.addedon',
                'main.content_watch.info.info',
                'main.content_watch.info.uploadedbycontainer.contentcenter',
                'main.content_watch.relatedcontainer'
            ],
            activate_on_video_if_active: [
                'main.service_related-1',
                'main.service_related-2'
            ],
            toggleFullscreenCallback: function (fullscreen) {
                if (configuration.resize_on_fullscreen) {
                    var el = document.getElementById('main.content_watch');
                    if (fullscreen) {
                        yt.xl.control.ScaleOnResize.setEnable(false);
                        el.style.visibility = 'hidden';
                    } else {
                        onResize();
                    }
                }
            },
            toggleDelayedFullscreenCallback: function (fullscreen) {
                if (configuration.resize_on_fullscreen) {
                    var el = document.getElementById('main.content_watch');
                    if (!fullscreen) {
                        yt.xl.control.ScaleOnResize.setEnable(true);
                        el.style.visibility = '';
                    }
                }
            },
            delay: 150,
            focus_up: 'main.content_watch.logo',
            focus_down: 'main.content_watch.flag_button',
            focus_left: 'main.content_watch.goback_button',
            focus_right: 'main.content_watch.moreinfo_button'
        }]
    };
};

var serviceFlag = function () {
    return {
        _CLASS: 'xl-view-hidden',
        _CONTROL: [{
            _CLASS: 'syn-control-set_properties',
            source: 'main.service_watch',
            map: { video_id: 'video.video_id' }
        }, {
            _CLASS: 'xl-control-flag',
            type: 'POST',
            uri: 'watch_ajax',
            activate_on_success: ['main.content_watch.moreinfo_button', 'main.content_watch.info', 'main.content_watch.popup'],
            activate_on_failure: 'main.content_watch.popup',
            button: 'main.content_watch.flag.ok_button',
            parameters: 'action_flag_video=1&video_id=%s&reason=%s&sub_reason=4&anno_reason=&anno_sub_reason=',
            status: 'main.content_watch.popup.content',
            codemap: {
                '-6': 'Please select a reason.',
                '-3': dataSignInText,
                '-1': 'Unable to Flag',
                '0': 'Flagged!'
            }
        }]
    };
};

var serviceFavorite = function () {
    return {
        _CLASS: 'xl-view-hidden',
        _CONTROL: [{
            _CLASS: 'syn-control-set_properties',
            source: 'main.service_watch',
            map: { video_id: 'video.video_id' }
        }, {
            _CLASS: 'xl-control-favorite',
            type: 'POST',
            uri: 'favorites',
            activate_on_success: 'main.content_watch.popup',
            activate_on_failure: 'main.content_watch.popup',
            button: 'main.content_watch.favorite_button',
            parameters: 'action_add_favorite=1&video_id=%s',
            status: 'main.content_watch.popup.content',
            codemap: {
                '-3': dataSignInText,
                '-1': 'Favorited!',
                '0': 'Favorited!'
            }
        }]
    };
};

var serviceShare = function () {
    return {
        _CLASS: 'xl-view-hidden',
        _CONTROL: [{
            _CLASS: 'syn-control-set_properties',
            source: 'main.service_watch',
            map: { video_id: 'video.video_id' }
        }, {
            _CLASS: 'xl-control-share',
            type: 'POST',
            uri: 'console_user_share',
            parameters: 'video_id=%s&recipients=%s&message=%s',
            activate_on_success: ['main.content_watch.moreinfo_button', 'main.content_watch.info', 'main.content_watch.popup'],
            activate_on_failure: 'main.content_watch.popup',
            button: 'main.content_watch.sharepopup.ok_button',
            email: 'main.content_watch.sharepopup.emails',
            message: 'main.content_watch.sharepopup.message',
            status: 'main.content_watch.popup.content',
            codemap: {
                '-3': dataSignInText,
                '-1': 'Unable to Share',
                '0': 'Shared!'
            }
        }]
    };
};

var serviceLogout = function () {
    return {
        _CLASS: 'xl-view-hidden',
        _CONTROL: {
            _CLASS: 'xl-control-logout',
            type: 'POST',
            uri: 'console_login',
            parameters: 'action_logout=1',
            clear_cache: dataAllCache,
            activate_on_success: ['.success', 'main.page-14'],
            button: 'main.browse_site.browse-buttons.logout-button.button'
        },
        _VIEW: {
            success: {
                _CLASS: 'xl-view-hidden',
                _CONTROL: [{
                    _CLASS: 'syn-control-set_properties',
                    source: 'main',
                    target: 'main.browse_site.browse-buttons.loggedinbutton.button.text4',
                    map: { label: 'config.user' }
                }, {
                    _CLASS: 'syn-control-set_properties',
                    source: '..',
                    target: ['main.content_watch.sharepopup.emails', 'main.content_watch.sharepopup.message'],
                    map: {
                        set: 'set'
                    }
                }, {
                    _CLASS: 'syn-control-redirect', url: display.gaiaLogoutUrl
                }]
            }
        },
        set: ''
    };
};

var generateChannelContent = function () {
    return {
        _CLASS: 'xl-view-default',
        _CONTROL: [
            { _CLASS: 'syn-control-set_visible' },
            { _CLASS: 'syn-control-navigate' }
        ],
        _VIEW: {
            channelinfo: {
                _CLASS: 'xl-view-button',
                navobject: focusMouseHover,
                _CONTROL: [
                    { _CLASS: 'syn-control-activate_on_click', target: 'main.page-61' },
                    { _CLASS: 'syn-control-set_style', style: 'selected' }
                ],
                _VIEW: {
                    channelicon: generateImage(null, null, 0, 0.717022, 'min'),
                    channelname: { _CLASS: 'xl-view-text', label_key: 'user' }
                }
            },
            videos_button: {
                _CLASS: 'xl-view-button',
                navobject: focusMouseHover,
                _CONTROL: [
                    { _CLASS: 'syn-control-activate_on_click', target: 'main.page-25' },
                    { _CLASS: 'syn-control-set_style', style: 'selected' }
                ],
                _VIEW: {
                    text4: {
                        _CLASS: 'xl-view-text',
                        label: 'Videos'
                    }
                }
            },
            subscribe: {
                _CLASS: 'xl-view-default',
                _CONTROL: [{
                    _CLASS: 'syn-control-active_set',
                    target: ['main.browse_site.channelsub.subscribe.unsubscribebuttoncontainer', 'main.browse_site.channelsub.subscribe.subscribebuttoncontainer']
                }, {
                    _CLASS: 'syn-control-check_properties',
                    every: 'is_subscribed',
                    source: '.',
                    activate_on_false: 'main.browse_site.channelsub.subscribe.subscribebuttoncontainer',
                    activate_on_true: 'main.browse_site.channelsub.subscribe.unsubscribebuttoncontainer'
                }, { _CLASS: 'syn-control-set_visible' }],
                _VIEW: {
                    subscribebuttoncontainer: {
                        _CLASS: 'xl-view-default',
                        _CONTROL: [{ _CLASS: 'syn-control-set_visible' }],
                        _VIEW: {
                            subscribebutton: {
                                _CLASS: 'xl-view-button',
                                navobject: focusMouseHover,
                                _CONTROL: [
                                    { _CLASS: 'syn-control-set_properties', source: 'main.browse_site.channelsub.channelinfo.channelname', target: 'main.service_subscribe', map: { channel_id: 'user' } },
                                    { _CLASS: 'syn-control-activate_on_click', target: ['.', 'main.service_subscribe'] }],
                                _VIEW: {
                                    text4: { _CLASS: 'xl-view-text', label: 'Subscribe' }
                                }
                            }
                        }
                    },
                    unsubscribebuttoncontainer: {
                        _CLASS: 'xl-view-default',
                        _CONTROL: [{ _CLASS: 'syn-control-set_visible' }],
                        _VIEW: {
                            unsubscribebutton: {
                                _CLASS: 'xl-view-button',
                                navobject: focusMouseHover,
                                _CONTROL: [
                                    { _CLASS: 'syn-control-set_properties', source: 'main.browse_site.channelsub.channelinfo.channelname', target: 'main.service_unsubscribe', map: { channel_id: 'user' } },
                                    { _CLASS: 'syn-control-activate_on_click', target: ['.', 'main.service_unsubscribe'] }],
                                _VIEW: {
                                    text4: { _CLASS: 'xl-view-text', label: 'Unsubscribe' }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};

var playerVideo = function () {

    if (configuration.playback_mode != 'html') {
        return {
            _CLASS: 'xl-view-default',
            _CONTROL: { _CLASS: 'syn-control-navigate' },
            navobject: focusPlayerOver
        };
    }

    return {
        _CLASS: 'xl-view-default',
        _CONTROL: [{
            _CLASS: 'syn-control-event_on_event',
            map: { SYN_EVENT_MOUSEIDLE: 'SYN_EVENT_DEACTIVATE', SYN_EVENT_MOUSEACTIVE: 'SYN_EVENT_ACTIVATE' },
            target: 'main.player.video.controls'
        }],
        _VIEW: {
            controls: {
                _CLASS: 'xl-view-default',
                _VIEW: {
                    progressbarcontainer: {
                        _CLASS: 'xl-view-default',
                        _VIEW: {
                            progressbar: {
                                _CLASS: 'xl-view-default'
                            }
                        }
                    },
                    playbutton: generateImage('http://s.ytimg.com/yt/img/syn/xl-playbutton-vfl82372.png', '', 1, 0.703125, 'min', [
                        { _CLASS: 'syn-control-activate_on_click' },
                        { _CLASS: 'syn-control-event_on_event', target: 'main.service_watch', map: { SYN_EVENT_ACTIVATE: 'SYN_EVENT_PLAY' } }
                    ]),
                    pausebutton: generateImage('http://s.ytimg.com/yt/img/syn/xl-pausebutton-vfl82372.png', '', 1, 0.703125, 'min', [
                        { _CLASS: 'syn-control-activate_on_click' },
                        { _CLASS: 'syn-control-event_on_event', target: 'main.service_watch', map: { SYN_EVENT_ACTIVATE: 'SYN_EVENT_PAUSE' } }
                    ]),
                    rwbutton: generateImage('http://s.ytimg.com/yt/img/syn/xl-rwbutton-vfl82372.png', '', 1, 0.703125, 'min', [
                        { _CLASS: 'syn-control-activate_on_click' },
                        {
                            _CLASS: 'syn-control-event_on_event', target: 'main.service_watch', map: {
                                mousedown: 'SYN_EVENT_REWIND',
                                mouseup: 'SYN_EVENT_PLAY',
                                keydown: 'SYN_EVENT_REWIND',
                                keyup: 'SYN_EVENT_PLAY'
                            }
                        }
                    ]),
                    ffbutton: generateImage('http://s.ytimg.com/yt/img/syn/xl-ffbutton-vfl82372.png', '', 1, 0.703125, 'min', [
                        { _CLASS: 'syn-control-activate_on_click' },
                        {
                            _CLASS: 'syn-control-event_on_event', target: 'main.service_watch', map: {
                                mousedown: 'SYN_EVENT_FORWARD',
                                mouseup: 'SYN_EVENT_PLAY',
                                keydown: 'SYN_EVENT_FORWARD',
                                keyup: 'SYN_EVENT_PLAY'
                            }
                        }
                    ]),
                    nextbutton: generateImage('http://s.ytimg.com/yt/img/syn/xl-nextbutton-vfl82372.png', '', 1, 0.703125, 'min', [
                        { _CLASS: 'syn-control-activate_on_click' },
                        { _CLASS: 'syn-control-event_on_event', target: 'main.service_watch', map: { SYN_EVENT_ACTIVATE: 'SYN_EVENT_NEXT_TRACK' } }
                    ]),
                    prevbutton: generateImage('http://s.ytimg.com/yt/img/syn/xl-prevbutton-vfl82372.png', '', 1, 0.703125, 'min', [
                        { _CLASS: 'syn-control-activate_on_click' },
                        { _CLASS: 'syn-control-event_on_event', target: 'main.service_watch', map: { SYN_EVENT_ACTIVATE: 'SYN_EVENT_PREV_TRACK' } }
                    ]),
                    fsbutton: generateImage('http://s.ytimg.com/yt/img/syn/xl-fsbutton-vfl82372.png', '', 1, 0.703125, 'min', [
                        { _CLASS: 'syn-control-activate_on_click' },
                        { _CLASS: 'syn-control-event_on_event', target: 'main.service_watch', map: { SYN_EVENT_ACTIVATE: 'SYN_EVENT_FULLSCREEN' } }
                    ])
                }
            }
        }
    }
};

//-----------------------------------------------------------------------//
// Message window
//-----------------------------------------------------------------------//
var contentMessage = function () {
    return {
        _CLASS: 'xl-view-message',
        _VIEW: {
            text: {
                _CLASS: 'xl-view-wrappingtext'
            },
            ok: {
                _CLASS: 'xl-view-button',
                navobject: focusMouseHover,
                _CONTROL: [{
                    _CLASS: 'syn-control-activate_on_click'
                }, {
                    _CLASS: 'syn-control-deactivate',
                    target: ['main.popup_message', 'main.popup_related_message']
                }],
                _VIEW: {
                    contentcenter: {
                        _CLASS: 'xl-view-text',
                        label: 'Ok'
                    }
                }
            }
        }
    };
};

var generateMenuItem = function (alwaysVisible, clickTarget, viewSubmenuItems, label, opt_toplevel) {

    var buttonControls = [
        { _CLASS: 'syn-control-activate_on_click', target: clickTarget },
        { _CLASS: 'syn-control-set_style', style: 'selected' }
    ];
    if (viewSubmenuItems) {
        buttonControls.push({ _CLASS: 'syn-control-link', target: viewSubmenuItems });
    }

    var menuControls = [];
    if (!alwaysVisible) {
        menuControls.push({ _CLASS: 'syn-control-set_visible' });
    }

    return {
        _CLASS: opt_toplevel ? 'xl-view-menuitem' : 'xl-view-submenuitem',
        _CONTROL: menuControls,
        _VIEW: {
            button: {
                _CLASS: 'xl-view-button',
                _CONTROL: buttonControls,
                navobject: focusMouseHover,
                _VIEW: {
                    text4: { _CLASS: 'xl-view-text', label: label }
                }
            }
        }
    };
};

var generatePageMoreFeed = function (feed, service, opt_tab, opt_tabitem) {
    if (opt_tab) {
        return pageBrowse(feed, service, [
            'main.browse_site.video-container',
            'main.browse_site.browse-buttons.more-videos.button',
            'main.browse_site.browse-buttons.browse-videos.button',
            'main.browse_site.browse-buttons',
            opt_tabitem, opt_tab,
            'main.browse_site'], 'main.browse_site.content_browsemore.contentwindow.countries.v0');
    } else {
        return pageBrowse(feed, service, [
            'main.browse_site.video-container',
            'main.browse_site.browse-buttons.more-videos.button',
            'main.browse_site.browse-buttons.browse-videos.button',
            'main.browse_site.browse-buttons',
            'main.browse_site.video-container.notabs',
            'main.browse_site'], 'main.browse_site.content_browsemore.contentwindow.countries.v0');
    }
};

var generateDebug = function () {
    if (display.debug) {
        return {
            _CLASS: 'xl-view-text',
            _CONTROL: { _CLASS: 'syn-control-debug', maxFrameRate: 30 }
        };
    } else {
        return { _CLASS: 'xl-view-hidden' };
    }
};

var genDNA = function () {
    var dna = {
        _CLASS: 'xl-view-site',
        _CONTROL: [
            { _CLASS: 'syn-control-active_set', target: viewSubmenuBrowseButtons },
            { _CLASS: 'syn-control-active_set', target: viewSubmenuAccountButtons },
            { _CLASS: 'syn-control-active_set', target: viewMenuButtons },
            { _CLASS: 'syn-control-active_set', target: viewTabsTopRated },
            { _CLASS: 'syn-control-active_set', target: viewTabsMostViewed },
            { _CLASS: 'syn-control-active_set', target: viewServices },
            { _CLASS: 'syn-control-active_set', target: viewHomePageContent },
            { _CLASS: 'syn-control-active_set', target: viewMainPage },
            { _CLASS: 'syn-control-active_set', target: viewTabsChannel },
            { _CLASS: 'syn-control-active_set', target: viewTabSet },
            { _CLASS: 'syn-control-active_set', target: viewWatchContent },
            { _CLASS: 'syn-control-active_set', target: 'main.page' },
            { _CLASS: 'syn-control-active_set', target: viewLoginSet },
            { _CLASS: 'syn-control-active_set', target: viewWatchButtons },
            { _CLASS: 'syn-control-active_set', target: viewHomePageMenu },
            { _CLASS: 'syn-control-active_set', target: viewBackButton },
            { _CLASS: 'syn-control-active_set', target: viewChannelButtons },
            { _CLASS: 'syn-control-activate', target: ['main.loader'] },
            { _CLASS: 'syn-control-on_event', map: { resize: onResize } },
            {
                _CLASS: 'syn-control-check_properties',
                source: 'main',
                every: 'config.user',
                activate_on_true: ['main.browse_site.browse-buttons.loggedinbutton', 'main.check_loggedin.show_recommended'],
                activate_on_false: ['main.browse_site.browse-buttons.loginbutton', 'main.check_loggedin.show_featured']
            }
        ],
        _VIEW: {
            debug: generateDebug(),
            background: {
                _CLASS: 'xl-view-image',
                _CONTROL: [
                    {
                        _CLASS: 'xl-control-scale_on_resize',
                        innerAspectRatio: 2.080808,
                        outerAspectRatio: 1.563873,
                        center: true,
                        fit: 'max'
                    }],
                image: 'http://s.ytimg.com/yt/img/syn/xl-background-vfl91176.png'
            },
            popup_related_message: {
                _CLASS: 'xl-view-popup',
                _CONTROL: [
                    { _CLASS: 'syn-control-set_visible' },
                    { _CLASS: 'syn-control-set_focus_on_event', target: 'main.popup_related_message.content.ok' }
                ],
                _VIEW: {
                    content: contentMessage()
                }
            },
            popup_message: {
                _CLASS: 'xl-view-popup',
                _CONTROL: [
                    { _CLASS: 'syn-control-set_visible' },
                    { _CLASS: 'syn-control-set_focus_on_event', target: 'main.popup_message.content.ok' }
                ],
                _VIEW: {
                    content: contentMessage()
                }
            },
            check_restricted: {
                _CLASS: 'xl-view-hidden',
                _CONTROL: {
                    _CLASS: 'syn-control-check_properties',
                    every: 'video.restricted',
                    activate_on_false: 'main.page-12',
                    activate_on_true: ['main.on_restricted', 'main.popup_message']
                }
            },
            check_loggedin: {
                _CLASS: 'xl-view-hidden',
                _VIEW: {
                    show_recommended: {
                        _CLASS: 'xl-view-hidden',
                        _CONTROL: { _CLASS: 'syn-control-set_visible', target: 'main.browse_site.browse-buttons.menu-container.recommended-videos' }
                    },
                    show_featured: {
                        _CLASS: 'xl-view-hidden',
                        _CONTROL: { _CLASS: 'syn-control-set_visible', target: 'main.browse_site.browse-buttons.menu-container.featured-videos' }
                    }
                }
            },
            on_restricted: {
                _CLASS: 'xl-view-hidden',
                _CONTROL: {
                    _CLASS: 'syn-control-set_properties',
                    target: ['main.popup_message.content.text', 'main.popup_related_message.content.text'],
                    map: { label: 'video.restricted' },
                    transform: {
                        '1': 'This video is unavailable.',
                        '30': 'This video is no longer available due to a copyright claim.',
                        '31': 'This video is a duplicate of a previously uploaded video.',
                        '32': 'This video has been removed due to terms of use violation.',
                        '33': 'This video has been removed by the user.',
                        '34': 'This video is unavailable.',
                        '35': 'This video is private.',
                        '81': 'This video is not available on this device.',
                        '82': 'This video is not available for your region.',
                        '83': 'This video is age-restricted.  Please sign in to confirm your age.',
                        '84': 'This playlist does not appear to contain videos without playback restrictions.',
                        '85': 'This video is unavailable.',
                        '86': 'This video is unavailable.'
                    }
                }
            },
            loader: {
                _CLASS: 'xl-view-hidden',
                _CONTROL: {
                    _CLASS: 'syn-control-switch',
                    key: 'config.startpage',
                    source: 'main',
                    activate: dataPageMap
                }
            },
            player: {
                _CLASS: 'xl-view-player',
                _VIEW: {
                    bridge: {
                        _CLASS: 'xl-view-default'
                    },
                    video: playerVideo()
                }
            },
            popup: {
                _CLASS: 'xl-view-popup',
                _CONTROL: { _CLASS: 'syn-control-set_visible', mode: 'message', delay_out: 5000 },
                _VIEW: {
                    content: { _CLASS: 'xl-view-wrappingtext', label: '' }
                }
            },
            long_popup: {
                _CLASS: 'xl-view-popup',
                _CONTROL: { _CLASS: 'syn-control-set_visible' },
                _VIEW: {
                    full_content: { _CLASS: 'xl-view-wrappingtext', label: '' },
                    ok_button: {
                        _CLASS: 'xl-view-button',
                        _CONTROL: [{
                            _CLASS: 'syn-control-activate_on_click'
                        }, {
                            _CLASS: 'syn-control-deactivate',
                            target: ['main.long_popup']
                        }],
                        _VIEW: {
                            contentcenter: {
                                _CLASS: 'xl-view-text',
                                label: 'Ok'
                            }
                        }
                    }
                }
            },
            browse_site: {
                _CLASS: 'xl-view-default',
                _CONTROL: [
                    { _CLASS: 'syn-control-deactivate', target: viewWatchContent },
                    { _CLASS: 'syn-control-set_visible' },
                    { _CLASS: 'syn-control-navigate' }
                ],
                _VIEW: {
                    logo: generateImage('http://s.ytimg.com/yt/img/syn/xl-logo-sm-vfl92884.png', '', 2.479452, 2.330097, 'min', [
                        { _CLASS: 'syn-control-activate_on_click', target: 'main.page-1' }
                    ]),
                    classiclink: {
                        _CLASS: 'xl-view-text',
                        navobject: focusLinkOver,
                        _CONTROL: [
                            { _CLASS: 'syn-control-activate_on_click' },
                            { _CLASS: 'syn-control-redirect', url: display.classicUrl }
                        ],
                        label: 'View Standard Version'
                    },
                    'video-container': generateBrowseContent(),
                    search_box: {
                        _CLASS: 'xl-view-default',
                        _VIEW: {
                            search_input: generateSearchBox(['main.browse_site.content_search.search.input.inputbox', 'main.content_watch.search_box.search_input']),
                            search_button: {
                                _CLASS: 'xl-view-button',
                                navobject: focusMouseHover,
                                _CONTROL: [
                                    { _CLASS: 'syn-control-activate_on_click', target: 'main.browse_site.search_box.search_input' }
                                ],
                                _VIEW: {
                                    content: {
                                        _CLASS: 'xl-view-iconbuttoncontent',
                                        _VIEW: {
                                            icon: generateImage('http://s.ytimg.com/yt/img/syn/xl-search_icon-vfl92884.png', '', 1, 1.219428, 'min')
                                        }
                                    }
                                }
                            }
                        }
                    },
                    gobackcontainer: {
                        _CLASS: 'xl-view-default',
                        _CONTROL: [{ _CLASS: 'syn-control-set_visible' }],
                        _VIEW: {
                            goback_button: {
                                _CLASS: 'xl-view-button',
                                navobject: focusNewHover,
                                _CONTROL: [
                                    { _CLASS: 'syn-control-activate_on_click', target: 'main.loader' }
                                ],
                                _VIEW: {
                                    vicon: { _CLASS: 'xl-view-image', image: 'http://s.ytimg.com/yt/img/syn/xl-leftarrow-vfl92884.png' },
                                    viconover: { _CLASS: 'xl-view-image', image: 'http://s.ytimg.com/yt/img/syn/xl-leftarrow-hover-vfl91176.png' }
                                }
                            }
                        }
                    },
                    channelsub: generateChannelContent(),
                    'browse-buttons': {
                        _CLASS: 'xl-view-default',
                        _CONTROL: [
                            { _CLASS: 'syn-control-set_visible' },
                            { _CLASS: 'syn-control-navigate' }
                        ],
                        _VIEW: {
                            'browse-videos': generateMenuItem(true, 'main.page-1', viewSubmenuBrowse,
                                'Videos',
                                true),
                            'menu-container': {
                                _CLASS: 'xl-view-submenuitem',
                                _CONTROL: { _CLASS: 'syn-control-set_visible' },
                                _VIEW: {
                                    'recommended-videos': {
                                        _CLASS: 'xl-view-button',
                                        navobject: focusMouseHover,
                                        _CONTROL: [
                                            { _CLASS: 'syn-control-activate_on_click', target: 'main.page-62' },
                                            { _CLASS: 'syn-control-set_style', style: 'selected' }
                                        ],
                                        _VIEW: {
                                            text4: { _CLASS: 'xl-view-text', label: 'Recommended' }
                                        }
                                    },
                                    'featured-videos': {
                                        _CLASS: 'xl-view-button',
                                        navobject: focusMouseHover,
                                        _CONTROL: [
                                            { _CLASS: 'syn-control-activate_on_click', target: 'main.page-1' },
                                            { _CLASS: 'syn-control-set_style', style: 'selected' }
                                        ],
                                        _VIEW: {
                                            text4: { _CLASS: 'xl-view-text', label: 'Spotlight' }
                                        }
                                    }
                                }
                            },
                            'toprated-videos': generateMenuItem(false, 'main.page-7', '',
                                'Top Rated',
                                false),
                            'mostviewed-videos': generateMenuItem(false, 'main.page-3', '',
                                'Most Viewed',
                                false),
                            'more-videos': generateMenuItem(false, 'main.page-28', '',
                                'More...',
                                false),
                            'search-videos': generateMenuItem(true, 'main.page-11', '',
                                'Search',
                                true),
                            loginbutton: generateMenuItem(false, 'main.page-14', '',
                                'Sign In',
                                true),
                            loggedinbutton: generateMenuItem(false, 'main.page-17', viewSubmenuAccount,
                                yt.xl.config.user,
                                true),
                            'myvideos-button': generateMenuItem(false, 'main.page-17', '',
                                'My Videos',
                                false),
                            'favorites-button': generateMenuItem(false, 'main.page-18', '',
                                'Favorites',
                                false),
                            'playlists-button': generateMenuItem(false, 'main.page-16', '',
                                'Playlists',
                                false),
                            'logout-button': generateMenuItem(false, 'main.service_logout', '',
                                //{ _CLASS: 'syn-control-ga_track_event', category: 'login', action: 'logout'}
                                'Sign Out',
                                false),
                            settings: generateMenuItem(true, 'main.page-19', '',
                                'Settings',
                                true),
                            about: generateMenuItem(true, 'main.page-2', '',
                                'About',
                                true)
                        }
                    },
                    content_browsemore: {
                        _CLASS: 'xl-view-hidden',
                        _CONTROL: { _CLASS: 'syn-control-synthesize', dna: generateBrowseMoreContent }
                    },
                    content_search: generateSearchContent(),
                    content_channel: generateChannelDescContent(),
                    content_settings: {
                        _CLASS: 'xl-view-hidden',
                        _CONTROL: { _CLASS: 'syn-control-synthesize', dna: generateSettingsContent }
                    },
                    content_geo: {
                        _CLASS: 'xl-view-hidden',
                        _CONTROL: { _CLASS: 'syn-control-synthesize', dna: generateGeoContent }
                    },
                    content_language: {
                        _CLASS: 'xl-view-hidden',
                        _CONTROL: { _CLASS: 'syn-control-synthesize', dna: generateLanguageContent }
                    },
                    content_about: {
                        _CLASS: 'xl-view-hidden',
                        _CONTROL: { _CLASS: 'syn-control-synthesize', dna: generateAboutContent }
                    }
                }
            },
            content_watch: generateWatch(),
            page: [
                //second arguement is an array of the active items which make up this 'page'
                //Recently Featured  (main.page-1)
                pageBrowse('featured', 'main.service_browse_videos-1', [
                    'main.browse_site.video-container',
                    'main.browse_site.browse-buttons.menu-container.featured-videos',
                    'main.browse_site.browse-buttons.browse-videos.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site.video-container.notabs',
                    'main.browse_site'], 'main.browse_site.video-container.videos.videolist-1'),
                // About  (main.page-2)
                page('about', ['main.browse_site.content_about',
                    'main.browse_site.browse-buttons.about.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site'], 'main.browse_site.content_about.aboutcontent.link1'),
                //Most Viewed Today  (main.page-3)
                pageBrowse('mostviewedtoday', 'main.service_browse_videos-3', [
                    'main.browse_site.video-container',
                    'main.browse_site.browse-buttons.mostviewed-videos.button',
                    'main.browse_site.browse-buttons.browse-videos.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site.video-container.mostviewedtabs.today',
                    'main.browse_site.video-container.mostviewedtabs',
                    'main.browse_site'], 'main.browse_site.video-container.videos.videolist-1'),
                //Most Viewed This week  (main.page-4)
                pageBrowse('mostviewedthisweek', 'main.service_browse_videos-4', [
                    'main.browse_site.video-container',
                    'main.browse_site.browse-buttons.mostviewed-videos.button',
                    'main.browse_site.browse-buttons.browse-videos.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site.video-container.mostviewedtabs.thisweek',
                    'main.browse_site.video-container.mostviewedtabs',
                    'main.browse_site'], 'main.browse_site.video-container.videos.videolist-1'),
                { _CLASS: 'xl-view-hidden' },
                //Most Viewed All Time  (main.page-6)
                pageBrowse('mostviewedalltime', 'main.service_browse_videos-6', [
                    'main.browse_site.video-container',
                    'main.browse_site.browse-buttons.mostviewed-videos.button',
                    'main.browse_site.browse-buttons.browse-videos.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site.video-container.mostviewedtabs.alltime',
                    'main.browse_site.video-container.mostviewedtabs',
                    'main.browse_site'], 'main.browse_site.video-container.videos.videolist-1'),
                //Top Rated Today  (main.page-7)
                pageBrowse('topratedtoday', 'main.service_browse_videos-7', [
                    'main.browse_site.video-container',
                    'main.browse_site.browse-buttons.toprated-videos.button',
                    'main.browse_site.browse-buttons.browse-videos.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site.video-container.topratedtabs.today',
                    'main.browse_site.video-container.topratedtabs',
                    'main.browse_site'], 'main.browse_site.video-container.videos.videolist-1'),
                //Top Rated This Week  (main.page-8)
                pageBrowse('topratedthisweek', 'main.service_browse_videos-8', [
                    'main.browse_site.video-container',
                    'main.browse_site.browse-buttons.toprated-videos.button',
                    'main.browse_site.browse-buttons.browse-videos.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site.video-container.topratedtabs.thisweek',
                    'main.browse_site.video-container.topratedtabs',
                    'main.browse_site'], 'main.browse_site.video-container.videos.videolist-1'),
                { _CLASS: 'xl-view-hidden' },
                //Top Rated All Time  (main.page-10)
                pageBrowse('topratedalltime', 'main.service_browse_videos-10', [
                    'main.browse_site.video-container',
                    'main.browse_site.browse-buttons.toprated-videos.button',
                    'main.browse_site.browse-buttons.browse-videos.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site.video-container.topratedtabs.alltime',
                    'main.browse_site.video-container.topratedtabs',
                    'main.browse_site'], 'main.browse_site.video-container.videos.videolist-1'),
                //Search main screen (main.page-11)
                page('search', ['main.browse_site.content_search',
                    'main.browse_site.browse-buttons.search-videos.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site'], 'main.browse_site.content_search.search.input.inputbox'),
                //content watch (main.page-12)
                pageWatch('watch', 'main.content_watch', 'main.content_watch.search_box.search_input'),
                // Search Results (main.page-13)
                pageBrowse('searchresults', 'main.service_browse_search', [
                    'main.browse_site.video-container',
                    'main.browse_site.browse-buttons.search-videos.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site.video-container.searchtabs',
                    'main.browse_site'], 'main.browse_site.video-container.videos.videolist-1'),
                // Login Page (main.page-14)
                {
                    _CLASS: 'xl-view-hidden',
                    _CONTROL: { _CLASS: 'syn-control-redirect', url: display.gaiaLoginUrl }
                },
                //Subscriptions (main.page-15)
                { _CLASS: 'xl-view-hidden' },
                //Playlists (main.page-16)
                pageBrowse('playlists', 'main.service_browse_myvideos-2', [
                    'main.browse_site.video-container',
                    'main.browse_site.browse-buttons.playlists-button.button',
                    'main.browse_site.browse-buttons.loggedinbutton.button',
                    'main.browse_site.browse-buttons.loggedinbutton',
                    'main.browse_site.browse-buttons',
                    'main.browse_site'], 'main.browse_site.video-container.videos.videolist-1'),
                //My Videos (main.page-17)
                pageBrowse('myvideos', 'main.service_browse_myvideos-3', [
                    'main.browse_site.video-container',
                    'main.browse_site.browse-buttons.myvideos-button.button',
                    'main.browse_site.browse-buttons.loggedinbutton.button',
                    'main.browse_site.browse-buttons.loggedinbutton',
                    'main.browse_site.browse-buttons',
                    'main.browse_site'], 'main.browse_site.video-container.videos.videolist-1'),
                //Favorites (main.page-18)
                pageBrowse('favorites', 'main.service_browse_myvideos-4', [
                    'main.browse_site.video-container',
                    'main.browse_site.browse-buttons.favorites-button.button',
                    'main.browse_site.browse-buttons.loggedinbutton.button',
                    'main.browse_site.browse-buttons.loggedinbutton',
                    'main.browse_site.browse-buttons',
                    'main.browse_site'], 'main.browse_site.video-container.videos.videolist-1'),
                //Settings main screen (main.page-19)
                page('settings', ['main.browse_site.content_settings',
                    'main.browse_site.browse-buttons.settings.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site'], 'main.browse_site.content_settings.allsettings.cont_playback'),
                //Settings main screen (main.page-20)
                page('settings_geo', ['main.browse_site.content_geo',
                    'main.browse_site.browse-buttons.settings.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site'], 'main.browse_site.content_geo.allcountries.countries.worldwide'),
                //Settings main screen (main.page-21)
                page('settings_lang', ['main.browse_site.content_language',
                    'main.browse_site.browse-buttons.settings.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site'], 'main.browse_site.content_language.alllanguages.languages.lde'),
                //Users Channel videolist1 (main.page-22)
                pageChannel('channelvideos1', [
                    'main.browse_site.video-container.channeltabs',
                    'main.browse_site.gobackcontainer',
                    'main.browse_site.channelsub',
                    'main.browse_site'
                ], 'main.browse_site.video-container.videos.videolist-1'),
                //User Channel videolist2 (main.page-23)
                pageChannel('channelvideos2', [
                    'main.browse_site.video-container.channeltabs',
                    'main.browse_site.channelsub',
                    'main.browse_site'
                ], 'main.browse_site.video-container.videos.videolist-1'),
                //User Channel videolist3 (main.page-24)
                pageChannel('channelvideos3', ['main.browse_site',
                    'main.browse_site.video-container.channeltabs',
                    'main.browse_site.gobackcontainer',
                    'main.browse_site',
                    'main.browse_site.channelsub'], 'main.browse_site.video-container.videos.videolist-1'),
                //Users Channel videos (main.page-25)
                pageChannel('channeluservideos', [
                    'main.service_browse_uservideos-3',
                    'main.browse_site.video-container',
                    'main.browse_site.video-container.channeltabs',
                    'main.browse_site.gobackcontainer',
                    'main.browse_site',
                    'main.browse_site.channelsub.videos_button',
                    'main.browse_site.video-container.channeltabs.channellist1',
                    'main.browse_site.channelsub'], 'main.browse_site.video-container.videos.videolist-1'),
                //User Channel favorites (main.page-26)
                pageChannel('channeluserfavs', [
                    'main.service_browse_uservideos-4',
                    'main.browse_site.video-container.channeltabs.channellist2',
                    'main.browse_site.video-container',
                    'main.browse_site.video-container.channeltabs',
                    'main.browse_site.gobackcontainer',
                    'main.browse_site',
                    'main.browse_site.channelsub.videos_button',
                    'main.browse_site.channelsub'], 'main.browse_site.video-container.videos.videolist-1'),
                //User Channel playlists (main.page-27)
                pageChannel('channeluserplaylists', [
                    'main.service_browse_uservideos-2',
                    'main.browse_site.video-container',
                    'main.browse_site.video-container.channeltabs.channellist3',
                    'main.browse_site.video-container.channeltabs',
                    'main.browse_site.gobackcontainer',
                    'main.browse_site',
                    'main.browse_site.channelsub.videos_button',
                    'main.browse_site.channelsub'], 'main.browse_site.video-container.videos.videolist-1'),
                //More feeds  (main.page-28)
                page('browsemore', [
                    'main.browse_site.content_browsemore',
                    'main.browse_site.browse-buttons.more-videos.button',
                    'main.browse_site.browse-buttons.browse-videos.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site'], 'main.browse_site.content_browsemore.contentwindow.countries.v0'),

                //Recently Added (main.page-29)
                generatePageMoreFeed('videos_recently_added', 'main.service_browse_videos-2'),

                //Rising Videos (main.page-30)
                generatePageMoreFeed('buzz_browse_today', 'main.service_browse_videos-11'),
                generatePageMoreFeed('buzz_browse_week', 'main.service_browse_videos-12'),
                generatePageMoreFeed('buzz_browse_month', 'main.service_browse_videos-13'),

                //Most Popular (main.page-33)
                generatePageMoreFeed('videos_most_popular_today', 'main.service_browse_videos-14'),
                generatePageMoreFeed('videos_most_popular_week', 'main.service_browse_videos-15'),
                generatePageMoreFeed('videos_most_popular_month', 'main.service_browse_videos-16'),

                //Most Discussed (main.page-36)
                generatePageMoreFeed('videos_comment_count_today', 'main.service_browse_videos-17'),
                generatePageMoreFeed('videos_comment_count_week', 'main.service_browse_videos-18'),
                generatePageMoreFeed('videos_comment_count', 'main.service_browse_videos-19'),

                //Most Responded (main.page-39)
                generatePageMoreFeed('videos_most_responded_today', 'main.service_browse_videos-20'),
                generatePageMoreFeed('videos_most_responded_week', 'main.service_browse_videos-21'),
                generatePageMoreFeed('videos_most_responded', 'main.service_browse_videos-22'),

                //Most Favorited (main.page-42)
                generatePageMoreFeed('videos_most_added_to_favorites_today', 'main.service_browse_videos-23'),
                generatePageMoreFeed('videos_most_added_to_favorites_week', 'main.service_browse_videos-24'),
                generatePageMoreFeed('videos_most_added_to_favorites', 'main.service_browse_videos-25'),

                //Top Music (main.page-45)
                generatePageMoreFeed('mpt_top_music_today', 'main.service_browse_videos-26'),
                generatePageMoreFeed('mpt_top_music_week', 'main.service_browse_videos-27'),
                generatePageMoreFeed('mpt_top_music_month', 'main.service_browse_videos-28'),

                //Top Indy Music (main.page-48)
                generatePageMoreFeed('mpt_top_indy_music_today', 'main.service_browse_videos-29'),
                generatePageMoreFeed('mpt_top_indy_music_week', 'main.service_browse_videos-30'),
                generatePageMoreFeed('mpt_top_indy_music_month', 'main.service_browse_videos-31'),

                //Top Major Music (main.page-51)
                generatePageMoreFeed('mpt_top_major_music_today', 'main.service_browse_videos-32'),
                generatePageMoreFeed('mpt_top_major_music_week', 'main.service_browse_videos-33'),
                generatePageMoreFeed('mpt_top_major_music_month', 'main.service_browse_videos-34'),

                //Top Unsigned Music (main.page-54)
                generatePageMoreFeed('mpt_top_unsigned_music_today', 'main.service_browse_videos-35'),
                generatePageMoreFeed('mpt_top_unsigned_music_week', 'main.service_browse_videos-36'),
                generatePageMoreFeed('mpt_top_unsigned_music_month', 'main.service_browse_videos-37'),

                //Film (main.page-57)
                { _CLASS: 'xl-view-hidden' },

                //Education (main.page-58)
                generatePageMoreFeed('edu_videos_views_week', 'main.service_browse_videos-38'),
                generatePageMoreFeed('edu_videos_views_month', 'main.service_browse_videos-39'),
                generatePageMoreFeed('edu_videos_views', 'main.service_browse_videos-40'),
                // Channel Info (main.page-61)
                pageChannel('channelinfo', ['main.browse_site',
                    'main.browse_site.content_channel',
                    'main.browse_site.gobackcontainer',
                    'main.browse_site.channelsub.channelinfo',
                    'main.browse_site.channelsub'], 'main.browse_site.channelsub.channelinfo'),
                // Recommended videos (main.page-62)
                pageBrowse('recommended', 'main.service_recommended', [
                    'main.browse_site.video-container',
                    'main.browse_site.browse-buttons.menu-container.recommended-videos',
                    'main.browse_site.browse-buttons.browse-videos.button',
                    'main.browse_site.browse-buttons',
                    'main.browse_site.video-container.notabs',
                    'main.browse_site'], 'main.browse_site.video-container.videos.videolist-1')
            ],
            service_browse_videos: [
                serviceBrowse(cacheSpotlight, 'console_browse', textNoVideosFound, 'videos_recently_featured'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'videos_recently_added'),

                serviceBrowse(cacheMostViewed, 'console_browse', textNoVideosFound, 'videos_views_today'),
                serviceBrowse(cacheMostViewed, 'console_browse', textNoVideosFound, 'videos_views_week'),
                { _CLASS: 'xl-view-hidden' },
                serviceBrowse(cacheMostViewed, 'console_browse', textNoVideosFound, 'videos_views'),

                serviceBrowse(cacheTopRated, 'console_browse', textNoVideosFound, 'videos_top_rated_today'),
                serviceBrowse(cacheTopRated, 'console_browse', textNoVideosFound, 'videos_top_rated_week'),
                { _CLASS: 'xl-view-hidden' },
                serviceBrowse(cacheTopRated, 'console_browse', textNoVideosFound, 'videos_top_rated'),

                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'buzz_browse_today'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'buzz_browse_week'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'buzz_browse_month'),

                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'videos_most_popular_today'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'videos_most_popular_week'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'videos_most_popular_month'),

                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'videos_comment_count_today'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'videos_comment_count_week'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'videos_comment_count'),

                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'videos_most_responded_today'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'videos_most_responded_week'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'videos_most_responded'),

                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'videos_most_added_to_favorites_today'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'videos_most_added_to_favorites_week'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'videos_most_added_to_favorites'),

                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'mpt_top_music_today'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'mpt_top_music_week'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'mpt_top_music_month'),

                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'mpt_top_indy_music_today'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'mpt_top_indy_music_week'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'mpt_top_indy_music_month'),

                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'mpt_top_major_music_today'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'mpt_top_major_music_week'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'mpt_top_major_music_month'),

                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'mpt_top_unsigned_music_today'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'mpt_top_unsigned_music_week'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'mpt_top_unsigned_music_month'),

                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'edu_videos_views_week'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'edu_videos_views_month'),
                serviceBrowse(cacheMore, 'console_browse', textNoVideosFound, 'edu_videos_views')
            ],
            service_browse_myvideos: [
                serviceBrowseMyVideos(cacheSubscriptions, 'console_profile_subscriptions', 'No Subscriptions Found'),
                serviceBrowseMyVideos(cachePlaylists, 'console_profile_playlists', 'No Playlists Found'),
                serviceBrowseMyVideos(cacheUploads, 'console_profile_videos', 'No Videos Uploaded'),
                serviceBrowseMyVideos(cacheFavorites, 'console_profile_favorites', 'No Videos Favorited')
            ],
            service_browse_uservideos: [
                serviceBrowseUserVideos(cacheSubscriptions, 'console_profile_subscriptions', 'No Subscriptions Found'),
                serviceBrowseUserVideos(cachePlaylists, 'console_profile_playlists', 'No Playlists Found'),
                serviceBrowseUserVideos(cacheUploads, 'console_profile_videos', 'No Videos Uploaded'),
                serviceBrowseUserVideos(cacheFavorites, 'console_profile_favorites', 'No Videos Favorited')
            ],
            service_browse_search: serviceBrowseSearch(cacheSearch, 'console_results', 'No Videos Found in Search'), //4th element is used for the activating the similiar search results.
            service_related: [
                serviceRelated(cacheRelated1, 'console_related'),
                serviceRelated(cacheRelated2, 'console_related')
            ],
            service_watch: serviceWatch(),
            service_logout: serviceLogout(),
            service_favorite: serviceFavorite(),
            service_channel: serviceChannel(),
            service_share: serviceShare(),
            service_flag: serviceFlag(),
            service_subscribe: serviceSubscribe(),
            service_unsubscribe: serviceUnsubscribe(),
            service_playlist_item: servicePlaylistItem(cachePlaylistVideos, ''),
            service_recommended: serviceRecommended(cacheRecommended, 'console_profile_recommendation', textNoVideosFound)
        },
        cache: cacheMore,
        placeholders: [
            'Recently Added Films',
            'Most Popular Films',
            'Travel',
            'News',
            'Help',
            'Choose my video quality dynamically based on the current connection speed.',
            'I have a slow connection. Never play higher-quality video.',
            'I have a fast connection. Always play higher-quality video when it\'s available.',
            'Recommended',
            'Channels',
            'Language',
            'Geography'
        ],
        config: yt.xl.config
    };
    return dna;
};

var _root = null;

window.onload = function () {

    yt.syn.disableRightClick();
    yt.syn.setJavaScriptVersion("");
    yt.syn.setViewportSize(configuration.viewport_width, configuration.viewport_height);
    yt.syn.setDefaultImgTagProperties({ src: '/img/syn/pixel.gif', alt: '' });

    yt.syn.control.GATrackEvent.setAnalyticsId('UA-6207952-1');
    yt.syn.control.GATrackPageview.setAnalyticsId('UA-6207952-1');
    yt.syn.control.GATrackTime.setAnalyticsId('UA-6207952-1');

    yt.xl.config.loadPreferences();
    yt.syn.control.History.setPollingInterval(configuration.javascript_tick);
    yt.syn.control.History.setDummyUrl('blank');
    yt.syn.control.Navigate.enableKey(configuration.enable_key_navigation);
    yt.syn.control.Navigate.enableMouse(true);

    if (configuration.enable_link_emulation) {
        yt.syn.control.ActivateOnClick.setOverlay({
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '100%',
            height: '100%',
            src: 'http://s.ytimg.com/yt/img/syn/pixel-vfl82372.gif',
            alt: ''
        });
    }

    yt.xl.view.Rating.setImages(
        'http://s.ytimg.com/yt/img/syn/xl-starfull-vfl82372.png',
        'http://s.ytimg.com/yt/img/syn/xl-starhalf-vfl82372.png',
        'http://s.ytimg.com/yt/img/syn/xl-starempty-vfl82372.png'
    );

    // site configuration
    var config = yt.xl.config;
    config.user = '';
    var defaultPage = 'featured';
    if (config.user) {
        defaultPage = 'recommended';
    }
    config.client = configuration.client;
    config.app = 'desktop';
    config.sessionToken = '';
    config.sessionTokenFavorite = '';
    config.sessionTokenFlag = '';
    config.sessionTokenShare = '';
    config.sessionTokenSubscription = '';

    // login_simulate
    if(document.cookie
        && document.cookie.indexOf("login_simulate") !== -1) {
            var username = document.cookie
                           .split("login_simulate")[1]
                           .split(":")[0]
                           .split(";")[0]
            yt.xl.config.user = username;
            yt.xl.config.sessionToken = 's';
            yt.xl.config.sessionTokenFavorite = 's';
            yt.xl.config.sessionTokenFlag = 's';
            yt.xl.config.sessionTokenShare = 's';
            yt.xl.config.sessionTokenSubscription = 's';
    }

    if (configuration.safe_search == 'always') {
        config.filterRacyContent = true;
    }

    // syn configuration
    yt.syn.logger.setLevel(Math.min(display.debug, 9));

    config.startpage = (dataPageMap[configuration.page] ? configuration.page : defaultPage);

    maximizeViewport();

    var splash = document.getElementById('splash');
    if (configuration.resize_body) {
        yt.xl.resizeToViewport(document.body, display.relativeFontSize);
    } else {
        yt.xl.resizeToViewport(splash, display.relativeFontSize);
    }

    var hotkeys = dataKeyToMediaEventMap[0];
    if (configuration.enable_hotkeys) {
        hotkeys[112] = 'SYN_EVENT_PAUSE';
        hotkeys[113] = 'SYN_EVENT_PLAY';
        hotkeys[114] = 'SYN_EVENT_AUTOPLAY';
        hotkeys[115] = 'SYN_EVENT_QUALITY';
        hotkeys[116] = 'SYN_EVENT_REWIND';
        hotkeys[117] = 'SYN_EVENT_FORWARD';
        hotkeys[118] = 'SYN_EVENT_PREVTRACK';
        hotkeys[119] = 'SYN_EVENT_NEXTTRACK';
        hotkeys[120] = 'SYN_EVENT_FULLSCREEN';
        // F10 key is reserved by Flash.
        hotkeys[122] = 'SYN_EVENT_VOLUMEDOWN';
        hotkeys[123] = 'SYN_EVENT_VOLUMEUP';
    }

    hotkeys[configuration.action_playpause] = 'SYN_EVENT_PLAYPAUSE';
    hotkeys[configuration.action_play] = 'SYN_EVENT_PLAY';
    hotkeys[configuration.action_pause] = 'SYN_EVENT_PAUSE';
    hotkeys[configuration.action_stop] = 'SYN_EVENT_STOP';
    hotkeys[configuration.action_forward] = 'SYN_EVENT_FORWARD';
    hotkeys[configuration.action_rewind] = 'SYN_EVENT_REWIND';
    hotkeys[configuration.action_prevtrack] = 'SYN_EVENT_PREVTRACK';
    hotkeys[configuration.action_nexttrack] = 'SYN_EVENT_NEXTTRACK';
    hotkeys[configuration.action_autoplay] = 'SYN_EVENT_AUTOPLAY';
    hotkeys[configuration.action_autoplayon] = 'SYN_EVENT_AUTOPLAYON';
    hotkeys[configuration.action_autoplayoff] = 'SYN_EVENT_AUTOPLAYOFF';
    hotkeys[configuration.action_fullscreen] = 'SYN_EVENT_FULLSCREEN';
    hotkeys[configuration.action_clear] = 'SYN_EVENT_CLEAR';
    hotkeys[configuration.action_volumemute] = 'SYN_EVENT_VOLUMEMUTE';
    hotkeys[configuration.action_volumedown] = 'SYN_EVENT_VOLUMEDOWN';
    hotkeys[configuration.action_volumeup] = 'SYN_EVENT_VOLUMEUP';
    hotkeys[configuration.action_quality] = 'SYN_EVENT_QUALITY';
    hotkeys[configuration.action_qualityon] = 'SYN_EVENT_QUALITYON';
    hotkeys[configuration.action_qualityoff] = 'SYN_EVENT_QUALITYOFF';

    // render elements
    var dna = genDNA();
    if (display.debug) {
        yt.syn.dna.verify(dna);
    }
    _root = yt.syn.dna.render(dna, 'main', { 'config.safeSearchMode': false }, true);

    if (!configuration.resize_body) {
        yt.xl.resizeToViewport(document.getElementById('main'), display.relativeFontSize);
    }

    // Check for browserOS compatibility.
    if (configuration.display_unsupported) {
        yt.syn.dna.setProperty('main.popup.content', 'label', 'This page is currently not optimized for your browser or operating system. Some elements may not work as intended.');
        yt.syn.dna.dispatchEvent('main.popup', 'SYN_EVENT_ACTIVATE');

        // Check for Flash compatibility.
    } else if (configuration.playback_mode == 'flash' && !yt.xl.isFlashVersionAtLeast(configuration.display_suggest_update)) {
        yt.syn.dna.setProperty('main.popup.content', 'label', 'Please update your device to get the latest flash version.');
        yt.syn.dna.dispatchEvent('main.popup', 'SYN_EVENT_ACTIVATE');
    }

    if (configuration.user) {
        yt.syn.dna.setProperty('main.browse_site.channelsub.channelinfo.channelname', 'user', configuration.user);
        yt.syn.dna.setProperty('main.service_browse_uservideos-1', 'user', configuration.user);
        yt.syn.dna.setProperty('main.service_browse_uservideos-2', 'user', configuration.user);
        yt.syn.dna.setProperty('main.service_browse_uservideos-3', 'user', configuration.user);
        yt.syn.dna.setProperty('main.service_browse_uservideos-4', 'user', configuration.user);
        yt.syn.dna.dispatchEvent('main.page-25', 'SYN_EVENT_ACTIVATE');
    }
    if (configuration.playlist) {
        yt.syn.dna.setProperty('main.page-12', 'video', { 'playlist_id': configuration.playlist, 'video_id': 'dummy' });
        yt.syn.dna.dispatchEvent('main.page-12', 'SYN_EVENT_ACTIVATE');
    }
    // google analytics
    if (window['_gat']) {
        try {
            var tracker = _gat._getTracker('UA-6207952-1');
            tracker._setSampleRate(configuration.analytics_sample_rate);
            tracker._setSessionTimeout(configuration.analytics_session_timeout);
        }
        catch (e) {
        }
    }

    // turn off loading spinner
    if (splash) {
        splash.style.display = 'none';
        document.getElementById('splash-image').src = '';
    }
};

window.onunload = function () {
    if (_root) yt.syn.dna.unrender(_root);
};
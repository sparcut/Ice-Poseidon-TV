/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pageCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(2);




const DISALLOWED_CHARS = ['\\', ':', '/', '&', "'", '"', '?', '!', '#'],
             SCROLL_ENABLED_URL =  chrome.extension.getURL('icons/scroll-enabled.png'),
             SCROLL_DISABLED_URL =  chrome.extension.getURL('icons/scroll-disabled.png');
/* harmony export (immutable) */ __webpack_exports__["DISALLOWED_CHARS"] = DISALLOWED_CHARS;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_ENABLED_URL"] = SCROLL_ENABLED_URL;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_DISABLED_URL"] = SCROLL_DISABLED_URL;


let options = null;

const onNewPageLoad = function() {

    $('[class^="iptv-"]').remove();

    if (options !== null && options['redirectToYTGaming'] === true) {
        setTimeout(__WEBPACK_IMPORTED_MODULE_1__pageCheck__["a" /* default */].youtubeGaming, 2500);
    }

    __WEBPACK_IMPORTED_MODULE_1__pageCheck__["a" /* default */].livestreamPage();
};

(function() {

    const target = document.querySelector('head > title');

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            onNewPageLoad();
        });
    });

    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* isNode */])(target)) {
        return;
    }

    observer.observe(target, { subtree: true, characterData: true, childList: true });
}());

chrome.runtime.sendMessage('requestLocalstorage', function(response) {

    options = response;

    if (options['disableAvatars']) {
        $('<style type="text/css">.style-scope .yt-live-chat-item-list-renderer #author-photo { width: 0px; height: 0px; margin-right: 0px; visibility: hidden; }.style-scope.yt-live-chat-message-input-renderer.no-transition{ display: none !important; }.style-scope yt-live-chat-message-input-renderer #avatar { display: none !important; }</style>').appendTo('head');
    }

    if (options['enableChatColors']) {
        const a = chrome.extension.getURL('external/chat-colors.css');
        $('<link rel="stylesheet" type="text/css" href="' + a + '" >').appendTo('head');
    }

    if (options['enableSplitChat']) {
        $('<style type="text/css">.style-scope yt-live-chat-text-message-renderer { border-top: 0.5px solid #333333; border-bottom: 0.5px solid #000000; }</style>').appendTo('head');
    }

    if(options['showDeletedMessages']) {
        $('<style type="text/css">.yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer {display: inline;} .yt-live-chat-text-message-renderer-0 #deleted-state.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0 #deleted-state:before{content: "  "}</style>').appendTo('head');
    }

    if(options['mentionHighlight']) {
        $('<style type="text/css">.yt-live-chat-text-message-renderer-0 .mention.yt-live-chat-text-message-renderer { background-color: rgba(114, 15, 15, 0) !important; padding: 0px 0px !important; }</style>').appendTo('head');
    }

    onNewPageLoad();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_loadingEmotesInfo__ = __webpack_require__(9);




class Emote
{
    /**
     * Load all enabled emotes.
     * @constructor
     */
    static loadEmotes()
    {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__overlay_loadingEmotesInfo__["a" /* default */])();

        setTimeout(function() {

            const $loading = $('.iptv-loading-emotes');

            if ($loading[0]) {

                $loading.css({
                    'color': '#c0392b',
                    'background-color': '#282828',
                    'right': '19px'
                });

                $loading.text('Failed loading some emotes (API servers down)');
            }

            setTimeout(function() {
                $('.iptv-loading-emotes').remove();
            }, 7.5 * 1000);

        }, 10 * 1000);

        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesTwitch']) Emote.loadTwitchEmotes();
        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesSub']) Emote.loadSubEmotes();
        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesIce']) Emote.loadIceEmotes();

        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV']) {
            Emote.loadBTTVEmotes();
            Emote.loadBTTVChannelEmotes();
        }

        Emote.waitTillEmotesLoaded();
    };

    /**
     * setTimeout that keeps running until all emotes are loaded.
     * @static
     */
    static waitTillEmotesLoaded()
    {
        if ((__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesTwitch'] !== Emote.states['twitch'].loaded) ||
            (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesSub'] !== Emote.states['sub'].loaded) ||
            (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV'] !== Emote.states['BTTV'].loaded) ||
            (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV'] !== Emote.states['BTTVChannels'].loaded)) {

            setTimeout(Emote.waitTillEmotesLoaded, 250);
            return;
        }

        // Temp fix to prevent ram from filling up with messages.
        setInterval(function () {
            Emote.messages = {};
        }, 1000 * 60 * 5);

        $('.iptv-loading-emotes').remove();
        Emote.replaceExistingEmotes();
    };

    /**
     * Replace existing text with emotes in chat, happens when emotes are done loading.
     * @static
     */
    static replaceExistingEmotes()
    {
        const chatElements = $('.style-scope.yt-live-chat-item-list-renderer.x-scope.yt-live-chat-text-message-renderer-0');

        if (chatElements.length < 1) {
            setTimeout(Emote.replaceExistingEmotes, 250);
            return;
        }

        chatElements.each(function (i, el) {
            Emote.emoteCheck(el);
        });
    };

    /**
     * Checks if a message contains emotes.
     * @static
     * @param {node} node - Message node
     */
    static emoteCheck(node)
    {
        const $message = $(node).find('#message');
        Emote.kappaCheck($message);

        let oldHTML = $message.html().trim();
        let msgHTML = oldHTML;

        if (typeof Emote.messages[msgHTML] == 'undefined') {

            const words = msgHTML.replace('/\xEF\xBB\xBF/', '').replace('﻿', '').split(' ');
            const uniqueWords = [];
            let emoteCount = 0;

            $.each(words, function (i, el) {
                if ($.inArray(el, uniqueWords) === -1) uniqueWords.push(el);
            });

            for (let i = 0; i < uniqueWords.length; i++) {

                const word = uniqueWords[i];

                if (typeof Emote.emotes[word] === 'undefined') {
                    continue;
                }

                emoteCount++;

                const span = document.createElement('span');
                span.setAttribute('aria-label', word);
                span.classList.add('hint--top');

                const img = document.createElement('img');
                img.src = Emote.emotes[word]['url'];
                img.alt = word;
                img.style.display = 'inline';
                img.style.width = 'auto';
                img.style.overflow = 'hidden';

                span.appendChild(img);

                msgHTML = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* replaceAll */])(msgHTML, word, span.outerHTML);
            }

            if (emoteCount < 1) return;

            $message.html(msgHTML);
            Emote.messages[oldHTML.replace(/\s/g,'')] = msgHTML;

        } else {
            $message.html(Emote.messages[oldHTML]);
        }

        $message.parent().parent().bind('DOMSubtreeModified', function () {

            const $message = $(this).find('#message');
            Emote.kappaCheck($message);

            let html = $message.html().trim();
            html = html.replace('/\xEF\xBB\xBF/', '').replace('﻿', '').replace(/\s/g,'');

            if (typeof Emote.messages[html] !== 'undefined') {

                if (html == Emote.messages[html]) {
                    return;
                }

                $message.html(Emote.messages[html]);
            }
        });
    };

    /**
     * Checks if a message contains a kappa emote.
     * @static
     * @param {node} msg - Message node
     */
    static kappaCheck(msg)
    {
        $('img', msg).each(function() {

            const $img = $(this);

            if (/\ud83c\udf1d/g.test($img.attr('alt'))) {
                $img.replaceWith(document.createTextNode('Kappa'));
            }
        });
    };

    /**
     * Load Twitch emotes.
     * @static
     */
    static loadTwitchEmotes()
    {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://twitchemotes.com/api_cache/v2/global.json');
        xhr.send();
        const urlTemplate = '//static-cdn.jtvnw.net/emoticons/v1/';

        xhr.ontimeout = function() {
            Emote.states['twitch'].loaded = true;
        };

        xhr.onload = function () {

            const emoteDic = JSON.parse(xhr.responseText)['emotes'];

            for (const emote in emoteDic) {

                Emote.emotes[emote] = {
                    url: urlTemplate + emoteDic[emote]['image_id'] + '/' + '1.0'
                };
            }

            Emote.states['twitch'].loaded = true;
        }
    };

    /**
     * Load Twitch subscriber emotes.
     * @static
     */
    static loadSubEmotes()
    {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://twitchemotes.com/api_cache/v2/subscriber.json');
        xhr.send();
        const urlTemplate = '//static-cdn.jtvnw.net/emoticons/v1/';

        xhr.ontimeout = function() {
            Emote.states['sub'].loaded = true;
        };

        xhr.onload = function () {

            const emoteDic = JSON.parse(xhr.responseText)['channels'];

            for (const channel in emoteDic) {

                for (const i in emoteDic[channel]['emotes']) {

                    const dict = emoteDic[channel]['emotes'][i];
                    const code = dict['code'];

                    if (Emote.isValidEmote(code)) {
                        Emote.emotes[code] = {
                            url: urlTemplate + dict['image_id'] + '/' + '1.0'
                        };
                    }
                }
            }

            Emote.states['sub'].loaded = true;
        }
    };

    /**
     * Load BTTV emotes.
     * @static
     */
    static loadBTTVEmotes()
    {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.betterttv.net/2/emotes');
        xhr.send();
        const urlTemplate = '//cdn.betterttv.net/emote/';

        xhr.ontimeout = function() {
            Emote.states['BTTV'].loaded = true;
        };

        xhr.onload = function () {

            const emoteList = JSON.parse(xhr.responseText)['emotes'];

            for (const i in emoteList) {

                const dict = emoteList[i];

                if (!Emote.containsDisallowedChar(dict['code'])) {
                    Emote.emotes[dict['code']] = {
                        url: urlTemplate + dict['id'] + '/' + '1x'
                    };
                }
            }

            Emote.states['BTTV'].loaded = true;
        }
    };

    /**
     * Load BTTV channel emotes.
     * @static
     */
    static loadBTTVChannelEmotes()
    {
        const channels = __WEBPACK_IMPORTED_MODULE_1__main__["options"]['BTTVChannels'];
        const commaChannels = channels.replace(/\s+/g, '').split(',');

        commaChannels.forEach(function (channel) {

            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.betterttv.net/2/channels/' + channel);
            xhr.send();
            const urlTemplate = '//cdn.betterttv.net/emote/';

            xhr.ontimeout = function() {

                Emote.states['BTTVChannels'].loadedCount++;

                if (Emote.states['BTTVChannels'].loadedCount >= commaChannels.length) {
                    Emote.states['BTTVChannels'].loaded = true;
                }
            }

            xhr.onload = function () {

                const emoteList = JSON.parse(xhr.responseText)['emotes'];

                for (const i in emoteList) {

                    const dict = emoteList[i];

                    if (!Emote.containsDisallowedChar(dict['code'])) {
                        Emote.emotes[dict['code']] = {
                            url: urlTemplate + dict['id'] + '/' + '1x',
                            channel: channel + ' (bttv)'
                        };
                    }
                }

                Emote.states['BTTVChannels'].loadedCount++;

                if (Emote.states['BTTVChannels'].loadedCount >= commaChannels.length) {
                    Emote.states['BTTVChannels'].loaded = true;
                }
            }
        }, this);
    };

    /**
     * Load Ice's old subscriber emotes.
     * @static
     */
    static loadIceEmotes()
    {
        const urlTemplate = 'https://static-cdn.jtvnw.net/emoticons/v1/';

        const iceEmotes = {
            "purple1": { "image_id": 96873 },
            "purple2": { "image_id": 96874 },
            "purple3": { "image_id": 96875 },
            "purple4": { "image_id": 96876 },
            "purpleArm1": { "image_id": 84687 },
            "purpleArm2": { "image_id": 84533 },
            "purpleBluescreen": { "image_id": 157415 },
            "purpleBruh": { "image_id": 132893 },
            "purpleCigrip": { "image_id": 161828 },
            "purpleCreep": { "image_id": 153620 },
            "purpleCx": { "image_id": 91876 },
            "purpleEnza": { "image_id": 105444 },
            "purpleFake": { "image_id": 91874 },
            "purpleFrank": { "image_id": 76640 },
            "purpleHuh": { "image_id": 133286 },
            "purpleIce": { "image_id": 80215 },
            "purpleKKona": { "image_id": 121771 },
            "purpleM": { "image_id": 121772 },
            "purpleNose": { "image_id": 65152 },
            "purpleOmg": { "image_id": 160462 },
            "purplePride": { "image_id": 62560 },
            "purpleRofl": { "image_id": 121495 },
            "purpleTaco": { "image_id": 132726 },
            "purpleThink": { "image_id": 121770 },
            "purpleW": { "image_id": 70838 },
            "purpleClaus": { "image_id": 132737 },
            "purpleCoolstory": { "image_id": 153621 },
            "purpleDog": { "image_id": 105228 },
            "purpleFro": { "image_id": 86444 },
            "purpleKkona": { "image_id": 121494 },
            "purpleLeo": { "image_id": 73632 },
            "purpleLUL": { "image_id": 126511 },
            "purpleReal": { "image_id": 91873 },
            "purpleThump": { "image_id": 86501 },
            "purpleTongue": { "image_id": 70838 },
            "purpleWalnut": { "image_id": 109084 },
            "purpleWat": { "image_id": 105229 },
            "purpleWut": { "image_id": 133844 }
        };

        for(const emote in iceEmotes) {
            Emote.emotes[emote] = {
                url: urlTemplate + iceEmotes[emote]['image_id'] + '/' + '1.0'
            }
        }
    };

    /**
     * Checks if text is a valid emote
     * @static
     * @param {string} text
     */
    static isValidEmote(text)
    {
        return !(text[0].match(/[A-Z]/g) ||
            text.match(/^[a-z]+$/g) ||
            text.match(/^\d*$/g)
        );
    };

    /**
     * Checks if text contains disallowed characters.
     * @static
     * @param {string} word
     */
    static containsDisallowedChar(word)
    {
        for (const c in __WEBPACK_IMPORTED_MODULE_1__main__["DISALLOWED_CHARS"]) {
            if (word.indexOf(c) > -1) {
                return true;
            }
        }

        return false;
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Emote;
;

Emote.states = {
    twitch: {
        loaded: false
    },
    sub: {
        loaded: false
    },
    BTTV: {
        loaded: false
    },
    BTTVChannels: {
        loaded: false,
        loadedCount: 0
    }
};

Emote.emotes = {};
Emote.messages = {};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = replaceAll;
/* harmony export (immutable) */ __webpack_exports__["a"] = isNode;
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
};

function isNode(o) {
    return (
        typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
    );
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chatObserver__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay_donateButton__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__overlay_checkIfWatchingLive__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__overlay_alwaysScrollDown__ = __webpack_require__(6);







class PageCheck
{
    /**
     * Checks if user is watching from wrong livestream page and warns them.
     * @static
     */
    static youtubeGaming()
    {
        const iframe = document.getElementById('live-chat-iframe');

        const $textWrapper = $('.yt-user-info');
        const text = $textWrapper.find('a').text();

        const url = document.location.href;

        if (text == 'Ice Poseidon' && !url.includes('gaming.youtube') && iframe) {

            const redirectConfirm = confirm('[Ice PoseidonTV] Go to the official Ice Poseidon livestream page?');

            if (redirectConfirm === true) {
                window.location = 'https://gaming.youtube.com/ice_poseidon/live';
            }
        }
    };

    /**
     * Checks if user is watching a livestream on Youtube gaming.
     * @static
     */
    static livestreamPage()
    {
        const target = document.getElementById('owner');
        const chat = document.getElementById('chat');
        const text = $(target).find('span').text();

        const url = document.location.href;

        if ((!target || !chat) && (!url.includes('live_chat') && !url.includes('is_popout=1'))) {

            PageCheck.streampageChecks++;

            if (PageCheck.streampageChecks < 25) {
                setTimeout(PageCheck.livestreamPage, 250);
            }

            return;
        }

        if (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesTwitch'] === true || __WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesSub'] === true || __WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV'] === true || __WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesIce'] === true) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__chatObserver__["a" /* default */])();
        }

        if(text == 'Ice Poseidon') __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__overlay_donateButton__["a" /* default */])();

        __WEBPACK_IMPORTED_MODULE_0__emote__["a" /* default */].loadEmotes();
        __WEBPACK_IMPORTED_MODULE_5__overlay_alwaysScrollDown__["a" /* default */].init();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__overlay_checkIfWatchingLive__["a" /* default */])();
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PageCheck;
;

PageCheck.streampageChecks = 0;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = chatObserver;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mentionHighlight__ = __webpack_require__(5);



/**
 * Binds chat mutation observer and listen for new chat messages.
 */
function chatObserver()
{
    const target = document.querySelector('.style-scope .yt-live-chat-item-list-renderer');
    const authorname = $('#author #author-name').text().toLowerCase();

    if (!target) {
        setTimeout(chatObserver, 250);
        return;
    }

    const observer = new MutationObserver(function (mutations) {

        mutations.forEach(function (mutation) {

            const newNodes = mutation.addedNodes;

            if (newNodes !== null) {

                const $nodes = $(newNodes);

                $nodes.each(function () {

                    const $node = $(this);

                    if (!$node.hasClass('yt-live-chat-item-list-renderer')) {
                        return;
                    }

                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__mentionHighlight__["a" /* default */])($node);
                    __WEBPACK_IMPORTED_MODULE_0__emote__["a" /* default */].emoteCheck($node);
                });
            }
        });
    });

    const options = {
        characterData: false,
        attributes: false,
        childList: true,
        subtree: true
    };

    observer.observe(target, options);
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = MentionHighlight;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


/**
 * Checks if a message contains mention and changes background to BTTV style background.
 * @param {node} node - Message node
 */
function MentionHighlight(node)
{
    const authorname = $('#author #author-name').text().toLowerCase();

    if (__WEBPACK_IMPORTED_MODULE_0__main__["options"]['mentionHighlight'] && authorname.length > 2 && !node.hasClass('yt-live-chat-legacy-paid-message-renderer-0')) { // Check it's not sponsor / superchat, also mentionHighlight enabled

        const uniqueid = node.get(0).getAttribute('id') // Copy unique message id
        const message = (" " + node.find('#message').text().toLowerCase() + " ").replace(/[\u200B-\u200D\uFEFF]/g, '');

        if (uniqueid.length > 30 && (message.indexOf(' '+authorname+' ') !== -1 || message.indexOf('@'+authorname+' ') !== -1)) { // If your name is in the message, and it's not your message
            node.get(0).style.backgroundColor = "rgba(255,0,0,0.40)";
            node.find('#author-name').get(0).style.color = "#ffffff";
        }
    }
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


class AlwaysScrollDown
{
    /**
     * Creates 'Always scroll down' overlay and binds the necessary listeners.
     * @constructor
     */
    static init()
    {
        if ($('.iptv-scrolldown-wrapper').length) {
            $('.iptv-scrolldown-wrapper').remove();
        };

        const scrollWrapper = document.createElement('div');

        scrollWrapper.setAttribute('aria-label', 'Always scroll down (Enabled)');
        scrollWrapper.classList.add('hint--top', 'iptv-scrolldown-wrapper');

        $(scrollWrapper).css({
            'position': 'absolute',
            'right': '113px',
            'bottom': '18px'
        });

        $(scrollWrapper).html(`
            <a href="javascript:void(0)" class="iptv-scrolldown-toggle" style="outline: 0;">
                <img src="${__WEBPACK_IMPORTED_MODULE_0__main__["SCROLL_ENABLED_URL"]}" alt="Always scroll down" height="11" width="11" class="iptv-scrolldown-toggle-icon">
            </a>
        `);

        document.body.appendChild(scrollWrapper);

        $(document).on('click', '.iptv-scrolldown-toggle', function() {
            AlwaysScrollDown.toggleScrollDown();
        });

        setInterval(function () {
            if (AlwaysScrollDown.scrollDown === true) {
                $('#item-scroller').scrollTop(999999999);
            }
        }, 100);

        AlwaysScrollDown.hideScrollOnCinema(scrollWrapper);
        AlwaysScrollDown.hideScrollOnSponsorMenu(scrollWrapper);
        AlwaysScrollDown.bindScrollListener();
        AlwaysScrollDown.bindScrollDownListener();
    };

    /**
     * Hides the 'Always scroll down' overlay when cinema mode is open
     * @static
     * @param {node} scrollWrapper
     */
    static hideScrollOnCinema(scrollWrapper)
    {
        const watchPage = 'ytg-watch-page';

        const observer = new MutationObserver(function(mutations) {
            mutations.forEach((m) => {
                $(m.target).is('[sidebar-collapsed]') ? $(scrollWrapper).hide() : $(scrollWrapper).show();
            });
        });

        const observerOpts = {
            childList: false,
            attributes: true,
            characterData: false,
            subtree: false,
            attributeFilter: ['sidebar-collapsed']
        }

        const addObserver = setInterval(() => {
            if ($(watchPage).length) {
                observer.observe($(watchPage)[0], observerOpts);
                clearInterval(addObserver);
            }
        }, 250);
    };

    /**
     * Hides the 'Always scroll down' overlay when sponsor menu is open.
     * @static
     * @param {node} scrollWrapper
     */
    static hideScrollOnSponsorMenu(scrollWrapper)
    {
        const chatInputRenderer = 'yt-live-chat-message-input-renderer';

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach((m) => {
                $(m.target).attr('creator-open') ? $(scrollWrapper).hide() : $(scrollWrapper).show();
            });
        });

        const observerOpts = {
            childList: false,
            attributes: true,
            characterData: false,
            subtree: false,
            attributeFilter: ['creator-open']
        }

        const sponsorClick = setInterval(() => {
            if ($(chatInputRenderer).length) {
                observer.observe($(chatInputRenderer)[0], observerOpts);
                clearInterval(sponsorClick);
            }
        }, 250);
    };

    /**
     * Disables 'Always scroll down' functionality when scrolling manually.
     * @static
     */
    static bindScrollListener()
    {
        const target = document.getElementById('item-scroller');

        if (!target) {
            setTimeout(() => { AlwaysScrollDown.bindScrollListener() }, 250);
            return;
        }

        $('#item-scroller').bind('mousewheel DOMMouseScroll', function (event) {
            AlwaysScrollDown.toggleScrollDown(false);
        });
    };

    /**
     * Enables 'Always scroll down' functionality when blue jump down button is clicked.
     * @static
     */
    static bindScrollDownListener()
    {
        const target = document.getElementById('show-more');

        if (!target) {
            window.setTimeout(() => { AlwaysScrollDown.bindScrollDownListener() }, 250);
            return;
        }

        target.onmousedown = function () {
            AlwaysScrollDown.toggleScrollDown(true);
            return true;
        };
    };

    /**
     * Toggle scrollDown state and adjust overlay accordingly.
     * @static
     */
    static toggleScrollDown(state)
    {
        AlwaysScrollDown.scrollDown = false;

        if (typeof state === 'undefined') {
            AlwaysScrollDown.scrollDown = !AlwaysScrollDown.scrollDown;
        } else {
            AlwaysScrollDown.scrollDown = state;
        }

        $('.iptv-scrolldown-wrapper').attr('aria-label', AlwaysScrollDown.scrollDown ? 'Always scroll down (Enabled)' : 'Always scroll down (Disabled)');
        $('.iptv-scrolldown-toggle-icon').attr('src', AlwaysScrollDown.scrollDown ? __WEBPACK_IMPORTED_MODULE_0__main__["SCROLL_ENABLED_URL"] : __WEBPACK_IMPORTED_MODULE_0__main__["SCROLL_DISABLED_URL"]);
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AlwaysScrollDown;
;

AlwaysScrollDown.scrollDown = true;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = checkIfWatchingLive;
/**
 * Checks if user is behind in livestream and warns them.
 */
function checkIfWatchingLive() {

    let liveCheckInterval = null;

    liveCheckInterval = setInterval(function() {

        const $liveButton = $('.ytp-live-badge.ytp-button');

        if ($liveButton.is(':enabled') && $liveButton.is(':visible')) {
            $('#player-container').append(`
                <div class="iptv-live-warning">
                    <div class="iptv-live-warning-text">
                        You\'re watching old footage, click the LIVE button in the bottom left corner to watch live.
                    </div>
                    <div class="iptv-live-warning-dismiss">
                        <a href="javascript:void(0)" class="iptv-live-warning-close">✕</a>
                    </div>
                </div>
            `);
        }
    }, 15 * 1000);

    $(document).on('click', '.iptv-live-warning-close', function() {
        $('.iptv-live-warning').remove();
        clearInterval(liveCheckInterval);
    });

    $(document).on('mousedown', '.ytp-live-badge', function() {
        $('.iptv-live-warning').remove();
    });
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = donateButton;
/**
 * Adds donate button to livestream page.
 */
function donateButton()
{
    $('.iptv-donate-button-0').remove();

    const donateIcon = chrome.extension.getURL('/icons/donate-icon.png');
    const sponsorIcon = chrome.extension.getURL('/icons/sponsor-icon.png');

    const sponsorImage = `<img src="${sponsorIcon}" alt="star" style="pointer-events: none; display: block; width: 100%; height: 100%;">`;

    const donateButton = `
        <iptv-donate-button style="display: inline-block;" raised="" supported-cold-load-actions="[&quot;sponsor&quot;]" wait-for-signal="watch-page-initialized" class="style-scope ytg-watch-footer x-scope iptv-donate-button-0">
            <iron-signals class="style-scope iptv-donate-button"></iron-signals>
            <paper-button style="color: #fff; background-color: #0f9d58; min-width: 0;" class="enabled style-scope iptv-donate-button x-scope paper-button-0" role="button" tabindex="0" animated="" aria-disabled="false" elevation="1" raised="" aria-label="Donate to Ice_Poseidon">
                <div class="layout horizontal center-justified style-scope iptv-donate-button">
                    <div style="width: 24px; height: 24px;" class="icon-container layout horizontal center-center style-scope iptv-donate-button">
                        <yt-icon class="style-scope iptv-donate-button x-scope yt-icon-0">
                        </yt-icon>
                    </div>
                <iptv-formatted-string id="text" class="layout horizontal center-center style-scope iptv-donate-button" style="margin: 0 3px"><span class="style-scope iptv-formatted-string">DONATE</span></iptv-formatted-string>
                </div>
            </paper-button>
        </iptv-donate-button>`;

    const donateImage = `<img src="${donateIcon}" alt="dollar-sign" style="pointer-events: none; display: block; width: 100%; height: 100%;">`;

    // Insert donateButton next to sponsorButton
    const sponsorButton = '.style-scope.ytg-watch-footer.x-scope.ytg-membership-offer-button-0';

    $(sponsorButton).before(donateButton);
    $(donateButton).ready( function() { $('.style-scope.iptv-donate-button.x-scope.yt-icon-0').html(donateImage); });

    $('.style-scope.ytg-watch-footer.x-scope.iptv-donate-button-0').on('click', () => {
        window.open('https://youtube.streamlabs.com/iceposeidon#/', '_blank');
        $('.style-scope.ytg-watch-footer.x-scope.iptv-donate-button-0 paper-button')[0].blur();
    });

    // Change sponsorButton icon to star
    $(`${sponsorButton} .style-scope.ytg-membership-offer-button.x-scope.yt-icon-0`).html(sponsorImage);
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadingEmotesInfo;
/**
 * Show emote loading information.
 */
function loadingEmotesInfo()
{
    const div = document.createElement('div');

    $(div).text('Loading emotes...');

    $(div).css({
        'font-size': '16px',
        'position': 'absolute',
        'right': '25px',
        'bottom': '75px',
        'color': '#fff',
        'text-shadow': '2px 2px 2px rgba(0,0,0,0.75)'
    });

    $(div).addClass('iptv-loading-emotes');

    document.body.appendChild(div);
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWI1YzU3OTdlZTZmMGIzOTAzY2EiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9lbW90ZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlsLmpzIiwid2VicGFjazovLy8uL3BhZ2VDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0T2JzZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbWVudGlvbkhpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvZG9uYXRlQnV0dG9uLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvbG9hZGluZ0Vtb3Rlc0luZm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQ0E7QUFDaUI7O0FBRWpCO0FBQ0E7QUFDQSx5Rjs7OztBQUFBO0FBQUE7QUFBQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCLHNEQUFzRDtBQUNwRixDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0EsK0ZBQStGLFlBQVksYUFBYSxtQkFBbUIsb0JBQW9CLEVBQUUsK0RBQStELDBCQUEwQixFQUFFLDBEQUEwRCwwQkFBMEIsRUFBRTtBQUNsVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1GQUFtRixpQ0FBaUMsb0NBQW9DLEVBQUU7QUFDMUo7O0FBRUE7QUFDQSxzSkFBc0osaUJBQWlCLDBGQUEwRixrQ0FBa0MsRUFBRSxxSEFBcUgsa0NBQWtDLEVBQUUsNkRBQTZELGNBQWM7QUFDemdCOztBQUVBO0FBQ0EscUhBQXFILG1EQUFtRCw2QkFBNkIsRUFBRTtBQUN2TTs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7O0FDaEVvQjtBQUNlO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYixTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViLDJCQUEyQix3QkFBd0I7O0FBRW5EOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLG9CQUFvQjtBQUM1Qyx3QkFBd0Isb0JBQW9CO0FBQzVDLHdCQUF3QixvQkFBb0I7QUFDNUMsd0JBQXdCLG9CQUFvQjtBQUM1QywyQkFBMkIsb0JBQW9CO0FBQy9DLDJCQUEyQixvQkFBb0I7QUFDL0MsaUNBQWlDLHFCQUFxQjtBQUN0RCwyQkFBMkIscUJBQXFCO0FBQ2hELDZCQUE2QixxQkFBcUI7QUFDbEQsNEJBQTRCLHFCQUFxQjtBQUNqRCx5QkFBeUIsb0JBQW9CO0FBQzdDLDJCQUEyQixxQkFBcUI7QUFDaEQsMkJBQTJCLG9CQUFvQjtBQUMvQyw0QkFBNEIsb0JBQW9CO0FBQ2hELDBCQUEwQixxQkFBcUI7QUFDL0MsMEJBQTBCLG9CQUFvQjtBQUM5Qyw0QkFBNEIscUJBQXFCO0FBQ2pELHdCQUF3QixxQkFBcUI7QUFDN0MsMkJBQTJCLG9CQUFvQjtBQUMvQywwQkFBMEIscUJBQXFCO0FBQy9DLDRCQUE0QixvQkFBb0I7QUFDaEQsMkJBQTJCLHFCQUFxQjtBQUNoRCwyQkFBMkIscUJBQXFCO0FBQ2hELDRCQUE0QixxQkFBcUI7QUFDakQsd0JBQXdCLG9CQUFvQjtBQUM1Qyw0QkFBNEIscUJBQXFCO0FBQ2pELGdDQUFnQyxxQkFBcUI7QUFDckQsMEJBQTBCLHFCQUFxQjtBQUMvQywwQkFBMEIsb0JBQW9CO0FBQzlDLDRCQUE0QixxQkFBcUI7QUFDakQsMEJBQTBCLG9CQUFvQjtBQUM5QywwQkFBMEIscUJBQXFCO0FBQy9DLDJCQUEyQixvQkFBb0I7QUFDL0MsNEJBQTRCLG9CQUFvQjtBQUNoRCw2QkFBNkIsb0JBQW9CO0FBQ2pELDZCQUE2QixxQkFBcUI7QUFDbEQsMEJBQTBCLHFCQUFxQjtBQUMvQywwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUN0YkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBOzs7Ozs7Ozs7OztBQ25FQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNqRGtCOztBQUVsQjtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVLQUFnSTs7QUFFaEk7QUFDQTs7QUFFQSxpSUFBaUk7QUFDakk7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDcEJrRDs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLDBGQUEwRjtBQUMxRiw0QkFBNEIsMERBQW1CO0FBQy9DO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsd0NBQXdDO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyw0Q0FBNEM7QUFDakY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7Ozs7Ozs7O0FDdktBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7O0FDakNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0NBQXNDLFlBQVkseUNBQXlDLGdCQUFnQixhQUFhLGNBQWM7O0FBRXRJO0FBQ0EseURBQXlELGdEQUFnRCxhQUFhO0FBQ3RIO0FBQ0EsNkNBQTZDLDJCQUEyQixjQUFjO0FBQ3RGO0FBQ0EsNENBQTRDLGNBQWM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLFdBQVcsZ0RBQWdELGdCQUFnQixhQUFhLGNBQWM7O0FBRTNJO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsMEVBQTBFLEVBQUU7O0FBRW5IO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxTQUFTLGNBQWM7QUFDdkI7Ozs7Ozs7O0FDekNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDViNWM1Nzk3ZWU2ZjBiMzkwM2NhIiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xyXG5pbXBvcnQgUGFnZUNoZWNrIGZyb20gJy4vcGFnZUNoZWNrJztcclxuaW1wb3J0IHsgaXNOb2RlIH0gZnJvbSAnLi91dGlsJztcclxuXHJcbmV4cG9ydCBjb25zdCBESVNBTExPV0VEX0NIQVJTID0gWydcXFxcJywgJzonLCAnLycsICcmJywgXCInXCIsICdcIicsICc/JywgJyEnLCAnIyddLFxyXG4gICAgICAgICAgICAgU0NST0xMX0VOQUJMRURfVVJMID0gIGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdpY29ucy9zY3JvbGwtZW5hYmxlZC5wbmcnKSxcclxuICAgICAgICAgICAgIFNDUk9MTF9ESVNBQkxFRF9VUkwgPSAgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2ljb25zL3Njcm9sbC1kaXNhYmxlZC5wbmcnKTtcclxuXHJcbmV4cG9ydCBsZXQgb3B0aW9ucyA9IG51bGw7XHJcblxyXG5jb25zdCBvbk5ld1BhZ2VMb2FkID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJCgnW2NsYXNzXj1cImlwdHYtXCJdJykucmVtb3ZlKCk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9uc1sncmVkaXJlY3RUb1lUR2FtaW5nJ10gPT09IHRydWUpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KFBhZ2VDaGVjay55b3V0dWJlR2FtaW5nLCAyNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBQYWdlQ2hlY2subGl2ZXN0cmVhbVBhZ2UoKTtcclxufTtcclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkID4gdGl0bGUnKTtcclxuXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG11dGF0aW9uKSB7XHJcbiAgICAgICAgICAgIG9uTmV3UGFnZUxvYWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghaXNOb2RlKHRhcmdldCkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIHsgc3VidHJlZTogdHJ1ZSwgY2hhcmFjdGVyRGF0YTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlIH0pO1xyXG59KCkpO1xyXG5cclxuY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoJ3JlcXVlc3RMb2NhbHN0b3JhZ2UnLCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cclxuICAgIG9wdGlvbnMgPSByZXNwb25zZTtcclxuXHJcbiAgICBpZiAob3B0aW9uc1snZGlzYWJsZUF2YXRhcnMnXSkge1xyXG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4uc3R5bGUtc2NvcGUgLnl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXIgI2F1dGhvci1waG90byB7IHdpZHRoOiAwcHg7IGhlaWdodDogMHB4OyBtYXJnaW4tcmlnaHQ6IDBweDsgdmlzaWJpbGl0eTogaGlkZGVuOyB9LnN0eWxlLXNjb3BlLnl0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyLm5vLXRyYW5zaXRpb257IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfS5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlciAjYXZhdGFyIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zWydlbmFibGVDaGF0Q29sb3JzJ10pIHtcclxuICAgICAgICBjb25zdCBhID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2V4dGVybmFsL2NoYXQtY29sb3JzLmNzcycpO1xyXG4gICAgICAgICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiJyArIGEgKyAnXCIgPicpLmFwcGVuZFRvKCdoZWFkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnNbJ2VuYWJsZVNwbGl0Q2hhdCddKSB7XHJcbiAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgYm9yZGVyLXRvcDogMC41cHggc29saWQgIzMzMzMzMzsgYm9yZGVyLWJvdHRvbTogMC41cHggc29saWQgIzAwMDAwMDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihvcHRpb25zWydzaG93RGVsZXRlZE1lc3NhZ2VzJ10pIHtcclxuICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFtpcy1kZWxldGVkXTpub3QoW3Nob3ctb3JpZ2luYWxdKSAjbWVzc2FnZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHtkaXNwbGF5OiBpbmxpbmU7fSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2lzLWRlbGV0ZWRdOm5vdChbc2hvdy1vcmlnaW5hbF0pICNtZXNzYWdlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlOmJlZm9yZXtjb250ZW50OiBcIiAgXCJ9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKG9wdGlvbnNbJ21lbnRpb25IaWdobGlnaHQnXSkge1xyXG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wIC5tZW50aW9uLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDExNCwgMTUsIDE1LCAwKSAhaW1wb3J0YW50OyBwYWRkaW5nOiAwcHggMHB4ICFpbXBvcnRhbnQ7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25OZXdQYWdlTG9hZCgpO1xyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHJlcGxhY2VBbGwgfSBmcm9tICcuL3V0aWwnO1xyXG5pbXBvcnQgeyBvcHRpb25zLCBESVNBTExPV0VEX0NIQVJTIH0gZnJvbSAnLi9tYWluJztcclxuaW1wb3J0IGxvYWRpbmdFbW90ZXNJbmZvIGZyb20gJy4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mbyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbW90ZVxyXG57XHJcbiAgICAvKipcclxuICAgICAqIExvYWQgYWxsIGVuYWJsZWQgZW1vdGVzLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBsb2FkaW5nRW1vdGVzSW5mbygpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJGxvYWRpbmcgPSAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRsb2FkaW5nWzBdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGxvYWRpbmcuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnY29sb3InOiAnI2MwMzkyYicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnIzI4MjgyOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3JpZ2h0JzogJzE5cHgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbG9hZGluZy50ZXh0KCdGYWlsZWQgbG9hZGluZyBzb21lIGVtb3RlcyAoQVBJIHNlcnZlcnMgZG93biknKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sIDcuNSAqIDEwMDApO1xyXG5cclxuICAgICAgICB9LCAxMCAqIDEwMDApO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzVHdpdGNoJ10pIEVtb3RlLmxvYWRUd2l0Y2hFbW90ZXMoKTtcclxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzU3ViJ10pIEVtb3RlLmxvYWRTdWJFbW90ZXMoKTtcclxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzSWNlJ10pIEVtb3RlLmxvYWRJY2VFbW90ZXMoKTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnNbJ2Vtb3Rlc0JUVFYnXSkge1xyXG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkVtb3RlcygpO1xyXG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkNoYW5uZWxFbW90ZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEVtb3RlLndhaXRUaWxsRW1vdGVzTG9hZGVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0VGltZW91dCB0aGF0IGtlZXBzIHJ1bm5pbmcgdW50aWwgYWxsIGVtb3RlcyBhcmUgbG9hZGVkLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgd2FpdFRpbGxFbW90ZXNMb2FkZWQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICgob3B0aW9uc1snZW1vdGVzVHdpdGNoJ10gIT09IEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkKSB8fFxyXG4gICAgICAgICAgICAob3B0aW9uc1snZW1vdGVzU3ViJ10gIT09IEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkKSB8fFxyXG4gICAgICAgICAgICAob3B0aW9uc1snZW1vdGVzQlRUViddICE9PSBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQpIHx8XHJcbiAgICAgICAgICAgIChvcHRpb25zWydlbW90ZXNCVFRWJ10gIT09IEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkKSkge1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChFbW90ZS53YWl0VGlsbEVtb3Rlc0xvYWRlZCwgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGVtcCBmaXggdG8gcHJldmVudCByYW0gZnJvbSBmaWxsaW5nIHVwIHdpdGggbWVzc2FnZXMuXHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5tZXNzYWdlcyA9IHt9O1xyXG4gICAgICAgIH0sIDEwMDAgKiA2MCAqIDUpO1xyXG5cclxuICAgICAgICAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpLnJlbW92ZSgpO1xyXG4gICAgICAgIEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcygpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcGxhY2UgZXhpc3RpbmcgdGV4dCB3aXRoIGVtb3RlcyBpbiBjaGF0LCBoYXBwZW5zIHdoZW4gZW1vdGVzIGFyZSBkb25lIGxvYWRpbmcuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXBsYWNlRXhpc3RpbmdFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGNoYXRFbGVtZW50cyA9ICQoJy5zdHlsZS1zY29wZS55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyLngtc2NvcGUueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wJyk7XHJcblxyXG4gICAgICAgIGlmIChjaGF0RWxlbWVudHMubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcywgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hhdEVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLmVtb3RlQ2hlY2soZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBhIG1lc3NhZ2UgY29udGFpbnMgZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtub2RlfSBub2RlIC0gTWVzc2FnZSBub2RlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBlbW90ZUNoZWNrKG5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgJG1lc3NhZ2UgPSAkKG5vZGUpLmZpbmQoJyNtZXNzYWdlJyk7XHJcbiAgICAgICAgRW1vdGUua2FwcGFDaGVjaygkbWVzc2FnZSk7XHJcblxyXG4gICAgICAgIGxldCBvbGRIVE1MID0gJG1lc3NhZ2UuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICBsZXQgbXNnSFRNTCA9IG9sZEhUTUw7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgRW1vdGUubWVzc2FnZXNbbXNnSFRNTF0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHdvcmRzID0gbXNnSFRNTC5yZXBsYWNlKCcvXFx4RUZcXHhCQlxceEJGLycsICcnKS5yZXBsYWNlKCfvu78nLCAnJykuc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgY29uc3QgdW5pcXVlV29yZHMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IGVtb3RlQ291bnQgPSAwO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKHdvcmRzLCBmdW5jdGlvbiAoaSwgZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkoZWwsIHVuaXF1ZVdvcmRzKSA9PT0gLTEpIHVuaXF1ZVdvcmRzLnB1c2goZWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5pcXVlV29yZHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JkID0gdW5pcXVlV29yZHNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBFbW90ZS5lbW90ZXNbd29yZF0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZW1vdGVDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHdvcmQpO1xyXG4gICAgICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdoaW50LS10b3AnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBFbW90ZS5lbW90ZXNbd29yZF1bJ3VybCddO1xyXG4gICAgICAgICAgICAgICAgaW1nLmFsdCA9IHdvcmQ7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xyXG4gICAgICAgICAgICAgICAgaW1nLnN0eWxlLndpZHRoID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICAgICAgaW1nLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgICAgICAgICAgICAgc3Bhbi5hcHBlbmRDaGlsZChpbWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIG1zZ0hUTUwgPSByZXBsYWNlQWxsKG1zZ0hUTUwsIHdvcmQsIHNwYW4ub3V0ZXJIVE1MKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGVtb3RlQ291bnQgPCAxKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAkbWVzc2FnZS5odG1sKG1zZ0hUTUwpO1xyXG4gICAgICAgICAgICBFbW90ZS5tZXNzYWdlc1tvbGRIVE1MLnJlcGxhY2UoL1xccy9nLCcnKV0gPSBtc2dIVE1MO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkbWVzc2FnZS5odG1sKEVtb3RlLm1lc3NhZ2VzW29sZEhUTUxdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRtZXNzYWdlLnBhcmVudCgpLnBhcmVudCgpLmJpbmQoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRtZXNzYWdlID0gJCh0aGlzKS5maW5kKCcjbWVzc2FnZScpO1xyXG4gICAgICAgICAgICBFbW90ZS5rYXBwYUNoZWNrKCRtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBodG1sID0gJG1lc3NhZ2UuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZSgnL1xceEVGXFx4QkJcXHhCRi8nLCAnJykucmVwbGFjZSgn77u/JywgJycpLnJlcGxhY2UoL1xccy9nLCcnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgRW1vdGUubWVzc2FnZXNbaHRtbF0gIT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGh0bWwgPT0gRW1vdGUubWVzc2FnZXNbaHRtbF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJG1lc3NhZ2UuaHRtbChFbW90ZS5tZXNzYWdlc1todG1sXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIGEga2FwcGEgZW1vdGUuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge25vZGV9IG1zZyAtIE1lc3NhZ2Ugbm9kZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMga2FwcGFDaGVjayhtc2cpXHJcbiAgICB7XHJcbiAgICAgICAgJCgnaW1nJywgbXNnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJGltZyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoL1xcdWQ4M2NcXHVkZjFkL2cudGVzdCgkaW1nLmF0dHIoJ2FsdCcpKSkge1xyXG4gICAgICAgICAgICAgICAgJGltZy5yZXBsYWNlV2l0aChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnS2FwcGEnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIFR3aXRjaCBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkVHdpdGNoRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vdHdpdGNoZW1vdGVzLmNvbS9hcGlfY2FjaGUvdjIvZ2xvYmFsLmpzb24nKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJy8vc3RhdGljLWNkbi5qdHZudy5uZXQvZW1vdGljb25zL3YxLyc7XHJcblxyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbW90ZURpYyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2Vtb3RlcyddO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBlbW90ZSBpbiBlbW90ZURpYykge1xyXG5cclxuICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tlbW90ZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGVtb3RlRGljW2Vtb3RlXVsnaW1hZ2VfaWQnXSArICcvJyArICcxLjAnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgVHdpdGNoIHN1YnNjcmliZXIgZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZFN1YkVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL3R3aXRjaGVtb3Rlcy5jb20vYXBpX2NhY2hlL3YyL3N1YnNjcmliZXIuanNvbicpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnLy9zdGF0aWMtY2RuLmp0dm53Lm5ldC9lbW90aWNvbnMvdjEvJztcclxuXHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVtb3RlRGljID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnY2hhbm5lbHMnXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbm5lbCBpbiBlbW90ZURpYykge1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZURpY1tjaGFubmVsXVsnZW1vdGVzJ10pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGljdCA9IGVtb3RlRGljW2NoYW5uZWxdWydlbW90ZXMnXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2RlID0gZGljdFsnY29kZSddO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoRW1vdGUuaXNWYWxpZEVtb3RlKGNvZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tjb2RlXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBkaWN0WydpbWFnZV9pZCddICsgJy8nICsgJzEuMCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBCVFRWIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRCVFRWRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLmJldHRlcnR0di5uZXQvMi9lbW90ZXMnKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJy8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvJztcclxuXHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbW90ZUxpc3QgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZUxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVMaXN0W2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghRW1vdGUuY29udGFpbnNEaXNhbGxvd2VkQ2hhcihkaWN0Wydjb2RlJ10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2RpY3RbJ2NvZGUnXV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBkaWN0WydpZCddICsgJy8nICsgJzF4J1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgQlRUViBjaGFubmVsIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRCVFRWQ2hhbm5lbEVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY2hhbm5lbHMgPSBvcHRpb25zWydCVFRWQ2hhbm5lbHMnXTtcclxuICAgICAgICBjb25zdCBjb21tYUNoYW5uZWxzID0gY2hhbm5lbHMucmVwbGFjZSgvXFxzKy9nLCAnJykuc3BsaXQoJywnKTtcclxuXHJcbiAgICAgICAgY29tbWFDaGFubmVscy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFubmVsKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL2FwaS5iZXR0ZXJ0dHYubmV0LzIvY2hhbm5lbHMvJyArIGNoYW5uZWwpO1xyXG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICcvL2Nkbi5iZXR0ZXJ0dHYubmV0L2Vtb3RlLyc7XHJcblxyXG4gICAgICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50ID49IGNvbW1hQ2hhbm5lbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGVtb3RlTGlzdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2Vtb3RlcyddO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZUxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGljdCA9IGVtb3RlTGlzdFtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFFbW90ZS5jb250YWluc0Rpc2FsbG93ZWRDaGFyKGRpY3RbJ2NvZGUnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2RpY3RbJ2NvZGUnXV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZGljdFsnaWQnXSArICcvJyArICcxeCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBjaGFubmVsICsgJyAoYnR0diknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCA+PSBjb21tYUNoYW5uZWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgSWNlJ3Mgb2xkIHN1YnNjcmliZXIgZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZEljZUVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnaHR0cHM6Ly9zdGF0aWMtY2RuLmp0dm53Lm5ldC9lbW90aWNvbnMvdjEvJztcclxuXHJcbiAgICAgICAgY29uc3QgaWNlRW1vdGVzID0ge1xyXG4gICAgICAgICAgICBcInB1cnBsZTFcIjogeyBcImltYWdlX2lkXCI6IDk2ODczIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlMlwiOiB7IFwiaW1hZ2VfaWRcIjogOTY4NzQgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGUzXCI6IHsgXCJpbWFnZV9pZFwiOiA5Njg3NSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZTRcIjogeyBcImltYWdlX2lkXCI6IDk2ODc2IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQXJtMVwiOiB7IFwiaW1hZ2VfaWRcIjogODQ2ODcgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVBcm0yXCI6IHsgXCJpbWFnZV9pZFwiOiA4NDUzMyB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUJsdWVzY3JlZW5cIjogeyBcImltYWdlX2lkXCI6IDE1NzQxNSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUJydWhcIjogeyBcImltYWdlX2lkXCI6IDEzMjg5MyB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUNpZ3JpcFwiOiB7IFwiaW1hZ2VfaWRcIjogMTYxODI4IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQ3JlZXBcIjogeyBcImltYWdlX2lkXCI6IDE1MzYyMCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUN4XCI6IHsgXCJpbWFnZV9pZFwiOiA5MTg3NiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUVuemFcIjogeyBcImltYWdlX2lkXCI6IDEwNTQ0NCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUZha2VcIjogeyBcImltYWdlX2lkXCI6IDkxODc0IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlRnJhbmtcIjogeyBcImltYWdlX2lkXCI6IDc2NjQwIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlSHVoXCI6IHsgXCJpbWFnZV9pZFwiOiAxMzMyODYgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVJY2VcIjogeyBcImltYWdlX2lkXCI6IDgwMjE1IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlS0tvbmFcIjogeyBcImltYWdlX2lkXCI6IDEyMTc3MSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZU1cIjogeyBcImltYWdlX2lkXCI6IDEyMTc3MiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZU5vc2VcIjogeyBcImltYWdlX2lkXCI6IDY1MTUyIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlT21nXCI6IHsgXCJpbWFnZV9pZFwiOiAxNjA0NjIgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVQcmlkZVwiOiB7IFwiaW1hZ2VfaWRcIjogNjI1NjAgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVSb2ZsXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjE0OTUgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVUYWNvXCI6IHsgXCJpbWFnZV9pZFwiOiAxMzI3MjYgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVUaGlua1wiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNzcwIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlV1wiOiB7IFwiaW1hZ2VfaWRcIjogNzA4MzggfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVDbGF1c1wiOiB7IFwiaW1hZ2VfaWRcIjogMTMyNzM3IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQ29vbHN0b3J5XCI6IHsgXCJpbWFnZV9pZFwiOiAxNTM2MjEgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVEb2dcIjogeyBcImltYWdlX2lkXCI6IDEwNTIyOCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUZyb1wiOiB7IFwiaW1hZ2VfaWRcIjogODY0NDQgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVLa29uYVwiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNDk0IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlTGVvXCI6IHsgXCJpbWFnZV9pZFwiOiA3MzYzMiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUxVTFwiOiB7IFwiaW1hZ2VfaWRcIjogMTI2NTExIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlUmVhbFwiOiB7IFwiaW1hZ2VfaWRcIjogOTE4NzMgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVUaHVtcFwiOiB7IFwiaW1hZ2VfaWRcIjogODY1MDEgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVUb25ndWVcIjogeyBcImltYWdlX2lkXCI6IDcwODM4IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlV2FsbnV0XCI6IHsgXCJpbWFnZV9pZFwiOiAxMDkwODQgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVXYXRcIjogeyBcImltYWdlX2lkXCI6IDEwNTIyOSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVd1dFwiOiB7IFwiaW1hZ2VfaWRcIjogMTMzODQ0IH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IoY29uc3QgZW1vdGUgaW4gaWNlRW1vdGVzKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tlbW90ZV0gPSB7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgaWNlRW1vdGVzW2Vtb3RlXVsnaW1hZ2VfaWQnXSArICcvJyArICcxLjAnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRleHQgaXMgYSB2YWxpZCBlbW90ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzVmFsaWRFbW90ZSh0ZXh0KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAhKHRleHRbMF0ubWF0Y2goL1tBLVpdL2cpIHx8XHJcbiAgICAgICAgICAgIHRleHQubWF0Y2goL15bYS16XSskL2cpIHx8XHJcbiAgICAgICAgICAgIHRleHQubWF0Y2goL15cXGQqJC9nKVxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRleHQgY29udGFpbnMgZGlzYWxsb3dlZCBjaGFyYWN0ZXJzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHdvcmRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNvbnRhaW5zRGlzYWxsb3dlZENoYXIod29yZClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGMgaW4gRElTQUxMT1dFRF9DSEFSUykge1xyXG4gICAgICAgICAgICBpZiAod29yZC5pbmRleE9mKGMpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuRW1vdGUuc3RhdGVzID0ge1xyXG4gICAgdHdpdGNoOiB7XHJcbiAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIHN1Yjoge1xyXG4gICAgICAgIGxvYWRlZDogZmFsc2VcclxuICAgIH0sXHJcbiAgICBCVFRWOiB7XHJcbiAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIEJUVFZDaGFubmVsczoge1xyXG4gICAgICAgIGxvYWRlZDogZmFsc2UsXHJcbiAgICAgICAgbG9hZGVkQ291bnQ6IDBcclxuICAgIH1cclxufTtcclxuXHJcbkVtb3RlLmVtb3RlcyA9IHt9O1xyXG5FbW90ZS5tZXNzYWdlcyA9IHt9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Vtb3RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBmdW5jdGlvbiByZXBsYWNlQWxsKHN0ciwgZmluZCwgcmVwbGFjZSkge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoZmluZCwgJ2cnKSwgcmVwbGFjZSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNOb2RlKG8pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgdHlwZW9mIE5vZGUgPT09ICdvYmplY3QnID8gbyBpbnN0YW5jZW9mIE5vZGUgOiBvICYmIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygby5ub2RlVHlwZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG8ubm9kZU5hbWUgPT09ICdzdHJpbmcnXHJcbiAgICApO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWwuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xyXG5pbXBvcnQgeyBvcHRpb25zIH0gZnJvbSAnLi9tYWluJztcclxuaW1wb3J0IENoYXRPYnNlcnZlciBmcm9tICcuL2NoYXRPYnNlcnZlcic7XHJcbmltcG9ydCBkb25hdGVCdXR0b24gZnJvbSAnLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbic7XHJcbmltcG9ydCBjaGVja0lmV2F0Y2hpbmdMaXZlIGZyb20gJy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlJztcclxuaW1wb3J0IEFsd2F5c1Njcm9sbERvd24gZnJvbSAnLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZUNoZWNrXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHVzZXIgaXMgd2F0Y2hpbmcgZnJvbSB3cm9uZyBsaXZlc3RyZWFtIHBhZ2UgYW5kIHdhcm5zIHRoZW0uXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB5b3V0dWJlR2FtaW5nKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGl2ZS1jaGF0LWlmcmFtZScpO1xyXG5cclxuICAgICAgICBjb25zdCAkdGV4dFdyYXBwZXIgPSAkKCcueXQtdXNlci1pbmZvJyk7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9ICR0ZXh0V3JhcHBlci5maW5kKCdhJykudGV4dCgpO1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgICAgICBpZiAodGV4dCA9PSAnSWNlIFBvc2VpZG9uJyAmJiAhdXJsLmluY2x1ZGVzKCdnYW1pbmcueW91dHViZScpICYmIGlmcmFtZSkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVkaXJlY3RDb25maXJtID0gY29uZmlybSgnW0ljZSBQb3NlaWRvblRWXSBHbyB0byB0aGUgb2ZmaWNpYWwgSWNlIFBvc2VpZG9uIGxpdmVzdHJlYW0gcGFnZT8nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWRpcmVjdENvbmZpcm0gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICdodHRwczovL2dhbWluZy55b3V0dWJlLmNvbS9pY2VfcG9zZWlkb24vbGl2ZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHVzZXIgaXMgd2F0Y2hpbmcgYSBsaXZlc3RyZWFtIG9uIFlvdXR1YmUgZ2FtaW5nLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbGl2ZXN0cmVhbVBhZ2UoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvd25lcicpO1xyXG4gICAgICAgIGNvbnN0IGNoYXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhdCcpO1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSAkKHRhcmdldCkuZmluZCgnc3BhbicpLnRleHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgaWYgKCghdGFyZ2V0IHx8ICFjaGF0KSAmJiAoIXVybC5pbmNsdWRlcygnbGl2ZV9jaGF0JykgJiYgIXVybC5pbmNsdWRlcygnaXNfcG9wb3V0PTEnKSkpIHtcclxuXHJcbiAgICAgICAgICAgIFBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzKys7XHJcblxyXG4gICAgICAgICAgICBpZiAoUGFnZUNoZWNrLnN0cmVhbXBhZ2VDaGVja3MgPCAyNSkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChQYWdlQ2hlY2subGl2ZXN0cmVhbVBhZ2UsIDI1MCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zWydlbW90ZXNUd2l0Y2gnXSA9PT0gdHJ1ZSB8fCBvcHRpb25zWydlbW90ZXNTdWInXSA9PT0gdHJ1ZSB8fCBvcHRpb25zWydlbW90ZXNCVFRWJ10gPT09IHRydWUgfHwgb3B0aW9uc1snZW1vdGVzSWNlJ10gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgQ2hhdE9ic2VydmVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0ZXh0ID09ICdJY2UgUG9zZWlkb24nKSBkb25hdGVCdXR0b24oKTtcclxuXHJcbiAgICAgICAgRW1vdGUubG9hZEVtb3RlcygpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaW5pdCgpO1xyXG4gICAgICAgIGNoZWNrSWZXYXRjaGluZ0xpdmUoKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5QYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcyA9IDA7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcGFnZUNoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBFbW90ZSBmcm9tICcuL2Vtb3RlJztcclxuaW1wb3J0IE1lbnRpb25IaWdobGlnaHQgZnJvbSAnLi9tZW50aW9uSGlnaGxpZ2h0JztcclxuXHJcbi8qKlxyXG4gKiBCaW5kcyBjaGF0IG11dGF0aW9uIG9ic2VydmVyIGFuZCBsaXN0ZW4gZm9yIG5ldyBjaGF0IG1lc3NhZ2VzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hhdE9ic2VydmVyKClcclxue1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0eWxlLXNjb3BlIC55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyJyk7XHJcbiAgICBjb25zdCBhdXRob3JuYW1lID0gJCgnI2F1dGhvciAjYXV0aG9yLW5hbWUnKS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoY2hhdE9ic2VydmVyLCAyNTApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcclxuXHJcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdOb2RlcyA9IG11dGF0aW9uLmFkZGVkTm9kZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3Tm9kZXMgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCAkbm9kZXMgPSAkKG5ld05vZGVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRub2RlID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkbm9kZS5oYXNDbGFzcygneXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE1lbnRpb25IaWdobGlnaHQoJG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3RlQ2hlY2soJG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXHJcbiAgICAgICAgYXR0cmlidXRlczogZmFsc2UsXHJcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NoYXRPYnNlcnZlci5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBvcHRpb25zIH0gZnJvbSAnLi9tYWluJztcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIG1lbnRpb24gYW5kIGNoYW5nZXMgYmFja2dyb3VuZCB0byBCVFRWIHN0eWxlIGJhY2tncm91bmQuXHJcbiAqIEBwYXJhbSB7bm9kZX0gbm9kZSAtIE1lc3NhZ2Ugbm9kZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWVudGlvbkhpZ2hsaWdodChub2RlKVxyXG57XHJcbiAgICBjb25zdCBhdXRob3JuYW1lID0gJCgnI2F1dGhvciAjYXV0aG9yLW5hbWUnKS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBpZiAob3B0aW9uc1snbWVudGlvbkhpZ2hsaWdodCddICYmIGF1dGhvcm5hbWUubGVuZ3RoID4gMiAmJiAhbm9kZS5oYXNDbGFzcygneXQtbGl2ZS1jaGF0LWxlZ2FjeS1wYWlkLW1lc3NhZ2UtcmVuZGVyZXItMCcpKSB7IC8vIENoZWNrIGl0J3Mgbm90IHNwb25zb3IgLyBzdXBlcmNoYXQsIGFsc28gbWVudGlvbkhpZ2hsaWdodCBlbmFibGVkXHJcblxyXG4gICAgICAgIGNvbnN0IHVuaXF1ZWlkID0gbm9kZS5nZXQoMCkuZ2V0QXR0cmlidXRlKCdpZCcpIC8vIENvcHkgdW5pcXVlIG1lc3NhZ2UgaWRcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gKFwiIFwiICsgbm9kZS5maW5kKCcjbWVzc2FnZScpLnRleHQoKS50b0xvd2VyQ2FzZSgpICsgXCIgXCIpLnJlcGxhY2UoL1tcXHUyMDBCLVxcdTIwMERcXHVGRUZGXS9nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmICh1bmlxdWVpZC5sZW5ndGggPiAzMCAmJiAobWVzc2FnZS5pbmRleE9mKCcgJythdXRob3JuYW1lKycgJykgIT09IC0xIHx8IG1lc3NhZ2UuaW5kZXhPZignQCcrYXV0aG9ybmFtZSsnICcpICE9PSAtMSkpIHsgLy8gSWYgeW91ciBuYW1lIGlzIGluIHRoZSBtZXNzYWdlLCBhbmQgaXQncyBub3QgeW91ciBtZXNzYWdlXHJcbiAgICAgICAgICAgIG5vZGUuZ2V0KDApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgyNTUsMCwwLDAuNDApXCI7XHJcbiAgICAgICAgICAgIG5vZGUuZmluZCgnI2F1dGhvci1uYW1lJykuZ2V0KDApLnN0eWxlLmNvbG9yID0gXCIjZmZmZmZmXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL21lbnRpb25IaWdobGlnaHQuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgU0NST0xMX0VOQUJMRURfVVJMLCBTQ1JPTExfRElTQUJMRURfVVJMIH0gZnJvbSAnLi8uLi9tYWluJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsd2F5c1Njcm9sbERvd25cclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIG92ZXJsYXkgYW5kIGJpbmRzIHRoZSBuZWNlc3NhcnkgbGlzdGVuZXJzLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpbml0KClcclxuICAgIHtcclxuICAgICAgICBpZiAoJCgnLmlwdHYtc2Nyb2xsZG93bi13cmFwcGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICQoJy5pcHR2LXNjcm9sbGRvd24td3JhcHBlcicpLnJlbW92ZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHNjcm9sbFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgc2Nyb2xsV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQWx3YXlzIHNjcm9sbCBkb3duIChFbmFibGVkKScpO1xyXG4gICAgICAgIHNjcm9sbFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaGludC0tdG9wJywgJ2lwdHYtc2Nyb2xsZG93bi13cmFwcGVyJyk7XHJcblxyXG4gICAgICAgICQoc2Nyb2xsV3JhcHBlcikuY3NzKHtcclxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgJ3JpZ2h0JzogJzExM3B4JyxcclxuICAgICAgICAgICAgJ2JvdHRvbSc6ICcxOHB4J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKHNjcm9sbFdyYXBwZXIpLmh0bWwoYFxyXG4gICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJpcHR2LXNjcm9sbGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJvdXRsaW5lOiAwO1wiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke1NDUk9MTF9FTkFCTEVEX1VSTH1cIiBhbHQ9XCJBbHdheXMgc2Nyb2xsIGRvd25cIiBoZWlnaHQ9XCIxMVwiIHdpZHRoPVwiMTFcIiBjbGFzcz1cImlwdHYtc2Nyb2xsZG93bi10b2dnbGUtaWNvblwiPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgYCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsV3JhcHBlcik7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaXB0di1zY3JvbGxkb3duLXRvZ2dsZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjaXRlbS1zY3JvbGxlcicpLnNjcm9sbFRvcCg5OTk5OTk5OTkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5oaWRlU2Nyb2xsT25DaW5lbWEoc2Nyb2xsV3JhcHBlcik7XHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5oaWRlU2Nyb2xsT25TcG9uc29yTWVudShzY3JvbGxXcmFwcGVyKTtcclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbERvd25MaXN0ZW5lcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGVzIHRoZSAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IHdoZW4gY2luZW1hIG1vZGUgaXMgb3BlblxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtub2RlfSBzY3JvbGxXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlU2Nyb2xsT25DaW5lbWEoc2Nyb2xsV3JhcHBlcilcclxuICAgIHtcclxuICAgICAgICBjb25zdCB3YXRjaFBhZ2UgPSAneXRnLXdhdGNoLXBhZ2UnO1xyXG5cclxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJChtLnRhcmdldCkuaXMoJ1tzaWRlYmFyLWNvbGxhcHNlZF0nKSA/ICQoc2Nyb2xsV3JhcHBlcikuaGlkZSgpIDogJChzY3JvbGxXcmFwcGVyKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBvYnNlcnZlck9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ3NpZGViYXItY29sbGFwc2VkJ11cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGFkZE9ic2VydmVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoJCh3YXRjaFBhZ2UpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSgkKHdhdGNoUGFnZSlbMF0sIG9ic2VydmVyT3B0cyk7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGFkZE9ic2VydmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDI1MCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZXMgdGhlICdBbHdheXMgc2Nyb2xsIGRvd24nIG92ZXJsYXkgd2hlbiBzcG9uc29yIG1lbnUgaXMgb3Blbi5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bm9kZX0gc2Nyb2xsV3JhcHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGlkZVNjcm9sbE9uU3BvbnNvck1lbnUoc2Nyb2xsV3JhcHBlcilcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjaGF0SW5wdXRSZW5kZXJlciA9ICd5dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlcic7XHJcblxyXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xyXG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJChtLnRhcmdldCkuYXR0cignY3JlYXRvci1vcGVuJykgPyAkKHNjcm9sbFdyYXBwZXIpLmhpZGUoKSA6ICQoc2Nyb2xsV3JhcHBlcikuc2hvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJPcHRzID0ge1xyXG4gICAgICAgICAgICBjaGlsZExpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydjcmVhdG9yLW9wZW4nXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3BvbnNvckNsaWNrID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoJChjaGF0SW5wdXRSZW5kZXJlcikubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKCQoY2hhdElucHV0UmVuZGVyZXIpWzBdLCBvYnNlcnZlck9wdHMpO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzcG9uc29yQ2xpY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMjUwKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBmdW5jdGlvbmFsaXR5IHdoZW4gc2Nyb2xsaW5nIG1hbnVhbGx5LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYmluZFNjcm9sbExpc3RlbmVyKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlbS1zY3JvbGxlcicpO1xyXG5cclxuICAgICAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsTGlzdGVuZXIoKSB9LCAyNTApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcjaXRlbS1zY3JvbGxlcicpLmJpbmQoJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi50b2dnbGVTY3JvbGxEb3duKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmFibGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIGZ1bmN0aW9uYWxpdHkgd2hlbiBibHVlIGp1bXAgZG93biBidXR0b24gaXMgY2xpY2tlZC5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LW1vcmUnKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4geyBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKSB9LCAyNTApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YXJnZXQub25tb3VzZWRvd24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bih0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb2dnbGUgc2Nyb2xsRG93biBzdGF0ZSBhbmQgYWRqdXN0IG92ZXJsYXkgYWNjb3JkaW5nbHkuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0b2dnbGVTY3JvbGxEb3duKHN0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSAhQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9IHN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLmlwdHYtc2Nyb2xsZG93bi13cmFwcGVyJykuYXR0cignYXJpYS1sYWJlbCcsIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA/ICdBbHdheXMgc2Nyb2xsIGRvd24gKEVuYWJsZWQpJyA6ICdBbHdheXMgc2Nyb2xsIGRvd24gKERpc2FibGVkKScpO1xyXG4gICAgICAgICQoJy5pcHR2LXNjcm9sbGRvd24tdG9nZ2xlLWljb24nKS5hdHRyKCdzcmMnLCBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPyBTQ1JPTExfRU5BQkxFRF9VUkwgOiBTQ1JPTExfRElTQUJMRURfVVJMKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5BbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSB0cnVlO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvYWx3YXlzU2Nyb2xsRG93bi5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQ2hlY2tzIGlmIHVzZXIgaXMgYmVoaW5kIGluIGxpdmVzdHJlYW0gYW5kIHdhcm5zIHRoZW0uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja0lmV2F0Y2hpbmdMaXZlKCkge1xyXG5cclxuICAgIGxldCBsaXZlQ2hlY2tJbnRlcnZhbCA9IG51bGw7XHJcblxyXG4gICAgbGl2ZUNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgY29uc3QgJGxpdmVCdXR0b24gPSAkKCcueXRwLWxpdmUtYmFkZ2UueXRwLWJ1dHRvbicpO1xyXG5cclxuICAgICAgICBpZiAoJGxpdmVCdXR0b24uaXMoJzplbmFibGVkJykgJiYgJGxpdmVCdXR0b24uaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgJCgnI3BsYXllci1jb250YWluZXInKS5hcHBlbmQoYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgWW91XFwncmUgd2F0Y2hpbmcgb2xkIGZvb3RhZ2UsIGNsaWNrIHRoZSBMSVZFIGJ1dHRvbiBpbiB0aGUgYm90dG9tIGxlZnQgY29ybmVyIHRvIHdhdGNoIGxpdmUuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLWRpc21pc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctY2xvc2VcIj7inJU8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMTUgKiAxMDAwKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmlwdHYtbGl2ZS13YXJuaW5nLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmlwdHYtbGl2ZS13YXJuaW5nJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsaXZlQ2hlY2tJbnRlcnZhbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignbW91c2Vkb3duJywgJy55dHAtbGl2ZS1iYWRnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5pcHR2LWxpdmUtd2FybmluZycpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBBZGRzIGRvbmF0ZSBidXR0b24gdG8gbGl2ZXN0cmVhbSBwYWdlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZG9uYXRlQnV0dG9uKClcclxue1xyXG4gICAgJCgnLmlwdHYtZG9uYXRlLWJ1dHRvbi0wJykucmVtb3ZlKCk7XHJcblxyXG4gICAgY29uc3QgZG9uYXRlSWNvbiA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvZG9uYXRlLWljb24ucG5nJyk7XHJcbiAgICBjb25zdCBzcG9uc29ySWNvbiA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvc3BvbnNvci1pY29uLnBuZycpO1xyXG5cclxuICAgIGNvbnN0IHNwb25zb3JJbWFnZSA9IGA8aW1nIHNyYz1cIiR7c3BvbnNvckljb259XCIgYWx0PVwic3RhclwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPmA7XHJcblxyXG4gICAgY29uc3QgZG9uYXRlQnV0dG9uID0gYFxyXG4gICAgICAgIDxpcHR2LWRvbmF0ZS1idXR0b24gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgcmFpc2VkPVwiXCIgc3VwcG9ydGVkLWNvbGQtbG9hZC1hY3Rpb25zPVwiWyZxdW90O3Nwb25zb3ImcXVvdDtdXCIgd2FpdC1mb3Itc2lnbmFsPVwid2F0Y2gtcGFnZS1pbml0aWFsaXplZFwiIGNsYXNzPVwic3R5bGUtc2NvcGUgeXRnLXdhdGNoLWZvb3RlciB4LXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvbi0wXCI+XHJcbiAgICAgICAgICAgIDxpcm9uLXNpZ25hbHMgY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj48L2lyb24tc2lnbmFscz5cclxuICAgICAgICAgICAgPHBhcGVyLWJ1dHRvbiBzdHlsZT1cImNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kLWNvbG9yOiAjMGY5ZDU4OyBtaW4td2lkdGg6IDA7XCIgY2xhc3M9XCJlbmFibGVkIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvbiB4LXNjb3BlIHBhcGVyLWJ1dHRvbi0wXCIgcm9sZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiIGFuaW1hdGVkPVwiXCIgYXJpYS1kaXNhYmxlZD1cImZhbHNlXCIgZWxldmF0aW9uPVwiMVwiIHJhaXNlZD1cIlwiIGFyaWEtbGFiZWw9XCJEb25hdGUgdG8gSWNlX1Bvc2VpZG9uXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWp1c3RpZmllZCBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDI0cHg7IGhlaWdodDogMjRweDtcIiBjbGFzcz1cImljb24tY29udGFpbmVyIGxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx5dC1pY29uIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uIHgtc2NvcGUgeXQtaWNvbi0wXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwveXQtaWNvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpcHR2LWZvcm1hdHRlZC1zdHJpbmcgaWQ9XCJ0ZXh0XCIgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItY2VudGVyIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiIHN0eWxlPVwibWFyZ2luOiAwIDNweFwiPjxzcGFuIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1mb3JtYXR0ZWQtc3RyaW5nXCI+RE9OQVRFPC9zcGFuPjwvaXB0di1mb3JtYXR0ZWQtc3RyaW5nPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvcGFwZXItYnV0dG9uPlxyXG4gICAgICAgIDwvaXB0di1kb25hdGUtYnV0dG9uPmA7XHJcblxyXG4gICAgY29uc3QgZG9uYXRlSW1hZ2UgPSBgPGltZyBzcmM9XCIke2RvbmF0ZUljb259XCIgYWx0PVwiZG9sbGFyLXNpZ25cIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIj5gO1xyXG5cclxuICAgIC8vIEluc2VydCBkb25hdGVCdXR0b24gbmV4dCB0byBzcG9uc29yQnV0dG9uXHJcbiAgICBjb25zdCBzcG9uc29yQnV0dG9uID0gJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUueXRnLW1lbWJlcnNoaXAtb2ZmZXItYnV0dG9uLTAnO1xyXG5cclxuICAgICQoc3BvbnNvckJ1dHRvbikuYmVmb3JlKGRvbmF0ZUJ1dHRvbik7XHJcbiAgICAkKGRvbmF0ZUJ1dHRvbikucmVhZHkoIGZ1bmN0aW9uKCkgeyAkKCcuc3R5bGUtc2NvcGUuaXB0di1kb25hdGUtYnV0dG9uLngtc2NvcGUueXQtaWNvbi0wJykuaHRtbChkb25hdGVJbWFnZSk7IH0pO1xyXG5cclxuICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1kb25hdGUtYnV0dG9uLTAnKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgd2luZG93Lm9wZW4oJ2h0dHBzOi8veW91dHViZS5zdHJlYW1sYWJzLmNvbS9pY2Vwb3NlaWRvbiMvJywgJ19ibGFuaycpO1xyXG4gICAgICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1kb25hdGUtYnV0dG9uLTAgcGFwZXItYnV0dG9uJylbMF0uYmx1cigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ2hhbmdlIHNwb25zb3JCdXR0b24gaWNvbiB0byBzdGFyXHJcbiAgICAkKGAke3Nwb25zb3JCdXR0b259IC5zdHlsZS1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24ueC1zY29wZS55dC1pY29uLTBgKS5odG1sKHNwb25zb3JJbWFnZSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9kb25hdGVCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIFNob3cgZW1vdGUgbG9hZGluZyBpbmZvcm1hdGlvbi5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRpbmdFbW90ZXNJbmZvKClcclxue1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgJChkaXYpLnRleHQoJ0xvYWRpbmcgZW1vdGVzLi4uJyk7XHJcblxyXG4gICAgJChkaXYpLmNzcyh7XHJcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxNnB4JyxcclxuICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICdyaWdodCc6ICcyNXB4JyxcclxuICAgICAgICAnYm90dG9tJzogJzc1cHgnLFxyXG4gICAgICAgICdjb2xvcic6ICcjZmZmJyxcclxuICAgICAgICAndGV4dC1zaGFkb3cnOiAnMnB4IDJweCAycHggcmdiYSgwLDAsMCwwLjc1KSdcclxuICAgIH0pO1xyXG5cclxuICAgICQoZGl2KS5hZGRDbGFzcygnaXB0di1sb2FkaW5nLWVtb3RlcycpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2xvYWRpbmdFbW90ZXNJbmZvLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=
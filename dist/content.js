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

    /* Temp fix */
    if (authorname === null) {
        return false;
    }

    if (__WEBPACK_IMPORTED_MODULE_0__main__["options"]['mentionHighlight'] && authorname.length > 2 && !node.hasClass('yt-live-chat-legacy-paid-message-renderer-0')) { // Check it's not sponsor / superchat, also mentionHighlight enabled

        const uniqueid = node.get(0).getAttribute('id') // Copy unique message id
        const message = (" " + node.find('#message').text().toLowerCase() + " ").replace(/[\u200B-\u200D\uFEFF]/g, '');

        if (uniqueid.length > 30 && (authorname == "ice poseidon" || message.indexOf(' '+authorname+' ') !== -1 || message.indexOf('@'+authorname+' ') !== -1)) { // If your name is in the message, and it's not your message
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

        $('#item-scroller').on('mousewheel DOMMouseScroll', function (event) {
            AlwaysScrollDown.toggleScrollDown(false);
        });

        $('#item-scroller').on('mousedown', function (event) {
            if(event.target === this) {
                AlwaysScrollDown.toggleScrollDown(false);
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTE3ZmU5MmEyZDU0Njg2YWZlYTYiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9lbW90ZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlsLmpzIiwid2VicGFjazovLy8uL3BhZ2VDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0T2JzZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbWVudGlvbkhpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvZG9uYXRlQnV0dG9uLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvbG9hZGluZ0Vtb3Rlc0luZm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQ0E7QUFDaUI7O0FBRWpCO0FBQ0E7QUFDQSx5Rjs7OztBQUFBO0FBQUE7QUFBQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCLHNEQUFzRDtBQUNwRixDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0EsK0ZBQStGLFlBQVksYUFBYSxtQkFBbUIsb0JBQW9CLEVBQUUsK0RBQStELDBCQUEwQixFQUFFLDBEQUEwRCwwQkFBMEIsRUFBRTtBQUNsVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1GQUFtRixpQ0FBaUMsb0NBQW9DLEVBQUU7QUFDMUo7O0FBRUE7QUFDQSxzSkFBc0osaUJBQWlCLDBGQUEwRixrQ0FBa0MsRUFBRSxxSEFBcUgsa0NBQWtDLEVBQUUsNkRBQTZELGNBQWM7QUFDemdCOztBQUVBO0FBQ0EscUhBQXFILG1EQUFtRCw2QkFBNkIsRUFBRTtBQUN2TTs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7O0FDaEVvQjtBQUNlO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYixTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViLDJCQUEyQix3QkFBd0I7O0FBRW5EOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLG9CQUFvQjtBQUM1Qyx3QkFBd0Isb0JBQW9CO0FBQzVDLHdCQUF3QixvQkFBb0I7QUFDNUMsd0JBQXdCLG9CQUFvQjtBQUM1QywyQkFBMkIsb0JBQW9CO0FBQy9DLDJCQUEyQixvQkFBb0I7QUFDL0MsaUNBQWlDLHFCQUFxQjtBQUN0RCwyQkFBMkIscUJBQXFCO0FBQ2hELDZCQUE2QixxQkFBcUI7QUFDbEQsNEJBQTRCLHFCQUFxQjtBQUNqRCx5QkFBeUIsb0JBQW9CO0FBQzdDLDJCQUEyQixxQkFBcUI7QUFDaEQsMkJBQTJCLG9CQUFvQjtBQUMvQyw0QkFBNEIsb0JBQW9CO0FBQ2hELDBCQUEwQixxQkFBcUI7QUFDL0MsMEJBQTBCLG9CQUFvQjtBQUM5Qyw0QkFBNEIscUJBQXFCO0FBQ2pELHdCQUF3QixxQkFBcUI7QUFDN0MsMkJBQTJCLG9CQUFvQjtBQUMvQywwQkFBMEIscUJBQXFCO0FBQy9DLDRCQUE0QixvQkFBb0I7QUFDaEQsMkJBQTJCLHFCQUFxQjtBQUNoRCwyQkFBMkIscUJBQXFCO0FBQ2hELDRCQUE0QixxQkFBcUI7QUFDakQsd0JBQXdCLG9CQUFvQjtBQUM1Qyw0QkFBNEIscUJBQXFCO0FBQ2pELGdDQUFnQyxxQkFBcUI7QUFDckQsMEJBQTBCLHFCQUFxQjtBQUMvQywwQkFBMEIsb0JBQW9CO0FBQzlDLDRCQUE0QixxQkFBcUI7QUFDakQsMEJBQTBCLG9CQUFvQjtBQUM5QywwQkFBMEIscUJBQXFCO0FBQy9DLDJCQUEyQixvQkFBb0I7QUFDL0MsNEJBQTRCLG9CQUFvQjtBQUNoRCw2QkFBNkIsb0JBQW9CO0FBQ2pELDZCQUE2QixxQkFBcUI7QUFDbEQsMEJBQTBCLHFCQUFxQjtBQUMvQywwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUN0YkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBOzs7Ozs7Ozs7OztBQ25FQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNqRGtCOztBQUVsQjtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVLQUFnSTs7QUFFaEk7QUFDQTs7QUFFQSxpS0FBaUs7QUFDaks7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQzFCa0Q7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSwwRkFBMEY7QUFDMUYsNEJBQTRCLDBEQUFtQjtBQUMvQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLHdDQUF3QztBQUN0RTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLDRDQUE0QztBQUNqRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTs7Ozs7Ozs7QUMzS0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7QUNqQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQ0FBc0MsWUFBWSx5Q0FBeUMsZ0JBQWdCLGFBQWEsY0FBYzs7QUFFdEk7QUFDQSx5REFBeUQsZ0RBQWdELGFBQWE7QUFDdEg7QUFDQSw2Q0FBNkMsMkJBQTJCLGNBQWM7QUFDdEY7QUFDQSw0Q0FBNEMsY0FBYztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMsV0FBVyxnREFBZ0QsZ0JBQWdCLGFBQWEsY0FBYzs7QUFFM0k7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QywwRUFBMEUsRUFBRTs7QUFFbkg7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLFNBQVMsY0FBYztBQUN2Qjs7Ozs7Ozs7QUN6Q0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0EiLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTE3ZmU5MmEyZDU0Njg2YWZlYTYiLCJpbXBvcnQgRW1vdGUgZnJvbSAnLi9lbW90ZSc7XG5pbXBvcnQgUGFnZUNoZWNrIGZyb20gJy4vcGFnZUNoZWNrJztcbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjb25zdCBESVNBTExPV0VEX0NIQVJTID0gWydcXFxcJywgJzonLCAnLycsICcmJywgXCInXCIsICdcIicsICc/JywgJyEnLCAnIyddLFxuICAgICAgICAgICAgIFNDUk9MTF9FTkFCTEVEX1VSTCA9ICBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc2Nyb2xsLWVuYWJsZWQucG5nJyksXG4gICAgICAgICAgICAgU0NST0xMX0RJU0FCTEVEX1VSTCA9ICBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc2Nyb2xsLWRpc2FibGVkLnBuZycpO1xuXG5leHBvcnQgbGV0IG9wdGlvbnMgPSBudWxsO1xuXG5jb25zdCBvbk5ld1BhZ2VMb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAkKCdbY2xhc3NePVwiaXB0di1cIl0nKS5yZW1vdmUoKTtcblxuICAgIGlmIChvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnNbJ3JlZGlyZWN0VG9ZVEdhbWluZyddID09PSB0cnVlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoUGFnZUNoZWNrLnlvdXR1YmVHYW1pbmcsIDI1MDApO1xuICAgIH1cblxuICAgIFBhZ2VDaGVjay5saXZlc3RyZWFtUGFnZSgpO1xufTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCA+IHRpdGxlJyk7XG5cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtdXRhdGlvbikge1xuICAgICAgICAgICAgb25OZXdQYWdlTG9hZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmICghaXNOb2RlKHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7IHN1YnRyZWU6IHRydWUsIGNoYXJhY3RlckRhdGE6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSB9KTtcbn0oKSk7XG5cbmNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKCdyZXF1ZXN0TG9jYWxzdG9yYWdlJywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblxuICAgIG9wdGlvbnMgPSByZXNwb25zZTtcblxuICAgIGlmIChvcHRpb25zWydkaXNhYmxlQXZhdGFycyddKSB7XG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4uc3R5bGUtc2NvcGUgLnl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXIgI2F1dGhvci1waG90byB7IHdpZHRoOiAwcHg7IGhlaWdodDogMHB4OyBtYXJnaW4tcmlnaHQ6IDBweDsgdmlzaWJpbGl0eTogaGlkZGVuOyB9LnN0eWxlLXNjb3BlLnl0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyLm5vLXRyYW5zaXRpb257IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfS5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlciAjYXZhdGFyIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zWydlbmFibGVDaGF0Q29sb3JzJ10pIHtcbiAgICAgICAgY29uc3QgYSA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdleHRlcm5hbC9jaGF0LWNvbG9ycy5jc3MnKTtcbiAgICAgICAgJCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCInICsgYSArICdcIiA+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9uc1snZW5hYmxlU3BsaXRDaGF0J10pIHtcbiAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgYm9yZGVyLXRvcDogMC41cHggc29saWQgIzMzMzMzMzsgYm9yZGVyLWJvdHRvbTogMC41cHggc29saWQgIzAwMDAwMDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICB9XG5cbiAgICBpZihvcHRpb25zWydzaG93RGVsZXRlZE1lc3NhZ2VzJ10pIHtcbiAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTBbaXMtZGVsZXRlZF06bm90KFtzaG93LW9yaWdpbmFsXSkgI21lc3NhZ2UueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7ZGlzcGxheTogaW5saW5lO30gLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMCAjZGVsZXRlZC1zdGF0ZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSk7IH0gLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFtpcy1kZWxldGVkXTpub3QoW3Nob3ctb3JpZ2luYWxdKSAjbWVzc2FnZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSk7IH0gLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMCAjZGVsZXRlZC1zdGF0ZTpiZWZvcmV7Y29udGVudDogXCIgIFwifTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICB9XG5cbiAgICBpZihvcHRpb25zWydtZW50aW9uSGlnaGxpZ2h0J10pIHtcbiAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTAgLm1lbnRpb24ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTE0LCAxNSwgMTUsIDApICFpbXBvcnRhbnQ7IHBhZGRpbmc6IDBweCAwcHggIWltcG9ydGFudDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICB9XG5cbiAgICBvbk5ld1BhZ2VMb2FkKCk7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyByZXBsYWNlQWxsIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IG9wdGlvbnMsIERJU0FMTE9XRURfQ0hBUlMgfSBmcm9tICcuL21haW4nO1xuaW1wb3J0IGxvYWRpbmdFbW90ZXNJbmZvIGZyb20gJy4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtb3RlXG57XG4gICAgLyoqXG4gICAgICogTG9hZCBhbGwgZW5hYmxlZCBlbW90ZXMuXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRFbW90ZXMoKVxuICAgIHtcbiAgICAgICAgbG9hZGluZ0Vtb3Rlc0luZm8oKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBjb25zdCAkbG9hZGluZyA9ICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJyk7XG5cbiAgICAgICAgICAgIGlmICgkbG9hZGluZ1swXSkge1xuXG4gICAgICAgICAgICAgICAgJGxvYWRpbmcuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgJ2NvbG9yJzogJyNjMDM5MmInLFxuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjMjgyODI4JyxcbiAgICAgICAgICAgICAgICAgICAgJ3JpZ2h0JzogJzE5cHgnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkbG9hZGluZy50ZXh0KCdGYWlsZWQgbG9hZGluZyBzb21lIGVtb3RlcyAoQVBJIHNlcnZlcnMgZG93biknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgNy41ICogMTAwMCk7XG5cbiAgICAgICAgfSwgMTAgKiAxMDAwKTtcblxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzVHdpdGNoJ10pIEVtb3RlLmxvYWRUd2l0Y2hFbW90ZXMoKTtcbiAgICAgICAgaWYgKG9wdGlvbnNbJ2Vtb3Rlc1N1YiddKSBFbW90ZS5sb2FkU3ViRW1vdGVzKCk7XG4gICAgICAgIGlmIChvcHRpb25zWydlbW90ZXNJY2UnXSkgRW1vdGUubG9hZEljZUVtb3RlcygpO1xuXG4gICAgICAgIGlmIChvcHRpb25zWydlbW90ZXNCVFRWJ10pIHtcbiAgICAgICAgICAgIEVtb3RlLmxvYWRCVFRWRW1vdGVzKCk7XG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkNoYW5uZWxFbW90ZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEVtb3RlLndhaXRUaWxsRW1vdGVzTG9hZGVkKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHNldFRpbWVvdXQgdGhhdCBrZWVwcyBydW5uaW5nIHVudGlsIGFsbCBlbW90ZXMgYXJlIGxvYWRlZC5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHdhaXRUaWxsRW1vdGVzTG9hZGVkKClcbiAgICB7XG4gICAgICAgIGlmICgob3B0aW9uc1snZW1vdGVzVHdpdGNoJ10gIT09IEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkKSB8fFxuICAgICAgICAgICAgKG9wdGlvbnNbJ2Vtb3Rlc1N1YiddICE9PSBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCkgfHxcbiAgICAgICAgICAgIChvcHRpb25zWydlbW90ZXNCVFRWJ10gIT09IEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCkgfHxcbiAgICAgICAgICAgIChvcHRpb25zWydlbW90ZXNCVFRWJ10gIT09IEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkKSkge1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KEVtb3RlLndhaXRUaWxsRW1vdGVzTG9hZGVkLCAyNTApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGVtcCBmaXggdG8gcHJldmVudCByYW0gZnJvbSBmaWxsaW5nIHVwIHdpdGggbWVzc2FnZXMuXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEVtb3RlLm1lc3NhZ2VzID0ge307XG4gICAgICAgIH0sIDEwMDAgKiA2MCAqIDUpO1xuXG4gICAgICAgICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJykucmVtb3ZlKCk7XG4gICAgICAgIEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcygpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlIGV4aXN0aW5nIHRleHQgd2l0aCBlbW90ZXMgaW4gY2hhdCwgaGFwcGVucyB3aGVuIGVtb3RlcyBhcmUgZG9uZSBsb2FkaW5nLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVwbGFjZUV4aXN0aW5nRW1vdGVzKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGNoYXRFbGVtZW50cyA9ICQoJy5zdHlsZS1zY29wZS55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyLngtc2NvcGUueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wJyk7XG5cbiAgICAgICAgaWYgKGNoYXRFbGVtZW50cy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcywgMjUwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoYXRFbGVtZW50cy5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgICAgRW1vdGUuZW1vdGVDaGVjayhlbCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIGVtb3Rlcy5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtub2RlfSBub2RlIC0gTWVzc2FnZSBub2RlXG4gICAgICovXG4gICAgc3RhdGljIGVtb3RlQ2hlY2sobm9kZSlcbiAgICB7XG4gICAgICAgIGNvbnN0ICRtZXNzYWdlID0gJChub2RlKS5maW5kKCcjbWVzc2FnZScpO1xuICAgICAgICBFbW90ZS5rYXBwYUNoZWNrKCRtZXNzYWdlKTtcblxuICAgICAgICBsZXQgb2xkSFRNTCA9ICRtZXNzYWdlLmh0bWwoKS50cmltKCk7XG4gICAgICAgIGxldCBtc2dIVE1MID0gb2xkSFRNTDtcblxuICAgICAgICBpZiAodHlwZW9mIEVtb3RlLm1lc3NhZ2VzW21zZ0hUTUxdID09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHdvcmRzID0gbXNnSFRNTC5yZXBsYWNlKCcvXFx4RUZcXHhCQlxceEJGLycsICcnKS5yZXBsYWNlKCfvu78nLCAnJykuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIGNvbnN0IHVuaXF1ZVdvcmRzID0gW107XG4gICAgICAgICAgICBsZXQgZW1vdGVDb3VudCA9IDA7XG5cbiAgICAgICAgICAgICQuZWFjaCh3b3JkcywgZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShlbCwgdW5pcXVlV29yZHMpID09PSAtMSkgdW5pcXVlV29yZHMucHVzaChlbCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bmlxdWVXb3Jkcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgd29yZCA9IHVuaXF1ZVdvcmRzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBFbW90ZS5lbW90ZXNbd29yZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVtb3RlQ291bnQrKztcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCB3b3JkKTtcbiAgICAgICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ2hpbnQtLXRvcCcpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IEVtb3RlLmVtb3Rlc1t3b3JkXVsndXJsJ107XG4gICAgICAgICAgICAgICAgaW1nLmFsdCA9IHdvcmQ7XG4gICAgICAgICAgICAgICAgaW1nLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICAgICAgICAgICAgICBpbWcuc3R5bGUud2lkdGggPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgaW1nLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cbiAgICAgICAgICAgICAgICBzcGFuLmFwcGVuZENoaWxkKGltZyk7XG5cbiAgICAgICAgICAgICAgICBtc2dIVE1MID0gcmVwbGFjZUFsbChtc2dIVE1MLCB3b3JkLCBzcGFuLm91dGVySFRNTCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlbW90ZUNvdW50IDwgMSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAkbWVzc2FnZS5odG1sKG1zZ0hUTUwpO1xuICAgICAgICAgICAgRW1vdGUubWVzc2FnZXNbb2xkSFRNTC5yZXBsYWNlKC9cXHMvZywnJyldID0gbXNnSFRNTDtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJG1lc3NhZ2UuaHRtbChFbW90ZS5tZXNzYWdlc1tvbGRIVE1MXSk7XG4gICAgICAgIH1cblxuICAgICAgICAkbWVzc2FnZS5wYXJlbnQoKS5wYXJlbnQoKS5iaW5kKCdET01TdWJ0cmVlTW9kaWZpZWQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0ICRtZXNzYWdlID0gJCh0aGlzKS5maW5kKCcjbWVzc2FnZScpO1xuICAgICAgICAgICAgRW1vdGUua2FwcGFDaGVjaygkbWVzc2FnZSk7XG5cbiAgICAgICAgICAgIGxldCBodG1sID0gJG1lc3NhZ2UuaHRtbCgpLnRyaW0oKTtcbiAgICAgICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoJy9cXHhFRlxceEJCXFx4QkYvJywgJycpLnJlcGxhY2UoJ++7vycsICcnKS5yZXBsYWNlKC9cXHMvZywnJyk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgRW1vdGUubWVzc2FnZXNbaHRtbF0gIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaHRtbCA9PSBFbW90ZS5tZXNzYWdlc1todG1sXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJG1lc3NhZ2UuaHRtbChFbW90ZS5tZXNzYWdlc1todG1sXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIGEga2FwcGEgZW1vdGUuXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bm9kZX0gbXNnIC0gTWVzc2FnZSBub2RlXG4gICAgICovXG4gICAgc3RhdGljIGthcHBhQ2hlY2sobXNnKVxuICAgIHtcbiAgICAgICAgJCgnaW1nJywgbXNnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBjb25zdCAkaW1nID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgaWYgKC9cXHVkODNjXFx1ZGYxZC9nLnRlc3QoJGltZy5hdHRyKCdhbHQnKSkpIHtcbiAgICAgICAgICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdLYXBwYScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIExvYWQgVHdpdGNoIGVtb3Rlcy5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRUd2l0Y2hFbW90ZXMoKVxuICAgIHtcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly90d2l0Y2hlbW90ZXMuY29tL2FwaV9jYWNoZS92Mi9nbG9iYWwuanNvbicpO1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICcvL3N0YXRpYy1jZG4uanR2bncubmV0L2Vtb3RpY29ucy92MS8nO1xuXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBlbW90ZURpYyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2Vtb3RlcyddO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVtb3RlIGluIGVtb3RlRGljKSB7XG5cbiAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbZW1vdGVdID0ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZW1vdGVEaWNbZW1vdGVdWydpbWFnZV9pZCddICsgJy8nICsgJzEuMCdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTG9hZCBUd2l0Y2ggc3Vic2NyaWJlciBlbW90ZXMuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkU3ViRW1vdGVzKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vdHdpdGNoZW1vdGVzLmNvbS9hcGlfY2FjaGUvdjIvc3Vic2NyaWJlci5qc29uJyk7XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJy8vc3RhdGljLWNkbi5qdHZudy5uZXQvZW1vdGljb25zL3YxLyc7XG5cbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGVtb3RlRGljID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnY2hhbm5lbHMnXTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBjaGFubmVsIGluIGVtb3RlRGljKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZW1vdGVEaWNbY2hhbm5lbF1bJ2Vtb3RlcyddKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGljdCA9IGVtb3RlRGljW2NoYW5uZWxdWydlbW90ZXMnXVtpXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGRpY3RbJ2NvZGUnXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoRW1vdGUuaXNWYWxpZEVtb3RlKGNvZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbY29kZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2ltYWdlX2lkJ10gKyAnLycgKyAnMS4wJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIExvYWQgQlRUViBlbW90ZXMuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkQlRUVkVtb3RlcygpXG4gICAge1xuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL2FwaS5iZXR0ZXJ0dHYubmV0LzIvZW1vdGVzJyk7XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJy8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvJztcblxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGVtb3RlTGlzdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2Vtb3RlcyddO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZW1vdGVMaXN0KSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVMaXN0W2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFFbW90ZS5jb250YWluc0Rpc2FsbG93ZWRDaGFyKGRpY3RbJ2NvZGUnXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2RpY3RbJ2NvZGUnXV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZGljdFsnaWQnXSArICcvJyArICcxeCdcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTG9hZCBCVFRWIGNoYW5uZWwgZW1vdGVzLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEJUVFZDaGFubmVsRW1vdGVzKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGNoYW5uZWxzID0gb3B0aW9uc1snQlRUVkNoYW5uZWxzJ107XG4gICAgICAgIGNvbnN0IGNvbW1hQ2hhbm5lbHMgPSBjaGFubmVscy5yZXBsYWNlKC9cXHMrL2csICcnKS5zcGxpdCgnLCcpO1xuXG4gICAgICAgIGNvbW1hQ2hhbm5lbHMuZm9yRWFjaChmdW5jdGlvbiAoY2hhbm5lbCkge1xuXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly9hcGkuYmV0dGVydHR2Lm5ldC8yL2NoYW5uZWxzLycgKyBjaGFubmVsKTtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICcvL2Nkbi5iZXR0ZXJ0dHYubmV0L2Vtb3RlLyc7XG5cbiAgICAgICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQrKztcblxuICAgICAgICAgICAgICAgIGlmIChFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50ID49IGNvbW1hQ2hhbm5lbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBlbW90ZUxpc3QgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZUxpc3QpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVMaXN0W2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghRW1vdGUuY29udGFpbnNEaXNhbGxvd2VkQ2hhcihkaWN0Wydjb2RlJ10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbZGljdFsnY29kZSddXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZGljdFsnaWQnXSArICcvJyArICcxeCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogY2hhbm5lbCArICcgKGJ0dHYpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQrKztcblxuICAgICAgICAgICAgICAgIGlmIChFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50ID49IGNvbW1hQ2hhbm5lbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIEljZSdzIG9sZCBzdWJzY3JpYmVyIGVtb3Rlcy5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRJY2VFbW90ZXMoKVxuICAgIHtcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnaHR0cHM6Ly9zdGF0aWMtY2RuLmp0dm53Lm5ldC9lbW90aWNvbnMvdjEvJztcblxuICAgICAgICBjb25zdCBpY2VFbW90ZXMgPSB7XG4gICAgICAgICAgICBcInB1cnBsZTFcIjogeyBcImltYWdlX2lkXCI6IDk2ODczIH0sXG4gICAgICAgICAgICBcInB1cnBsZTJcIjogeyBcImltYWdlX2lkXCI6IDk2ODc0IH0sXG4gICAgICAgICAgICBcInB1cnBsZTNcIjogeyBcImltYWdlX2lkXCI6IDk2ODc1IH0sXG4gICAgICAgICAgICBcInB1cnBsZTRcIjogeyBcImltYWdlX2lkXCI6IDk2ODc2IH0sXG4gICAgICAgICAgICBcInB1cnBsZUFybTFcIjogeyBcImltYWdlX2lkXCI6IDg0Njg3IH0sXG4gICAgICAgICAgICBcInB1cnBsZUFybTJcIjogeyBcImltYWdlX2lkXCI6IDg0NTMzIH0sXG4gICAgICAgICAgICBcInB1cnBsZUJsdWVzY3JlZW5cIjogeyBcImltYWdlX2lkXCI6IDE1NzQxNSB9LFxuICAgICAgICAgICAgXCJwdXJwbGVCcnVoXCI6IHsgXCJpbWFnZV9pZFwiOiAxMzI4OTMgfSxcbiAgICAgICAgICAgIFwicHVycGxlQ2lncmlwXCI6IHsgXCJpbWFnZV9pZFwiOiAxNjE4MjggfSxcbiAgICAgICAgICAgIFwicHVycGxlQ3JlZXBcIjogeyBcImltYWdlX2lkXCI6IDE1MzYyMCB9LFxuICAgICAgICAgICAgXCJwdXJwbGVDeFwiOiB7IFwiaW1hZ2VfaWRcIjogOTE4NzYgfSxcbiAgICAgICAgICAgIFwicHVycGxlRW56YVwiOiB7IFwiaW1hZ2VfaWRcIjogMTA1NDQ0IH0sXG4gICAgICAgICAgICBcInB1cnBsZUZha2VcIjogeyBcImltYWdlX2lkXCI6IDkxODc0IH0sXG4gICAgICAgICAgICBcInB1cnBsZUZyYW5rXCI6IHsgXCJpbWFnZV9pZFwiOiA3NjY0MCB9LFxuICAgICAgICAgICAgXCJwdXJwbGVIdWhcIjogeyBcImltYWdlX2lkXCI6IDEzMzI4NiB9LFxuICAgICAgICAgICAgXCJwdXJwbGVJY2VcIjogeyBcImltYWdlX2lkXCI6IDgwMjE1IH0sXG4gICAgICAgICAgICBcInB1cnBsZUtLb25hXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjE3NzEgfSxcbiAgICAgICAgICAgIFwicHVycGxlTVwiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNzcyIH0sXG4gICAgICAgICAgICBcInB1cnBsZU5vc2VcIjogeyBcImltYWdlX2lkXCI6IDY1MTUyIH0sXG4gICAgICAgICAgICBcInB1cnBsZU9tZ1wiOiB7IFwiaW1hZ2VfaWRcIjogMTYwNDYyIH0sXG4gICAgICAgICAgICBcInB1cnBsZVByaWRlXCI6IHsgXCJpbWFnZV9pZFwiOiA2MjU2MCB9LFxuICAgICAgICAgICAgXCJwdXJwbGVSb2ZsXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjE0OTUgfSxcbiAgICAgICAgICAgIFwicHVycGxlVGFjb1wiOiB7IFwiaW1hZ2VfaWRcIjogMTMyNzI2IH0sXG4gICAgICAgICAgICBcInB1cnBsZVRoaW5rXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjE3NzAgfSxcbiAgICAgICAgICAgIFwicHVycGxlV1wiOiB7IFwiaW1hZ2VfaWRcIjogNzA4MzggfSxcbiAgICAgICAgICAgIFwicHVycGxlQ2xhdXNcIjogeyBcImltYWdlX2lkXCI6IDEzMjczNyB9LFxuICAgICAgICAgICAgXCJwdXJwbGVDb29sc3RvcnlcIjogeyBcImltYWdlX2lkXCI6IDE1MzYyMSB9LFxuICAgICAgICAgICAgXCJwdXJwbGVEb2dcIjogeyBcImltYWdlX2lkXCI6IDEwNTIyOCB9LFxuICAgICAgICAgICAgXCJwdXJwbGVGcm9cIjogeyBcImltYWdlX2lkXCI6IDg2NDQ0IH0sXG4gICAgICAgICAgICBcInB1cnBsZUtrb25hXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjE0OTQgfSxcbiAgICAgICAgICAgIFwicHVycGxlTGVvXCI6IHsgXCJpbWFnZV9pZFwiOiA3MzYzMiB9LFxuICAgICAgICAgICAgXCJwdXJwbGVMVUxcIjogeyBcImltYWdlX2lkXCI6IDEyNjUxMSB9LFxuICAgICAgICAgICAgXCJwdXJwbGVSZWFsXCI6IHsgXCJpbWFnZV9pZFwiOiA5MTg3MyB9LFxuICAgICAgICAgICAgXCJwdXJwbGVUaHVtcFwiOiB7IFwiaW1hZ2VfaWRcIjogODY1MDEgfSxcbiAgICAgICAgICAgIFwicHVycGxlVG9uZ3VlXCI6IHsgXCJpbWFnZV9pZFwiOiA3MDgzOCB9LFxuICAgICAgICAgICAgXCJwdXJwbGVXYWxudXRcIjogeyBcImltYWdlX2lkXCI6IDEwOTA4NCB9LFxuICAgICAgICAgICAgXCJwdXJwbGVXYXRcIjogeyBcImltYWdlX2lkXCI6IDEwNTIyOSB9LFxuICAgICAgICAgICAgXCJwdXJwbGVXdXRcIjogeyBcImltYWdlX2lkXCI6IDEzMzg0NCB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yKGNvbnN0IGVtb3RlIGluIGljZUVtb3Rlcykge1xuICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2Vtb3RlXSA9IHtcbiAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgaWNlRW1vdGVzW2Vtb3RlXVsnaW1hZ2VfaWQnXSArICcvJyArICcxLjAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRleHQgaXMgYSB2YWxpZCBlbW90ZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgICAqL1xuICAgIHN0YXRpYyBpc1ZhbGlkRW1vdGUodGV4dClcbiAgICB7XG4gICAgICAgIHJldHVybiAhKHRleHRbMF0ubWF0Y2goL1tBLVpdL2cpIHx8XG4gICAgICAgICAgICB0ZXh0Lm1hdGNoKC9eW2Etel0rJC9nKSB8fFxuICAgICAgICAgICAgdGV4dC5tYXRjaCgvXlxcZCokL2cpXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0ZXh0IGNvbnRhaW5zIGRpc2FsbG93ZWQgY2hhcmFjdGVycy5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHdvcmRcbiAgICAgKi9cbiAgICBzdGF0aWMgY29udGFpbnNEaXNhbGxvd2VkQ2hhcih3b3JkKVxuICAgIHtcbiAgICAgICAgZm9yIChjb25zdCBjIGluIERJU0FMTE9XRURfQ0hBUlMpIHtcbiAgICAgICAgICAgIGlmICh3b3JkLmluZGV4T2YoYykgPiAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG59O1xuXG5FbW90ZS5zdGF0ZXMgPSB7XG4gICAgdHdpdGNoOiB7XG4gICAgICAgIGxvYWRlZDogZmFsc2VcbiAgICB9LFxuICAgIHN1Yjoge1xuICAgICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBCVFRWOiB7XG4gICAgICAgIGxvYWRlZDogZmFsc2VcbiAgICB9LFxuICAgIEJUVFZDaGFubmVsczoge1xuICAgICAgICBsb2FkZWQ6IGZhbHNlLFxuICAgICAgICBsb2FkZWRDb3VudDogMFxuICAgIH1cbn07XG5cbkVtb3RlLmVtb3RlcyA9IHt9O1xuRW1vdGUubWVzc2FnZXMgPSB7fTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZW1vdGUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VBbGwoc3RyLCBmaW5kLCByZXBsYWNlKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoZmluZCwgJ2cnKSwgcmVwbGFjZSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNOb2RlKG8pIHtcbiAgICByZXR1cm4gKFxuICAgICAgICB0eXBlb2YgTm9kZSA9PT0gJ29iamVjdCcgPyBvIGluc3RhbmNlb2YgTm9kZSA6IG8gJiYgdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIHR5cGVvZiBvLm5vZGVUeXBlID09PSAnbnVtYmVyJyAmJiB0eXBlb2Ygby5ub2RlTmFtZSA9PT0gJ3N0cmluZydcbiAgICApO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRW1vdGUgZnJvbSAnLi9lbW90ZSc7XG5pbXBvcnQgeyBvcHRpb25zIH0gZnJvbSAnLi9tYWluJztcbmltcG9ydCBDaGF0T2JzZXJ2ZXIgZnJvbSAnLi9jaGF0T2JzZXJ2ZXInO1xuaW1wb3J0IGRvbmF0ZUJ1dHRvbiBmcm9tICcuL292ZXJsYXkvZG9uYXRlQnV0dG9uJztcbmltcG9ydCBjaGVja0lmV2F0Y2hpbmdMaXZlIGZyb20gJy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlJztcbmltcG9ydCBBbHdheXNTY3JvbGxEb3duIGZyb20gJy4vb3ZlcmxheS9hbHdheXNTY3JvbGxEb3duJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZUNoZWNrXG57XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHVzZXIgaXMgd2F0Y2hpbmcgZnJvbSB3cm9uZyBsaXZlc3RyZWFtIHBhZ2UgYW5kIHdhcm5zIHRoZW0uXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB5b3V0dWJlR2FtaW5nKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXZlLWNoYXQtaWZyYW1lJyk7XG5cbiAgICAgICAgY29uc3QgJHRleHRXcmFwcGVyID0gJCgnLnl0LXVzZXItaW5mbycpO1xuICAgICAgICBjb25zdCB0ZXh0ID0gJHRleHRXcmFwcGVyLmZpbmQoJ2EnKS50ZXh0KCk7XG5cbiAgICAgICAgY29uc3QgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcblxuICAgICAgICBpZiAodGV4dCA9PSAnSWNlIFBvc2VpZG9uJyAmJiAhdXJsLmluY2x1ZGVzKCdnYW1pbmcueW91dHViZScpICYmIGlmcmFtZSkge1xuXG4gICAgICAgICAgICBjb25zdCByZWRpcmVjdENvbmZpcm0gPSBjb25maXJtKCdbSWNlIFBvc2VpZG9uVFZdIEdvIHRvIHRoZSBvZmZpY2lhbCBJY2UgUG9zZWlkb24gbGl2ZXN0cmVhbSBwYWdlPycpO1xuXG4gICAgICAgICAgICBpZiAocmVkaXJlY3RDb25maXJtID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJ2h0dHBzOi8vZ2FtaW5nLnlvdXR1YmUuY29tL2ljZV9wb3NlaWRvbi9saXZlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdXNlciBpcyB3YXRjaGluZyBhIGxpdmVzdHJlYW0gb24gWW91dHViZSBnYW1pbmcuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBsaXZlc3RyZWFtUGFnZSgpXG4gICAge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3duZXInKTtcbiAgICAgICAgY29uc3QgY2hhdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGF0Jyk7XG4gICAgICAgIGNvbnN0IHRleHQgPSAkKHRhcmdldCkuZmluZCgnc3BhbicpLnRleHQoKTtcblxuICAgICAgICBjb25zdCB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgIGlmICgoIXRhcmdldCB8fCAhY2hhdCkgJiYgKCF1cmwuaW5jbHVkZXMoJ2xpdmVfY2hhdCcpICYmICF1cmwuaW5jbHVkZXMoJ2lzX3BvcG91dD0xJykpKSB7XG5cbiAgICAgICAgICAgIFBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzKys7XG5cbiAgICAgICAgICAgIGlmIChQYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcyA8IDI1KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChQYWdlQ2hlY2subGl2ZXN0cmVhbVBhZ2UsIDI1MCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zWydlbW90ZXNUd2l0Y2gnXSA9PT0gdHJ1ZSB8fCBvcHRpb25zWydlbW90ZXNTdWInXSA9PT0gdHJ1ZSB8fCBvcHRpb25zWydlbW90ZXNCVFRWJ10gPT09IHRydWUgfHwgb3B0aW9uc1snZW1vdGVzSWNlJ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgIENoYXRPYnNlcnZlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGV4dCA9PSAnSWNlIFBvc2VpZG9uJykgZG9uYXRlQnV0dG9uKCk7XG5cbiAgICAgICAgRW1vdGUubG9hZEVtb3RlcygpO1xuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmluaXQoKTtcbiAgICAgICAgY2hlY2tJZldhdGNoaW5nTGl2ZSgpO1xuICAgIH07XG59O1xuXG5QYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcyA9IDA7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3BhZ2VDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRW1vdGUgZnJvbSAnLi9lbW90ZSc7XG5pbXBvcnQgTWVudGlvbkhpZ2hsaWdodCBmcm9tICcuL21lbnRpb25IaWdobGlnaHQnO1xuXG4vKipcbiAqIEJpbmRzIGNoYXQgbXV0YXRpb24gb2JzZXJ2ZXIgYW5kIGxpc3RlbiBmb3IgbmV3IGNoYXQgbWVzc2FnZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoYXRPYnNlcnZlcigpXG57XG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0eWxlLXNjb3BlIC55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyJyk7XG4gICAgY29uc3QgYXV0aG9ybmFtZSA9ICQoJyNhdXRob3IgI2F1dGhvci1uYW1lJykudGV4dCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICBzZXRUaW1lb3V0KGNoYXRPYnNlcnZlciwgMjUwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuXG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xuXG4gICAgICAgICAgICBjb25zdCBuZXdOb2RlcyA9IG11dGF0aW9uLmFkZGVkTm9kZXM7XG5cbiAgICAgICAgICAgIGlmIChuZXdOb2RlcyAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgJG5vZGVzID0gJChuZXdOb2Rlcyk7XG5cbiAgICAgICAgICAgICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJG5vZGUgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghJG5vZGUuaGFzQ2xhc3MoJ3l0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgTWVudGlvbkhpZ2hsaWdodCgkbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3RlQ2hlY2soJG5vZGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuICAgICAgICBhdHRyaWJ1dGVzOiBmYWxzZSxcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgfTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCBvcHRpb25zKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NoYXRPYnNlcnZlci5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBvcHRpb25zIH0gZnJvbSAnLi9tYWluJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIG1lbnRpb24gYW5kIGNoYW5nZXMgYmFja2dyb3VuZCB0byBCVFRWIHN0eWxlIGJhY2tncm91bmQuXG4gKiBAcGFyYW0ge25vZGV9IG5vZGUgLSBNZXNzYWdlIG5vZGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWVudGlvbkhpZ2hsaWdodChub2RlKVxue1xuICAgIGNvbnN0IGF1dGhvcm5hbWUgPSAkKCcjYXV0aG9yICNhdXRob3ItbmFtZScpLnRleHQoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLyogVGVtcCBmaXggKi9cbiAgICBpZiAoYXV0aG9ybmFtZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnNbJ21lbnRpb25IaWdobGlnaHQnXSAmJiBhdXRob3JuYW1lLmxlbmd0aCA+IDIgJiYgIW5vZGUuaGFzQ2xhc3MoJ3l0LWxpdmUtY2hhdC1sZWdhY3ktcGFpZC1tZXNzYWdlLXJlbmRlcmVyLTAnKSkgeyAvLyBDaGVjayBpdCdzIG5vdCBzcG9uc29yIC8gc3VwZXJjaGF0LCBhbHNvIG1lbnRpb25IaWdobGlnaHQgZW5hYmxlZFxuXG4gICAgICAgIGNvbnN0IHVuaXF1ZWlkID0gbm9kZS5nZXQoMCkuZ2V0QXR0cmlidXRlKCdpZCcpIC8vIENvcHkgdW5pcXVlIG1lc3NhZ2UgaWRcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IChcIiBcIiArIG5vZGUuZmluZCgnI21lc3NhZ2UnKS50ZXh0KCkudG9Mb3dlckNhc2UoKSArIFwiIFwiKS5yZXBsYWNlKC9bXFx1MjAwQi1cXHUyMDBEXFx1RkVGRl0vZywgJycpO1xuXG4gICAgICAgIGlmICh1bmlxdWVpZC5sZW5ndGggPiAzMCAmJiAoYXV0aG9ybmFtZSA9PSBcImljZSBwb3NlaWRvblwiIHx8IG1lc3NhZ2UuaW5kZXhPZignICcrYXV0aG9ybmFtZSsnICcpICE9PSAtMSB8fCBtZXNzYWdlLmluZGV4T2YoJ0AnK2F1dGhvcm5hbWUrJyAnKSAhPT0gLTEpKSB7IC8vIElmIHlvdXIgbmFtZSBpcyBpbiB0aGUgbWVzc2FnZSwgYW5kIGl0J3Mgbm90IHlvdXIgbWVzc2FnZVxuICAgICAgICAgICAgbm9kZS5nZXQoMCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDI1NSwwLDAsMC40MClcIjtcbiAgICAgICAgICAgIG5vZGUuZmluZCgnI2F1dGhvci1uYW1lJykuZ2V0KDApLnN0eWxlLmNvbG9yID0gXCIjZmZmZmZmXCI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWVudGlvbkhpZ2hsaWdodC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBTQ1JPTExfRU5BQkxFRF9VUkwsIFNDUk9MTF9ESVNBQkxFRF9VUkwgfSBmcm9tICcuLy4uL21haW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHdheXNTY3JvbGxEb3duXG57XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IGFuZCBiaW5kcyB0aGUgbmVjZXNzYXJ5IGxpc3RlbmVycy5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5pdCgpXG4gICAge1xuICAgICAgICBpZiAoJCgnLmlwdHYtc2Nyb2xsZG93bi13cmFwcGVyJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCcuaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKS5yZW1vdmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzY3JvbGxXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgc2Nyb2xsV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQWx3YXlzIHNjcm9sbCBkb3duIChFbmFibGVkKScpO1xuICAgICAgICBzY3JvbGxXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2hpbnQtLXRvcCcsICdpcHR2LXNjcm9sbGRvd24td3JhcHBlcicpO1xuXG4gICAgICAgICQoc2Nyb2xsV3JhcHBlcikuY3NzKHtcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAncmlnaHQnOiAnMTEzcHgnLFxuICAgICAgICAgICAgJ2JvdHRvbSc6ICcxOHB4J1xuICAgICAgICB9KTtcblxuICAgICAgICAkKHNjcm9sbFdyYXBwZXIpLmh0bWwoYFxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaXB0di1zY3JvbGxkb3duLXRvZ2dsZVwiIHN0eWxlPVwib3V0bGluZTogMDtcIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7U0NST0xMX0VOQUJMRURfVVJMfVwiIGFsdD1cIkFsd2F5cyBzY3JvbGwgZG93blwiIGhlaWdodD1cIjExXCIgd2lkdGg9XCIxMVwiIGNsYXNzPVwiaXB0di1zY3JvbGxkb3duLXRvZ2dsZS1pY29uXCI+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIGApO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsV3JhcHBlcik7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5pcHR2LXNjcm9sbGRvd24tdG9nZ2xlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICQoJyNpdGVtLXNjcm9sbGVyJykuc2Nyb2xsVG9wKDk5OTk5OTk5OSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5oaWRlU2Nyb2xsT25DaW5lbWEoc2Nyb2xsV3JhcHBlcik7XG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uU3BvbnNvck1lbnUoc2Nyb2xsV3JhcHBlcik7XG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbERvd25MaXN0ZW5lcigpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgJ0Fsd2F5cyBzY3JvbGwgZG93bicgb3ZlcmxheSB3aGVuIGNpbmVtYSBtb2RlIGlzIG9wZW5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtub2RlfSBzY3JvbGxXcmFwcGVyXG4gICAgICovXG4gICAgc3RhdGljIGhpZGVTY3JvbGxPbkNpbmVtYShzY3JvbGxXcmFwcGVyKVxuICAgIHtcbiAgICAgICAgY29uc3Qgd2F0Y2hQYWdlID0gJ3l0Zy13YXRjaC1wYWdlJztcblxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG0pID0+IHtcbiAgICAgICAgICAgICAgICAkKG0udGFyZ2V0KS5pcygnW3NpZGViYXItY29sbGFwc2VkXScpID8gJChzY3JvbGxXcmFwcGVyKS5oaWRlKCkgOiAkKHNjcm9sbFdyYXBwZXIpLnNob3coKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBvYnNlcnZlck9wdHMgPSB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IGZhbHNlLFxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnc2lkZWJhci1jb2xsYXBzZWQnXVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYWRkT2JzZXJ2ZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoJCh3YXRjaFBhZ2UpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoJCh3YXRjaFBhZ2UpWzBdLCBvYnNlcnZlck9wdHMpO1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoYWRkT2JzZXJ2ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyNTApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgJ0Fsd2F5cyBzY3JvbGwgZG93bicgb3ZlcmxheSB3aGVuIHNwb25zb3IgbWVudSBpcyBvcGVuLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge25vZGV9IHNjcm9sbFdyYXBwZXJcbiAgICAgKi9cbiAgICBzdGF0aWMgaGlkZVNjcm9sbE9uU3BvbnNvck1lbnUoc2Nyb2xsV3JhcHBlcilcbiAgICB7XG4gICAgICAgIGNvbnN0IGNoYXRJbnB1dFJlbmRlcmVyID0gJ3l0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyJztcblxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtKSA9PiB7XG4gICAgICAgICAgICAgICAgJChtLnRhcmdldCkuYXR0cignY3JlYXRvci1vcGVuJykgPyAkKHNjcm9sbFdyYXBwZXIpLmhpZGUoKSA6ICQoc2Nyb2xsV3JhcHBlcikuc2hvdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyT3B0cyA9IHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXG4gICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydjcmVhdG9yLW9wZW4nXVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3BvbnNvckNsaWNrID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCQoY2hhdElucHV0UmVuZGVyZXIpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoJChjaGF0SW5wdXRSZW5kZXJlcilbMF0sIG9ic2VydmVyT3B0cyk7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzcG9uc29yQ2xpY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyNTApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBmdW5jdGlvbmFsaXR5IHdoZW4gc2Nyb2xsaW5nIG1hbnVhbGx5LlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgYmluZFNjcm9sbExpc3RlbmVyKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVtLXNjcm9sbGVyJyk7XG5cbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxMaXN0ZW5lcigpIH0sIDI1MCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkKCcjaXRlbS1zY3JvbGxlcicpLm9uKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24oZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjaXRlbS1zY3JvbGxlcicpLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldCA9PT0gdGhpcykge1xuICAgICAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmFibGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIGZ1bmN0aW9uYWxpdHkgd2hlbiBibHVlIGp1bXAgZG93biBidXR0b24gaXMgY2xpY2tlZC5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctbW9yZScpO1xuXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7IEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbERvd25MaXN0ZW5lcigpIH0sIDI1MCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXQub25tb3VzZWRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24odHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHNjcm9sbERvd24gc3RhdGUgYW5kIGFkanVzdCBvdmVybGF5IGFjY29yZGluZ2x5LlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9nZ2xlU2Nyb2xsRG93bihzdGF0ZSlcbiAgICB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSAhQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID0gc3RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICAkKCcuaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKS5hdHRyKCdhcmlhLWxhYmVsJywgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID8gJ0Fsd2F5cyBzY3JvbGwgZG93biAoRW5hYmxlZCknIDogJ0Fsd2F5cyBzY3JvbGwgZG93biAoRGlzYWJsZWQpJyk7XG4gICAgICAgICQoJy5pcHR2LXNjcm9sbGRvd24tdG9nZ2xlLWljb24nKS5hdHRyKCdzcmMnLCBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPyBTQ1JPTExfRU5BQkxFRF9VUkwgOiBTQ1JPTExfRElTQUJMRURfVVJMKTtcbiAgICB9O1xufTtcblxuQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID0gdHJ1ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9hbHdheXNTY3JvbGxEb3duLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgaXMgYmVoaW5kIGluIGxpdmVzdHJlYW0gYW5kIHdhcm5zIHRoZW0uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrSWZXYXRjaGluZ0xpdmUoKSB7XG5cbiAgICBsZXQgbGl2ZUNoZWNrSW50ZXJ2YWwgPSBudWxsO1xuXG4gICAgbGl2ZUNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25zdCAkbGl2ZUJ1dHRvbiA9ICQoJy55dHAtbGl2ZS1iYWRnZS55dHAtYnV0dG9uJyk7XG5cbiAgICAgICAgaWYgKCRsaXZlQnV0dG9uLmlzKCc6ZW5hYmxlZCcpICYmICRsaXZlQnV0dG9uLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgICAgICAkKCcjcGxheWVyLWNvbnRhaW5lcicpLmFwcGVuZChgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWxpdmUtd2FybmluZy10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBZb3VcXCdyZSB3YXRjaGluZyBvbGQgZm9vdGFnZSwgY2xpY2sgdGhlIExJVkUgYnV0dG9uIGluIHRoZSBib3R0b20gbGVmdCBjb3JuZXIgdG8gd2F0Y2ggbGl2ZS5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWxpdmUtd2FybmluZy1kaXNtaXNzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJpcHR2LWxpdmUtd2FybmluZy1jbG9zZVwiPuKclTwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgKTtcbiAgICAgICAgfVxuICAgIH0sIDE1ICogMTAwMCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmlwdHYtbGl2ZS13YXJuaW5nLWNsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5pcHR2LWxpdmUtd2FybmluZycpLnJlbW92ZSgpO1xuICAgICAgICBjbGVhckludGVydmFsKGxpdmVDaGVja0ludGVydmFsKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZWRvd24nLCAnLnl0cC1saXZlLWJhZGdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5pcHR2LWxpdmUtd2FybmluZycpLnJlbW92ZSgpO1xuICAgIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQWRkcyBkb25hdGUgYnV0dG9uIHRvIGxpdmVzdHJlYW0gcGFnZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZG9uYXRlQnV0dG9uKClcbntcbiAgICAkKCcuaXB0di1kb25hdGUtYnV0dG9uLTAnKS5yZW1vdmUoKTtcblxuICAgIGNvbnN0IGRvbmF0ZUljb24gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL2RvbmF0ZS1pY29uLnBuZycpO1xuICAgIGNvbnN0IHNwb25zb3JJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9zcG9uc29yLWljb24ucG5nJyk7XG5cbiAgICBjb25zdCBzcG9uc29ySW1hZ2UgPSBgPGltZyBzcmM9XCIke3Nwb25zb3JJY29ufVwiIGFsdD1cInN0YXJcIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIj5gO1xuXG4gICAgY29uc3QgZG9uYXRlQnV0dG9uID0gYFxuICAgICAgICA8aXB0di1kb25hdGUtYnV0dG9uIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiIHJhaXNlZD1cIlwiIHN1cHBvcnRlZC1jb2xkLWxvYWQtYWN0aW9ucz1cIlsmcXVvdDtzcG9uc29yJnF1b3Q7XVwiIHdhaXQtZm9yLXNpZ25hbD1cIndhdGNoLXBhZ2UtaW5pdGlhbGl6ZWRcIiBjbGFzcz1cInN0eWxlLXNjb3BlIHl0Zy13YXRjaC1mb290ZXIgeC1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b24tMFwiPlxuICAgICAgICAgICAgPGlyb24tc2lnbmFscyBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPjwvaXJvbi1zaWduYWxzPlxuICAgICAgICAgICAgPHBhcGVyLWJ1dHRvbiBzdHlsZT1cImNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kLWNvbG9yOiAjMGY5ZDU4OyBtaW4td2lkdGg6IDA7XCIgY2xhc3M9XCJlbmFibGVkIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvbiB4LXNjb3BlIHBhcGVyLWJ1dHRvbi0wXCIgcm9sZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiIGFuaW1hdGVkPVwiXCIgYXJpYS1kaXNhYmxlZD1cImZhbHNlXCIgZWxldmF0aW9uPVwiMVwiIHJhaXNlZD1cIlwiIGFyaWEtbGFiZWw9XCJEb25hdGUgdG8gSWNlX1Bvc2VpZG9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1qdXN0aWZpZWQgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMjRweDsgaGVpZ2h0OiAyNHB4O1wiIGNsYXNzPVwiaWNvbi1jb250YWluZXIgbGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx5dC1pY29uIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uIHgtc2NvcGUgeXQtaWNvbi0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3l0LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpcHR2LWZvcm1hdHRlZC1zdHJpbmcgaWQ9XCJ0ZXh0XCIgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItY2VudGVyIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiIHN0eWxlPVwibWFyZ2luOiAwIDNweFwiPjxzcGFuIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1mb3JtYXR0ZWQtc3RyaW5nXCI+RE9OQVRFPC9zcGFuPjwvaXB0di1mb3JtYXR0ZWQtc3RyaW5nPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9wYXBlci1idXR0b24+XG4gICAgICAgIDwvaXB0di1kb25hdGUtYnV0dG9uPmA7XG5cbiAgICBjb25zdCBkb25hdGVJbWFnZSA9IGA8aW1nIHNyYz1cIiR7ZG9uYXRlSWNvbn1cIiBhbHQ9XCJkb2xsYXItc2lnblwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPmA7XG5cbiAgICAvLyBJbnNlcnQgZG9uYXRlQnV0dG9uIG5leHQgdG8gc3BvbnNvckJ1dHRvblxuICAgIGNvbnN0IHNwb25zb3JCdXR0b24gPSAnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24tMCc7XG5cbiAgICAkKHNwb25zb3JCdXR0b24pLmJlZm9yZShkb25hdGVCdXR0b24pO1xuICAgICQoZG9uYXRlQnV0dG9uKS5yZWFkeSggZnVuY3Rpb24oKSB7ICQoJy5zdHlsZS1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24ueC1zY29wZS55dC1pY29uLTAnKS5odG1sKGRvbmF0ZUltYWdlKTsgfSk7XG5cbiAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtZG9uYXRlLWJ1dHRvbi0wJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly95b3V0dWJlLnN0cmVhbWxhYnMuY29tL2ljZXBvc2VpZG9uIy8nLCAnX2JsYW5rJyk7XG4gICAgICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1kb25hdGUtYnV0dG9uLTAgcGFwZXItYnV0dG9uJylbMF0uYmx1cigpO1xuICAgIH0pO1xuXG4gICAgLy8gQ2hhbmdlIHNwb25zb3JCdXR0b24gaWNvbiB0byBzdGFyXG4gICAgJChgJHtzcG9uc29yQnV0dG9ufSAuc3R5bGUtc2NvcGUueXRnLW1lbWJlcnNoaXAtb2ZmZXItYnV0dG9uLngtc2NvcGUueXQtaWNvbi0wYCkuaHRtbChzcG9uc29ySW1hZ2UpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9kb25hdGVCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBTaG93IGVtb3RlIGxvYWRpbmcgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRpbmdFbW90ZXNJbmZvKClcbntcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICQoZGl2KS50ZXh0KCdMb2FkaW5nIGVtb3Rlcy4uLicpO1xuXG4gICAgJChkaXYpLmNzcyh7XG4gICAgICAgICdmb250LXNpemUnOiAnMTZweCcsXG4gICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXG4gICAgICAgICdyaWdodCc6ICcyNXB4JyxcbiAgICAgICAgJ2JvdHRvbSc6ICc3NXB4JyxcbiAgICAgICAgJ2NvbG9yJzogJyNmZmYnLFxuICAgICAgICAndGV4dC1zaGFkb3cnOiAnMnB4IDJweCAycHggcmdiYSgwLDAsMCwwLjc1KSdcbiAgICB9KTtcblxuICAgICQoZGl2KS5hZGRDbGFzcygnaXB0di1sb2FkaW5nLWVtb3RlcycpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mby5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9

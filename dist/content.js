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
        else console.log("length: " + uniqueid.length + ", name: " + authorname)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTZlNWE4MGMzZTIwOTI4OWM5YTkiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9lbW90ZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlsLmpzIiwid2VicGFjazovLy8uL3BhZ2VDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0T2JzZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbWVudGlvbkhpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvZG9uYXRlQnV0dG9uLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvbG9hZGluZ0Vtb3Rlc0luZm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQ0E7QUFDaUI7O0FBRWpCO0FBQ0E7QUFDQSx5Rjs7OztBQUFBO0FBQUE7QUFBQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCLHNEQUFzRDtBQUNwRixDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0EsK0ZBQStGLFlBQVksYUFBYSxtQkFBbUIsb0JBQW9CLEVBQUUsK0RBQStELDBCQUEwQixFQUFFLDBEQUEwRCwwQkFBMEIsRUFBRTtBQUNsVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1GQUFtRixpQ0FBaUMsb0NBQW9DLEVBQUU7QUFDMUo7O0FBRUE7QUFDQSxzSkFBc0osaUJBQWlCLDBGQUEwRixrQ0FBa0MsRUFBRSxxSEFBcUgsa0NBQWtDLEVBQUUsNkRBQTZELGNBQWM7QUFDemdCOztBQUVBO0FBQ0EscUhBQXFILG1EQUFtRCw2QkFBNkIsRUFBRTtBQUN2TTs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7O0FDaEVvQjtBQUNlO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYixTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViLDJCQUEyQix3QkFBd0I7O0FBRW5EOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLG9CQUFvQjtBQUM1Qyx3QkFBd0Isb0JBQW9CO0FBQzVDLHdCQUF3QixvQkFBb0I7QUFDNUMsd0JBQXdCLG9CQUFvQjtBQUM1QywyQkFBMkIsb0JBQW9CO0FBQy9DLDJCQUEyQixvQkFBb0I7QUFDL0MsaUNBQWlDLHFCQUFxQjtBQUN0RCwyQkFBMkIscUJBQXFCO0FBQ2hELDZCQUE2QixxQkFBcUI7QUFDbEQsNEJBQTRCLHFCQUFxQjtBQUNqRCx5QkFBeUIsb0JBQW9CO0FBQzdDLDJCQUEyQixxQkFBcUI7QUFDaEQsMkJBQTJCLG9CQUFvQjtBQUMvQyw0QkFBNEIsb0JBQW9CO0FBQ2hELDBCQUEwQixxQkFBcUI7QUFDL0MsMEJBQTBCLG9CQUFvQjtBQUM5Qyw0QkFBNEIscUJBQXFCO0FBQ2pELHdCQUF3QixxQkFBcUI7QUFDN0MsMkJBQTJCLG9CQUFvQjtBQUMvQywwQkFBMEIscUJBQXFCO0FBQy9DLDRCQUE0QixvQkFBb0I7QUFDaEQsMkJBQTJCLHFCQUFxQjtBQUNoRCwyQkFBMkIscUJBQXFCO0FBQ2hELDRCQUE0QixxQkFBcUI7QUFDakQsd0JBQXdCLG9CQUFvQjtBQUM1Qyw0QkFBNEIscUJBQXFCO0FBQ2pELGdDQUFnQyxxQkFBcUI7QUFDckQsMEJBQTBCLHFCQUFxQjtBQUMvQywwQkFBMEIsb0JBQW9CO0FBQzlDLDRCQUE0QixxQkFBcUI7QUFDakQsMEJBQTBCLG9CQUFvQjtBQUM5QywwQkFBMEIscUJBQXFCO0FBQy9DLDJCQUEyQixvQkFBb0I7QUFDL0MsNEJBQTRCLG9CQUFvQjtBQUNoRCw2QkFBNkIsb0JBQW9CO0FBQ2pELDZCQUE2QixxQkFBcUI7QUFDbEQsMEJBQTBCLHFCQUFxQjtBQUMvQywwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUN0YkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBOzs7Ozs7Ozs7OztBQ25FQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNqRGtCOztBQUVsQjtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVLQUFnSTs7QUFFaEk7QUFDQTs7QUFFQSxpS0FBaUs7QUFDaks7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMxQmtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0EsMEZBQTBGO0FBQzFGLDRCQUE0QiwwREFBbUI7QUFDL0M7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4Qix3Q0FBd0M7QUFDdEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyw0Q0FBNEM7QUFDakY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7Ozs7Ozs7O0FDM0tBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7O0FDakNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0NBQXNDLFlBQVkseUNBQXlDLGdCQUFnQixhQUFhLGNBQWM7O0FBRXRJO0FBQ0EseURBQXlELGdEQUFnRCxhQUFhO0FBQ3RIO0FBQ0EsNkNBQTZDLDJCQUEyQixjQUFjO0FBQ3RGO0FBQ0EsNENBQTRDLGNBQWM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLFdBQVcsZ0RBQWdELGdCQUFnQixhQUFhLGNBQWM7O0FBRTNJO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsMEVBQTBFLEVBQUU7O0FBRW5IO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxTQUFTLGNBQWM7QUFDdkI7Ozs7Ozs7O0FDekNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE2ZTVhODBjM2UyMDkyODljOWE5IiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xuaW1wb3J0IFBhZ2VDaGVjayBmcm9tICcuL3BhZ2VDaGVjayc7XG5pbXBvcnQgeyBpc05vZGUgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgY29uc3QgRElTQUxMT1dFRF9DSEFSUyA9IFsnXFxcXCcsICc6JywgJy8nLCAnJicsIFwiJ1wiLCAnXCInLCAnPycsICchJywgJyMnXSxcbiAgICAgICAgICAgICBTQ1JPTExfRU5BQkxFRF9VUkwgPSAgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2ljb25zL3Njcm9sbC1lbmFibGVkLnBuZycpLFxuICAgICAgICAgICAgIFNDUk9MTF9ESVNBQkxFRF9VUkwgPSAgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2ljb25zL3Njcm9sbC1kaXNhYmxlZC5wbmcnKTtcblxuZXhwb3J0IGxldCBvcHRpb25zID0gbnVsbDtcblxuY29uc3Qgb25OZXdQYWdlTG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgJCgnW2NsYXNzXj1cImlwdHYtXCJdJykucmVtb3ZlKCk7XG5cbiAgICBpZiAob3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zWydyZWRpcmVjdFRvWVRHYW1pbmcnXSA9PT0gdHJ1ZSkge1xuICAgICAgICBzZXRUaW1lb3V0KFBhZ2VDaGVjay55b3V0dWJlR2FtaW5nLCAyNTAwKTtcbiAgICB9XG5cbiAgICBQYWdlQ2hlY2subGl2ZXN0cmVhbVBhZ2UoKTtcbn07XG5cbihmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQgPiB0aXRsZScpO1xuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24obXV0YXRpb24pIHtcbiAgICAgICAgICAgIG9uTmV3UGFnZUxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzTm9kZSh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgeyBzdWJ0cmVlOiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUgfSk7XG59KCkpO1xuXG5jaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSgncmVxdWVzdExvY2Fsc3RvcmFnZScsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cbiAgICBvcHRpb25zID0gcmVzcG9uc2U7XG5cbiAgICBpZiAob3B0aW9uc1snZGlzYWJsZUF2YXRhcnMnXSkge1xuICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+LnN0eWxlLXNjb3BlIC55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyICNhdXRob3ItcGhvdG8geyB3aWR0aDogMHB4OyBoZWlnaHQ6IDBweDsgbWFyZ2luLXJpZ2h0OiAwcHg7IHZpc2liaWxpdHk6IGhpZGRlbjsgfS5zdHlsZS1zY29wZS55dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlci5uby10cmFuc2l0aW9ueyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0uc3R5bGUtc2NvcGUgeXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXIgI2F2YXRhciB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9uc1snZW5hYmxlQ2hhdENvbG9ycyddKSB7XG4gICAgICAgIGNvbnN0IGEgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnZXh0ZXJuYWwvY2hhdC1jb2xvcnMuY3NzJyk7XG4gICAgICAgICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiJyArIGEgKyAnXCIgPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnNbJ2VuYWJsZVNwbGl0Q2hhdCddKSB7XG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4uc3R5bGUtc2NvcGUgeXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7IGJvcmRlci10b3A6IDAuNXB4IHNvbGlkICMzMzMzMzM7IGJvcmRlci1ib3R0b206IDAuNXB4IHNvbGlkICMwMDAwMDA7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgfVxuXG4gICAgaWYob3B0aW9uc1snc2hvd0RlbGV0ZWRNZXNzYWdlcyddKSB7XG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2lzLWRlbGV0ZWRdOm5vdChbc2hvdy1vcmlnaW5hbF0pICNtZXNzYWdlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIge2Rpc3BsYXk6IGlubGluZTt9IC55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTAgI2RlbGV0ZWQtc3RhdGUueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpOyB9IC55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTBbaXMtZGVsZXRlZF06bm90KFtzaG93LW9yaWdpbmFsXSkgI21lc3NhZ2UueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpOyB9IC55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTAgI2RlbGV0ZWQtc3RhdGU6YmVmb3Jle2NvbnRlbnQ6IFwiICBcIn08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgfVxuXG4gICAgaWYob3B0aW9uc1snbWVudGlvbkhpZ2hsaWdodCddKSB7XG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wIC5tZW50aW9uLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDExNCwgMTUsIDE1LCAwKSAhaW1wb3J0YW50OyBwYWRkaW5nOiAwcHggMHB4ICFpbXBvcnRhbnQ7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgfVxuXG4gICAgb25OZXdQYWdlTG9hZCgpO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgcmVwbGFjZUFsbCB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBvcHRpb25zLCBESVNBTExPV0VEX0NIQVJTIH0gZnJvbSAnLi9tYWluJztcbmltcG9ydCBsb2FkaW5nRW1vdGVzSW5mbyBmcm9tICcuL292ZXJsYXkvbG9hZGluZ0Vtb3Rlc0luZm8nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbW90ZVxue1xuICAgIC8qKlxuICAgICAqIExvYWQgYWxsIGVuYWJsZWQgZW1vdGVzLlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkRW1vdGVzKClcbiAgICB7XG4gICAgICAgIGxvYWRpbmdFbW90ZXNJbmZvKCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgY29uc3QgJGxvYWRpbmcgPSAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpO1xuXG4gICAgICAgICAgICBpZiAoJGxvYWRpbmdbMF0pIHtcblxuICAgICAgICAgICAgICAgICRsb2FkaW5nLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICdjb2xvcic6ICcjYzAzOTJiJyxcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnIzI4MjgyOCcsXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6ICcxOXB4J1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJGxvYWRpbmcudGV4dCgnRmFpbGVkIGxvYWRpbmcgc29tZSBlbW90ZXMgKEFQSSBzZXJ2ZXJzIGRvd24pJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCgnLmlwdHYtbG9hZGluZy1lbW90ZXMnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0sIDcuNSAqIDEwMDApO1xuXG4gICAgICAgIH0sIDEwICogMTAwMCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnNbJ2Vtb3Rlc1R3aXRjaCddKSBFbW90ZS5sb2FkVHdpdGNoRW1vdGVzKCk7XG4gICAgICAgIGlmIChvcHRpb25zWydlbW90ZXNTdWInXSkgRW1vdGUubG9hZFN1YkVtb3RlcygpO1xuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzSWNlJ10pIEVtb3RlLmxvYWRJY2VFbW90ZXMoKTtcblxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzQlRUViddKSB7XG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkVtb3RlcygpO1xuICAgICAgICAgICAgRW1vdGUubG9hZEJUVFZDaGFubmVsRW1vdGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBFbW90ZS53YWl0VGlsbEVtb3Rlc0xvYWRlZCgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBzZXRUaW1lb3V0IHRoYXQga2VlcHMgcnVubmluZyB1bnRpbCBhbGwgZW1vdGVzIGFyZSBsb2FkZWQuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB3YWl0VGlsbEVtb3Rlc0xvYWRlZCgpXG4gICAge1xuICAgICAgICBpZiAoKG9wdGlvbnNbJ2Vtb3Rlc1R3aXRjaCddICE9PSBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCkgfHxcbiAgICAgICAgICAgIChvcHRpb25zWydlbW90ZXNTdWInXSAhPT0gRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQpIHx8XG4gICAgICAgICAgICAob3B0aW9uc1snZW1vdGVzQlRUViddICE9PSBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQpIHx8XG4gICAgICAgICAgICAob3B0aW9uc1snZW1vdGVzQlRUViddICE9PSBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCkpIHtcblxuICAgICAgICAgICAgc2V0VGltZW91dChFbW90ZS53YWl0VGlsbEVtb3Rlc0xvYWRlZCwgMjUwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRlbXAgZml4IHRvIHByZXZlbnQgcmFtIGZyb20gZmlsbGluZyB1cCB3aXRoIG1lc3NhZ2VzLlxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBFbW90ZS5tZXNzYWdlcyA9IHt9O1xuICAgICAgICB9LCAxMDAwICogNjAgKiA1KTtcblxuICAgICAgICAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpLnJlbW92ZSgpO1xuICAgICAgICBFbW90ZS5yZXBsYWNlRXhpc3RpbmdFbW90ZXMoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVwbGFjZSBleGlzdGluZyB0ZXh0IHdpdGggZW1vdGVzIGluIGNoYXQsIGhhcHBlbnMgd2hlbiBlbW90ZXMgYXJlIGRvbmUgbG9hZGluZy5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHJlcGxhY2VFeGlzdGluZ0Vtb3RlcygpXG4gICAge1xuICAgICAgICBjb25zdCBjaGF0RWxlbWVudHMgPSAkKCcuc3R5bGUtc2NvcGUueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlci54LXNjb3BlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMCcpO1xuXG4gICAgICAgIGlmIChjaGF0RWxlbWVudHMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChFbW90ZS5yZXBsYWNlRXhpc3RpbmdFbW90ZXMsIDI1MCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjaGF0RWxlbWVudHMuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgICAgIEVtb3RlLmVtb3RlQ2hlY2soZWwpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBlbW90ZXMuXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bm9kZX0gbm9kZSAtIE1lc3NhZ2Ugbm9kZVxuICAgICAqL1xuICAgIHN0YXRpYyBlbW90ZUNoZWNrKG5vZGUpXG4gICAge1xuICAgICAgICBjb25zdCAkbWVzc2FnZSA9ICQobm9kZSkuZmluZCgnI21lc3NhZ2UnKTtcbiAgICAgICAgRW1vdGUua2FwcGFDaGVjaygkbWVzc2FnZSk7XG5cbiAgICAgICAgbGV0IG9sZEhUTUwgPSAkbWVzc2FnZS5odG1sKCkudHJpbSgpO1xuICAgICAgICBsZXQgbXNnSFRNTCA9IG9sZEhUTUw7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBFbW90ZS5tZXNzYWdlc1ttc2dIVE1MXSA9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBjb25zdCB3b3JkcyA9IG1zZ0hUTUwucmVwbGFjZSgnL1xceEVGXFx4QkJcXHhCRi8nLCAnJykucmVwbGFjZSgn77u/JywgJycpLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICBjb25zdCB1bmlxdWVXb3JkcyA9IFtdO1xuICAgICAgICAgICAgbGV0IGVtb3RlQ291bnQgPSAwO1xuXG4gICAgICAgICAgICAkLmVhY2god29yZHMsIGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkoZWwsIHVuaXF1ZVdvcmRzKSA9PT0gLTEpIHVuaXF1ZVdvcmRzLnB1c2goZWwpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5pcXVlV29yZHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmQgPSB1bmlxdWVXb3Jkc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgRW1vdGUuZW1vdGVzW3dvcmRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbW90ZUNvdW50Kys7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgd29yZCk7XG4gICAgICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdoaW50LS10b3AnKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBFbW90ZS5lbW90ZXNbd29yZF1bJ3VybCddO1xuICAgICAgICAgICAgICAgIGltZy5hbHQgPSB3b3JkO1xuICAgICAgICAgICAgICAgIGltZy5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICAgICAgICAgICAgaW1nLnN0eWxlLndpZHRoID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIGltZy5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG4gICAgICAgICAgICAgICAgc3Bhbi5hcHBlbmRDaGlsZChpbWcpO1xuXG4gICAgICAgICAgICAgICAgbXNnSFRNTCA9IHJlcGxhY2VBbGwobXNnSFRNTCwgd29yZCwgc3Bhbi5vdXRlckhUTUwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZW1vdGVDb3VudCA8IDEpIHJldHVybjtcblxuICAgICAgICAgICAgJG1lc3NhZ2UuaHRtbChtc2dIVE1MKTtcbiAgICAgICAgICAgIEVtb3RlLm1lc3NhZ2VzW29sZEhUTUwucmVwbGFjZSgvXFxzL2csJycpXSA9IG1zZ0hUTUw7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRtZXNzYWdlLmh0bWwoRW1vdGUubWVzc2FnZXNbb2xkSFRNTF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJG1lc3NhZ2UucGFyZW50KCkucGFyZW50KCkuYmluZCgnRE9NU3VidHJlZU1vZGlmaWVkJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCAkbWVzc2FnZSA9ICQodGhpcykuZmluZCgnI21lc3NhZ2UnKTtcbiAgICAgICAgICAgIEVtb3RlLmthcHBhQ2hlY2soJG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICBsZXQgaHRtbCA9ICRtZXNzYWdlLmh0bWwoKS50cmltKCk7XG4gICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKCcvXFx4RUZcXHhCQlxceEJGLycsICcnKS5yZXBsYWNlKCfvu78nLCAnJykucmVwbGFjZSgvXFxzL2csJycpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIEVtb3RlLm1lc3NhZ2VzW2h0bWxdICE9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgaWYgKGh0bWwgPT0gRW1vdGUubWVzc2FnZXNbaHRtbF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICRtZXNzYWdlLmh0bWwoRW1vdGUubWVzc2FnZXNbaHRtbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBhIGthcHBhIGVtb3RlLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge25vZGV9IG1zZyAtIE1lc3NhZ2Ugbm9kZVxuICAgICAqL1xuICAgIHN0YXRpYyBrYXBwYUNoZWNrKG1zZylcbiAgICB7XG4gICAgICAgICQoJ2ltZycsIG1zZykuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgY29uc3QgJGltZyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICgvXFx1ZDgzY1xcdWRmMWQvZy50ZXN0KCRpbWcuYXR0cignYWx0JykpKSB7XG4gICAgICAgICAgICAgICAgJGltZy5yZXBsYWNlV2l0aChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnS2FwcGEnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIFR3aXRjaCBlbW90ZXMuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkVHdpdGNoRW1vdGVzKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vdHdpdGNoZW1vdGVzLmNvbS9hcGlfY2FjaGUvdjIvZ2xvYmFsLmpzb24nKTtcbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnLy9zdGF0aWMtY2RuLmp0dm53Lm5ldC9lbW90aWNvbnMvdjEvJztcblxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3QgZW1vdGVEaWMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBlbW90ZSBpbiBlbW90ZURpYykge1xuXG4gICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2Vtb3RlXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGVtb3RlRGljW2Vtb3RlXVsnaW1hZ2VfaWQnXSArICcvJyArICcxLjAnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIExvYWQgVHdpdGNoIHN1YnNjcmliZXIgZW1vdGVzLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZFN1YkVtb3RlcygpXG4gICAge1xuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL3R3aXRjaGVtb3Rlcy5jb20vYXBpX2NhY2hlL3YyL3N1YnNjcmliZXIuanNvbicpO1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICcvL3N0YXRpYy1jZG4uanR2bncubmV0L2Vtb3RpY29ucy92MS8nO1xuXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBlbW90ZURpYyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2NoYW5uZWxzJ107XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbm5lbCBpbiBlbW90ZURpYykge1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGVtb3RlRGljW2NoYW5uZWxdWydlbW90ZXMnXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpY3QgPSBlbW90ZURpY1tjaGFubmVsXVsnZW1vdGVzJ11baV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBkaWN0Wydjb2RlJ107XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKEVtb3RlLmlzVmFsaWRFbW90ZShjb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2NvZGVdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBkaWN0WydpbWFnZV9pZCddICsgJy8nICsgJzEuMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIEJUVFYgZW1vdGVzLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEJUVFZFbW90ZXMoKVxuICAgIHtcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly9hcGkuYmV0dGVydHR2Lm5ldC8yL2Vtb3RlcycpO1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICcvL2Nkbi5iZXR0ZXJ0dHYubmV0L2Vtb3RlLyc7XG5cbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBlbW90ZUxpc3QgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGVtb3RlTGlzdCkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGljdCA9IGVtb3RlTGlzdFtpXTtcblxuICAgICAgICAgICAgICAgIGlmICghRW1vdGUuY29udGFpbnNEaXNhbGxvd2VkQ2hhcihkaWN0Wydjb2RlJ10pKSB7XG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tkaWN0Wydjb2RlJ11dID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2lkJ10gKyAnLycgKyAnMXgnXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIExvYWQgQlRUViBjaGFubmVsIGVtb3Rlcy5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRCVFRWQ2hhbm5lbEVtb3RlcygpXG4gICAge1xuICAgICAgICBjb25zdCBjaGFubmVscyA9IG9wdGlvbnNbJ0JUVFZDaGFubmVscyddO1xuICAgICAgICBjb25zdCBjb21tYUNoYW5uZWxzID0gY2hhbm5lbHMucmVwbGFjZSgvXFxzKy9nLCAnJykuc3BsaXQoJywnKTtcblxuICAgICAgICBjb21tYUNoYW5uZWxzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5uZWwpIHtcblxuICAgICAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLmJldHRlcnR0di5uZXQvMi9jaGFubmVscy8nICsgY2hhbm5lbCk7XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnLy9jZG4uYmV0dGVydHR2Lm5ldC9lbW90ZS8nO1xuXG4gICAgICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50Kys7XG5cbiAgICAgICAgICAgICAgICBpZiAoRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCA+PSBjb21tYUNoYW5uZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZW1vdGVMaXN0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnZW1vdGVzJ107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZW1vdGVMaXN0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGljdCA9IGVtb3RlTGlzdFtpXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIUVtb3RlLmNvbnRhaW5zRGlzYWxsb3dlZENoYXIoZGljdFsnY29kZSddKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2RpY3RbJ2NvZGUnXV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2lkJ10gKyAnLycgKyAnMXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IGNoYW5uZWwgKyAnIChidHR2KSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50Kys7XG5cbiAgICAgICAgICAgICAgICBpZiAoRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCA+PSBjb21tYUNoYW5uZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTG9hZCBJY2UncyBvbGQgc3Vic2NyaWJlciBlbW90ZXMuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkSWNlRW1vdGVzKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJ2h0dHBzOi8vc3RhdGljLWNkbi5qdHZudy5uZXQvZW1vdGljb25zL3YxLyc7XG5cbiAgICAgICAgY29uc3QgaWNlRW1vdGVzID0ge1xuICAgICAgICAgICAgXCJwdXJwbGUxXCI6IHsgXCJpbWFnZV9pZFwiOiA5Njg3MyB9LFxuICAgICAgICAgICAgXCJwdXJwbGUyXCI6IHsgXCJpbWFnZV9pZFwiOiA5Njg3NCB9LFxuICAgICAgICAgICAgXCJwdXJwbGUzXCI6IHsgXCJpbWFnZV9pZFwiOiA5Njg3NSB9LFxuICAgICAgICAgICAgXCJwdXJwbGU0XCI6IHsgXCJpbWFnZV9pZFwiOiA5Njg3NiB9LFxuICAgICAgICAgICAgXCJwdXJwbGVBcm0xXCI6IHsgXCJpbWFnZV9pZFwiOiA4NDY4NyB9LFxuICAgICAgICAgICAgXCJwdXJwbGVBcm0yXCI6IHsgXCJpbWFnZV9pZFwiOiA4NDUzMyB9LFxuICAgICAgICAgICAgXCJwdXJwbGVCbHVlc2NyZWVuXCI6IHsgXCJpbWFnZV9pZFwiOiAxNTc0MTUgfSxcbiAgICAgICAgICAgIFwicHVycGxlQnJ1aFwiOiB7IFwiaW1hZ2VfaWRcIjogMTMyODkzIH0sXG4gICAgICAgICAgICBcInB1cnBsZUNpZ3JpcFwiOiB7IFwiaW1hZ2VfaWRcIjogMTYxODI4IH0sXG4gICAgICAgICAgICBcInB1cnBsZUNyZWVwXCI6IHsgXCJpbWFnZV9pZFwiOiAxNTM2MjAgfSxcbiAgICAgICAgICAgIFwicHVycGxlQ3hcIjogeyBcImltYWdlX2lkXCI6IDkxODc2IH0sXG4gICAgICAgICAgICBcInB1cnBsZUVuemFcIjogeyBcImltYWdlX2lkXCI6IDEwNTQ0NCB9LFxuICAgICAgICAgICAgXCJwdXJwbGVGYWtlXCI6IHsgXCJpbWFnZV9pZFwiOiA5MTg3NCB9LFxuICAgICAgICAgICAgXCJwdXJwbGVGcmFua1wiOiB7IFwiaW1hZ2VfaWRcIjogNzY2NDAgfSxcbiAgICAgICAgICAgIFwicHVycGxlSHVoXCI6IHsgXCJpbWFnZV9pZFwiOiAxMzMyODYgfSxcbiAgICAgICAgICAgIFwicHVycGxlSWNlXCI6IHsgXCJpbWFnZV9pZFwiOiA4MDIxNSB9LFxuICAgICAgICAgICAgXCJwdXJwbGVLS29uYVwiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNzcxIH0sXG4gICAgICAgICAgICBcInB1cnBsZU1cIjogeyBcImltYWdlX2lkXCI6IDEyMTc3MiB9LFxuICAgICAgICAgICAgXCJwdXJwbGVOb3NlXCI6IHsgXCJpbWFnZV9pZFwiOiA2NTE1MiB9LFxuICAgICAgICAgICAgXCJwdXJwbGVPbWdcIjogeyBcImltYWdlX2lkXCI6IDE2MDQ2MiB9LFxuICAgICAgICAgICAgXCJwdXJwbGVQcmlkZVwiOiB7IFwiaW1hZ2VfaWRcIjogNjI1NjAgfSxcbiAgICAgICAgICAgIFwicHVycGxlUm9mbFwiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNDk1IH0sXG4gICAgICAgICAgICBcInB1cnBsZVRhY29cIjogeyBcImltYWdlX2lkXCI6IDEzMjcyNiB9LFxuICAgICAgICAgICAgXCJwdXJwbGVUaGlua1wiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNzcwIH0sXG4gICAgICAgICAgICBcInB1cnBsZVdcIjogeyBcImltYWdlX2lkXCI6IDcwODM4IH0sXG4gICAgICAgICAgICBcInB1cnBsZUNsYXVzXCI6IHsgXCJpbWFnZV9pZFwiOiAxMzI3MzcgfSxcbiAgICAgICAgICAgIFwicHVycGxlQ29vbHN0b3J5XCI6IHsgXCJpbWFnZV9pZFwiOiAxNTM2MjEgfSxcbiAgICAgICAgICAgIFwicHVycGxlRG9nXCI6IHsgXCJpbWFnZV9pZFwiOiAxMDUyMjggfSxcbiAgICAgICAgICAgIFwicHVycGxlRnJvXCI6IHsgXCJpbWFnZV9pZFwiOiA4NjQ0NCB9LFxuICAgICAgICAgICAgXCJwdXJwbGVLa29uYVwiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNDk0IH0sXG4gICAgICAgICAgICBcInB1cnBsZUxlb1wiOiB7IFwiaW1hZ2VfaWRcIjogNzM2MzIgfSxcbiAgICAgICAgICAgIFwicHVycGxlTFVMXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjY1MTEgfSxcbiAgICAgICAgICAgIFwicHVycGxlUmVhbFwiOiB7IFwiaW1hZ2VfaWRcIjogOTE4NzMgfSxcbiAgICAgICAgICAgIFwicHVycGxlVGh1bXBcIjogeyBcImltYWdlX2lkXCI6IDg2NTAxIH0sXG4gICAgICAgICAgICBcInB1cnBsZVRvbmd1ZVwiOiB7IFwiaW1hZ2VfaWRcIjogNzA4MzggfSxcbiAgICAgICAgICAgIFwicHVycGxlV2FsbnV0XCI6IHsgXCJpbWFnZV9pZFwiOiAxMDkwODQgfSxcbiAgICAgICAgICAgIFwicHVycGxlV2F0XCI6IHsgXCJpbWFnZV9pZFwiOiAxMDUyMjkgfSxcbiAgICAgICAgICAgIFwicHVycGxlV3V0XCI6IHsgXCJpbWFnZV9pZFwiOiAxMzM4NDQgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZvcihjb25zdCBlbW90ZSBpbiBpY2VFbW90ZXMpIHtcbiAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tlbW90ZV0gPSB7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGljZUVtb3Rlc1tlbW90ZV1bJ2ltYWdlX2lkJ10gKyAnLycgKyAnMS4wJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0ZXh0IGlzIGEgdmFsaWQgZW1vdGVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNWYWxpZEVtb3RlKHRleHQpXG4gICAge1xuICAgICAgICByZXR1cm4gISh0ZXh0WzBdLm1hdGNoKC9bQS1aXS9nKSB8fFxuICAgICAgICAgICAgdGV4dC5tYXRjaCgvXlthLXpdKyQvZykgfHxcbiAgICAgICAgICAgIHRleHQubWF0Y2goL15cXGQqJC9nKVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGV4dCBjb250YWlucyBkaXNhbGxvd2VkIGNoYXJhY3RlcnMuXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB3b3JkXG4gICAgICovXG4gICAgc3RhdGljIGNvbnRhaW5zRGlzYWxsb3dlZENoYXIod29yZClcbiAgICB7XG4gICAgICAgIGZvciAoY29uc3QgYyBpbiBESVNBTExPV0VEX0NIQVJTKSB7XG4gICAgICAgICAgICBpZiAod29yZC5pbmRleE9mKGMpID4gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufTtcblxuRW1vdGUuc3RhdGVzID0ge1xuICAgIHR3aXRjaDoge1xuICAgICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBzdWI6IHtcbiAgICAgICAgbG9hZGVkOiBmYWxzZVxuICAgIH0sXG4gICAgQlRUVjoge1xuICAgICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBCVFRWQ2hhbm5lbHM6IHtcbiAgICAgICAgbG9hZGVkOiBmYWxzZSxcbiAgICAgICAgbG9hZGVkQ291bnQ6IDBcbiAgICB9XG59O1xuXG5FbW90ZS5lbW90ZXMgPSB7fTtcbkVtb3RlLm1lc3NhZ2VzID0ge307XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Vtb3RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBmdW5jdGlvbiByZXBsYWNlQWxsKHN0ciwgZmluZCwgcmVwbGFjZSkge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKGZpbmQsICdnJyksIHJlcGxhY2UpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTm9kZShvKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgdHlwZW9mIE5vZGUgPT09ICdvYmplY3QnID8gbyBpbnN0YW5jZW9mIE5vZGUgOiBvICYmIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygby5ub2RlVHlwZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG8ubm9kZU5hbWUgPT09ICdzdHJpbmcnXG4gICAgKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWwuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xuaW1wb3J0IHsgb3B0aW9ucyB9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQgQ2hhdE9ic2VydmVyIGZyb20gJy4vY2hhdE9ic2VydmVyJztcbmltcG9ydCBkb25hdGVCdXR0b24gZnJvbSAnLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbic7XG5pbXBvcnQgY2hlY2tJZldhdGNoaW5nTGl2ZSBmcm9tICcuL292ZXJsYXkvY2hlY2tJZldhdGNoaW5nTGl2ZSc7XG5pbXBvcnQgQWx3YXlzU2Nyb2xsRG93biBmcm9tICcuL292ZXJsYXkvYWx3YXlzU2Nyb2xsRG93bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VDaGVja1xue1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB1c2VyIGlzIHdhdGNoaW5nIGZyb20gd3JvbmcgbGl2ZXN0cmVhbSBwYWdlIGFuZCB3YXJucyB0aGVtLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgeW91dHViZUdhbWluZygpXG4gICAge1xuICAgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGl2ZS1jaGF0LWlmcmFtZScpO1xuXG4gICAgICAgIGNvbnN0ICR0ZXh0V3JhcHBlciA9ICQoJy55dC11c2VyLWluZm8nKTtcbiAgICAgICAgY29uc3QgdGV4dCA9ICR0ZXh0V3JhcHBlci5maW5kKCdhJykudGV4dCgpO1xuXG4gICAgICAgIGNvbnN0IHVybCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG5cbiAgICAgICAgaWYgKHRleHQgPT0gJ0ljZSBQb3NlaWRvbicgJiYgIXVybC5pbmNsdWRlcygnZ2FtaW5nLnlvdXR1YmUnKSAmJiBpZnJhbWUpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVkaXJlY3RDb25maXJtID0gY29uZmlybSgnW0ljZSBQb3NlaWRvblRWXSBHbyB0byB0aGUgb2ZmaWNpYWwgSWNlIFBvc2VpZG9uIGxpdmVzdHJlYW0gcGFnZT8nKTtcblxuICAgICAgICAgICAgaWYgKHJlZGlyZWN0Q29uZmlybSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICdodHRwczovL2dhbWluZy55b3V0dWJlLmNvbS9pY2VfcG9zZWlkb24vbGl2ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHVzZXIgaXMgd2F0Y2hpbmcgYSBsaXZlc3RyZWFtIG9uIFlvdXR1YmUgZ2FtaW5nLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbGl2ZXN0cmVhbVBhZ2UoKVxuICAgIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ293bmVyJyk7XG4gICAgICAgIGNvbnN0IGNoYXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhdCcpO1xuICAgICAgICBjb25zdCB0ZXh0ID0gJCh0YXJnZXQpLmZpbmQoJ3NwYW4nKS50ZXh0KCk7XG5cbiAgICAgICAgY29uc3QgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcblxuICAgICAgICBpZiAoKCF0YXJnZXQgfHwgIWNoYXQpICYmICghdXJsLmluY2x1ZGVzKCdsaXZlX2NoYXQnKSAmJiAhdXJsLmluY2x1ZGVzKCdpc19wb3BvdXQ9MScpKSkge1xuXG4gICAgICAgICAgICBQYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcysrO1xuXG4gICAgICAgICAgICBpZiAoUGFnZUNoZWNrLnN0cmVhbXBhZ2VDaGVja3MgPCAyNSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoUGFnZUNoZWNrLmxpdmVzdHJlYW1QYWdlLCAyNTApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzVHdpdGNoJ10gPT09IHRydWUgfHwgb3B0aW9uc1snZW1vdGVzU3ViJ10gPT09IHRydWUgfHwgb3B0aW9uc1snZW1vdGVzQlRUViddID09PSB0cnVlIHx8IG9wdGlvbnNbJ2Vtb3Rlc0ljZSddID09PSB0cnVlKSB7XG4gICAgICAgICAgICBDaGF0T2JzZXJ2ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRleHQgPT0gJ0ljZSBQb3NlaWRvbicpIGRvbmF0ZUJ1dHRvbigpO1xuXG4gICAgICAgIEVtb3RlLmxvYWRFbW90ZXMoKTtcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5pbml0KCk7XG4gICAgICAgIGNoZWNrSWZXYXRjaGluZ0xpdmUoKTtcbiAgICB9O1xufTtcblxuUGFnZUNoZWNrLnN0cmVhbXBhZ2VDaGVja3MgPSAwO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wYWdlQ2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xuaW1wb3J0IE1lbnRpb25IaWdobGlnaHQgZnJvbSAnLi9tZW50aW9uSGlnaGxpZ2h0JztcblxuLyoqXG4gKiBCaW5kcyBjaGF0IG11dGF0aW9uIG9ic2VydmVyIGFuZCBsaXN0ZW4gZm9yIG5ldyBjaGF0IG1lc3NhZ2VzLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGF0T2JzZXJ2ZXIoKVxue1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdHlsZS1zY29wZSAueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpO1xuICAgIGNvbnN0IGF1dGhvcm5hbWUgPSAkKCcjYXV0aG9yICNhdXRob3ItbmFtZScpLnRleHQoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgc2V0VGltZW91dChjaGF0T2JzZXJ2ZXIsIDI1MCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcblxuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb24pIHtcblxuICAgICAgICAgICAgY29uc3QgbmV3Tm9kZXMgPSBtdXRhdGlvbi5hZGRlZE5vZGVzO1xuXG4gICAgICAgICAgICBpZiAobmV3Tm9kZXMgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0ICRub2RlcyA9ICQobmV3Tm9kZXMpO1xuXG4gICAgICAgICAgICAgICAgJG5vZGVzLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRub2RlID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoISRub2RlLmhhc0NsYXNzKCd5dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIE1lbnRpb25IaWdobGlnaHQoJG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZUNoZWNrKCRub2RlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcbiAgICAgICAgYXR0cmlidXRlczogZmFsc2UsXG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgIH07XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgb3B0aW9ucyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jaGF0T2JzZXJ2ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgb3B0aW9ucyB9IGZyb20gJy4vbWFpbic7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBtZW50aW9uIGFuZCBjaGFuZ2VzIGJhY2tncm91bmQgdG8gQlRUViBzdHlsZSBiYWNrZ3JvdW5kLlxuICogQHBhcmFtIHtub2RlfSBub2RlIC0gTWVzc2FnZSBub2RlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1lbnRpb25IaWdobGlnaHQobm9kZSlcbntcbiAgICBjb25zdCBhdXRob3JuYW1lID0gJCgnI2F1dGhvciAjYXV0aG9yLW5hbWUnKS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcblxuICAgIC8qIFRlbXAgZml4ICovXG4gICAgaWYgKGF1dGhvcm5hbWUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zWydtZW50aW9uSGlnaGxpZ2h0J10gJiYgYXV0aG9ybmFtZS5sZW5ndGggPiAyICYmICFub2RlLmhhc0NsYXNzKCd5dC1saXZlLWNoYXQtbGVnYWN5LXBhaWQtbWVzc2FnZS1yZW5kZXJlci0wJykpIHsgLy8gQ2hlY2sgaXQncyBub3Qgc3BvbnNvciAvIHN1cGVyY2hhdCwgYWxzbyBtZW50aW9uSGlnaGxpZ2h0IGVuYWJsZWRcblxuICAgICAgICBjb25zdCB1bmlxdWVpZCA9IG5vZGUuZ2V0KDApLmdldEF0dHJpYnV0ZSgnaWQnKSAvLyBDb3B5IHVuaXF1ZSBtZXNzYWdlIGlkXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAoXCIgXCIgKyBub2RlLmZpbmQoJyNtZXNzYWdlJykudGV4dCgpLnRvTG93ZXJDYXNlKCkgKyBcIiBcIikucmVwbGFjZSgvW1xcdTIwMEItXFx1MjAwRFxcdUZFRkZdL2csICcnKTtcblxuICAgICAgICBpZiAodW5pcXVlaWQubGVuZ3RoID4gMzAgJiYgKGF1dGhvcm5hbWUgPT0gXCJpY2UgcG9zZWlkb25cIiB8fCBtZXNzYWdlLmluZGV4T2YoJyAnK2F1dGhvcm5hbWUrJyAnKSAhPT0gLTEgfHwgbWVzc2FnZS5pbmRleE9mKCdAJythdXRob3JuYW1lKycgJykgIT09IC0xKSkgeyAvLyBJZiB5b3VyIG5hbWUgaXMgaW4gdGhlIG1lc3NhZ2UsIGFuZCBpdCdzIG5vdCB5b3VyIG1lc3NhZ2VcbiAgICAgICAgICAgIG5vZGUuZ2V0KDApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgyNTUsMCwwLDAuNDApXCI7XG4gICAgICAgICAgICBub2RlLmZpbmQoJyNhdXRob3ItbmFtZScpLmdldCgwKS5zdHlsZS5jb2xvciA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgY29uc29sZS5sb2coXCJsZW5ndGg6IFwiICsgdW5pcXVlaWQubGVuZ3RoICsgXCIsIG5hbWU6IFwiICsgYXV0aG9ybmFtZSlcbiAgICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tZW50aW9uSGlnaGxpZ2h0LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFNDUk9MTF9FTkFCTEVEX1VSTCwgU0NST0xMX0RJU0FCTEVEX1VSTCB9IGZyb20gJy4vLi4vbWFpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsd2F5c1Njcm9sbERvd25cbntcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIG92ZXJsYXkgYW5kIGJpbmRzIHRoZSBuZWNlc3NhcnkgbGlzdGVuZXJzLlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIHN0YXRpYyBpbml0KClcbiAgICB7XG4gICAgICAgIGlmICgkKCcuaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJy5pcHR2LXNjcm9sbGRvd24td3JhcHBlcicpLnJlbW92ZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBzY3JvbGxXcmFwcGVyLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdBbHdheXMgc2Nyb2xsIGRvd24gKEVuYWJsZWQpJyk7XG4gICAgICAgIHNjcm9sbFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaGludC0tdG9wJywgJ2lwdHYtc2Nyb2xsZG93bi13cmFwcGVyJyk7XG5cbiAgICAgICAgJChzY3JvbGxXcmFwcGVyKS5jc3Moe1xuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICdyaWdodCc6ICcxMTNweCcsXG4gICAgICAgICAgICAnYm90dG9tJzogJzE4cHgnXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoc2Nyb2xsV3JhcHBlcikuaHRtbChgXG4gICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJpcHR2LXNjcm9sbGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJvdXRsaW5lOiAwO1wiPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtTQ1JPTExfRU5BQkxFRF9VUkx9XCIgYWx0PVwiQWx3YXlzIHNjcm9sbCBkb3duXCIgaGVpZ2h0PVwiMTFcIiB3aWR0aD1cIjExXCIgY2xhc3M9XCJpcHR2LXNjcm9sbGRvd24tdG9nZ2xlLWljb25cIj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgYCk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxXcmFwcGVyKTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmlwdHYtc2Nyb2xsZG93bi10b2dnbGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bigpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJCgnI2l0ZW0tc2Nyb2xsZXInKS5zY3JvbGxUb3AoOTk5OTk5OTk5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmhpZGVTY3JvbGxPbkNpbmVtYShzY3JvbGxXcmFwcGVyKTtcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5oaWRlU2Nyb2xsT25TcG9uc29yTWVudShzY3JvbGxXcmFwcGVyKTtcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsRG93bkxpc3RlbmVyKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IHdoZW4gY2luZW1hIG1vZGUgaXMgb3BlblxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge25vZGV9IHNjcm9sbFdyYXBwZXJcbiAgICAgKi9cbiAgICBzdGF0aWMgaGlkZVNjcm9sbE9uQ2luZW1hKHNjcm9sbFdyYXBwZXIpXG4gICAge1xuICAgICAgICBjb25zdCB3YXRjaFBhZ2UgPSAneXRnLXdhdGNoLXBhZ2UnO1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobSkgPT4ge1xuICAgICAgICAgICAgICAgICQobS50YXJnZXQpLmlzKCdbc2lkZWJhci1jb2xsYXBzZWRdJykgPyAkKHNjcm9sbFdyYXBwZXIpLmhpZGUoKSA6ICQoc2Nyb2xsV3JhcHBlcikuc2hvdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyT3B0cyA9IHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXG4gICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzaWRlYmFyLWNvbGxhcHNlZCddXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhZGRPYnNlcnZlciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGlmICgkKHdhdGNoUGFnZSkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSgkKHdhdGNoUGFnZSlbMF0sIG9ic2VydmVyT3B0cyk7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChhZGRPYnNlcnZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDI1MCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IHdoZW4gc3BvbnNvciBtZW51IGlzIG9wZW4uXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bm9kZX0gc2Nyb2xsV3JhcHBlclxuICAgICAqL1xuICAgIHN0YXRpYyBoaWRlU2Nyb2xsT25TcG9uc29yTWVudShzY3JvbGxXcmFwcGVyKVxuICAgIHtcbiAgICAgICAgY29uc3QgY2hhdElucHV0UmVuZGVyZXIgPSAneXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXInO1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG0pID0+IHtcbiAgICAgICAgICAgICAgICAkKG0udGFyZ2V0KS5hdHRyKCdjcmVhdG9yLW9wZW4nKSA/ICQoc2Nyb2xsV3JhcHBlcikuaGlkZSgpIDogJChzY3JvbGxXcmFwcGVyKS5zaG93KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJPcHRzID0ge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiBmYWxzZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IGZhbHNlLFxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ2NyZWF0b3Itb3BlbiddXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzcG9uc29yQ2xpY2sgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoJChjaGF0SW5wdXRSZW5kZXJlcikubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSgkKGNoYXRJbnB1dFJlbmRlcmVyKVswXSwgb2JzZXJ2ZXJPcHRzKTtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHNwb25zb3JDbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDI1MCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIGZ1bmN0aW9uYWxpdHkgd2hlbiBzY3JvbGxpbmcgbWFudWFsbHkuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBiaW5kU2Nyb2xsTGlzdGVuZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW0tc2Nyb2xsZXInKTtcblxuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbExpc3RlbmVyKCkgfSwgMjUwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJyNpdGVtLXNjcm9sbGVyJykub24oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bihmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNpdGVtLXNjcm9sbGVyJykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYoZXZlbnQudGFyZ2V0ID09PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi50b2dnbGVTY3JvbGxEb3duKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgJ0Fsd2F5cyBzY3JvbGwgZG93bicgZnVuY3Rpb25hbGl0eSB3aGVuIGJsdWUganVtcCBkb3duIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgYmluZFNjcm9sbERvd25MaXN0ZW5lcigpXG4gICAge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1tb3JlJyk7XG5cbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHsgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsRG93bkxpc3RlbmVyKCkgfSwgMjUwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bih0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgc2Nyb2xsRG93biBzdGF0ZSBhbmQgYWRqdXN0IG92ZXJsYXkgYWNjb3JkaW5nbHkuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB0b2dnbGVTY3JvbGxEb3duKHN0YXRlKVxuICAgIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9ICFBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSBzdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJy5pcHR2LXNjcm9sbGRvd24td3JhcHBlcicpLmF0dHIoJ2FyaWEtbGFiZWwnLCBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPyAnQWx3YXlzIHNjcm9sbCBkb3duIChFbmFibGVkKScgOiAnQWx3YXlzIHNjcm9sbCBkb3duIChEaXNhYmxlZCknKTtcbiAgICAgICAgJCgnLmlwdHYtc2Nyb2xsZG93bi10b2dnbGUtaWNvbicpLmF0dHIoJ3NyYycsIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA/IFNDUk9MTF9FTkFCTEVEX1VSTCA6IFNDUk9MTF9ESVNBQkxFRF9VUkwpO1xuICAgIH07XG59O1xuXG5BbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSB0cnVlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDaGVja3MgaWYgdXNlciBpcyBiZWhpbmQgaW4gbGl2ZXN0cmVhbSBhbmQgd2FybnMgdGhlbS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tJZldhdGNoaW5nTGl2ZSgpIHtcblxuICAgIGxldCBsaXZlQ2hlY2tJbnRlcnZhbCA9IG51bGw7XG5cbiAgICBsaXZlQ2hlY2tJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGNvbnN0ICRsaXZlQnV0dG9uID0gJCgnLnl0cC1saXZlLWJhZGdlLnl0cC1idXR0b24nKTtcblxuICAgICAgICBpZiAoJGxpdmVCdXR0b24uaXMoJzplbmFibGVkJykgJiYgJGxpdmVCdXR0b24uaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICAgICQoJyNwbGF5ZXItY29udGFpbmVyJykuYXBwZW5kKGBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFlvdVxcJ3JlIHdhdGNoaW5nIG9sZCBmb290YWdlLCBjbGljayB0aGUgTElWRSBidXR0b24gaW4gdGhlIGJvdHRvbSBsZWZ0IGNvcm5lciB0byB3YXRjaCBsaXZlLlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLWRpc21pc3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLWNsb3NlXCI+4pyVPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGApO1xuICAgICAgICB9XG4gICAgfSwgMTUgKiAxMDAwKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaXB0di1saXZlLXdhcm5pbmctY2xvc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmlwdHYtbGl2ZS13YXJuaW5nJykucmVtb3ZlKCk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGl2ZUNoZWNrSW50ZXJ2YWwpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ21vdXNlZG93bicsICcueXRwLWxpdmUtYmFkZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmlwdHYtbGl2ZS13YXJuaW5nJykucmVtb3ZlKCk7XG4gICAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2NoZWNrSWZXYXRjaGluZ0xpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBBZGRzIGRvbmF0ZSBidXR0b24gdG8gbGl2ZXN0cmVhbSBwYWdlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb25hdGVCdXR0b24oKVxue1xuICAgICQoJy5pcHR2LWRvbmF0ZS1idXR0b24tMCcpLnJlbW92ZSgpO1xuXG4gICAgY29uc3QgZG9uYXRlSWNvbiA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvZG9uYXRlLWljb24ucG5nJyk7XG4gICAgY29uc3Qgc3BvbnNvckljb24gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3Nwb25zb3ItaWNvbi5wbmcnKTtcblxuICAgIGNvbnN0IHNwb25zb3JJbWFnZSA9IGA8aW1nIHNyYz1cIiR7c3BvbnNvckljb259XCIgYWx0PVwic3RhclwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPmA7XG5cbiAgICBjb25zdCBkb25hdGVCdXR0b24gPSBgXG4gICAgICAgIDxpcHR2LWRvbmF0ZS1idXR0b24gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgcmFpc2VkPVwiXCIgc3VwcG9ydGVkLWNvbGQtbG9hZC1hY3Rpb25zPVwiWyZxdW90O3Nwb25zb3ImcXVvdDtdXCIgd2FpdC1mb3Itc2lnbmFsPVwid2F0Y2gtcGFnZS1pbml0aWFsaXplZFwiIGNsYXNzPVwic3R5bGUtc2NvcGUgeXRnLXdhdGNoLWZvb3RlciB4LXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvbi0wXCI+XG4gICAgICAgICAgICA8aXJvbi1zaWduYWxzIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCI+PC9pcm9uLXNpZ25hbHM+XG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uIHgtc2NvcGUgcGFwZXItYnV0dG9uLTBcIiByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCIgYW5pbWF0ZWQ9XCJcIiBhcmlhLWRpc2FibGVkPVwiZmFsc2VcIiBlbGV2YXRpb249XCIxXCIgcmFpc2VkPVwiXCIgYXJpYS1sYWJlbD1cIkRvbmF0ZSB0byBJY2VfUG9zZWlkb25cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWp1c3RpZmllZCBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAyNHB4OyBoZWlnaHQ6IDI0cHg7XCIgY2xhc3M9XCJpY29uLWNvbnRhaW5lciBsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItY2VudGVyIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHl0LWljb24gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwveXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCIgc3R5bGU9XCJtYXJnaW46IDAgM3B4XCI+PHNwYW4gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWZvcm1hdHRlZC1zdHJpbmdcIj5ET05BVEU8L3NwYW4+PC9pcHR2LWZvcm1hdHRlZC1zdHJpbmc+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3BhcGVyLWJ1dHRvbj5cbiAgICAgICAgPC9pcHR2LWRvbmF0ZS1idXR0b24+YDtcblxuICAgIGNvbnN0IGRvbmF0ZUltYWdlID0gYDxpbWcgc3JjPVwiJHtkb25hdGVJY29ufVwiIGFsdD1cImRvbGxhci1zaWduXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czogbm9uZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCI+YDtcblxuICAgIC8vIEluc2VydCBkb25hdGVCdXR0b24gbmV4dCB0byBzcG9uc29yQnV0dG9uXG4gICAgY29uc3Qgc3BvbnNvckJ1dHRvbiA9ICcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLnl0Zy1tZW1iZXJzaGlwLW9mZmVyLWJ1dHRvbi0wJztcblxuICAgICQoc3BvbnNvckJ1dHRvbikuYmVmb3JlKGRvbmF0ZUJ1dHRvbik7XG4gICAgJChkb25hdGVCdXR0b24pLnJlYWR5KCBmdW5jdGlvbigpIHsgJCgnLnN0eWxlLXNjb3BlLmlwdHYtZG9uYXRlLWJ1dHRvbi54LXNjb3BlLnl0LWljb24tMCcpLmh0bWwoZG9uYXRlSW1hZ2UpOyB9KTtcblxuICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1kb25hdGUtYnV0dG9uLTAnKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL3lvdXR1YmUuc3RyZWFtbGFicy5jb20vaWNlcG9zZWlkb24jLycsICdfYmxhbmsnKTtcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24tMCBwYXBlci1idXR0b24nKVswXS5ibHVyKCk7XG4gICAgfSk7XG5cbiAgICAvLyBDaGFuZ2Ugc3BvbnNvckJ1dHRvbiBpY29uIHRvIHN0YXJcbiAgICAkKGAke3Nwb25zb3JCdXR0b259IC5zdHlsZS1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24ueC1zY29wZS55dC1pY29uLTBgKS5odG1sKHNwb25zb3JJbWFnZSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFNob3cgZW1vdGUgbG9hZGluZyBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZGluZ0Vtb3Rlc0luZm8oKVxue1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgJChkaXYpLnRleHQoJ0xvYWRpbmcgZW1vdGVzLi4uJyk7XG5cbiAgICAkKGRpdikuY3NzKHtcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxNnB4JyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcbiAgICAgICAgJ3JpZ2h0JzogJzI1cHgnLFxuICAgICAgICAnYm90dG9tJzogJzc1cHgnLFxuICAgICAgICAnY29sb3InOiAnI2ZmZicsXG4gICAgICAgICd0ZXh0LXNoYWRvdyc6ICcycHggMnB4IDJweCByZ2JhKDAsMCwwLDAuNzUpJ1xuICAgIH0pO1xuXG4gICAgJChkaXYpLmFkZENsYXNzKCdpcHR2LWxvYWRpbmctZW1vdGVzJyk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2xvYWRpbmdFbW90ZXNJbmZvLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=
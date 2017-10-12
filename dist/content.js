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
/* harmony export (immutable) */ __webpack_exports__["getOptions"] = getOptions;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pageCheck__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subscribers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chatObserver__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabComplete__ = __webpack_require__(6);






const DISALLOWED_CHARS = ['\\', ':', '/', '&', "'", '"', '?', '!', '#'],
    SCROLL_ENABLED_URL = chrome.extension.getURL('icons/scroll-enabled.png'),
    SCROLL_DISABLED_URL = chrome.extension.getURL('icons/scroll-disabled.png');
/* harmony export (immutable) */ __webpack_exports__["DISALLOWED_CHARS"] = DISALLOWED_CHARS;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_ENABLED_URL"] = SCROLL_ENABLED_URL;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_DISABLED_URL"] = SCROLL_DISABLED_URL;


let options = null;

window.IPTVLoaded = false;
window.LSPageLoaded = false;

function getOptions() {
    if (options === null) {
        return JSON.parse(localStorage.getItem('optionsCache'));
    }

    return options;
}

const onNewPageLoad = function () {

    $('[class^="iptv-"]').remove();
    $('.yt-live-chat-header-renderer#title').text('Chat');

    setTimeout(function () {
        if (__WEBPACK_IMPORTED_MODULE_0__pageCheck__["a" /* default */].isLivestream() && __WEBPACK_IMPORTED_MODULE_0__pageCheck__["a" /* default */].isIcePoseidonStream()) {
            init();
            if (!window.LSPageLoaded) { __WEBPACK_IMPORTED_MODULE_0__pageCheck__["a" /* default */].livestreamPage(); window.LSPageLoaded = true; }
        }
    }, 2E3);
};

(function () {
    const target = document.querySelector('head > title');

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function () {
            onNewPageLoad();
        });
    });

    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* isNode */])(target)) {
        return;
    }

    const options = {
        characterData: true,
        attributes: false,
        childList: true,
        subtree: true
    };

    observer.observe(target, options);
}());

var init = function() {
    if(!window.IPTVLoaded) {
        window.IPTVLoaded = true;
        setTimeout(function () {
            chrome.runtime.sendMessage('requestSubscriptions', function (response) {
                options['subscriptions'] = response;
            });
        }, 5000);

        chrome.runtime.sendMessage('requestLocalstorage', function (response) {

            options = response;

            localStorage.setItem('optionsCache', JSON.stringify(options));

            if (getOptions()['enableChatColors']) {
                const a = chrome.extension.getURL('external/chat-colors.css');
                $('<link rel="stylesheet" type="text/css" href="' + a + '" >').appendTo('head');
            }

            if (getOptions()['disableAvatars'] === true) {
                $('<style type="text/css">.style-scope .yt-live-chat-item-list-renderer #author-photo { width: 0px; height: 0px; margin-right: 0px; visibility: hidden; }.style-scope.yt-live-chat-message-input-renderer.no-transition{ display: none !important; }.style-scope yt-live-chat-message-input-renderer #avatar { display: none !important;margin:0 !important; }</style>').appendTo('head');
            }

            if (getOptions()['enableSplitChat'] === true) {
                $('<style type="text/css">.style-scope yt-live-chat-text-message-renderer { border-top: 0.5px solid #333333; border-bottom: 0.5px solid #000000; }</style>').appendTo('head');
            }

            if (getOptions()['showDeletedMessages'] === true) {
                $('<style type="text/css">.yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer {display: inline;} .yt-live-chat-text-message-renderer-0 #deleted-state.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0 #deleted-state:before{content: "  "}</style>').appendTo('head');
            }

            if (getOptions()['mentionHighlight'] === true) {
                $('<style type="text/css">.yt-live-chat-text-message-renderer-0 .mention.yt-live-chat-text-message-renderer { background-color: rgba(114, 15, 15, 0) !important; padding: 0px 0px !important; }</style>').appendTo('head');
            }

            const chatColor = $('.yt-live-chat-header-renderer-0').css('background-color');
            const chatColorPopout = $('.style-scope.yt-live-chat-renderer[role="heading"]').css('background-color');

            if (chatColor === 'rgb(40, 40, 40)' || chatColorPopout === 'rgb(40, 40, 40)') {
                $('<style type="text/css">.yt-live-chat-text-message-renderer-0[author-type=moderator]{background-color:#282828}</style>').appendTo('head');
                $('<style type="text/css">.style-scope.yt-live-chat-item-list-renderer[author-type=moderator]{background-color:#282828}</style>').appendTo('head');
            } else if (chatColor === 'rgba(238, 238, 238, 0.4)' || chatColorPopout === 'rgba(238, 238, 238, 0.4)') {
                $('<style type="text/css">.yt-live-chat-text-message-renderer-0[author-type=moderator]{background-color:#e2e2e2}</style>').appendTo('head');
                $('<style type="text/css">.style-scope.yt-live-chat-item-list-renderer[author-type=moderator]{background-color:#e2e2e2}</style>').appendTo('head');
            }
        });

        __WEBPACK_IMPORTED_MODULE_1__subscribers__["a" /* default */].loadBadges();

        if (getOptions()['emotesTwitch'] === true || getOptions()['emotesSub'] === true || getOptions()['emotesBTTV'] === true || getOptions()['emotesIce'] === true) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__chatObserver__["a" /* default */])();
        }

        __WEBPACK_IMPORTED_MODULE_4__tabComplete__["a" /* default */].bindEvent();

        console.info('[IPTV] Init!');

    }
}

onNewPageLoad();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_loadingEmotesInfo__ = __webpack_require__(12);




class Emote
{
    /**
     * Load all enabled emotes.
     * @constructor
     */
    static loadEmotes()
    {
        console.log('@loadEmotes');

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

        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesTwitch']) Emote.loadTwitchEmotes();
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesSub']) Emote.loadSubEmotes();

        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesBTTV']) {
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
        if ((__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesTwitch'] !== Emote.states['twitch'].loaded) ||
            (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesSub'] !== Emote.states['sub'].loaded) ||
            (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesBTTV'] !== Emote.states['BTTV'].loaded) ||
            (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesBTTV'] !== Emote.states['BTTVChannels'].loaded)) {

            setTimeout(Emote.waitTillEmotesLoaded, 250);
            return;
        }

        // Temp fix to prevent ram from filling up with messages.
        setInterval(function () {
            Emote.messages = {};
        }, 1000 * 60 * 5);

        Emote.loadIceEmotes();

        const blacklistedEmotes = ['THICC'];

        for (let i = 0; i < blacklistedEmotes.length; i++) {
            delete Emote.emotes[blacklistedEmotes[i]];
        }

        $('.iptv-loading-emotes').remove();
        Emote.replaceExistingEmotes();
    };

    /**
     * Replace existing text with emotes in chat, happens when emotes are done loading.
     * @static
     */
    static replaceExistingEmotes()
    {
        const chatElements = $('.style-scope yt-live-chat-item-list-renderer x-scope yt-live-chat-text-message-renderer-0');
        const chatElementsPopout = $('#items.yt-live-chat-item-list-renderer .yt-live-chat-item-list-renderer');

        if (chatElements.length < 1 && chatElementsPopout < 1) {
            setTimeout(Emote.replaceExistingEmotes, 250);
            return;
        }

        chatElements.each(function (i, el) {
            Emote.emoteCheck(el);
        });

        chatElementsPopout.each(function (i, el) {
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
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesTwitch'] === false && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesSub'] === false && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesBTTV'] === false && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesIce'] === false) {
            return;
        }

        const $message = $(node).find('#message');
        Emote.kappaCheck($message);

        console.log($message);

        let oldHTML = $message.html().trim();
        let msgHTML = oldHTML;

        const words = msgHTML.replace('/\xEF\xBB\xBF/', '').replace('﻿', '').split(' ');
        const uniqueWords = [];
        let emoteCount = 0;
        let changeAttempts = 0;

        $.each(words, function (i, el) {
            if ($.inArray(el, uniqueWords) === -1) uniqueWords.push(el);
        });

        for (let i = 0; i < uniqueWords.length; i++) {

            const word = uniqueWords[i];

            if (typeof Emote.emotes[word] === 'undefined') {
                continue;
            }

            const messageTier = $(node).find('#author-photo').data('sub-tier');
            let tooltipText = word;

            if (messageTier < Emote.emotes[word]['tier']) {
                return;
            }

            const emoteTier = Emote.emotes[word]['tier'];

            if (typeof Emote.emotes[word]['tier'] !== 'undefined') {
                tooltipText = `IcePoseidon.com &#10;&#10;Tier ${emoteTier} Sub Emote &#10;&#10;${word}`;
            }

            emoteCount++;

            const emoteHtml = `<span class="hint--top" aria-label="${tooltipText}">
                                    <img src="${Emote.emotes[word]['url']}" alt="${word}" style="display:inline;width:auto;max-height:32px;overflow:hidden;" class="extension-emote">
                                </span>`;

            msgHTML = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* replaceAll */])(msgHTML, word, emoteHtml);
        }

        if (emoteCount < 1) {
            return;
        }

        $message.html(msgHTML);

        $message.parent().parent().bind('DOMSubtreeModified', function () {

            const $message = $(this).find('#message');
            Emote.kappaCheck($message);

            let html = $message.html().trim();

            if (changeAttempts > 30) {
                return;
            }

            if (typeof html === 'undefined' || html === '') {
                return;
            }

            if (html.includes('extension-emote')) {
                return
            }

            changeAttempts++;

            $message.html(msgHTML);
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
        Emote.emotes['LUL'] = { url: 'https://cdn.betterttv.net/emote/567b00c61ddbe1786688a633/1x' };
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://twitchemotes.com/api_cache/v2/global.json');
        xhr.send();
        xhr.timeout = 5000;
        const urlTemplate = 'https://static-cdn.jtvnw.net/emoticons/v1/';

        xhr.ontimeout = function() {
            Emote.states['twitch'].loaded = true;
        };

        xhr.onerror = function() {
            Emote.states['twitch'].loaded = true;
        };

        xhr.onload = function () {

            Emote.states['twitch'].loaded = true;

            if (xhr.responseText === '') {
                return;
            }

            const emoteDic = JSON.parse(xhr.responseText)['emotes'];

            for (const emote in emoteDic) {

                Emote.addEmoteToTrie(emote);

                Emote.emotes[emote] = {
                    url: urlTemplate + emoteDic[emote]['image_id'] + '/' + '1.0'
                };
            }
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
        xhr.timeout = 5000;
        const urlTemplate = 'https://static-cdn.jtvnw.net/emoticons/v1/';

        xhr.ontimeout = function() {
            Emote.states['sub'].loaded = true;
        };

        xhr.onerror = function() {
            Emote.states['sub'].loaded = true;
        };

        xhr.onload = function () {

            Emote.states['sub'].loaded = true;

            if (xhr.responseText === '') {
                return;
            }

            const emoteDic = JSON.parse(xhr.responseText)['channels'];

            for (const channel in emoteDic) {

                for (const i in emoteDic[channel]['emotes']) {

                    const dict = emoteDic[channel]['emotes'][i];
                    const code = dict['code'];

                    if (Emote.isValidEmote(code)) {

                        Emote.addEmoteToTrie(code);

                        Emote.emotes[code] = {
                            url: urlTemplate + dict['image_id'] + '/' + '1.0'
                        };
                    }
                }
            }
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
        xhr.timeout = 5000;
        const urlTemplate = 'https://cdn.betterttv.net/emote/';

        xhr.ontimeout = function() {
            Emote.states['BTTV'].loaded = true;
        };

        xhr.onerror = function() {
            Emote.states['BTTV'].loaded = true;
        };

        xhr.onload = function () {

            Emote.states['BTTV'].loaded = true;

            if (xhr.responseText === '') {
                return;
            }

            const emoteList = JSON.parse(xhr.responseText)['emotes'];

            for (const i in emoteList) {

                const dict = emoteList[i];

                if (!Emote.containsDisallowedChar(dict['code'])) {

                    Emote.addEmoteToTrie(dict['code']);

                    Emote.emotes[dict['code']] = {
                        url: urlTemplate + dict['id'] + '/' + '1x'
                    };
                }
            }
        }
    };

    /**
     * Load BTTV channel emotes.
     * @static
     */
    static loadBTTVChannelEmotes()
    {
        const channels = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['BTTVChannels'];
        const commaChannels = channels.replace(/\s+/g, '').split(',');
        let channelsLength = commaChannels.length;

        commaChannels.forEach(function (channel) {

            if (channel.trim() === '') {
                channelsLength--;

                if (Emote.states['BTTVChannels'].loadedCount >= channelsLength) {
                    Emote.states['BTTVChannels'].loaded = true;
                }

                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.betterttv.net/2/channels/' + channel);
            xhr.send();
            xhr.timeout = 5000;
            const urlTemplate = 'https://cdn.betterttv.net/emote/';

            xhr.ontimeout = function() {

                Emote.states['BTTVChannels'].loadedCount++;

                if (Emote.states['BTTVChannels'].loadedCount >= channelsLength) {
                    Emote.states['BTTVChannels'].loaded = true;
                }
            };

            xhr.onerror = function() {

                Emote.states['BTTVChannels'].loadedCount++;

                if (Emote.states['BTTVChannels'].loadedCount >= channelsLength) {
                    Emote.states['BTTVChannels'].loaded = true;
                }
            };

            xhr.onload = function () {

                Emote.states['BTTVChannels'].loadedCount++;

                if (Emote.states['BTTVChannels'].loadedCount >= channelsLength) {
                    Emote.states['BTTVChannels'].loaded = true;
                }

                if (xhr.responseText === '') {
                    return;
                }

                const emoteList = JSON.parse(xhr.responseText)['emotes'];

                for (const i in emoteList) {

                    const dict = emoteList[i];

                    if (!Emote.containsDisallowedChar(dict['code'])) {

                        Emote.addEmoteToTrie(dict['code']);

                        Emote.emotes[dict['code']] = {
                            url: urlTemplate + dict['id'] + '/' + '1x',
                            channel: channel + ' (bttv)'
                        };
                    }
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
        const subTierEmotes = {
            1: [
                'purple1', 'purple2', 'purple3', 'purple4', 'purpleAhhh', 'purpleArm1', 'purpleArm2', 'purpleBluescreen', 'purpleBruh', 'purpleCigrip', 'purpleClaus',
                'purpleCoolstory', 'purpleCreep', 'purpleEnza', 'purpleFake', 'purpleReal', 'purpleFrank', 'purpleFro', 'purpleIce', 'purpleKKona', 'purpleLUL',
                'purpleOmg', 'purplePride', 'purpleRofl', 'purpleLeo', 'purpleW', 'purpleWat'
            ],
            2: [
                'purpleCx', 'purpleLewd', 'purpleLama', 'purplePizza', 'purpleWallet', 'purpleS', 'purpleLate', 'purpleMoose', 'purpleNose', 'purpleWut'
            ],
            3: [
                'purpleAllen', 'purpleTroll'
            ]
        };

        for(const tier in subTierEmotes) {
            for (let i = 0; i < subTierEmotes[tier].length; i++) {

                Emote.addEmoteToTrie(subTierEmotes[tier][i]);

                Emote.emotes[subTierEmotes[tier][i]] = {
                    url: chrome.extension.getURL('/icons/emotes/' + subTierEmotes[tier][i] + '.png'),
                    tier: tier
                }
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


    /**
     * Adds emote into global Emote.trie.
     * @static
     * @param {string} emoteString
     */
    static addEmoteToTrie(emoteString) {
        var lowered = emoteString.toLowerCase();
        var localTrie = Emote.trie;
        for (var i = 0; i < emoteString.length; i++) {
            if (lowered.charAt(i) in localTrie) {
                if(typeof localTrie[lowered.charAt(i)] !== 'string' || i == emoteString.length-1){
                    localTrie = localTrie[lowered.charAt(i)];
                }
            } else {
                if (i == emoteString.length - 1) {
                    localTrie[lowered.charAt(i)] = emoteString;
                } else {
                    localTrie[lowered.charAt(i)] = [];
                }
                localTrie = localTrie[lowered.charAt(i)];
            }
        }
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
Emote.trie = [];


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


class Subscribers
{
    static loadBadges()
    {
        Subscribers.badges['1'] =  chrome.extension.getURL('/icons/tierBadge1.png');
        Subscribers.badges['2'] =  chrome.extension.getURL('/icons/tierBadge2.png');
        Subscribers.badges['3'] =  chrome.extension.getURL('/icons/tierBadge3.png');
    }

    static setSelfInfo(imgSrc)
    {
        const profileId = imgSrc.split('/')[3];
        const subTier = __WEBPACK_IMPORTED_MODULE_0__main__["getOptions"]['subscriptions'][profileId]['subtier'];

        Subscribers.self = {
            profileImageUrl: imgSrc,
            profileId: profileId,
            subTier: subTier
        };
    }

    /**
     * Retrieves subscriber info
     * @static
     */
    static addBadges(node)
    {
        if ($(node).find('img').length === 0) {
            return;
        }

        if (typeof $(node).find('#author-photo')[0] === 'undefined') {
            return;
        }

        /** Listen for mutations on author image */
        const imageObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {

                if (mutation.attributeName === 'src') {

                    const profileId = mutation.target.src.split('/')[3];

                    if (profileId === '') {
                        return;
                    }

                    mutation.target.setAttribute('data-profile-id', profileId);

                    const subInfo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['subscriptions'][profileId];

                    if (typeof subInfo === 'undefined') {
                        mutation.target.setAttribute('data-sub-tier', 0);
                    } else {
                        mutation.target.setAttribute('data-sub-tier', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['subscriptions'][profileId]['subtier']);
                    }

                    Subscribers.setBadgeImage(node, profileId);

                    /** Listen for mutations on data-profile id of author image */
                    const dataObserver = new MutationObserver(function(mutations) {

                        mutations.forEach(function(mutation) {

                            if (mutation.target.getAttribute('data-profile-id') === '') {
                                mutation.target.setAttribute('data-profile-id', profileId);
                            }

                            if (mutation.target.getAttribute('data-sub-tier') === '') {

                                const subInfo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['subscriptions'][profileId];

                                if (typeof subInfo === 'undefined') {
                                    mutation.target.setAttribute('data-sub-tier', 0);
                                } else {
                                    mutation.target.setAttribute('data-sub-tier', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['subscriptions'][profileId]['subtier']);
                                }
                            }
                        });
                    });

                    const dataObserverConfig = { attributes: true, childList: true, characterData: true, subtree: false };
                    dataObserver.observe(mutation.target, dataObserverConfig);
                }
            });
        });

        const imageObserverConfig = { attributes: true, childList: true, characterData: true, subtree: true };
        imageObserver.observe($(node).find('#author-photo')[0], imageObserverConfig);
    };

    static setBadgeImage(node, profileId)
    {
        if ($(node).find('.tier-badge').length !== 0) {
            return;
        }

        const subInfo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['subscriptions'][profileId];

        if (typeof subInfo === 'undefined') {
            return;
        }

        const tierImg = Subscribers.badges[subInfo['subtier']];

        const imgHtml = `<span class="hint--right" aria-label="IcePoseidon.com &#10;&#10;Tier ${subInfo['subtier']} Subscriber">
                            <img src="${tierImg}" class="tier-badge" />
                         </span>`;

        $(node).find('#author-badges').prepend(imgHtml);

        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['enableChatColors']) {
            $(node).find('#author-name').css('color', subInfo['color']);
        }

        const html = $(node).find('#author-badges').html();

        $(node).find('#author-badges').on('DOMSubtreeModified', function () {
            if ($(this).find('.tier-badge').length === 0) {
                $(this).html(html);

                /** Remove empty badges added by YT */
                $(this).parent().find('.yt-live-chat-author-badge-renderer-0').each(function(i, el) {
                    if ($(el).width() === 0) {
                        $(el).remove();
                    }
                });
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Subscribers;
;

Subscribers.chatMessages = {};
Subscribers.badges = {};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = replaceAll;
/* harmony export (immutable) */ __webpack_exports__["a"] = isNode;
function replaceAll(str, find, replace) {
    let string = "("+find+")(?![^alt=\"]*\")";
    return str.replace(new RegExp(string, 'g'), replace);
}

function isNode(o) {
    return (
        typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
    );
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = chatObserver;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subscribers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mentionHighlight__ = __webpack_require__(7);




/**
 * Binds chat mutation observer and listen for new chat messages.
 */
function chatObserver()
{
    /** Loop over existing messages and add badges */
    $(document).on('DOMNodeInserted', $('#chat').parent(), function (e) {

        if ($(e.target).find('img').length === 0) {
            return;
        }

        /** Listen for self-avatar load and set self-info */
        if ($(e.target).find('#avatar').length !== 0) {

            $(e.target).find('#avatar').on('load', function() {

                const imgSrc = $(this).attr('src');

                if (imgSrc.includes('https://')) {
                    __WEBPACK_IMPORTED_MODULE_1__subscribers__["a" /* default */].setSelfInfo(imgSrc);
                }
            });
        }

        if (typeof $(e.target).find('#author-photo')[0] === 'undefined') {
            return;
        }

        __WEBPACK_IMPORTED_MODULE_1__subscribers__["a" /* default */].addBadges(e.target);
    });

    const target = document.querySelector('.style-scope .yt-live-chat-item-list-renderer');

    if (!target) {
        setTimeout(chatObserver, 250);
        return;
    }

    // Chat box observer
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

                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__mentionHighlight__["a" /* default */])($node);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay_donateButton__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_sponsorButton__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay_colorButton__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__overlay_checkIfWatchingLive__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__overlay_alwaysScrollDown__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__overlay_sponsorCheck__ = __webpack_require__(14);








class PageCheck
{
    /**
     * Checks if user is watching from wrong livestream page and warns them.
     * @static
     */
    static youtubeGaming()
    {
        // Run checks in steps so we're not calling methods unnecessarily
        const url = document.location.href;

        if(!url.includes('gaming.youtube')){
            const iframe = document.getElementById('live-chat-iframe');

            if(iframe){
                const $textWrapper = $('.yt-user-info');
                const text = $textWrapper.find('a').text();

                if(text === 'Ice Poseidon'){
                    const redirectConfirm = confirm('[Ice PoseidonTV] Go to the official Ice Poseidon livestream page?');

                    if (redirectConfirm === true) {
                        window.location = 'https://gaming.youtube.com/ice_poseidon/live';
                    }
                }
            }
        }
    };

    /**
     * Checks if user is watching a livestream on Youtube gaming.
     * @static
     */
    static livestreamPage()
    {
        // Run checks in steps so we're not calling methods unnecessarily
        const url = document.location.href;
        const target = document.getElementById('owner');
        const text = $(target).find('span').text();

        if(!url.includes('live_chat') && !url.includes('is_popout=1')){
            const chat = document.getElementById('chat');

            if(!target || !chat){
                PageCheck.streampageChecks++;

                if (PageCheck.streampageChecks < 5)
                    setTimeout(PageCheck.livestreamPage, 1000);

                return false;
            }
        }

        if(text === 'Ice Poseidon') {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__overlay_donateButton__["a" /* default */])();
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__overlay_sponsorButton__["a" /* default */])();
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__overlay_colorButton__["a" /* default */])();
            setTimeout(__WEBPACK_IMPORTED_MODULE_6__overlay_sponsorCheck__["a" /* default */].check, 2500);
        }

        __WEBPACK_IMPORTED_MODULE_0__emote__["a" /* default */].loadEmotes();
        __WEBPACK_IMPORTED_MODULE_5__overlay_alwaysScrollDown__["a" /* default */].init();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__overlay_checkIfWatchingLive__["a" /* default */])();

        PageCheck.streampageChecks = 0;
    };

    /**
     * Check if user is watching a livestream.
     * @static
     */
    static isLivestream() {
        const liveButton = document.querySelector('.ytp-live-badge.ytp-button');
        const chatApp    = document.querySelector('yt-live-chat-app');
        const chatiFrame = document.querySelector('#live-chat-iframe');
        const chatHeader = document.querySelector('.yt-live-chat-header-renderer');

        // Thanks StackOverflow! https://stackoverflow.com/questions/3420004/access-parent-url-from-iframe
        var url = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;


        var urlCheck = (url.indexOf('iceposeidon.com') > -1);
        var liveButtonCheck = (document.body.contains(liveButton) && !liveButton.getAttribute('disabled'));
        var chatCheck = (document.body.contains(chatApp) || document.body.contains(chatiFrame) || document.body.contains(chatHeader));

        console.debug("URL CHECK:", urlCheck, url);
        console.debug("LIVE BUTTON CHECK:", liveButtonCheck);
        console.debug("CHAT EXISTS CHECK:", chatCheck);

        if (urlCheck || liveButtonCheck || chatCheck) {
            console.debug("IS LIVESTREAM!");
            return true;
        } else {
            console.debug("IS NOT LIVESTREAM");
            return false;
        }
    }

    /**
     * Check if user is watching an Ice Poseidon livestream.
     * @static
     */
    static isIcePoseidonStream() {
        // Thanks StackOverflow! https://stackoverflow.com/questions/3420004/access-parent-url-from-iframe
        var url = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;
        var YTGchannel = $("ytg-owner-badges").parent().attr('href');
        var YTchannel  = $("a.ytd-video-owner-renderer").attr('href');

        var whitelistedChannels = [
            "/channel/UCv9Edl_WbtbPeURPtFDo-uA", // Ice Poseidon
            "/channel/UCpxAv8i0MTPoci7I7aFNxZg", // George Allen
            "/channel/UCaDJ_DTz3kbneMWiV31YiFA", // Ansien 12 / andries_dev
            "/channel/UCTmrHQEEFDYPy51mUg0JpjA", // xByt3z
            "/channel/UC1EzZOW1tVEK2vjmbSo137A", // xByt3z IPTV testing stream
            "/channel/UC8EoOFAm_reNXGHWK-kBUXw"  // sparcut
        ];

        var urlCheck = (url.indexOf('iceposeidon.com') > -1 || url.indexOf('live_chat') > -1);
        var channelCheck = (whitelistedChannels.indexOf(YTGchannel) > -1 || whitelistedChannels.indexOf(YTchannel) > -1);

        console.debug("URL CHECK:", urlCheck, url);
        console.debug("CHANNEL CHECK:", channelCheck, YTGchannel, YTchannel);

        if (urlCheck || channelCheck) {
            console.debug("IS ICEPOSEIDON STREAM!");
            return true;
        } else {
            console.debug("IS NOT ICEPOSEIDON STREAM!");
            return false;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PageCheck;
;

PageCheck.streampageChecks = 0;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);



class TabComplete
{
    /**
    Recursively adds to valuesArray possible emotes from localTrie
    */
    static getPossibleValues(localTrie, valuesArray) {
        if (typeof localTrie === 'string') {
            valuesArray.push(localTrie);
        } else {
            let keys = Object.keys(localTrie);
            let returnValues = [];
            for (let i = 0; i < keys.length; i++) {
                TabComplete.getPossibleValues(localTrie[keys[i]], valuesArray);
            }
        }
    }

    /**
    Searches Emote.trie for all emotes starting with s. If it finds multiple values, returns pos (index) value
    */
    static findSimilar(s, pos) {
        s = s.toLowerCase();
        let i = 0;
        let localTrie = __WEBPACK_IMPORTED_MODULE_0__emote__["a" /* default */].trie;
        while ((i < s.length) && (s.charAt(i) in localTrie)) {
            localTrie = localTrie[s.charAt(i)];
            i++;
        }
        if (i == 0) return false;
        else {
            let values = [];
            TabComplete.getPossibleValues(localTrie, values);
            if (pos >= values.length) {
                return false;
            } else {
                return values[pos];
            }
        }
    }

    static bindEvent() {
        $("yt-live-chat-text-input-field-renderer").on('keydown', "div#input", function(e) {
            let keyCode = e.keyCode || e.which;
            if (keyCode == 9) {
                e.preventDefault();
                let currentText = $(this).text();
                if(/\s$/.test(currentText)){ //last char is whitespace - so dont treat it as a word. split function doesnt actually split eg "TriHard " into "TriHard" and "" but returns "TriHard "
                    return;
                }
                let words = currentText.split(' ');
                if (TabComplete.lastWord.length) { //word typed by used has been already replaced by some suggestion -> remove that suggestion (is going to get replaced by new suggestion or lastWord)
                    words.pop();
                } else {
                    TabComplete.lastWord = words.pop();
                }
                let similar = TabComplete.findSimilar(TabComplete.lastWord, TabComplete.tabPressedCount);
                let newText = '';
                for (let i = 0; i < words.length; i++) {
                    newText += words[i] + ' ';
                }
                if (similar) {
                    newText += similar;
                    TabComplete.tabPressedCount++;
                } else {
                    newText += TabComplete.lastWord;
                    TabComplete.lastWord = '';
                    TabComplete.tabPressedCount = 0;
                }
                $(this).text(newText);
                //adds focus to last char
                let range = document.createRange();
                range.selectNodeContents($(this)[0]);
                range.collapse(false);
                let sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);

                //updates character count
                this.dispatchEvent(TabComplete.inputChangedEvent);
            } else {
                TabComplete.tabPressedCount = 0;
                TabComplete.lastWord = '';
            }
        });
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TabComplete;
;

TabComplete.inputChangedEvent = new Event('input', {
    'bubbles': true,
    'cancelable': true
});
TabComplete.tabPressedCount = 0;
TabComplete.lastWord = '';


/***/ }),
/* 7 */
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
    const currentUser = $('#author #author-name').text().toLowerCase();
    const authorType = node.get(0).getAttribute('author-type');

    if (typeof currentUser === 'undefined') {
        return;
    }

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['mentionHighlight'] && currentUser.length > 2 && !node.hasClass('yt-live-chat-legacy-paid-message-renderer-0')) { // Check it's not sponsor / superchat, also mentionHighlight enabled

        const uniqueid = node.get(0).getAttribute('id'); // Copy unique message id
        const message = (" " + node.find('#message').text().toLowerCase() + " ").replace(/[\u200B-\u200D\uFEFF]/g, '');

        if (uniqueid === null) {
            return;
        }

        if (uniqueid.length > 30 && (authorType === "owner" || message.indexOf(' '+currentUser+' ') !== -1 || message.indexOf('@'+currentUser+' ') !== -1)) { // If your name is in the message, and it's not your message or the message is from the streamer
            node.get(0).style.backgroundColor = "rgba(255,0,0,0.40)";
            node.find('#author-name').get(0).style.color = "#ffffff";
        }
    }
};


/***/ }),
/* 8 */
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
        const scrolldownWrapper = $('.iptv-scrolldown-wrapper');

        if (scrolldownWrapper.length) {
            scrolldownWrapper.remove();
        }

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

        clearInterval(AlwaysScrollDown.interval);

        AlwaysScrollDown.interval = setInterval(function () {
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
        };

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

        $('#item-scroller').on('mousewheel DOMMouseScroll', function () {
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
AlwaysScrollDown.interval = null;


/***/ }),
/* 9 */
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

        if ($liveButton.is(':enabled') && $liveButton.is(':visible') && $('.iptv-live-warning').length < 1) {
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = colorButton;
/**
 * Adds new color change button to livestream page.
 */
function colorButton()
{
    const colorIcon = chrome.extension.getURL('/icons/pencil-icon.png');
    const colorImage = `<img src="${colorIcon}" alt="star" style="pointer-events: none; display: block; width: 80%; height:80%; margin-right: 2px;">`;

    const colorButton = `
        <iptv-color-button style="display: inline-block;" raised="" supported-cold-load-actions="[&quot;color&quot;]" wait-for-signal="watch-page-initialized" class="style-scope ytg-watch-footer x-scope iptv-color-button-0">
            <iron-signals class="style-scope iptv-color-button"></iron-signals>
            <paper-button style="color: #fff; background-color: #0f9d58; min-width: 0;" class="enabled style-scope iptv-color-button x-scope paper-button-0" role="button" tabindex="0" animated="" aria-disabled="false" elevation="1" raised="" aria-label="CHANGE NAME COLOR">
                <div class="layout horizontal center-justified style-scope iptv-color-button">
                    <div style="width: 24px; height: 24px;" class="icon-container layout horizontal center-center style-scope iptv-color-button">
                        <yt-icon class="style-scope iptv-color-button x-scope yt-icon-0">
                        </yt-icon>
                    </div>
                <iptv-formatted-string id="text" class="layout horizontal center-center style-scope iptv-color-button" style="margin: 0 3px"><span class="style-scope iptv-formatted-string">CHANGE NAME COLOR</span></iptv-formatted-string>
                </div>
            </paper-button>
        </iptv-color-button>`;

    $('.iptv-sponsor-button-0').after(colorButton);

    $(colorButton).ready( function() {
        $('.style-scope.iptv-color-button.x-scope.yt-icon-0').html(colorImage);
    });

    $('.style-scope.ytg-watch-footer.x-scope.iptv-color-button-0').on('click', () => {
        window.open('https://www.iceposeidon.com/profile', '_blank');
        $('.style-scope.ytg-watch-footer.x-scope.iptv-color-button-0 paper-button')[0].blur();
    });
};


/***/ }),
/* 11 */
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
/* 12 */
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


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sponsorButton;
/**
 * Adds new sponsor button to livestream page.
 */
function sponsorButton()
{
    const sponsorIcon = chrome.extension.getURL('/icons/sponsor-icon.png');
    const sponsorImage = `<img src="${sponsorIcon}" alt="star" style="pointer-events: none; display: block; width: 100%; height: 100%;">`;

    const sponsorButton = `
        <iptv-sponsor-button style="display: inline-block;" raised="" supported-cold-load-actions="[&quot;sponsor&quot;]" wait-for-signal="watch-page-initialized" class="style-scope ytg-watch-footer x-scope iptv-sponsor-button-0">
            <iron-signals class="style-scope iptv-sponsor-button"></iron-signals>
            <paper-button style="color: #fff; background-color: #0f9d58; min-width: 0;" class="enabled style-scope iptv-sponsor-button x-scope paper-button-0" role="button" tabindex="0" animated="" aria-disabled="false" elevation="1" raised="" aria-label="SPONSOR ON OFFICIAL SITE">
                <div class="layout horizontal center-justified style-scope iptv-sponsor-button">
                    <div style="width: 24px; height: 24px;" class="icon-container layout horizontal center-center style-scope iptv-sponsor-button">
                        <yt-icon class="style-scope iptv-sponsor-button x-scope yt-icon-0">
                        </yt-icon>
                    </div>
                <iptv-formatted-string id="text" class="layout horizontal center-center style-scope iptv-sponsor-button" style="margin: 0 3px"><span class="style-scope iptv-formatted-string">SPONSOR ON OFFICIAL SITE</span></iptv-formatted-string>
                </div>
            </paper-button>
        </iptv-sponsor-button>`;

    $('.style-scope.ytg-watch-footer.x-scope.ytg-membership-offer-button-0').before(sponsorButton);

    $(sponsorButton).ready( function() {
        $('.style-scope.iptv-sponsor-button.x-scope.yt-icon-0').html(sponsorImage);
    });

    $('.style-scope.ytg-watch-footer.x-scope.iptv-sponsor-button-0').on('click', () => {
        window.open('https://www.iceposeidon.com/', '_blank');
        $('.style-scope.ytg-watch-footer.x-scope.iptv-sponsor-button-0 paper-button')[0].blur();
    });
};


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SponsorCheck
{
    /**
     * Check if user is still using old sponsorship
     */
    static check()
    {
        $.get(chrome.extension.getURL('content.html'), function(data) {

            $(data).appendTo('body');

            const imgUrl = chrome.extension.getURL('icons/sponsor-benefits.png');
            $('.sponsor-modal .sub-benefits').attr('src', imgUrl);

            $(document).on('click', '.close-modal', function() {
                $('.sponsor-modal').hide();
            });

            const container = $('.yt-live-chat-message-input-renderer-0');

            const sponsorBadge = $(container).find('.yt-live-chat-author-badge-renderer-0[aria-label="Sponsor"]');

            if ($(sponsorBadge).length !== 0) {
                $('.sponsor-modal').show();
            }
        });
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SponsorCheck;
;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTlmNzdjYmE0YzRhNDIyNTg2MTkiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9lbW90ZS5qcyIsIndlYnBhY2s6Ly8vLi9zdWJzY3JpYmVycy5qcyIsIndlYnBhY2s6Ly8vLi91dGlsLmpzIiwid2VicGFjazovLy8uL2NoYXRPYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vdGFiQ29tcGxldGUuanMiLCJ3ZWJwYWNrOi8vLy4vbWVudGlvbkhpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvY29sb3JCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9kb25hdGVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mby5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L3Nwb25zb3JCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9zcG9uc29yQ2hlY2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNB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QUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztB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Ozs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBOzs7Ozs7Ozs7QUNqSkE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFBQTtBQUFBIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE5Zjc3Y2JhNGM0YTQyMjU4NjE5IiwiaW1wb3J0IFBhZ2VDaGVjayBmcm9tICcuL3BhZ2VDaGVjayc7XG5pbXBvcnQgU3Vic2NyaWJlcnMgZnJvbSAnLi9zdWJzY3JpYmVycyc7XG5pbXBvcnQgeyBpc05vZGUgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IENoYXRPYnNlcnZlciBmcm9tICcuL2NoYXRPYnNlcnZlcic7XG5pbXBvcnQgVGFiQ29tcGxldGUgZnJvbSAnLi90YWJDb21wbGV0ZSc7XG5cbmV4cG9ydCBjb25zdCBESVNBTExPV0VEX0NIQVJTID0gWydcXFxcJywgJzonLCAnLycsICcmJywgXCInXCIsICdcIicsICc/JywgJyEnLCAnIyddLFxuICAgIFNDUk9MTF9FTkFCTEVEX1VSTCA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdpY29ucy9zY3JvbGwtZW5hYmxlZC5wbmcnKSxcbiAgICBTQ1JPTExfRElTQUJMRURfVVJMID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2ljb25zL3Njcm9sbC1kaXNhYmxlZC5wbmcnKTtcblxuZXhwb3J0IGxldCBvcHRpb25zID0gbnVsbDtcblxud2luZG93LklQVFZMb2FkZWQgPSBmYWxzZTtcbndpbmRvdy5MU1BhZ2VMb2FkZWQgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ29wdGlvbnNDYWNoZScpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cblxuY29uc3Qgb25OZXdQYWdlTG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICQoJ1tjbGFzc149XCJpcHR2LVwiXScpLnJlbW92ZSgpO1xuICAgICQoJy55dC1saXZlLWNoYXQtaGVhZGVyLXJlbmRlcmVyI3RpdGxlJykudGV4dCgnQ2hhdCcpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChQYWdlQ2hlY2suaXNMaXZlc3RyZWFtKCkgJiYgUGFnZUNoZWNrLmlzSWNlUG9zZWlkb25TdHJlYW0oKSkge1xuICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICAgICAgaWYgKCF3aW5kb3cuTFNQYWdlTG9hZGVkKSB7IFBhZ2VDaGVjay5saXZlc3RyZWFtUGFnZSgpOyB3aW5kb3cuTFNQYWdlTG9hZGVkID0gdHJ1ZTsgfVxuICAgICAgICB9XG4gICAgfSwgMkUzKTtcbn07XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCA+IHRpdGxlJyk7XG5cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb25OZXdQYWdlTG9hZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmICghaXNOb2RlKHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXG4gICAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlLFxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgIHN1YnRyZWU6IHRydWVcbiAgICB9O1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIG9wdGlvbnMpO1xufSgpKTtcblxudmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBpZighd2luZG93LklQVFZMb2FkZWQpIHtcbiAgICAgICAgd2luZG93LklQVFZMb2FkZWQgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKCdyZXF1ZXN0U3Vic2NyaXB0aW9ucycsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ3N1YnNjcmlwdGlvbnMnXSA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDUwMDApO1xuXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKCdyZXF1ZXN0TG9jYWxzdG9yYWdlJywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbnMgPSByZXNwb25zZTtcblxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29wdGlvbnNDYWNoZScsIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpKTtcblxuICAgICAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnZW5hYmxlQ2hhdENvbG9ycyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYSA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdleHRlcm5hbC9jaGF0LWNvbG9ycy5jc3MnKTtcbiAgICAgICAgICAgICAgICAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIicgKyBhICsgJ1wiID4nKS5hcHBlbmRUbygnaGVhZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydkaXNhYmxlQXZhdGFycyddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi5zdHlsZS1zY29wZSAueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlciAjYXV0aG9yLXBob3RvIHsgd2lkdGg6IDBweDsgaGVpZ2h0OiAwcHg7IG1hcmdpbi1yaWdodDogMHB4OyB2aXNpYmlsaXR5OiBoaWRkZW47IH0uc3R5bGUtc2NvcGUueXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXIubm8tdHJhbnNpdGlvbnsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9LnN0eWxlLXNjb3BlIHl0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyICNhdmF0YXIgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7bWFyZ2luOjAgIWltcG9ydGFudDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnZW5hYmxlU3BsaXRDaGF0J10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+LnN0eWxlLXNjb3BlIHl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBib3JkZXItdG9wOiAwLjVweCBzb2xpZCAjMzMzMzMzOyBib3JkZXItYm90dG9tOiAwLjVweCBzb2xpZCAjMDAwMDAwOyB9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydzaG93RGVsZXRlZE1lc3NhZ2VzJ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFtpcy1kZWxldGVkXTpub3QoW3Nob3ctb3JpZ2luYWxdKSAjbWVzc2FnZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHtkaXNwbGF5OiBpbmxpbmU7fSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2lzLWRlbGV0ZWRdOm5vdChbc2hvdy1vcmlnaW5hbF0pICNtZXNzYWdlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlOmJlZm9yZXtjb250ZW50OiBcIiAgXCJ9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydtZW50aW9uSGlnaGxpZ2h0J10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMCAubWVudGlvbi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMTQsIDE1LCAxNSwgMCkgIWltcG9ydGFudDsgcGFkZGluZzogMHB4IDBweCAhaW1wb3J0YW50OyB9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjaGF0Q29sb3IgPSAkKCcueXQtbGl2ZS1jaGF0LWhlYWRlci1yZW5kZXJlci0wJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XG4gICAgICAgICAgICBjb25zdCBjaGF0Q29sb3JQb3BvdXQgPSAkKCcuc3R5bGUtc2NvcGUueXQtbGl2ZS1jaGF0LXJlbmRlcmVyW3JvbGU9XCJoZWFkaW5nXCJdJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XG5cbiAgICAgICAgICAgIGlmIChjaGF0Q29sb3IgPT09ICdyZ2IoNDAsIDQwLCA0MCknIHx8IGNoYXRDb2xvclBvcG91dCA9PT0gJ3JnYig0MCwgNDAsIDQwKScpIHtcbiAgICAgICAgICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFthdXRob3ItdHlwZT1tb2RlcmF0b3Jde2JhY2tncm91bmQtY29sb3I6IzI4MjgyOH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgICAgICAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi5zdHlsZS1zY29wZS55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyW2F1dGhvci10eXBlPW1vZGVyYXRvcl17YmFja2dyb3VuZC1jb2xvcjojMjgyODI4fTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhdENvbG9yID09PSAncmdiYSgyMzgsIDIzOCwgMjM4LCAwLjQpJyB8fCBjaGF0Q29sb3JQb3BvdXQgPT09ICdyZ2JhKDIzOCwgMjM4LCAyMzgsIDAuNCknKSB7XG4gICAgICAgICAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTBbYXV0aG9yLXR5cGU9bW9kZXJhdG9yXXtiYWNrZ3JvdW5kLWNvbG9yOiNlMmUyZTJ9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xuICAgICAgICAgICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4uc3R5bGUtc2NvcGUueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlclthdXRob3ItdHlwZT1tb2RlcmF0b3Jde2JhY2tncm91bmQtY29sb3I6I2UyZTJlMn08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFN1YnNjcmliZXJzLmxvYWRCYWRnZXMoKTtcblxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbW90ZXNUd2l0Y2gnXSA9PT0gdHJ1ZSB8fCBnZXRPcHRpb25zKClbJ2Vtb3Rlc1N1YiddID09PSB0cnVlIHx8IGdldE9wdGlvbnMoKVsnZW1vdGVzQlRUViddID09PSB0cnVlIHx8IGdldE9wdGlvbnMoKVsnZW1vdGVzSWNlJ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgIENoYXRPYnNlcnZlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgVGFiQ29tcGxldGUuYmluZEV2ZW50KCk7XG5cbiAgICAgICAgY29uc29sZS5pbmZvKCdbSVBUVl0gSW5pdCEnKTtcblxuICAgIH1cbn1cblxub25OZXdQYWdlTG9hZCgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHJlcGxhY2VBbGwgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgZ2V0T3B0aW9ucywgRElTQUxMT1dFRF9DSEFSUyB9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQgbG9hZGluZ0Vtb3Rlc0luZm8gZnJvbSAnLi9vdmVybGF5L2xvYWRpbmdFbW90ZXNJbmZvJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1vdGVcbntcbiAgICAvKipcbiAgICAgKiBMb2FkIGFsbCBlbmFibGVkIGVtb3Rlcy5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEVtb3RlcygpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZygnQGxvYWRFbW90ZXMnKTtcblxuICAgICAgICBsb2FkaW5nRW1vdGVzSW5mbygpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGNvbnN0ICRsb2FkaW5nID0gJCgnLmlwdHYtbG9hZGluZy1lbW90ZXMnKTtcblxuICAgICAgICAgICAgaWYgKCRsb2FkaW5nWzBdKSB7XG5cbiAgICAgICAgICAgICAgICAkbG9hZGluZy5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAnY29sb3InOiAnI2MwMzkyYicsXG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyMyODI4MjgnLFxuICAgICAgICAgICAgICAgICAgICAncmlnaHQnOiAnMTlweCdcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRsb2FkaW5nLnRleHQoJ0ZhaWxlZCBsb2FkaW5nIHNvbWUgZW1vdGVzIChBUEkgc2VydmVycyBkb3duKScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCA3LjUgKiAxMDAwKTtcblxuICAgICAgICB9LCAxMCAqIDEwMDApO1xuXG4gICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2Vtb3Rlc1R3aXRjaCddKSBFbW90ZS5sb2FkVHdpdGNoRW1vdGVzKCk7XG4gICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2Vtb3Rlc1N1YiddKSBFbW90ZS5sb2FkU3ViRW1vdGVzKCk7XG5cbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnZW1vdGVzQlRUViddKSB7XG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkVtb3RlcygpO1xuICAgICAgICAgICAgRW1vdGUubG9hZEJUVFZDaGFubmVsRW1vdGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBFbW90ZS53YWl0VGlsbEVtb3Rlc0xvYWRlZCgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBzZXRUaW1lb3V0IHRoYXQga2VlcHMgcnVubmluZyB1bnRpbCBhbGwgZW1vdGVzIGFyZSBsb2FkZWQuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB3YWl0VGlsbEVtb3Rlc0xvYWRlZCgpXG4gICAge1xuICAgICAgICBpZiAoKGdldE9wdGlvbnMoKVsnZW1vdGVzVHdpdGNoJ10gIT09IEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkKSB8fFxuICAgICAgICAgICAgKGdldE9wdGlvbnMoKVsnZW1vdGVzU3ViJ10gIT09IEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkKSB8fFxuICAgICAgICAgICAgKGdldE9wdGlvbnMoKVsnZW1vdGVzQlRUViddICE9PSBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQpIHx8XG4gICAgICAgICAgICAoZ2V0T3B0aW9ucygpWydlbW90ZXNCVFRWJ10gIT09IEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkKSkge1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KEVtb3RlLndhaXRUaWxsRW1vdGVzTG9hZGVkLCAyNTApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGVtcCBmaXggdG8gcHJldmVudCByYW0gZnJvbSBmaWxsaW5nIHVwIHdpdGggbWVzc2FnZXMuXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEVtb3RlLm1lc3NhZ2VzID0ge307XG4gICAgICAgIH0sIDEwMDAgKiA2MCAqIDUpO1xuXG4gICAgICAgIEVtb3RlLmxvYWRJY2VFbW90ZXMoKTtcblxuICAgICAgICBjb25zdCBibGFja2xpc3RlZEVtb3RlcyA9IFsnVEhJQ0MnXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsYWNrbGlzdGVkRW1vdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkZWxldGUgRW1vdGUuZW1vdGVzW2JsYWNrbGlzdGVkRW1vdGVzW2ldXTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJykucmVtb3ZlKCk7XG4gICAgICAgIEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcygpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlIGV4aXN0aW5nIHRleHQgd2l0aCBlbW90ZXMgaW4gY2hhdCwgaGFwcGVucyB3aGVuIGVtb3RlcyBhcmUgZG9uZSBsb2FkaW5nLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVwbGFjZUV4aXN0aW5nRW1vdGVzKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGNoYXRFbGVtZW50cyA9ICQoJy5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyIHgtc2NvcGUgeXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wJyk7XG4gICAgICAgIGNvbnN0IGNoYXRFbGVtZW50c1BvcG91dCA9ICQoJyNpdGVtcy55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyIC55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyJyk7XG5cbiAgICAgICAgaWYgKGNoYXRFbGVtZW50cy5sZW5ndGggPCAxICYmIGNoYXRFbGVtZW50c1BvcG91dCA8IDEpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoRW1vdGUucmVwbGFjZUV4aXN0aW5nRW1vdGVzLCAyNTApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hhdEVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgICAgICBFbW90ZS5lbW90ZUNoZWNrKGVsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2hhdEVsZW1lbnRzUG9wb3V0LmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgICAgICBFbW90ZS5lbW90ZUNoZWNrKGVsKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBhIG1lc3NhZ2UgY29udGFpbnMgZW1vdGVzLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge25vZGV9IG5vZGUgLSBNZXNzYWdlIG5vZGVcbiAgICAgKi9cbiAgICBzdGF0aWMgZW1vdGVDaGVjayhub2RlKVxuICAgIHtcbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnZW1vdGVzVHdpdGNoJ10gPT09IGZhbHNlICYmIGdldE9wdGlvbnMoKVsnZW1vdGVzU3ViJ10gPT09IGZhbHNlICYmIGdldE9wdGlvbnMoKVsnZW1vdGVzQlRUViddID09PSBmYWxzZSAmJiBnZXRPcHRpb25zKClbJ2Vtb3Rlc0ljZSddID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgJG1lc3NhZ2UgPSAkKG5vZGUpLmZpbmQoJyNtZXNzYWdlJyk7XG4gICAgICAgIEVtb3RlLmthcHBhQ2hlY2soJG1lc3NhZ2UpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCRtZXNzYWdlKTtcblxuICAgICAgICBsZXQgb2xkSFRNTCA9ICRtZXNzYWdlLmh0bWwoKS50cmltKCk7XG4gICAgICAgIGxldCBtc2dIVE1MID0gb2xkSFRNTDtcblxuICAgICAgICBjb25zdCB3b3JkcyA9IG1zZ0hUTUwucmVwbGFjZSgnL1xceEVGXFx4QkJcXHhCRi8nLCAnJykucmVwbGFjZSgn77u/JywgJycpLnNwbGl0KCcgJyk7XG4gICAgICAgIGNvbnN0IHVuaXF1ZVdvcmRzID0gW107XG4gICAgICAgIGxldCBlbW90ZUNvdW50ID0gMDtcbiAgICAgICAgbGV0IGNoYW5nZUF0dGVtcHRzID0gMDtcblxuICAgICAgICAkLmVhY2god29yZHMsIGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgICAgaWYgKCQuaW5BcnJheShlbCwgdW5pcXVlV29yZHMpID09PSAtMSkgdW5pcXVlV29yZHMucHVzaChlbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5pcXVlV29yZHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgY29uc3Qgd29yZCA9IHVuaXF1ZVdvcmRzW2ldO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIEVtb3RlLmVtb3Rlc1t3b3JkXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZVRpZXIgPSAkKG5vZGUpLmZpbmQoJyNhdXRob3ItcGhvdG8nKS5kYXRhKCdzdWItdGllcicpO1xuICAgICAgICAgICAgbGV0IHRvb2x0aXBUZXh0ID0gd29yZDtcblxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VUaWVyIDwgRW1vdGUuZW1vdGVzW3dvcmRdWyd0aWVyJ10pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGVtb3RlVGllciA9IEVtb3RlLmVtb3Rlc1t3b3JkXVsndGllciddO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIEVtb3RlLmVtb3Rlc1t3b3JkXVsndGllciddICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRvb2x0aXBUZXh0ID0gYEljZVBvc2VpZG9uLmNvbSAmIzEwOyYjMTA7VGllciAke2Vtb3RlVGllcn0gU3ViIEVtb3RlICYjMTA7JiMxMDske3dvcmR9YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZW1vdGVDb3VudCsrO1xuXG4gICAgICAgICAgICBjb25zdCBlbW90ZUh0bWwgPSBgPHNwYW4gY2xhc3M9XCJoaW50LS10b3BcIiBhcmlhLWxhYmVsPVwiJHt0b29sdGlwVGV4dH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtFbW90ZS5lbW90ZXNbd29yZF1bJ3VybCddfVwiIGFsdD1cIiR7d29yZH1cIiBzdHlsZT1cImRpc3BsYXk6aW5saW5lO3dpZHRoOmF1dG87bWF4LWhlaWdodDozMnB4O292ZXJmbG93OmhpZGRlbjtcIiBjbGFzcz1cImV4dGVuc2lvbi1lbW90ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+YDtcblxuICAgICAgICAgICAgbXNnSFRNTCA9IHJlcGxhY2VBbGwobXNnSFRNTCwgd29yZCwgZW1vdGVIdG1sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbW90ZUNvdW50IDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJG1lc3NhZ2UuaHRtbChtc2dIVE1MKTtcblxuICAgICAgICAkbWVzc2FnZS5wYXJlbnQoKS5wYXJlbnQoKS5iaW5kKCdET01TdWJ0cmVlTW9kaWZpZWQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0ICRtZXNzYWdlID0gJCh0aGlzKS5maW5kKCcjbWVzc2FnZScpO1xuICAgICAgICAgICAgRW1vdGUua2FwcGFDaGVjaygkbWVzc2FnZSk7XG5cbiAgICAgICAgICAgIGxldCBodG1sID0gJG1lc3NhZ2UuaHRtbCgpLnRyaW0oKTtcblxuICAgICAgICAgICAgaWYgKGNoYW5nZUF0dGVtcHRzID4gMzApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaHRtbCA9PT0gJ3VuZGVmaW5lZCcgfHwgaHRtbCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChodG1sLmluY2x1ZGVzKCdleHRlbnNpb24tZW1vdGUnKSkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjaGFuZ2VBdHRlbXB0cysrO1xuXG4gICAgICAgICAgICAkbWVzc2FnZS5odG1sKG1zZ0hUTUwpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBhIGthcHBhIGVtb3RlLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge25vZGV9IG1zZyAtIE1lc3NhZ2Ugbm9kZVxuICAgICAqL1xuICAgIHN0YXRpYyBrYXBwYUNoZWNrKG1zZylcbiAgICB7XG4gICAgICAgICQoJ2ltZycsIG1zZykuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgY29uc3QgJGltZyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICgvXFx1ZDgzY1xcdWRmMWQvZy50ZXN0KCRpbWcuYXR0cignYWx0JykpKSB7XG4gICAgICAgICAgICAgICAgJGltZy5yZXBsYWNlV2l0aChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnS2FwcGEnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIFR3aXRjaCBlbW90ZXMuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkVHdpdGNoRW1vdGVzKClcbiAgICB7XG4gICAgICAgIEVtb3RlLmVtb3Rlc1snTFVMJ10gPSB7IHVybDogJ2h0dHBzOi8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvNTY3YjAwYzYxZGRiZTE3ODY2ODhhNjMzLzF4JyB9O1xuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL3R3aXRjaGVtb3Rlcy5jb20vYXBpX2NhY2hlL3YyL2dsb2JhbC5qc29uJyk7XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIHhoci50aW1lb3V0ID0gNTAwMDtcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnaHR0cHM6Ly9zdGF0aWMtY2RuLmp0dm53Lm5ldC9lbW90aWNvbnMvdjEvJztcblxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0ID09PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZW1vdGVEaWMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBlbW90ZSBpbiBlbW90ZURpYykge1xuXG4gICAgICAgICAgICAgICAgRW1vdGUuYWRkRW1vdGVUb1RyaWUoZW1vdGUpO1xuXG4gICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2Vtb3RlXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGVtb3RlRGljW2Vtb3RlXVsnaW1hZ2VfaWQnXSArICcvJyArICcxLjAnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIFR3aXRjaCBzdWJzY3JpYmVyIGVtb3Rlcy5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRTdWJFbW90ZXMoKVxuICAgIHtcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly90d2l0Y2hlbW90ZXMuY29tL2FwaV9jYWNoZS92Mi9zdWJzY3JpYmVyLmpzb24nKTtcbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgeGhyLnRpbWVvdXQgPSA1MDAwO1xuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICdodHRwczovL3N0YXRpYy1jZG4uanR2bncubmV0L2Vtb3RpY29ucy92MS8nO1xuXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZVRleHQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBlbW90ZURpYyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2NoYW5uZWxzJ107XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbm5lbCBpbiBlbW90ZURpYykge1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGVtb3RlRGljW2NoYW5uZWxdWydlbW90ZXMnXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpY3QgPSBlbW90ZURpY1tjaGFubmVsXVsnZW1vdGVzJ11baV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBkaWN0Wydjb2RlJ107XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKEVtb3RlLmlzVmFsaWRFbW90ZShjb2RlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBFbW90ZS5hZGRFbW90ZVRvVHJpZShjb2RlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2NvZGVdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBkaWN0WydpbWFnZV9pZCddICsgJy8nICsgJzEuMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTG9hZCBCVFRWIGVtb3Rlcy5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRCVFRWRW1vdGVzKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLmJldHRlcnR0di5uZXQvMi9lbW90ZXMnKTtcbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgeGhyLnRpbWVvdXQgPSA1MDAwO1xuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICdodHRwczovL2Nkbi5iZXR0ZXJ0dHYubmV0L2Vtb3RlLyc7XG5cbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVGV4dCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGVtb3RlTGlzdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2Vtb3RlcyddO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZW1vdGVMaXN0KSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVMaXN0W2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFFbW90ZS5jb250YWluc0Rpc2FsbG93ZWRDaGFyKGRpY3RbJ2NvZGUnXSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBFbW90ZS5hZGRFbW90ZVRvVHJpZShkaWN0Wydjb2RlJ10pO1xuXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tkaWN0Wydjb2RlJ11dID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2lkJ10gKyAnLycgKyAnMXgnXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIExvYWQgQlRUViBjaGFubmVsIGVtb3Rlcy5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRCVFRWQ2hhbm5lbEVtb3RlcygpXG4gICAge1xuICAgICAgICBjb25zdCBjaGFubmVscyA9IGdldE9wdGlvbnMoKVsnQlRUVkNoYW5uZWxzJ107XG4gICAgICAgIGNvbnN0IGNvbW1hQ2hhbm5lbHMgPSBjaGFubmVscy5yZXBsYWNlKC9cXHMrL2csICcnKS5zcGxpdCgnLCcpO1xuICAgICAgICBsZXQgY2hhbm5lbHNMZW5ndGggPSBjb21tYUNoYW5uZWxzLmxlbmd0aDtcblxuICAgICAgICBjb21tYUNoYW5uZWxzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5uZWwpIHtcblxuICAgICAgICAgICAgaWYgKGNoYW5uZWwudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgICAgIGNoYW5uZWxzTGVuZ3RoLS07XG5cbiAgICAgICAgICAgICAgICBpZiAoRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCA+PSBjaGFubmVsc0xlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly9hcGkuYmV0dGVydHR2Lm5ldC8yL2NoYW5uZWxzLycgKyBjaGFubmVsKTtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgICAgICB4aHIudGltZW91dCA9IDUwMDA7XG4gICAgICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICdodHRwczovL2Nkbi5iZXR0ZXJ0dHYubmV0L2Vtb3RlLyc7XG5cbiAgICAgICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQrKztcblxuICAgICAgICAgICAgICAgIGlmIChFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50ID49IGNoYW5uZWxzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCsrO1xuXG4gICAgICAgICAgICAgICAgaWYgKEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQgPj0gY2hhbm5lbHNMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50Kys7XG5cbiAgICAgICAgICAgICAgICBpZiAoRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCA+PSBjaGFubmVsc0xlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZVRleHQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBlbW90ZUxpc3QgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZUxpc3QpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVMaXN0W2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghRW1vdGUuY29udGFpbnNEaXNhbGxvd2VkQ2hhcihkaWN0Wydjb2RlJ10pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIEVtb3RlLmFkZEVtb3RlVG9UcmllKGRpY3RbJ2NvZGUnXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tkaWN0Wydjb2RlJ11dID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBkaWN0WydpZCddICsgJy8nICsgJzF4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBjaGFubmVsICsgJyAoYnR0diknXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTG9hZCBJY2UncyBvbGQgc3Vic2NyaWJlciBlbW90ZXMuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkSWNlRW1vdGVzKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHN1YlRpZXJFbW90ZXMgPSB7XG4gICAgICAgICAgICAxOiBbXG4gICAgICAgICAgICAgICAgJ3B1cnBsZTEnLCAncHVycGxlMicsICdwdXJwbGUzJywgJ3B1cnBsZTQnLCAncHVycGxlQWhoaCcsICdwdXJwbGVBcm0xJywgJ3B1cnBsZUFybTInLCAncHVycGxlQmx1ZXNjcmVlbicsICdwdXJwbGVCcnVoJywgJ3B1cnBsZUNpZ3JpcCcsICdwdXJwbGVDbGF1cycsXG4gICAgICAgICAgICAgICAgJ3B1cnBsZUNvb2xzdG9yeScsICdwdXJwbGVDcmVlcCcsICdwdXJwbGVFbnphJywgJ3B1cnBsZUZha2UnLCAncHVycGxlUmVhbCcsICdwdXJwbGVGcmFuaycsICdwdXJwbGVGcm8nLCAncHVycGxlSWNlJywgJ3B1cnBsZUtLb25hJywgJ3B1cnBsZUxVTCcsXG4gICAgICAgICAgICAgICAgJ3B1cnBsZU9tZycsICdwdXJwbGVQcmlkZScsICdwdXJwbGVSb2ZsJywgJ3B1cnBsZUxlbycsICdwdXJwbGVXJywgJ3B1cnBsZVdhdCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAyOiBbXG4gICAgICAgICAgICAgICAgJ3B1cnBsZUN4JywgJ3B1cnBsZUxld2QnLCAncHVycGxlTGFtYScsICdwdXJwbGVQaXp6YScsICdwdXJwbGVXYWxsZXQnLCAncHVycGxlUycsICdwdXJwbGVMYXRlJywgJ3B1cnBsZU1vb3NlJywgJ3B1cnBsZU5vc2UnLCAncHVycGxlV3V0J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDM6IFtcbiAgICAgICAgICAgICAgICAncHVycGxlQWxsZW4nLCAncHVycGxlVHJvbGwnXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yKGNvbnN0IHRpZXIgaW4gc3ViVGllckVtb3Rlcykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJUaWVyRW1vdGVzW3RpZXJdLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBFbW90ZS5hZGRFbW90ZVRvVHJpZShzdWJUaWVyRW1vdGVzW3RpZXJdW2ldKTtcblxuICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tzdWJUaWVyRW1vdGVzW3RpZXJdW2ldXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL2Vtb3Rlcy8nICsgc3ViVGllckVtb3Rlc1t0aWVyXVtpXSArICcucG5nJyksXG4gICAgICAgICAgICAgICAgICAgIHRpZXI6IHRpZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRleHQgaXMgYSB2YWxpZCBlbW90ZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgICAqL1xuICAgIHN0YXRpYyBpc1ZhbGlkRW1vdGUodGV4dClcbiAgICB7XG4gICAgICAgIHJldHVybiAhKHRleHRbMF0ubWF0Y2goL1tBLVpdL2cpIHx8XG4gICAgICAgICAgICB0ZXh0Lm1hdGNoKC9eW2Etel0rJC9nKSB8fFxuICAgICAgICAgICAgdGV4dC5tYXRjaCgvXlxcZCokL2cpXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0ZXh0IGNvbnRhaW5zIGRpc2FsbG93ZWQgY2hhcmFjdGVycy5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHdvcmRcbiAgICAgKi9cbiAgICBzdGF0aWMgY29udGFpbnNEaXNhbGxvd2VkQ2hhcih3b3JkKVxuICAgIHtcbiAgICAgICAgZm9yIChjb25zdCBjIGluIERJU0FMTE9XRURfQ0hBUlMpIHtcbiAgICAgICAgICAgIGlmICh3b3JkLmluZGV4T2YoYykgPiAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEFkZHMgZW1vdGUgaW50byBnbG9iYWwgRW1vdGUudHJpZS5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVtb3RlU3RyaW5nXG4gICAgICovXG4gICAgc3RhdGljIGFkZEVtb3RlVG9UcmllKGVtb3RlU3RyaW5nKSB7XG4gICAgICAgIHZhciBsb3dlcmVkID0gZW1vdGVTdHJpbmcudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIGxvY2FsVHJpZSA9IEVtb3RlLnRyaWU7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW1vdGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChsb3dlcmVkLmNoYXJBdChpKSBpbiBsb2NhbFRyaWUpIHtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgbG9jYWxUcmllW2xvd2VyZWQuY2hhckF0KGkpXSAhPT0gJ3N0cmluZycgfHwgaSA9PSBlbW90ZVN0cmluZy5sZW5ndGgtMSl7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsVHJpZSA9IGxvY2FsVHJpZVtsb3dlcmVkLmNoYXJBdChpKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBlbW90ZVN0cmluZy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsVHJpZVtsb3dlcmVkLmNoYXJBdChpKV0gPSBlbW90ZVN0cmluZztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFRyaWVbbG93ZXJlZC5jaGFyQXQoaSldID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvY2FsVHJpZSA9IGxvY2FsVHJpZVtsb3dlcmVkLmNoYXJBdChpKV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuRW1vdGUuc3RhdGVzID0ge1xuICAgIHR3aXRjaDoge1xuICAgICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBzdWI6IHtcbiAgICAgICAgbG9hZGVkOiBmYWxzZVxuICAgIH0sXG4gICAgQlRUVjoge1xuICAgICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBCVFRWQ2hhbm5lbHM6IHtcbiAgICAgICAgbG9hZGVkOiBmYWxzZSxcbiAgICAgICAgbG9hZGVkQ291bnQ6IDBcbiAgICB9XG59O1xuXG5FbW90ZS5lbW90ZXMgPSB7fTtcbkVtb3RlLnRyaWUgPSBbXTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZW1vdGUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0T3B0aW9ucyB9IGZyb20gJy4vbWFpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YnNjcmliZXJzXG57XG4gICAgc3RhdGljIGxvYWRCYWRnZXMoKVxuICAgIHtcbiAgICAgICAgU3Vic2NyaWJlcnMuYmFkZ2VzWycxJ10gPSAgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy90aWVyQmFkZ2UxLnBuZycpO1xuICAgICAgICBTdWJzY3JpYmVycy5iYWRnZXNbJzInXSA9ICBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3RpZXJCYWRnZTIucG5nJyk7XG4gICAgICAgIFN1YnNjcmliZXJzLmJhZGdlc1snMyddID0gIGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvdGllckJhZGdlMy5wbmcnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0U2VsZkluZm8oaW1nU3JjKVxuICAgIHtcbiAgICAgICAgY29uc3QgcHJvZmlsZUlkID0gaW1nU3JjLnNwbGl0KCcvJylbM107XG4gICAgICAgIGNvbnN0IHN1YlRpZXIgPSBnZXRPcHRpb25zWydzdWJzY3JpcHRpb25zJ11bcHJvZmlsZUlkXVsnc3VidGllciddO1xuXG4gICAgICAgIFN1YnNjcmliZXJzLnNlbGYgPSB7XG4gICAgICAgICAgICBwcm9maWxlSW1hZ2VVcmw6IGltZ1NyYyxcbiAgICAgICAgICAgIHByb2ZpbGVJZDogcHJvZmlsZUlkLFxuICAgICAgICAgICAgc3ViVGllcjogc3ViVGllclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBzdWJzY3JpYmVyIGluZm9cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGFkZEJhZGdlcyhub2RlKVxuICAgIHtcbiAgICAgICAgaWYgKCQobm9kZSkuZmluZCgnaW1nJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mICQobm9kZSkuZmluZCgnI2F1dGhvci1waG90bycpWzBdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqIExpc3RlbiBmb3IgbXV0YXRpb25zIG9uIGF1dGhvciBpbWFnZSAqL1xuICAgICAgICBjb25zdCBpbWFnZU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtdXRhdGlvbikge1xuXG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUgPT09ICdzcmMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZmlsZUlkID0gbXV0YXRpb24udGFyZ2V0LnNyYy5zcGxpdCgnLycpWzNdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9maWxlSWQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXByb2ZpbGUtaWQnLCBwcm9maWxlSWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YkluZm8gPSBnZXRPcHRpb25zKClbJ3N1YnNjcmlwdGlvbnMnXVtwcm9maWxlSWRdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ViSW5mbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3ViLXRpZXInLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3ViLXRpZXInLCBnZXRPcHRpb25zKClbJ3N1YnNjcmlwdGlvbnMnXVtwcm9maWxlSWRdWydzdWJ0aWVyJ10pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgU3Vic2NyaWJlcnMuc2V0QmFkZ2VJbWFnZShub2RlLCBwcm9maWxlSWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKiBMaXN0ZW4gZm9yIG11dGF0aW9ucyBvbiBkYXRhLXByb2ZpbGUgaWQgb2YgYXV0aG9yIGltYWdlICovXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtdXRhdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZmlsZS1pZCcpID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXByb2ZpbGUtaWQnLCBwcm9maWxlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXN1Yi10aWVyJykgPT09ICcnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViSW5mbyA9IGdldE9wdGlvbnMoKVsnc3Vic2NyaXB0aW9ucyddW3Byb2ZpbGVJZF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdWJJbmZvID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zdWItdGllcicsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zdWItdGllcicsIGdldE9wdGlvbnMoKVsnc3Vic2NyaXB0aW9ucyddW3Byb2ZpbGVJZF1bJ3N1YnRpZXInXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YU9ic2VydmVyQ29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IHRydWUsIHN1YnRyZWU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgIGRhdGFPYnNlcnZlci5vYnNlcnZlKG11dGF0aW9uLnRhcmdldCwgZGF0YU9ic2VydmVyQ29uZmlnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgaW1hZ2VPYnNlcnZlckNvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH07XG4gICAgICAgIGltYWdlT2JzZXJ2ZXIub2JzZXJ2ZSgkKG5vZGUpLmZpbmQoJyNhdXRob3ItcGhvdG8nKVswXSwgaW1hZ2VPYnNlcnZlckNvbmZpZyk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBzZXRCYWRnZUltYWdlKG5vZGUsIHByb2ZpbGVJZClcbiAgICB7XG4gICAgICAgIGlmICgkKG5vZGUpLmZpbmQoJy50aWVyLWJhZGdlJykubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdWJJbmZvID0gZ2V0T3B0aW9ucygpWydzdWJzY3JpcHRpb25zJ11bcHJvZmlsZUlkXTtcblxuICAgICAgICBpZiAodHlwZW9mIHN1YkluZm8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0aWVySW1nID0gU3Vic2NyaWJlcnMuYmFkZ2VzW3N1YkluZm9bJ3N1YnRpZXInXV07XG5cbiAgICAgICAgY29uc3QgaW1nSHRtbCA9IGA8c3BhbiBjbGFzcz1cImhpbnQtLXJpZ2h0XCIgYXJpYS1sYWJlbD1cIkljZVBvc2VpZG9uLmNvbSAmIzEwOyYjMTA7VGllciAke3N1YkluZm9bJ3N1YnRpZXInXX0gU3Vic2NyaWJlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHt0aWVySW1nfVwiIGNsYXNzPVwidGllci1iYWRnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPmA7XG5cbiAgICAgICAgJChub2RlKS5maW5kKCcjYXV0aG9yLWJhZGdlcycpLnByZXBlbmQoaW1nSHRtbCk7XG5cbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnZW5hYmxlQ2hhdENvbG9ycyddKSB7XG4gICAgICAgICAgICAkKG5vZGUpLmZpbmQoJyNhdXRob3ItbmFtZScpLmNzcygnY29sb3InLCBzdWJJbmZvWydjb2xvciddKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGh0bWwgPSAkKG5vZGUpLmZpbmQoJyNhdXRob3ItYmFkZ2VzJykuaHRtbCgpO1xuXG4gICAgICAgICQobm9kZSkuZmluZCgnI2F1dGhvci1iYWRnZXMnKS5vbignRE9NU3VidHJlZU1vZGlmaWVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnLnRpZXItYmFkZ2UnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwoaHRtbCk7XG5cbiAgICAgICAgICAgICAgICAvKiogUmVtb3ZlIGVtcHR5IGJhZGdlcyBhZGRlZCBieSBZVCAqL1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLnl0LWxpdmUtY2hhdC1hdXRob3ItYmFkZ2UtcmVuZGVyZXItMCcpLmVhY2goZnVuY3Rpb24oaSwgZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoZWwpLndpZHRoKCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZWwpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cblN1YnNjcmliZXJzLmNoYXRNZXNzYWdlcyA9IHt9O1xuU3Vic2NyaWJlcnMuYmFkZ2VzID0ge307XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3N1YnNjcmliZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBmdW5jdGlvbiByZXBsYWNlQWxsKHN0ciwgZmluZCwgcmVwbGFjZSkge1xuICAgIGxldCBzdHJpbmcgPSBcIihcIitmaW5kK1wiKSg/IVteYWx0PVxcXCJdKlxcXCIpXCI7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoc3RyaW5nLCAnZycpLCByZXBsYWNlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTm9kZShvKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgdHlwZW9mIE5vZGUgPT09ICdvYmplY3QnID8gbyBpbnN0YW5jZW9mIE5vZGUgOiBvICYmIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygby5ub2RlVHlwZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG8ubm9kZU5hbWUgPT09ICdzdHJpbmcnXG4gICAgKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRW1vdGUgZnJvbSAnLi9lbW90ZSc7XG5pbXBvcnQgU3Vic2NyaWJlcnMgZnJvbSAnLi9zdWJzY3JpYmVycyc7XG5pbXBvcnQgTWVudGlvbkhpZ2hsaWdodCBmcm9tICcuL21lbnRpb25IaWdobGlnaHQnO1xuXG4vKipcbiAqIEJpbmRzIGNoYXQgbXV0YXRpb24gb2JzZXJ2ZXIgYW5kIGxpc3RlbiBmb3IgbmV3IGNoYXQgbWVzc2FnZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoYXRPYnNlcnZlcigpXG57XG4gICAgLyoqIExvb3Agb3ZlciBleGlzdGluZyBtZXNzYWdlcyBhbmQgYWRkIGJhZGdlcyAqL1xuICAgICQoZG9jdW1lbnQpLm9uKCdET01Ob2RlSW5zZXJ0ZWQnLCAkKCcjY2hhdCcpLnBhcmVudCgpLCBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5maW5kKCdpbWcnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKiBMaXN0ZW4gZm9yIHNlbGYtYXZhdGFyIGxvYWQgYW5kIHNldCBzZWxmLWluZm8gKi9cbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmZpbmQoJyNhdmF0YXInKS5sZW5ndGggIT09IDApIHtcblxuICAgICAgICAgICAgJChlLnRhcmdldCkuZmluZCgnI2F2YXRhcicpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbWdTcmMgPSAkKHRoaXMpLmF0dHIoJ3NyYycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGltZ1NyYy5pbmNsdWRlcygnaHR0cHM6Ly8nKSkge1xuICAgICAgICAgICAgICAgICAgICBTdWJzY3JpYmVycy5zZXRTZWxmSW5mbyhpbWdTcmMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkKGUudGFyZ2V0KS5maW5kKCcjYXV0aG9yLXBob3RvJylbMF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBTdWJzY3JpYmVycy5hZGRCYWRnZXMoZS50YXJnZXQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0eWxlLXNjb3BlIC55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyJyk7XG5cbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICBzZXRUaW1lb3V0KGNoYXRPYnNlcnZlciwgMjUwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoYXQgYm94IG9ic2VydmVyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG5cbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld05vZGVzID0gbXV0YXRpb24uYWRkZWROb2RlcztcblxuICAgICAgICAgICAgaWYgKG5ld05vZGVzICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCAkbm9kZXMgPSAkKG5ld05vZGVzKTtcblxuICAgICAgICAgICAgICAgICRub2Rlcy5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCAkbm9kZSA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkbm9kZS5oYXNDbGFzcygneXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBNZW50aW9uSGlnaGxpZ2h0KCRub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVDaGVjaygkbm9kZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXG4gICAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlLFxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgIHN1YnRyZWU6IHRydWVcbiAgICB9O1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIG9wdGlvbnMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2hhdE9ic2VydmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBFbW90ZSBmcm9tICcuL2Vtb3RlJztcbmltcG9ydCBkb25hdGVCdXR0b24gZnJvbSAnLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbic7XG5pbXBvcnQgc3BvbnNvckJ1dHRvbiBmcm9tICcuL292ZXJsYXkvc3BvbnNvckJ1dHRvbic7XG5pbXBvcnQgY29sb3JCdXR0b24gZnJvbSAnLi9vdmVybGF5L2NvbG9yQnV0dG9uJztcbmltcG9ydCBjaGVja0lmV2F0Y2hpbmdMaXZlIGZyb20gJy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlJztcbmltcG9ydCBBbHdheXNTY3JvbGxEb3duIGZyb20gJy4vb3ZlcmxheS9hbHdheXNTY3JvbGxEb3duJztcbmltcG9ydCBTcG9uc29yQ2hlY2sgZnJvbSAnLi9vdmVybGF5L3Nwb25zb3JDaGVjayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VDaGVja1xue1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB1c2VyIGlzIHdhdGNoaW5nIGZyb20gd3JvbmcgbGl2ZXN0cmVhbSBwYWdlIGFuZCB3YXJucyB0aGVtLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgeW91dHViZUdhbWluZygpXG4gICAge1xuICAgICAgICAvLyBSdW4gY2hlY2tzIGluIHN0ZXBzIHNvIHdlJ3JlIG5vdCBjYWxsaW5nIG1ldGhvZHMgdW5uZWNlc3NhcmlseVxuICAgICAgICBjb25zdCB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgIGlmKCF1cmwuaW5jbHVkZXMoJ2dhbWluZy55b3V0dWJlJykpe1xuICAgICAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpdmUtY2hhdC1pZnJhbWUnKTtcblxuICAgICAgICAgICAgaWYoaWZyYW1lKXtcbiAgICAgICAgICAgICAgICBjb25zdCAkdGV4dFdyYXBwZXIgPSAkKCcueXQtdXNlci1pbmZvJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9ICR0ZXh0V3JhcHBlci5maW5kKCdhJykudGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgaWYodGV4dCA9PT0gJ0ljZSBQb3NlaWRvbicpe1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWRpcmVjdENvbmZpcm0gPSBjb25maXJtKCdbSWNlIFBvc2VpZG9uVFZdIEdvIHRvIHRoZSBvZmZpY2lhbCBJY2UgUG9zZWlkb24gbGl2ZXN0cmVhbSBwYWdlPycpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWRpcmVjdENvbmZpcm0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICdodHRwczovL2dhbWluZy55b3V0dWJlLmNvbS9pY2VfcG9zZWlkb24vbGl2ZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHVzZXIgaXMgd2F0Y2hpbmcgYSBsaXZlc3RyZWFtIG9uIFlvdXR1YmUgZ2FtaW5nLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbGl2ZXN0cmVhbVBhZ2UoKVxuICAgIHtcbiAgICAgICAgLy8gUnVuIGNoZWNrcyBpbiBzdGVwcyBzbyB3ZSdyZSBub3QgY2FsbGluZyBtZXRob2RzIHVubmVjZXNzYXJpbHlcbiAgICAgICAgY29uc3QgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ293bmVyJyk7XG4gICAgICAgIGNvbnN0IHRleHQgPSAkKHRhcmdldCkuZmluZCgnc3BhbicpLnRleHQoKTtcblxuICAgICAgICBpZighdXJsLmluY2x1ZGVzKCdsaXZlX2NoYXQnKSAmJiAhdXJsLmluY2x1ZGVzKCdpc19wb3BvdXQ9MScpKXtcbiAgICAgICAgICAgIGNvbnN0IGNoYXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhdCcpO1xuXG4gICAgICAgICAgICBpZighdGFyZ2V0IHx8ICFjaGF0KXtcbiAgICAgICAgICAgICAgICBQYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcysrO1xuXG4gICAgICAgICAgICAgICAgaWYgKFBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzIDwgNSlcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChQYWdlQ2hlY2subGl2ZXN0cmVhbVBhZ2UsIDEwMDApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodGV4dCA9PT0gJ0ljZSBQb3NlaWRvbicpIHtcbiAgICAgICAgICAgIGRvbmF0ZUJ1dHRvbigpO1xuICAgICAgICAgICAgc3BvbnNvckJ1dHRvbigpO1xuICAgICAgICAgICAgY29sb3JCdXR0b24oKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoU3BvbnNvckNoZWNrLmNoZWNrLCAyNTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEVtb3RlLmxvYWRFbW90ZXMoKTtcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5pbml0KCk7XG4gICAgICAgIGNoZWNrSWZXYXRjaGluZ0xpdmUoKTtcblxuICAgICAgICBQYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcyA9IDA7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHVzZXIgaXMgd2F0Y2hpbmcgYSBsaXZlc3RyZWFtLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNMaXZlc3RyZWFtKCkge1xuICAgICAgICBjb25zdCBsaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnl0cC1saXZlLWJhZGdlLnl0cC1idXR0b24nKTtcbiAgICAgICAgY29uc3QgY2hhdEFwcCAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3l0LWxpdmUtY2hhdC1hcHAnKTtcbiAgICAgICAgY29uc3QgY2hhdGlGcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXZlLWNoYXQtaWZyYW1lJyk7XG4gICAgICAgIGNvbnN0IGNoYXRIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXQtbGl2ZS1jaGF0LWhlYWRlci1yZW5kZXJlcicpO1xuXG4gICAgICAgIC8vIFRoYW5rcyBTdGFja092ZXJmbG93ISBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDIwMDA0L2FjY2Vzcy1wYXJlbnQtdXJsLWZyb20taWZyYW1lXG4gICAgICAgIHZhciB1cmwgPSAod2luZG93LmxvY2F0aW9uICE9IHdpbmRvdy5wYXJlbnQubG9jYXRpb24pXG4gICAgICAgICAgICA/IGRvY3VtZW50LnJlZmVycmVyXG4gICAgICAgICAgICA6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG5cblxuICAgICAgICB2YXIgdXJsQ2hlY2sgPSAodXJsLmluZGV4T2YoJ2ljZXBvc2VpZG9uLmNvbScpID4gLTEpO1xuICAgICAgICB2YXIgbGl2ZUJ1dHRvbkNoZWNrID0gKGRvY3VtZW50LmJvZHkuY29udGFpbnMobGl2ZUJ1dHRvbikgJiYgIWxpdmVCdXR0b24uZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpKTtcbiAgICAgICAgdmFyIGNoYXRDaGVjayA9IChkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGNoYXRBcHApIHx8IGRvY3VtZW50LmJvZHkuY29udGFpbnMoY2hhdGlGcmFtZSkgfHwgZG9jdW1lbnQuYm9keS5jb250YWlucyhjaGF0SGVhZGVyKSk7XG5cbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIlVSTCBDSEVDSzpcIiwgdXJsQ2hlY2ssIHVybCk7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJMSVZFIEJVVFRPTiBDSEVDSzpcIiwgbGl2ZUJ1dHRvbkNoZWNrKTtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkNIQVQgRVhJU1RTIENIRUNLOlwiLCBjaGF0Q2hlY2spO1xuXG4gICAgICAgIGlmICh1cmxDaGVjayB8fCBsaXZlQnV0dG9uQ2hlY2sgfHwgY2hhdENoZWNrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiSVMgTElWRVNUUkVBTSFcIik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJJUyBOT1QgTElWRVNUUkVBTVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHVzZXIgaXMgd2F0Y2hpbmcgYW4gSWNlIFBvc2VpZG9uIGxpdmVzdHJlYW0uXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBpc0ljZVBvc2VpZG9uU3RyZWFtKCkge1xuICAgICAgICAvLyBUaGFua3MgU3RhY2tPdmVyZmxvdyEgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzQyMDAwNC9hY2Nlc3MtcGFyZW50LXVybC1mcm9tLWlmcmFtZVxuICAgICAgICB2YXIgdXJsID0gKHdpbmRvdy5sb2NhdGlvbiAhPSB3aW5kb3cucGFyZW50LmxvY2F0aW9uKVxuICAgICAgICAgICAgPyBkb2N1bWVudC5yZWZlcnJlclxuICAgICAgICAgICAgOiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuICAgICAgICB2YXIgWVRHY2hhbm5lbCA9ICQoXCJ5dGctb3duZXItYmFkZ2VzXCIpLnBhcmVudCgpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIFlUY2hhbm5lbCAgPSAkKFwiYS55dGQtdmlkZW8tb3duZXItcmVuZGVyZXJcIikuYXR0cignaHJlZicpO1xuXG4gICAgICAgIHZhciB3aGl0ZWxpc3RlZENoYW5uZWxzID0gW1xuICAgICAgICAgICAgXCIvY2hhbm5lbC9VQ3Y5RWRsX1didGJQZVVSUHRGRG8tdUFcIiwgLy8gSWNlIFBvc2VpZG9uXG4gICAgICAgICAgICBcIi9jaGFubmVsL1VDcHhBdjhpME1UUG9jaTdJN2FGTnhaZ1wiLCAvLyBHZW9yZ2UgQWxsZW5cbiAgICAgICAgICAgIFwiL2NoYW5uZWwvVUNhREpfRFR6M2tibmVNV2lWMzFZaUZBXCIsIC8vIEFuc2llbiAxMiAvIGFuZHJpZXNfZGV2XG4gICAgICAgICAgICBcIi9jaGFubmVsL1VDVG1ySFFFRUZEWVB5NTFtVWcwSnBqQVwiLCAvLyB4Qnl0M3pcbiAgICAgICAgICAgIFwiL2NoYW5uZWwvVUMxRXpaT1cxdFZFSzJ2am1iU28xMzdBXCIsIC8vIHhCeXQzeiBJUFRWIHRlc3Rpbmcgc3RyZWFtXG4gICAgICAgICAgICBcIi9jaGFubmVsL1VDOEVvT0ZBbV9yZU5YR0hXSy1rQlVYd1wiICAvLyBzcGFyY3V0XG4gICAgICAgIF07XG5cbiAgICAgICAgdmFyIHVybENoZWNrID0gKHVybC5pbmRleE9mKCdpY2Vwb3NlaWRvbi5jb20nKSA+IC0xIHx8IHVybC5pbmRleE9mKCdsaXZlX2NoYXQnKSA+IC0xKTtcbiAgICAgICAgdmFyIGNoYW5uZWxDaGVjayA9ICh3aGl0ZWxpc3RlZENoYW5uZWxzLmluZGV4T2YoWVRHY2hhbm5lbCkgPiAtMSB8fCB3aGl0ZWxpc3RlZENoYW5uZWxzLmluZGV4T2YoWVRjaGFubmVsKSA+IC0xKTtcblxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiVVJMIENIRUNLOlwiLCB1cmxDaGVjaywgdXJsKTtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkNIQU5ORUwgQ0hFQ0s6XCIsIGNoYW5uZWxDaGVjaywgWVRHY2hhbm5lbCwgWVRjaGFubmVsKTtcblxuICAgICAgICBpZiAodXJsQ2hlY2sgfHwgY2hhbm5lbENoZWNrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiSVMgSUNFUE9TRUlET04gU1RSRUFNIVwiKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIklTIE5PVCBJQ0VQT1NFSURPTiBTVFJFQU0hXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuUGFnZUNoZWNrLnN0cmVhbXBhZ2VDaGVja3MgPSAwO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wYWdlQ2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYkNvbXBsZXRlXG57XG4gICAgLyoqXG4gICAgUmVjdXJzaXZlbHkgYWRkcyB0byB2YWx1ZXNBcnJheSBwb3NzaWJsZSBlbW90ZXMgZnJvbSBsb2NhbFRyaWVcbiAgICAqL1xuICAgIHN0YXRpYyBnZXRQb3NzaWJsZVZhbHVlcyhsb2NhbFRyaWUsIHZhbHVlc0FycmF5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgbG9jYWxUcmllID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFsdWVzQXJyYXkucHVzaChsb2NhbFRyaWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhsb2NhbFRyaWUpO1xuICAgICAgICAgICAgbGV0IHJldHVyblZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgVGFiQ29tcGxldGUuZ2V0UG9zc2libGVWYWx1ZXMobG9jYWxUcmllW2tleXNbaV1dLCB2YWx1ZXNBcnJheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICBTZWFyY2hlcyBFbW90ZS50cmllIGZvciBhbGwgZW1vdGVzIHN0YXJ0aW5nIHdpdGggcy4gSWYgaXQgZmluZHMgbXVsdGlwbGUgdmFsdWVzLCByZXR1cm5zIHBvcyAoaW5kZXgpIHZhbHVlXG4gICAgKi9cbiAgICBzdGF0aWMgZmluZFNpbWlsYXIocywgcG9zKSB7XG4gICAgICAgIHMgPSBzLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGxvY2FsVHJpZSA9IEVtb3RlLnRyaWU7XG4gICAgICAgIHdoaWxlICgoaSA8IHMubGVuZ3RoKSAmJiAocy5jaGFyQXQoaSkgaW4gbG9jYWxUcmllKSkge1xuICAgICAgICAgICAgbG9jYWxUcmllID0gbG9jYWxUcmllW3MuY2hhckF0KGkpXTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgVGFiQ29tcGxldGUuZ2V0UG9zc2libGVWYWx1ZXMobG9jYWxUcmllLCB2YWx1ZXMpO1xuICAgICAgICAgICAgaWYgKHBvcyA+PSB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzW3Bvc107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgYmluZEV2ZW50KCkge1xuICAgICAgICAkKFwieXQtbGl2ZS1jaGF0LXRleHQtaW5wdXQtZmllbGQtcmVuZGVyZXJcIikub24oJ2tleWRvd24nLCBcImRpdiNpbnB1dFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQga2V5Q29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT0gOSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFRleHQgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgICAgICBpZigvXFxzJC8udGVzdChjdXJyZW50VGV4dCkpeyAvL2xhc3QgY2hhciBpcyB3aGl0ZXNwYWNlIC0gc28gZG9udCB0cmVhdCBpdCBhcyBhIHdvcmQuIHNwbGl0IGZ1bmN0aW9uIGRvZXNudCBhY3R1YWxseSBzcGxpdCBlZyBcIlRyaUhhcmQgXCIgaW50byBcIlRyaUhhcmRcIiBhbmQgXCJcIiBidXQgcmV0dXJucyBcIlRyaUhhcmQgXCJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgd29yZHMgPSBjdXJyZW50VGV4dC5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIGlmIChUYWJDb21wbGV0ZS5sYXN0V29yZC5sZW5ndGgpIHsgLy93b3JkIHR5cGVkIGJ5IHVzZWQgaGFzIGJlZW4gYWxyZWFkeSByZXBsYWNlZCBieSBzb21lIHN1Z2dlc3Rpb24gLT4gcmVtb3ZlIHRoYXQgc3VnZ2VzdGlvbiAoaXMgZ29pbmcgdG8gZ2V0IHJlcGxhY2VkIGJ5IG5ldyBzdWdnZXN0aW9uIG9yIGxhc3RXb3JkKVxuICAgICAgICAgICAgICAgICAgICB3b3Jkcy5wb3AoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBUYWJDb21wbGV0ZS5sYXN0V29yZCA9IHdvcmRzLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgc2ltaWxhciA9IFRhYkNvbXBsZXRlLmZpbmRTaW1pbGFyKFRhYkNvbXBsZXRlLmxhc3RXb3JkLCBUYWJDb21wbGV0ZS50YWJQcmVzc2VkQ291bnQpO1xuICAgICAgICAgICAgICAgIGxldCBuZXdUZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBuZXdUZXh0ICs9IHdvcmRzW2ldICsgJyAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2ltaWxhcikge1xuICAgICAgICAgICAgICAgICAgICBuZXdUZXh0ICs9IHNpbWlsYXI7XG4gICAgICAgICAgICAgICAgICAgIFRhYkNvbXBsZXRlLnRhYlByZXNzZWRDb3VudCsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1RleHQgKz0gVGFiQ29tcGxldGUubGFzdFdvcmQ7XG4gICAgICAgICAgICAgICAgICAgIFRhYkNvbXBsZXRlLmxhc3RXb3JkID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIFRhYkNvbXBsZXRlLnRhYlByZXNzZWRDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQodGhpcykudGV4dChuZXdUZXh0KTtcbiAgICAgICAgICAgICAgICAvL2FkZHMgZm9jdXMgdG8gbGFzdCBjaGFyXG4gICAgICAgICAgICAgICAgbGV0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoJCh0aGlzKVswXSk7XG4gICAgICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGxldCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG5cbiAgICAgICAgICAgICAgICAvL3VwZGF0ZXMgY2hhcmFjdGVyIGNvdW50XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFRhYkNvbXBsZXRlLmlucHV0Q2hhbmdlZEV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgVGFiQ29tcGxldGUudGFiUHJlc3NlZENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICBUYWJDb21wbGV0ZS5sYXN0V29yZCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn07XG5cblRhYkNvbXBsZXRlLmlucHV0Q2hhbmdlZEV2ZW50ID0gbmV3IEV2ZW50KCdpbnB1dCcsIHtcbiAgICAnYnViYmxlcyc6IHRydWUsXG4gICAgJ2NhbmNlbGFibGUnOiB0cnVlXG59KTtcblRhYkNvbXBsZXRlLnRhYlByZXNzZWRDb3VudCA9IDA7XG5UYWJDb21wbGV0ZS5sYXN0V29yZCA9ICcnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90YWJDb21wbGV0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXRPcHRpb25zIH0gZnJvbSAnLi9tYWluJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIG1lbnRpb24gYW5kIGNoYW5nZXMgYmFja2dyb3VuZCB0byBCVFRWIHN0eWxlIGJhY2tncm91bmQuXG4gKiBAcGFyYW0ge25vZGV9IG5vZGUgLSBNZXNzYWdlIG5vZGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWVudGlvbkhpZ2hsaWdodChub2RlKVxue1xuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gJCgnI2F1dGhvciAjYXV0aG9yLW5hbWUnKS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBhdXRob3JUeXBlID0gbm9kZS5nZXQoMCkuZ2V0QXR0cmlidXRlKCdhdXRob3ItdHlwZScpO1xuXG4gICAgaWYgKHR5cGVvZiBjdXJyZW50VXNlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChnZXRPcHRpb25zKClbJ21lbnRpb25IaWdobGlnaHQnXSAmJiBjdXJyZW50VXNlci5sZW5ndGggPiAyICYmICFub2RlLmhhc0NsYXNzKCd5dC1saXZlLWNoYXQtbGVnYWN5LXBhaWQtbWVzc2FnZS1yZW5kZXJlci0wJykpIHsgLy8gQ2hlY2sgaXQncyBub3Qgc3BvbnNvciAvIHN1cGVyY2hhdCwgYWxzbyBtZW50aW9uSGlnaGxpZ2h0IGVuYWJsZWRcblxuICAgICAgICBjb25zdCB1bmlxdWVpZCA9IG5vZGUuZ2V0KDApLmdldEF0dHJpYnV0ZSgnaWQnKTsgLy8gQ29weSB1bmlxdWUgbWVzc2FnZSBpZFxuICAgICAgICBjb25zdCBtZXNzYWdlID0gKFwiIFwiICsgbm9kZS5maW5kKCcjbWVzc2FnZScpLnRleHQoKS50b0xvd2VyQ2FzZSgpICsgXCIgXCIpLnJlcGxhY2UoL1tcXHUyMDBCLVxcdTIwMERcXHVGRUZGXS9nLCAnJyk7XG5cbiAgICAgICAgaWYgKHVuaXF1ZWlkID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5pcXVlaWQubGVuZ3RoID4gMzAgJiYgKGF1dGhvclR5cGUgPT09IFwib3duZXJcIiB8fCBtZXNzYWdlLmluZGV4T2YoJyAnK2N1cnJlbnRVc2VyKycgJykgIT09IC0xIHx8IG1lc3NhZ2UuaW5kZXhPZignQCcrY3VycmVudFVzZXIrJyAnKSAhPT0gLTEpKSB7IC8vIElmIHlvdXIgbmFtZSBpcyBpbiB0aGUgbWVzc2FnZSwgYW5kIGl0J3Mgbm90IHlvdXIgbWVzc2FnZSBvciB0aGUgbWVzc2FnZSBpcyBmcm9tIHRoZSBzdHJlYW1lclxuICAgICAgICAgICAgbm9kZS5nZXQoMCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDI1NSwwLDAsMC40MClcIjtcbiAgICAgICAgICAgIG5vZGUuZmluZCgnI2F1dGhvci1uYW1lJykuZ2V0KDApLnN0eWxlLmNvbG9yID0gXCIjZmZmZmZmXCI7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tZW50aW9uSGlnaGxpZ2h0LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFNDUk9MTF9FTkFCTEVEX1VSTCwgU0NST0xMX0RJU0FCTEVEX1VSTCB9IGZyb20gJy4vLi4vbWFpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsd2F5c1Njcm9sbERvd25cbntcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIG92ZXJsYXkgYW5kIGJpbmRzIHRoZSBuZWNlc3NhcnkgbGlzdGVuZXJzLlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIHN0YXRpYyBpbml0KClcbiAgICB7XG4gICAgICAgIGNvbnN0IHNjcm9sbGRvd25XcmFwcGVyID0gJCgnLmlwdHYtc2Nyb2xsZG93bi13cmFwcGVyJyk7XG5cbiAgICAgICAgaWYgKHNjcm9sbGRvd25XcmFwcGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgc2Nyb2xsZG93bldyYXBwZXIucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzY3JvbGxXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgc2Nyb2xsV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQWx3YXlzIHNjcm9sbCBkb3duIChFbmFibGVkKScpO1xuICAgICAgICBzY3JvbGxXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2hpbnQtLXRvcCcsICdpcHR2LXNjcm9sbGRvd24td3JhcHBlcicpO1xuXG4gICAgICAgICQoc2Nyb2xsV3JhcHBlcikuY3NzKHtcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAncmlnaHQnOiAnMTEzcHgnLFxuICAgICAgICAgICAgJ2JvdHRvbSc6ICcxOHB4J1xuICAgICAgICB9KTtcblxuICAgICAgICAkKHNjcm9sbFdyYXBwZXIpLmh0bWwoYFxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaXB0di1zY3JvbGxkb3duLXRvZ2dsZVwiIHN0eWxlPVwib3V0bGluZTogMDtcIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7U0NST0xMX0VOQUJMRURfVVJMfVwiIGFsdD1cIkFsd2F5cyBzY3JvbGwgZG93blwiIGhlaWdodD1cIjExXCIgd2lkdGg9XCIxMVwiIGNsYXNzPVwiaXB0di1zY3JvbGxkb3duLXRvZ2dsZS1pY29uXCI+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIGApO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsV3JhcHBlcik7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5pcHR2LXNjcm9sbGRvd24tdG9nZ2xlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2xlYXJJbnRlcnZhbChBbHdheXNTY3JvbGxEb3duLmludGVydmFsKTtcblxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICQoJyNpdGVtLXNjcm9sbGVyJykuc2Nyb2xsVG9wKDk5OTk5OTk5OSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5oaWRlU2Nyb2xsT25DaW5lbWEoc2Nyb2xsV3JhcHBlcik7XG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uU3BvbnNvck1lbnUoc2Nyb2xsV3JhcHBlcik7XG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbERvd25MaXN0ZW5lcigpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgJ0Fsd2F5cyBzY3JvbGwgZG93bicgb3ZlcmxheSB3aGVuIGNpbmVtYSBtb2RlIGlzIG9wZW5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtub2RlfSBzY3JvbGxXcmFwcGVyXG4gICAgICovXG4gICAgc3RhdGljIGhpZGVTY3JvbGxPbkNpbmVtYShzY3JvbGxXcmFwcGVyKVxuICAgIHtcbiAgICAgICAgY29uc3Qgd2F0Y2hQYWdlID0gJ3l0Zy13YXRjaC1wYWdlJztcblxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG0pID0+IHtcbiAgICAgICAgICAgICAgICAkKG0udGFyZ2V0KS5pcygnW3NpZGViYXItY29sbGFwc2VkXScpID8gJChzY3JvbGxXcmFwcGVyKS5oaWRlKCkgOiAkKHNjcm9sbFdyYXBwZXIpLnNob3coKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBvYnNlcnZlck9wdHMgPSB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IGZhbHNlLFxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnc2lkZWJhci1jb2xsYXBzZWQnXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGFkZE9ic2VydmVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCQod2F0Y2hQYWdlKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKCQod2F0Y2hQYWdlKVswXSwgb2JzZXJ2ZXJPcHRzKTtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGFkZE9ic2VydmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUwKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlICdBbHdheXMgc2Nyb2xsIGRvd24nIG92ZXJsYXkgd2hlbiBzcG9uc29yIG1lbnUgaXMgb3Blbi5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtub2RlfSBzY3JvbGxXcmFwcGVyXG4gICAgICovXG4gICAgc3RhdGljIGhpZGVTY3JvbGxPblNwb25zb3JNZW51KHNjcm9sbFdyYXBwZXIpXG4gICAge1xuICAgICAgICBjb25zdCBjaGF0SW5wdXRSZW5kZXJlciA9ICd5dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlcic7XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobSkgPT4ge1xuICAgICAgICAgICAgICAgICQobS50YXJnZXQpLmF0dHIoJ2NyZWF0b3Itb3BlbicpID8gJChzY3JvbGxXcmFwcGVyKS5oaWRlKCkgOiAkKHNjcm9sbFdyYXBwZXIpLnNob3coKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBvYnNlcnZlck9wdHMgPSB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IGZhbHNlLFxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnY3JlYXRvci1vcGVuJ11cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNwb25zb3JDbGljayA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGlmICgkKGNoYXRJbnB1dFJlbmRlcmVyKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKCQoY2hhdElucHV0UmVuZGVyZXIpWzBdLCBvYnNlcnZlck9wdHMpO1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc3BvbnNvckNsaWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUwKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgJ0Fsd2F5cyBzY3JvbGwgZG93bicgZnVuY3Rpb25hbGl0eSB3aGVuIHNjcm9sbGluZyBtYW51YWxseS5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGJpbmRTY3JvbGxMaXN0ZW5lcigpXG4gICAge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlbS1zY3JvbGxlcicpO1xuXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsTGlzdGVuZXIoKSB9LCAyNTApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnI2l0ZW0tc2Nyb2xsZXInKS5vbignbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bihmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNpdGVtLXNjcm9sbGVyJykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYoZXZlbnQudGFyZ2V0ID09PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi50b2dnbGVTY3JvbGxEb3duKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgJ0Fsd2F5cyBzY3JvbGwgZG93bicgZnVuY3Rpb25hbGl0eSB3aGVuIGJsdWUganVtcCBkb3duIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgYmluZFNjcm9sbERvd25MaXN0ZW5lcigpXG4gICAge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1tb3JlJyk7XG5cbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHsgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsRG93bkxpc3RlbmVyKCkgfSwgMjUwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bih0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgc2Nyb2xsRG93biBzdGF0ZSBhbmQgYWRqdXN0IG92ZXJsYXkgYWNjb3JkaW5nbHkuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB0b2dnbGVTY3JvbGxEb3duKHN0YXRlKVxuICAgIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9ICFBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSBzdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJy5pcHR2LXNjcm9sbGRvd24td3JhcHBlcicpLmF0dHIoJ2FyaWEtbGFiZWwnLCBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPyAnQWx3YXlzIHNjcm9sbCBkb3duIChFbmFibGVkKScgOiAnQWx3YXlzIHNjcm9sbCBkb3duIChEaXNhYmxlZCknKTtcbiAgICAgICAgJCgnLmlwdHYtc2Nyb2xsZG93bi10b2dnbGUtaWNvbicpLmF0dHIoJ3NyYycsIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA/IFNDUk9MTF9FTkFCTEVEX1VSTCA6IFNDUk9MTF9ESVNBQkxFRF9VUkwpO1xuICAgIH07XG59O1xuXG5BbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSB0cnVlO1xuQWx3YXlzU2Nyb2xsRG93bi5pbnRlcnZhbCA9IG51bGw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvYWx3YXlzU2Nyb2xsRG93bi5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENoZWNrcyBpZiB1c2VyIGlzIGJlaGluZCBpbiBsaXZlc3RyZWFtIGFuZCB3YXJucyB0aGVtLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja0lmV2F0Y2hpbmdMaXZlKCkge1xuXG4gICAgbGV0IGxpdmVDaGVja0ludGVydmFsID0gbnVsbDtcblxuICAgIGxpdmVDaGVja0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgJGxpdmVCdXR0b24gPSAkKCcueXRwLWxpdmUtYmFkZ2UueXRwLWJ1dHRvbicpO1xuXG4gICAgICAgIGlmICgkbGl2ZUJ1dHRvbi5pcygnOmVuYWJsZWQnKSAmJiAkbGl2ZUJ1dHRvbi5pcygnOnZpc2libGUnKSAmJiAkKCcuaXB0di1saXZlLXdhcm5pbmcnKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAkKCcjcGxheWVyLWNvbnRhaW5lcicpLmFwcGVuZChgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWxpdmUtd2FybmluZy10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBZb3VcXCdyZSB3YXRjaGluZyBvbGQgZm9vdGFnZSwgY2xpY2sgdGhlIExJVkUgYnV0dG9uIGluIHRoZSBib3R0b20gbGVmdCBjb3JuZXIgdG8gd2F0Y2ggbGl2ZS5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWxpdmUtd2FybmluZy1kaXNtaXNzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJpcHR2LWxpdmUtd2FybmluZy1jbG9zZVwiPuKclTwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgKTtcbiAgICAgICAgfVxuICAgIH0sIDE1ICogMTAwMCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmlwdHYtbGl2ZS13YXJuaW5nLWNsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5pcHR2LWxpdmUtd2FybmluZycpLnJlbW92ZSgpO1xuICAgICAgICBjbGVhckludGVydmFsKGxpdmVDaGVja0ludGVydmFsKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZWRvd24nLCAnLnl0cC1saXZlLWJhZGdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5pcHR2LWxpdmUtd2FybmluZycpLnJlbW92ZSgpO1xuICAgIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQWRkcyBuZXcgY29sb3IgY2hhbmdlIGJ1dHRvbiB0byBsaXZlc3RyZWFtIHBhZ2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yQnV0dG9uKClcbntcbiAgICBjb25zdCBjb2xvckljb24gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3BlbmNpbC1pY29uLnBuZycpO1xuICAgIGNvbnN0IGNvbG9ySW1hZ2UgPSBgPGltZyBzcmM9XCIke2NvbG9ySWNvbn1cIiBhbHQ9XCJzdGFyXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czogbm9uZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4MCU7IGhlaWdodDo4MCU7IG1hcmdpbi1yaWdodDogMnB4O1wiPmA7XG5cbiAgICBjb25zdCBjb2xvckJ1dHRvbiA9IGBcbiAgICAgICAgPGlwdHYtY29sb3ItYnV0dG9uIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiIHJhaXNlZD1cIlwiIHN1cHBvcnRlZC1jb2xkLWxvYWQtYWN0aW9ucz1cIlsmcXVvdDtjb2xvciZxdW90O11cIiB3YWl0LWZvci1zaWduYWw9XCJ3YXRjaC1wYWdlLWluaXRpYWxpemVkXCIgY2xhc3M9XCJzdHlsZS1zY29wZSB5dGctd2F0Y2gtZm9vdGVyIHgtc2NvcGUgaXB0di1jb2xvci1idXR0b24tMFwiPlxuICAgICAgICAgICAgPGlyb24tc2lnbmFscyBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtY29sb3ItYnV0dG9uXCI+PC9pcm9uLXNpZ25hbHM+XG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b24geC1zY29wZSBwYXBlci1idXR0b24tMFwiIHJvbGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIiBhbmltYXRlZD1cIlwiIGFyaWEtZGlzYWJsZWQ9XCJmYWxzZVwiIGVsZXZhdGlvbj1cIjFcIiByYWlzZWQ9XCJcIiBhcmlhLWxhYmVsPVwiQ0hBTkdFIE5BTUUgQ09MT1JcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWp1c3RpZmllZCBzdHlsZS1zY29wZSBpcHR2LWNvbG9yLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDI0cHg7IGhlaWdodDogMjRweDtcIiBjbGFzcz1cImljb24tY29udGFpbmVyIGxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx5dC1pY29uIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwveXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b25cIiBzdHlsZT1cIm1hcmdpbjogMCAzcHhcIj48c3BhbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZm9ybWF0dGVkLXN0cmluZ1wiPkNIQU5HRSBOQU1FIENPTE9SPC9zcGFuPjwvaXB0di1mb3JtYXR0ZWQtc3RyaW5nPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9wYXBlci1idXR0b24+XG4gICAgICAgIDwvaXB0di1jb2xvci1idXR0b24+YDtcblxuICAgICQoJy5pcHR2LXNwb25zb3ItYnV0dG9uLTAnKS5hZnRlcihjb2xvckJ1dHRvbik7XG5cbiAgICAkKGNvbG9yQnV0dG9uKS5yZWFkeSggZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5zdHlsZS1zY29wZS5pcHR2LWNvbG9yLWJ1dHRvbi54LXNjb3BlLnl0LWljb24tMCcpLmh0bWwoY29sb3JJbWFnZSk7XG4gICAgfSk7XG5cbiAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtY29sb3ItYnV0dG9uLTAnKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL3d3dy5pY2Vwb3NlaWRvbi5jb20vcHJvZmlsZScsICdfYmxhbmsnKTtcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWNvbG9yLWJ1dHRvbi0wIHBhcGVyLWJ1dHRvbicpWzBdLmJsdXIoKTtcbiAgICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvY29sb3JCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQWRkcyBkb25hdGUgYnV0dG9uIHRvIGxpdmVzdHJlYW0gcGFnZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZG9uYXRlQnV0dG9uKClcbntcbiAgICAkKCcuaXB0di1kb25hdGUtYnV0dG9uLTAnKS5yZW1vdmUoKTtcblxuICAgIGNvbnN0IGRvbmF0ZUljb24gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL2RvbmF0ZS1pY29uLnBuZycpO1xuICAgIGNvbnN0IHNwb25zb3JJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9zcG9uc29yLWljb24ucG5nJyk7XG5cbiAgICBjb25zdCBzcG9uc29ySW1hZ2UgPSBgPGltZyBzcmM9XCIke3Nwb25zb3JJY29ufVwiIGFsdD1cInN0YXJcIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIj5gO1xuXG4gICAgY29uc3QgZG9uYXRlQnV0dG9uID0gYFxuICAgICAgICA8aXB0di1kb25hdGUtYnV0dG9uIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiIHJhaXNlZD1cIlwiIHN1cHBvcnRlZC1jb2xkLWxvYWQtYWN0aW9ucz1cIlsmcXVvdDtzcG9uc29yJnF1b3Q7XVwiIHdhaXQtZm9yLXNpZ25hbD1cIndhdGNoLXBhZ2UtaW5pdGlhbGl6ZWRcIiBjbGFzcz1cInN0eWxlLXNjb3BlIHl0Zy13YXRjaC1mb290ZXIgeC1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b24tMFwiPlxuICAgICAgICAgICAgPGlyb24tc2lnbmFscyBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPjwvaXJvbi1zaWduYWxzPlxuICAgICAgICAgICAgPHBhcGVyLWJ1dHRvbiBzdHlsZT1cImNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kLWNvbG9yOiAjMGY5ZDU4OyBtaW4td2lkdGg6IDA7XCIgY2xhc3M9XCJlbmFibGVkIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvbiB4LXNjb3BlIHBhcGVyLWJ1dHRvbi0wXCIgcm9sZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiIGFuaW1hdGVkPVwiXCIgYXJpYS1kaXNhYmxlZD1cImZhbHNlXCIgZWxldmF0aW9uPVwiMVwiIHJhaXNlZD1cIlwiIGFyaWEtbGFiZWw9XCJEb25hdGUgdG8gSWNlX1Bvc2VpZG9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1qdXN0aWZpZWQgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMjRweDsgaGVpZ2h0OiAyNHB4O1wiIGNsYXNzPVwiaWNvbi1jb250YWluZXIgbGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx5dC1pY29uIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uIHgtc2NvcGUgeXQtaWNvbi0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3l0LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpcHR2LWZvcm1hdHRlZC1zdHJpbmcgaWQ9XCJ0ZXh0XCIgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItY2VudGVyIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiIHN0eWxlPVwibWFyZ2luOiAwIDNweFwiPjxzcGFuIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1mb3JtYXR0ZWQtc3RyaW5nXCI+RE9OQVRFPC9zcGFuPjwvaXB0di1mb3JtYXR0ZWQtc3RyaW5nPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9wYXBlci1idXR0b24+XG4gICAgICAgIDwvaXB0di1kb25hdGUtYnV0dG9uPmA7XG5cbiAgICBjb25zdCBkb25hdGVJbWFnZSA9IGA8aW1nIHNyYz1cIiR7ZG9uYXRlSWNvbn1cIiBhbHQ9XCJkb2xsYXItc2lnblwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPmA7XG5cbiAgICAvLyBJbnNlcnQgZG9uYXRlQnV0dG9uIG5leHQgdG8gc3BvbnNvckJ1dHRvblxuICAgIGNvbnN0IHNwb25zb3JCdXR0b24gPSAnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24tMCc7XG5cbiAgICAkKHNwb25zb3JCdXR0b24pLmJlZm9yZShkb25hdGVCdXR0b24pO1xuICAgICQoZG9uYXRlQnV0dG9uKS5yZWFkeSggZnVuY3Rpb24oKSB7ICQoJy5zdHlsZS1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24ueC1zY29wZS55dC1pY29uLTAnKS5odG1sKGRvbmF0ZUltYWdlKTsgfSk7XG5cbiAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtZG9uYXRlLWJ1dHRvbi0wJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly95b3V0dWJlLnN0cmVhbWxhYnMuY29tL2ljZXBvc2VpZG9uIy8nLCAnX2JsYW5rJyk7XG4gICAgICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1kb25hdGUtYnV0dG9uLTAgcGFwZXItYnV0dG9uJylbMF0uYmx1cigpO1xuICAgIH0pO1xuXG4gICAgLy8gQ2hhbmdlIHNwb25zb3JCdXR0b24gaWNvbiB0byBzdGFyXG4gICAgJChgJHtzcG9uc29yQnV0dG9ufSAuc3R5bGUtc2NvcGUueXRnLW1lbWJlcnNoaXAtb2ZmZXItYnV0dG9uLngtc2NvcGUueXQtaWNvbi0wYCkuaHRtbChzcG9uc29ySW1hZ2UpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9kb25hdGVCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogU2hvdyBlbW90ZSBsb2FkaW5nIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkaW5nRW1vdGVzSW5mbygpXG57XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAkKGRpdikudGV4dCgnTG9hZGluZyBlbW90ZXMuLi4nKTtcblxuICAgICQoZGl2KS5jc3Moe1xuICAgICAgICAnZm9udC1zaXplJzogJzE2cHgnLFxuICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuICAgICAgICAncmlnaHQnOiAnMjVweCcsXG4gICAgICAgICdib3R0b20nOiAnNzVweCcsXG4gICAgICAgICdjb2xvcic6ICcjZmZmJyxcbiAgICAgICAgJ3RleHQtc2hhZG93JzogJzJweCAycHggMnB4IHJnYmEoMCwwLDAsMC43NSknXG4gICAgfSk7XG5cbiAgICAkKGRpdikuYWRkQ2xhc3MoJ2lwdHYtbG9hZGluZy1lbW90ZXMnKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvbG9hZGluZ0Vtb3Rlc0luZm8uanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQWRkcyBuZXcgc3BvbnNvciBidXR0b24gdG8gbGl2ZXN0cmVhbSBwYWdlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcG9uc29yQnV0dG9uKClcbntcbiAgICBjb25zdCBzcG9uc29ySWNvbiA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvc3BvbnNvci1pY29uLnBuZycpO1xuICAgIGNvbnN0IHNwb25zb3JJbWFnZSA9IGA8aW1nIHNyYz1cIiR7c3BvbnNvckljb259XCIgYWx0PVwic3RhclwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPmA7XG5cbiAgICBjb25zdCBzcG9uc29yQnV0dG9uID0gYFxuICAgICAgICA8aXB0di1zcG9uc29yLWJ1dHRvbiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiByYWlzZWQ9XCJcIiBzdXBwb3J0ZWQtY29sZC1sb2FkLWFjdGlvbnM9XCJbJnF1b3Q7c3BvbnNvciZxdW90O11cIiB3YWl0LWZvci1zaWduYWw9XCJ3YXRjaC1wYWdlLWluaXRpYWxpemVkXCIgY2xhc3M9XCJzdHlsZS1zY29wZSB5dGctd2F0Y2gtZm9vdGVyIHgtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvbi0wXCI+XG4gICAgICAgICAgICA8aXJvbi1zaWduYWxzIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvblwiPjwvaXJvbi1zaWduYWxzPlxuICAgICAgICAgICAgPHBhcGVyLWJ1dHRvbiBzdHlsZT1cImNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kLWNvbG9yOiAjMGY5ZDU4OyBtaW4td2lkdGg6IDA7XCIgY2xhc3M9XCJlbmFibGVkIHN0eWxlLXNjb3BlIGlwdHYtc3BvbnNvci1idXR0b24geC1zY29wZSBwYXBlci1idXR0b24tMFwiIHJvbGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIiBhbmltYXRlZD1cIlwiIGFyaWEtZGlzYWJsZWQ9XCJmYWxzZVwiIGVsZXZhdGlvbj1cIjFcIiByYWlzZWQ9XCJcIiBhcmlhLWxhYmVsPVwiU1BPTlNPUiBPTiBPRkZJQ0lBTCBTSVRFXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1qdXN0aWZpZWQgc3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDI0cHg7IGhlaWdodDogMjRweDtcIiBjbGFzcz1cImljb24tY29udGFpbmVyIGxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHl0LWljb24gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LXNwb25zb3ItYnV0dG9uIHgtc2NvcGUgeXQtaWNvbi0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3l0LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpcHR2LWZvcm1hdHRlZC1zdHJpbmcgaWQ9XCJ0ZXh0XCIgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItY2VudGVyIHN0eWxlLXNjb3BlIGlwdHYtc3BvbnNvci1idXR0b25cIiBzdHlsZT1cIm1hcmdpbjogMCAzcHhcIj48c3BhbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZm9ybWF0dGVkLXN0cmluZ1wiPlNQT05TT1IgT04gT0ZGSUNJQUwgU0lURTwvc3Bhbj48L2lwdHYtZm9ybWF0dGVkLXN0cmluZz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcGFwZXItYnV0dG9uPlxuICAgICAgICA8L2lwdHYtc3BvbnNvci1idXR0b24+YDtcblxuICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUueXRnLW1lbWJlcnNoaXAtb2ZmZXItYnV0dG9uLTAnKS5iZWZvcmUoc3BvbnNvckJ1dHRvbik7XG5cbiAgICAkKHNwb25zb3JCdXR0b24pLnJlYWR5KCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLmlwdHYtc3BvbnNvci1idXR0b24ueC1zY29wZS55dC1pY29uLTAnKS5odG1sKHNwb25zb3JJbWFnZSk7XG4gICAgfSk7XG5cbiAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtc3BvbnNvci1idXR0b24tMCcpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgd2luZG93Lm9wZW4oJ2h0dHBzOi8vd3d3LmljZXBvc2VpZG9uLmNvbS8nLCAnX2JsYW5rJyk7XG4gICAgICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1zcG9uc29yLWJ1dHRvbi0wIHBhcGVyLWJ1dHRvbicpWzBdLmJsdXIoKTtcbiAgICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvc3BvbnNvckJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BvbnNvckNoZWNrXG57XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdXNlciBpcyBzdGlsbCB1c2luZyBvbGQgc3BvbnNvcnNoaXBcbiAgICAgKi9cbiAgICBzdGF0aWMgY2hlY2soKVxuICAgIHtcbiAgICAgICAgJC5nZXQoY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2NvbnRlbnQuaHRtbCcpLCBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgICAgICQoZGF0YSkuYXBwZW5kVG8oJ2JvZHknKTtcblxuICAgICAgICAgICAgY29uc3QgaW1nVXJsID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2ljb25zL3Nwb25zb3ItYmVuZWZpdHMucG5nJyk7XG4gICAgICAgICAgICAkKCcuc3BvbnNvci1tb2RhbCAuc3ViLWJlbmVmaXRzJykuYXR0cignc3JjJywgaW1nVXJsKTtcblxuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jbG9zZS1tb2RhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJy5zcG9uc29yLW1vZGFsJykuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQoJy55dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlci0wJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNwb25zb3JCYWRnZSA9ICQoY29udGFpbmVyKS5maW5kKCcueXQtbGl2ZS1jaGF0LWF1dGhvci1iYWRnZS1yZW5kZXJlci0wW2FyaWEtbGFiZWw9XCJTcG9uc29yXCJdJyk7XG5cbiAgICAgICAgICAgIGlmICgkKHNwb25zb3JCYWRnZSkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgJCgnLnNwb25zb3ItbW9kYWwnKS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L3Nwb25zb3JDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==
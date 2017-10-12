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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_loadingEmotesInfo__ = __webpack_require__(13);




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
		
		console.log(Object.keys(Emote.emotes).length);
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
        xhr.open('GET', 'https://twitchemotes.com/api_cache/v3/global.json');
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

            const emoteDic = JSON.parse(xhr.responseText);

            for (const emote in emoteDic) {

                Emote.addEmoteToTrie(emote);

                Emote.emotes[emote] = {
                    url: urlTemplate + emoteDic[emote]['id'] + '/' + '1.0'
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
        xhr.open('GET', 'https://twitchemotes.com/api_cache/v3/subscriber.json');
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

            const emoteDic = JSON.parse(xhr.responseText);

            for (const channel in emoteDic) {
			
                for (const i in emoteDic[channel]['emotes']) {

                    const dict = emoteDic[channel]['emotes'][i];
                    const code = dict['code'];
				
                    if (Emote.isValidEmote(code)) {

                        Emote.addEmoteToTrie(code);

                        Emote.emotes[code] = {
                            url: urlTemplate + dict['id'] + '/' + '1.0'
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chatColors__ = __webpack_require__(7);



class Subscribers
{
    static loadBadges()
    {
        Subscribers.badges['1'] = chrome.extension.getURL('/icons/tierBadge1.png');
        Subscribers.badges['2'] = chrome.extension.getURL('/icons/tierBadge2.png');
        Subscribers.badges['3'] = chrome.extension.getURL('/icons/tierBadge3.png');
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
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__chatColors__["a" /* default */])(mutation.target, profileId);

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
								__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__chatColors__["a" /* default */])(mutation.target, profileId);
                            }

                            if (mutation.target.getAttribute('data-sub-tier') === '') {

                                const subInfo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['subscriptions'][profileId];

                                if (typeof subInfo === 'undefined') {
                                    mutation.target.setAttribute('data-sub-tier', 0);
                                } else {
                                    mutation.target.setAttribute('data-sub-tier', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['subscriptions'][profileId]['subtier']);
									__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__chatColors__["a" /* default */])(mutation.target, profileId);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mentionHighlight__ = __webpack_require__(8);




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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay_donateButton__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_sponsorButton__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay_colorButton__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__overlay_checkIfWatchingLive__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__overlay_alwaysScrollDown__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__overlay_sponsorCheck__ = __webpack_require__(15);








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
/* harmony export (immutable) */ __webpack_exports__["a"] = chatColors;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


const randomChatColors = {
    '-A': '#47d288',
    '-B': '#b94ff1',
    '-C': '#3cdc36',
    '-D': '#df44dc',
    '-E': '#6bd432',
    '-F': '#8c69f1',
    '-G': '#a3d12d',
    '-H': '#b35dd5',
    '-I': '#5edb62',
    '-J': '#ca46bb',
    '-K': '#3daa27',
    '-L': '#ef67d5',
    '-M': '#83cc3f',
    '-N': '#d978eb',
    '-O': '#97bd12',
    '-P': '#5c7af1',
    '-Q': '#dfc71b',
    '-R': '#4c8ae7',
    '-S': '#f02f14',
    '-T': '#2dd3ad',
    '-U': '#ee3034',
    '-V': '#44c357',
    '-W': '#ab76dc',
    '-X': '#c5bf30',
    '-Y': '#6d7ddb',
    '-Z': '#eca821',
    '-0': '#cc6a35',
    '-1': '#858b23',
    '-2': '#f09464',
    '-3': '#bca527',
    '-4': '#e7964d',
    '-5': '#ac850f',
    '-6': '#e1b655',
    '-7': '#bb7722',
    '-8': '#aa852e',
    '-9': '#de9b36',
    '--': '#e57e20',
    '-_': '#46ad68'
};

function chatColors(node, profileId)
{
	if (typeof node === 'undefined' || typeof profileId === 'undefined') {
		return false;
	}
	
	const msgParent = $(node).parents('.yt-live-chat-text-message-renderer-0');
	const msgParentPopout = $(node).parents('.yt-live-chat-item-list-renderer');
	const authorName = $(msgParent).find('#author-name');
	const authorNamePopout = $(msgParentPopout).find('#author-name');
	
	const firstTwo = profileId.substring(0, 2);
	
	if (authorName.length > 0) {
		$(authorName).css('color', randomChatColors[firstTwo.toUpperCase()]);
	}
	
	if (authorNamePopout.length > 0) {
		$(authorNamePopout).css('color', randomChatColors[firstTwo.toUpperCase()]);
	}
};


/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2E3NDhiMjg2YTcyYWU2MmRjYWYiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9lbW90ZS5qcyIsIndlYnBhY2s6Ly8vLi9zdWJzY3JpYmVycy5qcyIsIndlYnBhY2s6Ly8vLi91dGlsLmpzIiwid2VicGFjazovLy8uL2NoYXRPYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vdGFiQ29tcGxldGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdENvbG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9tZW50aW9uSGlnaGxpZ2h0LmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvYWx3YXlzU2Nyb2xsRG93bi5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2NoZWNrSWZXYXRjaGluZ0xpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9jb2xvckJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2xvYWRpbmdFbW90ZXNJbmZvLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvc3BvbnNvckJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L3Nwb25zb3JDaGVjay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7QUFDQTtBQUNpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrRTs7OztBQUFBO0FBQUE7QUFBQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsOEVBQTRCLDRCQUE0QjtBQUMvRjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUdBQXVHLFlBQVksYUFBYSxtQkFBbUIsb0JBQW9CLEVBQUUsK0RBQStELDBCQUEwQixFQUFFLDBEQUEwRCwwQkFBMEIsb0JBQW9CLEVBQUU7QUFDOVc7O0FBRUE7QUFDQSwyRkFBMkYsaUNBQWlDLG9DQUFvQyxFQUFFO0FBQ2xLOztBQUVBO0FBQ0EsOEpBQThKLGlCQUFpQiwwRkFBMEYsa0NBQWtDLEVBQUUscUhBQXFILGtDQUFrQyxFQUFFLDZEQUE2RCxjQUFjO0FBQ2poQjs7QUFFQTtBQUNBLDZIQUE2SCxtREFBbUQsNkJBQTZCLEVBQUU7QUFDL007O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVHQUF1Ryx5QkFBeUI7QUFDaEksOEdBQThHLHlCQUF5QjtBQUN2SSxhQUFhO0FBQ2IsdUdBQXVHLHlCQUF5QjtBQUNoSSw4R0FBOEcseUJBQXlCO0FBQ3ZJO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUN4SHFCO0FBQ2tCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYixTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQSx1QkFBdUIsOEJBQThCO0FBQ3JEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVCx1QkFBdUIsd0JBQXdCOztBQUUvQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxvREFBb0QsS0FBSyxPQUFPLFVBQVUsZ0JBQWdCLEtBQUssRUFBRSxLQUFLO0FBQ3RHOztBQUVBOztBQUVBLHFFQUFxRSxZQUFZO0FBQ2pGLGdEQUFnRCwwQkFBMEIsU0FBUyxLQUFLLHdCQUF3QixXQUFXLGdCQUFnQixnQkFBZ0I7QUFDM0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixnQ0FBZ0M7O0FBRTNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoaEJxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHFCQUFxQjs7QUFFckIsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVCxxQ0FBcUM7QUFDckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvRkFBb0YsS0FBSyxPQUFPLG1CQUFtQjtBQUNuSCx3Q0FBd0MsUUFBUTtBQUNoRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzNJQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7Ozs7Ozs7OztBQ2pKQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7Ozs7Ozs7OztBQ2hHcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDL0RxQjs7QUFFckI7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvTUFBc0k7O0FBRXRJLHdEQUF3RDtBQUN4RDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNkpBQTZKO0FBQzdKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzdCa0Q7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSwwRkFBMEY7QUFDMUYsNEJBQTRCLDBEQUFtQjtBQUMvQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLHdDQUF3QztBQUN0RTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLDRDQUE0QztBQUNqRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ2hMQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7OztBQ2pDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxVQUFVLHlDQUF5QyxnQkFBZ0IsWUFBWSxZQUFZLG1CQUFtQjs7QUFFbEo7QUFDQSx3REFBd0QsZ0RBQWdELFdBQVc7QUFDbkg7QUFDQSw2Q0FBNkMsMkJBQTJCLGNBQWM7QUFDdEY7QUFDQSw0Q0FBNEMsY0FBYztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7O0FDaENBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0NBQXNDLFlBQVkseUNBQXlDLGdCQUFnQixhQUFhLGNBQWM7O0FBRXRJO0FBQ0EseURBQXlELGdEQUFnRCxhQUFhO0FBQ3RIO0FBQ0EsNkNBQTZDLDJCQUEyQixjQUFjO0FBQ3RGO0FBQ0EsNENBQTRDLGNBQWM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLFdBQVcsZ0RBQWdELGdCQUFnQixhQUFhLGNBQWM7O0FBRTNJO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsMEVBQTBFLEVBQUU7O0FBRW5IO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxTQUFTLGNBQWM7QUFDdkI7Ozs7Ozs7O0FDekNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOzs7Ozs7OztBQ3JCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxZQUFZLHlDQUF5QyxnQkFBZ0IsYUFBYSxjQUFjOztBQUV0STtBQUNBLDBEQUEwRCxnREFBZ0QsYUFBYTtBQUN2SDtBQUNBLDZDQUE2QywyQkFBMkIsY0FBYztBQUN0RjtBQUNBLDRDQUE0QyxjQUFjO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQUE7QUFBQSIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjYTc0OGIyODZhNzJhZTYyZGNhZiIsImltcG9ydCBQYWdlQ2hlY2sgZnJvbSAnLi9wYWdlQ2hlY2snO1xuaW1wb3J0IFN1YnNjcmliZXJzIGZyb20gJy4vc3Vic2NyaWJlcnMnO1xuaW1wb3J0IHsgaXNOb2RlIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBDaGF0T2JzZXJ2ZXIgZnJvbSAnLi9jaGF0T2JzZXJ2ZXInO1xuaW1wb3J0IFRhYkNvbXBsZXRlIGZyb20gJy4vdGFiQ29tcGxldGUnO1xuXG5leHBvcnQgY29uc3QgRElTQUxMT1dFRF9DSEFSUyA9IFsnXFxcXCcsICc6JywgJy8nLCAnJicsIFwiJ1wiLCAnXCInLCAnPycsICchJywgJyMnXSxcbiAgICBTQ1JPTExfRU5BQkxFRF9VUkwgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc2Nyb2xsLWVuYWJsZWQucG5nJyksXG4gICAgU0NST0xMX0RJU0FCTEVEX1VSTCA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdpY29ucy9zY3JvbGwtZGlzYWJsZWQucG5nJyk7XG5cbmV4cG9ydCBsZXQgb3B0aW9ucyA9IG51bGw7XG5cbndpbmRvdy5JUFRWTG9hZGVkID0gZmFsc2U7XG53aW5kb3cuTFNQYWdlTG9hZGVkID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRPcHRpb25zKCkge1xuICAgIGlmIChvcHRpb25zID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvcHRpb25zQ2FjaGUnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmNvbnN0IG9uTmV3UGFnZUxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAkKCdbY2xhc3NePVwiaXB0di1cIl0nKS5yZW1vdmUoKTtcbiAgICAkKCcueXQtbGl2ZS1jaGF0LWhlYWRlci1yZW5kZXJlciN0aXRsZScpLnRleHQoJ0NoYXQnKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoUGFnZUNoZWNrLmlzTGl2ZXN0cmVhbSgpICYmIFBhZ2VDaGVjay5pc0ljZVBvc2VpZG9uU3RyZWFtKCkpIHtcbiAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgICAgIGlmICghd2luZG93LkxTUGFnZUxvYWRlZCkgeyBQYWdlQ2hlY2subGl2ZXN0cmVhbVBhZ2UoKTsgd2luZG93LkxTUGFnZUxvYWRlZCA9IHRydWU7IH1cbiAgICAgICAgfVxuICAgIH0sIDJFMyk7XG59O1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQgPiB0aXRsZScpO1xuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9uTmV3UGFnZUxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzTm9kZSh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgICAgICBhdHRyaWJ1dGVzOiBmYWxzZSxcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgfTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCBvcHRpb25zKTtcbn0oKSk7XG5cbnZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYoIXdpbmRvdy5JUFRWTG9hZGVkKSB7XG4gICAgICAgIHdpbmRvdy5JUFRWTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSgncmVxdWVzdFN1YnNjcmlwdGlvbnMnLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zWydzdWJzY3JpcHRpb25zJ10gPSByZXNwb25zZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCA1MDAwKTtcblxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSgncmVxdWVzdExvY2Fsc3RvcmFnZScsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICBvcHRpb25zID0gcmVzcG9uc2U7XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvcHRpb25zQ2FjaGUnLCBKU09OLnN0cmluZ2lmeShvcHRpb25zKSk7XG5cbiAgICAgICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2VuYWJsZUNoYXRDb2xvcnMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnZXh0ZXJuYWwvY2hhdC1jb2xvcnMuY3NzJyk7XG4gICAgICAgICAgICAgICAgJCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCInICsgYSArICdcIiA+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnZGlzYWJsZUF2YXRhcnMnXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4uc3R5bGUtc2NvcGUgLnl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXIgI2F1dGhvci1waG90byB7IHdpZHRoOiAwcHg7IGhlaWdodDogMHB4OyBtYXJnaW4tcmlnaHQ6IDBweDsgdmlzaWJpbGl0eTogaGlkZGVuOyB9LnN0eWxlLXNjb3BlLnl0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyLm5vLXRyYW5zaXRpb257IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfS5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlciAjYXZhdGFyIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O21hcmdpbjowICFpbXBvcnRhbnQ7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2VuYWJsZVNwbGl0Q2hhdCddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgYm9yZGVyLXRvcDogMC41cHggc29saWQgIzMzMzMzMzsgYm9yZGVyLWJvdHRvbTogMC41cHggc29saWQgIzAwMDAwMDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnc2hvd0RlbGV0ZWRNZXNzYWdlcyddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTBbaXMtZGVsZXRlZF06bm90KFtzaG93LW9yaWdpbmFsXSkgI21lc3NhZ2UueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7ZGlzcGxheTogaW5saW5lO30gLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMCAjZGVsZXRlZC1zdGF0ZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSk7IH0gLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFtpcy1kZWxldGVkXTpub3QoW3Nob3ctb3JpZ2luYWxdKSAjbWVzc2FnZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSk7IH0gLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMCAjZGVsZXRlZC1zdGF0ZTpiZWZvcmV7Y29udGVudDogXCIgIFwifTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnbWVudGlvbkhpZ2hsaWdodCddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTAgLm1lbnRpb24ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTE0LCAxNSwgMTUsIDApICFpbXBvcnRhbnQ7IHBhZGRpbmc6IDBweCAwcHggIWltcG9ydGFudDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY2hhdENvbG9yID0gJCgnLnl0LWxpdmUtY2hhdC1oZWFkZXItcmVuZGVyZXItMCcpLmNzcygnYmFja2dyb3VuZC1jb2xvcicpO1xuICAgICAgICAgICAgY29uc3QgY2hhdENvbG9yUG9wb3V0ID0gJCgnLnN0eWxlLXNjb3BlLnl0LWxpdmUtY2hhdC1yZW5kZXJlcltyb2xlPVwiaGVhZGluZ1wiXScpLmNzcygnYmFja2dyb3VuZC1jb2xvcicpO1xuXG4gICAgICAgICAgICBpZiAoY2hhdENvbG9yID09PSAncmdiKDQwLCA0MCwgNDApJyB8fCBjaGF0Q29sb3JQb3BvdXQgPT09ICdyZ2IoNDAsIDQwLCA0MCknKSB7XG4gICAgICAgICAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTBbYXV0aG9yLXR5cGU9bW9kZXJhdG9yXXtiYWNrZ3JvdW5kLWNvbG9yOiMyODI4Mjh9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xuICAgICAgICAgICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4uc3R5bGUtc2NvcGUueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlclthdXRob3ItdHlwZT1tb2RlcmF0b3Jde2JhY2tncm91bmQtY29sb3I6IzI4MjgyOH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXRDb2xvciA9PT0gJ3JnYmEoMjM4LCAyMzgsIDIzOCwgMC40KScgfHwgY2hhdENvbG9yUG9wb3V0ID09PSAncmdiYSgyMzgsIDIzOCwgMjM4LCAwLjQpJykge1xuICAgICAgICAgICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2F1dGhvci10eXBlPW1vZGVyYXRvcl17YmFja2dyb3VuZC1jb2xvcjojZTJlMmUyfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICAgICAgICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+LnN0eWxlLXNjb3BlLnl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXJbYXV0aG9yLXR5cGU9bW9kZXJhdG9yXXtiYWNrZ3JvdW5kLWNvbG9yOiNlMmUyZTJ9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBTdWJzY3JpYmVycy5sb2FkQmFkZ2VzKCk7XG5cbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnZW1vdGVzVHdpdGNoJ10gPT09IHRydWUgfHwgZ2V0T3B0aW9ucygpWydlbW90ZXNTdWInXSA9PT0gdHJ1ZSB8fCBnZXRPcHRpb25zKClbJ2Vtb3Rlc0JUVFYnXSA9PT0gdHJ1ZSB8fCBnZXRPcHRpb25zKClbJ2Vtb3Rlc0ljZSddID09PSB0cnVlKSB7XG4gICAgICAgICAgICBDaGF0T2JzZXJ2ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFRhYkNvbXBsZXRlLmJpbmRFdmVudCgpO1xuXG4gICAgICAgIGNvbnNvbGUuaW5mbygnW0lQVFZdIEluaXQhJyk7XG5cbiAgICB9XG59XG5cbm9uTmV3UGFnZUxvYWQoKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyByZXBsYWNlQWxsIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IGdldE9wdGlvbnMsIERJU0FMTE9XRURfQ0hBUlMgfSBmcm9tICcuL21haW4nO1xuaW1wb3J0IGxvYWRpbmdFbW90ZXNJbmZvIGZyb20gJy4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtb3RlXG57XG4gICAgLyoqXG4gICAgICogTG9hZCBhbGwgZW5hYmxlZCBlbW90ZXMuXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRFbW90ZXMoKVxuICAgIHtcbiAgICAgICAgbG9hZGluZ0Vtb3Rlc0luZm8oKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBjb25zdCAkbG9hZGluZyA9ICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJyk7XG5cbiAgICAgICAgICAgIGlmICgkbG9hZGluZ1swXSkge1xuXG4gICAgICAgICAgICAgICAgJGxvYWRpbmcuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgJ2NvbG9yJzogJyNjMDM5MmInLFxuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjMjgyODI4JyxcbiAgICAgICAgICAgICAgICAgICAgJ3JpZ2h0JzogJzE5cHgnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkbG9hZGluZy50ZXh0KCdGYWlsZWQgbG9hZGluZyBzb21lIGVtb3RlcyAoQVBJIHNlcnZlcnMgZG93biknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgNy41ICogMTAwMCk7XG5cbiAgICAgICAgfSwgMTAgKiAxMDAwKTtcblxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbW90ZXNUd2l0Y2gnXSkgRW1vdGUubG9hZFR3aXRjaEVtb3RlcygpO1xuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbW90ZXNTdWInXSkgRW1vdGUubG9hZFN1YkVtb3RlcygpO1xuXG4gICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2Vtb3Rlc0JUVFYnXSkge1xuICAgICAgICAgICAgRW1vdGUubG9hZEJUVFZFbW90ZXMoKTtcbiAgICAgICAgICAgIEVtb3RlLmxvYWRCVFRWQ2hhbm5lbEVtb3RlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgRW1vdGUud2FpdFRpbGxFbW90ZXNMb2FkZWQoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogc2V0VGltZW91dCB0aGF0IGtlZXBzIHJ1bm5pbmcgdW50aWwgYWxsIGVtb3RlcyBhcmUgbG9hZGVkLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgd2FpdFRpbGxFbW90ZXNMb2FkZWQoKVxuICAgIHtcbiAgICAgICAgaWYgKChnZXRPcHRpb25zKClbJ2Vtb3Rlc1R3aXRjaCddICE9PSBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCkgfHxcbiAgICAgICAgICAgIChnZXRPcHRpb25zKClbJ2Vtb3Rlc1N1YiddICE9PSBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCkgfHxcbiAgICAgICAgICAgIChnZXRPcHRpb25zKClbJ2Vtb3Rlc0JUVFYnXSAhPT0gRW1vdGUuc3RhdGVzWydCVFRWJ10ubG9hZGVkKSB8fFxuICAgICAgICAgICAgKGdldE9wdGlvbnMoKVsnZW1vdGVzQlRUViddICE9PSBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCkpIHtcblxuICAgICAgICAgICAgc2V0VGltZW91dChFbW90ZS53YWl0VGlsbEVtb3Rlc0xvYWRlZCwgMjUwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRlbXAgZml4IHRvIHByZXZlbnQgcmFtIGZyb20gZmlsbGluZyB1cCB3aXRoIG1lc3NhZ2VzLlxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBFbW90ZS5tZXNzYWdlcyA9IHt9O1xuICAgICAgICB9LCAxMDAwICogNjAgKiA1KTtcblxuICAgICAgICBFbW90ZS5sb2FkSWNlRW1vdGVzKCk7XG5cbiAgICAgICAgY29uc3QgYmxhY2tsaXN0ZWRFbW90ZXMgPSBbJ1RISUNDJ107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibGFja2xpc3RlZEVtb3Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGVsZXRlIEVtb3RlLmVtb3Rlc1tibGFja2xpc3RlZEVtb3Rlc1tpXV07XG4gICAgICAgIH1cblxuICAgICAgICAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpLnJlbW92ZSgpO1xuICAgICAgICBFbW90ZS5yZXBsYWNlRXhpc3RpbmdFbW90ZXMoKTtcblx0XHRcblx0XHRjb25zb2xlLmxvZyhPYmplY3Qua2V5cyhFbW90ZS5lbW90ZXMpLmxlbmd0aCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlcGxhY2UgZXhpc3RpbmcgdGV4dCB3aXRoIGVtb3RlcyBpbiBjaGF0LCBoYXBwZW5zIHdoZW4gZW1vdGVzIGFyZSBkb25lIGxvYWRpbmcuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyByZXBsYWNlRXhpc3RpbmdFbW90ZXMoKVxuICAgIHtcbiAgICAgICAgY29uc3QgY2hhdEVsZW1lbnRzID0gJCgnLnN0eWxlLXNjb3BlIHl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXIgeC1zY29wZSB5dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTAnKTtcbiAgICAgICAgY29uc3QgY2hhdEVsZW1lbnRzUG9wb3V0ID0gJCgnI2l0ZW1zLnl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXIgLnl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXInKTtcblxuICAgICAgICBpZiAoY2hhdEVsZW1lbnRzLmxlbmd0aCA8IDEgJiYgY2hhdEVsZW1lbnRzUG9wb3V0IDwgMSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChFbW90ZS5yZXBsYWNlRXhpc3RpbmdFbW90ZXMsIDI1MCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjaGF0RWxlbWVudHMuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgICAgIEVtb3RlLmVtb3RlQ2hlY2soZWwpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjaGF0RWxlbWVudHNQb3BvdXQuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgICAgIEVtb3RlLmVtb3RlQ2hlY2soZWwpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBlbW90ZXMuXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bm9kZX0gbm9kZSAtIE1lc3NhZ2Ugbm9kZVxuICAgICAqL1xuICAgIHN0YXRpYyBlbW90ZUNoZWNrKG5vZGUpXG4gICAge1xuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbW90ZXNUd2l0Y2gnXSA9PT0gZmFsc2UgJiYgZ2V0T3B0aW9ucygpWydlbW90ZXNTdWInXSA9PT0gZmFsc2UgJiYgZ2V0T3B0aW9ucygpWydlbW90ZXNCVFRWJ10gPT09IGZhbHNlICYmIGdldE9wdGlvbnMoKVsnZW1vdGVzSWNlJ10gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCAkbWVzc2FnZSA9ICQobm9kZSkuZmluZCgnI21lc3NhZ2UnKTtcbiAgICAgICAgRW1vdGUua2FwcGFDaGVjaygkbWVzc2FnZSk7XG5cbiAgICAgICAgbGV0IG9sZEhUTUwgPSAkbWVzc2FnZS5odG1sKCkudHJpbSgpO1xuICAgICAgICBsZXQgbXNnSFRNTCA9IG9sZEhUTUw7XG5cbiAgICAgICAgY29uc3Qgd29yZHMgPSBtc2dIVE1MLnJlcGxhY2UoJy9cXHhFRlxceEJCXFx4QkYvJywgJycpLnJlcGxhY2UoJ++7vycsICcnKS5zcGxpdCgnICcpO1xuICAgICAgICBjb25zdCB1bmlxdWVXb3JkcyA9IFtdO1xuICAgICAgICBsZXQgZW1vdGVDb3VudCA9IDA7XG4gICAgICAgIGxldCBjaGFuZ2VBdHRlbXB0cyA9IDA7XG5cbiAgICAgICAgJC5lYWNoKHdvcmRzLCBmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgICAgIGlmICgkLmluQXJyYXkoZWwsIHVuaXF1ZVdvcmRzKSA9PT0gLTEpIHVuaXF1ZVdvcmRzLnB1c2goZWwpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVuaXF1ZVdvcmRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHdvcmQgPSB1bmlxdWVXb3Jkc1tpXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBFbW90ZS5lbW90ZXNbd29yZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VUaWVyID0gJChub2RlKS5maW5kKCcjYXV0aG9yLXBob3RvJykuZGF0YSgnc3ViLXRpZXInKTtcbiAgICAgICAgICAgIGxldCB0b29sdGlwVGV4dCA9IHdvcmQ7XG5cbiAgICAgICAgICAgIGlmIChtZXNzYWdlVGllciA8IEVtb3RlLmVtb3Rlc1t3b3JkXVsndGllciddKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBlbW90ZVRpZXIgPSBFbW90ZS5lbW90ZXNbd29yZF1bJ3RpZXInXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBFbW90ZS5lbW90ZXNbd29yZF1bJ3RpZXInXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0b29sdGlwVGV4dCA9IGBJY2VQb3NlaWRvbi5jb20gJiMxMDsmIzEwO1RpZXIgJHtlbW90ZVRpZXJ9IFN1YiBFbW90ZSAmIzEwOyYjMTA7JHt3b3JkfWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVtb3RlQ291bnQrKztcblxuICAgICAgICAgICAgY29uc3QgZW1vdGVIdG1sID0gYDxzcGFuIGNsYXNzPVwiaGludC0tdG9wXCIgYXJpYS1sYWJlbD1cIiR7dG9vbHRpcFRleHR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7RW1vdGUuZW1vdGVzW3dvcmRdWyd1cmwnXX1cIiBhbHQ9XCIke3dvcmR9XCIgc3R5bGU9XCJkaXNwbGF5OmlubGluZTt3aWR0aDphdXRvO21heC1oZWlnaHQ6MzJweDtvdmVyZmxvdzpoaWRkZW47XCIgY2xhc3M9XCJleHRlbnNpb24tZW1vdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPmA7XG5cbiAgICAgICAgICAgIG1zZ0hUTUwgPSByZXBsYWNlQWxsKG1zZ0hUTUwsIHdvcmQsIGVtb3RlSHRtbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW1vdGVDb3VudCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICRtZXNzYWdlLmh0bWwobXNnSFRNTCk7XG5cbiAgICAgICAgJG1lc3NhZ2UucGFyZW50KCkucGFyZW50KCkuYmluZCgnRE9NU3VidHJlZU1vZGlmaWVkJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCAkbWVzc2FnZSA9ICQodGhpcykuZmluZCgnI21lc3NhZ2UnKTtcbiAgICAgICAgICAgIEVtb3RlLmthcHBhQ2hlY2soJG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICBsZXQgaHRtbCA9ICRtZXNzYWdlLmh0bWwoKS50cmltKCk7XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2VBdHRlbXB0cyA+IDMwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGh0bWwgPT09ICd1bmRlZmluZWQnIHx8IGh0bWwgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaHRtbC5pbmNsdWRlcygnZXh0ZW5zaW9uLWVtb3RlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hhbmdlQXR0ZW1wdHMrKztcblxuICAgICAgICAgICAgJG1lc3NhZ2UuaHRtbChtc2dIVE1MKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBhIG1lc3NhZ2UgY29udGFpbnMgYSBrYXBwYSBlbW90ZS5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtub2RlfSBtc2cgLSBNZXNzYWdlIG5vZGVcbiAgICAgKi9cbiAgICBzdGF0aWMga2FwcGFDaGVjayhtc2cpXG4gICAge1xuICAgICAgICAkKCdpbWcnLCBtc2cpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGNvbnN0ICRpbWcgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoL1xcdWQ4M2NcXHVkZjFkL2cudGVzdCgkaW1nLmF0dHIoJ2FsdCcpKSkge1xuICAgICAgICAgICAgICAgICRpbWcucmVwbGFjZVdpdGgoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0thcHBhJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTG9hZCBUd2l0Y2ggZW1vdGVzLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZFR3aXRjaEVtb3RlcygpXG4gICAge1xuICAgICAgICBFbW90ZS5lbW90ZXNbJ0xVTCddID0geyB1cmw6ICdodHRwczovL2Nkbi5iZXR0ZXJ0dHYubmV0L2Vtb3RlLzU2N2IwMGM2MWRkYmUxNzg2Njg4YTYzMy8xeCcgfTtcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly90d2l0Y2hlbW90ZXMuY29tL2FwaV9jYWNoZS92My9nbG9iYWwuanNvbicpO1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB4aHIudGltZW91dCA9IDUwMDA7XG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJ2h0dHBzOi8vc3RhdGljLWNkbi5qdHZudy5uZXQvZW1vdGljb25zL3YxLyc7XG5cbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVGV4dCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGVtb3RlRGljID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBlbW90ZSBpbiBlbW90ZURpYykge1xuXG4gICAgICAgICAgICAgICAgRW1vdGUuYWRkRW1vdGVUb1RyaWUoZW1vdGUpO1xuXG4gICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2Vtb3RlXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGVtb3RlRGljW2Vtb3RlXVsnaWQnXSArICcvJyArICcxLjAnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIFR3aXRjaCBzdWJzY3JpYmVyIGVtb3Rlcy5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRTdWJFbW90ZXMoKVxuICAgIHtcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly90d2l0Y2hlbW90ZXMuY29tL2FwaV9jYWNoZS92My9zdWJzY3JpYmVyLmpzb24nKTtcbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgeGhyLnRpbWVvdXQgPSA1MDAwO1xuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICdodHRwczovL3N0YXRpYy1jZG4uanR2bncubmV0L2Vtb3RpY29ucy92MS8nO1xuXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZVRleHQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBlbW90ZURpYyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbm5lbCBpbiBlbW90ZURpYykge1xuXHRcdFx0XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGVtb3RlRGljW2NoYW5uZWxdWydlbW90ZXMnXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpY3QgPSBlbW90ZURpY1tjaGFubmVsXVsnZW1vdGVzJ11baV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBkaWN0Wydjb2RlJ107XG5cdFx0XHRcdFxuICAgICAgICAgICAgICAgICAgICBpZiAoRW1vdGUuaXNWYWxpZEVtb3RlKGNvZGUpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIEVtb3RlLmFkZEVtb3RlVG9UcmllKGNvZGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbY29kZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2lkJ10gKyAnLycgKyAnMS4wJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIEJUVFYgZW1vdGVzLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEJUVFZFbW90ZXMoKVxuICAgIHtcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly9hcGkuYmV0dGVydHR2Lm5ldC8yL2Vtb3RlcycpO1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB4aHIudGltZW91dCA9IDUwMDA7XG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJ2h0dHBzOi8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvJztcblxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0ID09PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZW1vdGVMaXN0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnZW1vdGVzJ107XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZUxpc3QpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRpY3QgPSBlbW90ZUxpc3RbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAoIUVtb3RlLmNvbnRhaW5zRGlzYWxsb3dlZENoYXIoZGljdFsnY29kZSddKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLmFkZEVtb3RlVG9UcmllKGRpY3RbJ2NvZGUnXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2RpY3RbJ2NvZGUnXV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZGljdFsnaWQnXSArICcvJyArICcxeCdcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTG9hZCBCVFRWIGNoYW5uZWwgZW1vdGVzLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEJUVFZDaGFubmVsRW1vdGVzKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGNoYW5uZWxzID0gZ2V0T3B0aW9ucygpWydCVFRWQ2hhbm5lbHMnXTtcbiAgICAgICAgY29uc3QgY29tbWFDaGFubmVscyA9IGNoYW5uZWxzLnJlcGxhY2UoL1xccysvZywgJycpLnNwbGl0KCcsJyk7XG4gICAgICAgIGxldCBjaGFubmVsc0xlbmd0aCA9IGNvbW1hQ2hhbm5lbHMubGVuZ3RoO1xuXG4gICAgICAgIGNvbW1hQ2hhbm5lbHMuZm9yRWFjaChmdW5jdGlvbiAoY2hhbm5lbCkge1xuXG4gICAgICAgICAgICBpZiAoY2hhbm5lbC50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgY2hhbm5lbHNMZW5ndGgtLTtcblxuICAgICAgICAgICAgICAgIGlmIChFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50ID49IGNoYW5uZWxzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL2FwaS5iZXR0ZXJ0dHYubmV0LzIvY2hhbm5lbHMvJyArIGNoYW5uZWwpO1xuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgICAgIHhoci50aW1lb3V0ID0gNTAwMDtcbiAgICAgICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJ2h0dHBzOi8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvJztcblxuICAgICAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCsrO1xuXG4gICAgICAgICAgICAgICAgaWYgKEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQgPj0gY2hhbm5lbHNMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50Kys7XG5cbiAgICAgICAgICAgICAgICBpZiAoRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCA+PSBjaGFubmVsc0xlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQrKztcblxuICAgICAgICAgICAgICAgIGlmIChFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50ID49IGNoYW5uZWxzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVGV4dCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGVtb3RlTGlzdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2Vtb3RlcyddO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGVtb3RlTGlzdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpY3QgPSBlbW90ZUxpc3RbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFFbW90ZS5jb250YWluc0Rpc2FsbG93ZWRDaGFyKGRpY3RbJ2NvZGUnXSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuYWRkRW1vdGVUb1RyaWUoZGljdFsnY29kZSddKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2RpY3RbJ2NvZGUnXV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2lkJ10gKyAnLycgKyAnMXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IGNoYW5uZWwgKyAnIChidHR2KSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIEljZSdzIG9sZCBzdWJzY3JpYmVyIGVtb3Rlcy5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRJY2VFbW90ZXMoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgc3ViVGllckVtb3RlcyA9IHtcbiAgICAgICAgICAgIDE6IFtcbiAgICAgICAgICAgICAgICAncHVycGxlMScsICdwdXJwbGUyJywgJ3B1cnBsZTMnLCAncHVycGxlNCcsICdwdXJwbGVBaGhoJywgJ3B1cnBsZUFybTEnLCAncHVycGxlQXJtMicsICdwdXJwbGVCbHVlc2NyZWVuJywgJ3B1cnBsZUJydWgnLCAncHVycGxlQ2lncmlwJywgJ3B1cnBsZUNsYXVzJyxcbiAgICAgICAgICAgICAgICAncHVycGxlQ29vbHN0b3J5JywgJ3B1cnBsZUNyZWVwJywgJ3B1cnBsZUVuemEnLCAncHVycGxlRmFrZScsICdwdXJwbGVSZWFsJywgJ3B1cnBsZUZyYW5rJywgJ3B1cnBsZUZybycsICdwdXJwbGVJY2UnLCAncHVycGxlS0tvbmEnLCAncHVycGxlTFVMJyxcbiAgICAgICAgICAgICAgICAncHVycGxlT21nJywgJ3B1cnBsZVByaWRlJywgJ3B1cnBsZVJvZmwnLCAncHVycGxlTGVvJywgJ3B1cnBsZVcnLCAncHVycGxlV2F0J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDI6IFtcbiAgICAgICAgICAgICAgICAncHVycGxlQ3gnLCAncHVycGxlTGV3ZCcsICdwdXJwbGVMYW1hJywgJ3B1cnBsZVBpenphJywgJ3B1cnBsZVdhbGxldCcsICdwdXJwbGVTJywgJ3B1cnBsZUxhdGUnLCAncHVycGxlTW9vc2UnLCAncHVycGxlTm9zZScsICdwdXJwbGVXdXQnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMzogW1xuICAgICAgICAgICAgICAgICdwdXJwbGVBbGxlbicsICdwdXJwbGVUcm9sbCdcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBmb3IoY29uc3QgdGllciBpbiBzdWJUaWVyRW1vdGVzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YlRpZXJFbW90ZXNbdGllcl0ubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIEVtb3RlLmFkZEVtb3RlVG9UcmllKHN1YlRpZXJFbW90ZXNbdGllcl1baV0pO1xuXG4gICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW3N1YlRpZXJFbW90ZXNbdGllcl1baV1dID0ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvZW1vdGVzLycgKyBzdWJUaWVyRW1vdGVzW3RpZXJdW2ldICsgJy5wbmcnKSxcbiAgICAgICAgICAgICAgICAgICAgdGllcjogdGllclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGV4dCBpcyBhIHZhbGlkIGVtb3RlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAgICovXG4gICAgc3RhdGljIGlzVmFsaWRFbW90ZSh0ZXh0KVxuICAgIHtcbiAgICAgICAgcmV0dXJuICEodGV4dFswXS5tYXRjaCgvW0EtWl0vZykgfHxcbiAgICAgICAgICAgIHRleHQubWF0Y2goL15bYS16XSskL2cpIHx8XG4gICAgICAgICAgICB0ZXh0Lm1hdGNoKC9eXFxkKiQvZylcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRleHQgY29udGFpbnMgZGlzYWxsb3dlZCBjaGFyYWN0ZXJzLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gd29yZFxuICAgICAqL1xuICAgIHN0YXRpYyBjb250YWluc0Rpc2FsbG93ZWRDaGFyKHdvcmQpXG4gICAge1xuICAgICAgICBmb3IgKGNvbnN0IGMgaW4gRElTQUxMT1dFRF9DSEFSUykge1xuICAgICAgICAgICAgaWYgKHdvcmQuaW5kZXhPZihjKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQWRkcyBlbW90ZSBpbnRvIGdsb2JhbCBFbW90ZS50cmllLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW1vdGVTdHJpbmdcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkRW1vdGVUb1RyaWUoZW1vdGVTdHJpbmcpIHtcbiAgICAgICAgdmFyIGxvd2VyZWQgPSBlbW90ZVN0cmluZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgbG9jYWxUcmllID0gRW1vdGUudHJpZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbW90ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGxvd2VyZWQuY2hhckF0KGkpIGluIGxvY2FsVHJpZSkge1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBsb2NhbFRyaWVbbG93ZXJlZC5jaGFyQXQoaSldICE9PSAnc3RyaW5nJyB8fCBpID09IGVtb3RlU3RyaW5nLmxlbmd0aC0xKXtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxUcmllID0gbG9jYWxUcmllW2xvd2VyZWQuY2hhckF0KGkpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpID09IGVtb3RlU3RyaW5nLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxUcmllW2xvd2VyZWQuY2hhckF0KGkpXSA9IGVtb3RlU3RyaW5nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsVHJpZVtsb3dlcmVkLmNoYXJBdChpKV0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9jYWxUcmllID0gbG9jYWxUcmllW2xvd2VyZWQuY2hhckF0KGkpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5FbW90ZS5zdGF0ZXMgPSB7XG4gICAgdHdpdGNoOiB7XG4gICAgICAgIGxvYWRlZDogZmFsc2VcbiAgICB9LFxuICAgIHN1Yjoge1xuICAgICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBCVFRWOiB7XG4gICAgICAgIGxvYWRlZDogZmFsc2VcbiAgICB9LFxuICAgIEJUVFZDaGFubmVsczoge1xuICAgICAgICBsb2FkZWQ6IGZhbHNlLFxuICAgICAgICBsb2FkZWRDb3VudDogMFxuICAgIH1cbn07XG5cbkVtb3RlLmVtb3RlcyA9IHt9O1xuRW1vdGUudHJpZSA9IFtdO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9lbW90ZS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXRPcHRpb25zIH0gZnJvbSAnLi9tYWluJztcbmltcG9ydCBDaGF0Q29sb3JzIGZyb20gJy4vY2hhdENvbG9ycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YnNjcmliZXJzXG57XG4gICAgc3RhdGljIGxvYWRCYWRnZXMoKVxuICAgIHtcbiAgICAgICAgU3Vic2NyaWJlcnMuYmFkZ2VzWycxJ10gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3RpZXJCYWRnZTEucG5nJyk7XG4gICAgICAgIFN1YnNjcmliZXJzLmJhZGdlc1snMiddID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy90aWVyQmFkZ2UyLnBuZycpO1xuICAgICAgICBTdWJzY3JpYmVycy5iYWRnZXNbJzMnXSA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvdGllckJhZGdlMy5wbmcnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0U2VsZkluZm8oaW1nU3JjKVxuICAgIHtcbiAgICAgICAgY29uc3QgcHJvZmlsZUlkID0gaW1nU3JjLnNwbGl0KCcvJylbM107XG4gICAgICAgIGNvbnN0IHN1YlRpZXIgPSBnZXRPcHRpb25zWydzdWJzY3JpcHRpb25zJ11bcHJvZmlsZUlkXVsnc3VidGllciddO1xuXG4gICAgICAgIFN1YnNjcmliZXJzLnNlbGYgPSB7XG4gICAgICAgICAgICBwcm9maWxlSW1hZ2VVcmw6IGltZ1NyYyxcbiAgICAgICAgICAgIHByb2ZpbGVJZDogcHJvZmlsZUlkLFxuICAgICAgICAgICAgc3ViVGllcjogc3ViVGllclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBzdWJzY3JpYmVyIGluZm9cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGFkZEJhZGdlcyhub2RlKVxuICAgIHtcbiAgICAgICAgaWYgKCQobm9kZSkuZmluZCgnaW1nJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mICQobm9kZSkuZmluZCgnI2F1dGhvci1waG90bycpWzBdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqIExpc3RlbiBmb3IgbXV0YXRpb25zIG9uIGF1dGhvciBpbWFnZSAqL1xuICAgICAgICBjb25zdCBpbWFnZU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtdXRhdGlvbikge1xuXG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUgPT09ICdzcmMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZmlsZUlkID0gbXV0YXRpb24udGFyZ2V0LnNyYy5zcGxpdCgnLycpWzNdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9maWxlSWQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXByb2ZpbGUtaWQnLCBwcm9maWxlSWQpO1xuXHRcdFx0XHRcdENoYXRDb2xvcnMobXV0YXRpb24udGFyZ2V0LCBwcm9maWxlSWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YkluZm8gPSBnZXRPcHRpb25zKClbJ3N1YnNjcmlwdGlvbnMnXVtwcm9maWxlSWRdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ViSW5mbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3ViLXRpZXInLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3ViLXRpZXInLCBnZXRPcHRpb25zKClbJ3N1YnNjcmlwdGlvbnMnXVtwcm9maWxlSWRdWydzdWJ0aWVyJ10pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgU3Vic2NyaWJlcnMuc2V0QmFkZ2VJbWFnZShub2RlLCBwcm9maWxlSWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKiBMaXN0ZW4gZm9yIG11dGF0aW9ucyBvbiBkYXRhLXByb2ZpbGUgaWQgb2YgYXV0aG9yIGltYWdlICovXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtdXRhdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZmlsZS1pZCcpID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXByb2ZpbGUtaWQnLCBwcm9maWxlSWQpO1xuXHRcdFx0XHRcdFx0XHRcdENoYXRDb2xvcnMobXV0YXRpb24udGFyZ2V0LCBwcm9maWxlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXN1Yi10aWVyJykgPT09ICcnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViSW5mbyA9IGdldE9wdGlvbnMoKVsnc3Vic2NyaXB0aW9ucyddW3Byb2ZpbGVJZF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdWJJbmZvID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zdWItdGllcicsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zdWItdGllcicsIGdldE9wdGlvbnMoKVsnc3Vic2NyaXB0aW9ucyddW3Byb2ZpbGVJZF1bJ3N1YnRpZXInXSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRDaGF0Q29sb3JzKG11dGF0aW9uLnRhcmdldCwgcHJvZmlsZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhT2JzZXJ2ZXJDb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgY2hhcmFjdGVyRGF0YTogdHJ1ZSwgc3VidHJlZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YU9ic2VydmVyLm9ic2VydmUobXV0YXRpb24udGFyZ2V0LCBkYXRhT2JzZXJ2ZXJDb25maWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpbWFnZU9ic2VydmVyQ29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IHRydWUsIHN1YnRyZWU6IHRydWUgfTtcbiAgICAgICAgaW1hZ2VPYnNlcnZlci5vYnNlcnZlKCQobm9kZSkuZmluZCgnI2F1dGhvci1waG90bycpWzBdLCBpbWFnZU9ic2VydmVyQ29uZmlnKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIHNldEJhZGdlSW1hZ2Uobm9kZSwgcHJvZmlsZUlkKVxuICAgIHtcbiAgICAgICAgaWYgKCQobm9kZSkuZmluZCgnLnRpZXItYmFkZ2UnKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN1YkluZm8gPSBnZXRPcHRpb25zKClbJ3N1YnNjcmlwdGlvbnMnXVtwcm9maWxlSWRdO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygc3ViSW5mbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRpZXJJbWcgPSBTdWJzY3JpYmVycy5iYWRnZXNbc3ViSW5mb1snc3VidGllciddXTtcblxuICAgICAgICBjb25zdCBpbWdIdG1sID0gYDxzcGFuIGNsYXNzPVwiaGludC0tcmlnaHRcIiBhcmlhLWxhYmVsPVwiSWNlUG9zZWlkb24uY29tICYjMTA7JiMxMDtUaWVyICR7c3ViSW5mb1snc3VidGllciddfSBTdWJzY3JpYmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3RpZXJJbWd9XCIgY2xhc3M9XCJ0aWVyLWJhZGdlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+YDtcblxuICAgICAgICAkKG5vZGUpLmZpbmQoJyNhdXRob3ItYmFkZ2VzJykucHJlcGVuZChpbWdIdG1sKTtcblxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbmFibGVDaGF0Q29sb3JzJ10pIHtcbiAgICAgICAgICAgICQobm9kZSkuZmluZCgnI2F1dGhvci1uYW1lJykuY3NzKCdjb2xvcicsIHN1YkluZm9bJ2NvbG9yJ10pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaHRtbCA9ICQobm9kZSkuZmluZCgnI2F1dGhvci1iYWRnZXMnKS5odG1sKCk7XG5cbiAgICAgICAgJChub2RlKS5maW5kKCcjYXV0aG9yLWJhZGdlcycpLm9uKCdET01TdWJ0cmVlTW9kaWZpZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCcudGllci1iYWRnZScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuaHRtbChodG1sKTtcblxuICAgICAgICAgICAgICAgIC8qKiBSZW1vdmUgZW1wdHkgYmFkZ2VzIGFkZGVkIGJ5IFlUICovXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcueXQtbGl2ZS1jaGF0LWF1dGhvci1iYWRnZS1yZW5kZXJlci0wJykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJChlbCkud2lkdGgoKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChlbCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuU3Vic2NyaWJlcnMuY2hhdE1lc3NhZ2VzID0ge307XG5TdWJzY3JpYmVycy5iYWRnZXMgPSB7fTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3Vic2NyaWJlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VBbGwoc3RyLCBmaW5kLCByZXBsYWNlKSB7XG4gICAgbGV0IHN0cmluZyA9IFwiKFwiK2ZpbmQrXCIpKD8hW15hbHQ9XFxcIl0qXFxcIilcIjtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChzdHJpbmcsICdnJyksIHJlcGxhY2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOb2RlKG8pIHtcbiAgICByZXR1cm4gKFxuICAgICAgICB0eXBlb2YgTm9kZSA9PT0gJ29iamVjdCcgPyBvIGluc3RhbmNlb2YgTm9kZSA6IG8gJiYgdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIHR5cGVvZiBvLm5vZGVUeXBlID09PSAnbnVtYmVyJyAmJiB0eXBlb2Ygby5ub2RlTmFtZSA9PT0gJ3N0cmluZydcbiAgICApO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBFbW90ZSBmcm9tICcuL2Vtb3RlJztcbmltcG9ydCBTdWJzY3JpYmVycyBmcm9tICcuL3N1YnNjcmliZXJzJztcbmltcG9ydCBNZW50aW9uSGlnaGxpZ2h0IGZyb20gJy4vbWVudGlvbkhpZ2hsaWdodCc7XG5cbi8qKlxuICogQmluZHMgY2hhdCBtdXRhdGlvbiBvYnNlcnZlciBhbmQgbGlzdGVuIGZvciBuZXcgY2hhdCBtZXNzYWdlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hhdE9ic2VydmVyKClcbntcbiAgICAvKiogTG9vcCBvdmVyIGV4aXN0aW5nIG1lc3NhZ2VzIGFuZCBhZGQgYmFkZ2VzICovXG4gICAgJChkb2N1bWVudCkub24oJ0RPTU5vZGVJbnNlcnRlZCcsICQoJyNjaGF0JykucGFyZW50KCksIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmZpbmQoJ2ltZycpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqIExpc3RlbiBmb3Igc2VsZi1hdmF0YXIgbG9hZCBhbmQgc2V0IHNlbGYtaW5mbyAqL1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuZmluZCgnI2F2YXRhcicpLmxlbmd0aCAhPT0gMCkge1xuXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5maW5kKCcjYXZhdGFyJykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGltZ1NyYyA9ICQodGhpcykuYXR0cignc3JjJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW1nU3JjLmluY2x1ZGVzKCdodHRwczovLycpKSB7XG4gICAgICAgICAgICAgICAgICAgIFN1YnNjcmliZXJzLnNldFNlbGZJbmZvKGltZ1NyYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mICQoZS50YXJnZXQpLmZpbmQoJyNhdXRob3ItcGhvdG8nKVswXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIFN1YnNjcmliZXJzLmFkZEJhZGdlcyhlLnRhcmdldCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3R5bGUtc2NvcGUgLnl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXInKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIHNldFRpbWVvdXQoY2hhdE9ic2VydmVyLCAyNTApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2hhdCBib3ggb2JzZXJ2ZXJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcblxuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb24pIHtcblxuICAgICAgICAgICAgY29uc3QgbmV3Tm9kZXMgPSBtdXRhdGlvbi5hZGRlZE5vZGVzO1xuXG4gICAgICAgICAgICBpZiAobmV3Tm9kZXMgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0ICRub2RlcyA9ICQobmV3Tm9kZXMpO1xuXG4gICAgICAgICAgICAgICAgJG5vZGVzLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRub2RlID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoISRub2RlLmhhc0NsYXNzKCd5dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIE1lbnRpb25IaWdobGlnaHQoJG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZUNoZWNrKCRub2RlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcbiAgICAgICAgYXR0cmlidXRlczogZmFsc2UsXG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgIH07XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgb3B0aW9ucyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jaGF0T2JzZXJ2ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xuaW1wb3J0IGRvbmF0ZUJ1dHRvbiBmcm9tICcuL292ZXJsYXkvZG9uYXRlQnV0dG9uJztcbmltcG9ydCBzcG9uc29yQnV0dG9uIGZyb20gJy4vb3ZlcmxheS9zcG9uc29yQnV0dG9uJztcbmltcG9ydCBjb2xvckJ1dHRvbiBmcm9tICcuL292ZXJsYXkvY29sb3JCdXR0b24nO1xuaW1wb3J0IGNoZWNrSWZXYXRjaGluZ0xpdmUgZnJvbSAnLi9vdmVybGF5L2NoZWNrSWZXYXRjaGluZ0xpdmUnO1xuaW1wb3J0IEFsd2F5c1Njcm9sbERvd24gZnJvbSAnLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24nO1xuaW1wb3J0IFNwb25zb3JDaGVjayBmcm9tICcuL292ZXJsYXkvc3BvbnNvckNoZWNrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZUNoZWNrXG57XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHVzZXIgaXMgd2F0Y2hpbmcgZnJvbSB3cm9uZyBsaXZlc3RyZWFtIHBhZ2UgYW5kIHdhcm5zIHRoZW0uXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB5b3V0dWJlR2FtaW5nKClcbiAgICB7XG4gICAgICAgIC8vIFJ1biBjaGVja3MgaW4gc3RlcHMgc28gd2UncmUgbm90IGNhbGxpbmcgbWV0aG9kcyB1bm5lY2Vzc2FyaWx5XG4gICAgICAgIGNvbnN0IHVybCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG5cbiAgICAgICAgaWYoIXVybC5pbmNsdWRlcygnZ2FtaW5nLnlvdXR1YmUnKSl7XG4gICAgICAgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGl2ZS1jaGF0LWlmcmFtZScpO1xuXG4gICAgICAgICAgICBpZihpZnJhbWUpe1xuICAgICAgICAgICAgICAgIGNvbnN0ICR0ZXh0V3JhcHBlciA9ICQoJy55dC11c2VyLWluZm8nKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gJHRleHRXcmFwcGVyLmZpbmQoJ2EnKS50ZXh0KCk7XG5cbiAgICAgICAgICAgICAgICBpZih0ZXh0ID09PSAnSWNlIFBvc2VpZG9uJyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZGlyZWN0Q29uZmlybSA9IGNvbmZpcm0oJ1tJY2UgUG9zZWlkb25UVl0gR28gdG8gdGhlIG9mZmljaWFsIEljZSBQb3NlaWRvbiBsaXZlc3RyZWFtIHBhZ2U/Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZGlyZWN0Q29uZmlybSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJ2h0dHBzOi8vZ2FtaW5nLnlvdXR1YmUuY29tL2ljZV9wb3NlaWRvbi9saXZlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdXNlciBpcyB3YXRjaGluZyBhIGxpdmVzdHJlYW0gb24gWW91dHViZSBnYW1pbmcuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBsaXZlc3RyZWFtUGFnZSgpXG4gICAge1xuICAgICAgICAvLyBSdW4gY2hlY2tzIGluIHN0ZXBzIHNvIHdlJ3JlIG5vdCBjYWxsaW5nIG1ldGhvZHMgdW5uZWNlc3NhcmlseVxuICAgICAgICBjb25zdCB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3duZXInKTtcbiAgICAgICAgY29uc3QgdGV4dCA9ICQodGFyZ2V0KS5maW5kKCdzcGFuJykudGV4dCgpO1xuXG4gICAgICAgIGlmKCF1cmwuaW5jbHVkZXMoJ2xpdmVfY2hhdCcpICYmICF1cmwuaW5jbHVkZXMoJ2lzX3BvcG91dD0xJykpe1xuICAgICAgICAgICAgY29uc3QgY2hhdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGF0Jyk7XG5cbiAgICAgICAgICAgIGlmKCF0YXJnZXQgfHwgIWNoYXQpe1xuICAgICAgICAgICAgICAgIFBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzKys7XG5cbiAgICAgICAgICAgICAgICBpZiAoUGFnZUNoZWNrLnN0cmVhbXBhZ2VDaGVja3MgPCA1KVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KFBhZ2VDaGVjay5saXZlc3RyZWFtUGFnZSwgMTAwMCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0ZXh0ID09PSAnSWNlIFBvc2VpZG9uJykge1xuICAgICAgICAgICAgZG9uYXRlQnV0dG9uKCk7XG4gICAgICAgICAgICBzcG9uc29yQnV0dG9uKCk7XG4gICAgICAgICAgICBjb2xvckJ1dHRvbigpO1xuICAgICAgICAgICAgc2V0VGltZW91dChTcG9uc29yQ2hlY2suY2hlY2ssIDI1MDApO1xuICAgICAgICB9XG5cbiAgICAgICAgRW1vdGUubG9hZEVtb3RlcygpO1xuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmluaXQoKTtcbiAgICAgICAgY2hlY2tJZldhdGNoaW5nTGl2ZSgpO1xuXG4gICAgICAgIFBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzID0gMDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdXNlciBpcyB3YXRjaGluZyBhIGxpdmVzdHJlYW0uXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBpc0xpdmVzdHJlYW0oKSB7XG4gICAgICAgIGNvbnN0IGxpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXRwLWxpdmUtYmFkZ2UueXRwLWJ1dHRvbicpO1xuICAgICAgICBjb25zdCBjaGF0QXBwICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigneXQtbGl2ZS1jaGF0LWFwcCcpO1xuICAgICAgICBjb25zdCBjaGF0aUZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpdmUtY2hhdC1pZnJhbWUnKTtcbiAgICAgICAgY29uc3QgY2hhdEhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55dC1saXZlLWNoYXQtaGVhZGVyLXJlbmRlcmVyJyk7XG5cbiAgICAgICAgLy8gVGhhbmtzIFN0YWNrT3ZlcmZsb3chIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0MjAwMDQvYWNjZXNzLXBhcmVudC11cmwtZnJvbS1pZnJhbWVcbiAgICAgICAgdmFyIHVybCA9ICh3aW5kb3cubG9jYXRpb24gIT0gd2luZG93LnBhcmVudC5sb2NhdGlvbilcbiAgICAgICAgICAgID8gZG9jdW1lbnQucmVmZXJyZXJcbiAgICAgICAgICAgIDogZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcblxuXG4gICAgICAgIHZhciB1cmxDaGVjayA9ICh1cmwuaW5kZXhPZignaWNlcG9zZWlkb24uY29tJykgPiAtMSk7XG4gICAgICAgIHZhciBsaXZlQnV0dG9uQ2hlY2sgPSAoZG9jdW1lbnQuYm9keS5jb250YWlucyhsaXZlQnV0dG9uKSAmJiAhbGl2ZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpO1xuICAgICAgICB2YXIgY2hhdENoZWNrID0gKGRvY3VtZW50LmJvZHkuY29udGFpbnMoY2hhdEFwcCkgfHwgZG9jdW1lbnQuYm9keS5jb250YWlucyhjaGF0aUZyYW1lKSB8fCBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGNoYXRIZWFkZXIpKTtcblxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiVVJMIENIRUNLOlwiLCB1cmxDaGVjaywgdXJsKTtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkxJVkUgQlVUVE9OIENIRUNLOlwiLCBsaXZlQnV0dG9uQ2hlY2spO1xuICAgICAgICBjb25zb2xlLmRlYnVnKFwiQ0hBVCBFWElTVFMgQ0hFQ0s6XCIsIGNoYXRDaGVjayk7XG5cbiAgICAgICAgaWYgKHVybENoZWNrIHx8IGxpdmVCdXR0b25DaGVjayB8fCBjaGF0Q2hlY2spIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJJUyBMSVZFU1RSRUFNIVwiKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIklTIE5PVCBMSVZFU1RSRUFNXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdXNlciBpcyB3YXRjaGluZyBhbiBJY2UgUG9zZWlkb24gbGl2ZXN0cmVhbS5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGlzSWNlUG9zZWlkb25TdHJlYW0oKSB7XG4gICAgICAgIC8vIFRoYW5rcyBTdGFja092ZXJmbG93ISBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDIwMDA0L2FjY2Vzcy1wYXJlbnQtdXJsLWZyb20taWZyYW1lXG4gICAgICAgIHZhciB1cmwgPSAod2luZG93LmxvY2F0aW9uICE9IHdpbmRvdy5wYXJlbnQubG9jYXRpb24pXG4gICAgICAgICAgICA/IGRvY3VtZW50LnJlZmVycmVyXG4gICAgICAgICAgICA6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIHZhciBZVEdjaGFubmVsID0gJChcInl0Zy1vd25lci1iYWRnZXNcIikucGFyZW50KCkuYXR0cignaHJlZicpO1xuICAgICAgICB2YXIgWVRjaGFubmVsICA9ICQoXCJhLnl0ZC12aWRlby1vd25lci1yZW5kZXJlclwiKS5hdHRyKCdocmVmJyk7XG5cbiAgICAgICAgdmFyIHdoaXRlbGlzdGVkQ2hhbm5lbHMgPSBbXG4gICAgICAgICAgICBcIi9jaGFubmVsL1VDdjlFZGxfV2J0YlBlVVJQdEZEby11QVwiLCAvLyBJY2UgUG9zZWlkb25cbiAgICAgICAgICAgIFwiL2NoYW5uZWwvVUNweEF2OGkwTVRQb2NpN0k3YUZOeFpnXCIsIC8vIEdlb3JnZSBBbGxlblxuICAgICAgICAgICAgXCIvY2hhbm5lbC9VQ2FESl9EVHoza2JuZU1XaVYzMVlpRkFcIiwgLy8gQW5zaWVuIDEyIC8gYW5kcmllc19kZXZcbiAgICAgICAgICAgIFwiL2NoYW5uZWwvVUNUbXJIUUVFRkRZUHk1MW1VZzBKcGpBXCIsIC8vIHhCeXQzelxuICAgICAgICAgICAgXCIvY2hhbm5lbC9VQzFFelpPVzF0VkVLMnZqbWJTbzEzN0FcIiwgLy8geEJ5dDN6IElQVFYgdGVzdGluZyBzdHJlYW1cbiAgICAgICAgICAgIFwiL2NoYW5uZWwvVUM4RW9PRkFtX3JlTlhHSFdLLWtCVVh3XCIgIC8vIHNwYXJjdXRcbiAgICAgICAgXTtcblxuICAgICAgICB2YXIgdXJsQ2hlY2sgPSAodXJsLmluZGV4T2YoJ2ljZXBvc2VpZG9uLmNvbScpID4gLTEgfHwgdXJsLmluZGV4T2YoJ2xpdmVfY2hhdCcpID4gLTEpO1xuICAgICAgICB2YXIgY2hhbm5lbENoZWNrID0gKHdoaXRlbGlzdGVkQ2hhbm5lbHMuaW5kZXhPZihZVEdjaGFubmVsKSA+IC0xIHx8IHdoaXRlbGlzdGVkQ2hhbm5lbHMuaW5kZXhPZihZVGNoYW5uZWwpID4gLTEpO1xuXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJVUkwgQ0hFQ0s6XCIsIHVybENoZWNrLCB1cmwpO1xuICAgICAgICBjb25zb2xlLmRlYnVnKFwiQ0hBTk5FTCBDSEVDSzpcIiwgY2hhbm5lbENoZWNrLCBZVEdjaGFubmVsLCBZVGNoYW5uZWwpO1xuXG4gICAgICAgIGlmICh1cmxDaGVjayB8fCBjaGFubmVsQ2hlY2spIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJJUyBJQ0VQT1NFSURPTiBTVFJFQU0hXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiSVMgTk9UIElDRVBPU0VJRE9OIFNUUkVBTSFcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5QYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcyA9IDA7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3BhZ2VDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRW1vdGUgZnJvbSAnLi9lbW90ZSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFiQ29tcGxldGVcbntcbiAgICAvKipcbiAgICBSZWN1cnNpdmVseSBhZGRzIHRvIHZhbHVlc0FycmF5IHBvc3NpYmxlIGVtb3RlcyBmcm9tIGxvY2FsVHJpZVxuICAgICovXG4gICAgc3RhdGljIGdldFBvc3NpYmxlVmFsdWVzKGxvY2FsVHJpZSwgdmFsdWVzQXJyYXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhbFRyaWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YWx1ZXNBcnJheS5wdXNoKGxvY2FsVHJpZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGxvY2FsVHJpZSk7XG4gICAgICAgICAgICBsZXQgcmV0dXJuVmFsdWVzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBUYWJDb21wbGV0ZS5nZXRQb3NzaWJsZVZhbHVlcyhsb2NhbFRyaWVba2V5c1tpXV0sIHZhbHVlc0FycmF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgIFNlYXJjaGVzIEVtb3RlLnRyaWUgZm9yIGFsbCBlbW90ZXMgc3RhcnRpbmcgd2l0aCBzLiBJZiBpdCBmaW5kcyBtdWx0aXBsZSB2YWx1ZXMsIHJldHVybnMgcG9zIChpbmRleCkgdmFsdWVcbiAgICAqL1xuICAgIHN0YXRpYyBmaW5kU2ltaWxhcihzLCBwb3MpIHtcbiAgICAgICAgcyA9IHMudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgbG9jYWxUcmllID0gRW1vdGUudHJpZTtcbiAgICAgICAgd2hpbGUgKChpIDwgcy5sZW5ndGgpICYmIChzLmNoYXJBdChpKSBpbiBsb2NhbFRyaWUpKSB7XG4gICAgICAgICAgICBsb2NhbFRyaWUgPSBsb2NhbFRyaWVbcy5jaGFyQXQoaSldO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgdmFsdWVzID0gW107XG4gICAgICAgICAgICBUYWJDb21wbGV0ZS5nZXRQb3NzaWJsZVZhbHVlcyhsb2NhbFRyaWUsIHZhbHVlcyk7XG4gICAgICAgICAgICBpZiAocG9zID49IHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXNbcG9zXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBiaW5kRXZlbnQoKSB7XG4gICAgICAgICQoXCJ5dC1saXZlLWNoYXQtdGV4dC1pbnB1dC1maWVsZC1yZW5kZXJlclwiKS5vbigna2V5ZG93bicsIFwiZGl2I2lucHV0XCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBrZXlDb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PSA5KSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VGV4dCA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgICAgIGlmKC9cXHMkLy50ZXN0KGN1cnJlbnRUZXh0KSl7IC8vbGFzdCBjaGFyIGlzIHdoaXRlc3BhY2UgLSBzbyBkb250IHRyZWF0IGl0IGFzIGEgd29yZC4gc3BsaXQgZnVuY3Rpb24gZG9lc250IGFjdHVhbGx5IHNwbGl0IGVnIFwiVHJpSGFyZCBcIiBpbnRvIFwiVHJpSGFyZFwiIGFuZCBcIlwiIGJ1dCByZXR1cm5zIFwiVHJpSGFyZCBcIlxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB3b3JkcyA9IGN1cnJlbnRUZXh0LnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgaWYgKFRhYkNvbXBsZXRlLmxhc3RXb3JkLmxlbmd0aCkgeyAvL3dvcmQgdHlwZWQgYnkgdXNlZCBoYXMgYmVlbiBhbHJlYWR5IHJlcGxhY2VkIGJ5IHNvbWUgc3VnZ2VzdGlvbiAtPiByZW1vdmUgdGhhdCBzdWdnZXN0aW9uIChpcyBnb2luZyB0byBnZXQgcmVwbGFjZWQgYnkgbmV3IHN1Z2dlc3Rpb24gb3IgbGFzdFdvcmQpXG4gICAgICAgICAgICAgICAgICAgIHdvcmRzLnBvcCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIFRhYkNvbXBsZXRlLmxhc3RXb3JkID0gd29yZHMucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBzaW1pbGFyID0gVGFiQ29tcGxldGUuZmluZFNpbWlsYXIoVGFiQ29tcGxldGUubGFzdFdvcmQsIFRhYkNvbXBsZXRlLnRhYlByZXNzZWRDb3VudCk7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1RleHQgPSAnJztcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1RleHQgKz0gd29yZHNbaV0gKyAnICc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzaW1pbGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1RleHQgKz0gc2ltaWxhcjtcbiAgICAgICAgICAgICAgICAgICAgVGFiQ29tcGxldGUudGFiUHJlc3NlZENvdW50Kys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VGV4dCArPSBUYWJDb21wbGV0ZS5sYXN0V29yZDtcbiAgICAgICAgICAgICAgICAgICAgVGFiQ29tcGxldGUubGFzdFdvcmQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgVGFiQ29tcGxldGUudGFiUHJlc3NlZENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJCh0aGlzKS50ZXh0KG5ld1RleHQpO1xuICAgICAgICAgICAgICAgIC8vYWRkcyBmb2N1cyB0byBsYXN0IGNoYXJcbiAgICAgICAgICAgICAgICBsZXQgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICAgICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cygkKHRoaXMpWzBdKTtcbiAgICAgICAgICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgbGV0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcblxuICAgICAgICAgICAgICAgIC8vdXBkYXRlcyBjaGFyYWN0ZXIgY291bnRcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoVGFiQ29tcGxldGUuaW5wdXRDaGFuZ2VkRXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBUYWJDb21wbGV0ZS50YWJQcmVzc2VkQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIFRhYkNvbXBsZXRlLmxhc3RXb3JkID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufTtcblxuVGFiQ29tcGxldGUuaW5wdXRDaGFuZ2VkRXZlbnQgPSBuZXcgRXZlbnQoJ2lucHV0Jywge1xuICAgICdidWJibGVzJzogdHJ1ZSxcbiAgICAnY2FuY2VsYWJsZSc6IHRydWVcbn0pO1xuVGFiQ29tcGxldGUudGFiUHJlc3NlZENvdW50ID0gMDtcblRhYkNvbXBsZXRlLmxhc3RXb3JkID0gJyc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RhYkNvbXBsZXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGdldE9wdGlvbnMgfSBmcm9tICcuL21haW4nO1xuXG5jb25zdCByYW5kb21DaGF0Q29sb3JzID0ge1xuICAgICctQSc6ICcjNDdkMjg4JyxcbiAgICAnLUInOiAnI2I5NGZmMScsXG4gICAgJy1DJzogJyMzY2RjMzYnLFxuICAgICctRCc6ICcjZGY0NGRjJyxcbiAgICAnLUUnOiAnIzZiZDQzMicsXG4gICAgJy1GJzogJyM4YzY5ZjEnLFxuICAgICctRyc6ICcjYTNkMTJkJyxcbiAgICAnLUgnOiAnI2IzNWRkNScsXG4gICAgJy1JJzogJyM1ZWRiNjInLFxuICAgICctSic6ICcjY2E0NmJiJyxcbiAgICAnLUsnOiAnIzNkYWEyNycsXG4gICAgJy1MJzogJyNlZjY3ZDUnLFxuICAgICctTSc6ICcjODNjYzNmJyxcbiAgICAnLU4nOiAnI2Q5NzhlYicsXG4gICAgJy1PJzogJyM5N2JkMTInLFxuICAgICctUCc6ICcjNWM3YWYxJyxcbiAgICAnLVEnOiAnI2RmYzcxYicsXG4gICAgJy1SJzogJyM0YzhhZTcnLFxuICAgICctUyc6ICcjZjAyZjE0JyxcbiAgICAnLVQnOiAnIzJkZDNhZCcsXG4gICAgJy1VJzogJyNlZTMwMzQnLFxuICAgICctVic6ICcjNDRjMzU3JyxcbiAgICAnLVcnOiAnI2FiNzZkYycsXG4gICAgJy1YJzogJyNjNWJmMzAnLFxuICAgICctWSc6ICcjNmQ3ZGRiJyxcbiAgICAnLVonOiAnI2VjYTgyMScsXG4gICAgJy0wJzogJyNjYzZhMzUnLFxuICAgICctMSc6ICcjODU4YjIzJyxcbiAgICAnLTInOiAnI2YwOTQ2NCcsXG4gICAgJy0zJzogJyNiY2E1MjcnLFxuICAgICctNCc6ICcjZTc5NjRkJyxcbiAgICAnLTUnOiAnI2FjODUwZicsXG4gICAgJy02JzogJyNlMWI2NTUnLFxuICAgICctNyc6ICcjYmI3NzIyJyxcbiAgICAnLTgnOiAnI2FhODUyZScsXG4gICAgJy05JzogJyNkZTliMzYnLFxuICAgICctLSc6ICcjZTU3ZTIwJyxcbiAgICAnLV8nOiAnIzQ2YWQ2OCdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoYXRDb2xvcnMobm9kZSwgcHJvZmlsZUlkKVxue1xuXHRpZiAodHlwZW9mIG5vZGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBwcm9maWxlSWQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdFxuXHRjb25zdCBtc2dQYXJlbnQgPSAkKG5vZGUpLnBhcmVudHMoJy55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTAnKTtcblx0Y29uc3QgbXNnUGFyZW50UG9wb3V0ID0gJChub2RlKS5wYXJlbnRzKCcueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpO1xuXHRjb25zdCBhdXRob3JOYW1lID0gJChtc2dQYXJlbnQpLmZpbmQoJyNhdXRob3ItbmFtZScpO1xuXHRjb25zdCBhdXRob3JOYW1lUG9wb3V0ID0gJChtc2dQYXJlbnRQb3BvdXQpLmZpbmQoJyNhdXRob3ItbmFtZScpO1xuXHRcblx0Y29uc3QgZmlyc3RUd28gPSBwcm9maWxlSWQuc3Vic3RyaW5nKDAsIDIpO1xuXHRcblx0aWYgKGF1dGhvck5hbWUubGVuZ3RoID4gMCkge1xuXHRcdCQoYXV0aG9yTmFtZSkuY3NzKCdjb2xvcicsIHJhbmRvbUNoYXRDb2xvcnNbZmlyc3RUd28udG9VcHBlckNhc2UoKV0pO1xuXHR9XG5cdFxuXHRpZiAoYXV0aG9yTmFtZVBvcG91dC5sZW5ndGggPiAwKSB7XG5cdFx0JChhdXRob3JOYW1lUG9wb3V0KS5jc3MoJ2NvbG9yJywgcmFuZG9tQ2hhdENvbG9yc1tmaXJzdFR3by50b1VwcGVyQ2FzZSgpXSk7XG5cdH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NoYXRDb2xvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0T3B0aW9ucyB9IGZyb20gJy4vbWFpbic7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBtZW50aW9uIGFuZCBjaGFuZ2VzIGJhY2tncm91bmQgdG8gQlRUViBzdHlsZSBiYWNrZ3JvdW5kLlxuICogQHBhcmFtIHtub2RlfSBub2RlIC0gTWVzc2FnZSBub2RlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1lbnRpb25IaWdobGlnaHQobm9kZSlcbntcbiAgICBjb25zdCBjdXJyZW50VXNlciA9ICQoJyNhdXRob3IgI2F1dGhvci1uYW1lJykudGV4dCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgYXV0aG9yVHlwZSA9IG5vZGUuZ2V0KDApLmdldEF0dHJpYnV0ZSgnYXV0aG9yLXR5cGUnKTtcblxuICAgIGlmICh0eXBlb2YgY3VycmVudFVzZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZ2V0T3B0aW9ucygpWydtZW50aW9uSGlnaGxpZ2h0J10gJiYgY3VycmVudFVzZXIubGVuZ3RoID4gMiAmJiAhbm9kZS5oYXNDbGFzcygneXQtbGl2ZS1jaGF0LWxlZ2FjeS1wYWlkLW1lc3NhZ2UtcmVuZGVyZXItMCcpKSB7IC8vIENoZWNrIGl0J3Mgbm90IHNwb25zb3IgLyBzdXBlcmNoYXQsIGFsc28gbWVudGlvbkhpZ2hsaWdodCBlbmFibGVkXG5cbiAgICAgICAgY29uc3QgdW5pcXVlaWQgPSBub2RlLmdldCgwKS5nZXRBdHRyaWJ1dGUoJ2lkJyk7IC8vIENvcHkgdW5pcXVlIG1lc3NhZ2UgaWRcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IChcIiBcIiArIG5vZGUuZmluZCgnI21lc3NhZ2UnKS50ZXh0KCkudG9Mb3dlckNhc2UoKSArIFwiIFwiKS5yZXBsYWNlKC9bXFx1MjAwQi1cXHUyMDBEXFx1RkVGRl0vZywgJycpO1xuXG4gICAgICAgIGlmICh1bmlxdWVpZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVuaXF1ZWlkLmxlbmd0aCA+IDMwICYmIChhdXRob3JUeXBlID09PSBcIm93bmVyXCIgfHwgbWVzc2FnZS5pbmRleE9mKCcgJytjdXJyZW50VXNlcisnICcpICE9PSAtMSB8fCBtZXNzYWdlLmluZGV4T2YoJ0AnK2N1cnJlbnRVc2VyKycgJykgIT09IC0xKSkgeyAvLyBJZiB5b3VyIG5hbWUgaXMgaW4gdGhlIG1lc3NhZ2UsIGFuZCBpdCdzIG5vdCB5b3VyIG1lc3NhZ2Ugb3IgdGhlIG1lc3NhZ2UgaXMgZnJvbSB0aGUgc3RyZWFtZXJcbiAgICAgICAgICAgIG5vZGUuZ2V0KDApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgyNTUsMCwwLDAuNDApXCI7XG4gICAgICAgICAgICBub2RlLmZpbmQoJyNhdXRob3ItbmFtZScpLmdldCgwKS5zdHlsZS5jb2xvciA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWVudGlvbkhpZ2hsaWdodC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBTQ1JPTExfRU5BQkxFRF9VUkwsIFNDUk9MTF9ESVNBQkxFRF9VUkwgfSBmcm9tICcuLy4uL21haW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHdheXNTY3JvbGxEb3duXG57XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IGFuZCBiaW5kcyB0aGUgbmVjZXNzYXJ5IGxpc3RlbmVycy5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5pdCgpXG4gICAge1xuICAgICAgICBjb25zdCBzY3JvbGxkb3duV3JhcHBlciA9ICQoJy5pcHR2LXNjcm9sbGRvd24td3JhcHBlcicpO1xuXG4gICAgICAgIGlmIChzY3JvbGxkb3duV3JhcHBlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNjcm9sbGRvd25XcmFwcGVyLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHNjcm9sbFdyYXBwZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0Fsd2F5cyBzY3JvbGwgZG93biAoRW5hYmxlZCknKTtcbiAgICAgICAgc2Nyb2xsV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdoaW50LS10b3AnLCAnaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKTtcblxuICAgICAgICAkKHNjcm9sbFdyYXBwZXIpLmNzcyh7XG4gICAgICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgJ3JpZ2h0JzogJzExM3B4JyxcbiAgICAgICAgICAgICdib3R0b20nOiAnMThweCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChzY3JvbGxXcmFwcGVyKS5odG1sKGBcbiAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cImlwdHYtc2Nyb2xsZG93bi10b2dnbGVcIiBzdHlsZT1cIm91dGxpbmU6IDA7XCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke1NDUk9MTF9FTkFCTEVEX1VSTH1cIiBhbHQ9XCJBbHdheXMgc2Nyb2xsIGRvd25cIiBoZWlnaHQ9XCIxMVwiIHdpZHRoPVwiMTFcIiBjbGFzcz1cImlwdHYtc2Nyb2xsZG93bi10b2dnbGUtaWNvblwiPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICBgKTtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbFdyYXBwZXIpO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaXB0di1zY3JvbGxkb3duLXRvZ2dsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi50b2dnbGVTY3JvbGxEb3duKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoQWx3YXlzU2Nyb2xsRG93bi5pbnRlcnZhbCk7XG5cbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5pbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkKCcjaXRlbS1zY3JvbGxlcicpLnNjcm9sbFRvcCg5OTk5OTk5OTkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uQ2luZW1hKHNjcm9sbFdyYXBwZXIpO1xuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmhpZGVTY3JvbGxPblNwb25zb3JNZW51KHNjcm9sbFdyYXBwZXIpO1xuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlICdBbHdheXMgc2Nyb2xsIGRvd24nIG92ZXJsYXkgd2hlbiBjaW5lbWEgbW9kZSBpcyBvcGVuXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bm9kZX0gc2Nyb2xsV3JhcHBlclxuICAgICAqL1xuICAgIHN0YXRpYyBoaWRlU2Nyb2xsT25DaW5lbWEoc2Nyb2xsV3JhcHBlcilcbiAgICB7XG4gICAgICAgIGNvbnN0IHdhdGNoUGFnZSA9ICd5dGctd2F0Y2gtcGFnZSc7XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtKSA9PiB7XG4gICAgICAgICAgICAgICAgJChtLnRhcmdldCkuaXMoJ1tzaWRlYmFyLWNvbGxhcHNlZF0nKSA/ICQoc2Nyb2xsV3JhcHBlcikuaGlkZSgpIDogJChzY3JvbGxXcmFwcGVyKS5zaG93KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJPcHRzID0ge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiBmYWxzZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IGZhbHNlLFxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ3NpZGViYXItY29sbGFwc2VkJ11cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBhZGRPYnNlcnZlciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGlmICgkKHdhdGNoUGFnZSkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSgkKHdhdGNoUGFnZSlbMF0sIG9ic2VydmVyT3B0cyk7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChhZGRPYnNlcnZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDI1MCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IHdoZW4gc3BvbnNvciBtZW51IGlzIG9wZW4uXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bm9kZX0gc2Nyb2xsV3JhcHBlclxuICAgICAqL1xuICAgIHN0YXRpYyBoaWRlU2Nyb2xsT25TcG9uc29yTWVudShzY3JvbGxXcmFwcGVyKVxuICAgIHtcbiAgICAgICAgY29uc3QgY2hhdElucHV0UmVuZGVyZXIgPSAneXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXInO1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG0pID0+IHtcbiAgICAgICAgICAgICAgICAkKG0udGFyZ2V0KS5hdHRyKCdjcmVhdG9yLW9wZW4nKSA/ICQoc2Nyb2xsV3JhcHBlcikuaGlkZSgpIDogJChzY3JvbGxXcmFwcGVyKS5zaG93KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJPcHRzID0ge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiBmYWxzZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IGZhbHNlLFxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ2NyZWF0b3Itb3BlbiddXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzcG9uc29yQ2xpY2sgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoJChjaGF0SW5wdXRSZW5kZXJlcikubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSgkKGNoYXRJbnB1dFJlbmRlcmVyKVswXSwgb2JzZXJ2ZXJPcHRzKTtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHNwb25zb3JDbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDI1MCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIGZ1bmN0aW9uYWxpdHkgd2hlbiBzY3JvbGxpbmcgbWFudWFsbHkuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBiaW5kU2Nyb2xsTGlzdGVuZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW0tc2Nyb2xsZXInKTtcblxuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbExpc3RlbmVyKCkgfSwgMjUwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJyNpdGVtLXNjcm9sbGVyJykub24oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24oZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjaXRlbS1zY3JvbGxlcicpLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldCA9PT0gdGhpcykge1xuICAgICAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmFibGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIGZ1bmN0aW9uYWxpdHkgd2hlbiBibHVlIGp1bXAgZG93biBidXR0b24gaXMgY2xpY2tlZC5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctbW9yZScpO1xuXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7IEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbERvd25MaXN0ZW5lcigpIH0sIDI1MCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXQub25tb3VzZWRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24odHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHNjcm9sbERvd24gc3RhdGUgYW5kIGFkanVzdCBvdmVybGF5IGFjY29yZGluZ2x5LlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9nZ2xlU2Nyb2xsRG93bihzdGF0ZSlcbiAgICB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSAhQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID0gc3RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICAkKCcuaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKS5hdHRyKCdhcmlhLWxhYmVsJywgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID8gJ0Fsd2F5cyBzY3JvbGwgZG93biAoRW5hYmxlZCknIDogJ0Fsd2F5cyBzY3JvbGwgZG93biAoRGlzYWJsZWQpJyk7XG4gICAgICAgICQoJy5pcHR2LXNjcm9sbGRvd24tdG9nZ2xlLWljb24nKS5hdHRyKCdzcmMnLCBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPyBTQ1JPTExfRU5BQkxFRF9VUkwgOiBTQ1JPTExfRElTQUJMRURfVVJMKTtcbiAgICB9O1xufTtcblxuQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID0gdHJ1ZTtcbkFsd2F5c1Njcm9sbERvd24uaW50ZXJ2YWwgPSBudWxsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDaGVja3MgaWYgdXNlciBpcyBiZWhpbmQgaW4gbGl2ZXN0cmVhbSBhbmQgd2FybnMgdGhlbS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tJZldhdGNoaW5nTGl2ZSgpIHtcblxuICAgIGxldCBsaXZlQ2hlY2tJbnRlcnZhbCA9IG51bGw7XG5cbiAgICBsaXZlQ2hlY2tJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGNvbnN0ICRsaXZlQnV0dG9uID0gJCgnLnl0cC1saXZlLWJhZGdlLnl0cC1idXR0b24nKTtcblxuICAgICAgICBpZiAoJGxpdmVCdXR0b24uaXMoJzplbmFibGVkJykgJiYgJGxpdmVCdXR0b24uaXMoJzp2aXNpYmxlJykgJiYgJCgnLmlwdHYtbGl2ZS13YXJuaW5nJykubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgJCgnI3BsYXllci1jb250YWluZXInKS5hcHBlbmQoYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcHR2LWxpdmUtd2FybmluZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgWW91XFwncmUgd2F0Y2hpbmcgb2xkIGZvb3RhZ2UsIGNsaWNrIHRoZSBMSVZFIGJ1dHRvbiBpbiB0aGUgYm90dG9tIGxlZnQgY29ybmVyIHRvIHdhdGNoIGxpdmUuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctZGlzbWlzc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctY2xvc2VcIj7inJU8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYCk7XG4gICAgICAgIH1cbiAgICB9LCAxNSAqIDEwMDApO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5pcHR2LWxpdmUtd2FybmluZy1jbG9zZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuaXB0di1saXZlLXdhcm5pbmcnKS5yZW1vdmUoKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsaXZlQ2hlY2tJbnRlcnZhbCk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignbW91c2Vkb3duJywgJy55dHAtbGl2ZS1iYWRnZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuaXB0di1saXZlLXdhcm5pbmcnKS5yZW1vdmUoKTtcbiAgICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvY2hlY2tJZldhdGNoaW5nTGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBBZGRzIG5ldyBjb2xvciBjaGFuZ2UgYnV0dG9uIHRvIGxpdmVzdHJlYW0gcGFnZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sb3JCdXR0b24oKVxue1xuICAgIGNvbnN0IGNvbG9ySWNvbiA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvcGVuY2lsLWljb24ucG5nJyk7XG4gICAgY29uc3QgY29sb3JJbWFnZSA9IGA8aW1nIHNyYz1cIiR7Y29sb3JJY29ufVwiIGFsdD1cInN0YXJcIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDgwJTsgaGVpZ2h0OjgwJTsgbWFyZ2luLXJpZ2h0OiAycHg7XCI+YDtcblxuICAgIGNvbnN0IGNvbG9yQnV0dG9uID0gYFxuICAgICAgICA8aXB0di1jb2xvci1idXR0b24gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgcmFpc2VkPVwiXCIgc3VwcG9ydGVkLWNvbGQtbG9hZC1hY3Rpb25zPVwiWyZxdW90O2NvbG9yJnF1b3Q7XVwiIHdhaXQtZm9yLXNpZ25hbD1cIndhdGNoLXBhZ2UtaW5pdGlhbGl6ZWRcIiBjbGFzcz1cInN0eWxlLXNjb3BlIHl0Zy13YXRjaC1mb290ZXIgeC1zY29wZSBpcHR2LWNvbG9yLWJ1dHRvbi0wXCI+XG4gICAgICAgICAgICA8aXJvbi1zaWduYWxzIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b25cIj48L2lyb24tc2lnbmFscz5cbiAgICAgICAgICAgIDxwYXBlci1idXR0b24gc3R5bGU9XCJjb2xvcjogI2ZmZjsgYmFja2dyb3VuZC1jb2xvcjogIzBmOWQ1ODsgbWluLXdpZHRoOiAwO1wiIGNsYXNzPVwiZW5hYmxlZCBzdHlsZS1zY29wZSBpcHR2LWNvbG9yLWJ1dHRvbiB4LXNjb3BlIHBhcGVyLWJ1dHRvbi0wXCIgcm9sZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiIGFuaW1hdGVkPVwiXCIgYXJpYS1kaXNhYmxlZD1cImZhbHNlXCIgZWxldmF0aW9uPVwiMVwiIHJhaXNlZD1cIlwiIGFyaWEtbGFiZWw9XCJDSEFOR0UgTkFNRSBDT0xPUlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItanVzdGlmaWVkIHN0eWxlLXNjb3BlIGlwdHYtY29sb3ItYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMjRweDsgaGVpZ2h0OiAyNHB4O1wiIGNsYXNzPVwiaWNvbi1jb250YWluZXIgbGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LWNvbG9yLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHl0LWljb24gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWNvbG9yLWJ1dHRvbiB4LXNjb3BlIHl0LWljb24tMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC95dC1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aXB0di1mb3JtYXR0ZWQtc3RyaW5nIGlkPVwidGV4dFwiIGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LWNvbG9yLWJ1dHRvblwiIHN0eWxlPVwibWFyZ2luOiAwIDNweFwiPjxzcGFuIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1mb3JtYXR0ZWQtc3RyaW5nXCI+Q0hBTkdFIE5BTUUgQ09MT1I8L3NwYW4+PC9pcHR2LWZvcm1hdHRlZC1zdHJpbmc+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3BhcGVyLWJ1dHRvbj5cbiAgICAgICAgPC9pcHR2LWNvbG9yLWJ1dHRvbj5gO1xuXG4gICAgJCgnLmlwdHYtc3BvbnNvci1idXR0b24tMCcpLmFmdGVyKGNvbG9yQnV0dG9uKTtcblxuICAgICQoY29sb3JCdXR0b24pLnJlYWR5KCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLmlwdHYtY29sb3ItYnV0dG9uLngtc2NvcGUueXQtaWNvbi0wJykuaHRtbChjb2xvckltYWdlKTtcbiAgICB9KTtcblxuICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1jb2xvci1idXR0b24tMCcpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgd2luZG93Lm9wZW4oJ2h0dHBzOi8vd3d3LmljZXBvc2VpZG9uLmNvbS9wcm9maWxlJywgJ19ibGFuaycpO1xuICAgICAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtY29sb3ItYnV0dG9uLTAgcGFwZXItYnV0dG9uJylbMF0uYmx1cigpO1xuICAgIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9jb2xvckJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBBZGRzIGRvbmF0ZSBidXR0b24gdG8gbGl2ZXN0cmVhbSBwYWdlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb25hdGVCdXR0b24oKVxue1xuICAgICQoJy5pcHR2LWRvbmF0ZS1idXR0b24tMCcpLnJlbW92ZSgpO1xuXG4gICAgY29uc3QgZG9uYXRlSWNvbiA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvZG9uYXRlLWljb24ucG5nJyk7XG4gICAgY29uc3Qgc3BvbnNvckljb24gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3Nwb25zb3ItaWNvbi5wbmcnKTtcblxuICAgIGNvbnN0IHNwb25zb3JJbWFnZSA9IGA8aW1nIHNyYz1cIiR7c3BvbnNvckljb259XCIgYWx0PVwic3RhclwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPmA7XG5cbiAgICBjb25zdCBkb25hdGVCdXR0b24gPSBgXG4gICAgICAgIDxpcHR2LWRvbmF0ZS1idXR0b24gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgcmFpc2VkPVwiXCIgc3VwcG9ydGVkLWNvbGQtbG9hZC1hY3Rpb25zPVwiWyZxdW90O3Nwb25zb3ImcXVvdDtdXCIgd2FpdC1mb3Itc2lnbmFsPVwid2F0Y2gtcGFnZS1pbml0aWFsaXplZFwiIGNsYXNzPVwic3R5bGUtc2NvcGUgeXRnLXdhdGNoLWZvb3RlciB4LXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvbi0wXCI+XG4gICAgICAgICAgICA8aXJvbi1zaWduYWxzIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCI+PC9pcm9uLXNpZ25hbHM+XG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uIHgtc2NvcGUgcGFwZXItYnV0dG9uLTBcIiByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCIgYW5pbWF0ZWQ9XCJcIiBhcmlhLWRpc2FibGVkPVwiZmFsc2VcIiBlbGV2YXRpb249XCIxXCIgcmFpc2VkPVwiXCIgYXJpYS1sYWJlbD1cIkRvbmF0ZSB0byBJY2VfUG9zZWlkb25cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWp1c3RpZmllZCBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAyNHB4OyBoZWlnaHQ6IDI0cHg7XCIgY2xhc3M9XCJpY29uLWNvbnRhaW5lciBsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItY2VudGVyIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHl0LWljb24gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwveXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCIgc3R5bGU9XCJtYXJnaW46IDAgM3B4XCI+PHNwYW4gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWZvcm1hdHRlZC1zdHJpbmdcIj5ET05BVEU8L3NwYW4+PC9pcHR2LWZvcm1hdHRlZC1zdHJpbmc+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3BhcGVyLWJ1dHRvbj5cbiAgICAgICAgPC9pcHR2LWRvbmF0ZS1idXR0b24+YDtcblxuICAgIGNvbnN0IGRvbmF0ZUltYWdlID0gYDxpbWcgc3JjPVwiJHtkb25hdGVJY29ufVwiIGFsdD1cImRvbGxhci1zaWduXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czogbm9uZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCI+YDtcblxuICAgIC8vIEluc2VydCBkb25hdGVCdXR0b24gbmV4dCB0byBzcG9uc29yQnV0dG9uXG4gICAgY29uc3Qgc3BvbnNvckJ1dHRvbiA9ICcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLnl0Zy1tZW1iZXJzaGlwLW9mZmVyLWJ1dHRvbi0wJztcblxuICAgICQoc3BvbnNvckJ1dHRvbikuYmVmb3JlKGRvbmF0ZUJ1dHRvbik7XG4gICAgJChkb25hdGVCdXR0b24pLnJlYWR5KCBmdW5jdGlvbigpIHsgJCgnLnN0eWxlLXNjb3BlLmlwdHYtZG9uYXRlLWJ1dHRvbi54LXNjb3BlLnl0LWljb24tMCcpLmh0bWwoZG9uYXRlSW1hZ2UpOyB9KTtcblxuICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1kb25hdGUtYnV0dG9uLTAnKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL3lvdXR1YmUuc3RyZWFtbGFicy5jb20vaWNlcG9zZWlkb24jLycsICdfYmxhbmsnKTtcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24tMCBwYXBlci1idXR0b24nKVswXS5ibHVyKCk7XG4gICAgfSk7XG5cbiAgICAvLyBDaGFuZ2Ugc3BvbnNvckJ1dHRvbiBpY29uIHRvIHN0YXJcbiAgICAkKGAke3Nwb25zb3JCdXR0b259IC5zdHlsZS1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24ueC1zY29wZS55dC1pY29uLTBgKS5odG1sKHNwb25zb3JJbWFnZSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBTaG93IGVtb3RlIGxvYWRpbmcgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRpbmdFbW90ZXNJbmZvKClcbntcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICQoZGl2KS50ZXh0KCdMb2FkaW5nIGVtb3Rlcy4uLicpO1xuXG4gICAgJChkaXYpLmNzcyh7XG4gICAgICAgICdmb250LXNpemUnOiAnMTZweCcsXG4gICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXG4gICAgICAgICdyaWdodCc6ICcyNXB4JyxcbiAgICAgICAgJ2JvdHRvbSc6ICc3NXB4JyxcbiAgICAgICAgJ2NvbG9yJzogJyNmZmYnLFxuICAgICAgICAndGV4dC1zaGFkb3cnOiAnMnB4IDJweCAycHggcmdiYSgwLDAsMCwwLjc1KSdcbiAgICB9KTtcblxuICAgICQoZGl2KS5hZGRDbGFzcygnaXB0di1sb2FkaW5nLWVtb3RlcycpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mby5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBBZGRzIG5ldyBzcG9uc29yIGJ1dHRvbiB0byBsaXZlc3RyZWFtIHBhZ2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwb25zb3JCdXR0b24oKVxue1xuICAgIGNvbnN0IHNwb25zb3JJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9zcG9uc29yLWljb24ucG5nJyk7XG4gICAgY29uc3Qgc3BvbnNvckltYWdlID0gYDxpbWcgc3JjPVwiJHtzcG9uc29ySWNvbn1cIiBhbHQ9XCJzdGFyXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czogbm9uZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCI+YDtcblxuICAgIGNvbnN0IHNwb25zb3JCdXR0b24gPSBgXG4gICAgICAgIDxpcHR2LXNwb25zb3ItYnV0dG9uIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiIHJhaXNlZD1cIlwiIHN1cHBvcnRlZC1jb2xkLWxvYWQtYWN0aW9ucz1cIlsmcXVvdDtzcG9uc29yJnF1b3Q7XVwiIHdhaXQtZm9yLXNpZ25hbD1cIndhdGNoLXBhZ2UtaW5pdGlhbGl6ZWRcIiBjbGFzcz1cInN0eWxlLXNjb3BlIHl0Zy13YXRjaC1mb290ZXIgeC1zY29wZSBpcHR2LXNwb25zb3ItYnV0dG9uLTBcIj5cbiAgICAgICAgICAgIDxpcm9uLXNpZ25hbHMgY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LXNwb25zb3ItYnV0dG9uXCI+PC9pcm9uLXNpZ25hbHM+XG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvbiB4LXNjb3BlIHBhcGVyLWJ1dHRvbi0wXCIgcm9sZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiIGFuaW1hdGVkPVwiXCIgYXJpYS1kaXNhYmxlZD1cImZhbHNlXCIgZWxldmF0aW9uPVwiMVwiIHJhaXNlZD1cIlwiIGFyaWEtbGFiZWw9XCJTUE9OU09SIE9OIE9GRklDSUFMIFNJVEVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWp1c3RpZmllZCBzdHlsZS1zY29wZSBpcHR2LXNwb25zb3ItYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMjRweDsgaGVpZ2h0OiAyNHB4O1wiIGNsYXNzPVwiaWNvbi1jb250YWluZXIgbGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LXNwb25zb3ItYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8eXQtaWNvbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtc3BvbnNvci1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwveXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvblwiIHN0eWxlPVwibWFyZ2luOiAwIDNweFwiPjxzcGFuIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1mb3JtYXR0ZWQtc3RyaW5nXCI+U1BPTlNPUiBPTiBPRkZJQ0lBTCBTSVRFPC9zcGFuPjwvaXB0di1mb3JtYXR0ZWQtc3RyaW5nPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9wYXBlci1idXR0b24+XG4gICAgICAgIDwvaXB0di1zcG9uc29yLWJ1dHRvbj5gO1xuXG4gICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24tMCcpLmJlZm9yZShzcG9uc29yQnV0dG9uKTtcblxuICAgICQoc3BvbnNvckJ1dHRvbikucmVhZHkoIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuc3R5bGUtc2NvcGUuaXB0di1zcG9uc29yLWJ1dHRvbi54LXNjb3BlLnl0LWljb24tMCcpLmh0bWwoc3BvbnNvckltYWdlKTtcbiAgICB9KTtcblxuICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1zcG9uc29yLWJ1dHRvbi0wJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly93d3cuaWNlcG9zZWlkb24uY29tLycsICdfYmxhbmsnKTtcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LXNwb25zb3ItYnV0dG9uLTAgcGFwZXItYnV0dG9uJylbMF0uYmx1cigpO1xuICAgIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9zcG9uc29yQnV0dG9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTcG9uc29yQ2hlY2tcbntcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB1c2VyIGlzIHN0aWxsIHVzaW5nIG9sZCBzcG9uc29yc2hpcFxuICAgICAqL1xuICAgIHN0YXRpYyBjaGVjaygpXG4gICAge1xuICAgICAgICAkLmdldChjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnY29udGVudC5odG1sJyksIGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgICAgJChkYXRhKS5hcHBlbmRUbygnYm9keScpO1xuXG4gICAgICAgICAgICBjb25zdCBpbWdVcmwgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc3BvbnNvci1iZW5lZml0cy5wbmcnKTtcbiAgICAgICAgICAgICQoJy5zcG9uc29yLW1vZGFsIC5zdWItYmVuZWZpdHMnKS5hdHRyKCdzcmMnLCBpbWdVcmwpO1xuXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNsb3NlLW1vZGFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCgnLnNwb25zb3ItbW9kYWwnKS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gJCgnLnl0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyLTAnKTtcblxuICAgICAgICAgICAgY29uc3Qgc3BvbnNvckJhZGdlID0gJChjb250YWluZXIpLmZpbmQoJy55dC1saXZlLWNoYXQtYXV0aG9yLWJhZGdlLXJlbmRlcmVyLTBbYXJpYS1sYWJlbD1cIlNwb25zb3JcIl0nKTtcblxuICAgICAgICAgICAgaWYgKCQoc3BvbnNvckJhZGdlKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICAkKCcuc3BvbnNvci1tb2RhbCcpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvc3BvbnNvckNoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9
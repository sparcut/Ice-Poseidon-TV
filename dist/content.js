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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subscribers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chatObserver__ = __webpack_require__(4);





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

            if (chatColor === 'rgb(40, 40, 40)') {
                $('<style type="text/css">.yt-live-chat-text-message-renderer-0[author-type=moderator]{background-color:#282828}</style>').appendTo('head');
            } else if (chatColor === 'rgba(238, 238, 238, 0.4)') {
                $('<style type="text/css">.yt-live-chat-text-message-renderer-0[author-type=moderator]{background-color:#e2e2e2}</style>').appendTo('head');
            }
        });

        __WEBPACK_IMPORTED_MODULE_1__subscribers__["a" /* default */].loadBadges();

        if (getOptions()['emotesTwitch'] === true || getOptions()['emotesSub'] === true || getOptions()['emotesBTTV'] === true || getOptions()['emotesIce'] === true) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__chatObserver__["a" /* default */])();
        }

        console.info('[IPTV] Init!');
    }
}

onNewPageLoad();

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = replaceAll;
/* harmony export (immutable) */ __webpack_exports__["a"] = isNode;
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function isNode(o) {
    return (
        typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
    );
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_loadingEmotesInfo__ = __webpack_require__(11);




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
                'purpleAllen'
            ]
        };

        for(const tier in subTierEmotes) {
            for (let i = 0; i < subTierEmotes[tier].length; i++) {
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


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = chatObserver;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subscribers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mentionHighlight__ = __webpack_require__(6);




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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay_donateButton__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_sponsorButton__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay_colorButton__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__overlay_checkIfWatchingLive__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__overlay_alwaysScrollDown__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__overlay_sponsorCheck__ = __webpack_require__(13);








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
            "/channel/UC1EzZOW1tVEK2vjmbSo137A"  // xByt3z IPTV testing stream
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTk5NTYwNzY2YWJhNzg2NDg2MDAiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zdWJzY3JpYmVycy5qcyIsIndlYnBhY2s6Ly8vLi91dGlsLmpzIiwid2VicGFjazovLy8uL2Vtb3RlLmpzIiwid2VicGFjazovLy8uL2NoYXRPYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vbWVudGlvbkhpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvY29sb3JCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9kb25hdGVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mby5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L3Nwb25zb3JCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9zcG9uc29yQ2hlY2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFF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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLGdDQUFnQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDaGVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtB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Q0EsU0FBUztBQUNUO0FBQ0E7QUFBQTtBQUFBIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU5OTU2MDc2NmFiYTc4NjQ4NjAwIiwiaW1wb3J0IFBhZ2VDaGVjayBmcm9tICcuL3BhZ2VDaGVjayc7XHJcbmltcG9ydCBTdWJzY3JpYmVycyBmcm9tICcuL3N1YnNjcmliZXJzJztcclxuaW1wb3J0IHsgaXNOb2RlIH0gZnJvbSAnLi91dGlsJztcclxuaW1wb3J0IENoYXRPYnNlcnZlciBmcm9tICcuL2NoYXRPYnNlcnZlcic7XHJcblxyXG5leHBvcnQgY29uc3QgRElTQUxMT1dFRF9DSEFSUyA9IFsnXFxcXCcsICc6JywgJy8nLCAnJicsIFwiJ1wiLCAnXCInLCAnPycsICchJywgJyMnXSxcclxuICAgIFNDUk9MTF9FTkFCTEVEX1VSTCA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdpY29ucy9zY3JvbGwtZW5hYmxlZC5wbmcnKSxcclxuICAgIFNDUk9MTF9ESVNBQkxFRF9VUkwgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc2Nyb2xsLWRpc2FibGVkLnBuZycpO1xyXG5cclxuZXhwb3J0IGxldCBvcHRpb25zID0gbnVsbDtcclxuXHJcbndpbmRvdy5JUFRWTG9hZGVkID0gZmFsc2U7XHJcbndpbmRvdy5MU1BhZ2VMb2FkZWQgPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRPcHRpb25zKCkge1xyXG4gICAgaWYgKG9wdGlvbnMgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb3B0aW9uc0NhY2hlJykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG59XHJcblxyXG5jb25zdCBvbk5ld1BhZ2VMb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICQoJ1tjbGFzc149XCJpcHR2LVwiXScpLnJlbW92ZSgpO1xyXG4gICAgJCgnLnl0LWxpdmUtY2hhdC1oZWFkZXItcmVuZGVyZXIjdGl0bGUnKS50ZXh0KCdDaGF0Jyk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKFBhZ2VDaGVjay5pc0xpdmVzdHJlYW0oKSAmJiBQYWdlQ2hlY2suaXNJY2VQb3NlaWRvblN0cmVhbSgpKSB7XHJcbiAgICAgICAgICAgIGluaXQoKTtcclxuICAgICAgICAgICAgaWYgKCF3aW5kb3cuTFNQYWdlTG9hZGVkKSB7IFBhZ2VDaGVjay5saXZlc3RyZWFtUGFnZSgpOyB3aW5kb3cuTFNQYWdlTG9hZGVkID0gdHJ1ZTsgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIDJFMyk7XHJcbn07XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCA+IHRpdGxlJyk7XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBvbk5ld1BhZ2VMb2FkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWlzTm9kZSh0YXJnZXQpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcclxuICAgICAgICBhdHRyaWJ1dGVzOiBmYWxzZSxcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgc3VidHJlZTogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgb3B0aW9ucyk7XHJcbn0oKSk7XHJcblxyXG52YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYoIXdpbmRvdy5JUFRWTG9hZGVkKSB7XHJcbiAgICAgICAgd2luZG93LklQVFZMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSgncmVxdWVzdFN1YnNjcmlwdGlvbnMnLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ3N1YnNjcmlwdGlvbnMnXSA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MDAwKTtcclxuXHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoJ3JlcXVlc3RMb2NhbHN0b3JhZ2UnLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSByZXNwb25zZTtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvcHRpb25zQ2FjaGUnLCBKU09OLnN0cmluZ2lmeShvcHRpb25zKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbmFibGVDaGF0Q29sb3JzJ10pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnZXh0ZXJuYWwvY2hhdC1jb2xvcnMuY3NzJyk7XHJcbiAgICAgICAgICAgICAgICAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIicgKyBhICsgJ1wiID4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydkaXNhYmxlQXZhdGFycyddID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+LnN0eWxlLXNjb3BlIC55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyICNhdXRob3ItcGhvdG8geyB3aWR0aDogMHB4OyBoZWlnaHQ6IDBweDsgbWFyZ2luLXJpZ2h0OiAwcHg7IHZpc2liaWxpdHk6IGhpZGRlbjsgfS5zdHlsZS1zY29wZS55dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlci5uby10cmFuc2l0aW9ueyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0uc3R5bGUtc2NvcGUgeXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXIgI2F2YXRhciB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDttYXJnaW46MCAhaW1wb3J0YW50OyB9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbmFibGVTcGxpdENoYXQnXSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgYm9yZGVyLXRvcDogMC41cHggc29saWQgIzMzMzMzMzsgYm9yZGVyLWJvdHRvbTogMC41cHggc29saWQgIzAwMDAwMDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnc2hvd0RlbGV0ZWRNZXNzYWdlcyddID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFtpcy1kZWxldGVkXTpub3QoW3Nob3ctb3JpZ2luYWxdKSAjbWVzc2FnZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHtkaXNwbGF5OiBpbmxpbmU7fSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2lzLWRlbGV0ZWRdOm5vdChbc2hvdy1vcmlnaW5hbF0pICNtZXNzYWdlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlOmJlZm9yZXtjb250ZW50OiBcIiAgXCJ9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydtZW50aW9uSGlnaGxpZ2h0J10gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wIC5tZW50aW9uLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDExNCwgMTUsIDE1LCAwKSAhaW1wb3J0YW50OyBwYWRkaW5nOiAwcHggMHB4ICFpbXBvcnRhbnQ7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNoYXRDb2xvciA9ICQoJy55dC1saXZlLWNoYXQtaGVhZGVyLXJlbmRlcmVyLTAnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaGF0Q29sb3IgPT09ICdyZ2IoNDAsIDQwLCA0MCknKSB7XHJcbiAgICAgICAgICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFthdXRob3ItdHlwZT1tb2RlcmF0b3Jde2JhY2tncm91bmQtY29sb3I6IzI4MjgyOH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhdENvbG9yID09PSAncmdiYSgyMzgsIDIzOCwgMjM4LCAwLjQpJykge1xyXG4gICAgICAgICAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTBbYXV0aG9yLXR5cGU9bW9kZXJhdG9yXXtiYWNrZ3JvdW5kLWNvbG9yOiNlMmUyZTJ9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFN1YnNjcmliZXJzLmxvYWRCYWRnZXMoKTtcclxuXHJcbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnZW1vdGVzVHdpdGNoJ10gPT09IHRydWUgfHwgZ2V0T3B0aW9ucygpWydlbW90ZXNTdWInXSA9PT0gdHJ1ZSB8fCBnZXRPcHRpb25zKClbJ2Vtb3Rlc0JUVFYnXSA9PT0gdHJ1ZSB8fCBnZXRPcHRpb25zKClbJ2Vtb3Rlc0ljZSddID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIENoYXRPYnNlcnZlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdbSVBUVl0gSW5pdCEnKTtcclxuICAgIH1cclxufVxyXG5cclxub25OZXdQYWdlTG9hZCgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXRPcHRpb25zIH0gZnJvbSAnLi9tYWluJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YnNjcmliZXJzXHJcbntcclxuICAgIHN0YXRpYyBsb2FkQmFkZ2VzKClcclxuICAgIHtcclxuICAgICAgICBTdWJzY3JpYmVycy5iYWRnZXNbJzEnXSA9ICBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3RpZXJCYWRnZTEucG5nJyk7XHJcbiAgICAgICAgU3Vic2NyaWJlcnMuYmFkZ2VzWycyJ10gPSAgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy90aWVyQmFkZ2UyLnBuZycpO1xyXG4gICAgICAgIFN1YnNjcmliZXJzLmJhZGdlc1snMyddID0gIGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvdGllckJhZGdlMy5wbmcnKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0U2VsZkluZm8oaW1nU3JjKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHByb2ZpbGVJZCA9IGltZ1NyYy5zcGxpdCgnLycpWzNdO1xyXG4gICAgICAgIGNvbnN0IHN1YlRpZXIgPSBnZXRPcHRpb25zWydzdWJzY3JpcHRpb25zJ11bcHJvZmlsZUlkXVsnc3VidGllciddO1xyXG5cclxuICAgICAgICBTdWJzY3JpYmVycy5zZWxmID0ge1xyXG4gICAgICAgICAgICBwcm9maWxlSW1hZ2VVcmw6IGltZ1NyYyxcclxuICAgICAgICAgICAgcHJvZmlsZUlkOiBwcm9maWxlSWQsXHJcbiAgICAgICAgICAgIHN1YlRpZXI6IHN1YlRpZXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHN1YnNjcmliZXIgaW5mb1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWRkQmFkZ2VzKG5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCQobm9kZSkuZmluZCgnaW1nJykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgJChub2RlKS5maW5kKCcjYXV0aG9yLXBob3RvJylbMF0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBMaXN0ZW4gZm9yIG11dGF0aW9ucyBvbiBhdXRob3IgaW1hZ2UgKi9cclxuICAgICAgICBjb25zdCBpbWFnZU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XHJcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG11dGF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUgPT09ICdzcmMnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2ZpbGVJZCA9IG11dGF0aW9uLnRhcmdldC5zcmMuc3BsaXQoJy8nKVszXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2ZpbGVJZCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9maWxlLWlkJywgcHJvZmlsZUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViSW5mbyA9IGdldE9wdGlvbnMoKVsnc3Vic2NyaXB0aW9ucyddW3Byb2ZpbGVJZF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ViSW5mbyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zdWItdGllcicsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3ViLXRpZXInLCBnZXRPcHRpb25zKClbJ3N1YnNjcmlwdGlvbnMnXVtwcm9maWxlSWRdWydzdWJ0aWVyJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgU3Vic2NyaWJlcnMuc2V0QmFkZ2VJbWFnZShub2RlLCBwcm9maWxlSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvKiogTGlzdGVuIGZvciBtdXRhdGlvbnMgb24gZGF0YS1wcm9maWxlIGlkIG9mIGF1dGhvciBpbWFnZSAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24obXV0YXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9maWxlLWlkJykgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9maWxlLWlkJywgcHJvZmlsZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1zdWItdGllcicpID09PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJJbmZvID0gZ2V0T3B0aW9ucygpWydzdWJzY3JpcHRpb25zJ11bcHJvZmlsZUlkXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdWJJbmZvID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXN1Yi10aWVyJywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zdWItdGllcicsIGdldE9wdGlvbnMoKVsnc3Vic2NyaXB0aW9ucyddW3Byb2ZpbGVJZF1bJ3N1YnRpZXInXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YU9ic2VydmVyQ29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IHRydWUsIHN1YnRyZWU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YU9ic2VydmVyLm9ic2VydmUobXV0YXRpb24udGFyZ2V0LCBkYXRhT2JzZXJ2ZXJDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgaW1hZ2VPYnNlcnZlckNvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH07XHJcbiAgICAgICAgaW1hZ2VPYnNlcnZlci5vYnNlcnZlKCQobm9kZSkuZmluZCgnI2F1dGhvci1waG90bycpWzBdLCBpbWFnZU9ic2VydmVyQ29uZmlnKTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHNldEJhZGdlSW1hZ2Uobm9kZSwgcHJvZmlsZUlkKVxyXG4gICAge1xyXG4gICAgICAgIGlmICgkKG5vZGUpLmZpbmQoJy50aWVyLWJhZGdlJykubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN1YkluZm8gPSBnZXRPcHRpb25zKClbJ3N1YnNjcmlwdGlvbnMnXVtwcm9maWxlSWRdO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHN1YkluZm8gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRpZXJJbWcgPSBTdWJzY3JpYmVycy5iYWRnZXNbc3ViSW5mb1snc3VidGllciddXTtcclxuXHJcbiAgICAgICAgY29uc3QgaW1nSHRtbCA9IGA8c3BhbiBjbGFzcz1cImhpbnQtLXJpZ2h0XCIgYXJpYS1sYWJlbD1cIkljZVBvc2VpZG9uLmNvbSAmIzEwOyYjMTA7VGllciAke3N1YkluZm9bJ3N1YnRpZXInXX0gU3Vic2NyaWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3RpZXJJbWd9XCIgY2xhc3M9XCJ0aWVyLWJhZGdlXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5gO1xyXG5cclxuICAgICAgICAkKG5vZGUpLmZpbmQoJyNhdXRob3ItYmFkZ2VzJykucHJlcGVuZChpbWdIdG1sKTtcclxuXHJcbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnZW5hYmxlQ2hhdENvbG9ycyddKSB7XHJcbiAgICAgICAgICAgICQobm9kZSkuZmluZCgnI2F1dGhvci1uYW1lJykuY3NzKCdjb2xvcicsIHN1YkluZm9bJ2NvbG9yJ10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaHRtbCA9ICQobm9kZSkuZmluZCgnI2F1dGhvci1iYWRnZXMnKS5odG1sKCk7XHJcblxyXG4gICAgICAgICQobm9kZSkuZmluZCgnI2F1dGhvci1iYWRnZXMnKS5vbignRE9NU3VidHJlZU1vZGlmaWVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCcudGllci1iYWRnZScpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKGh0bWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qKiBSZW1vdmUgZW1wdHkgYmFkZ2VzIGFkZGVkIGJ5IFlUICovXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy55dC1saXZlLWNoYXQtYXV0aG9yLWJhZGdlLXJlbmRlcmVyLTAnKS5lYWNoKGZ1bmN0aW9uKGksIGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoZWwpLndpZHRoKCkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChlbCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcblN1YnNjcmliZXJzLmNoYXRNZXNzYWdlcyA9IHt9O1xyXG5TdWJzY3JpYmVycy5iYWRnZXMgPSB7fTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zdWJzY3JpYmVycy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24gcmVwbGFjZUFsbChzdHIsIGZpbmQsIHJlcGxhY2UpIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKGZpbmQsICdnJyksIHJlcGxhY2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNOb2RlKG8pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgdHlwZW9mIE5vZGUgPT09ICdvYmplY3QnID8gbyBpbnN0YW5jZW9mIE5vZGUgOiBvICYmIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygby5ub2RlVHlwZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG8ubm9kZU5hbWUgPT09ICdzdHJpbmcnXHJcbiAgICApO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyByZXBsYWNlQWxsIH0gZnJvbSAnLi91dGlsJztcclxuaW1wb3J0IHsgZ2V0T3B0aW9ucywgRElTQUxMT1dFRF9DSEFSUyB9IGZyb20gJy4vbWFpbic7XHJcbmltcG9ydCBsb2FkaW5nRW1vdGVzSW5mbyBmcm9tICcuL292ZXJsYXkvbG9hZGluZ0Vtb3Rlc0luZm8nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1vdGVcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIGFsbCBlbmFibGVkIGVtb3Rlcy5cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZEVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgbG9hZGluZ0Vtb3Rlc0luZm8oKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRsb2FkaW5nID0gJCgnLmlwdHYtbG9hZGluZy1lbW90ZXMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkbG9hZGluZ1swXSkge1xyXG5cclxuICAgICAgICAgICAgICAgICRsb2FkaW5nLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbG9yJzogJyNjMDM5MmInLFxyXG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyMyODI4MjgnLFxyXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6ICcxOXB4J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGxvYWRpbmcudGV4dCgnRmFpbGVkIGxvYWRpbmcgc29tZSBlbW90ZXMgKEFQSSBzZXJ2ZXJzIGRvd24pJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LCA3LjUgKiAxMDAwKTtcclxuXHJcbiAgICAgICAgfSwgMTAgKiAxMDAwKTtcclxuXHJcbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnZW1vdGVzVHdpdGNoJ10pIEVtb3RlLmxvYWRUd2l0Y2hFbW90ZXMoKTtcclxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbW90ZXNTdWInXSkgRW1vdGUubG9hZFN1YkVtb3RlcygpO1xyXG5cclxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbW90ZXNCVFRWJ10pIHtcclxuICAgICAgICAgICAgRW1vdGUubG9hZEJUVFZFbW90ZXMoKTtcclxuICAgICAgICAgICAgRW1vdGUubG9hZEJUVFZDaGFubmVsRW1vdGVzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBFbW90ZS53YWl0VGlsbEVtb3Rlc0xvYWRlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldFRpbWVvdXQgdGhhdCBrZWVwcyBydW5uaW5nIHVudGlsIGFsbCBlbW90ZXMgYXJlIGxvYWRlZC5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHdhaXRUaWxsRW1vdGVzTG9hZGVkKClcclxuICAgIHtcclxuICAgICAgICBpZiAoKGdldE9wdGlvbnMoKVsnZW1vdGVzVHdpdGNoJ10gIT09IEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkKSB8fFxyXG4gICAgICAgICAgICAoZ2V0T3B0aW9ucygpWydlbW90ZXNTdWInXSAhPT0gRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQpIHx8XHJcbiAgICAgICAgICAgIChnZXRPcHRpb25zKClbJ2Vtb3Rlc0JUVFYnXSAhPT0gRW1vdGUuc3RhdGVzWydCVFRWJ10ubG9hZGVkKSB8fFxyXG4gICAgICAgICAgICAoZ2V0T3B0aW9ucygpWydlbW90ZXNCVFRWJ10gIT09IEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkKSkge1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChFbW90ZS53YWl0VGlsbEVtb3Rlc0xvYWRlZCwgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGVtcCBmaXggdG8gcHJldmVudCByYW0gZnJvbSBmaWxsaW5nIHVwIHdpdGggbWVzc2FnZXMuXHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5tZXNzYWdlcyA9IHt9O1xyXG4gICAgICAgIH0sIDEwMDAgKiA2MCAqIDUpO1xyXG5cclxuICAgICAgICBFbW90ZS5sb2FkSWNlRW1vdGVzKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJsYWNrbGlzdGVkRW1vdGVzID0gWydUSElDQyddO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsYWNrbGlzdGVkRW1vdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBFbW90ZS5lbW90ZXNbYmxhY2tsaXN0ZWRFbW90ZXNbaV1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLmlwdHYtbG9hZGluZy1lbW90ZXMnKS5yZW1vdmUoKTtcclxuICAgICAgICBFbW90ZS5yZXBsYWNlRXhpc3RpbmdFbW90ZXMoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXBsYWNlIGV4aXN0aW5nIHRleHQgd2l0aCBlbW90ZXMgaW4gY2hhdCwgaGFwcGVucyB3aGVuIGVtb3RlcyBhcmUgZG9uZSBsb2FkaW5nLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVwbGFjZUV4aXN0aW5nRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjaGF0RWxlbWVudHMgPSAkKCcuc3R5bGUtc2NvcGUueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlci54LXNjb3BlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMCcpO1xyXG5cclxuICAgICAgICBpZiAoY2hhdEVsZW1lbnRzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChFbW90ZS5yZXBsYWNlRXhpc3RpbmdFbW90ZXMsIDI1MCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoYXRFbGVtZW50cy5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xyXG4gICAgICAgICAgICBFbW90ZS5lbW90ZUNoZWNrKGVsKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bm9kZX0gbm9kZSAtIE1lc3NhZ2Ugbm9kZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZW1vdGVDaGVjayhub2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2Vtb3Rlc1R3aXRjaCddID09PSBmYWxzZSAmJiBnZXRPcHRpb25zKClbJ2Vtb3Rlc1N1YiddID09PSBmYWxzZSAmJiBnZXRPcHRpb25zKClbJ2Vtb3Rlc0JUVFYnXSA9PT0gZmFsc2UgJiYgZ2V0T3B0aW9ucygpWydlbW90ZXNJY2UnXSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgJG1lc3NhZ2UgPSAkKG5vZGUpLmZpbmQoJyNtZXNzYWdlJyk7XHJcbiAgICAgICAgRW1vdGUua2FwcGFDaGVjaygkbWVzc2FnZSk7XHJcblxyXG4gICAgICAgIGxldCBvbGRIVE1MID0gJG1lc3NhZ2UuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICBsZXQgbXNnSFRNTCA9IG9sZEhUTUw7XHJcblxyXG4gICAgICAgIGNvbnN0IHdvcmRzID0gbXNnSFRNTC5yZXBsYWNlKCcvXFx4RUZcXHhCQlxceEJGLycsICcnKS5yZXBsYWNlKCfvu78nLCAnJykuc3BsaXQoJyAnKTtcclxuICAgICAgICBjb25zdCB1bmlxdWVXb3JkcyA9IFtdO1xyXG4gICAgICAgIGxldCBlbW90ZUNvdW50ID0gMDtcclxuICAgICAgICBsZXQgY2hhbmdlQXR0ZW1wdHMgPSAwO1xyXG5cclxuICAgICAgICAkLmVhY2god29yZHMsIGZ1bmN0aW9uIChpLCBlbCkge1xyXG4gICAgICAgICAgICBpZiAoJC5pbkFycmF5KGVsLCB1bmlxdWVXb3JkcykgPT09IC0xKSB1bmlxdWVXb3Jkcy5wdXNoKGVsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bmlxdWVXb3Jkcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgd29yZCA9IHVuaXF1ZVdvcmRzW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBFbW90ZS5lbW90ZXNbd29yZF0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZVRpZXIgPSAkKG5vZGUpLmZpbmQoJyNhdXRob3ItcGhvdG8nKS5kYXRhKCdzdWItdGllcicpO1xyXG4gICAgICAgICAgICBsZXQgdG9vbHRpcFRleHQgPSB3b3JkO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VUaWVyIDwgRW1vdGUuZW1vdGVzW3dvcmRdWyd0aWVyJ10pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZW1vdGVUaWVyID0gRW1vdGUuZW1vdGVzW3dvcmRdWyd0aWVyJ107XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIEVtb3RlLmVtb3Rlc1t3b3JkXVsndGllciddICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcFRleHQgPSBgSWNlUG9zZWlkb24uY29tICYjMTA7JiMxMDtUaWVyICR7ZW1vdGVUaWVyfSBTdWIgRW1vdGUgJiMxMDsmIzEwOyR7d29yZH1gO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbW90ZUNvdW50Kys7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbW90ZUh0bWwgPSBgPHNwYW4gY2xhc3M9XCJoaW50LS10b3BcIiBhcmlhLWxhYmVsPVwiJHt0b29sdGlwVGV4dH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke0Vtb3RlLmVtb3Rlc1t3b3JkXVsndXJsJ119XCIgYWx0PVwiJHt3b3JkfVwiIHN0eWxlPVwiZGlzcGxheTppbmxpbmU7d2lkdGg6YXV0bzttYXgtaGVpZ2h0OjMycHg7b3ZlcmZsb3c6aGlkZGVuO1wiIGNsYXNzPVwiZXh0ZW5zaW9uLWVtb3RlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPmA7XHJcblxyXG4gICAgICAgICAgICBtc2dIVE1MID0gcmVwbGFjZUFsbChtc2dIVE1MLCB3b3JkLCBlbW90ZUh0bWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVtb3RlQ291bnQgPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRtZXNzYWdlLmh0bWwobXNnSFRNTCk7XHJcblxyXG4gICAgICAgICRtZXNzYWdlLnBhcmVudCgpLnBhcmVudCgpLmJpbmQoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRtZXNzYWdlID0gJCh0aGlzKS5maW5kKCcjbWVzc2FnZScpO1xyXG4gICAgICAgICAgICBFbW90ZS5rYXBwYUNoZWNrKCRtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBodG1sID0gJG1lc3NhZ2UuaHRtbCgpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VBdHRlbXB0cyA+IDMwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaHRtbCA9PT0gJ3VuZGVmaW5lZCcgfHwgaHRtbCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGh0bWwuaW5jbHVkZXMoJ2V4dGVuc2lvbi1lbW90ZScpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2hhbmdlQXR0ZW1wdHMrKztcclxuXHJcbiAgICAgICAgICAgICRtZXNzYWdlLmh0bWwobXNnSFRNTCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBhIGthcHBhIGVtb3RlLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtub2RlfSBtc2cgLSBNZXNzYWdlIG5vZGVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGthcHBhQ2hlY2sobXNnKVxyXG4gICAge1xyXG4gICAgICAgICQoJ2ltZycsIG1zZykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRpbWcgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKC9cXHVkODNjXFx1ZGYxZC9nLnRlc3QoJGltZy5hdHRyKCdhbHQnKSkpIHtcclxuICAgICAgICAgICAgICAgICRpbWcucmVwbGFjZVdpdGgoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0thcHBhJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBUd2l0Y2ggZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZFR3aXRjaEVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL3R3aXRjaGVtb3Rlcy5jb20vYXBpX2NhY2hlL3YyL2dsb2JhbC5qc29uJyk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICB4aHIudGltZW91dCA9IDUwMDA7XHJcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnaHR0cHM6Ly9zdGF0aWMtY2RuLmp0dm53Lm5ldC9lbW90aWNvbnMvdjEvJztcclxuXHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVGV4dCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZW1vdGVEaWMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW1vdGUgaW4gZW1vdGVEaWMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbZW1vdGVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBlbW90ZURpY1tlbW90ZV1bJ2ltYWdlX2lkJ10gKyAnLycgKyAnMS4wJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIFR3aXRjaCBzdWJzY3JpYmVyIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRTdWJFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly90d2l0Y2hlbW90ZXMuY29tL2FwaV9jYWNoZS92Mi9zdWJzY3JpYmVyLmpzb24nKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIHhoci50aW1lb3V0ID0gNTAwMDtcclxuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICdodHRwczovL3N0YXRpYy1jZG4uanR2bncubmV0L2Vtb3RpY29ucy92MS8nO1xyXG5cclxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0ID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbW90ZURpYyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2NoYW5uZWxzJ107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoYW5uZWwgaW4gZW1vdGVEaWMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZW1vdGVEaWNbY2hhbm5lbF1bJ2Vtb3RlcyddKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpY3QgPSBlbW90ZURpY1tjaGFubmVsXVsnZW1vdGVzJ11baV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGRpY3RbJ2NvZGUnXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVtb3RlLmlzVmFsaWRFbW90ZShjb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbY29kZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZGljdFsnaW1hZ2VfaWQnXSArICcvJyArICcxLjAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgQlRUViBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkQlRUVkVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL2FwaS5iZXR0ZXJ0dHYubmV0LzIvZW1vdGVzJyk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICB4aHIudGltZW91dCA9IDUwMDA7XHJcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnaHR0cHM6Ly9jZG4uYmV0dGVydHR2Lm5ldC9lbW90ZS8nO1xyXG5cclxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWJ10ubG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0ID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbW90ZUxpc3QgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZUxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVMaXN0W2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghRW1vdGUuY29udGFpbnNEaXNhbGxvd2VkQ2hhcihkaWN0Wydjb2RlJ10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2RpY3RbJ2NvZGUnXV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBkaWN0WydpZCddICsgJy8nICsgJzF4J1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBCVFRWIGNoYW5uZWwgZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZEJUVFZDaGFubmVsRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjaGFubmVscyA9IGdldE9wdGlvbnMoKVsnQlRUVkNoYW5uZWxzJ107XHJcbiAgICAgICAgY29uc3QgY29tbWFDaGFubmVscyA9IGNoYW5uZWxzLnJlcGxhY2UoL1xccysvZywgJycpLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgbGV0IGNoYW5uZWxzTGVuZ3RoID0gY29tbWFDaGFubmVscy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNvbW1hQ2hhbm5lbHMuZm9yRWFjaChmdW5jdGlvbiAoY2hhbm5lbCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoYW5uZWwudHJpbSgpID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgY2hhbm5lbHNMZW5ndGgtLTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCA+PSBjaGFubmVsc0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLmJldHRlcnR0di5uZXQvMi9jaGFubmVscy8nICsgY2hhbm5lbCk7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgICAgIHhoci50aW1lb3V0ID0gNTAwMDtcclxuICAgICAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnaHR0cHM6Ly9jZG4uYmV0dGVydHR2Lm5ldC9lbW90ZS8nO1xyXG5cclxuICAgICAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCA+PSBjaGFubmVsc0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50ID49IGNoYW5uZWxzTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQgPj0gY2hhbm5lbHNMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZVRleHQgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGVtb3RlTGlzdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2Vtb3RlcyddO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZUxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGljdCA9IGVtb3RlTGlzdFtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFFbW90ZS5jb250YWluc0Rpc2FsbG93ZWRDaGFyKGRpY3RbJ2NvZGUnXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2RpY3RbJ2NvZGUnXV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZGljdFsnaWQnXSArICcvJyArICcxeCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBjaGFubmVsICsgJyAoYnR0diknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBJY2UncyBvbGQgc3Vic2NyaWJlciBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkSWNlRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzdWJUaWVyRW1vdGVzID0ge1xyXG4gICAgICAgICAgICAxOiBbXHJcbiAgICAgICAgICAgICAgICAncHVycGxlMScsICdwdXJwbGUyJywgJ3B1cnBsZTMnLCAncHVycGxlNCcsICdwdXJwbGVBaGhoJywgJ3B1cnBsZUFybTEnLCAncHVycGxlQXJtMicsICdwdXJwbGVCbHVlc2NyZWVuJywgJ3B1cnBsZUJydWgnLCAncHVycGxlQ2lncmlwJywgJ3B1cnBsZUNsYXVzJyxcclxuICAgICAgICAgICAgICAgICdwdXJwbGVDb29sc3RvcnknLCAncHVycGxlQ3JlZXAnLCAncHVycGxlRW56YScsICdwdXJwbGVGYWtlJywgJ3B1cnBsZVJlYWwnLCAncHVycGxlRnJhbmsnLCAncHVycGxlRnJvJywgJ3B1cnBsZUljZScsICdwdXJwbGVLS29uYScsICdwdXJwbGVMVUwnLFxyXG4gICAgICAgICAgICAgICAgJ3B1cnBsZU9tZycsICdwdXJwbGVQcmlkZScsICdwdXJwbGVSb2ZsJywgJ3B1cnBsZUxlbycsICdwdXJwbGVXJywgJ3B1cnBsZVdhdCdcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgMjogW1xyXG4gICAgICAgICAgICAgICAgJ3B1cnBsZUN4JywgJ3B1cnBsZUxld2QnLCAncHVycGxlTGFtYScsICdwdXJwbGVQaXp6YScsICdwdXJwbGVXYWxsZXQnLCAncHVycGxlUycsICdwdXJwbGVMYXRlJywgJ3B1cnBsZU1vb3NlJywgJ3B1cnBsZU5vc2UnLCAncHVycGxlV3V0J1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAzOiBbXHJcbiAgICAgICAgICAgICAgICAncHVycGxlQWxsZW4nXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IoY29uc3QgdGllciBpbiBzdWJUaWVyRW1vdGVzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViVGllckVtb3Rlc1t0aWVyXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW3N1YlRpZXJFbW90ZXNbdGllcl1baV1dID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9lbW90ZXMvJyArIHN1YlRpZXJFbW90ZXNbdGllcl1baV0gKyAnLnBuZycpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpZXI6IHRpZXJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGV4dCBpcyBhIHZhbGlkIGVtb3RlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNWYWxpZEVtb3RlKHRleHQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICEodGV4dFswXS5tYXRjaCgvW0EtWl0vZykgfHxcclxuICAgICAgICAgICAgdGV4dC5tYXRjaCgvXlthLXpdKyQvZykgfHxcclxuICAgICAgICAgICAgdGV4dC5tYXRjaCgvXlxcZCokL2cpXHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGV4dCBjb250YWlucyBkaXNhbGxvd2VkIGNoYXJhY3RlcnMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gd29yZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY29udGFpbnNEaXNhbGxvd2VkQ2hhcih3b3JkKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAoY29uc3QgYyBpbiBESVNBTExPV0VEX0NIQVJTKSB7XHJcbiAgICAgICAgICAgIGlmICh3b3JkLmluZGV4T2YoYykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbn07XHJcblxyXG5FbW90ZS5zdGF0ZXMgPSB7XHJcbiAgICB0d2l0Y2g6IHtcclxuICAgICAgICBsb2FkZWQ6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgc3ViOiB7XHJcbiAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIEJUVFY6IHtcclxuICAgICAgICBsb2FkZWQ6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgQlRUVkNoYW5uZWxzOiB7XHJcbiAgICAgICAgbG9hZGVkOiBmYWxzZSxcclxuICAgICAgICBsb2FkZWRDb3VudDogMFxyXG4gICAgfVxyXG59O1xyXG5cclxuRW1vdGUuZW1vdGVzID0ge307XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZW1vdGUuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xyXG5pbXBvcnQgU3Vic2NyaWJlcnMgZnJvbSAnLi9zdWJzY3JpYmVycyc7XHJcbmltcG9ydCBNZW50aW9uSGlnaGxpZ2h0IGZyb20gJy4vbWVudGlvbkhpZ2hsaWdodCc7XHJcblxyXG4vKipcclxuICogQmluZHMgY2hhdCBtdXRhdGlvbiBvYnNlcnZlciBhbmQgbGlzdGVuIGZvciBuZXcgY2hhdCBtZXNzYWdlcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoYXRPYnNlcnZlcigpXHJcbntcclxuICAgIC8qKiBMb29wIG92ZXIgZXhpc3RpbmcgbWVzc2FnZXMgYW5kIGFkZCBiYWRnZXMgKi9cclxuICAgICQoZG9jdW1lbnQpLm9uKCdET01Ob2RlSW5zZXJ0ZWQnLCAkKCcjY2hhdCcpLnBhcmVudCgpLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuZmluZCgnaW1nJykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBMaXN0ZW4gZm9yIHNlbGYtYXZhdGFyIGxvYWQgYW5kIHNldCBzZWxmLWluZm8gKi9cclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuZmluZCgnI2F2YXRhcicpLmxlbmd0aCAhPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgJChlLnRhcmdldCkuZmluZCgnI2F2YXRhcicpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nU3JjID0gJCh0aGlzKS5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW1nU3JjLmluY2x1ZGVzKCdodHRwczovLycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgU3Vic2NyaWJlcnMuc2V0U2VsZkluZm8oaW1nU3JjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mICQoZS50YXJnZXQpLmZpbmQoJyNhdXRob3ItcGhvdG8nKVswXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU3Vic2NyaWJlcnMuYWRkQmFkZ2VzKGUudGFyZ2V0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdHlsZS1zY29wZSAueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpO1xyXG5cclxuICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgc2V0VGltZW91dChjaGF0T2JzZXJ2ZXIsIDI1MCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoYXQgYm94IG9ic2VydmVyXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcclxuXHJcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdOb2RlcyA9IG11dGF0aW9uLmFkZGVkTm9kZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3Tm9kZXMgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCAkbm9kZXMgPSAkKG5ld05vZGVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRub2RlID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkbm9kZS5oYXNDbGFzcygneXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE1lbnRpb25IaWdobGlnaHQoJG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3RlQ2hlY2soJG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXHJcbiAgICAgICAgYXR0cmlidXRlczogZmFsc2UsXHJcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NoYXRPYnNlcnZlci5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRW1vdGUgZnJvbSAnLi9lbW90ZSc7XHJcbmltcG9ydCBkb25hdGVCdXR0b24gZnJvbSAnLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbic7XHJcbmltcG9ydCBzcG9uc29yQnV0dG9uIGZyb20gJy4vb3ZlcmxheS9zcG9uc29yQnV0dG9uJztcclxuaW1wb3J0IGNvbG9yQnV0dG9uIGZyb20gJy4vb3ZlcmxheS9jb2xvckJ1dHRvbic7XHJcbmltcG9ydCBjaGVja0lmV2F0Y2hpbmdMaXZlIGZyb20gJy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlJztcclxuaW1wb3J0IEFsd2F5c1Njcm9sbERvd24gZnJvbSAnLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24nO1xyXG5pbXBvcnQgU3BvbnNvckNoZWNrIGZyb20gJy4vb3ZlcmxheS9zcG9uc29yQ2hlY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZUNoZWNrXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHVzZXIgaXMgd2F0Y2hpbmcgZnJvbSB3cm9uZyBsaXZlc3RyZWFtIHBhZ2UgYW5kIHdhcm5zIHRoZW0uXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB5b3V0dWJlR2FtaW5nKClcclxuICAgIHtcclxuICAgICAgICAvLyBSdW4gY2hlY2tzIGluIHN0ZXBzIHNvIHdlJ3JlIG5vdCBjYWxsaW5nIG1ldGhvZHMgdW5uZWNlc3NhcmlseVxyXG4gICAgICAgIGNvbnN0IHVybCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIXVybC5pbmNsdWRlcygnZ2FtaW5nLnlvdXR1YmUnKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXZlLWNoYXQtaWZyYW1lJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihpZnJhbWUpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgJHRleHRXcmFwcGVyID0gJCgnLnl0LXVzZXItaW5mbycpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9ICR0ZXh0V3JhcHBlci5maW5kKCdhJykudGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih0ZXh0ID09PSAnSWNlIFBvc2VpZG9uJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVkaXJlY3RDb25maXJtID0gY29uZmlybSgnW0ljZSBQb3NlaWRvblRWXSBHbyB0byB0aGUgb2ZmaWNpYWwgSWNlIFBvc2VpZG9uIGxpdmVzdHJlYW0gcGFnZT8nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZGlyZWN0Q29uZmlybSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnaHR0cHM6Ly9nYW1pbmcueW91dHViZS5jb20vaWNlX3Bvc2VpZG9uL2xpdmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdXNlciBpcyB3YXRjaGluZyBhIGxpdmVzdHJlYW0gb24gWW91dHViZSBnYW1pbmcuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsaXZlc3RyZWFtUGFnZSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gUnVuIGNoZWNrcyBpbiBzdGVwcyBzbyB3ZSdyZSBub3QgY2FsbGluZyBtZXRob2RzIHVubmVjZXNzYXJpbHlcclxuICAgICAgICBjb25zdCB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvd25lcicpO1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSAkKHRhcmdldCkuZmluZCgnc3BhbicpLnRleHQoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZighdXJsLmluY2x1ZGVzKCdsaXZlX2NoYXQnKSAmJiAhdXJsLmluY2x1ZGVzKCdpc19wb3BvdXQ9MScpKXtcclxuICAgICAgICAgICAgY29uc3QgY2hhdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGF0Jyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighdGFyZ2V0IHx8ICFjaGF0KXtcclxuICAgICAgICAgICAgICAgIFBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzKys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzIDwgNSlcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KFBhZ2VDaGVjay5saXZlc3RyZWFtUGFnZSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cdFx0XHJcbiAgICAgICAgaWYodGV4dCA9PT0gJ0ljZSBQb3NlaWRvbicpIHtcclxuICAgICAgICAgICAgZG9uYXRlQnV0dG9uKCk7XHJcbiAgICAgICAgICAgIHNwb25zb3JCdXR0b24oKTtcclxuICAgICAgICAgICAgY29sb3JCdXR0b24oKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChTcG9uc29yQ2hlY2suY2hlY2ssIDI1MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgRW1vdGUubG9hZEVtb3RlcygpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaW5pdCgpO1xyXG4gICAgICAgIGNoZWNrSWZXYXRjaGluZ0xpdmUoKTtcclxuXHJcbiAgICAgICAgUGFnZUNoZWNrLnN0cmVhbXBhZ2VDaGVja3MgPSAwO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHVzZXIgaXMgd2F0Y2hpbmcgYSBsaXZlc3RyZWFtLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNMaXZlc3RyZWFtKCkge1xyXG4gICAgICAgIGNvbnN0IGxpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXRwLWxpdmUtYmFkZ2UueXRwLWJ1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IGNoYXRBcHAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd5dC1saXZlLWNoYXQtYXBwJyk7XHJcbiAgICAgICAgY29uc3QgY2hhdGlGcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXZlLWNoYXQtaWZyYW1lJyk7XHJcbiAgICAgICAgY29uc3QgY2hhdEhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55dC1saXZlLWNoYXQtaGVhZGVyLXJlbmRlcmVyJyk7XHJcblxyXG4gICAgICAgIC8vIFRoYW5rcyBTdGFja092ZXJmbG93ISBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDIwMDA0L2FjY2Vzcy1wYXJlbnQtdXJsLWZyb20taWZyYW1lXHJcbiAgICAgICAgdmFyIHVybCA9ICh3aW5kb3cubG9jYXRpb24gIT0gd2luZG93LnBhcmVudC5sb2NhdGlvbilcclxuICAgICAgICAgICAgPyBkb2N1bWVudC5yZWZlcnJlclxyXG4gICAgICAgICAgICA6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XHJcblxyXG5cclxuICAgICAgICB2YXIgdXJsQ2hlY2sgPSAodXJsLmluZGV4T2YoJ2ljZXBvc2VpZG9uLmNvbScpID4gLTEpO1xyXG4gICAgICAgIHZhciBsaXZlQnV0dG9uQ2hlY2sgPSAoZG9jdW1lbnQuYm9keS5jb250YWlucyhsaXZlQnV0dG9uKSAmJiAhbGl2ZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpO1xyXG4gICAgICAgIHZhciBjaGF0Q2hlY2sgPSAoZG9jdW1lbnQuYm9keS5jb250YWlucyhjaGF0QXBwKSB8fCBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGNoYXRpRnJhbWUpIHx8IGRvY3VtZW50LmJvZHkuY29udGFpbnMoY2hhdEhlYWRlcikpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiVVJMIENIRUNLOlwiLCB1cmxDaGVjaywgdXJsKTtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiTElWRSBCVVRUT04gQ0hFQ0s6XCIsIGxpdmVCdXR0b25DaGVjayk7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkNIQVQgRVhJU1RTIENIRUNLOlwiLCBjaGF0Q2hlY2spO1xyXG5cclxuICAgICAgICBpZiAodXJsQ2hlY2sgfHwgbGl2ZUJ1dHRvbkNoZWNrIHx8IGNoYXRDaGVjaykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiSVMgTElWRVNUUkVBTSFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJJUyBOT1QgTElWRVNUUkVBTVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHVzZXIgaXMgd2F0Y2hpbmcgYW4gSWNlIFBvc2VpZG9uIGxpdmVzdHJlYW0uXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0ljZVBvc2VpZG9uU3RyZWFtKCkge1xyXG4gICAgICAgIC8vIFRoYW5rcyBTdGFja092ZXJmbG93ISBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDIwMDA0L2FjY2Vzcy1wYXJlbnQtdXJsLWZyb20taWZyYW1lXHJcbiAgICAgICAgdmFyIHVybCA9ICh3aW5kb3cubG9jYXRpb24gIT0gd2luZG93LnBhcmVudC5sb2NhdGlvbilcclxuICAgICAgICAgICAgPyBkb2N1bWVudC5yZWZlcnJlclxyXG4gICAgICAgICAgICA6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgdmFyIFlUR2NoYW5uZWwgPSAkKFwieXRnLW93bmVyLWJhZGdlc1wiKS5wYXJlbnQoKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgdmFyIFlUY2hhbm5lbCAgPSAkKFwiYS55dGQtdmlkZW8tb3duZXItcmVuZGVyZXJcIikuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICB2YXIgd2hpdGVsaXN0ZWRDaGFubmVscyA9IFtcclxuICAgICAgICAgICAgXCIvY2hhbm5lbC9VQ3Y5RWRsX1didGJQZVVSUHRGRG8tdUFcIiwgLy8gSWNlIFBvc2VpZG9uXHJcbiAgICAgICAgICAgIFwiL2NoYW5uZWwvVUNweEF2OGkwTVRQb2NpN0k3YUZOeFpnXCIsIC8vIEdlb3JnZSBBbGxlblxyXG4gICAgICAgICAgICBcIi9jaGFubmVsL1VDYURKX0RUejNrYm5lTVdpVjMxWWlGQVwiLCAvLyBBbnNpZW4gMTIgLyBhbmRyaWVzX2RldlxyXG4gICAgICAgICAgICBcIi9jaGFubmVsL1VDVG1ySFFFRUZEWVB5NTFtVWcwSnBqQVwiLCAvLyB4Qnl0M3pcclxuICAgICAgICAgICAgXCIvY2hhbm5lbC9VQzFFelpPVzF0VkVLMnZqbWJTbzEzN0FcIiAgLy8geEJ5dDN6IElQVFYgdGVzdGluZyBzdHJlYW1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB2YXIgdXJsQ2hlY2sgPSAodXJsLmluZGV4T2YoJ2ljZXBvc2VpZG9uLmNvbScpID4gLTEgfHwgdXJsLmluZGV4T2YoJ2xpdmVfY2hhdCcpID4gLTEpO1xyXG4gICAgICAgIHZhciBjaGFubmVsQ2hlY2sgPSAod2hpdGVsaXN0ZWRDaGFubmVscy5pbmRleE9mKFlUR2NoYW5uZWwpID4gLTEgfHwgd2hpdGVsaXN0ZWRDaGFubmVscy5pbmRleE9mKFlUY2hhbm5lbCkgPiAtMSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJVUkwgQ0hFQ0s6XCIsIHVybENoZWNrLCB1cmwpO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJDSEFOTkVMIENIRUNLOlwiLCBjaGFubmVsQ2hlY2ssIFlUR2NoYW5uZWwsIFlUY2hhbm5lbCk7XHJcblxyXG4gICAgICAgIGlmICh1cmxDaGVjayB8fCBjaGFubmVsQ2hlY2spIHtcclxuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIklTIElDRVBPU0VJRE9OIFNUUkVBTSFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJJUyBOT1QgSUNFUE9TRUlET04gU1RSRUFNIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzID0gMDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wYWdlQ2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0T3B0aW9ucyB9IGZyb20gJy4vbWFpbic7XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBtZW50aW9uIGFuZCBjaGFuZ2VzIGJhY2tncm91bmQgdG8gQlRUViBzdHlsZSBiYWNrZ3JvdW5kLlxyXG4gKiBAcGFyYW0ge25vZGV9IG5vZGUgLSBNZXNzYWdlIG5vZGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1lbnRpb25IaWdobGlnaHQobm9kZSlcclxue1xyXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSAkKCcjYXV0aG9yICNhdXRob3ItbmFtZScpLnRleHQoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgYXV0aG9yVHlwZSA9IG5vZGUuZ2V0KDApLmdldEF0dHJpYnV0ZSgnYXV0aG9yLXR5cGUnKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGN1cnJlbnRVc2VyID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZ2V0T3B0aW9ucygpWydtZW50aW9uSGlnaGxpZ2h0J10gJiYgY3VycmVudFVzZXIubGVuZ3RoID4gMiAmJiAhbm9kZS5oYXNDbGFzcygneXQtbGl2ZS1jaGF0LWxlZ2FjeS1wYWlkLW1lc3NhZ2UtcmVuZGVyZXItMCcpKSB7IC8vIENoZWNrIGl0J3Mgbm90IHNwb25zb3IgLyBzdXBlcmNoYXQsIGFsc28gbWVudGlvbkhpZ2hsaWdodCBlbmFibGVkXHJcblxyXG4gICAgICAgIGNvbnN0IHVuaXF1ZWlkID0gbm9kZS5nZXQoMCkuZ2V0QXR0cmlidXRlKCdpZCcpOyAvLyBDb3B5IHVuaXF1ZSBtZXNzYWdlIGlkXHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IChcIiBcIiArIG5vZGUuZmluZCgnI21lc3NhZ2UnKS50ZXh0KCkudG9Mb3dlckNhc2UoKSArIFwiIFwiKS5yZXBsYWNlKC9bXFx1MjAwQi1cXHUyMDBEXFx1RkVGRl0vZywgJycpO1xyXG5cclxuICAgICAgICBpZiAodW5pcXVlaWQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHVuaXF1ZWlkLmxlbmd0aCA+IDMwICYmIChhdXRob3JUeXBlID09PSBcIm93bmVyXCIgfHwgbWVzc2FnZS5pbmRleE9mKCcgJytjdXJyZW50VXNlcisnICcpICE9PSAtMSB8fCBtZXNzYWdlLmluZGV4T2YoJ0AnK2N1cnJlbnRVc2VyKycgJykgIT09IC0xKSkgeyAvLyBJZiB5b3VyIG5hbWUgaXMgaW4gdGhlIG1lc3NhZ2UsIGFuZCBpdCdzIG5vdCB5b3VyIG1lc3NhZ2Ugb3IgdGhlIG1lc3NhZ2UgaXMgZnJvbSB0aGUgc3RyZWFtZXJcclxuICAgICAgICAgICAgbm9kZS5nZXQoMCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDI1NSwwLDAsMC40MClcIjtcclxuICAgICAgICAgICAgbm9kZS5maW5kKCcjYXV0aG9yLW5hbWUnKS5nZXQoMCkuc3R5bGUuY29sb3IgPSBcIiNmZmZmZmZcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWVudGlvbkhpZ2hsaWdodC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBTQ1JPTExfRU5BQkxFRF9VUkwsIFNDUk9MTF9ESVNBQkxFRF9VUkwgfSBmcm9tICcuLy4uL21haW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWx3YXlzU2Nyb2xsRG93blxyXG57XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgJ0Fsd2F5cyBzY3JvbGwgZG93bicgb3ZlcmxheSBhbmQgYmluZHMgdGhlIG5lY2Vzc2FyeSBsaXN0ZW5lcnMuXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbGRvd25XcmFwcGVyID0gJCgnLmlwdHYtc2Nyb2xsZG93bi13cmFwcGVyJyk7XHJcblxyXG4gICAgICAgIGlmIChzY3JvbGxkb3duV3JhcHBlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2Nyb2xsZG93bldyYXBwZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzY3JvbGxXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIHNjcm9sbFdyYXBwZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0Fsd2F5cyBzY3JvbGwgZG93biAoRW5hYmxlZCknKTtcclxuICAgICAgICBzY3JvbGxXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2hpbnQtLXRvcCcsICdpcHR2LXNjcm9sbGRvd24td3JhcHBlcicpO1xyXG5cclxuICAgICAgICAkKHNjcm9sbFdyYXBwZXIpLmNzcyh7XHJcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICdyaWdodCc6ICcxMTNweCcsXHJcbiAgICAgICAgICAgICdib3R0b20nOiAnMThweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChzY3JvbGxXcmFwcGVyKS5odG1sKGBcclxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaXB0di1zY3JvbGxkb3duLXRvZ2dsZVwiIHN0eWxlPVwib3V0bGluZTogMDtcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtTQ1JPTExfRU5BQkxFRF9VUkx9XCIgYWx0PVwiQWx3YXlzIHNjcm9sbCBkb3duXCIgaGVpZ2h0PVwiMTFcIiB3aWR0aD1cIjExXCIgY2xhc3M9XCJpcHR2LXNjcm9sbGRvd24tdG9nZ2xlLWljb25cIj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgIGApO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbFdyYXBwZXIpO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmlwdHYtc2Nyb2xsZG93bi10b2dnbGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi50b2dnbGVTY3JvbGxEb3duKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoQWx3YXlzU2Nyb2xsRG93bi5pbnRlcnZhbCk7XHJcblxyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICQoJyNpdGVtLXNjcm9sbGVyJykuc2Nyb2xsVG9wKDk5OTk5OTk5OSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmhpZGVTY3JvbGxPbkNpbmVtYShzY3JvbGxXcmFwcGVyKTtcclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmhpZGVTY3JvbGxPblNwb25zb3JNZW51KHNjcm9sbFdyYXBwZXIpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbExpc3RlbmVyKCk7XHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsRG93bkxpc3RlbmVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZXMgdGhlICdBbHdheXMgc2Nyb2xsIGRvd24nIG92ZXJsYXkgd2hlbiBjaW5lbWEgbW9kZSBpcyBvcGVuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge25vZGV9IHNjcm9sbFdyYXBwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhpZGVTY3JvbGxPbkNpbmVtYShzY3JvbGxXcmFwcGVyKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHdhdGNoUGFnZSA9ICd5dGctd2F0Y2gtcGFnZSc7XHJcblxyXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XHJcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKG0udGFyZ2V0KS5pcygnW3NpZGViYXItY29sbGFwc2VkXScpID8gJChzY3JvbGxXcmFwcGVyKS5oaWRlKCkgOiAkKHNjcm9sbFdyYXBwZXIpLnNob3coKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9ic2VydmVyT3B0cyA9IHtcclxuICAgICAgICAgICAgY2hpbGRMaXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIHN1YnRyZWU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnc2lkZWJhci1jb2xsYXBzZWQnXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGFkZE9ic2VydmVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoJCh3YXRjaFBhZ2UpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSgkKHdhdGNoUGFnZSlbMF0sIG9ic2VydmVyT3B0cyk7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGFkZE9ic2VydmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDI1MCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZXMgdGhlICdBbHdheXMgc2Nyb2xsIGRvd24nIG92ZXJsYXkgd2hlbiBzcG9uc29yIG1lbnUgaXMgb3Blbi5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bm9kZX0gc2Nyb2xsV3JhcHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGlkZVNjcm9sbE9uU3BvbnNvck1lbnUoc2Nyb2xsV3JhcHBlcilcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjaGF0SW5wdXRSZW5kZXJlciA9ICd5dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlcic7XHJcblxyXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xyXG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJChtLnRhcmdldCkuYXR0cignY3JlYXRvci1vcGVuJykgPyAkKHNjcm9sbFdyYXBwZXIpLmhpZGUoKSA6ICQoc2Nyb2xsV3JhcHBlcikuc2hvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJPcHRzID0ge1xyXG4gICAgICAgICAgICBjaGlsZExpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydjcmVhdG9yLW9wZW4nXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3BvbnNvckNsaWNrID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoJChjaGF0SW5wdXRSZW5kZXJlcikubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKCQoY2hhdElucHV0UmVuZGVyZXIpWzBdLCBvYnNlcnZlck9wdHMpO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzcG9uc29yQ2xpY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMjUwKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBmdW5jdGlvbmFsaXR5IHdoZW4gc2Nyb2xsaW5nIG1hbnVhbGx5LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYmluZFNjcm9sbExpc3RlbmVyKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlbS1zY3JvbGxlcicpO1xyXG5cclxuICAgICAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsTGlzdGVuZXIoKSB9LCAyNTApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcjaXRlbS1zY3JvbGxlcicpLm9uKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24oZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcjaXRlbS1zY3JvbGxlcicpLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYoZXZlbnQudGFyZ2V0ID09PSB0aGlzKSB7XHJcbiAgICAgICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24oZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5hYmxlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBmdW5jdGlvbmFsaXR5IHdoZW4gYmx1ZSBqdW1wIGRvd24gYnV0dG9uIGlzIGNsaWNrZWQuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBiaW5kU2Nyb2xsRG93bkxpc3RlbmVyKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1tb3JlJyk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHsgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsRG93bkxpc3RlbmVyKCkgfSwgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFyZ2V0Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24odHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlIHNjcm9sbERvd24gc3RhdGUgYW5kIGFkanVzdCBvdmVybGF5IGFjY29yZGluZ2x5LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdG9nZ2xlU2Nyb2xsRG93bihzdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSAhQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9IHN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLmlwdHYtc2Nyb2xsZG93bi13cmFwcGVyJykuYXR0cignYXJpYS1sYWJlbCcsIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA/ICdBbHdheXMgc2Nyb2xsIGRvd24gKEVuYWJsZWQpJyA6ICdBbHdheXMgc2Nyb2xsIGRvd24gKERpc2FibGVkKScpO1xyXG4gICAgICAgICQoJy5pcHR2LXNjcm9sbGRvd24tdG9nZ2xlLWljb24nKS5hdHRyKCdzcmMnLCBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPyBTQ1JPTExfRU5BQkxFRF9VUkwgOiBTQ1JPTExfRElTQUJMRURfVVJMKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5BbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSB0cnVlO1xyXG5BbHdheXNTY3JvbGxEb3duLmludGVydmFsID0gbnVsbDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIENoZWNrcyBpZiB1c2VyIGlzIGJlaGluZCBpbiBsaXZlc3RyZWFtIGFuZCB3YXJucyB0aGVtLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tJZldhdGNoaW5nTGl2ZSgpIHtcclxuXHJcbiAgICBsZXQgbGl2ZUNoZWNrSW50ZXJ2YWwgPSBudWxsO1xyXG5cclxuICAgIGxpdmVDaGVja0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGNvbnN0ICRsaXZlQnV0dG9uID0gJCgnLnl0cC1saXZlLWJhZGdlLnl0cC1idXR0b24nKTtcclxuXHJcbiAgICAgICAgaWYgKCRsaXZlQnV0dG9uLmlzKCc6ZW5hYmxlZCcpICYmICRsaXZlQnV0dG9uLmlzKCc6dmlzaWJsZScpICYmICQoJy5pcHR2LWxpdmUtd2FybmluZycpLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgJCgnI3BsYXllci1jb250YWluZXInKS5hcHBlbmQoYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgWW91XFwncmUgd2F0Y2hpbmcgb2xkIGZvb3RhZ2UsIGNsaWNrIHRoZSBMSVZFIGJ1dHRvbiBpbiB0aGUgYm90dG9tIGxlZnQgY29ybmVyIHRvIHdhdGNoIGxpdmUuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLWRpc21pc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctY2xvc2VcIj7inJU8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMTUgKiAxMDAwKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmlwdHYtbGl2ZS13YXJuaW5nLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmlwdHYtbGl2ZS13YXJuaW5nJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsaXZlQ2hlY2tJbnRlcnZhbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignbW91c2Vkb3duJywgJy55dHAtbGl2ZS1iYWRnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5pcHR2LWxpdmUtd2FybmluZycpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBBZGRzIG5ldyBjb2xvciBjaGFuZ2UgYnV0dG9uIHRvIGxpdmVzdHJlYW0gcGFnZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yQnV0dG9uKClcclxue1xyXG4gICAgY29uc3QgY29sb3JJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9wZW5jaWwtaWNvbi5wbmcnKTtcclxuICAgIGNvbnN0IGNvbG9ySW1hZ2UgPSBgPGltZyBzcmM9XCIke2NvbG9ySWNvbn1cIiBhbHQ9XCJzdGFyXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czogbm9uZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4MCU7IGhlaWdodDo4MCU7IG1hcmdpbi1yaWdodDogMnB4O1wiPmA7XHJcblxyXG4gICAgY29uc3QgY29sb3JCdXR0b24gPSBgXHJcbiAgICAgICAgPGlwdHYtY29sb3ItYnV0dG9uIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiIHJhaXNlZD1cIlwiIHN1cHBvcnRlZC1jb2xkLWxvYWQtYWN0aW9ucz1cIlsmcXVvdDtjb2xvciZxdW90O11cIiB3YWl0LWZvci1zaWduYWw9XCJ3YXRjaC1wYWdlLWluaXRpYWxpemVkXCIgY2xhc3M9XCJzdHlsZS1zY29wZSB5dGctd2F0Y2gtZm9vdGVyIHgtc2NvcGUgaXB0di1jb2xvci1idXR0b24tMFwiPlxyXG4gICAgICAgICAgICA8aXJvbi1zaWduYWxzIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b25cIj48L2lyb24tc2lnbmFscz5cclxuICAgICAgICAgICAgPHBhcGVyLWJ1dHRvbiBzdHlsZT1cImNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kLWNvbG9yOiAjMGY5ZDU4OyBtaW4td2lkdGg6IDA7XCIgY2xhc3M9XCJlbmFibGVkIHN0eWxlLXNjb3BlIGlwdHYtY29sb3ItYnV0dG9uIHgtc2NvcGUgcGFwZXItYnV0dG9uLTBcIiByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCIgYW5pbWF0ZWQ9XCJcIiBhcmlhLWRpc2FibGVkPVwiZmFsc2VcIiBlbGV2YXRpb249XCIxXCIgcmFpc2VkPVwiXCIgYXJpYS1sYWJlbD1cIkNIQU5HRSBOQU1FIENPTE9SXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWp1c3RpZmllZCBzdHlsZS1zY29wZSBpcHR2LWNvbG9yLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMjRweDsgaGVpZ2h0OiAyNHB4O1wiIGNsYXNzPVwiaWNvbi1jb250YWluZXIgbGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LWNvbG9yLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8eXQtaWNvbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtY29sb3ItYnV0dG9uIHgtc2NvcGUgeXQtaWNvbi0wXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwveXQtaWNvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpcHR2LWZvcm1hdHRlZC1zdHJpbmcgaWQ9XCJ0ZXh0XCIgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItY2VudGVyIHN0eWxlLXNjb3BlIGlwdHYtY29sb3ItYnV0dG9uXCIgc3R5bGU9XCJtYXJnaW46IDAgM3B4XCI+PHNwYW4gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWZvcm1hdHRlZC1zdHJpbmdcIj5DSEFOR0UgTkFNRSBDT0xPUjwvc3Bhbj48L2lwdHYtZm9ybWF0dGVkLXN0cmluZz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L3BhcGVyLWJ1dHRvbj5cclxuICAgICAgICA8L2lwdHYtY29sb3ItYnV0dG9uPmA7XHJcblxyXG4gICAgJCgnLmlwdHYtc3BvbnNvci1idXR0b24tMCcpLmFmdGVyKGNvbG9yQnV0dG9uKTtcclxuXHJcbiAgICAkKGNvbG9yQnV0dG9uKS5yZWFkeSggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLmlwdHYtY29sb3ItYnV0dG9uLngtc2NvcGUueXQtaWNvbi0wJykuaHRtbChjb2xvckltYWdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1jb2xvci1idXR0b24tMCcpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly93d3cuaWNlcG9zZWlkb24uY29tL3Byb2ZpbGUnLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWNvbG9yLWJ1dHRvbi0wIHBhcGVyLWJ1dHRvbicpWzBdLmJsdXIoKTtcclxuICAgIH0pO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvY29sb3JCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIEFkZHMgZG9uYXRlIGJ1dHRvbiB0byBsaXZlc3RyZWFtIHBhZ2UuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb25hdGVCdXR0b24oKVxyXG57XHJcbiAgICAkKCcuaXB0di1kb25hdGUtYnV0dG9uLTAnKS5yZW1vdmUoKTtcclxuXHJcbiAgICBjb25zdCBkb25hdGVJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9kb25hdGUtaWNvbi5wbmcnKTtcclxuICAgIGNvbnN0IHNwb25zb3JJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9zcG9uc29yLWljb24ucG5nJyk7XHJcblxyXG4gICAgY29uc3Qgc3BvbnNvckltYWdlID0gYDxpbWcgc3JjPVwiJHtzcG9uc29ySWNvbn1cIiBhbHQ9XCJzdGFyXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czogbm9uZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCI+YDtcclxuXHJcbiAgICBjb25zdCBkb25hdGVCdXR0b24gPSBgXHJcbiAgICAgICAgPGlwdHYtZG9uYXRlLWJ1dHRvbiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiByYWlzZWQ9XCJcIiBzdXBwb3J0ZWQtY29sZC1sb2FkLWFjdGlvbnM9XCJbJnF1b3Q7c3BvbnNvciZxdW90O11cIiB3YWl0LWZvci1zaWduYWw9XCJ3YXRjaC1wYWdlLWluaXRpYWxpemVkXCIgY2xhc3M9XCJzdHlsZS1zY29wZSB5dGctd2F0Y2gtZm9vdGVyIHgtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uLTBcIj5cclxuICAgICAgICAgICAgPGlyb24tc2lnbmFscyBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPjwvaXJvbi1zaWduYWxzPlxyXG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uIHgtc2NvcGUgcGFwZXItYnV0dG9uLTBcIiByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCIgYW5pbWF0ZWQ9XCJcIiBhcmlhLWRpc2FibGVkPVwiZmFsc2VcIiBlbGV2YXRpb249XCIxXCIgcmFpc2VkPVwiXCIgYXJpYS1sYWJlbD1cIkRvbmF0ZSB0byBJY2VfUG9zZWlkb25cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItanVzdGlmaWVkIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMjRweDsgaGVpZ2h0OiAyNHB4O1wiIGNsYXNzPVwiaWNvbi1jb250YWluZXIgbGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHl0LWljb24gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC95dC1pY29uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCIgc3R5bGU9XCJtYXJnaW46IDAgM3B4XCI+PHNwYW4gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWZvcm1hdHRlZC1zdHJpbmdcIj5ET05BVEU8L3NwYW4+PC9pcHR2LWZvcm1hdHRlZC1zdHJpbmc+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9wYXBlci1idXR0b24+XHJcbiAgICAgICAgPC9pcHR2LWRvbmF0ZS1idXR0b24+YDtcclxuXHJcbiAgICBjb25zdCBkb25hdGVJbWFnZSA9IGA8aW1nIHNyYz1cIiR7ZG9uYXRlSWNvbn1cIiBhbHQ9XCJkb2xsYXItc2lnblwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPmA7XHJcblxyXG4gICAgLy8gSW5zZXJ0IGRvbmF0ZUJ1dHRvbiBuZXh0IHRvIHNwb25zb3JCdXR0b25cclxuICAgIGNvbnN0IHNwb25zb3JCdXR0b24gPSAnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24tMCc7XHJcblxyXG4gICAgJChzcG9uc29yQnV0dG9uKS5iZWZvcmUoZG9uYXRlQnV0dG9uKTtcclxuICAgICQoZG9uYXRlQnV0dG9uKS5yZWFkeSggZnVuY3Rpb24oKSB7ICQoJy5zdHlsZS1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24ueC1zY29wZS55dC1pY29uLTAnKS5odG1sKGRvbmF0ZUltYWdlKTsgfSk7XHJcblxyXG4gICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24tMCcpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly95b3V0dWJlLnN0cmVhbWxhYnMuY29tL2ljZXBvc2VpZG9uIy8nLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24tMCBwYXBlci1idXR0b24nKVswXS5ibHVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDaGFuZ2Ugc3BvbnNvckJ1dHRvbiBpY29uIHRvIHN0YXJcclxuICAgICQoYCR7c3BvbnNvckJ1dHRvbn0gLnN0eWxlLXNjb3BlLnl0Zy1tZW1iZXJzaGlwLW9mZmVyLWJ1dHRvbi54LXNjb3BlLnl0LWljb24tMGApLmh0bWwoc3BvbnNvckltYWdlKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIFNob3cgZW1vdGUgbG9hZGluZyBpbmZvcm1hdGlvbi5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRpbmdFbW90ZXNJbmZvKClcclxue1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgJChkaXYpLnRleHQoJ0xvYWRpbmcgZW1vdGVzLi4uJyk7XHJcblxyXG4gICAgJChkaXYpLmNzcyh7XHJcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxNnB4JyxcclxuICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICdyaWdodCc6ICcyNXB4JyxcclxuICAgICAgICAnYm90dG9tJzogJzc1cHgnLFxyXG4gICAgICAgICdjb2xvcic6ICcjZmZmJyxcclxuICAgICAgICAndGV4dC1zaGFkb3cnOiAnMnB4IDJweCAycHggcmdiYSgwLDAsMCwwLjc1KSdcclxuICAgIH0pO1xyXG5cclxuICAgICQoZGl2KS5hZGRDbGFzcygnaXB0di1sb2FkaW5nLWVtb3RlcycpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2xvYWRpbmdFbW90ZXNJbmZvLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQWRkcyBuZXcgc3BvbnNvciBidXR0b24gdG8gbGl2ZXN0cmVhbSBwYWdlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BvbnNvckJ1dHRvbigpXHJcbntcclxuICAgIGNvbnN0IHNwb25zb3JJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9zcG9uc29yLWljb24ucG5nJyk7XHJcbiAgICBjb25zdCBzcG9uc29ySW1hZ2UgPSBgPGltZyBzcmM9XCIke3Nwb25zb3JJY29ufVwiIGFsdD1cInN0YXJcIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIj5gO1xyXG5cclxuICAgIGNvbnN0IHNwb25zb3JCdXR0b24gPSBgXHJcbiAgICAgICAgPGlwdHYtc3BvbnNvci1idXR0b24gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgcmFpc2VkPVwiXCIgc3VwcG9ydGVkLWNvbGQtbG9hZC1hY3Rpb25zPVwiWyZxdW90O3Nwb25zb3ImcXVvdDtdXCIgd2FpdC1mb3Itc2lnbmFsPVwid2F0Y2gtcGFnZS1pbml0aWFsaXplZFwiIGNsYXNzPVwic3R5bGUtc2NvcGUgeXRnLXdhdGNoLWZvb3RlciB4LXNjb3BlIGlwdHYtc3BvbnNvci1idXR0b24tMFwiPlxyXG4gICAgICAgICAgICA8aXJvbi1zaWduYWxzIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvblwiPjwvaXJvbi1zaWduYWxzPlxyXG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvbiB4LXNjb3BlIHBhcGVyLWJ1dHRvbi0wXCIgcm9sZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiIGFuaW1hdGVkPVwiXCIgYXJpYS1kaXNhYmxlZD1cImZhbHNlXCIgZWxldmF0aW9uPVwiMVwiIHJhaXNlZD1cIlwiIGFyaWEtbGFiZWw9XCJTUE9OU09SIE9OIE9GRklDSUFMIFNJVEVcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItanVzdGlmaWVkIHN0eWxlLXNjb3BlIGlwdHYtc3BvbnNvci1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDI0cHg7IGhlaWdodDogMjRweDtcIiBjbGFzcz1cImljb24tY29udGFpbmVyIGxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8eXQtaWNvbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtc3BvbnNvci1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC95dC1pY29uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvblwiIHN0eWxlPVwibWFyZ2luOiAwIDNweFwiPjxzcGFuIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1mb3JtYXR0ZWQtc3RyaW5nXCI+U1BPTlNPUiBPTiBPRkZJQ0lBTCBTSVRFPC9zcGFuPjwvaXB0di1mb3JtYXR0ZWQtc3RyaW5nPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvcGFwZXItYnV0dG9uPlxyXG4gICAgICAgIDwvaXB0di1zcG9uc29yLWJ1dHRvbj5gO1xyXG5cclxuICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUueXRnLW1lbWJlcnNoaXAtb2ZmZXItYnV0dG9uLTAnKS5iZWZvcmUoc3BvbnNvckJ1dHRvbik7XHJcblxyXG4gICAgJChzcG9uc29yQnV0dG9uKS5yZWFkeSggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLmlwdHYtc3BvbnNvci1idXR0b24ueC1zY29wZS55dC1pY29uLTAnKS5odG1sKHNwb25zb3JJbWFnZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtc3BvbnNvci1idXR0b24tMCcpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly93d3cuaWNlcG9zZWlkb24uY29tLycsICdfYmxhbmsnKTtcclxuICAgICAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtc3BvbnNvci1idXR0b24tMCBwYXBlci1idXR0b24nKVswXS5ibHVyKCk7XHJcbiAgICB9KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L3Nwb25zb3JCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwb25zb3JDaGVja1xyXG57XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHVzZXIgaXMgc3RpbGwgdXNpbmcgb2xkIHNwb25zb3JzaGlwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjaGVjaygpXHJcbiAgICB7XHJcbiAgICAgICAgJC5nZXQoY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2NvbnRlbnQuaHRtbCcpLCBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAkKGRhdGEpLmFwcGVuZFRvKCdib2R5Jyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpbWdVcmwgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc3BvbnNvci1iZW5lZml0cy5wbmcnKTtcclxuICAgICAgICAgICAgJCgnLnNwb25zb3ItbW9kYWwgLnN1Yi1iZW5lZml0cycpLmF0dHIoJ3NyYycsIGltZ1VybCk7XHJcblxyXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNsb3NlLW1vZGFsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuc3BvbnNvci1tb2RhbCcpLmhpZGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSAkKCcueXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXItMCcpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3BvbnNvckJhZGdlID0gJChjb250YWluZXIpLmZpbmQoJy55dC1saXZlLWNoYXQtYXV0aG9yLWJhZGdlLXJlbmRlcmVyLTBbYXJpYS1sYWJlbD1cIlNwb25zb3JcIl0nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHNwb25zb3JCYWRnZSkubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuc3BvbnNvci1tb2RhbCcpLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L3Nwb25zb3JDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==
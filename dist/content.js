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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IPTVLoaded", function() { return IPTVLoaded; });
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

var IPTVLoaded = false;

function getOptions() {
    if (options === null) {
        return JSON.parse(localStorage.getItem('optionsCache'));
    }

    return options;
}

const onNewPageLoad = function () {

    $('[class^="iptv-"]').remove();
    $('.yt-live-chat-header-renderer#title').text('Chat');

    setTimeout(__WEBPACK_IMPORTED_MODULE_0__pageCheck__["a" /* default */].livestreamPage, 1E3);

    setTimeout(function () {
        if (__WEBPACK_IMPORTED_MODULE_0__pageCheck__["a" /* default */].isLivestream()) {
            init();
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
    if(!IPTVLoaded) {
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
        IPTVLoaded = true;
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

            if (typeof messageTier === 'undefined') {
                setTimeout(function() {
                    Emote.emoteCheck(node)
                }, 25);
                return;
            }

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
        const iframe = document.getElementById('live-chat-iframe');

        const $textWrapper = $('.yt-user-info');
        const text = $textWrapper.find('a').text();

        const url = document.location.href;

        if (text === 'Ice Poseidon' && !url.includes('gaming.youtube') && iframe) {

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

            if (PageCheck.streampageChecks < 5) {
                setTimeout(PageCheck.livestreamPage, 1000);
            }

            return false;
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


        var urlCheck = (url.indexOf('iceposeidon.com') > -1 || url.indexOf('iceposeidon.com') > -1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWYxMDlhYjM5YTA4ODk4ZDI1MzIiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zdWJzY3JpYmVycy5qcyIsIndlYnBhY2s6Ly8vLi91dGlsLmpzIiwid2VicGFjazovLy8uL2Vtb3RlLmpzIiwid2VicGFjazovLy8uL2NoYXRPYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vbWVudGlvbkhpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvY29sb3JCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9kb25hdGVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mby5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L3Nwb25zb3JCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9zcG9uc29yQ2hlY2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQ0E7QUFDaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBLCtFOzs7O0FBQUE7QUFBQTtBQUFBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVHQUF1RyxZQUFZLGFBQWEsbUJBQW1CLG9CQUFvQixFQUFFLCtEQUErRCwwQkFBMEIsRUFBRSwwREFBMEQsMEJBQTBCLG9CQUFvQixFQUFFO0FBQzlXOztBQUVBO0FBQ0EsMkZBQTJGLGlDQUFpQyxvQ0FBb0MsRUFBRTtBQUNsSzs7QUFFQTtBQUNBLDhKQUE4SixpQkFBaUIsMEZBQTBGLGtDQUFrQyxFQUFFLHFIQUFxSCxrQ0FBa0MsRUFBRSw2REFBNkQsY0FBYztBQUNqaEI7O0FBRUE7QUFDQSw2SEFBNkgsbURBQW1ELDZCQUE2QixFQUFFO0FBQy9NOztBQUVBOztBQUVBO0FBQ0EsdUdBQXVHLHlCQUF5QjtBQUNoSSxhQUFhO0FBQ2IsdUdBQXVHLHlCQUF5QjtBQUNoSTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCOzs7Ozs7OztBQ2pIcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIscUJBQXFCOztBQUVyQixnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVULHFDQUFxQztBQUNyQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9GQUFvRixLQUFLLE9BQU8sbUJBQW1CO0FBQ25ILHdDQUF3QyxRQUFRO0FBQ2hEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDdklBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1JxQjtBQUNrQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWIsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7O0FBRUEsdUJBQXVCLDhCQUE4QjtBQUNyRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVULHVCQUF1Qix3QkFBd0I7O0FBRS9DOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG9EQUFvRCxLQUFLLE9BQU8sVUFBVSxnQkFBZ0IsS0FBSyxFQUFFLEtBQUs7QUFDdEc7O0FBRUE7O0FBRUEscUVBQXFFLFlBQVk7QUFDakYsZ0RBQWdELDBCQUEwQixTQUFTLEtBQUssd0JBQXdCLFdBQVcsZ0JBQWdCLGdCQUFnQjtBQUMzSjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsZ0NBQWdDO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN2ZUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUFBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7QUMxR3FCOztBQUVyQjtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9NQUFzSTs7QUFFdEksd0RBQXdEO0FBQ3hEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw2SkFBNko7QUFDN0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDN0JrRDs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLDBGQUEwRjtBQUMxRiw0QkFBNEIsMERBQW1CO0FBQy9DO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsd0NBQXdDO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUMsNENBQTRDO0FBQ2pGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDaExBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7O0FDakNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFVBQVUseUNBQXlDLGdCQUFnQixZQUFZLFlBQVksbUJBQW1COztBQUVsSjtBQUNBLHdEQUF3RCxnREFBZ0QsV0FBVztBQUNuSDtBQUNBLDZDQUE2QywyQkFBMkIsY0FBYztBQUN0RjtBQUNBLDRDQUE0QyxjQUFjO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7QUNoQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQ0FBc0MsWUFBWSx5Q0FBeUMsZ0JBQWdCLGFBQWEsY0FBYzs7QUFFdEk7QUFDQSx5REFBeUQsZ0RBQWdELGFBQWE7QUFDdEg7QUFDQSw2Q0FBNkMsMkJBQTJCLGNBQWM7QUFDdEY7QUFDQSw0Q0FBNEMsY0FBYztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMsV0FBVyxnREFBZ0QsZ0JBQWdCLGFBQWEsY0FBYzs7QUFFM0k7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QywwRUFBMEUsRUFBRTs7QUFFbkg7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLFNBQVMsY0FBYztBQUN2Qjs7Ozs7Ozs7QUN6Q0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDckJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFlBQVkseUNBQXlDLGdCQUFnQixhQUFhLGNBQWM7O0FBRXRJO0FBQ0EsMERBQTBELGdEQUFnRCxhQUFhO0FBQ3ZIO0FBQ0EsNkNBQTZDLDJCQUEyQixjQUFjO0FBQ3RGO0FBQ0EsNENBQTRDLGNBQWM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFBQTtBQUFBIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDFmMTA5YWIzOWEwODg5OGQyNTMyIiwiaW1wb3J0IFBhZ2VDaGVjayBmcm9tICcuL3BhZ2VDaGVjayc7XHJcbmltcG9ydCBTdWJzY3JpYmVycyBmcm9tICcuL3N1YnNjcmliZXJzJztcclxuaW1wb3J0IHsgaXNOb2RlIH0gZnJvbSAnLi91dGlsJztcclxuaW1wb3J0IENoYXRPYnNlcnZlciBmcm9tICcuL2NoYXRPYnNlcnZlcic7XHJcblxyXG5leHBvcnQgY29uc3QgRElTQUxMT1dFRF9DSEFSUyA9IFsnXFxcXCcsICc6JywgJy8nLCAnJicsIFwiJ1wiLCAnXCInLCAnPycsICchJywgJyMnXSxcclxuICAgIFNDUk9MTF9FTkFCTEVEX1VSTCA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdpY29ucy9zY3JvbGwtZW5hYmxlZC5wbmcnKSxcclxuICAgIFNDUk9MTF9ESVNBQkxFRF9VUkwgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc2Nyb2xsLWRpc2FibGVkLnBuZycpO1xyXG5cclxuZXhwb3J0IGxldCBvcHRpb25zID0gbnVsbDtcclxuXHJcbmV4cG9ydCB2YXIgSVBUVkxvYWRlZCA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XHJcbiAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvcHRpb25zQ2FjaGUnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbn1cclxuXHJcbmNvbnN0IG9uTmV3UGFnZUxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJCgnW2NsYXNzXj1cImlwdHYtXCJdJykucmVtb3ZlKCk7XHJcbiAgICAkKCcueXQtbGl2ZS1jaGF0LWhlYWRlci1yZW5kZXJlciN0aXRsZScpLnRleHQoJ0NoYXQnKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KFBhZ2VDaGVjay5saXZlc3RyZWFtUGFnZSwgMUUzKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoUGFnZUNoZWNrLmlzTGl2ZXN0cmVhbSgpKSB7XHJcbiAgICAgICAgICAgIGluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LCAyRTMpO1xyXG59O1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQgPiB0aXRsZScpO1xyXG5cclxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xyXG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25OZXdQYWdlTG9hZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFpc05vZGUodGFyZ2V0KSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXHJcbiAgICAgICAgYXR0cmlidXRlczogZmFsc2UsXHJcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIG9wdGlvbnMpO1xyXG59KCkpO1xyXG5cclxudmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmKCFJUFRWTG9hZGVkKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKCdyZXF1ZXN0U3Vic2NyaXB0aW9ucycsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uc1snc3Vic2NyaXB0aW9ucyddID0gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDUwMDApO1xyXG5cclxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSgncmVxdWVzdExvY2Fsc3RvcmFnZScsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgb3B0aW9ucyA9IHJlc3BvbnNlO1xyXG5cclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29wdGlvbnNDYWNoZScsIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2VuYWJsZUNoYXRDb2xvcnMnXSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYSA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdleHRlcm5hbC9jaGF0LWNvbG9ycy5jc3MnKTtcclxuICAgICAgICAgICAgICAgICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiJyArIGEgKyAnXCIgPicpLmFwcGVuZFRvKCdoZWFkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2Rpc2FibGVBdmF0YXJzJ10gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4uc3R5bGUtc2NvcGUgLnl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXIgI2F1dGhvci1waG90byB7IHdpZHRoOiAwcHg7IGhlaWdodDogMHB4OyBtYXJnaW4tcmlnaHQ6IDBweDsgdmlzaWJpbGl0eTogaGlkZGVuOyB9LnN0eWxlLXNjb3BlLnl0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyLm5vLXRyYW5zaXRpb257IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfS5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlciAjYXZhdGFyIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O21hcmdpbjowICFpbXBvcnRhbnQ7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2VuYWJsZVNwbGl0Q2hhdCddID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+LnN0eWxlLXNjb3BlIHl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBib3JkZXItdG9wOiAwLjVweCBzb2xpZCAjMzMzMzMzOyBib3JkZXItYm90dG9tOiAwLjVweCBzb2xpZCAjMDAwMDAwOyB9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydzaG93RGVsZXRlZE1lc3NhZ2VzJ10gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2lzLWRlbGV0ZWRdOm5vdChbc2hvdy1vcmlnaW5hbF0pICNtZXNzYWdlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIge2Rpc3BsYXk6IGlubGluZTt9IC55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTAgI2RlbGV0ZWQtc3RhdGUueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpOyB9IC55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTBbaXMtZGVsZXRlZF06bm90KFtzaG93LW9yaWdpbmFsXSkgI21lc3NhZ2UueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpOyB9IC55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTAgI2RlbGV0ZWQtc3RhdGU6YmVmb3Jle2NvbnRlbnQ6IFwiICBcIn08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChnZXRPcHRpb25zKClbJ21lbnRpb25IaWdobGlnaHQnXSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTAgLm1lbnRpb24ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTE0LCAxNSwgMTUsIDApICFpbXBvcnRhbnQ7IHBhZGRpbmc6IDBweCAwcHggIWltcG9ydGFudDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgY2hhdENvbG9yID0gJCgnLnl0LWxpdmUtY2hhdC1oZWFkZXItcmVuZGVyZXItMCcpLmNzcygnYmFja2dyb3VuZC1jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoYXRDb2xvciA9PT0gJ3JnYig0MCwgNDAsIDQwKScpIHtcclxuICAgICAgICAgICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2F1dGhvci10eXBlPW1vZGVyYXRvcl17YmFja2dyb3VuZC1jb2xvcjojMjgyODI4fTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjaGF0Q29sb3IgPT09ICdyZ2JhKDIzOCwgMjM4LCAyMzgsIDAuNCknKSB7XHJcbiAgICAgICAgICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFthdXRob3ItdHlwZT1tb2RlcmF0b3Jde2JhY2tncm91bmQtY29sb3I6I2UyZTJlMn08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgU3Vic2NyaWJlcnMubG9hZEJhZGdlcygpO1xyXG5cclxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbW90ZXNUd2l0Y2gnXSA9PT0gdHJ1ZSB8fCBnZXRPcHRpb25zKClbJ2Vtb3Rlc1N1YiddID09PSB0cnVlIHx8IGdldE9wdGlvbnMoKVsnZW1vdGVzQlRUViddID09PSB0cnVlIHx8IGdldE9wdGlvbnMoKVsnZW1vdGVzSWNlJ10gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgQ2hhdE9ic2VydmVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmluZm8oJ1tJUFRWXSBJbml0IScpO1xyXG4gICAgICAgIElQVFZMb2FkZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5vbk5ld1BhZ2VMb2FkKCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGdldE9wdGlvbnMgfSBmcm9tICcuL21haW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Vic2NyaWJlcnNcclxue1xyXG4gICAgc3RhdGljIGxvYWRCYWRnZXMoKVxyXG4gICAge1xyXG4gICAgICAgIFN1YnNjcmliZXJzLmJhZGdlc1snMSddID0gIGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvdGllckJhZGdlMS5wbmcnKTtcclxuICAgICAgICBTdWJzY3JpYmVycy5iYWRnZXNbJzInXSA9ICBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3RpZXJCYWRnZTIucG5nJyk7XHJcbiAgICAgICAgU3Vic2NyaWJlcnMuYmFkZ2VzWyczJ10gPSAgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy90aWVyQmFkZ2UzLnBuZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzZXRTZWxmSW5mbyhpbWdTcmMpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgcHJvZmlsZUlkID0gaW1nU3JjLnNwbGl0KCcvJylbM107XHJcbiAgICAgICAgY29uc3Qgc3ViVGllciA9IGdldE9wdGlvbnNbJ3N1YnNjcmlwdGlvbnMnXVtwcm9maWxlSWRdWydzdWJ0aWVyJ107XHJcblxyXG4gICAgICAgIFN1YnNjcmliZXJzLnNlbGYgPSB7XHJcbiAgICAgICAgICAgIHByb2ZpbGVJbWFnZVVybDogaW1nU3JjLFxyXG4gICAgICAgICAgICBwcm9maWxlSWQ6IHByb2ZpbGVJZCxcclxuICAgICAgICAgICAgc3ViVGllcjogc3ViVGllclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgc3Vic2NyaWJlciBpbmZvXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhZGRCYWRnZXMobm9kZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoJChub2RlKS5maW5kKCdpbWcnKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiAkKG5vZGUpLmZpbmQoJyNhdXRob3ItcGhvdG8nKVswXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIExpc3RlbiBmb3IgbXV0YXRpb25zIG9uIGF1dGhvciBpbWFnZSAqL1xyXG4gICAgICAgIGNvbnN0IGltYWdlT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24obXV0YXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24uYXR0cmlidXRlTmFtZSA9PT0gJ3NyYycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZmlsZUlkID0gbXV0YXRpb24udGFyZ2V0LnNyYy5zcGxpdCgnLycpWzNdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvZmlsZUlkID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXByb2ZpbGUtaWQnLCBwcm9maWxlSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJJbmZvID0gZ2V0T3B0aW9ucygpWydzdWJzY3JpcHRpb25zJ11bcHJvZmlsZUlkXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdWJJbmZvID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXN1Yi10aWVyJywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zdWItdGllcicsIGdldE9wdGlvbnMoKVsnc3Vic2NyaXB0aW9ucyddW3Byb2ZpbGVJZF1bJ3N1YnRpZXInXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBTdWJzY3JpYmVycy5zZXRCYWRnZUltYWdlKG5vZGUsIHByb2ZpbGVJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8qKiBMaXN0ZW4gZm9yIG11dGF0aW9ucyBvbiBkYXRhLXByb2ZpbGUgaWQgb2YgYXV0aG9yIGltYWdlICovXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtdXRhdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2ZpbGUtaWQnKSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXByb2ZpbGUtaWQnLCBwcm9maWxlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXN1Yi10aWVyJykgPT09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YkluZm8gPSBnZXRPcHRpb25zKClbJ3N1YnNjcmlwdGlvbnMnXVtwcm9maWxlSWRdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN1YkluZm8gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3ViLXRpZXInLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXN1Yi10aWVyJywgZ2V0T3B0aW9ucygpWydzdWJzY3JpcHRpb25zJ11bcHJvZmlsZUlkXVsnc3VidGllciddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhT2JzZXJ2ZXJDb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgY2hhcmFjdGVyRGF0YTogdHJ1ZSwgc3VidHJlZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhT2JzZXJ2ZXIub2JzZXJ2ZShtdXRhdGlvbi50YXJnZXQsIGRhdGFPYnNlcnZlckNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBpbWFnZU9ic2VydmVyQ29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IHRydWUsIHN1YnRyZWU6IHRydWUgfTtcclxuICAgICAgICBpbWFnZU9ic2VydmVyLm9ic2VydmUoJChub2RlKS5maW5kKCcjYXV0aG9yLXBob3RvJylbMF0sIGltYWdlT2JzZXJ2ZXJDb25maWcpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgc2V0QmFkZ2VJbWFnZShub2RlLCBwcm9maWxlSWQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCQobm9kZSkuZmluZCgnLnRpZXItYmFkZ2UnKS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3ViSW5mbyA9IGdldE9wdGlvbnMoKVsnc3Vic2NyaXB0aW9ucyddW3Byb2ZpbGVJZF07XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3ViSW5mbyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGllckltZyA9IFN1YnNjcmliZXJzLmJhZGdlc1tzdWJJbmZvWydzdWJ0aWVyJ11dO1xyXG5cclxuICAgICAgICBjb25zdCBpbWdIdG1sID0gYDxzcGFuIGNsYXNzPVwiaGludC0tcmlnaHRcIiBhcmlhLWxhYmVsPVwiSWNlUG9zZWlkb24uY29tICYjMTA7JiMxMDtUaWVyICR7c3ViSW5mb1snc3VidGllciddfSBTdWJzY3JpYmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7dGllckltZ31cIiBjbGFzcz1cInRpZXItYmFkZ2VcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPmA7XHJcblxyXG4gICAgICAgICQobm9kZSkuZmluZCgnI2F1dGhvci1iYWRnZXMnKS5wcmVwZW5kKGltZ0h0bWwpO1xyXG5cclxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbmFibGVDaGF0Q29sb3JzJ10pIHtcclxuICAgICAgICAgICAgJChub2RlKS5maW5kKCcjYXV0aG9yLW5hbWUnKS5jc3MoJ2NvbG9yJywgc3ViSW5mb1snY29sb3InXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBodG1sID0gJChub2RlKS5maW5kKCcjYXV0aG9yLWJhZGdlcycpLmh0bWwoKTtcclxuXHJcbiAgICAgICAgJChub2RlKS5maW5kKCcjYXV0aG9yLWJhZGdlcycpLm9uKCdET01TdWJ0cmVlTW9kaWZpZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy50aWVyLWJhZGdlJykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwoaHRtbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLyoqIFJlbW92ZSBlbXB0eSBiYWRnZXMgYWRkZWQgYnkgWVQgKi9cclxuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLnl0LWxpdmUtY2hhdC1hdXRob3ItYmFkZ2UtcmVuZGVyZXItMCcpLmVhY2goZnVuY3Rpb24oaSwgZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJChlbCkud2lkdGgoKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGVsKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuU3Vic2NyaWJlcnMuY2hhdE1lc3NhZ2VzID0ge307XHJcblN1YnNjcmliZXJzLmJhZGdlcyA9IHt9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3N1YnNjcmliZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBmdW5jdGlvbiByZXBsYWNlQWxsKHN0ciwgZmluZCwgcmVwbGFjZSkge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoZmluZCwgJ2cnKSwgcmVwbGFjZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc05vZGUobykge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICB0eXBlb2YgTm9kZSA9PT0gJ29iamVjdCcgPyBvIGluc3RhbmNlb2YgTm9kZSA6IG8gJiYgdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIHR5cGVvZiBvLm5vZGVUeXBlID09PSAnbnVtYmVyJyAmJiB0eXBlb2Ygby5ub2RlTmFtZSA9PT0gJ3N0cmluZydcclxuICAgICk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHJlcGxhY2VBbGwgfSBmcm9tICcuL3V0aWwnO1xyXG5pbXBvcnQgeyBnZXRPcHRpb25zLCBESVNBTExPV0VEX0NIQVJTIH0gZnJvbSAnLi9tYWluJztcclxuaW1wb3J0IGxvYWRpbmdFbW90ZXNJbmZvIGZyb20gJy4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mbyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbW90ZVxyXG57XHJcbiAgICAvKipcclxuICAgICAqIExvYWQgYWxsIGVuYWJsZWQgZW1vdGVzLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBsb2FkaW5nRW1vdGVzSW5mbygpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJGxvYWRpbmcgPSAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRsb2FkaW5nWzBdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGxvYWRpbmcuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnY29sb3InOiAnI2MwMzkyYicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnIzI4MjgyOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3JpZ2h0JzogJzE5cHgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbG9hZGluZy50ZXh0KCdGYWlsZWQgbG9hZGluZyBzb21lIGVtb3RlcyAoQVBJIHNlcnZlcnMgZG93biknKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sIDcuNSAqIDEwMDApO1xyXG5cclxuICAgICAgICB9LCAxMCAqIDEwMDApO1xyXG5cclxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbW90ZXNUd2l0Y2gnXSkgRW1vdGUubG9hZFR3aXRjaEVtb3RlcygpO1xyXG4gICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2Vtb3Rlc1N1YiddKSBFbW90ZS5sb2FkU3ViRW1vdGVzKCk7XHJcblxyXG4gICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2Vtb3Rlc0JUVFYnXSkge1xyXG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkVtb3RlcygpO1xyXG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkNoYW5uZWxFbW90ZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEVtb3RlLndhaXRUaWxsRW1vdGVzTG9hZGVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0VGltZW91dCB0aGF0IGtlZXBzIHJ1bm5pbmcgdW50aWwgYWxsIGVtb3RlcyBhcmUgbG9hZGVkLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgd2FpdFRpbGxFbW90ZXNMb2FkZWQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICgoZ2V0T3B0aW9ucygpWydlbW90ZXNUd2l0Y2gnXSAhPT0gRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQpIHx8XHJcbiAgICAgICAgICAgIChnZXRPcHRpb25zKClbJ2Vtb3Rlc1N1YiddICE9PSBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCkgfHxcclxuICAgICAgICAgICAgKGdldE9wdGlvbnMoKVsnZW1vdGVzQlRUViddICE9PSBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQpIHx8XHJcbiAgICAgICAgICAgIChnZXRPcHRpb25zKClbJ2Vtb3Rlc0JUVFYnXSAhPT0gRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQpKSB7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KEVtb3RlLndhaXRUaWxsRW1vdGVzTG9hZGVkLCAyNTApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUZW1wIGZpeCB0byBwcmV2ZW50IHJhbSBmcm9tIGZpbGxpbmcgdXAgd2l0aCBtZXNzYWdlcy5cclxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLm1lc3NhZ2VzID0ge307XHJcbiAgICAgICAgfSwgMTAwMCAqIDYwICogNSk7XHJcblxyXG4gICAgICAgIEVtb3RlLmxvYWRJY2VFbW90ZXMoKTtcclxuXHJcbiAgICAgICAgY29uc3QgYmxhY2tsaXN0ZWRFbW90ZXMgPSBbJ1RISUNDJ107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxhY2tsaXN0ZWRFbW90ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZGVsZXRlIEVtb3RlLmVtb3Rlc1tibGFja2xpc3RlZEVtb3Rlc1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpLnJlbW92ZSgpO1xyXG4gICAgICAgIEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcygpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcGxhY2UgZXhpc3RpbmcgdGV4dCB3aXRoIGVtb3RlcyBpbiBjaGF0LCBoYXBwZW5zIHdoZW4gZW1vdGVzIGFyZSBkb25lIGxvYWRpbmcuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXBsYWNlRXhpc3RpbmdFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGNoYXRFbGVtZW50cyA9ICQoJy5zdHlsZS1zY29wZS55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyLngtc2NvcGUueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wJyk7XHJcblxyXG4gICAgICAgIGlmIChjaGF0RWxlbWVudHMubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcywgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hhdEVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLmVtb3RlQ2hlY2soZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBhIG1lc3NhZ2UgY29udGFpbnMgZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtub2RlfSBub2RlIC0gTWVzc2FnZSBub2RlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBlbW90ZUNoZWNrKG5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnZW1vdGVzVHdpdGNoJ10gPT09IGZhbHNlICYmIGdldE9wdGlvbnMoKVsnZW1vdGVzU3ViJ10gPT09IGZhbHNlICYmIGdldE9wdGlvbnMoKVsnZW1vdGVzQlRUViddID09PSBmYWxzZSAmJiBnZXRPcHRpb25zKClbJ2Vtb3Rlc0ljZSddID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCAkbWVzc2FnZSA9ICQobm9kZSkuZmluZCgnI21lc3NhZ2UnKTtcclxuICAgICAgICBFbW90ZS5rYXBwYUNoZWNrKCRtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgbGV0IG9sZEhUTUwgPSAkbWVzc2FnZS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgIGxldCBtc2dIVE1MID0gb2xkSFRNTDtcclxuXHJcbiAgICAgICAgY29uc3Qgd29yZHMgPSBtc2dIVE1MLnJlcGxhY2UoJy9cXHhFRlxceEJCXFx4QkYvJywgJycpLnJlcGxhY2UoJ++7vycsICcnKS5zcGxpdCgnICcpO1xyXG4gICAgICAgIGNvbnN0IHVuaXF1ZVdvcmRzID0gW107XHJcbiAgICAgICAgbGV0IGVtb3RlQ291bnQgPSAwO1xyXG4gICAgICAgIGxldCBjaGFuZ2VBdHRlbXB0cyA9IDA7XHJcblxyXG4gICAgICAgICQuZWFjaCh3b3JkcywgZnVuY3Rpb24gKGksIGVsKSB7XHJcbiAgICAgICAgICAgIGlmICgkLmluQXJyYXkoZWwsIHVuaXF1ZVdvcmRzKSA9PT0gLTEpIHVuaXF1ZVdvcmRzLnB1c2goZWwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVuaXF1ZVdvcmRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB3b3JkID0gdW5pcXVlV29yZHNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIEVtb3RlLmVtb3Rlc1t3b3JkXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlVGllciA9ICQobm9kZSkuZmluZCgnI2F1dGhvci1waG90bycpLmRhdGEoJ3N1Yi10aWVyJyk7XHJcbiAgICAgICAgICAgIGxldCB0b29sdGlwVGV4dCA9IHdvcmQ7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2VUaWVyID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZUNoZWNrKG5vZGUpXHJcbiAgICAgICAgICAgICAgICB9LCAyNSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlVGllciA8IEVtb3RlLmVtb3Rlc1t3b3JkXVsndGllciddKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVtb3RlVGllciA9IEVtb3RlLmVtb3Rlc1t3b3JkXVsndGllciddO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBFbW90ZS5lbW90ZXNbd29yZF1bJ3RpZXInXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHRvb2x0aXBUZXh0ID0gYEljZVBvc2VpZG9uLmNvbSAmIzEwOyYjMTA7VGllciAke2Vtb3RlVGllcn0gU3ViIEVtb3RlICYjMTA7JiMxMDske3dvcmR9YDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZW1vdGVDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZW1vdGVIdG1sID0gYDxzcGFuIGNsYXNzPVwiaGludC0tdG9wXCIgYXJpYS1sYWJlbD1cIiR7dG9vbHRpcFRleHR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtFbW90ZS5lbW90ZXNbd29yZF1bJ3VybCddfVwiIGFsdD1cIiR7d29yZH1cIiBzdHlsZT1cImRpc3BsYXk6aW5saW5lO3dpZHRoOmF1dG87bWF4LWhlaWdodDozMnB4O292ZXJmbG93OmhpZGRlbjtcIiBjbGFzcz1cImV4dGVuc2lvbi1lbW90ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5gO1xyXG5cclxuICAgICAgICAgICAgbXNnSFRNTCA9IHJlcGxhY2VBbGwobXNnSFRNTCwgd29yZCwgZW1vdGVIdG1sKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlbW90ZUNvdW50IDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkbWVzc2FnZS5odG1sKG1zZ0hUTUwpO1xyXG5cclxuICAgICAgICAkbWVzc2FnZS5wYXJlbnQoKS5wYXJlbnQoKS5iaW5kKCdET01TdWJ0cmVlTW9kaWZpZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkbWVzc2FnZSA9ICQodGhpcykuZmluZCgnI21lc3NhZ2UnKTtcclxuICAgICAgICAgICAgRW1vdGUua2FwcGFDaGVjaygkbWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaHRtbCA9ICRtZXNzYWdlLmh0bWwoKS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlQXR0ZW1wdHMgPiAzMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGh0bWwgPT09ICd1bmRlZmluZWQnIHx8IGh0bWwgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChodG1sLmluY2x1ZGVzKCdleHRlbnNpb24tZW1vdGUnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNoYW5nZUF0dGVtcHRzKys7XHJcblxyXG4gICAgICAgICAgICAkbWVzc2FnZS5odG1sKG1zZ0hUTUwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBhIG1lc3NhZ2UgY29udGFpbnMgYSBrYXBwYSBlbW90ZS5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bm9kZX0gbXNnIC0gTWVzc2FnZSBub2RlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBrYXBwYUNoZWNrKG1zZylcclxuICAgIHtcclxuICAgICAgICAkKCdpbWcnLCBtc2cpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkaW1nID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgvXFx1ZDgzY1xcdWRmMWQvZy50ZXN0KCRpbWcuYXR0cignYWx0JykpKSB7XHJcbiAgICAgICAgICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdLYXBwYScpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgVHdpdGNoIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRUd2l0Y2hFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly90d2l0Y2hlbW90ZXMuY29tL2FwaV9jYWNoZS92Mi9nbG9iYWwuanNvbicpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgeGhyLnRpbWVvdXQgPSA1MDAwO1xyXG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJ2h0dHBzOi8vc3RhdGljLWNkbi5qdHZudy5uZXQvZW1vdGljb25zL3YxLyc7XHJcblxyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZVRleHQgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVtb3RlRGljID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnZW1vdGVzJ107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVtb3RlIGluIGVtb3RlRGljKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2Vtb3RlXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZW1vdGVEaWNbZW1vdGVdWydpbWFnZV9pZCddICsgJy8nICsgJzEuMCdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBUd2l0Y2ggc3Vic2NyaWJlciBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkU3ViRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vdHdpdGNoZW1vdGVzLmNvbS9hcGlfY2FjaGUvdjIvc3Vic2NyaWJlci5qc29uJyk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICB4aHIudGltZW91dCA9IDUwMDA7XHJcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnaHR0cHM6Ly9zdGF0aWMtY2RuLmp0dm53Lm5ldC9lbW90aWNvbnMvdjEvJztcclxuXHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVGV4dCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZW1vdGVEaWMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydjaGFubmVscyddO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBjaGFubmVsIGluIGVtb3RlRGljKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGVtb3RlRGljW2NoYW5uZWxdWydlbW90ZXMnXSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVEaWNbY2hhbm5lbF1bJ2Vtb3RlcyddW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBkaWN0Wydjb2RlJ107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChFbW90ZS5pc1ZhbGlkRW1vdGUoY29kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2NvZGVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2ltYWdlX2lkJ10gKyAnLycgKyAnMS4wJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIEJUVFYgZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZEJUVFZFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly9hcGkuYmV0dGVydHR2Lm5ldC8yL2Vtb3RlcycpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgeGhyLnRpbWVvdXQgPSA1MDAwO1xyXG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJ2h0dHBzOi8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvJztcclxuXHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVGV4dCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZW1vdGVMaXN0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnZW1vdGVzJ107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZW1vdGVMaXN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGljdCA9IGVtb3RlTGlzdFtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIUVtb3RlLmNvbnRhaW5zRGlzYWxsb3dlZENoYXIoZGljdFsnY29kZSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tkaWN0Wydjb2RlJ11dID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZGljdFsnaWQnXSArICcvJyArICcxeCdcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgQlRUViBjaGFubmVsIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRCVFRWQ2hhbm5lbEVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY2hhbm5lbHMgPSBnZXRPcHRpb25zKClbJ0JUVFZDaGFubmVscyddO1xyXG4gICAgICAgIGNvbnN0IGNvbW1hQ2hhbm5lbHMgPSBjaGFubmVscy5yZXBsYWNlKC9cXHMrL2csICcnKS5zcGxpdCgnLCcpO1xyXG4gICAgICAgIGxldCBjaGFubmVsc0xlbmd0aCA9IGNvbW1hQ2hhbm5lbHMubGVuZ3RoO1xyXG5cclxuICAgICAgICBjb21tYUNoYW5uZWxzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5uZWwpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFubmVsLnRyaW0oKSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGNoYW5uZWxzTGVuZ3RoLS07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQgPj0gY2hhbm5lbHNMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL2FwaS5iZXR0ZXJ0dHYubmV0LzIvY2hhbm5lbHMvJyArIGNoYW5uZWwpO1xyXG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgICAgICB4aHIudGltZW91dCA9IDUwMDA7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJ2h0dHBzOi8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvJztcclxuXHJcbiAgICAgICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQgPj0gY2hhbm5lbHNMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCA+PSBjaGFubmVsc0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50ID49IGNoYW5uZWxzTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0ID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbW90ZUxpc3QgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZW1vdGVMaXN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpY3QgPSBlbW90ZUxpc3RbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghRW1vdGUuY29udGFpbnNEaXNhbGxvd2VkQ2hhcihkaWN0Wydjb2RlJ10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tkaWN0Wydjb2RlJ11dID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2lkJ10gKyAnLycgKyAnMXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogY2hhbm5lbCArICcgKGJ0dHYpJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgSWNlJ3Mgb2xkIHN1YnNjcmliZXIgZW1vdGVzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZEljZUVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc3ViVGllckVtb3RlcyA9IHtcclxuICAgICAgICAgICAgMTogW1xyXG4gICAgICAgICAgICAgICAgJ3B1cnBsZTEnLCAncHVycGxlMicsICdwdXJwbGUzJywgJ3B1cnBsZTQnLCAncHVycGxlQWhoaCcsICdwdXJwbGVBcm0xJywgJ3B1cnBsZUFybTInLCAncHVycGxlQmx1ZXNjcmVlbicsICdwdXJwbGVCcnVoJywgJ3B1cnBsZUNpZ3JpcCcsICdwdXJwbGVDbGF1cycsXHJcbiAgICAgICAgICAgICAgICAncHVycGxlQ29vbHN0b3J5JywgJ3B1cnBsZUNyZWVwJywgJ3B1cnBsZUVuemEnLCAncHVycGxlRmFrZScsICdwdXJwbGVSZWFsJywgJ3B1cnBsZUZyYW5rJywgJ3B1cnBsZUZybycsICdwdXJwbGVJY2UnLCAncHVycGxlS0tvbmEnLCAncHVycGxlTFVMJyxcclxuICAgICAgICAgICAgICAgICdwdXJwbGVPbWcnLCAncHVycGxlUHJpZGUnLCAncHVycGxlUm9mbCcsICdwdXJwbGVMZW8nLCAncHVycGxlVycsICdwdXJwbGVXYXQnXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIDI6IFtcclxuICAgICAgICAgICAgICAgICdwdXJwbGVDeCcsICdwdXJwbGVMZXdkJywgJ3B1cnBsZUxhbWEnLCAncHVycGxlUGl6emEnLCAncHVycGxlV2FsbGV0JywgJ3B1cnBsZVMnLCAncHVycGxlTGF0ZScsICdwdXJwbGVNb29zZScsICdwdXJwbGVOb3NlJywgJ3B1cnBsZVd1dCdcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgMzogW1xyXG4gICAgICAgICAgICAgICAgJ3B1cnBsZUFsbGVuJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yKGNvbnN0IHRpZXIgaW4gc3ViVGllckVtb3Rlcykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YlRpZXJFbW90ZXNbdGllcl0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tzdWJUaWVyRW1vdGVzW3RpZXJdW2ldXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvZW1vdGVzLycgKyBzdWJUaWVyRW1vdGVzW3RpZXJdW2ldICsgJy5wbmcnKSxcclxuICAgICAgICAgICAgICAgICAgICB0aWVyOiB0aWVyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRleHQgaXMgYSB2YWxpZCBlbW90ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzVmFsaWRFbW90ZSh0ZXh0KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAhKHRleHRbMF0ubWF0Y2goL1tBLVpdL2cpIHx8XHJcbiAgICAgICAgICAgIHRleHQubWF0Y2goL15bYS16XSskL2cpIHx8XHJcbiAgICAgICAgICAgIHRleHQubWF0Y2goL15cXGQqJC9nKVxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRleHQgY29udGFpbnMgZGlzYWxsb3dlZCBjaGFyYWN0ZXJzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHdvcmRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNvbnRhaW5zRGlzYWxsb3dlZENoYXIod29yZClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGMgaW4gRElTQUxMT1dFRF9DSEFSUykge1xyXG4gICAgICAgICAgICBpZiAod29yZC5pbmRleE9mKGMpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuRW1vdGUuc3RhdGVzID0ge1xyXG4gICAgdHdpdGNoOiB7XHJcbiAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIHN1Yjoge1xyXG4gICAgICAgIGxvYWRlZDogZmFsc2VcclxuICAgIH0sXHJcbiAgICBCVFRWOiB7XHJcbiAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIEJUVFZDaGFubmVsczoge1xyXG4gICAgICAgIGxvYWRlZDogZmFsc2UsXHJcbiAgICAgICAgbG9hZGVkQ291bnQ6IDBcclxuICAgIH1cclxufTtcclxuXHJcbkVtb3RlLmVtb3RlcyA9IHt9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Vtb3RlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBFbW90ZSBmcm9tICcuL2Vtb3RlJztcclxuaW1wb3J0IFN1YnNjcmliZXJzIGZyb20gJy4vc3Vic2NyaWJlcnMnO1xyXG5pbXBvcnQgTWVudGlvbkhpZ2hsaWdodCBmcm9tICcuL21lbnRpb25IaWdobGlnaHQnO1xyXG5cclxuLyoqXHJcbiAqIEJpbmRzIGNoYXQgbXV0YXRpb24gb2JzZXJ2ZXIgYW5kIGxpc3RlbiBmb3IgbmV3IGNoYXQgbWVzc2FnZXMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGF0T2JzZXJ2ZXIoKVxyXG57XHJcbiAgICAvKiogTG9vcCBvdmVyIGV4aXN0aW5nIG1lc3NhZ2VzIGFuZCBhZGQgYmFkZ2VzICovXHJcbiAgICAkKGRvY3VtZW50KS5vbignRE9NTm9kZUluc2VydGVkJywgJCgnI2NoYXQnKS5wYXJlbnQoKSwgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmZpbmQoJ2ltZycpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTGlzdGVuIGZvciBzZWxmLWF2YXRhciBsb2FkIGFuZCBzZXQgc2VsZi1pbmZvICovXHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmZpbmQoJyNhdmF0YXInKS5sZW5ndGggIT09IDApIHtcclxuXHJcbiAgICAgICAgICAgICQoZS50YXJnZXQpLmZpbmQoJyNhdmF0YXInKS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGltZ1NyYyA9ICQodGhpcykuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGltZ1NyYy5pbmNsdWRlcygnaHR0cHM6Ly8nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFN1YnNjcmliZXJzLnNldFNlbGZJbmZvKGltZ1NyYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiAkKGUudGFyZ2V0KS5maW5kKCcjYXV0aG9yLXBob3RvJylbMF0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFN1YnNjcmliZXJzLmFkZEJhZGdlcyhlLnRhcmdldCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3R5bGUtc2NvcGUgLnl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXInKTtcclxuXHJcbiAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoY2hhdE9ic2VydmVyLCAyNTApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGF0IGJveCBvYnNlcnZlclxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcblxyXG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmV3Tm9kZXMgPSBtdXRhdGlvbi5hZGRlZE5vZGVzO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5ld05vZGVzICE9PSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgJG5vZGVzID0gJChuZXdOb2Rlcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG5vZGVzLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCAkbm9kZSA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghJG5vZGUuaGFzQ2xhc3MoJ3l0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBNZW50aW9uSGlnaGxpZ2h0KCRub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZUNoZWNrKCRub2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlLFxyXG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICBzdWJ0cmVlOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCBvcHRpb25zKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jaGF0T2JzZXJ2ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xyXG5pbXBvcnQgZG9uYXRlQnV0dG9uIGZyb20gJy4vb3ZlcmxheS9kb25hdGVCdXR0b24nO1xyXG5pbXBvcnQgc3BvbnNvckJ1dHRvbiBmcm9tICcuL292ZXJsYXkvc3BvbnNvckJ1dHRvbic7XHJcbmltcG9ydCBjb2xvckJ1dHRvbiBmcm9tICcuL292ZXJsYXkvY29sb3JCdXR0b24nO1xyXG5pbXBvcnQgY2hlY2tJZldhdGNoaW5nTGl2ZSBmcm9tICcuL292ZXJsYXkvY2hlY2tJZldhdGNoaW5nTGl2ZSc7XHJcbmltcG9ydCBBbHdheXNTY3JvbGxEb3duIGZyb20gJy4vb3ZlcmxheS9hbHdheXNTY3JvbGxEb3duJztcclxuaW1wb3J0IFNwb25zb3JDaGVjayBmcm9tICcuL292ZXJsYXkvc3BvbnNvckNoZWNrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VDaGVja1xyXG57XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB1c2VyIGlzIHdhdGNoaW5nIGZyb20gd3JvbmcgbGl2ZXN0cmVhbSBwYWdlIGFuZCB3YXJucyB0aGVtLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgeW91dHViZUdhbWluZygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpdmUtY2hhdC1pZnJhbWUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgJHRleHRXcmFwcGVyID0gJCgnLnl0LXVzZXItaW5mbycpO1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSAkdGV4dFdyYXBwZXIuZmluZCgnYScpLnRleHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgaWYgKHRleHQgPT09ICdJY2UgUG9zZWlkb24nICYmICF1cmwuaW5jbHVkZXMoJ2dhbWluZy55b3V0dWJlJykgJiYgaWZyYW1lKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZWRpcmVjdENvbmZpcm0gPSBjb25maXJtKCdbSWNlIFBvc2VpZG9uVFZdIEdvIHRvIHRoZSBvZmZpY2lhbCBJY2UgUG9zZWlkb24gbGl2ZXN0cmVhbSBwYWdlPycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlZGlyZWN0Q29uZmlybSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJ2h0dHBzOi8vZ2FtaW5nLnlvdXR1YmUuY29tL2ljZV9wb3NlaWRvbi9saXZlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdXNlciBpcyB3YXRjaGluZyBhIGxpdmVzdHJlYW0gb24gWW91dHViZSBnYW1pbmcuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsaXZlc3RyZWFtUGFnZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ293bmVyJyk7XHJcbiAgICAgICAgY29uc3QgY2hhdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGF0Jyk7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9ICQodGFyZ2V0KS5maW5kKCdzcGFuJykudGV4dCgpO1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgICAgICBpZiAoKCF0YXJnZXQgfHwgIWNoYXQpICYmICghdXJsLmluY2x1ZGVzKCdsaXZlX2NoYXQnKSAmJiAhdXJsLmluY2x1ZGVzKCdpc19wb3BvdXQ9MScpKSkge1xyXG5cclxuICAgICAgICAgICAgUGFnZUNoZWNrLnN0cmVhbXBhZ2VDaGVja3MrKztcclxuXHJcbiAgICAgICAgICAgIGlmIChQYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcyA8IDUpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoUGFnZUNoZWNrLmxpdmVzdHJlYW1QYWdlLCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGV4dCA9PT0gJ0ljZSBQb3NlaWRvbicpIHtcclxuICAgICAgICAgICAgZG9uYXRlQnV0dG9uKCk7XHJcbiAgICAgICAgICAgIHNwb25zb3JCdXR0b24oKTtcclxuICAgICAgICAgICAgY29sb3JCdXR0b24oKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChTcG9uc29yQ2hlY2suY2hlY2ssIDI1MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgRW1vdGUubG9hZEVtb3RlcygpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaW5pdCgpO1xyXG4gICAgICAgIGNoZWNrSWZXYXRjaGluZ0xpdmUoKTtcclxuXHJcbiAgICAgICAgUGFnZUNoZWNrLnN0cmVhbXBhZ2VDaGVja3MgPSAwO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHVzZXIgaXMgd2F0Y2hpbmcgYSBsaXZlc3RyZWFtLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNMaXZlc3RyZWFtKCkge1xyXG4gICAgICAgIGNvbnN0IGxpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXRwLWxpdmUtYmFkZ2UueXRwLWJ1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IGNoYXRBcHAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd5dC1saXZlLWNoYXQtYXBwJyk7XHJcbiAgICAgICAgY29uc3QgY2hhdGlGcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXZlLWNoYXQtaWZyYW1lJyk7XHJcbiAgICAgICAgY29uc3QgY2hhdEhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55dC1saXZlLWNoYXQtaGVhZGVyLXJlbmRlcmVyJyk7XHJcblxyXG4gICAgICAgIC8vIFRoYW5rcyBTdGFja092ZXJmbG93ISBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDIwMDA0L2FjY2Vzcy1wYXJlbnQtdXJsLWZyb20taWZyYW1lXHJcbiAgICAgICAgdmFyIHVybCA9ICh3aW5kb3cubG9jYXRpb24gIT0gd2luZG93LnBhcmVudC5sb2NhdGlvbilcclxuICAgICAgICAgICAgPyBkb2N1bWVudC5yZWZlcnJlclxyXG4gICAgICAgICAgICA6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XHJcblxyXG5cclxuICAgICAgICB2YXIgdXJsQ2hlY2sgPSAodXJsLmluZGV4T2YoJ2ljZXBvc2VpZG9uLmNvbScpID4gLTEgfHwgdXJsLmluZGV4T2YoJ2ljZXBvc2VpZG9uLmNvbScpID4gLTEpO1xyXG4gICAgICAgIHZhciBsaXZlQnV0dG9uQ2hlY2sgPSAoZG9jdW1lbnQuYm9keS5jb250YWlucyhsaXZlQnV0dG9uKSAmJiAhbGl2ZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpO1xyXG4gICAgICAgIHZhciBjaGF0Q2hlY2sgPSAoZG9jdW1lbnQuYm9keS5jb250YWlucyhjaGF0QXBwKSB8fCBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGNoYXRpRnJhbWUpIHx8IGRvY3VtZW50LmJvZHkuY29udGFpbnMoY2hhdEhlYWRlcikpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiVVJMIENIRUNLOlwiLCB1cmxDaGVjaywgdXJsKTtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiTElWRSBCVVRUT04gQ0hFQ0s6XCIsIGxpdmVCdXR0b25DaGVjayk7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkNIQVQgRVhJU1RTIENIRUNLOlwiLCBjaGF0Q2hlY2spO1xyXG5cclxuICAgICAgICBpZiAodXJsQ2hlY2sgfHwgbGl2ZUJ1dHRvbkNoZWNrIHx8IGNoYXRDaGVjaykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiSVMgTElWRVNUUkVBTSFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJJUyBOT1QgTElWRVNUUkVBTVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59O1xyXG5cclxuUGFnZUNoZWNrLnN0cmVhbXBhZ2VDaGVja3MgPSAwO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3BhZ2VDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXRPcHRpb25zIH0gZnJvbSAnLi9tYWluJztcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIG1lbnRpb24gYW5kIGNoYW5nZXMgYmFja2dyb3VuZCB0byBCVFRWIHN0eWxlIGJhY2tncm91bmQuXHJcbiAqIEBwYXJhbSB7bm9kZX0gbm9kZSAtIE1lc3NhZ2Ugbm9kZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWVudGlvbkhpZ2hsaWdodChub2RlKVxyXG57XHJcbiAgICBjb25zdCBjdXJyZW50VXNlciA9ICQoJyNhdXRob3IgI2F1dGhvci1uYW1lJykudGV4dCgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb25zdCBhdXRob3JUeXBlID0gbm9kZS5nZXQoMCkuZ2V0QXR0cmlidXRlKCdhdXRob3ItdHlwZScpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY3VycmVudFVzZXIgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChnZXRPcHRpb25zKClbJ21lbnRpb25IaWdobGlnaHQnXSAmJiBjdXJyZW50VXNlci5sZW5ndGggPiAyICYmICFub2RlLmhhc0NsYXNzKCd5dC1saXZlLWNoYXQtbGVnYWN5LXBhaWQtbWVzc2FnZS1yZW5kZXJlci0wJykpIHsgLy8gQ2hlY2sgaXQncyBub3Qgc3BvbnNvciAvIHN1cGVyY2hhdCwgYWxzbyBtZW50aW9uSGlnaGxpZ2h0IGVuYWJsZWRcclxuXHJcbiAgICAgICAgY29uc3QgdW5pcXVlaWQgPSBub2RlLmdldCgwKS5nZXRBdHRyaWJ1dGUoJ2lkJyk7IC8vIENvcHkgdW5pcXVlIG1lc3NhZ2UgaWRcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gKFwiIFwiICsgbm9kZS5maW5kKCcjbWVzc2FnZScpLnRleHQoKS50b0xvd2VyQ2FzZSgpICsgXCIgXCIpLnJlcGxhY2UoL1tcXHUyMDBCLVxcdTIwMERcXHVGRUZGXS9nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmICh1bmlxdWVpZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodW5pcXVlaWQubGVuZ3RoID4gMzAgJiYgKGF1dGhvclR5cGUgPT09IFwib3duZXJcIiB8fCBtZXNzYWdlLmluZGV4T2YoJyAnK2N1cnJlbnRVc2VyKycgJykgIT09IC0xIHx8IG1lc3NhZ2UuaW5kZXhPZignQCcrY3VycmVudFVzZXIrJyAnKSAhPT0gLTEpKSB7IC8vIElmIHlvdXIgbmFtZSBpcyBpbiB0aGUgbWVzc2FnZSwgYW5kIGl0J3Mgbm90IHlvdXIgbWVzc2FnZSBvciB0aGUgbWVzc2FnZSBpcyBmcm9tIHRoZSBzdHJlYW1lclxyXG4gICAgICAgICAgICBub2RlLmdldCgwKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LDAsMCwwLjQwKVwiO1xyXG4gICAgICAgICAgICBub2RlLmZpbmQoJyNhdXRob3ItbmFtZScpLmdldCgwKS5zdHlsZS5jb2xvciA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tZW50aW9uSGlnaGxpZ2h0LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFNDUk9MTF9FTkFCTEVEX1VSTCwgU0NST0xMX0RJU0FCTEVEX1VSTCB9IGZyb20gJy4vLi4vbWFpbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHdheXNTY3JvbGxEb3duXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IGFuZCBiaW5kcyB0aGUgbmVjZXNzYXJ5IGxpc3RlbmVycy5cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsZG93bldyYXBwZXIgPSAkKCcuaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKTtcclxuXHJcbiAgICAgICAgaWYgKHNjcm9sbGRvd25XcmFwcGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzY3JvbGxkb3duV3JhcHBlci5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNjcm9sbFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgc2Nyb2xsV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQWx3YXlzIHNjcm9sbCBkb3duIChFbmFibGVkKScpO1xyXG4gICAgICAgIHNjcm9sbFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaGludC0tdG9wJywgJ2lwdHYtc2Nyb2xsZG93bi13cmFwcGVyJyk7XHJcblxyXG4gICAgICAgICQoc2Nyb2xsV3JhcHBlcikuY3NzKHtcclxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgJ3JpZ2h0JzogJzExM3B4JyxcclxuICAgICAgICAgICAgJ2JvdHRvbSc6ICcxOHB4J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKHNjcm9sbFdyYXBwZXIpLmh0bWwoYFxyXG4gICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJpcHR2LXNjcm9sbGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJvdXRsaW5lOiAwO1wiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke1NDUk9MTF9FTkFCTEVEX1VSTH1cIiBhbHQ9XCJBbHdheXMgc2Nyb2xsIGRvd25cIiBoZWlnaHQ9XCIxMVwiIHdpZHRoPVwiMTFcIiBjbGFzcz1cImlwdHYtc2Nyb2xsZG93bi10b2dnbGUtaWNvblwiPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgYCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsV3JhcHBlcik7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaXB0di1zY3JvbGxkb3duLXRvZ2dsZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChBbHdheXNTY3JvbGxEb3duLmludGVydmFsKTtcclxuXHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5pbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2l0ZW0tc2Nyb2xsZXInKS5zY3JvbGxUb3AoOTk5OTk5OTk5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uQ2luZW1hKHNjcm9sbFdyYXBwZXIpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uU3BvbnNvck1lbnUoc2Nyb2xsV3JhcHBlcik7XHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyB0aGUgJ0Fsd2F5cyBzY3JvbGwgZG93bicgb3ZlcmxheSB3aGVuIGNpbmVtYSBtb2RlIGlzIG9wZW5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bm9kZX0gc2Nyb2xsV3JhcHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGlkZVNjcm9sbE9uQ2luZW1hKHNjcm9sbFdyYXBwZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgd2F0Y2hQYWdlID0gJ3l0Zy13YXRjaC1wYWdlJztcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG0pID0+IHtcclxuICAgICAgICAgICAgICAgICQobS50YXJnZXQpLmlzKCdbc2lkZWJhci1jb2xsYXBzZWRdJykgPyAkKHNjcm9sbFdyYXBwZXIpLmhpZGUoKSA6ICQoc2Nyb2xsV3JhcHBlcikuc2hvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJPcHRzID0ge1xyXG4gICAgICAgICAgICBjaGlsZExpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzaWRlYmFyLWNvbGxhcHNlZCddXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgYWRkT2JzZXJ2ZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkKHdhdGNoUGFnZSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKCQod2F0Y2hQYWdlKVswXSwgb2JzZXJ2ZXJPcHRzKTtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoYWRkT2JzZXJ2ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMjUwKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyB0aGUgJ0Fsd2F5cyBzY3JvbGwgZG93bicgb3ZlcmxheSB3aGVuIHNwb25zb3IgbWVudSBpcyBvcGVuLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtub2RlfSBzY3JvbGxXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlU2Nyb2xsT25TcG9uc29yTWVudShzY3JvbGxXcmFwcGVyKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGNoYXRJbnB1dFJlbmRlcmVyID0gJ3l0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyJztcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKG0udGFyZ2V0KS5hdHRyKCdjcmVhdG9yLW9wZW4nKSA/ICQoc2Nyb2xsV3JhcHBlcikuaGlkZSgpIDogJChzY3JvbGxXcmFwcGVyKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBvYnNlcnZlck9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ2NyZWF0b3Itb3BlbiddXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzcG9uc29yQ2xpY2sgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkKGNoYXRJbnB1dFJlbmRlcmVyKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoJChjaGF0SW5wdXRSZW5kZXJlcilbMF0sIG9ic2VydmVyT3B0cyk7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHNwb25zb3JDbGljayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyNTApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2FibGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIGZ1bmN0aW9uYWxpdHkgd2hlbiBzY3JvbGxpbmcgbWFudWFsbHkuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBiaW5kU2Nyb2xsTGlzdGVuZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVtLXNjcm9sbGVyJyk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxMaXN0ZW5lcigpIH0sIDI1MCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJyNpdGVtLXNjcm9sbGVyJykub24oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bihmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJyNpdGVtLXNjcm9sbGVyJykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQgPT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bihmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmFibGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIGZ1bmN0aW9uYWxpdHkgd2hlbiBibHVlIGp1bXAgZG93biBidXR0b24gaXMgY2xpY2tlZC5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LW1vcmUnKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4geyBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKSB9LCAyNTApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YXJnZXQub25tb3VzZWRvd24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bih0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb2dnbGUgc2Nyb2xsRG93biBzdGF0ZSBhbmQgYWRqdXN0IG92ZXJsYXkgYWNjb3JkaW5nbHkuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0b2dnbGVTY3JvbGxEb3duKHN0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9ICFBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd247XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID0gc3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKS5hdHRyKCdhcmlhLWxhYmVsJywgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID8gJ0Fsd2F5cyBzY3JvbGwgZG93biAoRW5hYmxlZCknIDogJ0Fsd2F5cyBzY3JvbGwgZG93biAoRGlzYWJsZWQpJyk7XHJcbiAgICAgICAgJCgnLmlwdHYtc2Nyb2xsZG93bi10b2dnbGUtaWNvbicpLmF0dHIoJ3NyYycsIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA/IFNDUk9MTF9FTkFCTEVEX1VSTCA6IFNDUk9MTF9ESVNBQkxFRF9VUkwpO1xyXG4gICAgfTtcclxufTtcclxuXHJcbkFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9IHRydWU7XHJcbkFsd2F5c1Njcm9sbERvd24uaW50ZXJ2YWwgPSBudWxsO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvYWx3YXlzU2Nyb2xsRG93bi5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQ2hlY2tzIGlmIHVzZXIgaXMgYmVoaW5kIGluIGxpdmVzdHJlYW0gYW5kIHdhcm5zIHRoZW0uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja0lmV2F0Y2hpbmdMaXZlKCkge1xyXG5cclxuICAgIGxldCBsaXZlQ2hlY2tJbnRlcnZhbCA9IG51bGw7XHJcblxyXG4gICAgbGl2ZUNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgY29uc3QgJGxpdmVCdXR0b24gPSAkKCcueXRwLWxpdmUtYmFkZ2UueXRwLWJ1dHRvbicpO1xyXG5cclxuICAgICAgICBpZiAoJGxpdmVCdXR0b24uaXMoJzplbmFibGVkJykgJiYgJGxpdmVCdXR0b24uaXMoJzp2aXNpYmxlJykgJiYgJCgnLmlwdHYtbGl2ZS13YXJuaW5nJykubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAkKCcjcGxheWVyLWNvbnRhaW5lcicpLmFwcGVuZChgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBZb3VcXCdyZSB3YXRjaGluZyBvbGQgZm9vdGFnZSwgY2xpY2sgdGhlIExJVkUgYnV0dG9uIGluIHRoZSBib3R0b20gbGVmdCBjb3JuZXIgdG8gd2F0Y2ggbGl2ZS5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctZGlzbWlzc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJpcHR2LWxpdmUtd2FybmluZy1jbG9zZVwiPuKclTwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKTtcclxuICAgICAgICB9XHJcbiAgICB9LCAxNSAqIDEwMDApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaXB0di1saXZlLXdhcm5pbmctY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuaXB0di1saXZlLXdhcm5pbmcnKS5yZW1vdmUoKTtcclxuICAgICAgICBjbGVhckludGVydmFsKGxpdmVDaGVja0ludGVydmFsKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZWRvd24nLCAnLnl0cC1saXZlLWJhZGdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmlwdHYtbGl2ZS13YXJuaW5nJykucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2NoZWNrSWZXYXRjaGluZ0xpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIEFkZHMgbmV3IGNvbG9yIGNoYW5nZSBidXR0b24gdG8gbGl2ZXN0cmVhbSBwYWdlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sb3JCdXR0b24oKVxyXG57XHJcbiAgICBjb25zdCBjb2xvckljb24gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3BlbmNpbC1pY29uLnBuZycpO1xyXG4gICAgY29uc3QgY29sb3JJbWFnZSA9IGA8aW1nIHNyYz1cIiR7Y29sb3JJY29ufVwiIGFsdD1cInN0YXJcIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDgwJTsgaGVpZ2h0OjgwJTsgbWFyZ2luLXJpZ2h0OiAycHg7XCI+YDtcclxuXHJcbiAgICBjb25zdCBjb2xvckJ1dHRvbiA9IGBcclxuICAgICAgICA8aXB0di1jb2xvci1idXR0b24gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgcmFpc2VkPVwiXCIgc3VwcG9ydGVkLWNvbGQtbG9hZC1hY3Rpb25zPVwiWyZxdW90O2NvbG9yJnF1b3Q7XVwiIHdhaXQtZm9yLXNpZ25hbD1cIndhdGNoLXBhZ2UtaW5pdGlhbGl6ZWRcIiBjbGFzcz1cInN0eWxlLXNjb3BlIHl0Zy13YXRjaC1mb290ZXIgeC1zY29wZSBpcHR2LWNvbG9yLWJ1dHRvbi0wXCI+XHJcbiAgICAgICAgICAgIDxpcm9uLXNpZ25hbHMgY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWNvbG9yLWJ1dHRvblwiPjwvaXJvbi1zaWduYWxzPlxyXG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b24geC1zY29wZSBwYXBlci1idXR0b24tMFwiIHJvbGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIiBhbmltYXRlZD1cIlwiIGFyaWEtZGlzYWJsZWQ9XCJmYWxzZVwiIGVsZXZhdGlvbj1cIjFcIiByYWlzZWQ9XCJcIiBhcmlhLWxhYmVsPVwiQ0hBTkdFIE5BTUUgQ09MT1JcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItanVzdGlmaWVkIHN0eWxlLXNjb3BlIGlwdHYtY29sb3ItYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAyNHB4OyBoZWlnaHQ6IDI0cHg7XCIgY2xhc3M9XCJpY29uLWNvbnRhaW5lciBsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItY2VudGVyIHN0eWxlLXNjb3BlIGlwdHYtY29sb3ItYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx5dC1pY29uIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC95dC1pY29uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b25cIiBzdHlsZT1cIm1hcmdpbjogMCAzcHhcIj48c3BhbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZm9ybWF0dGVkLXN0cmluZ1wiPkNIQU5HRSBOQU1FIENPTE9SPC9zcGFuPjwvaXB0di1mb3JtYXR0ZWQtc3RyaW5nPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvcGFwZXItYnV0dG9uPlxyXG4gICAgICAgIDwvaXB0di1jb2xvci1idXR0b24+YDtcclxuXHJcbiAgICAkKCcuaXB0di1zcG9uc29yLWJ1dHRvbi0wJykuYWZ0ZXIoY29sb3JCdXR0b24pO1xyXG5cclxuICAgICQoY29sb3JCdXR0b24pLnJlYWR5KCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuc3R5bGUtc2NvcGUuaXB0di1jb2xvci1idXR0b24ueC1zY29wZS55dC1pY29uLTAnKS5odG1sKGNvbG9ySW1hZ2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWNvbG9yLWJ1dHRvbi0wJykub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL3d3dy5pY2Vwb3NlaWRvbi5jb20vcHJvZmlsZScsICdfYmxhbmsnKTtcclxuICAgICAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtY29sb3ItYnV0dG9uLTAgcGFwZXItYnV0dG9uJylbMF0uYmx1cigpO1xyXG4gICAgfSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9jb2xvckJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQWRkcyBkb25hdGUgYnV0dG9uIHRvIGxpdmVzdHJlYW0gcGFnZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRvbmF0ZUJ1dHRvbigpXHJcbntcclxuICAgICQoJy5pcHR2LWRvbmF0ZS1idXR0b24tMCcpLnJlbW92ZSgpO1xyXG5cclxuICAgIGNvbnN0IGRvbmF0ZUljb24gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL2RvbmF0ZS1pY29uLnBuZycpO1xyXG4gICAgY29uc3Qgc3BvbnNvckljb24gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3Nwb25zb3ItaWNvbi5wbmcnKTtcclxuXHJcbiAgICBjb25zdCBzcG9uc29ySW1hZ2UgPSBgPGltZyBzcmM9XCIke3Nwb25zb3JJY29ufVwiIGFsdD1cInN0YXJcIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIj5gO1xyXG5cclxuICAgIGNvbnN0IGRvbmF0ZUJ1dHRvbiA9IGBcclxuICAgICAgICA8aXB0di1kb25hdGUtYnV0dG9uIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiIHJhaXNlZD1cIlwiIHN1cHBvcnRlZC1jb2xkLWxvYWQtYWN0aW9ucz1cIlsmcXVvdDtzcG9uc29yJnF1b3Q7XVwiIHdhaXQtZm9yLXNpZ25hbD1cIndhdGNoLXBhZ2UtaW5pdGlhbGl6ZWRcIiBjbGFzcz1cInN0eWxlLXNjb3BlIHl0Zy13YXRjaC1mb290ZXIgeC1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b24tMFwiPlxyXG4gICAgICAgICAgICA8aXJvbi1zaWduYWxzIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCI+PC9pcm9uLXNpZ25hbHM+XHJcbiAgICAgICAgICAgIDxwYXBlci1idXR0b24gc3R5bGU9XCJjb2xvcjogI2ZmZjsgYmFja2dyb3VuZC1jb2xvcjogIzBmOWQ1ODsgbWluLXdpZHRoOiAwO1wiIGNsYXNzPVwiZW5hYmxlZCBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b24geC1zY29wZSBwYXBlci1idXR0b24tMFwiIHJvbGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIiBhbmltYXRlZD1cIlwiIGFyaWEtZGlzYWJsZWQ9XCJmYWxzZVwiIGVsZXZhdGlvbj1cIjFcIiByYWlzZWQ9XCJcIiBhcmlhLWxhYmVsPVwiRG9uYXRlIHRvIEljZV9Qb3NlaWRvblwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1qdXN0aWZpZWQgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAyNHB4OyBoZWlnaHQ6IDI0cHg7XCIgY2xhc3M9XCJpY29uLWNvbnRhaW5lciBsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItY2VudGVyIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8eXQtaWNvbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvbiB4LXNjb3BlIHl0LWljb24tMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3l0LWljb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aXB0di1mb3JtYXR0ZWQtc3RyaW5nIGlkPVwidGV4dFwiIGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIiBzdHlsZT1cIm1hcmdpbjogMCAzcHhcIj48c3BhbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZm9ybWF0dGVkLXN0cmluZ1wiPkRPTkFURTwvc3Bhbj48L2lwdHYtZm9ybWF0dGVkLXN0cmluZz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L3BhcGVyLWJ1dHRvbj5cclxuICAgICAgICA8L2lwdHYtZG9uYXRlLWJ1dHRvbj5gO1xyXG5cclxuICAgIGNvbnN0IGRvbmF0ZUltYWdlID0gYDxpbWcgc3JjPVwiJHtkb25hdGVJY29ufVwiIGFsdD1cImRvbGxhci1zaWduXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czogbm9uZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCI+YDtcclxuXHJcbiAgICAvLyBJbnNlcnQgZG9uYXRlQnV0dG9uIG5leHQgdG8gc3BvbnNvckJ1dHRvblxyXG4gICAgY29uc3Qgc3BvbnNvckJ1dHRvbiA9ICcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLnl0Zy1tZW1iZXJzaGlwLW9mZmVyLWJ1dHRvbi0wJztcclxuXHJcbiAgICAkKHNwb25zb3JCdXR0b24pLmJlZm9yZShkb25hdGVCdXR0b24pO1xyXG4gICAgJChkb25hdGVCdXR0b24pLnJlYWR5KCBmdW5jdGlvbigpIHsgJCgnLnN0eWxlLXNjb3BlLmlwdHYtZG9uYXRlLWJ1dHRvbi54LXNjb3BlLnl0LWljb24tMCcpLmh0bWwoZG9uYXRlSW1hZ2UpOyB9KTtcclxuXHJcbiAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtZG9uYXRlLWJ1dHRvbi0wJykub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL3lvdXR1YmUuc3RyZWFtbGFicy5jb20vaWNlcG9zZWlkb24jLycsICdfYmxhbmsnKTtcclxuICAgICAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtZG9uYXRlLWJ1dHRvbi0wIHBhcGVyLWJ1dHRvbicpWzBdLmJsdXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENoYW5nZSBzcG9uc29yQnV0dG9uIGljb24gdG8gc3RhclxyXG4gICAgJChgJHtzcG9uc29yQnV0dG9ufSAuc3R5bGUtc2NvcGUueXRnLW1lbWJlcnNoaXAtb2ZmZXItYnV0dG9uLngtc2NvcGUueXQtaWNvbi0wYCkuaHRtbChzcG9uc29ySW1hZ2UpO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvZG9uYXRlQnV0dG9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogU2hvdyBlbW90ZSBsb2FkaW5nIGluZm9ybWF0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZGluZ0Vtb3Rlc0luZm8oKVxyXG57XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAkKGRpdikudGV4dCgnTG9hZGluZyBlbW90ZXMuLi4nKTtcclxuXHJcbiAgICAkKGRpdikuY3NzKHtcclxuICAgICAgICAnZm9udC1zaXplJzogJzE2cHgnLFxyXG4gICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgJ3JpZ2h0JzogJzI1cHgnLFxyXG4gICAgICAgICdib3R0b20nOiAnNzVweCcsXHJcbiAgICAgICAgJ2NvbG9yJzogJyNmZmYnLFxyXG4gICAgICAgICd0ZXh0LXNoYWRvdyc6ICcycHggMnB4IDJweCByZ2JhKDAsMCwwLDAuNzUpJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkaXYpLmFkZENsYXNzKCdpcHR2LWxvYWRpbmctZW1vdGVzJyk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvbG9hZGluZ0Vtb3Rlc0luZm8uanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBBZGRzIG5ldyBzcG9uc29yIGJ1dHRvbiB0byBsaXZlc3RyZWFtIHBhZ2UuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcG9uc29yQnV0dG9uKClcclxue1xyXG4gICAgY29uc3Qgc3BvbnNvckljb24gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3Nwb25zb3ItaWNvbi5wbmcnKTtcclxuICAgIGNvbnN0IHNwb25zb3JJbWFnZSA9IGA8aW1nIHNyYz1cIiR7c3BvbnNvckljb259XCIgYWx0PVwic3RhclwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPmA7XHJcblxyXG4gICAgY29uc3Qgc3BvbnNvckJ1dHRvbiA9IGBcclxuICAgICAgICA8aXB0di1zcG9uc29yLWJ1dHRvbiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiByYWlzZWQ9XCJcIiBzdXBwb3J0ZWQtY29sZC1sb2FkLWFjdGlvbnM9XCJbJnF1b3Q7c3BvbnNvciZxdW90O11cIiB3YWl0LWZvci1zaWduYWw9XCJ3YXRjaC1wYWdlLWluaXRpYWxpemVkXCIgY2xhc3M9XCJzdHlsZS1zY29wZSB5dGctd2F0Y2gtZm9vdGVyIHgtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvbi0wXCI+XHJcbiAgICAgICAgICAgIDxpcm9uLXNpZ25hbHMgY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LXNwb25zb3ItYnV0dG9uXCI+PC9pcm9uLXNpZ25hbHM+XHJcbiAgICAgICAgICAgIDxwYXBlci1idXR0b24gc3R5bGU9XCJjb2xvcjogI2ZmZjsgYmFja2dyb3VuZC1jb2xvcjogIzBmOWQ1ODsgbWluLXdpZHRoOiAwO1wiIGNsYXNzPVwiZW5hYmxlZCBzdHlsZS1zY29wZSBpcHR2LXNwb25zb3ItYnV0dG9uIHgtc2NvcGUgcGFwZXItYnV0dG9uLTBcIiByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCIgYW5pbWF0ZWQ9XCJcIiBhcmlhLWRpc2FibGVkPVwiZmFsc2VcIiBlbGV2YXRpb249XCIxXCIgcmFpc2VkPVwiXCIgYXJpYS1sYWJlbD1cIlNQT05TT1IgT04gT0ZGSUNJQUwgU0lURVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1qdXN0aWZpZWQgc3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMjRweDsgaGVpZ2h0OiAyNHB4O1wiIGNsYXNzPVwiaWNvbi1jb250YWluZXIgbGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LXNwb25zb3ItYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx5dC1pY29uIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvbiB4LXNjb3BlIHl0LWljb24tMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3l0LWljb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aXB0di1mb3JtYXR0ZWQtc3RyaW5nIGlkPVwidGV4dFwiIGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LXNwb25zb3ItYnV0dG9uXCIgc3R5bGU9XCJtYXJnaW46IDAgM3B4XCI+PHNwYW4gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWZvcm1hdHRlZC1zdHJpbmdcIj5TUE9OU09SIE9OIE9GRklDSUFMIFNJVEU8L3NwYW4+PC9pcHR2LWZvcm1hdHRlZC1zdHJpbmc+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9wYXBlci1idXR0b24+XHJcbiAgICAgICAgPC9pcHR2LXNwb25zb3ItYnV0dG9uPmA7XHJcblxyXG4gICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24tMCcpLmJlZm9yZShzcG9uc29yQnV0dG9uKTtcclxuXHJcbiAgICAkKHNwb25zb3JCdXR0b24pLnJlYWR5KCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuc3R5bGUtc2NvcGUuaXB0di1zcG9uc29yLWJ1dHRvbi54LXNjb3BlLnl0LWljb24tMCcpLmh0bWwoc3BvbnNvckltYWdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1zcG9uc29yLWJ1dHRvbi0wJykub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL3d3dy5pY2Vwb3NlaWRvbi5jb20vJywgJ19ibGFuaycpO1xyXG4gICAgICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1zcG9uc29yLWJ1dHRvbi0wIHBhcGVyLWJ1dHRvbicpWzBdLmJsdXIoKTtcclxuICAgIH0pO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvc3BvbnNvckJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BvbnNvckNoZWNrXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdXNlciBpcyBzdGlsbCB1c2luZyBvbGQgc3BvbnNvcnNoaXBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNoZWNrKClcclxuICAgIHtcclxuICAgICAgICAkLmdldChjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnY29udGVudC5odG1sJyksIGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICQoZGF0YSkuYXBwZW5kVG8oJ2JvZHknKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGltZ1VybCA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdpY29ucy9zcG9uc29yLWJlbmVmaXRzLnBuZycpO1xyXG4gICAgICAgICAgICAkKCcuc3BvbnNvci1tb2RhbCAuc3ViLWJlbmVmaXRzJykuYXR0cignc3JjJywgaW1nVXJsKTtcclxuXHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuY2xvc2UtbW9kYWwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQoJy5zcG9uc29yLW1vZGFsJykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQoJy55dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlci0wJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcG9uc29yQmFkZ2UgPSAkKGNvbnRhaW5lcikuZmluZCgnLnl0LWxpdmUtY2hhdC1hdXRob3ItYmFkZ2UtcmVuZGVyZXItMFthcmlhLWxhYmVsPVwiU3BvbnNvclwiXScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCQoc3BvbnNvckJhZGdlKS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgICAgICQoJy5zcG9uc29yLW1vZGFsJykuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvc3BvbnNvckNoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9
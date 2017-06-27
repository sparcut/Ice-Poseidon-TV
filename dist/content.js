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
             SCROLL_ENABLED_URL =  chrome.extension.getURL('icons/scroll-enabled.png'),
             SCROLL_DISABLED_URL =  chrome.extension.getURL('icons/scroll-disabled.png');
/* harmony export (immutable) */ __webpack_exports__["DISALLOWED_CHARS"] = DISALLOWED_CHARS;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_ENABLED_URL"] = SCROLL_ENABLED_URL;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_DISABLED_URL"] = SCROLL_DISABLED_URL;


let options = null;

function getOptions() {
    if (options === null) {
        return JSON.parse(localStorage.getItem('optionsCache'));
    }

    return options;
}

const onNewPageLoad = function() {

    $('[class^="iptv-"]').remove();

    if (getOptions()['redirectToYTGaming'] === true) {
        setTimeout(__WEBPACK_IMPORTED_MODULE_0__pageCheck__["a" /* default */].youtubeGaming, 2500);
    }

    $('.yt-live-chat-header-renderer#title').text('Chat');

    __WEBPACK_IMPORTED_MODULE_0__pageCheck__["a" /* default */].livestreamPage();
};

(function() {

    const target = document.querySelector('head > title');

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function() {
            onNewPageLoad();
        });
    });

    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* isNode */])(target)) {
        return;
    }

    observer.observe(target, { subtree: true, characterData: true, childList: true });
}());

setTimeout(function() {
    chrome.runtime.sendMessage('requestSubscriptions', function(response) {

        console.log(response);

        options['subscriptions'] = response;
    });
}, 5000);

chrome.runtime.sendMessage('requestLocalstorage', function(response) {

    options = response;

    localStorage.setItem('optionsCache', JSON.stringify(options));

    console.log('@options:', options);

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

    if(getOptions()['showDeletedMessages'] === true) {
        $('<style type="text/css">.yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer {display: inline;} .yt-live-chat-text-message-renderer-0 #deleted-state.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0 #deleted-state:before{content: "  "}</style>').appendTo('head');
    }

    if(getOptions()['mentionHighlight'] === true) {
        $('<style type="text/css">.yt-live-chat-text-message-renderer-0 .mention.yt-live-chat-text-message-renderer { background-color: rgba(114, 15, 15, 0) !important; padding: 0px 0px !important; }</style>').appendTo('head');
    }

    console.log($('.yt-live-chat-header-renderer-0').css('background-color'));

    const chatColor = $('.yt-live-chat-header-renderer-0').css('background-color');
    if (chatColor === 'rgb(40, 40, 40)') {
        $('<style type="text/css">.yt-live-chat-text-message-renderer-0[author-type=moderator]{background-color:#282828}</style>').appendTo('head');
    } else if (chatColor === 'rgba(238, 238, 238, 0.4)') {
        $('<style type="text/css">.yt-live-chat-text-message-renderer-0[author-type=moderator]{background-color:#e2e2e2}</style>').appendTo('head');
    }

    onNewPageLoad();
});

__WEBPACK_IMPORTED_MODULE_1__subscribers__["a" /* default */].loadBadges();

if (getOptions()['emotesTwitch'] === true || getOptions()['emotesSub'] === true || getOptions()['emotesBTTV'] === true || getOptions()['emotesIce'] === true) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__chatObserver__["a" /* default */])();
}


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

        console.log(Subscribers.self);
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

                    const dataObserverConfig = { attributes: true, childList: true, characterData: true, subtree: true };
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
                }, 10);
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

            if (PageCheck.streampageChecks < 25) {
                setTimeout(PageCheck.livestreamPage, 250);
            }

            return;
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
    };
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
    const authorname = $('#author #author-name').text().toLowerCase();

    if (typeof authorname === 'undefined') {
        return;
    }

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['mentionHighlight'] && authorname.length > 2 && !node.hasClass('yt-live-chat-legacy-paid-message-renderer-0')) { // Check it's not sponsor / superchat, also mentionHighlight enabled

        const uniqueid = node.get(0).getAttribute('id'); // Copy unique message id
        const message = (" " + node.find('#message').text().toLowerCase() + " ").replace(/[\u200B-\u200D\uFEFF]/g, '');

        if (uniqueid === null) {
            return;
        }

        if (uniqueid.length > 30 && (message.indexOf(' '+authorname+' ') !== -1 || message.indexOf('@'+authorname+' ') !== -1)) { // If your name is in the message, and it's not your message
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = colorButton;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


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
    console.log($('.big-dick'));

    $(sponsorButton).ready( function() {
        $('.style-scope.iptv-sponsor-button.x-scope.yt-icon-0').html(sponsorImage);
    });

    $('.style-scope.ytg-watch-footer.x-scope.iptv-sponsor-button-0').on('click', () => {
        window.open('https://www.iceposeidon.com/', '_blank');
        $('.style-scope.ytg-watch-footer.x-scope.iptv-sponsor-button-0 paper-button')[0].blur();
    });

    const sponsorText = $('.ytg-membership-offer-button-0 .ytg-membership-offer-button').find('.ytg-formatted-string').text();
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGNjNjBhOGZjNGYxODNjYjY1MWUiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zdWJzY3JpYmVycy5qcyIsIndlYnBhY2s6Ly8vLi91dGlsLmpzIiwid2VicGFjazovLy8uL2Vtb3RlLmpzIiwid2VicGFjazovLy8uL2NoYXRPYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vbWVudGlvbkhpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvY29sb3JCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9kb25hdGVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mby5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L3Nwb25zb3JCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9zcG9uc29yQ2hlY2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFF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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsZ0NBQWdDO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN2ZUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFcUI7O0FBRXJCO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FB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LFNBQVMsY0FBYztBQUN2Qjs7Ozs7Ozs7QUN6Q0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNyQnFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsWUFBWSx5Q0FBeUMsZ0JBQWdCLGFBQWEsY0FBYzs7QUFFdEk7QUFDQSwwREFBMEQsZ0RBQWdELGFBQWE7QUFDdkg7QUFDQSw2Q0FBNkMsMkJBQTJCLGNBQWM7QUFDdEY7QUFDQSw0Q0FBNEMsY0FBYztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7Ozs7Ozs7O0FDckNxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQUE7QUFBQSIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkY2M2MGE4ZmM0ZjE4M2NiNjUxZSIsImltcG9ydCBQYWdlQ2hlY2sgZnJvbSAnLi9wYWdlQ2hlY2snO1xuaW1wb3J0IFN1YnNjcmliZXJzIGZyb20gJy4vc3Vic2NyaWJlcnMnO1xuaW1wb3J0IHsgaXNOb2RlIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBDaGF0T2JzZXJ2ZXIgZnJvbSAnLi9jaGF0T2JzZXJ2ZXInO1xuXG5leHBvcnQgY29uc3QgRElTQUxMT1dFRF9DSEFSUyA9IFsnXFxcXCcsICc6JywgJy8nLCAnJicsIFwiJ1wiLCAnXCInLCAnPycsICchJywgJyMnXSxcbiAgICAgICAgICAgICBTQ1JPTExfRU5BQkxFRF9VUkwgPSAgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2ljb25zL3Njcm9sbC1lbmFibGVkLnBuZycpLFxuICAgICAgICAgICAgIFNDUk9MTF9ESVNBQkxFRF9VUkwgPSAgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2ljb25zL3Njcm9sbC1kaXNhYmxlZC5wbmcnKTtcblxuZXhwb3J0IGxldCBvcHRpb25zID0gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ29wdGlvbnNDYWNoZScpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cblxuY29uc3Qgb25OZXdQYWdlTG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgJCgnW2NsYXNzXj1cImlwdHYtXCJdJykucmVtb3ZlKCk7XG5cbiAgICBpZiAoZ2V0T3B0aW9ucygpWydyZWRpcmVjdFRvWVRHYW1pbmcnXSA9PT0gdHJ1ZSkge1xuICAgICAgICBzZXRUaW1lb3V0KFBhZ2VDaGVjay55b3V0dWJlR2FtaW5nLCAyNTAwKTtcbiAgICB9XG5cbiAgICAkKCcueXQtbGl2ZS1jaGF0LWhlYWRlci1yZW5kZXJlciN0aXRsZScpLnRleHQoJ0NoYXQnKTtcblxuICAgIFBhZ2VDaGVjay5saXZlc3RyZWFtUGFnZSgpO1xufTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCA+IHRpdGxlJyk7XG5cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG9uTmV3UGFnZUxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzTm9kZSh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgeyBzdWJ0cmVlOiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUgfSk7XG59KCkpO1xuXG5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKCdyZXF1ZXN0U3Vic2NyaXB0aW9ucycsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICAgIG9wdGlvbnNbJ3N1YnNjcmlwdGlvbnMnXSA9IHJlc3BvbnNlO1xuICAgIH0pO1xufSwgNTAwMCk7XG5cbmNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKCdyZXF1ZXN0TG9jYWxzdG9yYWdlJywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblxuICAgIG9wdGlvbnMgPSByZXNwb25zZTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvcHRpb25zQ2FjaGUnLCBKU09OLnN0cmluZ2lmeShvcHRpb25zKSk7XG5cbiAgICBjb25zb2xlLmxvZygnQG9wdGlvbnM6Jywgb3B0aW9ucyk7XG5cbiAgICBpZiAoZ2V0T3B0aW9ucygpWydlbmFibGVDaGF0Q29sb3JzJ10pIHtcbiAgICAgICAgY29uc3QgYSA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdleHRlcm5hbC9jaGF0LWNvbG9ycy5jc3MnKTtcbiAgICAgICAgJCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCInICsgYSArICdcIiA+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICB9XG5cbiAgICBpZiAoZ2V0T3B0aW9ucygpWydkaXNhYmxlQXZhdGFycyddID09PSB0cnVlKSB7XG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4uc3R5bGUtc2NvcGUgLnl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXIgI2F1dGhvci1waG90byB7IHdpZHRoOiAwcHg7IGhlaWdodDogMHB4OyBtYXJnaW4tcmlnaHQ6IDBweDsgdmlzaWJpbGl0eTogaGlkZGVuOyB9LnN0eWxlLXNjb3BlLnl0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyLm5vLXRyYW5zaXRpb257IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfS5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlciAjYXZhdGFyIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O21hcmdpbjowICFpbXBvcnRhbnQ7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgfVxuXG4gICAgaWYgKGdldE9wdGlvbnMoKVsnZW5hYmxlU3BsaXRDaGF0J10gPT09IHRydWUpIHtcbiAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgYm9yZGVyLXRvcDogMC41cHggc29saWQgIzMzMzMzMzsgYm9yZGVyLWJvdHRvbTogMC41cHggc29saWQgIzAwMDAwMDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICB9XG5cbiAgICBpZihnZXRPcHRpb25zKClbJ3Nob3dEZWxldGVkTWVzc2FnZXMnXSA9PT0gdHJ1ZSkge1xuICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFtpcy1kZWxldGVkXTpub3QoW3Nob3ctb3JpZ2luYWxdKSAjbWVzc2FnZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHtkaXNwbGF5OiBpbmxpbmU7fSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2lzLWRlbGV0ZWRdOm5vdChbc2hvdy1vcmlnaW5hbF0pICNtZXNzYWdlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlOmJlZm9yZXtjb250ZW50OiBcIiAgXCJ9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xuICAgIH1cblxuICAgIGlmKGdldE9wdGlvbnMoKVsnbWVudGlvbkhpZ2hsaWdodCddID09PSB0cnVlKSB7XG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wIC5tZW50aW9uLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDExNCwgMTUsIDE1LCAwKSAhaW1wb3J0YW50OyBwYWRkaW5nOiAwcHggMHB4ICFpbXBvcnRhbnQ7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJCgnLnl0LWxpdmUtY2hhdC1oZWFkZXItcmVuZGVyZXItMCcpLmNzcygnYmFja2dyb3VuZC1jb2xvcicpKTtcblxuICAgIGNvbnN0IGNoYXRDb2xvciA9ICQoJy55dC1saXZlLWNoYXQtaGVhZGVyLXJlbmRlcmVyLTAnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InKTtcbiAgICBpZiAoY2hhdENvbG9yID09PSAncmdiKDQwLCA0MCwgNDApJykge1xuICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFthdXRob3ItdHlwZT1tb2RlcmF0b3Jde2JhY2tncm91bmQtY29sb3I6IzI4MjgyOH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XG4gICAgfSBlbHNlIGlmIChjaGF0Q29sb3IgPT09ICdyZ2JhKDIzOCwgMjM4LCAyMzgsIDAuNCknKSB7XG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2F1dGhvci10eXBlPW1vZGVyYXRvcl17YmFja2dyb3VuZC1jb2xvcjojZTJlMmUyfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcbiAgICB9XG5cbiAgICBvbk5ld1BhZ2VMb2FkKCk7XG59KTtcblxuU3Vic2NyaWJlcnMubG9hZEJhZGdlcygpO1xuXG5pZiAoZ2V0T3B0aW9ucygpWydlbW90ZXNUd2l0Y2gnXSA9PT0gdHJ1ZSB8fCBnZXRPcHRpb25zKClbJ2Vtb3Rlc1N1YiddID09PSB0cnVlIHx8IGdldE9wdGlvbnMoKVsnZW1vdGVzQlRUViddID09PSB0cnVlIHx8IGdldE9wdGlvbnMoKVsnZW1vdGVzSWNlJ10gPT09IHRydWUpIHtcbiAgICBDaGF0T2JzZXJ2ZXIoKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXRPcHRpb25zIH0gZnJvbSAnLi9tYWluJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Vic2NyaWJlcnNcbntcbiAgICBzdGF0aWMgbG9hZEJhZGdlcygpXG4gICAge1xuICAgICAgICBTdWJzY3JpYmVycy5iYWRnZXNbJzEnXSA9ICBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3RpZXJCYWRnZTEucG5nJyk7XG4gICAgICAgIFN1YnNjcmliZXJzLmJhZGdlc1snMiddID0gIGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvdGllckJhZGdlMi5wbmcnKTtcbiAgICAgICAgU3Vic2NyaWJlcnMuYmFkZ2VzWyczJ10gPSAgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy90aWVyQmFkZ2UzLnBuZycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXRTZWxmSW5mbyhpbWdTcmMpXG4gICAge1xuICAgICAgICBjb25zdCBwcm9maWxlSWQgPSBpbWdTcmMuc3BsaXQoJy8nKVszXTtcbiAgICAgICAgY29uc3Qgc3ViVGllciA9IGdldE9wdGlvbnNbJ3N1YnNjcmlwdGlvbnMnXVtwcm9maWxlSWRdWydzdWJ0aWVyJ107XG5cbiAgICAgICAgU3Vic2NyaWJlcnMuc2VsZiA9IHtcbiAgICAgICAgICAgIHByb2ZpbGVJbWFnZVVybDogaW1nU3JjLFxuICAgICAgICAgICAgcHJvZmlsZUlkOiBwcm9maWxlSWQsXG4gICAgICAgICAgICBzdWJUaWVyOiBzdWJUaWVyXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc29sZS5sb2coU3Vic2NyaWJlcnMuc2VsZik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHN1YnNjcmliZXIgaW5mb1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkQmFkZ2VzKG5vZGUpXG4gICAge1xuICAgICAgICBpZiAoJChub2RlKS5maW5kKCdpbWcnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgJChub2RlKS5maW5kKCcjYXV0aG9yLXBob3RvJylbMF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKiogTGlzdGVuIGZvciBtdXRhdGlvbnMgb24gYXV0aG9yIGltYWdlICovXG4gICAgICAgIGNvbnN0IGltYWdlT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG11dGF0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24uYXR0cmlidXRlTmFtZSA9PT0gJ3NyYycpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9maWxlSWQgPSBtdXRhdGlvbi50YXJnZXQuc3JjLnNwbGl0KCcvJylbM107XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2ZpbGVJZCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG11dGF0aW9uLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZmlsZS1pZCcsIHByb2ZpbGVJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViSW5mbyA9IGdldE9wdGlvbnMoKVsnc3Vic2NyaXB0aW9ucyddW3Byb2ZpbGVJZF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdWJJbmZvID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zdWItdGllcicsIDApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zdWItdGllcicsIGdldE9wdGlvbnMoKVsnc3Vic2NyaXB0aW9ucyddW3Byb2ZpbGVJZF1bJ3N1YnRpZXInXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBTdWJzY3JpYmVycy5zZXRCYWRnZUltYWdlKG5vZGUsIHByb2ZpbGVJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqIExpc3RlbiBmb3IgbXV0YXRpb25zIG9uIGRhdGEtcHJvZmlsZSBpZCBvZiBhdXRob3IgaW1hZ2UgKi9cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG11dGF0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9maWxlLWlkJykgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZmlsZS1pZCcsIHByb2ZpbGVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3ViLXRpZXInKSA9PT0gJycpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJJbmZvID0gZ2V0T3B0aW9ucygpWydzdWJzY3JpcHRpb25zJ11bcHJvZmlsZUlkXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN1YkluZm8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXN1Yi10aWVyJywgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXN1Yi10aWVyJywgZ2V0T3B0aW9ucygpWydzdWJzY3JpcHRpb25zJ11bcHJvZmlsZUlkXVsnc3VidGllciddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhT2JzZXJ2ZXJDb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgY2hhcmFjdGVyRGF0YTogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgICAgICBkYXRhT2JzZXJ2ZXIub2JzZXJ2ZShtdXRhdGlvbi50YXJnZXQsIGRhdGFPYnNlcnZlckNvbmZpZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGltYWdlT2JzZXJ2ZXJDb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgY2hhcmFjdGVyRGF0YTogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9O1xuICAgICAgICBpbWFnZU9ic2VydmVyLm9ic2VydmUoJChub2RlKS5maW5kKCcjYXV0aG9yLXBob3RvJylbMF0sIGltYWdlT2JzZXJ2ZXJDb25maWcpO1xuICAgIH07XG5cbiAgICBzdGF0aWMgc2V0QmFkZ2VJbWFnZShub2RlLCBwcm9maWxlSWQpXG4gICAge1xuICAgICAgICBpZiAoJChub2RlKS5maW5kKCcudGllci1iYWRnZScpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3ViSW5mbyA9IGdldE9wdGlvbnMoKVsnc3Vic2NyaXB0aW9ucyddW3Byb2ZpbGVJZF07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzdWJJbmZvID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGllckltZyA9IFN1YnNjcmliZXJzLmJhZGdlc1tzdWJJbmZvWydzdWJ0aWVyJ11dO1xuXG4gICAgICAgIGNvbnN0IGltZ0h0bWwgPSBgPHNwYW4gY2xhc3M9XCJoaW50LS1yaWdodFwiIGFyaWEtbGFiZWw9XCJJY2VQb3NlaWRvbi5jb20gJiMxMDsmIzEwO1RpZXIgJHtzdWJJbmZvWydzdWJ0aWVyJ119IFN1YnNjcmliZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7dGllckltZ31cIiBjbGFzcz1cInRpZXItYmFkZ2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5gO1xuXG4gICAgICAgICQobm9kZSkuZmluZCgnI2F1dGhvci1iYWRnZXMnKS5wcmVwZW5kKGltZ0h0bWwpO1xuXG4gICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2VuYWJsZUNoYXRDb2xvcnMnXSkge1xuICAgICAgICAgICAgJChub2RlKS5maW5kKCcjYXV0aG9yLW5hbWUnKS5jc3MoJ2NvbG9yJywgc3ViSW5mb1snY29sb3InXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBodG1sID0gJChub2RlKS5maW5kKCcjYXV0aG9yLWJhZGdlcycpLmh0bWwoKTtcblxuICAgICAgICAkKG5vZGUpLmZpbmQoJyNhdXRob3ItYmFkZ2VzJykub24oJ0RPTVN1YnRyZWVNb2RpZmllZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy50aWVyLWJhZGdlJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKGh0bWwpO1xuXG4gICAgICAgICAgICAgICAgLyoqIFJlbW92ZSBlbXB0eSBiYWRnZXMgYWRkZWQgYnkgWVQgKi9cbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy55dC1saXZlLWNoYXQtYXV0aG9yLWJhZGdlLXJlbmRlcmVyLTAnKS5lYWNoKGZ1bmN0aW9uKGksIGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGVsKS53aWR0aCgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKGVsKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5TdWJzY3JpYmVycy5jaGF0TWVzc2FnZXMgPSB7fTtcblN1YnNjcmliZXJzLmJhZGdlcyA9IHt9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zdWJzY3JpYmVycy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24gcmVwbGFjZUFsbChzdHIsIGZpbmQsIHJlcGxhY2UpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChmaW5kLCAnZycpLCByZXBsYWNlKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc05vZGUobykge1xuICAgIHJldHVybiAoXG4gICAgICAgIHR5cGVvZiBOb2RlID09PSAnb2JqZWN0JyA/IG8gaW5zdGFuY2VvZiBOb2RlIDogbyAmJiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG8ubm9kZVR5cGUgPT09ICdudW1iZXInICYmIHR5cGVvZiBvLm5vZGVOYW1lID09PSAnc3RyaW5nJ1xuICAgICk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHJlcGxhY2VBbGwgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgZ2V0T3B0aW9ucywgRElTQUxMT1dFRF9DSEFSUyB9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQgbG9hZGluZ0Vtb3Rlc0luZm8gZnJvbSAnLi9vdmVybGF5L2xvYWRpbmdFbW90ZXNJbmZvJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1vdGVcbntcbiAgICAvKipcbiAgICAgKiBMb2FkIGFsbCBlbmFibGVkIGVtb3Rlcy5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEVtb3RlcygpXG4gICAge1xuICAgICAgICBsb2FkaW5nRW1vdGVzSW5mbygpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGNvbnN0ICRsb2FkaW5nID0gJCgnLmlwdHYtbG9hZGluZy1lbW90ZXMnKTtcblxuICAgICAgICAgICAgaWYgKCRsb2FkaW5nWzBdKSB7XG5cbiAgICAgICAgICAgICAgICAkbG9hZGluZy5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAnY29sb3InOiAnI2MwMzkyYicsXG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyMyODI4MjgnLFxuICAgICAgICAgICAgICAgICAgICAncmlnaHQnOiAnMTlweCdcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRsb2FkaW5nLnRleHQoJ0ZhaWxlZCBsb2FkaW5nIHNvbWUgZW1vdGVzIChBUEkgc2VydmVycyBkb3duKScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCA3LjUgKiAxMDAwKTtcblxuICAgICAgICB9LCAxMCAqIDEwMDApO1xuXG4gICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2Vtb3Rlc1R3aXRjaCddKSBFbW90ZS5sb2FkVHdpdGNoRW1vdGVzKCk7XG4gICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2Vtb3Rlc1N1YiddKSBFbW90ZS5sb2FkU3ViRW1vdGVzKCk7XG5cbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnZW1vdGVzQlRUViddKSB7XG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkVtb3RlcygpO1xuICAgICAgICAgICAgRW1vdGUubG9hZEJUVFZDaGFubmVsRW1vdGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBFbW90ZS53YWl0VGlsbEVtb3Rlc0xvYWRlZCgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBzZXRUaW1lb3V0IHRoYXQga2VlcHMgcnVubmluZyB1bnRpbCBhbGwgZW1vdGVzIGFyZSBsb2FkZWQuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB3YWl0VGlsbEVtb3Rlc0xvYWRlZCgpXG4gICAge1xuICAgICAgICBpZiAoKGdldE9wdGlvbnMoKVsnZW1vdGVzVHdpdGNoJ10gIT09IEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkKSB8fFxuICAgICAgICAgICAgKGdldE9wdGlvbnMoKVsnZW1vdGVzU3ViJ10gIT09IEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkKSB8fFxuICAgICAgICAgICAgKGdldE9wdGlvbnMoKVsnZW1vdGVzQlRUViddICE9PSBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQpIHx8XG4gICAgICAgICAgICAoZ2V0T3B0aW9ucygpWydlbW90ZXNCVFRWJ10gIT09IEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkKSkge1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KEVtb3RlLndhaXRUaWxsRW1vdGVzTG9hZGVkLCAyNTApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGVtcCBmaXggdG8gcHJldmVudCByYW0gZnJvbSBmaWxsaW5nIHVwIHdpdGggbWVzc2FnZXMuXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEVtb3RlLm1lc3NhZ2VzID0ge307XG4gICAgICAgIH0sIDEwMDAgKiA2MCAqIDUpO1xuXG4gICAgICAgIEVtb3RlLmxvYWRJY2VFbW90ZXMoKTtcblxuICAgICAgICBjb25zdCBibGFja2xpc3RlZEVtb3RlcyA9IFsnVEhJQ0MnXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsYWNrbGlzdGVkRW1vdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkZWxldGUgRW1vdGUuZW1vdGVzW2JsYWNrbGlzdGVkRW1vdGVzW2ldXTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJykucmVtb3ZlKCk7XG4gICAgICAgIEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcygpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlIGV4aXN0aW5nIHRleHQgd2l0aCBlbW90ZXMgaW4gY2hhdCwgaGFwcGVucyB3aGVuIGVtb3RlcyBhcmUgZG9uZSBsb2FkaW5nLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVwbGFjZUV4aXN0aW5nRW1vdGVzKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGNoYXRFbGVtZW50cyA9ICQoJy5zdHlsZS1zY29wZS55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyLngtc2NvcGUueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wJyk7XG5cbiAgICAgICAgaWYgKGNoYXRFbGVtZW50cy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcywgMjUwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoYXRFbGVtZW50cy5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgICAgRW1vdGUuZW1vdGVDaGVjayhlbCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIGVtb3Rlcy5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtub2RlfSBub2RlIC0gTWVzc2FnZSBub2RlXG4gICAgICovXG4gICAgc3RhdGljIGVtb3RlQ2hlY2sobm9kZSlcbiAgICB7XG4gICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2Vtb3Rlc1R3aXRjaCddID09PSBmYWxzZSAmJiBnZXRPcHRpb25zKClbJ2Vtb3Rlc1N1YiddID09PSBmYWxzZSAmJiBnZXRPcHRpb25zKClbJ2Vtb3Rlc0JUVFYnXSA9PT0gZmFsc2UgJiYgZ2V0T3B0aW9ucygpWydlbW90ZXNJY2UnXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0ICRtZXNzYWdlID0gJChub2RlKS5maW5kKCcjbWVzc2FnZScpO1xuICAgICAgICBFbW90ZS5rYXBwYUNoZWNrKCRtZXNzYWdlKTtcblxuICAgICAgICBsZXQgb2xkSFRNTCA9ICRtZXNzYWdlLmh0bWwoKS50cmltKCk7XG4gICAgICAgIGxldCBtc2dIVE1MID0gb2xkSFRNTDtcblxuICAgICAgICBjb25zdCB3b3JkcyA9IG1zZ0hUTUwucmVwbGFjZSgnL1xceEVGXFx4QkJcXHhCRi8nLCAnJykucmVwbGFjZSgn77u/JywgJycpLnNwbGl0KCcgJyk7XG4gICAgICAgIGNvbnN0IHVuaXF1ZVdvcmRzID0gW107XG4gICAgICAgIGxldCBlbW90ZUNvdW50ID0gMDtcbiAgICAgICAgbGV0IGNoYW5nZUF0dGVtcHRzID0gMDtcblxuICAgICAgICAkLmVhY2god29yZHMsIGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgICAgaWYgKCQuaW5BcnJheShlbCwgdW5pcXVlV29yZHMpID09PSAtMSkgdW5pcXVlV29yZHMucHVzaChlbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5pcXVlV29yZHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgY29uc3Qgd29yZCA9IHVuaXF1ZVdvcmRzW2ldO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIEVtb3RlLmVtb3Rlc1t3b3JkXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZVRpZXIgPSAkKG5vZGUpLmZpbmQoJyNhdXRob3ItcGhvdG8nKS5kYXRhKCdzdWItdGllcicpO1xuICAgICAgICAgICAgbGV0IHRvb2x0aXBUZXh0ID0gd29yZDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlVGllciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZUNoZWNrKG5vZGUpXG4gICAgICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VUaWVyIDwgRW1vdGUuZW1vdGVzW3dvcmRdWyd0aWVyJ10pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGVtb3RlVGllciA9IEVtb3RlLmVtb3Rlc1t3b3JkXVsndGllciddO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIEVtb3RlLmVtb3Rlc1t3b3JkXVsndGllciddICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRvb2x0aXBUZXh0ID0gYEljZVBvc2VpZG9uLmNvbSAmIzEwOyYjMTA7VGllciAke2Vtb3RlVGllcn0gU3ViIEVtb3RlICYjMTA7JiMxMDske3dvcmR9YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZW1vdGVDb3VudCsrO1xuXG4gICAgICAgICAgICBjb25zdCBlbW90ZUh0bWwgPSBgPHNwYW4gY2xhc3M9XCJoaW50LS10b3BcIiBhcmlhLWxhYmVsPVwiJHt0b29sdGlwVGV4dH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtFbW90ZS5lbW90ZXNbd29yZF1bJ3VybCddfVwiIGFsdD1cIiR7d29yZH1cIiBzdHlsZT1cImRpc3BsYXk6aW5saW5lO3dpZHRoOmF1dG87bWF4LWhlaWdodDozMnB4O292ZXJmbG93OmhpZGRlbjtcIiBjbGFzcz1cImV4dGVuc2lvbi1lbW90ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+YDtcblxuICAgICAgICAgICAgbXNnSFRNTCA9IHJlcGxhY2VBbGwobXNnSFRNTCwgd29yZCwgZW1vdGVIdG1sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbW90ZUNvdW50IDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJG1lc3NhZ2UuaHRtbChtc2dIVE1MKTtcblxuICAgICAgICAkbWVzc2FnZS5wYXJlbnQoKS5wYXJlbnQoKS5iaW5kKCdET01TdWJ0cmVlTW9kaWZpZWQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0ICRtZXNzYWdlID0gJCh0aGlzKS5maW5kKCcjbWVzc2FnZScpO1xuICAgICAgICAgICAgRW1vdGUua2FwcGFDaGVjaygkbWVzc2FnZSk7XG5cbiAgICAgICAgICAgIGxldCBodG1sID0gJG1lc3NhZ2UuaHRtbCgpLnRyaW0oKTtcblxuICAgICAgICAgICAgaWYgKGNoYW5nZUF0dGVtcHRzID4gMzApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaHRtbCA9PT0gJ3VuZGVmaW5lZCcgfHwgaHRtbCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChodG1sLmluY2x1ZGVzKCdleHRlbnNpb24tZW1vdGUnKSkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjaGFuZ2VBdHRlbXB0cysrO1xuXG4gICAgICAgICAgICAkbWVzc2FnZS5odG1sKG1zZ0hUTUwpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBhIGthcHBhIGVtb3RlLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge25vZGV9IG1zZyAtIE1lc3NhZ2Ugbm9kZVxuICAgICAqL1xuICAgIHN0YXRpYyBrYXBwYUNoZWNrKG1zZylcbiAgICB7XG4gICAgICAgICQoJ2ltZycsIG1zZykuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgY29uc3QgJGltZyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICgvXFx1ZDgzY1xcdWRmMWQvZy50ZXN0KCRpbWcuYXR0cignYWx0JykpKSB7XG4gICAgICAgICAgICAgICAgJGltZy5yZXBsYWNlV2l0aChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnS2FwcGEnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIFR3aXRjaCBlbW90ZXMuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkVHdpdGNoRW1vdGVzKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vdHdpdGNoZW1vdGVzLmNvbS9hcGlfY2FjaGUvdjIvZ2xvYmFsLmpzb24nKTtcbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgeGhyLnRpbWVvdXQgPSA1MDAwO1xuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICdodHRwczovL3N0YXRpYy1jZG4uanR2bncubmV0L2Vtb3RpY29ucy92MS8nO1xuXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZVRleHQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBlbW90ZURpYyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClbJ2Vtb3RlcyddO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVtb3RlIGluIGVtb3RlRGljKSB7XG5cbiAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbZW1vdGVdID0ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZW1vdGVEaWNbZW1vdGVdWydpbWFnZV9pZCddICsgJy8nICsgJzEuMCdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIExvYWQgVHdpdGNoIHN1YnNjcmliZXIgZW1vdGVzLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZFN1YkVtb3RlcygpXG4gICAge1xuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL3R3aXRjaGVtb3Rlcy5jb20vYXBpX2NhY2hlL3YyL3N1YnNjcmliZXIuanNvbicpO1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB4aHIudGltZW91dCA9IDUwMDA7XG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJ2h0dHBzOi8vc3RhdGljLWNkbi5qdHZudy5uZXQvZW1vdGljb25zL3YxLyc7XG5cbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVGV4dCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGVtb3RlRGljID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnY2hhbm5lbHMnXTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBjaGFubmVsIGluIGVtb3RlRGljKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZW1vdGVEaWNbY2hhbm5lbF1bJ2Vtb3RlcyddKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGljdCA9IGVtb3RlRGljW2NoYW5uZWxdWydlbW90ZXMnXVtpXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGRpY3RbJ2NvZGUnXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoRW1vdGUuaXNWYWxpZEVtb3RlKGNvZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbY29kZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2ltYWdlX2lkJ10gKyAnLycgKyAnMS4wJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIEJUVFYgZW1vdGVzLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEJUVFZFbW90ZXMoKVxuICAgIHtcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly9hcGkuYmV0dGVydHR2Lm5ldC8yL2Vtb3RlcycpO1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB4aHIudGltZW91dCA9IDUwMDA7XG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJ2h0dHBzOi8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvJztcblxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0ID09PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZW1vdGVMaXN0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnZW1vdGVzJ107XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZUxpc3QpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRpY3QgPSBlbW90ZUxpc3RbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAoIUVtb3RlLmNvbnRhaW5zRGlzYWxsb3dlZENoYXIoZGljdFsnY29kZSddKSkge1xuICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbZGljdFsnY29kZSddXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBkaWN0WydpZCddICsgJy8nICsgJzF4J1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIEJUVFYgY2hhbm5lbCBlbW90ZXMuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkQlRUVkNoYW5uZWxFbW90ZXMoKVxuICAgIHtcbiAgICAgICAgY29uc3QgY2hhbm5lbHMgPSBnZXRPcHRpb25zKClbJ0JUVFZDaGFubmVscyddO1xuICAgICAgICBjb25zdCBjb21tYUNoYW5uZWxzID0gY2hhbm5lbHMucmVwbGFjZSgvXFxzKy9nLCAnJykuc3BsaXQoJywnKTtcbiAgICAgICAgbGV0IGNoYW5uZWxzTGVuZ3RoID0gY29tbWFDaGFubmVscy5sZW5ndGg7XG5cbiAgICAgICAgY29tbWFDaGFubmVscy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFubmVsKSB7XG5cbiAgICAgICAgICAgIGlmIChjaGFubmVsLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBjaGFubmVsc0xlbmd0aC0tO1xuXG4gICAgICAgICAgICAgICAgaWYgKEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQgPj0gY2hhbm5lbHNMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLmJldHRlcnR0di5uZXQvMi9jaGFubmVscy8nICsgY2hhbm5lbCk7XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICAgICAgeGhyLnRpbWVvdXQgPSA1MDAwO1xuICAgICAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnaHR0cHM6Ly9jZG4uYmV0dGVydHR2Lm5ldC9lbW90ZS8nO1xuXG4gICAgICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50Kys7XG5cbiAgICAgICAgICAgICAgICBpZiAoRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCA+PSBjaGFubmVsc0xlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQrKztcblxuICAgICAgICAgICAgICAgIGlmIChFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50ID49IGNoYW5uZWxzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCsrO1xuXG4gICAgICAgICAgICAgICAgaWYgKEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQgPj0gY2hhbm5lbHNMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0ID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZW1vdGVMaXN0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnZW1vdGVzJ107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZW1vdGVMaXN0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGljdCA9IGVtb3RlTGlzdFtpXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIUVtb3RlLmNvbnRhaW5zRGlzYWxsb3dlZENoYXIoZGljdFsnY29kZSddKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2RpY3RbJ2NvZGUnXV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2lkJ10gKyAnLycgKyAnMXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IGNoYW5uZWwgKyAnIChidHR2KSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIEljZSdzIG9sZCBzdWJzY3JpYmVyIGVtb3Rlcy5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRJY2VFbW90ZXMoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgc3ViVGllckVtb3RlcyA9IHtcbiAgICAgICAgICAgIDE6IFtcbiAgICAgICAgICAgICAgICAncHVycGxlMScsICdwdXJwbGUyJywgJ3B1cnBsZTMnLCAncHVycGxlNCcsICdwdXJwbGVBaGhoJywgJ3B1cnBsZUFybTEnLCAncHVycGxlQXJtMicsICdwdXJwbGVCbHVlc2NyZWVuJywgJ3B1cnBsZUJydWgnLCAncHVycGxlQ2lncmlwJywgJ3B1cnBsZUNsYXVzJyxcbiAgICAgICAgICAgICAgICAncHVycGxlQ29vbHN0b3J5JywgJ3B1cnBsZUNyZWVwJywgJ3B1cnBsZUVuemEnLCAncHVycGxlRmFrZScsICdwdXJwbGVSZWFsJywgJ3B1cnBsZUZyYW5rJywgJ3B1cnBsZUZybycsICdwdXJwbGVJY2UnLCAncHVycGxlS0tvbmEnLCAncHVycGxlTFVMJyxcbiAgICAgICAgICAgICAgICAncHVycGxlT21nJywgJ3B1cnBsZVByaWRlJywgJ3B1cnBsZVJvZmwnLCAncHVycGxlTGVvJywgJ3B1cnBsZVcnLCAncHVycGxlV2F0J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDI6IFtcbiAgICAgICAgICAgICAgICAncHVycGxlQ3gnLCAncHVycGxlTGV3ZCcsICdwdXJwbGVMYW1hJywgJ3B1cnBsZVBpenphJywgJ3B1cnBsZVdhbGxldCcsICdwdXJwbGVTJywgJ3B1cnBsZUxhdGUnLCAncHVycGxlTW9vc2UnLCAncHVycGxlTm9zZScsICdwdXJwbGVXdXQnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMzogW1xuICAgICAgICAgICAgICAgICdwdXJwbGVBbGxlbidcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBmb3IoY29uc3QgdGllciBpbiBzdWJUaWVyRW1vdGVzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YlRpZXJFbW90ZXNbdGllcl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbc3ViVGllckVtb3Rlc1t0aWVyXVtpXV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9lbW90ZXMvJyArIHN1YlRpZXJFbW90ZXNbdGllcl1baV0gKyAnLnBuZycpLFxuICAgICAgICAgICAgICAgICAgICB0aWVyOiB0aWVyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0ZXh0IGlzIGEgdmFsaWQgZW1vdGVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNWYWxpZEVtb3RlKHRleHQpXG4gICAge1xuICAgICAgICByZXR1cm4gISh0ZXh0WzBdLm1hdGNoKC9bQS1aXS9nKSB8fFxuICAgICAgICAgICAgdGV4dC5tYXRjaCgvXlthLXpdKyQvZykgfHxcbiAgICAgICAgICAgIHRleHQubWF0Y2goL15cXGQqJC9nKVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGV4dCBjb250YWlucyBkaXNhbGxvd2VkIGNoYXJhY3RlcnMuXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB3b3JkXG4gICAgICovXG4gICAgc3RhdGljIGNvbnRhaW5zRGlzYWxsb3dlZENoYXIod29yZClcbiAgICB7XG4gICAgICAgIGZvciAoY29uc3QgYyBpbiBESVNBTExPV0VEX0NIQVJTKSB7XG4gICAgICAgICAgICBpZiAod29yZC5pbmRleE9mKGMpID4gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufTtcblxuRW1vdGUuc3RhdGVzID0ge1xuICAgIHR3aXRjaDoge1xuICAgICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBzdWI6IHtcbiAgICAgICAgbG9hZGVkOiBmYWxzZVxuICAgIH0sXG4gICAgQlRUVjoge1xuICAgICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBCVFRWQ2hhbm5lbHM6IHtcbiAgICAgICAgbG9hZGVkOiBmYWxzZSxcbiAgICAgICAgbG9hZGVkQ291bnQ6IDBcbiAgICB9XG59O1xuXG5FbW90ZS5lbW90ZXMgPSB7fTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZW1vdGUuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xyXG5pbXBvcnQgU3Vic2NyaWJlcnMgZnJvbSAnLi9zdWJzY3JpYmVycyc7XHJcbmltcG9ydCBNZW50aW9uSGlnaGxpZ2h0IGZyb20gJy4vbWVudGlvbkhpZ2hsaWdodCc7XHJcblxyXG4vKipcclxuICogQmluZHMgY2hhdCBtdXRhdGlvbiBvYnNlcnZlciBhbmQgbGlzdGVuIGZvciBuZXcgY2hhdCBtZXNzYWdlcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoYXRPYnNlcnZlcigpXHJcbntcclxuICAgIC8qKiBMb29wIG92ZXIgZXhpc3RpbmcgbWVzc2FnZXMgYW5kIGFkZCBiYWRnZXMgKi9cclxuICAgICQoZG9jdW1lbnQpLm9uKCdET01Ob2RlSW5zZXJ0ZWQnLCAkKCcjY2hhdCcpLnBhcmVudCgpLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuZmluZCgnaW1nJykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBMaXN0ZW4gZm9yIHNlbGYtYXZhdGFyIGxvYWQgYW5kIHNldCBzZWxmLWluZm8gKi9cclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuZmluZCgnI2F2YXRhcicpLmxlbmd0aCAhPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgJChlLnRhcmdldCkuZmluZCgnI2F2YXRhcicpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nU3JjID0gJCh0aGlzKS5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW1nU3JjLmluY2x1ZGVzKCdodHRwczovLycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgU3Vic2NyaWJlcnMuc2V0U2VsZkluZm8oaW1nU3JjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mICQoZS50YXJnZXQpLmZpbmQoJyNhdXRob3ItcGhvdG8nKVswXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU3Vic2NyaWJlcnMuYWRkQmFkZ2VzKGUudGFyZ2V0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdHlsZS1zY29wZSAueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpO1xyXG5cclxuICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgc2V0VGltZW91dChjaGF0T2JzZXJ2ZXIsIDI1MCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoYXQgYm94IG9ic2VydmVyXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcclxuXHJcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdOb2RlcyA9IG11dGF0aW9uLmFkZGVkTm9kZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3Tm9kZXMgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCAkbm9kZXMgPSAkKG5ld05vZGVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRub2RlID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkbm9kZS5oYXNDbGFzcygneXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE1lbnRpb25IaWdobGlnaHQoJG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3RlQ2hlY2soJG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXHJcbiAgICAgICAgYXR0cmlidXRlczogZmFsc2UsXHJcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NoYXRPYnNlcnZlci5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRW1vdGUgZnJvbSAnLi9lbW90ZSc7XHJcbmltcG9ydCBkb25hdGVCdXR0b24gZnJvbSAnLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbic7XHJcbmltcG9ydCBzcG9uc29yQnV0dG9uIGZyb20gJy4vb3ZlcmxheS9zcG9uc29yQnV0dG9uJztcclxuaW1wb3J0IGNvbG9yQnV0dG9uIGZyb20gJy4vb3ZlcmxheS9jb2xvckJ1dHRvbic7XHJcbmltcG9ydCBjaGVja0lmV2F0Y2hpbmdMaXZlIGZyb20gJy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlJztcclxuaW1wb3J0IEFsd2F5c1Njcm9sbERvd24gZnJvbSAnLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24nO1xyXG5pbXBvcnQgU3BvbnNvckNoZWNrIGZyb20gJy4vb3ZlcmxheS9zcG9uc29yQ2hlY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZUNoZWNrXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHVzZXIgaXMgd2F0Y2hpbmcgZnJvbSB3cm9uZyBsaXZlc3RyZWFtIHBhZ2UgYW5kIHdhcm5zIHRoZW0uXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB5b3V0dWJlR2FtaW5nKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGl2ZS1jaGF0LWlmcmFtZScpO1xyXG5cclxuICAgICAgICBjb25zdCAkdGV4dFdyYXBwZXIgPSAkKCcueXQtdXNlci1pbmZvJyk7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9ICR0ZXh0V3JhcHBlci5maW5kKCdhJykudGV4dCgpO1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgICAgICBpZiAodGV4dCA9PT0gJ0ljZSBQb3NlaWRvbicgJiYgIXVybC5pbmNsdWRlcygnZ2FtaW5nLnlvdXR1YmUnKSAmJiBpZnJhbWUpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlZGlyZWN0Q29uZmlybSA9IGNvbmZpcm0oJ1tJY2UgUG9zZWlkb25UVl0gR28gdG8gdGhlIG9mZmljaWFsIEljZSBQb3NlaWRvbiBsaXZlc3RyZWFtIHBhZ2U/Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVkaXJlY3RDb25maXJtID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnaHR0cHM6Ly9nYW1pbmcueW91dHViZS5jb20vaWNlX3Bvc2VpZG9uL2xpdmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB1c2VyIGlzIHdhdGNoaW5nIGEgbGl2ZXN0cmVhbSBvbiBZb3V0dWJlIGdhbWluZy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxpdmVzdHJlYW1QYWdlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3duZXInKTtcclxuICAgICAgICBjb25zdCBjaGF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXQnKTtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gJCh0YXJnZXQpLmZpbmQoJ3NwYW4nKS50ZXh0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgICAgIGlmICgoIXRhcmdldCB8fCAhY2hhdCkgJiYgKCF1cmwuaW5jbHVkZXMoJ2xpdmVfY2hhdCcpICYmICF1cmwuaW5jbHVkZXMoJ2lzX3BvcG91dD0xJykpKSB7XHJcblxyXG4gICAgICAgICAgICBQYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcysrO1xyXG5cclxuICAgICAgICAgICAgaWYgKFBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzIDwgMjUpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoUGFnZUNoZWNrLmxpdmVzdHJlYW1QYWdlLCAyNTApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0ZXh0ID09PSAnSWNlIFBvc2VpZG9uJykge1xyXG4gICAgICAgICAgICBkb25hdGVCdXR0b24oKTtcclxuICAgICAgICAgICAgc3BvbnNvckJ1dHRvbigpO1xyXG4gICAgICAgICAgICBjb2xvckJ1dHRvbigpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KFNwb25zb3JDaGVjay5jaGVjaywgMjUwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBFbW90ZS5sb2FkRW1vdGVzKCk7XHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5pbml0KCk7XHJcbiAgICAgICAgY2hlY2tJZldhdGNoaW5nTGl2ZSgpO1xyXG4gICAgfTtcclxufTtcclxuXHJcblBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzID0gMDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wYWdlQ2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0T3B0aW9ucyB9IGZyb20gJy4vbWFpbic7XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBtZW50aW9uIGFuZCBjaGFuZ2VzIGJhY2tncm91bmQgdG8gQlRUViBzdHlsZSBiYWNrZ3JvdW5kLlxyXG4gKiBAcGFyYW0ge25vZGV9IG5vZGUgLSBNZXNzYWdlIG5vZGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1lbnRpb25IaWdobGlnaHQobm9kZSlcclxue1xyXG4gICAgY29uc3QgYXV0aG9ybmFtZSA9ICQoJyNhdXRob3IgI2F1dGhvci1uYW1lJykudGV4dCgpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBhdXRob3JuYW1lID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZ2V0T3B0aW9ucygpWydtZW50aW9uSGlnaGxpZ2h0J10gJiYgYXV0aG9ybmFtZS5sZW5ndGggPiAyICYmICFub2RlLmhhc0NsYXNzKCd5dC1saXZlLWNoYXQtbGVnYWN5LXBhaWQtbWVzc2FnZS1yZW5kZXJlci0wJykpIHsgLy8gQ2hlY2sgaXQncyBub3Qgc3BvbnNvciAvIHN1cGVyY2hhdCwgYWxzbyBtZW50aW9uSGlnaGxpZ2h0IGVuYWJsZWRcclxuXHJcbiAgICAgICAgY29uc3QgdW5pcXVlaWQgPSBub2RlLmdldCgwKS5nZXRBdHRyaWJ1dGUoJ2lkJyk7IC8vIENvcHkgdW5pcXVlIG1lc3NhZ2UgaWRcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gKFwiIFwiICsgbm9kZS5maW5kKCcjbWVzc2FnZScpLnRleHQoKS50b0xvd2VyQ2FzZSgpICsgXCIgXCIpLnJlcGxhY2UoL1tcXHUyMDBCLVxcdTIwMERcXHVGRUZGXS9nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmICh1bmlxdWVpZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodW5pcXVlaWQubGVuZ3RoID4gMzAgJiYgKG1lc3NhZ2UuaW5kZXhPZignICcrYXV0aG9ybmFtZSsnICcpICE9PSAtMSB8fCBtZXNzYWdlLmluZGV4T2YoJ0AnK2F1dGhvcm5hbWUrJyAnKSAhPT0gLTEpKSB7IC8vIElmIHlvdXIgbmFtZSBpcyBpbiB0aGUgbWVzc2FnZSwgYW5kIGl0J3Mgbm90IHlvdXIgbWVzc2FnZVxyXG4gICAgICAgICAgICBub2RlLmdldCgwKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LDAsMCwwLjQwKVwiO1xyXG4gICAgICAgICAgICBub2RlLmZpbmQoJyNhdXRob3ItbmFtZScpLmdldCgwKS5zdHlsZS5jb2xvciA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tZW50aW9uSGlnaGxpZ2h0LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFNDUk9MTF9FTkFCTEVEX1VSTCwgU0NST0xMX0RJU0FCTEVEX1VSTCB9IGZyb20gJy4vLi4vbWFpbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHdheXNTY3JvbGxEb3duXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IGFuZCBiaW5kcyB0aGUgbmVjZXNzYXJ5IGxpc3RlbmVycy5cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCQoJy5pcHR2LXNjcm9sbGRvd24td3JhcHBlcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkKCcuaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKS5yZW1vdmUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBzY3JvbGxXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIHNjcm9sbFdyYXBwZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0Fsd2F5cyBzY3JvbGwgZG93biAoRW5hYmxlZCknKTtcclxuICAgICAgICBzY3JvbGxXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2hpbnQtLXRvcCcsICdpcHR2LXNjcm9sbGRvd24td3JhcHBlcicpO1xyXG5cclxuICAgICAgICAkKHNjcm9sbFdyYXBwZXIpLmNzcyh7XHJcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICdyaWdodCc6ICcxMTNweCcsXHJcbiAgICAgICAgICAgICdib3R0b20nOiAnMThweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChzY3JvbGxXcmFwcGVyKS5odG1sKGBcclxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaXB0di1zY3JvbGxkb3duLXRvZ2dsZVwiIHN0eWxlPVwib3V0bGluZTogMDtcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtTQ1JPTExfRU5BQkxFRF9VUkx9XCIgYWx0PVwiQWx3YXlzIHNjcm9sbCBkb3duXCIgaGVpZ2h0PVwiMTFcIiB3aWR0aD1cIjExXCIgY2xhc3M9XCJpcHR2LXNjcm9sbGRvd24tdG9nZ2xlLWljb25cIj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgIGApO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbFdyYXBwZXIpO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmlwdHYtc2Nyb2xsZG93bi10b2dnbGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi50b2dnbGVTY3JvbGxEb3duKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2l0ZW0tc2Nyb2xsZXInKS5zY3JvbGxUb3AoOTk5OTk5OTk5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uQ2luZW1hKHNjcm9sbFdyYXBwZXIpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uU3BvbnNvck1lbnUoc2Nyb2xsV3JhcHBlcik7XHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyB0aGUgJ0Fsd2F5cyBzY3JvbGwgZG93bicgb3ZlcmxheSB3aGVuIGNpbmVtYSBtb2RlIGlzIG9wZW5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bm9kZX0gc2Nyb2xsV3JhcHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGlkZVNjcm9sbE9uQ2luZW1hKHNjcm9sbFdyYXBwZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgd2F0Y2hQYWdlID0gJ3l0Zy13YXRjaC1wYWdlJztcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG0pID0+IHtcclxuICAgICAgICAgICAgICAgICQobS50YXJnZXQpLmlzKCdbc2lkZWJhci1jb2xsYXBzZWRdJykgPyAkKHNjcm9sbFdyYXBwZXIpLmhpZGUoKSA6ICQoc2Nyb2xsV3JhcHBlcikuc2hvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJPcHRzID0ge1xyXG4gICAgICAgICAgICBjaGlsZExpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzaWRlYmFyLWNvbGxhcHNlZCddXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgYWRkT2JzZXJ2ZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkKHdhdGNoUGFnZSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKCQod2F0Y2hQYWdlKVswXSwgb2JzZXJ2ZXJPcHRzKTtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoYWRkT2JzZXJ2ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMjUwKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyB0aGUgJ0Fsd2F5cyBzY3JvbGwgZG93bicgb3ZlcmxheSB3aGVuIHNwb25zb3IgbWVudSBpcyBvcGVuLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtub2RlfSBzY3JvbGxXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlU2Nyb2xsT25TcG9uc29yTWVudShzY3JvbGxXcmFwcGVyKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGNoYXRJbnB1dFJlbmRlcmVyID0gJ3l0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyJztcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKG0udGFyZ2V0KS5hdHRyKCdjcmVhdG9yLW9wZW4nKSA/ICQoc2Nyb2xsV3JhcHBlcikuaGlkZSgpIDogJChzY3JvbGxXcmFwcGVyKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBvYnNlcnZlck9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ2NyZWF0b3Itb3BlbiddXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzcG9uc29yQ2xpY2sgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkKGNoYXRJbnB1dFJlbmRlcmVyKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoJChjaGF0SW5wdXRSZW5kZXJlcilbMF0sIG9ic2VydmVyT3B0cyk7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHNwb25zb3JDbGljayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyNTApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2FibGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIGZ1bmN0aW9uYWxpdHkgd2hlbiBzY3JvbGxpbmcgbWFudWFsbHkuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBiaW5kU2Nyb2xsTGlzdGVuZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVtLXNjcm9sbGVyJyk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxMaXN0ZW5lcigpIH0sIDI1MCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJyNpdGVtLXNjcm9sbGVyJykub24oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bihmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJyNpdGVtLXNjcm9sbGVyJykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQgPT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bihmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmFibGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIGZ1bmN0aW9uYWxpdHkgd2hlbiBibHVlIGp1bXAgZG93biBidXR0b24gaXMgY2xpY2tlZC5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LW1vcmUnKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4geyBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKSB9LCAyNTApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YXJnZXQub25tb3VzZWRvd24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bih0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb2dnbGUgc2Nyb2xsRG93biBzdGF0ZSBhbmQgYWRqdXN0IG92ZXJsYXkgYWNjb3JkaW5nbHkuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0b2dnbGVTY3JvbGxEb3duKHN0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9ICFBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd247XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID0gc3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKS5hdHRyKCdhcmlhLWxhYmVsJywgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID8gJ0Fsd2F5cyBzY3JvbGwgZG93biAoRW5hYmxlZCknIDogJ0Fsd2F5cyBzY3JvbGwgZG93biAoRGlzYWJsZWQpJyk7XHJcbiAgICAgICAgJCgnLmlwdHYtc2Nyb2xsZG93bi10b2dnbGUtaWNvbicpLmF0dHIoJ3NyYycsIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA/IFNDUk9MTF9FTkFCTEVEX1VSTCA6IFNDUk9MTF9ESVNBQkxFRF9VUkwpO1xyXG4gICAgfTtcclxufTtcclxuXHJcbkFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9IHRydWU7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9hbHdheXNTY3JvbGxEb3duLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBDaGVja3MgaWYgdXNlciBpcyBiZWhpbmQgaW4gbGl2ZXN0cmVhbSBhbmQgd2FybnMgdGhlbS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrSWZXYXRjaGluZ0xpdmUoKSB7XHJcblxyXG4gICAgbGV0IGxpdmVDaGVja0ludGVydmFsID0gbnVsbDtcclxuXHJcbiAgICBsaXZlQ2hlY2tJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBjb25zdCAkbGl2ZUJ1dHRvbiA9ICQoJy55dHAtbGl2ZS1iYWRnZS55dHAtYnV0dG9uJyk7XHJcblxyXG4gICAgICAgIGlmICgkbGl2ZUJ1dHRvbi5pcygnOmVuYWJsZWQnKSAmJiAkbGl2ZUJ1dHRvbi5pcygnOnZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAkKCcjcGxheWVyLWNvbnRhaW5lcicpLmFwcGVuZChgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBZb3VcXCdyZSB3YXRjaGluZyBvbGQgZm9vdGFnZSwgY2xpY2sgdGhlIExJVkUgYnV0dG9uIGluIHRoZSBib3R0b20gbGVmdCBjb3JuZXIgdG8gd2F0Y2ggbGl2ZS5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctZGlzbWlzc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJpcHR2LWxpdmUtd2FybmluZy1jbG9zZVwiPuKclTwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKTtcclxuICAgICAgICB9XHJcbiAgICB9LCAxNSAqIDEwMDApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaXB0di1saXZlLXdhcm5pbmctY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuaXB0di1saXZlLXdhcm5pbmcnKS5yZW1vdmUoKTtcclxuICAgICAgICBjbGVhckludGVydmFsKGxpdmVDaGVja0ludGVydmFsKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZWRvd24nLCAnLnl0cC1saXZlLWJhZGdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmlwdHYtbGl2ZS13YXJuaW5nJykucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2NoZWNrSWZXYXRjaGluZ0xpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0T3B0aW9ucyB9IGZyb20gJy4vLi4vbWFpbic7XG5cbi8qKlxuICogQWRkcyBuZXcgY29sb3IgY2hhbmdlIGJ1dHRvbiB0byBsaXZlc3RyZWFtIHBhZ2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yQnV0dG9uKClcbntcbiAgICBjb25zdCBjb2xvckljb24gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3BlbmNpbC1pY29uLnBuZycpO1xuICAgIGNvbnN0IGNvbG9ySW1hZ2UgPSBgPGltZyBzcmM9XCIke2NvbG9ySWNvbn1cIiBhbHQ9XCJzdGFyXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czogbm9uZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4MCU7IGhlaWdodDo4MCU7IG1hcmdpbi1yaWdodDogMnB4O1wiPmA7XG5cbiAgICBjb25zdCBjb2xvckJ1dHRvbiA9IGBcbiAgICAgICAgPGlwdHYtY29sb3ItYnV0dG9uIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiIHJhaXNlZD1cIlwiIHN1cHBvcnRlZC1jb2xkLWxvYWQtYWN0aW9ucz1cIlsmcXVvdDtjb2xvciZxdW90O11cIiB3YWl0LWZvci1zaWduYWw9XCJ3YXRjaC1wYWdlLWluaXRpYWxpemVkXCIgY2xhc3M9XCJzdHlsZS1zY29wZSB5dGctd2F0Y2gtZm9vdGVyIHgtc2NvcGUgaXB0di1jb2xvci1idXR0b24tMFwiPlxuICAgICAgICAgICAgPGlyb24tc2lnbmFscyBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtY29sb3ItYnV0dG9uXCI+PC9pcm9uLXNpZ25hbHM+XG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b24geC1zY29wZSBwYXBlci1idXR0b24tMFwiIHJvbGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIiBhbmltYXRlZD1cIlwiIGFyaWEtZGlzYWJsZWQ9XCJmYWxzZVwiIGVsZXZhdGlvbj1cIjFcIiByYWlzZWQ9XCJcIiBhcmlhLWxhYmVsPVwiQ0hBTkdFIE5BTUUgQ09MT1JcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWp1c3RpZmllZCBzdHlsZS1zY29wZSBpcHR2LWNvbG9yLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDI0cHg7IGhlaWdodDogMjRweDtcIiBjbGFzcz1cImljb24tY29udGFpbmVyIGxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx5dC1pY29uIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwveXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b25cIiBzdHlsZT1cIm1hcmdpbjogMCAzcHhcIj48c3BhbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZm9ybWF0dGVkLXN0cmluZ1wiPkNIQU5HRSBOQU1FIENPTE9SPC9zcGFuPjwvaXB0di1mb3JtYXR0ZWQtc3RyaW5nPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9wYXBlci1idXR0b24+XG4gICAgICAgIDwvaXB0di1jb2xvci1idXR0b24+YDtcblxuICAgICQoJy5pcHR2LXNwb25zb3ItYnV0dG9uLTAnKS5hZnRlcihjb2xvckJ1dHRvbik7XG5cbiAgICAkKGNvbG9yQnV0dG9uKS5yZWFkeSggZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5zdHlsZS1zY29wZS5pcHR2LWNvbG9yLWJ1dHRvbi54LXNjb3BlLnl0LWljb24tMCcpLmh0bWwoY29sb3JJbWFnZSk7XG4gICAgfSk7XG5cbiAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtY29sb3ItYnV0dG9uLTAnKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL3d3dy5pY2Vwb3NlaWRvbi5jb20vcHJvZmlsZScsICdfYmxhbmsnKTtcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWNvbG9yLWJ1dHRvbi0wIHBhcGVyLWJ1dHRvbicpWzBdLmJsdXIoKTtcbiAgICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvY29sb3JCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIEFkZHMgZG9uYXRlIGJ1dHRvbiB0byBsaXZlc3RyZWFtIHBhZ2UuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb25hdGVCdXR0b24oKVxyXG57XHJcbiAgICAkKCcuaXB0di1kb25hdGUtYnV0dG9uLTAnKS5yZW1vdmUoKTtcclxuXHJcbiAgICBjb25zdCBkb25hdGVJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9kb25hdGUtaWNvbi5wbmcnKTtcclxuICAgIGNvbnN0IHNwb25zb3JJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9zcG9uc29yLWljb24ucG5nJyk7XHJcblxyXG4gICAgY29uc3Qgc3BvbnNvckltYWdlID0gYDxpbWcgc3JjPVwiJHtzcG9uc29ySWNvbn1cIiBhbHQ9XCJzdGFyXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czogbm9uZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCI+YDtcclxuXHJcbiAgICBjb25zdCBkb25hdGVCdXR0b24gPSBgXHJcbiAgICAgICAgPGlwdHYtZG9uYXRlLWJ1dHRvbiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiByYWlzZWQ9XCJcIiBzdXBwb3J0ZWQtY29sZC1sb2FkLWFjdGlvbnM9XCJbJnF1b3Q7c3BvbnNvciZxdW90O11cIiB3YWl0LWZvci1zaWduYWw9XCJ3YXRjaC1wYWdlLWluaXRpYWxpemVkXCIgY2xhc3M9XCJzdHlsZS1zY29wZSB5dGctd2F0Y2gtZm9vdGVyIHgtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uLTBcIj5cclxuICAgICAgICAgICAgPGlyb24tc2lnbmFscyBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPjwvaXJvbi1zaWduYWxzPlxyXG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uIHgtc2NvcGUgcGFwZXItYnV0dG9uLTBcIiByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCIgYW5pbWF0ZWQ9XCJcIiBhcmlhLWRpc2FibGVkPVwiZmFsc2VcIiBlbGV2YXRpb249XCIxXCIgcmFpc2VkPVwiXCIgYXJpYS1sYWJlbD1cIkRvbmF0ZSB0byBJY2VfUG9zZWlkb25cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItanVzdGlmaWVkIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMjRweDsgaGVpZ2h0OiAyNHB4O1wiIGNsYXNzPVwiaWNvbi1jb250YWluZXIgbGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHl0LWljb24gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC95dC1pY29uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCIgc3R5bGU9XCJtYXJnaW46IDAgM3B4XCI+PHNwYW4gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWZvcm1hdHRlZC1zdHJpbmdcIj5ET05BVEU8L3NwYW4+PC9pcHR2LWZvcm1hdHRlZC1zdHJpbmc+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9wYXBlci1idXR0b24+XHJcbiAgICAgICAgPC9pcHR2LWRvbmF0ZS1idXR0b24+YDtcclxuXHJcbiAgICBjb25zdCBkb25hdGVJbWFnZSA9IGA8aW1nIHNyYz1cIiR7ZG9uYXRlSWNvbn1cIiBhbHQ9XCJkb2xsYXItc2lnblwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPmA7XHJcblxyXG4gICAgLy8gSW5zZXJ0IGRvbmF0ZUJ1dHRvbiBuZXh0IHRvIHNwb25zb3JCdXR0b25cclxuICAgIGNvbnN0IHNwb25zb3JCdXR0b24gPSAnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24tMCc7XHJcblxyXG4gICAgJChzcG9uc29yQnV0dG9uKS5iZWZvcmUoZG9uYXRlQnV0dG9uKTtcclxuICAgICQoZG9uYXRlQnV0dG9uKS5yZWFkeSggZnVuY3Rpb24oKSB7ICQoJy5zdHlsZS1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24ueC1zY29wZS55dC1pY29uLTAnKS5odG1sKGRvbmF0ZUltYWdlKTsgfSk7XHJcblxyXG4gICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24tMCcpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly95b3V0dWJlLnN0cmVhbWxhYnMuY29tL2ljZXBvc2VpZG9uIy8nLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24tMCBwYXBlci1idXR0b24nKVswXS5ibHVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDaGFuZ2Ugc3BvbnNvckJ1dHRvbiBpY29uIHRvIHN0YXJcclxuICAgICQoYCR7c3BvbnNvckJ1dHRvbn0gLnN0eWxlLXNjb3BlLnl0Zy1tZW1iZXJzaGlwLW9mZmVyLWJ1dHRvbi54LXNjb3BlLnl0LWljb24tMGApLmh0bWwoc3BvbnNvckltYWdlKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIFNob3cgZW1vdGUgbG9hZGluZyBpbmZvcm1hdGlvbi5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRpbmdFbW90ZXNJbmZvKClcclxue1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgJChkaXYpLnRleHQoJ0xvYWRpbmcgZW1vdGVzLi4uJyk7XHJcblxyXG4gICAgJChkaXYpLmNzcyh7XHJcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxNnB4JyxcclxuICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICdyaWdodCc6ICcyNXB4JyxcclxuICAgICAgICAnYm90dG9tJzogJzc1cHgnLFxyXG4gICAgICAgICdjb2xvcic6ICcjZmZmJyxcclxuICAgICAgICAndGV4dC1zaGFkb3cnOiAnMnB4IDJweCAycHggcmdiYSgwLDAsMCwwLjc1KSdcclxuICAgIH0pO1xyXG5cclxuICAgICQoZGl2KS5hZGRDbGFzcygnaXB0di1sb2FkaW5nLWVtb3RlcycpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2xvYWRpbmdFbW90ZXNJbmZvLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXRPcHRpb25zIH0gZnJvbSAnLi8uLi9tYWluJztcblxuLyoqXG4gKiBBZGRzIG5ldyBzcG9uc29yIGJ1dHRvbiB0byBsaXZlc3RyZWFtIHBhZ2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwb25zb3JCdXR0b24oKVxue1xuICAgIGNvbnN0IHNwb25zb3JJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9zcG9uc29yLWljb24ucG5nJyk7XG4gICAgY29uc3Qgc3BvbnNvckltYWdlID0gYDxpbWcgc3JjPVwiJHtzcG9uc29ySWNvbn1cIiBhbHQ9XCJzdGFyXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czogbm9uZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCI+YDtcblxuICAgIGNvbnN0IHNwb25zb3JCdXR0b24gPSBgXG4gICAgICAgIDxpcHR2LXNwb25zb3ItYnV0dG9uIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiIHJhaXNlZD1cIlwiIHN1cHBvcnRlZC1jb2xkLWxvYWQtYWN0aW9ucz1cIlsmcXVvdDtzcG9uc29yJnF1b3Q7XVwiIHdhaXQtZm9yLXNpZ25hbD1cIndhdGNoLXBhZ2UtaW5pdGlhbGl6ZWRcIiBjbGFzcz1cInN0eWxlLXNjb3BlIHl0Zy13YXRjaC1mb290ZXIgeC1zY29wZSBpcHR2LXNwb25zb3ItYnV0dG9uLTBcIj5cbiAgICAgICAgICAgIDxpcm9uLXNpZ25hbHMgY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LXNwb25zb3ItYnV0dG9uXCI+PC9pcm9uLXNpZ25hbHM+XG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvbiB4LXNjb3BlIHBhcGVyLWJ1dHRvbi0wXCIgcm9sZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiIGFuaW1hdGVkPVwiXCIgYXJpYS1kaXNhYmxlZD1cImZhbHNlXCIgZWxldmF0aW9uPVwiMVwiIHJhaXNlZD1cIlwiIGFyaWEtbGFiZWw9XCJTUE9OU09SIE9OIE9GRklDSUFMIFNJVEVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5b3V0IGhvcml6b250YWwgY2VudGVyLWp1c3RpZmllZCBzdHlsZS1zY29wZSBpcHR2LXNwb25zb3ItYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMjRweDsgaGVpZ2h0OiAyNHB4O1wiIGNsYXNzPVwiaWNvbi1jb250YWluZXIgbGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LXNwb25zb3ItYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8eXQtaWNvbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtc3BvbnNvci1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwveXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvblwiIHN0eWxlPVwibWFyZ2luOiAwIDNweFwiPjxzcGFuIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1mb3JtYXR0ZWQtc3RyaW5nXCI+U1BPTlNPUiBPTiBPRkZJQ0lBTCBTSVRFPC9zcGFuPjwvaXB0di1mb3JtYXR0ZWQtc3RyaW5nPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9wYXBlci1idXR0b24+XG4gICAgICAgIDwvaXB0di1zcG9uc29yLWJ1dHRvbj5gO1xuXG4gICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24tMCcpLmJlZm9yZShzcG9uc29yQnV0dG9uKTtcbiAgICBjb25zb2xlLmxvZygkKCcuYmlnLWRpY2snKSk7XG5cbiAgICAkKHNwb25zb3JCdXR0b24pLnJlYWR5KCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLmlwdHYtc3BvbnNvci1idXR0b24ueC1zY29wZS55dC1pY29uLTAnKS5odG1sKHNwb25zb3JJbWFnZSk7XG4gICAgfSk7XG5cbiAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtc3BvbnNvci1idXR0b24tMCcpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgd2luZG93Lm9wZW4oJ2h0dHBzOi8vd3d3LmljZXBvc2VpZG9uLmNvbS8nLCAnX2JsYW5rJyk7XG4gICAgICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUuaXB0di1zcG9uc29yLWJ1dHRvbi0wIHBhcGVyLWJ1dHRvbicpWzBdLmJsdXIoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHNwb25zb3JUZXh0ID0gJCgnLnl0Zy1tZW1iZXJzaGlwLW9mZmVyLWJ1dHRvbi0wIC55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24nKS5maW5kKCcueXRnLWZvcm1hdHRlZC1zdHJpbmcnKS50ZXh0KCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L3Nwb25zb3JCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGdldE9wdGlvbnMgfSBmcm9tICcuLy4uL21haW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcG9uc29yQ2hlY2tcbntcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB1c2VyIGlzIHN0aWxsIHVzaW5nIG9sZCBzcG9uc29yc2hpcFxuICAgICAqL1xuICAgIHN0YXRpYyBjaGVjaygpXG4gICAge1xuICAgICAgICAkLmdldChjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnY29udGVudC5odG1sJyksIGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgICAgJChkYXRhKS5hcHBlbmRUbygnYm9keScpO1xuXG4gICAgICAgICAgICBjb25zdCBpbWdVcmwgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc3BvbnNvci1iZW5lZml0cy5wbmcnKTtcbiAgICAgICAgICAgICQoJy5zcG9uc29yLW1vZGFsIC5zdWItYmVuZWZpdHMnKS5hdHRyKCdzcmMnLCBpbWdVcmwpO1xuXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNsb3NlLW1vZGFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCgnLnNwb25zb3ItbW9kYWwnKS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gJCgnLnl0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyLTAnKTtcblxuICAgICAgICAgICAgY29uc3Qgc3BvbnNvckJhZGdlID0gJChjb250YWluZXIpLmZpbmQoJy55dC1saXZlLWNoYXQtYXV0aG9yLWJhZGdlLXJlbmRlcmVyLTBbYXJpYS1sYWJlbD1cIlNwb25zb3JcIl0nKTtcblxuICAgICAgICAgICAgaWYgKCQoc3BvbnNvckJhZGdlKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICAkKCcuc3BvbnNvci1tb2RhbCcpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvc3BvbnNvckNoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9
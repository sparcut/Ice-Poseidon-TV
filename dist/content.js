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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chatObserver__ = __webpack_require__(2);





const DISALLOWED_CHARS = ['\\', ':', '/', '&', "'", '"', '?', '!', '#'],
             SCROLL_ENABLED_URL =  chrome.extension.getURL('icons/scroll-enabled.png'),
             SCROLL_DISABLED_URL =  chrome.extension.getURL('icons/scroll-disabled.png');
/* harmony export (immutable) */ __webpack_exports__["DISALLOWED_CHARS"] = DISALLOWED_CHARS;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_ENABLED_URL"] = SCROLL_ENABLED_URL;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_DISABLED_URL"] = SCROLL_DISABLED_URL;


let options = null;

const onNewPageLoad = function() {

    $('[class^="iptv-"]').remove();

    if (options['redirectToYTGaming'] === true) {
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

    if (options['emotesTwitch'] === true || options['emotesSub'] === true || options['emotesBTTV'] === true || options['emotesIce'] === true) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__chatObserver__["a" /* default */])();
    }

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_loadingEmotesInfo__ = __webpack_require__(8);




class Emote
{
    static loadEmotes() {

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__overlay_loadingEmotesInfo__["a" /* default */])();

        setTimeout(function()
        {
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

    static waitTillEmotesLoaded()
    {
        if ((__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesTwitch'] !== Emote.states['twitch'].loaded) ||
            (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesSub'] !== Emote.states['sub'].loaded) ||
            (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV'] !== Emote.states['BTTV'].loaded) ||
            (__WEBPACK_IMPORTED_MODULE_1__main__["options"]['emotesBTTV'] !== Emote.states['BTTVChannels'].loaded)) {

            setTimeout(Emote.waitTillEmotesLoaded, 250);
            return;
        }

        $('.iptv-loading-emotes').remove();
        Emote.replaceExistingEmotes();
    };

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

    static kappaCheck(msg)
    {
        $('img', msg).each(function() {

            const $img = $(this);

            if (/\ud83c\udf1d/g.test($img.attr('alt'))) {
                $img.replaceWith(document.createTextNode('Kappa'));
            }
        });
    };

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

                if (emote == 'TriHard') continue;

                Emote.emotes[emote] = {
                    url: urlTemplate + emoteDic[emote]['image_id'] + '/' + '1.0'
                };
            }

            Emote.states['twitch'].loaded = true;
        }
    };

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

    static isValidEmote(text)
    {
        return !(text[0].match(/[A-Z]/g) ||
            text.match(/^[a-z]+$/g) ||
            text.match(/^\d*$/g)
        );
    };

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

Emote.emotes = {
    TriHard: {
        url: chrome.extension.getURL('icons/TriHard-old.png')
    }
};

Emote.messages = {};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = chatObserver;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mentionHighlight__ = __webpack_require__(4);



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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay_donateButton__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_checkIfWatchingLive__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay_alwaysScrollDown__ = __webpack_require__(5);





class PageCheck
{
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

        // Temp fix to prevent ram from filling up with messages.
        setInterval(function () {
            messages = {};
        }, 1000 * 60 * 5);

        if(text == 'Ice Poseidon') __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__overlay_donateButton__["a" /* default */])();

        __WEBPACK_IMPORTED_MODULE_0__emote__["a" /* default */].loadEmotes();
        __WEBPACK_IMPORTED_MODULE_3__overlay_alwaysScrollDown__["a" /* default */].init();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__overlay_checkIfWatchingLive__["a" /* default */])();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PageCheck;
;

PageCheck.streampageChecks = 0;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = MentionHighlight;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


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
/* 5 */
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
        if($('.iptv-scrolldown-wrapper').length) {
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
    }

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
            if($(watchPage).length) {
                observer.observe($(watchPage)[0], observerOpts);
                clearInterval(addObserver);
            }
        }, 250);
    }

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
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AlwaysScrollDown;
;

AlwaysScrollDown.scrollDown = true;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = donateButton;
function donateButton()
{
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
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadingEmotesInfo;
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = checkIfWatchingLive;
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDc4Y2M4NWQ3MzQ3OWJjYzRkY2YiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9lbW90ZS5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0T2JzZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZUNoZWNrLmpzIiwid2VicGFjazovLy8uL21lbnRpb25IaWdobGlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9hbHdheXNTY3JvbGxEb3duLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvZG9uYXRlQnV0dG9uLmpzIiwid2VicGFjazovLy8uL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mby5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2NoZWNrSWZXYXRjaGluZ0xpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ2lCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQSx5Rjs7OztBQUFBO0FBQUE7QUFBQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCLHNEQUFzRDtBQUNwRixDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtGQUErRixZQUFZLGFBQWEsbUJBQW1CLG9CQUFvQixFQUFFLCtEQUErRCwwQkFBMEIsRUFBRSwwREFBMEQsMEJBQTBCLEVBQUU7QUFDbFY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtRkFBbUYsaUNBQWlDLG9DQUFvQyxFQUFFO0FBQzFKOztBQUVBO0FBQ0Esc0pBQXNKLGlCQUFpQiwwRkFBMEYsa0NBQWtDLEVBQUUscUhBQXFILGtDQUFrQyxFQUFFLDZEQUE2RCxjQUFjO0FBQ3pnQjs7QUFFQTtBQUNBLHFIQUFxSCxtREFBbUQsNkJBQTZCLEVBQUU7QUFDdk07O0FBRUE7QUFDQSxDQUFDOzs7Ozs7Ozs7OztBQ3JFb0I7QUFDNEI7QUFDakQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYixTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViLDJCQUEyQix3QkFBd0I7O0FBRW5EOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0Isb0JBQW9CO0FBQzVDLHdCQUF3QixvQkFBb0I7QUFDNUMsd0JBQXdCLG9CQUFvQjtBQUM1Qyx3QkFBd0Isb0JBQW9CO0FBQzVDLDJCQUEyQixvQkFBb0I7QUFDL0MsMkJBQTJCLG9CQUFvQjtBQUMvQyxpQ0FBaUMscUJBQXFCO0FBQ3RELDJCQUEyQixxQkFBcUI7QUFDaEQsNkJBQTZCLHFCQUFxQjtBQUNsRCw0QkFBNEIscUJBQXFCO0FBQ2pELHlCQUF5QixvQkFBb0I7QUFDN0MsMkJBQTJCLHFCQUFxQjtBQUNoRCwyQkFBMkIsb0JBQW9CO0FBQy9DLDRCQUE0QixvQkFBb0I7QUFDaEQsMEJBQTBCLHFCQUFxQjtBQUMvQywwQkFBMEIsb0JBQW9CO0FBQzlDLDRCQUE0QixxQkFBcUI7QUFDakQsd0JBQXdCLHFCQUFxQjtBQUM3QywyQkFBMkIsb0JBQW9CO0FBQy9DLDBCQUEwQixxQkFBcUI7QUFDL0MsNEJBQTRCLG9CQUFvQjtBQUNoRCwyQkFBMkIscUJBQXFCO0FBQ2hELDJCQUEyQixxQkFBcUI7QUFDaEQsNEJBQTRCLHFCQUFxQjtBQUNqRCx3QkFBd0Isb0JBQW9CO0FBQzVDLDRCQUE0QixxQkFBcUI7QUFDakQsZ0NBQWdDLHFCQUFxQjtBQUNyRCwwQkFBMEIscUJBQXFCO0FBQy9DLDBCQUEwQixvQkFBb0I7QUFDOUMsNEJBQTRCLHFCQUFxQjtBQUNqRCwwQkFBMEIsb0JBQW9CO0FBQzlDLDBCQUEwQixxQkFBcUI7QUFDL0MsMkJBQTJCLG9CQUFvQjtBQUMvQyw0QkFBNEIsb0JBQW9CO0FBQ2hELDZCQUE2QixvQkFBb0I7QUFDakQsNkJBQTZCLHFCQUFxQjtBQUNsRCwwQkFBMEIscUJBQXFCO0FBQy9DLDBCQUEwQjtBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNwWUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBOzs7Ozs7Ozs7O0FDMURrQjs7QUFFbEI7QUFDQTtBQUNBOztBQUVBLHVLQUFnSTs7QUFFaEk7QUFDQTs7QUFFQSxpSUFBaUk7QUFDakk7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDaEJrRDs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLDBGQUEwRjtBQUMxRiw0QkFBNEIsMERBQW1CO0FBQy9DO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsd0NBQXdDO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyw0Q0FBNEM7QUFDakY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7Ozs7Ozs7OztBQ3ZLQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBc0MsWUFBWSx5Q0FBeUMsZ0JBQWdCLGFBQWEsY0FBYzs7QUFFdEk7QUFDQSx5REFBeUQsZ0RBQWdELGFBQWE7QUFDdEg7QUFDQSw2Q0FBNkMsMkJBQTJCLGNBQWM7QUFDdEY7QUFDQSw0Q0FBNEMsY0FBYztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMsV0FBVyxnREFBZ0QsZ0JBQWdCLGFBQWEsY0FBYzs7QUFFM0k7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QywwRUFBMEUsRUFBRTs7QUFFbkg7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLFNBQVMsY0FBYztBQUN2Qjs7Ozs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDbEJBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSztBQUNMIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ3OGNjODVkNzM0NzliY2M0ZGNmIiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xyXG5pbXBvcnQgUGFnZUNoZWNrIGZyb20gJy4vcGFnZUNoZWNrJztcclxuaW1wb3J0IHsgaXNOb2RlIH0gZnJvbSAnLi91dGlsJztcclxuaW1wb3J0IENoYXRPYnNlcnZlciBmcm9tICcuL2NoYXRPYnNlcnZlcic7XHJcblxyXG5leHBvcnQgY29uc3QgRElTQUxMT1dFRF9DSEFSUyA9IFsnXFxcXCcsICc6JywgJy8nLCAnJicsIFwiJ1wiLCAnXCInLCAnPycsICchJywgJyMnXSxcclxuICAgICAgICAgICAgIFNDUk9MTF9FTkFCTEVEX1VSTCA9ICBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc2Nyb2xsLWVuYWJsZWQucG5nJyksXHJcbiAgICAgICAgICAgICBTQ1JPTExfRElTQUJMRURfVVJMID0gIGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdpY29ucy9zY3JvbGwtZGlzYWJsZWQucG5nJyk7XHJcblxyXG5leHBvcnQgbGV0IG9wdGlvbnMgPSBudWxsO1xyXG5cclxuY29uc3Qgb25OZXdQYWdlTG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICQoJ1tjbGFzc149XCJpcHR2LVwiXScpLnJlbW92ZSgpO1xyXG5cclxuICAgIGlmIChvcHRpb25zWydyZWRpcmVjdFRvWVRHYW1pbmcnXSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoUGFnZUNoZWNrLnlvdXR1YmVHYW1pbmcsIDI1MDApO1xyXG4gICAgfVxyXG5cclxuICAgIFBhZ2VDaGVjay5saXZlc3RyZWFtUGFnZSgpO1xyXG59O1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQgPiB0aXRsZScpO1xyXG5cclxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XHJcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24obXV0YXRpb24pIHtcclxuICAgICAgICAgICAgb25OZXdQYWdlTG9hZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFpc05vZGUodGFyZ2V0KSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgeyBzdWJ0cmVlOiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUgfSk7XHJcbn0oKSk7XHJcblxyXG5jaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSgncmVxdWVzdExvY2Fsc3RvcmFnZScsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgb3B0aW9ucyA9IHJlc3BvbnNlO1xyXG5cclxuICAgIGlmIChvcHRpb25zWydlbW90ZXNUd2l0Y2gnXSA9PT0gdHJ1ZSB8fCBvcHRpb25zWydlbW90ZXNTdWInXSA9PT0gdHJ1ZSB8fCBvcHRpb25zWydlbW90ZXNCVFRWJ10gPT09IHRydWUgfHwgb3B0aW9uc1snZW1vdGVzSWNlJ10gPT09IHRydWUpIHtcclxuICAgICAgICBDaGF0T2JzZXJ2ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9uc1snZGlzYWJsZUF2YXRhcnMnXSkge1xyXG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4uc3R5bGUtc2NvcGUgLnl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXIgI2F1dGhvci1waG90byB7IHdpZHRoOiAwcHg7IGhlaWdodDogMHB4OyBtYXJnaW4tcmlnaHQ6IDBweDsgdmlzaWJpbGl0eTogaGlkZGVuOyB9LnN0eWxlLXNjb3BlLnl0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyLm5vLXRyYW5zaXRpb257IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfS5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlciAjYXZhdGFyIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zWydlbmFibGVDaGF0Q29sb3JzJ10pIHtcclxuICAgICAgICBjb25zdCBhID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2V4dGVybmFsL2NoYXQtY29sb3JzLmNzcycpO1xyXG4gICAgICAgICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiJyArIGEgKyAnXCIgPicpLmFwcGVuZFRvKCdoZWFkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnNbJ2VuYWJsZVNwbGl0Q2hhdCddKSB7XHJcbiAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgYm9yZGVyLXRvcDogMC41cHggc29saWQgIzMzMzMzMzsgYm9yZGVyLWJvdHRvbTogMC41cHggc29saWQgIzAwMDAwMDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihvcHRpb25zWydzaG93RGVsZXRlZE1lc3NhZ2VzJ10pIHtcclxuICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFtpcy1kZWxldGVkXTpub3QoW3Nob3ctb3JpZ2luYWxdKSAjbWVzc2FnZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHtkaXNwbGF5OiBpbmxpbmU7fSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2lzLWRlbGV0ZWRdOm5vdChbc2hvdy1vcmlnaW5hbF0pICNtZXNzYWdlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlOmJlZm9yZXtjb250ZW50OiBcIiAgXCJ9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKG9wdGlvbnNbJ21lbnRpb25IaWdobGlnaHQnXSkge1xyXG4gICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wIC5tZW50aW9uLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDExNCwgMTUsIDE1LCAwKSAhaW1wb3J0YW50OyBwYWRkaW5nOiAwcHggMHB4ICFpbXBvcnRhbnQ7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25OZXdQYWdlTG9hZCgpO1xyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHJlcGxhY2VBbGwgfSBmcm9tICcuL3V0aWwnO1xyXG5pbXBvcnQgeyBUUklIQVJEX1VSTCwgb3B0aW9ucywgRElTQUxMT1dFRF9DSEFSUyB9IGZyb20gJy4vbWFpbic7XHJcbmltcG9ydCBsb2FkaW5nRW1vdGVzSW5mbyBmcm9tICcuL292ZXJsYXkvbG9hZGluZ0Vtb3Rlc0luZm8nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1vdGVcclxue1xyXG4gICAgc3RhdGljIGxvYWRFbW90ZXMoKSB7XHJcblxyXG4gICAgICAgIGxvYWRpbmdFbW90ZXNJbmZvKCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgJGxvYWRpbmcgPSAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRsb2FkaW5nWzBdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGxvYWRpbmcuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnY29sb3InOiAnI2MwMzkyYicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnIzI4MjgyOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3JpZ2h0JzogJzE5cHgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbG9hZGluZy50ZXh0KCdGYWlsZWQgbG9hZGluZyBzb21lIGVtb3RlcyAoQVBJIHNlcnZlcnMgZG93biknKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sIDcuNSAqIDEwMDApO1xyXG5cclxuICAgICAgICB9LCAxMCAqIDEwMDApO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzVHdpdGNoJ10pIEVtb3RlLmxvYWRUd2l0Y2hFbW90ZXMoKTtcclxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzU3ViJ10pIEVtb3RlLmxvYWRTdWJFbW90ZXMoKTtcclxuICAgICAgICBpZiAob3B0aW9uc1snZW1vdGVzSWNlJ10pIEVtb3RlLmxvYWRJY2VFbW90ZXMoKTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnNbJ2Vtb3Rlc0JUVFYnXSkge1xyXG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkVtb3RlcygpO1xyXG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkNoYW5uZWxFbW90ZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEVtb3RlLndhaXRUaWxsRW1vdGVzTG9hZGVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyB3YWl0VGlsbEVtb3Rlc0xvYWRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKChvcHRpb25zWydlbW90ZXNUd2l0Y2gnXSAhPT0gRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQpIHx8XHJcbiAgICAgICAgICAgIChvcHRpb25zWydlbW90ZXNTdWInXSAhPT0gRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQpIHx8XHJcbiAgICAgICAgICAgIChvcHRpb25zWydlbW90ZXNCVFRWJ10gIT09IEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCkgfHxcclxuICAgICAgICAgICAgKG9wdGlvbnNbJ2Vtb3Rlc0JUVFYnXSAhPT0gRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQpKSB7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KEVtb3RlLndhaXRUaWxsRW1vdGVzTG9hZGVkLCAyNTApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpLnJlbW92ZSgpO1xyXG4gICAgICAgIEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcygpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgcmVwbGFjZUV4aXN0aW5nRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjaGF0RWxlbWVudHMgPSAkKCcuc3R5bGUtc2NvcGUueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlci54LXNjb3BlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMCcpO1xyXG5cclxuICAgICAgICBpZiAoY2hhdEVsZW1lbnRzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChFbW90ZS5yZXBsYWNlRXhpc3RpbmdFbW90ZXMsIDI1MCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoYXRFbGVtZW50cy5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xyXG4gICAgICAgICAgICBFbW90ZS5lbW90ZUNoZWNrKGVsKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGVtb3RlQ2hlY2sobm9kZSlcclxuICAgIHtcclxuICAgICAgICBjb25zdCAkbWVzc2FnZSA9ICQobm9kZSkuZmluZCgnI21lc3NhZ2UnKTtcclxuICAgICAgICBFbW90ZS5rYXBwYUNoZWNrKCRtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgbGV0IG9sZEhUTUwgPSAkbWVzc2FnZS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgIGxldCBtc2dIVE1MID0gb2xkSFRNTDtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbW90ZS5tZXNzYWdlc1ttc2dIVE1MXSA9PSAndW5kZWZpbmVkJykge1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgd29yZHMgPSBtc2dIVE1MLnJlcGxhY2UoJy9cXHhFRlxceEJCXFx4QkYvJywgJycpLnJlcGxhY2UoJ++7vycsICcnKS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICBjb25zdCB1bmlxdWVXb3JkcyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgZW1vdGVDb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICAkLmVhY2god29yZHMsIGZ1bmN0aW9uIChpLCBlbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShlbCwgdW5pcXVlV29yZHMpID09PSAtMSkgdW5pcXVlV29yZHMucHVzaChlbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bmlxdWVXb3Jkcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmQgPSB1bmlxdWVXb3Jkc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIEVtb3RlLmVtb3Rlc1t3b3JkXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbW90ZUNvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgd29yZCk7XHJcbiAgICAgICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ2hpbnQtLXRvcCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IEVtb3RlLmVtb3Rlc1t3b3JkXVsndXJsJ107XHJcbiAgICAgICAgICAgICAgICBpbWcuYWx0ID0gd29yZDtcclxuICAgICAgICAgICAgICAgIGltZy5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3R5bGUud2lkdGggPSAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgICAgICAgICAgICBzcGFuLmFwcGVuZENoaWxkKGltZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbXNnSFRNTCA9IHJlcGxhY2VBbGwobXNnSFRNTCwgd29yZCwgc3Bhbi5vdXRlckhUTUwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZW1vdGVDb3VudCA8IDEpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICRtZXNzYWdlLmh0bWwobXNnSFRNTCk7XHJcbiAgICAgICAgICAgIEVtb3RlLm1lc3NhZ2VzW29sZEhUTUwucmVwbGFjZSgvXFxzL2csJycpXSA9IG1zZ0hUTUw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRtZXNzYWdlLmh0bWwoRW1vdGUubWVzc2FnZXNbb2xkSFRNTF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJG1lc3NhZ2UucGFyZW50KCkucGFyZW50KCkuYmluZCgnRE9NU3VidHJlZU1vZGlmaWVkJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJG1lc3NhZ2UgPSAkKHRoaXMpLmZpbmQoJyNtZXNzYWdlJyk7XHJcbiAgICAgICAgICAgIEVtb3RlLmthcHBhQ2hlY2soJG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGh0bWwgPSAkbWVzc2FnZS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKCcvXFx4RUZcXHhCQlxceEJGLycsICcnKS5yZXBsYWNlKCfvu78nLCAnJykucmVwbGFjZSgvXFxzL2csJycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBFbW90ZS5tZXNzYWdlc1todG1sXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaHRtbCA9PSBFbW90ZS5tZXNzYWdlc1todG1sXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkbWVzc2FnZS5odG1sKEVtb3RlLm1lc3NhZ2VzW2h0bWxdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMga2FwcGFDaGVjayhtc2cpXHJcbiAgICB7XHJcbiAgICAgICAgJCgnaW1nJywgbXNnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJGltZyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoL1xcdWQ4M2NcXHVkZjFkL2cudGVzdCgkaW1nLmF0dHIoJ2FsdCcpKSkge1xyXG4gICAgICAgICAgICAgICAgJGltZy5yZXBsYWNlV2l0aChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnS2FwcGEnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGxvYWRUd2l0Y2hFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly90d2l0Y2hlbW90ZXMuY29tL2FwaV9jYWNoZS92Mi9nbG9iYWwuanNvbicpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnLy9zdGF0aWMtY2RuLmp0dm53Lm5ldC9lbW90aWNvbnMvdjEvJztcclxuXHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3R3aXRjaCddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVtb3RlRGljID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnZW1vdGVzJ107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVtb3RlIGluIGVtb3RlRGljKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVtb3RlID09ICdUcmlIYXJkJykgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2Vtb3RlXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZW1vdGVEaWNbZW1vdGVdWydpbWFnZV9pZCddICsgJy8nICsgJzEuMCdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBsb2FkU3ViRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vdHdpdGNoZW1vdGVzLmNvbS9hcGlfY2FjaGUvdjIvc3Vic2NyaWJlci5qc29uJyk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICcvL3N0YXRpYy1jZG4uanR2bncubmV0L2Vtb3RpY29ucy92MS8nO1xyXG5cclxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snc3ViJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZW1vdGVEaWMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydjaGFubmVscyddO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBjaGFubmVsIGluIGVtb3RlRGljKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGVtb3RlRGljW2NoYW5uZWxdWydlbW90ZXMnXSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVEaWNbY2hhbm5lbF1bJ2Vtb3RlcyddW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBkaWN0Wydjb2RlJ107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChFbW90ZS5pc1ZhbGlkRW1vdGUoY29kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2NvZGVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxUZW1wbGF0ZSArIGRpY3RbJ2ltYWdlX2lkJ10gKyAnLycgKyAnMS4wJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGxvYWRCVFRWRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLmJldHRlcnR0di5uZXQvMi9lbW90ZXMnKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJy8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvJztcclxuXHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbW90ZUxpc3QgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZUxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVMaXN0W2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghRW1vdGUuY29udGFpbnNEaXNhbGxvd2VkQ2hhcihkaWN0Wydjb2RlJ10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2RpY3RbJ2NvZGUnXV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBkaWN0WydpZCddICsgJy8nICsgJzF4J1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgbG9hZEJUVFZDaGFubmVsRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjaGFubmVscyA9IG9wdGlvbnNbJ0JUVFZDaGFubmVscyddO1xyXG4gICAgICAgIGNvbnN0IGNvbW1hQ2hhbm5lbHMgPSBjaGFubmVscy5yZXBsYWNlKC9cXHMrL2csICcnKS5zcGxpdCgnLCcpO1xyXG5cclxuICAgICAgICBjb21tYUNoYW5uZWxzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5uZWwpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLmJldHRlcnR0di5uZXQvMi9jaGFubmVscy8nICsgY2hhbm5lbCk7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJy8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvJztcclxuXHJcbiAgICAgICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQgPj0gY29tbWFDaGFubmVscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZW1vdGVMaXN0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVsnZW1vdGVzJ107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGVtb3RlTGlzdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVMaXN0W2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUVtb3RlLmNvbnRhaW5zRGlzYWxsb3dlZENoYXIoZGljdFsnY29kZSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbZGljdFsnY29kZSddXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBkaWN0WydpZCddICsgJy8nICsgJzF4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IGNoYW5uZWwgKyAnIChidHR2KSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50ID49IGNvbW1hQ2hhbm5lbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBsb2FkSWNlRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB1cmxUZW1wbGF0ZSA9ICdodHRwczovL3N0YXRpYy1jZG4uanR2bncubmV0L2Vtb3RpY29ucy92MS8nO1xyXG5cclxuICAgICAgICBjb25zdCBpY2VFbW90ZXMgPSB7XHJcbiAgICAgICAgICAgIFwicHVycGxlMVwiOiB7IFwiaW1hZ2VfaWRcIjogOTY4NzMgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGUyXCI6IHsgXCJpbWFnZV9pZFwiOiA5Njg3NCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZTNcIjogeyBcImltYWdlX2lkXCI6IDk2ODc1IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlNFwiOiB7IFwiaW1hZ2VfaWRcIjogOTY4NzYgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVBcm0xXCI6IHsgXCJpbWFnZV9pZFwiOiA4NDY4NyB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUFybTJcIjogeyBcImltYWdlX2lkXCI6IDg0NTMzIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQmx1ZXNjcmVlblwiOiB7IFwiaW1hZ2VfaWRcIjogMTU3NDE1IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQnJ1aFwiOiB7IFwiaW1hZ2VfaWRcIjogMTMyODkzIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQ2lncmlwXCI6IHsgXCJpbWFnZV9pZFwiOiAxNjE4MjggfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVDcmVlcFwiOiB7IFwiaW1hZ2VfaWRcIjogMTUzNjIwIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlQ3hcIjogeyBcImltYWdlX2lkXCI6IDkxODc2IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlRW56YVwiOiB7IFwiaW1hZ2VfaWRcIjogMTA1NDQ0IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlRmFrZVwiOiB7IFwiaW1hZ2VfaWRcIjogOTE4NzQgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVGcmFua1wiOiB7IFwiaW1hZ2VfaWRcIjogNzY2NDAgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVIdWhcIjogeyBcImltYWdlX2lkXCI6IDEzMzI4NiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUljZVwiOiB7IFwiaW1hZ2VfaWRcIjogODAyMTUgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVLS29uYVwiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNzcxIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlTVwiOiB7IFwiaW1hZ2VfaWRcIjogMTIxNzcyIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlTm9zZVwiOiB7IFwiaW1hZ2VfaWRcIjogNjUxNTIgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVPbWdcIjogeyBcImltYWdlX2lkXCI6IDE2MDQ2MiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVByaWRlXCI6IHsgXCJpbWFnZV9pZFwiOiA2MjU2MCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVJvZmxcIjogeyBcImltYWdlX2lkXCI6IDEyMTQ5NSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVRhY29cIjogeyBcImltYWdlX2lkXCI6IDEzMjcyNiB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVRoaW5rXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjE3NzAgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVXXCI6IHsgXCJpbWFnZV9pZFwiOiA3MDgzOCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUNsYXVzXCI6IHsgXCJpbWFnZV9pZFwiOiAxMzI3MzcgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVDb29sc3RvcnlcIjogeyBcImltYWdlX2lkXCI6IDE1MzYyMSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZURvZ1wiOiB7IFwiaW1hZ2VfaWRcIjogMTA1MjI4IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlRnJvXCI6IHsgXCJpbWFnZV9pZFwiOiA4NjQ0NCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZUtrb25hXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjE0OTQgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVMZW9cIjogeyBcImltYWdlX2lkXCI6IDczNjMyIH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlTFVMXCI6IHsgXCJpbWFnZV9pZFwiOiAxMjY1MTEgfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVSZWFsXCI6IHsgXCJpbWFnZV9pZFwiOiA5MTg3MyB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVRodW1wXCI6IHsgXCJpbWFnZV9pZFwiOiA4NjUwMSB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVRvbmd1ZVwiOiB7IFwiaW1hZ2VfaWRcIjogNzA4MzggfSxcclxuICAgICAgICAgICAgXCJwdXJwbGVXYWxudXRcIjogeyBcImltYWdlX2lkXCI6IDEwOTA4NCB9LFxyXG4gICAgICAgICAgICBcInB1cnBsZVdhdFwiOiB7IFwiaW1hZ2VfaWRcIjogMTA1MjI5IH0sXHJcbiAgICAgICAgICAgIFwicHVycGxlV3V0XCI6IHsgXCJpbWFnZV9pZFwiOiAxMzM4NDQgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvcihjb25zdCBlbW90ZSBpbiBpY2VFbW90ZXMpIHtcclxuICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2Vtb3RlXSA9IHtcclxuICAgICAgICAgICAgICAgIHVybDogdXJsVGVtcGxhdGUgKyBpY2VFbW90ZXNbZW1vdGVdWydpbWFnZV9pZCddICsgJy8nICsgJzEuMCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGlzVmFsaWRFbW90ZSh0ZXh0KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAhKHRleHRbMF0ubWF0Y2goL1tBLVpdL2cpIHx8XHJcbiAgICAgICAgICAgIHRleHQubWF0Y2goL15bYS16XSskL2cpIHx8XHJcbiAgICAgICAgICAgIHRleHQubWF0Y2goL15cXGQqJC9nKVxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBjb250YWluc0Rpc2FsbG93ZWRDaGFyKHdvcmQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjIGluIERJU0FMTE9XRURfQ0hBUlMpIHtcclxuICAgICAgICAgICAgaWYgKHdvcmQuaW5kZXhPZihjKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxufTtcclxuXHJcbkVtb3RlLnN0YXRlcyA9IHtcclxuICAgIHR3aXRjaDoge1xyXG4gICAgICAgIGxvYWRlZDogZmFsc2VcclxuICAgIH0sXHJcbiAgICBzdWI6IHtcclxuICAgICAgICBsb2FkZWQ6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgQlRUVjoge1xyXG4gICAgICAgIGxvYWRlZDogZmFsc2VcclxuICAgIH0sXHJcbiAgICBCVFRWQ2hhbm5lbHM6IHtcclxuICAgICAgICBsb2FkZWQ6IGZhbHNlLFxyXG4gICAgICAgIGxvYWRlZENvdW50OiAwXHJcbiAgICB9XHJcbn07XHJcblxyXG5FbW90ZS5lbW90ZXMgPSB7XHJcbiAgICBUcmlIYXJkOiB7XHJcbiAgICAgICAgdXJsOiBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvVHJpSGFyZC1vbGQucG5nJylcclxuICAgIH1cclxufTtcclxuXHJcbkVtb3RlLm1lc3NhZ2VzID0ge307XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZW1vdGUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEVtb3RlIGZyb20gJy4vZW1vdGUnO1xyXG5pbXBvcnQgTWVudGlvbkhpZ2hsaWdodCBmcm9tICcuL21lbnRpb25IaWdobGlnaHQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hhdE9ic2VydmVyKClcclxue1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0eWxlLXNjb3BlIC55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyJyk7XHJcbiAgICBjb25zdCBhdXRob3JuYW1lID0gJCgnI2F1dGhvciAjYXV0aG9yLW5hbWUnKS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoY2hhdE9ic2VydmVyLCAyNTApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcclxuXHJcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdOb2RlcyA9IG11dGF0aW9uLmFkZGVkTm9kZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3Tm9kZXMgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCAkbm9kZXMgPSAkKG5ld05vZGVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRub2RlID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkbm9kZS5oYXNDbGFzcygneXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE1lbnRpb25IaWdobGlnaHQoJG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3RlQ2hlY2soJG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXHJcbiAgICAgICAgYXR0cmlidXRlczogZmFsc2UsXHJcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NoYXRPYnNlcnZlci5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRW1vdGUgZnJvbSAnLi9lbW90ZSc7XHJcbmltcG9ydCBkb25hdGVCdXR0b24gZnJvbSAnLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbic7XHJcbmltcG9ydCBjaGVja0lmV2F0Y2hpbmdMaXZlIGZyb20gJy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlJztcclxuaW1wb3J0IEFsd2F5c1Njcm9sbERvd24gZnJvbSAnLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZUNoZWNrXHJcbntcclxuICAgIHN0YXRpYyB5b3V0dWJlR2FtaW5nKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGl2ZS1jaGF0LWlmcmFtZScpO1xyXG5cclxuICAgICAgICBjb25zdCAkdGV4dFdyYXBwZXIgPSAkKCcueXQtdXNlci1pbmZvJyk7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9ICR0ZXh0V3JhcHBlci5maW5kKCdhJykudGV4dCgpO1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgICAgICBpZiAodGV4dCA9PSAnSWNlIFBvc2VpZG9uJyAmJiAhdXJsLmluY2x1ZGVzKCdnYW1pbmcueW91dHViZScpICYmIGlmcmFtZSkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVkaXJlY3RDb25maXJtID0gY29uZmlybSgnW0ljZSBQb3NlaWRvblRWXSBHbyB0byB0aGUgb2ZmaWNpYWwgSWNlIFBvc2VpZG9uIGxpdmVzdHJlYW0gcGFnZT8nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWRpcmVjdENvbmZpcm0gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICdodHRwczovL2dhbWluZy55b3V0dWJlLmNvbS9pY2VfcG9zZWlkb24vbGl2ZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBsaXZlc3RyZWFtUGFnZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ293bmVyJyk7XHJcbiAgICAgICAgY29uc3QgY2hhdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGF0Jyk7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9ICQodGFyZ2V0KS5maW5kKCdzcGFuJykudGV4dCgpO1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgICAgICBpZiAoKCF0YXJnZXQgfHwgIWNoYXQpICYmICghdXJsLmluY2x1ZGVzKCdsaXZlX2NoYXQnKSAmJiAhdXJsLmluY2x1ZGVzKCdpc19wb3BvdXQ9MScpKSkge1xyXG5cclxuICAgICAgICAgICAgUGFnZUNoZWNrLnN0cmVhbXBhZ2VDaGVja3MrKztcclxuXHJcbiAgICAgICAgICAgIGlmIChQYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcyA8IDI1KSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KFBhZ2VDaGVjay5saXZlc3RyZWFtUGFnZSwgMjUwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGVtcCBmaXggdG8gcHJldmVudCByYW0gZnJvbSBmaWxsaW5nIHVwIHdpdGggbWVzc2FnZXMuXHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBtZXNzYWdlcyA9IHt9O1xyXG4gICAgICAgIH0sIDEwMDAgKiA2MCAqIDUpO1xyXG5cclxuICAgICAgICBpZih0ZXh0ID09ICdJY2UgUG9zZWlkb24nKSBkb25hdGVCdXR0b24oKTtcclxuXHJcbiAgICAgICAgRW1vdGUubG9hZEVtb3RlcygpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaW5pdCgpO1xyXG4gICAgICAgIGNoZWNrSWZXYXRjaGluZ0xpdmUoKTtcclxuICAgIH1cclxufTtcclxuXHJcblBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzID0gMDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wYWdlQ2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgb3B0aW9ucyB9IGZyb20gJy4vbWFpbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNZW50aW9uSGlnaGxpZ2h0KG5vZGUpXHJcbntcclxuICAgIGNvbnN0IGF1dGhvcm5hbWUgPSAkKCcjYXV0aG9yICNhdXRob3ItbmFtZScpLnRleHQoKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIGlmIChvcHRpb25zWydtZW50aW9uSGlnaGxpZ2h0J10gJiYgYXV0aG9ybmFtZS5sZW5ndGggPiAyICYmICFub2RlLmhhc0NsYXNzKCd5dC1saXZlLWNoYXQtbGVnYWN5LXBhaWQtbWVzc2FnZS1yZW5kZXJlci0wJykpIHsgLy8gQ2hlY2sgaXQncyBub3Qgc3BvbnNvciAvIHN1cGVyY2hhdCwgYWxzbyBtZW50aW9uSGlnaGxpZ2h0IGVuYWJsZWRcclxuXHJcbiAgICAgICAgY29uc3QgdW5pcXVlaWQgPSBub2RlLmdldCgwKS5nZXRBdHRyaWJ1dGUoJ2lkJykgLy8gQ29weSB1bmlxdWUgbWVzc2FnZSBpZFxyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAoXCIgXCIgKyBub2RlLmZpbmQoJyNtZXNzYWdlJykudGV4dCgpLnRvTG93ZXJDYXNlKCkgKyBcIiBcIikucmVwbGFjZSgvW1xcdTIwMEItXFx1MjAwRFxcdUZFRkZdL2csICcnKTtcclxuXHJcbiAgICAgICAgaWYgKHVuaXF1ZWlkLmxlbmd0aCA+IDMwICYmIChtZXNzYWdlLmluZGV4T2YoJyAnK2F1dGhvcm5hbWUrJyAnKSAhPT0gLTEgfHwgbWVzc2FnZS5pbmRleE9mKCdAJythdXRob3JuYW1lKycgJykgIT09IC0xKSkgeyAvLyBJZiB5b3VyIG5hbWUgaXMgaW4gdGhlIG1lc3NhZ2UsIGFuZCBpdCdzIG5vdCB5b3VyIG1lc3NhZ2VcclxuICAgICAgICAgICAgbm9kZS5nZXQoMCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDI1NSwwLDAsMC40MClcIjtcclxuICAgICAgICAgICAgbm9kZS5maW5kKCcjYXV0aG9yLW5hbWUnKS5nZXQoMCkuc3R5bGUuY29sb3IgPSBcIiNmZmZmZmZcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWVudGlvbkhpZ2hsaWdodC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBTQ1JPTExfRU5BQkxFRF9VUkwsIFNDUk9MTF9ESVNBQkxFRF9VUkwgfSBmcm9tICcuLy4uL21haW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWx3YXlzU2Nyb2xsRG93blxyXG57XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgJ0Fsd2F5cyBzY3JvbGwgZG93bicgb3ZlcmxheSBhbmQgYmluZHMgdGhlIG5lY2Vzc2FyeSBsaXN0ZW5lcnMuXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCQoJy5pcHR2LXNjcm9sbGRvd24td3JhcHBlcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkKCcuaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKS5yZW1vdmUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBzY3JvbGxXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIHNjcm9sbFdyYXBwZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0Fsd2F5cyBzY3JvbGwgZG93biAoRW5hYmxlZCknKTtcclxuICAgICAgICBzY3JvbGxXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2hpbnQtLXRvcCcsICdpcHR2LXNjcm9sbGRvd24td3JhcHBlcicpO1xyXG5cclxuICAgICAgICAkKHNjcm9sbFdyYXBwZXIpLmNzcyh7XHJcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICdyaWdodCc6ICcxMTNweCcsXHJcbiAgICAgICAgICAgICdib3R0b20nOiAnMThweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChzY3JvbGxXcmFwcGVyKS5odG1sKGBcclxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaXB0di1zY3JvbGxkb3duLXRvZ2dsZVwiIHN0eWxlPVwib3V0bGluZTogMDtcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtTQ1JPTExfRU5BQkxFRF9VUkx9XCIgYWx0PVwiQWx3YXlzIHNjcm9sbCBkb3duXCIgaGVpZ2h0PVwiMTFcIiB3aWR0aD1cIjExXCIgY2xhc3M9XCJpcHR2LXNjcm9sbGRvd24tdG9nZ2xlLWljb25cIj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgIGApO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbFdyYXBwZXIpO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmlwdHYtc2Nyb2xsZG93bi10b2dnbGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi50b2dnbGVTY3JvbGxEb3duKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2l0ZW0tc2Nyb2xsZXInKS5zY3JvbGxUb3AoOTk5OTk5OTk5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uQ2luZW1hKHNjcm9sbFdyYXBwZXIpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uU3BvbnNvck1lbnUoc2Nyb2xsV3JhcHBlcik7XHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGVzIHRoZSAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IHdoZW4gY2luZW1hIG1vZGUgaXMgb3BlblxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtub2RlfSBzY3JvbGxXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlU2Nyb2xsT25DaW5lbWEoc2Nyb2xsV3JhcHBlcilcclxuICAgIHtcclxuICAgICAgICBjb25zdCB3YXRjaFBhZ2UgPSAneXRnLXdhdGNoLXBhZ2UnO1xyXG5cclxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJChtLnRhcmdldCkuaXMoJ1tzaWRlYmFyLWNvbGxhcHNlZF0nKSA/ICQoc2Nyb2xsV3JhcHBlcikuaGlkZSgpIDogJChzY3JvbGxXcmFwcGVyKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBvYnNlcnZlck9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ3NpZGViYXItY29sbGFwc2VkJ11cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGFkZE9ic2VydmVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZigkKHdhdGNoUGFnZSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKCQod2F0Y2hQYWdlKVswXSwgb2JzZXJ2ZXJPcHRzKTtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoYWRkT2JzZXJ2ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMjUwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGVzIHRoZSAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IHdoZW4gc3BvbnNvciBtZW51IGlzIG9wZW4uXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge25vZGV9IHNjcm9sbFdyYXBwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhpZGVTY3JvbGxPblNwb25zb3JNZW51KHNjcm9sbFdyYXBwZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY2hhdElucHV0UmVuZGVyZXIgPSAneXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXInO1xyXG5cclxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG0pID0+IHtcclxuICAgICAgICAgICAgICAgICQobS50YXJnZXQpLmF0dHIoJ2NyZWF0b3Itb3BlbicpID8gJChzY3JvbGxXcmFwcGVyKS5oaWRlKCkgOiAkKHNjcm9sbFdyYXBwZXIpLnNob3coKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9ic2VydmVyT3B0cyA9IHtcclxuICAgICAgICAgICAgY2hpbGRMaXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIHN1YnRyZWU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnY3JlYXRvci1vcGVuJ11cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNwb25zb3JDbGljayA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCQoY2hhdElucHV0UmVuZGVyZXIpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSgkKGNoYXRJbnB1dFJlbmRlcmVyKVswXSwgb2JzZXJ2ZXJPcHRzKTtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc3BvbnNvckNsaWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDI1MCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZXMgJ0Fsd2F5cyBzY3JvbGwgZG93bicgZnVuY3Rpb25hbGl0eSB3aGVuIHNjcm9sbGluZyBtYW51YWxseS5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGJpbmRTY3JvbGxMaXN0ZW5lcigpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW0tc2Nyb2xsZXInKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IEFsd2F5c1Njcm9sbERvd24uYmluZFNjcm9sbExpc3RlbmVyKCkgfSwgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnI2l0ZW0tc2Nyb2xsZXInKS5iaW5kKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bihmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5hYmxlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBmdW5jdGlvbmFsaXR5IHdoZW4gYmx1ZSBqdW1wIGRvd24gYnV0dG9uIGlzIGNsaWNrZWQuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBiaW5kU2Nyb2xsRG93bkxpc3RlbmVyKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1tb3JlJyk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHsgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsRG93bkxpc3RlbmVyKCkgfSwgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFyZ2V0Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24odHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlIHNjcm9sbERvd24gc3RhdGUgYW5kIGFkanVzdCBvdmVybGF5IGFjY29yZGluZ2x5LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdG9nZ2xlU2Nyb2xsRG93bihzdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID0gIUFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93bjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSBzdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5pcHR2LXNjcm9sbGRvd24td3JhcHBlcicpLmF0dHIoJ2FyaWEtbGFiZWwnLCBBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPyAnQWx3YXlzIHNjcm9sbCBkb3duIChFbmFibGVkKScgOiAnQWx3YXlzIHNjcm9sbCBkb3duIChEaXNhYmxlZCknKTtcclxuICAgICAgICAkKCcuaXB0di1zY3JvbGxkb3duLXRvZ2dsZS1pY29uJykuYXR0cignc3JjJywgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID8gU0NST0xMX0VOQUJMRURfVVJMIDogU0NST0xMX0RJU0FCTEVEX1VSTCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5BbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd24gPSB0cnVlO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvYWx3YXlzU2Nyb2xsRG93bi5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb25hdGVCdXR0b24oKVxyXG57XHJcbiAgICBjb25zdCBkb25hdGVJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9kb25hdGUtaWNvbi5wbmcnKTtcclxuICAgIGNvbnN0IHNwb25zb3JJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9zcG9uc29yLWljb24ucG5nJyk7XHJcblxyXG4gICAgY29uc3Qgc3BvbnNvckltYWdlID0gYDxpbWcgc3JjPVwiJHtzcG9uc29ySWNvbn1cIiBhbHQ9XCJzdGFyXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czogbm9uZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCI+YDtcclxuXHJcbiAgICBjb25zdCBkb25hdGVCdXR0b24gPSBgXHJcbiAgICAgICAgPGlwdHYtZG9uYXRlLWJ1dHRvbiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiByYWlzZWQ9XCJcIiBzdXBwb3J0ZWQtY29sZC1sb2FkLWFjdGlvbnM9XCJbJnF1b3Q7c3BvbnNvciZxdW90O11cIiB3YWl0LWZvci1zaWduYWw9XCJ3YXRjaC1wYWdlLWluaXRpYWxpemVkXCIgY2xhc3M9XCJzdHlsZS1zY29wZSB5dGctd2F0Y2gtZm9vdGVyIHgtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uLTBcIj5cclxuICAgICAgICAgICAgPGlyb24tc2lnbmFscyBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPjwvaXJvbi1zaWduYWxzPlxyXG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uIHgtc2NvcGUgcGFwZXItYnV0dG9uLTBcIiByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCIgYW5pbWF0ZWQ9XCJcIiBhcmlhLWRpc2FibGVkPVwiZmFsc2VcIiBlbGV2YXRpb249XCIxXCIgcmFpc2VkPVwiXCIgYXJpYS1sYWJlbD1cIkRvbmF0ZSB0byBJY2VfUG9zZWlkb25cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItanVzdGlmaWVkIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMjRweDsgaGVpZ2h0OiAyNHB4O1wiIGNsYXNzPVwiaWNvbi1jb250YWluZXIgbGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHl0LWljb24gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC95dC1pY29uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCIgc3R5bGU9XCJtYXJnaW46IDAgM3B4XCI+PHNwYW4gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWZvcm1hdHRlZC1zdHJpbmdcIj5ET05BVEU8L3NwYW4+PC9pcHR2LWZvcm1hdHRlZC1zdHJpbmc+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9wYXBlci1idXR0b24+XHJcbiAgICAgICAgPC9pcHR2LWRvbmF0ZS1idXR0b24+YDtcclxuXHJcbiAgICBjb25zdCBkb25hdGVJbWFnZSA9IGA8aW1nIHNyYz1cIiR7ZG9uYXRlSWNvbn1cIiBhbHQ9XCJkb2xsYXItc2lnblwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPmA7XHJcblxyXG4gICAgLy8gSW5zZXJ0IGRvbmF0ZUJ1dHRvbiBuZXh0IHRvIHNwb25zb3JCdXR0b25cclxuICAgIGNvbnN0IHNwb25zb3JCdXR0b24gPSAnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24tMCc7XHJcblxyXG4gICAgJChzcG9uc29yQnV0dG9uKS5iZWZvcmUoZG9uYXRlQnV0dG9uKTtcclxuICAgICQoZG9uYXRlQnV0dG9uKS5yZWFkeSggZnVuY3Rpb24oKSB7ICQoJy5zdHlsZS1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24ueC1zY29wZS55dC1pY29uLTAnKS5odG1sKGRvbmF0ZUltYWdlKTsgfSk7XHJcblxyXG4gICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24tMCcpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly95b3V0dWJlLnN0cmVhbWxhYnMuY29tL2ljZXBvc2VpZG9uIy8nLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24tMCBwYXBlci1idXR0b24nKVswXS5ibHVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDaGFuZ2Ugc3BvbnNvckJ1dHRvbiBpY29uIHRvIHN0YXJcclxuICAgICQoYCR7c3BvbnNvckJ1dHRvbn0gLnN0eWxlLXNjb3BlLnl0Zy1tZW1iZXJzaGlwLW9mZmVyLWJ1dHRvbi54LXNjb3BlLnl0LWljb24tMGApLmh0bWwoc3BvbnNvckltYWdlKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24gcmVwbGFjZUFsbChzdHIsIGZpbmQsIHJlcGxhY2UpIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKGZpbmQsICdnJyksIHJlcGxhY2UpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTm9kZShvKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIHR5cGVvZiBOb2RlID09PSAnb2JqZWN0JyA/IG8gaW5zdGFuY2VvZiBOb2RlIDogbyAmJiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG8ubm9kZVR5cGUgPT09ICdudW1iZXInICYmIHR5cGVvZiBvLm5vZGVOYW1lID09PSAnc3RyaW5nJ1xyXG4gICAgKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRpbmdFbW90ZXNJbmZvKClcclxue1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgJChkaXYpLnRleHQoJ0xvYWRpbmcgZW1vdGVzLi4uJyk7XHJcblxyXG4gICAgJChkaXYpLmNzcyh7XHJcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxNnB4JyxcclxuICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICdyaWdodCc6ICcyNXB4JyxcclxuICAgICAgICAnYm90dG9tJzogJzc1cHgnLFxyXG4gICAgICAgICdjb2xvcic6ICcjZmZmJyxcclxuICAgICAgICAndGV4dC1zaGFkb3cnOiAnMnB4IDJweCAycHggcmdiYSgwLDAsMCwwLjc1KSdcclxuICAgIH0pO1xyXG5cclxuICAgICQoZGl2KS5hZGRDbGFzcygnaXB0di1sb2FkaW5nLWVtb3RlcycpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxufTtcclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mby5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja0lmV2F0Y2hpbmdMaXZlKCkge1xyXG5cclxuICAgIGxldCBsaXZlQ2hlY2tJbnRlcnZhbCA9IG51bGw7XHJcblxyXG4gICAgbGl2ZUNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgY29uc3QgJGxpdmVCdXR0b24gPSAkKCcueXRwLWxpdmUtYmFkZ2UueXRwLWJ1dHRvbicpO1xyXG5cclxuICAgICAgICBpZiAoJGxpdmVCdXR0b24uaXMoJzplbmFibGVkJykgJiYgJGxpdmVCdXR0b24uaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgJCgnI3BsYXllci1jb250YWluZXInKS5hcHBlbmQoYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgWW91XFwncmUgd2F0Y2hpbmcgb2xkIGZvb3RhZ2UsIGNsaWNrIHRoZSBMSVZFIGJ1dHRvbiBpbiB0aGUgYm90dG9tIGxlZnQgY29ybmVyIHRvIHdhdGNoIGxpdmUuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlwdHYtbGl2ZS13YXJuaW5nLWRpc21pc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctY2xvc2VcIj7inJU8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMTUgKiAxMDAwKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmlwdHYtbGl2ZS13YXJuaW5nLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmlwdHYtbGl2ZS13YXJuaW5nJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsaXZlQ2hlY2tJbnRlcnZhbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignbW91c2Vkb3duJywgJy55dHAtbGl2ZS1iYWRnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5pcHR2LWxpdmUtd2FybmluZycpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=
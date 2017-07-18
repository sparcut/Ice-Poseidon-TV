import { replaceAll } from './util';
import { getOptions, DISALLOWED_CHARS } from './main';
import loadingEmotesInfo from './overlay/loadingEmotesInfo';

export default class Emote
{
    /**
     * Load all enabled emotes.
     * @constructor
     */
    static loadEmotes()
    {
        loadingEmotesInfo();

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

        if (getOptions()['emotesTwitch']) Emote.loadTwitchEmotes();
        if (getOptions()['emotesSub']) Emote.loadSubEmotes();

        if (getOptions()['emotesBTTV']) {
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
        if ((getOptions()['emotesTwitch'] !== Emote.states['twitch'].loaded) ||
            (getOptions()['emotesSub'] !== Emote.states['sub'].loaded) ||
            (getOptions()['emotesBTTV'] !== Emote.states['BTTV'].loaded) ||
            (getOptions()['emotesBTTV'] !== Emote.states['BTTVChannels'].loaded)) {

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
        if (getOptions()['emotesTwitch'] === false && getOptions()['emotesSub'] === false && getOptions()['emotesBTTV'] === false && getOptions()['emotesIce'] === false) {
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

            msgHTML = replaceAll(msgHTML, word, emoteHtml);
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
        const channels = getOptions()['BTTVChannels'];
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
        for (const c in DISALLOWED_CHARS) {
            if (word.indexOf(c) > -1) {
                return true;
            }
        }

        return false;
    };
};

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

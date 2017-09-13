import PageCheck from './pageCheck';
import Subscribers from './subscribers';
import { isNode } from './util';
import ChatObserver from './chatObserver';
import Emote from './emote';

export const DISALLOWED_CHARS = ['\\', ':', '/', '&', "'", '"', '?', '!', '#'],
    SCROLL_ENABLED_URL = chrome.extension.getURL('icons/scroll-enabled.png'),
    SCROLL_DISABLED_URL = chrome.extension.getURL('icons/scroll-disabled.png');

export let options = null;

window.IPTVLoaded = false;
window.LSPageLoaded = false;

export function getOptions() {
    if (options === null) {
        return JSON.parse(localStorage.getItem('optionsCache'));
    }

    return options;
}

const onNewPageLoad = function () {

    $('[class^="iptv-"]').remove();
    $('.yt-live-chat-header-renderer#title').text('Chat');

    setTimeout(function () {
        if (PageCheck.isLivestream() && PageCheck.isIcePoseidonStream()) {
            init();
            if (!window.LSPageLoaded) { PageCheck.livestreamPage(); window.LSPageLoaded = true; }
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

    if (!isNode(target)) {
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

        Subscribers.loadBadges();

        if (getOptions()['emotesTwitch'] === true || getOptions()['emotesSub'] === true || getOptions()['emotesBTTV'] === true || getOptions()['emotesIce'] === true) {
            ChatObserver();
        }

        console.info('[IPTV] Init!');

        function getPossibleValues(localTrie, valuesArray) {
            if (typeof localTrie === 'string') {
                valuesArray.push(localTrie);
            } else {
                var keys = Object.keys(localTrie);
                var returnValues = [];
                for (var i = 0; i < keys.length; i++) {
                    getPossibleValues(localTrie[keys[i]], valuesArray);
                }
            }
        }

        function findSimilar(s, pos) {
            s = s.toLowerCase();
            var i = 0;
            var localTrie = Emote.trie;
            while ((i < s.length) && (s.charAt(i) in localTrie)) {
                localTrie = localTrie[s.charAt(i)];
                i++;
            }
            if (i == 0) return false;
            else {
                var values = [];
                getPossibleValues(localTrie, values);
                if (pos >= values.length) {
                    return false;
                } else {
                    return values[pos];
                }
            }
        }

        var tabPressedCount = 0;
        var lastWord = '';
        var inputChangedEvent = new Event('input', {
            'bubbles': true,
            'cancelable': true
        });

        $("yt-live-chat-text-input-field-renderer").on('keydown', "div#input", function(e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode == 9) {
                e.preventDefault();
                var currentText = $(this).text();
                var words = currentText.split(' ');
                if (lastWord.length) {
                    words.pop();
                } else {
                    lastWord = words.pop();
                }
                var similar = findSimilar(lastWord, tabPressedCount);
                var newText = '';
                for (var i = 0; i < words.length; i++) {
                    newText += words[i] + ' ';
                }
                if (similar) {
                    newText += similar;
                    tabPressedCount++;
                } else {
                    newText += lastWord;
                    lastWord = '';
                    tabPressedCount = 0;
                }
                $(this).text(newText);
                //adds focus to last char
                var range = document.createRange();
                range.selectNodeContents($(this)[0]);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);

                //updates character count
                this.dispatchEvent(inputChangedEvent);
            } else {
                tabPressedCount = 0;
                lastWord = '';
            }
        });
    }
}

onNewPageLoad();

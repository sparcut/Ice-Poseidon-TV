var disallowedChars = ['\\', ':', '/', '&', "'", '"', '?', '!', '#'],
    messages = {},
    emotes = {},
    clickBlueButton = true,
    url = document.location.href,
    prevScrollTop = 9999999,
    scrolldownInterval = null,
    redirectToYTGaming = false,
    redirectConfirm = null;

var emoteStates = {
    twitch: {
        shouldLoad: false,
        loaded: false
    },
    sub: {
        shouldLoad: false,
        loaded: false
    },
    BTTV: {
        shouldLoad: false,
        loaded: false
    },
    BTTVChannels: {
        loaded: false,
        loadedCount: 0,
        channels: {}
    }
};

var onNewPageLoad = function() {

    if (redirectToYTGaming === true) {
        setTimeout(checkIfOnYTGaming, 2500);
    }

    checkIfOnStreamPage();
};

var addLoadingDiv = function () {

    $('.loadingIceTV').remove();
    var div = document.createElement('div');
    $(div).text('Loading emotes...');
    
    $(div).css('position', 'absolute');
    $(div).css('right', '25px');
    $(div).css('bottom', '75px');
    $(div).css('color', '#fff');
    $(div).css('text-shadow', '2px 2px 2px rgba(0,0,0,0.75)');

    $(div).addClass('loadingIceTV');

    document.body.appendChild(div);
};

(function() {

    var target = document.querySelector('head > title');

    var observer = new window.WebKitMutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            onNewPageLoad();
        });
    });

    observer.observe(target, { subtree: true, characterData: true, childList: true });
}());

var loadEmotes = function() {

    if (emoteStates.twitch.shouldLoad) loadTwitchEmotes();
    if (emoteStates.sub.shouldLoad) loadSubEmotes();

    if (emoteStates.BTTV.shouldLoad) {
        loadBTTVEmotes();
        loadBTTVChannelEmotes();
    }

    waitTillEmotesLoaded();
};

var waitTillEmotesLoaded = function() {

    if ((emoteStates.twitch.shouldLoad !== emoteStates.twitch.loaded) || 
        (emoteStates.sub.shouldLoad !== emoteStates.sub.loaded) ||
        (emoteStates.BTTV.shouldLoad !== emoteStates.BTTV.loaded) ||
        (emoteStates.BTTV.shouldLoad !== emoteStates.BTTVChannels.loaded)) {

        setTimeout(waitTillEmotesLoaded, 250);
        return;
    }

    console.log(emotes['monkaS']);

    $('.loadingIceTV').remove();
    replaceExistingEmotes();
};

var bindScrollListener = function () {

    var target = document.getElementById('item-scroller');

    if (!target) {
        window.setTimeout(bindScrollListener, 250);
        return;
    }

    $('#item-scroller').bind('mousewheel DOMMouseScroll', function (event) {
        document.getElementById('scrolldown').checked = false;
    });
};

var bindScrollDownListener = function () {

    var target = document.getElementById('show-more');

    if (!target) {
        window.setTimeout(bindScrollDownListener, 250);
        return;
    }

    target.onmousedown = function () {
        document.getElementById('scrolldown').checked = true;
        return true;
    };
};

var hideScrollOnSponsorButton = function (div) {

    var chatInputRenderer = 'yt-live-chat-message-input-renderer';

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach((m) => {
            $(m.target).attr('creator-open') ? $(div).hide() : $(div).show();
        });
    });

    var observerOpts = {
        childList: false,
        attributes: true,
        characterData: false,
        subtree: false,
        attributeFilter: ['creator-open']
    }

    var sponsorClick = setInterval(() => {
        if ($(chatInputRenderer).length) {
            observer.observe($(chatInputRenderer)[0], observerOpts);
            clearInterval(sponsorClick);
        }
    }, 250);
};

var checkIfOnYTGaming = function() {

    var iframe = document.getElementById('live-chat-iframe');

    var $textWrapper = $('.yt-user-info');
    var text = $textWrapper.find('a').text();

    if (text == 'Ice Poseidon' && !url.includes('gaming.youtube') && iframe) {

        redirectConfirm = confirm('[Ice PoseidonTV] Go to the official Ice Poseidon livestream page?');

        if (redirectConfirm == true) {
            window.location = 'https://gaming.youtube.com/ice_poseidon/live';
        }
    }
};

var checkIfOnStreamPage = function() {

    var target = document.getElementById('owner');
    var chat = document.getElementById('chat');
    var text = $(target).find('span').text(); // Use "text != 'Ice Poseidon'" to check if on Ice's stream
    $('.scrolldownWrapper').remove();

    if (typeof scrolldownInterval !== 'undefined') {
        clearTimeout(scrolldownInterval);
    }

    if ((!target || !chat) && !url.includes('live_chat')) {
        return;
    }

    var div = document.createElement('div');
    $(div).addClass('scrolldownWrapper');

    document.body.appendChild(div);

    $(div).html('<input type="checkbox" id="scrolldown" name="scrolldown" checked>Always scroll down');
    $(div).css('position', 'absolute');
    $(div).css('right', '125px');
    $(div).css('bottom', '16px');
    $(div).css('color', 'rgba(255, 255, 255, 0.54)');

    var $input = $(div).find('input');
    $input.css('outline', 0);
    $input.css('opacity', 0.65);

    scrolldownInterval = setInterval(function () {
        if (document.getElementById('scrolldown').checked) {
            $('#item-scroller').scrollTop(999999999);
        }
    }, 100);

    addLoadingDiv();
    hideScrollOnSponsorButton(div);
    bindScrollListener();
    bindScrollDownListener();

    loadEmotes();
};

var addObserverIfDesiredNodeAvailable = function () {

    var target = document.querySelector('.style-scope .yt-live-chat-item-list-renderer');

    if (!target) {
        window.setTimeout(addObserverIfDesiredNodeAvailable, 250);
        return;
    }

    var observer = new MutationObserver(function (mutations) {

        mutations.forEach(function (mutation) {
            var newNodes = mutation.addedNodes;

            if (newNodes !== null) {
                var $nodes = $(newNodes);

                $nodes.each(function () {

                    var $node = $(this);

                    if (!$node.hasClass('yt-live-chat-item-list-renderer')) {
                        return;
                    }

                    emoteCheck($node);
                });
            }
        });
    });

    var options = {
        characterData: false,
        attributes: false,
        childList: true,
        subtree: true
    };

    observer.observe(target, options);
};

var replaceExistingEmotes = function () {

    var chatElements = $('.style-scope.yt-live-chat-item-list-renderer.x-scope.yt-live-chat-text-message-renderer-0');

    if (chatElements.length < 1) {
        setTimeout(replaceExistingEmotes, 250);
        return;
    }

    chatElements.each(function (i, el) {
        emoteCheck(el);
    });
};

var containsDisallowedChar = function (word) {

    for (c in disallowedChars) {
        if (word.indexOf(c) > -1) {
            return true;
        }
    }

    return false;
};

var isValidEmote = function (text) {
    return !(text[0].match(/[A-Z]/g) ||
        text.match(/^[a-z]+$/g) ||
        text.match(/^\d*$/g)
    );
};

var loadTwitchEmotes = function () {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://twitchemotes.com/api_cache/v2/global.json');
    xhr.send();
    var urlTemplate = '//static-cdn.jtvnw.net/emoticons/v1/';

    xhr.onload = function () {
        emoteDic = JSON.parse(xhr.responseText)['emotes'];
        for (var emote in emoteDic) {
            emotes[emote] = {
                url: urlTemplate + emoteDic[emote]['image_id'] + '/' + '1.0'
            };
        }

        emoteStates.twitch.loaded = true;
    }
};


var loadSubEmotes = function () {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://twitchemotes.com/api_cache/v2/subscriber.json');
    xhr.send();
    var urlTemplate = '//static-cdn.jtvnw.net/emoticons/v1/'

    xhr.onload = function () {
        emoteDic = JSON.parse(xhr.responseText)['channels'];
        for (var channel in emoteDic) {
            for (var i in emoteDic[channel]['emotes']) {
                dict = emoteDic[channel]['emotes'][i]
                var code = dict['code'];
                if (isValidEmote(code)) {
                    emotes[code] = {
                        url: urlTemplate + dict['image_id'] + '/' + '1.0',
                        channel: channel
                    };
                }
            }
        }

        emoteStates.sub.loaded = true;
    }
};

var loadBTTVEmotes = function () {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.betterttv.net/2/emotes');
    xhr.send();
    var urlTemplate = '//cdn.betterttv.net/emote/';

    xhr.onload = function () {
        emoteList = JSON.parse(xhr.responseText)['emotes'];
        for (var i in emoteList) {
            var dict = emoteList[i];
            if (!containsDisallowedChar(dict['code'])) {
                emotes[dict['code']] = {
                    url: urlTemplate + dict['id'] + '/' + '1x'
                };
            }
        }

        emoteStates.BTTV.loaded = true;
    }
};

var loadBTTVChannelEmotes = function () {

    var channels = emoteStates.BTTVChannels.channels;
    var commaChannels = channels.replace(/\s+/g, '').split(',');

    commaChannels.forEach(function (channel) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.betterttv.net/2/channels/' + channel);
        xhr.send();
        var url_template = '//cdn.betterttv.net/emote/';

        xhr.onload = function () {
            emoteList = JSON.parse(xhr.responseText)['emotes'];
            for (var i in emoteList) {
                var dict = emoteList[i];
                if (!containsDisallowedChar(dict['code'])) {
                    emotes[dict['code']] = {
                        url: url_template + dict['id'] + '/' + '1x',
                        channel: channel + ' (bttv)'
                    };
                }
            }

            emoteStates.BTTVChannels.loadedCount++;

            if (emoteStates.BTTVChannels.loadedCount >= commaChannels.length) {
                emoteStates.BTTVChannels.loaded = true;
            }
        }
    }, this);
};

var replaceAll = function (str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
};

var kappaCheck = function (msg) {
     $('img', msg).each(function () {
         
        var $img = $(this);

        if (/\ud83c\udf1d/g.test($img.attr('alt'))) {
            $img.replaceWith(document.createTextNode('Kappa'));
        }
    });
};

var emoteCheck = function (node) {

    var $message = $(node).find('#message');
    kappaCheck($message);

    var oldHTML = $message.html().trim();
    var msgHTML = oldHTML;

    if (typeof messages[msgHTML] == 'undefined') {

        var words = msgHTML.replace('/\xEF\xBB\xBF/', '').replace('﻿', '').split(' ');
        var uniqueWords = [];
        var emoteCount = 0;

        $.each(words, function (i, el) {
            if ($.inArray(el, uniqueWords) === -1) uniqueWords.push(el);
        });

        for (var i = 0; i < uniqueWords.length; i++) {

            var word = uniqueWords[i];

            if (typeof emotes[word] === 'undefined') {
                continue;
            }

            emoteCount++;

            var span = document.createElement('span');
            span.setAttribute('aria-label', word);
            span.classList.add('hint--bottom');

            var img = document.createElement('img');
            img.src = emotes[word]['url'];
            img.alt = word;
            img.style.display = 'inline';
            img.style.width = 'auto';
            img.style.overflow = 'hidden';

            span.appendChild(img);

            msgHTML = replaceAll(msgHTML, word, span.outerHTML);
        }

        if (emoteCount < 1) {
            return;
        }

        $message.html(msgHTML);

        messages[oldHTML.replace(/\s/g,'')] = msgHTML;

    } else {
        $message.html(messages[oldHTML]);
    }

    $message.parent().parent().bind('DOMSubtreeModified', function () {

        var $message = $(this).find('#message');
        kappaCheck($message);
        var html = $message.html().trim();
        html = html.replace('/\xEF\xBB\xBF/', '').replace('﻿', '').replace(/\s/g,'');

        if (typeof messages[html] !== 'undefined') {

            if (html == messages[html]) {
                return;
            }

            $message.html(messages[html]);
        }
    });
};

chrome.runtime.sendMessage({ items: ['emotesTwitch', 'emotesBTTV', 'emotesSub'] }, function (response) {

    if (response.data['emotesTwitch'] === true || response.data['emotesBTTV'] === true || response.data['emotesSub'] === true) {
        addObserverIfDesiredNodeAvailable();
    }

    redirectToYTGaming = response.redirectToYTGaming;

    emoteStates.twitch.shouldLoad = response.data['emotesTwitch'];
    emoteStates.sub.shouldLoad = response.data['emotesSub'];

    if (response.data['emotesBTTV'] === true) {
        emoteStates.BTTV.shouldLoad = response.data['emotesBTTV'];
        emoteStates.BTTVChannels.channels = response.BTTVChannels;
    }

    $('<style type="text/css">.yt-live-chat-text-message-renderer-0 #content #author-name:after{content: ":"}</style>').appendTo('head'); // Add ':' behind message author in chat

    if (response.disableAvatars) {
        $('<style type="text/css">.style-scope .yt-live-chat-item-list-renderer #author-photo { display: none !important; }.style-scope.yt-live-chat-message-input-renderer.no-transition{ display: none !important; }</style>').appendTo('head');
    }

    if (response.enableChatColors) {
        var a = chrome.extension.getURL('external/chatColors.min.css');
        $('<link rel="stylesheet" type="text/css" href="' + a + '" >').appendTo('head');
    }

    // Delay init till everything is fully loaded
    $(window).bind('load', function () {
        onNewPageLoad();
    });
});
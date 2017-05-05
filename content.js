var disallowedChars = ['\\', ':', '/', '&', "'", '"', '?', '!', '#'];
var messages = {};
var emotes = {};

chrome.runtime.sendMessage({ items: ['emotesTwitch', 'emotesBTTV', 'emotesSub'] }, function(response) {

    if (response.data['emotesTwitch'] === true || response.data['emotesBTTV'] === true || response.data['emotesSub'] === true) {
        addObserverIfDesiredNodeAvailable();
    }

    if (response.data['emotesTwitch'] === true) emotesTwitch();
    if (response.data['emotesSub'] === true) emotesSub();

    if (response.data['emotesBTTV'] === true) {
        emotesBTTV();
        emotesBTTVCHannels(response.BTTVChannels);
    }
});

var addObserverIfDesiredNodeAvailable = function() {

    var target = document.querySelector('.style-scope .yt-live-chat-item-list-renderer');

    if (!target) {
        window.setTimeout(addObserverIfDesiredNodeAvailable, 250);
        return;
    }

    var observer = new MutationObserver(function(mutations) {

        mutations.forEach(function(mutation) {

            var newNodes = mutation.addedNodes;

            if (newNodes !== null) {

                var $nodes = $(newNodes);

                $nodes.each(function() {

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

    replaceExistingEmotes();
};

var replaceExistingEmotes = function() {

    var chatElements = $('.style-scope.yt-live-chat-item-list-renderer.x-scope.yt-live-chat-text-message-renderer-0');

    chatElements.each(function(i, el){
        emoteCheck(el);
    });
}

var containsDisallowedChar = function(word) {

    for (c in disallowedChars) {
        if (word.indexOf(c) > -1) {
            return true;
        }
    }

    return false;
}

function isValidEmote(text) {
    return !(text[0].match(/[A-Z]/g) ||
        text.match(/^[a-z]+$/g) ||
        text.match(/^\d*$/g)
    );
}

var emotesTwitch = function() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//twitchemotes.com/api_cache/v2/global.json');
    xhr.send();
    var urlTemplate = "//static-cdn.jtvnw.net/emoticons/v1/";

    xhr.onload = function() {
        emoteDic = JSON.parse(xhr.responseText)['emotes'];
        for (var emote in emoteDic) {
            emotes[emote] = {
                url: urlTemplate + emoteDic[emote]['image_id'] + '/' + '1.0'
            };
        }
    }
};

var emotesBTTV = function() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//api.betterttv.net/2/emotes');
    xhr.send();
    var urlTemplate = "//cdn.betterttv.net/emote/";

    xhr.onload = function() {
        emoteList = JSON.parse(xhr.responseText)['emotes'];
        for (var i in emoteList) {
            var dict = emoteList[i];
            if (!containsDisallowedChar(dict['code'])) {
                emotes[dict['code']] = {
                    url: urlTemplate + dict['id'] + '/' + '1x'
                };
            }
        }
    }
};

var emotesBTTVCHannels = function(channels) {

    var commaChannels = channels.replace(/\s+/g, '').split(',');

    commaChannels.forEach(function(channel) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '//api.betterttv.net/2/channels/' + channel);
        xhr.send();
        var url_template = "//cdn.betterttv.net/emote/";

        xhr.onload = function() {
            emoteList = JSON.parse(xhr.responseText)['emotes'];
            for (var i in emoteList) {
                var dict = emoteList[i];
                if (!containsDisallowedChar(dict['code'])) {
                    emotes[dict['code']] = {
                        url: url_template + dict['id'] + '/' + '1x',
                        channel: channel + " (bttv)"
                    };
                }
            }
        }
    }, this);
}

var emotesSub = function() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//twitchemotes.com/api_cache/v2/subscriber.json');
    xhr.send();
    var urlTemplate = "//static-cdn.jtvnw.net/emoticons/v1/"

    xhr.onload = function() {
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
    }
};

var replaceAll = function(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

var emoteCheck = function(node) {

    var $message = $(node).find('#message');

    var oldHTML = $message.html().trim();

    if (typeof messages[oldHTML] == 'undefined') {
        var words = $message.html().trim().replace("/\xEF\xBB\xBF/", "").replace('﻿', '').split(" ");
        var uniqueWords = [];
        var emoteCount = 0;

        $.each(words, function(i, el) {
            if ($.inArray(el, uniqueWords) === -1) uniqueWords.push(el);
        });

        for (var i = 0; i < uniqueWords.length; i++) {

            var word = uniqueWords[i];

            if (typeof emotes[word] === 'undefined') {
                continue;
            }

            emoteCount++;

            var img = document.createElement('img');
            img.src = emotes[word]['url'];
            img.alt = word;
            img.style.display = 'inline';
            img.style.width = 'auto';
            img.style.overflow = 'hidden';

            var innerHTML = $message.html();

            innerHTML = replaceAll(innerHTML, word, img.outerHTML)

            $message.html(innerHTML);
        }

        if (emoteCount < 1) {
            return;
        }

        messages[oldHTML] = $message.html();
    } else {
        $message.html(messages[oldHTML]);
    }

    $message.parent().parent().bind('DOMSubtreeModified', function() {

        var $message = $(this).find('#message');

        var html = $message.html().trim().replace("/\xEF\xBB\xBF/", "").replace('﻿', '');

        if (typeof messages[html] !== 'undefined') {

            if (html == messages[html]) {
                return;
            }

            $message.html(messages[html]);
        }
    });
}
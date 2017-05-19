var disallowedChars = ['\\', ':', '/', '&', "'", '"', '?', '!', '#'],
    messages = {},
    emotes = {},
    clickBlueButton = true,
    url = document.location.href,
    prevScrollTop = 9999999,
    scrolldownInterval = null,
    redirectToYTGaming = false,
    redirectConfirm = null,
    subscribers = null,
    streampageChecks = 0;

var emoteStates = {
    twitch: {
        shouldLoad: false,
        loaded: false
    },
    sub: {
        shouldLoad: false,
        loaded: false
    },
    ice: {
        shouldLoad: false
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

var donateButtonCreated = false;
var mentionHighlight = false;

var onNewPageLoad = function() {

    if (redirectToYTGaming === true) {
        setTimeout(checkIfOnYTGaming, 2500);
    }

    checkIfOnStreamPage();
    
    donateButtonCreated = false;
};

var getSubscribers = function() {

	// WIP

	// var xhr = new XMLHttpRequest();
    // xhr.open('GET', 'http://127.0.0.1:8000/api/v1/subscriptions');
    // xhr.send();

    // xhr.onload = function () {
	// 	var responseSubs = JSON.parse(xhr.responseText)['subscriptions'];
    //     subscribers = responseSubs;
    // }
    // Test 123
}

var addLoadingDiv = function () {

    $('.loadingIceTV').remove();
    var div = document.createElement('div');
    $(div).text('Loading emotes...');

    $(div).css('font-size', '16px');
    $(div).css('position', 'absolute');
    $(div).css('right', '25px');
    $(div).css('bottom', '75px');
    $(div).css('color', '#fff');
    $(div).css('text-shadow', '2px 2px 2px rgba(0,0,0,0.75)');

    $(div).addClass('loadingIceTV');

    document.body.appendChild(div);
};

var isNode = function(o) {
    return (
        typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
};

(function() {

    var target = document.querySelector('head > title');

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            onNewPageLoad();
        });
    });

	if (!isNode(target)) {
		return;
	}

    observer.observe(target, { subtree: true, characterData: true, childList: true });
}());

var loadEmotes = function() {

    // Add message if emotes failed to load
    setTimeout(function() {

		if ($('.loadingIceTV')[0]){
			$('.loadingIceTV').css('color', '#c0392b');
			$('.loadingIceTV').css('background-color', '#282828');
			$('.loadingIceTV').text('Failed some loading emotes (API servers down)');
			$('.loadingIceTV').css('right', '19px');
		}

		setTimeout(function() {
			$('.loadingIceTV').remove();
		}, 7.5 * 1000);

	}, 10 * 1000);

    if (emoteStates.twitch.shouldLoad) loadTwitchEmotes();
    if (emoteStates.sub.shouldLoad) loadSubEmotes();
    if (emoteStates.ice.shouldLoad) loadIceEmotes();

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

    $('.loadingIceTV').remove();
    replaceExistingEmotes();
};

var bindScrollListener = function () {

    var target = document.getElementById('item-scroller');

    if (!target) {
        setTimeout(bindScrollListener, 250);
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

    if (typeof scrolldownInterval !== 'undefined') {
        clearTimeout(scrolldownInterval);
    }

    if ((!target || !chat) && (!url.includes('live_chat') && !url.includes('is_popout=1'))) {
        streampageChecks++;

        if (streampageChecks < 25) {
            setTimeout(checkIfOnStreamPage, 250);
            return;
        }
    }

    var div = document.createElement('div');
    $(div).addClass('scrolldownWrapper');

    document.body.appendChild(div);

    $(div).html('<input type="checkbox" id="scrolldown" name="scrolldown" checked>Always scroll down');
    $(div).css('font-size', '16px');
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

    // Temp fix to prevent ram being filled with messages
    setInterval(function () {
        messages = {};
    }, 1000 * 60 * 5);

    addLoadingDiv();
    hideScrollOnSponsorButton(div);
    bindScrollListener();
    bindScrollDownListener();

    if(!donateButtonCreated) {
        addDonateButton();
    }
    
    loadEmotes();
};

var addObserverIfDesiredNodeAvailable = function () {

    var target = document.querySelector('.style-scope .yt-live-chat-item-list-renderer');
    var authorname = $('#author #author-name').text();

    if (!target) {
        setTimeout(addObserverIfDesiredNodeAvailable, 250);
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
                    
                    if(mentionHighlight && !$node.hasClass('yt-live-chat-legacy-paid-message-renderer-0')) { // Check it's not sponsor / superchat, also mentionHighlight enabled
                        var uniqueid = $node.get(0).getAttribute('id') // Copy unique message id
                        var message = $node.find('#message').text();

                        if(message.toLowerCase().indexOf(authorname.toLowerCase()) !== -1 & uniqueid.length > 30) { // If your name is in the message, and it's not your message
                            $node.get(0).style.backgroundColor = "rgba(255,0,0,0.40)";
                            $node.find('#author-name').get(0).style.color = "#ffffff";
                        }
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

var subCheck = function(el) {

    // WIP

    // var $img = $(el).find('img');
    // var imgSrc = $img.attr('src');
    // var ytId = imgSrc.split('/')[6];

    // if (!subscribers.includes(ytId)) {
    //     return;
    // }

    // var imageUrl = chrome.extension.getURL('/icons/sub-3.png');
    // var $img = $('<img>');
    // $img.css('height', '14px');
    // $img.css('width', 'auto');
    // $img.css('margin-right', '4px');

    // $img.attr('src', imageUrl);

    // $(el).find('#author-badges').append($img);
}

var addDonateButton = function() {

    donateButtonCreated = true;
    var donateIcon = chrome.extension.getURL('/icons/donate-icon.png');
    var sponsorIcon = chrome.extension.getURL('/icons/sponsor-icon.png');

    var sponsorImage = `<img src="${sponsorIcon}" alt="star" style="pointer-events: none; display: block; width: 100%; height: 100%;">`;

    var donateButton = `
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

    var donateImage = `<img src="${donateIcon}" alt="dollar-sign" style="pointer-events: none; display: block; width: 100%; height: 100%;">`;

    // Insert donateButton next to sponsorButton
    var sponsorButton = '.style-scope.ytg-watch-footer.x-scope.ytg-membership-offer-button-0';

    $(sponsorButton).before(donateButton);
    $(donateButton).ready( function() { $('.style-scope.iptv-donate-button.x-scope.yt-icon-0').html(donateImage); });

    $('.style-scope.ytg-watch-footer.x-scope.iptv-donate-button-0').on('click', () => {
        window.open('https://youtube.streamlabs.com/iceposeidon#/', '_blank');
        $('.style-scope.ytg-watch-footer.x-scope.iptv-donate-button-0 paper-button')[0].blur();
    });

    // Change sponsorButton icon to star
    $(`${sponsorButton} .style-scope.ytg-membership-offer-button.x-scope.yt-icon-0`).html(sponsorImage);
};

var replaceExistingEmotes = function () {

    var chatElements = $('.style-scope.yt-live-chat-item-list-renderer.x-scope.yt-live-chat-text-message-renderer-0');

    if (chatElements.length < 1) {
        setTimeout(replaceExistingEmotes, 250);
        return;
    }

    chatElements.each(function (i, el) {
        emoteCheck(el);
        subCheck(el);
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

    xhr.ontimeout = function() {
        emoteStates.twitch.loaded = true;
    };

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
    var urlTemplate = '//static-cdn.jtvnw.net/emoticons/v1/';

    xhr.ontimeout = function() {
        emoteStates.sub.loaded = true;
    };

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

    xhr.ontimeout = function() {
        emoteStates.BTTV.loaded = true;
    };

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

        xhr.ontimeout = function() {
            emoteStates.BTTVChannels.loadedCount++;

            if (emoteStates.BTTVChannels.loadedCount >= commaChannels.length) {
                emoteStates.BTTVChannels.loaded = true;
            }
        }

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

var loadIceEmotes = function () {

 	var urlTemplate = 'https://static-cdn.jtvnw.net/emoticons/v1/';

 	var iceEmotes = {
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

    for(var emote in iceEmotes) {
        emotes[emote] = {
            url: urlTemplate + iceEmotes[emote]['image_id'] + '/' + '1.0'
        }
    }
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
            span.classList.add('hint--top');

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

chrome.runtime.sendMessage({ items: ['emotesTwitch', 'emotesBTTV', 'emotesSub', 'emotesIce'] }, function (response) {

    if (response.data['emotesTwitch'] === true || response.data['emotesBTTV'] === true || response.data['emotesSub'] === true || response.data['emotesIce'] === true) {
        addObserverIfDesiredNodeAvailable();
    }

    redirectToYTGaming = response.redirectToYTGaming;

    emoteStates.twitch.shouldLoad = response.data['emotesTwitch'];
    emoteStates.sub.shouldLoad = response.data['emotesSub'];
    emoteStates.ice.shouldLoad = response.data['emotesIce'];

    if (response.data['emotesBTTV'] === true) {
        emoteStates.BTTV.shouldLoad = response.data['emotesBTTV'];
        emoteStates.BTTVChannels.channels = response.BTTVChannels;
    }

    $('<style type="text/css">.yt-live-chat-text-message-renderer-0 #content #author-name:after{content: ":"} .style-scope.yt-live-chat-text-message-renderer.x-scope.paper-icon-button-1#menu-button {padding: 3px; height: 24px; width: 24px;}</style>').appendTo('head'); // Add ':' behind message author in chat

    if (response.disableAvatars) {
        $('<style type="text/css">.style-scope .yt-live-chat-item-list-renderer #author-photo { width: 0px; height: 0px; margin-right: 0px; visibility: hidden; }.style-scope.yt-live-chat-message-input-renderer.no-transition{ display: none !important; }.style-scope yt-live-chat-message-input-renderer #avatar { display: none !important; }</style>').appendTo('head');
    }

    if (response.enableChatColors) {
        var a = chrome.extension.getURL('external/chat-colors.css');
        $('<link rel="stylesheet" type="text/css" href="' + a + '" >').appendTo('head');
    }

    if (response.enableSplitChat) {
        $('<style type="text/css">.style-scope yt-live-chat-text-message-renderer { border-top: 0.5px solid #333333; border-bottom: 0.5px solid #000000; }</style>').appendTo('head');
    }

    if(response.showDeletedMessages) {
    	$('<style type="text/css">.yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer {display: inline;} .yt-live-chat-text-message-renderer-0 #deleted-state.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0 #deleted-state:before{content: "  "}</style>').appendTo('head');
	}
    
    if(response.mentionHighlight) {
        mentionHighlight = true;
        $('<style type="text/css">.yt-live-chat-text-message-renderer-0 .mention.yt-live-chat-text-message-renderer { background-color: rgba(114, 15, 15, 0) !important; }</style>').appendTo('head');
    }

    onNewPageLoad();
});

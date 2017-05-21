var disallowedChars = ['\\', ':', '/', '&', "'", '"', '?', '!', '#'],
    messages = {},
    emotes = {},
    url = document.location.href,
    prevScrollTop = 9999999,
    scrolldownInterval = null,
    redirectToYTGaming = false,
    redirectConfirm = null,
    subscribers = null,
    streampageChecks = 0,
    scrollDown = true,
    mentionHighlight = false,
    liveCheckInterval = null;

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

var scrollEnabledUrl =  chrome.extension.getURL('/icons/scroll-enabled.png'),
    scrollDisabledUrl =  chrome.extension.getURL('/icons/scroll-disabled.png'),
    TriHardOldUrl = chrome.extension.getURL('/icons/TriHard-old.png');

emotes['TriHard'] = { url: TriHardOldUrl };

var onNewPageLoad = function() {

    $('[class^="iptv-"]').remove();

    if (redirectToYTGaming === true) {
        setTimeout(checkIfOnYTGaming, 2500);
    }

    checkIfOnStreamPage();
};

var isNode = function(o) {
    return (
        typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
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

var checkIfWatchingLive = function() {

    liveCheckInterval = setInterval(function() {

        var $liveButton = $('.ytp-live-badge.ytp-button');

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

var addScrollCheckbox = function() {

    if($('.iptv-scrolldown-wrapper').length) {
        $('.iptv-scrolldown-wrapper').remove();
    };

    var scrollWrapper = document.createElement('div');

    scrollWrapper.setAttribute('aria-label', 'Always scroll down (Enabled)');
    scrollWrapper.classList.add('hint--top', 'iptv-scrolldown-wrapper');

    $(scrollWrapper).css({
        'position': 'absolute',
        'right': '113px',
        'bottom': '18px'
    });

    $(scrollWrapper).html(`
        <a href="javascript:void(0)" class="iptv-scrolldown-toggle" style="outline: 0;">
            <img src="${scrollEnabledUrl}" alt="Always scroll down" height="11" width="11" class="iptv-scrolldown-toggle-icon">
        </a>
    `);

    document.body.appendChild(scrollWrapper);

    $(document).on('click', '.iptv-scrolldown-toggle', function() {
        toggleScrollDown();
    });

    scrolldownInterval = setInterval(function () {
        if (scrollDown === true) {
            $('#item-scroller').scrollTop(999999999);
        }
    }, 100);

    // Temp fix to prevent ram being filled with messages
    setInterval(function () {
        messages = {};
    }, 1000 * 60 * 5);

    hideScrollOnCinema(scrollWrapper);
    hideScrollOnSponsorButton(scrollWrapper);
    bindScrollListener();
    bindScrollDownListener();
};

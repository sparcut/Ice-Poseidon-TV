console.log('%cCx', 'color: purple');

var theaterMode = false;

var createCookie = function(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
};

var readCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
};

var eraseCookie = function(name) {
    createCookie(name,'',-1);
};

(function() {
    $('.ui-absolute').show();
}());

$(window).on('resize', function(){
    resizeIframes();
    repositionNavbar();
});

$(document).ready(function() {
    resizeIframes();

    repositionNavbar();

    $('.toggle-theater').click(function() {
        toggleTheaterMode();
    });

    $('.toggle-night').click(function() {
        toggleNightMode();
    });

    $('.toggle-fullscreen').click(function() {
        toggleFullScreen();
    });

    $('.toggle-popout').click(function() {
        window.open('https://gaming.youtube.com/live_chat?v=AvZ0cYrbsAQ&is_popout=1', 'Ice Poseidon Chat', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=500,height=800');
    });

    $('.upgrade-btn').click(function() {
        $(this).hide();
        $('.upgrade-tier').show();
    });

    $('[data-toggle="tooltip"]').tooltip({
        container: 'body',
        trigger : 'hover'
    });

    if (typeof renderUIButtons !== 'undefined' && renderUIButtons === true) {

        $('.button-wrapper').css({
            right: $('.chat-iframe').width() - 35
        });

        $('.ui-absolute').show();
        $('.navbar-right').hide();
    }
});

var toggleNightMode = function() {

    var nightmode = readCookie('nightmode');

    if (typeof nightmode === 'undefined') {
        createCookie('nightmode', false, 365);
    } else {
        nightmode === 'true' ? createCookie('nightmode', false, 365) : createCookie('nightmode', true, 365);
    }

    window.location.reload();
};

var toggleTheaterMode = function() {

    theaterMode = !theaterMode;

    if (theaterMode === true) {
        $('.top-navbar').hide();
        $('.container-wrapper').css('margin-top', 0);
        $('.chat-iframe').css('margin-top', 0);
        $('body').css('background-color', '#000');
    } else {
        $('.top-navbar').show();
        $('.container-wrapper').css('margin-top', '48px');
        $('.chat-iframe').css('margin-top', '-48px');

        if (readCookie('nightmode') === 'true') {
            $('body').css('background-color', '#191919');
        } else {
            $('body').css('background-color', '#e6e6e6');
        }
    }

    resizeIframes();
};

var repositionNavbar = function() {

    if (typeof renderUIButtons !== 'undefined' && renderUIButtons === true) {

        $('.button-wrapper').css({
            right: $('.chat-iframe').width() - 35
        });
    }
};

var resizeIframes = function() {

    var $window = $(window);
    var $iframe = $('.video-iframe');

    var windowHeight = $window.height();
    var iFrameWidth = $iframe.width();
    var iFrameHeight = ((iFrameWidth / 16) * 9);

    $iframe.css('height', Math.min(iFrameHeight, (windowHeight - 48)));

    var marginTop = 0;

    if (theaterMode === true) {
        marginTop = ((windowHeight - $iframe.height())) / 2;
    } else {
        marginTop = ((windowHeight - $iframe.height()) - 48) / 2;
    }

    $iframe.css('margin-top', marginTop);
};

function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

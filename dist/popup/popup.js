$(function() {
	$('.popupchat').click(function () {
		window.open('https://gaming.youtube.com/live_chat?v=AvZ0cYrbsAQ&is_popout=1', 'Ice Poseidon Chat', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=500,height=800');
	});

	$('.openOptions').click(function () {
		chrome.runtime.openOptionsPage();
	});
});

var liveCheck = function () {

	$.get('http://107.170.95.160/live', function(data) {

		if (data['status'] === true) {
			$('.stream-offline').addClass('hidden');
			$('.stream-online').removeClass('hidden');
		} else {
			$('.stream-online').addClass('hidden');
			$('.stream-offline').removeClass('hidden');
		}

        if (data['viewcount'] !== '') {
            $('.view-count').text(data['viewcount']);
        }
	});
};

var getLatestTweet = function () {

	if (JSON.parse(localStorage.showRecentTweet) === false) {
		$('<style type="text/css">html{height: 125px;}</style>').appendTo('head');
		return;
	}

	$('.tweet-container').removeClass('hidden');
};

var getCxLiveStreamers = function () {
	if (JSON.parse(localStorage.showCxLive) !== false) {
		$('.cxlive-container').removeClass('hidden');
	}
};

var getstreamURL = function () {
    if(JSON.parse(localStorage.streamURL) !== '') {
        $('#streamLink').attr('href', JSON.parse(localStorage.streamURL));
    }
};

document.addEventListener('DOMContentLoaded', function () {
	liveCheck();
	getLatestTweet();
    getCxLiveStreamers();
    getStreamURL();
});

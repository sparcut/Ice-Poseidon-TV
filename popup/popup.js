var CHANNEL_ID = 'UCv9Edl_WbtbPeURPtFDo-uA';

$(function() {
	$('.popupchat').click(function() {
		window.open('https://gaming.youtube.com/live_chat?v=AvZ0cYrbsAQ&is_popout=1', 'Ice Poseidon Chat', 'width=550,height=800');
	});

	$('.openOptions').click(function() {
		chrome.runtime.openOptionsPage();
	});
});

var liveCheck = function() {

	const bgPage = chrome.extension.getBackgroundPage();
	const check = bgPage.checkIfLive();

	$.get('http://107.170.95.160/live', function(data) {
		if (data['status'] === true) {
			$('.stream-offline').addClass('hidden');
			$('.stream-online').removeClass('hidden');
		} else {
			$('.stream-online').addClass('hidden');
			$('.stream-offline').removeClass('hidden');
		}
	});
};

var getLatestTweet = function() {

	if (JSON.parse(localStorage.showRecentTweet) === false) {
		return;
	}

	var configProfile = {
	  	profile: {screenName: 'realiceposeidon'},
	  	domId: 'latest-tweet',
	  	maxTweets: 1,
	  	enableLinks: false,
	  	showUser: false,
	  	showTime: false,
	  	showImages: false,
		showInteraction: false,
	  	lang: 'en'
	};

	twitterFetcher.fetch(configProfile);

	$('.tweet-wrapper').removeClass('hidden');
};

document.addEventListener('DOMContentLoaded', function () {
	liveCheck();
	getLatestTweet();
});

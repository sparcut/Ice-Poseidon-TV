var soundEffect = new Audio('../online.mp3');

window.addEventListener('load', function()
{
	options.isActivated.checked = JSON.parse(localStorage.isActivated)
	options.notificationSoundEnabled.checked = JSON.parse(localStorage.notificationSoundEnabled);
	options.notificationVolume.value = JSON.parse(localStorage.notificationVolume);
	options.showRecentTweet.checked = JSON.parse(localStorage.showRecentTweet);
	options.emotesTwitch.checked = JSON.parse(localStorage.emotesTwitch);
	options.emotesBTTV.checked = JSON.parse(localStorage.emotesBTTV);
	options.emotesSub.checked = JSON.parse(localStorage.emotesSub);
	options.BTTVChannels.value = localStorage.BTTVChannels;
	options.disableAvatars.checked = JSON.parse(localStorage.disableAvatars);
	options.enableChatColors.checked = JSON.parse(localStorage.enableChatColors);

	options.isActivated.onchange = function() {
		localStorage.isActivated = options.isActivated.checked;
	};

	options.notificationSoundEnabled.onchange = function() {
		localStorage.notificationSoundEnabled = options.notificationSoundEnabled.checked;
	};
  
	options.notificationVolume.onchange = function() {
		localStorage.notificationVolume = options.notificationVolume.value;
	};
  
	options.showRecentTweet.onchange = function() {
		localStorage.showRecentTweet = options.showRecentTweet.checked;
	};

	options.emotesTwitch.onchange = function() {
		localStorage.emotesTwitch = options.emotesTwitch.checked;
	};

	options.emotesBTTV.onchange = function() {
		localStorage.emotesBTTV = options.emotesBTTV.checked;
	};

	options.emotesSub.onchange = function() {
		localStorage.emotesSub = options.emotesSub.checked;
	};

	options.BTTVChannels.onchange = function() {
		localStorage.BTTVChannels = options.BTTVChannels.value;
	};

	options.disableAvatars.onchange = function() {
		localStorage.disableAvatars = options.disableAvatars.checked;
	};

	options.enableChatColors.onchange = function() {
		localStorage.enableChatColors = options.enableChatColors.checked;
	};

	$('.testNotification').click(function() {
		showTestNotification();
	}); 
});

var showTestNotification = function() {
	var time = /(..)(:..)/.exec(new Date());
	var hour = time[1] % 12 || 12;
	var period = time[1] < 12 ? 'AM' : 'PM';
  
	if (JSON.parse(localStorage.isActivated) === true) {
		var notification = new Notification('Live! (' + hour + time[2] + ' ' + period + ')', {
			icon: '../icons/64.png',
			body: 'Test notification!',
		});
	}
  
	if (JSON.parse(localStorage.notificationSoundEnabled) === true) {
		var volume = (localStorage.notificationVolume / 100);
		soundEffect.volume = (typeof volume == 'undefined' ? 0.50 : volume);
		soundEffect.play();
	}
};
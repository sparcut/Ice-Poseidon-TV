var soundEffect = new Audio('../online.mp3');

window.addEventListener('load', function()
{
	options.isActivated.checked = JSON.parse(localStorage.isActivated)
	options.notificationSoundEnabled.checked = JSON.parse(localStorage.notificationSoundEnabled);
	options.notificationVolume.value = JSON.parse(localStorage.notificationVolume);
	options.showRecentTweet.checked = JSON.parse(localStorage.showRecentTweet);

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
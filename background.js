var CHANNEL_ID = 'UCv9Edl_WbtbPeURPtFDo-uA',
	soundEffect = new Audio('online.mp3');

var showNotification = function() {
	var time = /(..)(:..)/.exec(new Date());
	var hour = time[1] % 12 || 12;
	var period = time[1] < 12 ? 'AM' : 'PM';
  
	if (JSON.parse(localStorage.isActivated) === true) {
		var notification = new Notification('Live! (' + hour + time[2] + ' ' + period + ')', {
			icon: 'icons/64.png',
			body: 'Ice Poseidon has started streaming.',
		});
	}
  
	if (JSON.parse(localStorage.notificationSoundEnabled) === true) {
		var volume = (localStorage.notificationVolume / 100);
		soundEffect.volume = (typeof volume == 'undefined' ? 0.50 : volume);
		soundEffect.play();
	}
  
	notification.onclick = function() {
		window.open('https://gaming.youtube.com/ice_poseidon/live')
	}
};

var checkIfLive = function() {
	
	$.get('http://107.170.95.160/live', function(data) {
		if (data['status'] === true) {
			if (JSON.parse(localStorage.isLive) === false) {
				showNotification();
				localStorage.isLive = true;
			}
		} else {
			localStorage.isLive = false;
		}
	});
}

if (window.Notification) {
	setInterval(function() {
		checkIfLive();
	}, 60000 * 2);
};

if(!localStorage.isLive) localStorage.isLive = false;
if(!localStorage.isActivated) localStorage.isActivated = true;
if(!localStorage.notificationSoundEnabled) localStorage.notificationSoundEnabled = true;
if(!localStorage.notificationVolume) localStorage.notificationVolume = 50;
if(!localStorage.showRecentTweet) localStorage.showRecentTweet = true;

checkIfLive();

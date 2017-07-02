const INTERVAL = 1000 * 30, // 30 second interval
      DEFAULT_ICON_PATH = './icons/128.png',
      LIVE_ICON_PATH = './icons/128-green.png',
      SOUND_EFFECT = new Audio('sounds/online.mp3');

let subscriptions = {};

const getSubscriptions = function() {
    $.get('https://www.iceposeidon.com/api/v1/subscriptions', function(response) {
        subscriptions = response['subscriptions'];
    });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request === 'requestSubscriptions') {
        sendResponse(subscriptions);
    }

    if (request === 'requestLocalstorage') {
        let data = {};

        for (let i = 0, len = localStorage.length; i < len; i++) {

            let item = localStorage.getItem(localStorage.key(i));

            if (item === 'true') item = true;
            if (item === 'false') item = false;

            data[localStorage.key(i)] = item;
        }

        getSubscriptions();

        data['subscriptions'] = subscriptions;

        sendResponse(data);
    }
});

chrome.notifications.onClicked.addListener(function(notificationId) {
 	if(notificationId === 'liveNotification') {
        chrome.tabs.create({ url: 'http://www.iceposeidon.com/' });
        chrome.notifications.clear(notificationId);
    }
});

const showNotification = function() {

    const time = /(..)(:..)/.exec(new Date());
    const hour = time[1] % 12 || 12;
    const period = time[1] < 12 ? 'AM' : 'PM';

    if (JSON.parse(localStorage.isActivated) === true) {

        chrome.notifications.create('liveNotification', {
 			type: 'basic',
 			title: 'Live! (' + hour + time[2] + ' ' + period + ')',
 			message: 'Ice Poseidon has started streaming.',
 			contextMessage: 'Ice Poseidon TV',
 			iconUrl: LIVE_ICON_PATH
  		});
    }

    if (JSON.parse(localStorage.notificationSoundEnabled) === true) {

        if (localStorage.getItem('audio') === null) {

            const volume = (localStorage.notificationVolume / 100);

            SOUND_EFFECT.volume = (typeof volume === 'undefined' ? 0.50 : volume);
            SOUND_EFFECT.play();

        } else {

            const encodedAudio = localStorage.getItem('audio');
            const arrayBuffer = base64ToArrayBuffer(encodedAudio);

            createSoundWithBuffer(arrayBuffer);
        }
    }
};

const updateIcon = function () {

    const isLive = JSON.parse(localStorage.isLive) === true;

    const iconPath = isLive ? LIVE_ICON_PATH : DEFAULT_ICON_PATH;

    chrome.browserAction.setIcon({
        path: iconPath
    });
};

const checkIfLive = function () {

    $.get('http://107.170.95.160/live', function (data) {
        if (data['status'] === true) {
            if (JSON.parse(localStorage.isLive) === false) {
                showNotification();
                localStorage.isLive = true;
            }
        } else {
            localStorage.isLive = false;
        }

        updateIcon();
    });
};

if (window.Notification) {
    setInterval(function () {
        checkIfLive();
    }, INTERVAL);
}

if (!localStorage.isLive) localStorage.isLive = false;
if (!localStorage.isActivated) localStorage.isActivated = true;
if (!localStorage.notificationSoundEnabled) localStorage.notificationSoundEnabled = true;
if (!localStorage.notificationVolume) localStorage.notificationVolume = 40;
if (!localStorage.showRecentTweet) localStorage.showRecentTweet = true;
if (!localStorage.emotesTwitch) localStorage.emotesTwitch = true;
if (!localStorage.emotesBTTV) localStorage.emotesBTTV = true;
if (!localStorage.emotesSub) localStorage.emotesSub = true;
if (!localStorage.emotesIce) localStorage.emotesIce = true;
if (!localStorage.BTTVChannels) localStorage.BTTVChannels = 'monkasen, graphistrs, trihex, reckful, b0aty, NightDev';
if (!localStorage.disableAvatars) localStorage.disableAvatars = true;
if (!localStorage.enableChatColors) localStorage.enableChatColors = true;
if (!localStorage.redirectToYTGaming) localStorage.redirectToYTGaming = true;
if (!localStorage.enableSplitChat) localStorage.enableSplitChat = false;
if (!localStorage.showDeletedMessages) localStorage.showDeletedMessages = false;
if (!localStorage.mentionHighlight) localStorage.mentionHighlight = true;

if (localStorage.BTTVChannels) {
    localStorage.BTTVChannels = localStorage.BTTVChannels.replace('MonkaSenpai', 'monkasen');
    localStorage.BTTVChannels = localStorage.BTTVChannels.replace('Ice_Poseidon, ', '');
    localStorage.BTTVChannels = localStorage.BTTVChannels.replace('Ice_Poseidon', '');
}

checkIfLive();
getSubscriptions();

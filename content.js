console.log('@Content Script Init');

var disallowedSymbols = ["'", '"', '?', '!', '#', '\\', ':', '/', '&'];
var emotes = {};

+function addObserverIfDesiredNodeAvailable() {
	
    var target = document.querySelector('.style-scope .yt-live-chat-item-list-renderer');
	var chatMessageSelector = 'style-scope yt-live-chat-item-list-renderer x-scope yt-live-chat-text-message-renderer-0';
	
    if(!target) {
        window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
        return;
    }
	
    var options = {
		subtree: true,
		childList: true,
		attributes: false,
		characterData: false
	};

    var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.type === 'childList') {

				if (typeof mutation.addedNodes[0] == 'undefined') {
					return;
				}
				
				if (mutation.addedNodes[0].className == chatMessageSelector) {
                    replaceOldMessages();
					emoteCheck(mutation.addedNodes[0]);
				}
			}
		});
	});
	
	observer.observe(target, options);
}();

var getGlobalEmotes = +function() {
	
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//twitchemotes.com/api_cache/v2/global.json');
    xhr.send();
    var url_template = "//static-cdn.jtvnw.net/emoticons/v1/";

    xhr.onload = function() {
        emote_d = JSON.parse(xhr.responseText)['emotes'];
        for (var emote in emote_d) {
            emotes[emote] = {
				url: url_template + emote_d[emote]['image_id'] + '/' + '1.0'
            };
        }
		
		console.log(emotes);
    }
}();

var emoteCheck = function(node) {
	
	var message = node.querySelector('#message');
	var words = message.innerHTML.split(" ");
	
	for (var i = 0; i < words.length; i++) {
		replaceWithEmote(message, words[i]);
	}
}

var replaceOldMessages = function() {

	var convertedMsgs = document.getElementsByClassName('msg-converted');

    for(var i = 0; i < convertedMsgs.length; i++) {
        convertedMsgs.item(i).innerHTML = convertedMsgs.item(i).dataset.message;
    }
}

var replaceWithEmote = function(message, word) {

	if (typeof emotes[word] === 'undefined') {
		return;
	}
	
	if (word !== 'TriHard') {
		return;
	}
	
	console.log(message);
	console.log(word);

	var img = document.createElement('img');
    img.src = emotes[word]['url'];
    img.alt = word;
    img.style.display = 'inline';
    img.style.width = 'auto';
	img.style.overflow = 'hidden';
	
	console.log('img:');
	console.log(img);
	
	var innerHTML = message.innerHTML.trim();
	innerHTML = innerHTML.replace(word, img.outerHTML);
	
	message.innerHTML = innerHTML;
	message.dataset.message = innerHTML;
	message.className += ' msg-converted';
	
	console.log(message);
}
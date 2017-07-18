import Emote from './emote';
import donateButton from './overlay/donateButton';
import sponsorButton from './overlay/sponsorButton';
import colorButton from './overlay/colorButton';
import checkIfWatchingLive from './overlay/checkIfWatchingLive';
import AlwaysScrollDown from './overlay/alwaysScrollDown';
import SponsorCheck from './overlay/sponsorCheck';

export default class PageCheck
{
    /**
     * Checks if user is watching from wrong livestream page and warns them.
     * @static
     */
    static youtubeGaming()
    {
        // Run checks in steps so we're not calling methods unnecessarily
        const url = document.location.href;
        
        if(!url.includes('gaming.youtube')){
            const iframe = document.getElementById('live-chat-iframe');
            
            if(iframe){
                const $textWrapper = $('.yt-user-info');
                const text = $textWrapper.find('a').text();
                
                if(text === 'Ice Poseidon'){
                    const redirectConfirm = confirm('[Ice PoseidonTV] Go to the official Ice Poseidon livestream page?');

                    if (redirectConfirm === true) {
                        window.location = 'https://gaming.youtube.com/ice_poseidon/live';
                    }
                }
            }
        }
    };

    /**
     * Checks if user is watching a livestream on Youtube gaming.
     * @static
     */
    static livestreamPage()
    {
        // Run checks in steps so we're not calling methods unnecessarily
        const url = document.location.href;
        const target = document.getElementById('owner');
        const text = $(target).find('span').text();
        
        if(!url.includes('live_chat') && !url.includes('is_popout=1')){
            const chat = document.getElementById('chat');
            
            if(!target || !chat){
                PageCheck.streampageChecks++;

                if (PageCheck.streampageChecks < 5)
                    setTimeout(PageCheck.livestreamPage, 1000);

                return false;
            }
        }
		
        if(text === 'Ice Poseidon') {
            donateButton();
            sponsorButton();
            colorButton();
            setTimeout(SponsorCheck.check, 2500);
        }

        Emote.loadEmotes();
        AlwaysScrollDown.init();
        checkIfWatchingLive();

        PageCheck.streampageChecks = 0;
    };

    /**
     * Check if user is watching a livestream.
     * @static
     */
    static isLivestream() {
        const liveButton = document.querySelector('.ytp-live-badge.ytp-button');
        const chatApp    = document.querySelector('yt-live-chat-app');
        const chatiFrame = document.querySelector('#live-chat-iframe');
        const chatHeader = document.querySelector('.yt-live-chat-header-renderer');

        // Thanks StackOverflow! https://stackoverflow.com/questions/3420004/access-parent-url-from-iframe
        var url = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;


        var urlCheck = (url.indexOf('iceposeidon.com') > -1);
        var liveButtonCheck = (document.body.contains(liveButton) && !liveButton.getAttribute('disabled'));
        var chatCheck = (document.body.contains(chatApp) || document.body.contains(chatiFrame) || document.body.contains(chatHeader));

        console.debug("URL CHECK:", urlCheck, url);
        console.debug("LIVE BUTTON CHECK:", liveButtonCheck);
        console.debug("CHAT EXISTS CHECK:", chatCheck);

        if (urlCheck || liveButtonCheck || chatCheck) {
            console.debug("IS LIVESTREAM!");
            return true;
        } else {
            console.debug("IS NOT LIVESTREAM");
            return false;
        }
    }

    /**
     * Check if user is watching an Ice Poseidon livestream.
     * @static
     */
    static isIcePoseidonStream() {
        // Thanks StackOverflow! https://stackoverflow.com/questions/3420004/access-parent-url-from-iframe
        var url = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;
        var YTGchannel = $("ytg-owner-badges").parent().attr('href');
        var YTchannel  = $("a.ytd-video-owner-renderer").attr('href');

        var whitelistedChannels = [
            "/channel/UCv9Edl_WbtbPeURPtFDo-uA", // Ice Poseidon
            "/channel/UCpxAv8i0MTPoci7I7aFNxZg", // George Allen
            "/channel/UCaDJ_DTz3kbneMWiV31YiFA", // Ansien 12 / andries_dev
            "/channel/UCTmrHQEEFDYPy51mUg0JpjA", // xByt3z
            "/channel/UC1EzZOW1tVEK2vjmbSo137A"  // xByt3z IPTV testing stream
        ];

        var urlCheck = (url.indexOf('iceposeidon.com') > -1 || url.indexOf('live_chat') > -1);
        var channelCheck = (whitelistedChannels.indexOf(YTGchannel) > -1 || whitelistedChannels.indexOf(YTchannel) > -1);

        console.debug("URL CHECK:", urlCheck, url);
        console.debug("CHANNEL CHECK:", channelCheck, YTGchannel, YTchannel);

        if (urlCheck || channelCheck) {
            console.debug("IS ICEPOSEIDON STREAM!");
            return true;
        } else {
            console.debug("IS NOT ICEPOSEIDON STREAM!");
            return false;
        }
    }
};

PageCheck.streampageChecks = 0;

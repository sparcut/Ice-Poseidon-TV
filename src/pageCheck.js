import Emote from './emote';
import donateButton from './overlay/donateButton';
import checkIfWatchingLive from './overlay/checkIfWatchingLive';
import AlwaysScrollDown from './overlay/alwaysScrollDown';

export default class PageCheck
{
    static youtubeGaming()
    {
        const iframe = document.getElementById('live-chat-iframe');

        const $textWrapper = $('.yt-user-info');
        const text = $textWrapper.find('a').text();

        var url = document.location.href;

        if (text == 'Ice Poseidon' && !url.includes('gaming.youtube') && iframe) {

            const redirectConfirm = confirm('[Ice PoseidonTV] Go to the official Ice Poseidon livestream page?');

            if (redirectConfirm === true) {
                window.location = 'https://gaming.youtube.com/ice_poseidon/live';
            }
        }
    };

    static livestreamPage()
    {
        var target = document.getElementById('owner');
        var chat = document.getElementById('chat');
        var text = $(target).find('span').text();

        var url = document.location.href;

        if ((!target || !chat) && (!url.includes('live_chat') && !url.includes('is_popout=1'))) {

            PageCheck.streampageChecks++;

            if (PageCheck.streampageChecks < 25) {
                setTimeout(PageCheck.livestreamPage, 250);
            }

            return;
        }

        // Temp fix to prevent ram from filling up with messages.
        setInterval(function () {
            messages = {};
        }, 1000 * 60 * 5);

        if(text == 'Ice Poseidon') donateButton();

        Emote.loadEmotes();
        AlwaysScrollDown.init();
        checkIfWatchingLive();
    }
};

PageCheck.streampageChecks = 0;

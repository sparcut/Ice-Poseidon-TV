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
        const text = $(target).find('span').text();
        
        if(!url.includes('live_chat') && !url.includes('is_popout=1')){
            const target = document.getElementById('owner');
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
};

PageCheck.streampageChecks = 0;

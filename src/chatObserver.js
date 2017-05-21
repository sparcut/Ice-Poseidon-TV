import Emote from './emote';
import MentionHighlight from './mentionHighlight';

export default function chatObserver()
{
    var target = document.querySelector('.style-scope .yt-live-chat-item-list-renderer');
    var authorname = $('#author #author-name').text().toLowerCase();

    if (!target) {
        setTimeout(chatObserver, 250);
        return;
    }

    var observer = new MutationObserver(function (mutations) {

        mutations.forEach(function (mutation) {
            var newNodes = mutation.addedNodes;

            if (newNodes !== null) {
                var $nodes = $(newNodes);

                $nodes.each(function () {

                    var $node = $(this);

                    if (!$node.hasClass('yt-live-chat-item-list-renderer')) {
                        return;
                    }

                    MentionHighlight($node);
                    Emote.emoteCheck($node);
                });
            }
        });
    });

    var options = {
        characterData: false,
        attributes: false,
        childList: true,
        subtree: true
    };

    observer.observe(target, options);
};

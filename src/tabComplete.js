import Emote from './emote';


export default class TabComplete
{
    /**
    Recursively adds to valuesArray possible emotes from localTrie
    */
    static getPossibleValues(localTrie, valuesArray) {
        if (typeof localTrie === 'string') {
            valuesArray.push(localTrie);
        } else {
            let keys = Object.keys(localTrie);
            let returnValues = [];
            for (let i = 0; i < keys.length; i++) {
                TabComplete.getPossibleValues(localTrie[keys[i]], valuesArray);
            }
        }
    }

    /**
    Searches Emote.trie for all emotes starting with s. If it finds multiple values, returns pos (index) value
    */
    static findSimilar(s, pos) {
        s = s.toLowerCase();
        let i = 0;
        let localTrie = Emote.trie;
        while ((i < s.length) && (s.charAt(i) in localTrie)) {
            localTrie = localTrie[s.charAt(i)];
            i++;
        }
        if (i == 0) return false;
        else {
            let values = [];
            TabComplete.getPossibleValues(localTrie, values);
            if (pos >= values.length) {
                return false;
            } else {
                return values[pos];
            }
        }
    }

    static bindEvent() {
        $("yt-live-chat-text-input-field-renderer").on('keydown', "div#input", function(e) {
            let keyCode = e.keyCode || e.which;
            if (keyCode == 9) {
                e.preventDefault();
                let currentText = $(this).text();
                if(/\s$/.test(currentText)){ //last char is whitespace - so dont treat it as a word. split function doesnt actually split eg "TriHard " into "TriHard" and "" but returns "TriHard "
                    return;
                }
                let words = currentText.split(' ');
                if (TabComplete.lastWord.length) { //word typed by used has been already replaced by some suggestion -> remove that suggestion (is going to get replaced by new suggestion or lastWord)
                    words.pop();
                } else {
                    TabComplete.lastWord = words.pop();
                }
                let similar = TabComplete.findSimilar(TabComplete.lastWord, TabComplete.tabPressedCount);
                let newText = '';
                for (let i = 0; i < words.length; i++) {
                    newText += words[i] + ' ';
                }
                if (similar) {
                    newText += similar;
                    TabComplete.tabPressedCount++;
                } else {
                    newText += TabComplete.lastWord;
                    TabComplete.lastWord = '';
                    TabComplete.tabPressedCount = 0;
                }
                $(this).text(newText);
                //adds focus to last char
                let range = document.createRange();
                range.selectNodeContents($(this)[0]);
                range.collapse(false);
                let sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);

                //updates character count
                this.dispatchEvent(TabComplete.inputChangedEvent);
            } else {
                TabComplete.tabPressedCount = 0;
                TabComplete.lastWord = '';
            }
        });
    }

};

TabComplete.inputChangedEvent = new Event('input', {
    'bubbles': true,
    'cancelable': true
});
TabComplete.tabPressedCount = 0;
TabComplete.lastWord = '';

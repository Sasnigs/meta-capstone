export function removePunctuation(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        let character = str.charAt(i);
        if (!checkPunctuation(character)) {
            result += character;
        }
    }
    return result;
}

function checkPunctuation(char) {
    const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    // todo: implement set for punctuations for fast lookups and also account for more ascii chars.
    return punctuation.includes(char);
}


export function removePunctuation(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    let character = str.charAt(i);
    if (character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122) {
      result += character;
    }
  }
  return result;
}


export function removePunctuation(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    let character = str.charAt(i);
    let charCode = character.charCodeAt(0);
    if (
      (charCode >= 65 && charCode <= 90) ||    // A–Z
      (charCode >= 97 && charCode <= 122) ||   // a–z
      charCode === 32                          // space
    ) {
      result += character;
    }
  }
  return result;
}

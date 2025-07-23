export function removePunctuation(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    let character = str.charAt(i);
    if (
      (character >= 'A' && character <= 'Z') ||   
      (character >= 'a' && character <= 'z') ||   
      character === ' '                   
    ) {
      result += character;
    }
  }
  return result;
}

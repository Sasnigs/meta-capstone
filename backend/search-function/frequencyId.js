export default function frequencyId(words, wordMap, commentIdSet) {
  const setMap = {};
  for (const id of commentIdSet) {
    let count = 0;
    for (const word of words) {
      const matches = wordMap[word] || [];
      if (matches.includes(id)) {
        count++;
      }
    }
    setMap[id] = count;
  }
  return setMap;
}

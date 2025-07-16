export default function uniqueId(words, wordMap){
     const commentIdSet = new Set();
     for (const word of words) {
      const matches = wordMap[word] || [];
      for (const id of matches) {
        commentIdSet.add(id);
      }
    }
    return commentIdSet
}
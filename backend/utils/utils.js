import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function fetchCommentAndSort(commentIdArray) {
  // for each instance of the converted object to array we get partial details of the comment by querying the DB.
  // each result is then used to populate our new array and order is maintained.

  const finalResult = []; 
  for (let i = 0; i < commentIdArray.length; i++) {
    const comment = commentIdArray[i];
    const frequency = comment[1]; // Get the frequency count

    const results = await prisma.comment.findUnique({
      where: {
        id: comment[0],
      },
      select: {
        id: true,
        message: true,
        movieId: true,
        upVotes: true,
      },
    });
    // Add the frequency count to the result
    finalResult.push({ ...results, frequency });
  }
  return finalResult.sort((a, b) => {
    if (b.frequency !== a.frequency) {
      return b.frequency - a.frequency;
    }
    return b.upVotes - a.upVotes;
  });
}

export function createCommentIDsFrequency(words, wordMap, commentIdSet) {
  const commentIdMap = {};
  for (const id of commentIdSet) {
    let count = 0;
    for (const word of words) {
      const matches = wordMap[word] || [];
      if (matches.includes(id)) {
        count++;
      }
    }
    commentIdMap[id] = count;
  }
  return commentIdMap;
}

export function getUniqueCommentIDs(words, wordMap){
     const commentIdSet = new Set();
     for (const word of words) {
      const matches = wordMap[word] || [];
      for (const id of matches) {
        commentIdSet.add(id);
      }
    }
    return commentIdSet
}


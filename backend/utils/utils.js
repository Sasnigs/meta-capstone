import { PrismaClient } from "@prisma/client";
import { OMBD_BASE_URL } from "../../frontend/src/data/baseUrls.js";
import dotenv from "dotenv";
const prisma = new PrismaClient();
const API_KEY = process.env.VITE_OMBD_API_KEY;
dotenv.config();

export async function getMovieTtileById(movieId) {
  const res = await fetch(`${OMBD_BASE_URL}?apikey=${API_KEY}&i=${movieId}`);
  const data = await res.json();
  const movieTitle = data.Title;
  return movieTitle;
}
export async function fetchComment(commentIdArray) {
  // for each instance of the converted object to array we get partial details of the comment by querying the DB.
  // each result is then used to populate our new array and order is maintained.

  const finalResult = [];
  for (let i = 0; i < commentIdArray.length; i++) {
    const commentId = commentIdArray[i];
    const frequency = commentId[1]; // Get the frequency count

    const results = await prisma.comment.findUnique({
      where: {
        id: commentId[0],
      },
      select: {
        id: true,
        message: true,
        movieId: true,
        upVotes: true,
        createdAt: true,
      },
    });
    const movieTitle = await getMovieTtileById(results.movieId);
    // Add the frequency count to the result
    finalResult.push({ ...results, frequency, movieTitle });
  }
  return sortDatabaseResult(finalResult);
}

export function sortDatabaseResult(array) {
  return array.sort((a, b) => {
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

export function getUniqueCommentIDs(words, wordMap) {
  const commentIdSet = new Set();
  for (const word of words) {
    const matches = wordMap[word] || [];
    for (const id of matches) {
      commentIdSet.add(id);
    }
  }
  return commentIdSet;
}

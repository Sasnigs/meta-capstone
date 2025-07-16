import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function fetchCommentAndSort(emptyArray, entrieSetMap) {
  // for each instance of the converted object to array we get partial details of the comment by querying the DB.
  // each result is then used to populate our new array and order is maintained.
  for (let i = 0; i < entrieSetMap.length; i++) {
    const comment = entrieSetMap[i];
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
    emptyArray.push({ ...results, frequency });
  }
  return emptyArray.sort((a, b) => {
    if (b.frequency !== a.frequency) {
      return b.frequency - a.frequency;
    }
    return b.upVotes - a.upVotes;
  });
}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function populateWordMap(wordMap) {
  try {
    const allWords = await prisma.word.findMany();

    for (const entry of allWords) {
      wordMap[entry.word] = [...entry.commentIds];
    }
  } catch (error) {
   console.error("Error populating Hashmap", error);
  }
}
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";
import { getUserData } from "./auth-function/getUserData.js";
import session from "express-session";
import { sortComment } from "./sort-function/sortComment.js";
import { populateWordMap } from "./populate-hashmap/populateWordMap.js";
import { removePunctuation } from "./clean-string/cleanString.js";
import { stopWords } from "./stop-words/stopWords.js";
import {
  fetchComment,
  getUniqueCommentIDs,
  createCommentIDsFrequency,
} from "./utils/utils.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const saltRounds = 10;
const PORT = process.env.PORT || 4500;
const BASE_URL = "http://localhost:4500";
const isProduction = process.env.NODE_ENV === "production";
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://meta-capstone-frontend.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
const wordMap = {};

const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
};

// Google Auth
app.post("/", async (req, res) => {
  try {
    const redirectUrl = `${BASE_URL}/auth/google/callback`;
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    );
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope:
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
      promp: "consent",
    });
    res.status(HttpStatus.CREATED).json({ url: authorizeUrl });
  } catch (error) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Error generating url" });
  }
});

app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const redirectUrl = `${BASE_URL}/auth/google/callback`;
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    );
    const response = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(response.tokens);
    const user = oAuth2Client.credentials;
    const profile = await getUserData(user.access_token);
    res.status(HttpStatus.OK).json(profile);
  } catch (error) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Error fetching user details" });
  }
});

// Sign up route using Bcrypt

app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    // check if user already exist by checking email & username
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (existingUser) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Email or username already exist" });
    }
    // hash user password for security reason
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create the user/profile using nest creation
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    req.session.userId = newUser.id;
    res
      .status(HttpStatus.CREATED)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Sign up failed" });
  }
});

// login users
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // check if username exist in DB
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Invalid username or password." });
    }
    // compares password with that in DB using bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: "Invalid username or password." });
    }
    //create session
    req.session.userId = user.id;
    res.status(HttpStatus.OK).json({ message: "Login successful!" });
  } catch (error) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Sign in failed" });
  }
});

//logout users
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.status(HttpStatus.OK).json({ message: "Logged out successfully" });
  });
});

function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: "Not logged in" });
  }
}
// get all comments
app.get("/comments/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const sortType = req.query.sortType;
  const userId = req.session.userId;
  try {
    // get all comments for a movie
    const commentsArray = await prisma.comment.findMany({
      where: { movieId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    let updatedComments = commentsArray;
    // if user in session get all votes that matches the commentId from the comments above
    if (userId) {
      const userVotes = await prisma.vote.findMany({
        where: {
          userId,
          commentId: { in: commentsArray.map((comment) => comment.id) },
        },
      });
      // update each comment by adding userVote props if a commentId from userVotes array matches id in comments Array if no match give a null value
      updatedComments = commentsArray.map((comment) => {
        const userVote = userVotes.find(
          (vote) => vote.commentId === comment.id
        );
        return {
          ...comment,
          userVote: userVote ? userVote.isUpvote : null,
        };
      });
    }
    const modifiedComments = sortType
      ? sortComment(updatedComments, sortType)
      : updatedComments;
    res.status(HttpStatus.OK).json(modifiedComments);
  } catch (error) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to fetch comments" });
  }
});
// increment upvote
app.patch("/comments/:commentId/upvote", isAuthenticated, async (req, res) => {
  const { commentId } = req.params;
  const userId = req.session.userId;
  try {
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_commentId: { userId, commentId },
      },
    });

    if (!existingVote) {
      await prisma.vote.create({
        data: { userId, commentId, isUpvote: true },
      });
    } else if (existingVote.isUpvote) {
      await prisma.vote.delete({
        where: { userId_commentId: { userId, commentId } },
      });
    } else {
      await prisma.vote.update({
        where: { userId_commentId: { userId, commentId } },
        data: { isUpvote: true },
      });
    }

    const upCount = await prisma.vote.count({
      where: { commentId, isUpvote: true },
    });
    const downCount = await prisma.vote.count({
      where: { commentId, isUpvote: false },
    });

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { upVotes: upCount, downVotes: downCount },
    });

    res.status(HttpStatus.OK).json(updatedComment);
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Upvote failed" });
  }
});

// increment downvote
app.patch(
  "/comments/:commentId/downvote",
  isAuthenticated,
  async (req, res) => {
    const { commentId } = req.params;
    const userId = req.session.userId;
    try {
      const existingVote = await prisma.vote.findUnique({
        where: {
          userId_commentId: { userId, commentId },
        },
      });

      if (!existingVote) {
        await prisma.vote.create({
          data: { userId, commentId, isUpvote: false },
        });
      } else if (!existingVote.isUpvote) {
        await prisma.vote.delete({
          where: { userId_commentId: { userId, commentId } },
        });
      } else {
        await prisma.vote.update({
          where: { userId_commentId: { userId, commentId } },
          data: { isUpvote: false },
        });
      }
      const upCount = await prisma.vote.count({
        where: { commentId, isUpvote: true },
      });
      const downCount = await prisma.vote.count({
        where: { commentId, isUpvote: false },
      });

      const updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: { upVotes: upCount, downVotes: downCount },
      });

      res.status(HttpStatus.OK).json(updatedComment);
    } catch (err) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Downvote failed" });
    }
  }
);

// post a comment
app.post("/comment", isAuthenticated, async (req, res) => {
  const { message, movieId } = req.body;
  try {
    const newComment = await prisma.comment.create({
      data: {
        message,
        movieId,
        userId: req.session.userId,
      },
    });

    // case-insensitive, split, remove punctuation and  empty strings and
    const cleanedWord = removePunctuation(message);
    const words = cleanedWord
      .toLowerCase()
      .split(" ")
      .filter((word) => word && !stopWords.has(word));

    // get unique words
    const uniqueWords = new Set(words);

    // Loop through each word and update both DB + in-memory
    for (const word of uniqueWords) {
      // Update Word table
      const existing = await prisma.word.findUnique({ where: { word } });

      if (existing) {
        await prisma.word.update({
          where: { word },
          data: {
            commentIds: { push: newComment.id },
          },
        });
      } else {
        await prisma.word.create({
          data: {
            word,
            commentIds: [newComment.id],
          },
        });
      }
      // Update in-memory hashmap
      if (!wordMap[word]) {
        wordMap[word] = [newComment.id];
      } else {
        wordMap[word].push(newComment.id);
      }
    }
    res.status(HttpStatus.OK).json(newComment);
  } catch (error) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to create comment" });
  }
});

app.get("/search", async (req, res) => {
  try {
    const { phrase } = req.query;
    // case-insensitive, split, remove punctuation and  empty strings
    const cleanedPhrase = removePunctuation(phrase);
    const words = cleanedPhrase.toLowerCase().split(" ").filter(Boolean);
    if (words.length === 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "No valid words found in phrase." });
    }
    // Collect matching commentId
    const commentIdSet = getUniqueCommentIDs(words, wordMap);

    // object to store commentId occurence in the array of commentId
    const commentIdMap = createCommentIDsFrequency(
      words,
      wordMap,
      commentIdSet
    );

    // convert object to array to maintain order after sorting
    const commentIdArray = Object.entries(commentIdMap);
    commentIdArray.sort((a, b) => b[1] - a[1]);
    const result = await fetchComment(commentIdArray);

    res.status(HttpStatus.OK).json(result);
  } catch (error) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error with fetching comment" });
  }
});
// check for and get user info upon sign up/ login
app.get("/me", (req, res) => {
  if (req.session.userId) {
    res.status(HttpStatus.OK).json({
      userId: req.session.userId,
    });
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: "Not logged in" });
  }
});

await populateWordMap(wordMap);
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));

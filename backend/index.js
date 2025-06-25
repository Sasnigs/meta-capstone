import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";
import { getUserData } from "./auth-function/getUserData.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient()
const saltRounds = 10
const PORT = process.env.PORT || 4500;
app.use(cors());
app.use(express.json());

// Google Auth
app.post("/", async (req, res) => {
  try {
    const redirectUrl = "http://localhost:4500/auth/google/callback";
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
    res.status(200).json({ url: authorizeUrl });
  } catch (error) {
    res.status(400).json({ message: "Error generating url" });
  }
});

app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const redirectUrl = "http://localhost:4500/auth/google/callback";
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    );
    const response = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(response.tokens);
    const user = oAuth2Client.credentials;
    const profile = await getUserData(user.access_token);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: "Error fetching user details" });
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
        .status(400)
        .json({ message: "Email or username already exist" });
    }
    // hash user password for security reason
    const hashedPassword = await bcrypt.hash(password,saltRounds);

    // create the user/profile using nest creation
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({message: "Sign up failed"})
  }
});

app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));

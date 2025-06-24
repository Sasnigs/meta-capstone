import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4500;
app.use(cors());
app.use(express.json());

async function getUserData(access_token) {
  try {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer${access_token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error fetching user info ", error);
  }
}

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
      scope: "https://www.googleapis.com/auth/userinfo.profile openid",
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

app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));

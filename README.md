# meta-capstone

# 🎬 ReelTalk — Movie Discussion Forum

## Overview

**Category:** Discussion Forum

**Story:** ReelTalk is a platform for users to discuss movies they’ve watched or plan to watch. Users can search for movies, read what others think, or leave their own thoughts through comments.

**Market:** Designed for movie lovers who want to share or explore opinions before watching.

**Habit:** Can be used daily as new movies and comments are added regularly.

**Scope:** Focused on text-only comments for movies available through the OMDb API.

---

##  Product Specification

### Core Features

* **Authentication:** Users can sign up, log in, and log out securely.
* **Search Toggle:** Search bar with toggle to search **movies** or **comments**.
* **Movie Search Results:** Show movie cards matching search terms.
* **Comment Search Results:** Return a ranked list of comments matching words or phrases, sorted by relevance and upvotes.
* **Movie Detail Page:**

  * Shows poster, synopsis, rating, and metadata (release year, genre, actors/director).
  * Includes a comment section where users can view, post, and vote on comments.
* **Comment Interactions:**

  * Each comment displays username, message, and upvote/downvote buttons.
  * Sorting options: Most Loved, Least Hated, Most Recent, User Tenure, Net Useful, Controversial, and Trending.

---

## ✅ User Stories (MVP)

* ✅ User can **create an account**
* ✅ User can **log in**
* ✅ User can **log out**
* ✅ User can **search for movies**
* ✅ User can **add comments** for a specific movie
* ✅ User can **see other users' comments**
* ✅ Each comment displays **username**, **text**, and **vote buttons**
* ✅ User can **upvote/downvote comments**
* ✅ **One vote per user per comment** (TC1)
* ✅ User can **sort comments** by:

  * Most Loved
  * Least Hated
  * Most Recent
  * User Tenure
  * Net Useful (Wilson Score)
* ✅ User can **search for comments** by:

  * Exact phrase
  * Single word
  * Partial match (TC2)
* ✅ **Clicking a comment search result scrolls to the exact comment**
* ✅ User **passwords are encrypted** using bcrypt for security

---

## Technical Challenges

### TC1 — Voting System & Comment Sorting

* Implemented a one-vote-per-user system using a dedicated `Vote` table.
* Backend comment sorting uses OOP inheritance (`CommentSorter` classes) to support extendable and clean logic (e.g., `MostLoved`, `Controversial`, `Trending`).
* Wilson Score used for Net Useful ranking to balance quality and confidence.

### TC2 — Optimized Comment Search Engine

* Built a custom search system using an in-memory `wordMap` and persistent `Word` table.
* Search phrase is tokenized, cleaned, and mapped to comment IDs using preprocessed word-to-comment index.
* Final implementation avoids full DB scans and scales efficiently as comment volume grows.

---

## Security

* Passwords are hashed using `bcrypt` before storage.
* Sessions managed securely with cookie settings (`SameSite`, `Secure`, and `trust proxy` in production).

---

## APIs Used

* [OMDb API](https://www.omdbapi.com/) — for movie metadata (poster, rating, genre, etc.)


##  Deployment

You can view the live version of this app here:
👉 **[ReelTalk](https://meta-capstone-frontend.onrender.com)**




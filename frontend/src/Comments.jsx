import { useState, useEffect } from "react";
import CommentBoard from "./CommentBoard";
import { BASE_URL } from "./data/baseUrls";
import SortBar from "./SortBar";
import "./Comments.css";

export default function Comments({ id, highlightCommentId }) {
  const [message, setMessage] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [sortVal, setSortVal] = useState(null);
  let movieId = id;
  async function getComments() {
    try {
      const res = await fetch(
        `${BASE_URL}/comments/${movieId}?sortType=${sortVal}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setAllComments(data);
      }
    } catch (error) {
      const errorMessage = await res.json();
      console.error(errorMessage.message);
    }
  }
  useEffect(() => {
    getComments();
  }, [sortVal]);
  async function createComment(e) {
    e.preventDefault();
    const formData = { message, movieId };
    try {
      const res = await fetch(`${BASE_URL}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (res.ok) {
        setMessage("");
        getComments();
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
        console.error("Error fetching data", error);
    }
  }
  async function upVotes(id) {
    try {
      const res = await fetch(`${BASE_URL}/comments/${id}/upvote`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) {
        getComments();
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }
  async function downVotes(id) {
    try {
      const res = await fetch(`${BASE_URL}/comments/${id}/downvote`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) {
        getComments();
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  return (
    <div className="comments">
      <div className="comments-header">
        <h1>Discussions</h1>
        <form className="comment-post" onSubmit={(e) => createComment(e)}>
          <textarea
            maxLength="150"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type comment"
            required
            className="text-area"
          ></textarea>
          <button type="submit">Post</button>
        </form>
      </div>
      <SortBar setSortVal={setSortVal} />
      <div className="comments-box">
        {allComments.length !== 0 ? (
          allComments.map((commentInfo) => {
            const isHighlighted = commentInfo.id === highlightCommentId;
            return (
              <CommentBoard
                commentInfo={commentInfo}
                key={commentInfo.id}
                upVotes={upVotes}
                downVotes={downVotes}
                isHighlighted={isHighlighted}
              />
            );
          })
        ) : (
          <p className="no-comment">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

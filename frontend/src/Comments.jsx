import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { BASE_URL } from "./data/data";
import "./Comments.css";
export default function Comments({ id }) {
  const [message, setMessage] = useState("");
  const [allComments, setAllComments] = useState([]);
  let movieId = id;
  async function getComments() {
    try {
      const res = await fetch(`${BASE_URL}/comments/${movieId}`);
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
  }, []);
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

      <div className="comments-box">
        {allComments.length !== 0 ? (
          allComments.map((commentInfo) => (
            <CommentCard commentInfo={commentInfo} key={commentInfo.id} />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import "./Comments.css";
export default function Comments() {
  const [comment, setComment] = useState("");
  return (
    <div className="comments">
      <div className="comments-header">
        <h1>Discussions</h1>
        <form className="comment-post">
          <textarea
            maxLength="100"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type comment"
            required
          ></textarea>
          <button type="submit">Post</button>
        </form>
      </div>

      <div className="comments-box">
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </div>
    </div>
  );
}

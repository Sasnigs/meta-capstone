import { useState } from "react";
import CommentCard from "./CommentCard";
import "./Comments.css";
export default function Comments() {
  const [comment, setComment] = useState("");
  const [commentDetails, setCommentDetails] = useState({
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione veritatis error quisquam id facere, incidunt ex nostrum",
    username: "Meta",
    upVote: 20,
    downVote: 12,
  });

  return (
    <div className="comments">
      <div className="comments-header">
        <h1>Discussions</h1>
        <form className="comment-post">
          <textarea
            maxLength="150"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type comment"
            required
            className="text-area"
          ></textarea>
          <button type="submit">Post</button>
        </form>
      </div>

      <div className="comments-box">
        <CommentCard commentDetails={commentDetails} />
      </div>
    </div>
  );
}

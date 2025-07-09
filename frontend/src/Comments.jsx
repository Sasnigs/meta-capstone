import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { BASE_URL } from "./data/data";
import { GiDiamondsSmile } from "react-icons/gi";
import { AiFillDislike } from "react-icons/ai";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa6";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import "./Comments.css";
export default function Comments({ id }) {
  const [message, setMessage] = useState("");
  const [allComments, setAllComments] = useState([]);
  let movieId = id;
  async function getComments() {
    try {
      const res = await fetch(`${BASE_URL}/comments/${movieId}`, {
        method: "GET",
        credentials: "include",
      });
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
      // TODO
    } catch (error) {}
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
      // TODO
    } catch (error) {}
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
      // TODO
    } catch (error) {}
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

      <div className="sort-bar">
        <div className="sort-type">
          <GiDiamondsSmile />
          <span>Most upvoted</span>
        </div>

        <div className="sort-type">
          <AiFillDislike />
          <span>Least hated</span>
        </div>

        <div className="sort-type">
          <MdOutlineAccessTimeFilled />
          <span>Most recent</span>
        </div>
        <div className="sort-type">
          <FaHourglassHalf />
          <span>User tenure</span>
        </div>
        <div className="sort-type">
          <BsFillBookmarkCheckFill />
          <span>Net useful</span>
        </div>
      </div>
      <div className="comments-box">
        {allComments.length !== 0 ? (
          allComments.map((commentInfo) => (
            <CommentCard
              commentInfo={commentInfo}
              key={commentInfo.id}
              upVotes={upVotes}
              downVotes={downVotes}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}

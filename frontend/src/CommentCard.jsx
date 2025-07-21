import "./CommentCard.css";
import { useEffect, useRef } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

export default function CommentCard({ commentInfo, upVotes, downVotes, isHighlighted }) {
  const isUpVote = commentInfo.userVote === true;
  const isDownVote = commentInfo.userVote === false;
  const commentRef = useRef(null);

  useEffect(() => {
    if (isHighlighted && commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div ref={commentRef}>
      <div className={`comment-cont ${isHighlighted ? "highlighted-comment" : ""}`}>
        <div className="user-area">
          <div className="tooltip-wrapper">
            <span className="username">@{commentInfo.user.username}</span>
            <div className="tooltip">
              <p>
                <strong>Username:</strong> {commentInfo.user.username}
              </p>
              <p>
                <strong>Joined: </strong>
                {new Date(commentInfo.user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </div>
          <p>{commentInfo.message}</p>
        </div>
        <div className="up-down-vote">
          <p>
            <BiUpvote
              className={isUpVote ? "voted-up" : ""}
              onClick={() => upVotes(commentInfo.id)}
            />
            {commentInfo.upVotes}
          </p>
          <p>
            <BiDownvote
              className={isDownVote ? "voted-down" : ""}
              onClick={() => downVotes(commentInfo.id)}
            />
            {commentInfo.downVotes}
          </p>
        </div>
      </div>
    </div>
  );
}

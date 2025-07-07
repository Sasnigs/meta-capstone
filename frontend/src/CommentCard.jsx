import "./CommentCard.css";
import { BiDownvote, BiUpvote } from "react-icons/bi";

export default function CommentCard({ commentInfo, upVotes, downVotes }) {
  return (
    <div>
      <div className="comment-cont">
        <div className="user-area">
          <div className="tooltip-wrapper">
            <span className="username">@{commentInfo.user.username}</span>
            <div className="tooltip">
              <p>
                <strong>Username:</strong> {commentInfo.user.username}
              </p>
              <p>
                <strong>Joined: </strong>
                {new Date(commentInfo.user.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                  }
                )}
              </p>
            </div>
          </div>
          <p>{commentInfo.message}</p>
        </div>
        <div className="up-down-vote">
          <p>
            <BiUpvote onClick={() => upVotes(commentInfo.id)} />
            {commentInfo.upVotes}
          </p>
          <p>
            <BiDownvote onClick={() => downVotes(commentInfo.id)} />
            {commentInfo.downVotes}
          </p>
        </div>
      </div>
    </div>
  );
}

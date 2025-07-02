import "./commentcard.css";

export default function CommentCard({commentDetails}) {
  return (
    <div>
      <div className="comment-cont">
        <div className="user-area">
          <div>
            <p>@{commentDetails.username}</p>
            <p>{commentDetails.text}</p>
          </div>
        </div>
        <div className="up-down-vote">
          <p>⬆{commentDetails.upVote}</p>
          <p>⬇{commentDetails.downVote}</p>
        </div>
      </div>
    </div>
  );
}

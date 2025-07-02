import "./commentcard.css";

export default function CommentCard({commentInfo}) {
  return (
    <div>
      <div className="comment-cont">
        <div className="user-area">
          <div>
            <p>@{commentInfo.user.username}</p>
            <p>{commentInfo.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import "./commentcard.css";

export default function CommentCard({ commentInfo }) {
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
      </div>
    </div>
  );
}

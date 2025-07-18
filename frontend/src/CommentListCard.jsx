import './CommentListCard.css'
export default function CommentListCard({ commentResult }) {
  return (
    <div className="comment-card">
      <div className="comment-message">{commentResult.message}</div>
      {/* TODO: FETCH DATA FROM DB TO REPLACE MOCK DATA */}
      <div className="movie-title">Movie Title</div>
      <div className="comment-match">
        <div>Words Matched: {commentResult.frequency}</div>
        <div>Posted 5 days ago</div>
      </div>
    </div>
  );
}


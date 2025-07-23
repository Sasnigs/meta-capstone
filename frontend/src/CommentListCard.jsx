import './CommentListCard.css'
import convertDate from '../utils/convertDate';
export default function CommentListCard({ commentResult }) {
  const time = convertDate(commentResult.createdAt)
  return (
    <div className="comment-card">
      <div className="comment-message">{commentResult.message}</div>
      <div className="movie-title">{commentResult.movieTitle}</div>
      <div className="comment-match">
        <div>Words Matched: {commentResult.frequency}</div>
        <div>Posted: {time.date} {time.time}</div>
      </div>
    </div>
  );
}

import CommentListCard from "./CommentListCard";
import { Link } from "react-router-dom";
import "./CommentList.css";
export default function CommentList({ commentsToShow }) {
  return (
    <div className="comment-div">
      {commentsToShow.length === 0 ? (
        <p className="no-results">No results </p> 
      ) : (
        <>
          <p className="result-count">
            Showing {commentsToShow.length} result
            {commentsToShow.length > 1 ? "s" : ""}
          </p>
          {commentsToShow.map((commentResult) => (
            <Link
              className="link-no-styles"
              to={`/movie/${commentResult.movieId}?highlight=${commentResult.id}`}
              key={commentResult.id}
            >
              <CommentListCard commentResult={commentResult} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
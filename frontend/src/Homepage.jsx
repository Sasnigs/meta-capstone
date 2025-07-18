import Search from "./Search";
import MovieList from "./Movielist";
import CommentList from "./CommentList";
import { useState } from "react";

export default function Homepage() {
  const [moviesToshow, setMoviesToShow] = useState([]);
  const [isSearchingComment, setIsSearchingComment] = useState(false); // false calls movie api/ true calls search endpoint from server
  const [commentsToShow, setCommentsToShow] = useState([]);
  return (
    <div>
      <Search
        setMoviesToShow={setMoviesToShow}
        setCommentsToShow={setCommentsToShow}
        setIsSearchingComment={setIsSearchingComment}
        isSearchingComment={isSearchingComment}
      />
      {isSearchingComment ? (
        <CommentList commentsToShow={commentsToShow} />
      ) : (
        <MovieList moviesToshow={moviesToshow} />
      )}
    </div>
  );
}

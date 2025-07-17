import Search from "./Search";
import MovieList from "./Movielist";
import CommentList from "./CommentList";
import { useState } from "react";

export default function Homepage() {
  const [moviesToshow, setMoviesToShow] = useState([]);
  const [isSearchingComment, setIsSearchingComment] = useState(false); // false calls movie api/ true calls search endpoint from server
  const [commentsToShow, setCommentsToShow] = useState([]); // TODO: State to save comments result from server
  return (
    <div>
      <Search
        setMoviesToShow={setMoviesToShow}
        setCommentsToShow={setCommentsToShow}
        setIsSearchingComment={setIsSearchingComment}
        isSearchingComment={isSearchingComment}
      />
      {isSearchingComment ? (
        // TODO
        <CommentList commentsToShow={commentsToShow} />
      ) : (
        <MovieList moviesToshow={moviesToshow} />
      )}
    </div>
  );
}

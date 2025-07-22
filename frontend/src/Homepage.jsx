import Search from "./Search";
import MovieList from "./MovieList";
import CommentList from "./CommentList";
import { useState } from "react";
import NavBar from "./NavBar";

export default function Homepage({setUser}) {
  const [moviesToshow, setMoviesToShow] = useState([]);
  const [isSearchingComment, setIsSearchingComment] = useState(false); // false calls movie api/ true calls search endpoint from server
  const [commentsToShow, setCommentsToShow] = useState([]);
  return (
    <div>
      <NavBar setUser={setUser} />
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

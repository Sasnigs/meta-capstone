import Search from "./Search";
import MovieList from "./Movielist";
import CommentList from "./CommentList";
import { useState } from "react";

export default function Homepage() {
  const [moviesToshow, setMoviesToShow] = useState([]);
  const [searchState, setSearchState] = useState(false); 
  const [commentsToshow, setCommentsToShow] = useState([]); // TODO: State to save comments result from server
  return (
    <div>
      <Search
        setMoviesToShow={setMoviesToShow}
        setCommentsToShow={setCommentsToShow}
        setSearchState={setSearchState}
        searchState={searchState}
      />
      {searchState ? (
        // TODO
        <CommentList commentsToshow={commentsToshow} />
      ) : (
        <MovieList moviesToshow={moviesToshow} />
      )}
    </div>
  );
}

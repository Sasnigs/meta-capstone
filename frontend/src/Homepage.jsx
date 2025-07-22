import Search from "./Search";
import ListMovies from "./ListMovies";
import CommentList from "./CommentList";
import { useState } from "react";
import Logout from "./Logout";

export default function Homepage({setUser}) {
  const [moviesToshow, setMoviesToShow] = useState([]);
  const [isSearchingComment, setIsSearchingComment] = useState(false); // false calls movie api/ true calls search endpoint from server
  const [commentsToShow, setCommentsToShow] = useState([]);
  return (
    <div>
      <Logout setUser={setUser} />
      <Search
        setMoviesToShow={setMoviesToShow}
        setCommentsToShow={setCommentsToShow}
        setIsSearchingComment={setIsSearchingComment}
        isSearchingComment={isSearchingComment}
      />
      {isSearchingComment ? (
        <CommentList commentsToShow={commentsToShow} />
      ) : (
        <ListMovies moviesToshow={moviesToshow} />
      )}
    </div>
  );
}

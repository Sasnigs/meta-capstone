import Search from "./Search";
import MovieList from "./Movielist";
import { useState } from "react";

export default function Homepage() {
  const [moviesToshow, setMoviesToShow] = useState([]);
  return (
    <div>
      <Search setMoviesToShow={setMoviesToShow} />
      <MovieList moviesToshow={moviesToshow} />
    </div>
  );
}

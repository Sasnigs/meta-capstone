import MovieBoard from "./MovieBoard";
import { Link } from "react-router-dom";
import "./ListMovies.css";

export default function ListMovies({ moviesToshow }) {
  return (
    <div className="movie-list-cont">
      <div className="movie-list">
        {moviesToshow.map((movie, index) => (
          <Link
            to={`/movie/${movie.imdbID}`}
            key={index}
            className="link-no-style"
          >
            <MovieBoard movie={movie} key={movie.imdbID} />
          </Link>
        ))}
      </div>
    </div>
  );
}

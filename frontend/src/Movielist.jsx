import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import "./Movielist.css";

export default function MovieList({ moviesToshow }) {
  if (!moviesToshow) {
    return <p className="no-results">Movie not found</p>;
  }
  return (
    <div className="movie-list-cont">
      <div className="movie-list">
        {moviesToshow.map((movie, index) => (
          <Link
            to={`/movie/${movie.imdbID}`}
            key={index}
            className="link-no-style"
          >
            <MovieCard movie={movie} key={movie.imdbID} />
          </Link>
        ))}
      </div>
    </div>
  );
}

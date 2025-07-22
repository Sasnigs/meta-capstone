import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import "./MovieList.css";

export default function MovieList({ moviesToshow }) {
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

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import "./MovieForum.css";
import { GetMovieById } from "../utils/OMDBUtils";

export default function MovieForum() {
  const { id } = useParams();
  const [movie, setMovie] = useState("");

  async function fetchMovie() {
    try {
      const movie = await GetMovieById(id);
      setMovie(movie);
    } catch (error) {
      console.error("Failed to fetch movie:", error);
    }
  }
  useEffect(() => {
    fetchMovie();
  }, [id]);

  return (
    <div className="movie-cont">
      <div className="movie-details">
        <img src={movie.Poster} alt={`${movie.Title}-image`} />
        <div className="movie-info">
          <h1>{movie.Title}</h1>
          <p>
            <b>Plot:</b> {movie.Plot}
          </p>
          <p>
            <b>Released:</b> {movie.Released} ||
            <span>
              <b>Runtime:</b> {movie.Runtime}
            </span>
          </p>
          <p>
            <b>Rating:</b> {movie.imdbRating}
          </p>
        </div>
      </div>
    </div>
  );
}

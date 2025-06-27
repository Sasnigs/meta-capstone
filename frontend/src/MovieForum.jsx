import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { OMBD_BASE_URL } from "./data/data";
import Comments from "./Comments";
import "./MovieForum.css";

export default function MovieForum() {
  const { id } = useParams();
  const API_KEY = import.meta.env.VITE_OMBD_API_KEY;
  const [movie, setMovie] = useState("");

  async function fetchMovie() {
    try {
      const res = await fetch(`${OMBD_BASE_URL}?apikey=${API_KEY}&i=${id}`);
      const data = await res.json();
      setMovie(data);
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

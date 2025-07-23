import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import "./MovieForum.css";
import { getMovieById } from "../utils/omdbUtils";
import { useSearchParams } from "react-router-dom";
import NavBar from "./NavBar";

export default function MovieForum({ setUser }) {
  const { id } = useParams();
  const [movie, setMovie] = useState("");
  const [searchParams] = useSearchParams();
  const highlightCommentId = searchParams.get("highlight");

  async function fetchMovie() {
    try {
      const movie = await getMovieById(id);
      setMovie(movie);
    } catch (error) {
      console.error("Failed to fetch movie:", error);
    }
  }
  useEffect(() => {
    fetchMovie();
  }, [id]);

  return (
    <div>
      <NavBar setUser={setUser} />
      <div className="movie-cont">
        <div className="movie-details">
          <img
            src={movie.Poster}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/unavailable.png";
            }}
            alt={`${movie.Title}-image`}
          />
          <div className="movie-info">
            <h1>{movie.Title}</h1>
            <p>
              <b>Plot:</b> {movie.Plot}
            </p>
            <p>
              <b>Released:</b> {movie.Released}
              <span>
                <b>Runtime:</b> {movie.Runtime}
              </span>
            </p>
          </div>
        </div>
        <Comments id={id} highlightCommentId={highlightCommentId} />
      </div>
    </div>
  );
}

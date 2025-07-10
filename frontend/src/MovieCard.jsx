import "./Moviecard.css";

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={`${movie.Title}-image`} />
      <div>
        <p>{movie.Title}</p>
        <p> <b>Released:</b> {movie.Year}</p>
      </div>
    </div>
  );
}

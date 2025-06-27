import "./MovieCard.css";

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={`${movie.Title}-image`} />
      <p>{movie.Title}</p>
      <p>Released: {movie.Year}</p>
      <p>{movie.Released}</p>
    </div>
  );
}

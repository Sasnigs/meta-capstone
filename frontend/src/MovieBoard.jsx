import "./MovieBoard.css";

export default function MovieBoard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster}
        alt={`${movie.Title}-image`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/unavailable.png";
        }}
      />
      <div>
        <p>{movie.Title}</p>
        <p>
          <b>Released:</b> {movie.Year}
        </p>
      </div>
    </div>
  );
}

import "./MovieCard.css";

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster}
        alt={`${movie.Title}-image`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://picsum.photos/200/300?grayscale";
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

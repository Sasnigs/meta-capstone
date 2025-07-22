import "./MovieBoard.css";

export default function MovieBoard({ movie }) {
  const placeholderImageUrl = "https://picsum.photos/200/300?grayscale";
  return (
    <div className="movie-card">
      <img
        src={movie.Poster}
        alt={`${movie.Title}-image`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = { placeholderImageUrl };
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

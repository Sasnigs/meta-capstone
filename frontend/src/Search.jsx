import { useState } from "react";
import "./Search.css";
import { getMoviesByTitle } from "../utils/omdbUtils.js";

export default function Search({
  setMoviesToShow,
  setCommentsToShow,
  searchState,
  setSearchState,
}) {
  const [searchValue, setSearchValue] = useState("");
  async function search(e) {
    e.preventDefault();
    try {
      const movies = await getMoviesByTitle(searchValue);
      setMoviesToShow(movies);
      setSearchValue("");
    } catch (error) {
      console.error("Error fetching movies");
    }
  }

  return (
    <div className="search-cont">
      <form className="search-form" onSubmit={(e) => search(e)}>
        <input
          value={searchValue}
          type="search"
          name="query"
          onChange={(e) => setSearchValue(e.target.value)}
          required
          placeholder={searchState ? "Search comments 💬" : "Search movies 🎬"}
        />
        <button type="submit">Search</button>
      </form>
      <div className="toggle-wrapper">
        <div className="toggle-container">
          <button
            className={`toggle-btn ${!searchState ? "active" : ""}`}
            onClick={() => setSearchState(false)}
          >
            🎬 Movies
          </button>
          <button
            className={`toggle-btn ${searchState ? "active" : ""}`}
            onClick={() => setSearchState(true)}
          >
            💬 Comments
          </button>
          <div
            className="toggle-slider"
            style={{ transform: `translateX(${searchState ? "100%" : "0%"})` }}
          />
        </div>
      </div>
    </div>
  );
}

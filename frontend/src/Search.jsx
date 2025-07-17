import { useState } from "react";
import "./Search.css";
import { getMoviesByTitle, getCommentSearch } from "../utils/omdbUtils.js";

export default function Search({
  setMoviesToShow,
  setCommentsToShow,
  isSearchingComment,
  setIsSearchingComment,
}) {
  const [searchValue, setSearchValue] = useState("");
  async function search(e) {
    e.preventDefault();
    try {
      if (!isSearchingComment) {
        const movies = await getMoviesByTitle(searchValue);
        setMoviesToShow(movies);
      } else {
        const commentSearchResult = await getCommentSearch(searchValue);
        setCommentsToShow(commentSearchResult);
      }
      setSearchValue("");
    } catch (error) {
      console.error("Error fetching search results:", error);
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
          placeholder={
            isSearchingComment ? "Search comments 💬" : "Search movies 🎬"
          }
        />
        <button type="submit">Search</button>
      </form>
      <div className="toggle-wrapper">
        <div className="toggle-container">
          <button
            className={`toggle-btn ${!isSearchingComment ? "active" : ""}`}
            onClick={() => setIsSearchingComment(false)}
          >
            🎬 Movies
          </button>
          <button
            className={`toggle-btn ${isSearchingComment ? "active" : ""}`}
            onClick={() => setIsSearchingComment(true)}
          >
            💬 Comments
          </button>
          <div
            className="toggle-slider"
            style={{
              transform: `translateX(${isSearchingComment ? "100%" : "0%"})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

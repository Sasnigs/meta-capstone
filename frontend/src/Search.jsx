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
  const [isLoadingState, isSetLoadingState] = useState(false);
  async function search(e) {
    isSetLoadingState(true);
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
    isSetLoadingState(false);
  }
  if (isLoadingState)
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  return (
    <div className="search-cont">
      <div className="search-header">
        <h1 className="search-title">Welcome to ReelTalk</h1>
        <p className="search-subtitle">
          Find movies. Read opinions. Join the discussion.
        </p>
      </div>
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

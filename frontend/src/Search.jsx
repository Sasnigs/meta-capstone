import { useState } from "react";
import "./Search.css";
import { getMoviesByTitle } from "../utils/omdbUtils.js";

export default function Search({ setMoviesToShow }) {
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
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

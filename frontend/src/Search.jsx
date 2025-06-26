import { useState } from "react";
import "./Search.css";

export default function Search({ setMoviesToShow }) {
  const [searchValue, setSearchValue] = useState("");
  const API_KEY = import.meta.env.VITE_OMBD_API_KEY;
  const OMBD_BASE_URL = "http://www.omdbapi.com/";

  async function search(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${OMBD_BASE_URL}?apikey=${API_KEY}&s=${searchValue}`
      );
      const data = await res.json();
      setMoviesToShow([data.Search]);
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

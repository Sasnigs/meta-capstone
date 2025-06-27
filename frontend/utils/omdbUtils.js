import { OMBD_BASE_URL } from "../src/data/data";
const API_KEY = import.meta.env.VITE_OMBD_API_KEY;

export async function getMovieById(movieId) {
  const res = await fetch(`${OMBD_BASE_URL}?apikey=${API_KEY}&i=${movieId}`);
  const data = await res.json();
  return data;
}

export async function getMoviesByTitle(movieTitle) {
  const res = await fetch(`${OMBD_BASE_URL}?apikey=${API_KEY}&s=${movieTitle}`);
  const data = await res.json();
  return data.Search;
}

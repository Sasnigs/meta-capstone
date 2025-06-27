import { OMBD_BASE_URL } from "../src/data/data";
const API_KEY = import.meta.env.VITE_OMBD_API_KEY;

export async function GetMovieById(id) {
  const res = await fetch(`${OMBD_BASE_URL}?apikey=${API_KEY}&i=${id}`);
  const data = await res.json();
  return data;
}

export async function GetMoviesByTitle(value) {
  const res = await fetch(`${OMBD_BASE_URL}?apikey=${API_KEY}&s=${value}`);
  const data = await res.json();
  return data.Search;
}

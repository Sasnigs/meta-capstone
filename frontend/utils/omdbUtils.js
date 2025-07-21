import { OMBD_BASE_URL } from "../src/data/baseUrls";
import { BASE_URL } from "../src/data/baseUrls";
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

export async function getCommentSearch(searchValue) {
  const res = await fetch(`${BASE_URL}/search?phrase=${searchValue}`);
  const data = await res.json();
  return data;
}

export default function convertDate(commentCreatedDate) {
  const prismaDate = new Date(commentCreatedDate);
  const formattedDate = prismaDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = prismaDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return {
    time: formattedTime,
    date: formattedDate,
  };
}

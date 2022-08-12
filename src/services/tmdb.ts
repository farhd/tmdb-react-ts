import axios from "axios";
import { Genre, Movie, MovieFull } from "../store/tmdb";

const tmdbApiBase = "https://api.themoviedb.org/3";
const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: tmdbApiBase,
  headers: {
    Authorization: `Bearer ${tmdbApiKey}`,
  },
});

type ApiFetchGenresResponse = {
  genres: Genre[];
};

export const apiFetchGenres = async () => {
  const { data } = await tmdbApi.get<ApiFetchGenresResponse>("/genre/movie/list");
  return data;
};

type ApiFetchMoviesByGenreResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export const apiFetchMoviesByGenreId = async (genreId: Genre["id"]) => {
  const { data } = await tmdbApi.get<ApiFetchMoviesByGenreResponse>("/discover/movie", {
    params: {
      with_genres: genreId,
      sort_by: "original_title.asc",
    },
  });
  return data;
};

type ApiFetchMoviesByIdResponse = MovieFull;
export const apiFetchMovieById = async (movieId: Movie["id"]) => {
  const { data } = await tmdbApi.get<ApiFetchMoviesByIdResponse>(`/movie/${movieId}`, {});
  return data;
};

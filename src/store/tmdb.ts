import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { apiFetchGenres, apiFetchMoviesByGenreId, apiFetchMovieById } from "../services/tmdb";

export const fetchGenres = createAsyncThunk("tmdb/fetchGenres", apiFetchGenres);
export const fetchMoviesByGenreId = createAsyncThunk(
  "tmdb/fetchMoviesByGenreId",
  apiFetchMoviesByGenreId,
);
export const fetchMovieById = createAsyncThunk("tmdb/fetchMovieById", apiFetchMovieById);

export type Genre = {
  id: string;
  name: string;
};

type MovieProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};
type MovieProductionCountry = {
  iso_3166_1: string;
  name: string;
};
type MovieSpokenLang = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<Genre["id"]>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieFull = Omit<Movie, "genre_ids"> & {
  belongs_to_collection: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: MovieProductionCompany[];
  production_countries: MovieProductionCountry;
  revenue: number;
  runtime: number;
  spoken_languages: MovieSpokenLang[];
  status: string;
  tagline: string;
};

type TmdbState = {
  genres: EntityState<Genre>;
  movies: EntityState<Movie>;
  selectedMovie: MovieFull | null;
};

export const genresAdapter = createEntityAdapter<Genre>();
export const moviesAdapter = createEntityAdapter<Movie>();

const initialState: TmdbState = {
  genres: genresAdapter.getInitialState(),
  movies: moviesAdapter.getInitialState(),
  selectedMovie: null,
};

const slice = createSlice({
  name: "tmdb",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchGenres.fulfilled, (state, { payload }) => {
        genresAdapter.addMany(state.genres, payload.genres);
      })
      .addCase(fetchMoviesByGenreId.fulfilled, (state, { payload }) => {
        const movies = payload?.results;
        moviesAdapter.addMany(state.movies, movies);
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.selectedMovie = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, { payload }) => {
        const movie = payload;
        state.selectedMovie = movie;
      }),
});

export default slice.reducer;

export const { selectAll: selectGenresAll, selectById: selectGenreById } = {
  ...genresAdapter.getSelectors<RootState>((state) => state.tmdb.genres),
};

export const { selectAll: selectMoviesAll, selectById: selectMovieById } = {
  ...moviesAdapter.getSelectors<RootState>((state) => state.tmdb.movies),
};

export const selectMoviesByGenreId = (state: RootState, genreId: Genre["id"] | undefined) => {
  if (!genreId) {
    return [];
  }
  const movies = selectMoviesAll(state);
  const moviesForGenre = movies.filter((movie) =>
    movie.genre_ids.map((id) => String(id)).includes(genreId),
  );
  return moviesForGenre;
};

export const selectSelectedMovie = (state: RootState) => state.tmdb.selectedMovie;

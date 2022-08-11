import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { RootState } from ".";
import { apiFetchGenres, apiFetchMoviesByGenreId } from "../services/tmdb";

export const fetchGenres = createAsyncThunk("tmdb/fetchGenres", apiFetchGenres);
export const fetchMoviesByGenreId = createAsyncThunk(
  "tmdb/fetchMoviesByGenreId",
  apiFetchMoviesByGenreId,
);

export type Genre = {
  id: string;
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

type TmdbState = {
  genres: EntityState<Genre>;
  movies: EntityState<Movie>;
};

export const genresAdapter = createEntityAdapter<Genre>();
export const moviesAdapter = createEntityAdapter<Movie>();

const initialState: TmdbState = {
  genres: genresAdapter.getInitialState(),
  movies: moviesAdapter.getInitialState(),
};

const slice = createSlice({
  name: "tmdb",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(fetchGenres.fulfilled, (state, { payload }) => {
      genresAdapter.addMany(state.genres, payload.genres);
    }),
});

export default slice.reducer;

export const { selectAll: selectGenresAll, selectById: selectGenreById } = {
  ...genresAdapter.getSelectors<RootState>((state) => state.tmdb.genres),
};

export const { selectAll: selectMoviesAll, selectById: selectMovieById } = {
  ...moviesAdapter.getSelectors<RootState>((state) => state.tmdb.movies),
};

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "../store";
import { fetchMoviesByGenreId, selectGenreById, selectMoviesByGenreId } from "../store/tmdb";
import MovieList from "../components/MovieList";

function Genre() {
  const dispatch = useAppDispatch();
  const { genreId = "" } = useParams();
  const genre = useAppSelector((state) => selectGenreById(state, genreId));
  const movies = useAppSelector((state) => selectMoviesByGenreId(state, genreId));
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    dispatch(fetchMoviesByGenreId({ genreId, page: activePage }))
      .unwrap()
      .then(({ total_pages = 0 }) => {
        setTotalPages(total_pages);
      });
  }, [dispatch, genreId, activePage, totalPages]);

  return (
    <>
      <Text>{genre?.name}</Text>

      <MovieList
        movies={movies}
        activePage={activePage}
        totalPages={totalPages}
        setPage={setPage}
      />
    </>
  );
}

export default Genre;

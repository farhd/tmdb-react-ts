import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Text, createStyles, Group, Grid, Container, Center } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "../store";
import { fetchMovieById, selectSelectedMovie } from "../store/tmdb";
import MovieProperty from "../components/MovieProperty";

const useStyles = createStyles({
  movie: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
});

function Movie() {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { movieId } = useParams();
  const movie = useAppSelector(selectSelectedMovie);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieById(Number(movieId)));
    }
  }, [dispatch, movieId]);

  return (
    <>
      {movie ? (
        <div className={classes.movie}>
          <MovieProperty name="Title" value={movie?.title} />
          <MovieProperty name="Release date" value={movie?.release_date} />
          <MovieProperty name="Description" value={movie?.overview} />
          <MovieProperty name="Vote score" value={movie?.vote_average} />
          <Text align="center">and so on...</Text>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default Movie;

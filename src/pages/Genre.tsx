import React, { useEffect } from "react";
import { Text, createStyles, SimpleGrid, Card } from "@mantine/core";
import { Link, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store";
import { fetchGenres, selectGenreById, fetchMoviesByGenreId } from "../store/tmdb";

const useStyles = createStyles({});

function Genre() {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { genreId = "" } = useParams();
  const genre = useAppSelector((state) => selectGenreById(state, genreId));

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <>
      <Text>{genre?.name}</Text>
    </>
  );
}

export default Genre;

import React, { useEffect } from "react";
import { Text } from "@mantine/core";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store";
import { fetchGenres, selectGenreById } from "../store/tmdb";

function Genre() {
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

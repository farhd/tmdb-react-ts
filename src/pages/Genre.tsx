import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Text, createStyles, SimpleGrid, Card, Anchor } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "../store";
import { fetchMoviesByGenreId, selectGenreById, selectMoviesByGenreId } from "../store/tmdb";

const useStyles = createStyles({
  movieCard: {
    minHeight: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

function Genre() {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { genreId = "" } = useParams();
  const genre = useAppSelector((state) => selectGenreById(state, genreId));
  const movies = useAppSelector((state) => selectMoviesByGenreId(state, genreId));

  useEffect(() => {
    dispatch(fetchMoviesByGenreId(genreId));
  }, [dispatch, genreId]);

  return (
    <>
      <Text>{genre?.name}</Text>

      <SimpleGrid cols={4}>
        {movies.map((movie) => (
          <div key={movie?.id}>
            <Anchor component={Link} to={`/movie/${movie?.id}`}>
              <Card shadow="sm" p="lg" radius="md" withBorder className={classes.movieCard}>
                <Text align="center">{movie?.title}</Text>
              </Card>
            </Anchor>
          </div>
        ))}
      </SimpleGrid>
    </>
  );
}

export default Genre;

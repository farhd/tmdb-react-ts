import React, { useEffect } from "react";
import { Text, createStyles, SimpleGrid, Card, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store";
import { fetchGenres, selectGenresAll } from "../store/tmdb";

const useStyles = createStyles({
  genreCard: {
    minHeight: 60,
  },
});

function Genre() {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const genres = useAppSelector(selectGenresAll);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <>
      <Text>Genres</Text>
      <SimpleGrid cols={4}>
        {genres.map((genre) => (
          <div key={genre?.id}>
            <Anchor component={Link} to={`/genre/${genre?.id}`}>
              <Card shadow="sm" p="lg" radius="md" withBorder className={classes.genreCard}>
                <Text align="center">{genre?.name}</Text>
              </Card>
            </Anchor>
          </div>
        ))}
      </SimpleGrid>
    </>
  );
}

export default Genre;

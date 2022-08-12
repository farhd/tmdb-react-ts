import React from "react";
import { Link } from "react-router-dom";
import { Text, createStyles, SimpleGrid, Card, Anchor, Pagination, Space } from "@mantine/core";

import { Movie } from "../store/tmdb";

const useStyles = createStyles({
  movieCard: {
    minHeight: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

interface MovieListProps {
  movies: Movie[];
  activePage: number;
  totalPages: number;
  setPage: (page: number) => void;
}
function MovieList({ movies, activePage, totalPages, setPage }: MovieListProps) {
  const { classes } = useStyles();
  const _totalPages = totalPages <= 500 ? totalPages : 500; // TMDB accepts max 500 for page-query
  return (
    <>
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
      <Space h="xs" />
      {totalPages > 0 ? (
        <Pagination page={activePage} onChange={setPage} total={_totalPages} />
      ) : null}
    </>
  );
}

export default MovieList;

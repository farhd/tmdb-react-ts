import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Text, createStyles, SimpleGrid, Card, Anchor, Pagination, Space } from "@mantine/core";

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
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    dispatch(fetchMoviesByGenreId({ genreId, page: activePage }))
      .unwrap()
      .then(({ total_pages = 0 }) => {
        setTotalPages(total_pages <= 500 ? totalPages : 500); // TMDB accepts max 500 for page-query
      });
  }, [dispatch, genreId, activePage, totalPages]);

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
      <Space h="xs" />
      {totalPages > 0 ? (
        <Pagination page={activePage} onChange={setPage} total={totalPages} />
      ) : null}
    </>
  );
}

export default Genre;

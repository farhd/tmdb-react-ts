import React, { useEffect, useState } from "react";
import { TextInput, createStyles, Container, Anchor } from "@mantine/core";
import { debounce } from "lodash";
import { useAppDispatch } from "../store";
import { Movie, searchMovie } from "../store/tmdb";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles({
  container: {
    position: "relative",
  },
  input: {
    minWidth: 300,
  },
  searchResults: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#fff",
    border: "1px solid grey",
    borderRadius: "5px",
    width: "calc(100% + 100px)",
    left: "-50px",
    marginTop: "10px",
  },
  searchResultsList: {},
});

function TextSearch() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const handleInput = ({ target }: React.ChangeEvent) => {
    const _value = (target as HTMLInputElement)?.value;
    setValue(_value);
  };
  const handleNavigate = (id: Movie["id"]) => {
    setSearchResults([]);
    setValue("");
    navigate(`/movie/${id}`);
  };
  const search = debounce((_value) => {
    dispatch(searchMovie({ query: _value as string }))
      .unwrap()
      .then((response) => {
        setSearchResults(response?.results ?? []);
      });
  }, 500);

  useEffect(() => {
    if (value) {
      search(value);
      return () => search.cancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={classes.container}>
      <TextInput
        value={value}
        onChange={handleInput}
        label="Search"
        className={classes.input}
        placeholder="Enter movie title"
      />
      {searchResults.length ? (
        <Container className={classes.searchResults}>
          <div className={classes.searchResultsList}>
            {searchResults.map((movie) => (
              <div key={movie.id}>
                <Anchor onClick={() => handleNavigate(movie?.id)}>{movie?.title}</Anchor>
              </div>
            ))}
          </div>
        </Container>
      ) : null}
    </div>
  );
}

export default TextSearch;

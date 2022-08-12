import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, Outlet } from "react-router-dom";
import {
  MantineProvider,
  Anchor,
  createStyles,
  Stack,
  Center,
  TextInput,
  Space,
} from "@mantine/core";

const useStyles = createStyles({
  main: {
    maxWidth: 800,
    width: "100%",
  },
  input: {
    minWidth: 300,
  },
});

function App() {
  const { classes } = useStyles();

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>TMDB</title>
      </Helmet>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Center>
          <Stack align="center" className={classes.main}>
            <Anchor align="center" m="md" component={Link} to="/">
              The Movie Database
            </Anchor>
            <TextInput label="Search" className={classes.input} placeholder="Enter movie title" />

            <Space h="sm" />
            <Outlet />
            <Space h="xl" />
          </Stack>
        </Center>
      </MantineProvider>
    </div>
  );
}

export default App;

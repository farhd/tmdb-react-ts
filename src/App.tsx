import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, Outlet } from "react-router-dom";
import { MantineProvider, Anchor, createStyles, Stack, Center, Space } from "@mantine/core";
import TextSearch from "./components/TextSearch";

const useStyles = createStyles({
  main: {
    maxWidth: 800,
    width: "100%",
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
            <TextSearch />
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

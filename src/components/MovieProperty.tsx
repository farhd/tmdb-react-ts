import React from "react";
import { Text, createStyles, Grid } from "@mantine/core";

const useStyles = createStyles({
  movie: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
});

interface MoviePropertyProps {
  name: string;
  value: string | number | null | undefined;
}
function MovieProperty({ name, value = "" }: MoviePropertyProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.movie}>
      <Grid style={{ width: "100%" }}>
        <Grid.Col span={2}>
          <Text weight={600}>{name}:</Text>
        </Grid.Col>
        <Grid.Col span={10}>
          <Text>{value}</Text>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default MovieProperty;

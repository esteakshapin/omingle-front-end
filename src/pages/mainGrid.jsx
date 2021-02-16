import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  mainGrid: {
    flexGrow: 1,
    backgroundColor: "red"
  }
});

export default function MainGrid() {
  const classes = useStyles();

  return (
    <Grid contianer className={classes.mainGrid} spacing={2}>
      <Grid item xs={2}>
        <Paper variant="outlined" className={classes.paper}>
          <p> hello </p>
        </Paper>
      </Grid>
      <Paper variant="outlined" className={classes.paper}>
        <p> hello </p>
      </Paper>
    </Grid>
  );
}

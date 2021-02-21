import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import QuizGrid from "./quizGrid";
import Message from "./message";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // backgroundColor: "red",
    height: 100
  },
  paper: {
    height: "100%",
    position: "relative"
  },
  mainGrid: {
    margin: 0,
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    // backgroundColor: "green",
    overflowY: "scroll"
  },
  messageGrid: {
    height: "100%"
    // backgroundColor: "pink"
  },
  quizGrid: {
    // backgroundColor: "blue",
    height: "100%"
  }
});

export default function MainGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-around"
        spacing={3}
        className={classes.mainGrid}
      >
        <Grid item xs={12} sm={12} md={8} lg={9} className={classes.quizGrid}>
          <Paper variant="outlined" square className={classes.paper}>
            <QuizGrid videoRoom={props.videoRoom} />
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={3}
          className={classes.messageGrid}
        >
          <Message client={props.client} teamChannel={props.teamChannel} />
        </Grid>
      </Grid>
    </div>
  );
}

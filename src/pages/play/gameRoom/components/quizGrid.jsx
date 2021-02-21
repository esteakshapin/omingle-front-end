import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: "100%",
    height: "22vh"
  },
  quizGrid: {
    margin: 0,
    width: "100%",
    height: "100%",
    padding: "10px",
    // backgroundColor: "green",
    flexGrow: 1
  },
  videoChatGrid: {
    height: `calc(37.5% - ${(theme.spacing(2.5) * 2) / 3}px)`
  },
  middleCard: {
    height: `calc(25% - ${(theme.spacing(2.5) * 2) / 3}px)`,
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5)
  }
}));

export default function QuizGrid() {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.quizGrid}>
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <Paper
          elevation={0}
          variant="outlined"
          className={classes.videoChatGrid}
        >
          Other Person Video chat
        </Paper>
        <Paper className={`${classes.middleCard}`}>Score Board</Paper>
        <Paper
          elevation={0}
          variant="outlined"
          className={classes.videoChatGrid}
        >
          User Video Chat
        </Paper>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <Paper
          variant="outlined"
          square
          elevation={0}
          className={classes.paper}
        >
          Quiz section
        </Paper>
      </Grid>
    </Grid>
  );
}

import React from "react";
import Header from "/src/components/navbar";
import Footer from "/src/components/footer";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "red",
    marginTop: "10px",
    marginBottom: "10px",
    paddingBottom: "10px"
  },
  paper: {
    height: 140,
    width: 100
  }
}));

const GameRoom = () => {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {[0, 1, 2].map((value) => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default GameRoom;

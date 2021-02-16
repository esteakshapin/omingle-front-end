import React from "react";
import Header from "/src/components/navbar";
import Footer from "/src/components/footer";
import { makeStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

import MainGrid from "./mainGrid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    backgroundColor: "red"
  },
  mainGrid: {
    flexGrow: 1,
    backgroundColor: "red",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
    // width:
  },
  paper: {
    height: 140,
    width: 100
  }
}));

const GameRoom = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <MainGrid />
      <Footer />
    </div>
    // <div className={classes.rootDiv}>
    //   <Header />
    //   <h1> asdasd</h1>
    //   <Footer />
    // </div>
  );
};

export default GameRoom;

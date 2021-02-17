import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  quizBackgeound: {
    borderRadius: "22px",
    backgroundColor: "#EDF0F4",
    height: "100%",
    position: "relative",
    padding: theme.spacing(1, 2)
  },
  chatHeader: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "30px",
    letterSpacing: "0.15px",

    color: "rgba(0, 0, 0, 0.87)",
    // backgroundColor: 'red',
    margin: "0px"
  },
  chatHeaderGrid: {
    // backgroundColor: "pink",
    justifyContent: "space-between",
    alignItems: "center"
  },
  chatHeaderTabGrid: {
    // backgroundColor: "red",
    margin: 0,
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  teamTab: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    // fontSize: "15px",
    lineHeight: "30px",

    letterSpacing: "0.15px",
    borderRadius: "10px",
    padding: theme.spacing(0.7)
  },
  activeTab: {
    color: "#00B8D9",
    backgroundColor: "rgba(0,184,217,0.1)"
  },
  disabledTab: {
    color: "rgba(196,196,196,1)"
  },
  quizHeaderHr: {
    borderTop: "1px solid #C4C4C4"
  },
  messageRoot: {
    backgroundColor: "red",
    width: "100%"
    // height: "100%"
  }
}));

export default function Message() {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.quizBackgeound}>
      <Grid container spacing={0} className={classes.chatHeaderGrid}>
        <Grid item>
          {" "}
          <p className={classes.chatHeader}> Chat</p>
        </Grid>
        <Grid item>
          {" "}
          <Grid container spacing={1} className={classes.chatHeaderTabGrid}>
            <Grid item>
              {" "}
              <div className={`${classes.teamTab} ${classes.activeTab}`}>
                {" "}
                Team{" "}
              </div>
            </Grid>
            <Grid item>
              {" "}
              <div className={`${classes.teamTab} ${classes.disabledTab}`}>
                {" "}
                Public{" "}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr className={classes.quizHeaderHr} />
      <div className={classes.messageRoot}>hello</div>
    </Paper>
  );
}

import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Omingle
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  textStyle: {
    fontFamily: "Roboto",
    fontSize: "14",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "16px",
    letterSpacing: "1.25px",
    textAlign: "center"
  },
  footer: {
    padding: theme.spacing(2, 0),
    marginTop: "auto",
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "white",
    minWidth: "100vw"
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;

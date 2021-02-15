import * as React from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Container,
  Button
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import logo from "/src/assets/images/logo_transparent.png";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
    // backgroundColor: 'green'
  },
  linkText: {
    textDecoration: `none`,
    color: `black`,
    opacity: 0.6
  },
  nav: {
    backgroundColor: "white"
  },
  buttonColor: {
    backgroundColor: "#F6E2E0",
    color: "#F79489"
  }
});

const navLinks = [
  { title: "Dashboard", path: "/", active: false },
  { title: "Play", path: "/", active: true },
  { title: "Friends", path: "/", active: false },
  { title: "School", path: "/", active: false }
];

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.nav}>
      <Toolbar className={classes.navbarDisplayFlex}>
        <div
          style={{
            display: "flex",
            alignItems: "center"
            // backgroundColor: "blue"
          }}
        >
          {" "}
          <Avatar src={logo} variant="square" />
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {navLinks.map(({ title, path, active }) => (
              <a href={path} key={title} className={classes.linkText}>
                <ListItem
                  button
                  classes={active ? { button: classes.buttonColor } : {}}
                >
                  <ListItemText primary={title} />
                </ListItem>
              </a>
            ))}
          </List>{" "}
        </div>

        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#F79489",
            color: "white",
            float: "right"
          }}
        >
          {" "}
          Log In{" "}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

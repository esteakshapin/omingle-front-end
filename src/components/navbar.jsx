import React, { useState, useCallback, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Button
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import logo from "../assets/images/logo_transparent.png";
import GoogleSocialAuth from '../googleAuth/GoogleSocialAuth';
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
  withRouter,
  useHistory
} from "react-router-dom";

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
  { title: "Dashboard", path: "/", },
  { title: "Play", path: "/play", },
  { title: "Friends", path: "/friends", },
  { title: "School", path: "/school", }
];

const Header = (props) => {
  const classes = useStyles();
  let history = useHistory();

  // Declare a new state variable, which we'll call "count"
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
  const [lastName, setLastName] = useState(localStorage.getItem('lastName'));

  // check to make sure user is still logged in
  useEffect(() => {
    if (isLoggedIn) {
      axios({
        method: 'GET',
        url: 'http://localhost:8000/rest-auth/user/',
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,

        },
      })
        .then((res) => console.log(res))
        .catch((error) => logOut());
    }

  })

  const logIn = useCallback(
    (res) => {
      // console.log(res.json());
      console.log(res.data.token);
      console.log(res.data.user);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('firstName', res.data.user.first_name);
      localStorage.setItem('lastName', res.data.user.last_name);
      setFirstName(localStorage.getItem('firstName'));
      setLastName(localStorage.getItem('lastName'));
      setLoggedIn(true);
    }, []
  )

  const logOut = useCallback(
    async () => {
      axios({
        method: 'POST',
        url: "http://localhost:8000/rest-auth/logout/",
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,

        },
      })
        .then((res) => {
          localStorage.removeItem('token');
          localStorage.removeItem('firstName');
          localStorage.removeItem('lastName');
          setFirstName('');
          setLastName('');
          setLoggedIn(false);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 401) {
              localStorage.removeItem('token');
              localStorage.removeItem('firstName');
              localStorage.removeItem('lastName');
              setFirstName('');
              setLastName('');
              setLoggedIn(false);
            }
          }
          console.log(error);
        });

      history.push('/');

    }, []
  );

  const isAuthenticated = () => {
    if (history.location.pathname != '/' && !isLoggedIn) {
      alert('You need to login!');
      history.push('/');
    }
  }

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
            {navLinks.map(({ title, path }) => (
              <NavLink exact
                isActive={
                  (match, location) => {
                    if (location.pathname.includes('play') && title == 'Play') {
                      isAuthenticated();
                      return true;
                    }
                    if (match) {
                      isAuthenticated();
                      return match.isExact;
                    }

                    return false;
                  }
                }
                to={path}
                key={title}
                className={classes.linkText}
                activeClassName={classes.buttonColor}>
                <ListItem
                  button
                >
                  <ListItemText primary={title} />
                </ListItem>
              </NavLink>
            ))}
          </List>{" "}
        </div>

        {isLoggedIn ? <Avatar onClick={logOut}>{firstName.charAt(0) + lastName.charAt(0)}</Avatar> : <GoogleSocialAuth logIn={logIn} />}

      </Toolbar>
    </AppBar>
  );
};

export default Header;

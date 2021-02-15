import * as React from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";

const navLinks = [
  { title: "Dashboard", path: "/" },
  { title: "Play", path: "/" },
  { title: "Friends", path: "/" },
  { title: "School", path: "/" }
];

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar></Toolbar>
    </AppBar>
  );
};

export default Header;

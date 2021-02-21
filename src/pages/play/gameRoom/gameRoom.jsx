import React from "react";
import { withStyles } from "@material-ui/core/styles";

import MainGrid from "./components/mainGrid";

import axios from "axios";


const useStyles = (theme) => ({
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
});

class GameRoom extends React.Component {
  constructor(props) {
    super(props);

    this.getAccessToken = this.getAccessToken.bind(this);
  }

  async getAccessToken() {
    axios({
      method: 'GET',
      url: 'http://localhost:8000/team/get_access_token',
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,

      },
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    // this.getAccessToken();
  }

  render() {
    const { classes } = this.props;
    return (
      <MainGrid />
    );
  }


}

export default withStyles(useStyles)(GameRoom);

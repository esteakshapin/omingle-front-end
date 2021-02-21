import React from "react";
import { withStyles } from "@material-ui/core/styles";

import MainGrid from "./components/mainGrid";

import axios from "axios";

import { withRouter } from 'react-router-dom';

const queryString = require('query-string');

const { connect } = require('twilio-video');


// const useStyles = (theme) => ({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     minHeight: "100vh"
//   },
//   main: {
//     marginTop: theme.spacing(8),
//     marginBottom: theme.spacing(2),
//     backgroundColor: "red"
//   },
//   mainGrid: {
//     flexGrow: 1,
//     backgroundColor: "red",
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(2)
//     // width:
//   },
//   paper: {
//     height: 140,
//     width: 100
//   }
// });

class GameRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      room: null
    }
    this.joinRoom = this.joinRoom.bind(this);
  }

  async joinRoom() {
    try {
      const room = await connect(this.state.accessToken, {
        audio: true,
        // video: true
      });

      this.setState({ room: room }, () => console.log('connection success'));
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    console.log(parsed);
    this.setState({
      accessToken: parsed.accessToken
    }, () => this.joinRoom());
  }

  render() {
    return (
      this.state.room ? <MainGrid videoRoom={this.state.room} /> : <div>Connecting</div>
    );
  }


}

export default withRouter(GameRoom);

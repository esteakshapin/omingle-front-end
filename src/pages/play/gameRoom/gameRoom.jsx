import React from "react";
import { withStyles } from "@material-ui/core/styles";

import MainGrid from "./components/mainGrid";

import axios from "axios";

import { withRouter } from 'react-router-dom';

const queryString = require('query-string');

const { connect } = require('twilio-video');

const Chat = require("twilio-chat");

class GameRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      room: null,
      chatClient: null
    }
    this.joinRoom = this.joinRoom.bind(this);
  }

  async joinRoom() {

    try {

      // connecting to chat
      try {
        const chatClient = await Chat.Client.create(this.state.accessToken);
        this.setState({
          chatClient: chatClient
        }, () => console.log(this.state))
      } catch (err) {
        console.log(err)
      }

      const audio = null;
      const video = null;
      try {
        video = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        })
      } catch (err) {
        console.log('video not found');
        console.log(err);
      }

      try {
        audio = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true
        })
      } catch (err) {
        console.log('audio not found');
        console.log(err);
      }

      const room = await connect(this.state.accessToken, {
        audio: (audio ? true : false),
        video: (video ? true : false)
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
      this.state.room && this.state.chatClient ? <MainGrid videoRoom={this.state.room} client={this.state.chatClient} teamChannel={this.state.room.name} /> : <div>Connecting</div>
    );
  }


}

export default withRouter(GameRoom);

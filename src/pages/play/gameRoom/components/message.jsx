import React from "react";

import { withStyles } from "@material-ui/core/styles";

import {
  Grid,
  IconButton,
  List,
  TextField,
  Paper
} from "@material-ui/core";

import { Send } from "@material-ui/icons";

import ChatItem from './chatItem';

const useStyles = ((theme) => ({

  sendButton: { backgroundColor: "#3f51b5" },
  sendIcon: { color: "white" },
  // textField: { width: "100%", borderWidth: 0, borderColor: "transparent" },
  textFieldContainer: { flex: 1, marginRight: "5 px" },

  quizBackgeound: {
    borderRadius: "22px",
    backgroundColor: "#EDF0F4",
    height: "100%",
    position: "relative",
    padding: theme.spacing(1, 2),
    display: 'flex',
    flexFlow: 'column',
  },
  header: {
    flex: "0 1 auto"
  },
  footer: {
    flex: '0 1 auto'
  },
  scrollDiv: {
    flex: '1 1 auto',
    overflow: 'auto'
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
  },

}));

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      messages: [],
      loading: false,
      channel: null,
      userFirstName: '',
      userLastName: ''
    }

    this.joinChannel = this.joinChannel.bind(this);
    this.handleMessageAdded = this.handleMessageAdded.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.scrollDiv = React.createRef();
  }

  async joinChannel(channel) {
    if (channel.channelState.status !== "joined") {
      await channel.join();
    }

    this.setState({
      channel: channel,
      loading: false
    });

    channel.on("messageAdded", this.handleMessageAdded);
    this.scrollToBottom();

  }

  handleMessageAdded(message) {
    this.setState(state => ({
      messages: [...state.messages, message],
    }),
      this.scrollToBottom
    );
  }

  scrollToBottom() {
    // const scrollHeight = this.scrollDiv.current.scrollHeight;
    // const height = this.scrollDiv.current.clientHeight;
    // const maxScrollTop = scrollHeight - height;
    // this.scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;

  }

  sendMessage() {
    const { text, channel } = this.state;
    if (text) {
      this.setState({ loading: true });
      channel.sendMessage(String(text).trim());
      this.setState({ text: "", loading: false });
    }
  }

  async componentDidMount() {

    this.setState({
      userFirstName: localStorage.getItem('firstName'),
      userLastname: localStorage.getItem('lastName')
    })

    const client = this.props.client;
    console.log(this.props);
    client.on("channelJoined", async (channel) => {
      // getting list of all messages since this is an existing channel
      console.log('channelJoined');
      const messages = await channel.getMessages();
      this.setState({ messages: messages.items || [] });
      this.scrollToBottom();
    });

    const room = this.props.teamChannel;

    try {
      const channel = await client.getChannelByUniqueName(room);
      this.joinChannel(channel);
    } catch (err) {
      try {
        const channel = await client.createChannel({
          uniqueName: room,
          friendlyName: room,
        });

        this.joinChannel(channel);
      } catch {
        throw new Error("Unable to create channel, please reload this page");
      }
    }


  }


  render() {
    const { classes } = this.props;
    const { loading, text, messages, channel } = this.state;
    return (
      <Paper variant="outlined" className={classes.quizBackgeound}>
        <div className={classes.header}>
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
        </div>
        <div className={classes.scrollDiv} ref={this.scrollDiv}>
          {
            <List dense={true}>
              {messages &&
                messages.map((message) =>
                  <ChatItem
                    key={message.index}
                    message={message}
                    email={this.state.userFirstName + ' ' + this.state.userLastName} />
                )}
            </List>
          }
        </div>

        <div className={classes.footer}>
          <Grid
            container
            direction="row"
            justify="spaceBetween"
            alignItems="center">
            <Grid item className={classes.textFieldContainer}>
              <TextField
                required
                className={classes.textField}
                placeholder="Enter message"
                variant="outlined"
                multiline
                rows={2}
                value={text}
                disabled={!channel}
                onChange={(event) =>
                  this.setState({ text: event.target.value })
                } />
            </Grid>

            <Grid item>
              <IconButton
                className={classes.sendButton}
                onClick={this.sendMessage}
                disabled={!channel}>
                <Send className={classes.sendIcon} />
              </IconButton>
            </Grid>
          </Grid>
        </div>

      </Paper>
    );
  }
}

export default withStyles(useStyles)(Message);

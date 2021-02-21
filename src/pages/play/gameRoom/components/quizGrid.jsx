import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Participant from './Participant';

const useStyles = ((theme) => ({
  paper: {
    minHeight: "100%",
    height: "22vh"
  },
  quizGrid: {
    margin: 0,
    width: "100%",
    height: "100%",
    padding: "10px",
    // backgroundColor: "green",
    flexGrow: 1
  },
  videoChatGrid: {
    height: `calc(37.5% - ${(theme.spacing(2.5) * 2) / 3}px)`
  },
  middleCard: {
    height: `calc(25% - ${(theme.spacing(2.5) * 2) / 3}px)`,
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5)
  }
}));


class QuizGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      remoteParticipants: Array.from(this.props.videoRoom.participants.values())
    }

    this.leaveRoom = this.leaveRoom.bind(this);
  }

  removeParticipant(participant) {
    console.log(`${participant.identity} has left the room`);

    this.setState({
      remoteParticipants: this.state.remoteParticipants.filter(p => p.identity !== participant.identity)
    });
  }

  addParticipant(participant) {
    console.log(`${participant.identity} has joined the room.`);

    this.setState({
      remoteParticipants: [...this.state.remoteParticipants, participant]
    });
  }

  leaveRoom() {
    this.props.videoRoom.disconnect();
    // this.props.returnToLobby();
  }

  componentDidMount() {
    // Add event listeners for future remote participants coming or going
    this.props.videoRoom.on('participantConnected', participant => this.addParticipant(participant));
    this.props.videoRoom.on('participantDisconnected', participant => this.removeParticipant(participant));

    window.addEventListener("beforeunload", this.leaveRoom);
  }

  componentWillUnmount() {
    this.leaveRoom();
  }



  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={2} className={classes.quizGrid}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Paper
            elevation={0}
            variant="outlined"
            className={classes.videoChatGrid}
          >
            {
              this.state.remoteParticipants.map(participant =>
                <Participant key={participant.identity} participant={participant} />
              )
            }
          </Paper>
          <Paper className={`${classes.middleCard}`}>Score Board</Paper>
          <Paper
            elevation={0}
            variant="outlined"
            className={classes.videoChatGrid}
          >
            <Participant key={this.props.videoRoom.localParticipant.identity} localParticipant="true" participant={this.props.videoRoom.localParticipant} />
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Paper
            variant="outlined"
            square
            elevation={0}
            className={classes.paper}
          >
            Quiz section
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(QuizGrid);
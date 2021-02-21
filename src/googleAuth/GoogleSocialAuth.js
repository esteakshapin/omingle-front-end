import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import googleLogin from './GoogleLogin';
import { Button } from "@material-ui/core";

class GoogleSocialAuth extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="GoogleAuthButton">
        <GoogleLogin
          clientId="351400190668-nj6qch3c235giuacshoe15vqfb0iol2a.apps.googleusercontent.com"
          render={renderProps => (<Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#F79489",
              color: "white",
              float: "right"
            }}
            onClick={renderProps.onClick}
          >
            {" "}
            Log In{" "}
          </Button>)}
          onSuccess={(res) => { googleLogin(res.accessToken).then(r => this.props.logIn(r)) }}
          // onSuccess={(res) => (console.log(res.isSignedIn()))}
          onFailure={(res) => console.log(res)}
        />
      </div>
    );
  }
}

export default GoogleSocialAuth;
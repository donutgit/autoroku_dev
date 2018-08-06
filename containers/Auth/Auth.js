import React, { Component } from "react";
import { auth, firestore } from "../../firebase/index";
//mui
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import JoinFrom from "../../components/Forms/JoinFrom";
import LoginForm from "../../components/Forms/LoginForm";
import formStyle from "./Auth.css";
import bgImage from "../../assets/bg.png";

const styles = theme => ({
  root: {
    borderLeft: "5px solid #ed2553",
    marginTop: "8%",
    padding: "0 6%",
    boxSizing: "border-box"
  },
  button: {
    backgroundColor: "#7B04FE",
    width: "100%"
  },
  caption: {
    marginTop: "10px"
  },
  link: {
    color: "#a655ff"
  }
});
class Auth extends Component {
  state = {
    loading: false,
    error: false
  };

  onSubmitJoinFrom = (event, formData) => {
    this.setState({ loading: true });
    event.preventDefault();
    const { email, password, username } = formData;

    auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log("new user was registered");
        return {
          [authUser.user.uid]: {
            username,
            email
          }
        };
      })
      .then(userData => firestore.doCreateUserProfile(userData))
      .then(() => {
        console.log("user profile was created");
        this.setState({ loading: false });
        this.props.history.goBack();
      })
      .catch(err => {
        console.log("error creating user profile", err);
        this.setState({ loading: false, error: true });
      });
  };

  onSubmitLoginForm = (event, email, password) => {
    event.preventDefault();
    this.setState({ loading: true });

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.goBack();
      })
      .catch(error => {
        this.setState({ loading: false, error: true });
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;

    let form =
      this.props.match.url === "/join" ? (
        <JoinFrom
          onSubmit={this.onSubmitJoinFrom}
          loading={this.state.loading}
        />
      ) : (
        <LoginForm
          onSubmit={this.onSubmitLoginForm}
          loading={this.state.loading}
        />
      );

    return (
      <div
        className={formStyle.container}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className={formStyle.formWrapper}>
          <Typography variant="headline" className={classes.root}>
            {this.props.match.url === "/join" ? "Register" : "Login"}
          </Typography>
          {form}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Auth);

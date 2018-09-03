import React, { Component } from "react";
//mui
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
//nodejs
import JoinFrom from "../../components/Forms/JoinFromNode";
import LoginForm from "../../components/Forms/LoginFormNode";
import {
  authenticateUser,
  isUserAuthenticated
} from "../../modules/AuthHelpers";
///query
import { onRegister, onLogin } from "../../queries";

import formStyle from "./Auth.css";
import bgImage from "../../assets/bg.png";
import AuthContext from "../../hoc/AuthContext";

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
    const data = {
      email: formData.email,
      password: formData.password,
      username: formData.username
    };
    onRegister(data)
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
        this.props.history.push("/login");
      })
      .catch(error => {
        // handle error
        console.log(error.response);
        this.setState({ loading: false });
      });
  };

  onSubmitLoginForm = (event, data, toggleAuth) => {
    event.preventDefault();
    this.setState({ loading: true });
    onLogin(data)
      .then(res => {
        console.log(res);
        authenticateUser(res.data.token);
        console.log(isUserAuthenticated());
        this.setState({ loading: false });
        toggleAuth();
        this.props.history.push("/");
      })
      .catch(error => {
        // handle error
        console.log(error.response);
        this.setState({ loading: false });
      });
  };

  render() {
    const { classes, match } = this.props;
    return (
      <div
        className={formStyle.container}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className={formStyle.formWrapper}>
          <Typography variant="headline" className={classes.root}>
            {match.url === "/join" ? "Register" : "Login"}
          </Typography>
          {match.url === "/join" ? (
            <JoinFrom
              onSubmit={this.onSubmitJoinFrom}
              loading={this.state.loading}
            />
          ) : (
            <AuthContext.Consumer>
              {({ toggleAuth }) => {
                return (
                  <LoginForm
                    onSubmit={this.onSubmitLoginForm}
                    loading={this.state.loading}
                    toggleAuth={toggleAuth}
                  />
                );
              }}
            </AuthContext.Consumer>
          )}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Auth);

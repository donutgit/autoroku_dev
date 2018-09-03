import React from "react";
import AuthContext from "./AuthContext.js";
import {
  isUserAuthenticated,
  deauthenticateUser
} from "../modules/AuthHelpers";
import { getUserData } from "../queries";

const withAuthentication = Component =>
  class WithAuthentication extends React.Component {
    state = {
      authenticated: false,
      user: null
    };

    componentDidMount() {
      // get user data if user authenticated
      if (isUserAuthenticated()) {
        this.getUserData();
      }
    }

    toggleAuthenticateStatus = () => {
      // check authenticated status and toggle state based on that
      if (isUserAuthenticated()) {
        this.getUserData();
      } else {
        this.setState({
          authenticated: false,
          user: null
        });
      }
    };

    getUserData = () => {
      getUserData().then(({ data }) => {
        if (data.user) {
          this.setState({ authenticated: true, user: data.user });
        }
      });
    };

    onLogout = () => {
      deauthenticateUser();
      this.toggleAuthenticateStatus();
    };

    render() {
      console.log(
        `[User --=${
          this.state.authenticated ? "IS" : "IS NOT"
        }=-- authenticated]`
      );
      return (
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            user: this.state.user,
            toggleAuth: this.toggleAuthenticateStatus,
            onLogout: this.onLogout
          }}
        >
          <Component />
        </AuthContext.Provider>
      );
    }
  };

export default withAuthentication;

import React from "react";
import { withRouter } from "react-router-dom";
import { isUserAuthenticated, getToken } from "../modules/AuthHelpers";
import { getUserData } from "../queries";
import AuthContext from "../hoc/AuthContext";

const withAuthorization = authCondition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      if (isUserAuthenticated()) {
        getUserData(getToken()).then(({ data }) => {
          if (!authCondition(data.user)) {
            this.props.history.push("/login");
          }
        });
      }
    }

    render() {
      return (
        <AuthContext.Consumer>
          {({ authenticated }) => (authenticated ? <Component /> : null)}
        </AuthContext.Consumer>
      );
    }
  }
  // withRouter для того чтобы сделать push("/login")
  return withRouter(WithAuthorization);
};

export default withAuthorization;

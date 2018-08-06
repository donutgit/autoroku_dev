import React from "react";
// import AppDataContext from "../../hoc/AppDataContext";
import AuthUserContext from "../../hoc/AuthUserContext";
import ConsoleDrawer from "../../components/Console/ConsoleDrawer";
import withAuthorization from "../../hoc/withAuthorization";

const Console = props => (
  <AuthUserContext.Consumer>
    {({ authUser, userProfile }) => {
      return <ConsoleDrawer user={authUser} profile={userProfile} />;
    }}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Console);

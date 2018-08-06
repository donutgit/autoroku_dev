import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import compose from "recompose/compose";
import classes from "./App.css";

// import AppProvider from "./hoc/AppProvider";
import withAppData from "./hoc/withAppData";
import withAuthentication from "./hoc/withAuthentication";

import Layout from "./containers/Layout/Layout";
import MainPage from "./containers/MainPage/MainPage";
import VotePage from "./containers/VotePage/VotePage";
import Auth from "./containers/Auth/Auth";
import CarList from "./containers/CarList/CarList";
import CarLandingPage from "./containers/CarLandingPage/CarLandingPage";
import ChartsPage from "./containers/ChartsPage/ChartsPage";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Console from "./containers/Console/Console";
// import EditProfile from "./components/Console/EditProfile";
// import UpdateUser from "./components/Forms/AccountPage";
// import RouteTest from "./components/_Trash/RouteTest/RouteTest";
// import ConsoleDrawer from "./components/Console/ConsoleDrawer";

// import Admin from "./components/_Trash/Admin/Admin";
// import SearchCar from "./components/AddCar/SearchCar";
// import SpringSlider from "./components/MainPageContent/Gallery/SpringSlider";
// import RouteWithLayout from "./hoc/RouteWithLayout";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  },
  overrides: {
    MuiButton: {
      disabled: {
        color: "rgba(171, 171, 171, 0.3)"
      }
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: "#1a1d21"
      },
      barColorPrimary: {
        backgroundColor: "#00BCD4"
      }
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid #00BCD4"
        }
      }
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#00BCD4"
        }
      }
    }
  }
});
const App = () => {
  return (
    <div className={classes.App}>
      <MuiThemeProvider theme={theme}>
        {/* <AppProvider> */}
        <Router>
          <Switch>
            <Layout path="/" exact component={MainPage} />
            <Layout path="/vote" exact noFooter={true} component={VotePage} />
            <Layout path="/cars" exact component={CarList} />
            <Layout path="/cars/:id" exact component={CarLandingPage} />
            <Layout path="/charts" exact component={ChartsPage} />
            <Route path="/join" exact component={Auth} />
            <Route path="/login" exact component={Auth} />
            <Route path="/console" component={Console} />
            <Route
              render={() => {
                return <Redirect to="/" />;
              }}
            />
          </Switch>
        </Router>
        {/* </AppProvider> */}
      </MuiThemeProvider>
    </div>
  );
};

// export default withAuthentication(App);
export default compose(
  withAppData,
  withAuthentication
)(App);
// export default withAuthentication(withAppData(App));

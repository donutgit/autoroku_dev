import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Loadable from "react-loadable";
import compose from "recompose/compose";
import classes from "./App.css";

// import AppProvider from "./hoc/AppProvider";
// import withAppData from "./hoc/withAppData";
import withAppData from "./hoc/withAppData";
import withAuthentication from "./hoc/withAuthentication";
// import withAuth from "./hoc/withAuth";

import Layout from "./containers/Layout/Layout";
import MainPage from "./containers/MainPage/MainPage";
import VotePage from "./containers/VotePage/VotePage";
import Auth from "./containers/Auth/Auth";
import CarList from "./containers/CarList/CarList";
import CarLandingPage from "./containers/CarLandingPage/CarLandingPage";
import ChartsPage from "./containers/ChartsPage/ChartsPage";
import Spinner from "./components/UI/Spinner/Spinner";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { isUserAuthenticated } from "./modules/AuthHelpers";
// import Console from "./containers/Console/Console";
// import withMongo from "./hoc/withMongo";
// import EditProfile from "./components/Console/EditProfile";
// import UpdateUser from "./components/Forms/AccountPage";
// import RouteTest from "./components/_Trash/RouteTest/RouteTest";
// import ConsoleDrawer from "./components/Console/ConsoleDrawer";

import Admin from "./components/_Trash/Admin/Admin";
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
const Loading = () => <Spinner />;
const Console = Loadable({
  loader: () => import("./containers/Console/Console"),
  loading: Loading
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isUserAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isUserAuthenticated() ? (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      ) : (
        <Component {...props} {...rest} />
      )
    }
  />
);

// const PropsRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => <Component {...props} {...rest} />} />
// );

const App = () => {
  return (
    <div className={classes.App}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Layout path="/" exact component={MainPage} />
            <Layout path="/vote" exact noFooter={true} component={VotePage} />
            <Layout path="/cars" exact component={CarList} />
            <Layout path="/cars/:id" exact component={CarLandingPage} />
            <Layout path="/charts" exact component={ChartsPage} />
            <LoggedOutRoute path="/join" exact component={Auth} />
            <LoggedOutRoute path="/login" exact component={Auth} />
            <Route path="/console" component={Console} />
            <Route path="/admin" component={Admin} />
            <Route
              render={() => {
                return <Redirect to="/" />;
              }}
            />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
};

export default compose(
  withAppData,
  withAuthentication
)(App);

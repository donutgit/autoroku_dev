import React from "react";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import compose from "recompose/compose";
//mui
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import AccountList from "./AccountList";
import SidebarList from "./Sidebar/SidebarList";
import EditProfile from "./Profile/EditProfile";
import Profile from "./Profile/Profile";
// import Dashboard from "./Dashboard";
import Nominations from "./Nominations/Nominations";
import VoteList from "./VoteList/VoteList";
import VoteCharts from "./VoteCharts/VoteCharts";
import Cars from "./Cars/Cars";
import CarsMongo from "./Cars/CarsMongo";
import Users from "./Users/Users";
import UsersMongo from "./Users/UsersMongo";
import NominationsMongo from "./Nominations/NominationsMongo";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    height: "100vh",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  "appBar-left": {
    marginLeft: drawerWidth
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: "64px",
    overflow: "auto",
    position: "relative"
  },
  toolbar: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  toolbarHeader: {
    display: "flex",
    alignItems: "center",
    padding: "15px 0"
  },
  logo: {
    height: "30px",
    margin: "0 10px"
  },

  drawerContent: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center"
  }
});

class ConsoleDrawer extends React.PureComponent {
  state = {
    anchor: "left"
  };

  render() {
    const { classes, match } = this.props;
    const { anchor } = this.state;
    // console.log(this.user.getToken());
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-left`])}
          >
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
            anchor={anchor}
          >
            <div className={classes.drawerContent}>
              <div className={classes.toolbar}>
                <div className={classes.toolbarHeader}>
                  <img className={classes.logo} src="https://res.cloudinary.com/dxfogjj18/image/upload/v1533807100/icons/react_logo.png" alt="Logo" />
                  <Typography
                    variant="headline"
                    color="inherit"
                    style={{ textTransform: "uppercase" }}
                    noWrap
                  >
                    Console
                  </Typography>
                </div>
              </div>
              <Divider />
              <AccountList match={match} profile={this.props.profile} />
              <Divider />
              <SidebarList match={match} />
            </div>
          </Drawer>
          <main className={classes.content}>
            <Route path={`${match.url}/profile`} component={Profile} />
            <Route
              path={`${match.url}/edit-profile`}
              render={props => (
                <EditProfile
                  user={this.props.user}
                  profile={this.props.profile}
                  {...props}
                />
              )}
            />
            <Route path={`${match.url}/firebase/nominations`} component={Nominations} />
            <Route path={`${match.url}/firebase/users`} component={Users} />
            <Route path={`${match.url}/firebase/cars`} component={Cars} />
            <Route path={`${match.url}/mongo/nominations`} component={NominationsMongo} />
            <Route path={`${match.url}/mongo/users`} component={UsersMongo} />
            <Route path={`${match.url}/mongo/cars`} component={CarsMongo} />
            <Route path={`${match.url}/vote-charts`} component={VoteCharts} />
            <Route path={`${match.url}/vote-list`} component={VoteList} />
            <Route exact path={match.url} component={Cars} />
          </main>
        </div>
      </div>
    );
  }
}

ConsoleDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

// const ConsoleDrawerWithRouter = withRouter(ConsoleDrawer);

// export default withStyles(styles)(ConsoleDrawerWithRouter);

export default compose(
  withRouter,
  withStyles(styles)
)(ConsoleDrawer);

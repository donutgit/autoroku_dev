import React from "react";
import Link from "react-router-dom/Link";
import PropTypes from "prop-types";
//mui
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
//icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Dashboard from "@material-ui/icons/Dashboard";
import InsertChart from "@material-ui/icons/InsertChart";
import ShowChart from "@material-ui/icons/ShowChart";
import ListIcon from "@material-ui/icons/List";
import ViewList from "@material-ui/icons/ViewList";
import Settings from "@material-ui/icons/Settings";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Home from "@material-ui/icons/Home";
import DirectionsCar from "@material-ui/icons/DirectionsCar";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class NestedList extends React.Component {
  state = { open: false };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, match } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={
            <ListSubheader component="div">Nested List Items</ListSubheader>
          }
        >
          <Link to={`${match.url}/dashboard`}>
            <ListItem button>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText inset primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to={`${match.url}/nominations`}>
            <ListItem button>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText inset primary="Nominations" />
            </ListItem>
          </Link>
          <Link to={`${match.url}/cars`}>
            <ListItem button>
              <ListItemIcon>
                <DirectionsCar />
              </ListItemIcon>
              <ListItemText inset primary="Cars" />
            </ListItem>
          </Link>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <InsertChart />
            </ListItemIcon>
            <ListItemText inset primary="Charts" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to={`${match.url}/vote-charts`}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ShowChart />
                  </ListItemIcon>
                  <ListItemText inset primary="Vote Charts" />
                </ListItem>
              </Link>
              <Link to={`${match.url}/vote-list`}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ViewList />
                  </ListItemIcon>
                  <ListItemText inset primary="Vote List" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
          <Link to={`${match.url}/users`}>
            <ListItem button>
              <ListItemIcon>
                <SupervisorAccount />
              </ListItemIcon>
              <ListItemText inset primary="Users" />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText inset primary="Settings" />
          </ListItem>
          <Link to="/">
            <ListItem button style={{backgroundColor: '#F50057', borderRadius: "25px", marginTop: '20px'}}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText inset primary="To App"  />
            </ListItem>
          </Link>
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NestedList);

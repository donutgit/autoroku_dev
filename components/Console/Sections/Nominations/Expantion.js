import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Mutation } from "react-apollo";
import { REMOVE_NOMINATION, GET_CARS_NOMINATIONS } from "../../../../graphql";

const styles = theme => ({
  root: {
    width: "100%",
    marginBottom: "3px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "flex-start"
  },
  column: {
    flexBasis: "50%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  chip: {
    margin: "5px"
  }
});

function DetailedExpansionPanel(props) {
  const { classes } = props;
  const { id, nomination, carsAmount, cars } = props.data;
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>{nomination}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {carsAmount}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            {cars.map(car => {
              return (
                <Chip
                  key={car.model}
                  label={car.mark + " " + car.model}
                  className={classes.chip}
                  onDelete={() => {}}
                />
              );
            })}
          </div>
          <div className={classNames(classes.column, classes.helper)}>
            <Typography variant="caption">
              Select your destination of choice
              <br />
              <a href="#sub-labels-and-columns" className={classes.link}>
                Learn more
              </a>
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" variant="raised">
            Cancel
          </Button>
          <Button
            size="small"
            variant="raised"
            color="primary"
            onClick={() => props.onModal("Update", { id, name: nomination })}
          >
            Edit
          </Button>
          <Mutation
            mutation={REMOVE_NOMINATION}
            refetchQueries={[{ query: GET_CARS_NOMINATIONS }]}
          >
            {mutate => (
              <Button
                size="small"
                variant="raised"
                color="secondary"
                onClick={() => mutate({ variables: { id: id } })}
              >
                Remove Nomination
              </Button>
            )}
          </Mutation>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailedExpansionPanel);

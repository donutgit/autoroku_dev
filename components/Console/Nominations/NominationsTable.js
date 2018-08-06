import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Expantion from "./Expantion";
//icons
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  tableHeader: {
    backgroundColor: "#000",
    display: "flex",
    flexGrow: 1,
    padding: "0 24px 0 24px",
    minHeight: "48px"
  },
  tableHeaderCol: {
    flexBasis: "50%",
    "&:last-child": {
      paddingRight: "32px"
    }
  },
  addNewNom: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

function createData(nomination, carsAmount, cars) {
  return { nomination, carsAmount, cars };
}

function SimpleTable(props) {
  const { classes, nominations, cars } = props;

  const data = nominations.map(nom => {
    return createData(nom, cars[nom].length, cars[nom]);
  });

  return (
    <div className={classes.root}>
      <div className={classes.tableHeader}>
        <div className={classes.tableHeaderCol}>
          <p>Nominations</p>
        </div>
        <div className={classes.tableHeaderCol}>
          <p>Cars</p>
        </div>
      </div>
      {data.map(d => {
        return <Expantion key={d.nomination} data={d} />;
      })}
      <div className={classes.addNewNom}>
        <Button variant="raised" color="primary">
          Add new nomination
          <AddIcon className={classes.rightIcon} />
        </Button>
      </div>
    </div>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);

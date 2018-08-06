import React, { PureComponent } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
//icons
import Add from "@material-ui/icons/Add";

import CarCard from "../CarCard/CarCard";
import FullScreenDialog from "./FullScreenDialog";

const styles = theme => ({
  addCarButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px"
  },
  Nominations: {
    display: "grid",
    gridGap: "30px 15px",
    justifyItems: "center",
    gridAutoRows: "minmax(100px, auto)",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))"
  }
});

class EditCars extends PureComponent {
  state = {
    poll: {},
    nominations: [],
    addCarDialog: {
      open: false,
      type: "",
      data: {
        nominations: [],
        mark: "",
        model: "",
        imageUrl: "",
        premium: false
      }
    }
  };
  openCarDialog = (type, data) => {
    const addCarDialog = { ...this.state.addCarDialog };
    addCarDialog.open = true;
    addCarDialog.type = type;
    if (data) {
      addCarDialog.data = data;
    }
    this.setState({ addCarDialog });
  };

  closeCarDialog = () => {
    const addCarDialog = { ...this.state.addCarDialog };
    addCarDialog.open = false;
    this.setState({ addCarDialog });
  };

  render() {
    const { classes } = this.props;
    let cars = <CircularProgress color="secondary" size={100} />;
    const { nominations, error, allCars } = this.props.appData;
    if (nominations && !error) {
      cars = nominations
        .filter(nom => {
          return (
            nom !== "Design" &&
            nom !== "Price / Quality" &&
            nom !== "Best Crossover / SUV 2018" &&
            nom !== "Best Car 2018"
          );
        })
        .map((nom, index) => {
          return (
            <div id={this.props.navId[index]} key={nom}>
              <h1>{nom}</h1>
              <div className={classes.Nominations}>
                {allCars[nom].map(car => {
                  return (
                    <CarCard
                      key={car.id}
                      user={this.props.user}
                      page="EditCars"
                      car={car}
                      openCarDialog={this.openCarDialog}
                    />
                  );
                })}
              </div>
            </div>
          );
        });
    }

    return (
      <div style={{ padding: "40px" }}>
        <React.Fragment>
          {cars}
          {this.state.addCarDialog.open ? (
            <FullScreenDialog
              type="Add car"
              open={this.state.addCarDialog.open}
              settings={this.state.addCarDialog}
              close={this.closeCarDialog}
            />
          ) : null}
        </React.Fragment>
        <div className={classes.addCarButton}>
          <Button
            variant="fab"
            color="primary"
            aria-label="add"
            onClick={() => this.openCarDialog("add")}
          >
            <Add />
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EditCars);

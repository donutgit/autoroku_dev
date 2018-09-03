import React, { PureComponent } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import CarCard from "../CarCard/CarCard";

const styles = theme => ({
  root: {
    padding: "40px"
  },
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
  render() {
    const { classes } = this.props;
    const { nominations, poll, error } = this.props.data;
    //filter nominations
    let filteredNominations = [];
    if (nominations && !error) {
      filteredNominations = nominations.filter(nom => {
        return (
          nom.nomination !== "Design" &&
          nom.nomination !== "Price / Quality" &&
          nom.nomination !== "Best Crossover / SUV 2018" &&
          nom.nomination !== "Best Car 2018"
        );
      });
    }

    return (
      <div className={classes.root}>
        {filteredNominations && poll && !error ? (
          filteredNominations.map((nom, index) => {
            return (
              <div id={this.props.navId[index]} key={nom.nomination}>
                <h1>{nom.nomination}</h1>
                <div className={classes.Nominations}>
                  {poll[nom.nomination].map(car => {
                    return <CarCard key={car._id} car={car} />;
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <CircularProgress color="secondary" size={100} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(EditCars);

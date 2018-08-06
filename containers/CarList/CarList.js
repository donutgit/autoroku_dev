import React, { PureComponent } from "react";
import AppDataContext from "../../hoc/AppDataContext";
//mui
import Grid from "@material-ui/core/Grid";
import CarPollNavigation from "../../components/CarListComp/CarPollNavigation";
import EditCars from "../../components/CarListComp/EditCars";
import classes from "./CarList.css";
import AuthUserContext from "../../hoc/AuthUserContext";

const navList = {
  label: [
    "Small Class",
    "Economy",
    "Compact",
    "Buisness",
    "Lux",
    "Coupe / Sport",
    "Electric / Hybrid",
    "Crossover",
    "SUV"
  ],
  hash: [
    "small-class",
    "economy",
    "compact",
    "buisness",
    "lux",
    "coupe-sport",
    "electric-hybrid",
    "crossover",
    "suv"
  ]
};

class CarPoll extends PureComponent {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <section className={classes.Root}>
            <div className={classes.Wrapper}>
              <CarPollNavigation nav={navList} />
              <AuthUserContext>
                {({ userProfile }) => (
                  <AppDataContext.Consumer>
                    {({ state }) => (
                      <EditCars user={userProfile} appData={state} navId={navList.hash} />
                    )}
                  </AppDataContext.Consumer>
                )}
              </AuthUserContext>
            </div>
          </section>
        </Grid>
      </Grid>
    );
  }
}

export default CarPoll;

import React from "react";
import AppDataContext from "../../hoc/AppDataContext";
//mui
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import CarInfo from "../../components/CarLanding/CarLanding";
import classes from "./CarLandingPage.css";


const CarLandingPage = props => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <section className={classes.Root}>
          <div className={classes.Wrapper}>
            <AppDataContext.Consumer>
              {({ state }) => {
                let carInfo = <CircularProgress color="secondary" size={100} />;

                if (!state.error) {
                  const id = props.match.params.id;
                  const car = state.pureData[id];
                  carInfo = <CarInfo car={car} />;
                }

                return <div className={classes.Content}>{carInfo}</div>;
              }}
            </AppDataContext.Consumer>
            <Button
              variant="raised"
              size="small"
              color="primary"
              onClick={props.history.goBack}
              style={{ marginTop: "auto", bottom: "10px" }}
            >
              Back
            </Button>
          </div>
        </section>
      </Grid>
    </Grid>
  );
};

export default CarLandingPage;

import React from "react";
import AppDataContext from "../../hoc/AppDataContext";
//mui
import CircularProgress from "@material-ui/core/CircularProgress";
import Charts from "../../components/Charts/Charts";

import classes from "./ChartsPage.css";

const ChartsPage = props => (
  <div className={classes.Root}>
    <div className={classes.Wrapper}>
      <h1>Charts</h1>
      <div className={classes.Content}>
        <AppDataContext.Consumer>
          {({ state }) => {
            let cars = (
              <CircularProgress
                color="secondary"
                size={100}
                style={{ margin: "auto" }}
              />
            );
            const { nominations, allCars, error } = state;

            if (!error) {
              cars = nominations.map((nom, index) => {
                //SORT DATA BY VOTES
                const sortedCars = allCars[nom].sort(function(a, b) {
                  if (a.votes > b.votes) {
                    return 1;
                  }
                  if (a.votes < b.votes) {
                    return -1;
                  }
                  // a должно быть равным b
                  return 0;
                });

                return <Charts key={nom} nomination={nom} cars={sortedCars} />;
              });
            }
            return cars;
          }}
        </AppDataContext.Consumer>
      </div>
    </div>
  </div>
);

export default ChartsPage;

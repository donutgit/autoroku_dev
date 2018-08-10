import React, { Component } from "react";
// import AppDataContext from "../../../hoc/AppDataContext";
import Spinner from "../../UI/Spinner/Spinner";
import CarsSelect from "./CarsSelect";
import MongoContext from "../../../hoc/MongoContext";

class Cars extends Component {
  render() {
    return (
      <div>
        <MongoContext.Consumer>
          {({ state: { cars, error } }) => {
            if (cars && !error) {
              return <CarsSelect cars={cars} />;
            }
            return <Spinner />;
          }}
        </MongoContext.Consumer>
      </div>
    );
  }
}

export default Cars;

import React from "react";
import AppDataContext from "./AppDataContext";
import { getInitialData } from "../queries";

const withMongoData = Component =>
  class WithMongo extends React.PureComponent {
    state = {
      nominations: [],
      cars: [],
      poll: [],
      error: true
    };

    getAllData() {
      getInitialData().then(res => {
        console.log(res);
        if (res) {
          this.setState({
            nominations: res.nominations,
            cars: res.cars,
            poll: res.poll,
            error: false
          });
        }
      });
    }

    componentWillMount() {
      // ------------MONGO DB---------------
      this.getAllData();
    }

    render() {
      console.log("[MONGO DATA HOC]", this.state);
      return (
        <AppDataContext.Provider value={this.state}>
          <Component />
        </AppDataContext.Provider>
      );
    }
  };

export default withMongoData;

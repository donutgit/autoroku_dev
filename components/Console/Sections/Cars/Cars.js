import React, { Component } from "react";
import CarsSelect from "./CarsSelect";
import Spinner from "../../../UI/Spinner/Spinner";
//query
import { getCars, addCar, updateCar, deleteCar } from "../../../../queries";

class Cars extends Component {
  state = {
    cars: {},
    error: true
  };

  onInit = () => {
    getCars().then(res => {
      if (res.data) {
        this.setState({
          cars: res.data,
          error: false
        });
      }
    });
  };

  onAdd = (data) => {
    addCar(data).then(res => {
      this.onInit();
    });
  };

  onUpdate = (id, data) => {
    updateCar(id, data).then(res => {
      this.onInit();
    });
  };

  onDelete = id => {
    deleteCar(id).then(res => {
      this.onInit();
    });
  };


  componentDidMount() {
    this.onInit();
  }

  render() {
    return this.state.cars && !this.state.error ? (
      <CarsSelect
        cars={this.state.cars}
        onAdd={this.onAdd}
        onUpdate={this.onUpdate}
        onDelete={this.onDelete}
      />
    ) : (
      <Spinner />
    );
  }
}

export default Cars;

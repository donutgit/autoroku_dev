import React from "react";
import axios from "axios";
import MongoContext from "./MongoContext";

function getNom() {
  return axios.get("http://localhost:3001/api/nominations");
}

function getCars() {
  return axios.get("http://localhost:3001/api/cars");
}
function getVotes() {
  return axios.get("http://localhost:3001/api/votes");
}
const withMongo = Component =>
  class WithMongo extends React.PureComponent {
    state = {
      nominations: [],
      cars: [],
      votes: [],
      error: true
    };

    componentWillMount() {
      // ------------MONGO DB---------------
      axios.all([getNom(), getCars(), getVotes()]).then(
        axios.spread((nom, cars, votes) => {
          
          const poll = {};
          nom.data.forEach(item => {
            poll[item.nomination] = cars.data.filter(car => {
              return car.nominations.includes(item.nomination);
            });
          });

          this.setState({
            nominations: nom.data,
            poll: poll,
            cars: cars.data,
            votes: votes.data,
            error: false
          });
        })
      );
    }

    render() {
      console.log("[MONGO DATA HOC]", this.state);
      return (
        <MongoContext.Provider
          value={{
            state: this.state
          }}
        >
          <Component />
        </MongoContext.Provider>
      );
    }
  };

export default withMongo;

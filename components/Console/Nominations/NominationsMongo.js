import React, { Component } from "react";
import axios from "axios";
//mui
import Spinner from "../../UI/Spinner/Spinner";
import MongoContext from "../../../hoc/MongoContext";
import NominationsTable from "./NominationsTable";

class NominationsMongo extends Component {
  state = {
    nominations: []
  };

  // componentDidMount() {
  //   // axios.get("http://localhost:3001/api/nominations").then(res => {
  //   //   this.setState({ nominations: res.data });
  //   // });
  //   axios.get("http://localhost:3001/api/data").then(res => console.log(res))
  // }
  render() {
    return (
      <MongoContext.Consumer>
      {({ state: { nominations, poll, error } }) => {
        if (nominations && poll && !error) {
          const noms = []
          nominations.forEach(item => {
            noms.push(item.nomination)
          })
          return <NominationsTable nominations={noms} cars={poll} />;
        }
        return <Spinner />;
      }}
      </MongoContext.Consumer>
    );
  }
}

export default NominationsMongo;

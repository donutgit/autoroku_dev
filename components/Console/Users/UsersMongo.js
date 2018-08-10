import React, { Component } from "react";
import axios from "axios";
import Spinner from "../../UI/Spinner/Spinner";
import UsersList from "./UsersList";

class Users extends Component {
  state = {
    users: null
  };

  componentDidMount() {
    axios.get("http://localhost:3001/users").then(res => {
      this.setState({ users: res.data });
    });
  }

  render() {
    const { users } = this.state;
    return users ? (
      users.map(user => <UsersList key={user._id} user={user} />)
    ) : (
      <Spinner />
    );
  }
}

export default Users;

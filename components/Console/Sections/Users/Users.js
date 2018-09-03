import React, { Component } from "react";
import Spinner from "../../../UI/Spinner/Spinner";
import UsersList from "./UsersList";
//query
import { getUsers, deleteUser } from "../../../../queries";

class Users extends Component {
  state = {
    users: null
  };

  onInit = () => {
    getUsers().then(res => {
      this.setState({ users: res.data });
    });
  };

  onDelete = id => {
    deleteUser(id).then(res => {
      this.onInit();
    });
  };

  componentDidMount() {
    this.onInit();
  }

  render() {
    const { users } = this.state;
    return users ? (
      users.map(user => (
        <UsersList key={user._id} user={user} onDelete={this.onDelete} />
      ))
    ) : (
      <Spinner />
    );
  }
}

export default Users;

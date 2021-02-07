import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../action/user";

@connect(
  // mapStateToProps
  ({ user }) => ({ user }),
  // mapDispatchToProps
  { logout }
)
class UserPage extends Component {
  render() {
    const { user, logout } = this.props;
    const { id, name, score } = user.userInfo;
    console.log("UserPage", user.userInfo);
    return (
      <div>
        <h3>UserPage</h3>
        <p>id: {id}</p>
        <p>name: {name}</p>
        <p>score: {score}</p>
        <button onClick={logout}>logout</button>
      </div>
    );
  }
}
export default UserPage;

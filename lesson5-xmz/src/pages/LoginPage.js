import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../action/user";

@connect(
  ({ user }) => ({
    isLogin: user.isLogin,
    err: user.err,
    loading: user.loading
  }),
  // mapDispatchToProps
  {
    login
  }
)
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  onChange = e => {
    this.setState({ name: e.target.value });
  };
  render() {
    const { isLogin, location, login, err, loading } = this.props;
    const { redirect = "/" } = location.state || {};
    if (isLogin) {
      return <Redirect to={redirect} />;
    }

    console.log("isLogin", this.props);

    const { name } = this.state;
    return (
      <div>
        <h3>LoginPage</h3>
        <input value={name} onChange={this.onChange} />
        <p className="red">{err.msg}</p>
        <button onClick={() => login({ name })}>
          {loading ? "loading..." : "login"}
        </button>
      </div>
    );
  }
}
export default LoginPage;

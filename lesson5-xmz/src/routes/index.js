import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";
import _404Page from "../pages/_404Page";
import PrivateRoute from "./PrivateRoute";

export const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage
  },
  {
    path: "/user",
    component: UserPage,
    auth: PrivateRoute
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    component: _404Page
  }
];

function Routes(props) {
  return (
    <Router>
      <Link to="/">首页</Link>
      <Link to="/user">用户中心</Link>
      <Link to="/login">登录</Link>

      <Switch>
        {/* {routes.map(props => {
          if (props.auth) {
            const { auth, ...restProps } = props;
            return <PrivateRoute {...restProps} />;
          } else {
            return <Route {...props} />;
          }
        })} */}
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/user" component={UserPage} />
        <Route component={_404Page} />
      </Switch>
    </Router>
  );
}
export default Routes;

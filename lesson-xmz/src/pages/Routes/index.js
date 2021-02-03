import React from "react";
// import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import {
  BrowserRouter as Router,
  Link,
  Route
} from "../../store/kreactrouterdom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import UserPage from "./UserPage";
import ProductPage from "./ProductPage";

function RouterPage() {
  return (
    <div className="routerApp">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Link to="/product/123">商品</Link>

        {/* 独占路由 */}
        {/* <Switch> */}
        <Route
          path="/"
          exact
          //   children={children}
          component={HomePage}
          //   render={render}
        />
        <Route path="/user" component={UserPage} />
        <Route path="/login" component={LoginPage} />
        {/* <Route path="/product/:id" component={ProductPage} /> */}
        <Route render={() => <h3>404 not found</h3>} />
        {/* </Switch> */}
      </Router>
    </div>
  );
}
export default RouterPage;

// route渲染：children>component>render
// eslint-disable-next-line
function children(props) {
  console.log("children props", props);
  return <div>children</div>;
}

// eslint-disable-next-line
function render(props) {
  console.log("render props", props);
  return <div>render</div>;
}

import React from "react";
import { Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...restProps }) {
  return <Route {...restProps} render={props => <Component {...props} />} />;
}
export default PrivateRoute;

import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

// 路由守卫
function PrivateRoute({ isLogin, component: Component, ...restProps }) {
  // render props接收路由参数location,hsitory,match...
  return (
    <Route
      {...restProps}
      render={props =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { redirect: props.location.pathname }
            }}
          />
        )
      }
    />
  );
}
export default connect(
  // mapStateToProps
  ({ user }) => ({ isLogin: user.isLogin })
)(PrivateRoute);

import LoginService from "../service/login";

// 同步
// export const login = useInfo => ({ type: "LOGIN_SUCCESS", payload: useInfo });

// ! 异步解决方案
/**
 * 方案1：使用中间件redux-thunk
 * 优点：使用简单
 * 缺点：容易陷入嵌套地狱
 */
export const login = useInfo => dispatch => {
  dispatch({ type: "REQUEST" });
  LoginService.login(useInfo).then(
    res => {
      dispatch({ type: "LOGIN_SUCCESS", payload: res });
    },
    err => {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  );
};

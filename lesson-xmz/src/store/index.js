// import { createStore, applyMiddleware, combineReducers } from "redux";
import { createStore, applyMiddleware, combineReducers } from "./kredux";
// import thunk from "redux-thunk"; // 处理异步
// import logger from "redux-logger"; // 打印日志

export function countReducer(state = 0, { type, payload }) {
  switch (type) {
    case "ADD":
      return state + payload;
    case "MINUS":
      return state - payload;
    default:
      return state;
  }
}

const store = createStore(
  // countReducer,
  combineReducers({ count: countReducer }), // 多个reducer处理
  applyMiddleware(thunk, logger)
);

// 手写一个thunk，处理异步的thunk
function thunk({ getState, dispatch }) {
  // 返回函数相当于applyMiddleware里的middlewareChain
  return next => action => {
    // next就像当于store.dispatch
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

// 手写一个logger，打印日志
function logger({ getState, dispatch }) {
  return next => action => {
    console.log("---------------");
    console.log(action.type + "执行了");
    const preState = getState();
    console.log("pre state", preState);

    const returnValue = next(action);
    const nextState = getState();

    console.log("next state", nextState);

    console.log("---------------");
    return returnValue;
  };
}

export default store;

// import { createStore } from "redux";
import { createStore } from "./kredux";

function countReducer(state = 0, { type, payload }) {
  switch (type) {
    case "ADD":
      return state + payload;
    case "MINUS":
      return state - payload;
    default:
      return state;
  }
}

const store = createStore(countReducer);

export default store;

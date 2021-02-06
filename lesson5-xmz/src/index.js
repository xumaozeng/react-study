import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/**
 * function与函数之间有个*
 * yield只能用在generator内部
 */
/* function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}

const hw = helloWorldGenerator();

console.log("hw", hw);
console.log("hw-0", hw.next());
console.log("hw-1", hw.next());
console.log("hw-2", hw.next()); */

/* var a = 0;
function* fun() {
  let aa = yield (a = 1 + 1);
  console.log("aa", aa);
  return aa;
}

console.log("fun0", a);
let b = fun();
console.log("fun", b.next());
console.log("fun1", a);
console.log("fun2", b.next()); */

export default function createStore(reducer) {
  let currentState; // 初始为null 默认值没有作用(state为undefined走default,内部采用严格相等模式)
  let currentListeners = [];

  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach(listener => listener());
  }
  function subscribe(listener) {
    currentListeners.push(listener);
  }

  // state默认值
  dispatch({ type: "REDUXXXXXXX" });
  return {
    getState,
    dispatch,
    subscribe
  };
}

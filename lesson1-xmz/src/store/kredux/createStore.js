export default function createStore(reducer) {
  let currentState; // 初始为null 默认值没有作用(state为undefined走default,内部采用严格相等模式)
  let currentListeners = [];

  // get
  function getState() {
    return currentState;
  }

  // set
  function dispatch(action) {
    currentState = reducer(currentState, action);
    // state改变，执行订阅的函数
    currentListeners.forEach(listener => listener());
  }

  // 订阅和取消订阅要成对出现
  function subscribe(listener) {
    currentListeners.push(listener);
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  // state默认值
  dispatch({ type: "REDUXXXXXXX" });
  return {
    getState,
    dispatch,
    subscribe
  };
}

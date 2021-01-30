export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer); // 得到store

    // 普通版的dispatch
    let dispatch = store.dispatch;

    // todo 加强版的dispatch
    let midAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args) // 每个中间件都有自己的作用域
    };

    // 执行中间件数组
    const middlewareChain = middlewares.map(middleware => middleware(midAPI));

    // 用compose组合函数按顺序执行，得到加强版的dispatch
    dispatch = compose(...middlewareChain)(store.dispatch);

    return { ...store, dispatch };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

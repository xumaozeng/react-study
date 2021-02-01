import React, { useCallback, useContext, useLayoutEffect } from "react";

// Provider API
// React跨层级数据传递 context
// 1.创建context对象
const Context = React.createContext();

// 2.Provider传递value
export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// 3.子组件消费context value
// 消费方式有三种：
// contextType(只能用在类组件，且订阅单一的context来源)
// useContext(只能用在函数组件中以及自定义hook中)
// consumer(没什么限制，只是步骤繁琐)
export const connect = (
  mapStateToProps, // function
  mapDispatchToProps // object|function
) => WrappedComponent => props => {
  // 获取store
  const store = useContext(Context);
  const { getState, dispatch, subscribe } = store;
  const stateProps = mapStateToProps(getState());
  let dispatchProps = { dispatch }; // 默认
  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  }

  // 订阅state的变更
  // 函数组件的forceUpdate
  // const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  // const [, forceUpdate] = React.useState({});
  const forceUpdate = useForceUpdate();

  // useEffect DOM更新　effect延迟执行
  // useLayoutEffect DOM更新 effect立马执行
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      // 如果state改变，则更新组件
      forceUpdate();
    });
    return () => {
      // 组件将要卸载之前取消订阅
      unsubscribe();
    };
    // eslint-disable-next-line
  }, [store]);

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};

export function bindActionCreators(creators, dispatch) {
  let obj = {};

  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}

// bindActionCreators API
function bindActionCreator(creator, dispatch) {
  // 保存redux状态管理库的状态，dispatch(action)
  return (...args) => dispatch(creator(...args));
}

// 方法1：const [, forceUpdate] = React.useReducer(x => x + 1, 0);
// 方法2：const [, forceUpdate] = React.useState({});
// 方法3：自定义hooks-forceUpdate
function useForceUpdate() {
  /*eslint-disable-next-line */
  const [state, setState] = React.useState(0);
  // 使用useCallback做缓存函数
  const update = useCallback(() => setState(prev => prev + 1), []);
  return update;
}

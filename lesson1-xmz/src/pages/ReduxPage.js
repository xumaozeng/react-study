import React, { Component } from "react";
import store from "../store";

class ReduxPage extends Component {
  componentDidMount() {
    // store发生变化之后，执行subscribe的监听函数
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    // 组件卸载之前，取消订阅
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  add = () => {
    store.dispatch({ type: "ADD", payload: 100 });
  };
  render() {
    console.log(store);
    return (
      <div>
        <h3>ReduxPage</h3>
        <div>{store.getState()}</div>
        <button onClick={this.add}>add</button>
      </div>
    );
  }
}
export default ReduxPage;

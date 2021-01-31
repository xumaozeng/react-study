import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ReactReduxPage extends Component {
  render() {
    console.log("props", this.props);
    const { count, dispatch, add, minus } = this.props;
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{count}</p>
        <button onClick={() => dispatch({ type: "ADD", payload: 15 })}>
          dispatch add
        </button>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    );
  }
}

// hoc是个函数，接收组件作为参数，返回一个新的组件
// connect原理 高阶组件(hoc)
// mapStateToProps(function)把state map(映射) props上一份
const mapStateToProps = ({ count }) => ({ count });

// mapDispatchToProps(function|object)把方法映射到 props上一份
const mapDispatchToProps =
  /* {
  // object，不传参默认dispatch
  add: () => ({ type: "ADD", payload: 12 }),
  minus: () => ({ type: "MINUS", payload: 2 })
}; */
  // function
  dispatch => {
    let creators = {
      add: () => ({ type: "ADD", payload: 12 }),
      minus: () => ({ type: "MINUS", payload: 2 })
    };
    creators = bindActionCreators(creators, dispatch);
    return { dispatch, ...creators };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxPage);

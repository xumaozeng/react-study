// import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "./kreact/react-dom";
import Component from "./kreact/Component";
import "./index.css";

function FunctionComponent(props) {
  return (
    <div className="border">
      <p>函数组件{props.name}</p>
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <p>{this.props.name}</p>
      </div>
    );
  }
}

/* function FragmentComponent(props) {
  return [1, 2, 3].map(item => <h1>哈哈</h1>);
} */

const jsx = (
  <div className="border">
    <h1>React原理解析-01</h1>
    <a href="https://www.kaikeba.com">kkb</a>
    <FunctionComponent name="function" />
    <ClassComponent name="class" />
    {/* <FragmentComponent /> */}
    <>
      <h2>哈哈</h2>
      <h3>呵呵</h3>
    </>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log(React.version);
// 文本节点
// 原生标签
// 函数组件
// 类组件
// <>&&Fragment组件

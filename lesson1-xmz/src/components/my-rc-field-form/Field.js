import React, { Component } from "react";
import FieldContext from "./FieldContext";

class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    // 注册组件实例
    // 注册和取消注册要成对出现、订阅也一样
    // 返回一个取消注册函数
    this.unRegister = this.context.setFieldEntities(this);

    this.getRules();
  }

  componentWillUnmount() {
    // 取消注册
    if (this.unRegister) {
      this.unRegister();
    }
  }

  // 存取rules
  getRules = () => {
    const { name, rules } = this.props;
    const { setRules } = this.context;
    setRules({ [name]: rules });
  };

  onStoreChange = () => {
    // 强制更新组件
    this.forceUpdate();
  };

  getControlled = () => {
    const { name } = this.props;
    const { getFieldValue, setFieldsValue } = this.context;
    return {
      value: getFieldValue(name), // get
      onChange: e => {
        // set
        const newValue = e.target.value;
        setFieldsValue({ [name]: newValue });
        console.log("newValue", newValue);
      }
    };
  };
  render() {
    const { children } = this.props;
    // 克隆组件，给其加一些属性在返回，使Field=>Input变成受控组件
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
export default Field;

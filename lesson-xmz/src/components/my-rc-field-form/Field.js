import React, { Component } from "react";
import FieldContext from "./FieldContext";

class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    // 注册组件实例
    // 注册和取消注册要成对出现、订阅也一样
    // 返回一个取消注册函数
    this.unRegister = this.context.setFieldEntities(this);
  }

  componentWillUnmount() {
    // 取消注册
    if (this.unRegister) {
      this.unRegister();
    }
  }

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

// function Field(props) {
//   // 获取context对象
//   const fieldContext = useContext(FieldContext);
//   const [, forceUpdate] = useReducer();
//   const formRef = useRef();

//   useEffect(() => {
//     console.log(formRef);
//     const unRegister = fieldContext.setFieldEntities(formRef.current);

//     return () => {
//       unRegister();
//     };
//   });
//   /* eslint-disable-next-line*/
//   function onStoreChange() {
//     // 强制更新组件
//     // this.forceUpdate(); // hook中替换
//     forceUpdate();
//   }

//   function getControlled() {
//     const { name } = props;
//     const { getFieldValue, setFieldsValue } = fieldContext;
//     return {
//       value: getFieldValue(name), // get
//       onChange: e => {
//         // set
//         const newValue = e.target.value;
//         setFieldsValue({ [name]: newValue });
//         console.log("newValue", newValue);
//       },
//       ref: formRef
//     };
//   }
//   const { children } = props;
//   // 克隆组件，给其加一些属性在返回，使Field=>Input变成受控组件
//   const returnChildNode = React.cloneElement(children, getControlled());
//   return returnChildNode;
// }
export default Field;

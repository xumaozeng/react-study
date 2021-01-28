import React from "react";

class FormStore {
  constructor() {
    this.store = {}; // 数据仓库
    this.fieldEntities = []; // 组件实例数组
    this.callbacks = {}; // 保存成功和失败回调函数
    this.rules = {}; // 校验信息
  }

  // 存取rules
  setRules = newRules => {
    this.rules = {
      ...this.rules,
      ...newRules
    };
  };

  // 存取回调函数-成功或失败
  setCallbacks = newCallbacks => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks
    };
  };

  // 存取组件实例
  setFieldEntities = field => {
    this.fieldEntities.push(field);
    return () => {
      // 取消注册
      this.fieldEntities = this.fieldEntities.filter(f => f !== field);
      // 删除数据仓库里的数据
      delete this.store[field.props.name];
    };
  };

  // get
  getFieldsValue = () => {
    return { ...this.store };
  };

  getFieldValue = name => {
    return this.store[name];
  };

  // set
  setFieldsValue = newStore => {
    // 'name':'value'
    // 更新数据仓库
    this.store = {
      ...this.store,
      ...newStore
    };

    // 更新组件
    // forceUpdate
    this.fieldEntities.forEach(field => {
      // 更新对应name上的field，而不是每次都全部更新
      Object.keys(newStore).forEach(k => {
        if (k === field.props.name) {
          field.onStoreChange();
        }
      });
    });
  };

  // 校验
  validate = () => {
    let err = [];
    // todo 实现基础校验，比如只要输入了信息就通过
    for (let fieldName in this.rules) {
      if (this.store[fieldName] === undefined) {
        err.push({
          [fieldName]: this.rules[fieldName][0].message
        });
      }
    }
    return err;
  };

  // 提交事件
  submit = () => {
    const err = this.validate();
    const { onFinish, onFinishFailed } = this.callbacks;
    console.log("submit");

    if (err.length === 0) {
      // 校验成功onFinish
      onFinish(this.getFieldsValue());
    } else {
      // 校验失败onFinishFailed
      onFinishFailed(err, this.getFieldsValue());
    }
  };

  // 给用户的暴露的API
  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      setFieldEntities: this.setFieldEntities,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
      setRules: this.setRules
    };
  };
}

function useForm(props) {
  // 保证始终用到同一个对象
  const formRef = React.useRef();
  if (!formRef.current) {
    const forStore = new FormStore();
    formRef.current = forStore.getForm();
  }
  return [formRef.current];
}

export default useForm;

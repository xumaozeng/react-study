import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";

function Form({ children, onFinish, onFinishFailed, form }) {
  const [formInstance] = useForm(form);

  // 存取回调函数-成功和失败
  formInstance.setCallbacks({ onFinish, onFinishFailed });

  return (
    <form
      onSubmit={e => {
        e.preventDefault(); // 取消默认
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
export default Form;

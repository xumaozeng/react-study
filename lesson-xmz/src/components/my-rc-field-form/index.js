// import React from "react";
import _Form from "./Form";
import Field from "./Field";
import useForm from "./useForm";

const Form = _Form; // React.forwardRef(_Form)  // 使用类组件要转化的组件实例;
Form.Field = Field;
Form.useForm = useForm;

export { Field, useForm };
export default Form;

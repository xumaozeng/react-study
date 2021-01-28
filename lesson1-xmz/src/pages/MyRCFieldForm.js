import React, { useEffect } from "react";
import Form, { Field } from "../components/my-rc-field-form";
import Input from "../components/Input";

const nameRules = { required: true, message: "请输入姓名！" };
const passwordRules = { required: true, message: "请输入密码！" };

function MyRCFieldForm() {
  const [form] = Form.useForm();
  // 表单校验成功执行
  const onFinish = val => {
    console.log("onFinish", val);
  };
  // 表单校验失败执行
  const onFinishFailed = val => {
    console.log("onFinishFailed", val);
  };

  useEffect(() => {
    console.log("form", form);
    form.setFieldsValue({ username: "default" }); // 设置初始值
  });
  return (
    <div>
      <h3>MyRCFieldForm</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]}>
          <Input placeholder="输入用户名" />
        </Field>
        <Field name="password" rules={[passwordRules]}>
          <Input placeholder="输入密码" />
        </Field>
        <button>Submit</button>
      </Form>
    </div>
  );
}
export default MyRCFieldForm;


// antd3 form 存到了form state中
// antd4 form 存到了一个数据仓库 set存 get取值

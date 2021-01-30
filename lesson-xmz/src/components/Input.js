import React from "react";

const Input = props => {
  return <input {...props} />;
};

const CustomizeInput = ({ value = "", ...props }) => (
  <div style={{ paddingBottom: 10 }}>
    <Input style={{ outline: "none" }} value={value} {...props} />
  </div>
);

export default CustomizeInput;

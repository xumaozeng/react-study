import React from "react";
import FieldContext from "./FieldContext";

function Form({ children }) {
  return <FieldContext.Provider>{children}</FieldContext.Provider>;
}
export default Form;

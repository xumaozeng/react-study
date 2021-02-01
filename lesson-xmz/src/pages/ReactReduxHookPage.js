import React, { useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "../store/kreactredux/kReactRedux";

function ReactReduxHookPage() {
  const dispatch = useDispatch(); // useDispatch获取dispatch

  const add = useCallback(() => {
    dispatch({ type: "ADD", payload: 2 });
    // eslint-disable-next-line
  }, []);
  const count = useSelector(({ count }) => count); // useSelector获取store state
  return (
    <div>
      <h3>ReactReduxHookPage</h3>
      <p>{count}</p>
      <button onClick={add}>add</button>
    </div>
  );
}
export default ReactReduxHookPage;

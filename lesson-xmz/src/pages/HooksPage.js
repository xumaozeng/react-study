import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { countReducer } from "../store";

const init = initArg => initArg - 0;

function HooksPage() {
  const [state, dispatch] = useReducer(countReducer, "1", init);
  // ! 与useState有何不同
  const [count, setCount] = useState(0);
  // useReducer适合修改逻辑相对复杂的state，并且还可以复用reducer

  // 类比componentDidMount,componentDidUpdate,componentWillUnMount
  useEffect(() => {
    console.log("useEffect");
    return () => {
      console.log("will un mount");
    };
  }, [state]); // []不依赖任何数据项，只在初始化和卸载时调用

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
  }, []);

  return (
    <div>
      <h3>HooksPage</h3>
      <p>{state}</p>
      <button onClick={() => dispatch({ type: "ADD", payload: 30 })}>
        click
      </button>

      <button onClick={() => setCount(count + 1)}>
        click add count {count}
      </button>
    </div>
  );
}
export default HooksPage;

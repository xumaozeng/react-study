// import MyRCFieldForm from "./pages/MyRCFieldForm";
// import ReduxPage from "./pages/ReduxPage";

import { useState } from "react";
import HooksPage from "./pages/HooksPage";

function App() {
  const [count, setCount] = useState(1);
  return (
    <div>
      {/* <MyRCFieldForm /> */}
      {/* <ReduxPage /> */}
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {count % 2 && <HooksPage />}
    </div>
  );
}

export default App;

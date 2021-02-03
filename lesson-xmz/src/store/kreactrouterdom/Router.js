import { useEffect, useState } from "react";
import RouterContext from "./RouterContext";

function computeRootMatch(pathname) {
  return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
}

function Router(props) {
  const { children, history } = props;
  const [location, setLocation] = useState(history.location);

  // 监听location变化
  const unlisten = history.listen(({ location }) => {
    setLocation(location);
  });

  useEffect(() => {
    // 取消监听
    return () => {
      unlisten();
    };
  });

  return (
    <RouterContext.Provider
      value={{ history, location, match: computeRootMatch(location.pathname) }}
    >
      {children}
    </RouterContext.Provider>
  );
}
export default Router;

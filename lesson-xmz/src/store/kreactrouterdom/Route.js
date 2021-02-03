import React, { useContext } from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

function Route(props) {
  const context = useContext(RouterContext);
  const { location } = context;
  const { children, component, render, path, computedMatch } = props;
  const match = computedMatch
    ? computedMatch
    : path
    ? matchPath(location.pathname, props)
    : context.match; // location.pathname === path;

  const matchProps = { ...context, match };
  // match
  // 匹配children, component, render, null
  // 不匹配 children(function)
  // return match ? React.createElement(component) : null;
  return (
    <RouterContext.Provider value={matchProps}>
      {match
        ? children
          ? typeof children === "function"
            ? children(matchProps)
            : children
          : component
          ? React.createElement(component, matchProps)
          : render
          ? render(matchProps)
          : null
        : typeof children === "function"
        ? children(matchProps)
        : null}
    </RouterContext.Provider>
  );
}
export default Route;

import React from "react";
import matchPath from "./matchPath";
import RouterContext from "./RouterContext";

function Switch(props) {
  return (
    <RouterContext.Consumer>
      {context => {
        const { location } = context;
        const { children } = props;
        let match; // 标记匹配
        let element; // 标记匹配的元素
        // todo 遍历子元素
        // children

        React.Children.forEach(children, child => {
          if (match == null && React.isValidElement(child)) {
            element = child;
            match = child.props.path
              ? matchPath(location.pathname, child.props)
              : context.match;
          }
        });

        return match
          ? React.cloneElement(element, { computedMatch: match })
          : null;
      }}
    </RouterContext.Consumer>
  );
}
export default Switch;

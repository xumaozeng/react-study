import React, { Component } from "react";
import RouterContext from "./RouterContext";

function Prompt({ message, when = true }) {
  return (
    <RouterContext.Consumer>
      {context => {
        if (!when) return null;
        const method = context.history.block;

        return (
          <LifeCycle
            onMount={self => {
              self.release = method(message);
            }}
            onUnmount={self => {
              self.release();
            }}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}
export default Prompt;

class LifeCycle extends Component {
  componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
  }

  componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount.call(this, this);
  }

  render() {
    return null;
  }
}

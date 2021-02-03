import React, { Component } from "react";
import RouterContext from "./RouterContext";

function Redirect(props) {
  return (
    <RouterContext.Consumer>
      {context => {
        const { history } = context;
        const { to, push = false } = props;
        return (
          <LifeCycle
            onMount={() => {
              push ? history.push(to) : history.replace(to);
            }}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}
export default Redirect;

class LifeCycle extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount.call(this, this);
    }
  }
  render() {
    return null;
  }
}

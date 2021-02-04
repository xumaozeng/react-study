const { Component } = require("react");

class LifeCycle extends Component {
  componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount", this);
    if (this.props.onUnmount) this.props.onUnmount.call(this, this);
  }

  render() {
    return null;
  }
}

export default LifeCycle;

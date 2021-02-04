import { createBrowserHistory } from "history";
import { Component } from "react";
import Router from "./Router";

class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
  }
  render() {
    return <Router children={this.props.children} history={this.history} />;
  }
}

export default BrowserRouter;

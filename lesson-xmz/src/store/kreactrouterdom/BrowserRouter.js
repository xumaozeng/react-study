import { createBrowserHistory } from "history";
import Router from "./Router";

function BrowserRouter(props) {
  const history = createBrowserHistory();
  const { children } = props;
  return <Router children={children} history={history} />;
}
export default BrowserRouter;

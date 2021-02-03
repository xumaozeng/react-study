import React from "react";
import { Link, Route, useRouteMatch } from "../../store/kreactrouterdom";

function ProductPage() {
  // const [confirm, setConfirm] = useState(true);
  const match = useRouteMatch();
  console.log("match", match);
  const { params, url } = match;
  const { id } = params;
  return (
    <div>
      <h3>Product-{id}</h3>
      <Link to={url + "/detail"}>详情</Link>
      <Route path={url + "/detail"} component={Detail} />

      {/* <Prompt
        when={confirm}
        message={location => {
          return "Are you sure you want to leave-fun";
        }}
      /> */}
    </div>
  );
}
export default ProductPage;

function Detail({ match }) {
  console.log("match", match);
  return (
    <div>
      <h3>Detail</h3>
    </div>
  );
}

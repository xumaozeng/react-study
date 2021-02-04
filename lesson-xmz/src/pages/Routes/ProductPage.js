import React, { useState } from "react";
// import { Link, Route, useRouteMatch, Prompt } from "react-router-dom";
import {
  Link,
  Route,
  useRouteMatch,
  Prompt
} from "../../store/kreactrouterdom";

function ProductPage() {
  const [confirm, setConfirm] = useState(true);
  const match = useRouteMatch();
  console.log("match", match);
  const { params, url } = match;
  const { id } = params;
  return (
    <div>
      <h3>Product-{id}</h3>
      <button onClick={() => setConfirm(false)}>change</button>
      <Link to={url + "/detail"}>详情</Link>
      <Route path={url + "/detail"} component={Detail} />

      <Prompt
        when={confirm}
        message={location => {
          return "Are you sure you want to leave-fun";
        }}
      />
    </div>
  );
}
export default ProductPage;

function Detail(props) {
  console.log("detail", props);
  return (
    <div>
      <h3>Detail</h3>
    </div>
  );
}

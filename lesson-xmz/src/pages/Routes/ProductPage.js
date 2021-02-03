import React from "react";
import { Link, Route } from "react-router-dom";

function ProductPage({ match }) {
  console.log("match", match);
  const { params, url } = match;
  const { id } = params;
  return (
    <div>
      <h3>Product-{id}</h3>
      <Link to={url + "/detail"}>详情</Link>
      <Route path={url + "/detail"} component={Detail} />
    </div>
  );
}
export default ProductPage;

function Detail({ match }) {
  return (
    <div>
      <h3>Detail</h3>
    </div>
  );
}

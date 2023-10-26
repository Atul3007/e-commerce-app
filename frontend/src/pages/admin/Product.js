import React from "react";
import AdminMenu from "./../../components/layouts/AdminMenu";

const Product = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All products lists</h1>
        </div>
      </div>
    </div>
  );
};

export default Product;

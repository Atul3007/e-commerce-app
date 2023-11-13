import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div classname="text-center">
      <div className="list-group">
        <h1>Admin Pannel</h1>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          Create category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          Create products
        </NavLink>
        <NavLink
          to="/dashboard/admin/product"
          className="list-group-item list-group-item-action"
        >
           Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/user"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
        <NavLink
          to="/dashboard/admin/order"
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;

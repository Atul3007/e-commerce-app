import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div classname="text-center">
      <div className="list-group">
        <h1>Admin Pannel</h1>
        <navlink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          Create category
        </navlink>
        <navlink
          to="/dashboard/admin/create-products"
          className="list-group-item list-group-item-action"
        >
          Create products
        </navlink>
        <navlink
          to="/dashboard/admin/user"
          className="list-group-item list-group-item-action"
        >
          Users
        </navlink>
      </div>
    </div>
  );
};

export default AdminMenu;

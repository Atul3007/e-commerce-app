import React from "react";
import Layout from "./../../components/layouts/Layout";
import AdminMenu from './../../components/layouts/AdminMenu';

const Dashboard = () => {
  return (
    <Layout>
      <h1>Dashboard</h1>
      <AdminMenu/>
    </Layout>
  );
};

export default Dashboard;

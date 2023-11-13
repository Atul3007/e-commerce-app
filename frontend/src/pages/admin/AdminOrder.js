import React from 'react'
import Layout from './../../components/layouts/Layout';
import AdminMenu from './../../components/layouts/AdminMenu';

const AdminOrder = () => {
  return (
    <Layout>
        <div className="row" style={{margin:"20px"}}>
            <div className="col-md-3"><AdminMenu/></div>
            <div className="col-md-9 text-center"><h1>All Orders</h1></div>
        </div>
    </Layout>
  )
}

export default AdminOrder
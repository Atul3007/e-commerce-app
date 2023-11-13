import React, { useEffect, useState } from 'react'
import Layout from './../../components/layouts/Layout';
import AdminMenu from './../../components/layouts/AdminMenu';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import toast from 'react-hot-toast';

const AdminOrder = () => {
  
  const [orders,setOrders]=useState([]);
  const [auth,setAuth]=useAuth();

  const config = {
    headers: {
      Authorization: auth?.token,
      "Content-Type": "application/json",
    },
  };

  const allOrders=async()=>{
    try {
      const {data}=await axios.get("http://localhost:8000/api/product/all-order",config)
      setOrders(data.orders);
     // console.log(orders)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
   allOrders();
  },[])

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
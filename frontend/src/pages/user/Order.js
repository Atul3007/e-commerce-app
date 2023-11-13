import React, { useEffect } from 'react'
import UserMenu from '../../components/layouts/UserMenu'
import Layout from '../../components/layouts/Layout'
import axios from 'axios'
import { useAuth } from '../../context/Auth'

const Order = () => {
  const [auth,setAuth]=useAuth();
  const [orders,setOrders]=userState();

  const getOrder=async()=>{
    try {
      const {data}=await axios.get(`http://localhost:8000/api/product/your-order/${auth?.user?._id}`);
      setOrders(data)
      console.log(orders)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(auth?.token) getOrder();
  },[])

  return (
    <Layout >
    <div className='container-field'>
     <div className='row'>
       <div className='col-md-3'>
          <UserMenu/>
       </div>
       <div className='col-md-9'>
         <div className="card w-75 " style={{marginTop:'4%', padding:"20px"}}>
           <h4> All Orders</h4>
         </div>
       </div>
     </div>
   </div>
 </Layout>
  )
}

export default Order
import React from 'react'
import UserMenu from '../../components/layouts/UserMenu'
import Layout from '../../components/layouts/Layout'

const Order = () => {
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
import React from 'react'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../context/Auth'
import Layout from '../../components/layouts/Layout';

const Profile = () => {
    const [auth,setAuth]=useAuth();
  return (
    <Layout >
    <div className='container-field'>
     <div className='row'>
       <div className='col-md-3'>
          <UserMenu/>
       </div>
       <div className='col-md-9'>
         <div className="card w-75 " style={{marginTop:'4%', padding:"20px"}}>
           <h4> Your Profile </h4>
         </div>
       </div>
     </div>
   </div>
 </Layout>
  )
}

export default Profile
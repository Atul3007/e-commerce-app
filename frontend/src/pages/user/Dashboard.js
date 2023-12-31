import React from "react";
import Layout from "./../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import { useAuth } from "../../context/Auth";

const Dashboard = () => {
  const [auth,setAuth]=useAuth();
  return (
    <Layout>
        <div className='container-field'>
        <div className='row'>
          <div className='col-md-3'>
             <UserMenu/>
          </div>
          <div className='col-md-9'>
            <div className="card w-75 " style={{marginTop:'4%', padding:"20px"}}>
              <h4> Name : {auth?.user?.name}</h4>
              <h4> e-mail : {auth?.user?.email}</h4>
              <h4> contact : {auth?.user?.phone}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

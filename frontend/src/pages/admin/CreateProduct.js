import React from 'react'
import Layout from './../../components/layouts/Layout';
import AdminMenu from '../../components/layouts/AdminMenu';

const CreateProduct = () => {
  return (
      <Layout>
      <div className='container-field'>
        <div className='row'>
          <div className='col-md-3'>
             <AdminMenu/>
          </div>
          <div className='col-md-9'>
            <div className="card w-75 " style={{marginTop:'4%', padding:"20px"}}>
              <h4> CreateProducts</h4>
            </div>
          </div>
        </div>
      </div></Layout>
  )
}

export default CreateProduct
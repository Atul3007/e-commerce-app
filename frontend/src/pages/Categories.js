import React, { useEffect, useState } from 'react'
import Layout from './../components/layouts/Layout';
import { Link } from 'react-router-dom';
import useCategory from '../hooks/useCategory';

const Categories = () => {
    const categories=useCategory();
  return (
    <Layout>
     <div className="container">
        <h1 style={{textAlign:"center"}}>All Categories</h1>
        <div className="row">
            {categories.map((c)=>(
                <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                     <Link className="btn btn-success" to={`/category/${c.slug}`}>
                       {c.name}
                     </Link>
                </div>
            ))}
        </div>
     </div>
    </Layout>
  )
}

export default Categories
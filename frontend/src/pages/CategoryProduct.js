import React from 'react'
import Layout from '../components/layouts/Layout'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const {slug}=useParams();
  return (
    <Layout>
    <div>CategoryProduct</div>
    <h1>{slug}</h1>
    </Layout>
  )
}

export default CategoryProduct
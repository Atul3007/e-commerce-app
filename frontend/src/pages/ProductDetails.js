import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';


const ProductDetails = () => {
  const { pid } = useParams();
  const [product,setProduct]=useState([]);

  const getProduct=async ()=>{
    try {
      const {data}=await axios.get(`http://localhost:8000/api/product/get-single-product/${pid}`);
      setProduct(data?.message);
      
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(()=>{
    getProduct();
  },[])

  return (
    <Layout>
    <div>
      <h1>Product Details</h1>
      
    </div>
    </Layout>
  )
}


export default ProductDetails
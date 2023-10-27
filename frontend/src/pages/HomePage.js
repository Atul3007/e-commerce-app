import React, { useState,useEffect } from "react";
import Layout from "../components/layouts/Layout";
import { useAuth } from "../context/Auth";
import toast from "react-hot-toast";
import axios from 'axios';
import { Link } from "react-router-dom";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories,setCategories] = useState([]);

const getAllProducts=async()=>{
try {
  const {data}=await axios.get("http://localhost:8000/api/product/get-product");
  if(data){
   // console.log(data.message)
    setProducts(data.message)
  }
} catch (error) {
  console.log("error in getting products")
}
}

useEffect(()=>{
getAllProducts()
},[])

  return (
    <Layout>
      {/* {/* HomePage
    <pre>{JSON.stringify(auth,null,4)}</pre> */}
      <div className="row mt-3">
        <div className="col md-3">
          <h4 className="test-center">Filter by categories</h4>
        </div>
        <div className="col md-9">
          <h1 className="test-center">All Products</h1>
          <div className="d-felx felx-wrap">
            <h4>Products</h4>
            <div className="card-grid">
              {products?.map((p) => (
               <Link to={`/dashboard/admin/update-product/${p.slug}`} key={p._id} className="productLink"> 
                <div className="card" style={{ width: "18rem" }} >
                  <img
                    src={`http://localhost:8000/api/product/product-photo/${p._id}`}
                    className="card-img-top"
                    style={{width:"200px",height:"200px",marginLeft:"50px",marginTop:"20px"}}
                    alt="product_photo"
                  />
                  <div className="card-body" style={{marginLeft:"50px"}}>
                    <h5 className="card-title">Title : {p.name}</h5>
                    <h6 className="card-text">Description : {p.description}</h6>
                    <p className="card-text">Price : {p.price}</p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

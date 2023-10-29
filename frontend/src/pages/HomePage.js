import React, { useState, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import {Checkbox,Radio} from "antd"
import { Link } from "react-router-dom";
import { price } from "../components/Price";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([])

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/category/all"
      );
      setCategory(data.data);
     // console.log(category)
    } catch (error) {
      console.log(error);
      toast.error("error in getting category");
    }
  };

useEffect(()=>{
  getAllCategory();
},[])

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/product/get-product"
      );
      if (data) {
        // console.log(data.message)
        setProducts(data.message);
      }
    } catch (error) {
      console.log("error in getting products");
    }
  };

  useEffect(() => {
   getAllProducts();
  }, []);

  const handleFilter=async(status,id)=>{
    try {
      let all=[...checked];
     if(status){
      all.push(id);
     }else{
      all=all.filter((c)=>c !== id)
     }
     setChecked(all);
    } catch (error) {
      console.log(error);
    }
  }

  const filterData=async()=>{
    try {
      if(radio||checked){
      const {data}=await axios.post("http://localhost:8000/api/product/product-filter",{radio,checked});
      setProducts(data.product)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(checked.length!==0&&radio){filterData()}
    else{ getAllProducts()};
  },[radio,checked])

  return (
    <Layout>
      {/* {/* HomePage
    <pre>{JSON.stringify(auth,null,4)}</pre> */}
      <div className="row ">
        <div className="col-md-3">
          <h4 className="test-center">Filter by categories</h4>
          <div className="d-flex flex-column" style={{margin:"30px"}}>
          {category?.map((c)=>(
            <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>{c.name}</Checkbox>
          ))}
          </div>
          <h4 className="test-center mt-4">Filter by prices</h4>
          <div className="d-flex flex-column" style={{margin:"30px"}}>
            <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
          {price?.map((c)=>(
            <div key={c._id} >
              <Radio value={c.array} >{c.name}</Radio>
            </div>
          ))}
          </Radio.Group>
          </div>
        </div>
        <div className="col-md-8" >
          <h1 className="test-center">All Products</h1>
          <div className="d-felx felx-wrap" style={{justifyContent:"space-evenly"}}>
            <h4 style={{textAlign:"center"}}>Products </h4>
            <div className="card-grid">
              {products?.map((p) => (
                <Link key={p._id} className="productLink">
                  <div className="card" style={{ width: "20rem" }}>
                    <img
                      src={`http://localhost:8000/api/product/product-photo/${p._id}`}
                      className="card-img-top"
                      style={{
                        width: "270px",
                        height: "270px",
                        marginLeft: "20px",
                        marginTop: "20px",
                      }}
                      alt="product_photo"
                    />
                    <div className="card-body" style={{ marginLeft: "50px" }}>
                      <h5 className="card-title">Title : {p.name}</h5>
                      <h6 className="card-text">
                        Description : {p.description}
                      </h6>
                      <p className="card-text">Price : {p.price}</p>
                      <div className="card-body">
                        <button  className="btn btn-primary ms-1">Add Cart </button>
                        <button  className="btn btn-secondary ms-1">Details </button>
                      </div>
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

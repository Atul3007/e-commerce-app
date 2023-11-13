import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import { json, useNavigate, useParams } from 'react-router-dom'
import axios  from 'axios';
import { useCart } from '../context/Cart';
import toast from "react-hot-toast";

const CategoryProduct = () => {
    const {slug}=useParams();
    const [product,setProduct]=useState([]);
    const [category,setCategory]=useState("");
    const [cart,setCart]=useCart();
    const navigate=useNavigate();
    const getProduct=async ()=>{
        try {
            const {data}=await axios.get(`https://lucky-jade-yoke.cyclic.app/api/product/category-products/${slug}`);
            setCategory(data?.product[0]?.category?.name)
            setProduct(data?.product)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getProduct();
    },[slug])

  return (
    <Layout>
         <h1 style={{textAlign:"center"}}>{category}</h1>
    <div className='card-grid'>
        {product.length==0&& <h1> No product found</h1>}
    {product?.map((p) => (
                  <div className="card" style={{ width: "20rem" }}>
                    <img
                      src={`https://lucky-jade-yoke.cyclic.app/api/product/product-photo/${p._id}`}
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
                        Description : {p.description.substring(0, 30)}
                      </h6>
                      <p className="card-text">Price : {p.price}</p>
                      <div className="card-body">
                        <button className="btn btn-primary ms-1" onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem("cart",JSON.stringify([...cart,p]));
                          toast.success("Item added to cart");
                        }}>
                          Add Cart{" "}
                        </button>
                        <button
                          className="btn btn-secondary ms-1"
                          onClick={() => {
                              navigate(`/product/${p._id}`)
                          }
                          }
                        >
                          Details{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                
              ))}
    </div>
    </Layout>
  )
}

export default CategoryProduct
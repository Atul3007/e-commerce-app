import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

const ProductDetails = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState([]);
  const [relativedata,setRelativedata] = useState([]);

const navigate=useNavigate();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://lucky-jade-yoke.cyclic.app/api/product/get-single-product/${pid}`
      );
      setProduct(data?.message);
      getRelatedProduct(data?.message?._id,data?.message?.category?._id);
      // console.log(product)
    } catch (error) {
      console.log("error");
    }
  };

  const getRelatedProduct=async(pid,cid)=>{
    try {
      const {data}=await axios.get(`https://lucky-jade-yoke.cyclic.app/api/product/related-product/${pid}/${cid}`);
      setRelativedata(data?.products);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProduct();
  }, [pid]);

  return (
  
        <Layout>
          <div style={{ marginTop: "60px" }}>
            <div className="row container" style={{ display: "flex", justifyContent: "center" }}>
              <div className="col-md-6">
                <img
                  src={`https://lucky-jade-yoke.cyclic.app/api/product/product-photo/${product._id}`}
                  className="card-img-top"
                  style={{
                    width: "60%",
                    height: "auto",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    marginBottom: "20px",
                    marginLeft:"120px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  alt="product_photo"
                />
              </div>
              <div className="col-md-6" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div
                  style={{
                    padding: "20px",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h1 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Product Details</h1>
                  <h5 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Name: {product.name}</h5>
                  <p style={{ marginBottom: "10px" }}>Description: {product.description}</p>
                  <p style={{ marginBottom: "10px" }}>Price: ${product.price}</p>
                  <p style={{ marginBottom: "10px" }}>Category: {product?.category?.name}</p>
                  <button className="btn btn-secondary ms-1">Add to Cart</button>
                </div>
              </div>
            </div>
            <div className="row" style={{ width: "100%", marginTop: "20px", display: "flex", justifyContent: "center" }}>
              <h1 style={{ fontSize: "1.5rem", marginBottom: "20px",textAlign:"center" }}>Similar Products</h1>
              {relativedata.length==0 && <p style={{textAlign:"center",marginBottom:"50px"}}>No product found</p>}
              {relativedata?.map((p) => (
                <div
                  className="card"
                  style={{
                    width: "20rem",
                    marginBottom: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  key={p._id}
                >
                  <img
                    src={`https://lucky-jade-yoke.cyclic.app/api/product/product-photo/${p._id}`}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px",
                    }}
                    alt="product_photo"
                  />
                  <div
                    className="card-body"
                    style={{ marginLeft: "20px", padding: "10px" }}
                  >
                    <h5 className="card-title" style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                      Title: {p.name}
                    </h5>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      Description: {p.description.substring(0, 30)}
                    </p>
                    <p className="card-text" style={{ marginBottom: "10px" }}>
                      Price: ${p.price}
                    </p>
                    <div className="card-body">
                      <button className="btn btn-primary ms-1">Add Cart</button>
                      <button
                        className="btn btn-secondary ms-1"
                        onClick={() => {
                          navigate(`/product/${p._id}`);
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Layout>

  );
};

export default ProductDetails;

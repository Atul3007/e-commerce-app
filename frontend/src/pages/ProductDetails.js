import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/product/get-single-product/${pid}`
      );
      setProduct(data?.message);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getProduct();
  }, [pid]);

  return (
    <Layout>
      <div>
        <h1>Product Details</h1>
        <div className="row container">
          <div className="col-md-6">
            <img
              src={`http://localhost:8000/api/product/product-photo/${product._id}`}
              className="card-img-top"
              style={{
                width: "270px",
                height: "270px",
                marginLeft: "20px",
                marginTop: "20px",
              }}
              alt="product_photo"
            />
          </div>
          <div className="col-md-6">
          <h5 className="card-title">Title : {product}</h5>
                      <h6 className="card-text">
                        Description : {product.description.substring(0, 30)}
                      </h6>
                      <p className="card-text">Price : {product.price}</p>
                      <div className="card-body">
                        <button className="btn btn-primary ms-1">
                          Add Cart{" "}
                        </button>
          </div>
        </div>
        <div className="row">
          <h3>Similar Products</h3>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

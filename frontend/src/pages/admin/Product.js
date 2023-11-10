import React, { useEffect, useState } from "react";
import AdminMenu from "./../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/product/get-product"
      );
      if (res && res.data && res.data.message) {
        setProducts(res.data.message);
        console.log(res.data.message);
      } else {
        console.log("Error in getting products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <div>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">All products lists</h1>
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
export default Product;

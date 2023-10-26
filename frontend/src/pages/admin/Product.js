import React, { useEffect, useState } from "react";
import AdminMenu from "./../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/product/get-product");
      if (res && res.data && res.data.message) {
        setProducts(res.data.message);
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
          <div className="col-md-9">
            <h1 className="text-center">All products lists</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {products?.map((c) => (
                <div className="card" style={{ width: "18rem", margin: '1rem' }} key={c.id}>
                  <img src={c.photo} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{c.name}</h5>
                    <p className="card-text">
                      {c.description}
                    </p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;

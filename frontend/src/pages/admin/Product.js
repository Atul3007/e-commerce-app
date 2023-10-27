import React, { useEffect, useState } from "react";
import AdminMenu from "./../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/product/get-product"
      );
      if (res && res.data && res.data.message) {
        setProducts(res.data.message);
        console.log(res.data.message)
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
            <div class="card" >
              {products?.map((p) => (
                <div className="card" style={{ width: "18rem" }} key={p._id}>
                  <img src={p.photo} className="card-img-top" alt="product_photo" />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                        {p.description}
                    </p>
                     
                    </div>
                    </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Product;

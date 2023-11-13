import React, { useEffect, useState } from "react";
import Layout from "./../../components/layouts/Layout";
import AdminMenu from "./../../components/layouts/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import moment from "moment";
import { Select } from "antd";
import Order from './../user/Order';
const { Option } = Select;

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Not Delivered",
    "Delivered",
    "Cancelled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const config = {
    headers: {
      Authorization: auth?.token,
      "Content-Type": "application/json",
    },
  };

  const allOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/product/all-order",
        config
      );
      setOrders(data.orders);
   //   console.log({orders})
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange=async(status,id)=>{
    try {
      const {data}=await axios.put(`http://localhost:8000/api/product/update-order/${id}`,{status},config)
      allOrders();
      toast.success(data.message)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    allOrders();
  }, []);

  return (
    <Layout>
      <div className="row" style={{ margin: "20px" }}>
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 text-center">
          <h1>All Orders</h1>
          {orders.map((order, index) => (
            <div className="border-shadow" key={index}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {/* {order.status} */}
                      <Select
                        bordered={false}
                        onChange={(value) => {
                          handleChange(value,order._id);
                        }}
                        defaultValue={order?.status}
                      >
                        {status.map((s, i) => (
                          // console.log(s)
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>{order.buyer.name}</td>
                    <td>{moment(order.createdAt).format("Do MMMM YYYY")}</td>
                    <td>{order.payment}</td>
                    <td>{order.products.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
                {order.products.map((product) => (
                  <div
                    className="row"
                    style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                    key={product._id}
                  >
                    <div className="col-md-4 flex-row">
                      <img
                        src={`http://localhost:8000/api/product/product-photo/${product._id}`}
                        className="card-img-top"
                        style={{
                          width: "150px",
                          height: "150px",
                          margin: "20px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        alt="product_photo"
                      />
                    </div>
                    <div className="col-md-6" style={{ margin: "20px" }}>
                      <h5 className="card-title">Title: {product.name}</h5>
                      <h6 className="card-text" style={{ marginTop: "20px" }}>
                        Description: {product.description}
                      </h6>
                      <p className="card-text">Price: {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;

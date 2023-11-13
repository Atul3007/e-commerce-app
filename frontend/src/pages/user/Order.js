import React, { useEffect, useState } from "react";
import UserMenu from "../../components/layouts/UserMenu";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";

const Order = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/product/your-order/${auth?.user?._id}`
      );
      setOrders(data.orders);
     console.log({ product:orders.products});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrder();
  }, []);

  return (
    <Layout>
      <div className="container-field">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div
              className="card w-75 "
              style={{ marginTop: "4%", padding: "20px" }}
            >
              <h4> Your Orders</h4>
              {
                <div className="border-shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <td scope="col">#</td>
                        <td scope="col">Status</td>
                        <td scope="col">Buyer</td>
                        <td scope="col">Date</td>
                        <td scope="col">Payment</td>
                        <td scope="col">Quantity</td>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <th>{index + 1}</th>
                           <td>{order.status}</td>
                           <td>{order.buyer.name}</td>
                           <td>{moment(order.createdAt).format('Do MMMM YYYY')}</td>
                           <td>{order.payment}</td>
                           <td>{order.products.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="container">
                 {orders?.map((order) => (
                  order?.products?.map((c) => (
                    <div
                      className="row"
                      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                      key={c._id}
                    >
                      <div className="col-md-4 flex-row">
                        <img
                          src={`http://localhost:8000/api/product/product-photo/${c._id}`}
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
                        <h5 className="card-title">Title: {c.name}</h5>
                        <h6 className="card-text" style={{ marginTop: "20px" }}>
                          Description: {c.description}
                        </h6>
                        <p className="card-text">Price: {c.price}</p>
                      </div>
                    </div>
                  ))
                ))}                
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;

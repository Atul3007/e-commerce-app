import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import { useAuth } from "../context/Auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clienttoken, setClentToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState("");

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: auth?.token,
      "Content-Type": "application/json",
    },
  };

  const RemoveCart = async (id) => {
    try {
      let myCart = [...cart];
      let new_cart = myCart.filter((p) => p._id !== id);
      setCart(new_cart);
      localStorage.setItem("cart", JSON.stringify(new_cart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let sum = 0;
      //  console.log(cart);
      cart?.map((p) => {
        sum += p.price;
      });
      return sum;
    } catch (error) {
      console.log(error);
    }
  };

  const getClienttoken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/product/brain-tree/token"
      );
      //  console.log(data)
      setClentToken(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8000/api/product/brain-tree/payment",
        { cart },
        config
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
      toast.success(data.success);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const cashPayment = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/api/product/payment/cod",
        { cart },
        config
      );
      console.log(data)
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
      toast.success(data.success);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClienttoken();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {auth?.user?.name == undefined
                ? "Welcome"
                : `Welcome ${auth?.user?.name} !!!`}
            </h1>
            <h4 className="text-center">
              {cart && cart.length > 1
                ? `You have ${cart.length} item in your cart ${
                    auth?.token ? " " : " Please login to checkout!!! "
                  }`
                : ""}
            </h4>
          </div>
          <div className="row">
            <div className="col-md-7">
              {cart?.map((c) => (
                <div
                  className="row"
                  style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
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
                    <h5 className="card-title">Title : {c.name}</h5>
                    <h6 className="card-text" style={{ marginTop: "20px" }}>
                      Description : {c.description.substring(0, 30)}
                    </h6>
                    <p className="card-text">Price : {c.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        RemoveCart(c._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="col-md-4 text-center"
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                margin: "40px",
              }}
            >
              <h4>Chart Summary</h4>
              <hr />
              <h5 style={{ color: "green" }}>Total | CheckOut | Payment </h5>
              <hr />
              <h4>Total : {totalPrice()}</h4>
              <hr />
              {auth?.user?.address ? (
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Updade Address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Updade Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-success"
                        onClick={() => navigate("/login", { state: "/cart" })}
                      >
                        Login to purchase items!!!
                      </button>
                    )}
                  </div>
                </div>
              )}{" "}
              <div className="mt-2">
                {!clienttoken || !cart?.length ? (
                  " "
                ) : (
                  <>
                    <button onClick={cashPayment}>Cash On delivery</button>
                    <DropIn
                      options={{
                        authorization: clienttoken,
                        paypal: { flow: "vault" },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-success"
                      onClick={handlePayment}
                      disabled={!clienttoken || !instance}
                    >
                      {loading ? "Processing" : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

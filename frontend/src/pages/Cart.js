import React from "react";
import Layout from "../components/layouts/Layout";
import { useAuth } from "../context/Auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const RemoveCart=async(id)=>{
    try {
      let myCart=[...cart];
      let new_cart=myCart.filter((p)=>p._id!==id);
      setCart(new_cart);
      localStorage.setItem("cart",JSON.stringify(new_cart));
    } catch (error) {
      console.log(error)
    }
  }

  const totalPrice=()=>{
    try {
      let sum=0;
      console.log(cart)
      cart?.map((p)=>{
       sum+=p.price;
      })
      return(sum);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {auth?.user?.name==undefined?"Welcome":`Welcome ${auth?.user?.name} !!!`}
            </h1>
            <h4 className="text-center">
              {cart.length > 1
                ? `You have ${cart.length} item in your cart ${
                    auth?.token ? " " : "Please login to checkout"
                  }`
                : "Please login to checkout"}
            </h4>
          </div>
          <div className="row">
            <div className="col-md-7">
             { cart?.map((c)=>(
                <div className="row" style={{ boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                   <div className="col-md-4 flex-row">
                   <img
                    src={`http://localhost:8000/api/product/product-photo/${c._id}`}
                    className="card-img-top"
                    style={{
                      width: "150px",
                      height: "150px",
                      margin:"20px",
                      boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"
                    }}
                    alt="product_photo"
                  />
                   </div>
                   <div className="col-md-6" style={{margin:"20px"}} >
                   <h5 className="card-title">Title : {c.name}</h5>
                    <h6 className="card-text"style={{marginTop:"20px"}}>
                      Description : {c.description.substring(0, 30)}
                    </h6>
                    <p className="card-text">Price : {c.price}</p>
                    <button className="btn btn-danger" onClick={()=>{RemoveCart(c._id)}}>Remove</button>
                   </div>
                </div>
              ))
             }
            </div>
            <div className="col-md-4 text-center" style={{boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
              <h4>Chart Summary</h4>
              <hr />
              <h5>Total | CheckOut | Payment </h5>
              <hr />
              <h4>Total : {totalPrice()}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

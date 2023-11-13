import React from "react";
import Layout from "../../components/layouts/Layout";
import { useState } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../../context/Auth";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth]=useAuth()

  const navigate=useNavigate();
  const location=useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        email,
        password
      };
      //console.log({obj})
      const res = await axios.post("https://lucky-jade-yoke.cyclic.app/api/login", obj);
     setAuth({...auth,
             user:res.data.user,
             token:res.data.token})
       localStorage.setItem("auth",JSON.stringify(res.data));      
      toast.success(res.data.message,{ autoClose: 5000 })
      navigate(location.state||"/")
    } catch (error) {
      toast.error("Error in logging",{ autoClose: 5000 });
    }
  };

  return (
    <Layout>
      <div className="register">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
      
          <div className="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <div style={{display:"grid",justifyContent:"space-between"}}>
            <div>
            <label for="exampleInputPassword1" class="form-label">*forgot password</label>
          <button type="button" onClick={()=>{
            navigate("/forgotpassword")
          }}>click here</button>
            </div>
            <div>
            <button type="submit" className="btn btn-primary" style={{marginLeft:70,marginTop:25}}>
            Submit
          </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;

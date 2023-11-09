import React from "react";
import Layout from "../../components/layouts/Layout";
import { useState } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../../context/Auth";

const Forgotpass = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [question,setQuestion] = useState("");

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        email,
        password,
        question
      };
      const res = await axios.post("http://localhost:8000/api/forgotpass", obj);
      toast.success(res.data.message);
      alert(res.data.message)
      navigate("/login")
     // console.log(res.data.message)
    } catch (error) {
      toast.error("Error in registration",{ autoClose: 5000 });
    }
  };

  return (
    <Layout>
      <div className="register">
        <h1>Change Password</h1>
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
          <label for="exampleInput" class="form-label">What is your favourite sport?</label>
            <input
              type="string"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="form-control"
              id="exampleInputQuestion"
              placeholder="favourite sport"
              required
            />
          </div>
          <div className="mb-3">
          <label for="exampleInputPassword1" class="form-label">Reset Password</label>
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
            <button type="submit" className="btn btn-primary" style={{marginLeft:70,marginTop:25}}>
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Forgotpass;

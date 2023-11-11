import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../context/Auth'
import Layout from '../../components/layouts/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
    const [auth,setAuth]=useAuth();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id,setId] = useState("");

    const config = {
      headers: {
        Authorization: auth?.token,
        "Content-Type": "application/json",
      },
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const obj = {
          id,
          name,
          address,
          email,
          phone,
          password,
          role: "user"
        };
        const {data}=await axios.put("http://localhost:8000/api/update-profile",obj,config)
        //console.log(data.newProfile)
        setAuth({...auth,user:data.newProfile});
        let ls=JSON.parse(localStorage.getItem("auth"));
        ls.user=auth.user;
        localStorage.setItem("auth",JSON.stringify(ls));
        toast.success(data.message)
      } catch (error) {
        toast.error("Error in updating profile");
      }
    };
  
  useEffect(()=>{
    const {name,address,email,phone,_id}=auth.user;
    setId(_id)
    setName(name);
    setAddress(address);
    setEmail(email);
    setPhone(phone);
  },[auth?.user])

  return (
    <Layout >
    <div className='container-field'>
     <div className='row'>
       <div className='col-md-3'>
          <UserMenu/>
       </div>
       <div className='col-md-9'>
         <div className="card w-75 text-center" style={{marginTop:'4%', padding:"20px"}}>
           <h4> Your Profile </h4>
           <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"  // Changed from "string" to "text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputname"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
              disabled
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputphone"
              placeholder="Mobile"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Updated Password"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"  // Changed from "string" to "text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputaddress"
              placeholder="Address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
         </div>
       </div>
     </div>
   </div>
 </Layout>
  )
}

export default Profile
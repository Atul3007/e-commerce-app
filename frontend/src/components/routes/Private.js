import React, { useState,useEffect } from 'react'
import { useAuth } from '../../context/Auth'
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import App from './Spinner';

const Private = () => {
    const [ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();
    
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("http://localhost:8000/api/user-auth", {
                headers: {
                    Authorization: auth?.token
                }
            });
            (res.data.ok) ? setOk(true) : setOk(false);
        }
        if (auth?.token) {
            authCheck();
        }
    }, [auth?.token]);

  return (
     ok ? <Outlet/> : <App/>
  )
}

export default Private
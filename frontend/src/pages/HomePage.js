import React from 'react'
import Layout from '../components/layouts/Layout'
import { useAuth } from '../context/Auth'

const HomePage = () => {
  const [auth,setAuth]=useAuth();
 
  return (
    <Layout>
    HomePage
    <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}

export default HomePage
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' >
      <h1 style={{textAlign:'center'}}>
        All Rights Reserved
      </h1>
<p className='text-center mt-3'>
   <Link to="/about">About</Link>|
   <Link to="/contact">Contact</Link>|
   <Link to="/policy">Policy</Link>
</p>
      </div>
  )
}

export default Footer
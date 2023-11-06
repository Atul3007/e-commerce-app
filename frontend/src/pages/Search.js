import React from 'react'
import Layout from '../components/layouts/Layout'
import { useSearch } from '../context/Search'

const Search = () => {
    const [search,setSearch]=useSearch();
    const result=search.result;
    console.log(result)
  return (
    <Layout>
      <div className="container">
        <div className="card-grid">
        <div className="text-center">
            <h1>Search Results</h1>
             {result}?{result.map((p)=>(
                 <div className="card" style={{ width: "18rem" }} >
                 <img
                   src={`http://localhost:8000/api/product/product-photo/${p._id}`}
                   className="card-img-top"
                   style={{width:"200px",height:"200px",marginLeft:"50px",marginTop:"20px"}}
                   alt="product_photo"
                 />
                 <div className="card-body" style={{marginLeft:"50px"}}>
                   <h5 className="card-title">Title : {p.name}</h5>
                   <h6 className="card-text">Description : {p.description}</h6>
                   <p className="card-text">Price : {p.price}</p>
                 </div>
               </div>
             ))}:{<h1>No result found!!!</h1>}
        </div>
        </div>
      </div>
    </Layout>
  )sdgkjl;
}

export default Search
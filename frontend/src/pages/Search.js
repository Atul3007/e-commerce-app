import React from 'react'
import Layout from '../components/layouts/Layout'
import { useSearch } from '../context/Search'

const Search = () => {
    const [search,setSearch]=useSearch();
    const result=search?.result;
    console.log(result)
  return (
    <Layout>
      <div className="container">
         <div className="text-center">
            <h1>Search Results</h1>
            <h6>{result.length<1?"No product Found":`Found : ${result.length}`}</h6>
            <div className="d-felx felx-wrap" style={{justifyContent:"space-evenly"}}>
            <div className="card-grid">
              {result?.map((p) => (
                // <Link key={p._id} className="productLink">
                  <div className="card" style={{ width: "20rem" }}>
                    <img
                      src={`https://lucky-jade-yoke.cyclic.app/api/product/product-photo/${p._id}`}
                      className="card-img-top"
                      style={{
                        width: "270px",
                        height: "270px",
                        marginLeft: "20px",
                        marginTop: "20px",
                      }}
                      alt="product_photo"
                    />
                    <div className="card-body" style={{ marginLeft: "50px" }}>
                      <h5 className="card-title">Title : {p.name}</h5>
                      <h6 className="card-text">
                        Description : {p.description.substring(0,30)}
                      </h6>
                      <p className="card-text">Price : {p.price}</p>
                      <div className="card-body">
                        <button  className="btn btn-primary ms-1">Add Cart </button>
                        <button  className="btn btn-secondary ms-1">Details </button>
                      </div>
                    </div>
                  </div>
                // </Link>
              ))}
            </div>
          </div>
         </div>
      </div>
    </Layout>
  )
}

export default Search
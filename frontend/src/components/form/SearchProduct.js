import React from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { Navigate } from "react-router-dom";


const SearchProduct =() => {
    const [search,setSearch]=useSearch();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.get(`http://localhost:8000/api/product/search-product/${search.keyword}`)
               setSearch({...search,result:data.product})
               Navigate("/searchproducts");
        } catch (error) {
            console.log({error})
        }
    }
  return (
    <div>
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search.keyword}
              onChange={(e)=>setSearch({...search,keyword:e.target.value})}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
  );
};

export default SearchProduct;
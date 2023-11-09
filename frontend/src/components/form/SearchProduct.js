import React from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const SearchProduct =() => {
    const navigate=useNavigate();
    const [search,setSearch]=useSearch();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.get(`https://lucky-jade-yoke.cyclic.app/api/product/search-product/${search.keyword}`)
               setSearch({...search,result:data.product})
               navigate("/searchproducts");
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

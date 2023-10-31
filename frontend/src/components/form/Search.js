import React from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
const Search =async () => {
    const [search,setSearch]=useSearch();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const {product}=await axios.get(`http://localhost:8000/api/product//search-product/${search}`)
            setValues({...search,result:product})
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
              value={search.keywords}
              onChange={(e)=>setSearch({...values,keyword:e.target.value})}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
  );
};

export default Search;

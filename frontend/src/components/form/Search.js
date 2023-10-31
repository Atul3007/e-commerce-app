import React from "react";
import { useSearch } from "../../context/Search";
const Search = () => {
    const [search,setSearch]=useSearch();
  return (
    <div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
  );
};

export default Search;

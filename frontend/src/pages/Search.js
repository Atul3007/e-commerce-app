import React from 'react'
import Layout from '../components/layouts/Layout'
import { useSearch } from '../context/Search'

const Search = () => {
    const [search,setSearch]=useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
            <h1>Search Results</h1>
             {console.log(search)}
        </div>
      </div>
    </Layout>
  )
}

export default Search
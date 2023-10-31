import { useState, useContext, createContext } from 'react';

const SearchContext=createContext();

const SearchProvider=({children})=>{
   
    const [search,setSearch]=useState({
        keyword:null,
        result:[]
    }) ;

    return(
        <SearchContext.Provider value={[search,setSearch]}>
           {children}
        </SearchContext.Provider>
    );
}

//create hook

const useSearch=()=>{
   return useContext(SearchContext)
}


export {useSearch,SearchProvider}
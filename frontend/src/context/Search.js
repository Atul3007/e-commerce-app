import { useState, useContext, createContext } from 'react';

const SearchContext=createContext();

const AuthProvider=({children})=>{
   
    const [auth,setAuth]=useState({
        keyword:null,
        result:[]
    }) ;

    return(
        <SearchContext.Provider value={[auth,setAuth]}>
           {children}
        </SearchContext.Provider>
    );
}

//create hook

const useAuth=()=>{
   return useContext(SearchContext)
}


export {useAuth,AuthProvider}
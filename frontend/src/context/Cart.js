import { useState, useContext, createContext, useEffect } from 'react';

const CartContext=createContext();

const CartProvider=({children})=>{
   
    const [cart,setCart]=useState([]) ;
    useEffect(()=>{
        const cartitem=JSON.parse(localStorage.getItem("cart"));
        setCart(cartitem);
    },[])
    return(
        <CartContext.Provider value={[cart,setCart]}>
           {children}
        </CartContext.Provider>
    );
}

//create hook

const useCart=()=>{
   return useContext(CartContext)
}


export {useCart,CartProvider}
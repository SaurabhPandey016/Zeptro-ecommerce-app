// Import React and necessary dependencies
import React from 'react'
import { useNavigate } from 'react-router-dom';       // Navigation hook
import { IoCartOutline } from 'react-icons/io5';     // Cart icon
import { useCart } from '../context/CartContext';    // Cart context
import { useFavorites } from "../context/FavoriteContext"; // Favorites context
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Heart icons for favorites


const ProductCard = ({product}) => {
    // Get favorites from context
    const {favorites, addToFavorites } = useFavorites();
    
    // Hook for navigation to product detail page
    const navigate = useNavigate();
    
    // Get cart functions from context
    const{addToCart, cartItem} = useCart();
    
  return (
    <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max'>
      {/* Product image - click to view product details */}
      <img src={product.images[0]} alt="" className='bg-gray-100 aspect-square' onClick={()=> navigate(`/products/${product._id}`)} />
      
      {/* Product name */}
      <h1 className='line-clamp-2 p-1 font-semibold'>{product.title}</h1>
      
      {/* Product price */}
      <p className='my-1 text-lg text-gray-800 font-bold'>${product.price}</p>
      
      {/* Action buttons: Add to cart and Add to favorites */}
      <div className='flex gap-2'>
        {/* Add to cart button */}
        <button onClick={() => addToCart(product._id)} className='bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold'><IoCartOutline className='w-6 h-6' /> Add to Cart</button>
        
        {/* Add to favorites button - positioned absolutely in top right */}
        <button onClick={() => addToFavorites(product._id)} className='cursor-pointer absolute top-3 right-3 z-10 p-2 rounded-full transition-colors hover:bg-red-50 hover:text-red-600 shadow-sm'
         title='Add to Favorites'
        >
          <AiFillHeart className="w-5 h-5 text-red-600"/>
        </button>
      </div>
      
    </div>
  )
}

export default ProductCard

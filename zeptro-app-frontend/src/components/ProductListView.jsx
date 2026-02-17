import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductListView = ({product}) => {
  // console.log(product);
  const navigate = useNavigate()
  const {addToCart} = useCart()

  return (
    <div className='space-y-4 mt-2 rounded-md'>
      <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md'>
        <img src={product.images[0]} alt={product.title} className='md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer' onClick={()=>navigate(`/products/${product._id}`)}/>
        <div className='space-y-2'>
          <h1 className='font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 w-full'>{product.title}</h1>
          <p className='font-semibold flex items-center md:text-lg text-sm'>$<span className='md:text-4xl text-3xl'>{product.price}</span></p>
          <p className='text-sm'>FREE delivery <span className='font-semibold'>5 days</span> <br />
          Or fastest delivery <span className='font-semibold'>Day after Tomorrow, </span></p>
          <button onClick={()=>addToCart(product)} className='bg-red-500 text-white px-4 py-2 md:px-3 md:py-1 rounded-md cursor-pointer text-sm md:text-base'>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView

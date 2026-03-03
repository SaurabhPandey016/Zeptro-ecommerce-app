// Import required dependencies and hooks
import axios from "axios";          // HTTP client for API requests
import React from "react";
import { useParams } from "react-router-dom";  // Get URL parameters (product ID)
import { useEffect, useState } from "react";   // React hooks for state and effects
import Loading from "../assets/Loading4.webm"; // Loading animation video
import Breadcrums from "../components/BreadCrums";  // Breadcrumb navigation
import { IoCartOutline } from "react-icons/io5"; // Cart icon
import { useCart } from "../context/CartContext"; // Cart context hook

const SingleProduct = () => {
  // Get product ID from URL parameters
  const id = useParams().id;
  
  // State to store fetched product details
  const [SingleProduct, setSingleProduct] = useState("");
  
  // Get addToCart function from cart context
  const{addToCart} = useCart();

  /**
   * Fetch single product details from backend API
   * Uses product ID from URL parameters
   * Handles errors gracefully with try-catch
   */
  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        // `http://localhost:3000/products/single/${id}`
        `https://zeptro-ecommerce-app.onrender.com/products/single/${id}`
      );
      const product = res.data;
      setSingleProduct(product);
      // console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  // Load product data when component mounts or when product ID changes
  useEffect(() => {
    getSingleProduct();
  }, []);

  // const addToWishlist = async () => {
  //   await fetch("http://localhost:3000/favorites", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       productId: product.productId,
  //       title: product.title,
  //       price: product.price,
  //       image: product.images[0],
  //     }),
  //   });
  // };

  // Generate random discount between 10-30% for the product
   const discount = Math.ceil(Math.random() * (30 - 10) + 10);
   
   // Calculate original price before discount
   const OriginalPrice = Math.ceil(SingleProduct.price + (SingleProduct.price * discount / 100))

  return (
    <div>
      {/* Render product details if data is loaded */}
      {SingleProduct ? (

        <div className='px-4 pb-4 md:px-0'>
            {/* Breadcrumb navigation showing current location */}
            <Breadcrums title={SingleProduct.title} />

            {/* Main product container: image on left, details on right */}
            <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>

                {/* Left Section: Product image */}
                <div className='w-full'>
                    <img src={SingleProduct.images[0]} 
                        alt={SingleProduct.title} 
                        className='rounded-2xl w-full object-cover'/>
                </div>

                {/* Right Section: Product details, price, and actions */}
                <div className='flex flex-col gap-6'>
                    {/* Product title/name */}
                    <h1 className='md:text-3xl text-xl font-bold text-gray-800' >{SingleProduct.title}</h1>
                    
                    {/* Breadcrumb-like navigation text */}
                    <div className='text-gray-700'>HOME / PRODUCTS / {SingleProduct.title?.toUpperCase()}</div>
                    
                    {/* Price display with original price crossed out and discount badge */}
                    <p className='text-xl text-red-500 font-bold'>${SingleProduct.price} <span className='line-through text-gray-700'>${OriginalPrice}</span> <span className='bg-red-500 text-white px-4 py-2 rounded-full'>{discount}% discount</span></p>
                    
                    {/* Product description */}
                    <p className='text-gray-600'>{SingleProduct.description}</p>

                    {/* Quantity selection for adding to cart */}
                    <div className='flex items-center gap-4'>
                        <label htmlFor="" className='text-sm font-medium text-gray-700'>Quantity:</label>
                        <input type="number" min={1} value={1} className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 foucs:ring-red-500'/>
                    </div>

                    {/* Add to Cart Action Button */}
                    <div className='flex gap-4 mt-4'>
                        <button onClick={() => addToCart(SingleProduct)} className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer'><IoCartOutline className='w-6 h-6'/> Add to Cart</button>
                    </div>

                </div>

            </div>


        </div>
      ) : (
        // Else Loading Video
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;

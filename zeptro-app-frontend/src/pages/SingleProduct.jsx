import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../components/BreadCrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const id = useParams().id;
  const [SingleProduct, setSingleProduct] = useState("");
  const{addToCart} = useCart();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/products/single/${id}`
      );
      const product = res.data;
      setSingleProduct(product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

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

   const discount = Math.ceil(Math.random() * (30 - 10) + 10);
//    console.log(SingleProduct.name)
   const OriginalPrice = Math.ceil(SingleProduct.price + (SingleProduct.price * discount / 100))

  return (
    <div>
      {SingleProduct ? (

        <div className='px-4 pb-4 md:px-0'>
            <Breadcrums title={SingleProduct.title} />

            {/*  Parent div For images and details */}
            <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>

                {/* Left Section for images */}
                <div className='w-full'>
                    <img src={SingleProduct.images[0]} 
                        alt={SingleProduct.title} 
                        className='rounded-2xl w-full object-cover'/>
                </div>

                {/* Right Section for details and rest of the Stuffs */}
                <div className='flex flex-col gap-6'>
                    <h1 className='md:text-3xl text-xl font-bold text-gray-800' >{SingleProduct.title}</h1>
                    <div className='text-gray-700'>HOME / PRODUCTS / {SingleProduct.title?.toUpperCase()}</div>
                    <p className='text-xl text-red-500 font-bold'>${SingleProduct.price} <span className='line-through text-gray-700'>${OriginalPrice}</span> <span className='bg-red-500 text-white px-4 py-2 rounded-full'>{discount}% discount</span></p>
                    <p className='text-gray-600'>{SingleProduct.description}</p>

                    {/* Quantity Selection Section */}
                    <div className='flex items-center gap-4'>
                        <label htmlFor="" className='text-sm font-medium text-gray-700'>Quantity:</label>
                        <input type="number" min={1} value={1} className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 foucs:ring-red-500'/>
                    </div>

                    {/* Add to Cart Button */}
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

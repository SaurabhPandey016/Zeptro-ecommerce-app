import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"

import Products from "./pages/Products.jsx"
import About from "./pages/About.jsx"
import Cart from "./pages/Cart.jsx"
import Contact from "./pages/Contact.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import SingleProduct from "./pages/SingleProduct.jsx"
import CategoryProduct from "./pages/CategoryProduct.jsx"
import Favorites from "./pages/Favorites.jsx"

function App() {
 
  return (
   <>
    <div className=''>

        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/category/:category" element={<CategoryProduct />} /> 
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
          <Footer/>
        </BrowserRouter>
      
    </div>
   </>
  )
}

export default App

// Import React and routing dependencies
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import page components
import Home from "./pages/Home.jsx"
import Products from "./pages/Products.jsx"
import About from "./pages/About.jsx"
import Cart from "./pages/Cart.jsx"
import Contact from "./pages/Contact.jsx"
import SingleProduct from "./pages/SingleProduct.jsx"
import CategoryProduct from "./pages/CategoryProduct.jsx"
import Favorites from "./pages/Favorites.jsx"

// Import layout components
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"

function App() {
  // Main application component that sets up routing structure
  // BrowserRouter enables client-side navigation without full page reloads
  return (
   <>
      <div className=''>
        {/* Browser Router enables client-side routing */}
        <BrowserRouter>
          {/* Navbar displayed on all pages */}
          <Navbar/>
          
          {/* Define application routes and corresponding page components */}
          <Routes>
            {/* Home page - landing/dashboard */}
            <Route path="/" element={<Home />} />
            
            {/* Products listing page with filters and pagination */}
            <Route path="/products" element={<Products/>} />
            
            {/* Individual product detail page based on product ID */}
            <Route path="/products/:id" element={<SingleProduct />} />
            
            {/* Category-filtered products page */}
            <Route path="/category/:category" element={<CategoryProduct />} /> 
            
            {/* User's wishlist/favorites page */}
            <Route path="/favorites" element={<Favorites />} />
            
            {/* About page with company information */}
            <Route path="/about" element={<About />} />
            
            {/* Contact page for user inquiries */}
            <Route path="/contact" element={<Contact />} />
            
            {/* Shopping cart page with checkout functionality */}
            <Route path="/cart" element={<Cart />} />
          </Routes>
          
          {/* Footer displayed on all pages */}
          <Footer/>
        </BrowserRouter>
      </div>
   </>
  )
}

export default App

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Logo from '../assets/Logo.png'
import { FaGithub, FaLinkedin, FaInstagram, FaTwitterSquare } from 'react-icons/fa'

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className='bg-gray-900 text-gray-200 py-10'>
      <div className='max-w-7xl mx-auto px-4 md:flex md:justify-between'>
        {/*  info */}
        <div className='mb-6 md:mb-0'>
            <Link to='/'>
              {/* <img src={Logo} alt="" className='w-32'/> */}
              <h1 className='text-red-500 text-2xl font-bold'>Zeptro</h1>
            </Link>
            <p className='mt-2 text-sm'>Powering Your World with the Best in Ecommerce.</p>
            <p className='mt-2 text-sm'>123 Electronics St, Style City, NY 10001</p>
            <p className='text-sm'>Email: developersaurabh04@gmail.com</p>
            <p className='text-sm'>Phone: +(91) 8720026790</p>
        </div>
        {/* customer service link */}
        <div className='mb-6 md:mb-0'>
            <h3 className='text-xl font-semibold'>Customer Service</h3>
            <ul className='mt-2 text-sm space-y-2'>
                <li onClick={()=>navigate('/contact')}  className='cursor-pointer'>Contact Us</li>
                <li onClick={()=>navigate('/')}  className='cursor-pointer'>Shipping & Returns</li>
                <li onClick={()=>navigate('/')}  className='cursor-pointer'>FAQs</li>
                <li onClick={()=>navigate('/')}  className='cursor-pointer'>Order Tracking</li>
                <li onClick={()=>navigate('/')}  className='cursor-pointer'>Size Guide</li>
            </ul>
        </div>
        {/* social media links */}
        <div className='mb-6 md:mb-0'>
            <h3 className='text-xl font-semibold'>Follow Us</h3>
            <div className='flex space-x-4 mt-2'>
              <a
                href="https://www.linkedin.com/in/saurabhpandey-/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <FaLinkedin className='cursor-pointer'/> {/* Clicking this will open the link */}
              </a>

              <a
                href="https://github.com/SaurabhPandey016"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <FaGithub className='cursor-pointer'/> {/* Clicking this will open the link */}
              </a>
                
              <a
                href="https://www.instagram.com/mr._bunny_/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <FaInstagram className='cursor-pointer'/> {/* Clicking this will open the link */}
              </a>
              
              <a
                href="https://x.com/Saurabh_Pandey_/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <FaTwitterSquare className='cursor-pointer'/> {/* Clicking this will open the link */}
              </a>
            </div>
        </div>
        {/* newsletter subscription */}
        <div>
            <h3 className='text-xl font-semibold'>Stay in the Loop</h3>
            <p className='mt-2 text-sm'>Subscribe to get special offers, free giveaways, and more</p>
            <form action="" className='mt-4 flex'>
                <input 
                type="email" 
                placeholder='Your email address'
                className='w-full p-2 rounded-l-md  text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'
                />
                <button type='submit' className='bg-red-600 text-white px-4 rounded-r-md hover:bg-red-700'>Subscribe</button>
            </form>
        </div>
      </div>
      {/* bottom section */}
      <div className='mt-8 border-t border-gray-700 pt-6 text-center text-sm'>
        <p>&copy; {new Date().getFullYear()} <span className='text-red-500'>Zeptro</span>. All rights reserved</p>
        <p>Made with ❤️ by Saurabh Pandey</p>
      </div>
    </footer>
  )
}

export default Footer
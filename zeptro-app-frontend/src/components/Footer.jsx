import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Logo from '../assets/Logo.png'
import { FaGithub, FaLinkedin, FaInstagram, FaTwitterSquare } from 'react-icons/fa'

const Footer = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <footer className='bg-gray-900 text-gray-200 py-10'>
      {/* FAQ Accordion */}
        <div className='mb-6 md:mb-0'>
          <h3 className='text-xl font-semibold mb-4 md:mb-6'>Frequently Asked Questions</h3>
          <div className='space-y-3 mb-6 md:mb-8'>
            {[ 
              { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, PayPal, Apple Pay, Google Pay, and bank transfers for secure checkout.' },
              { q: 'How long does shipping take?', a: 'Standard shipping takes 3-7 business days within the country. Express shipping is 1-3 days. International varies by location.' },
              { q: 'What is your return policy?', a: '30-day hassle-free returns on all items. Items must be unused in original packaging. Contact us for return label.' },
              { q: 'Do you offer international shipping?', a: 'Yes, we ship worldwide! Duties and taxes may apply based on your country. Check our shipping page for rates.' },
              { q: 'How can I track my order?', a: 'Once shipped, you\'ll receive a tracking email. Log into your account or contact support with your order number.' }
            ].map((faq, index) => (
              <div key={index} className='border border-gray-700 rounded-lg overflow-hidden'>
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className='w-full text-left p-4 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 flex items-center justify-between text-sm md:text-base'
                >
                  <span>{faq.q}</span>
                  <span className={`transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''}`}>
                    +
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className='p-4 pt-0 text-sm text-gray-300 bg-gray-850 border-t border-gray-700'>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
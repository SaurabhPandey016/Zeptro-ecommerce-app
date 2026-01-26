import React, { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { IoCartOutline, IoClose, IoMenu } from 'react-icons/io5'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useCart } from '../context/CartContext'
import { AiFillHeart } from 'react-icons/ai'
import { useFavorites } from '../context/FavoriteContext'



const Navbar = () => {
  const { cartItem } = useCart();
  const [open, setOpen] = useState(false); // mobile menu
  const [scrolled, setScrolled] = useState(false); // add shadow when scrolled
  const location = useLocation();
  const{ favorites } = useFavorites();

  // close mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md ${isActive ? 'text-red-600 border-b-2 border-red-500' : 'text-gray-800'} transition-colors`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50  bg-white/80 backdrop-blur-md transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 md:px-0">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-red-500 font-serif">Z</span>eptro
          </Link>
        </div>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6 text-lg font-semibold">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">

          <Link to="/favorites" className="relative">
            <AiFillHeart className="w-6 h-6 text-red-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">{favorites?.length || 0}</span>
          </Link>

          <Link to="/cart" className="relative">
            <IoCartOutline className="w-6 h-6 text-gray-800" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">{cartItem?.length || 0}</span>
          </Link>

          <div className="hidden md:block">
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <IoClose size={22} /> : <IoMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-[max-height] duration-300 overflow-hidden ${open ? 'max-h-60' : 'max-h-0'}`}>
        <div className="px-4 pb-4 space-y-2">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>

          <div className="pt-2">
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md w-full" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

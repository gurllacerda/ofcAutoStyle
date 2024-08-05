'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-3xl font-bold text-white">AUTO STYLE</span>
        </Link>
        <button 
          onClick={toggleDropdown}
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-white"
          aria-controls="navbar-dropdown" 
          aria-expanded={dropdownOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={'hidden md:flex md:w-auto'} id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 border-none">
            <li>
              <Link href="/" className="block py-2 px-3 text-white rounded-md transition duration-300 ease-in-out hover:bg-orange-400 hover:text-white">Home</Link>
            </li>
            <li className="relative flex items-center">
              <button 
                onClick={toggleDropdown}
                id="dropdownNavbarLink"
                className="flex items-center justify-between w-full py-2 px-3 text-white rounded-md transition duration-300 ease-in-out hover:bg-orange-400 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto"
              >
                Faça seu pedido 
                <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              {/* Dropdown menu */}
              <div className={`${dropdownOpen ? 'block' : 'hidden'} absolute top-full left-0 z-10 bg-white rounded-lg shadow-lg w-44 mt-2`}>
                <ul className="py-2 text-sm text-orange-600">
                  <li>
                    <Link href="/order/menu" className="block px-4 py-2 hover:bg-orange-100">Our Menu</Link>
                  </li>
                  <li>
                    <Link href="/order/create" className="block px-4 py-2 hover:bg-orange-100">Create your pizza</Link>
                  </li>
                </ul>
                {/* <div className="py-1">
                  <Link href="#" className="block px-4 py-2 text-sm hover:bg-orange-100">Sign out</Link>
                </div> */}
              </div>
            </li>
            <li>
              <Link href="/myOrders" className="block py-2 px-3 text-white rounded-md transition duration-300 ease-in-out hover:bg-orange-400">My orders</Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2 px-3 text-white rounded-md transition duration-300 ease-in-out hover:bg-orange-400">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
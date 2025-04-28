import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";


const Navbar = () => {
  const userRole = localStorage.getItem("role"); // Get the user role from local storage
    return(
        <nav className="bg-white shadow-sm">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">         
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

     
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
        <img className="h-15 w-auto" src={logo} alt="let's Play" />
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
          <Link to="/tournament" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Tournament</Link>
          <a href="/findOpponent" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Find Opponent</a>
          <a href="/adminDashboard" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Admin Dashboard</a>
        </div>
      </div>


      {/** Profile and Logout */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

        <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <a href="/Profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
        </button>

       {/* Logout */}
        <div className="relative ml-3">
          <div>
          <a href="/Logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

    )

}

export default Navbar
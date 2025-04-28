import React, { useState } from 'react';
import { FaSignOutAlt, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import Profile from "../pages/Profile";
const Navbar = () => {
  const [isHovered, setIsHovered] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {role}=useSelector((state) => state.auth);
  console.log(role);
  const handleProfileClick = (e) => { 
    e.preventDefault();
    setIsModalOpen(true);
    setShowProfileMenu(false);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handleLogoutClick = () => {
    setShowProfileMenu(false);
    setShowLogoutModal(true);
  }

  const handleLogout = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login');
    }, 1500);
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-20 w-auto" src={logo} alt="let's Play" />
              </div>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {[
                { path: '/tournament', label: 'Tournament' },
                { path: '/FindOpponent', label: 'Find Opponent' },
                { path: '/AdminDashboard', label: 'Admin Dashboard' }
              ].map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium group ${
                    isHovered === index ? 'text-indigo-600' : 'text-gray-700'
                  }`}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform origin-left transition-transform duration-300 ease-out ${
                    isHovered === index ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Profile and Logout */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <FaUserCircle className="w-8 h-8 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">John Doe</span>
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <FaUserCircle className="w-5 h-5" />
                      <span>Your Profile</span>
                    </button>
                    <button
                      onClick={handleLogoutClick}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <FaSignOutAlt className="w-5 h-5" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Clean Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            onClick={handleModalClose}
            className="fixed inset-0 bg-white/60"
          />
          <div className="relative bg-white w-full max-w-lg rounded-lg shadow-lg shadow-blue-800 transform transition-all duration-200 ease-out scale-100">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
                <button 
                  onClick={handleModalClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <Profile />
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            onClick={() => setShowLogoutModal(false)}
            className="fixed inset-0 bg-white/60"
          />
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-indigo-600 p-8 text-center">
              <div className="inline-block p-4 rounded-full bg-indigo-500 mb-4">
                <FaUserCircle className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Sign Out</h2>
              <p className="text-indigo-100">Are you sure you want to leave?</p>
            </div>

            <div className="p-8">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-2">Currently signed in as</p>
                <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
                <p className="text-gray-500">john@example.com</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <FaSignOutAlt className="w-5 h-5" />
                      <span>Sign Out</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowLogoutModal(false)}
                  disabled={isLoading}
                  className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L&F</span>
            </div>
            <span className="font-bold text-xl text-primary">Lost & Found</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="text-secondary hover:text-primary transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard?type=lost"
              className="text-secondary hover:text-primary transition-colors font-medium"
            >
              Lost Items
            </Link>
            <Link
              to="/dashboard?type=found"
              className="text-secondary hover:text-primary transition-colors font-medium"
            >
              Found Items
            </Link>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-muted" />
              </div>
              <input
                type="text"
                placeholder="Search items..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=667eea&color=fff`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-primary">{user.username}</span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                >
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-secondary hover:bg-secondary transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaUser className="mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-secondary transition-colors"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-4">
              <Link
                to="/dashboard"
                className="text-secondary hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/dashboard?filter=lost"
                className="text-secondary hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Lost Items
              </Link>
              <Link
                to="/dashboard?filter=found"
                className="text-secondary hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Found Items
              </Link>
              <Link
                to="/profile"
                className="text-secondary hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 transition-colors font-medium text-left"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

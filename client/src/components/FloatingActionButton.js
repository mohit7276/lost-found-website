import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaExclamationTriangle, FaCheckCircle, FaTimes } from 'react-icons/fa';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 flex flex-col space-y-3"
          >
            <Link
              to="/post/lost"
              className="flex items-center space-x-3 bg-red-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              <FaExclamationTriangle className="w-5 h-5" />
              <span className="font-medium">Report Lost Item</span>
            </Link>
            <Link
              to="/post/found"
              className="flex items-center space-x-3 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              <FaCheckCircle className="w-5 h-5" />
              <span className="font-medium">Report Found Item</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          isOpen 
            ? 'bg-red-600 text-white rotate-45' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isOpen ? <FaTimes className="w-6 h-6" /> : <FaPlus className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;

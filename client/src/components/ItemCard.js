import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaEye, FaTag } from 'react-icons/fa';
import { format } from 'date-fns';

const ItemCard = ({ item }) => {
  const getStatusColor = (type) => {
    switch (type) {
      case 'lost':
        return 'bg-red-100 text-red-800';
      case 'found':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Electronics': 'bg-blue-100 text-blue-800',
      'Clothing': 'bg-purple-100 text-purple-800',
      'Books': 'bg-orange-100 text-orange-800',
      'Accessories': 'bg-pink-100 text-pink-800',
      'Sports Equipment': 'bg-green-100 text-green-800',
      'Keys': 'bg-yellow-100 text-yellow-800',
      'Documents': 'bg-indigo-100 text-indigo-800',
      'Jewelry': 'bg-red-100 text-red-800',
      'Bags': 'bg-gray-100 text-gray-800',
      'Other': 'bg-teal-100 text-teal-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/item/${item._id}`}>
        {/* Image */}
        <div className="h-48 bg-gray-200 relative overflow-hidden">
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0].url}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-6xl text-gray-400">
                {item.type === 'lost' ? '❌' : '✅'}
              </div>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.type)}`}>
              {item.type === 'lost' ? 'Lost' : 'Found'}
            </span>
          </div>

          {/* Views Counter */}
          <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
            <FaEye />
            <span>{item.views || 0}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-muted text-sm mb-4 line-clamp-3">
            {item.description}
          </p>

          {/* Category */}
          <div className="flex items-center space-x-2 mb-3">
            <FaTag className="text-muted text-sm" />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
              {item.category}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-muted text-sm mb-3">
            <FaMapMarkerAlt className="mr-2" />
            <span>{item.location}</span>
          </div>

          {/* Date */}
          <div className="flex items-center text-muted text-sm mb-4">
            <FaClock className="mr-2" />
            <span>
              {item.type === 'lost' ? 'Lost on' : 'Found on'} {format(new Date(item.dateOccurred), 'MMM dd, yyyy')}
            </span>
          </div>

          {/* Posted by */}
          <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
            <img
              src={item.userId.avatar || `https://ui-avatars.com/api/?name=${item.userId.username}&background=667eea&color=fff`}
              alt={item.userId.username}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-primary">{item.userId.username}</p>
              <p className="text-xs text-muted">
                Posted {format(new Date(item.createdAt), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>

          {/* Reward Badge */}
          {item.reward && item.reward.offered && (
            <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600 font-semibold text-sm">💰 Reward Offered</span>
                {item.reward.amount && (
                  <span className="text-yellow-800 font-bold">${item.reward.amount}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ItemCard;

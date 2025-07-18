import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { FaArrowLeft, FaMapMarkerAlt, FaClock, FaEye, FaTag, FaPhone, FaEnvelope, FaEdit, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: item, isLoading, error } = useQuery(
    ['item', id],
    async () => {
      const response = await axios.get(`/api/items/${id}`);
      return response.data;
    }
  );

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/api/items/${id}`);
        toast.success('Item deleted successfully');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to delete item');
      }
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Item Not Found</h2>
          <p className="text-muted mb-6">The item you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isOwner = user && item.userId._id === user.id;

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors mb-4"
          >
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {item.images && item.images.length > 0 ? (
              <>
                <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={item.images[0].url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {item.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {item.images.slice(1).map((image, index) => (
                      <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden shadow-md">
                        <img
                          src={image.url}
                          alt={`${item.title} ${index + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-square bg-white rounded-xl flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-8xl mb-4">
                    {item.type === 'lost' ? '❌' : '✅'}
                  </div>
                  <p className="text-muted">No image available</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title and Status */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">{item.title}</h1>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(item.type)}`}>
                      {item.type === 'lost' ? 'Lost' : 'Found'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                
                {isOwner && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/edit-item/${item._id}`)}
                      className="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-4 text-sm text-muted">
                <div className="flex items-center space-x-1">
                  <FaEye />
                  <span>{item.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaClock />
                  <span>Posted {format(new Date(item.createdAt), 'MMM dd, yyyy')}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">Description</h2>
              <p className="text-secondary leading-relaxed">{item.description}</p>
            </div>

            {/* Location & Date */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">Location & Date</h2>
              <div className="space-y-3">
                <div className="flex items-center text-secondary">
                  <FaMapMarkerAlt className="mr-3 text-primary" />
                  <div>
                    <p className="font-medium">{item.location}</p>
                    {item.specificLocation && (
                      <p className="text-sm text-muted">{item.specificLocation}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center text-secondary">
                  <FaClock className="mr-3 text-primary" />
                  <p>
                    {item.type === 'lost' ? 'Lost on' : 'Found on'}{' '}
                    {format(new Date(item.dateOccurred), 'MMMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-primary mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Reward */}
            {item.reward && item.reward.offered && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-yellow-800 mb-4">💰 Reward Offered</h2>
                {item.reward.amount && (
                  <p className="text-2xl font-bold text-yellow-900 mb-2">${item.reward.amount}</p>
                )}
                {item.reward.description && (
                  <p className="text-yellow-800">{item.reward.description}</p>
                )}
              </div>
            )}

            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">Contact Information</h2>
              
              {/* Posted by */}
              <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
                <img
                  src={item.userId.avatar || `https://ui-avatars.com/api/?name=${item.userId.username}&background=667eea&color=fff`}
                  alt={item.userId.username}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-primary">{item.userId.username}</p>
                  <p className="text-sm text-muted">
                    {item.userId.profile?.firstName} {item.userId.profile?.lastName}
                  </p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                {item.contactInfo.email && (
                  <div className="flex items-center text-secondary">
                    <FaEnvelope className="mr-3 text-primary" />
                    <a
                      href={`mailto:${item.contactInfo.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {item.contactInfo.email}
                    </a>
                  </div>
                )}
                
                {item.contactInfo.phone && (
                  <div className="flex items-center text-secondary">
                    <FaPhone className="mr-3 text-primary" />
                    <a
                      href={`tel:${item.contactInfo.phone}`}
                      className="hover:text-primary transition-colors"
                    >
                      {item.contactInfo.phone}
                    </a>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Preferred contact method:</strong> {item.contactInfo.preferredMethod}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {!isOwner && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (item.contactInfo.email) {
                      window.open(`mailto:${item.contactInfo.email}?subject=About your ${item.type} item: ${item.title}`);
                    } else if (item.contactInfo.phone) {
                      window.open(`tel:${item.contactInfo.phone}`);
                    }
                  }}
                  className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-secondary transition-colors"
                  style={{ background: 'var(--primary-gradient)' }}
                >
                  {item.type === 'lost' ? 'I Found This Item' : 'This Is My Item'}
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;

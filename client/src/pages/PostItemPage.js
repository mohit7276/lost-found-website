import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaTrash, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const PostItemPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const rewardOffered = watch('rewardOffered');

  const categories = [
    'Electronics', 'Clothing', 'Books', 'Accessories', 'Sports Equipment',
    'Keys', 'Documents', 'Jewelry', 'Bags', 'Other'
  ];

  const locations = [
    'Library', 'Cafeteria', 'Parking Lot', 'Classroom', 'Gym', 'Auditorium',
    'Student Center', 'Dormitory', 'Laboratory', 'Office', 'Other'
  ];

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const formData = new FormData();
      
      // Append form data
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'tags') {
          formData.append(key, JSON.stringify(value.split(',').map(tag => tag.trim())));
        } else if (key === 'contactInfo') {
          formData.append('contactInfo', JSON.stringify({
            phone: data.contactPhone || '',
            email: data.contactEmail || '',
            preferredMethod: data.contactMethod || 'email'
          }));
        } else if (key === 'reward') {
          formData.append('reward', JSON.stringify({
            offered: data.rewardOffered || false,
            amount: data.rewardAmount || 0,
            description: data.rewardDescription || ''
          }));
        } else if (!key.startsWith('contact') && !key.startsWith('reward')) {
          formData.append(key, value);
        }
      });

      formData.append('type', type);
      
      // Append images
      images.forEach(image => {
        formData.append('images', image.file);
      });

      const response = await axios.post('/api/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success(`${type === 'lost' ? 'Lost' : 'Found'} item posted successfully!`);
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to post item';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

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
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-primary mb-2"
          >
            Post {type === 'lost' ? 'Lost' : 'Found'} Item
          </motion.h1>
          <p className="text-secondary text-lg">
            {type === 'lost' 
              ? 'Report an item you\'ve lost to help others find it for you'
              : 'Report an item you\'ve found to help return it to its owner'
            }
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-primary mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Item Name *
                  </label>
                  <input
                    {...register('title', {
                      required: 'Item name is required',
                      maxLength: { value: 100, message: 'Name must be less than 100 characters' }
                    })}
                    type="text"
                    placeholder="e.g., iPhone 13, Blue Backpack"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Category *
                  </label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-primary mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description', {
                    required: 'Description is required',
                    maxLength: { value: 1000, message: 'Description must be less than 1000 characters' }
                  })}
                  rows={4}
                  placeholder="Provide a detailed description of the item..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Location & Date */}
            <div>
              <h2 className="text-xl font-semibold text-primary mb-4">Location & Date</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Location *
                  </label>
                  <select
                    {...register('location', { required: 'Location is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Date {type === 'lost' ? 'Lost' : 'Found'} *
                  </label>
                  <input
                    {...register('dateOccurred', { required: 'Date is required' })}
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.dateOccurred && (
                    <p className="mt-1 text-sm text-red-600">{errors.dateOccurred.message}</p>
                  )}
                </div>
              </div>

              {/* Specific Location */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-primary mb-2">
                  Specific Location (Optional)
                </label>
                <input
                  {...register('specificLocation')}
                  type="text"
                  placeholder="e.g., Near the coffee shop, Third floor"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-xl font-semibold text-primary mb-4">Images</h2>
              
              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-primary bg-blue-50' : 'border-gray-300 hover:border-primary'
                }`}
              >
                <input {...getInputProps()} />
                <FaUpload className="mx-auto text-4xl text-muted mb-4" />
                <p className="text-lg text-secondary mb-2">
                  {isDragActive ? 'Drop the files here' : 'Drag & drop images here'}
                </p>
                <p className="text-sm text-muted">
                  or click to select files (Max 5 files, 5MB each)
                </p>
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-primary mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('contactPhone')}
                    type="tel"
                    placeholder="e.g., +1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Email (Optional)
                  </label>
                  <input
                    {...register('contactEmail')}
                    type="email"
                    placeholder="Will use your account email if empty"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-primary mb-2">
                  Preferred Contact Method
                </label>
                <select
                  {...register('contactMethod')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            {/* Reward (for lost items) */}
            {type === 'lost' && (
              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">Reward (Optional)</h2>
                
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    {...register('rewardOffered')}
                    type="checkbox"
                    id="rewardOffered"
                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="rewardOffered" className="text-sm font-medium text-primary">
                    I'm offering a reward for this item
                  </label>
                </div>

                {rewardOffered && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Reward Amount ($)
                      </label>
                      <input
                        {...register('rewardAmount')}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="e.g., 50.00"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Reward Description
                      </label>
                      <textarea
                        {...register('rewardDescription')}
                        rows={3}
                        placeholder="Additional details about the reward..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            <div>
              <h2 className="text-xl font-semibold text-primary mb-4">Tags (Optional)</h2>
              <input
                {...register('tags')}
                type="text"
                placeholder="e.g., black, leather, vintage (comma-separated)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="mt-1 text-sm text-muted">
                Add tags to help people find your item more easily
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-secondary transition-colors disabled:opacity-50"
                style={{
                  background: loading ? 'var(--text-muted)' : 'var(--primary-gradient)',
                }}
              >
                {loading ? (
                  <LoadingSpinner size="small" color="white" />
                ) : (
                  `Post ${type === 'lost' ? 'Lost' : 'Found'} Item`
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PostItemPage;

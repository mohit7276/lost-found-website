import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { FaPlus, FaSearch, FaFilter, FaMapMarkerAlt, FaClock, FaEye } from 'react-icons/fa';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || '',
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc',
  });

  const categories = [
    'Electronics', 'Clothing', 'Books', 'Accessories', 'Sports Equipment',
    'Keys', 'Documents', 'Jewelry', 'Bags', 'Other'
  ];

  const locations = [
    'Library', 'Cafeteria', 'Parking Lot', 'Classroom', 'Gym', 'Auditorium',
    'Student Center', 'Dormitory', 'Laboratory', 'Office', 'Other'
  ];

  // Fetch items
  const { data: itemsData, isLoading, refetch } = useQuery(
    ['items', filters],
    async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await axios.get(`/api/items?${params}`);
      return response.data;
    },
    {
      keepPreviousData: true,
    }
  );

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      type: '',
      category: '',
      location: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-primary mb-4"
          >
            Lost & Found Dashboard
          </motion.h1>
          <p className="text-secondary text-lg">
            Find your lost items or help others by reporting what you've found
          </p>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <Link
            to="/post/lost"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FaPlus className="text-red-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary">Post Lost Item</h3>
                <p className="text-muted">Report something you've lost</p>
              </div>
            </div>
          </Link>

          <Link
            to="/post/found"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaPlus className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary">Post Found Item</h3>
                <p className="text-muted">Report something you've found</p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary">Search & Filter</h2>
            <button
              onClick={resetFilters}
              className="text-muted hover:text-primary transition-colors"
            >
              Reset Filters
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-muted" />
              </div>
              <input
                type="text"
                placeholder="Search items by name, description, or location..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
            </div>
          </form>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Sort By
              </label>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleFilterChange('sortBy', sortBy);
                  handleFilterChange('sortOrder', sortOrder);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="views-desc">Most Viewed</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Items Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-primary">
              Recent Posts
              {itemsData?.items && (
                <span className="text-muted text-base ml-2">
                  ({itemsData.items.length} items)
                </span>
              )}
            </h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="large" />
            </div>
          ) : itemsData?.items?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itemsData.items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ItemCard item={item} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-primary mb-2">No items found</h3>
              <p className="text-muted mb-6">
                Try adjusting your search criteria or be the first to post an item
              </p>
              <div className="space-x-4">
                <Link
                  to="/post/lost"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
                >
                  Post Lost Item
                </Link>
                <Link
                  to="/post/found"
                  className="inline-block border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Post Found Item
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;

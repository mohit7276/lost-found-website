import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaClock, 
  FaEye, 
  FaHeart,
  FaUser,
  FaChartBar,
  FaListAlt,
  FaCalendarAlt,
  FaTh,
  FaList,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowRight,
  FaSort,
  FaGlobe,
  FaComments,
  FaTag,
  FaImage,
  FaSearchPlus,
  FaQuestionCircle
} from 'react-icons/fa';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
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
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'var(--primary-gradient)',
          }}
        />
        <div className="relative bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
                style={{ textShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
              >
                Dashboard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed"
              >
                Your central hub for finding lost items and helping others reunite with their belongings
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">Platform Impact</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              See how our community is making a difference in reuniting people with their belongings
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                     style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                  <FaExclamationTriangle className="text-white text-2xl" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {itemsData?.stats?.lostItems || 0}
                </div>
                <div className="text-secondary font-medium">Lost Items</div>
                <div className="text-sm text-muted mt-1">Waiting to be found</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                     style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                  <FaCheckCircle className="text-white text-2xl" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {itemsData?.stats?.foundItems || 0}
                </div>
                <div className="text-secondary font-medium">Found Items</div>
                <div className="text-sm text-muted mt-1">Looking for owners</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                     style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                  <FaHeart className="text-white text-2xl" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {itemsData?.stats?.reunited || 0}
                </div>
                <div className="text-secondary font-medium">Reunited</div>
                <div className="text-sm text-muted mt-1">Happy endings</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                     style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <FaUser className="text-white text-2xl" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {itemsData?.stats?.activeUsers || 0}
                </div>
                <div className="text-secondary font-medium">Active Users</div>
                <div className="text-sm text-muted mt-1">Community helpers</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Quick Actions</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Get started with reporting lost or found items, or manage your account
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="group"
            >
              <Link to="/post/lost" className="block">
                <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-red-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-red-50 rounded-full -mr-10 -mt-10 transition-all duration-300 group-hover:scale-125"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                         style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                      <FaExclamationTriangle className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-red-600 transition-colors">
                      Report Lost Item
                    </h3>
                    <p className="text-secondary mb-6 leading-relaxed">
                      Lost something valuable? Let our community help you find it. Create a detailed report with photos and description.
                    </p>
                    <div className="flex items-center text-red-600 font-semibold">
                      <span>Get Started</span>
                      <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="group"
            >
              <Link to="/post/found" className="block">
                <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-green-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-full -mr-10 -mt-10 transition-all duration-300 group-hover:scale-125"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                         style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                      <FaCheckCircle className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-green-600 transition-colors">
                      Report Found Item
                    </h3>
                    <p className="text-secondary mb-6 leading-relaxed">
                      Found something that isn't yours? Help reunite it with its owner. Post details and photos to help identify the owner.
                    </p>
                    <div className="flex items-center text-green-600 font-semibold">
                      <span>Help Someone</span>
                      <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="group"
            >
              <Link to="/profile" className="block">
                <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -mr-10 -mt-10 transition-all duration-300 group-hover:scale-125"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                         style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                      <FaUser className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-blue-600 transition-colors">
                      My Profile
                    </h3>
                    <p className="text-secondary mb-6 leading-relaxed">
                      Manage your account, view your posted items, and track your contributions to the community.
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold">
                      <span>View Profile</span>
                      <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-4">Search & Discover</h2>
              <p className="text-lg text-secondary max-w-2xl mx-auto">
                Find lost items or browse what others have found using our powerful search tools
              </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-secondary">View:</span>
                  <div className="flex bg-gray-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2 text-sm font-medium transition-all ${
                        viewMode === 'grid' 
                          ? 'bg-primary text-white shadow-md' 
                          : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      <FaTh className="mr-2 inline" />
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-4 py-2 text-sm font-medium transition-all ${
                        viewMode === 'list' 
                          ? 'bg-primary text-white shadow-md' 
                          : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      <FaList className="mr-2 inline" />
                      List
                    </button>
                  </div>
                </div>
              </div>
              
              <button
                onClick={resetFilters}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Reset All Filters
              </button>
            </div>

            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <FaSearch className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for items by name, description, or location..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-16 pr-32 py-5 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-lg placeholder-gray-400 bg-gray-50 focus:bg-white"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-3 bottom-3 px-8 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                  style={{ background: 'var(--primary-gradient)' }}
                >
                  Search
                </button>
              </div>
            </form>

            {/* Filter Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-primary">
                  <FaListAlt className="mr-2 text-primary" />
                  Item Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-gray-50 focus:bg-white"
                >
                  <option value="">All Types</option>
                  <option value="lost">Lost Items</option>
                  <option value="found">Found Items</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-primary">
                  <FaFilter className="mr-2 text-primary" />
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-gray-50 focus:bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-primary">
                  <FaMapMarkerAlt className="mr-2 text-primary" />
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-gray-50 focus:bg-white"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-primary">
                  <FaSort className="mr-2 text-primary" />
                  Sort By
                </label>
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    handleFilterChange('sortBy', sortBy);
                    handleFilterChange('sortOrder', sortOrder);
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-gray-50 focus:bg-white"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                  <option value="views-desc">Most Viewed</option>
                  <option value="dateOccurred-desc">Most Recent Lost/Found</option>
                </select>
              </div>
            </div>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="text-sm font-medium text-secondary">Quick Filters:</span>
              <button
                onClick={() => handleFilterChange('type', 'lost')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filters.type === 'lost' 
                    ? 'bg-red-100 text-red-800 border-2 border-red-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Lost Items
              </button>
              <button
                onClick={() => handleFilterChange('type', 'found')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filters.type === 'found' 
                    ? 'bg-green-100 text-green-800 border-2 border-green-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Found Items
              </button>
              <button
                onClick={() => handleFilterChange('category', 'Electronics')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filters.category === 'Electronics' 
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Electronics
              </button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Items Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-16"
        >
          {/* Items Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--primary-gradient)' }}>
                <FaListAlt className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-primary">Browse Items</h2>
                {itemsData?.items && (
                  <p className="text-lg text-secondary">
                    {itemsData.items.length} items found
                  </p>
                )}
              </div>
            </div>
            
            {/* Results Summary and Actions */}
            <div className="flex items-center space-x-4">
              {/* Results Summary */}
              {itemsData?.items && (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="px-4 py-2 bg-blue-50 rounded-xl border border-blue-200">
                    <span className="text-sm font-medium text-blue-800">
                      {itemsData.items.filter(item => item.type === 'lost').length} Lost
                    </span>
                  </div>
                  <div className="px-4 py-2 bg-green-50 rounded-xl border border-green-200">
                    <span className="text-sm font-medium text-green-800">
                      {itemsData.items.filter(item => item.type === 'found').length} Found
                    </span>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <Link
                  to="/post/lost"
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 font-medium text-sm hover:shadow-lg"
                >
                  <FaPlus className="mr-2" />
                  Post Lost
                </Link>
                <Link
                  to="/post/found"
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300 font-medium text-sm hover:shadow-lg"
                >
                  <FaPlus className="mr-2" />
                  Post Found
                </Link>
              </div>
            </div>
          </div>

          {/* Items Grid/List */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-xl text-secondary">Loading items...</p>
              </div>
            </div>
          ) : itemsData?.items?.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
                  : 'space-y-6'
              }`}
            >
              {itemsData.items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group ${viewMode === 'list' ? 'w-full' : ''}`}
                >
                  {viewMode === 'grid' ? (
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                      {/* Enhanced ItemCard with landing page quality */}
                      <div className="relative">
                        {/* Item Image */}
                        <div className="relative h-48 overflow-hidden">
                          {item.images && item.images.length > 0 ? (
                            <img
                              src={item.images[0].url}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <FaImage className="text-4xl text-gray-400" />
                            </div>
                          )}
                          
                          {/* Type Badge */}
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              item.type === 'lost' 
                                ? 'bg-red-100 text-red-800 border border-red-200' 
                                : 'bg-green-100 text-green-800 border border-green-200'
                            }`}>
                              {item.type === 'lost' ? 'Lost' : 'Found'}
                            </span>
                          </div>

                          {/* Date Badge */}
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                              {new Date(item.dateOccurred).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
                              {item.title}
                            </h3>
                            <FaEye className="text-gray-400 text-sm" />
                          </div>
                          
                          <p className="text-secondary mb-4 line-clamp-2">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-gray-600">
                              <FaMapMarkerAlt className="mr-2 text-primary" />
                              <span className="text-sm">{item.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <FaTag className="mr-2 text-primary" />
                              <span className="text-sm">{item.category}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-500">
                              <FaUser className="mr-2" />
                              <span className="text-sm">{item.userId.username}</span>
                            </div>
                            <Link
                              to={`/item/${item._id}`}
                              className="px-4 py-2 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                              style={{ background: 'var(--primary-gradient)' }}
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Enhanced List View
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6">
                      <Link to={`/item/${item._id}`} className="block">
                        <div className="flex items-center space-x-6">
                          <div className="w-24 h-24 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                            {item.images && item.images.length > 0 ? (
                              <img
                                src={item.images[0].url}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                <FaImage className="text-xl text-gray-400" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                                {item.title}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                item.type === 'lost' 
                                  ? 'bg-red-100 text-red-800 border border-red-200' 
                                  : 'bg-green-100 text-green-800 border border-green-200'
                              }`}>
                                {item.type === 'lost' ? 'Lost' : 'Found'}
                              </span>
                            </div>
                            
                            <p className="text-secondary mb-3 line-clamp-2">{item.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-6 text-gray-600">
                                <div className="flex items-center">
                                  <FaMapMarkerAlt className="mr-2 text-primary" />
                                  <span className="text-sm">{item.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <FaClock className="mr-2 text-primary" />
                                  <span className="text-sm">{new Date(item.dateOccurred).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                  <FaEye className="mr-2 text-primary" />
                                  <span className="text-sm">{item.views || 0} views</span>
                                </div>
                                <div className="flex items-center">
                                  <FaUser className="mr-2 text-primary" />
                                  <span className="text-sm">{item.userId.username}</span>
                                </div>
                              </div>
                              <div className="px-4 py-2 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                                   style={{ background: 'var(--primary-gradient)' }}>
                                View Details
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <FaSearchPlus className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">No Items Found</h3>
              <p className="text-lg text-secondary mb-8 max-w-md mx-auto">
                {filters.search || filters.type || filters.category || filters.location
                  ? 'Try adjusting your search criteria or explore different categories'
                  : 'Be the first to post an item and help build our community'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/post/lost"
                  className="flex items-center justify-center px-8 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 hover:shadow-lg"
                >
                  <FaExclamationTriangle className="mr-2" />
                  Report Lost Item
                </Link>
                <Link
                  to="/post/found"
                  className="flex items-center justify-center px-8 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 hover:shadow-lg"
                >
                  <FaCheckCircle className="mr-2" />
                  Report Found Item
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mt-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20"></div>
          
          <div className="relative z-10 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <FaQuestionCircle className="text-3xl" />
              </div>
              <h3 className="text-4xl font-bold mb-4">Need Help?</h3>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Our community is here to help you reunite with your lost items. Learn best practices for searching and reporting items effectively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:bg-white/20 hover:scale-105 border border-white/20">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaSearch className="text-3xl" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">Smart Search Tips</h4>
                  <p className="text-sm opacity-90 leading-relaxed mb-6">
                    Use specific keywords, check multiple locations, and filter by categories to find what you're looking for faster.
                  </p>
                  <div className="flex items-center text-white/80 font-medium">
                    <span>Learn More</span>
                    <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:bg-white/20 hover:scale-105 border border-white/20">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaComments className="text-3xl" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">Secure Contact System</h4>
                  <p className="text-sm opacity-90 leading-relaxed mb-6">
                    Connect with item owners through our secure messaging system that protects your privacy while facilitating communication.
                  </p>
                  <div className="flex items-center text-white/80 font-medium">
                    <span>Get Started</span>
                    <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:bg-white/20 hover:scale-105 border border-white/20">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaHeart className="text-3xl" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">Success Stories</h4>
                  <p className="text-sm opacity-90 leading-relaxed mb-6">
                    Read inspiring stories of successful reunions and learn how our community has helped thousands find their lost items.
                  </p>
                  <div className="flex items-center text-white/80 font-medium">
                    <span>Read Stories</span>
                    <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center space-x-4">
                <button className="px-8 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  Contact Support
                </button>
                <button className="px-8 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30">
                  FAQ
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;

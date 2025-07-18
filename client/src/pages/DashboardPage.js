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
  FaComments
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Lost & Found Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl opacity-90 max-w-2xl mx-auto"
            >
              Connect with your community to find lost items and help others reunite with their belongings
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
                <FaExclamationTriangle className="text-red-600 text-xl" />
              </div>
              <div className="text-2xl font-bold text-primary">
                {itemsData?.stats?.lostItems || 0}
              </div>
              <div className="text-sm text-muted">Lost Items</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>
              <div className="text-2xl font-bold text-primary">
                {itemsData?.stats?.foundItems || 0}
              </div>
              <div className="text-sm text-muted">Found Items</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <FaHeart className="text-blue-600 text-xl" />
              </div>
              <div className="text-2xl font-bold text-primary">
                {itemsData?.stats?.reunited || 0}
              </div>
              <div className="text-sm text-muted">Successfully Reunited</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                <FaUser className="text-purple-600 text-xl" />
              </div>
              <div className="text-2xl font-bold text-primary">
                {itemsData?.stats?.activeUsers || 0}
              </div>
              <div className="text-sm text-muted">Active Users</div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/post/lost"
              className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-red-500"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <FaExclamationTriangle className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary group-hover:text-red-600 transition-colors">
                      Report Lost Item
                    </h3>
                    <p className="text-muted text-sm">Lost something? Let the community help you find it</p>
                  </div>
                </div>
                <FaArrowRight className="text-gray-400 group-hover:text-red-500 transition-colors" />
              </div>
            </Link>

            <Link
              to="/post/found"
              className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <FaCheckCircle className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary group-hover:text-green-600 transition-colors">
                      Report Found Item
                    </h3>
                    <p className="text-muted text-sm">Found something? Help reunite it with its owner</p>
                  </div>
                </div>
                <FaArrowRight className="text-gray-400 group-hover:text-green-500 transition-colors" />
              </div>
            </Link>

            <Link
              to="/profile"
              className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <FaUser className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary group-hover:text-blue-600 transition-colors">
                      My Profile
                    </h3>
                    <p className="text-muted text-sm">View and manage your posted items</p>
                  </div>
                </div>
                <FaArrowRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Enhanced Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <FaSearch className="text-primary text-xl" />
              <h2 className="text-xl font-semibold text-primary">Search & Discover</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted">View:</span>
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 text-sm ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <FaTh />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 text-sm ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <FaList />
                  </button>
                </div>
              </div>
              <button
                onClick={resetFilters}
                className="text-sm text-primary hover:text-secondary transition-colors font-medium"
              >
                Reset All
              </button>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for items by name, description, or location..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium"
              >
                Search
              </button>
            </div>
          </form>

          {/* Advanced Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                <FaListAlt className="inline mr-2" />
                Item Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              >
                <option value="">All Types</option>
                <option value="lost">Lost Items</option>
                <option value="found">Found Items</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                <FaFilter className="inline mr-2" />
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
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
                <FaMapMarkerAlt className="inline mr-2" />
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
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
                <FaSort className="inline mr-2" />
                Sort By
              </label>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleFilterChange('sortBy', sortBy);
                  handleFilterChange('sortOrder', sortOrder);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="views-desc">Most Viewed</option>
                <option value="dateOccurred-desc">Most Recent Lost/Found</option>
              </select>
            </div>

            {/* Quick Filter Buttons */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                <FaClock className="inline mr-2" />
                Quick Filters
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange('type', 'lost')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    filters.type === 'lost' 
                      ? 'bg-red-100 text-red-800 border-red-300' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Lost
                </button>
                <button
                  onClick={() => handleFilterChange('type', 'found')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    filters.type === 'found' 
                      ? 'bg-green-100 text-green-800 border-green-300' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Found
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Items Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold text-primary">
                Discover Items
              </h2>
              {itemsData?.items && (
                <div className="flex items-center space-x-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {itemsData.items.length} items found
                  </span>
                  {filters.type && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      filters.type === 'lost' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {filters.type === 'lost' ? 'Lost Items' : 'Found Items'}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/post/lost"
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
              >
                <FaPlus className="inline mr-2" />
                Post Lost
              </Link>
              <Link
                to="/post/found"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
              >
                <FaPlus className="inline mr-2" />
                Post Found
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <LoadingSpinner size="large" />
                <p className="text-muted mt-4">Loading items...</p>
              </div>
            </div>
          ) : itemsData?.items?.length > 0 ? (
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
            }`}>
              {itemsData.items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={viewMode === 'list' ? 'w-full' : ''}
                >
                  {viewMode === 'grid' ? (
                    <ItemCard item={item} />
                  ) : (
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                      <Link to={`/item/${item._id}`} className="block">
                        <div className="flex items-center space-x-6">
                          <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                            {item.images && item.images.length > 0 ? (
                              <img
                                src={item.images[0].url}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <span className="text-3xl">
                                  {item.type === 'lost' ? '❌' : '✅'}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                item.type === 'lost' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {item.type === 'lost' ? 'Lost' : 'Found'}
                              </span>
                            </div>
                            
                            <p className="text-muted mb-3 line-clamp-2">{item.description}</p>
                            
                            <div className="flex items-center space-x-6 text-sm text-muted">
                              <div className="flex items-center space-x-1">
                                <FaMapMarkerAlt />
                                <span>{item.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FaClock />
                                <span>{new Date(item.dateOccurred).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FaEye />
                                <span>{item.views || 0} views</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FaUser />
                                <span>{item.userId.username}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold text-primary mb-4">No items found</h3>
              <p className="text-muted mb-8 max-w-md mx-auto">
                {filters.search || filters.type || filters.category || filters.location
                  ? 'Try adjusting your search criteria or explore different categories'
                  : 'Be the first to post an item and help build our community'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/post/lost"
                  className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors inline-flex items-center justify-center"
                >
                  <FaExclamationTriangle className="mr-2" />
                  Report Lost Item
                </Link>
                <Link
                  to="/post/found"
                  className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center justify-center"
                >
                  <FaCheckCircle className="mr-2" />
                  Report Found Item
                </Link>
              </div>
            </div>
          )}
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our community is here to help. Learn how to effectively search for lost items or report found items.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <FaGlobe className="text-3xl mb-3 mx-auto" />
                <h4 className="font-semibold mb-2">Search Tips</h4>
                <p className="text-sm opacity-90">Use specific keywords and check multiple locations</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <FaComments className="text-3xl mb-3 mx-auto" />
                <h4 className="font-semibold mb-2">Contact Owners</h4>
                <p className="text-sm opacity-90">Use our secure messaging system to connect</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <FaHeart className="text-3xl mb-3 mx-auto" />
                <h4 className="font-semibold mb-2">Success Stories</h4>
                <p className="text-sm opacity-90">Read about successful reunions in our community</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;

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
  FaQuestionCircle,
  FaTimes
} from 'react-icons/fa';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import FloatingActionButton from '../components/FloatingActionButton';

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
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Lost & Found Dashboard</h1>
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-sm text-gray-500">|</span>
                <span className="text-sm text-gray-600">
                  {itemsData?.items?.length || 0} Items
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to="/post/lost"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaExclamationTriangle className="w-4 h-4 mr-2" />
                Add Lost Item
              </Link>
              <Link
                to="/post/found"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaCheckCircle className="w-4 h-4 mr-2" />
                Add Found Item
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-gray-600 mb-6">Report a lost item or help someone find their belongings</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/post/lost"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <FaExclamationTriangle className="w-5 h-5 mr-3" />
                Report Lost Item
              </Link>
              <Link
                to="/post/found"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <FaCheckCircle className="w-5 h-5 mr-3" />
                Report Found Item
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for items..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">All Types</option>
                <option value="lost">Lost Items</option>
                <option value="found">Found Items</option>
              </select>

              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <button
                onClick={resetFilters}
                className="px-4 py-2.5 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2.5 text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaTh className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2.5 text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaListAlt className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {itemsData?.items?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <FaExclamationTriangle className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lost Items</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {itemsData?.items?.filter(item => item.type === 'lost').length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaCheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Found Items</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {itemsData?.items?.filter(item => item.type === 'found').length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaHeart className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recent Posts</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {itemsData?.items?.filter(item => {
                    const createdAt = new Date(item.createdAt);
                    const now = new Date();
                    const diffTime = Math.abs(now - createdAt);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays <= 7;
                  }).length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
              <div className="flex items-center space-x-2">
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    handleFilterChange('sortBy', sortBy);
                    handleFilterChange('sortOrder', sortOrder);
                  }}
                  className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading items...</span>
              </div>
            ) : itemsData?.items?.length > 0 ? (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
              }`}>
                {itemsData.items.map((item) => (
                  <div key={item._id} className={`${
                    viewMode === 'grid' ? 'bg-white' : 'bg-gray-50'
                  } rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors`}>
                    {viewMode === 'grid' ? (
                      // Grid View
                      <div className="space-y-4">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                          {item.images && item.images.length > 0 ? (
                            <img
                              src={item.images[0].url}
                              alt={item.title}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                              <FaTimes className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.type === 'lost' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(item.dateOccurred).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <h3 className="font-medium text-gray-900 truncate">
                            {item.title}
                          </h3>
                          
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                            <span className="truncate">{item.location}</span>
                          </div>
                        </div>
                        
                        <Link
                          to={`/item/${item._id}`}
                          className="block w-full text-center py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    ) : (
                      // List View
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          {item.images && item.images.length > 0 ? (
                            <img
                              src={item.images[0].url}
                              alt={item.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <FaTimes className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-gray-900 truncate">
                              {item.title}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.type === 'lost' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {item.type === 'lost' ? 'Lost' : 'Found'}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                                <span>{item.location}</span>
                              </div>
                              <div className="flex items-center">
                                <FaClock className="w-4 h-4 mr-1" />
                                <span>{new Date(item.dateOccurred).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <Link
                              to={`/item/${item._id}`}
                              className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaSearchPlus className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No items found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filters.search || filters.type || filters.category || filters.location
                    ? 'Try adjusting your search criteria'
                    : 'Get started by posting your first item'}
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                  <Link
                    to="/post/lost"
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FaExclamationTriangle className="w-4 h-4 mr-2" />
                    Add Lost Item
                  </Link>
                  <Link
                    to="/post/found"
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaCheckCircle className="w-4 h-4 mr-2" />
                    Add Found Item
                  </Link>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default DashboardPage;

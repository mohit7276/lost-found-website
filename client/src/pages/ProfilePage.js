import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaBuilding, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: user?.username || '',
      firstName: user?.profile?.firstName || '',
      lastName: user?.profile?.lastName || '',
      phone: user?.profile?.phone || '',
      address: user?.profile?.address || '',
      college: user?.profile?.college || '',
      department: user?.profile?.department || '',
    },
  });

  // Fetch user statistics
  const { data: stats, isLoading: statsLoading } = useQuery(
    ['user-stats'],
    async () => {
      const response = await axios.get('/api/users/stats');
      return response.data;
    }
  );

  // Fetch user's items
  const { data: userItems, isLoading: itemsLoading } = useQuery(
    ['user-items'],
    async () => {
      const response = await axios.get('/api/items/user/me');
      return response.data;
    }
  );

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await updateProfile({
      username: data.username,
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        college: data.college,
        department: data.department,
      },
    });
    
    if (result.success) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">My Profile</h1>
          <p className="text-secondary text-lg">Manage your account information and view your activity</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-primary">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSubmit(onSubmit)}
                      disabled={loading}
                      className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
                    >
                      {loading ? <LoadingSpinner size="small" color="white" /> : <FaSave />}
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <FaTimes />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=667eea&color=fff`}
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-primary">{user?.username}</h3>
                    <p className="text-sm text-muted">{user?.email}</p>
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    <FaUser className="inline mr-2" />
                    Username
                  </label>
                  <input
                    {...register('username', {
                      required: 'Username is required',
                      minLength: { value: 3, message: 'Username must be at least 3 characters' },
                    })}
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                  )}
                </div>

                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      First Name
                    </label>
                    <input
                      {...register('firstName')}
                      type="text"
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Last Name
                    </label>
                    <input
                      {...register('lastName')}
                      type="text"
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {/* Email (readonly) */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    <FaEnvelope className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                  <p className="mt-1 text-sm text-muted">Email cannot be changed</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    <FaPhone className="inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    disabled={!isEditing}
                    placeholder="e.g., +1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    <FaMapMarkerAlt className="inline mr-2" />
                    Address
                  </label>
                  <input
                    {...register('address')}
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
                  />
                </div>

                {/* College */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    <FaGraduationCap className="inline mr-2" />
                    College/University
                  </label>
                  <input
                    {...register('college')}
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    <FaBuilding className="inline mr-2" />
                    Department
                  </label>
                  <input
                    {...register('department')}
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </form>
            </div>
          </motion.div>

          {/* Statistics and Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Statistics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Statistics</h2>
              
              {statsLoading ? (
                <div className="flex justify-center py-4">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted">Total Posts</span>
                    <span className="font-semibold text-primary">{stats?.totalPosts || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted">Lost Items</span>
                    <span className="font-semibold text-red-600">{stats?.lostItems || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted">Found Items</span>
                    <span className="font-semibold text-green-600">{stats?.foundItems || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted">Active Posts</span>
                    <span className="font-semibold text-blue-600">{stats?.activePosts || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted">Returned Items</span>
                    <span className="font-semibold text-purple-600">{stats?.returnedItems || 0}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Recent Activity</h2>
              
              {itemsLoading ? (
                <div className="flex justify-center py-4">
                  <LoadingSpinner />
                </div>
              ) : userItems?.items?.length > 0 ? (
                <div className="space-y-3">
                  {userItems.items.slice(0, 5).map((item) => (
                    <div key={item._id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${item.type === 'lost' ? 'bg-red-500' : 'bg-green-500'}`} />
                      <div className="flex-1">
                        <p className="font-medium text-primary text-sm">{item.title}</p>
                        <p className="text-xs text-muted">
                          {item.type === 'lost' ? 'Lost' : 'Found'} • {item.location}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 'active' ? 'bg-green-100 text-green-800' :
                        item.status === 'claimed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📋</div>
                  <p className="text-muted">No recent activity</p>
                </div>
              )}
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Account Information</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted">Member Since</span>
                  <span className="font-semibold text-primary">
                    {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">Account Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user?.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user?.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">Login Method</span>
                  <span className="font-semibold text-primary">
                    {user?.googleId ? 'Google' : 'Email'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

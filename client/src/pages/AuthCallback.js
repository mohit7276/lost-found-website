import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get('token');

      if (token) {
        // Store the token
        localStorage.setItem('token', token);
        
        // Set axios default header
        const axios = require('axios');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // If no token, redirect to login
        navigate('/login');
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-lg text-secondary">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;

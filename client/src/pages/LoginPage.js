import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginPage = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await login(data);
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center auth-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="auth-container">
        {/* Left side - Welcome Card */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="auth-welcome-card"
        >
          <div className="auth-welcome-content">
            <h2 className="auth-welcome-title">
              Hello, Welcome!
            </h2>
            <p className="auth-welcome-subtitle">
              Don't have an account?
            </p>
            <Link 
              to="/register" 
              className="auth-welcome-btn"
            >
              Register
            </Link>
          </div>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="auth-form-card"
        >
          <div className="auth-form-content">
            <h2 className="auth-form-title">Login</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              <div className="auth-input-group">
                <div className="auth-input-wrapper">
                  <FaUser className="auth-input-icon" />
                  <input
                    {...register('username', { required: 'Username is required' })}
                    type="text"
                    placeholder="Username"
                    className="auth-input"
                  />
                </div>
                {errors.username && (
                  <p className="auth-error">{errors.username.message}</p>
                )}
              </div>

              <div className="auth-input-group">
                <div className="auth-input-wrapper">
                  <FaLock className="auth-input-icon" />
                  <input
                    {...register('password', { required: 'Password is required' })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="auth-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="auth-input-toggle"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="auth-error">{errors.password.message}</p>
                )}
              </div>

              <Link 
                to="/forgot-password" 
                className="auth-forgot-link"
              >
                Forgot password?
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="auth-submit-btn"
              >
                {loading ? <LoadingSpinner size="small" /> : 'Login'}
              </button>

              <div className="auth-divider">
                <span>or login with social platforms</span>
              </div>

              <div className="auth-social-buttons">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="auth-social-btn"
                >
                  <FaGoogle />
                </button>
                <button
                  type="button"
                  className="auth-social-btn"
                >
                  <FaGithub />
                </button>
                <button
                  type="button"
                  className="auth-social-btn"
                >
                  <FaLinkedin />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;

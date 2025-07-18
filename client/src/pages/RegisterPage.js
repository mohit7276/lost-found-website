import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const result = await registerUser({
        username: data.username,
        email: data.email,
        password: data.password
      });
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError('root', {
          message: result.error || 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
      setError('root', {
        message: error.message || 'Registration failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        {/* Left side - Welcome Card */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="auth-welcome-card"
        >
          <div className="auth-welcome-content">
            <h1 className="auth-welcome-title">Join Our Community</h1>
            <p className="auth-welcome-text">
              Create your account and start sharing items with others in your community.
            </p>
            
            <div className="auth-features">
              <div className="feature-item">
                <div className="feature-icon">🏠</div>
                <span>Share household items</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <span>Connect with neighbors</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💚</div>
                <span>Reduce waste together</span>
              </div>
            </div>
          </div>
          
          <div className="auth-welcome-content">
            <p className="auth-welcome-subtitle">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="auth-welcome-btn"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* Right side - Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="auth-form-card"
        >
          <div className="auth-form-content">
            <h2 className="auth-form-title">Create Account</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              <div className="auth-input-group">
                <div className="auth-input-wrapper">
                  <FaUser className="auth-input-icon" />
                  <input
                    {...register('username', { 
                      required: 'Username is required',
                      minLength: { value: 3, message: 'Username must be at least 3 characters' }
                    })}
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
                  <FaEnvelope className="auth-input-icon" />
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' }
                    })}
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                  />
                </div>
                {errors.email && (
                  <p className="auth-error">{errors.email.message}</p>
                )}
              </div>

              <div className="auth-input-group">
                <div className="auth-input-wrapper">
                  <FaLock className="auth-input-icon" />
                  <input
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="auth-input"
                  />
                  <button
                    type="button"
                    className="auth-input-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="auth-error">{errors.password.message}</p>
                )}
              </div>

              <div className="auth-input-group">
                <div className="auth-input-wrapper">
                  <FaLock className="auth-input-icon" />
                  <input
                    {...register('confirmPassword', { 
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className="auth-input"
                  />
                  <button
                    type="button"
                    className="auth-input-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="auth-error">{errors.confirmPassword.message}</p>
                )}
              </div>

              {errors.root && (
                <p className="auth-error">{errors.root.message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="auth-submit-btn"
              >
                {loading ? <LoadingSpinner size="small" /> : 'Create Account'}
              </button>

              <div className="auth-divider">
                <span>or register with social platforms</span>
              </div>

              <div className="auth-social-buttons">
                <button
                  type="button"
                  className="auth-social-btn"
                  onClick={() => window.location.href = '/auth/google'}
                >
                  <FaGoogle />
                </button>
                <button
                  type="button"
                  className="auth-social-btn"
                  onClick={() => window.location.href = '/auth/github'}
                >
                  <FaGithub />
                </button>
                <button
                  type="button"
                  className="auth-social-btn"
                  onClick={() => window.location.href = '/auth/linkedin'}
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

export default RegisterPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaShieldAlt, FaUsers, FaClock } from 'react-icons/fa';

const LandingPage = () => {
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
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center min-h-[80vh]">
            {/* Left Side - Welcome Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 mb-12 lg:mb-0"
            >
              <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-xl">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-4xl lg:text-5xl font-extrabold text-primary mb-6 leading-tight"
                >
                  Hello, Welcome!
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg text-secondary mb-8 leading-relaxed"
                >
                  Lost something precious? Found an item that doesn't belong to you? 
                  Join our community and help reunite people with their belongings.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-base text-muted mb-8"
                >
                  Don't have an account?
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="flex gap-4"
                >
                  <Link
                    to="/register"
                    className="auth-submit-btn flex-1 text-center"
                  >
                    Get Started
                  </Link>
                  
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Welcome Back Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:w-1/2 lg:ml-12"
            >
              <div
                className="bg-white p-8 lg:p-12 rounded-2xl shadow-xl"
                style={{
                  background: 'var(--primary-gradient)',
                }}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-3xl lg:text-4xl font-bold text-white mb-6"
                >
                  Welcome Back!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="text-lg text-white opacity-90 mb-8"
                >
                  Already have an account? 
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <Link
                    to="/login"
                    className="auth-submit-btn auth-submit-btn-white"
                  >
                    Sign In
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-6">Why Choose Our Platform? </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              We make it easy to find lost items and return found items to their rightful owners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaSearch className="text-4xl text-primary" />,
                title: "Smart Search",
                description: "Advanced search filters to find items by category, location, and description"
              },
              {
                icon: <FaShieldAlt className="text-4xl text-primary" />,
                title: "Secure Platform",
                description: "Your data is protected with advanced security measures and privacy controls"
              },
              {
                icon: <FaUsers className="text-4xl text-primary" />,
                title: "Community Driven",
                description: "Join a community of helpful people working together to reunite items"
              },
              {
                icon: <FaClock className="text-4xl text-primary" />,
                title: "Real-time Updates",
                description: "Get instant notifications when someone reports your lost item"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="text-center p-6 bg-secondary rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-3">{feature.title}</h3>
                <p className="text-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

           
      {/* Footer */}
      <footer 
        className="text-white py-12"
        style={{
          background: 'var(--primary-gradient)',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Lost & Found Devices</h3>
            <p className="text-white opacity-80 mb-6">
              Connecting people with their belongings, one item at a time.
            </p>
            <div className="border-t border-white opacity-20 pt-6">
              <p className="text-white opacity-60">
                © 2025 Lost & Found Devices. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

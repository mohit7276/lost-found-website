import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaShieldAlt, 
  FaUsers, 
  FaClock, 
  FaMobile, 
  FaLaptop, 
  FaHeadphones, 
  FaCamera, 
  FaGamepad,
  FaWallet,
  FaKey,
  FaGem,
  FaCheckCircle,
  FaHeart,
  FaGlobe,
  FaBell,
  FaMapMarkerAlt,
  FaUserFriends,
  FaStar,
  FaArrowRight
} from 'react-icons/fa';

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
                  Reunite with Your Lost Items
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg text-secondary mb-6 leading-relaxed"
                >
                  The most trusted platform for finding lost items and returning found belongings. 
                  Join thousands of users who have successfully reunited with their precious items.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-wrap gap-4 mb-8"
                >
                  <div className="flex items-center text-sm text-muted">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span>100% Free to Use</span>
                  </div>
                  <div className="flex items-center text-sm text-muted">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center text-sm text-muted">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span>Global Community</span>
                  </div>
                </motion.div>
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
                  Already helping others find their lost items? Sign in to continue your journey.
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

      {/* Commonly Lost Items Section */}
      <section className="py-20 bg-tertiary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-6">What Can You Find?</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              From everyday essentials to precious memories, we help reunite people with all types of lost items
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {[
              { icon: <FaMobile />, label: "Phones" },
              { icon: <FaLaptop />, label: "Laptops" },
              { icon: <FaHeadphones />, label: "Headphones" },
              { icon: <FaCamera />, label: "Cameras" },
              { icon: <FaWallet />, label: "Wallets" },
              { icon: <FaKey />, label: "Keys" },
              { icon: <FaGem />, label: "Jewelry" },
              { icon: <FaGamepad />, label: "Electronics" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl text-primary mb-3">{item.icon}</div>
                <p className="text-sm font-medium text-secondary">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-6">Why Choose Our Platform?</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              We provide the most comprehensive and user-friendly platform for lost and found items
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaSearch className="text-4xl text-primary" />,
                title: "Smart Search & Filters",
                description: "Advanced search with filters by category, location, date, and detailed descriptions. AI-powered matching helps find similar items.",
                benefits: ["Location-based search", "Category filtering", "Date range options", "AI-powered suggestions"]
              },
              {
                icon: <FaShieldAlt className="text-4xl text-primary" />,
                title: "Secure & Private",
                description: "Your personal information is protected with enterprise-grade security. Anonymous contact options keep you safe.",
                benefits: ["End-to-end encryption", "Anonymous messaging", "Privacy controls", "Secure file uploads"]
              },
              {
                icon: <FaUsers className="text-4xl text-primary" />,
                title: "Global Community",
                description: "Join thousands of helpful people worldwide. Community-driven platform with verified users and reputation system.",
                benefits: ["Verified user profiles", "Community ratings", "Global reach", "Success stories"]
              },
              {
                icon: <FaBell className="text-4xl text-primary" />,
                title: "Real-time Notifications",
                description: "Get instant alerts when someone reports your lost item or responds to your found item listing.",
                benefits: ["Instant push notifications", "Email alerts", "SMS notifications", "Custom alert preferences"]
              },
              {
                icon: <FaMapMarkerAlt className="text-4xl text-primary" />,
                title: "Location Intelligence",
                description: "Accurate location tracking and mapping to help narrow down search areas and find items faster.",
                benefits: ["Interactive maps", "Radius search", "Location history", "Nearby hotspots"]
              },
              {
                icon: <FaHeart className="text-4xl text-primary" />,
                title: "100% Free Service",
                description: "Completely free to use with no hidden fees. Our mission is to help people, not profit from their loss.",
                benefits: ["No registration fees", "Free photo uploads", "No commission charges", "Ad-free experience"]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-secondary rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-4">{feature.title}</h3>
                <p className="text-muted mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-secondary">
                      <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Simple, fast, and effective - get started in just 3 easy steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Report or Search",
                description: "Lost something? Report it with photos and details. Found something? Post it to help others. Use our smart search to find existing listings.",
                icon: <FaSearch className="text-3xl" />
              },
              {
                step: "02",
                title: "Connect & Verify",
                description: "Get matched with potential owners or finders. Use our secure messaging system to verify ownership and arrange safe meetups.",
                icon: <FaUserFriends className="text-3xl" />
              },
              {
                step: "03",
                title: "Reunite & Celebrate",
                description: "Meet safely to return the item. Share your success story with the community and help build trust for future reunions.",
                icon: <FaHeart className="text-3xl" />
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                className="text-center relative"
              >
                <div className="bg-white bg-opacity-10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <div className="text-6xl font-bold opacity-20 mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="opacity-90">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2">
                    <FaArrowRight className="text-2xl opacity-30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-6">Our Impact</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Join thousands of satisfied users who have successfully reunited with their belongings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Items Reunited", icon: <FaHeart /> },
              { number: "25K+", label: "Active Users", icon: <FaUsers /> },
              { number: "150+", label: "Countries", icon: <FaGlobe /> },
              { number: "4.9/5", label: "User Rating", icon: <FaStar /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="text-center p-6 bg-secondary rounded-xl"
              >
                <div className="text-3xl text-primary mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-secondary font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-tertiary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-6">Success Stories</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Real stories from real people who found their precious items through our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                item: "Wedding Ring",
                story: "Lost my wedding ring at the beach. Posted it here and found it within 2 hours! The person who found it was so kind and refused any reward.",
                rating: 5,
                image: "👰"
              },
              {
                name: "Mike Chen",
                item: "iPhone 13",
                story: "Left my phone in a taxi. The driver found my listing and contacted me the same day. Amazing platform with honest people!",
                rating: 5,
                image: "👨‍💼"
              },
              {
                name: "Emma Davis",
                item: "Laptop with Thesis",
                story: "Lost my laptop with 2 years of research work. Found it through this platform and got my thesis back. Couldn't be more grateful!",
                rating: 5,
                image: "👩‍🎓"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{story.image}</div>
                  <div>
                    <h4 className="font-semibold text-primary">{story.name}</h4>
                    <p className="text-sm text-muted">Lost: {story.item}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-secondary italic">"{story.story}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join our community today and help create a world where lost items find their way home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="auth-submit-btn auth-submit-btn-white inline-flex items-center justify-center px-8 py-3 text-lg font-semibold"
              >
                Join the Community
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                to="/login"
                className="auth-submit-btn auth-submit-btn-secondary inline-flex items-center justify-center px-8 py-3 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-primary"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
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
            <h2 className="text-4xl font-bold text-primary mb-6">Core Features</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Everything you need to find lost items and return found items efficiently
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
        className="text-white py-16"
        style={{
          background: 'var(--primary-gradient)',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Lost & Found Platform</h3>
              <p className="text-white opacity-80 mb-6 max-w-md">
                Connecting people with their belongings through the power of community. 
                Every item has a story, and every reunion brings joy.
              </p>
              <div className="flex space-x-4">
                <div className="text-white opacity-60">
                  <FaGlobe className="inline mr-2" />
                  Available Worldwide
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white opacity-80">
                <li><Link to="/register" className="hover:opacity-100 transition-opacity">Sign Up</Link></li>
                <li><Link to="/login" className="hover:opacity-100 transition-opacity">Sign In</Link></li>
                <li><a href="#how-it-works" className="hover:opacity-100 transition-opacity">How It Works</a></li>
                <li><a href="#features" className="hover:opacity-100 transition-opacity">Features</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white opacity-80">
                <li><a href="#faq" className="hover:opacity-100 transition-opacity">FAQ</a></li>
                <li><a href="#contact" className="hover:opacity-100 transition-opacity">Contact Us</a></li>
                <li><a href="#privacy" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:opacity-100 transition-opacity">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white opacity-20 pt-8 text-center">
            <p className="text-white opacity-60 mb-4">
              © 2025 Lost & Found Platform. All rights reserved.
            </p>
            <p className="text-white opacity-60 text-sm">
              Made with ❤️ to help people reunite with their belongings
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

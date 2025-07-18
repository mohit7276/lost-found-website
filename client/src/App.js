import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PostItemPage from './pages/PostItemPage';
import ItemDetailPage from './pages/ItemDetailPage';
import ProfilePage from './pages/ProfilePage';
import AuthCallback from './pages/AuthCallback';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={user ? <ProtectedLayout><DashboardPage /></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/post/:type" element={user ? <ProtectedLayout><PostItemPage /></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/item/:id" element={user ? <ProtectedLayout><ItemDetailPage /></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProtectedLayout><ProfilePage /></ProtectedLayout> : <Navigate to="/login" />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

// Protected Layout wrapper
const ProtectedLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default App;

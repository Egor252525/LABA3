// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Layout/Header';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';

// Компонент для защищенных маршрутов
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <Loader />;
  
  return user ? children : <Navigate to="/login" state={{ from: location }} />;
};

// Компонент для публичных маршрутов (только для неавторизованных)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <Loader />;
  
  return !user ? children : <Navigate to="/" />;
};

function AppContent() {
  const { loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Защищенные маршруты - только для авторизованных */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Публичные маршруты - только для неавторизованных */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
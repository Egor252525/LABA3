import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider mounted');
    const token = localStorage.getItem('authToken');
    if (token) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const mockUser = {
        userID: 1,
        firstName: 'Тестовый',
        lastName: 'Пользователь',
        email: 'test@example.com',
        roleID: 4
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Login attempt:', email);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        userID: 1,
        firstName: 'Иван',
        lastName: 'Петров',
        email: email,
        roleID: 4
      };
      
      localStorage.setItem('authToken', 'mock-token-123');
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'Ошибка авторизации. Проверьте данные.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('Register attempt:', userData);

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        userID: Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        roleID: 4 
      };
      
      localStorage.setItem('authToken', 'mock-token-123');
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        message: 'Ошибка регистрации. Попробуйте позже.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

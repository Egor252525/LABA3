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

// Локальные DTO функции
const loginDTO = (email, password) => ({
  email,
  password
});

const registerDTO = (userData) => ({
  firstName: userData.firstName,
  lastName: userData.lastName,
  email: userData.email,
  phone: userData.phone || '',
  password: userData.password,
  roleID: 4
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('userData');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // ВРЕМЕННО: моковая авторизация до настройки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        userID: 1,
        firstName: 'Иван',
        lastName: 'Петров',
        email: email,
        phone: '+7 (999) 123-45-67',
        roleID: 4
      };
      
      localStorage.setItem('authToken', 'mock-token-123');
      localStorage.setItem('userData', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'Ошибка авторизации. Проверьте данные.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // ВРЕМЕННО: моковая регистрация до настройки API
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
      localStorage.setItem('userData', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        message: 'Ошибка регистрации. Попробуйте позже.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
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
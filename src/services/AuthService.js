// src/services/AuthService.js
import api from './api';

export class AuthService {
  static async login(email, password) {
    try {
      const response = await api.post('/Auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Ошибка авторизации');
    }
  }

  static async register(userData) {
    try {
      const response = await api.post('/Auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Ошибка регистрации');
    }
  }

  static async validateToken() {
    try {
      const response = await api.get('/Auth/validate');
      return response.data;
    } catch (error) {
      throw new Error('Токен невалиден');
    }
  }

  static async logout() {
    try {
      await api.post('/Auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }
  }
}
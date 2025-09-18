import api from './api';

export class UserService {
  // Получить заказы пользователя
  static async getUserAppointments() {
    try {
      const response = await api.get('/Appointments/user');
      return response.data;
    } catch (error) {
      console.error('Get user appointments error:', error);
      throw error;
    }
  }

  // Обновить профиль
  static async updateProfile(userData) {
    try {
      const response = await api.put('/Users/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Сменить пароль
  static async changePassword(passwordData) {
    try {
      const response = await api.put('/Users/change-password', passwordData);
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  // Получить историю платежей
  static async getPaymentHistory() {
    try {
      const response = await api.get('/Payments/user');
      return response.data;
    } catch (error) {
      console.error('Get payment history error:', error);
      throw error;
    }
  }
}
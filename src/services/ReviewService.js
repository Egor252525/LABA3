import api from './api';

export class ReviewService {
  // Получить отзывы для услуги
  static async getServiceReviews(serviceId) {
    try {
      const response = await api.get(`/Reviews/service/${serviceId}`);
      return response.data;
    } catch (error) {
      console.error('Get reviews error:', error);
      throw error;
    }
  }

  static async createReview(reviewData) {
    try {
      const response = await api.post('/Reviews', reviewData);
      return response.data;
    } catch (error) {
      console.error('Create review error:', error);
      throw error;
    }
  }

  // Получить отзывы пользователя
  static async getUserReviews() {
    try {
      const response = await api.get('/Reviews/user');
      return response.data;
    } catch (error) {
      console.error('Get user reviews error:', error);
      throw error;
    }
  }

  static async deleteReview(reviewId) {
    try {
      const response = await api.delete(`/Reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error('Delete review error:', error);
      throw error;
    }
  }
}
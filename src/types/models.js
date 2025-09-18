// src/types/models.js

// Модель отзыва
export const ReviewModel = {
  reviewId: 0,
  serviceId: 0,
  userId: 0,
  userName: '',
  rating: 0,
  comment: '',
  createdAt: ''
};

// Модель заказа/записи
export const AppointmentModel = {
  appointmentId: 0,
  serviceId: 0,
  serviceName: '',
  appointmentDateTime: '',
  status: '',
  price: 0,
  durationMinutes: 0
};

// Модель пользователя для обновления
export const UserUpdateModel = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  newPassword: ''
};

// Модель услуги
export const ServiceModel = {
  serviceId: 0,
  serviceName: '',
  description: '',
  price: 0,
  durationMinutes: 0
};
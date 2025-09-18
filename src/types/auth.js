// src/types/auth.js

// DTO для логина
export const loginDTO = (email, password) => ({
  email,
  password
});

// DTO для регистрации
export const registerDTO = (userData) => ({
  firstName: userData.firstName,
  lastName: userData.lastName,
  email: userData.email,
  phone: userData.phone || '',
  password: userData.password,
  roleID: 4 // Роль "Клиент" по умолчанию
});

// Модель пользователя
export const UserModel = {
  userID: 0,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  roleID: 0,
  registrationDate: ''
};

// Модель ответа авторизации
export const AuthResponseModel = {
  token: '',
  user: UserModel
};
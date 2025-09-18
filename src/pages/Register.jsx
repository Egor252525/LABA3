// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateForm, validateEmail, validatePassword } from '../utils/validation';
import Loader from '../components/Loader';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: { value: '', required: true },
    lastName: { value: '', required: true },
    email: { value: '', type: 'email', required: true },
    phone: { value: '', required: false },
    password: { value: '', type: 'password', required: true },
    confirmPassword: { value: '', type: 'password', required: true }
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], value }
    }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
    setSubmitError('');
  };

  const validateFormData = () => {
    const formErrors = {};
    
    if (!formData.firstName.value.trim()) {
      formErrors.firstName = 'Имя обязательно';
    }
    
    if (!formData.lastName.value.trim()) {
      formErrors.lastName = 'Фамилия обязательна';
    }
    
    if (!formData.email.value.trim()) {
      formErrors.email = 'Email обязателен';
    } else if (!validateEmail(formData.email.value)) {
      formErrors.email = 'Введите корректный email';
    }
    
    if (!formData.password.value) {
      formErrors.password = 'Пароль обязателен';
    } else if (!validatePassword(formData.password.value)) {
      formErrors.password = 'Пароль должен содержать минимум 6 символов';
    }
    
    if (!formData.confirmPassword.value) {
      formErrors.confirmPassword = 'Подтверждение пароля обязательно';
    } else if (formData.password.value !== formData.confirmPassword.value) {
      formErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateFormData();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      setSubmitError('');
      
      const userData = {
        firstName: formData.firstName.value.trim(),
        lastName: formData.lastName.value.trim(),
        email: formData.email.value.trim(),
        phone: formData.phone.value.trim(),
        password: formData.password.value
      };
      
      const result = await register(userData);
      
      if (result.success) {
        // Редирект в личный кабинет после успешной регистрации
        navigate('/profile', { replace: true });
      } else {
        setSubmitError(result.message);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Регистрация</h1>
        
        {submitError && (
          <div className="alert alert-error">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Имя:</label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName.value}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={errors.firstName ? 'error' : ''}
                placeholder="Введите ваше имя"
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Фамилия:</label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName.value}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={errors.lastName ? 'error' : ''}
                placeholder="Введите вашу фамилию"
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={formData.email.value}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'error' : ''}
              placeholder="Введите ваш email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Телефон:</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone.value}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={errors.phone ? 'error' : ''}
              placeholder="+7 (999) 123-45-67"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <input
                id="password"
                type="password"
                value={formData.password.value}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'error' : ''}
                placeholder="Не менее 6 символов"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Подтвердите пароль:</label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword.value}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Повторите пароль"
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="auth-links">
          <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateForm } from '../utils/validation';
import Loader from '../components/Loader';

const Login = () => {
  const [formData, setFormData] = useState({
    email: { value: '', type: 'email', required: true },
    password: { value: '', type: 'password', required: true }
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      setSubmitError('');
      const result = await login(
        formData.email.value,
        formData.password.value
      );
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setSubmitError(result.message);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Вход в систему</h1>
        
        {submitError && (
          <div className="alert alert-error">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
            <label htmlFor="password">Пароль:</label>
            <input
              id="password"
              type="password"
              value={formData.password.value}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={errors.password ? 'error' : ''}
              placeholder="Введите ваш пароль"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="auth-links">
          <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
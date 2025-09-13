import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { validateForm } from '../utils/validation';
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

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], value }
    }));

    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validatePasswordMatch = () => {
    if (formData.password.value !== formData.confirmPassword.value) {
      return { confirmPassword: 'Пароли не совпадают' };
    }
    return {};
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm(formData);
    const passwordMatchError = validatePasswordMatch();
    const allErrors = { ...formErrors, ...passwordMatchError };
    
    setErrors(allErrors);
    
    if (Object.keys(allErrors).length === 0) {
      setSubmitError('');
      
      const userData = {
        firstName: formData.firstName.value,
        lastName: formData.lastName.value,
        email: formData.email.value,
        phone: formData.phone.value,
        password: formData.password.value
      };
      
      const result = await register(userData);
      
      if (!result.success) {
        setSubmitError(result.message);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="auth-form">
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Имя:</label>
          <input
            type="text"
            value={formData.firstName.value}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-text">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label>Фамилия:</label>
          <input
            type="text"
            value={formData.lastName.value}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-text">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email.value}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Телефон:</label>
          <input
            type="tel"
            value={formData.phone.value}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            value={formData.password.value}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Подтвердите пароль:</label>
          <input
            type="password"
            value={formData.confirmPassword.value}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>

        {submitError && <div className="submit-error">{submitError}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};

export default Register; 
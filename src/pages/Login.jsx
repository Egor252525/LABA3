import React, { useState } from 'react';
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

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], value }
    }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
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
      
      if (!result.success) {
        setSubmitError(result.message);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="auth-form">
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
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
          <label>Пароль:</label>
          <input
            type="password"
            value={formData.password.value}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        {submitError && <div className="submit-error">{submitError}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default Login;
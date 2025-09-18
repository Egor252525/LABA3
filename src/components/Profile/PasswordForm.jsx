import React, { useState } from 'react';
import { UserService } from '../../services/UserService';

const PasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Пароли не совпадают');
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage('Пароль должен содержать минимум 6 символов');
      return;
    }

    setIsSubmitting(true);
    try {
      await UserService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      setMessage('Пароль успешно изменен');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Change password error:', error);
      setMessage(error.response?.data?.message || 'Ошибка смены пароля');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="password-form">
      <h2>Смена пароля</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Текущий пароль:</label>
          <input
            id="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">Новый пароль:</label>
          <input
            id="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={(e) => handleInputChange('newPassword', e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Подтвердите пароль:</label>
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            required
          />
        </div>

        {message && (
          <div className={`form-message ${message.includes('Ошибка') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <button 
          type="submit" 
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Смена пароля...' : 'Сменить пароль'}
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;
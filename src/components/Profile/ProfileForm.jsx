import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserService } from '../../services/UserService';

const ProfileForm = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phone: user.phone || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      await UserService.updateProfile(formData);
      setMessage('Профиль успешно обновлен');
    } catch (error) {
      console.error('Update profile error:', error);
      setMessage('Ошибка обновления профиля');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-form">
      <h2>Редактирование профиля</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">Имя:</label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Фамилия:</label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Телефон:</label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+7 (999) 123-45-67"
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
          {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
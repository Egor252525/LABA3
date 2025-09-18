import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserService } from '../services/UserService';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import AppointmentList from '../components/Profile/AppointmentList';
import ProfileForm from '../components/Profile/ProfileForm';
import PasswordForm from '../components/Profile/PasswordForm';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await UserService.getUserAppointments();
      setAppointments(data);
    // } catch (error) {
    //   console.error('Load appointments error:', error);
    //   setError('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'appointments', label: 'Мои записи' },
    { id: 'profile', label: 'Профиль' },
    { id: 'password', label: 'Смена пароля' }
  ];

  if (!user) {
    return <ErrorMessage message="Необходимо авторизоваться" />;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Личный кабинет</h1>
        <p>Добро пожаловать, {user.firstName} {user.lastName}</p>
      </div>

      <div className="profile-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="profile-content">
        {loading && <Loader />}
        
        {error && <ErrorMessage message={error} />}

        {activeTab === 'appointments' && (
          <AppointmentList 
            appointments={appointments} 
            onRefresh={loadAppointments}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileForm user={user} />
        )}

        {activeTab === 'password' && (
          <PasswordForm />
        )}
      </div>
    </div>
  );
};

export default Profile;
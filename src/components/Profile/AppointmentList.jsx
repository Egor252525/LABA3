import React from 'react';

const AppointmentList = ({ appointments, onRefresh }) => {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="appointments-empty">
        <p>У вас пока нет записей</p>
        <button onClick={onRefresh} className="btn-primary">
          Обновить
        </button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'завершен':
        return 'status-completed';
      case 'в процессе':
        return 'status-in-progress';
      case 'запланирован':
        return 'status-scheduled';
      case 'отменен':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="appointments-list">
      <div className="appointments-header">
        <h2>Мои записи</h2>
        <button onClick={onRefresh} className="btn-secondary">
          Обновить
        </button>
      </div>

      {appointments.map(appointment => (
        <div key={appointment.appointmentId} className="appointment-card">
          <div className="appointment-info">
            <h3>{appointment.serviceName}</h3>
            <p className="appointment-date">
              {new Date(appointment.appointmentDateTime).toLocaleString()}
            </p>
            <p className="appointment-duration">
              Длительность: {appointment.durationMinutes} мин.
            </p>
            <p className="appointment-price">
              Цена: {appointment.price} ₽
            </p>
          </div>
          
          <div className="appointment-status">
            <span className={`status-badge ${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
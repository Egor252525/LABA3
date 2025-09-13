import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <p>Ошибка: {message}</p>
    </div>
  );
};

export default ErrorMessage;
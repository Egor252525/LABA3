export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRequired = (value) => {
  return value.trim() !== '';
};

export const validateForm = (fields) => {
  const errors = {};
  
  Object.keys(fields).forEach(fieldName => {
    const field = fields[fieldName];
    
    if (field.required && !validateRequired(field.value)) {
      errors[fieldName] = 'Это поле обязательно для заполнения';
    }
    
    if (field.type === 'email' && field.value && !validateEmail(field.value)) {
      errors[fieldName] = 'Введите корректный email';
    }
    
    if (field.type === 'password' && field.value && !validatePassword(field.value)) {
      errors[fieldName] = 'Пароль должен содержать минимум 6 символов';
    }
  });
  
  return errors;
};

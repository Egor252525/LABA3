import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>Магазин электроники</h1>
          </Link>
        </div>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Каталог
          </Link>
          
          <Link to="/cart" className="nav-link cart-link">
            Корзина
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </Link>

          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="nav-link">
                Личный кабинет
              </Link>
              <span className="user-greeting">
                {user.firstName}
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Выйти
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">
                Вход
              </Link>
              <Link to="/register" className="nav-link">
                Регистрация
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
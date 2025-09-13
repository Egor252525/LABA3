import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <header>
      <div className="logo">
        <Link to="/">Магазин электроники</Link>
      </div>
      <nav>
        <Link to="/">Каталог</Link>
        <Link to="/cart">
          Корзина ({getTotalItems()})
        </Link>
        {user ? (
          <>
            <span>Добро пожаловать, {user.email}</span>
            <button onClick={logout}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

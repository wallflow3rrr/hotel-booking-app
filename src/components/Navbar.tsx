// src/components/AppNavbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const AppNavbar: React.FC = () => {
  // Проверяем наличие токена в куках
  const token = document.cookie.includes('token=');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          🏨 Hotel Booking
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {/* Кнопка Войти / Админка */}
            <li className="nav-item d-flex gap-2 align-items-center">
              {token ? (
                <Link className="nav-link text-warning" to="/admin">
                  Админка
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  Войти
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
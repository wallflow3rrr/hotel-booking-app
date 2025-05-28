import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { login, password });
      document.cookie = `token=${res.data.token}; path=/`;
      window.location.href = '/admin';
    } catch (err) {
      alert('Ошибка входа');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
      <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5001/api/login', {
        login,
        password,
      });

      document.cookie = `token=${res.headers['Set-Cookie']}; path=/`;
      console.log(res);
      document.cookie = `refreshToken=${res.headers['Set-Cookie']}; path=/; max-age=604800`; // 7 дней
      window.location.href = '/admin/bookings';
    } catch (err) {
      alert('Неверный логин или пароль');
    }



  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
      <form onSubmit={handleSubmit}>
        <h3 className="mb-4">Вход администратора</h3>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit" className="btn btn-primary w-100">
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
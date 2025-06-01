import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Booking } from '../types';

const AdminPanel = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  function getTokenFromCookie(): string | null {
    return document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || null;
  }

  const refreshTokenAndGetNewAccessToken = async (): Promise<string | null> => {
    const refreshToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('refreshToken='))?.split('=')[1];

    if (!refreshToken) {
      window.location.href = '/login';
      return null;
    }

    try {
      const res = await axios.post('http://localhost:5001/api/refresh-token', {}, {
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
        },
        withCredentials: true,
      });

      const newAccessToken = res.data.token;

      if (newAccessToken) {
        document.cookie = `token=${newAccessToken}; path=/`;
        return newAccessToken;
      } else {
        throw new Error('Не удалось обновить токен');
      }
    } catch (err) {
      console.error('Ошибка при обновлении токена:', err);
      window.location.href = '/login';
      return null;
    }
  };

  const fetchBookings = async (token?: string): Promise<void> => {
    try {
      const accessToken = token || getTokenFromCookie();

      const res = await axios.get('http://localhost:5001/api/bookings', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      setBookings(res.data);
    } catch (err: any) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        const newToken = await refreshTokenAndGetNewAccessToken();
        if (newToken) {
          const res = await axios.get('http://localhost:5001/api/bookings', {
            headers: {
              'Authorization': `Bearer ${newToken}`,
            },
            withCredentials: true,
          });
          setBookings(res.data);
        }
      } else {
        setError('Не авторизован');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    }
  };

  useEffect(() => {
    const loadBookings = async () => {
      try {
        await fetchBookings();
      } catch (err) {
      }
    };

    loadBookings();
  }, []);

  return (
    <div className="container my-5">
      <h2>Админ-панель</h2>

      {error && <p className="text-danger">{error}</p>}

      <h4>Созданные пользователями бронирования:</h4>
      <ul>
        {bookings.length === 0 ? (
          <p>Нет бронирований</p>
        ) : (
          bookings.map((booking) => (
            <li key={booking.id}>
              <strong>{booking.guest_name}</strong> ({booking.email}) — номер ID {booking.room_id},  
              заезд: {booking.start_date}, выезд: {booking.end_date}, гостей: {booking.guests}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdminPanel;
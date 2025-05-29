// src/pages/AdminPanel.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Booking } from '../types';

const AdminPanel = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/bookings', {
          headers: {
            'Authorization': `Bearer ${getTokenFromCookie()}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        setError('Не авторизован');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container my-5">
      <h2>Админ-панель</h2>

      {error && <p className="text-danger">{error}</p>}

      <h4>Созданные пользователями бронирования:</h4>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <strong>{booking.guest_name}</strong> ({booking.email}) — номер ID {booking.room_id},  
            заезд: {booking.start_date}, выезд: {booking.end_date}, гостей: {booking.guests}
          </li>
        ))}
      </ul>
    </div>
  );
};

function getTokenFromCookie(): string | null {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  return token || null;
}

export default AdminPanel;
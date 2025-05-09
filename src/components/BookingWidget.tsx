// src/components/BookingWidget.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Booking } from '../types';

interface Props {
  roomId: number;
  maxGuests?: number;
}

const BookingWidget: React.FC<Props> = ({ roomId, maxGuests = 2 }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [guestAges, setGuestAges] = useState<number[]>([30]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [suggestAnotherRoom, setSuggestAnotherRoom] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    axios.get<Booking[]>(`http://localhost:3001/bookings?roomId=${roomId}`)
      .then(res => setBookings(res.data))
      .catch(() => setError('Не удалось загрузить занятые даты'));
  }, [roomId]);

  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 1;
    setGuests(count);
    setGuestAges(Array(count).fill(30));
  };

  const handleAgeChange = (index: number, value: string) => {
    const newAges = [...guestAges];
    newAges[index] = parseInt(value) || 0;
    setGuestAges(newAges);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSuggestAnotherRoom(false);

    if (guests > maxGuests) {
      setSuggestAnotherRoom(true);
      return;
    }

    if (!startDate || !endDate) {
      setError("Выберите даты заезда и выезда");
      return;
    }

    const isOverlap = bookings.some(booking =>
      isDateRangeOverlapping(startDate, endDate, booking.startDate, booking.endDate)
    );

    if (isOverlap) {
      setError("Этот номер уже забронирован на указанные даты.");
      return;
    }

    setLoading(true);

    const booking = {
      roomId,
      guestName: name,
      email,
      startDate,
      endDate,
      guests,
      guestAges,
    };

    try {
      await axios.post('http://localhost:3001/bookings', booking);
      setSuccess(true);
    } catch (err) {
      setError('Не удалось забронировать номер.');
    } finally {
      setLoading(false);
    }
  };

  const isDateRangeOverlapping = (
    start1: string,
    end1: string,
    start2: string,
    end2: string
  ) => {
    const s1 = new Date(start1).getTime();
    const e1 = new Date(end1).getTime();
    const s2 = new Date(start2).getTime();
    const e2 = new Date(end2).getTime();

    return s1 < e2 && s2 < e1;
  };

  return (
    <div className="mt-4">
      <h5>Забронировать номер</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="guestName" className="form-label">Имя гостя</label>
          <input
            id="guestName"
            type="text"
            className="form-control"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="startDate" className="form-label">Дата заезда</label>
          <input
            id="startDate"
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="endDate" className="form-label">Дата выезда</label>
          <input
            id="endDate"
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="guests" className="form-label">Количество гостей</label>
          <input
            id="guests"
            type="number"
            className="form-control"
            min="1"
            max={maxGuests}
            value={guests}
            onChange={handleGuestCountChange}
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Возраст каждого гостя</label>
          <div className="d-flex flex-wrap gap-2">
            {guestAges.map((age, index) => (
              <input
                key={index}
                type="number"
                className="form-control w-25"
                min="0"
                max="120"
                placeholder={`Гость ${index + 1}`}
                value={age || ''}
                onChange={(e) => handleAgeChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? 'Бронирование...' : 'Подтвердить бронь'}
        </button>

        {success && <div className="text-success mt-2">Номер успешно забронирован!</div>}
        {error && <div className="text-danger mt-2">{error}</div>}
        {suggestAnotherRoom && (
          <div className="alert alert-warning mt-2">
            Этот номер рассчитан максимум на {maxGuests} гостей.
            Рассмотрите возможность бронирования второго номера.
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingWidget;
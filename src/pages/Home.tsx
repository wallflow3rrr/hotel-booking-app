
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Booking, Room } from '../types';
import RoomCard from '../components/RoomCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [beds, setBeds] = useState<number | ''>('');
  const [bedType, setBedType] = useState('');
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');

  useEffect(() => {
    Promise.all([
      axios.get<Room[]>('http://localhost:5001/api/rooms'),
      axios.get<Booking[]>('http://localhost:5001/api/bookings')
    ])
      .then(([roomRes, bookingRes]) => {
        setRooms(roomRes.data);
        setBookings(bookingRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить данные');
        setLoading(false);
      });
  }, []);

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

  const isRoomAvailableForDates = (room: Room) => {
    if (!checkInDate || !checkOutDate) return true;

    return !bookings.some(b => b.roomId === room.id &&
      isDateRangeOverlapping(checkInDate, checkOutDate, b.startDate, b.endDate)
    );
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinPrice = minPrice === '' || room.price >= minPrice;
    const matchesMaxPrice = maxPrice === '' || room.price <= maxPrice;
    const matchesBeds = beds === '' || room.available_beds >= beds;
    const matchesBedType = !bedType || room.bed_type.includes(bedType.toLowerCase());

    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesBeds && matchesBedType;
  });

  const finalFilteredRooms = checkInDate && checkOutDate
    ? filteredRooms.filter(isRoomAvailableForDates)
    : filteredRooms;

  return (
    <div className="container-fluid my-5">
      {/* Заголовок */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Добро пожаловать в наш отель</h1>
        <p className="lead">Выберите подходящий номер и забронируйте его онлайн</p>
      </div>

      {/* Форма фильтров */}
      <div className="row g-3 justify-content-center mb-4">
        <div className="col-md-6 col-lg-3">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск по названию..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Мин. цена"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Макс. цена"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Кол-во мест"
            value={beds}
            onChange={(e) => setBeds(e.target.value ? Number(e.target.value) : '')}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={bedType}
            onChange={(e) => setBedType(e.target.value)}
          >
            <option value="">Тип кровати</option>
            <option value="twin">Односпальные</option>
            <option value="double">Двуспальная</option>
            <option value="sofa">Диван</option>
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
      </div>

      {/* Карточки номеров */}
      {loading && <LoadingSpinner />}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!loading && !error && (
        <div className="d-flex flex-wrap justify-content-center gap-4 px-2">
          {finalFilteredRooms.map(room => (
            <div key={room.id} style={{ width: '420px', minWidth: '300px', maxWidth: '90vw' }}>
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
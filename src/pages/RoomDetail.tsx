// src/pages/RoomDetail.tsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Room } from '../types';
import BookingWidget from '../components/BookingWidget';
import LoadingSpinner from '../components/LoadingSpinner';


export const getBedTypeLabel = (type: string): string => {
  const parts = type.split(/[\s,]*\+[\\s,]*/);

  const translatedParts = parts.map(part => {
    switch (part.trim()) {
      case 'twin':
        return 'Односпальные';
      case 'double':
        return 'Двуспальная';
      case 'sofa':
        return 'Диван';
      default:
        return part.trim();
    }
  });

  return translatedParts.join(' + ');
};

const RoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Room>(`http://localhost:5001/api/rooms/${id}`)
      .then(res => {
        setRoom(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить данные о номере');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!room) return <div>Номер не найден</div>;

  const mainImage = `/images/room${id}.jpg`;
  const secondImage = `/images/room${id}-1.jpg`;

  return (
    <div className="container my-5">
      {/* Галерея изображений */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <img src={mainImage} alt={room.title} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <img src={secondImage} alt={`${room.title} - Вид 2`} className="img-fluid rounded" />
        </div>
      </div>

      {/* Основная информация */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title">{room.title}</h2>
          <p className="card-text lead">{room.description}</p>
          <h5 className="text-success fw-bold">${room.price} / ночь</h5>
          <p>Мест: {room.available_beds}, Тип кроватей: {getBedTypeLabel(room.bed_type)}</p>
          <Link to="/" className="btn btn-outline-secondary mt-3 me-2">
            ← Назад к списку
          </Link>
        </div>
      </div>

      {/* Виджет бронирования */}
      <BookingWidget roomId={room.id} maxGuests={room.available_beds} />
    </div>
  );
};

export default RoomDetail;



// src/components/RoomCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../types';

interface Props {
  room: Room;
}

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


const RoomCard: React.FC<Props> = ({ room }) => {
  const imageUrl = `/images/room${room.id}.jpg`;

  return (
    <div className="card shadow-sm h-100 transition-hover">
      <img
        src={imageUrl}
        alt={room.title}
        className="card-img-top"
        style={{ height: '250px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{room.title}</h5>
        <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
          Мест: {room.available_beds}, Тип: {getBedTypeLabel(room.bed_type)}
        </p>
        <div className="mt-auto">
          <p className="card-text text-success fw-bold">${room.price} / ночь</p>
          <Link to={`/room/${room.id}`} className="btn btn-primary w-100">
            Посмотреть детали
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
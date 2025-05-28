import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Room {
  id: number;
  title: string;
}

const AdminPanel = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    axios.get('http://localhost:5001/api/rooms', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setRooms(res.data));
  }, []);

  return (
    <div>
      <h2>Админ-панель</h2>
      <ul>
        {rooms.map(room => <li key={room.id}>{room.title}</li>)}
      </ul>
    </div>
  );
};

export default AdminPanel;
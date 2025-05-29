// src/routes.tsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RoomDetail from './pages/RoomDetail';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/room/:id" element={<RoomDetail />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/admin" element={<AdminPanel />} />
    <Route path="/admin/bookings" element={<AdminPanel />} />
  </Routes>
);

export default AppRoutes;
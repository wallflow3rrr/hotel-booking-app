// ✅ routes.tsx (правильно)
import { Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RoomDetail from './pages/RoomDetail';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/room/:id" element={<RoomDetail />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/admin" element={<AdminPanel />} />
  </Routes>
);

export default AppRoutes;

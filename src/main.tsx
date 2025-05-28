// main.tsx (Vite)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AdminPanel />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
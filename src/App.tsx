import React from 'react';
import AppRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <>
      <AppNavbar />
      <div className="container">
        <AppRoutes />
      </div>
    </>
  );
};


export default App;
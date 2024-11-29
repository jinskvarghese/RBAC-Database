import React, { useState } from 'react'; // Added useState import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Unauthorized from './components/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // Dynamically retrieve the user's role from localStorage or backend
  const [userRole] = useState(localStorage.getItem('userRole') || ''); // Removed setUserRole to avoid warnings

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['USER', 'ADMIN']} userRole={userRole}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']} userRole={userRole}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

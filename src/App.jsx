import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import BulkSMSPage from './pages/BulkSMSPage';
import CreateClientPage from './pages/CreateClientPage';
import ClientsListPage from './pages/ClientsListPage';
import ClientProfilePage from './pages/ClientProfilePage';
import Login from './components/auth/Login';
import Attendance from './components/dashboard/Attendance';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/attendance" element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        } />

        <Route path="/bulk-sms" element={
          <ProtectedRoute>
            <BulkSMSPage />
          </ProtectedRoute>
        } />

        <Route path="/create-client" element={
          <ProtectedRoute>
            <CreateClientPage />
          </ProtectedRoute>
        } />

        <Route path="/clients" element={
          <ProtectedRoute>
            <ClientsListPage />
          </ProtectedRoute>
        } />

        <Route path="/client/:clientId" element={
          <ProtectedRoute>
            <ClientProfilePage />
          </ProtectedRoute>
        } />

        {/* Redirect unmatched routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App; 
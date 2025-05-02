import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import BulkSMSPage from './pages/BulkSMSPage';
import CreateClientPage from './pages/CreateClientPage';
import ClientsListPage from './pages/ClientsListPage';
import ClientProfilePage from './pages/ClientProfilePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bulk-sms" element={<BulkSMSPage />} />
        <Route path="/create-client" element={<CreateClientPage />} />
        <Route path="/clients" element={<ClientsListPage />} />
        <Route path="/client/:clientId" element={<ClientProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App; 
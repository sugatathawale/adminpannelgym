import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiUsers, FiUserCheck, FiLock } from 'react-icons/fi';
import logo from '../../assets/image.png'

const LoginCard = ({ role, icon, gradient, credentials, onSubmit }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm transform transition-all duration-300 hover:scale-105">
      <div className={`${gradient} p-6 text-center`}>
        <div className="w-20 h-20 mx-auto bg-white rounded-full p-4 shadow-lg mb-4 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-white mb-1">{role}</h2>
        <p className="text-gray-100 text-sm opacity-90">Access {role.toLowerCase()} dashboard</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder={credentials.username}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg ${gradient} text-white font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all`}
          >
            Login as {role}
          </button>
        </form>
        <div className="mt-4 text-center text-xs text-gray-500">
          Demo: {credentials.username} / {credentials.password}
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const roles = [
    {
      role: 'Super Admin',
      icon: <FiUserCheck className="w-8 h-8 text-purple-600" />,
      gradient: 'bg-gradient-to-r from-purple-600 to-purple-800',
      credentials: { username: 'admin', password: 'admin123' }
    },
    {
      role: 'Receptionist',
      icon: <FiUser className="w-8 h-8 text-pink-600" />,
      gradient: 'bg-gradient-to-r from-pink-500 to-purple-600',
      credentials: { username: 'reception', password: 'reception123' }
    }
  ];

  const handleLogin = (credentials) => {
    const role = roles.find(r =>
      r.credentials.username === credentials.username &&
      r.credentials.password === credentials.password
    );

    if (role) {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        username: credentials.username,
        role: role.role.toLowerCase().replace(' ', ''),
        isAuthenticated: true
      }));

      // Navigate based on role
      if (role.role === 'Receptionist') {
        navigate('/attendance');
      } else {
        navigate('/');
      }
      setError('');
    } else {
      setError('Invalid credentials! Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto rounded-full p-4 shadow-lg mb-4 flex items-center justify-center overflow-hidden">
            <div
              className="w-full h-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${logo})` }}
            />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">CrossFit Admin Panel</h1>
          <p className="text-gray-400">Choose your role to login</p>
          {error && (
            <div className="mt-4 text-red-400 bg-red-900/50 p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Login Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {roles.map((roleData, index) => (
            <LoginCard
              key={index}
              {...roleData}
              onSubmit={handleLogin}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login; 
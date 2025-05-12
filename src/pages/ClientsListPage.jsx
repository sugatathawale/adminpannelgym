import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiUserPlus } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const ClientsListPage = () => {
  const navigate = useNavigate();
  const [selectedClients, setSelectedClients] = useState([]);
  const [actionDropdownId, setActionDropdownId] = useState(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  // Fetch clients on component mount
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('https://gymbackend-pqhj.onrender.com/api/user/getclients');
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
      setClients(data);
      setLoading(false);
    } catch (error) {
      toast.error('Error loading clients. Please try again.');
      console.error('Error fetching clients:', error);
      setLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedClients(clients.map(client => client._id));
    } else {
      setSelectedClients([]);
    }
  };

  const handleSelectClient = (clientId) => {
    setSelectedClients(prev => {
      if (prev.includes(clientId)) {
        return prev.filter(id => id !== clientId);
      } else {
        return [...prev, clientId];
      }
    });
  };

  const handleViewProfile = (clientId) => {
    navigate(`/client/${clientId}`);
  };

  const handleActionClick = (clientId) => {
    if (actionDropdownId === clientId) {
      setActionDropdownId(null);
    } else {
      setActionDropdownId(clientId);
    }
  };

  const handleDeleteClient = async (clientId) => {
    setClientToDelete(clientId);
    setShowDeleteConfirmation(true);
    setActionDropdownId(null); // Close the action dropdown
  };

  const confirmDeleteClient = async () => {
    try {
      const response = await fetch(`https://gymbackend-pqhj.onrender.com/api/user/deleteclient/${clientToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete client');
      }

      // Remove client from state
      setClients(prev => prev.filter(client => client._id !== clientToDelete));
      toast.success('Client deleted successfully');

      // Reset states
      setShowDeleteConfirmation(false);
      setClientToDelete(null);
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Error deleting client. Please try again.');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-dropdown')) {
        setActionDropdownId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Format date to DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster />
      <h1 className="text-xl font-semibold mb-6">Client(s)</h1>

      <div className="space-y-4">
        {/* Filters and Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <select className="border rounded px-3 py-2 bg-white">
              <option>Show 10</option>
              <option>Show 25</option>
              <option>Show 50</option>
              <option>Show 100</option>
            </select>
            <select className="border rounded px-3 py-2 bg-white">
              <option>--Select Gender--</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <select className="border rounded px-3 py-2 bg-white">
              <option>--All Packages--</option>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Half Yearly</option>
              <option>Yearly</option>
            </select>
            <select className="border rounded px-3 py-2 bg-white">
              <option>--All Membership--</option>
              <option>Active</option>
              <option>Expired</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate('/create-client')}
              className="bg-pink-500 text-white px-4 py-2 rounded flex items-center"
            >
              <FiUserPlus className="mr-2" />
              New client
            </button>
            <button className="bg-pink-500 text-white px-4 py-2 rounded">
              BULK SMS
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search for Client, Name, Phone, E-Mail, Client ID/Biometric ID"
            className="w-full border rounded px-4 py-2 pr-10"
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedClients.length === clients.length && clients.length > 0}
                  />
                </th>
                <th className="px-4 py-2 text-left">CLIENT ID</th>
                <th className="px-4 py-2 text-left">PHOTO</th>
                <th className="px-4 py-2 text-left">CLIENT NAME</th>
                <th className="px-4 py-2 text-left">NUMBER</th>
                <th className="px-4 py-2 text-left">GENDER</th>
                <th className="px-4 py-2 text-left">REGISTRATION</th>
                <th className="px-4 py-2 text-left">PACKAGE</th>
                <th className="px-4 py-2 text-left">EXPIRATION</th>
                <th className="px-4 py-2 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="px-4 py-8 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                    </div>
                  </td>
                </tr>
              ) : clients.map((client) => (
                <tr key={client._id} className="border-b">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(client._id)}
                      onChange={() => handleSelectClient(client._id)}
                    />
                  </td>
                  <td className="px-4 py-2">{client._id.slice(-6)}</td>
                  <td className="px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      {client.clientName[0]}
                    </div>
                  </td>
                  <td className="px-4 py-2">{client.clientName}</td>
                  <td className="px-4 py-2">{client.contact}</td>
                  <td className="px-4 py-2 capitalize">{client.gender}</td>
                  <td className="px-4 py-2">{formatDate(client.joinDate)}</td>
                  <td className="px-4 py-2">{client.selectedPackage.name}</td>
                  <td className="px-4 py-2">{formatDate(client.endDate)}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleViewProfile(client._id)}
                        className="bg-pink-500 text-white px-3 py-1 rounded text-sm"
                      >
                        PROFILE
                      </button>
                      <div className="relative action-dropdown">
                        <button
                          onClick={() => handleActionClick(client._id)}
                          className="bg-pink-500 text-white px-3 py-1 rounded text-sm inline-flex items-center"
                        >
                          ACTION
                          <FiChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        {actionDropdownId === client._id && (
                          <div className="absolute right-0 mt-1 w-64 bg-white rounded shadow-lg z-50 border">
                            <div className="py-1">
                              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                View bill
                              </button>
                              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                Renew bill
                              </button>
                              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                Freeze membership(s)
                              </button>
                              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                Transfer membership(s)
                              </button>
                              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                SMS / WhatsApp / E-Mail bill
                              </button>
                              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                Add Followup
                              </button>
                              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                Send QR Url via SMS & Email
                              </button>
                              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                Mark attendance-in
                              </button>
                              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                Register RFID no.
                              </button>
                              <button
                                onClick={() => handleDeleteClient(client._id)}
                                className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                              >
                                Delete client
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 14l3-3H7v-2h4l-3-3h2l4 4-4 4H8zm9-1h-3v2l-4-4 4-4v2h3v4z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Delete Client</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this client? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirmation(false);
                  setClientToDelete(null);
                }}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteClient}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsListPage; 
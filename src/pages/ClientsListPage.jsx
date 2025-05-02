import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiUserPlus } from 'react-icons/fi';

const ClientsListPage = () => {
  const navigate = useNavigate();
  const [selectedClients, setSelectedClients] = useState([]);
  const [actionDropdownId, setActionDropdownId] = useState(null);
  
  // Sample client data - replace with your actual data
  const clients = [
    {
      id: '137',
      name: 'Jayraj',
      number: '9944414229',
      gender: 'Male',
      registration: '02-05-2025',
      package: 'Half Yearly',
      expiration: '29-10-2025',
      rewardPoints: 'Rs.20'
    },
    {
      id: '136',
      name: 'Faizar Mirza',
      number: '9356793527',
      gender: 'Male',
      registration: '02-05-2025',
      package: '1 Month',
      expiration: '01-06-2025',
      rewardPoints: 'Rs.10'
    }
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedClients(clients.map(client => client.id));
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
        <div className="bg-white rounded shadow">
          <table className="w-full">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedClients.length === clients.length}
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
                <th className="px-4 py-2 text-left">TOTAL REWARD POINTS</th>
                <th className="px-4 py-2 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(client.id)}
                      onChange={() => handleSelectClient(client.id)}
                    />
                  </td>
                  <td className="px-4 py-2">{client.id}</td>
                  <td className="px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      {client.name[0]}
                    </div>
                  </td>
                  <td className="px-4 py-2">{client.name}</td>
                  <td className="px-4 py-2">{client.number}</td>
                  <td className="px-4 py-2">{client.gender}</td>
                  <td className="px-4 py-2">{client.registration}</td>
                  <td className="px-4 py-2">{client.package}</td>
                  <td className="px-4 py-2">{client.expiration}</td>
                  <td className="px-4 py-2">{client.rewardPoints}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleViewProfile(client.id)}
                        className="bg-pink-500 text-white px-3 py-1 rounded text-sm"
                      >
                        PROFILE
                      </button>
                      <div className="relative action-dropdown">
                        <button
                          onClick={() => handleActionClick(client.id)}
                          className="bg-pink-500 text-white px-3 py-1 rounded text-sm inline-flex items-center"
                        >
                          ACTION
                          <FiChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        {actionDropdownId === client.id && (
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
                              <button className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100">
                                Delete client
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 14l3-3H7v-2h4l-3-3h2l4 4-4 4H8zm9-1h-3v2l-4-4 4-4v2h3v4z"/>
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
    </div>
  );
};

export default ClientsListPage; 
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiEdit2, FiArrowLeft } from 'react-icons/fi';

const ClientProfilePage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('PROFILE');

  // Sample client data - replace with your actual data
  const client = {
    id: '137',
    name: 'Jayraj',
    contact: '9944414229',
    alternativeContact: '',
    membershipId: '137',
    dateOfBirth: '',
    gender: 'MALE',
    anniversary: '',
    dateOfJoining: '02-05-2025',
    profession: '',
    email: 'example@gmail.com',
    clientRepresentative: 'Admin',
    clientSource: 'Instagram',
    status: 'Active',
    deleteMember: 'No',
    taxId: '',
    rewardPoints: 'Rs.20',
    address: '',
    remarks: '',
    batchTime: {
      from: '2:00 pm',
      to: '3:00 pm'
    }
  };

  const tabs = [
    'PROFILE',
    'BILLING & PAYMENT',
    'COMMUNICATION',
    'ATTENDANCE',
    'BODY MEASUREMENTS',
    'WORKOUT PLAN',
    'NUTRITION PLAN',
    'DOCUMENTS',
    'BOOKINGS'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/clients')}
              className="text-gray-600 hover:text-gray-800"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Clients / {client.name}</h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-1 p-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md ${
                  activeTab === tab
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                } font-medium`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Photo Section */}
          <div className="bg-green-500 rounded-lg p-6 text-white">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-lg bg-blue-500 flex items-center justify-center text-4xl mb-4">
                  {client.name[0]}
                </div>
                <button className="absolute bottom-4 right-0 bg-white p-2 rounded-full text-green-500">
                  <FiEdit2 />
                </button>
              </div>
              <div className="text-center">
                <div className="font-medium">Active</div>
                <h2 className="text-2xl font-bold mb-4">{client.name}</h2>
              </div>
              <div className="w-full grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm opacity-80">Batch time from</label>
                  <input
                    type="text"
                    value={client.batchTime.from}
                    className="w-full px-3 py-2 bg-green-600 rounded border border-green-400 text-white placeholder-green-300"
                    disabled
                  />
                </div>
                <div>
                  <label className="text-sm opacity-80">Batch time to</label>
                  <input
                    type="text"
                    value={client.batchTime.to}
                    className="w-full px-3 py-2 bg-green-600 rounded border border-green-400 text-white placeholder-green-300"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Client Details Section */}
          <div className="md:col-span-2 bg-white rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Client name</label>
                <input
                  type="text"
                  value={client.name}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="text"
                  value={client.contact}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alternative contact</label>
                <input
                  type="text"
                  placeholder="Alternative Contact"
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Membership ID</label>
                <input
                  type="text"
                  value={client.membershipId}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date Of Birth</label>
                <input
                  type="text"
                  placeholder="D.O.B"
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="mt-1 flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={client.gender === 'MALE'}
                      className="form-radio"
                      disabled
                    />
                    <span className="ml-2">MALE</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={client.gender === 'FEMALE'}
                      className="form-radio"
                      disabled
                    />
                    <span className="ml-2">FEMALE</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={client.gender === 'OTHER'}
                      className="form-radio"
                      disabled
                    />
                    <span className="ml-2">OTHER</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Anniversary</label>
                <input
                  type="text"
                  placeholder="Anniversary"
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Joining</label>
                <input
                  type="text"
                  value={client.dateOfJoining}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profession</label>
                <input
                  type="text"
                  placeholder="Profession"
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">E-Mail</label>
                <input
                  type="email"
                  value={client.email}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Client representative</label>
                <select
                  value={client.clientRepresentative}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                >
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Client source</label>
                <select
                  value={client.clientSource}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                >
                  <option>Instagram</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={client.status}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                >
                  <option>Active</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Delete member</label>
                <select
                  value={client.deleteMember}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                >
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tax ID</label>
                <input
                  type="text"
                  placeholder="taxid"
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reward Points</label>
                <input
                  type="text"
                  value={client.rewardPoints}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                className="mt-1 w-full px-3 py-2 border rounded-md"
                rows="3"
                disabled
              ></textarea>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Remarks</label>
              <textarea
                className="mt-1 w-full px-3 py-2 border rounded-md"
                rows="3"
                disabled
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage; 
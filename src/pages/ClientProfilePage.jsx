import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiEdit2, FiArrowLeft } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const ClientProfilePage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('PROFILE');
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState({
    id: '',
    name: '',
    contact: '',
    alternativeContact: '',
    membershipId: '',
    dateOfBirth: '',
    gender: '',
    anniversary: '',
    dateOfJoining: '',
    profession: '',
    email: '',
    clientRepresentative: 'Admin',
    clientSource: 'Instagram',
    status: 'Active',
    deleteMember: 'No',
    taxId: '',
    rewardPoints: '',
    address: '',
    remarks: '',
    batchTime: {
      from: '2:00 pm',
      to: '3:00 pm'
    },
    packageName: '',
    packageDuration: '',
    packagePrice: 0,
    admissionCharges: 0,
    discount: 0,
    totalAmount: 0,
    finalAmount: 0,
    paidAmount: 0,
    remainingAmount: 0,
    paymentMode: ''
  });

  useEffect(() => {
    console.log("ClientId from params:", clientId);
    fetchClientDetails();
  }, [clientId]);

  const fetchClientDetails = async () => {
    try {
      console.log("Fetching client details for ID:", clientId);
      // Changed to your backend URL
      const response = await fetch(`https://gymbackend-pqhj.onrender.com/api/user/getclient/${clientId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch client details');
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Map the API response to our UI structure
      const mappedData = {
        id: data._id || '',
        name: data.clientName || '',
        contact: data.contact || '',
        alternativeContact: data.alternativeContact || '',
        membershipId: data._id?.slice(-6) || '',
        dateOfBirth: data.dateOfBirth || '',
        gender: data.gender?.toUpperCase() || '',
        anniversary: data.anniversary || '',
        dateOfJoining: new Date(data.joinDate).toLocaleDateString('en-GB'),
        profession: data.profession || '',
        email: data.email || '',
        clientRepresentative: 'Admin',
        clientSource: 'Instagram',
        status: 'Active',
        deleteMember: 'No',
        taxId: data.taxId || '',
        rewardPoints: 'Rs.0',
        address: data.address || '',
        remarks: data.remarks || '',
        batchTime: {
          from: '2:00 pm',
          to: '3:00 pm'
        },
        packageName: data.selectedPackage?.name || '',
        packageDuration: data.selectedPackage?.duration || '',
        packagePrice: data.packagePrice || 0,
        admissionCharges: data.admissionCharges || 0,
        discount: data.discount || 0,
        totalAmount: data.totalAmount || 0,
        finalAmount: data.finalAmount || 0,
        paidAmount: data.paidAmount || 0,
        remainingAmount: data.remainingAmount || 0,
        paymentMode: data.paymentMode?.replace(/_/g, ' ') || ''
      };

      console.log("Mapped Data:", mappedData);
      setClient(mappedData);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error loading client details. Please try again.');
      setLoading(false);
    }
  };

  // Add this to check what data we're actually rendering
  console.log("Current client state:", client);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

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
      <Toaster />
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
                className={`px-4 py-2 rounded-md ${activeTab === tab
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
                <div className="font-medium">{client.status}</div>
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
                  value={client.alternativeContact}
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
                <label className="block text-sm font-medium text-gray-700">Package Name</label>
                <input
                  type="text"
                  value={client.packageName}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Package Duration</label>
                <input
                  type="text"
                  value={`${client.packageDuration} days`}
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
                <label className="block text-sm font-medium text-gray-700">E-Mail</label>
                <input
                  type="email"
                  value={client.email}
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
                </div>
              </div>

              {/* Payment Details */}
              <div className="md:col-span-3">
                <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Package Price</label>
                    <input
                      type="text"
                      value={`₹${client.packagePrice}`}
                      className="mt-1 w-full px-3 py-2 border rounded-md"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Admission Charges</label>
                    <input
                      type="text"
                      value={`₹${client.admissionCharges}`}
                      className="mt-1 w-full px-3 py-2 border rounded-md"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Discount</label>
                    <input
                      type="text"
                      value={`₹${client.discount}`}
                      className="mt-1 w-full px-3 py-2 border rounded-md text-green-600"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                    <input
                      type="text"
                      value={`₹${client.totalAmount}`}
                      className="mt-1 w-full px-3 py-2 border rounded-md"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Final Amount</label>
                    <input
                      type="text"
                      value={`₹${client.finalAmount}`}
                      className="mt-1 w-full px-3 py-2 border rounded-md font-semibold"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Paid Amount</label>
                    <input
                      type="text"
                      value={`₹${client.paidAmount}`}
                      className="mt-1 w-full px-3 py-2 border rounded-md"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Remaining Amount</label>
                    <input
                      type="text"
                      value={`₹${client.remainingAmount}`}
                      className="mt-1 w-full px-3 py-2 border rounded-md text-red-600 font-semibold"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                    <input
                      type="text"
                      value={client.paymentMode}
                      className="mt-1 w-full px-3 py-2 border rounded-md"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  value={client.address}
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  rows="3"
                  disabled
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage; 
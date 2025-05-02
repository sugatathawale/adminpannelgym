import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter, FiMessageSquare, FiImage, FiSend, FiUsers, FiPhoneCall, FiArrowLeft } from 'react-icons/fi';

const BulkSMSPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    recordsToShow: '10',
    memberStatus: 'All Members'
  });

  const [activeTab, setActiveTab] = useState('clients'); // 'clients' or 'inquiries'
  const [selectedClients, setSelectedClients] = useState([]);
  const [messageType, setMessageType] = useState('BULK SMS');
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [message, setMessage] = useState('');
  
  // Sample client data
  const clients = [
    { id: '133', name: 'Esseddik', contact: '2136580597', gender: 'Male', registrationDate: '30-04-2025', package: 'شهري 5 حصص', expirationDate: '30-05-2025' },
    { id: '123', name: 'Rajesh', contact: '6302092116', gender: 'Male', registrationDate: '28-04-2025', package: 'Annual Membership', expirationDate: '28-04-2026' },
    { id: '122', name: 'Rahul', contact: '1234567890', gender: 'Male', registrationDate: '27-04-2025', package: 'Annual Membership', expirationDate: '27-04-2026' },
    { id: '51', name: 'Yogesh', contact: '8855851547', gender: 'Male', registrationDate: '11-04-2025', package: 'Annual Membership', expirationDate: '11-04-2026' },
    { id: '35', name: 'Muthu Mayandi', contact: '7338840661', gender: 'Male', registrationDate: '01-04-2025', package: 'Annual Membership', expirationDate: '01-04-2026' },
    { id: '17', name: 'Hardhik', contact: '8985138853', gender: 'Male', registrationDate: '01-01-1970', package: '', expirationDate: '' }
  ];

  // Sample inquiry data
  const inquiries = [
    { id: '1', name: 'John Doe', contact: '9876543210', status: 'New', date: '01-05-2025', source: 'Website' },
    { id: '2', name: 'Jane Smith', contact: '8765432109', status: 'Pending', date: '02-05-2025', source: 'Walk-in' },
    { id: '3', name: 'Mike Johnson', contact: '7654321098', status: 'Interested', date: '03-05-2025', source: 'Referral' }
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const ids = activeTab === 'clients' 
        ? clients.map(client => client.id)
        : inquiries.map(inquiry => inquiry.id);
      setSelectedClients(ids);
    } else {
      setSelectedClients([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedClients(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setSelectedImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    console.log('Sending messages to:', selectedClients);
    console.log('Message type:', messageType);
    console.log('Template:', selectedTemplate);
    console.log('Message:', message);
    console.log('Images:', selectedImages);
    // Implement your send logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FiArrowLeft className="mr-2" />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Bulk Message Center</h1>

        {/* Main Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex gap-1 p-4">
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-6 py-2 rounded-md flex items-center ${
                activeTab === 'clients'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FiUsers className="mr-2" />
              Clients
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-6 py-2 rounded-md flex items-center ${
                activeTab === 'inquiries'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FiPhoneCall className="mr-2" />
              Inquiries
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recipients */}
          <div className="lg:col-span-2">
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="bg-blue-500 text-white p-4 rounded-t-lg">
                <div className="flex items-center">
                  <FiFilter className="mr-2" />
                  <span className="font-medium">Filter</span>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Show Records</label>
                    <select
                      value={filters.recordsToShow}
                      onChange={(e) => setFilters(prev => ({ ...prev, recordsToShow: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="10">Show 10</option>
                      <option value="25">Show 25</option>
                      <option value="50">Show 50</option>
                      <option value="100">Show 100</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {activeTab === 'clients' ? 'Client Status' : 'Inquiry Status'}
                    </label>
                    <select
                      value={filters.memberStatus}
                      onChange={(e) => setFilters(prev => ({ ...prev, memberStatus: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {activeTab === 'clients' ? (
                        <>
                          <option value="All Members">All Members</option>
                          <option value="Active">Active Members</option>
                          <option value="Expired">Expired Members</option>
                        </>
                      ) : (
                        <>
                          <option value="All">All Inquiries</option>
                          <option value="New">New</option>
                          <option value="Pending">Pending</option>
                          <option value="Interested">Interested</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Recipients Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left">
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={
                            activeTab === 'clients'
                              ? selectedClients.length === clients.length
                              : selectedClients.length === inquiries.length
                          }
                          className="rounded border-gray-300"
                        />
                      </th>
                      {activeTab === 'clients' ? (
                        <>
                          <th className="py-3 px-4 text-left">Client ID</th>
                          <th className="py-3 px-4 text-left">Name</th>
                          <th className="py-3 px-4 text-left">Contact</th>
                          <th className="py-3 px-4 text-left">Package</th>
                          <th className="py-3 px-4 text-left">Expiration</th>
                        </>
                      ) : (
                        <>
                          <th className="py-3 px-4 text-left">Inquiry ID</th>
                          <th className="py-3 px-4 text-left">Name</th>
                          <th className="py-3 px-4 text-left">Contact</th>
                          <th className="py-3 px-4 text-left">Status</th>
                          <th className="py-3 px-4 text-left">Source</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {activeTab === 'clients'
                      ? clients.map((client) => (
                          <tr key={client.id} className="border-t hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <input
                                type="checkbox"
                                checked={selectedClients.includes(client.id)}
                                onChange={() => handleSelectItem(client.id)}
                                className="rounded border-gray-300"
                              />
                            </td>
                            <td className="py-3 px-4">{client.id}</td>
                            <td className="py-3 px-4">{client.name}</td>
                            <td className="py-3 px-4">{client.contact}</td>
                            <td className="py-3 px-4">{client.package}</td>
                            <td className="py-3 px-4">{client.expirationDate}</td>
                          </tr>
                        ))
                      : inquiries.map((inquiry) => (
                          <tr key={inquiry.id} className="border-t hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <input
                                type="checkbox"
                                checked={selectedClients.includes(inquiry.id)}
                                onChange={() => handleSelectItem(inquiry.id)}
                                className="rounded border-gray-300"
                              />
                            </td>
                            <td className="py-3 px-4">{inquiry.id}</td>
                            <td className="py-3 px-4">{inquiry.name}</td>
                            <td className="py-3 px-4">{inquiry.contact}</td>
                            <td className="py-3 px-4">{inquiry.status}</td>
                            <td className="py-3 px-4">{inquiry.source}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Message Composition */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Compose Message</h2>

              {/* Message Type */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => setMessageType('BULK SMS')}
                    className={`flex-1 px-4 py-2 rounded-md ${
                      messageType === 'BULK SMS' 
                        ? 'bg-pink-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    BULK SMS
                  </button>
                  <button
                    onClick={() => setMessageType('BULK WHATSAPP')}
                    className={`flex-1 px-4 py-2 rounded-md ${
                      messageType === 'BULK WHATSAPP' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    BULK WHATSAPP
                  </button>
                </div>
              </div>

              {/* Message Template */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Template
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a template</option>
                  <option value="template1">Welcome Message</option>
                  <option value="template2">Payment Reminder</option>
                  <option value="template3">Special Offer</option>
                </select>
              </div>

              {/* Message Content */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message here..."
                />
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach Images
                </label>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                      <FiImage className="w-8 h-8" />
                      <span className="mt-2 text-base leading-normal">Select Images</span>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={selectedClients.length === 0 || !message}
                className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 ${
                  selectedClients.length === 0 || !message
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                <FiSend />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkSMSPage; 
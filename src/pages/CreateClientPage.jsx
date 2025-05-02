import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiCalendar, FiDollarSign, FiCreditCard, FiPackage, FiArrowLeft } from 'react-icons/fi';

const CreateClientPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    selectedPackage: '',
    joinDate: '',
    endDate: '',
    amount: '',
    paidAmount: '',
    discount: '',
    admissionCharges: '',
    paymentMode: 'offline',
    gender: 'male',
    contact: '',
    email: '',
    address: ''
  });

  const [calculations, setCalculations] = useState({
    totalAmount: 0,
    remainingAmount: 0,
    finalAmount: 0
  });

  // Sample gym packages
  const gymPackages = [
    { id: 'p1', name: 'Monthly Basic', price: 1000 },
    { id: 'p2', name: 'Monthly Premium', price: 1500 },
    { id: 'p3', name: 'Quarterly Basic', price: 2700 },
    { id: 'p4', name: 'Quarterly Premium', price: 4000 },
    { id: 'p5', name: 'Annual Basic', price: 10000 },
    { id: 'p6', name: 'Annual Premium', price: 15000 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate end date based on package and join date
  useEffect(() => {
    if (formData.joinDate && formData.selectedPackage) {
      const selectedPackage = gymPackages.find(pkg => pkg.id === formData.selectedPackage);
      if (selectedPackage) {
        const startDate = new Date(formData.joinDate);
        let endDate = new Date(startDate);
        
        if (selectedPackage.name.includes('Monthly')) {
          endDate.setMonth(endDate.getMonth() + 1);
        } else if (selectedPackage.name.includes('Quarterly')) {
          endDate.setMonth(endDate.getMonth() + 3);
        } else if (selectedPackage.name.includes('Annual')) {
          endDate.setFullYear(endDate.getFullYear() + 1);
        }

        setFormData(prev => ({
          ...prev,
          endDate: endDate.toISOString().split('T')[0]
        }));
      }
    }
  }, [formData.joinDate, formData.selectedPackage]);

  // Calculate amounts whenever relevant fields change
  useEffect(() => {
    const selectedPackage = gymPackages.find(pkg => pkg.id === formData.selectedPackage);
    const packageAmount = selectedPackage ? selectedPackage.price : 0;
    const admissionCharges = parseFloat(formData.admissionCharges) || 0;
    const discount = parseFloat(formData.discount) || 0;
    const paidAmount = parseFloat(formData.paidAmount) || 0;

    const totalBeforeDiscount = packageAmount + admissionCharges;
    const finalAmount = totalBeforeDiscount - discount;
    const remainingAmount = finalAmount - paidAmount;

    setCalculations({
      totalAmount: totalBeforeDiscount,
      finalAmount: finalAmount,
      remainingAmount: remainingAmount
    });
  }, [formData.selectedPackage, formData.admissionCharges, formData.discount, formData.paidAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.paymentMode === 'online') {
      // Send SMS with payment link
      console.log('Sending payment request SMS to client');
      // Implement your SMS sending logic here
    }

    // Create bill and save client data
    console.log('Creating client and bill:', formData);
    // Implement your save logic here
    
    // Navigate back to dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FiArrowLeft className="mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create New Client</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiUser className="inline mr-2" />
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiUser className="inline mr-2" />
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiUser className="inline mr-2" />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiUser className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Membership Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Membership Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiPackage className="inline mr-2" />
                    Select Package
                  </label>
                  <select
                    name="selectedPackage"
                    value={formData.selectedPackage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  >
                    <option value="">Select a package</option>
                    {gymPackages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - ₹{pkg.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiCalendar className="inline mr-2" />
                    Join Date
                  </label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiCalendar className="inline mr-2" />
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-100"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiDollarSign className="inline mr-2" />
                    Admission Charges
                  </label>
                  <input
                    type="number"
                    name="admissionCharges"
                    value={formData.admissionCharges}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiDollarSign className="inline mr-2" />
                    Discount
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiDollarSign className="inline mr-2" />
                    Paid Amount
                  </label>
                  <input
                    type="number"
                    name="paidAmount"
                    value={formData.paidAmount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiCreditCard className="inline mr-2" />
                    Payment Mode
                  </label>
                  <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                  </select>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="mt-6 p-4 bg-white rounded-lg border">
                <h4 className="text-lg font-semibold mb-4">Payment Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Package Amount:</span>
                    <span>₹{gymPackages.find(pkg => pkg.id === formData.selectedPackage)?.price || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Admission Charges:</span>
                    <span>₹{formData.admissionCharges || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span>₹{calculations.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>₹{formData.discount || 0}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Final Amount:</span>
                    <span>₹{calculations.finalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Paid Amount:</span>
                    <span>₹{formData.paidAmount || 0}</span>
                  </div>
                  <div className="flex justify-between text-red-600 font-semibold">
                    <span>Remaining Amount:</span>
                    <span>₹{calculations.remainingAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                Create Client & Generate Bill
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClientPage; 
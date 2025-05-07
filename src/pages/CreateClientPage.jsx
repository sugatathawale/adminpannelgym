import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiCalendar, FiDollarSign, FiCreditCard, FiPackage, FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiAlertTriangle } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const CreateClientPage = () => {
  const navigate = useNavigate();
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch packages on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('https://gymbackend-pqhj.onrender.com/api/user/getpackages');
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }
      const data = await response.json();
      setPackages(data);
      setLoading(false);
    } catch (error) {
      toast.error('Error loading packages. Please try again.');
      console.error('Error fetching packages:', error);
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    clientName: '',
    selectedPackage: '',
    joinDate: '',
    endDate: '',
    amount: '',
    paidAmount: '',
    discount: '',
    admissionCharges: '',
    paymentMode: 'offline_full',
    gender: 'male',
    contact: '',
    email: '',
    address: ''
  });

  const [packageFormData, setPackageFormData] = useState({
    name: '',
    duration: '',
    price: '',
    status: 'active'
  });

  const [calculations, setCalculations] = useState({
    totalAmount: 0,
    remainingAmount: 0,
    finalAmount: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePackageFormChange = (e) => {
    const { name, value } = e.target;
    setPackageFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPackage = () => {
    setEditingPackage(null);
    setPackageFormData({
      name: '',
      duration: '',
      price: '',
      status: 'active'
    });
    setShowPackageModal(true);
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setPackageFormData({
      name: pkg.name,
      duration: pkg.duration,
      price: pkg.price,
      status: pkg.status
    });
    setShowPackageModal(true);
  };

  const handleSavePackage = async () => {
    try {
      const packageData = {
        name: packageFormData.name,
        duration: parseInt(packageFormData.duration),
        price: parseInt(packageFormData.price),
        status: packageFormData.status
      };

      const response = await fetch('https://gymbackend-pqhj.onrender.com/api/user/packagecreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packageData)
      });

      if (!response.ok) {
        throw new Error('Failed to create package');
      }

      const newPackage = await response.json();

      // Update packages list
      setPackages(prev => [...prev, newPackage]);

      // Show success notification
      toast.success('Package created successfully!', {
        duration: 3000,
        position: 'top-right',
      });

      // Close modal
      setShowPackageModal(false);
    } catch (error) {
      toast.error(error.message || 'Error creating package. Please try again.', {
        duration: 3000,
        position: 'top-right',
      });
      console.error('Error:', error);
    }
  };

  const handleDeleteClick = (packageId) => {
    setPackageToDelete(packageId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setPackages(prev => prev.filter(p => p._id !== packageToDelete));
    setShowDeleteConfirmation(false);
    setPackageToDelete(null);
  };

  // Updated end date calculation based on package duration
  useEffect(() => {
    if (formData.joinDate && formData.selectedPackage) {
      const selectedPackage = packages.find(pkg => pkg._id === formData.selectedPackage);
      if (selectedPackage) {
        const startDate = new Date(formData.joinDate);
        let endDate = new Date(startDate);

        // Add the package duration in days to the start date
        endDate.setDate(endDate.getDate() + selectedPackage.duration);

        setFormData(prev => ({
          ...prev,
          endDate: endDate.toISOString().split('T')[0]
        }));
      }
    }
  }, [formData.joinDate, formData.selectedPackage]);

  // Calculate amounts whenever relevant fields change
  useEffect(() => {
    const selectedPackage = packages.find(pkg => pkg._id === formData.selectedPackage);
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

    try {
      // Prepare the client data for API
      const clientData = {
        clientName: formData.clientName,
        gender: formData.gender,
        contact: formData.contact,
        email: formData.email,
        address: formData.address,
        selectedPackage: formData.selectedPackage,
        joinDate: formData.joinDate,
        endDate: formData.endDate,
        admissionCharges: parseFloat(formData.admissionCharges) || 0,
        discount: parseFloat(formData.discount) || 0,
        paidAmount: parseFloat(formData.paidAmount) || 0,
        paymentMode: formData.paymentMode
      };

      const response = await fetch('https://gymbackend-pqhj.onrender.com/api/user/createclient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create client');
      }

      const data = await response.json();

      // Show appropriate success message based on payment mode
      if (formData.paymentMode === 'offline_full') {
        toast.success('Client created successfully! Payment received in full.', {
          duration: 3000,
          position: 'top-right',
        });
      } else if (formData.paymentMode === 'offline_partial') {
        toast.success('Client created and bill generated for remaining amount!', {
          duration: 3000,
          position: 'top-right',
        });
      } else if (formData.paymentMode === 'online') {
        toast.success('Client created. Payment link sent via SMS and email.', {
          duration: 3000,
          position: 'top-right',
        });
      }

      // Navigate back to dashboard
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Error creating client. Please try again.', {
        duration: 3000,
        position: 'top-right',
      });
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster />
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
                  <div className="relative">
                    <select
                      name="selectedPackage"
                      value={formData.selectedPackage}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                      disabled={loading}
                    >
                      <option value="">Select a package</option>
                      {packages
                        .filter(pkg => pkg.status === 'active')
                        .map(pkg => (
                          <option key={pkg._id} value={pkg._id}>
                            {pkg.name} - {pkg.duration} days - ₹{pkg.price}
                          </option>
                        ))}
                    </select>
                    <div className="absolute right-0 top-0 h-full flex items-center pr-2 space-x-1">
                      <button
                        type="button"
                        onClick={handleAddPackage}
                        className="p-1 text-pink-500 hover:text-pink-600"
                        title="Add New Package"
                      >
                        <FiPlus className="w-5 h-5" />
                      </button>
                    </div>
                    {loading && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-500"></div>
                      </div>
                    )}
                  </div>
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
                    Registration Charges
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
                    <option value="offline_full">Offline - Full Payment</option>
                    <option value="offline_partial">Offline - Partial Payment</option>
                    <option value="online">Online Payment</option>
                  </select>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="mt-6 p-4 bg-white rounded-lg border">
                <h4 className="text-lg font-semibold mb-4">Payment Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Package Amount:</span>
                    <span>₹{packages.find(pkg => pkg._id === formData.selectedPackage)?.price || 0}</span>
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center text-red-500 mb-4">
              <FiAlertTriangle className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-semibold">Delete Package</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this package? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirmation(false);
                  setPackageToDelete(null);
                }}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Modal */}
      {showPackageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Add New Package
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={packageFormData.name}
                  onChange={handlePackageFormChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                  placeholder="e.g., 2 Month Plan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (days)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={packageFormData.duration}
                  onChange={handlePackageFormChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                  min="1"
                  placeholder="e.g., 60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={packageFormData.price}
                  onChange={handlePackageFormChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                  min="0"
                  placeholder="e.g., 1000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={packageFormData.status}
                  onChange={handlePackageFormChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowPackageModal(false)}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePackage}
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
              >
                Create Package
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateClientPage; 
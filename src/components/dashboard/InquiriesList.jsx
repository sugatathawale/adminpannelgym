import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import CreateInquiry from './CreateInquiry';
import { FiSearch, FiFilter, FiPhone, FiMessageSquare, FiCalendar, FiUser } from 'react-icons/fi';

const InquiriesList = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const fetchInquiries = async () => {
        try {
            const response = await fetch('https://gymbackend-pqhj.onrender.com/api/user/getinquiries');
            if (!response.ok) {
                throw new Error('Failed to fetch inquiries');
            }
            const data = await response.json();
            setInquiries(data);
        } catch (error) {
            toast.error(error.message || 'Error fetching inquiries');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'hot':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'cold':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const filteredInquiries = inquiries.filter(inquiry => {
        const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.phone.includes(searchTerm) ||
            inquiry.conversation.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || inquiry.status.toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                    <p className="mt-4 text-gray-600">Loading inquiries...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
                        <p className="mt-1 text-gray-500">Manage and track all gym inquiries</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="mt-4 md:mt-0 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center"
                    >
                        <FiMessageSquare className="mr-2" />
                        New Inquiry
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, phone or conversation..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none bg-white"
                                >
                                    <option value="all">All Status</option>
                                    <option value="hot">Hot</option>
                                    <option value="medium">Medium</option>
                                    <option value="cold">Cold</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inquiries List */}
                {filteredInquiries.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No inquiries found</h3>
                        <p className="mt-2 text-gray-500">
                            {searchTerm || filterStatus !== 'all'
                                ? 'Try adjusting your search or filter parameters'
                                : 'Get started by creating a new inquiry'}
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <FiUser className="mr-2" />
                                                Name
                                            </div>
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <FiPhone className="mr-2" />
                                                Phone
                                            </div>
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Conversation
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <FiCalendar className="mr-2" />
                                                Date
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredInquiries.map((inquiry) => (
                                        <tr key={inquiry._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{inquiry.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(inquiry.status)}`}>
                                                    {inquiry.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-500 max-w-xs truncate">
                                                    {inquiry.conversation}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {showCreateModal && (
                <CreateInquiry
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={() => {
                        fetchInquiries();
                        setShowCreateModal(false);
                        toast.success('Inquiry created successfully');
                    }}
                />
            )}
        </div>
    );
};

export default InquiriesList; 
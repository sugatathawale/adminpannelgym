import React, { useState, useEffect } from 'react';
import { FiCheck, FiUser, FiSearch } from 'react-icons/fi';

const Attendance = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [memberName, setMemberName] = useState('');
    const [attendanceCount, setAttendanceCount] = useState(0);
    const [attendanceList, setAttendanceList] = useState([]);
    const [message, setMessage] = useState('');

    // Simulated member data - in real app, this would come from an API/database
    const members = {
        '1234567890': 'John Doe',
        '9876543210': 'Jane Smith',
        '9898989898': 'Mike Johnson',
        '8787878787': 'Sarah Williams',
        '7676767676': 'David Brown',
        '9999999999': 'Emma Davis'
    };

    // Function to find member by phone number or name
    const findMember = (query) => {
        // Check if query matches a phone number
        if (members[query]) {
            return { phone: query, name: members[query] };
        }

        // Check if query matches a name (case-insensitive)
        const foundEntry = Object.entries(members).find(([phone, name]) =>
            name.toLowerCase().includes(query.toLowerCase())
        );

        return foundEntry ? { phone: foundEntry[0], name: foundEntry[1] } : null;
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setPhoneNumber('');
            setMemberName('');
            setMessage('');
            return;
        }

        const member = findMember(query);
        if (member) {
            setPhoneNumber(member.phone);
            setMemberName(member.name);
            setMessage('');
        } else {
            setPhoneNumber('');
            setMemberName('');
            setMessage('Member not found');
        }
    };

    const markAttendance = () => {
        if (!phoneNumber || !members[phoneNumber]) {
            setMessage('Please enter a valid phone number');
            return;
        }

        const currentDate = new Date().toLocaleDateString();
        const newAttendance = {
            phoneNumber,
            name: members[phoneNumber],
            date: currentDate,
            time: new Date().toLocaleTimeString(),
        };

        // Check if attendance already marked for today
        const alreadyMarked = attendanceList.some(
            attendance =>
                attendance.phoneNumber === phoneNumber &&
                attendance.date === currentDate
        );

        if (alreadyMarked) {
            setMessage('Attendance already marked for today!');
            return;
        }

        setAttendanceList([newAttendance, ...attendanceList]);
        setAttendanceCount(prev => prev + 1);
        setMessage('Attendance marked successfully!');

        // Clear the input fields after marking attendance
        setPhoneNumber('');
        setMemberName('');
        setSearchQuery('');

        // Clear success message after 3 seconds
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Attendance System</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Search Member
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Search by phone number or name..."
                        />
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {memberName && (
                    <div className="mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="text-sm font-semibold text-gray-600">Member Details:</p>
                            <p className="text-lg font-medium text-gray-800">{memberName}</p>
                            <p className="text-sm text-gray-600">{phoneNumber}</p>
                        </div>
                    </div>
                )}

                {message && (
                    <div className={`mb-4 p-4 rounded-lg ${message.includes('success')
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                        <p className="flex items-center">
                            {message.includes('success') && <FiCheck className="mr-2" />}
                            {message}
                        </p>
                    </div>
                )}

                <button
                    onClick={markAttendance}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!memberName}
                >
                    Mark Attendance
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Today's Attendance</h2>
                    <p className="text-gray-600">Total Count: {attendanceCount}</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-4 py-2 text-left text-gray-600">Name</th>
                                <th className="px-4 py-2 text-left text-gray-600">Phone Number</th>
                                <th className="px-4 py-2 text-left text-gray-600">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceList.map((attendance, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{attendance.name}</td>
                                    <td className="px-4 py-2">{attendance.phoneNumber}</td>
                                    <td className="px-4 py-2">{attendance.time}</td>
                                </tr>
                            ))}
                            {attendanceList.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="px-4 py-4 text-center text-gray-500">
                                        No attendance records for today
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Attendance; 
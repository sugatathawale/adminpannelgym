import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiMessageSquare,
  FiClock,
  FiSearch,
  FiPieChart,
  FiChevronDown,
  FiList,
  FiUserPlus,
} from "react-icons/fi"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import CreateFollowUp from './CreateFollowUp';

// Sample data for charts
const revenueData = [
  { name: "Jan", value: 12000 },
  { name: "Feb", value: 19000 },
  { name: "Mar", value: 15000 },
  { name: "Apr", value: 14000 },
]

const membershipData = [
  { name: "Jan", active: 80, expired: 10 },
  { name: "Feb", active: 95, expired: 12 },
  { name: "Mar", active: 103, expired: 14 },
  { name: "Apr", active: 103, expired: 14 },
]

const attendanceData = [
  { name: "Mon", value: 45 },
  { name: "Tue", value: 52 },
  { name: "Wed", value: 49 },
  { name: "Thu", value: 55 },
  { name: "Fri", value: 50 },
  { name: "Sat", value: 40 },
  { name: "Sun", value: 35 },
]

const QuickManageItem = ({ icon, label }) => (
  <div className="flex items-center space-x-3 p-3 hover:bg-pink-50 rounded-lg cursor-pointer transition-colors">
    {icon}
    <span className="text-sm text-gray-700">{label}</span>
  </div>
)

const Dashboard = () => {
  const navigate = useNavigate();
  const [showFollowUp, setShowFollowUp] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Logo */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/crossfit-logo.png" alt="Logo" className="h-8" />
          <span className="text-xl font-bold">CrossFit Gym </span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <FiChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-gray-50 border-b">
        <div className="flex flex-wrap gap-1 p-2">
          <button className="px-4 py-2 rounded-md bg-pink-500 text-white font-medium">
            DASHBOARD
          </button>
          {[
            'INQUIRY',
            'CLIENTS',
            'BILLING & PAYMENTS',
            'SPORTS',
            'ATTENDANCE',
            'REPORTS',
            'MANAGE & SETTINGS',
            'FORMS',
            'FEEDBACKS',
            'ANALYSIS'
          ].map((item) => (
            <button
              key={item}
              className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 font-medium"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="px-2 pb-2">
          <button className="px-4 py-1 rounded-md text-gray-700 hover:bg-gray-100 font-medium">
            EASYBIO
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Quick Manage Sidebar */}
        <div className="w-64 bg-white p-4 border-r">
          <div className="bg-pink-500 text-white p-3 rounded-lg mb-4 flex items-center">
            <FiList className="mr-2" />
            <span className="font-semibold">Quick Manage</span>
          </div>
          <div className="space-y-1">
            <QuickManageItem icon={<FiClock className="text-gray-600" />} label="Follow-ups" />
            <QuickManageItem icon={<FiMessageSquare className="text-gray-600" />} label="Pending Inquiries" />
            <QuickManageItem icon={<FiDollarSign className="text-gray-600" />} label="Pending payments" />
            <QuickManageItem icon={<FiCalendar className="text-gray-600" />} label="Upcoming Renewals" />
            <QuickManageItem icon={<FiUsers className="text-gray-600" />} label="Inconsistant Clients" />
            <QuickManageItem icon={<FiCalendar className="text-gray-600" />} label="Birthdays" />
            <QuickManageItem icon={<FiCalendar className="text-gray-600" />} label="Anniversary" />
            <QuickManageItem icon={<FiCalendar className="text-gray-600" />} label="Today's Schedule" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-[#f0f4f8]">
          {/* Create Client Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate('/create-client')}
              className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <FiUserPlus className="mr-2" />
              Create Client
            </button>
          </div>

          {/* Follow-up Form */}
          {showFollowUp && <CreateFollowUp onClose={() => setShowFollowUp(false)} />}

          {/* Search Bar - Centered */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 w-full max-w-4xl">
              <div className="relative">
                <select className="pl-4 pr-8 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none">
                  <option>Contact No.</option>
                  <option>Name</option>
                  <option>Email</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FiChevronDown className="text-gray-400" />
                </div>
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for Client, Name, Phone, E-Mail, Client ID/Biometric ID"
                  className="w-full pl-4 pr-10 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <FiSearch className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Summary Statistics Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <FiPieChart className="mr-2 text-xl" />
              <h2 className="text-xl font-bold">Summary Statistics</h2>
            </div>
            <div className="flex items-center space-x-4">
              <span>From</span>
              <input
                type="text"
                className="px-4 py-2 border rounded-lg bg-white focus:outline-none"
                defaultValue="26-04-2025"
              />
              <span>To</span>
              <input
                type="text"
                className="px-4 py-2 border rounded-lg bg-white focus:outline-none"
                defaultValue="26-04-2025"
              />
              <button className="px-6 py-2 bg-pink-500 text-white rounded-lg">FILTER</button>
            </div>
          </div>

          {/* Stats Grid - First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div
              onClick={() => navigate('/clients')}
              className="bg-white p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0YWRlODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyLXBsdXMiPjxwYXRoIGQ9Ik0xNiAyMXYtMmE0IDQgMCAwIDAtNC00SDZhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iOSIgY3k9IjciIHI9IjQiLz48bGluZSB4MT0iMTkiIHgyPSIxOSIgeTE9IjgiIHkyPSIxNCIvPjxsaW5lIHgxPSIyMiIgeDI9IjE2IiB5MT0iMTEiIHkyPSIxMSIvPjwvc3ZnPg=="
                    alt="New clients"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">New clients</p>
                  <h3 className="text-2xl font-bold">1</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "20%" }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4YjVjZjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtZG9sbGFyLXNpZ24iPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTEyIDE3di0xIi8+PHBhdGggZD0iTTEyIDh2LTEiLz48cGF0aCBkPSJNMTUgMTJhMyAzIDAgMSAxLTYgMCAzIDMgMCAwIDEgNiAwWiIvPjwvc3ZnPg=="
                    alt="Total collection"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total collection</p>
                  <h3 className="text-2xl font-bold">14,000.00</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-pink-100 p-3 rounded-full mr-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlYzQ4OTkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1hY3Rpdml0eSI+PHBhdGggZD0iTTIyIDEyaC00bC0zIDlMOSAzIDYgMTJIMiIvPjwvc3ZnPg=="
                    alt="Total Expenses"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Expenses</p>
                  <h3 className="text-2xl font-bold">0</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div className="h-full bg-pink-500 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmYWNjMTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtZG9sbGFyLXNpZ24iPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTEyIDE3di0xIi8+PHBhdGggZD0iTTEyIDh2LTEiLz48cGF0aCBkPSJNMTUgMTJhMyAzIDAgMSAxLTYgMCAzIDMgMCAwIDEgNiAwWiIvPjwvc3ZnPg=="
                    alt="Total PT Collection"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total PT Collection</p>
                  <h3 className="text-2xl font-bold">8,000.00</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>
          </div>

          {/* Stats Grid - Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlZjQ0NDQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtZG9sbGFyLXNpZ24iPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTEyIDE3di0xIi8+PHBhdGggZD0iTTEyIDh2LTEiLz48cGF0aCBkPSJNMTUgMTJhMyAzIDAgMSAxLTYgMCAzIDMgMCAwIDEgNiAwWiIvPjwvc3ZnPg=="
                    alt="Profit/Loss"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Profit/Loss</p>
                  <h3 className="text-2xl font-bold">14,000.00</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div className="h-full bg-red-500 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0YWRlODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tZXNzYWdlLXNxdWFyZSI+PHBhdGggZD0iTTIxIDEyYzAgMS42Ni0uMzMgMyAyIDQtMS41IDEtMiAuMzMtMiAyIDAgMi0xIDMtMyAzcy0zLTEtMy0zYzAtMS42Ni0uMzMtMyAyLTQgMS41LTEgMi0uMzMgMi0yIDAtMiAxLTMgMy0zczMgMSAzIDNaIi8+PHBhdGggZD0iTTExIDE5Yy0xLjY2IDAtMy0xLjM0LTMtM1Y0YzAtMS42NiAxLjM0LTMgMy0zaDYuNWEyLjUgMi41IDAgMCAxIDIuNSAyLjVWOCIvPjwvc3ZnPg=="
                    alt="Pending Inquiry(s)"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Pending Inquiry(s)</p>
                  <h3 className="text-2xl font-bold">0</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxNGI4YTYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyLWNoZWNrIj48cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MiIvPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ii8+PHBhdGggZD0ibTE2IDExIDIgMiA0LTQiLz48L3N2Zz4="
                    alt="Active clients"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Active clients</p>
                  <h3 className="text-2xl font-bold">103</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 p-3 rounded-full mr-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2YjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyLXgiPjxwYXRoIGQ9Ik0xNiAyMXYtMmE0IDQgMCAwIDAtNC00SDZhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iOSIgY3k9IjciIHI9IjQiLz48bGluZSB4MT0iMTciIHgyPSIyMiIgeTE9IjEzIiB5Mj0iMTgiLz48bGluZSB4MT0iMjIiIHgyPSIxNyIgeTE9IjEzIiB5Mj0iMTgiLz48L3N2Zz4="
                    alt="Expired clients"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Expired clients</p>
                  <h3 className="text-2xl font-bold">14</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div className="h-full bg-gray-500 rounded-full" style={{ width: "20%" }}></div>
              </div>
            </div>
          </div>

          {/* Stats Grid - Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2MzY2ZjEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VycyI+PHBhdGggZD0iTTE3IDIxdi0yYTQgNCAwIDAgMC00LTRIODB2MiIvPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ii8+PHBhdGggZD0iTTIzIDIxdi0yYTQgNCAwIDAgMC0zLTMuODciLz48cGF0aCBkPSJNMTYgMy4xM2E0IDQgMCAwIDEgMCA3Ljc1Ii8+PC9zdmc+"
                    alt="Profile Created clients"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Profile Created clients</p>
                  <h3 className="text-2xl font-bold">8</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-cyan-100 p-3 rounded-full mr-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwNmI2ZDQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jYWxlbmRhciI+PHJlY3QgeD0iMyIgeT0iNCIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIgcnk9IjIiLz48bGluZSB4MT0iMTYiIHgyPSIxNiIgeTE9IjIiIHkyPSI2Ii8+PGxpbmUgeDE9IjgiIHgyPSI4IiB5MT0iMiIgeTI9IjYiLz48bGluZSB4MT0iMyIgeDI9IjIxIiB5MT0iMTAiIHkyPSIxMCIvPjwvc3ZnPg=="
                    alt="Booked PT Sessions"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Booked PT Sessions</p>
                  <h3 className="text-2xl font-bold">1</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: "10%" }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmYjkyM2MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jbG9jayI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cG9seWxpbmUgcG9pbnRzPSIxMiA2IDEyIDEyIDE2IDE0Ii8+PC9zdmc+"
                    alt="Follow-ups"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Follow-ups</p>
                  <h3 className="text-2xl font-bold">9</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VycyI+PHBhdGggZD0iTTE3IDIxdi0yYTQgNCAwIDAgMC00LTRIODB2MiIvPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ii8+PHBhdGggZD0iTTIzIDIxdi0yYTQgNCAwIDAgMC0zLTMuODciLz48cGF0aCBkPSJNMTYgMy4xM2E0IDQgMCAwIDEgMCA3Ljc1Ii8+PC9zdmc+"
                    alt="Today Present Client"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Today Present Client</p>
                  <h3 className="text-2xl font-bold">0</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>
          </div>

          {/* Stats Grid - Fourth Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VycyI+PHBhdGggZD0iTTE3IDIxdi0yYTQgNCAwIDAgMC00LTRIODB2MiIvPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ii8+PHBhdGggZD0iTTIzIDIxdi0yYTQgNCAwIDAgMC0zLTMuODciLz48cGF0aCBkPSJNMTYgMy4xM2E0IDQgMCAwIDEgMCA3Ljc1Ii8+PC9zdmc+"
                    alt="Booked Group Class"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Booked Group Class</p>
                  <h3 className="text-2xl font-bold">0</h3>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>
          </div>

          {/* After the stat cards, add the graphs section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Revenue Overview */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8b5cf6"
                      fill="#c4b5fd"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Membership Status */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Membership Status</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={membershipData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="active" fill="#4ade80" />
                    <Bar dataKey="expired" fill="#f43f5e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weekly Attendance */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Weekly Attendance</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      dot={{ fill: '#0ea5e9', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Action Buttons - First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center hover:from-pink-600 hover:to-pink-700 transition-colors">
              <div className="text-3xl mb-2">+</div>
              <div>Create Inquiry</div>
            </button>

            <button
              onClick={() => navigate('/create-client')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center hover:from-purple-600 hover:to-purple-700 transition-colors"
            >
              <div className="text-3xl mb-2">👤+</div>
              <div>Create Client</div>
            </button>

            <button
              onClick={() => setShowFollowUp(true)}
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-colors"
            >
              <div className="text-3xl mb-2">💬</div>
              <div>Create Client Follow-up</div>
            </button>

            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-colors">
              <div className="text-3xl mb-2">$</div>
              <div>Create POS Bill</div>
            </button>
          </div>

          {/* Action Buttons - Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center hover:from-cyan-500 hover:to-cyan-600 transition-colors">
              <div className="text-3xl mb-2">📅</div>
              <div>Create Booking</div>
            </button>

            <button className="bg-gradient-to-r from-pink-400 to-pink-500 text-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center hover:from-pink-500 hover:to-pink-600 transition-colors">
              <div className="text-3xl mb-2">❤️</div>
              <div>Add Workout plan</div>
            </button>

            <button className="bg-gradient-to-r from-indigo-400 to-indigo-500 text-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center hover:from-indigo-500 hover:to-indigo-600 transition-colors">
              <div className="text-3xl mb-2">🔗</div>
              <div>Add diet plan</div>
            </button>

            <button
              onClick={() => navigate('/bulk-sms')}
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-colors"
            >
              <div className="text-3xl mb-2">✈️</div>
              <div>Send bulk SMS</div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white p-2 text-xs text-gray-500">© Easy Gym Software 2025</div>
    </div>
  )
}

export default Dashboard

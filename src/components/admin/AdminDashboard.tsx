import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Users, Bus as BusIcon, CreditCard, MessageSquare } from 'lucide-react';
import { BusManagement } from './BusManagement';
import { UserManagement } from './UserManagement';
import { BookingManagement } from './BookingManagement';
import { RecentBookings } from './RecentBookings';
import { RecentFeedbacks } from './RecentFeedbacks';

export function AdminDashboard() {
  const admin = useAdminStore((state) => state.admin);
  const [activeTab, setActiveTab] = useState<'overview' | 'buses' | 'users' | 'bookings'>('overview');

  if (!admin) return null;

  const stats = [
    { name: 'Total Users', value: '127', icon: Users },
    { name: 'Active Buses', value: '200', icon: BusIcon },
    { name: 'Monthly Revenue', value: '₹1.2L', icon: CreditCard },
    { name: 'User Feedback', value: '4.3/5', icon: MessageSquare },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {admin.name}</h1>
        <p className="text-gray-600">Manage your bus booking system</p>
      </div>

      <div className="mb-8">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'overview'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('buses')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'buses'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Manage Buses
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'users'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'bookings'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Bookings
          </button>
        </nav>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentBookings />
            <RecentFeedbacks />
          </div>
        </>
      )}

      {activeTab === 'buses' && (
        <div className="bg-white rounded-lg shadow p-6">
          <BusManagement />
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow p-6">
          <UserManagement />
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="bg-white rounded-lg shadow p-6">
          <BookingManagement />
        </div>
      )}
    </div>
  );
}
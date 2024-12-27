import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

export function RecentBookings() {
  const recentBookings = [
    {
      id: 'BK001',
      userName: 'Praveen',
      from: 'Chennai',
      to: 'Coimbatore',
      date: '2024-03-20',
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: 'BK002',
      userName: 'Sathish',
      from: 'Madurai',
      to: 'Salem',
      date: '2024-03-25',
      time: '2:30 PM',
      status: 'confirmed',
    },
    {
      id: 'BK003',
      userName: 'Bala',
      from: 'Chennai',
      to: 'Madurai',
      date: '2024-03-28',
      time: '10:00 PM',
      status: 'pending',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
      <div className="space-y-4">
        {recentBookings.map((booking) => (
          <div
            key={booking.id}
            className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{booking.userName}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {booking.from} → {booking.to}
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {booking.status}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {booking.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {booking.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
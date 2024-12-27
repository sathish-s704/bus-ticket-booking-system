import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

export function BookingHistory() {
  // Updated mock data with Tamil Nadu cities
  const bookings = [
    {
      id: '1',
      from: 'Chennai',
      to: 'Coimbatore',
      date: '2024-03-20',
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: '2',
      from: 'Madurai',
      to: 'Salem',
      date: '2024-03-25',
      time: '2:30 PM',
      status: 'pending',
    },
    {
      id: '3',
      from: 'Chennai',
      to: 'Madurai',
      date: '2024-03-28',
      time: '10:00 PM',
      status: 'confirmed',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Recent Bookings</h2>
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <p className="font-medium">
                      {booking.from} → {booking.to}
                    </p>
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
      ) : (
        <div className="text-center text-gray-500 py-8">
          No booking history available
        </div>
      )}
    </div>
  );
}
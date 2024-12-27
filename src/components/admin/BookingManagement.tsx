import React, { useState } from 'react';
import { Calendar, Clock, IndianRupee, User, MapPin } from 'lucide-react';

interface Booking {
  id: string;
  userId: string;
  userName: string;
  busName: string;
  from: string;
  to: string;
  date: string;
  time: string;
  amount: number;
  status: 'confirmed' | 'cancelled';
}

export function BookingManagement() {
  // Mock booking data
  const [bookings] = useState<Booking[]>([
    {
      id: 'BK001',
      userId: '1',
      userName: 'Praveen',
      busName: 'Tamil Nadu Express',
      from: 'Chennai',
      to: 'Coimbatore',
      date: '2024-03-20',
      time: '10:00 AM',
      amount: 800,
      status: 'confirmed',
    },
    {
      id: 'BK002',
      userId: '2',
      userName: 'Sathish',
      busName: 'Madurai Special',
      from: 'Madurai',
      to: 'Salem',
      date: '2024-03-25',
      time: '2:30 PM',
      amount: 650,
      status: 'cancelled',
    },
    {
      id: 'BK003',
      userId: '3',
      userName: 'Priya',
      busName: 'Kanyakumari Express',
      from: 'Kanyakumari',
      to: 'Trichy',
      date: '2024-04-01',
      time: '6:45 AM',
      amount: 1200,
      status: 'confirmed',
    },
    {
      id: 'BK004',
      userId: '4',
      userName: 'Arun',
      busName: 'Super Deluxe',
      from: 'Hosur',
      to: 'Chennai',
      date: '2024-04-10',
      time: '8:00 AM',
      amount: 500,
      status: 'confirmed',
    },
    {
      id: 'BK005',
      userId: '5',
      userName: 'Deepika',
      busName: 'Pondicherry Special',
      from: 'Chennai',
      to: 'Pondicherry',
      date: '2024-05-05',
      time: '3:00 PM',
      amount: 300,
      status: 'pending',
    },
    {
      id: 'BK006',
      userId: '6',
      userName: 'Karthik',
      busName: 'Chill Express',
      from: 'Dindugal',
      to: 'Chennai',
      date: '2024-05-15',
      time: '9:00 PM',
      amount: 1500,
      status: 'cancelled',
    },
    {
      id: 'BK007',
      userId: '7',
      userName: 'Aishwarya',
      busName: 'Expressway Sleeper',
      from: 'Trichy',
      to: 'Coimbatore',
      date: '2024-05-25',
      time: '11:00 PM',
      amount: 800,
      status: 'confirmed',
    },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Booking Management</h2>
      
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white border rounded-lg p-4 hover:border-indigo-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">Booking #{booking.id}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    {booking.userName}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {booking.from} → {booking.to}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {booking.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {booking.time}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-lg font-semibold text-indigo-600">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  {booking.amount}
                </div>
                <div className="mt-2 text-sm text-gray-500">{booking.busName}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
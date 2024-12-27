import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { BusSearch } from './BusSearch';
import { UserProfile } from './UserProfile';
import { BookingHistory } from './BookingHistory';

export function UserDashboard() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <BusSearch />
          <BookingHistory />
        </div>
        <div className="md:col-span-1">
          <UserProfile user={user} />
        </div>
      </div>
    </div>
  );
}
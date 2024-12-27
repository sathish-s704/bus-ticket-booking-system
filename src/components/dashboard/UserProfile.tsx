import React from 'react';
import { User } from '../../types';
import { User as UserIcon, Phone, Mail, Calendar } from 'lucide-react';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <UserIcon className="w-5 h-5 text-gray-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">Praveen</p>
          </div>
        </div>
        <div className="flex items-center">
          <Mail className="w-5 h-5 text-gray-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Phone className="w-5 h-5 text-gray-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">9876543210</p>
          </div>
        </div>
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-gray-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Age</p>
            <p className="font-medium">20 years</p>
          </div>
        </div>
      </div>
    </div>
  );
}
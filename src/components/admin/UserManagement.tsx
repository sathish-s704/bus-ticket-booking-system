import React, { useState } from 'react';
import { User, Trash2, Mail, Phone } from 'lucide-react';
import { User as UserType } from '../../types';

export function UserManagement() {
  // Mock user data
  const [users, setUsers] = useState<UserType[]>([
    {
      id: '1',
      name: 'Praveen',
      email: 'pk@gmail.com',
      phone: '9876543210',
      age: 20,
      gender: 'male',
    },
    {
      id: '2',
      name: 'Sathish',
      email: 'sathish@gmail.com',
      phone: '9876543211',
      age: 20,
      gender: 'male',
    },
    {
      id: '3',
      name: 'Priya',
      email: 'jane@example.com',
      phone: '9527749542',
      age: 25,
      gender: 'female',
    },
    {
      id: '4',
      name: 'Arun Kumar',
      email: 'arun.kumar@example.com',
      phone: '9876543222',
      age: 30,
      gender: 'male',
    },
    {
      id: '5',
      name: 'Meenakshi',
      email: 'meenakshi@example.com',
      phone: '9876543223',
      age: 28,
      gender: 'female',
    },
    {
      id: '6',
      name: 'Karthik',
      email: 'karthik@example.com',
      phone: '9876543224',
      age: 32,
      gender: 'male',
    },
    {
      id: '7',
      name: 'Vijayalakshmi',
      email: 'vijayalakshmi@example.com',
      phone: '9876543225',
      age: 35,
      gender: 'female',
    },
    {
      id: '8',
      name: 'Ramesh',
      email: 'ramesh@example.com',
      phone: '9876543226',
      age: 29,
      gender: 'male',
    },
    {
      id: '9',
      name: 'Divya',
      email: 'divya@example.com',
      phone: '9876543227',
      age: 24,
      gender: 'female',
    },
    {
      id: '10',
      name: 'Ganesh',
      email: 'ganesh@example.com',
      phone: '9876543228',
      age: 27,
      gender: 'male',
    },
    {
      id: '11',
      name: 'Nandhini',
      email: 'nandhini@example.com',
      phone: '9876543229',
      age: 22,
      gender: 'female',
    },
    {
      id: '12',
      name: 'Surya',
      email: 'surya@example.com',
      phone: '9876543230',
      age: 26,
      gender: 'male',
    },
    {
      id: '13',
      name: 'Lakshmi',
      email: 'lakshmi@example.com',
      phone: '9876543231',
      age: 34,
      gender: 'female',
    },
    {
      id: '14',
      name: 'Kavitha',
      email: 'kavitha@example.com',
      phone: '9876543232',
      age: 29,
      gender: 'female',
    },
    {
      id: '15',
      name: 'Dinesh',
      email: 'dinesh@example.com',
      phone: '9876543233',
      age: 33,
      gender: 'male',
    },
    {
      id: '16',
      name: 'Anitha',
      email: 'anitha@example.com',
      phone: '9876543234',
      age: 25,
      gender: 'female',
    },
    {
      id: '17',
      name: 'Murugan',
      email: 'murugan@example.com',
      phone: '9876543235',
      age: 28,
      gender: 'male',
    },
    {
      id: '18',
      name: 'Ramya',
      email: 'ramya@example.com',
      phone: '9876543236',
      age: 31,
      gender: 'female',
    },
    {
      id: '19',
      name: 'Sivakumar',
      email: 'sivakumar@example.com',
      phone: '9876543237',
      age: 36,
      gender: 'male',
    },
    {
      id: '20',
      name: 'Padmavathi',
      email: 'padmavathi@example.com',
      phone: '9876543238',
      age: 27,
      gender: 'female',
    },
    {
      id: '21',
      name: 'Manoj',
      email: 'manoj@example.com',
      phone: '9876543239',
      age: 29,
      gender: 'male',
    },
    {
      id: '22',
      name: 'Priyanka',
      email: 'priyanka@example.com',
      phone: '9876543240',
      age: 30,
      gender: 'female',
    }
  ]);
  

  const handleDeleteUser = (userId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    // Update the users state to exclude the deleted user
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    console.log('User deleted:', userId);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>
      
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white border rounded-lg p-4 hover:border-indigo-500 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <User className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user.name}</h3>
                  <div className="mt-1 text-sm text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {user.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {user.phone}
                    </div>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Age: {user.age} | Gender: {user.gender}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

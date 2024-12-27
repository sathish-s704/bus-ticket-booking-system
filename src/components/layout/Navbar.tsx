import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAdminStore } from '../../store/adminStore';

export function Navbar() {
  const { isAuthenticated: isUserAuthenticated, logout: userLogout } = useAuthStore();
  const { isAuthenticated: isAdminAuthenticated, logout: adminLogout } = useAdminStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Bus className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BusBooking</span>
            </Link>
          </div>

          <div className="flex items-center">
            {isAdminAuthenticated ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={() => adminLogout()}
                  className="ml-4 flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : isUserAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => userLogout()}
                  className="ml-4 flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/admin/signin"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Admin Sign In
                </Link>
                <Link
                  to="/signup"
                  className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
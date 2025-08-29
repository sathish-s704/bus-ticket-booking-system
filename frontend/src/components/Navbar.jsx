import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { Bus, User, LogOut, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" data-aos="fade-down">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
            <Bus className="w-8 h-8" />
            <span>TN Bus Booking</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/buses" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('navigation.buses')}
            </Link>
            
            {user && role === "admin" && (
              <Link to="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('navigation.adminDashboard')}
              </Link>
            )}
            
            {user && role === "user" && (
              <Link to="/my-bookings" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('navigation.myBookings')}
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {user ? (
              <button 
                onClick={handleLogout} 
                className="btn btn-secondary flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>{t('navigation.logout')}</span>
              </button>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="btn btn-secondary flex items-center space-x-2"
                >
                  <LogIn className="w-5 h-5" />
                  <span>{t('navigation.login')}</span>
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>{t('navigation.register')}</span>
                </Link>
              </div>
            )}
            <button className="md:hidden text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

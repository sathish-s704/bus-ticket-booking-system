import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Calendar, Bus, Shield, Clock, Phone } from 'lucide-react';

const Home = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  // List of available cities (can be expanded)
  const cities = [
    "Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Vellore", "Erode", "Tirunelveli", "Tiruppur", "Thoothukudi", "Dindigul", "Thanjavur", "Nagercoil", "Kanchipuram", "Karur", "Namakkal", "Cuddalore", "Kumbakonam", "Hosur", "Ambur"
  ];
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from || !to || !date) {
      alert("Please enter all fields");
      return;
    }
    // Navigate to buses page with query params
    navigate(`/buses?from=${from}&to=${to}&date=${date}`);
  };

  const popularRoutes = [
    { from: "Chennai", to: "Coimbatore" },
    { from: "Madurai", to: "Chennai" },
    { from: "Salem", to: "Bangalore" },
    { from: "Trichy", to: "Chennai" },
    { from: "Vellore", to: "Chennai" },
    { from: "Erode", to: "Coimbatore" }
  ];

  const features = [
    {
      icon: <Bus className="w-8 h-8 text-blue-600" />,
      title: t('home.easyBooking'),
      description: "Book your tickets in just a few clicks"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: t('home.securePayment'),
      description: "100% secure payment with Razorpay"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: t('home.instantConfirmation'),
      description: "Get instant booking confirmation"
    },
    {
      icon: <Phone className="w-8 h-8 text-orange-600" />,
      title: t('home.customerSupport'),
      description: "24/7 customer support available"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('home.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            
            {/* Search Form */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      required
                    >
                      <option value="" disabled>{t('home.from')}</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      required
                    >
                      <option value="" disabled>{t('home.to')}</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>{t('home.search')}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('home.popularRoutes')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularRoutes.map((route, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => {
                  setFrom(route.from);
                  setTo(route.to);
                }}
              >
                <div className="text-sm font-medium text-gray-900">{route.from}</div>
                <div className="text-xs text-gray-500 mt-1">→</div>
                <div className="text-sm font-medium text-gray-900">{route.to}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('home.features')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Book Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who trust us for their travel needs
          </p>
          <button
            onClick={() => navigate('/buses')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {t('home.searchBuses')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

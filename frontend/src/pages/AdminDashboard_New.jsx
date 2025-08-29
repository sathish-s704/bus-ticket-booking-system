// JSON placeholder for import textarea
const busJsonPlaceholder = '{ "busNumber": "TN03EF9012", "route": { "from": "Erode", "to": "Chennai" }, "departureTime": "20:00", "arrivalTime": "05:00", "totalSeats": 42, "availableSeats": 42, "price": { "regular": 780, "premium": 980 }, "busType": "Sleeper", "amenities": ["WiFi", "Charging Point", "Blanket"], "operator": { "name": "Parveen Travels", "contact": "+91-9876543212" } }';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { user, role, getToken, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalIncome: 0,
    totalBuses: 0
  });
  const [users, setUsers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [jsonData, setJsonData] = useState('');

  // Check admin access
  if (role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">⛔ Access Denied</h2>
          <p className="text-gray-600">Admins Only</p>
        </div>
      </div>
    );
  }

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = getToken();
      
      // Fetch all data

      const [usersRes, busesRes, bookingsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => ({ data: [] })),
        axios.get('http://localhost:5000/api/buses').catch(() => ({ data: {} })),
        axios.get('http://localhost:5000/api/bookings/all', {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => ({ data: [] }))
      ]);

      const usersData = Array.isArray(usersRes.data) ? usersRes.data : [];
      const busesData = Array.isArray(busesRes.data?.buses) ? busesRes.data.buses : [];
      const bookingsData = Array.isArray(bookingsRes.data) ? bookingsRes.data : [];

      setUsers(usersData);
      setBuses(busesData);
      setBookings(bookingsData);

      // Calculate stats
      const totalIncome = bookingsData.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
      setStats({
        totalUsers: usersData.length,
        totalBookings: bookingsData.length,
        totalIncome: totalIncome,
        totalBuses: busesData.length
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // CRUD Operations
  const handleDelete = async (type, id) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    try {
      const token = getToken();
      let endpoint = '';
      if (type === 'user') endpoint = `http://localhost:5000/api/auth/users/${id}`;
      else if (type === 'bus') endpoint = `http://localhost:5000/api/buses/${id}`;
      else if (type === 'booking') endpoint = `http://localhost:5000/api/bookings/${id}`;
      
      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      fetchDashboardData();
      alert(`${type} deleted successfully`);
    } catch (error) {
      alert(`Error deleting ${type}: ${error.response?.data?.message || error.message}`);
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    
    if (type === 'bus' && item) {
      // Transform bus data for editing
      setFormData({
        ...item,
        from: item.route?.from || item.from || '',
        to: item.route?.to || item.to || '',
        regularPrice: item.price?.regular || item.price || '',
        premiumPrice: item.price?.premium || '',
        operatorName: item.operator?.name || '',
        operatorContact: item.operator?.contact || '',
        amenities: item.amenities ? item.amenities.join(', ') : ''
      });
    } else {
      setFormData(item || {});
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      let endpoint = '';
      let method = selectedItem ? 'PUT' : 'POST';
      let submissionData = { ...formData };
      
      if (modalType === 'user') {
        endpoint = selectedItem 
          ? `http://localhost:5000/api/auth/users/${selectedItem._id}`
          : 'http://localhost:5000/api/auth/register';
      } else if (modalType === 'bus') {
        endpoint = selectedItem
          ? `http://localhost:5000/api/buses/${selectedItem._id}`
          : 'http://localhost:5000/api/buses';
        
        // Transform form data for bus creation
        submissionData = {
          busNumber: formData.busNumber || '',
          route: {
            from: formData.from || '',
            to: formData.to || ''
          },
          departureTime: formData.departureTime || '00:00',
          arrivalTime: formData.arrivalTime || '00:00',
          totalSeats: parseInt(formData.totalSeats) || 42,
          availableSeats: parseInt(formData.availableSeats) || parseInt(formData.totalSeats) || 42,
          price: {
            regular: parseInt(formData.regularPrice) || 0,
            premium: parseInt(formData.premiumPrice) || 0
          },
          busType: formData.busType || 'Regular',
          amenities: formData.amenities ? formData.amenities.split(',').map(a => a.trim()) : [],
          operator: {
            name: formData.operatorName || '',
            contact: formData.operatorContact || ''
          },
          isActive: formData.isActive !== false
        };
      }

      await axios({
        method,
        url: endpoint,
        data: submissionData,
        headers: { Authorization: `Bearer ${token}` }
      });

      setModalOpen(false);
      fetchDashboardData();
      alert(`${modalType} ${selectedItem ? 'updated' : 'created'} successfully`);
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  // JSON Import functionality
  const handleJsonImport = async () => {
    try {
      const token = getToken();
      let busData;
      
      try {
        busData = JSON.parse(jsonData);
      } catch (error) {
        alert('Invalid JSON format. Please check your data.');
        return;
      }
      
      // Handle both single bus object and array of buses
      const busesToImport = Array.isArray(busData) ? busData : [busData];
      
      for (const bus of busesToImport) {
        try {
          await axios.post('http://localhost:5000/api/buses/add', bus, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (err) {
          console.error('Failed to import bus:', bus, err);
          alert(`Failed to import bus: ${bus.busNumber || ''} - ${err.response?.data?.message || err.message}`);
        }
      }
      
      setImportModalOpen(false);
      setJsonData('');
      fetchDashboardData();
      alert(`Successfully imported ${busesToImport.length} bus(es)`);
    } catch (error) {
      console.error('Import failed:', error);
      alert(`Import failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-green-600">{stats.totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎫</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Income</p>
                    <p className="text-3xl font-bold text-yellow-600">₹{stats.totalIncome.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Buses</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.totalBuses}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚌</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-600">Chart visualization coming soon!</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Income Summary</h3>
                  <button
                    onClick={() => alert('PDF Report coming soon!')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    📄 Download PDF
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">₹{stats.totalIncome}</p>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{stats.totalBookings}</p>
                    <p className="text-sm text-gray-600">Total Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">₹{stats.totalBookings > 0 ? Math.round(stats.totalIncome / stats.totalBookings) : 0}</p>
                    <p className="text-sm text-gray-600">Avg. Order Value</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">+0.0%</p>
                    <p className="text-sm text-gray-600">Growth</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Recent Bookings</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(bookings) && bookings.length > 0 ? bookings.slice(0, 5).map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking._id?.substring(0, 8) || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.userEmail || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.busRoute || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{booking.totalAmount || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                          No recent bookings found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">User Management</h3>
                <button
                  onClick={() => openModal('user')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add User
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.isArray(users) && users.length > 0 ? users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role || 'user'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openModal('user', user)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete('user', user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'buses':
        return (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Bus Management</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setImportModalOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    📥 Import JSON
                  </button>
                  <button
                    onClick={() => openModal('bus')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add Bus
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bus Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.isArray(buses) && buses.length > 0 ? buses.map((bus) => (
                    <tr key={bus._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {bus.busNumber || bus.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {bus.route?.from || bus.from} → {bus.route?.to || bus.to}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {bus.busType || 'Regular'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {bus.availableSeats || 0}/{bus.totalSeats || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{bus.price?.regular || bus.price || 0}
                        {bus.price?.premium && (
                          <span className="text-purple-600"> | ₹{bus.price.premium}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openModal('bus', bus)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete('bus', bus._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No buses found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Booking Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.isArray(bookings) && bookings.length > 0 ? bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking._id?.substring(0, 8) || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.userEmail || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{booking.totalAmount || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete('booking', booking._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-blue-600">🚍 Admin Panel</h2>
            <p className="text-sm text-gray-600 mt-1">Welcome, {user?.email}</p>
          </div>
          
          <nav className="mt-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-6 py-3 flex items-center space-x-3 hover:bg-blue-50 ${
                activeTab === 'dashboard' ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span>📊</span>
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full text-left px-6 py-3 flex items-center space-x-3 hover:bg-blue-50 ${
                activeTab === 'users' ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span>👥</span>
              <span>Users</span>
            </button>

            <button
              onClick={() => setActiveTab('buses')}
              className={`w-full text-left px-6 py-3 flex items-center space-x-3 hover:bg-blue-50 ${
                activeTab === 'buses' ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span>🚌</span>
              <span>Buses</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full text-left px-6 py-3 flex items-center space-x-3 hover:bg-blue-50 ${
                activeTab === 'bookings' ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span>🎫</span>
              <span>Bookings</span>
            </button>

            <button
              onClick={logout}
              className="w-full text-left px-6 py-3 flex items-center space-x-3 hover:bg-red-50 text-red-600 mt-auto"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeTab}</h1>
            <p className="text-gray-600 mt-1">Manage your {activeTab} efficiently</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>

      {/* Bus Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {selectedItem ? 'Edit' : 'Add'} {modalType}
            </h3>
            <form onSubmit={handleSubmit}>
              {modalType === 'user' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  {!selectedItem && (
                    <div className="mb-4">
                    </div>
                  )}
                </>
              )}
              
              {modalType === 'bus' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bus Number *</label>
                    <input
                      type="text"
                      value={formData.busNumber || ''}
                      onChange={(e) => setFormData({...formData, busNumber: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  
                      value={formData.busType || 'Regular'}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bus Type</label>
                    <select
                      value={formData.busType || 'Regular'}
                      onChange={(e) => setFormData({...formData, busType: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="Regular">Regular</option>
                      <option value="AC">AC</option>
                      <option value="Sleeper">Sleeper</option>
                      <option value="Semi-Sleeper">Semi-Sleeper</option>
                      <option value="Volvo">Volvo</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">From *</label>
                    <input
                      type="text"
                      value={formData.from || ''}
                      onChange={(e) => setFormData({...formData, from: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                      />
                  
      {/* JSON Import Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold mb-4">Import Bus Data (JSON)</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paste your JSON data below (single bus object or array of buses):
              </label>
              <textarea
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                className="w-full h-64 border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                placeholder={busJsonPlaceholder}
              />
              <div className="mt-2">
                <input
                  type="file"
                  accept="application/json"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const text = await file.text();
                      setJsonData(text);
                    }
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <span className="text-xs text-gray-500">Or select a JSON file from your computer</span>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleJsonImport}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                disabled={!jsonData.trim()}
              >
                Import Buses
              </button>
            </div>
          </div>
        </div>
      )}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">To *</label>
                    <input
                      type="text"
                      value={formData.to || ''}
                      onChange={(e) => setFormData({...formData, to: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Departure Time</label>
                    <input
                      type="time"
                      value={formData.departureTime || ''}
                      onChange={(e) => setFormData({...formData, departureTime: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Arrival Time</label>
                    <input
                      type="time"
                      value={formData.arrivalTime || ''}
                      onChange={(e) => setFormData({...formData, arrivalTime: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Seats</label>
                    <input
                      type="number"
                      value={formData.totalSeats || ''}
                      onChange={(e) => setFormData({...formData, totalSeats: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      min="1"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Seats</label>
                    <input
                      type="number"
                      value={formData.availableSeats || ''}
                      onChange={(e) => setFormData({...formData, availableSeats: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      min="0"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Regular Price *</label>
                    <input
                      type="number"
                      value={formData.regularPrice || ''}
                      onChange={(e) => setFormData({...formData, regularPrice: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                      min="0"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Premium Price</label>
                    <input
                      type="number"
                      value={formData.premiumPrice || ''}
                      onChange={(e) => setFormData({...formData, premiumPrice: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      min="0"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Operator Name</label>
                    <input
                      type="text"
                      value={formData.operatorName || ''}
                      onChange={(e) => setFormData({...formData, operatorName: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Operator Contact</label>
                    <input
                      type="text"
                      value={formData.operatorContact || ''}
                      onChange={(e) => setFormData({...formData, operatorContact: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div className="mb-4 col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amenities (comma separated)</label>
                    <input
                      type="text"
                      value={formData.amenities || ''}
                      onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="WiFi, AC, Charging Point, Blanket"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

  // ...existing code...
    </div>
  );
};

export default AdminDashboard;

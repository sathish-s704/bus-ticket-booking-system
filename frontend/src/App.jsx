import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from './pages/AdminDashboard_New';
import UserDashboard from "./pages/UserDashboard";
import MyBookings from "./pages/MyBookings";
import Buses from "./pages/Buses";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';
import BookingPage from "./pages/BookingPage";
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/buses" element={<Buses />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:busId"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      </Router>
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { SignUpForm } from './components/auth/SignUpForm';
import { SignInForm } from './components/auth/SignInForm';
import { AdminSignInForm } from './components/auth/AdminSignInForm';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FeedbackForm } from './components/feedback/FeedbackForm';
import { useAuthStore } from './store/authStore';
import { useAdminStore } from './store/adminStore';

function PrivateRoute({ children, isAdmin = false }: { children: React.ReactNode, isAdmin?: boolean }) {
  const isUserAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAdminAuthenticated = useAdminStore((state) => state.isAuthenticated);

  if (isAdmin) {
    return isAdminAuthenticated ? <>{children}</> : <Navigate to="/admin/signin" />;
  }
  return isUserAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/admin/signin" element={<AdminSignInForm />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute isAdmin>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <PrivateRoute>
                <div className="container mx-auto px-4 py-8">
                  <FeedbackForm 
                    bookingId={location.state?.bookingId} 
                    userId={location.state?.userId}
                  />
                </div>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
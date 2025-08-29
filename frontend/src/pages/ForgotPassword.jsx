import React, { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);
  return error ? (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-700">Something went wrong</h2>
        <div className="mb-4 text-red-600">{error.toString()}</div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={() => window.location.reload()}>Reload</button>
      </div>
    </div>
  ) : (
    <React.Fragment>
      {React.Children.map(children, child =>
        React.cloneElement(child, { setError })
      )}
    </React.Fragment>
  );
}

const ForgotPassword = (props) => {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // Wrap all async handlers in try/catch and never reload
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert("");
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setStep(2);
      setAlert("OTP sent to your email.");
    } catch (err) {
      setAlert(err.response?.data?.message || "Failed to send OTP");
      if (props.setError) props.setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert("");
    try {
      const otpValue = Array.isArray(otp) ? otp.join("") : otp;
      await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp: otpValue });
      setStep(3);
      setAlert("");
    } catch (err) {
      setAlert(err.response?.data?.message || "Invalid OTP");
      if (props.setError) props.setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert("");
    if (!newPassword || !confirmPassword) {
      setAlert("Please fill in both password fields.");
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setAlert("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", { email, otp: Array.isArray(otp) ? otp.join("") : otp, newPassword });
      setAlert("Password reset successful. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setAlert(err.response?.data?.message || "Failed to reset password");
      if (props.setError) props.setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        {alert && (
          <div className={`mb-4 text-center px-4 py-2 rounded-lg ${alert.toLowerCase().includes('success') ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
            {alert}
          </div>
        )}
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleVerifyOtp({
              preventDefault: () => {},
              target: { value: otp.join("") }
            });
          }}>
            <label className="block mb-2">Enter OTP</label>
            <div className="flex space-x-2 justify-center mb-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={otpRefs[idx]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-10 h-12 text-center border border-gray-300 rounded-lg text-xl font-mono focus:ring-2 focus:ring-blue-500"
                  value={digit}
                  onChange={e => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    let newOtp = [...otp];
                    newOtp[idx] = val;
                    setOtp(newOtp);
                    if (val && idx < 5) {
                      otpRefs[idx + 1].current.focus();
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
                      otpRefs[idx - 1].current.focus();
                    }
                  }}
                  required
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              disabled={loading || otp.some(d => !d)}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <label className="block mb-2">New Password</label>
            <div className="relative mb-4">
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowNewPassword((v) => !v)}
                tabIndex={-1}
              >
                {showNewPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            <label className="block mb-2">Confirm Password</label>
            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default function ForgotPasswordWithBoundary() {
  return (
    <ErrorBoundary>
      <ForgotPassword />
    </ErrorBoundary>
  );
}

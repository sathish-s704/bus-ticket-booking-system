import React from 'react';
import { Check, Download } from 'lucide-react';
import { generateTicketPDF } from '../../utils/pdfGenerator';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface PaymentSuccessProps {
  onClose: () => void;
  bookingDetails: {
    bookingId: string;
    amount: number;
    bus: {
      name: string;
      from: string;
      to: string;
      departureTime: string;
    };
    seats: string[];
  };
}

export function PaymentSuccess({ onClose, bookingDetails }: PaymentSuccessProps) {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);

  const handleDownloadTicket = () => {
    generateTicketPDF(bookingDetails);
  };

  const handleFeedback = () => {
    if (user) {
      navigate('/feedback', { 
        state: { 
          bookingId: bookingDetails.bookingId,
          userId: user.id 
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Your booking has been confirmed. Booking ID: {bookingDetails.bookingId}
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Bus</span>
              <span className="font-medium">{bookingDetails.bus.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Route</span>
              <span className="font-medium">
                {bookingDetails.bus.from} → {bookingDetails.bus.to}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Departure</span>
              <span className="font-medium">{bookingDetails.bus.departureTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Seats</span>
              <span className="font-medium">{bookingDetails.seats.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-medium text-green-600">₹{bookingDetails.amount}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleDownloadTicket}
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Ticket
          </button>
          <button
            onClick={handleFeedback}
            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
          >
            Share Your Feedback
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
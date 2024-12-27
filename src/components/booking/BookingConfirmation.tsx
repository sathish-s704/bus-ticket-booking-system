import React, { useState } from 'react';
import { Bus } from '../../types';
import { Calendar, Clock, IndianRupee } from 'lucide-react';
import { PaymentForm } from '../payment/PaymentForm';
import { PaymentSuccess } from '../payment/PaymentSuccess';

interface BookingConfirmationProps {
  bus: Bus;
  selectedSeats: string[];
  onClose: () => void;
}

export function BookingConfirmation({ bus, selectedSeats, onClose }: BookingConfirmationProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const totalAmount = selectedSeats.length * bus.price;

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    onClose();
  };

  if (showSuccess) {
    return (
      <PaymentSuccess
        onClose={handleClose}
        bookingDetails={{
          bookingId: Math.random().toString(36).substr(2, 9).toUpperCase(),
          amount: totalAmount,
          bus: {
            name: bus.name,
            from: bus.from,
            to: bus.to,
            departureTime: bus.departureTime,
          },
          seats: selectedSeats,
        }}
      />
    );
  }

  if (showPayment) {
    return (
      <PaymentForm
        amount={totalAmount}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-semibold mb-4">Confirm Booking</h2>
        
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-2">{bus.name}</h3>
            <div className="text-sm text-gray-500">
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {bus.departureTime} - {bus.arrivalTime}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {bus.from} → {bus.to}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Selected Seats</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map(seat => (
                <span
                  key={seat}
                  className="px-2 py-1 bg-gray-100 rounded text-sm"
                >
                  {seat}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount</span>
              <div className="flex items-center text-indigo-600">
                <IndianRupee className="w-4 h-4 mr-1" />
                {totalAmount}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowPayment(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
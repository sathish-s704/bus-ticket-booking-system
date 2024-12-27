import React, { useState } from 'react';
import { Bus } from '../../types';

interface SeatSelectionProps {
  bus: Bus;
  onClose: () => void;
  onConfirm: (selectedSeats: string[]) => void;
}

export function SeatSelection({ bus, onClose, onConfirm }: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const generateSeats = (type: 'ladies' | 'seniorCitizen' | 'general', count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${type}-${i + 1}`,
      number: i + 1,
      type,
      available: true
    }));
  };

  const seats = {
    ladies: generateSeats('ladies', bus.availableSeats.ladies),
    seniorCitizen: generateSeats('seniorCitizen', bus.availableSeats.seniorCitizen),
    general: generateSeats('general', bus.availableSeats.general)
  };

  const toggleSeat = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-semibold mb-4">Select Seats</h2>
        
        <div className="space-y-6 mb-6">
          {/* Ladies Section */}
          <div>
            <h3 className="text-lg font-medium text-pink-600 mb-2">Ladies Seats</h3>
            <div className="grid grid-cols-5 gap-2">
              {seats.ladies.map(seat => (
                <button
                  key={seat.id}
                  onClick={() => toggleSeat(seat.id)}
                  className={`p-2 rounded ${
                    selectedSeats.includes(seat.id)
                      ? 'bg-pink-600 text-white'
                      : 'bg-pink-100 hover:bg-pink-200'
                  }`}
                >
                  {seat.number}
                </button>
              ))}
            </div>
          </div>

          {/* Senior Citizen Section */}
          <div>
            <h3 className="text-lg font-medium text-purple-600 mb-2">Senior Citizen Seats</h3>
            <div className="grid grid-cols-5 gap-2">
              {seats.seniorCitizen.map(seat => (
                <button
                  key={seat.id}
                  onClick={() => toggleSeat(seat.id)}
                  className={`p-2 rounded ${
                    selectedSeats.includes(seat.id)
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 hover:bg-purple-200'
                  }`}
                >
                  {seat.number}
                </button>
              ))}
            </div>
          </div>

          {/* General Section */}
          <div>
            <h3 className="text-lg font-medium text-blue-600 mb-2">General Seats</h3>
            <div className="grid grid-cols-5 gap-2">
              {seats.general.map(seat => (
                <button
                  key={seat.id}
                  onClick={() => toggleSeat(seat.id)}
                  className={`p-2 rounded ${
                    selectedSeats.includes(seat.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 hover:bg-blue-200'
                  }`}
                >
                  {seat.number}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            Selected seats: {selectedSeats.length}
          </div>
          <div className="space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(selectedSeats)}
              disabled={selectedSeats.length === 0}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
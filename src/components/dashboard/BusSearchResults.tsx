import React, { useState } from 'react';
import { Bus, Clock, IndianRupee } from 'lucide-react';
import { useBusStore } from '../../store/busStore';
import { SeatSelection } from '../booking/SeatSelection';
import { BookingConfirmation } from '../booking/BookingConfirmation';

export function BusSearchResults() {
  const { searchResults, isLoading, error } = useBusStore();
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSeatSelection = (seats: string[]) => {
    setSelectedSeats(seats);
    setShowConfirmation(true);
  };

  const handleBookingConfirm = () => {
    // TODO: Implement payment integration
    console.log('Proceeding to payment for seats:', selectedSeats);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-red-500 text-center py-4">{error}</div>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Available Buses</h3>
        <div className="space-y-4">
          {searchResults.map((bus) => (
            <div key={bus.id} className="border rounded-lg p-4 hover:border-indigo-500 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Bus className="w-5 h-5 text-indigo-600 mr-2" />
                    <h4 className="text-lg font-medium">{bus.name}</h4>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {bus.departureTime} - {bus.arrivalTime}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-lg font-semibold text-indigo-600">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {bus.price}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {bus.availableSeats.general + bus.availableSeats.ladies + bus.availableSeats.seniorCitizen} seats available
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Ladies: </span>
                    <span className="font-medium">{bus.availableSeats.ladies}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Senior: </span>
                    <span className="font-medium">{bus.availableSeats.seniorCitizen}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">General: </span>
                    <span className="font-medium">{bus.availableSeats.general}</span>
                  </div>
                </div>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setSelectedBus(bus)}
                >
                  Select Seats
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedBus && (
        <SeatSelection
          bus={selectedBus}
          onClose={() => setSelectedBus(null)}
          onConfirm={handleSeatSelection}
        />
      )}

      {showConfirmation && selectedBus && (
        <BookingConfirmation
          bus={selectedBus}
          selectedSeats={selectedSeats}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleBookingConfirm}
        />
      )}
    </>
  );
}
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Armchair, X, Calendar, Clock, MapPin } from 'lucide-react';

const Seat = ({ number, status, onClick }) => {
  const isBooked = status === 'booked';
  const isSelected = status === 'selected';

  return (
    <div
      onClick={() => !isBooked && onClick(number)}
      className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg cursor-pointer transition-colors ${
        isBooked
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : isSelected
          ? 'bg-blue-600 text-white'
          : 'bg-green-100 text-green-800 hover:bg-green-200'
      }`}
    >
      <Armchair size={20} />
      <span className="text-xs font-semibold">{number}</span>
    </div>
  );
};

const BookingPage = () => {
  const { busId } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const date = params.get('date');

  const [bus, setBus] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBusDetails = async () => {
      if (!user || !busId || !date) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const token = await user.getIdToken();
        const res = await axios.get(`http://localhost:5000/api/buses/${busId}?date=${date}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBus(res.data.bus);
        setBookedSeats(res.data.bookedSeats || []);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusDetails();
  }, [busId, date, user]);

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const renderSeats = () => {
    if (!bus) return null;
    const totalSeats = Array.from({ length: bus.seats }, (_, i) => i + 1);

    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="grid grid-cols-5 gap-3">
          {totalSeats.map((seatNumber) => {
            const isBooked = bookedSeats.includes(seatNumber);
            const isSelected = selectedSeats.includes(seatNumber);
            const status = isBooked ? 'booked' : isSelected ? 'selected' : 'available';
            return <Seat key={seatNumber} number={seatNumber} status={status} onClick={handleSeatClick} />;
          })}
        </div>
      </div>
    );
  };

  const handleProceedToPayment = () => {
    // For now, this will just show an alert.
    // Later, this will integrate with Razorpay.
    alert(`Proceeding to payment for seats: ${selectedSeats.join(', ')}`);
  };

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (!bus) {
    return <div className="text-center p-10">Bus details not found.</div>;
  }

  const totalPrice = selectedSeats.length * bus.price;

  return (
    <div className="container mx-auto p-4 md:p-8" data-aos="fade-in">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Seat Selection */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Select Your Seats</h2>
            <div className="flex justify-center mb-6">
              {renderSeats()}
            </div>
            <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center"><div className="w-4 h-4 rounded bg-green-100 mr-2"></div>Available</div>
                <div className="flex items-center"><div className="w-4 h-4 rounded bg-blue-600 mr-2"></div>Selected</div>
                <div className="flex items-center"><div className="w-4 h-4 rounded bg-gray-300 mr-2"></div>Booked</div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
            <div className="space-y-3 text-gray-700">
              <p className="font-bold text-xl text-black">{bus.busName}</p>
              <div className="flex items-center"><MapPin size={16} className="mr-2" /> {bus.from} to {bus.to}</div>
              <div className="flex items-center"><Calendar size={16} className="mr-2" /> {date}</div>
              <div className="flex items-center"><Clock size={16} className="mr-2" /> {bus.time}</div>
            </div>
            <hr className="my-4" />
            <div>
              <h3 className="font-semibold mb-2">Selected Seats ({selectedSeats.length})</h3>
              {selectedSeats.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map(seat => (
                    <span key={seat} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{seat}</span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No seats selected</p>
              )}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Price</span>
              <span className="text-2xl font-bold text-blue-600">₹{totalPrice}</span>
            </div>
            <button
              onClick={handleProceedToPayment}
              className="btn btn-primary w-full mt-6"
              disabled={selectedSeats.length === 0 || loading}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

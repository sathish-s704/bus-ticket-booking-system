import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = await user.getIdToken();
      const res = await axios.get("http://localhost:5000/api/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="container mx-auto p-6" data-aos="fade-in">
      <h2 className="text-3xl font-bold mb-6" data-aos="fade-right">My Bookings</h2>
      {bookings.length === 0 ? (
        <div className="card text-center" data-aos="fade-up">
          <p className="text-xl text-gray-600">You have no bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div key={booking.id} className="card" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="md:flex justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-xl font-bold">Bus ID: {booking.busId}</p>
                  <p className="text-gray-600">
                    Seats: <span className="font-semibold">{booking.seats.join(", ")}</span>
                  </p>
                </div>
                <div>
                  <p className={`text-lg font-semibold ${booking.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                    Status: {booking.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Buses = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");

  const [buses, setBuses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBuses = async () => {
      const params = {};
      if (from) params.from = from;
      if (to) params.to = to;
      if (date) params.date = date;
      const res = await axios.get("http://localhost:5000/api/buses", { params });
      setBuses(res.data.buses || []);
    };
    fetchBuses();
  }, [from, to, date]);

  return (
    <div className="container mx-auto p-6" data-aos="fade-in">
      <h2 className="text-3xl font-bold mb-6" data-aos="fade-right">
        Buses from <span className="text-blue-600">{from}</span> to <span className="text-blue-600">{to}</span> on <span className="text-blue-600">{date}</span>
      </h2>
      {buses.length === 0 ? (
        <div className="card text-center" data-aos="fade-up">
          <p className="text-xl text-gray-600">No buses found for this route.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {buses.map((bus, index) => (
            <div key={bus._id || bus.busNumber || index} className="card md:flex justify-between items-center" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="mb-4 md:mb-0">
                <p className="text-xl font-bold">{bus.busNumber}</p>
                <p className="text-gray-600">
                  {bus.route?.from} → {bus.route?.to}
                </p>
                <p className="text-gray-600">
                  Departure: <span className="font-semibold">{bus.departureTime}</span>
                </p>
                <p className="text-gray-600">
                  Arrival: <span className="font-semibold">{bus.arrivalTime}</span>
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-2xl font-bold text-blue-600">₹{bus.price?.regular}</p>
                <p className="text-gray-600">{bus.availableSeats} seats available</p>
                <button 
                  className="btn btn-primary mt-2"
                  onClick={() => navigate(`/booking/${bus.id}?date=${date}`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Buses;

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export interface Bus {
  id: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  totalSeats: number;
  availableSeats: {
    ladies: number;
    seniorCitizen: number;
    general: number;
  };
}

export interface Booking {
  id: string;
  userId: string;
  busId: string;
  seatType: 'ladies' | 'seniorCitizen' | 'general';
  seatNumber: number;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'completed';
}

export interface Feedback {
  id: string;
  userId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
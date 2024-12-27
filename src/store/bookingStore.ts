import { create } from 'zustand';

interface Booking {
  id: string;
  userId: string;
  busId: string;
  seats: number[];
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface BookingStore {
  bookings: Booking[];
  confirmBooking: (booking: Booking) => void;
  hasActiveBooking: (userId: string) => boolean;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: [],

  confirmBooking: (newBooking) => {
    set((state) => ({
      bookings: [...state.bookings, newBooking],
    }));
  },

  hasActiveBooking: (userId) => {
    const { bookings } = get();
    return bookings.some(
      (booking) =>
        booking.userId === userId &&
        (booking.status === 'confirmed' || booking.status === 'pending')
    );
  },
}));

import { create } from 'zustand';
import { Admin } from '../types';

interface AdminState {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  admin: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock admin credentials
      if (email === 'admin@example.com' && password === 'admin123') {
        const admin: Admin = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        };
        set({ admin, isAuthenticated: true, isLoading: false });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false 
      });
    }
  },
  logout: () => set({ admin: null, isAuthenticated: false }),
}));
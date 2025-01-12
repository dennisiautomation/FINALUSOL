import { create } from 'zustand';
import { User } from '../types';
import { AUTH_CONFIG } from '../config/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  setUser: (user: User | null) => void;
  resetStore: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      // For development, use master admin credentials
      if (email === AUTH_CONFIG.masterAdmin.email && 
          password === AUTH_CONFIG.masterAdmin.password) {
        set({ 
          user: AUTH_CONFIG.masterAdmin,
          isAuthenticated: true 
        });
        return;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  resetStore: () => set({ user: null, isAuthenticated: false })
}));
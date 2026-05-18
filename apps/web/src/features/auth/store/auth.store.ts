import { create } from 'zustand';
import { AuthUser } from '../types/auth-user.type';

interface AuthStore {
  accessToken: string | null;
  user: AuthUser | null;
  
  setAccessToken: (accessToken: string) => void;
  setUser: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (accessToken: string) => set({ accessToken }),
  setUser: (user: AuthUser) => set({ user }),
  logout: () => set({ accessToken: null, user: null }),
}));
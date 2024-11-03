import { create } from 'zustand';
import { login as authLogin } from '../api/authService'; // นำเข้า login จาก authService

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
  login: async (username: string) => {
    await authLogin(username);
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.clear()
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;

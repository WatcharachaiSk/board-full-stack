import { create } from 'zustand';
import { login as authLogin } from '../api/authService'; // นำเข้า login จาก authService

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: typeof window !== 'undefined' && !!localStorage.getItem('token'),
  login: async (username: string, password: string) => {
    await authLogin(username, password); // ใช้ฟังก์ชัน login ที่นำเข้ามาใหม่
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;

// services/store/userStore.ts
import { create } from 'zustand';
import { fetchUserProfile } from '../api/userService';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  fetchUser: () => Promise<void>;
}

const useUserStore = create<UserState>((set:any) => ({
  user: null,
  fetchUser: async () => {
    const user = await fetchUserProfile();
    set({ user });
  },
}));

export default useUserStore;

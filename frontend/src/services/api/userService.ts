// services/api/userService.ts
import api from './api';

interface User {
  id: number;
  name: string;
  email: string;
}

export const fetchUserProfile = async (): Promise<User> => {
  const response = await api.get<User>('/user/profile');
  return response.data;
};

// services/api/authService.ts
import { ApiPaths } from '../../constants/apiPaths';
import { getApiUrl } from '../../utils/apiHelpers';
import api from './api';

interface LoginResponse {
  access_token: string;
  username: string;
}

export const login = async (username: string): Promise<void> => {
  const url = getApiUrl(ApiPaths.Login);
  try {
    const response = await api.post<LoginResponse>(url, { username });
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('username', response.data.username);
  } catch (error) {
    throw error
  }
};

export const logout = () => {
  localStorage.clear()
};

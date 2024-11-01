// services/api/authService.ts
import { ApiPaths } from '../../constants/apiPaths';
import { getApiUrl } from '../../utils/apiHelpers';
import api from './api';

interface LoginResponse {
  token: string;
}

export const login = async (username: string, password: string): Promise<void> => {
  const url = getApiUrl(ApiPaths.Login);
  const response = await api.post<LoginResponse>(url, { username, password });
  localStorage.setItem('token', response.data.token);
};

export const logout = () => {
  localStorage.removeItem('token');
};

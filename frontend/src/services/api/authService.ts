// services/api/authService.ts
import { sweet_mixin } from '@components/sweetalert2/sweet';
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
    sweet_mixin('top-end', 'success', 'login success', '', 1500);
  } catch (error) {
    sweet_mixin('top-end', 'error', 'login error', '', 1500);
    throw error
  }
};

export const logout = () => {
  localStorage.clear()
};

// services/api/communityService.ts
import { ApiPaths } from '../../constants/apiPaths';
import { getApiUrl } from '../../utils/apiHelpers';
import api from './api';

export interface Community {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
}


export const fetchCommunities = async (): Promise<Community[]> => {
  const url = getApiUrl(ApiPaths.Community);
  try {
    const response = await api.get<Community[]>(url);
    return response.data;
  } catch (error) {
    throw error
  }
};



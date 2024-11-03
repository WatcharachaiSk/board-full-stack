// src/utils/apiHelpers.ts

import { ApiPaths } from "../constants/apiPaths";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getApiUrl = (path: ApiPaths): string => {
  // console.log("API_BASE_URL is ", API_BASE_URL);
  
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined in .env.local");
  }
  return `${API_BASE_URL}${path}`;
};

import axios from 'axios';
import { X_RAPIDAPI_KEY, X_RAPIDAPI_HOST } from '@env';

const apiClient = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights',
  timeout: 15000,
  headers: {
    'x-rapidapi-key': X_RAPIDAPI_KEY,
    'x-rapidapi-host': X_RAPIDAPI_HOST,
  },
});

export default apiClient;

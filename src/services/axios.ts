import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_HOST || 'https://api.vagasprajr.com.br';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

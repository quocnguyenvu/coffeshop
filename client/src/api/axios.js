import axios from 'axios';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';

const apiURL = 'http://localhost:5000/api';

const axiosClient = axios.create({
  // headers: { "content-type": "application/json" },
  headers: { 'content-type': 'multipart/form-data' },
  paramsSerializer: (params) => queryString.stringify(params),
  baseURL: apiURL,
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  const currentConfig = config;

  if (token) {
    currentConfig.headers.Authorization = `Bearer ${token}`;
  }

  return currentConfig;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const navigate = useNavigate();
    if (error.response && error.response.status === 401) {
      navigate('/login');
    }

    return Promise.reject(error);
  },
);

export default axiosClient;

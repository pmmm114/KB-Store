import axios, { type CreateAxiosDefaults } from 'axios';

import { API_BASE_URL } from '@/const/env';

const axiosInstance = (mergeConfig?: CreateAxiosDefaults) => {
  const _API_BASE_URL = API_BASE_URL;

  const _axiosInstance = axios.create({
    baseURL: _API_BASE_URL,
    ...mergeConfig,
  });

  return _axiosInstance;
};

export { axiosInstance };

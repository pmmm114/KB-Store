import { type AxiosInstance } from 'axios';

import { axiosInstance } from '@/libs/axios/axios';

import { HttpClient } from '@/api/client/http-client';

import { DemoController } from './DemoController';

const createApi = (axiosIntance?: AxiosInstance) => {
  const _httpClientInstance = new HttpClient({
    instance: axiosIntance,
  });

  const DemoControllerApi = new DemoController(_httpClientInstance);

  return {
    DemoControllerApi,
  };
};

const CLIENT_API = createApi(axiosInstance());

export { CLIENT_API };

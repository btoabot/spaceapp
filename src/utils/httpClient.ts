import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {IHTTPClient} from 'models/httpClient';

const URL = `${process.env.APP_URL_API}/${process.env.APP_API_VERSION}`;

const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: URL,
  headers: {'Content-Type': 'application/json'},
  responseType: 'json',
};

const initialization = (config: AxiosRequestConfig): AxiosInstance => {
  return axios.create(config);
};

// Define an intermediate variable with the required configuration
const axiosInstanceConfigured: AxiosInstance = initialization(
  axiosRequestConfiguration,
);

class HTTPClient {
  protected service: IHTTPClient;

  constructor() {
    this.service = axiosInstanceConfigured;
  }

  get<T = any, R = AxiosResponse<T>>(
    path: string,
    queryParams?: Record<string, unknown>,
  ): Promise<R> {
    return this.service.get<T, R>(path, {params: queryParams});
  }

  post<T = any, R = AxiosResponse<T>>(
    path: string,
    data: Record<string, unknown>,
  ): Promise<R> {
    return this.service.post<T, R>(path, data);
  }

  patch<T = any, R = AxiosResponse<T>>(
    path: string,
    data: Record<string, unknown>,
  ): Promise<R> {
    return this.service.patch<T, R>(path, data);
  }
}

export default HTTPClient;

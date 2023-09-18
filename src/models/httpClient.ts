import {AxiosResponse} from 'axios';

export interface IHTTPClient {
  get<T = any, R = AxiosResponse<T>>(
    path: string,
    queryParams?: Record<string, any>,
  ): Promise<R>;

  post<T = any, R = AxiosResponse<T>>(
    path: string,
    data: Record<string, any>,
  ): Promise<R>;

  patch<T = any, R = AxiosResponse<T>>(
    path: string,
    data: Record<string, any>,
  ): Promise<R>;
}

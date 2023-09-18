import HTTPClient from 'utils/httpClient';
import {IHTTPClient} from 'models/httpClient';

import api from 'api';
import {AxiosResponse} from 'axios';
import {IQueryParams} from 'models/query.ts';

export class SpaceApi {
  client: IHTTPClient;

  constructor() {
    this.client = new HTTPClient();
  }

  launches(data: IQueryParams): Promise<AxiosResponse<any>> {
    return this.client.post(api.LAUNCHES.url(), data);
  }
}

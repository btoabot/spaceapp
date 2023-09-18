import {ISort} from 'models/launches.ts';

export interface ISelect {
  [key: string]: string | number | ISelect;
}

export interface IQueryParams {
  query?: IQuery;
  options?: IOptions;
}

export interface IQuery {
  [key: string | number]: number | string | boolean | undefined | string[];
}

export interface IPopulate {
  path: string;
  select: ISelect;
}

export interface IOptions {
  sort?: null | ISort;
  page?: number;
  limit?: number;
  populate?: IPopulate[];
}

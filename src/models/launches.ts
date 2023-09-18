interface Fairings {
  reused: null | boolean;
  recovery_attempt: null | boolean;
  recovered: null | boolean;
  ships: string[];
}

interface Links {
  patch: {
    small: null | string;
    large: null | string;
  };
  reddit: {
    campaign: null | string;
    launch: null | string;
    media: null | string;
    recovery: null | string;
  };
  flickr: {
    small: string[];
    original: string[];
  };
  presskit: null | string;
  webcast: null | string;
  youtube_id: null | string;
  article: null | string;
  wikipedia: null | string;
}

interface Cores {
  core: null | string;
  flight: null | string;
  gridfins: null | boolean;
  legs: null | boolean;
  reused: null | boolean;
  landing_attempt: null | boolean;
  landing_success: null | boolean;
  landing_type: null | string;
  landpad: null | string;
}

export interface Docs {
  fairings: Fairings;
  links: Links;
  static_fire_date_utc: null | string;
  static_fire_date_unix: null | number;
  net: boolean;
  window: null | string;
  success: null | boolean;
  failures: string[];
  details: null | string;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: IFilter[];
  launchpad: IFilter;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: Cores[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: null | string;
  id: string;
  rocket: IFilter;
}
export interface ISort {
  [key: string]: string;
}

export interface IFilter {
  [key: string]: string | IFilter | IFilter[];
}

export interface IFilterWrap {
  filter: IFilter;
}

export interface ILaunchesStore {
  docs: Docs[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: number;
  status: string | null;
  sort: null | ISort;
  filter: IFilter;
  favorites: string[];
}

export interface IPagination {
  totalDocs?: number;
  offset?: number;
  limit: number;
  totalPages?: number;
  page: number;
  pagingCounter?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: null;
  nextPage?: number;
  sort: null | ISort;
  filter: IFilter;
}

export interface IError {
  code: string;
  message: string;
}

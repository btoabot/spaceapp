import {createAsyncThunk} from '@reduxjs/toolkit';
import api from 'api';

import {SpaceApi} from 'api/space.ts';
import {IQueryParams} from 'models/query.ts';
import {ILaunchesStore} from 'models/launches.ts';

export const fetchLaunches = createAsyncThunk<ILaunchesStore, IQueryParams>(
  api.LAUNCHES.name,
  async (data: IQueryParams, {rejectWithValue}) => {
    try {
      const action = new SpaceApi();
      const response = await action.launches(data);

      return response.data;
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err);
    }
  },
);

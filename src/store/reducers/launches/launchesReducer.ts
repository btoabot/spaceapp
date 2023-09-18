import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchLaunches} from 'store/reducers/launches/launchesActions.ts';
import {RootState} from 'models/store';

import {AxisStatus} from 'models/axios';
import {IFilterWrap, ILaunchesStore, IPagination} from 'models/launches';

const initialState: ILaunchesStore = {
  docs: [],
  status: null,
  hasNextPage: true,
  hasPrevPage: false,
  limit: 10,
  nextPage: 1,
  offset: 0,
  page: 1,
  pagingCounter: 1,
  prevPage: null,
  totalDocs: 0,
  totalPages: 0,
  sort: null,
  filter: {},
  favorites: localStorage.favorites ? localStorage.favorites.split(',') : [],
};

const launchesSlice = createSlice({
  name: 'launches',
  initialState,
  reducers: {
    changeTable(state, action: PayloadAction<IPagination>) {
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.sort = {...action.payload.sort};
      // state
    },
    changeFilter(state, action: PayloadAction<IFilterWrap>) {
      state.page = 1;
      state.filter = action.payload.filter;
      // state
    },
    addFavorites(state, action: PayloadAction<string>) {
      state.favorites.push(action.payload);
    },
    removeFavorites(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter((el) => el !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLaunches[AxisStatus.Pending], (state: ILaunchesStore) => {
        state.status = AxisStatus.Pending;
      })
      .addCase(
        fetchLaunches[AxisStatus.Fulfilled],
        (state: ILaunchesStore, action: PayloadAction<ILaunchesStore>) => {
          state.status = AxisStatus.Fulfilled;
          Object.assign(state, action.payload);
        },
      )
      .addCase(fetchLaunches[AxisStatus.Rejected], (state: ILaunchesStore) => {
        state.status = AxisStatus.Rejected;
      });
  },
});

export const {changeTable, changeFilter, addFavorites, removeFavorites} =
  launchesSlice.actions;

export const launchesSelector = (state: RootState) => state.launches;

export default launchesSlice.reducer;

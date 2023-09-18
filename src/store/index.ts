import {configureStore, Store} from '@reduxjs/toolkit';
import {logger, localStorageMiddleware} from 'store/middlewares';

import launches from 'store/reducers/launches/launchesReducer.ts';
const store: Store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, localStorageMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    launches,
  },
});

export default store;

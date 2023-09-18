import store from 'store/index';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;

export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export type AppDispatch = typeof store.dispatch;

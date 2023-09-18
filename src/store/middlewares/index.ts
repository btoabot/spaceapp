// middlewares
import {createLogger} from 'redux-logger';
import {
  addFavorites,
  removeFavorites,
} from 'store/reducers/launches/launchesReducer';
import {RootState} from 'models/store.ts';
const logger = createLogger({
  collapsed: true,
});

const localStorageMiddleware =
  (store: RootState) => (next: any) => (action: any) => {
    const result = next(action);
    const favoritesToLocalStorage = store.getState().launches.favorites;
    // persis storage
    if (addFavorites.match(action)) {
      // Note: localStorage expects a string
      localStorage.setItem('favorites', favoritesToLocalStorage);
    } else if (removeFavorites.match(action)) {
      localStorage.setItem('favorites', favoritesToLocalStorage);
    }

    return result;
  };

export {logger, localStorageMiddleware};

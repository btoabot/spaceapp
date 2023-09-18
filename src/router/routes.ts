import {FC} from 'react';

import {createBrowserRouter} from 'react-router-dom';

export interface IRoute {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC;
}

export const router = createBrowserRouter([
  {
    path: `/spaceapp/`,
    async lazy() {
      const HomePage = await import('pages/index');
      return {Component: HomePage.default};
    },
  },
  {
    path: `/spaceapp/launch/:launchId`,
    async lazy() {
      const LaunchPage = await import('pages/launch.tsx');
      return {Component: LaunchPage.default};
    },
  },
  {
    path: `/spaceapp/favorites`,
    async lazy() {
      const FavoritesPage = await import('pages/favorites.tsx');
      return {Component: FavoritesPage.default};
    },
  },

  {
    path: `/spaceapp/*`,
    async lazy() {
      const ErrorPage = await import('pages/error.tsx');
      return {Component: ErrorPage.default};
    },
  },
]);

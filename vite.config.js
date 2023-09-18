import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    plugins: [react({tsDecorators: true}), tsconfigPaths()],
    define: {
      'process.env.APP_URL_API': JSON.stringify(env.APP_URL_API),
      'process.env.APP_API_VERSION': JSON.stringify(env.APP_API_VERSION),
      'process.env.APP_BASE': JSON.stringify(env.APP_BASE),
    },
  };
});

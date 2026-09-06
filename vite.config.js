import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  const processEnvValues = Object.keys(env).reduce((acc, key) => {
    if (key.startsWith('REACT_APP_') || key.startsWith('VITE_')) {
      acc[`process.env.${key}`] = JSON.stringify(env[key]);
    }
    return acc;
  }, {
    'process.env.NODE_ENV': JSON.stringify(mode),
  });

  return {
    base: './',
    plugins: [react()],
    define: {
      __DEV__: JSON.stringify(mode !== 'production'),
      global: 'window',
      ...processEnvValues,
      'process.env': JSON.stringify(env),
    },
    resolve: {
      alias: {
        '@blackbox-vision/ra-language-spanish': '@blackbox-vision/ra-language-spanish/dist-web/index.js',
      },
    },
    server: {
      port: 3000,
      open: false,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
    },
  };
});

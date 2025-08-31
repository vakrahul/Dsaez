import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // This setting tells the plugin to handle JSX in .js files
      include: '**/*.{jsx,js}',
    }),
  ],
  // This tells Vite where to find your index.html file.
  root: './',
});
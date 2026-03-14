import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: { minify: false, sourcemap: false },
  server: { port: 3000 },
});

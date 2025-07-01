// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/nuance/', // Set base path for GitHub Pages
  plugins: [react()],
});

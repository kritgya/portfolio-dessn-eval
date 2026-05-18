import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// IMPORTANT for GH Pages: base must match your repo name.
// e.g. if your repo is github.com/kritgya/portfolio-dessn-eval,
// base should be '/portfolio-dessn-eval/'.
// If you later set up a custom domain (bawal.xyz), change to '/'.
export default defineConfig({
  plugins: [react()],
  base: '/portfolio-dessn-eval/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

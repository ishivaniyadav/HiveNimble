// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // <- set to root for Vercel deployment
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use './' so assets resolve correctly on GitHub Pages
  // If you set a custom domain (e.g. vividlight.com) you can change this to '/'
  base: './',
})

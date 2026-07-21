import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/memo4dev/',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // MUI (heaviest package)
          'vendor-mui': [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled',
          ],
          // Supabase
          'vendor-supabase': ['@supabase/supabase-js'],
          // Animations
          'vendor-animations': [
            'framer-motion',
            'aos',
            'react-swipeable-views',
          ],
          // Lottie
          'vendor-lottie': ['@lottiefiles/dotlottie-react'],
        },
      },
    },
  },
})


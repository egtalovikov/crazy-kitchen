import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __BASE_URL__: `"${process.env.BASE_URL}"`,
    __SERVER_URL__: `"${process.env.SERVER_URL}"`,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@store': path.resolve(__dirname, './src/store'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@game': path.resolve(__dirname, './src/game'),
      '@api': path.resolve(__dirname, './src/api'),
      '@types': path.resolve(__dirname, './src/types'),
      '@gameObjects': path.resolve(__dirname, './src/game/objects'),
      '@gameParams': path.resolve(__dirname, './src/game/parameters'),
      '@gameTypes': path.resolve(__dirname, './src/game/types'),
    },
  },
})

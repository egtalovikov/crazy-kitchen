import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { VitePWA } from 'vite-plugin-pwa'
dotenv.config()

// https://vitejs.dev/config/
// @ts-ignore
// @ts-ignore
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __BASE_URL__: `"${process.env.BASE_URL}"`,
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Crazy Kitchen',
        short_name: 'CK',
        description: '',
        theme_color: '#ffffff',
        background_color: '#ffffff',
      },
      workbox: {
        // @ts-ignore
        swSrc: 'sw.ts',
        swDest: 'dist/service-worker.js',
      },
    }),
  ],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const basePath = process.env.VITE_BASE_PATH || '/~ist1106726/NAVISENSE/'

function getManualChunk(id) {
  if (!id.includes('node_modules')) return undefined

  if (
    id.includes('/node_modules/react/') ||
    id.includes('/node_modules/react-dom/') ||
    id.includes('/node_modules/scheduler/')
  ) {
    return 'react-vendor'
  }

  if (id.includes('/node_modules/framer-motion/') || id.includes('/node_modules/motion-')) {
    return 'framer-motion'
  }

  if (id.includes('/node_modules/lucide-react/') || id.includes('/node_modules/lucide/')) {
    return 'lucide-react'
  }

  if (id.includes('/node_modules/leaflet/')) {
    return 'leaflet'
  }

  if (id.includes('/node_modules/three/')) {
    return 'three'
  }

  if (
    id.includes('/node_modules/@supabase/') ||
    id.includes('/node_modules/iceberg-js/') ||
    id.includes('/node_modules/tslib/')
  ) {
    return 'supabase'
  }

  return 'vendor'
}

export default defineConfig({
  plugins: [react()],
  base: basePath,
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      mangle: true,
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks: getManualChunk,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },
})

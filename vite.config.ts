import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'

export default defineConfig({
  plugins: [
    reactRefresh()
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('src')
      },
      {
        find: '~',
        replacement: path.resolve('node_modules')
      }
    ]
  }
})

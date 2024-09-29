import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        '/Users/tylertran/Desktop/UCI/projects/website/my-react-app/frontend_client',
        '/Users/tylertran/Desktop/UCI/projects/website/my-react-app/node_modules'
      ]
    }
  }
})

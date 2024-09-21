import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

// const config = {
//   server: {
//     host: true,
//     port: 5173,
//   }
// }

// export default config;

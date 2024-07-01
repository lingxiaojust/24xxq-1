import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    port:3000,
    open:true,
    proxy:{
      '/api':{
        target:'http://www.baidu.com',
        changeOrigin:true,//是否允许跨域
        rewrite:path=>path.replace(/^\/api/,'')
      }
    }
  },
})

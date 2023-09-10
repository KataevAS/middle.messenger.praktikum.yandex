import { defineConfig } from 'vite'
import postcssNesting from 'postcss-nesting'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  builf: 'dist',
  css: {
    postcss: {
      plugins: [postcssNesting, autoprefixer({})],
    },
  },
})

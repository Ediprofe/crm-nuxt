export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxt/content',
    '@nuxtjs/mdc',
    '@nuxtjs/tailwindcss'
  ],
  
  css: [
    '~/assets/styles/global.css',
    'katex/dist/katex.min.css'
  ],
  
  typescript: {
    strict: true
  },
  
  // Configuración de MDC (usado por @nuxt/content para parsear markdown)
  mdc: {
    remarkPlugins: {
      'remark-math': {}
    },
    rehypePlugins: {
      'rehype-katex': {}
    }
  }
})

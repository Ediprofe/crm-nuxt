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
  
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
        }
      ]
    }
  },
  
  typescript: {
    strict: true
  },
  
  mdc: {
    remarkPlugins: {
      'remark-math': {}
    },
    rehypePlugins: {
      'rehype-katex': {}
    }
  }
})

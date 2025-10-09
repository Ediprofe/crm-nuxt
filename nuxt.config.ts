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
      meta: [
        { 
          name: 'viewport', 
          content: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes' 
        }
      ],
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
    // Configuración de plugins de markdown
    remarkPlugins: {
      'remark-math': {}
    },
    rehypePlugins: {
      'rehype-katex': {}
    }
  }
  
  // NOTA: ProseTable.vue en /app/components/content/ será usado automáticamente
  // por @nuxtjs/mdc para renderizar tablas markdown
})

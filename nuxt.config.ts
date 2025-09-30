export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  
  css: ['~/assets/styles/global.css'],
  
  typescript: {
    strict: true
  }
})

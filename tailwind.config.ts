import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class', // Usar clase .dark en el html
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue'
  ],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config


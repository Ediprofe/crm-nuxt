import type { Config } from 'tailwindcss'
import { designTokens } from './app/config/design-tokens'

/**
 * EDIPROFE DESIGN SYSTEM - TAILWIND CONFIGURATION
 * ===============================================
 * Configuración unificada basada en design-tokens.ts
 */

export default {
  darkMode: 'class',
  
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './content/**/*.md',
  ],
  
  theme: {
    // Extender el tema base con nuestros tokens
    extend: {
      // Colores del sistema
      colors: {
        neutral: designTokens.colors.neutral,
        accent: designTokens.colors.accent,
        success: designTokens.colors.semantic.success,
        warning: designTokens.colors.semantic.warning,
        error: designTokens.colors.semantic.error,
        info: designTokens.colors.semantic.info,
      },
      
      // Tipografía
      fontFamily: {
        sans: designTokens.typography.fontFamily.sans.split(', '),
        mono: designTokens.typography.fontFamily.mono.split(', '),
      },
      
      fontSize: designTokens.typography.fontSize,
      fontWeight: designTokens.typography.fontWeight,
      lineHeight: designTokens.typography.lineHeight,
      
      // Espaciado
      spacing: designTokens.spacing,
      
      // Bordes
      borderRadius: designTokens.borders.radius,
      borderWidth: designTokens.borders.width,
      
      // Sombras
      boxShadow: designTokens.shadows,
      
      // Transiciones
      transitionDuration: designTokens.transitions.duration,
      transitionTimingFunction: designTokens.transitions.timing,
      
      // Breakpoints personalizados
      screens: designTokens.breakpoints,
    },
  },
  
  plugins: [],
} satisfies Config


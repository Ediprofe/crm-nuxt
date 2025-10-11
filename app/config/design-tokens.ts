/**
 * EDIPROFE DESIGN SYSTEM - DESIGN TOKENS v3.0
 * ============================================
 * Única fuente de verdad para todo el sistema de diseño
 * 
 * Principios:
 * - Simplicidad: Escalas mínimas pero suficientes
 * - Semántica: Nombres que expresan propósito, no valor
 * - Consistencia: Una sola forma de hacer cada cosa
 * - Accesibilidad: Contrastes WCAG AA como mínimo
 * - DRY: No repetir valores, reutilizar tokens
 */

export const designTokens = {
  /**
   * COLORES BASE - Sistema simplificado
   * Solo los valores esenciales que realmente usamos
   */
  colors: {
    // Neutral - Escala minimalista (7 valores)
    neutral: {
      50: '#fafafa',   // Backgrounds ultra claros
      100: '#f5f5f5',  // Backgrounds secundarios
      200: '#e5e5e5',  // Borders suaves
      300: '#d4d4d4',  // Borders interactivos
      500: '#737373',  // Text muted
      700: '#404040',  // Text secondary
      900: '#171717',  // Text primary
      950: '#09090b',  // Dark mode bg
    },
    
    // Accent - Azul profesional (solo 3 valores)
    accent: {
      400: '#60a5fa',  // Light mode hover / Dark mode base (blue-400)
      500: '#2563eb',  // Base principal (blue-600)
      600: '#1d4ed8',  // Hover / Pressed (blue-700)
    },
    
    // Semantic - Colores de feedback
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },

  /**
   * TIPOGRAFÍA
   * Sistema simple de tamaños y pesos
   */
  typography: {
    fontFamily: {
      sans: 'Inter, ui-sans-serif, system-ui, sans-serif',
      mono: 'ui-monospace, Menlo, Monaco, monospace',
    },
    
    // Escala de tamaños (6 valores principales)
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '2rem',    // 32px
      '4xl': '2.5rem',  // 40px
    },
    
    // Pesos (4 valores)
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    
    // Line heights
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  /**
   * ESPACIADO
   * Sistema de 8px base (escala simplificada)
   */
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
  },

  /**
   * BORDES Y SOMBRAS
   */
  borders: {
    radius: {
      sm: '0.25rem',   // 4px
      md: '0.5rem',    // 8px
      lg: '0.75rem',   // 12px
      xl: '1rem',      // 16px
      full: '9999px',  // Circular
    },
    
    width: {
      DEFAULT: '1px',
      2: '2px',
      4: '4px',
    },
  },

  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  /**
   * TRANSICIONES
   */
  transitions: {
    duration: {
      fast: '150ms',
      DEFAULT: '200ms',
      slow: '300ms',
    },
    
    timing: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',  // ease-in-out
      in: 'cubic-bezier(0.4, 0, 1, 1)',          // ease-in
      out: 'cubic-bezier(0, 0, 0.2, 1)',         // ease-out
    },
  },

  /**
   * BREAKPOINTS
   */
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  /**
   * Z-INDEX SCALE
   * Para evitar conflictos de capas
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },
} as const

/**
 * HELPER: Generar CSS variables a partir de tokens
 */
export function generateCSSVariables(mode: 'light' | 'dark' = 'light') {
  const { colors } = designTokens
  
  if (mode === 'light') {
    return {
      // Backgrounds
      '--bg-primary': colors.neutral[50],
      '--bg-secondary': colors.neutral[100],
      '--bg-card': '#ffffff',
      
      // Text
      '--text-primary': colors.neutral[900],
      '--text-secondary': colors.neutral[700],
      '--text-muted': '#737373', // neutral-500
      
      // Borders
      '--border-primary': colors.neutral[200],
      '--border-secondary': colors.neutral[300],
      
      // Accent
      '--accent-primary': colors.accent[500],
      '--accent-primary-hover': colors.accent[600],
      '--accent-primary-rgb': '16, 185, 129', // Para opacidades
      
      // Semantic
      '--success': colors.semantic.success,
      '--warning': colors.semantic.warning,
      '--error': colors.semantic.error,
      '--info': colors.semantic.info,
    }
  } else {
    return {
      // Backgrounds
      '--bg-primary': '#09090b',      // zinc-950
      '--bg-secondary': '#18181b',    // zinc-900
      '--bg-card': '#18181b',
      
      // Text
      '--text-primary': colors.neutral[50],
      '--text-secondary': '#d4d4d8',  // zinc-300
      '--text-muted': '#a1a1aa',      // zinc-400
      
      // Borders
      '--border-primary': '#27272a',  // zinc-800
      '--border-secondary': '#3f3f46', // zinc-700
      
      // Accent
      '--accent-primary': colors.accent[400],
      '--accent-primary-hover': colors.accent[500],
      '--accent-primary-rgb': '52, 211, 153',
      
      // Semantic
      '--success': '#4ade80',  // green-400
      '--warning': '#fbbf24',  // amber-400
      '--error': '#f87171',    // red-400
      '--info': '#60a5fa',     // blue-400
    }
  }
}

export type DesignTokens = typeof designTokens

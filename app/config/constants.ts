// ========================================
// CONSTANTES GLOBALES DEL PROYECTO
// ========================================

export const TIMEOUTS = {
  DOM_READY: 200, // ms - Espera para que el DOM esté completamente renderizado
  MEDIA_PROCESSING: 100, // ms - Espera para procesar enlaces multimedia
  HEADER_UPDATE: 150 // ms - Debounce para actualización de header height
} as const

export const DEFAULTS = {
  HEADER_HEIGHT: 93, // px - Altura por defecto del header si no se puede medir
  SCROLL_OFFSET: 10, // px - Offset adicional para detección de heading activo
  TOC_MAX_HEIGHT_MOBILE: '500px', // Altura máxima del acordeón móvil
  SEARCH_SCROLL_PADDING: 20 // px - Padding adicional al hacer scroll a resultados de búsqueda
} as const

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const

export const MEDIA_PATTERNS = {
  YOUTUBE_VIDEO: [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
    /youtube\.com\/embed\/([^?&\s]+)/
  ],
  YOUTUBE_PLAYLIST: /[?&]list=([^&\s]+)/,
  TIKTOK_FULL: /tiktok\.com\/.*\/video\/(\d+)/,
  TIKTOK_SHORT: /vt\.tiktok\.com\/([A-Za-z0-9]+)/,
  DRIVE_FOLDER: /\/folders\/([^?&\s]+)/,
  DRIVE_FILE: /\/file\/d\/([^?&\s]+)/
} as const

export const STORAGE_KEYS = {
  THEME: 'ediprofe-theme'
} as const

// Configuración de búsqueda
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_DELAY: 300,
  MAX_CONTEXT_LENGTH: 100,
  HIGHLIGHT_CLASS: 'bg-yellow-200 dark:bg-yellow-900 rounded px-1',
  ACTIVE_HIGHLIGHT_CLASS: 'bg-yellow-400 dark:bg-yellow-600 rounded px-1 ring-2 ring-yellow-500'
} as const

// Z-index para elementos flotantes
export const Z_INDEX = {
  SEARCH_BUTTON: 50,
  SEARCH_BAR: 50,
  HEADER: 45,
  SIDEBAR: 40,
  TOC_MOBILE: 40
} as const



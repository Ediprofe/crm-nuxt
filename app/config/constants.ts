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
  TOC_MAX_HEIGHT_MOBILE: '500px' // Altura máxima del acordeón móvil
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



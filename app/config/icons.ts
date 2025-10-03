/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SINGLE SOURCE OF TRUTH: Configuración de Íconos
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Este archivo centraliza TODAS las configuraciones de íconos del proyecto.
 * 
 * Principios aplicados:
 * - DRY (Don't Repeat Yourself): Un solo lugar para definir íconos
 * - Single Responsibility: Solo configuración de íconos
 * - Type Safety: Tipado completo con TypeScript
 * - Escalabilidad: Fácil agregar nuevos íconos
 * 
 * @module config/icons
 */

/**
 * Tipo para valores de stroke-linecap y stroke-linejoin de SVG
 */
export type SvgStrokeLinecap = 'round' | 'butt' | 'square' | 'inherit'
export type SvgStrokeLinejoin = 'round' | 'inherit' | 'miter' | 'bevel'

/**
 * Configuración completa de un ícono SVG
 */
export interface IconConfig {
  /** ViewBox del SVG (ej: "0 0 24 24") */
  viewBox: string
  /** Color de relleno (usar 'currentColor' para heredar) */
  fill: string
  /** Color de stroke (usar 'currentColor' para heredar) */
  stroke: string
  /** Ancho del stroke (opcional) */
  strokeWidth?: string
  /** Estilo de final de línea (opcional) */
  strokeLinecap?: SvgStrokeLinecap
  /** Estilo de unión de líneas (opcional) */
  strokeLinejoin?: SvgStrokeLinejoin
  /** Path del SVG (el contenido del elemento <path>) */
  path: string
  /** Prioridad de visualización (menor número = mayor prioridad) */
  priority: number
}

/**
 * Tipos de contenido soportados
 */
export type ContentIconType = 'playlist' | 'video' | 'drive' | 'tiktok' | 'practice'

/**
 * Configuración de todos los íconos de contenido
 * 
 * Ordenados por prioridad de visualización:
 * 1. Playlist (más importante)
 * 2. Video
 * 3. Drive
 * 4. TikTok
 * 5. Practice
 */
export const CONTENT_ICONS: Record<ContentIconType, IconConfig> = {
  playlist: {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    path: 'M4 6h16M4 12h16M4 18h11',
    priority: 1
  },
  video: {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    stroke: 'none',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    priority: 2
  },
  drive: {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    path: 'M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
    priority: 3
  },
  tiktok: {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    stroke: 'none',
    path: 'M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.10-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
    priority: 4
  },
  practice: {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    path: 'M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z',
    priority: 5
  }
} as const

/**
 * Genera el nombre de clase CSS para un tipo de ícono
 * 
 * @param type - Tipo de ícono
 * @returns Nombre de clase CSS (ej: "content-icon video-icon")
 * 
 * @example
 * getIconClass('video') // "content-icon video-icon"
 * getIconClass('practice') // "content-icon practice-icon"
 */
export function getIconClass(type: ContentIconType): string {
  return `content-icon ${type}-icon`
}

/**
 * Obtiene la configuración de un ícono por su tipo
 * 
 * @param type - Tipo de ícono
 * @returns Configuración del ícono o undefined si no existe
 * 
 * @example
 * const config = getIconConfig('video')
 * if (config) {
 *   // config.viewBox, config.path, etc.
 * }
 */
export function getIconConfig(type: string): IconConfig | undefined {
  return CONTENT_ICONS[type as ContentIconType]
}

/**
 * Obtiene todos los tipos de íconos disponibles
 * 
 * @returns Array con todos los tipos de íconos
 * 
 * @example
 * const types = getAvailableIconTypes()
 * // ['playlist', 'video', 'drive', 'tiktok', 'practice']
 */
export function getAvailableIconTypes(): ContentIconType[] {
  return Object.keys(CONTENT_ICONS) as ContentIconType[]
}

/**
 * Ordena tipos de contenido por prioridad
 * 
 * @param types - Array de tipos a ordenar
 * @returns Array ordenado por prioridad (menor número primero)
 * 
 * @example
 * sortByPriority(['practice', 'video', 'playlist'])
 * // ['playlist', 'video', 'practice']
 */
export function sortByPriority(types: ContentIconType[]): ContentIconType[] {
  return [...types].sort((a, b) => {
    const priorityA = CONTENT_ICONS[a]?.priority ?? 999
    const priorityB = CONTENT_ICONS[b]?.priority ?? 999
    return priorityA - priorityB
  })
}


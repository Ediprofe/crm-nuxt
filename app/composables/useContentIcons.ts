/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * COMPOSABLE: useContentIcons
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Proporciona funcionalidad reutilizable para trabajar con íconos de contenido.
 * Centraliza la lógica de renderizado de íconos en un solo lugar.
 * 
 * Principios aplicados:
 * - DRY: No repetir lógica de íconos
 * - Single Responsibility: Solo manejo de íconos
 * - Reusabilidad: Usable en cualquier componente
 * 
 * @module composables/useContentIcons
 */

import { CONTENT_ICONS, getIconClass, sortByPriority, type ContentIconType } from '~/config/icons'
import type { ContentType } from '~/types/content'

/**
 * Composable para trabajar con íconos de contenido
 * 
 * @returns Funciones y datos para manejar íconos
 * 
 * @example
 * ```vue
 * <script setup>
 * const { icons, getClass, getSortedTypes } = useContentIcons()
 * const sortedTypes = getSortedTypes(['practice', 'video', 'playlist'])
 * // Retorna: ['playlist', 'video', 'practice'] (ordenados por prioridad)
 * </script>
 * ```
 */
export function useContentIcons() {
  /**
   * Obtiene las clases CSS para un tipo de ícono
   */
  const getClass = (type: ContentType) => {
    return getIconClass(type as ContentIconType)
  }

  /**
   * Ordena tipos de contenido por prioridad
   */
  const getSortedTypes = (types: ContentType[]) => {
    return sortByPriority(types as ContentIconType[])
  }

  /**
   * Verifica si existe configuración para un tipo
   */
  const hasIcon = (type: ContentType): boolean => {
    return type in CONTENT_ICONS
  }

  /**
   * Obtiene la configuración de un ícono
   */
  const getConfig = (type: ContentType) => {
    return CONTENT_ICONS[type as ContentIconType]
  }

  return {
    /** Configuración de todos los íconos */
    icons: CONTENT_ICONS,
    /** Obtiene clases CSS para un tipo */
    getClass,
    /** Ordena tipos por prioridad */
    getSortedTypes,
    /** Verifica si existe configuración para un tipo */
    hasIcon,
    /** Obtiene configuración de un ícono */
    getConfig
  }
}


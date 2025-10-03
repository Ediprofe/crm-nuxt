/**
 * Utilidades para detectar tipos de contenido asociados a headings
 */

import type { ContentType } from '~/types/content'
import { isPracticeHeading as detectPractice } from './practice-detection'

/**
 * Detecta qué tipos de contenido están asociados a un heading
 * Usa un enfoque híbrido:
 * 1. Lee atributos data-* (agregados por MediaLinksProcessor)
 * 2. Analiza el DOM como fallback
 * 3. Detecta práctica por texto/emoji
 * 
 * @param heading - Elemento HTML del heading (h2, h3, etc.)
 * @returns Array de tipos de contenido detectados
 * 
 * @example
 * const types = detectHeadingContentTypes(h2Element)
 * // Retorna: ['video', 'practice'] si tiene video y es práctica
 */
export function detectHeadingContentTypes(heading: HTMLElement): ContentType[] {
  const types: ContentType[] = []
  
  // 1. PRIMARIO: Leer atributos data-* (rápido, eficiente)
  // MediaLinksProcessor marca headings con estos atributos
  
  // Primero intentar leer el atributo que soporta múltiples tipos
  const dataTypes = heading.getAttribute('data-content-types')
  if (dataTypes) {
    const typesArray = dataTypes.split(',').map(t => t.trim()).filter(Boolean)
    types.push(...(typesArray as ContentType[]))
  } else {
    // Fallback al atributo singular (compatibilidad con código legacy)
    const dataType = heading.getAttribute('data-content-type')
    if (dataType) {
      types.push(dataType as ContentType)
    }
  }
  
  // 2. FALLBACK: Analizar DOM si no hay atributos
  // Útil si ToC se genera antes que MediaLinksProcessor
  if (types.length === 0) {
    const detectedTypes = analyzeHeadingContent(heading)
    types.push(...detectedTypes)
  }
  
  // 3. ESPECIAL: Detectar práctica (por texto/emoji)
  // Independiente de MediaLinksProcessor
  // DRY: Usa utilidad centralizada de practice-detection
  const text = heading.textContent || ''
  if (detectPractice(text)) {
    if (!types.includes('practice')) {
      types.push('practice')
    }
  }
  
  return types
}

/**
 * Analiza el contenido siguiente a un heading para detectar multimedia
 * @param heading - Elemento heading a analizar
 * @returns Array de tipos detectados
 */
function analyzeHeadingContent(heading: HTMLElement): ContentType[] {
  const types: ContentType[] = []
  let next = heading.nextElementSibling
  let count = 0
  const maxElements = 3 // Límite de seguridad
  
  // Buscar en los siguientes elementos (hasta encontrar otro heading)
  while (next && !isHeading(next) && count < maxElements) {
    if (next.tagName === 'P') {
      const links = next.querySelectorAll('a[href]')
      
      links.forEach((link) => {
        const href = (link as HTMLAnchorElement).href
        
        // Detectar YouTube
        if (isYouTubeUrl(href)) {
          const type = isPlaylistUrl(href) ? 'playlist' : 'video'
          if (!types.includes(type)) {
            types.push(type)
          }
        }
        // Detectar TikTok
        else if (isTikTokUrl(href)) {
          if (!types.includes('tiktok')) {
            types.push('tiktok')
          }
        }
        // Detectar Google Drive
        else if (isDriveUrl(href)) {
          if (!types.includes('drive')) {
            types.push('drive')
          }
        }
      })
    }
    
    next = next.nextElementSibling
    count++
  }
  
  return types
}

/**
 * Verifica si un elemento es un heading (H1-H6)
 */
function isHeading(element: Element): boolean {
  return ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)
}

/**
 * Verifica si una URL es de YouTube
 */
function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

/**
 * Verifica si una URL de YouTube es una playlist
 */
function isPlaylistUrl(url: string): boolean {
  return url.includes('playlist') || url.includes('list=')
}

/**
 * Verifica si una URL es de TikTok
 */
function isTikTokUrl(url: string): boolean {
  return url.includes('tiktok.com') || url.includes('vt.tiktok.com')
}

/**
 * Verifica si una URL es de Google Drive
 */
function isDriveUrl(url: string): boolean {
  return url.includes('drive.google.com')
}

// REMOVIDO: Función isPracticeHeading
// Lógica centralizada en practice-detection.ts (DRY: Single Source of Truth)


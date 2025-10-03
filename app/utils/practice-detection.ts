/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SINGLE SOURCE OF TRUTH: Detección y Limpieza de Práctica
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Centraliza toda la lógica relacionada con la detección y limpieza de emojis
 * de práctica en un solo lugar para evitar duplicación.
 * 
 * Principio DRY: Don't Repeat Yourself
 */

/**
 * Patrones de emoji de lápiz en diferentes codificaciones Unicode
 * Incluye todas las variantes posibles del emoji ✏️
 */
export const PENCIL_EMOJI_PATTERNS = {
  // ✏️ con variation selector (forma más común)
  withSelector: /\u270F\uFE0F/g,
  // ✏ sin variation selector
  withoutSelector: /\u270F/g,
  // Versión Unicode completa (flag u para full Unicode)
  unicode: /[\u{270F}]/gu,
  // Patrón combinado para búsqueda
  combined: /[\u{270F}\u{FE0F}]+/gu
} as const

/**
 * Palabras clave que indican que un heading es de práctica
 */
export const PRACTICE_KEYWORDS = [
  'practica',
  'práctica', 
  'ejercicio',
  'ejercicios',
  'actividad',
  'actividades'
] as const

/**
 * Detecta si un texto o heading es de práctica
 * 
 * @param text - Texto a analizar
 * @returns true si es de práctica, false en caso contrario
 * 
 * @example
 * isPracticeHeading('✏️ Practica') // true
 * isPracticeHeading('Ejercicio 1') // true
 * isPracticeHeading('Introducción') // false
 */
export function isPracticeHeading(text: string): boolean {
  const lowerText = text.toLowerCase()
  
  // Verificar si contiene emoji de lápiz
  if (PENCIL_EMOJI_PATTERNS.combined.test(text)) {
    return true
  }
  
  // Verificar si contiene palabras clave
  return PRACTICE_KEYWORDS.some(keyword => lowerText.includes(keyword))
}

/**
 * Limpia todos los emojis de lápiz de un texto
 * Maneja todas las variantes Unicode del emoji ✏️
 * 
 * @param text - Texto a limpiar
 * @returns Texto sin emojis de lápiz
 * 
 * @example
 * removePencilEmoji('✏️ Practica') // 'Practica'
 * removePencilEmoji('✏ Ejercicio') // 'Ejercicio'
 */
export function removePencilEmoji(text: string): string {
  return text
    .replace(PENCIL_EMOJI_PATTERNS.withSelector, '')
    .replace(PENCIL_EMOJI_PATTERNS.withoutSelector, '')
    .replace(PENCIL_EMOJI_PATTERNS.unicode, '')
    .trim()
}

/**
 * Verifica si un texto contiene emoji de lápiz
 * 
 * @param text - Texto a verificar
 * @returns true si contiene emoji de lápiz
 */
export function hasPencilEmoji(text: string): boolean {
  return PENCIL_EMOJI_PATTERNS.combined.test(text)
}


/**
 * ========================================
 * TIPOS PARA CONTENIDO (NUXT CONTENT)
 * ========================================
 */

/**
 * Representa un item de contenido de Nuxt Content
 * @property {string} path - Ruta del contenido (ej: "/matematicas/01-numeros-reales")
 * @property {string} [title] - Título del contenido
 * @property {string} [description] - Descripción del contenido
 * @property {any} [body] - Cuerpo del contenido parseado (AST de Nuxt Content)
 * @property {Record<string, any>} [_id] - ID interno de Nuxt Content
 */
export interface ContentItem {
  path: string
  title?: string
  description?: string
  body?: any // El AST de Nuxt Content es complejo, usar any aquí es aceptable
  _id?: string
  [key: string]: any // Permite propiedades adicionales del frontmatter
}

/**
 * ========================================
 * TIPOS PARA MATERIAS
 * ========================================
 */

/**
 * Configuración de una materia
 * @property {string} nombre - Nombre de la materia (ej: "Matemáticas")
 * @property {string} emoji - Emoji representativo de la materia
 * @property {string} color - Color principal de la materia (clase Tailwind)
 */
export interface MateriaConfig {
  nombre: string
  emoji: string
  color: string
}

/**
 * ========================================
 * TIPOS PARA TABLA DE CONTENIDOS (TOC)
 * ========================================
 */

/**
 * Representa un item en la tabla de contenidos
 * @property {string} id - ID del elemento heading (usado para scrolling y navegación)
 * @property {string} text - Texto visible del heading
 * @property {number} level - Nivel del heading (2 = H2, 3 = H3)
 * 
 * @example
 * ```ts
 * const tocItem: TocItem = {
 *   id: "introduccion",
 *   text: "Introducción",
 *   level: 2
 * }
 * ```
 */
export interface TocItem {
  id: string
  text: string
  level: number
}


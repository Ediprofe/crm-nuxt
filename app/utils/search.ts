/**
 * Utilidades para búsqueda de texto en contenido HTML
 */

export interface SearchMatch {
  element: HTMLElement
  text: string
  context: string
  heading: string | null
  index: number
}

/**
 * Escapa caracteres especiales de regex para prevenir inyección
 * @param text - Texto a escapar
 * @returns Texto seguro para usar en RegExp
 * @example
 * escapeRegex('hello.world') // 'hello\\.world'
 * escapeRegex('$100 (price)') // '\\$100 \\(price\\)'
 */
export function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Encuentra el heading más cercano (H2 o H3) antes del elemento dado
 * @param element - Elemento HTML desde donde buscar
 * @returns Texto del heading más cercano o null si no se encuentra
 * @example
 * const heading = findNearestHeading(paragraphElement)
 * // Retorna: "Título de la Sección" o null
 */
export function findNearestHeading(element: HTMLElement): string | null {
  let current: HTMLElement | null = element
  
  while (current && current.parentElement) {
    // Buscar hermanos anteriores
    let sibling = current.previousElementSibling as HTMLElement | null
    
    while (sibling) {
      if (sibling.tagName === 'H2' || sibling.tagName === 'H3') {
        return sibling.textContent?.trim() || null
      }
      sibling = sibling.previousElementSibling as HTMLElement | null
    }
    
    // Subir un nivel
    current = current.parentElement as HTMLElement
    
    // Si encontramos un H2/H3 padre, retornarlo
    if (current && (current.tagName === 'H2' || current.tagName === 'H3')) {
      return current.textContent?.trim() || null
    }
  }
  
  return null
}

/**
 * Obtiene el contexto alrededor de una coincidencia de búsqueda
 * @param text - Texto completo donde se encontró la coincidencia
 * @param matchIndex - Índice donde comienza la coincidencia
 * @param matchLength - Longitud del texto coincidente
 * @param maxLength - Longitud máxima del contexto (por defecto 100)
 * @returns Fragmento de texto con '...' si fue truncado
 * @example
 * getContext('Lorem ipsum dolor sit amet', 6, 5, 20)
 * // Retorna: "...Lorem ipsum dolor..."
 */
export function getContext(text: string, matchIndex: number, matchLength: number, maxLength: number = 100): string {
  const start = Math.max(0, matchIndex - maxLength / 2)
  const end = Math.min(text.length, matchIndex + matchLength + maxLength / 2)
  
  let context = text.slice(start, end)
  
  if (start > 0) context = '...' + context
  if (end < text.length) context = context + '...'
  
  return context
}

/**
 * Busca texto en un elemento y sus descendientes
 * @param element - Elemento raíz donde buscar
 * @param query - Texto a buscar (case-insensitive)
 * @returns Array de coincidencias con contexto y ubicación
 * @example
 * const matches = searchInElement(contentDiv, 'átomo')
 * // Retorna: [{ element, text: 'átomo', context: '...', heading: 'Estructura Atómica', index: 0 }]
 */
export function searchInElement(element: HTMLElement, query: string): SearchMatch[] {
  const matches: SearchMatch[] = []
  const regex = new RegExp(escapeRegex(query), 'gi')
  
  // Walker para recorrer solo nodos de texto
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Ignorar nodos dentro de mark (para no duplicar)
        if (node.parentElement?.tagName === 'MARK') {
          return NodeFilter.FILTER_REJECT
        }
        // Ignorar nodos vacíos o solo espacios
        if (!node.textContent?.trim()) {
          return NodeFilter.FILTER_REJECT
        }
        return NodeFilter.FILTER_ACCEPT
      }
    }
  )
  
  let index = 0
  let node: Node | null
  
  while (node = walker.nextNode()) {
    const text = node.textContent || ''
    const parent = node.parentElement
    
    if (!parent) continue
    
    // Buscar todas las coincidencias en este nodo
    let match: RegExpExecArray | null
    while ((match = regex.exec(text)) !== null) {
      const heading = findNearestHeading(parent)
      const context = getContext(text, match.index, match[0].length)
      
      matches.push({
        element: parent,
        text: match[0],
        context,
        heading,
        index: index++
      })
    }
  }
  
  return matches
}

/**
 * Limpia todos los highlights previos del contenedor
 * @param container - Elemento que contiene los highlights a limpiar
 * @example
 * clearHighlights(contentDiv)
 * // Remueve todos los <mark data-search-highlight> del contenedor
 */
export function clearHighlights(container: HTMLElement): void {
  const marks = container.querySelectorAll('mark[data-search-highlight]')
  marks.forEach(mark => {
    const parent = mark.parentNode
    if (parent) {
      // Reemplazar <mark> con su contenido de texto
      const textNode = document.createTextNode(mark.textContent || '')
      parent.replaceChild(textNode, mark)
      
      // Normalizar nodos de texto adyacentes
      parent.normalize()
    }
  })
}

/**
 * Resalta todas las coincidencias de búsqueda en el elemento
 * @param element - Elemento donde resaltar coincidencias
 * @param query - Texto a buscar y resaltar
 * @param activeIndex - Índice de la coincidencia activa (-1 para ninguna)
 * @param highlightClass - Clase CSS para coincidencias normales
 * @param activeHighlightClass - Clase CSS para la coincidencia activa
 * @returns Número total de coincidencias encontradas
 * @example
 * const count = highlightMatches(
 *   contentDiv,
 *   'átomo',
 *   0,
 *   'bg-yellow-200',
 *   'bg-yellow-400'
 * )
 * // Retorna: 5 (y crea 5 elementos <mark> con clases apropiadas)
 */
export function highlightMatches(
  element: HTMLElement, 
  query: string, 
  activeIndex: number = -1,
  highlightClass: string,
  activeHighlightClass: string
): number {
  if (!query.trim()) return 0
  
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi')
  let matchCount = 0
  
  // Walker para nodos de texto
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        if (node.parentElement?.tagName === 'MARK') {
          return NodeFilter.FILTER_REJECT
        }
        if (!node.textContent?.trim()) {
          return NodeFilter.FILTER_REJECT
        }
        return NodeFilter.FILTER_ACCEPT
      }
    }
  )
  
  const nodesToReplace: Array<{ node: Node; parent: Node }> = []
  let node: Node | null
  
  while (node = walker.nextNode()) {
    const text = node.textContent || ''
    if (regex.test(text) && node.parentNode) {
      nodesToReplace.push({ node, parent: node.parentNode })
    }
  }
  
  // Reemplazar nodos con versiones resaltadas
  nodesToReplace.forEach(({ node, parent }) => {
    const text = node.textContent || ''
    const fragment = document.createDocumentFragment()
    let lastIndex = 0
    let match: RegExpExecArray | null
    const localRegex = new RegExp(`(${escapeRegex(query)})`, 'gi')
    
    while ((match = localRegex.exec(text)) !== null) {
      // Texto antes de la coincidencia
      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, match.index))
        )
      }
      
      // Crear <mark> para la coincidencia
      const mark = document.createElement('mark')
      mark.textContent = match[0]
      mark.setAttribute('data-search-highlight', 'true')
      mark.setAttribute('data-search-index', matchCount.toString())
      
      // Aplicar clase apropiada (activa o normal)
      if (matchCount === activeIndex) {
        mark.className = activeHighlightClass
        mark.setAttribute('data-search-active', 'true')
      } else {
        mark.className = highlightClass
      }
      
      fragment.appendChild(mark)
      lastIndex = match.index + match[0].length
      matchCount++
    }
    
    // Texto después de la última coincidencia
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
    }
    
    parent.replaceChild(fragment, node)
  })
  
  return matchCount
}

/**
 * Hace scroll suave hacia el highlight activo
 * @param container - Contenedor con los elementos resaltados
 * @param index - Índice del highlight al que hacer scroll
 * @param headerHeight - Altura del header fijo (por defecto 56px)
 * @param scrollPadding - Padding adicional superior (por defecto 20px)
 * @example
 * scrollToHighlight(contentDiv, 2, 56, 20)
 * // Hace scroll suave a la tercera coincidencia (índice 2)
 */
export function scrollToHighlight(container: HTMLElement, index: number, headerHeight: number = 56, scrollPadding: number = 20): void {
  const mark = container.querySelector(`mark[data-search-index="${index}"]`)
  
  if (mark) {
    const rect = mark.getBoundingClientRect()
    const scrollTop = window.scrollY || window.pageYOffset
    const targetY = rect.top + scrollTop - headerHeight - scrollPadding
    
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    })
  }
}


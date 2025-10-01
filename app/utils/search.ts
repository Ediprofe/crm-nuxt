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
 * Escapa caracteres especiales de regex
 */
export function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Encuentra el heading más cercano (H2 o H3) antes del elemento
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
 * Obtiene el contexto alrededor de una coincidencia
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
 * Retorna array de nodos de texto que contienen coincidencias
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
 * Limpia todos los highlights previos
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
 * Resalta todas las coincidencias de búsqueda
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
 * Scroll suave al elemento activo
 */
export function scrollToHighlight(container: HTMLElement, index: number, headerHeight: number = 93): void {
  const mark = container.querySelector(`mark[data-search-index="${index}"]`)
  
  if (mark) {
    const rect = mark.getBoundingClientRect()
    const scrollTop = window.scrollY || window.pageYOffset
    const targetY = rect.top + scrollTop - headerHeight - 20 // 20px extra padding
    
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    })
  }
}


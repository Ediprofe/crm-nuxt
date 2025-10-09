// ============================================================================
// ARCHIVO: app/plugins/responsive-tables.client.ts
// Progressive Enhancement para tablas responsive con cards en móvil
// ============================================================================

export default defineNuxtPlugin((nuxtApp) => {
  // Solo ejecutar en cliente
  if (import.meta.server) return

  /**
   * Mejora todas las tablas del documento convirtiéndolas en responsive
   * Añade data-labels para el modo card en móvil
   */
  const enhanceResponsiveTables = () => {
    // Buscar todas las tablas dentro de .prose (contenido markdown)
    const tables = document.querySelectorAll('.prose table')
    
    tables.forEach((table) => {
      // Si ya fue procesada, skip
      if (table.hasAttribute('data-responsive-enhanced')) return
      
      // Marcar como procesada
      table.setAttribute('data-responsive-enhanced', 'true')
      
      // Añadir clase responsive
      table.classList.add('responsive-table')
      
      // Extraer headers
      const thead = table.querySelector('thead')
      const headerCells = thead ? Array.from(thead.querySelectorAll('th')) : []
      const headersText = headerCells.map(th => th.textContent?.trim() || '')
      
      // Fallback: usar primera fila si no hay thead explícito
      if (!headersText.length) {
        const firstRow = table.querySelector('tbody tr')
        if (firstRow) {
          const ths = firstRow.querySelectorAll('th')
          if (ths.length) {
            headersText.push(...Array.from(ths, th => th.textContent?.trim() || ''))
          }
        }
      }
      
      // Añadir data-label a cada celda según su columna
      if (headersText.length) {
        table.querySelectorAll('tbody tr').forEach((row) => {
          const cells = row.querySelectorAll('td')
          cells.forEach((td, index) => {
            if (!td.hasAttribute('data-label') && headersText[index]) {
              td.setAttribute('data-label', headersText[index])
            }
          })
        })
      }
      
      // Envolver en .table-wrap si no está ya envuelta
      if (!table.parentElement?.classList.contains('table-wrap')) {
        const wrapper = document.createElement('div')
        wrapper.className = 'table-wrap'
        table.parentElement?.insertBefore(wrapper, table)
        wrapper.appendChild(table)
      }
    })
  }

  /**
   * Ejecutar enhancement al montar
   */
  const observer = new MutationObserver((mutations) => {
    // Detectar si se añadió contenido nuevo (útil para SPA navigation)
    const hasNewContent = mutations.some(mutation => 
      Array.from(mutation.addedNodes).some(node => 
        node instanceof Element && (
          node.matches('table') || 
          node.querySelector('table')
        )
      )
    )
    
    if (hasNewContent) {
      enhanceResponsiveTables()
    }
  })

  // Observar cambios en el contenedor principal
  const observeContent = () => {
    const mainContent = document.querySelector('.prose')
    if (mainContent) {
      observer.observe(mainContent, {
        childList: true,
        subtree: true
      })
    }
  }

  // Ejecutar enhancement inicial y observar
  onNuxtReady(() => {
    enhanceResponsiveTables()
    observeContent()
  })

  // Cleanup
  window.addEventListener('beforeunload', () => {
    observer.disconnect()
  })

  // Exponer utilidad globalmente (opcional)
  return {
    provide: {
      enhanceTables: enhanceResponsiveTables
    }
  }
})

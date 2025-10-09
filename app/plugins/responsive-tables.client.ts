// ============================================================================
// ARCHIVO: app/plugins/responsive-tables.client.ts
// Progressive Enhancement para tablas responsive con cards en móvil
// Versión v2.0 - Compatible con hidratación de Nuxt 4
// ============================================================================

export default defineNuxtPlugin((nuxtApp) => {
  /**
   * Añade data-labels a las celdas de tabla para el modo card en móvil
   * NO manipula la estructura del DOM para evitar hydration mismatch
   */
  const enhanceResponsiveTables = () => {
    // Buscar todas las tablas dentro de .prose (contenido markdown)
    const tables = document.querySelectorAll('.prose table')
    
    if (tables.length === 0) {
      return
    }

    tables.forEach((table) => {
      // Si ya fue procesada, skip
      if (table.hasAttribute('data-responsive-enhanced')) return
      
      // Marcar como procesada
      table.setAttribute('data-responsive-enhanced', 'true')
      
      // Añadir clase responsive SI NO LA TIENE
      if (!table.classList.contains('responsive-table')) {
        table.classList.add('responsive-table')
      }
      
      // Extraer headers
      const thead = table.querySelector('thead')
      const headerCells = thead ? Array.from(thead.querySelectorAll('th')) : []
      const headersText = headerCells.map(th => th.textContent?.trim() || '')
      
      // Añadir data-label a cada celda según su columna
      if (headersText.length > 0) {
        table.querySelectorAll('tbody tr').forEach((row) => {
          const cells = row.querySelectorAll('td')
          cells.forEach((td, index) => {
            // Solo añadir si no existe ya
            if (!td.hasAttribute('data-label') && headersText[index]) {
              td.setAttribute('data-label', headersText[index])
            }
          })
        })
      }
      
      // IMPORTANTE: NO envolver en .table-wrap aquí
      // Eso debe hacerse en el componente ProseTable.vue para evitar hydration mismatch
    })
  }

  // Hook de Nuxt: ejecutar después de que la app esté montada
  nuxtApp.hook('app:mounted', () => {
    // Ejecutar enhancement después de la hidratación
    setTimeout(() => {
      enhanceResponsiveTables()
    }, 100)
  })

  // Hook para navegación SPA
  nuxtApp.hook('page:finish', () => {
    setTimeout(() => {
      enhanceResponsiveTables()
    }, 100)
  })

  // Exponer utilidad globalmente (por si se necesita llamar manualmente)
  return {
    provide: {
      enhanceTables: enhanceResponsiveTables
    }
  }
})

import { onMounted, watch, type Ref } from 'vue'

/**
 * Envuelve automáticamente todas las tablas en un contenedor scrollable
 * Replica el comportamiento de los artifacts de Claude
 */
export function useTableWrapper(contentElement: Ref<HTMLElement | null>) {
  
  const wrapTables = () => {
    if (!contentElement.value) return
    
    // Buscar todas las tablas en el contenido
    const tables = contentElement.value.querySelectorAll('table')
    
    tables.forEach((table) => {
      // Evitar envolver dos veces la misma tabla
      if (table.parentElement?.classList.contains('table-wrapper')) {
        return
      }
      
      // Crear el wrapper (contenedor con scroll)
      const wrapper = document.createElement('div')
      wrapper.className = 'table-wrapper'
      
      // Insertar el wrapper antes de la tabla
      table.parentNode?.insertBefore(wrapper, table)
      
      // Mover la tabla dentro del wrapper
      wrapper.appendChild(table)
      
      // Log para debugging (opcional)
      if (import.meta.dev) {
        console.log('✅ Tabla envuelta en wrapper scrollable')
      }
    })
  }
  
  // Observar cambios en el contentElement
  watch(contentElement, (newElement) => {
    if (newElement) {
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(wrapTables, 100)
    }
  }, { immediate: true })
  
  // También ejecutar al montar
  onMounted(() => {
    wrapTables()
  })
  
  return {
    wrapTables // Exportar por si se necesita ejecutar manualmente
  }
}

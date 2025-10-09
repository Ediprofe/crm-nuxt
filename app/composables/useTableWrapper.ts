import { watch, nextTick, type Ref } from 'vue'
import { TIMEOUTS } from '~/config/constants'

/**
 * Envuelve tablas en un contenedor scrollable
 * Versión ultra-robusta con múltiples intentos
 */
export function useTableWrapper(contentElement: Ref<HTMLElement | null>) {
  
  let attemptCount = 0
  const MAX_ATTEMPTS = 5
  
  const wrapTables = async () => {
    if (!contentElement.value) {
      if (attemptCount < MAX_ATTEMPTS) {
        attemptCount++
        setTimeout(wrapTables, 200)
      }
      return
    }
    
    await nextTick()
    
    const tables = contentElement.value.querySelectorAll('table')
    
    if (tables.length === 0) {
      if (attemptCount < MAX_ATTEMPTS) {
        attemptCount++
        setTimeout(wrapTables, 200)
      }
      return
    }
    
    tables.forEach((table) => {
      if (table.parentElement?.classList.contains('table-wrapper')) return
      
      const wrapper = document.createElement('div')
      wrapper.className = 'table-wrapper'
      table.parentNode?.insertBefore(wrapper, table)
      wrapper.appendChild(table)
    })
    
    attemptCount = 0 // Reset en caso de éxito
  }
  
  // Watch más agresivo
  watch(contentElement, (newElement) => {
    if (newElement) {
      attemptCount = 0
      // Múltiples intentos con delays incrementales
      setTimeout(wrapTables, TIMEOUTS.DOM_READY)
      setTimeout(wrapTables, 400)
      setTimeout(wrapTables, 600)
    }
  }, { immediate: true })
  
  return { wrapTables }
}

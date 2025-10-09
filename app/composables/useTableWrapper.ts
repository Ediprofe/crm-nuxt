import { onMounted, watch, nextTick, type Ref } from 'vue'
import { TIMEOUTS } from '~/config/constants'

/**
 * Envuelve automáticamente todas las tablas en un contenedor scrollable
 * Con detección robusta y manejo de errores
 */
export function useTableWrapper(contentElement: Ref<HTMLElement | null>) {
  
  let isProcessing = false
  
  const wrapTables = async () => {
    // Prevenir ejecución múltiple
    if (isProcessing) {
      console.log('⏳ Wrapper ya está procesando, esperando...')
      return
    }
    
    if (!contentElement.value) {
      console.warn('⚠️ contentElement no disponible')
      return
    }
    
    isProcessing = true
    
    try {
      // Esperar a que el DOM esté completamente listo
      await nextTick()
      
      const tables = contentElement.value.querySelectorAll('table')
      
      if (tables.length === 0) {
        console.log('ℹ️ No hay tablas para envolver')
        isProcessing = false
        return
      }
      
      console.log(`📊 Encontradas ${tables.length} tablas para envolver`)
      
      tables.forEach((table, index) => {
        // Evitar envolver dos veces
        if (table.parentElement?.classList.contains('table-wrapper')) {
          console.log(`⏭️ Tabla ${index + 1} ya está envuelta`)
          return
        }
        
        try {
          // Crear el wrapper
          const wrapper = document.createElement('div')
          wrapper.className = 'table-wrapper'
          wrapper.setAttribute('data-table-index', String(index))
          
          // Insertar el wrapper
          table.parentNode?.insertBefore(wrapper, table)
          wrapper.appendChild(table)
          
          console.log(`✅ Tabla ${index + 1} envuelta correctamente`)
        } catch (error) {
          console.error(`❌ Error envolviendo tabla ${index + 1}:`, error)
        }
      })
    } catch (error) {
      console.error('❌ Error general en wrapTables:', error)
    } finally {
      isProcessing = false
    }
  }
  
  // Observar cambios en el contentElement
  watch(contentElement, async (newElement) => {
    if (newElement) {
      console.log('👀 contentElement cambió, esperando renderizado...')
      // Esperar más tiempo para asegurar renderizado completo
      setTimeout(wrapTables, TIMEOUTS.DOM_READY + 100)
    }
  }, { immediate: true })
  
  // También ejecutar al montar
  onMounted(async () => {
    console.log('🎬 Componente montado, iniciando wrapper...')
    await nextTick()
    setTimeout(wrapTables, TIMEOUTS.DOM_READY)
  })
  
  return {
    wrapTables,
    isProcessing: () => isProcessing
  }
}

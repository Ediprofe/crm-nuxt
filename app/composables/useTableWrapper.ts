import { watch, nextTick, type Ref } from 'vue'

export function useTableWrapper(contentElement: Ref<HTMLElement | null>) {
  
  const wrapTables = async () => {
    if (!contentElement.value) return
    
    await nextTick()
    
    const tables = contentElement.value.querySelectorAll('table')
    
    tables.forEach((table) => {
      // Skip si ya está envuelta
      if (table.parentElement?.classList.contains('table-wrapper')) return
      
      const wrapper = document.createElement('div')
      wrapper.className = 'table-wrapper'
      table.parentNode?.insertBefore(wrapper, table)
      wrapper.appendChild(table)
    })
  }
  
  watch(contentElement, async (newElement) => {
    if (newElement) {
      // Esperar a que ContentRenderer termine
      await nextTick()
      setTimeout(wrapTables, 200)
      // Segundo intento por seguridad
      setTimeout(wrapTables, 500)
    }
  }, { immediate: true })
  
  return { wrapTables }
}

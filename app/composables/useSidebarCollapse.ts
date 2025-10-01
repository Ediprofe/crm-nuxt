import { ref, watch } from 'vue'

const STORAGE_KEY = 'ediprofe-sidebar-collapsed'

/**
 * Composable para manejar el estado de colapso del sidebar
 * Persiste la preferencia del usuario en localStorage
 */
export function useSidebarCollapse() {
  // Estado reactivo
  const isCollapsed = ref(false)
  
  /**
   * Inicializa el estado desde localStorage
   * Solo se ejecuta en el cliente
   */
  function initializeFromStorage() {
    if (typeof window === 'undefined') return
    
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      isCollapsed.value = stored === 'true'
    }
  }
  
  /**
   * Toggle del estado colapsado
   */
  function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value
  }
  
  /**
   * Expande el sidebar
   */
  function expandSidebar() {
    isCollapsed.value = false
  }
  
  /**
   * Colapsa el sidebar
   */
  function collapseSidebar() {
    isCollapsed.value = true
  }
  
  // Watch para persistir cambios en localStorage
  watch(isCollapsed, (newValue) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, String(newValue))
    }
  })
  
  // Inicializar desde localStorage
  if (typeof window !== 'undefined') {
    initializeFromStorage()
  }
  
  return {
    isCollapsed,
    toggleSidebar,
    expandSidebar,
    collapseSidebar
  }
}


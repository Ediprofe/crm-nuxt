import { ref } from 'vue'
import { GESTURES } from '~/config/constants'

/**
 * Composable para manejar el estado del sheet de TOC
 * Incluye lógica de apertura/cierre y detección de scroll
 */
export function useTocSheet() {
  const isOpen = ref(false)
  const shouldShowFab = ref(false)
  
  /**
   * Abre el sheet y previene scroll del body
   */
  const openSheet = () => {
    isOpen.value = true
    // Prevenir scroll del body cuando sheet está abierto
    document.body.style.overflow = 'hidden'
  }
  
  /**
   * Cierra el sheet y restaura scroll del body
   */
  const closeSheet = () => {
    isOpen.value = false
    document.body.style.overflow = ''
  }
  
  /**
   * Toggle del sheet
   */
  const toggleSheet = () => {
    if (isOpen.value) {
      closeSheet()
    } else {
      openSheet()
    }
  }
  
  /**
   * Detectar scroll para mostrar/ocultar FAB
   * Solo se muestra después de scrollear SCROLL_THRESHOLD pixeles
   */
  const handleScroll = () => {
    shouldShowFab.value = window.scrollY > GESTURES.SCROLL_THRESHOLD
  }
  
  return {
    isOpen,
    shouldShowFab,
    openSheet,
    closeSheet,
    toggleSheet,
    handleScroll
  }
}


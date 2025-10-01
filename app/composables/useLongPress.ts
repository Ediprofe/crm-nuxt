import { ref, onUnmounted } from 'vue'
import { GESTURES } from '~/config/constants'

/**
 * Composable para detectar long press en un elemento
 * Útil para gestos táctiles en móvil
 */
export function useLongPress(callback: () => void) {
  const isPressed = ref(false)
  let pressTimer: NodeJS.Timeout | null = null
  let element: HTMLElement | null = null
  
  const startPress = (e: TouchEvent | MouseEvent) => {
    isPressed.value = true
    
    pressTimer = setTimeout(() => {
      // Vibración háptica (si disponible)
      if ('vibrate' in navigator) {
        navigator.vibrate(GESTURES.HAPTIC_FEEDBACK_DURATION)
      }
      
      callback()
      isPressed.value = false
    }, GESTURES.LONG_PRESS_DURATION)
  }
  
  const endPress = () => {
    if (pressTimer) {
      clearTimeout(pressTimer)
      pressTimer = null
    }
    isPressed.value = false
  }
  
  const bindElement = (el: HTMLElement) => {
    element = el
    
    // Touch events (móvil)
    element.addEventListener('touchstart', startPress as EventListener, { passive: true })
    element.addEventListener('touchend', endPress, { passive: true })
    element.addEventListener('touchcancel', endPress, { passive: true })
    
    // Mouse events (desktop fallback)
    element.addEventListener('mousedown', startPress as EventListener)
    element.addEventListener('mouseup', endPress)
    element.addEventListener('mouseleave', endPress)
  }
  
  const unbindElement = () => {
    if (element) {
      element.removeEventListener('touchstart', startPress as EventListener)
      element.removeEventListener('touchend', endPress)
      element.removeEventListener('touchcancel', endPress)
      element.removeEventListener('mousedown', startPress as EventListener)
      element.removeEventListener('mouseup', endPress)
      element.removeEventListener('mouseleave', endPress)
    }
  }
  
  onUnmounted(() => {
    endPress()
    unbindElement()
  })
  
  return {
    isPressed,
    bindElement,
    unbindElement
  }
}


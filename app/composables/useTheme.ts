import { ref } from 'vue'
import { STORAGE_KEYS } from '~/config/constants'

export type Theme = 'light' | 'dark'

// Estado reactivo compartido globalmente (singleton)
const isDark = ref(false) // Por defecto: tema CLARO (mejor para móviles)
const STORAGE_KEY = STORAGE_KEYS.THEME

// Inicializar el estado basado en el DOM (el plugin ya aplicó la clase)
if (typeof window !== 'undefined') {
  isDark.value = document.documentElement.classList.contains('dark')
}

export function useTheme() {
  // Aplicar tema al DOM
  const applyTheme = () => {
    if (typeof document === 'undefined') return

    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Toggle entre dark/light
  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  // Establecer tema específico
  const setTheme = (theme: Theme) => {
    isDark.value = theme === 'dark'
    localStorage.setItem(STORAGE_KEY, theme)
    applyTheme()
  }

  // Obtener el tema actual
  const currentTheme = (): Theme => (isDark.value ? 'dark' : 'light')

  return {
    isDark,
    currentTheme,
    toggleTheme,
    setTheme
  }
}
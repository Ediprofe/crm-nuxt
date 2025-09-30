/**
 * Plugin para inicializar el tema antes del render
 * Evita el "flash" de tema incorrecto al cargar la página
 */
export default defineNuxtPlugin(() => {
  // Solo ejecutar en el cliente
  if (typeof window === 'undefined') return

  const STORAGE_KEY = 'ediprofe-theme'

  // Función para aplicar el tema inmediatamente
  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Leer preferencia guardada o usar tema claro por defecto
  const stored = localStorage.getItem(STORAGE_KEY)
  
  // Debug: mostrar qué se está aplicando
  console.log('[Theme Plugin] localStorage:', stored || 'no guardado')
  
  if (stored) {
    // Usar preferencia guardada
    console.log('[Theme Plugin] Aplicando tema guardado:', stored)
    applyTheme(stored === 'dark')
  } else {
    // Tema claro por defecto
    console.log('[Theme Plugin] Aplicando tema por defecto: light')
    applyTheme(false)
  }

  // Helper global para debug (solo en desarrollo)
  if (import.meta.dev) {
    // @ts-ignore
    window.resetTheme = () => {
      localStorage.removeItem(STORAGE_KEY)
      console.log('✅ Tema reseteado. Recargando página...')
      location.reload()
    }
    console.log('💡 Tip: Ejecuta window.resetTheme() para resetear el tema')
  }
})

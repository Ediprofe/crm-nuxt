import { ref, computed, watch } from 'vue'
import { 
  searchInElement, 
  clearHighlights, 
  highlightMatches, 
  scrollToHighlight,
  type SearchMatch 
} from '~/utils/search'
import { SEARCH_CONFIG, DEFAULTS, TIMEOUTS } from '~/config/constants'

export function useContentSearch(contentElement: Ref<HTMLElement | null>) {
  // Estado
  const query = ref('')
  const currentIndex = ref(0)
  const matches = ref<SearchMatch[]>([])
  const isSearching = ref(false)
  const totalMatches = ref(0)
  
  // Computed
  const hasQuery = computed(() => query.value.trim().length >= SEARCH_CONFIG.MIN_QUERY_LENGTH)
  const hasResults = computed(() => matches.value.length > 0)
  const currentMatch = computed(() => matches.value[currentIndex.value] || null)
  
  // Debounced search
  let searchTimeout: NodeJS.Timeout | null = null
  
  /**
   * Ejecuta la búsqueda en el contenido
   */
  function performSearch() {
    if (!contentElement.value || !hasQuery.value) {
      clearSearch()
      return
    }
    
    isSearching.value = true
    
    // Limpiar highlights previos
    clearHighlights(contentElement.value)
    
    // Buscar coincidencias
    const foundMatches = searchInElement(contentElement.value, query.value.trim())
    matches.value = foundMatches
    
    // Resaltar todas las coincidencias
    const count = highlightMatches(
      contentElement.value,
      query.value.trim(),
      0, // Primera coincidencia activa por defecto
      SEARCH_CONFIG.HIGHLIGHT_CLASS,
      SEARCH_CONFIG.ACTIVE_HIGHLIGHT_CLASS
    )
    
    totalMatches.value = count
    currentIndex.value = 0
    
    // Scroll a la primera coincidencia
    if (count > 0) {
      setTimeout(() => {
        scrollToHighlight(contentElement.value!, 0, DEFAULTS.HEADER_HEIGHT, DEFAULTS.SEARCH_SCROLL_PADDING)
      }, TIMEOUTS.MEDIA_PROCESSING)
    }
    
    isSearching.value = false
  }
  
  /**
   * Limpia la búsqueda
   */
  function clearSearch() {
    if (contentElement.value) {
      clearHighlights(contentElement.value)
    }
    matches.value = []
    totalMatches.value = 0
    currentIndex.value = 0
    isSearching.value = false
  }
  
  /**
   * Navega al siguiente resultado
   */
  function goToNext() {
    if (!hasResults.value || !contentElement.value) return
    
    const newIndex = (currentIndex.value + 1) % totalMatches.value
    updateActiveHighlight(newIndex)
  }
  
  /**
   * Navega al resultado anterior
   */
  function goToPrevious() {
    if (!hasResults.value || !contentElement.value) return
    
    const newIndex = currentIndex.value === 0 
      ? totalMatches.value - 1 
      : currentIndex.value - 1
    updateActiveHighlight(newIndex)
  }
  
  /**
   * Actualiza el highlight activo
   */
  function updateActiveHighlight(newIndex: number) {
    if (!contentElement.value) return
    
    // Remover clase activa del anterior
    const prevActive = contentElement.value.querySelector('mark[data-search-active="true"]')
    if (prevActive) {
      prevActive.removeAttribute('data-search-active')
      prevActive.className = SEARCH_CONFIG.HIGHLIGHT_CLASS
    }
    
    // Agregar clase activa al nuevo
    const newActive = contentElement.value.querySelector(`mark[data-search-index="${newIndex}"]`)
    if (newActive) {
      newActive.setAttribute('data-search-active', 'true')
      newActive.className = SEARCH_CONFIG.ACTIVE_HIGHLIGHT_CLASS
    }
    
    currentIndex.value = newIndex
    
    // Scroll al nuevo activo
    scrollToHighlight(contentElement.value, newIndex, DEFAULTS.HEADER_HEIGHT, DEFAULTS.SEARCH_SCROLL_PADDING)
  }
  
  /**
   * Reinicia la búsqueda
   */
  function resetSearch() {
    query.value = ''
    clearSearch()
  }
  
  // Watch query con debounce
  watch(query, (newQuery) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    
    if (newQuery.trim().length < SEARCH_CONFIG.MIN_QUERY_LENGTH) {
      clearSearch()
      return
    }
    
    searchTimeout = setTimeout(() => {
      performSearch()
    }, SEARCH_CONFIG.DEBOUNCE_DELAY)
  })
  
  // Limpiar al desmontar o cambiar contenido
  watch(contentElement, (newContent) => {
    if (!newContent) {
      clearSearch()
    }
  })
  
  return {
    // Estado
    query,
    currentIndex,
    matches,
    totalMatches,
    isSearching,
    
    // Computed
    hasQuery,
    hasResults,
    currentMatch,
    
    // Métodos
    performSearch,
    clearSearch,
    goToNext,
    goToPrevious,
    resetSearch
  }
}


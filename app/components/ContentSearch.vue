<script setup lang="ts">
import { ref, computed } from 'vue'
import { useContentSearch } from '~/composables/useContentSearch'
import { Z_INDEX } from '~/config/constants'

// Props
const props = defineProps<{
  contentElement: HTMLElement | null
}>()

// Estado local
const isOpen = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

// Composable de búsqueda
const {
  query,
  currentIndex,
  totalMatches,
  hasQuery,
  hasResults,
  goToNext,
  goToPrevious,
  resetSearch
} = useContentSearch(computed(() => props.contentElement))

// Computed
const resultsText = computed(() => {
  if (!hasResults.value) return 'Sin resultados'
  return `${currentIndex.value + 1} de ${totalMatches.value}`
})

/**
 * Abre la barra de búsqueda y enfoca el input
 */
function openSearch() {
  isOpen.value = true
  setTimeout(() => {
    inputRef.value?.focus()
  }, 100)
}

/**
 * Cierra la barra de búsqueda
 */
function closeSearch() {
  isOpen.value = false
  resetSearch()
}

/**
 * Maneja el evento de teclado
 */
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeSearch()
  } else if (event.key === 'Enter') {
    event.preventDefault()
    if (event.shiftKey) {
      goToPrevious()
    } else {
      goToNext()
    }
  }
}
</script>

<template>
  <div class="content-search">
    <!-- Botón flotante (solo visible cuando está cerrado) -->
    <Transition name="fade">
      <button
        v-if="!isOpen"
        @click="openSearch"
        class="search-fab"
        :style="{ zIndex: Z_INDEX.SEARCH_BUTTON }"
        aria-label="Abrir búsqueda"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </Transition>

    <!-- Barra de búsqueda expandible -->
    <Transition name="slide-up">
      <div
        v-if="isOpen"
        class="search-bar"
        :style="{ zIndex: Z_INDEX.SEARCH_BAR }"
      >
        <div class="search-container">
          <!-- Input de búsqueda -->
          <div class="search-input-wrapper">
            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            
            <input
              ref="inputRef"
              v-model="query"
              type="search"
              placeholder="Buscar en la página..."
              class="search-input"
              @keydown="handleKeydown"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
            />
            
            <!-- Botón clear -->
            <button
              v-if="hasQuery"
              @click="resetSearch"
              class="clear-button"
              aria-label="Limpiar búsqueda"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Controles de navegación -->
          <div v-if="hasQuery" class="search-controls">
            <!-- Contador de resultados -->
            <span class="results-count">
              {{ resultsText }}
            </span>

            <!-- Botones prev/next -->
            <div class="nav-buttons">
              <button
                @click="goToPrevious"
                :disabled="!hasResults"
                class="nav-button"
                aria-label="Resultado anterior"
                title="Anterior (Shift + Enter)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              
              <button
                @click="goToNext"
                :disabled="!hasResults"
                class="nav-button"
                aria-label="Resultado siguiente"
                title="Siguiente (Enter)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <!-- Botón cerrar -->
            <button
              @click="closeSearch"
              class="close-button"
              aria-label="Cerrar búsqueda"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Botón flotante (FAB) */
.search-fab {
  @apply fixed bottom-6 right-6;
  @apply w-14 h-14 rounded-full;
  @apply bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600;
  @apply text-white shadow-lg;
  @apply flex items-center justify-center;
  @apply transition-all duration-200;
  @apply active:scale-95;
}

.search-fab:hover {
  @apply shadow-xl scale-110;
}

/* Barra de búsqueda */
.search-bar {
  @apply fixed bottom-6 left-4 right-4;
  @apply md:left-6 md:right-6;
  @apply lg:left-auto lg:right-6 lg:w-[500px];
}

.search-container {
  @apply bg-white dark:bg-gray-800;
  @apply rounded-full shadow-2xl;
  @apply border border-gray-200 dark:border-gray-700;
  @apply p-2;
  @apply flex flex-col gap-2;
  @apply transition-colors;
}

/* Input wrapper */
.search-input-wrapper {
  @apply relative flex items-center;
}

.search-icon {
  @apply absolute left-3 w-5 h-5;
  @apply text-gray-400 dark:text-gray-500;
  @apply pointer-events-none;
}

.search-input {
  @apply w-full pl-10 pr-10 py-2;
  @apply bg-transparent;
  @apply text-gray-900 dark:text-gray-100;
  @apply placeholder-gray-400 dark:placeholder-gray-500;
  @apply outline-none;
  @apply text-sm;
}

.search-input::-webkit-search-cancel-button {
  @apply hidden;
}

.clear-button {
  @apply absolute right-2;
  @apply p-1 rounded-full;
  @apply text-gray-400 hover:text-gray-600;
  @apply dark:text-gray-500 dark:hover:text-gray-300;
  @apply hover:bg-gray-100 dark:hover:bg-gray-700;
  @apply transition-colors;
}

/* Controles de navegación */
.search-controls {
  @apply flex items-center justify-between;
  @apply px-3 py-1;
  @apply border-t border-gray-200 dark:border-gray-700;
}

.results-count {
  @apply text-xs text-gray-600 dark:text-gray-400;
  @apply font-medium;
}

.nav-buttons {
  @apply flex items-center gap-1;
}

.nav-button {
  @apply p-1.5 rounded-md;
  @apply text-gray-600 dark:text-gray-400;
  @apply hover:bg-gray-100 dark:hover:bg-gray-700;
  @apply hover:text-gray-900 dark:hover:text-gray-200;
  @apply disabled:opacity-30 disabled:cursor-not-allowed;
  @apply transition-colors;
}

.nav-button:disabled:hover {
  @apply bg-transparent text-gray-600 dark:text-gray-400;
}

.close-button {
  @apply p-1.5 rounded-md;
  @apply text-gray-600 dark:text-gray-400;
  @apply hover:bg-gray-100 dark:hover:bg-gray-700;
  @apply hover:text-gray-900 dark:hover:text-gray-200;
  @apply transition-colors;
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-200;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  @apply transition-all duration-300;
}

.slide-up-enter-from,
.slide-up-leave-to {
  @apply opacity-0 translate-y-4;
}
</style>


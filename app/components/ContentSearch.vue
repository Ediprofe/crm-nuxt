<script setup lang="ts">
import { ref, computed } from 'vue'
import { useContentSearch } from '~/composables/useContentSearch'
import { Z_INDEX, TIMEOUTS } from '~/config/constants'

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
  }, TIMEOUTS.FOCUS_DELAY)
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
        class="fixed bottom-6 right-6 w-14 h-14 rounded-full
               bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
               text-white shadow-lg hover:shadow-xl hover:scale-110
               flex items-center justify-center
               transition-all duration-200 active:scale-95"
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
        class="fixed bottom-6 left-20 right-4
               md:left-6 md:right-6
               lg:left-auto lg:right-6 lg:w-[500px]"
        :style="{ zIndex: Z_INDEX.SEARCH_BAR }"
      >
        <div class="bg-card
                    rounded-full shadow-2xl
                    border border-primary
                    p-2 flex flex-col gap-2
                    transition-colors">
          <!-- Input de búsqueda -->
          <div class="relative flex items-center">
            <svg class="absolute left-3 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            
            <input
              ref="inputRef"
              v-model="query"
              type="search"
              placeholder="Buscar en la página..."
              class="w-full pl-10 pr-10 py-2
                     bg-transparent
                     text-primary
                     placeholder-gray-400
                     outline-none text-sm
                     [&::-webkit-search-cancel-button]:hidden"
              @keydown="handleKeydown"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
            />
            
            <!-- Botón adaptativo: clear (con texto) o close (sin texto) -->
            <button
              v-if="hasQuery"
              @click="resetSearch"
              class="absolute right-2 p-1 rounded-full
                     text-muted hover:text-secondary
                     
                     hover:bg-secondary
                     transition-colors"
              aria-label="Limpiar búsqueda"
              title="Limpiar texto"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <!-- Botón cerrar barra (solo visible cuando no hay texto) -->
            <button
              v-else
              @click="closeSearch"
              class="absolute right-2 p-1 rounded-full
                     text-muted hover:text-secondary
                     
                     hover:bg-secondary
                     transition-colors"
              aria-label="Cerrar búsqueda"
              title="Cerrar barra de búsqueda"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <!-- Controles de navegación -->
          <div v-if="hasQuery" class="flex items-center justify-between px-3 py-1 border-t border-primary">
            <!-- Contador de resultados -->
            <span class="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {{ resultsText }}
            </span>

            <!-- Botones prev/next -->
            <div class="flex items-center gap-1">
              <button
                @click="goToPrevious"
                :disabled="!hasResults"
                class="p-1.5 rounded-md
                       text-gray-600 dark:text-gray-400
                       hover:bg-secondary
                       hover:text-gray-900 dark:hover:text-gray-200
                       disabled:opacity-30 disabled:cursor-not-allowed
                       transition-colors"
                :class="{ 'hover:bg-transparent hover:text-gray-600 dark:hover:text-gray-400': !hasResults }"
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
                class="p-1.5 rounded-md
                       text-gray-600 dark:text-gray-400
                       hover:bg-secondary
                       hover:text-gray-900 dark:hover:text-gray-200
                       disabled:opacity-30 disabled:cursor-not-allowed
                       transition-colors"
                :class="{ 'hover:bg-transparent hover:text-gray-600 dark:hover:text-gray-400': !hasResults }"
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
              class="p-1.5 rounded-md
                     text-gray-600 dark:text-gray-400
                     hover:bg-secondary
                     hover:text-gray-900 dark:hover:text-gray-200
                     transition-colors"
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
/* Animaciones (estas SÍ pueden usar transiciones CSS puras) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>

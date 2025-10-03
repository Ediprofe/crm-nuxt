<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { TIMEOUTS, DEFAULTS } from '~/config/constants'
import { extractCleanHeadingText } from '~/utils/search'
import type { TocItem } from '~/types/content'

const props = defineProps<{
  contentElement: HTMLElement | null
  variant?: 'sidebar' | 'accordion' // Controla la presentación
  isCollapsed?: boolean // Estado de colapso (solo sidebar)
}>()

const emit = defineEmits<{
  toggleCollapse: []
}>()

const tocItems = ref<TocItem[]>([])
const activeId = ref<string>('')
const isMobileMenuOpen = ref(false)

// Función para medir y actualizar la altura del header dinámicamente
function updateHeaderHeight() {
  const header = document.querySelector('header')
  if (header) {
    const headerHeight = header.offsetHeight
    // Actualizar la variable CSS global
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
  }
}

// Función auxiliar para obtener offsetTop real (considerando todos los padres)
function getElementOffsetTop(element: HTMLElement): number {
  let offsetTop = 0
  let currentElement: HTMLElement | null = element
  
  while (currentElement) {
    offsetTop += currentElement.offsetTop
    currentElement = currentElement.offsetParent as HTMLElement | null
  }
  
  return offsetTop
}

// Extraer headings del contenido renderizado
function extractHeadings() {
  if (!props.contentElement) return

  const headings = props.contentElement.querySelectorAll('h2, h3')
  const items: TocItem[] = []

  headings.forEach((heading) => {
    const tagChar = heading.tagName[1]
    if (!tagChar) return
    
    const level = parseInt(tagChar, 10) // "H2" -> 2
    let id = heading.id

    // Extraer texto limpio manejando LaTeX/KaTeX
    const cleanText = extractCleanHeadingText(heading as HTMLElement)

    // Si el heading no tiene ID, crear uno basado en el texto limpio
    if (!id) {
      id = cleanText.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-') || ''
      heading.id = id
    }

    items.push({
      id,
      text: cleanText,
      level
    })
  })

  tocItems.value = items
  
  // Establecer el primero como activo por defecto
  if (items.length > 0 && items[0]) {
    activeId.value = items[0].id
  }
}

// Scroll suave al heading - Simplificado usando hash navigation
// El CSS scroll-margin-top hace el trabajo pesado
function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  if (!element) return

  // Actualizar la URL hash sin saltar
  history.pushState(null, '', `#${id}`)
  
  // Scroll suave - el CSS scroll-margin-top maneja el offset automáticamente
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })

  activeId.value = id
  
  // Cerrar menú móvil después de seleccionar (solo en modo accordion)
  if (props.variant === 'accordion') {
    isMobileMenuOpen.value = false
  }
}

// Actualizar heading activo según scroll
function updateActiveHeading() {
  if (tocItems.value.length === 0) return

  // Obtener la altura actual del header
  const header = document.querySelector('header')
  const headerHeight = header ? header.offsetHeight : DEFAULTS.HEADER_HEIGHT
  
  // Posición actual del scroll + threshold pequeño para detectar el heading visible
  const scrollPosition = window.scrollY + headerHeight + DEFAULTS.SCROLL_OFFSET

  // Encontrar el heading más cercano visible (iterar desde el final)
  for (let i = tocItems.value.length - 1; i >= 0; i--) {
    const item = tocItems.value[i]
    if (!item) continue
    
    const element = document.getElementById(item.id)
    
    if (element) {
      const elementTop = getElementOffsetTop(element)
      
      if (scrollPosition >= elementTop) {
        activeId.value = item.id
        return
      }
    }
  }

  // Si no encontró ninguno, activar el primero
  const firstItem = tocItems.value[0]
  if (firstItem) {
    activeId.value = firstItem.id
  }
}

// Observar cambios en contentElement
watch(() => props.contentElement, async (newVal) => {
  if (newVal) {
    await nextTick()
    setTimeout(() => {
      extractHeadings()
      updateHeaderHeight() // Actualizar altura del header cuando cambia el contenido
    }, TIMEOUTS.DOM_READY)
  }
}, { immediate: true })

// Listeners de scroll y resize
onMounted(() => {
  // Actualizar altura del header al montar
  updateHeaderHeight()
  
  // Escuchar scroll para actualizar el heading activo
  window.addEventListener('scroll', updateActiveHeading, { passive: true })
  
  // Escuchar resize para actualizar la altura del header si cambia
  window.addEventListener('resize', updateHeaderHeight, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveHeading)
  window.removeEventListener('resize', updateHeaderHeight)
})

// Computar si hay contenido para mostrar
const hasToc = computed(() => tocItems.value.length > 0)

// Exponer datos para uso externo (ej: TocSheet en móvil)
defineExpose({
  tocItems,
  activeId
})
</script>

<template>
  <!-- VARIANTE SIDEBAR: Desktop/Tablet lateral fijo -->
  <aside v-if="hasToc && variant === 'sidebar'" class="sidebar transition-colors border-r" style="background-color: var(--bg-sidebar); border-color: var(--border-color);">
    <div class="sidebar-content">
      <div class="sidebar-header" style="border-color: var(--accent-primary);">
        <div class="flex items-center justify-between">
          <h3 class="sidebar-title transition-colors" style="color: var(--text-primary);">Tabla de contenidos</h3>
          
          <!-- Botón para colapsar sidebar -->
          <button
            @click="emit('toggleCollapse')"
            class="p-1.5 rounded-md transition-all hover-btn"
            style="color: var(--text-muted);"
            aria-label="Colapsar tabla de contenidos"
            title="Colapsar sidebar"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <ul class="sidebar-list">
          <li
            v-for="item in tocItems"
            :key="item.id"
            class="sidebar-item"
          >
            <a
              @click.prevent="scrollToHeading(item.id)"
              href="#"
              class="sidebar-link transition-all"
              :class="[
                item.level === 3 ? 'sidebar-link-sub' : '',
                activeId === item.id ? 'sidebar-link-active' : ''
              ]"
              :style="activeId === item.id ? {
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--accent-primary)',
                borderLeftColor: 'var(--accent-primary)',
                fontWeight: '600'
              } : {
                color: 'var(--text-secondary)',
                borderLeftColor: 'transparent'
              }"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>

  <!-- VARIANTE ACCORDION: Móvil colapsable -->
  <div v-else-if="hasToc && variant === 'accordion'" class="table-of-contents">
    <div class="mb-6">
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span class="font-semibold text-gray-900 dark:text-gray-100">Tabla de contenidos</span>
        </div>
        <svg 
          class="w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform"
          :class="{ 'rotate-180': isMobileMenuOpen }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        class="overflow-hidden transition-all duration-300"
        :style="{ maxHeight: isMobileMenuOpen ? DEFAULTS.TOC_MAX_HEIGHT_MOBILE : '0' }"
      >
        <nav class="mt-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <ul class="py-2">
            <li
              v-for="item in tocItems"
              :key="item.id"
            >
              <a
                @click.prevent="scrollToHeading(item.id)"
                href="#"
                class="block px-4 py-2 text-sm transition-colors"
                :class="[
                  item.level === 3 ? 'pl-8' : 'pl-4',
                  activeId === item.id 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium border-l-4 border-blue-600 dark:border-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 border-transparent'
                ]"
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ========================================
   ESTILOS SIDEBAR (Desktop/Tablet)
   ======================================== */
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  padding: 1.5rem;
}

.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid;
  transition: border-color 0.2s ease;
}

.sidebar-title {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hover-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
}

/* Scrollbar personalizada */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: var(--border-hover);
}

.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-item {
  margin-bottom: 0.25rem;
}

.sidebar-link {
  display: block;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  text-decoration: none;
  border-radius: 0.5rem;
  border-left: 3px solid;
  cursor: pointer;
}

.sidebar-link:hover:not(.sidebar-link-active) {
  background-color: var(--bg-secondary);
}

.sidebar-link-sub {
  padding-left: 1.5rem;
  font-size: 0.8125rem;
}
</style>
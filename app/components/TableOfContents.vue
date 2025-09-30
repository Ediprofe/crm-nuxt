<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

interface TocItem {
  id: string
  text: string
  level: number // 2 para H2, 3 para H3
}

const props = defineProps<{
  contentElement: HTMLElement | null
}>()

const tocItems = ref<TocItem[]>([])
const activeId = ref<string>('')
const isMobileMenuOpen = ref(false)

// Constante para ajuste fino del scroll (altura del header + padding deseado)
const HEADER_OFFSET = 110 // Ajuste para que el título quede visible debajo del header

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

    // Si el heading no tiene ID, crear uno basado en el texto
    if (!id) {
      id = heading.textContent?.trim().toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-') || ''
      heading.id = id
    }

    items.push({
      id,
      text: heading.textContent?.trim() || '',
      level
    })
  })

  tocItems.value = items
  
  // Establecer el primero como activo por defecto
  if (items.length > 0 && items[0]) {
    activeId.value = items[0].id
  }
}

// Scroll suave al heading - ESTRATEGIA ROBUSTA CON offsetTop
function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  if (!element) return

  // Usar offsetTop que es más confiable (posición relativa al documento, no al viewport)
  const elementOffsetTop = getElementOffsetTop(element)
  
  // Calcular la posición final: posición del elemento - offset del header
  // Esto deja el título justo debajo del header sticky
  const targetPosition = elementOffsetTop - HEADER_OFFSET

  // Scroll directo a la posición calculada
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  })

  activeId.value = id
  
  // Cerrar menú móvil después de seleccionar
  if (window.innerWidth < 1024) {
    isMobileMenuOpen.value = false
  }
}

// Actualizar heading activo según scroll
function updateActiveHeading() {
  if (tocItems.value.length === 0) return

  // Posición actual del scroll + un threshold para detectar el heading visible
  const scrollPosition = window.scrollY + HEADER_OFFSET + 50

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
    }, 200)
  }
}, { immediate: true })

// Listener de scroll
onMounted(() => {
  window.addEventListener('scroll', updateActiveHeading, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveHeading)
})

// Computar si hay contenido para mostrar
const hasToc = computed(() => tocItems.value.length > 0)
</script>

<template>
  <div v-if="hasToc" class="table-of-contents">
    <!-- Acordeón colapsable (TODAS las pantallas) -->
    <div class="mb-6">
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="w-full bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span class="font-semibold text-gray-900">Tabla de contenidos</span>
        </div>
        <svg 
          class="w-5 h-5 text-gray-400 transition-transform"
          :class="{ 'rotate-180': isMobileMenuOpen }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Contenido del acordeón -->
      <div
        class="overflow-hidden transition-all duration-300"
        :style="{ maxHeight: isMobileMenuOpen ? '500px' : '0' }"
      >
        <nav class="mt-3 bg-white rounded-lg border border-gray-200 shadow-sm">
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
                    ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
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

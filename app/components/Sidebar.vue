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

// Función auxiliar para obtener offsetTop real
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
    
    const level = parseInt(tagChar, 10)
    let id = heading.id

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
  
  if (items.length > 0 && items[0]) {
    activeId.value = items[0].id
  }
}

// Scroll suave al heading - Usando scrollIntoView con CSS scroll-margin-top
function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  if (!element) return

  // Actualizar la URL hash
  history.pushState(null, '', `#${id}`)
  
  // Scroll suave - el CSS scroll-margin-top maneja el offset automáticamente
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })

  activeId.value = id
}

// Actualizar heading activo según scroll
function updateActiveHeading() {
  if (tocItems.value.length === 0) return

  // Obtener la altura actual del header dinámicamente
  const header = document.querySelector('header')
  const headerHeight = header ? header.offsetHeight : 93
  
  const scrollPosition = window.scrollY + headerHeight + 10

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
  <aside v-if="hasToc" class="sidebar">
    <!-- Sidebar fijo para tablets y desktop -->
    <div class="sidebar-content">
      <div class="sidebar-header">
        <h3 class="sidebar-title">Tabla de contenidos</h3>
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
              class="sidebar-link"
              :class="[
                item.level === 3 ? 'sidebar-link-sub' : '',
                activeId === item.id ? 'sidebar-link-active' : ''
              ]"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  /* Sticky dentro del grid - Se ajusta automáticamente */
  position: sticky;
  top: 0;
  height: 100vh;
  background: white;
  border-right: 1px solid rgb(229 231 235);
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
  border-bottom: 2px solid rgb(59 130 246);
}

.sidebar-title {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgb(17 24 39);
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
  background: rgb(243 244 246);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgb(209 213 219);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgb(156 163 175);
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
  color: rgb(75 85 99);
  text-decoration: none;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.sidebar-link:hover {
  background: rgb(243 244 246);
  color: rgb(17 24 39);
}

.sidebar-link-active {
  background: rgb(239 246 255);
  color: rgb(29 78 216);
  font-weight: 600;
  border-left-color: rgb(59 130 246);
}

.sidebar-link-sub {
  padding-left: 1.5rem;
  font-size: 0.8125rem;
}
</style>
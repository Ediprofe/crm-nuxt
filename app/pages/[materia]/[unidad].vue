<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { materiasConfig } from '~/config/materias'
import { DEFAULTS, TIMEOUTS, SIDEBAR } from '~/config/constants'
import { useTocSheet } from '~/composables/useTocSheet'
import { useSidebarCollapse } from '~/composables/useSidebarCollapse'
import type TableOfContents from '~/components/TableOfContents.vue'
import type { ContentItem, TocItem } from '~/types/content'

const route = useRoute()
const materia = route.params.materia as string
const unidadSlug = route.params.unidad as string

// Buscar el contenido usando queryCollection (API de @nuxt/content v3.7+)
const { data: unidad } = await useAsyncData(`${materia}-${unidadSlug}`, async () => {
  // Obtener todos los archivos de la colección "content"
  const items = await queryCollection('content').all() as ContentItem[]
  
  // Filtrar por materia y slug
  const found = items.find((item: ContentItem) => 
    item.path?.includes(`/${materia}/`) && item.path?.includes(unidadSlug)
  )
  
  return found || null
})

const configMateria = materiasConfig[materia as keyof typeof materiasConfig]

// Referencias para el procesador de enlaces multimedia
const contentRef = ref<HTMLElement | null>(null)
const contentElement = ref<HTMLElement | null>(null)

// Referencia al componente TableOfContents (sidebar para desktop)
const tocSidebarRef = ref<InstanceType<typeof TableOfContents> | null>(null)

// TOC Sheet para móvil
const { isOpen, shouldShowFab, openSheet, closeSheet, handleScroll } = useTocSheet()

// Sidebar collapse para desktop
const { isCollapsed, toggleSidebar, expandSidebar } = useSidebarCollapse()

// Computed para el ancho del sidebar
const sidebarWidth = computed(() => 
  isCollapsed.value ? SIDEBAR.COLLAPSED_WIDTH : SIDEBAR.WIDTH
)

// Estado local para headings extraídos directamente del contenido
const extractedTocItems = ref<TocItem[]>([])
const extractedActiveId = ref<string>('')

/**
 * Extrae headings (H2, H3) directamente del contentElement
 * Función independiente que no depende del componente TableOfContents
 */
function extractHeadingsFromContent() {
  if (!contentElement.value) {
    extractedTocItems.value = []
    return
  }

  const headings = contentElement.value.querySelectorAll('h2, h3')
  const items: TocItem[] = []

  headings.forEach((heading) => {
    const tagChar = heading.tagName[1]
    if (!tagChar) return
    
    const level = parseInt(tagChar, 10) // "H2" -> 2, "H3" -> 3
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

  extractedTocItems.value = items
  
  // Establecer el primero como activo por defecto
  if (items.length > 0 && items[0]) {
    extractedActiveId.value = items[0].id
  }
}

/**
 * Actualiza el heading activo basado en la posición de scroll
 */
function updateActiveHeading() {
  if (extractedTocItems.value.length === 0) return

  const headerHeight = DEFAULTS.HEADER_HEIGHT
  const scrollPosition = window.scrollY + headerHeight + DEFAULTS.SCROLL_OFFSET

  // Encontrar el heading más cercano visible (iterar desde el final)
  for (let i = extractedTocItems.value.length - 1; i >= 0; i--) {
    const item = extractedTocItems.value[i]
    if (!item) continue
    
    const element = document.getElementById(item.id)
    
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY
      
      if (scrollPosition >= elementTop) {
        extractedActiveId.value = item.id
        return
      }
    }
  }

  // Si no encontró ninguno, activar el primero
  const firstItem = extractedTocItems.value[0]
  if (firstItem) {
    extractedActiveId.value = firstItem.id
  }
}

// Computed para obtener datos del TOC
// En móvil usa headings extraídos, en desktop puede usar sidebar si existe
const tocItems = computed(() => {
  // En móvil: usar headings extraídos directamente
  if (extractedTocItems.value.length > 0) {
    return extractedTocItems.value
  }
  // Fallback: sidebar (solo visible en desktop)
  return tocSidebarRef.value?.tocItems || []
})

const activeHeadingId = computed(() => {
  // Priorizar el estado local extraído
  if (extractedActiveId.value) {
    return extractedActiveId.value
  }
  // Fallback: sidebar
  return tocSidebarRef.value?.activeId || ''
})

// Función de navegación
function handleNavigate(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const headerHeight = DEFAULTS.HEADER_HEIGHT
    const top = element.getBoundingClientRect().top + window.scrollY - headerHeight - DEFAULTS.SEARCH_SCROLL_PADDING
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

// Debug: Log cuando cambian los tocItems (remover después de verificar)
watch(tocItems, (items) => {
  console.log('📚 TOC Items:', items.length, items)
}, { immediate: true })

// Watch para extraer headings cuando contentElement esté listo
watch(contentElement, (newElement) => {
  if (newElement) {
    // Pequeño delay para asegurar que el DOM esté completamente renderizado
    setTimeout(() => {
      extractHeadingsFromContent()
    }, TIMEOUTS.DOM_READY)
  }
})

// Después de que el contenido se renderice, capturar el elemento
onMounted(async () => {
  await nextTick()
  
  // Dar tiempo para que ContentRenderer termine de renderizar
  setTimeout(() => {
    if (contentRef.value) {
      const proseElement = contentRef.value.querySelector('.prose')
      contentElement.value = proseElement as HTMLElement
    }
  }, 150)
  
  // Listeners de scroll
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('scroll', updateActiveHeading, { passive: true })
  
  // Checks iniciales
  handleScroll()
  updateActiveHeading()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('scroll', updateActiveHeading)
})
</script>

<template>
  <div class="min-h-screen transition-colors" style="background-color: var(--bg-primary);">
    <!-- Layout con CSS Grid para mejor manejo del espacio -->
    <div 
      class="layout-grid"
      :style="{ 
        '--sidebar-width': sidebarWidth,
        '--sidebar-transition': SIDEBAR.TRANSITION_DURATION
      }"
    >
      <!-- Sidebar fijo a la izquierda (solo tablets/desktop) -->
      <TableOfContents 
        ref="tocSidebarRef"
        :content-element="contentElement" 
        :is-collapsed="isCollapsed"
        variant="sidebar" 
        class="sidebar-area"
        @toggle-collapse="toggleSidebar"
      />
      
      <!-- Botón flotante para expandir cuando está colapsado -->
      <SidebarExpandButton 
        v-if="isCollapsed"
        @expand="expandSidebar"
      />

      <!-- Área principal (Header + Contenido) -->
      <div class="main-area">
        <!-- Header -->
        <header class="sticky top-0 z-[45] transition-all border-b" style="background-color: var(--bg-card); border-color: var(--border-color);">
          <div class="px-4 py-4">
            <div class="flex items-center justify-between mb-2">
              <!-- Breadcrumbs -->
              <nav class="flex items-center space-x-2 text-sm">
                <NuxtLink to="/" class="transition-colors font-medium hover:underline" style="color: var(--accent-primary);">
                  Inicio
                </NuxtLink>
                <span style="color: var(--text-muted);">/</span>
                <NuxtLink :to="`/${materia}`" class="transition-colors font-medium hover:underline" style="color: var(--accent-primary);">
                  {{ configMateria?.nombre }}
                </NuxtLink>
                <span style="color: var(--text-muted);">/</span>
                <span class="font-medium" style="color: var(--text-secondary);">{{ unidad?.title || 'Unidad' }}</span>
              </nav>

              <!-- Theme Toggle -->
              <ThemeToggle />
            </div>
            
            <h1 class="text-2xl font-bold transition-colors" style="color: var(--text-primary);">{{ configMateria?.nombre || materia }}</h1>
          </div>
        </header>

        <!-- Contenido Principal -->
        <main ref="contentRef" class="w-full px-4 md:px-8 py-8">
          <!-- Contenido Markdown -->
          <div class="rounded-xl shadow-sm border p-6 md:p-12 w-full transition-all" style="background-color: var(--bg-card); border-color: var(--border-color);">
            <ContentRenderer v-if="unidad" :value="unidad" class="prose prose-lg dark:prose-invert max-w-none" />
            <div v-else class="text-center py-12">
              <p style="color: var(--text-muted);">Contenido no encontrado</p>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Procesador de enlaces multimedia -->
    <MediaLinksProcessor :content-element="contentElement" />
    
    <!-- Búsqueda contextual -->
    <ContentSearch :content-element="contentElement" />
    
    <!-- FAB flotante para TOC (solo móvil) -->
    <!-- Se oculta solo cuando el sheet está abierto -->
    <FloatingTocButton 
      :show="shouldShowFab && !isOpen"
      @click="openSheet"
    />
    
    <!-- Sheet con TOC (solo móvil) -->
    <TocSheet
      :is-open="isOpen"
      :toc-items="tocItems"
      :active-id="activeHeadingId"
      @close="closeSheet"
      @navigate="handleNavigate"
    />
  </div>
</template>

<style scoped>
/* Layout con CSS Grid - Responsive y flexible */
.layout-grid {
  display: grid;
  min-height: 100vh;
}

/* Móvil: Una sola columna (sin sidebar) */
@media (max-width: 767px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar-area {
    display: none;
  }
  
  .main-area {
    grid-column: 1;
  }
}

/* Tablets y Desktop: Sidebar fijo + Contenido flexible */
@media (min-width: 768px) {
  .layout-grid {
    /* Grid adaptativo usando variable CSS */
    grid-template-columns: var(--sidebar-width, 280px) 1fr;
    transition: grid-template-columns var(--sidebar-transition, 300ms) ease;
  }
  
  .sidebar-area {
    grid-column: 1;
    overflow: hidden;
    transition: all var(--sidebar-transition, 300ms) ease;
  }
  
  .main-area {
    grid-column: 2;
    min-width: 0; /* Importante para que el contenido no se desborde */
  }
}
</style>

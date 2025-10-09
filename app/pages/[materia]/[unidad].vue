<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { materiasConfig } from '~/config/materias'
import { DEFAULTS, TIMEOUTS, SIDEBAR } from '~/config/constants'
import { useTocSheet } from '~/composables/useTocSheet'
import { useSidebarCollapse } from '~/composables/useSidebarCollapse'
import { useTableWrapper } from '~/composables/useTableWrapper'
import { extractCleanHeadingText } from '~/utils/search'
import { detectHeadingContentTypes } from '~/utils/content-detection'
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

// SEO Configuration
const seoTitle = computed(() => `${unidad.value?.title || 'Unidad'} - ${configMateria?.nombre} - EdiProfe`)
const seoDescription = computed(() => 
  unidad.value?.description || 
  `Aprende sobre ${unidad.value?.title || 'esta unidad'} en ${configMateria?.nombre}. Material educativo con videos, explicaciones y recursos descargables.`
)
const seoKeywords = computed(() => [
  configMateria?.nombre.toLowerCase() || materia,
  unidad.value?.title?.toLowerCase() || '',
  'lección',
  'educación',
  'STEM'
].filter(Boolean))

const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  'name': unidad.value?.title || 'Unidad',
  'description': seoDescription.value,
  'educationalLevel': 'Secundaria',
  'learningResourceType': 'Lesson',
  'isPartOf': {
    '@type': 'Course',
    'name': `Curso de ${configMateria?.nombre}`,
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'EdiProfe',
      'url': 'https://ediprofe.com'
    }
  },
  'teaches': unidad.value?.title
}))

// Referencias para el procesador de enlaces multimedia
const contentRef = ref<HTMLElement | null>(null)
const contentElement = ref<HTMLElement | null>(null)

// Referencia al componente TableOfContents (sidebar para desktop)
const tocSidebarRef = ref<InstanceType<typeof TableOfContents> | null>(null)

// TOC Sheet para móvil
const { isOpen, shouldShowFab, openSheet, closeSheet, handleScroll } = useTocSheet()

// Sidebar collapse para desktop
const { isCollapsed, toggleSidebar, expandSidebar } = useSidebarCollapse()

// Envolver tablas automáticamente (replica comportamiento de artifacts de Claude)
useTableWrapper(contentElement)

// Debug mode solo en desarrollo
if (import.meta.dev) {
  watch([unidad, contentElement], ([unidadVal, contentVal]) => {
    console.group('🔍 DEBUG - Estado del Componente')
    console.log('Unidad cargada:', !!unidadVal)
    console.log('Título:', unidadVal?.title)
    console.log('ContentElement:', !!contentVal)
    console.log('Tablas detectadas:', contentVal?.querySelectorAll('table').length || 0)
    console.groupEnd()
  }, { immediate: true })
}

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

    // Extraer texto limpio manejando LaTeX/KaTeX
    const cleanText = extractCleanHeadingText(heading as HTMLElement)

    // Detectar tipos de contenido asociados (videos, playlists, práctica, etc.)
    const contentTypes = detectHeadingContentTypes(heading as HTMLElement)

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
      level,
      contentTypes: contentTypes.length > 0 ? contentTypes : undefined
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

// Watch para verificar cambios en TOC items (solo en desarrollo)
if (import.meta.dev) {
  watch(tocItems, (items) => {
    console.log('📚 TOC Items:', items.length, items)
  }, { immediate: true })
}

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
  <div class="page-wrapper">
    <!-- SEO Meta Tags -->
    <SEO
      :title="seoTitle"
      :description="seoDescription"
      :keywords="seoKeywords"
      type="article"
      :structured-data="structuredData"
    />

    <!-- Header fijo FUERA del grid -->
    <PageHeader
      :breadcrumbs="[
        { label: 'Inicio', to: '/' },
        { label: configMateria?.nombre || materia, to: `/${materia}` },
        { label: unidad?.title || 'Unidad' }
      ]"
    />

    <!-- Loading State -->
    <div v-if="!unidad" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Cargando contenido...</p>
    </div>

    <!-- Layout con sidebar y contenido -->
    <div 
      v-else
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

      <!-- Contenido Principal -->
      <main ref="contentRef" class="content-main">
        <div class="content-card">
          <ContentRenderer v-if="unidad" :value="unidad" class="prose prose-lg dark:prose-invert max-w-none" />
          <div v-else class="text-center py-12">
            <p style="color: var(--text-muted);">Contenido no encontrado</p>
          </div>
        </div>
      </main>
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
.page-wrapper {
  min-height: 100vh;
  background-color: var(--bg-primary);
  transition: background-color 0.2s ease;
}

.layout-grid {
  display: grid;
  min-height: calc(100vh - 56px);
}

@media (max-width: 767px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar-area {
    display: none;
  }
  
  .content-main {
    grid-column: 1;
  }
}

@media (min-width: 768px) {
  .layout-grid {
    grid-template-columns: var(--sidebar-width, 280px) 1fr;
    transition: grid-template-columns var(--sidebar-transition, 300ms) ease;
  }
  
  .sidebar-area {
    grid-column: 1;
    position: sticky;
    top: 56px;
    height: calc(100vh - 56px);
    overflow-y: auto;
    overflow-x: hidden;
    transition: all var(--sidebar-transition, 300ms) ease;
  }
  
  .content-main {
    grid-column: 2;
    min-width: 0;
    overflow: hidden;
  }
}

.content-main {
  width: 100%;
  padding: 2rem 1rem;
}

@media (min-width: 768px) {
  .content-main {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .content-main {
    padding: 2rem 3rem;
  }
}

.content-card {
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid;
  border-color: var(--border-color);
  background-color: var(--bg-card);
  padding: 1rem;
  width: 100%;
  overflow-x: hidden;
  min-height: 50vh; /* Asegurar altura mínima */
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .content-card {
    padding: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .content-card {
    padding: 3rem;
  }
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 56px);
  gap: 1rem;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--border-color);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
}

</style>

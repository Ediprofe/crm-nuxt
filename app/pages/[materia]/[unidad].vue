<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { materiasConfig } from '~/config/materias'

const route = useRoute()
const materia = route.params.materia as string
const unidadSlug = route.params.unidad as string

// Buscar el contenido usando queryCollection (API de @nuxt/content v3.7+)
const { data: unidad } = await useAsyncData(`${materia}-${unidadSlug}`, async () => {
  // Obtener todos los archivos de la colección "content"
  const items = await queryCollection('content').all()
  
  // Filtrar por materia y slug
  const found = items.find((item: any) => 
    item.path?.includes(`/${materia}/`) && item.path?.includes(unidadSlug)
  )
  
  return found || null
})

const configMateria = materiasConfig[materia as keyof typeof materiasConfig]

// Referencias para el procesador de enlaces multimedia
const contentRef = ref<HTMLElement | null>(null)
const contentElement = ref<HTMLElement | null>(null)

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
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <!-- Layout con CSS Grid para mejor manejo del espacio -->
    <div class="layout-grid">
      <!-- Sidebar fijo a la izquierda (solo tablets/desktop) -->
      <TableOfContents 
        :content-element="contentElement" 
        variant="sidebar" 
        class="sidebar-area" 
      />

      <!-- Área principal (Header + Contenido) -->
      <div class="main-area">
        <!-- Header -->
        <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-[45] transition-colors">
          <div class="px-4 py-4">
            <div class="flex items-center justify-between mb-2">
              <!-- Breadcrumbs -->
              <nav class="flex items-center space-x-2 text-sm">
                <NuxtLink to="/" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                  Inicio
                </NuxtLink>
                <span class="text-gray-400 dark:text-gray-500">/</span>
                <NuxtLink :to="`/${materia}`" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                  {{ configMateria?.nombre }}
                </NuxtLink>
                <span class="text-gray-400 dark:text-gray-500">/</span>
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ unidad?.title || 'Unidad' }}</span>
              </nav>

              <!-- Theme Toggle -->
              <ThemeToggle />
            </div>
            
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors">{{ configMateria?.nombre || materia }}</h1>
          </div>
        </header>

        <!-- Contenido Principal -->
        <main ref="contentRef" class="w-full px-4 md:px-8 py-8">
          <!-- TOC Acordeón (solo móvil) -->
          <TableOfContents 
            :content-element="contentElement" 
            variant="accordion" 
            class="md:hidden mb-6" 
          />
          
          <!-- Contenido Markdown -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-12 w-full transition-colors">
            <ContentRenderer v-if="unidad" :value="unidad" class="prose prose-lg dark:prose-invert max-w-none" />
            <div v-else class="text-center py-12">
              <p class="text-gray-500 dark:text-gray-400">Contenido no encontrado</p>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Procesador de enlaces multimedia -->
    <MediaLinksProcessor :content-element="contentElement" />
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
    grid-template-columns: 280px 1fr;
  }
  
  .sidebar-area {
    grid-column: 1;
  }
  
  .main-area {
    grid-column: 2;
    min-width: 0; /* Importante para que el contenido no se desborde */
  }
}
</style>

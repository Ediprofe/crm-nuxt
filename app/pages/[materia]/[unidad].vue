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
  <div class="min-h-screen bg-gray-50">
    <!-- Layout con CSS Grid para mejor manejo del espacio -->
    <div class="layout-grid">
      <!-- Sidebar fijo a la izquierda (solo tablets/desktop) -->
      <Sidebar :content-element="contentElement" class="sidebar-area" />

      <!-- Área principal (Header + Contenido) -->
      <div class="main-area">
        <!-- Header -->
        <header class="bg-white border-b border-gray-200 sticky top-0 z-[45]">
          <div class="px-4 py-4">
            <nav class="flex items-center space-x-2 text-sm mb-2">
              <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 transition-colors">
                Inicio
              </NuxtLink>
              <span class="text-gray-400">/</span>
              <NuxtLink :to="`/${materia}`" class="text-blue-600 hover:text-blue-800 transition-colors">
                {{ configMateria?.nombre }}
              </NuxtLink>
              <span class="text-gray-400">/</span>
              <span class="text-gray-700 font-medium">{{ unidad?.title || 'Unidad' }}</span>
            </nav>
            
            <h1 class="text-2xl font-bold text-gray-900">{{ configMateria?.nombre || materia }}</h1>
          </div>
        </header>

        <!-- Contenido Principal -->
        <main ref="contentRef" class="w-full px-4 md:px-8 py-8">
          <!-- TOC Acordeón (solo móvil) -->
          <TableOfContents :content-element="contentElement" class="md:hidden mb-6" />
          
          <!-- Contenido Markdown -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-12 w-full">
            <ContentRenderer v-if="unidad" :value="unidad" class="prose prose-lg max-w-none" />
            <div v-else class="text-center py-12">
              <p class="text-gray-500">Contenido no encontrado</p>
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

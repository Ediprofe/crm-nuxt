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
    <header class="bg-white border-b border-gray-200 p-4">
      <h1 class="text-2xl font-bold">{{ configMateria?.nombre || materia }}</h1>
    </header>

    <main ref="contentRef" class="container mx-auto px-4 py-8 max-w-4xl">
      <ContentRenderer v-if="unidad" :value="unidad" class="prose prose-lg max-w-none" />
      <div v-else class="text-center py-12">
        <p class="text-gray-500">Contenido no encontrado</p>
      </div>
      
      <!-- Procesador de enlaces multimedia -->
      <MediaLinksProcessor :content-element="contentElement" />
    </main>
  </div>
</template>

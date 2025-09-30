<script setup lang="ts">
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
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white border-b border-gray-200 p-4">
      <h1 class="text-2xl font-bold">{{ configMateria?.nombre || materia }}</h1>
    </header>

    <main class="container mx-auto px-4 py-8 max-w-4xl">
      <ContentRenderer v-if="unidad" :value="unidad" class="prose prose-lg max-w-none" />
      <div v-else class="text-center py-12">
        <p class="text-gray-500">Contenido no encontrado</p>
      </div>
    </main>
  </div>
</template>

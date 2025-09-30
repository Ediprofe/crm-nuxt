<script setup lang="ts">
import { materiasConfig, type MateriaSlug } from '~/config/materias'

const route = useRoute()
const materia = route.params.materia as MateriaSlug

// Obtener configuración de la materia
const configMateria = materiasConfig[materia]

// Si la materia no existe, redirigir al home
if (!configMateria) {
  navigateTo('/')
}

// Obtener todas las unidades de esta materia usando queryCollection
const { data: unidades } = await useAsyncData(`${materia}-index`, async () => {
  const items = await queryCollection('content').all()
  
  // Filtrar solo los items de esta materia
  const materiasItems = items.filter((item: any) => 
    item.path?.includes(`/${materia}/`)
  )
  
  // Ordenar por path (que incluye el prefijo numérico)
  return materiasItems.sort((a: any, b: any) => {
    const pathA = a.path || ''
    const pathB = b.path || ''
    return pathA.localeCompare(pathB)
  })
})

// Función para limpiar el slug de la URL (quitar prefijo numérico)
const getSlugFromPath = (path: string): string => {
  const parts = path.split('/')
  const filename = parts[parts.length - 1]
  // Remover prefijo tipo "01-" y retornar el resto
  return filename.replace(/^\d+-/, '')
}

// Función para obtener el título de la unidad
const getTitulo = (item: any): string => {
  // Intentar obtener el título del contenido, si no, usar el nombre del archivo
  return item.title || getSlugFromPath(item.path || '').replace(/-/g, ' ')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <!-- Header con breadcrumb -->
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div class="container mx-auto px-4 py-6">
        <!-- Breadcrumb -->
        <nav class="mb-4 flex items-center justify-between">
          <ol class="flex items-center space-x-2 text-sm">
            <li>
              <NuxtLink to="/" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                Inicio
              </NuxtLink>
            </li>
            <li class="text-gray-400 dark:text-gray-500">/</li>
            <li class="text-gray-700 dark:text-gray-300 font-medium">
              {{ configMateria?.nombre }}
            </li>
          </ol>
          
          <!-- Theme Toggle -->
          <ThemeToggle />
        </nav>

        <!-- Título de la materia -->
        <div class="flex items-center gap-4">
          <span class="text-5xl">{{ configMateria?.emoji }}</span>
          <div>
            <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 transition-colors">{{ configMateria?.nombre }}</h1>
            <p class="mt-1 text-gray-600 dark:text-gray-400 transition-colors">
              {{ unidades?.length || 0 }} {{ unidades?.length === 1 ? 'unidad disponible' : 'unidades disponibles' }}
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Lista de unidades -->
      <div v-if="unidades && unidades.length > 0" class="space-y-4">
        <NuxtLink
          v-for="(unidad, index) in unidades"
          :key="unidad.path"
          :to="`/${materia}/${getSlugFromPath(unidad.path)}`"
          class="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"
        >
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <!-- Número de unidad -->
                <div class="flex items-center gap-3 mb-2">
                  <span class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold text-sm transition-colors">
                    {{ index + 1 }}
                  </span>
                  <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 capitalize transition-colors">
                    {{ getTitulo(unidad) }}
                  </h2>
                </div>
                
                <!-- Descripción (si existe) -->
                <p v-if="unidad.description" class="text-gray-600 dark:text-gray-400 ml-11 mt-1 transition-colors">
                  {{ unidad.description }}
                </p>
              </div>

              <!-- Arrow indicator -->
              <svg class="w-6 h-6 text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Estado vacío -->
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">📚</div>
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors">No hay unidades disponibles</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6 transition-colors">Aún no se han agregado unidades para esta materia.</p>
        <NuxtLink 
          to="/" 
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </NuxtLink>
      </div>
    </main>
  </div>
</template>


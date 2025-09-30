<script setup lang="ts">
import { materiasConfig, type MateriaSlug } from '~/config/materias'

// Obtener las materias como un array
const materias = Object.entries(materiasConfig).map(([slug, config]) => ({
  slug: slug as MateriaSlug,
  ...config
}))

// Definir colores para cada materia (puedes personalizarlos)
const colorClasses: Record<string, string> = {
  quimica: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
  fisica: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
  matematicas: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
  ciencias: 'from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">EdiProfe.com</h1>
            <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">Plataforma educativa interactiva</p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-12">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Materias Disponibles</h2>
        <p class="text-gray-600 dark:text-gray-400">Selecciona una materia para comenzar a estudiar</p>
      </div>

      <!-- Grid de Materias -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="materia in materias"
          :key="materia.slug"
          :to="`/${materia.slug}`"
          class="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          <div 
            :class="[
              'p-8 bg-gradient-to-br',
              colorClasses[materia.color] || 'from-gray-500 to-gray-600'
            ]"
          >
            <!-- Emoji grande -->
            <div class="text-6xl mb-4 transform transition-transform group-hover:scale-110">
              {{ materia.emoji }}
            </div>
            
            <!-- Nombre de la materia -->
            <h3 class="text-2xl font-bold text-white mb-2">
              {{ materia.nombre }}
            </h3>
            
            <!-- Arrow indicator -->
            <div class="flex items-center text-white opacity-75 group-hover:opacity-100 transition-opacity">
              <span class="text-sm font-medium">Ver contenido</span>
              <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
      <div class="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2025 EdiProfe.com - Plataforma Educativa</p>
      </div>
    </footer>
  </div>
</template>

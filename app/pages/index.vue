<script setup lang="ts">
import { materiasConfig, type MateriaSlug } from '~/config/materias'

// Obtener las materias como un array
const materias = Object.entries(materiasConfig).map(([slug, config]) => ({
  slug: slug as MateriaSlug,
  ...config
}))

// Definir colores para cada materia (actualizados según diseño)
const colorClasses: Record<string, string> = {
  quimica: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
  fisica: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
  matematicas: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
  ciencias: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">EdiProfe.com</h1>
            <p class="mt-1 text-base md:text-lg text-gray-600 dark:text-gray-400">Plataforma educativa interactiva</p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 dark:from-blue-700 dark:via-blue-800 dark:to-indigo-900 py-16 md:py-20 px-4 transition-colors">
      <!-- Decorative background elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>
      
      <div class="container mx-auto max-w-5xl relative z-10">
        <div class="text-center">
          <!-- Título principal -->
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Guía Educativa para
            <span class="block mt-2 bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
              Ciencias y Matemáticas
            </span>
          </h2>
          
          <!-- Descripción -->
          <p class="text-lg sm:text-xl md:text-2xl text-blue-50 leading-relaxed max-w-4xl mx-auto mb-8">
            Explora lecciones estructuradas con videos explicativos, material didáctico y recursos descargables que simplifican el aprendizaje de conceptos complejos. Cada unidad temática contiene múltiples lecciones organizadas de forma progresiva para facilitar el aprendizaje paso a paso.
          </p>

          <!-- Features badges -->
          <div class="flex flex-wrap justify-center gap-3 md:gap-4 text-sm md:text-base">
            <div class="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white">
              <span class="mr-2">📹</span>
              Videos explicativos
            </div>
            <div class="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white">
              <span class="mr-2">📚</span>
              Material didáctico
            </div>
            <div class="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white">
              <span class="mr-2">⬇️</span>
              Recursos descargables
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-12 md:py-16">
      <!-- Sección de materias -->
      <div class="mb-10">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Materias Disponibles</h2>
        <p class="text-base md:text-lg text-gray-600 dark:text-gray-400">Selecciona una materia para comenzar a estudiar</p>
      </div>

      <!-- Grid de Materias -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
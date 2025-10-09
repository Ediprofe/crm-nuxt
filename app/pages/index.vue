<script setup lang="ts">
import { materiasConfig, type MateriaSlug } from '~/config/materias'

// Obtener las materias como un array
const materias = Object.entries(materiasConfig).map(([slug, config]) => ({
  slug: slug as MateriaSlug,
  ...config
}))

// SEO Configuration
const seoTitle = 'EdiProfe - Aprende Química, Física y Matemáticas'
const seoDescription = 'Explora lecciones estructuradas de ciencias y matemáticas con videos explicativos, material didáctico y recursos descargables. Aprende conceptos complejos de forma simple y progresiva.'
const seoKeywords = ['química', 'física', 'matemáticas', 'ciencias', 'educación', 'STEM', 'lecciones', 'aprendizaje', 'videos educativos']

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  'name': 'EdiProfe',
  'description': 'Plataforma educativa para aprender Química, Física y Matemáticas',
  'url': 'https://ediprofe.com',
  'sameAs': [
    // Agregar redes sociales cuando estén disponibles
  ],
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'USD',
    'description': 'Contenido educativo gratuito'
  }
}
</script>

<template>
  <div class="min-h-screen transition-colors" style="background-color: var(--bg-primary);">
    <!-- SEO Meta Tags -->
    <SEO
      :title="seoTitle"
      :description="seoDescription"
      :keywords="seoKeywords"
      type="website"
      :structured-data="structuredData"
    />

    <!-- Header reutilizable -->
    <PageHeader>
      <template #content>
        <h1 class="home-header-title">Ediprofe.com</h1>
        <span class="home-header-subtitle">Ciencias y Matemáticas online</span>
      </template>
    </PageHeader>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container mx-auto max-w-5xl relative z-10 px-4 py-16 md:py-20">
        <div class="text-center">
          <!-- Título principal -->
          <h2 class="hero-title">
            Guía Educativa para
            <span class="hero-subtitle">
              Ciencias y Matemáticas
            </span>
          </h2>
          
          <!-- Descripción -->
          <p class="hero-description">
            Explora lecciones estructuradas con videos explicativos, material didáctico y recursos descargables que simplifican el aprendizaje de conceptos complejos. Cada unidad temática contiene múltiples lecciones organizadas de forma progresiva para facilitar el aprendizaje paso a paso.
          </p>

          <!-- Features badges -->
          <div class="flex flex-wrap justify-center gap-3 md:gap-4 text-sm md:text-base">
            <div class="feature-badge">
              <span class="mr-2">📹</span>
              Videos explicativos
            </div>
            <div class="feature-badge">
              <span class="mr-2">📚</span>
              Material didáctico
            </div>
            <div class="feature-badge">
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
        <h2 class="text-2xl md:text-3xl font-bold mb-3 transition-colors" style="color: var(--heading-color);">Materias disponibles</h2>
        <p class="text-base md:text-lg transition-colors" style="color: var(--text-secondary);">Selecciona una materia para comenzar a estudiar</p>
      </div>

      <!-- Grid de Materias -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <NuxtLink
          v-for="materia in materias"
          :key="materia.slug"
          :to="`/${materia.slug}`"
          class="materia-card group"
        >
          <!-- Emoji grande -->
          <div class="text-6xl mb-4 transform transition-transform group-hover:scale-110">
            {{ materia.emoji }}
          </div>
          
          <!-- Nombre de la materia -->
          <h3 class="materia-card-title">
            {{ materia.nombre }}
          </h3>
          
          <!-- Arrow indicator -->
          <div class="materia-card-action">
            <span class="text-sm font-medium">Ver contenido</span>
            <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-20 transition-all border-t" style="background-color: var(--bg-card); border-color: var(--border-color);">
      <div class="container mx-auto px-4 py-6 text-center transition-colors" style="color: var(--text-muted);">
        <p>&copy; 2025 Ediprofe.com</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Estilos específicos del home */
.home-header-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  transition: color 0.2s ease;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .home-header-title {
    font-size: 1.5rem;
  }
}

.home-header-subtitle {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: color 0.2s ease;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .home-header-subtitle {
    font-size: 0.9375rem;
  }
}

@media (max-width: 640px) {
  .home-header-subtitle {
    font-size: 0.8125rem;
  }
}

/* Hero Section */
.hero-section {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-secondary);
  transition: background-color 0.2s ease;
}

.hero-title {
  font-size: clamp(1.875rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: var(--heading-h1-color);
  transition: color 0.2s ease;
}

.hero-subtitle {
  display: block;
  margin-top: 0.5rem;
  color: var(--accent-primary);
  transition: color 0.2s ease;
}

.hero-description {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  line-height: 1.6;
  max-width: 56rem;
  margin: 0 auto 2rem;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.feature-badge {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.feature-badge:hover {
  background-color: var(--bg-secondary);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: translateY(-2px);
}

/* Materia Cards */
.materia-card {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  padding: 2rem;
  background-color: var(--bg-card);
  border: 2px solid var(--border-color);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.materia-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.materia-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.materia-card:hover .materia-card-title {
  color: var(--accent-primary);
}

.materia-card-action {
  display: flex;
  align-items: center;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.materia-card:hover .materia-card-action {
  color: var(--accent-primary);
}
</style>
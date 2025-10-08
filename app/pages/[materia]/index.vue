<script setup lang="ts">
import { materiasConfig, type MateriaSlug } from '~/config/materias'
import type { ContentItem } from '~/types/content'

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
  const items = await queryCollection('content').all() as ContentItem[]
  
  // Filtrar solo los items de esta materia
  const materiasItems = items.filter((item: ContentItem) => 
    item.path?.includes(`/${materia}/`)
  )
  
  // Ordenar por path (que incluye el prefijo numérico)
  return materiasItems.sort((a: ContentItem, b: ContentItem) => {
    const pathA = a.path || ''
    const pathB = b.path || ''
    return pathA.localeCompare(pathB)
  })
})

// Función para limpiar el slug de la URL (quitar prefijo numérico)
const getSlugFromPath = (path: string): string => {
  const parts = path.split('/')
  const filename = parts[parts.length - 1] || ''
  // Remover prefijo tipo "01-" y retornar el resto
  return filename.replace(/^\d+-/, '')
}

// Función para obtener el título de la unidad
const getTitulo = (item: ContentItem): string => {
  // Intentar obtener el título del contenido, si no, usar el nombre del archivo
  return item.title || getSlugFromPath(item.path || '').replace(/-/g, ' ')
}

// SEO Configuration
const seoTitle = `${configMateria?.nombre || materia} - EdiProfe`
const seoDescription = `Explora todas las unidades de ${configMateria?.nombre || materia}. ${unidades?.value?.length || 0} lecciones con videos explicativos, material didáctico y recursos descargables.`
const seoKeywords = [configMateria?.nombre.toLowerCase() || materia, 'lecciones', 'educación', 'STEM', 'aprendizaje']

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  'name': `Curso de ${configMateria?.nombre}`,
  'description': seoDescription,
  'provider': {
    '@type': 'EducationalOrganization',
    'name': 'EdiProfe',
    'url': 'https://ediprofe.com'
  },
  'numberOfLessons': unidades?.value?.length || 0,
  'educationalLevel': 'Secundaria',
  'teaches': configMateria?.nombre
}
</script>

<template>
  <div class="min-h-screen transition-colors" style="background-color: var(--bg-primary);">
    <!-- SEO Meta Tags -->
    <SEO
      :title="seoTitle"
      :description="seoDescription"
      :keywords="seoKeywords"
      type="educational"
      :structured-data="structuredData"
    />

    <!-- Header reutilizable con breadcrumbs -->
    <PageHeader
      :breadcrumbs="[
        { label: 'Inicio', to: '/' },
        { label: configMateria?.nombre || materia, emoji: configMateria?.emoji }
      ]"
    />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Lista de unidades -->
      <div v-if="unidades && unidades.length > 0" class="space-y-4">
        <NuxtLink
          v-for="(unidad, index) in unidades"
          :key="unidad.path"
          :to="`/${materia}/${getSlugFromPath(unidad.path)}`"
          class="unidad-card group"
        >
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <!-- Número de unidad -->
                <div class="flex items-center gap-3 mb-2">
                  <span class="unidad-badge">
                    {{ index + 1 }}
                  </span>
                  <h2 class="unidad-title">
                    {{ getTitulo(unidad) }}
                  </h2>
                </div>
                
                <!-- Descripción (si existe) -->
                <p v-if="unidad.description" class="ml-11 mt-1 transition-colors" style="color: var(--text-secondary);">
                  {{ unidad.description }}
                </p>
              </div>

              <!-- Arrow indicator -->
              <svg class="unidad-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Estado vacío -->
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">📚</div>
        <h3 class="text-xl font-semibold mb-2 transition-colors" style="color: var(--text-primary);">No hay unidades disponibles</h3>
        <p class="mb-6 transition-colors" style="color: var(--text-muted);">Aún no se han agregado unidades para esta materia.</p>
        <NuxtLink 
          to="/" 
          class="empty-state-button"
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

<style scoped>
/* Unidad Cards */
.unidad-card {
  display: block;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  border: 1px solid;
  border-color: var(--border-color);
  background-color: var(--bg-card);
}

.unidad-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  border-color: var(--accent-primary);
  transform: translateX(4px);
}

.unidad-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: var(--bg-secondary);
  color: var(--text-muted);
  font-weight: 700;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border: 1px solid var(--border-color);
}

.unidad-card:hover .unidad-badge {
  background-color: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.unidad-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: color 0.2s ease;
}

.unidad-card:hover .unidad-title {
  color: var(--accent-primary);
}

.unidad-arrow {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-left: 1rem;
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.unidad-card:hover .unidad-arrow {
  color: var(--accent-primary);
  transform: translateX(0.25rem);
}

/* Empty State Button */
.empty-state-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--accent-primary);
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.empty-state-button:hover {
  background-color: var(--accent-primary-hover);
  transform: translateX(-4px);
}
</style>


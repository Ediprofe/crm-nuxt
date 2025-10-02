<script setup lang="ts">
interface Breadcrumb {
  label: string
  to?: string
  emoji?: string
}

const props = defineProps<{
  breadcrumbs?: Breadcrumb[]
}>()
</script>

<template>
  <header class="page-header">
    <div class="page-header-container">
      <!-- Breadcrumbs o slot personalizado -->
      <nav v-if="breadcrumbs && breadcrumbs.length > 0" class="page-header-nav">
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <!-- Enlace -->
          <NuxtLink
            v-if="crumb.to"
            :to="crumb.to"
            class="nav-link"
            style="color: var(--accent-primary);"
          >
            <span v-if="crumb.emoji" class="nav-emoji">{{ crumb.emoji }}</span>
            <span>{{ crumb.label }}</span>
          </NuxtLink>
          
          <!-- Texto simple (último elemento) -->
          <span
            v-else
            class="nav-current"
            style="color: var(--text-secondary);"
          >
            <span v-if="crumb.emoji" class="nav-emoji">{{ crumb.emoji }}</span>
            <span>{{ crumb.label }}</span>
          </span>
          
          <!-- Separador (excepto último) -->
          <span
            v-if="index < breadcrumbs.length - 1"
            class="nav-separator"
            style="color: var(--text-muted);"
          >
            /
          </span>
        </template>
      </nav>
      
      <!-- Slot personalizado para contenido del header -->
      <div v-else class="page-header-content">
        <slot name="content" />
      </div>

      <!-- Theme Toggle siempre visible -->
      <ThemeToggle />
    </div>
  </header>
</template>

<style scoped>
.page-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.dark .page-header {
  background-color: rgba(24, 24, 27, 0.9);
}

.page-header-container {
  max-width: 1536px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

@media (min-width: 768px) {
  .page-header-container {
    padding: 0.875rem 1.5rem;
  }
}

@media (min-width: 1024px) {
  .page-header-container {
    padding: 1rem 2rem;
  }
}

.page-header-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  flex: 1;
  min-width: 0;
}

@media (min-width: 768px) {
  .page-header-nav {
    font-size: 0.9375rem;
  }
}

.page-header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-decoration: none;
}

.nav-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.nav-separator {
  flex-shrink: 0;
  user-select: none;
}

.nav-current {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 640px) {
  .nav-current {
    max-width: 150px;
  }
}

.nav-emoji {
  font-size: 1.25rem;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .nav-emoji {
    font-size: 1.5rem;
  }
}
</style>


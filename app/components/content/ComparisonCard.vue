<script setup lang="ts">
interface ComparisonItem {
  title: string
  description: string
  details?: string
  icon?: string
}

const props = withDefaults(
  defineProps<{
    items: ComparisonItem[]
    columns?: number
    title?: string
  }>(),
  {
    columns: 2
  }
)

// Asignar iconos por defecto si no se proporcionan
const getIcon = (item: ComparisonItem, index: number) => {
  if (item.icon) return item.icon
  const icons = ['🧪', '💎', '⚡', '🔬', '🌟', '🎯']
  return icons[index % icons.length]
}
</script>

<template>
  <div class="comparison-wrapper">
    <h3 v-if="title" class="comparison-title">{{ title }}</h3>
    <div class="comparison-grid" :style="{ '--columns': columns }">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="comparison-item"
      >
        <div class="item-icon">{{ getIcon(item, index) }}</div>
        <h4 class="item-title">{{ item.title }}</h4>
        <p class="item-description">{{ item.description }}</p>
        <p v-if="item.details" class="item-details">{{ item.details }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Sistema de diseño profesional - Inspirado en Material Design 3 */

.comparison-wrapper {
  margin: 2.5rem 0;
}

.comparison-title {
  font-size: clamp(1.375rem, 3vw, 1.75rem);
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: rgb(var(--heading));
  padding-left: 1rem;
  transition: color 0.2s;
}

@media (min-width: 768px) {
  .comparison-title {
    padding-left: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .comparison-title {
    padding-left: 3rem;
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns, 3), 1fr);
  gap: 1rem;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .comparison-grid {
    padding: 0 2.5rem;
    gap: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .comparison-grid {
    padding: 0 3rem;
    gap: 1.5rem;
  }
}

@media (max-width: 767px) {
  .comparison-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.comparison-item {
  padding: 1.5rem;
  border-radius: 0.75rem;
  background-color: rgb(var(--bg-card));
  border: 1px solid rgb(var(--border));
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.comparison-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05);
  border-color: rgb(var(--accent));
}

.item-icon {
  font-size: 2rem;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.item-title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: rgb(var(--text-primary));
  margin: 0;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
}

.item-description {
  color: rgb(var(--text-secondary));
  line-height: 1.6;
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 400;
  transition: color 0.2s;
}

.item-details {
  color: rgb(var(--text-muted));
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0.5rem 0 0 0;
  padding-top: 0.75rem;
  border-top: 1px solid rgb(var(--border));
  transition: color 0.2s;
}

@media (max-width: 767px) {
  .comparison-item {
    padding: 1.25rem;
  }
  
  .item-icon {
    font-size: 1.75rem;
  }
  
  .item-title {
    font-size: 1rem;
  }
  
  .item-description {
    font-size: 0.9rem;
  }
}
</style>

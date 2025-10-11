<script setup lang="ts">
interface ComparisonItem {
  title: string
  description: string
  details?: string
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning'
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
</script>

<template>
  <div class="comparison-card">
    <h3 v-if="title" class="comparison-title">
      <span class="title-icon">🔍</span>
      {{ title }}
    </h3>
    <div class="comparison-grid" :style="{ '--columns': columns }">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="comparison-item"
        :class="`color-${item.color || 'primary'}`"
      >
        <h4 class="item-title">{{ item.title }}</h4>
        <p class="item-description">{{ item.description }}</p>
        <p v-if="item.details" class="item-details">{{ item.details }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comparison-card {
  margin: 3rem 0;
}

.comparison-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  margin-left: 0;
  padding-left: 0;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.title-icon {
  font-size: 1.5rem;
  opacity: 0.85;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns, 2), 1fr);
  gap: 1.25rem;
  align-items: stretch;
}

@media (max-width: 767px) {
  .comparison-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

.comparison-item {
  padding: 1.75rem;
  border-radius: 0.875rem;
  border: 2px solid;
  background-color: var(--bg-card);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.comparison-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.comparison-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.comparison-card:hover::before {
  opacity: 1;
}

/* Color variants */
.card-primary {
  border-color: var(--accent-primary);
}

.color-primary {
  border-color: var(--accent-primary);
}

.color-primary::before {
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-primary-hover));
}

.color-secondary {
  border-color: var(--accent-secondary);
}

.color-secondary::before {
  background: linear-gradient(90deg, var(--accent-secondary), var(--accent-secondary-hover));
}

.color-accent {
  border-color: rgb(139 92 246); /* violet-500 */
}

.color-accent::before {
  background: linear-gradient(90deg, rgb(139 92 246), rgb(124 58 237));
}

.color-success {
  border-color: var(--success-color);
}

.color-success::before {
  background: linear-gradient(90deg, var(--success-color), rgb(22 163 74));
}

.color-warning {
  border-color: var(--warning-color);
}

.color-warning::before {
  background: linear-gradient(90deg, var(--warning-color), rgb(217 119 6));
}

.item-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  line-height: 1.3;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-description {
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  font-weight: 500;
}

.item-details {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0.75rem 0 0 0;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-color);
  opacity: 0.9;
}

@media (max-width: 767px) {
  .comparison-item {
    padding: 1rem;
  }
  
  .item-title {
    font-size: 1rem;
  }
  
  .item-description {
    font-size: 0.9rem;
  }
}
</style>

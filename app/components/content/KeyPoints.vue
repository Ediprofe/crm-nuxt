<script setup lang="ts">
interface KeyPoint {
  text: string
  highlight?: boolean
}

defineProps<{
  title?: string
  points: KeyPoint[] | string[]
  columns?: number
}>()

// Normalizar points para siempre trabajar con objetos
const normalizePoint = (point: KeyPoint | string): KeyPoint => {
  return typeof point === 'string' ? { text: point } : point
}
</script>

<template>
  <div class="key-points">
    <h3 v-if="title" class="key-points-title">{{ title }}</h3>
    <div class="points-grid" :style="{ '--columns': columns || 1 }">
      <div 
        v-for="(point, index) in points" 
        :key="index"
        class="point-item"
        :class="{ 'point-highlight': normalizePoint(point).highlight }"
      >
        <div class="point-number">{{ index + 1 }}</div>
        <p class="point-text">{{ normalizePoint(point).text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.key-points {
  margin: 3rem 0;
}

.key-points-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  margin-left: 0;
  padding-left: 0;
  color: var(--text-primary);
}

.points-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns, 1), 1fr);
  gap: 1rem;
}

@media (max-width: 767px) {
  .points-grid {
    grid-template-columns: 1fr;
  }
}

.point-item {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background-color: var(--bg-secondary);
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.point-item:hover {
  transform: translateX(4px);
  border-color: var(--accent-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.point-highlight {
  background-color: var(--bg-card);
  border-color: var(--accent-primary);
  border-width: 2px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.point-number {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.point-highlight .point-number {
  background-color: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
  transform: scale(1.05);
}

.point-text {
  flex: 1;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

.point-highlight .point-text {
  color: var(--text-primary);
  font-weight: 500;
}

@media (max-width: 767px) {
  .point-item {
    padding: 1rem;
    gap: 0.75rem;
  }
  
  .point-number {
    width: 1.75rem;
    height: 1.75rem;
    font-size: 0.8rem;
  }
  
  .point-text {
    font-size: 0.9rem;
  }
}
</style>

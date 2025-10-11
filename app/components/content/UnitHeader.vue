<template>
  <div class="unit-header">
    <div class="unit-badge">UNIDAD</div>
    <h1 class="unit-title">{{ title }}</h1>
    <p v-if="description" class="unit-description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<style scoped>
.unit-header {
  position: relative;
  margin: 0 0 3rem 0;
  padding: 2rem 1rem;
  background-color: rgb(var(--bg-card));
  border-radius: 0.5rem;
  border: 1px solid rgb(var(--border));
  transition: all 0.2s;
}

@media (min-width: 768px) {
  .unit-header {
    padding: 2.5rem 2rem;
  }
}

@media (min-width: 1024px) {
  .unit-header {
    padding: 3rem 2.5rem;
  }
}

.unit-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(var(--text-muted));
  background: rgb(var(--bg-secondary));
  border-radius: 0.375rem;
}

.unit-title {
  margin: 0 0 0.875rem 0;
  font-size: clamp(1.875rem, 5vw, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  color: rgb(var(--heading-strong));
  letter-spacing: -0.025em;
  transition: color 0.2s;
}

.unit-description {
  margin: 0;
  font-size: clamp(1rem, 2vw, 1.0625rem);
  line-height: 1.65;
  color: rgb(var(--text-secondary));
  max-width: 100%;
  transition: color 0.2s;
}
</style>

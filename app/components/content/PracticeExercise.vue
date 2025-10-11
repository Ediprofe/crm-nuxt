<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    instructions?: string
    type?: 'table' | 'questions' | 'mixed'
  }>(),
  {
    type: 'mixed'
  }
)
</script>

<template>
  <div class="practice-exercise">
    <div class="practice-header">
      <span class="practice-icon">✏️</span>
      <h3 class="practice-title">{{ title || 'Práctica' }}</h3>
    </div>
    
    <div v-if="instructions" class="practice-instructions">
      <p>{{ instructions }}</p>
    </div>
    
    <div class="practice-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.practice-exercise {
  margin: 2rem 0 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
  border-radius: 1rem;
  border: 2px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
}

.dark .practice-exercise {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
  border-color: rgba(139, 92, 246, 0.3);
}

.practice-exercise:hover {
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
}

.practice-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.practice-icon {
  font-size: 2rem;
  line-height: 1;
  flex-shrink: 0;
}

.practice-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.practice-instructions {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  border-left: 4px solid #8B5CF6;
}

.dark .practice-instructions {
  background-color: rgba(255, 255, 255, 0.05);
}

.practice-instructions p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
}

.practice-content {
  color: var(--text-secondary);
}

/* Styling for tables inside practice */
.practice-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 0.5rem;
  overflow: hidden;
}

.dark .practice-content :deep(table) {
  background-color: rgba(255, 255, 255, 0.05);
}

.practice-content :deep(th),
.practice-content :deep(td) {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
}

.practice-content :deep(th) {
  background-color: rgba(139, 92, 246, 0.1);
  font-weight: 700;
  color: var(--text-primary);
}

.dark .practice-content :deep(th) {
  background-color: rgba(139, 92, 246, 0.2);
}

.practice-content :deep(tr:last-child td) {
  border-bottom: none;
}

.practice-content :deep(tr:hover) {
  background-color: rgba(139, 92, 246, 0.05);
}

/* Styling for paragraphs */
.practice-content :deep(p) {
  margin: 1rem 0;
  line-height: 1.6;
}

.practice-content :deep(p:first-child) {
  margin-top: 0;
}

.practice-content :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

/* Mobile responsive */
@media (max-width: 767px) {
  .practice-exercise {
    padding: 1.5rem;
    margin: 1.5rem 0 2rem;
  }
  
  .practice-icon {
    font-size: 1.5rem;
  }
  
  .practice-title {
    font-size: 1.25rem;
  }
  
  .practice-instructions {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  
  .practice-content :deep(table) {
    font-size: 0.875rem;
  }
  
  .practice-content :deep(th),
  .practice-content :deep(td) {
    padding: 0.5rem;
  }
}
</style>

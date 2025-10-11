<script setup lang="ts">
interface ProcessStep {
  title: string
  description: string
  icon?: string
}

defineProps<{
  steps: ProcessStep[]
  title?: string
  orientation?: 'vertical' | 'horizontal'
}>()
</script>

<template>
  <div class="process-steps">
    <h3 v-if="title" class="process-title">{{ title }}</h3>
    <div 
      class="steps-container"
      :class="[`orientation-${orientation || 'vertical'}`]"
    >
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="step-item"
      >
        <div class="step-connector" v-if="index < steps.length - 1"></div>
        <div class="step-number">
          <span v-if="step.icon" class="step-icon">{{ step.icon }}</span>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <div class="step-content">
          <h4 class="step-title">{{ step.title }}</h4>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.process-steps {
  margin: 3rem 0;
}

.process-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  margin-left: 0;
  padding-left: 0;
  color: var(--text-primary);
}

.steps-container {
  position: relative;
}

/* Vertical orientation (default) */
.orientation-vertical {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.orientation-vertical .step-item {
  display: flex;
  gap: 1.5rem;
  position: relative;
  padding-bottom: 2rem;
}

.orientation-vertical .step-item:last-child {
  padding-bottom: 0;
}

.orientation-vertical .step-connector {
  position: absolute;
  left: 1.5rem;
  top: 3rem;
  bottom: 0;
  width: 2px;
  background-color: var(--border-color);
  opacity: 0.5;
}

.orientation-vertical .step-item:last-child .step-connector {
  display: none;
}

/* Horizontal orientation */
.orientation-horizontal {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.orientation-horizontal .step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.orientation-horizontal .step-connector {
  position: absolute;
  top: 1.5rem;
  left: 100%;
  width: 100%;
  height: 2px;
  background-color: var(--border-color);
  opacity: 0.5;
  display: none; /* Hidden in grid layout */
}

@media (max-width: 767px) {
  .orientation-horizontal {
    grid-template-columns: 1fr;
  }
}

.step-number {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.25rem;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.step-number:hover {
  border-color: var(--accent-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.step-icon {
  font-size: 1.5rem;
}

.step-content {
  flex: 1;
}

.orientation-horizontal .step-content {
  margin-top: 1rem;
}

.step-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.step-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

@media (max-width: 767px) {
  .step-number {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
  
  .step-icon {
    font-size: 1.25rem;
  }
  
  .step-title {
    font-size: 1rem;
  }
  
  .step-description {
    font-size: 0.9rem;
  }
  
  .orientation-vertical .step-item {
    gap: 1rem;
  }
  
  .orientation-vertical .step-connector {
    left: 1.25rem;
  }
}
</style>

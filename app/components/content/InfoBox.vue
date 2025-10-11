<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    type?: 'info' | 'success' | 'warning' | 'error' | 'tip'
    icon?: string
  }>(),
  {
    type: 'info'
  }
)

const iconMap: Record<string, string> = {
  info: '💡',
  success: '✅',
  warning: '⚠️',
  error: '❌',
  tip: '💭'
}

const displayIcon = props.icon || iconMap[props.type]
</script>

<template>
  <div class="info-box" :class="`box-${type}`">
    <div class="box-header">
      <span class="box-icon">{{ displayIcon }}</span>
      <h4 v-if="title" class="box-title">{{ title }}</h4>
    </div>
    <div class="box-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.info-box {
  margin: 1.5rem 0;
  padding: 1.25rem;
  border-radius: 0.75rem;
  border-left: 4px solid;
  background-color: var(--bg-secondary);
  transition: all 0.3s ease;
}

.info-box:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.box-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.box-icon {
  font-size: 1.5rem;
  line-height: 1;
  flex-shrink: 0;
}

.box-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.box-content {
  color: var(--text-secondary);
  line-height: 1.6;
}

.box-content :deep(p) {
  margin: 0.5rem 0;
}

.box-content :deep(p:first-child) {
  margin-top: 0;
}

.box-content :deep(p:last-child) {
  margin-bottom: 0;
}

.box-content :deep(strong) {
  color: var(--text-primary);
}

/* Type variants */
.box-info {
  border-left-color: rgb(59 130 246); /* blue-500 */
  background-color: rgba(59, 130, 246, 0.05);
}

.dark .box-info {
  background-color: rgba(59, 130, 246, 0.1);
}

.box-success {
  border-left-color: var(--success-color);
  background-color: rgba(34, 197, 94, 0.05);
}

.dark .box-success {
  background-color: rgba(34, 197, 94, 0.1);
}

.box-warning {
  border-left-color: var(--warning-color);
  background-color: rgba(245, 158, 11, 0.05);
}

.dark .box-warning {
  background-color: rgba(245, 158, 11, 0.1);
}

.box-error {
  border-left-color: var(--error-color);
  background-color: rgba(239, 68, 68, 0.05);
}

.dark .box-error {
  background-color: rgba(239, 68, 68, 0.1);
}

.box-tip {
  border-left-color: var(--accent-primary);
  background-color: rgba(16, 185, 129, 0.05);
}

.dark .box-tip {
  background-color: rgba(16, 185, 129, 0.1);
}

@media (max-width: 767px) {
  .info-box {
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .box-icon {
    font-size: 1.25rem;
  }
  
  .box-title {
    font-size: 1rem;
  }
}
</style>

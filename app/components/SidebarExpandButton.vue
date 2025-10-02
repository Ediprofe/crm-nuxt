<script setup lang="ts">
import { Z_INDEX } from '~/config/constants'

const emit = defineEmits<{
  expand: []
}>()
</script>

<template>
  <Transition name="fade-slide">
    <button
      @click="emit('expand')"
      class="fixed top-24 left-0 p-3 rounded-r-lg
             text-white shadow-lg hover:shadow-xl
             transition-all duration-200 hover:pr-4
             hidden md:flex items-center justify-center expand-button"
      :style="{ 
        zIndex: Z_INDEX.SIDEBAR,
        backgroundColor: 'var(--accent-primary)'
      }"
      aria-label="Expandir tabla de contenidos"
      title="Mostrar tabla de contenidos (Sidebar)"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.expand-button:hover {
  background-color: var(--accent-primary-hover) !important;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>


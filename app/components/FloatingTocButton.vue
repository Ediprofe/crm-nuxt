<script setup lang="ts">
import { Z_INDEX } from '~/config/constants'

const emit = defineEmits<{
  click: []
}>()

const props = defineProps<{
  show: boolean
}>()

function handleClick() {
  emit('click')
}
</script>

<template>
  <Transition name="fab-fade">
    <button
      v-if="show"
      @click="handleClick"
      class="fixed bottom-6 left-6 w-14 h-14 rounded-full
             text-white shadow-lg hover:shadow-xl hover:scale-110
             flex items-center justify-center
             transition-all duration-200 active:scale-95
             md:hidden fab-button"
      :style="{ 
        zIndex: Z_INDEX.TOC_MOBILE,
        backgroundColor: 'var(--accent-primary)'
      }"
      aria-label="Ver tabla de contenidos"
    >
      <!-- Ícono de lista -->
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.fab-button:hover {
  background-color: var(--accent-primary-hover) !important;
}

.fab-fade-enter-active,
.fab-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fab-fade-enter-from,
.fab-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

